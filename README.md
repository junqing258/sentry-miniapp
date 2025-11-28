# Sentry 小程序 SDK

[![npm version](https://img.shields.io/npm/v/@damenluo/sentry-miniapp.svg)](https://www.npmjs.com/package/@damenluo/sentry-miniapp)
[![npm downloads](https://img.shields.io/npm/dm/@damenluo/sentry-miniapp.svg)](https://www.npmjs.com/package/@damenluo/sentry-miniapp)
[![license](https://img.shields.io/npm/l/@damenluo/sentry-miniapp.svg)](https://github.com/junqing258/sentry-miniapp/blob/master/LICENSE)
[![Sentry](https://img.shields.io/badge/sentry-10.27.0-blueviolet)](https://github.com/getsentry/sentry-javascript)

> 用于小程序/小游戏平台的 Sentry SDK，支持错误监控、性能追踪 (Tracing)、日志记录 (Logger) 和指标收集 (Metrics)。

## ✨ 功能特点

### 平台支持

| 平台 | 错误监控 | Tracing | Logger | Metrics |
|------|:--------:|:-------:|:------:|:-------:|
| 微信小程序 | ✅ | ✅ | ✅ | ✅ |
| 微信小游戏 | ✅ | ✅ | ✅ | ✅ |
| 支付宝小程序 | ✅ | ✅ | ✅ | ✅ |
| 字节跳动小程序 | ✅ | ✅ | ✅ | ✅ |
| 钉钉小程序 | ✅ | ✅ | ✅ | ✅ |
| 百度小程序 | ✅ | ✅ | ✅ | ✅ |

### 核心功能

- **错误监控** - 自动捕获 `onError`、`onUnhandledRejection`、`onPageNotFound`、`onMemoryWarning` 事件
- **性能追踪** - 支持页面加载、导航、网络请求的自动埋点
- **日志记录** - 支持 `Sentry.logger` 结构化日志
- **指标收集** - 支持 `Sentry.metrics` 自定义指标
- **路由追踪** - 自动上报异常发生时的路由栈
- **设备信息** - 自动收集设备、操作系统、应用版本信息
- **框架兼容** - 支持 [Taro](https://taro.aotu.io/)、[uni-app](https://uniapp.dcloud.io/) 等第三方框架
- **模块支持** - 同时支持 `ES Module` 和 `CommonJS`

## 📦 安装

### 方式一：NPM 安装

```bash
npm install @damenluo/sentry-miniapp
```

### 方式二：复制 dist 产物

将 `dist` 目录拷贝到项目中（如 `/libs/sentry/`）。

## 🚀 快速开始

在 `app.js` 或入口文件中初始化：

```ts
import * as Sentry from '@damenluo/sentry-miniapp';
// 或复制方式：import * as Sentry from '@/vendor/sentry-miniapp/index.js';

Sentry.init({
  dsn: 'YOUR_SENTRY_DSN',
  tracesSampleRate: 1.0,
  integrations: [
    Sentry.miniappTracingIntegration({
      traceContinuityMode: 'link',
    }),
  ],
});

// 设置用户信息
Sentry.setUser({ id: '12345' });
Sentry.setTag('environment', 'production');
```

## ⚙️ 配置选项

### 基础配置

| 选项 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `dsn` | `string` | - | Sentry DSN（必填） |
| `tracesSampleRate` | `number` | `0` | 性能追踪采样率 (0-1) |
| `debug` | `boolean` | `false` | 是否开启调试模式 |
| `environment` | `string` | `'production'` | 环境标识 |
| `release` | `string` | - | 版本标识 |

### Tracing 配置

通过 `miniappTracingIntegration` 配置性能追踪：

```ts
Sentry.miniappTracingIntegration({
  // Trace 连续性模式
  // 'session' - 整个会话共享同一个 traceId
  // 'link'    - 每次导航新 traceId，通过 span link 关联（推荐）
  // 'off'     - 每次导航完全独立
  traceContinuityMode: 'link',

  // 继承前一个 trace 的采样决定
  consistentTraceSampling: false,

  // 自动埋点页面加载
  instrumentPageLoad: true,

  // 自动埋点页面导航
  instrumentNavigation: true,

  // Idle span 超时时间 (ms)
  idleTimeout: 1000,

  // 最大 span 持续时间 (ms)
  finalTimeout: 30000,

  // 子 span 超时时间 (ms)
  childSpanTimeout: 15000,

  // 自定义 span 名称
  beforeStartSpan: (options) => ({
    ...options,
    name: `Custom: ${options.name}`,
  }),
});
```

## 📖 API 参考

### 错误捕获

```ts
// 捕获异常
Sentry.captureException(new Error('Something went wrong'));

// 捕获消息
Sentry.captureMessage('User clicked button');

// 捕获自定义事件
Sentry.captureEvent({
  message: 'Custom event',
  level: 'info',
});
```

### 用户上下文

```ts
// 设置用户
Sentry.setUser({ id: '12345', email: 'user@example.com' });

// 设置标签
Sentry.setTag('page', 'home');
Sentry.setTags({ feature: 'checkout', version: '1.0.0' });

// 设置额外数据
Sentry.setExtra('order_id', '98765');
Sentry.setContext('device', { battery: 0.8 });
```

### 面包屑

```ts
Sentry.addBreadcrumb({
  category: 'ui',
  message: 'User clicked checkout button',
  level: 'info',
});
```

### 性能追踪

```ts
// 手动创建 span
Sentry.startSpan({ name: 'fetchData', op: 'http.client' }, async (span) => {
  const data = await fetchData();
  span.setStatus({ code: 1, message: 'ok' });
  return data;
});

// 获取当前活跃 span
const activeSpan = Sentry.getActiveSpan();
```

### 日志记录

```ts
Sentry.logger.info('User logged in', { userId: '12345' });
Sentry.logger.warn('API response slow', { duration: 2000 });
Sentry.logger.error('Payment failed', { orderId: '98765' });
```

### 指标收集

```ts
// 计数器
Sentry.metrics.increment('button_clicks', 1, { tags: { button: 'checkout' } });

// 分布
Sentry.metrics.distribution('api_latency', 150, { unit: 'millisecond' });

// 计量
Sentry.metrics.gauge('active_users', 42);

// 集合
Sentry.metrics.set('unique_users', 'user_123');
```

## 🔧 高级用法

### 自定义 Integrations

```ts
Sentry.init({
  dsn: 'YOUR_DSN',
  integrations: [
    // 自定义控制台捕获
    Sentry.captureConsoleIntegration({ levels: ['error', 'warn'] }),
    // 额外错误数据
    Sentry.extraErrorDataIntegration(),
    // 重写堆栈帧
    Sentry.rewriteFramesIntegration({ root: '/' }),
  ],
});
```

### 作用域管理

```ts
Sentry.withScope((scope) => {
  scope.setTag('transaction', 'payment');
  scope.setLevel('warning');
  Sentry.captureMessage('Payment processing');
});
```

## 📋 更新日志

项目基于 [sentry-miniapp](https://github.com/lizhiyao/sentry-miniapp) 优化，主要改进：

- **fix** - 修复微信小程序异常信息栈解析问题
- **feat** - 新增小程序 Tracing 性能追踪支持
- **feat** - 新增 Logger 结构化日志支持
- **feat** - 新增 Metrics 指标收集支持
- **chore** - 升级 @sentry/core 至 10.27.0
- **chore** - 使用 Vite 优化打包构建

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 License

[BSD-3-Clause](./LICENSE)
