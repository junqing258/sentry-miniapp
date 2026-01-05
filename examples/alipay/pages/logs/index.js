import * as Sentry from "../../vendor/sentry/index";

Page({
  data: {
    title: "Logs Page",
  },

  onLoad(query) {
    console.info("Logs onLoad", query);
    Sentry.addBreadcrumb({
      category: "navigation",
      message: "logs.onLoad",
      data: { query },
    });
  },

  back() {
    if (typeof my === "undefined" || typeof my.navigateBack !== "function") return;
    my.navigateBack();
  },

  testMessage() {
    Sentry.captureMessage("支付宝小程序：logs 页面 message");
  },

  testSpan() {
    if (typeof Sentry.startSpanManual === "function") {
      Sentry.startSpanManual({ name: "manual_work", op: "task" }, (_span, finish) => {
        setTimeout(() => {
          console.log("manual_work done");
          finish();
        }, 300);
      });
      return;
    }

    if (typeof Sentry.startSpan !== "function") {
      Sentry.captureMessage("startSpan/startSpanManual 不可用");
      return;
    }

    Sentry.startSpan({ name: "manual_work", op: "task" }, () => {
      const start = Date.now();
      while (Date.now() - start < 50) { }
    });
  },

  testError() {
    throw new Error("支付宝小程序：logs 页面错误");
  },
});
