import {
  SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN,
  SEMANTIC_ATTRIBUTE_SENTRY_SOURCE,
  SEMANTIC_ATTRIBUTE_SENTRY_IDLE_SPAN_FINISH_REASON,
  getActiveSpan,
  getCurrentScope,
  getRootSpan,
  spanToJSON,
  debug,
  GLOBAL_OBJ,
  timestampInSeconds,
} from '@sentry/core';
import type { Span, SpanAttributes, StartSpanOptions, TransactionSource } from '@sentry/core';
import { sdk } from '../../crossPlatform';
import { IS_DEBUG_BUILD } from '../flags';

/**
 * 
 * 小程序路由事件
 * https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/route-event-listener.html
 */

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
  /** Route event ID for correlating route events (from wx.onBeforeAppRoute etc.) */
  routeEventId?: string;
  /** Timestamp from route event */
  timeStamp?: number;
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

  /**
   * Whether to end the span when route completes (onAppRoute).
   * - true: End span when page onShow completes (onBeforeAppRoute -> onAppRoute)
   * - false: Use idle span behavior, wait for page to become idle (includes subsequent requests)
   *
   * @default true
   */
  endSpanOnRouteComplete?: boolean;
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
    routeEventId: options?.routeEventId,
    timeStamp: options?.timeStamp,
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
 * Context for tracking pending route events
 */
interface PendingRouteContext {
  route: MiniAppRoute;
  startTime: number;
  isPageLoad: boolean;
}

/**
 * Instrument miniapp router to create navigation spans.
 *
 * This function sets up listeners for miniapp route events:
 * - wx.onBeforeAppRoute - Route start (use for accurate timing start)
 * - wx.onAppRoute / wx.onAppRouteDone - Route change events
 * - wx.onBeforePageLoad / wx.onAfterPageLoad - Page lifecycle events
 *
 * Uses routeEventId to correlate route events for accurate timing.
 *
 * Similar to Vue's `instrumentVueRouter`, this separates the routing logic
 * from the tracing integration.
 */
export function instrumentMiniAppRouter(
  options: MiniAppRouterInstrumentationOptions,
  startNavigationSpan: (context: StartSpanOptions) => void,
): void {
  const { instrumentPageLoad = true, instrumentNavigation = true, endSpanOnRouteComplete = true } = options;

  const globalObj = GLOBAL_OBJ as { wx?: any; my?: any; getCurrentPages?: () => any[] };
  const miniappGlobal = globalObj.wx || globalObj.my;

  if (!miniappGlobal) {
    IS_DEBUG_BUILD && debug.warn('[MiniAppTracing] No miniapp global object found');
    return;
  }

  // Try to get route event listeners from sdk or global
  // New APIs (基础库 3.5.5+)
  const onBeforeAppRoute = (sdk as any).onBeforeAppRoute || miniappGlobal.onBeforeAppRoute;
  const onAppRoute = (sdk as any).onAppRoute || miniappGlobal.onAppRoute;
  const onAppRouteDone = (sdk as any).onAppRouteDone || miniappGlobal.onAppRouteDone;
  const onBeforePageLoad = (sdk as any).onBeforePageLoad || miniappGlobal.onBeforePageLoad;
  const onAfterPageLoad = (sdk as any).onAfterPageLoad || miniappGlobal.onAfterPageLoad;

  // Check if new route event APIs are available
  const hasNewRouteEventAPI = typeof onBeforeAppRoute === 'function';

  if (!hasNewRouteEventAPI && typeof onAppRoute !== 'function') {
    IS_DEBUG_BUILD && debug.warn('[MiniAppTracing] No route event API available');
    return;
  }

  let isFirstRoute = true;
  let hasHandledPageLoad = false;

  // Store pending route contexts by routeEventId
  const pendingRoutes = new Map<string, PendingRouteContext>();

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

  // Use new route event API for accurate timing if available
  if (hasNewRouteEventAPI) {
    IS_DEBUG_BUILD && debug.log('[MiniAppTracing] Using new route event API (onBeforeAppRoute)');

    // Start timing when route begins (before page lifecycle)
    onBeforeAppRoute((eventOptions: any) => {
      const route = normalizeRouteInfo(eventOptions);
      const routeEventId = route.routeEventId;
      const startTime = route.timeStamp ? route.timeStamp / 1000 : timestampInSeconds();

      IS_DEBUG_BUILD && debug.log('[MiniAppTracing] onBeforeAppRoute:', route.path, 'routeEventId:', routeEventId);

      // Determine if this is pageload or navigation
      const isPageLoad = !hasHandledPageLoad && isPageLoadNavigation(route.openType, isFirstRoute);

      if (isFirstRoute) {
        isFirstRoute = false;
      }

      // Skip if this route type shouldn't be instrumented
      if ((isPageLoad && !instrumentPageLoad) || (!isPageLoad && !instrumentNavigation)) {
        return;
      }

      // Store pending route context for correlation
      if (routeEventId) {
        pendingRoutes.set(routeEventId, {
          route,
          startTime,
          isPageLoad,
        });
      }

      // Start navigation span immediately with accurate start time
      if (isPageLoad && instrumentPageLoad) {
        hasHandledPageLoad = true;
        handlePageLoad(route, startNavigationSpan, startTime);
      } else if (instrumentNavigation && hasHandledPageLoad) {
        handleNavigation(route, startNavigationSpan, startTime);
      }
    });

    // End span on onAppRoute (page onShow completed)
    if (typeof onAppRoute === 'function') {
      onAppRoute((eventOptions: any) => {
        const route = normalizeRouteInfo(eventOptions);
        const routeEventId = route.routeEventId;
        const endTime = route.timeStamp ? route.timeStamp / 1000 : timestampInSeconds();

        IS_DEBUG_BUILD && debug.log('[MiniAppTracing] onAppRoute:', route.path, 'routeEventId:', routeEventId);

        // Get active span and add route timing
        const activeRootSpan = getActiveRootSpan();

        if (routeEventId) {
          const pendingContext = pendingRoutes.get(routeEventId);
          if (pendingContext) {
            const routeDuration = (endTime - pendingContext.startTime) * 1000; // ms

            // Add route timing to active span
            if (activeRootSpan) {
              activeRootSpan.setAttribute('miniapp.route_duration_ms', routeDuration);
              activeRootSpan.setAttribute('miniapp.route_event_id', routeEventId);
            }

            IS_DEBUG_BUILD && debug.log(`[MiniAppTracing] Route completed: ${route.path}, duration: ${routeDuration.toFixed(2)}ms`);

            // Clean up pending context
            pendingRoutes.delete(routeEventId);
          }
        }

        // End the span with accurate end time when page onShow completes
        if (endSpanOnRouteComplete && activeRootSpan && !spanToJSON(activeRootSpan).timestamp) {
          activeRootSpan.setAttribute(SEMANTIC_ATTRIBUTE_SENTRY_IDLE_SPAN_FINISH_REASON, 'routeComplete');
          activeRootSpan.end(endTime);
          IS_DEBUG_BUILD && debug.log(`[MiniAppTracing] Ended span on onAppRoute: ${route.path}`);
        }
      });
    }

    // Optional: onAppRouteDone for logging
    if (typeof onAppRouteDone === 'function') {
      onAppRouteDone((eventOptions: any) => {
        IS_DEBUG_BUILD && debug.log('[MiniAppTracing] onAppRouteDone:', eventOptions?.path);
      });
    }
  } else {
    // Fallback to legacy API (onAppRoute only)
    IS_DEBUG_BUILD && debug.log('[MiniAppTracing] Using legacy route event API (onAppRoute)');

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

    // Optional: Use onAppRouteDone for logging
    if (typeof onAppRouteDone === 'function') {
      onAppRouteDone((eventOptions: any) => {
        IS_DEBUG_BUILD && debug.log('[MiniAppTracing] Route done:', eventOptions?.path);
      });
    }
  }

  // Optional: Page load lifecycle events for additional metrics
  if (typeof onBeforePageLoad === 'function') {
    onBeforePageLoad((eventOptions: any) => {
      IS_DEBUG_BUILD && debug.log('[MiniAppTracing] onBeforePageLoad:', eventOptions?.path);
    });
  }

  if (typeof onAfterPageLoad === 'function') {
    onAfterPageLoad((eventOptions: any) => {
      IS_DEBUG_BUILD && debug.log('[MiniAppTracing] onAfterPageLoad:', eventOptions?.path);
    });
  }
}

/**
 * Handle page load - update existing pageload span or create new one
 * @param route - Route information
 * @param startNavigationSpan - Function to start navigation span
 * @param startTime - Optional start time from onBeforeAppRoute for accurate timing
 */
function handlePageLoad(
  route: MiniAppRoute,
  startNavigationSpan: (context: StartSpanOptions) => void,
  startTime?: number,
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

    const spanOptions: StartSpanOptions = {
      name,
      op: 'pageload',
      attributes,
    };

    // Use accurate start time from onBeforeAppRoute if available
    if (startTime !== undefined) {
      spanOptions.startTime = startTime;
    }

    startNavigationSpan(spanOptions);

    IS_DEBUG_BUILD && debug.log(`[MiniAppTracing] Created pageload span: ${name}${startTime ? ' (with accurate timing)' : ''}`);
  }
}

/**
 * Handle navigation - create new navigation span
 * @param route - Route information
 * @param startNavigationSpan - Function to start navigation span
 * @param startTime - Optional start time from onBeforeAppRoute for accurate timing
 */
function handleNavigation(
  route: MiniAppRoute,
  startNavigationSpan: (context: StartSpanOptions) => void,
  startTime?: number,
): void {
  const { name, source } = getTransactionName(route);
  const attributes = buildSpanAttributes(route, 'auto.navigation.miniapp');
  attributes[SEMANTIC_ATTRIBUTE_SENTRY_SOURCE] = source;

  getCurrentScope().setTransactionName(name);

  const spanOptions: StartSpanOptions = {
    name,
    op: 'navigation',
    attributes,
  };

  // Use accurate start time from onBeforeAppRoute if available
  if (startTime !== undefined) {
    spanOptions.startTime = startTime;
  }

  startNavigationSpan(spanOptions);

  IS_DEBUG_BUILD && debug.log(`[MiniAppTracing] Created navigation span: ${name}${startTime ? ' (with accurate timing)' : ''}`);
}

/**
 * Get the currently active root span for miniapp.
 */
export function getActiveMiniAppRootSpan(): Span | undefined {
  return getActiveRootSpan();
}
