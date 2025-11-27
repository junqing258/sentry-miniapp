import {
  Integration,
  debug,
  getClient,
  getCurrentScope,
  startIdleSpan,
  spanIsSampled,
  spanToJSON,
  getDynamicSamplingContextFromSpan,
  generateTraceId,
  addNonEnumerableProperty,
  SEMANTIC_ATTRIBUTE_SENTRY_SOURCE,
  SEMANTIC_ATTRIBUTE_SENTRY_IDLE_SPAN_FINISH_REASON,
  type Client,
  type Span,
  type StartSpanOptions,
} from '@sentry/core';

import { MetricsInstrumentation } from './metrics';
import { defaultRequestInstrumentationOptions, RequestInstrumentationOptions } from './request';
import { instrumentMiniAppRouter, type MiniAppRouterInstrumentationOptions } from './router';
import { sdk } from '../../crossPlatform';
import { IS_DEBUG_BUILD } from '../flags';
import type { TraceContinuityOptions, TraceContinuityMode } from '../types';
import {
  getPropagationContext,
  resetPropagationContext,
  updatePreviousTraceFromTransaction,
  getPreviousTraceInfo,
  isPreviousTraceValid,
} from '../propagationContext';

/** Default idle timeout in milliseconds */
const DEFAULT_IDLE_TIMEOUT = 1000;
/** Default final timeout in milliseconds */
const DEFAULT_FINAL_TIMEOUT = 30000;
/** Default child span timeout in milliseconds */
const DEFAULT_CHILD_SPAN_TIMEOUT = 15000;

export const MINIAPP_TRACING_INTEGRATION_ID = 'MiniAppTracing';

// Store active idle span on client
const ACTIVE_IDLE_SPAN_PROPERTY = '_sentry_miniapp_idleSpan';

function getActiveIdleSpan(client: Client): Span | undefined {
  return (client as { [ACTIVE_IDLE_SPAN_PROPERTY]?: Span })[ACTIVE_IDLE_SPAN_PROPERTY];
}

function setActiveIdleSpan(client: Client, span: Span | undefined): void {
  addNonEnumerableProperty(client, ACTIVE_IDLE_SPAN_PROPERTY, span);
}

/**
 * Options for MiniApp Tracing integration
 */
export interface MiniAppTracingIntegrationOptions
  extends Partial<RequestInstrumentationOptions>,
    TraceContinuityOptions,
    MiniAppRouterInstrumentationOptions {
  /**
   * The time to wait in ms until the idle span will be finished.
   * @default 1000
   */
  idleTimeout?: number;

  /**
   * The max time an idle span may run.
   * @default 30000
   */
  finalTimeout?: number;

  /**
   * The max time a child span may run.
   * @default 15000
   */
  childSpanTimeout?: number;

  /**
   * @deprecated Use _metricOptions instead
   */
  maxTransactionDuration?: number;

  /**
   * Metric collection options.
   */
  _metricOptions?: Partial<{ _reportAllChanges: boolean }>;

  /**
   * A callback which is called before a span for a pageload or navigation is started.
   * It receives the options passed to `startSpan`, and expects to return an updated options object.
   */
  beforeStartSpan?: (options: StartSpanOptions) => StartSpanOptions;
}

const DEFAULT_OPTIONS: Partial<MiniAppTracingIntegrationOptions> = {
  idleTimeout: DEFAULT_IDLE_TIMEOUT,
  finalTimeout: DEFAULT_FINAL_TIMEOUT,
  childSpanTimeout: DEFAULT_CHILD_SPAN_TIMEOUT,
  instrumentPageLoad: true,
  instrumentNavigation: true,
  traceContinuityMode: 'link',
  consistentTraceSampling: false,
  ...defaultRequestInstrumentationOptions,
};

/**
 * A custom tracing integration for miniapp applications.
 *
 * This follows the pattern of Vue's browserTracingIntegration, separating
 * router instrumentation from the main integration logic.
 *
 * @example
 * ```ts
 * import { miniappTracingIntegration } from '@sentry/miniapp';
 *
 * Sentry.init({
 *   integrations: [
 *     miniappTracingIntegration({
 *       traceContinuityMode: 'link',
 *       beforeStartSpan: (options) => ({
 *         ...options,
 *         name: `Custom: ${options.name}`,
 *       }),
 *     }),
 *   ],
 * });
 * ```
 */
export function miniappTracingIntegration(
  options: MiniAppTracingIntegrationOptions = {},
): Integration {
  const finalOptions = {
    ...DEFAULT_OPTIONS,
    ...options,
  };

  const {
    idleTimeout,
    finalTimeout,
    childSpanTimeout,
    instrumentPageLoad,
    instrumentNavigation,
    traceContinuityMode,
    consistentTraceSampling,
    beforeStartSpan,
    _metricOptions,
  } = finalOptions;

  let metricsInstrumentation: MetricsInstrumentation | undefined;
  let latestRouteName: string | undefined;
  let latestRouteSource: string | undefined;

  return {
    name: MINIAPP_TRACING_INTEGRATION_ID,

    setupOnce(): void {
      // Initialize metrics instrumentation
      metricsInstrumentation = new MetricsInstrumentation(_metricOptions?._reportAllChanges);
    },

    setup(client: Client): void {
      // Finish active span when app goes to background
      sdk.onAppHide?.(() => {
        const activeSpan = getActiveIdleSpan(client);
        if (activeSpan && !spanToJSON(activeSpan).timestamp) {
          IS_DEBUG_BUILD && debug.log('[MiniAppTracing] App hiding, finishing active span');
          activeSpan.setAttribute(SEMANTIC_ATTRIBUTE_SENTRY_IDLE_SPAN_FINISH_REASON, 'appHide');
          activeSpan.end();
        }
      });
    },

    afterAllSetup(client: Client): void {
      /**
       * Start a navigation span for miniapp.
       * This is called by the router instrumentation.
       */
      const startNavigationSpan = (spanOptions: StartSpanOptions): void => {
        startMiniAppTracingNavigationSpan(client, spanOptions, {
          idleTimeout: idleTimeout!,
          finalTimeout: finalTimeout!,
          childSpanTimeout: childSpanTimeout!,
          traceContinuityMode: traceContinuityMode!,
          consistentTraceSampling: consistentTraceSampling!,
          beforeStartSpan,
          metricsInstrumentation,
          latestRoute: {
            get name() {
              return latestRouteName;
            },
            set name(value) {
              latestRouteName = value;
            },
            get source() {
              return latestRouteSource;
            },
            set source(value) {
              latestRouteSource = value;
            },
          },
        });
      };

      // Instrument the miniapp router
      instrumentMiniAppRouter(
        {
          routeLabel: 'path',
          instrumentPageLoad,
          instrumentNavigation,
        },
        startNavigationSpan,
      );
    },
  };
}

interface SpanCreationContext {
  idleTimeout: number;
  finalTimeout: number;
  childSpanTimeout: number;
  traceContinuityMode: TraceContinuityMode;
  consistentTraceSampling: boolean;
  beforeStartSpan?: (options: StartSpanOptions) => StartSpanOptions;
  metricsInstrumentation?: MetricsInstrumentation;
  latestRoute: {
    name?: string;
    source?: string;
  };
}

/**
 * Start a navigation span for miniapp tracing.
 * This is the core function that creates idle spans for pageload/navigation.
 */
export function startMiniAppTracingNavigationSpan(
  client: Client,
  startSpanOptions: StartSpanOptions,
  context: SpanCreationContext,
): Span | undefined {
  const {
    idleTimeout,
    finalTimeout,
    childSpanTimeout,
    traceContinuityMode,
    consistentTraceSampling,
    beforeStartSpan,
    metricsInstrumentation,
    latestRoute,
  } = context;

  // End any existing active span
  maybeEndActiveSpan(client);

  // Setup propagation context and get span links
  const spanLinks = setupPropagationContext(traceContinuityMode, consistentTraceSampling);

  // Apply beforeStartSpan transformation
  const finalStartSpanOptions = beforeStartSpan
    ? beforeStartSpan(startSpanOptions)
    : startSpanOptions;

  // Add span links to options if available
  if (spanLinks && spanLinks.length > 0) {
    finalStartSpanOptions.links = [
      ...(finalStartSpanOptions.links || []),
      ...spanLinks,
    ];
  }

  const attributes = finalStartSpanOptions.attributes || {};

  // Update latest route info
  latestRoute.name = finalStartSpanOptions.name;
  latestRoute.source = attributes[SEMANTIC_ATTRIBUTE_SENTRY_SOURCE] as string;

  // Create idle span
  const idleSpan = startIdleSpan(finalStartSpanOptions, {
    idleTimeout,
    finalTimeout,
    childSpanTimeout,
    beforeSpanEnd: (span) => {
      // Collect performance metrics
      metricsInstrumentation?.addPerformanceEntriesFromSpan(span);

      // Clear active span
      setActiveIdleSpan(client, undefined);

      // Update propagation context
      const scope = getCurrentScope();
      const oldPropagationContext = scope.getPropagationContext();

      scope.setPropagationContext({
        ...oldPropagationContext,
        traceId: span.spanContext().traceId,
        sampled: spanIsSampled(span),
        dsc: getDynamicSamplingContextFromSpan(span),
      });

      // Update previous trace info for linking
      const spanJson = spanToJSON(span);
      updatePreviousTraceFromTransaction(
        span.spanContext().traceId,
        span.spanContext().spanId,
        spanIsSampled(span),
        spanJson.start_timestamp,
        1,
        oldPropagationContext.sampleRand ?? Math.random(),
      );

      IS_DEBUG_BUILD &&
        debug.log(
          `[MiniAppTracing] Span ended: ${spanJson.op} - ${spanJson.description}, traceId=${span.spanContext().traceId}`,
        );
    },
  });

  // Set additional attributes
  idleSpan.setAttribute('miniapp.trace_continuity_mode', traceContinuityMode);

  setActiveIdleSpan(client, idleSpan);

  IS_DEBUG_BUILD &&
    debug.log(
      `[MiniAppTracing] Started ${startSpanOptions.op} span: ${startSpanOptions.name}, traceId=${idleSpan.spanContext().traceId}`,
    );

  return idleSpan;
}

/**
 * End the active span if it exists and hasn't ended yet.
 */
function maybeEndActiveSpan(client: Client): void {
  const activeSpan = getActiveIdleSpan(client);
  if (activeSpan && !spanToJSON(activeSpan).timestamp) {
    IS_DEBUG_BUILD &&
      debug.log(`[MiniAppTracing] Finishing current active span with op: ${spanToJSON(activeSpan).op}`);
    activeSpan.setAttribute(SEMANTIC_ATTRIBUTE_SENTRY_IDLE_SPAN_FINISH_REASON, 'navigationStart');
    activeSpan.end();
  }
}

/**
 * Setup propagation context based on trace continuity mode.
 * Returns span links if in 'link' mode with valid previous trace.
 */
function setupPropagationContext(
  traceContinuityMode: TraceContinuityMode,
  consistentTraceSampling: boolean,
): StartSpanOptions['links'] {
  if (traceContinuityMode === 'off') {
    // Generate completely new trace
    const scope = getCurrentScope();
    scope.setPropagationContext({
      traceId: generateTraceId(),
      sampleRand: Math.random(),
    });
    return undefined;
  }

  const previousTrace = getPreviousTraceInfo();
  const hasPreviousTrace = isPreviousTraceValid();

  if (traceContinuityMode === 'session') {
    // Reuse the same traceId for entire session
    const propagationContext = getPropagationContext();
    const scope = getCurrentScope();
    scope.setPropagationContext({
      traceId: propagationContext.traceId,
      sampleRand: propagationContext.sampleRand,
      ...(consistentTraceSampling &&
        hasPreviousTrace &&
        previousTrace && {
          sampled: previousTrace.spanContext.traceFlags === 1,
        }),
    });
    IS_DEBUG_BUILD && debug.log(`[MiniAppTracing] Session mode: reusing traceId=${propagationContext.traceId}`);
    return undefined;
  }

  if (traceContinuityMode === 'link') {
    // New trace but link to previous
    const newContext = resetPropagationContext(false);
    const scope = getCurrentScope();
    scope.setPropagationContext({
      traceId: newContext.traceId,
      sampleRand: newContext.sampleRand,
      ...(consistentTraceSampling &&
        hasPreviousTrace &&
        previousTrace && {
          sampled: previousTrace.spanContext.traceFlags === 1,
        }),
    });

    // Create span link to previous trace if available
    if (hasPreviousTrace && previousTrace) {
      IS_DEBUG_BUILD &&
        debug.log(
          `[MiniAppTracing] Link mode: new traceId=${newContext.traceId}, linked from ${previousTrace.spanContext.traceId}`,
        );

      return [
        {
          context: {
            traceId: previousTrace.spanContext.traceId,
            spanId: previousTrace.spanContext.spanId,
            traceFlags: previousTrace.spanContext.traceFlags ?? 0,
          },
          attributes: {
            'sentry.link.type': 'previous_trace' as const,
          },
        },
      ];
    }
  }

  return undefined;
}

/**
 * Get the currently active idle span for the miniapp.
 */
export function getActiveMiniAppSpan(): Span | undefined {
  const client = getClient();
  return client ? getActiveIdleSpan(client) : undefined;
}
