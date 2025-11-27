import { debug, getClient, sampleSpan, type Options } from '@sentry/core';

import { IS_DEBUG_BUILD } from './flags';
import { IdleTransaction } from './idletransaction';
import { Transaction } from './transaction';
import { setActiveTransaction } from './utils';
import type { CustomSamplingContext, SamplingContext, TransactionContext } from './types';

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
 * Creates a new transaction and adds a sampling decision if it doesn't yet have one.
 */
export function startTransaction(
  transactionContext: TransactionContext,
  customSamplingContext?: CustomSamplingContext,
): Transaction {
  const client = getClient();
  const options = (client && client.getOptions && client.getOptions()) || ({} as Options);

  const transactionName = transactionContext.name || transactionContext.op || 'unknown-transaction';
  const samplingContext: SamplingContext = {
    parentSampled: transactionContext.parentSampled,
    transactionContext: { ...transactionContext, name: transactionName },
    name: transactionName,
    ...customSamplingContext,
  };

  let transaction = new Transaction({ ...transactionContext, name: transactionName });
  transaction = sample(transaction, options, samplingContext);
  if (transaction.sampled) {
    const maxSpans = (options as any)._experiments && (options as any)._experiments.maxSpans;
    transaction.initSpanRecorder(maxSpans as number);
    setActiveTransaction(transaction);
  }
  return transaction;
}

/**
 * Create new idle transaction.
 */
export function startIdleTransaction(
  transactionContext: TransactionContext,
  idleTimeout?: number,
  onScope?: boolean,
  customSamplingContext?: CustomSamplingContext,
): IdleTransaction {
  const client = getClient();
  const options = (client && client.getOptions && client.getOptions()) || ({} as Options);

  const transactionName = transactionContext.name || transactionContext.op || 'unknown-transaction';
  const samplingContext: SamplingContext = {
    parentSampled: transactionContext.parentSampled,
    transactionContext: { ...transactionContext, name: transactionName },
    name: transactionName,
    ...customSamplingContext,
  };

  let transaction = new IdleTransaction({ ...transactionContext, name: transactionName }, idleTimeout, onScope);
  transaction = sample(transaction, options, samplingContext);
  if (transaction.sampled) {
    const maxSpans = (options as any)._experiments && (options as any)._experiments.maxSpans;
    transaction.initSpanRecorder(maxSpans as number);
    setActiveTransaction(transaction);
  }
  return transaction;
}


/**
 * Legacy no-op kept for backwards compatibility.
 */
export function addTracingExtensions(): void {
  // Tracing helpers are wired up directly; no carrier patching required.
}
