import { generateSpanId, generateTraceId, DynamicSamplingContext } from '@sentry/core';

/**
 * Propagation context for maintaining trace continuity within a session.
 */
export interface PropagationContext {
  /** Current trace ID for the session */
  traceId: string;
  /** Current span ID (typically the root span of current transaction) */
  spanId: string;
  /** Parent span ID if continuing from a parent span */
  parentSpanId?: string;
  /** Whether this trace is sampled */
  sampled?: boolean;
  /** Random value for sampling decisions */
  sampleRand: number;
  /** Dynamic Sampling Context */
  dsc?: Partial<DynamicSamplingContext>;
}

/**
 * Previous trace info for linking traces across navigations.
 */
export interface PreviousTraceInfo {
  /** Span context of the previous trace's root span */
  spanContext: {
    traceId: string;
    spanId: string;
    traceFlags: number;
  };
  /** Timestamp when the previous trace started */
  startTimestamp: number;
  /** Sample rate of the previous trace */
  sampleRate: number;
  /** Sample rand of the previous trace */
  sampleRand: number;
}

// 1 hour in seconds - max duration to link previous traces
const PREVIOUS_TRACE_MAX_DURATION = 3600;

// In-memory storage for propagation context
let _propagationContext: PropagationContext | undefined;
let _previousTraceInfo: PreviousTraceInfo | undefined;

/**
 * Creates a new propagation context with fresh IDs.
 */
export function createPropagationContext(): PropagationContext {
  return {
    traceId: generateTraceId(),
    spanId: generateSpanId(),
    sampleRand: Math.random(),
  };
}

/**
 * Gets the current propagation context, creating one if it doesn't exist.
 */
export function getPropagationContext(): PropagationContext {
  if (!_propagationContext) {
    _propagationContext = createPropagationContext();
  }
  return _propagationContext;
}

/**
 * Sets the propagation context.
 */
export function setPropagationContext(context: PropagationContext): void {
  _propagationContext = context;
}

/**
 * Updates the propagation context with partial values.
 */
export function updatePropagationContext(updates: Partial<PropagationContext>): PropagationContext {
  const current = getPropagationContext();
  _propagationContext = {
    ...current,
    ...updates,
  };
  return _propagationContext;
}

/**
 * Resets the propagation context to start a new trace.
 * @param keepTraceId If true, keeps the current traceId (for session-scoped tracing)
 */
export function resetPropagationContext(keepTraceId: boolean = false): PropagationContext {
  const oldContext = _propagationContext;
  _propagationContext = {
    traceId: keepTraceId && oldContext ? oldContext.traceId : generateTraceId(),
    spanId: generateSpanId(),
    sampleRand: Math.random(),
  };
  return _propagationContext;
}

/**
 * Gets the previous trace info for linking.
 */
export function getPreviousTraceInfo(): PreviousTraceInfo | undefined {
  return _previousTraceInfo;
}

/**
 * Sets the previous trace info.
 */
export function setPreviousTraceInfo(info: PreviousTraceInfo | undefined): void {
  _previousTraceInfo = info;
}

/**
 * Updates previous trace info from a finished transaction.
 * @param traceId The trace ID of the finished transaction
 * @param spanId The span ID of the finished transaction
 * @param sampled Whether the transaction was sampled
 * @param startTimestamp When the transaction started
 * @param sampleRate The sample rate used
 * @param sampleRand The sample rand used
 */
export function updatePreviousTraceFromTransaction(
  traceId: string,
  spanId: string,
  sampled: boolean | undefined,
  startTimestamp: number,
  sampleRate: number,
  sampleRand: number,
): void {
  _previousTraceInfo = {
    spanContext: {
      traceId,
      spanId,
      traceFlags: sampled ? 1 : 0,
    },
    startTimestamp,
    sampleRate,
    sampleRand,
  };
}

/**
 * Checks if the previous trace is still valid for linking.
 * A trace is valid if it's within PREVIOUS_TRACE_MAX_DURATION (1 hour).
 */
export function isPreviousTraceValid(): boolean {
  if (!_previousTraceInfo) {
    return false;
  }
  const now = Date.now() / 1000;
  return now - _previousTraceInfo.startTimestamp <= PREVIOUS_TRACE_MAX_DURATION;
}

/**
 * Gets trace context for continuing a trace from the current propagation context.
 * Returns traceId and parentSpanId for creating child transactions/spans.
 */
export function getTraceContextForContinuation(): {
  traceId: string;
  parentSpanId?: string;
  sampled?: boolean;
  sampleRand: number;
} {
  const context = getPropagationContext();
  return {
    traceId: context.traceId,
    parentSpanId: context.spanId,
    sampled: context.sampled,
    sampleRand: context.sampleRand,
  };
}

/**
 * Clears all propagation state. Useful for testing or session reset.
 */
export function clearPropagationState(): void {
  _propagationContext = undefined;
  _previousTraceInfo = undefined;
}
