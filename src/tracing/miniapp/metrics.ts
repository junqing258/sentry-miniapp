import {
  type Span,
  type SentrySpan,
  type Measurements,
  type SpanAttributes,
  type StartSpanOptions,
  startInactiveSpan,
  spanToJSON,
  setMeasurement,
  withActiveSpan,
  SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN,
} from '@sentry/core';
import { sdk } from '../../crossPlatform';

// https://developers.weixin.qq.com/miniprogram/dev/api/base/performance/PerformanceEntry.html
interface PerformanceEntry {
  duration: number;
  entryType: string;
  moduleName?: string;
  name: string;
  startTime: number;
  path?: string;
  // Additional fields from different miniapp platforms
  referrerPath?: string;
  packageName?: string;
  packageSize?: number;
  initiatorType?: string;
  transferSize?: number;
  viewLayerReadyTime?: number;
  firstRenderTime?: number;
}

interface PerformanceObserver {
  disconnect: () => void;
  observe: (options: { entryTypes: string[] }) => void;
}

interface MiniProgramPerformance {
  createObserver?: (callback: (entryList: { getEntries: () => PerformanceEntry[] }) => void) => PerformanceObserver;
  getEntries?: () => PerformanceEntry[];
  getEntriesByType?: (type: string) => PerformanceEntry[];
  timeOrigin?: number;
  now?: () => number;
}

/** Options for adding performance entries */
export interface AddPerformanceEntriesOptions {
  /**
   * Resource spans with matching entry types will not be emitted.
   * Default: []
   */
  ignoreResourceSpans?: string[];

  /**
   * Performance entry names matching strings in the array will not be emitted.
   * Default: []
   */
  ignorePerformanceEntryNames?: Array<string | RegExp>;
}

const MAX_INT_AS_BYTES = 2147483647;

/**
 * Checks if a given value is a valid measurement value.
 */
function isMeasurementValue(value: unknown): value is number {
  return typeof value === 'number' && isFinite(value);
}

/**
 * Converts from milliseconds to seconds.
 */
function msToSec(time: number): number {
  return time / 1000;
}

/**
 * Helper function to start and end a child span.
 * This function will make sure that the transaction will use the start timestamp
 * of the created child span if it is earlier than the transaction's actual start timestamp.
 */
function startAndEndSpan(
  parentSpan: Span,
  startTimeInSeconds: number,
  endTimeInSeconds: number,
  spanOptions: StartSpanOptions,
): Span | undefined {
  const parentStartTime = spanToJSON(parentSpan).start_timestamp;
  if (parentStartTime && parentStartTime > startTimeInSeconds) {
    // We can only do this for SentrySpans...
    if (typeof (parentSpan as Partial<SentrySpan>).updateStartTime === 'function') {
      (parentSpan as SentrySpan).updateStartTime(startTimeInSeconds);
    }
  }

  return withActiveSpan(parentSpan, () => {
    const span = startInactiveSpan({
      startTime: startTimeInSeconds,
      ...spanOptions,
    });

    if (span) {
      span.end(endTimeInSeconds);
    }

    return span;
  });
}

/**
 * Check if a string matches some pattern in an array.
 */
function stringMatchesSomePattern(value: string, patterns: Array<string | RegExp>): boolean {
  return patterns.some(pattern => {
    if (typeof pattern === 'string') {
      return value === pattern;
    }
    return pattern.test(value);
  });
}

/** Class tracking metrics for MiniApp performance */
export class MetricsInstrumentation {
  private _measurements: Measurements = {};
  private _observer?: PerformanceObserver;
  private _timeOrigin?: number;
  private _performanceCursor: number = 0;

  public constructor(private _reportAllChanges: boolean = false) {}

  /**
   * Add performance entries from the miniapp performance API.
   * Called when the idle span is being ended.
   * Following the pattern from @sentry-internal/browser-utils.
   */
  public addPerformanceEntries(span: Span, options: AddPerformanceEntriesOptions = {}): void {
    const performance = this._getPerformance();
    if (!performance) {
      return;
    }

    const origin = this._getMiniProgramTimeOrigin(performance);
    if (!origin) {
      return;
    }

    const timeOrigin = msToSec(origin);
    const { op, start_timestamp: transactionStartTime } = spanToJSON(span);

    // Get all performance entries (similar to browser's getEntries())
    const performanceEntries = performance.getEntries?.() || [];

    // Process entries starting from cursor to avoid duplicates
    performanceEntries.slice(this._performanceCursor).forEach(entry => {
      const startTime = msToSec(entry.startTime);
      // Chrome sometimes emits negative duration, clamp to 0
      const duration = msToSec(Math.max(0, entry.duration));

      // Skip entries that started before the transaction
      if (op === 'navigation' && transactionStartTime && timeOrigin + startTime < transactionStartTime) {
        return;
      }

      // Check if entry should be ignored
      if (this._shouldIgnoreEntry(entry, options)) {
        return;
      }

      switch (entry.entryType) {
        case 'navigation': {
          this._addNavigationSpans(span, entry, timeOrigin);
          break;
        }
        case 'render': {
          this._addRenderSpan(span, entry, startTime, duration, timeOrigin);
          break;
        }
        case 'script': {
          this._addScriptSpan(span, entry, startTime, duration, timeOrigin);
          break;
        }
        case 'loadPackage': {
          this._addPackageSpan(span, entry, startTime, duration, timeOrigin);
          break;
        }
        case 'resource': {
          this._addResourceSpan(span, entry, startTime, duration, timeOrigin, options.ignoreResourceSpans);
          break;
        }
        // Ignore other entry types
      }
    });

    // Update cursor to avoid processing same entries again
    this._performanceCursor = Math.max(performanceEntries.length - 1, 0);

    // Track system info (similar to browser's _trackNavigator)
    this._trackSystemInfo(span);

    // Measurements are only available for pageload/navigation transactions
    if (op === 'pageload' || op === 'navigation') {
      // Set timeOrigin attribute
      span.setAttribute('performance.timeOrigin', timeOrigin);

      // Apply collected measurements
      Object.entries(this._measurements).forEach(([measurementName, measurement]) => {
        setMeasurement(measurementName, measurement.value, measurement.unit);
      });
    }

    // Reset measurements for next span
    this._measurements = {};
  }

  /**
   * Legacy method for backward compatibility.
   * @deprecated Use addPerformanceEntries instead.
   */
  public addPerformanceEntriesFromSpan(span: Span): void {
    this.addPerformanceEntries(span);
    this._stopObserver();
  }

  /**
   * Start observing performance entries and create child spans.
   * Should be called when a new route span starts.
   */
  public startObserving(parentSpan: Span, options: AddPerformanceEntriesOptions = {}): void {
    const performance = this._getPerformance();
    if (!performance) {
      return;
    }

    const spanJson = spanToJSON(parentSpan);
    this._timeOrigin = this._getTimeOrigin(performance, spanJson.start_timestamp);
    this._measurements = {};
    this._performanceCursor = 0;

    this._observer = performance.createObserver?.((entryList: { getEntries: () => PerformanceEntry[] }) => {
      const list = entryList?.getEntries?.() || [];
      const parentSpanJson = spanToJSON(parentSpan);

      // Don't process if parent span is already finished
      if (parentSpanJson.timestamp !== undefined) {
        this._stopObserver();
        return;
      }

      list.forEach(entry => this._handleEntry(parentSpan, entry, parentSpanJson.start_timestamp, options));
    });

    if (!this._observer) {
      return;
    }

    this._observer.observe({
      entryTypes: ['navigation', 'render', 'script', 'loadPackage', 'resource'],
    });
  }

  private _getPerformance(): MiniProgramPerformance | undefined {
    if (!sdk.getPerformance) {
      return undefined;
    }

    const performance = sdk.getPerformance();
    if (!performance) {
      return undefined;
    }

    return performance as unknown as MiniProgramPerformance;
  }

  private _getMiniProgramTimeOrigin(performance: MiniProgramPerformance): number | undefined {
    if (typeof performance.timeOrigin === 'number') {
      return performance.timeOrigin;
    }

    const perfNow = typeof performance.now === 'function' ? performance.now() : undefined;
    if (typeof perfNow === 'number') {
      return Date.now() - perfNow;
    }

    return undefined;
  }

  private _getTimeOrigin(performance: MiniProgramPerformance, spanStartTimestamp: number): number {
    const origin = this._getMiniProgramTimeOrigin(performance);
    return origin ? msToSec(origin) : spanStartTimestamp;
  }

  private _shouldIgnoreEntry(entry: PerformanceEntry, options: AddPerformanceEntriesOptions): boolean {
    const { ignorePerformanceEntryNames = [] } = options;

    if (ignorePerformanceEntryNames.length > 0 && entry.name) {
      return stringMatchesSomePattern(entry.name, ignorePerformanceEntryNames);
    }

    return false;
  }

  private _handleEntry(
    parentSpan: Span,
    entry: PerformanceEntry,
    spanStartTimestamp: number,
    options: AddPerformanceEntriesOptions = {},
  ): void {
    const timeOrigin = this._timeOrigin ?? spanStartTimestamp;
    const startTime = msToSec(entry.startTime);
    const duration = msToSec(Math.max(0, entry.duration));

    // Check if entry should be ignored
    if (this._shouldIgnoreEntry(entry, options)) {
      return;
    }

    switch (entry.entryType) {
      case 'navigation':
        this._addNavigationSpans(parentSpan, entry, timeOrigin);
        break;
      case 'render':
        this._addRenderSpan(parentSpan, entry, startTime, duration, timeOrigin);
        break;
      case 'script':
        this._addScriptSpan(parentSpan, entry, startTime, duration, timeOrigin);
        break;
      case 'loadPackage':
        this._addPackageSpan(parentSpan, entry, startTime, duration, timeOrigin);
        break;
      case 'resource':
        this._addResourceSpan(parentSpan, entry, startTime, duration, timeOrigin, options.ignoreResourceSpans);
        break;
    }

    // Record measurements
    this._recordMeasurements(entry, spanStartTimestamp, timeOrigin + startTime);
  }

  /**
   * Add navigation related spans (similar to browser's _addNavigationSpans).
   */
  private _addNavigationSpans(span: Span, entry: PerformanceEntry, timeOrigin: number): void {
    const startTimestamp = timeOrigin + msToSec(entry.startTime);
    const endTimestamp = startTimestamp + msToSec(Math.max(0, entry.duration));

    const attributes: SpanAttributes = {
      [SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: 'auto.ui.miniapp.metrics',
      'performance.entry_type': entry.entryType,
    };

    if (entry.path) {
      attributes['navigation.path'] = entry.path;
    }
    if (entry.referrerPath) {
      attributes['navigation.referrer_path'] = entry.referrerPath;
    }
    if (isMeasurementValue(entry.viewLayerReadyTime)) {
      attributes['navigation.view_layer_ready_time'] = entry.viewLayerReadyTime;
    }

    startAndEndSpan(span, startTimestamp, endTimestamp, {
      name: entry.path || entry.name || 'navigation',
      op: 'browser.navigation',
      attributes,
    });

    // Record navigation duration as measurement
    if (isMeasurementValue(entry.duration) && !this._measurements['navigation.duration']) {
      this._measurements['navigation.duration'] = { value: entry.duration, unit: 'millisecond' };
    }

    // Record view layer ready time if available
    if (isMeasurementValue(entry.viewLayerReadyTime)) {
      this._measurements['navigation.view_layer_ready'] = { value: entry.viewLayerReadyTime, unit: 'millisecond' };
    }
  }

  /**
   * Add render spans for UI rendering performance.
   */
  private _addRenderSpan(
    span: Span,
    entry: PerformanceEntry,
    startTime: number,
    duration: number,
    timeOrigin: number,
  ): void {
    const startTimestamp = timeOrigin + startTime;
    const endTimestamp = startTimestamp + duration;

    const attributes: SpanAttributes = {
      [SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: 'auto.ui.miniapp.metrics',
      'performance.entry_type': entry.entryType,
    };

    if (entry.path) {
      attributes['ui.component_path'] = entry.path;
    }
    if (isMeasurementValue(entry.viewLayerReadyTime)) {
      attributes['ui.view_layer_ready_time'] = entry.viewLayerReadyTime;
    }
    if (isMeasurementValue(entry.firstRenderTime)) {
      attributes['ui.first_render_time'] = entry.firstRenderTime;
    }

    startAndEndSpan(span, startTimestamp, endTimestamp, {
      name: entry.path || entry.name || 'render',
      op: 'ui.render',
      attributes,
    });

    // Record first render time as measurement
    if (isMeasurementValue(entry.firstRenderTime)) {
      this._measurements['ui.first_render'] = { value: entry.firstRenderTime, unit: 'millisecond' };
    }
  }

  /**
   * Add script execution spans.
   */
  private _addScriptSpan(
    span: Span,
    entry: PerformanceEntry,
    startTime: number,
    duration: number,
    timeOrigin: number,
  ): void {
    const startTimestamp = timeOrigin + startTime;
    const endTimestamp = startTimestamp + duration;

    const attributes: SpanAttributes = {
      [SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: 'auto.resource.miniapp.metrics',
      'performance.entry_type': entry.entryType,
    };

    if (entry.moduleName) {
      attributes['code.filepath'] = entry.moduleName;
    }

    startAndEndSpan(span, startTimestamp, endTimestamp, {
      name: entry.moduleName || entry.name || 'script',
      op: 'script',
      attributes,
    });
  }

  /**
   * Add package loading spans.
   */
  private _addPackageSpan(
    span: Span,
    entry: PerformanceEntry,
    startTime: number,
    duration: number,
    timeOrigin: number,
  ): void {
    const startTimestamp = timeOrigin + startTime;
    const endTimestamp = startTimestamp + duration;

    const attributes: SpanAttributes = {
      [SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: 'auto.resource.miniapp.metrics',
      'performance.entry_type': entry.entryType,
    };

    if (entry.packageName) {
      attributes['resource.package_name'] = entry.packageName;
    }
    if (isMeasurementValue(entry.packageSize) && entry.packageSize < MAX_INT_AS_BYTES) {
      attributes['resource.package_size'] = entry.packageSize;
    }

    startAndEndSpan(span, startTimestamp, endTimestamp, {
      name: entry.packageName || entry.name || 'loadPackage',
      op: 'resource.package',
      attributes,
    });
  }

  /**
   * Add resource loading spans (similar to browser's _addResourceSpans).
   */
  private _addResourceSpan(
    span: Span,
    entry: PerformanceEntry,
    startTime: number,
    duration: number,
    timeOrigin: number,
    ignoredResourceSpanOps?: string[],
  ): void {
    // Skip fetch/xhr as they are already instrumented
    if (entry.initiatorType === 'xmlhttprequest' || entry.initiatorType === 'fetch') {
      return;
    }

    const op = entry.initiatorType ? `resource.${entry.initiatorType}` : 'resource.other';
    if (ignoredResourceSpanOps?.includes(op)) {
      return;
    }

    const startTimestamp = timeOrigin + startTime;
    const endTimestamp = startTimestamp + duration;

    const attributes: SpanAttributes = {
      [SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: 'auto.resource.miniapp.metrics',
      'performance.entry_type': entry.entryType,
    };

    if (entry.initiatorType) {
      attributes['resource.initiator_type'] = entry.initiatorType;
    }
    if (isMeasurementValue(entry.transferSize) && entry.transferSize < MAX_INT_AS_BYTES) {
      attributes['http.response_transfer_size'] = entry.transferSize;
    }
    if (entry.path) {
      attributes['resource.path'] = entry.path;
    }

    startAndEndSpan(span, startTimestamp, endTimestamp, {
      name: entry.path || entry.name || 'resource',
      op,
      attributes,
    });
  }

  /**
   * Track system information (similar to browser's _trackNavigator).
   */
  private _trackSystemInfo(span: Span): void {
    if (!sdk.getSystemInfoSync) {
      return;
    }

    try {
      const systemInfo = sdk.getSystemInfoSync();
      if (!systemInfo) {
        return;
      }

      // Track network type if available
      if (systemInfo.networkType) {
        span.setAttribute('network.type', systemInfo.networkType);
      }

      // Track device info
      if (systemInfo.platform) {
        span.setAttribute('device.platform', systemInfo.platform);
      }
      if (systemInfo.model) {
        span.setAttribute('device.model', systemInfo.model);
      }
      if (systemInfo.system) {
        span.setAttribute('os.version', systemInfo.system);
      }

      // Track device memory if available (similar to browser)
      if (isMeasurementValue(systemInfo.benchmarkLevel)) {
        span.setAttribute('device.benchmark_level', String(systemInfo.benchmarkLevel));
      }
    } catch {
      // Silently ignore errors when accessing system info
    }
  }

  private _recordMeasurements(entry: PerformanceEntry, spanStartTimestamp: number, entryStartTimestamp: number): void {
    const normalizedName = (entry.name || '').toLowerCase();
    const durationMs = entry.duration;
    const relativeStartMs = Math.max((entryStartTimestamp - spanStartTimestamp) * 1000, 0);

    // Web vitals style measurements
    if (normalizedName === 'first-paint' || normalizedName === 'firstpaint') {
      this._measurements['fp'] = { value: relativeStartMs, unit: 'millisecond' };
    } else if (normalizedName === 'first-contentful-paint' || normalizedName === 'firstcontentfulpaint') {
      this._measurements['fcp'] = { value: relativeStartMs, unit: 'millisecond' };
    } else if (
      normalizedName === 'largest-contentful-paint' ||
      normalizedName === 'largestcontentfulpaint' ||
      normalizedName === 'lcp'
    ) {
      this._measurements['lcp'] = { value: relativeStartMs, unit: 'millisecond' };
    } else if (
      (normalizedName === 'first-input-delay' || normalizedName === 'firstinputdelay' || normalizedName === 'fid') &&
      isMeasurementValue(durationMs)
    ) {
      this._measurements['fid'] = { value: durationMs, unit: 'millisecond' };
    }

    // MiniApp specific measurements
    if (isMeasurementValue(entry.viewLayerReadyTime) && !this._measurements['view_layer_ready']) {
      this._measurements['view_layer_ready'] = { value: entry.viewLayerReadyTime, unit: 'millisecond' };
    }
    if (isMeasurementValue(entry.firstRenderTime) && !this._measurements['first_render']) {
      this._measurements['first_render'] = { value: entry.firstRenderTime, unit: 'millisecond' };
    }

    // Report all changes mode
    if (this._reportAllChanges && isMeasurementValue(durationMs)) {
      const key = this._measurementKey(entry);
      if (key && !this._measurements[key]) {
        this._measurements[key] = { value: durationMs, unit: 'millisecond' };
      }
    }
  }

  private _measurementKey(entry: PerformanceEntry): string | undefined {
    const base = entry.name || entry.entryType;
    if (!base) {
      return undefined;
    }
    return base.replace(/\s+/g, '_').toLowerCase();
  }

  private _stopObserver(): void {
    this._observer?.disconnect();
    this._observer = undefined;
  }
}
