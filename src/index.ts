import './polyfills/urlsearchparams';

export type {
  Breadcrumb,
  BreadcrumbHint,
  SdkInfo,
  Event,
  EventHint,
  Exception,
  StackFrame,
  Stacktrace,
  Thread,
  User,
  Integration,
  SeverityLevel,
} from '@sentry/core';


export {
  addEventProcessor,
  addBreadcrumb,
  captureException,
  captureEvent,
  captureMessage,
  getCurrentScope,
  setContext,
  setExtra,
  setExtras,
  setTag,
  setTags,
  setUser,
  withScope,
  metrics,
} from '@sentry/core';

export {
  registerSpanErrorInstrumentation,
  getActiveSpan,
  getRootSpan,
  startSpan,
  startInactiveSpan,
  startSpanManual,
  withActiveSpan,
  startNewTrace,
  getSpanDescendants,
  setMeasurement,
  getSpanStatusFromHttpCode,
  setHttpStatus,
  makeMultiplexedTransport,
  moduleMetadataIntegration,
  supabaseIntegration,
  instrumentSupabaseClient,
  zodErrorsIntegration,
  thirdPartyErrorFilterIntegration,
  featureFlagsIntegration,
  instrumentAnthropicAiClient,
  instrumentOpenAiClient,
  instrumentGoogleGenAIClient,
  logger,
} from '@sentry/core';

export {
  captureConsoleIntegration,
  extraErrorDataIntegration,
  rewriteFramesIntegration,
  consoleLoggingIntegration,
  createConsolaReporter,
} from '@sentry/core';


export type { Scope } from '@sentry/core';

export { SDK_NAME, SDK_VERSION } from "./version";
export {
  defaultIntegrations,
  init,
  lastEventId,
  showReportDialog,
  flush,
  close,
  wrap
} from "./sdk";
export type { MiniappOptions } from "./backend";
export { MiniappClient, type ReportDialogOptions } from "./client";

// New function-based tracing integration (recommended)
export {
  miniappTracingIntegration,
  startMiniAppTracingNavigationSpan,
  getActiveMiniAppSpan,
  instrumentMiniAppRouter,
  getActiveMiniAppRootSpan,
  type MiniAppTracingIntegrationOptions,
  type MiniAppRoute,
  type MiniAppRouterInstrumentationOptions,
} from "./tracing";


import * as Integrations from "./integrations/index";
import * as Transports from "./transports/index";

export { Integrations, Transports };
