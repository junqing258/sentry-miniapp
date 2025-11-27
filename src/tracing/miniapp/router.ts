import {
  SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN,
  SEMANTIC_ATTRIBUTE_SENTRY_SOURCE,
  getActiveSpan,
  getCurrentScope,
  getRootSpan,
  spanToJSON,
  debug,
  GLOBAL_OBJ,
} from '@sentry/core';
import type { Span, SpanAttributes, StartSpanOptions, TransactionSource } from '@sentry/core';
import { sdk } from '../../crossPlatform';
import { IS_DEBUG_BUILD } from '../flags';

/**
 * Miniapp route information from route events
 */
export interface MiniAppRoute {
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
export interface MiniAppRouterInstrumentationOptions {
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
 * Get active root span that is a pageload or navigation span
 */
function getActiveRootSpan(): Span | undefined {
  const span = getActiveSpan();
  const rootSpan = span && getRootSpan(span);

  if (!rootSpan) {
    return undefined;
  }

  const op = spanToJSON(rootSpan).op;
  return op === 'navigation' || op === 'pageload' ? rootSpan : undefined;
}

/**
 * Determine transaction name from route
 */
function getTransactionName(route: MiniAppRoute): { name: string; source: TransactionSource } {
  // Use path as the transaction name
  const path = route.path || 'unknown';
  return { name: path, source: 'url' };
}

/**
 * Build span attributes from route info
 */
function buildSpanAttributes(route: MiniAppRoute, origin: string): SpanAttributes {
  const attributes: SpanAttributes = {
    [SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: origin,
  };

  if (route.openType) {
    attributes['miniapp.open_type'] = route.openType;
  }

  if (route.scene !== undefined) {
    attributes['miniapp.scene'] = route.scene;
  }

  if (route.isTabBar !== undefined) {
    attributes['miniapp.is_tabbar'] = route.isTabBar;
  }

  if (route.webviewId !== undefined) {
    attributes['miniapp.webview_id'] = route.webviewId;
  }

  if (route.query) {
    attributes['miniapp.query'] = route.query;
  }

  return attributes;
}

/**
 * Normalize route info from different event payloads
 */
function normalizeRouteInfo(options: any): MiniAppRoute {
  return {
    path: options?.path || options?.route || options?.url || 'unknown-route',
    query: options?.query,
    scene: options?.scene,
    openType: options?.openType,
    isTabBar: options?.isTabBar,
    webviewId: options?.webviewId,
  };
}

/**
 * Check if this is a page load navigation (first navigation or app launch)
 */
function isPageLoadNavigation(openType?: string, isFirstRoute: boolean = false): boolean {
  // App launch is always a page load
  if (openType === 'appLaunch') {
    return true;
  }

  // First route event is considered page load if SDK initialized after page already loaded
  if (isFirstRoute) {
    return true;
  }

  return false;
}

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
export function instrumentMiniAppRouter(
  options: MiniAppRouterInstrumentationOptions,
  startNavigationSpan: (context: StartSpanOptions) => void,
): void {
  const { instrumentPageLoad = true, instrumentNavigation = true } = options;

  const globalObj = GLOBAL_OBJ as { wx?: any; my?: any; getCurrentPages?: () => any[] };
  const miniappGlobal = globalObj.wx || globalObj.my;

  if (!miniappGlobal) {
    IS_DEBUG_BUILD && debug.warn('[MiniAppTracing] No miniapp global object found');
    return;
  }

  // Try to get onAppRoute from sdk or global
  const onAppRoute = (sdk as any).onAppRoute || miniappGlobal.onAppRoute;
  const onAppRouteDone = (sdk as any).onAppRouteDone || miniappGlobal.onAppRouteDone;
  const onBeforePageLoad = (sdk as any).onBeforePageLoad || miniappGlobal.onBeforePageLoad;
  const onAfterPageLoad = (sdk as any).onAfterPageLoad || miniappGlobal.onAfterPageLoad;

  if (typeof onAppRoute !== 'function') {
    IS_DEBUG_BUILD && debug.warn('[MiniAppTracing] onAppRoute not available');
    return;
  }

  let isFirstRoute = true;
  let hasHandledPageLoad = false;

  // Handle SDK initialized after page already loaded
  if (instrumentPageLoad && typeof globalObj.getCurrentPages === 'function') {
    const pages = globalObj.getCurrentPages() || [];
    const currentPage = pages[pages.length - 1];

    if (currentPage?.route) {
      hasHandledPageLoad = true;
      isFirstRoute = false;

      const route: MiniAppRoute = {
        path: currentPage.route,
        openType: 'appLaunch',
      };

      handlePageLoad(route, startNavigationSpan);
    }
  }

  // Listen to route events
  onAppRoute((eventOptions: any) => {
    const route = normalizeRouteInfo(eventOptions);

    // Determine if this is pageload or navigation
    const isPageLoad = !hasHandledPageLoad && isPageLoadNavigation(route.openType, isFirstRoute);

    if (isFirstRoute) {
      isFirstRoute = false;
    }

    if (isPageLoad && instrumentPageLoad) {
      hasHandledPageLoad = true;
      handlePageLoad(route, startNavigationSpan);
      return;
    }

    // Handle navigation
    if (instrumentNavigation && hasHandledPageLoad) {
      handleNavigation(route, startNavigationSpan);
    }
  });

  // Optional: Use onAppRouteDone for more accurate timing
  if (typeof onAppRouteDone === 'function') {
    onAppRouteDone((eventOptions: any) => {
      IS_DEBUG_BUILD && debug.log('[MiniAppTracing] Route done:', eventOptions?.path);
      // Can be used to mark route transition complete
    });
  }

  // Optional: Page load lifecycle events
  if (typeof onBeforePageLoad === 'function') {
    onBeforePageLoad((eventOptions: any) => {
      IS_DEBUG_BUILD && debug.log('[MiniAppTracing] Before page load:', eventOptions?.path);
    });
  }

  if (typeof onAfterPageLoad === 'function') {
    onAfterPageLoad((eventOptions: any) => {
      IS_DEBUG_BUILD && debug.log('[MiniAppTracing] After page load:', eventOptions?.path);
    });
  }
}

/**
 * Handle page load - update existing pageload span or create new one
 */
function handlePageLoad(
  route: MiniAppRoute,
  startNavigationSpan: (context: StartSpanOptions) => void,
): void {
  const { name, source } = getTransactionName(route);
  const attributes = buildSpanAttributes(route, 'auto.pageload.miniapp');
  attributes[SEMANTIC_ATTRIBUTE_SENTRY_SOURCE] = source;

  // Check if there's already an active pageload span
  const activeRootSpan = getActiveRootSpan();

  if (activeRootSpan) {
    const existingAttributes = spanToJSON(activeRootSpan).data || {};

    // Update the existing span with route info if not custom source
    if (existingAttributes[SEMANTIC_ATTRIBUTE_SENTRY_SOURCE] !== 'custom') {
      activeRootSpan.updateName(name);
      activeRootSpan.setAttribute(SEMANTIC_ATTRIBUTE_SENTRY_SOURCE, source);
    }

    // Add route-specific attributes
    activeRootSpan.setAttributes(attributes);

    IS_DEBUG_BUILD && debug.log(`[MiniAppTracing] Updated pageload span: ${name}`);
  } else {
    // Create new pageload span
    getCurrentScope().setTransactionName(name);

    startNavigationSpan({
      name,
      op: 'pageload',
      attributes,
    });

    IS_DEBUG_BUILD && debug.log(`[MiniAppTracing] Created pageload span: ${name}`);
  }
}

/**
 * Handle navigation - create new navigation span
 */
function handleNavigation(
  route: MiniAppRoute,
  startNavigationSpan: (context: StartSpanOptions) => void,
): void {
  const { name, source } = getTransactionName(route);
  const attributes = buildSpanAttributes(route, 'auto.navigation.miniapp');
  attributes[SEMANTIC_ATTRIBUTE_SENTRY_SOURCE] = source;

  getCurrentScope().setTransactionName(name);

  startNavigationSpan({
    name,
    op: 'navigation',
    attributes,
  });

  IS_DEBUG_BUILD && debug.log(`[MiniAppTracing] Created navigation span: ${name}`);
}

/**
 * Get the currently active root span for miniapp.
 */
export function getActiveMiniAppRootSpan(): Span | undefined {
  return getActiveRootSpan();
}
