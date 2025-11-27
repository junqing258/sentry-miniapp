import { debug, getClient, sampleSpan, type Options } from '@sentry/core';

import { IS_DEBUG_BUILD } from './flags';
import { IdleTransaction } from './idletransaction';
import { Transaction } from './transaction';
import { setActiveTransaction } from './utils';
import type { CustomSamplingContext, SamplingContext, TransactionContext, TraceContinuityMode } from './types';
import {
  getPropagationContext,
  updatePropagationContext,
  resetPropagationContext,
  updatePreviousTraceFromTransaction,
  getPreviousTraceInfo,
  isPreviousTraceValid,
} from './propagationContext';

/**
 * Makes a sampling decision for the given transaction and stores it on the transaction.
 *
 * Called every time a transaction is created. Only transactions which emerge with a `sampled` value of `true` will be
 * sent to Sentry.
 *
 * @param transaction: The transaction needing a sampling decision
 * @param options: The current client's options, so we can access `tracesSampleRate` and/or `tracesSampler`
 * @param samplingContext: Default and user-provided data which may be used to help make the decision
 *
 * @returns The given transaction with its `sampled` value set
 */
function sample<T extends Transaction>(transaction: T, options: Options, samplingContext: SamplingContext): T {
  const [sampled, sampleRate] = sampleSpan(
    { tracesSampleRate: options.tracesSampleRate, tracesSampler: options.tracesSampler },
    samplingContext,
    Math.random(),
  );
  transaction.sampled = sampled;

  // if we're not going to keep it, we're done
  if (!transaction.sampled) {
    IS_DEBUG_BUILD &&
      debug.log(
        `[Tracing] Discarding transaction because it's not included in the random sample (sampling rate = ${Number(
          sampleRate ?? 0,
        )})`,
      );
    return transaction;
  }

  IS_DEBUG_BUILD && debug.log(`[Tracing] starting ${transaction.op} transaction - ${transaction.name}`);
  return transaction;
}

/**
 * Options for trace continuity when starting transactions.
 */
export interface StartTransactionOptions {
  /**
   * Trace continuity mode.
   * - 'session': Reuse the same traceId for the entire session
   * - 'link': Create new trace but link to previous
   * - 'off': Independent traces (legacy behavior)
   */
  traceContinuityMode?: TraceContinuityMode;
  /**
   * Inherit sampling decision from previous trace.
   */
  consistentTraceSampling?: boolean;
}

/**
 * Creates a new transaction and adds a sampling decision if it doesn't yet have one.
 * Supports trace continuity for maintaining consistent traceId across navigations.
 */
export function startTransaction(
  transactionContext: TransactionContext,
  customSamplingContext?: CustomSamplingContext,
  traceOptions?: StartTransactionOptions,
): Transaction {
  const client = getClient();
  const options = (client && client.getOptions && client.getOptions()) || ({} as Options);
  const traceContinuityMode = traceOptions?.traceContinuityMode ?? 'off';
  const consistentTraceSampling = traceOptions?.consistentTraceSampling ?? false;

  // Build the transaction context with trace continuity support
  const finalContext = buildTransactionContextWithContinuity(
    transactionContext,
    traceContinuityMode,
    consistentTraceSampling,
  );

  const transactionName = finalContext.name || finalContext.op || 'unknown-transaction';
  const samplingContext: SamplingContext = {
    parentSampled: finalContext.parentSampled,
    transactionContext: { ...finalContext, name: transactionName },
    name: transactionName,
    ...customSamplingContext,
  };

  let transaction = new Transaction({ ...finalContext, name: transactionName });
  transaction = sample(transaction, options, samplingContext);
  if (transaction.sampled) {
    const maxSpans = (options as any)._experiments && (options as any)._experiments.maxSpans;
    transaction.initSpanRecorder(maxSpans as number);
    setActiveTransaction(transaction);
  }

  // Update propagation context with the new transaction's info
  updatePropagationContext({
    traceId: transaction.traceId,
    spanId: transaction.spanId,
    sampled: transaction.sampled,
  });

  return transaction;
}

/**
 * Create new idle transaction with trace continuity support.
 */
export function startIdleTransaction(
  transactionContext: TransactionContext,
  idleTimeout?: number,
  onScope?: boolean,
  customSamplingContext?: CustomSamplingContext,
  traceOptions?: StartTransactionOptions,
): IdleTransaction {
  const client = getClient();
  const options = (client && client.getOptions && client.getOptions()) || ({} as Options);
  const traceContinuityMode = traceOptions?.traceContinuityMode ?? 'off';
  const consistentTraceSampling = traceOptions?.consistentTraceSampling ?? false;

  // Build the transaction context with trace continuity support
  const finalContext = buildTransactionContextWithContinuity(
    transactionContext,
    traceContinuityMode,
    consistentTraceSampling,
  );

  const transactionName = finalContext.name || finalContext.op || 'unknown-transaction';
  const samplingContext: SamplingContext = {
    parentSampled: finalContext.parentSampled,
    transactionContext: { ...finalContext, name: transactionName },
    name: transactionName,
    ...customSamplingContext,
  };

  let transaction = new IdleTransaction({ ...finalContext, name: transactionName }, idleTimeout, onScope);
  transaction = sample(transaction, options, samplingContext);
  if (transaction.sampled) {
    const maxSpans = (options as any)._experiments && (options as any)._experiments.maxSpans;
    transaction.initSpanRecorder(maxSpans as number);
    setActiveTransaction(transaction);
  }

  // Update propagation context with the new transaction's info
  updatePropagationContext({
    traceId: transaction.traceId,
    spanId: transaction.spanId,
    sampled: transaction.sampled,
  });

  // Register callback to update previous trace info when transaction finishes
  transaction.registerBeforeFinishCallback((tx) => {
    const sampleRate = (options.tracesSampleRate as number) ?? 1;
    const propagationCtx = getPropagationContext();
    updatePreviousTraceFromTransaction(
      tx.traceId,
      tx.spanId,
      tx.sampled,
      tx.startTimestamp,
      sampleRate,
      propagationCtx.sampleRand,
    );

    IS_DEBUG_BUILD && debug.log(`[Tracing] Updated previous trace info: traceId=${tx.traceId}, spanId=${tx.spanId}`);
  });

  return transaction;
}

/**
 * Builds transaction context with trace continuity support.
 * @internal
 */
function buildTransactionContextWithContinuity(
  transactionContext: TransactionContext,
  traceContinuityMode: TraceContinuityMode,
  consistentTraceSampling: boolean,
): TransactionContext {
  // If trace continuity is off, return original context
  if (traceContinuityMode === 'off') {
    return transactionContext;
  }

  const propagationContext = getPropagationContext();
  const previousTrace = getPreviousTraceInfo();
  const hasPreviousTrace = isPreviousTraceValid();

  // Session mode: reuse the same traceId for the entire session
  if (traceContinuityMode === 'session') {
    const finalContext: TransactionContext = {
      ...transactionContext,
      traceId: propagationContext.traceId,
      // Each transaction is a root span in session mode, no parent
    };

    // Apply consistent sampling if enabled and we have previous trace info
    if (consistentTraceSampling && hasPreviousTrace && previousTrace) {
      finalContext.parentSampled = previousTrace.spanContext.traceFlags === 1;
    }

    IS_DEBUG_BUILD && debug.log(`[Tracing] Session mode: reusing traceId=${propagationContext.traceId}`);
    return finalContext;
  }

  // Link mode: create new trace but link to previous
  if (traceContinuityMode === 'link') {
    // Reset propagation context to get a new traceId
    const newContext = resetPropagationContext(false);
    
    const finalContext: TransactionContext = {
      ...transactionContext,
      traceId: newContext.traceId,
    };

    // Apply consistent sampling if enabled
    if (consistentTraceSampling && hasPreviousTrace && previousTrace) {
      finalContext.parentSampled = previousTrace.spanContext.traceFlags === 1;
    }

    // Store previous trace info in metadata for potential span linking
    if (hasPreviousTrace && previousTrace) {
      finalContext.metadata = {
        ...finalContext.metadata,
        previousTrace: {
          traceId: previousTrace.spanContext.traceId,
          spanId: previousTrace.spanContext.spanId,
          sampled: previousTrace.spanContext.traceFlags === 1,
        },
      };
      IS_DEBUG_BUILD && debug.log(
        `[Tracing] Link mode: new traceId=${newContext.traceId}, linked from previous traceId=${previousTrace.spanContext.traceId}`,
      );
    } else {
      IS_DEBUG_BUILD && debug.log(`[Tracing] Link mode: new traceId=${newContext.traceId} (first trace)`);
    }

    return finalContext;
  }

  return transactionContext;
}


/**
 * Legacy no-op kept for backwards compatibility.
 */
export function addTracingExtensions(): void {
  // Tracing helpers are wired up directly; no carrier patching required.
}
