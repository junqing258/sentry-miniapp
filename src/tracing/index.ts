// New function-based integration (recommended)
export {
  miniappTracingIntegration,
  startMiniAppTracingNavigationSpan,
  getActiveMiniAppSpan,
  type MiniAppTracingIntegrationOptions,
} from './miniapp/miniappTracingIntegration';

// Router instrumentation (can be used separately)
export {
  instrumentMiniAppRouter,
  getActiveMiniAppRootSpan,
  type MiniAppRoute,
  type MiniAppRouterInstrumentationOptions,
} from './miniapp/router';


// Types
export type { TraceContinuityMode, TraceContinuityOptions } from './types';

// Propagation context utilities
export {
  getPropagationContext,
  setPropagationContext,
  updatePropagationContext,
  resetPropagationContext,
  clearPropagationState,
  type PropagationContext,
  type PreviousTraceInfo,
} from './propagationContext';