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
} from '@sentry/core';

export type { Scope } from '@sentry/core';
export { configureScope } from './scope';
export { startTransaction } from './tracing/hubextensions';

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

import * as Integrations from "./integrations/index";
import * as Transports from "./transports/index";

export { Integrations, Transports };
