import * as Sentry from "./vendor/sentry/index";

Sentry.init({
  dsn: "https://607f106645b6ecb5420e7cf5a44cc90a@o325862.ingest.us.sentry.io/4510430332190720",
  integrations: [
    Sentry.miniappTracingIntegration({
      // 'session' - 整个会话使用同一个 traceId（所有导航共享一个 trace）
      // 'link'    - 每次导航新 traceId，但通过 span link 关联前一个 trace（推荐）
      // 'off'     - 每次导航独立 trace
      traceContinuityMode: "link",
      beforeStartSpan: (options) => ({
        ...options,
        // name: `Custom: ${options.name}`,
      }),
    }),
    Sentry.consoleLoggingIntegration({ levels: ["log", "warn", "error"] }),
  ],
  tracesSampleRate: 1.0,
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
});

App({
  onLaunch(options) {
    // 第一次打开
    // options.query == {number:1}
    console.info("App onLaunch", options);

    Sentry.setTag("miniapp.platform", "alipay");
    if (options) {
      Sentry.setContext("alipay.launch", options);
    }
  },
  onShow(options) {
    // 从后台被 scheme 重新打开
    // options.query == {number:1}
    console.info("App onShow", options);
  },
  onError(error) {
    console.warn("App onError", error);
    // 默认集成会监听 `my.onError` / `my.onUnhandledRejection` 等全局事件，
    // 这里通常不需要再手动调用 `Sentry.captureException`，避免重复上报。
  },
});
