declare var __magic__: any;

(function () {
  if (typeof globalThis === "object") return;
  Object.defineProperty(Object.prototype, "__magic__", {
    get: function () {
      return this;
    },
    configurable: true,
  });
  __magic__.globalThis = __magic__;
  delete (Object.prototype as any).__magic__;
})();

export function getGlobalObject(): any {
  // 尝试获取全局对象
  const globalScope = Function("return this")();

  // 微信小程序环境
  if (globalScope && typeof globalScope.wx !== "undefined" && globalScope.wx) {
    return globalScope.wx;
  }
  // 支付宝小程序环境
  if (globalScope && typeof globalScope.my !== "undefined" && globalScope.my) {
    return globalScope.my;
  }
  // 百度小程序环境
  if (
    globalScope &&
    typeof globalScope.swan !== "undefined" &&
    globalScope.swan
  ) {
    return globalScope.swan;
  }
  // 字节跳动小程序环境
  if (globalScope && typeof globalScope.tt !== "undefined" && globalScope.tt) {
    return globalScope.tt;
  }
  // QQ小程序环境
  if (globalScope && typeof globalScope.qq !== "undefined" && globalScope.qq) {
    return globalScope.qq;
  }
  // 钉钉小程序环境
  if (globalScope && typeof globalScope.dd !== "undefined" && globalScope.dd) {
    return globalScope.dd;
  }
  // 通用全局对象检测
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  // 浏览器环境
  if (typeof window !== "undefined") {
    return window;
  }
  // Node.js 环境
  if (typeof global !== "undefined") {
    return global;
  }
  // Web Worker 环境
  if (typeof self !== "undefined") {
    return self;
  }
  // 返回全局作用域
  return globalScope;
}
