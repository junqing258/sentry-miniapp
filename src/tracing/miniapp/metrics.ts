import {
  type Span,
  type Measurements,
  startInactiveSpan,
  spanToJSON,
  setMeasurement,
} from '@sentry/core';
import { sdk } from '../../crossPlatform';

// https://developers.weixin.qq.com/miniprogram/dev/api/base/performance/PerformanceEntry.html
type PerformanceEntry = {
  duration: number;
  entryType: string;
  moduleName?: string;
  name: string;
  startTime: number;
  path?: string;
};

type PerformanceObserver = {
  disconnect: () => void;
  observe: (options: { entryTypes: string[] }) => void;
};

type MiniProgramPerformance = {
  createObserver?: (callback: (entryList: { getEntries: () => PerformanceEntry[] }) => void) => PerformanceObserver;
  timeOrigin?: number;
  now?: () => number;
};

const EPOCH_TIME_THRESHOLD = 1e12;

/** Convert milliseconds to seconds */
function msToSec(ms: number): number {
  return ms / 1000;
}

/** Class tracking metrics for MiniApp performance */
export class MetricsInstrumentation {
  private _measurements: Measurements = {};
  private _observer?: PerformanceObserver;
  private _timeOrigin?: number;

  public constructor(private _reportAllChanges: boolean = false) {}

  /**
   * Add performance entries from the miniapp performance API.
   * Called when the idle span is being ended.
   */
  public addPerformanceEntriesFromSpan(span: Span): void {
    const performance = this._getPerformance();
    if (!performance) {
      return;
    }

    const spanJson = spanToJSON(span);
    const spanStartTimestamp = spanJson.start_timestamp;

    this._timeOrigin = this._getTimeOrigin(performance, spanStartTimestamp);

    // Stop any existing observer
    this._stopObserver();

    // Set measurements on the span
    this._applyMeasurementsToSpan();
  }

  /**
   * Start observing performance entries and create child spans.
   * Should be called when a new route span starts.
   */
  public startObserving(parentSpan: Span): void {
    const performance = this._getPerformance();
    if (!performance) {
      return;
    }

    const spanJson = spanToJSON(parentSpan);
    this._timeOrigin = this._getTimeOrigin(performance, spanJson.start_timestamp);
    this._measurements = {};

    this._observer = performance.createObserver?.((entryList: { getEntries: () => PerformanceEntry[] }) => {
      const list = entryList?.getEntries?.() || [];
      const parentSpanJson = spanToJSON(parentSpan);
      
      // Don't process if parent span is already finished
      if (parentSpanJson.timestamp !== undefined) {
        this._stopObserver();
        return;
      }

      list.forEach(entry => this._handleEntry(parentSpan, entry, parentSpanJson.start_timestamp));
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
    if (!performance || typeof performance.createObserver !== 'function') {
      return undefined;
    }

    return performance as unknown as MiniProgramPerformance;
  }

  private _getTimeOrigin(performance: MiniProgramPerformance, spanStartTimestamp: number): number {
    if (typeof performance.timeOrigin === 'number') {
      return msToSec(performance.timeOrigin);
    }

    const perfNow = typeof performance.now === 'function' ? performance.now() : undefined;
    if (typeof perfNow === 'number') {
      return msToSec(Date.now() - perfNow);
    }

    return spanStartTimestamp;
  }

  private _handleEntry(_parentSpan: Span, entry: PerformanceEntry, spanStartTimestamp: number): void {
    const startTimestamp = this._toTimestamp(entry.startTime, spanStartTimestamp);
    const endTimestamp = this._toTimestamp(entry.startTime + entry.duration, spanStartTimestamp);

    // Create child span for this entry
    const childSpan = startInactiveSpan({
      name: this._getDescription(entry) || entry.entryType,
      op: this._mapOp(entry),
      startTime: startTimestamp,
      attributes: this._buildSpanAttributes(entry),
    });

    if (childSpan) {
      childSpan.end(endTimestamp);
    }

    // Record measurements
    this._recordMeasurements(entry, spanStartTimestamp, startTimestamp);
  }

  private _mapOp(entry: PerformanceEntry): string {
    switch (entry.entryType) {
      case 'navigation':
        return 'navigation';
      case 'render':
        return 'ui.render';
      case 'script':
        return 'script';
      case 'loadPackage':
        return 'resource.package';
      case 'resource':
        return 'resource';
      default:
        return entry.entryType || 'custom';
    }
  }

  private _getDescription(entry: PerformanceEntry): string | undefined {
    return entry.path || entry.moduleName || entry.name;
  }

  private _buildSpanAttributes(entry: PerformanceEntry): Record<string, string | number> {
    const attrs: Record<string, string | number> = {
      'performance.entry_type': entry.entryType,
    };
    if (entry.moduleName) {
      attrs['performance.module_name'] = entry.moduleName;
    }
    if (entry.path) {
      attrs['performance.path'] = entry.path;
    }
    if (typeof entry.duration === 'number') {
      attrs['performance.duration_ms'] = entry.duration;
    }
    return attrs;
  }

  private _recordMeasurements(entry: PerformanceEntry, spanStartTimestamp: number, entryStartTimestamp: number): void {
    const normalizedName = (entry.name || '').toLowerCase();
    const durationMs = entry.duration;
    const relativeStartMs = Math.max((entryStartTimestamp - spanStartTimestamp) * 1000, 0);

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
      typeof durationMs === 'number'
    ) {
      this._measurements['fid'] = { value: durationMs, unit: 'millisecond' };
    } else if (
      entry.entryType === 'navigation' &&
      typeof durationMs === 'number' &&
      !this._measurements['navigation']
    ) {
      this._measurements['navigation'] = { value: durationMs, unit: 'millisecond' };
    }

    if (this._reportAllChanges && typeof durationMs === 'number') {
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

  private _toTimestamp(startTimeMs: number, spanStartTimestamp: number): number {
    if (startTimeMs > EPOCH_TIME_THRESHOLD) {
      return msToSec(startTimeMs);
    }

    const origin = this._timeOrigin ?? spanStartTimestamp;
    return origin + msToSec(startTimeMs);
  }

  private _applyMeasurementsToSpan(): void {
    // Apply collected measurements using setMeasurement
    for (const [name, measurement] of Object.entries(this._measurements)) {
      setMeasurement(name, measurement.value, measurement.unit);
    }
  }

  private _stopObserver(): void {
    this._observer?.disconnect();
    this._observer = undefined;
  }
}
