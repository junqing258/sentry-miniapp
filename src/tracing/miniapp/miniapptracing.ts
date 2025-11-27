
import { Integration, debug } from '@sentry/core';
import { addTracingExtensions, startIdleTransaction, type StartTransactionOptions } from '../hubextensions';
import { MetricsInstrumentation } from './metrics';
import { instrumentRoutingWithDefaults } from './router';
import {
  defaultRequestInstrumentationOptions,
  // instrumentOutgoingRequests,
  RequestInstrumentationOptions,
} from './request';
import { sdk } from '../../crossPlatform';
import { getActiveTransaction, secToMs } from '../utils';
import type { TransactionContext, TraceContinuityOptions } from '../types';
import { IdleTransaction } from '../idletransaction';
import { IS_DEBUG_BUILD } from '../flags';

const DEFAULT_MAX_TRANSACTION_DURATION_SECONDS = 600;


export interface MiniAppTracingOptions extends RequestInstrumentationOptions, TraceContinuityOptions {
  idleTimeout: number;
  startTransactionOnLocationChange: boolean;
  startTransactionOnPageLoad: boolean;
  maxTransactionDuration: number;
  _metricOptions?: Partial<{ _reportAllChanges: boolean }>;
  beforeNavigate?(context: TransactionContext): TransactionContext | undefined;
  routingInstrumentation<T extends IdleTransaction>(
    customStartTransaction: (context: TransactionContext) => T | undefined,
    startTransactionOnPageLoad?: boolean,
    startTransactionOnLocationChange?: boolean,
  ): void;
}

const DEFAULT_MINIAPP_TRACING_OPTIONS: MiniAppTracingOptions = {
  idleTimeout: 5000,
  startTransactionOnLocationChange: true,
  startTransactionOnPageLoad: true,
  maxTransactionDuration: DEFAULT_MAX_TRANSACTION_DURATION_SECONDS,
  routingInstrumentation: instrumentRoutingWithDefaults,
  // Default to 'link' mode for better trace continuity while maintaining separate traces
  traceContinuityMode: 'link',
  consistentTraceSampling: false,
  ...defaultRequestInstrumentationOptions,
};

export class MiniAppTracing implements Integration {
  /**
   * @inheritDoc
   */
  public static id: string = 'MiniAppTracing';
  /**
   * @inheritDoc
   */
  public name: string = MiniAppTracing.id;

  public options: MiniAppTracingOptions;

  private readonly _metrics: MetricsInstrumentation;

  private readonly _configuredIdleTimeout: number | undefined;

  public constructor(_options?: Partial<MiniAppTracingOptions>) {
    addTracingExtensions();

    this._configuredIdleTimeout = _options?.idleTimeout;
    this.options = {
      ...DEFAULT_MINIAPP_TRACING_OPTIONS,
      ..._options,
    };

    const { _metricOptions } = this.options;
    this._metrics = new MetricsInstrumentation(_metricOptions && _metricOptions._reportAllChanges);
  }

  public setupOnce(): void {
    const {
      routingInstrumentation,
      startTransactionOnLocationChange,
      startTransactionOnPageLoad,
      // traceRequest,
      // shouldCreateSpanForRequest,
    } = this.options;

    routingInstrumentation(
      (context: TransactionContext) => this._createRouteTransaction(context),
      startTransactionOnPageLoad,
      startTransactionOnLocationChange,
    );

    // instrumentOutgoingRequests({ traceRequest, shouldCreateSpanForRequest });

    sdk.onAppHide?.(() => {
      const active = getActiveTransaction();
      active?.finish();
    });
  }

  /** Create routing idle transaction. */
  private _createRouteTransaction(context: TransactionContext): IdleTransaction | undefined {
    const { 
      beforeNavigate, 
      idleTimeout, 
      maxTransactionDuration,
      traceContinuityMode,
      consistentTraceSampling,
    } = this.options;

    const expandedContext: TransactionContext = {
      ...context,
      trimEnd: true,
    };
    const modifiedContext = typeof beforeNavigate === 'function' ? beforeNavigate(expandedContext) : expandedContext;

    if (modifiedContext === undefined) {
      return undefined;
    }

    // Build trace options for continuity
    const traceOptions: StartTransactionOptions = {
      traceContinuityMode: traceContinuityMode ?? 'link',
      consistentTraceSampling: consistentTraceSampling ?? false,
    };

    IS_DEBUG_BUILD && debug.log(
      `[MiniAppTracing] Creating route transaction with traceContinuityMode=${traceOptions.traceContinuityMode}`,
    );

    const idleTransaction = startIdleTransaction(
      modifiedContext, 
      idleTimeout, 
      true, 
      {},
      traceOptions,
    );

    idleTransaction.registerBeforeFinishCallback((transaction, endTimestamp) => {
      adjustTransactionDuration(secToMs(maxTransactionDuration), transaction, endTimestamp);
    });

    idleTransaction.setTag('idleTimeout', this._configuredIdleTimeout ?? idleTimeout);
    idleTransaction.setTag('traceContinuityMode', traceContinuityMode ?? 'link');
    this._metrics.addPerformanceEntries(idleTransaction);

    return idleTransaction;
  }
}

/** Adjusts transaction value based on max transaction duration */
function adjustTransactionDuration(maxDuration: number, transaction: IdleTransaction, endTimestamp: number): void {
  const diff = endTimestamp - transaction.startTimestamp;
  const isOutdatedTransaction = endTimestamp && (diff > maxDuration || diff < 0);
  if (isOutdatedTransaction) {
    transaction.setStatus('deadline_exceeded');
    transaction.setTag('maxTransactionDurationExceeded', 'true');
  }
}
