# Sentry 小程序 SDK

用于小程序平台的 Sentry SDK


## 功能特点

- [x] 支持 `ES6`、`CommonJS` 两种模块系统（支持小程序原生开发方式、使用小程序框架开发方式两种开发模式下使用）
- [x] 默认监听并上报小程序的 onError、onUnhandledRejection、onPageNotFound、onMemoryWarning 事件返回的信息（各事件支持程度与对应各小程序官方保持一致）
- [x] 默认上报运行小程序的设备、操作系统、应用版本信息
- [x] 支持微信小程序
- [x] 支持微信小游戏
- [x] 支持字节跳动小程序
- [x] 支持支付宝小程序
- [x] 支持钉钉小程序
- [x] 支持百度小程序
- [x] 支持在 [Taro](https://taro.aotu.io/) 等第三方小程序框架中使用
- [x] 默认上报异常发生时的路由栈

## 用法

将dist产物拷贝到项目中（如 /sentry-miniapp/index.js），在 app.js 中引用并初始化 Sentry，根据实际需求设置上报到 Sentry 的元信息

```ts
import * as Sentry from "@/sentry-miniapp/index.js";

// init Sentry
// init options: https://github.com/getsentry/sentry-javascript/blob/master/packages/types/src/options.ts
Sentry.init({
  dsn: "__DSN__",
  // ...
});

// Set user information, as well as tags and further extras
Sentry.configureScope((scope) => {
  scope.setExtra("battery", 0.7);
  scope.setTag("user_mode", "admin");
  scope.setUser({ id: "4711" });
  // scope.clear();
});

// Add a breadcrumb for future events
Sentry.addBreadcrumb({
  message: "My Breadcrumb",
  // ...
});

// Capture exceptions, messages or manual events
Sentry.captureException(new Error("Good bye"));
Sentry.captureMessage("Hello, world!");
Sentry.captureEvent({
  message: "Manual",
  stacktrace: [
    // ...
  ],
});

```


## 鸣谢

项目基于[sentry-miniapp](https://github.com/lizhiyao/sentry-miniapp) 基础上优化，主要做了如下工作:

1. **fix:**  微信小程序异常信息栈的解析
2. **chore:** 升级 sentry 核心依赖至 10.27.0
3. **feat:** 增加小程序Transaction性能指标
4. **chore:** 用 Vite 优化打包
