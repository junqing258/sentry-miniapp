import { addBreadcrumb } from '@sentry/core';
import { addEventProcessor } from '@sentry/core';
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
import { getActiveMiniAppRootSpan } from './tracing';
import { getActiveMiniAppSpan } from './tracing';
import { getActiveSpan } from '@sentry/core';
import { getCurrentScope } from '@sentry/core';
import { getRootSpan } from '@sentry/core';
import { getSpanDescendants } from '@sentry/core';
import { getSpanStatusFromHttpCode } from '@sentry/core';
import { GlobalHandlers } from './integrations/index';
import { IgnoreMpcrawlerErrors } from './integrations/index';
import { instrumentAnthropicAiClient } from '@sentry/core';
import { instrumentGoogleGenAIClient } from '@sentry/core';
import { instrumentMiniAppRouter } from './tracing';
import { instrumentOpenAiClient } from '@sentry/core';
import { instrumentSupabaseClient } from '@sentry/core';
import { Integration } from '@sentry/core';
import * as Integrations from './integrations/index';
import { LinkedErrors } from './integrations/index';
import { logger } from '@sentry/core';
import { makeMultiplexedTransport } from '@sentry/core';
import { metrics } from '@sentry/core';
import { MiniAppRoute } from './tracing';
import { MiniAppRouterInstrumentationOptions } from './tracing';
import { miniappTracingIntegration } from './tracing';
import { MiniAppTracingIntegrationOptions } from './tracing';
import { moduleMetadataIntegration } from '@sentry/core';
import { ParameterizedString } from '@sentry/core';
import { registerSpanErrorInstrumentation } from '@sentry/core';
import { rewriteFramesIntegration } from '@sentry/core';
import { Router } from './integrations/index';
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
import { StackFrame } from '@sentry/core';
import { Stacktrace } from '@sentry/core';
import { startInactiveSpan } from '@sentry/core';
import { startMiniAppTracingNavigationSpan } from './tracing';
import { startNewTrace } from '@sentry/core';
import { startSpan } from '@sentry/core';
import { startSpanManual } from '@sentry/core';
import { supabaseIntegration } from '@sentry/core';
import { System } from './integrations/index';
import { thirdPartyErrorFilterIntegration } from '@sentry/core';
import { Thread } from '@sentry/core';
import * as Transports from './transports/index';
import { TryCatch } from './integrations/index';
import { User } from '@sentry/core';
import { withActiveSpan } from '@sentry/core';
import { withScope } from '@sentry/core';
import { zodErrorsIntegration } from '@sentry/core';

export { addBreadcrumb }

export { addEventProcessor }

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

export { getActiveMiniAppRootSpan }

export { getActiveMiniAppSpan }

export { getActiveSpan }

export { getCurrentScope }

export { getRootSpan }

export { getSpanDescendants }

export { getSpanStatusFromHttpCode }

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

export { instrumentMiniAppRouter }

export { instrumentOpenAiClient }

export { instrumentSupabaseClient }

export { Integration }

export { Integrations }

/**
 * This is the getter for lastEventId. 获取 lastEventId。
 *
 * @returns The last event id of a captured event.
 */
export declare function lastEventId(): string | undefined;

export { logger }

export { makeMultiplexedTransport }

export { metrics }

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

export { MiniAppRoute }

export { MiniAppRouterInstrumentationOptions }

export { miniappTracingIntegration }

export { MiniAppTracingIntegrationOptions }

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

export { rewriteFramesIntegration }

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

export { StackFrame }

export { Stacktrace }

export { startInactiveSpan }

export { startMiniAppTracingNavigationSpan }

export { startNewTrace }

export { startSpan }

export { startSpanManual }

export { supabaseIntegration }

export { thirdPartyErrorFilterIntegration }

export { Thread }

export { Transports }

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
