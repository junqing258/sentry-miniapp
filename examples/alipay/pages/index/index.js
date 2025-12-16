import * as Sentry from "../../vender/sentry-miniapp.js";

Page({
  data: {
    motto: "Hello Sentry MiniApp (Alipay)",
  },
  onLoad(query) {
    // 页面加载
    console.info("Page onLoad", query);
    Sentry.addBreadcrumb({
      category: "navigation",
      message: "index.onLoad",
      data: { query },
    });
  },
  onReady() {
    // 页面加载完成
  },
  onShow() {
    // 页面显示
  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
  },
  onPullDownRefresh() {
    // 页面被下拉
  },
  onReachBottom() {
    // 页面被拉到底部
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: "Sentry MiniApp (Alipay)",
      desc: "sentry-miniapp example for Alipay mini-program",
      path: "pages/index/index",
    };
  },

  testError() {
    throw new Error("支付宝小程序：测试错误（同步抛出）");
  },

  testCapture() {
    try {
      throw new Error("支付宝小程序：捕获的错误（captureException）");
    } catch (e) {
      Sentry.captureException(e);
    }
  },

  testAsyncError() {
    setTimeout(() => {
      throw new Error("支付宝小程序：异步错误（setTimeout）");
    }, 500);
  },

  testUnhandledRejection() {
    Promise.reject(new Error("支付宝小程序：未处理的 Promise rejection"));
  },

  testCustomEvent() {
    Sentry.metrics.count("button_click", 1, { tags: { page: "index" } });
    Sentry.captureMessage("支付宝小程序：自定义事件（metrics/message）");
  },

  testRequest() {
    if (typeof my === "undefined" || typeof my.request !== "function") {
      Sentry.captureMessage("my.request 不可用，无法演示请求示例");
      return;
    }

    my.request({
      // 需要在支付宝小程序后台配置 request 合法域名
      url: "https://yourserver.io/api/hello",
      method: "GET",
      success(res) {
        console.log("request success", res);
      },
      fail(err) {
        console.warn("request fail", err);
        Sentry.captureException(err);
      },
    });
  },

  toLogsPage() {
    if (typeof my === "undefined" || typeof my.navigateTo !== "function") return;
    my.navigateTo({ url: "/pages/logs/index" });
  },
});
