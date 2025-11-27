import { addBreadcrumb } from '@sentry/core';
import { addEventProcessor } from '@sentry/core';
import { BaseTransportOptions } from '@sentry/core';
import { Breadcrumb } from '@sentry/core';
import { BreadcrumbHint } from '@sentry/core';
import { captureConsoleIntegration } from '@sentry/core';
import { captureEvent } from '@sentry/core';
import { captureException } from '@sentry/core';
import { captureMessage } from '@sentry/core';
import { Client } from '@sentry/core';
import { ClientOptions } from '@sentry/core';
import { consoleLoggingIntegration } from '@sentry/core';
import { createConsolaReporter } from '@sentry/core';
import { DsnLike } from '@sentry/core';
import { Event as Event_2 } from '@sentry/core';
import { EventHint } from '@sentry/core';
import { Exception } from '@sentry/core';
import { extraErrorDataIntegration } from '@sentry/core';
import { featureFlagsIntegration } from '@sentry/core';
import { getActiveSpan } from '@sentry/core';
import { getCurrentScope } from '@sentry/core';
import { getRootSpan } from '@sentry/core';
import { getSpanDescendants } from '@sentry/core';
import { getSpanStatusFromHttpCode } from '@sentry/core';
import { instrumentAnthropicAiClient } from '@sentry/core';
import { instrumentGoogleGenAIClient } from '@sentry/core';
import { instrumentOpenAiClient } from '@sentry/core';
import { instrumentSupabaseClient } from '@sentry/core';
import { Integration } from '@sentry/core';
import { logger } from '@sentry/core';
import { makeMultiplexedTransport } from '@sentry/core';
import { metrics } from '@sentry/core';
import { moduleMetadataIntegration } from '@sentry/core';
import { ParameterizedString } from '@sentry/core';
import { registerSpanErrorInstrumentation } from '@sentry/core';
import { rewriteFramesIntegration } from '@sentry/core';
import { Scope } from '@sentry/core';
import { SdkInfo } from '@sentry/core';
import { setContext } from '@sentry/core';
import { setExtra } from '@sentry/core';
import { setExtras } from '@sentry/core';
import { setHttpStatus } from '@sentry/core';
import { setMeasurement } from '@sentry/core';
import { setTag } from '@sentry/core';
import { setTags } from '@sentry/core';
import { setUser } from '@sentry/core';
import { SeverityLevel } from '@sentry/core';
import { Span } from '@sentry/core';
import { StackFrame } from '@sentry/core';
import { Stacktrace } from '@sentry/core';
import { startInactiveSpan } from '@sentry/core';
import { startNewTrace } from '@sentry/core';
import { startSpan } from '@sentry/core';
import { startSpanManual } from '@sentry/core';
import { StartSpanOptions } from '@sentry/core';
import { supabaseIntegration } from '@sentry/core';
import { thirdPartyErrorFilterIntegration } from '@sentry/core';
import { Thread } from '@sentry/core';
import { Transport } from '@sentry/core';
import { User } from '@sentry/core';
import { withActiveSpan } from '@sentry/core';
import { withScope } from '@sentry/core';
import { zodErrorsIntegration } from '@sentry/core';

export { addBreadcrumb }

export { addEventProcessor }

/** Options for adding performance entries */
declare interface AddPerformanceEntriesOptions {
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

export { Breadcrumb }

export { BreadcrumbHint }

export { captureConsoleIntegration }

export { captureEvent }

export { captureException }

export { captureMessage }

/**
 * A promise that resolves when all current events have been sent.
 * If you provide a timeout and the queue takes longer to drain the promise returns false.
 *
 * @param timeout Maximum time in ms the client should wait.
 */
declare function close_2(timeout?: number): PromiseLike<boolean>;
export { close_2 as close }

export { consoleLoggingIntegration }

export { createConsolaReporter }

export declare const defaultIntegrations: (Integration | GlobalHandlers | TryCatch | LinkedErrors | System | Router | IgnoreMpcrawlerErrors)[];

export { Event_2 as Event }

export { EventHint }

export { Exception }

export { extraErrorDataIntegration }

export { featureFlagsIntegration }

/**
 * A promise that resolves when all current events have been sent.
 * If you provide a timeout and the queue takes longer to drain the promise returns false.
 * 在发送所有当前事件时会变为 resolved 状态的 promise。如果提供了一个超时时间并且队列需要更长时间来消耗，则 promise 将返回 false。
 *
 * @param timeout Maximum time in ms the client should wait.
 */
export declare function flush(timeout?: number): PromiseLike<boolean>;

/**
 * Get the currently active root span for miniapp.
 */
export declare function getActiveMiniAppRootSpan(): Span | undefined;

/**
 * Get the currently active idle span for the miniapp.
 */
export declare function getActiveMiniAppSpan(): Span | undefined;

export { getActiveSpan }

export { getCurrentScope }

export { getRootSpan }

export { getSpanDescendants }

export { getSpanStatusFromHttpCode }

/** Global handlers */
declare class GlobalHandlers implements Integration {
    /**
     * @inheritDoc
     */
    static id: string;
    /**
     * @inheritDoc
     */
    name: string;
    /** JSDoc */
    private readonly _options;
    /** JSDoc */
    private _onErrorHandlerInstalled;
    /** JSDoc */
    private _onUnhandledRejectionHandlerInstalled;
    /** JSDoc */
    private _onPageNotFoundHandlerInstalled;
    /** JSDoc */
    private _onMemoryWarningHandlerInstalled;
    /** JSDoc */
    constructor(options?: GlobalHandlersIntegrations);
    /**
     * @inheritDoc
     */
    setupOnce(): void;
    /** JSDoc */
    private _installGlobalOnErrorHandler;
    /** JSDoc */
    private _installGlobalOnUnhandledRejectionHandler;
    /** JSDoc */
    private _installGlobalOnPageNotFoundHandler;
    /** JSDoc */
    private _installGlobalOnMemoryWarningHandler;
}

/** JSDoc */
declare interface GlobalHandlersIntegrations {
    onerror: boolean;
    onunhandledrejection: boolean;
    onpagenotfound: boolean;
    onmemorywarning: boolean;
}

/**
 * IgnoreMpcrawlerErrors
 *
 * https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/sitemap.html
 */
declare class IgnoreMpcrawlerErrors implements Integration {
    /**
     * @inheritDoc
     */
    static id: string;
    /**
     * @inheritDoc
     */
    name: string;
    /**
     * @inheritDoc
     */
    setupOnce(): void;
}

/**
 * The Sentry Miniapp SDK Client.
 *
 * To use this SDK, call the {@link init} function as early as possible when
 * launching the app. To set context information or send manual events, use
 * the provided methods.
 *
 * @example
 * ```
 * import { init } from '@sentry/miniapp';
 *
 * init({
 *   dsn: '__DSN__',
 *   // ...
 * });
 * ```
 *
 * @example
 * ```
 * import { configureScope } from '@sentry/miniapp';
 *
 * configureScope((scope: Scope) => {
 *   scope.setExtra({ battery: 0.7 });
 *   scope.setTag({ user_mode: 'admin' });
 *   scope.setUser({ id: '4711' });
 * });
 * ```
 *
 * @example
 * ```
 * import { addBreadcrumb } from '@sentry/miniapp';
 *
 * addBreadcrumb({
 *   message: 'My Breadcrumb',
 *   // ...
 * });
 * ```
 *
 * @example
 * ```
 * import * as Sentry from '@sentry/miniapp';
 *
 * Sentry.captureMessage('Hello, world!');
 * Sentry.captureException(new Error('Good bye'));
 * Sentry.captureEvent({
 *   message: 'Manual',
 *   stacktrace: [
 *     // ...
 *   ],
 * });
 * ```
 *
 * @see {@link MiniappOptions} for documentation on configuration options.
 */
export declare function init(options?: Partial<MiniappOptions>): void;

export { instrumentAnthropicAiClient }

export { instrumentGoogleGenAIClient }

/**
 * Instrument miniapp router to create navigation spans.
 *
 * This function sets up listeners for miniapp route events:
 * - wx.onAppRoute / wx.onAppRouteDone - Route change events
 * - wx.onBeforePageLoad / wx.onAfterPageLoad - Page lifecycle events
 *
 * Similar to Vue's `instrumentVueRouter`, this separates the routing logic
 * from the tracing integration.
 */
export declare function instrumentMiniAppRouter(options: MiniAppRouterInstrumentationOptions, startNavigationSpan: (context: StartSpanOptions) => void): void;

export { instrumentOpenAiClient }

export { instrumentSupabaseClient }

export { Integration }

declare namespace Integrations {
    export {
        GlobalHandlers,
        TryCatch,
        LinkedErrors,
        System,
        Router,
        IgnoreMpcrawlerErrors
    }
}
export { Integrations }

/**
 * This is the getter for lastEventId. 获取 lastEventId。
 *
 * @returns The last event id of a captured event.
 */
export declare function lastEventId(): string | undefined;

/** Adds SDK info to an event. */
declare class LinkedErrors implements Integration {
    /**
     * @inheritDoc
     */
    static id: string;
    /**
     * @inheritDoc
     */
    readonly name: string;
    /**
     * @inheritDoc
     */
    private readonly _key;
    /**
     * @inheritDoc
     */
    private readonly _limit;
    /**
     * @inheritDoc
     */
    constructor(options?: {
        key?: string;
        limit?: number;
    });
    /**
     * @inheritDoc
     */
    setupOnce(): void;
    /**
     * @inheritDoc
     */
    private _handler;
    /**
     * @inheritDoc
     */
    private _walkErrorTree;
}

export { logger }

declare function makeMiniappTransport(options: BaseTransportOptions): Transport;

export { makeMultiplexedTransport }

export { metrics }

/** Class tracking metrics for MiniApp performance */
declare class MetricsInstrumentation {
    private _reportAllChanges;
    private _measurements;
    private _observer?;
    private _timeOrigin?;
    private _performanceCursor;
    constructor(_reportAllChanges?: boolean);
    /**
     * Add performance entries from the miniapp performance API.
     * Called when the idle span is being ended.
     * Following the pattern from @sentry-internal/browser-utils.
     */
    addPerformanceEntries(span: Span, options?: AddPerformanceEntriesOptions): void;
    /**
     * Legacy method for backward compatibility.
     * @deprecated Use addPerformanceEntries instead.
     */
    addPerformanceEntriesFromSpan(span: Span): void;
    /**
     * Start observing performance entries and create child spans.
     * Should be called when a new route span starts.
     */
    startObserving(parentSpan: Span, options?: AddPerformanceEntriesOptions): void;
    private _getPerformance;
    private _getMiniProgramTimeOrigin;
    private _getTimeOrigin;
    private _shouldIgnoreEntry;
    private _handleEntry;
    /**
     * Add navigation related spans (similar to browser's _addNavigationSpans).
     */
    private _addNavigationSpans;
    /**
     * Add render spans for UI rendering performance.
     */
    private _addRenderSpan;
    /**
     * Add script execution spans.
     */
    private _addScriptSpan;
    /**
     * Add package loading spans.
     */
    private _addPackageSpan;
    /**
     * Add resource loading spans (similar to browser's _addResourceSpans).
     */
    private _addResourceSpan;
    /**
     * Track system information (similar to browser's _trackNavigator).
     */
    private _trackSystemInfo;
    private _recordMeasurements;
    private _measurementKey;
    private _stopObserver;
}

/**
 * The Sentry Miniapp SDK Client.
 *
 * @see MiniappOptions for documentation on configuration options.
 * @see SentryClient for usage documentation.
 */
export declare class MiniappClient extends Client<MiniappOptions> {
    /**
     * Creates a new Miniapp SDK instance.
     *
     * @param options Configuration options for this SDK.
     */
    constructor(options?: Partial<MiniappOptions>);
    /**
     * @inheritDoc
     */
    protected _prepareEvent(event: Event_2, hint: EventHint, currentScope: Scope, isolationScope: Scope): PromiseLike<Event_2 | null>;
    /**
     * Show a report dialog to the user to send feedback to a specific event.
     * 向用户显示报告对话框以将反馈发送到特定事件。---> 小程序上暂时用不到&不考虑。
     *
     * @param options Set individual options for the dialog
     */
    showReportDialog(options?: ReportDialogOptions): void;
    /**
     * @inheritDoc
     */
    eventFromException(exception: unknown, hint?: EventHint): PromiseLike<Event_2>;
    /**
     * @inheritDoc
     */
    eventFromMessage(message: ParameterizedString, level?: SeverityLevel, hint?: EventHint): PromiseLike<Event_2>;
}

/**
 * Configuration options for the Sentry Miniapp SDK.
 */
export declare interface MiniappOptions extends ClientOptions {
    defaultIntegrations?: Integration[];
}

/**
 * Miniapp route information from route events
 */
export declare interface MiniAppRoute {
    /** Page path */
    path: string;
    /** Route path with query string */
    query?: string;
    /** Page scene value */
    scene?: number;
    /** Open type: appLaunch, navigateTo, navigateBack, redirectTo, reLaunch, switchTab, etc. */
    openType?: string;
    /** Whether it's a tab bar page */
    isTabBar?: boolean;
    /** Page webview id */
    webviewId?: number;
}

/**
 * Options for miniapp router instrumentation
 */
export declare interface MiniAppRouterInstrumentationOptions {
    /**
     * What to use for route labels.
     * - 'path': Use the page path directly (e.g., 'pages/index/index')
     *
     * @default 'path'
     */
    routeLabel?: 'path';
    /**
     * If a span should be created on page load.
     * @default true
     */
    instrumentPageLoad?: boolean;
    /**
     * If a span should be created on navigation (route change).
     * @default true
     */
    instrumentNavigation?: boolean;
}

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
export declare function miniappTracingIntegration(options?: MiniAppTracingIntegrationOptions): Integration;

/**
 * Options for MiniApp Tracing integration
 */
export declare interface MiniAppTracingIntegrationOptions extends Partial<RequestInstrumentationOptions>, TraceContinuityOptions, MiniAppRouterInstrumentationOptions {
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
    _metricOptions?: Partial<{
        _reportAllChanges: boolean;
    }>;
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
    /**
     * A callback which is called before a span for a pageload or navigation is started.
     * It receives the options passed to `startSpan`, and expects to return an updated options object.
     */
    beforeStartSpan?: (options: StartSpanOptions) => StartSpanOptions;
}

export { moduleMetadataIntegration }

export { registerSpanErrorInstrumentation }

/**
 * All properties the report dialog supports
 */
export declare interface ReportDialogOptions {
    [key: string]: any;
    eventId?: string;
    dsn?: DsnLike;
    user?: {
        email?: string;
        name?: string;
    };
    lang?: string;
    title?: string;
    subtitle?: string;
    subtitle2?: string;
    labelName?: string;
    labelEmail?: string;
    labelComments?: string;
    labelClose?: string;
    labelSubmit?: string;
    errorGeneric?: string;
    errorFormEntry?: string;
    successMessage?: string;
    /** Callback after reportDialog showed up */
    onLoad?(): void;
}

declare interface RequestInstrumentationOptions {
    traceRequest: boolean;
    shouldCreateSpanForRequest?(url: string): boolean;
}

export { rewriteFramesIntegration }

/** UserAgent */
declare class Router implements Integration {
    /**
     * @inheritDoc
     */
    static id: string;
    /**
     * @inheritDoc
     */
    name: string;
    /** JSDoc */
    private readonly _options;
    /**
     * @inheritDoc
     */
    constructor(options?: RouterIntegrations);
    /**
     * @inheritDoc
     */
    setupOnce(): void;
}

/** JSDoc */
declare interface RouterIntegrations {
    enable?: boolean;
}

export { Scope }

export declare const SDK_NAME = "sentry.javascript.miniapp";

export declare const SDK_VERSION: string;

export { SdkInfo }

export { setContext }

export { setExtra }

export { setExtras }

export { setHttpStatus }

export { setMeasurement }

export { setTag }

export { setTags }

export { setUser }

export { SeverityLevel }

/**
 * Present the user with a report dialog.
 * 向用户显示报告对话框。小程序上暂时不考虑实现该功能。
 *
 * @param options Everything is optional, we try to fetch all info need from the global scope.
 */
export declare function showReportDialog(options?: ReportDialogOptions): void;

declare interface SpanCreationContext {
    idleTimeout: number;
    finalTimeout: number;
    childSpanTimeout: number;
    traceContinuityMode: TraceContinuityMode;
    consistentTraceSampling: boolean;
    beforeStartSpan?: (options: StartSpanOptions) => StartSpanOptions;
    metricsInstrumentation?: MetricsInstrumentation;
    performanceEntriesOptions?: AddPerformanceEntriesOptions;
    latestRoute: {
        name?: string;
        source?: string;
    };
}

export { StackFrame }

export { Stacktrace }

export { startInactiveSpan }

/**
 * Start a navigation span for miniapp tracing.
 * This is the core function that creates idle spans for pageload/navigation.
 */
export declare function startMiniAppTracingNavigationSpan(client: Client, startSpanOptions: StartSpanOptions, context: SpanCreationContext): Span | undefined;

export { startNewTrace }

export { startSpan }

export { startSpanManual }

export { supabaseIntegration }

/** UserAgent */
declare class System implements Integration {
    /**
     * @inheritDoc
     */
    static id: string;
    /**
     * @inheritDoc
     */
    name: string;
    /**
     * @inheritDoc
     */
    setupOnce(): void;
}

export { thirdPartyErrorFilterIntegration }

export { Thread }

/**
 * Trace continuity mode for maintaining trace relationships across navigations.
 *
 * - `'session'`: Keep the same traceId for the entire session. All navigations share one trace.
 * - `'link'`: Each navigation gets a new traceId, but links to the previous trace (recommended).
 * - `'off'`: Each navigation starts a completely independent trace (legacy behavior).
 */
declare type TraceContinuityMode = 'session' | 'link' | 'off';

/**
 * Options for trace continuity behavior.
 */
declare interface TraceContinuityOptions {
    /**
     * How to handle trace continuity across navigations.
     *
     * - `'session'`: Keep the same traceId for the entire session (all navigations share one trace).
     * - `'link'`: Each navigation gets a new traceId but links to previous trace via span links.
     * - `'off'`: Each navigation starts an independent trace (legacy behavior).
     *
     * @default 'link'
     */
    traceContinuityMode?: TraceContinuityMode;
    /**
     * If true, subsequent traces will inherit the sampling decision from the initial trace.
     * This ensures consistent sampling across all traces in a session.
     *
     * Only effective when `traceContinuityMode` is not `'off'`.
     *
     * @default false
     */
    consistentTraceSampling?: boolean;
}

declare namespace Transports {
    export {
        makeMiniappTransport
    }
}
export { Transports }

/** Wrap timer functions and event targets to catch errors and provide better meta data */
declare class TryCatch implements Integration {
    /** JSDoc */
    private _ignoreOnError;
    /**
     * @inheritDoc
     */
    static id: string;
    /**
     * @inheritDoc
     */
    name: string;
    /** JSDoc */
    private _wrapTimeFunction;
    /** JSDoc */
    private _wrapRAF;
    /** JSDoc */
    private _wrapEventTarget;
    /**
     * Wrap timer functions and event targets to catch errors
     * and provide better metadata.
     */
    setupOnce(): void;
}

export { User }

export { withActiveSpan }

export { withScope }

/**
 * Wrap code within a try/catch block so the SDK is able to capture errors.
 * 在 try / catch 块中包装代码，以便 SDK 能够捕获错误。
 * 实际上是 ./helpers 文件中 warp 方法的进一步封装。
 *
 * @param fn A function to wrap.
 *
 * @returns The result of wrapped function call.
 */
export declare function wrap(fn: Function): any;

export { zodErrorsIntegration }

export { }
