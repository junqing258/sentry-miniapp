var Ui = Object.defineProperty, Bi = Object.defineProperties;
var Gi = Object.getOwnPropertyDescriptors;
var Vt = Object.getOwnPropertySymbols;
var lr = Object.prototype.hasOwnProperty, fr = Object.prototype.propertyIsEnumerable;
var Je = (e, t) => (t = Symbol[e]) ? t : Symbol.for("Symbol." + e);
var ur = (e, t, n) => t in e ? Ui(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, l = (e, t) => {
  for (var n in t || (t = {}))
    lr.call(t, n) && ur(e, n, t[n]);
  if (Vt)
    for (var n of Vt(t))
      fr.call(t, n) && ur(e, n, t[n]);
  return e;
}, S = (e, t) => Bi(e, Gi(t));
var Xt = (e, t) => {
  var n = {};
  for (var r in e)
    lr.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && Vt)
    for (var r of Vt(e))
      t.indexOf(r) < 0 && fr.call(e, r) && (n[r] = e[r]);
  return n;
};
var w = (e, t, n) => new Promise((r, s) => {
  var i = (c) => {
    try {
      a(n.next(c));
    } catch (u) {
      s(u);
    }
  }, o = (c) => {
    try {
      a(n.throw(c));
    } catch (u) {
      s(u);
    }
  }, a = (c) => c.done ? r(c.value) : Promise.resolve(c.value).then(i, o);
  a((n = n.apply(e, t)).next());
}), z = function(e, t) {
  this[0] = e, this[1] = t;
}, Zt = (e, t, n) => {
  var r = (o, a, c, u) => {
    try {
      var f = n[o](a), p = (a = f.value) instanceof z, m = f.done;
      Promise.resolve(p ? a[0] : a).then((d) => p ? r(o === "return" ? o : "next", a[1] ? { done: d.done, value: d.value } : d, c, u) : c({ value: d, done: m })).catch((d) => r("throw", d, c, u));
    } catch (d) {
      u(d);
    }
  }, s = (o) => i[o] = (a) => new Promise((c, u) => r(o, a, c, u)), i = {};
  return n = n.apply(e, t), i[Je("asyncIterator")] = () => i, s("next"), s("throw"), s("return"), i;
};
var Qt = (e, t, n) => (t = e[Je("asyncIterator")]) ? t.call(e) : (e = e[Je("iterator")](), t = {}, n = (r, s) => (s = e[r]) && (t[r] = (i) => new Promise((o, a, c) => (i = s.call(e, i), c = i.done, Promise.resolve(i.value).then((u) => o({ value: u, done: c }), a)))), n("next"), n("return"), t);
const dr = (
  // eslint-disable-next-line no-undef
  typeof globalThis != "undefined" && globalThis || // eslint-disable-next-line no-undef
  typeof self != "undefined" && self || // eslint-disable-next-line no-undef
  typeof window != "undefined" && window || // eslint-disable-next-line no-undef
  typeof global != "undefined" && global || {}
);
class Hi {
  constructor(t) {
    if (this._entries = [], !!t) {
      if (typeof t == "string") {
        const n = t.startsWith("?") ? t.slice(1) : t;
        n.length > 0 && n.split("&").forEach((r) => {
          if (!r)
            return;
          const [s, i = ""] = r.split("=");
          this.append(decodeURIComponent(s), decodeURIComponent(i));
        });
        return;
      }
      if (Array.isArray(t)) {
        t.forEach(([n, r]) => this.append(n, r));
        return;
      }
      Object.keys(t).forEach((n) => {
        const r = t[n];
        r != null && this.append(n, String(r));
      });
    }
  }
  append(t, n) {
    this._entries.push([t, n]);
  }
  toString() {
    return this._entries.map(([t, n]) => `${encodeURIComponent(t)}=${encodeURIComponent(n)}`).join("&");
  }
}
dr.URLSearchParams || (dr.URLSearchParams = Hi);
const y = typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__, b = globalThis, nt = "10.27.0";
function Et() {
  return ve(b), b;
}
function ve(e) {
  const t = e.__SENTRY__ = e.__SENTRY__ || {};
  return t.version = t.version || nt, t[nt] = t[nt] || {};
}
function bt(e, t, n = b) {
  const r = n.__SENTRY__ = n.__SENTRY__ || {}, s = r[nt] = r[nt] || {};
  return s[e] || (s[e] = t());
}
const yn = [
  "debug",
  "info",
  "warn",
  "error",
  "log",
  "assert",
  "trace"
], Wi = "Sentry Logger ", ce = {};
function Tt(e) {
  if (!("console" in b))
    return e();
  const t = b.console, n = {}, r = Object.keys(ce);
  r.forEach((s) => {
    const i = ce[s];
    n[s] = t[s], t[s] = i;
  });
  try {
    return e();
  } finally {
    r.forEach((s) => {
      t[s] = n[s];
    });
  }
}
function qi() {
  En().enabled = !0;
}
function Ji() {
  En().enabled = !1;
}
function Ss() {
  return En().enabled;
}
function zi(...e) {
  Sn("log", ...e);
}
function Yi(...e) {
  Sn("warn", ...e);
}
function Ki(...e) {
  Sn("error", ...e);
}
function Sn(e, ...t) {
  y && Ss() && Tt(() => {
    b.console[e](`${Wi}[${e}]:`, ...t);
  });
}
function En() {
  return y ? bt("loggerSettings", () => ({ enabled: !1 })) : { enabled: !1 };
}
const h = {
  /** Enable logging. */
  enable: qi,
  /** Disable logging. */
  disable: Ji,
  /** Check if logging is enabled. */
  isEnabled: Ss,
  /** Log a message. */
  log: zi,
  /** Log a warning. */
  warn: Yi,
  /** Log an error. */
  error: Ki
}, ze = "<anonymous>";
function Es(e) {
  try {
    return !e || typeof e != "function" ? ze : e.name || ze;
  } catch (t) {
    return ze;
  }
}
function Vi(e) {
  const t = e.exception;
  if (t) {
    const n = [];
    try {
      return t.values.forEach((r) => {
        r.stacktrace.frames && n.push(...r.stacktrace.frames);
      }), n;
    } catch (r) {
      return;
    }
  }
}
function bs(e) {
  return "__v_isVNode" in e && e.__v_isVNode ? "[VueVNode]" : "[VueViewModel]";
}
const se = {}, pr = {};
function bn(e, t) {
  se[e] = se[e] || [], se[e].push(t);
}
function Tn(e, t) {
  if (!pr[e]) {
    pr[e] = !0;
    try {
      t();
    } catch (n) {
      y && h.error(`Error while instrumenting ${e}`, n);
    }
  }
}
function In(e, t) {
  const n = e && se[e];
  if (n)
    for (const r of n)
      try {
        r(t);
      } catch (s) {
        y && h.error(
          `Error while triggering instrumentation handler.
Type: ${e}
Name: ${Es(r)}
Error:`,
          s
        );
      }
}
let Ye = null;
function Xi(e) {
  const t = "error";
  bn(t, e), Tn(t, Zi);
}
function Zi() {
  Ye = b.onerror, b.onerror = function(e, t, n, r, s) {
    return In("error", {
      column: r,
      error: s,
      line: n,
      msg: e,
      url: t
    }), Ye ? Ye.apply(this, arguments) : !1;
  }, b.onerror.__SENTRY_INSTRUMENTED__ = !0;
}
let Ke = null;
function Qi(e) {
  const t = "unhandledrejection";
  bn(t, e), Tn(t, to);
}
function to() {
  Ke = b.onunhandledrejection, b.onunhandledrejection = function(e) {
    return In("unhandledrejection", e), Ke ? Ke.apply(this, arguments) : !0;
  }, b.onunhandledrejection.__SENTRY_INSTRUMENTED__ = !0;
}
const Ts = Object.prototype.toString;
function rt(e) {
  switch (Ts.call(e)) {
    case "[object Error]":
    case "[object Exception]":
    case "[object DOMException]":
    case "[object WebAssembly.Exception]":
      return !0;
    default:
      return Me(e, Error);
  }
}
function It(e, t) {
  return Ts.call(e) === `[object ${t}]`;
}
function eo(e) {
  return It(e, "ErrorEvent");
}
function mr(e) {
  return It(e, "DOMError");
}
function no(e) {
  return It(e, "DOMException");
}
function ue(e) {
  return It(e, "String");
}
function An(e) {
  return typeof e == "object" && e !== null && "__sentry_template_string__" in e && "__sentry_template_values__" in e;
}
function Rn(e) {
  return e === null || An(e) || typeof e != "object" && typeof e != "function";
}
function ot(e) {
  return It(e, "Object");
}
function Nn(e) {
  return typeof Event != "undefined" && Me(e, Event);
}
function ro(e) {
  return typeof Element != "undefined" && Me(e, Element);
}
function so(e) {
  return It(e, "RegExp");
}
function At(e) {
  return !!(e != null && e.then && typeof e.then == "function");
}
function io(e) {
  return ot(e) && "nativeEvent" in e && "preventDefault" in e && "stopPropagation" in e;
}
function Me(e, t) {
  try {
    return e instanceof t;
  } catch (n) {
    return !1;
  }
}
function Is(e) {
  return !!(typeof e == "object" && e !== null && (e.__isVue || e._isVue || e.__v_isVNode));
}
const oo = b, ao = 80;
function co(e, t = {}) {
  if (!e)
    return "<unknown>";
  try {
    let n = e;
    const r = 5, s = [];
    let i = 0, o = 0;
    const a = " > ", c = a.length;
    let u;
    const f = Array.isArray(t) ? t : t.keyAttrs, p = !Array.isArray(t) && t.maxStringLength || ao;
    for (; n && i++ < r && (u = uo(n, f), !(u === "html" || i > 1 && o + s.length * c + u.length >= p)); )
      s.push(u), o += u.length, n = n.parentNode;
    return s.reverse().join(a);
  } catch (n) {
    return "<unknown>";
  }
}
function uo(e, t) {
  const n = e, r = [];
  if (!(n != null && n.tagName))
    return "";
  if (oo.HTMLElement && n instanceof HTMLElement && n.dataset) {
    if (n.dataset.sentryComponent)
      return n.dataset.sentryComponent;
    if (n.dataset.sentryElement)
      return n.dataset.sentryElement;
  }
  r.push(n.tagName.toLowerCase());
  const s = t != null && t.length ? t.filter((o) => n.getAttribute(o)).map((o) => [o, n.getAttribute(o)]) : null;
  if (s != null && s.length)
    s.forEach((o) => {
      r.push(`[${o[0]}="${o[1]}"]`);
    });
  else {
    n.id && r.push(`#${n.id}`);
    const o = n.className;
    if (o && ue(o)) {
      const a = o.split(/\s+/);
      for (const c of a)
        r.push(`.${c}`);
    }
  }
  const i = ["aria-label", "type", "name", "title", "alt"];
  for (const o of i) {
    const a = n.getAttribute(o);
    a && r.push(`[${o}="${a}"]`);
  }
  return r.join("");
}
function ct(e, t, n) {
  if (!(t in e))
    return;
  const r = e[t];
  if (typeof r != "function")
    return;
  const s = n(r);
  typeof s == "function" && As(s, r);
  try {
    e[t] = s;
  } catch (i) {
    y && h.log(`Failed to replace method "${t}" in object`, e);
  }
}
function B(e, t, n) {
  try {
    Object.defineProperty(e, t, {
      // enumerable: false, // the default, so we can save on bundle size by not explicitly setting it
      value: n,
      writable: !0,
      configurable: !0
    });
  } catch (r) {
    y && h.log(`Failed to add non-enumerable property "${t}" to object`, e);
  }
}
function As(e, t) {
  try {
    const n = t.prototype || {};
    e.prototype = t.prototype = n, B(e, "__sentry_original__", t);
  } catch (n) {
  }
}
function Rs(e) {
  return e.__sentry_original__;
}
function Ns(e) {
  if (rt(e))
    return l({
      message: e.message,
      name: e.name,
      stack: e.stack
    }, _r(e));
  if (Nn(e)) {
    const t = l({
      type: e.type,
      target: hr(e.target),
      currentTarget: hr(e.currentTarget)
    }, _r(e));
    return typeof CustomEvent != "undefined" && Me(e, CustomEvent) && (t.detail = e.detail), t;
  } else
    return e;
}
function hr(e) {
  try {
    return ro(e) ? co(e) : Object.prototype.toString.call(e);
  } catch (t) {
    return "<unknown>";
  }
}
function _r(e) {
  if (typeof e == "object" && e !== null) {
    const t = {};
    for (const n in e)
      Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    return t;
  } else
    return {};
}
function lo(e) {
  const t = Object.keys(Ns(e));
  return t.sort(), t[0] ? t.join(", ") : "[object has no keys]";
}
function ie(e) {
  return en(e, /* @__PURE__ */ new Map());
}
function en(e, t) {
  if (e === null || typeof e != "object")
    return e;
  const n = t.get(e);
  if (n !== void 0)
    return n;
  if (Array.isArray(e)) {
    const r = [];
    return t.set(e, r), e.forEach((s) => {
      r.push(en(s, t));
    }), r;
  }
  if (fo(e)) {
    const r = {};
    return t.set(e, r), Object.keys(e).forEach((i) => {
      const o = e[i];
      o !== void 0 && (r[i] = en(o, t));
    }), r;
  }
  return e;
}
function fo(e) {
  const t = e.constructor;
  return t === Object || t === void 0;
}
function $t(e, t = 0) {
  return typeof e != "string" || t === 0 || e.length <= t ? e : `${e.slice(0, t)}...`;
}
function gr(e, t) {
  if (!Array.isArray(e))
    return "";
  const n = [];
  for (let r = 0; r < e.length; r++) {
    const s = e[r];
    try {
      Is(s) ? n.push(bs(s)) : n.push(String(s));
    } catch (i) {
      n.push("[value cannot be serialized]");
    }
  }
  return n.join(t);
}
function oe(e, t, n = !1) {
  return ue(e) ? so(t) ? t.test(e) : ue(t) ? n ? e === t : e.includes(t) : !1 : !1;
}
function we(e, t = [], n = !1) {
  return t.some((r) => oe(e, r, n));
}
function po() {
  const e = b;
  return e.crypto || e.msCrypto;
}
let Ve;
function mo() {
  return Math.random() * 16;
}
function D(e = po()) {
  try {
    if (e != null && e.randomUUID)
      return e.randomUUID().replace(/-/g, "");
  } catch (t) {
  }
  return Ve || (Ve = "10000000100040008000" + 1e11), Ve.replace(
    /[018]/g,
    (t) => (
      // eslint-disable-next-line no-bitwise
      (t ^ (mo() & 15) >> t / 4).toString(16)
    )
  );
}
function ks(e) {
  var t, n;
  return (n = (t = e.exception) == null ? void 0 : t.values) == null ? void 0 : n[0];
}
function ut(e) {
  const { message: t, event_id: n } = e;
  if (t)
    return t;
  const r = ks(e);
  return r ? r.type && r.value ? `${r.type}: ${r.value}` : r.type || r.value || n || "<unknown>" : n || "<unknown>";
}
function nn(e, t, n) {
  const r = e.exception = e.exception || {}, s = r.values = r.values || [], i = s[0] = s[0] || {};
  i.value || (i.value = t || ""), i.type || (i.type = "Error");
}
function pt(e, t) {
  const n = ks(e);
  if (!n)
    return;
  const r = { type: "generic", handled: !0 }, s = n.mechanism;
  if (n.mechanism = l(l(l({}, r), s), t), t && "data" in t) {
    const i = l(l({}, s == null ? void 0 : s.data), t.data);
    n.mechanism.data = i;
  }
}
function yr(e) {
  if (ho(e))
    return !0;
  try {
    B(e, "__sentry_captured__", !0);
  } catch (t) {
  }
  return !1;
}
function ho(e) {
  try {
    return e.__sentry_captured__;
  } catch (t) {
  }
}
const Os = 1e3;
function $() {
  return Date.now() / Os;
}
function _o() {
  const { performance: e } = b;
  if (!(e != null && e.now) || !e.timeOrigin)
    return $;
  const t = e.timeOrigin;
  return () => (t + e.now()) / Os;
}
let te;
function mt() {
  return (te != null ? te : te = _o())();
}
function rn(e, t = {}) {
  if (t.user && (!e.ipAddress && t.user.ip_address && (e.ipAddress = t.user.ip_address), !e.did && !t.did && (e.did = t.user.id || t.user.email || t.user.username)), e.timestamp = t.timestamp || mt(), t.abnormal_mechanism && (e.abnormal_mechanism = t.abnormal_mechanism), t.ignoreDuration && (e.ignoreDuration = t.ignoreDuration), t.sid && (e.sid = t.sid.length === 32 ? t.sid : D()), t.init !== void 0 && (e.init = t.init), !e.did && t.did && (e.did = `${t.did}`), typeof t.started == "number" && (e.started = t.started), e.ignoreDuration)
    e.duration = void 0;
  else if (typeof t.duration == "number")
    e.duration = t.duration;
  else {
    const n = e.timestamp - e.started;
    e.duration = n >= 0 ? n : 0;
  }
  t.release && (e.release = t.release), t.environment && (e.environment = t.environment), !e.ipAddress && t.ipAddress && (e.ipAddress = t.ipAddress), !e.userAgent && t.userAgent && (e.userAgent = t.userAgent), typeof t.errors == "number" && (e.errors = t.errors), t.status && (e.status = t.status);
}
function Bt(e, t, n = 2) {
  if (!t || typeof t != "object" || n <= 0)
    return t;
  if (e && Object.keys(t).length === 0)
    return e;
  const r = l({}, e);
  for (const s in t)
    Object.prototype.hasOwnProperty.call(t, s) && (r[s] = Bt(r[s], t[s], n - 1));
  return r;
}
function at() {
  return D();
}
function Rt() {
  return D().substring(16);
}
const sn = "_sentrySpan";
function Lt(e, t) {
  t ? B(e, sn, t) : delete e[sn];
}
function ht(e) {
  return e[sn];
}
const go = 100;
class G {
  /** Flag if notifying is happening. */
  /** Callback for client to receive scope changes. */
  /** Callback list that will be called during event processing. */
  /** Array of breadcrumbs. */
  /** User */
  /** Tags */
  /** Attributes */
  /** Extra */
  /** Contexts */
  /** Attachments */
  /** Propagation Context for distributed tracing */
  /**
   * A place to stash data which is needed at some point in the SDK's event processing pipeline but which shouldn't get
   * sent to Sentry
   */
  /** Fingerprint */
  /** Severity */
  /**
   * Transaction Name
   *
   * IMPORTANT: The transaction name on the scope has nothing to do with root spans/transaction objects.
   * It's purpose is to assign a transaction to the scope that's added to non-transaction events.
   */
  /** Session */
  /** The client on this scope */
  /** Contains the last event id of a captured event.  */
  // NOTE: Any field which gets added here should get added not only to the constructor but also to the `clone` method.
  constructor() {
    this._notifyingListeners = !1, this._scopeListeners = [], this._eventProcessors = [], this._breadcrumbs = [], this._attachments = [], this._user = {}, this._tags = {}, this._attributes = {}, this._extra = {}, this._contexts = {}, this._sdkProcessingMetadata = {}, this._propagationContext = {
      traceId: at(),
      sampleRand: Math.random()
    };
  }
  /**
   * Clone all data from this scope into a new scope.
   */
  clone() {
    const t = new G();
    return t._breadcrumbs = [...this._breadcrumbs], t._tags = l({}, this._tags), t._attributes = l({}, this._attributes), t._extra = l({}, this._extra), t._contexts = l({}, this._contexts), this._contexts.flags && (t._contexts.flags = {
      values: [...this._contexts.flags.values]
    }), t._user = this._user, t._level = this._level, t._session = this._session, t._transactionName = this._transactionName, t._fingerprint = this._fingerprint, t._eventProcessors = [...this._eventProcessors], t._attachments = [...this._attachments], t._sdkProcessingMetadata = l({}, this._sdkProcessingMetadata), t._propagationContext = l({}, this._propagationContext), t._client = this._client, t._lastEventId = this._lastEventId, Lt(t, ht(this)), t;
  }
  /**
   * Update the client assigned to this scope.
   * Note that not every scope will have a client assigned - isolation scopes & the global scope will generally not have a client,
   * as well as manually created scopes.
   */
  setClient(t) {
    this._client = t;
  }
  /**
   * Set the ID of the last captured error event.
   * This is generally only captured on the isolation scope.
   */
  setLastEventId(t) {
    this._lastEventId = t;
  }
  /**
   * Get the client assigned to this scope.
   */
  getClient() {
    return this._client;
  }
  /**
   * Get the ID of the last captured error event.
   * This is generally only available on the isolation scope.
   */
  lastEventId() {
    return this._lastEventId;
  }
  /**
   * @inheritDoc
   */
  addScopeListener(t) {
    this._scopeListeners.push(t);
  }
  /**
   * Add an event processor that will be called before an event is sent.
   */
  addEventProcessor(t) {
    return this._eventProcessors.push(t), this;
  }
  /**
   * Set the user for this scope.
   * Set to `null` to unset the user.
   */
  setUser(t) {
    return this._user = t || {
      email: void 0,
      id: void 0,
      ip_address: void 0,
      username: void 0
    }, this._session && rn(this._session, { user: t }), this._notifyScopeListeners(), this;
  }
  /**
   * Get the user from this scope.
   */
  getUser() {
    return this._user;
  }
  /**
   * Set an object that will be merged into existing tags on the scope,
   * and will be sent as tags data with the event.
   */
  setTags(t) {
    return this._tags = l(l({}, this._tags), t), this._notifyScopeListeners(), this;
  }
  /**
   * Set a single tag that will be sent as tags data with the event.
   */
  setTag(t, n) {
    return this.setTags({ [t]: n });
  }
  /**
   * Sets attributes onto the scope.
   *
   * TODO:
   * Currently, these attributes are not applied to any telemetry data but they will be in the future.
   *
   * @param newAttributes - The attributes to set on the scope. You can either pass in key-value pairs, or
   * an object with a `value` and an optional `unit` (if applicable to your attribute).
   *
   * @example
   * ```typescript
   * scope.setAttributes({
   *   is_admin: true,
   *   payment_selection: 'credit_card',
   *   clicked_products: [130, 554, 292],
   *   render_duration: { value: 'render_duration', unit: 'ms' },
   * });
   * ```
   */
  setAttributes(t) {
    return this._attributes = l(l({}, this._attributes), t), this._notifyScopeListeners(), this;
  }
  /**
   * Sets an attribute onto the scope.
   *
   * TODO:
   * Currently, these attributes are not applied to any telemetry data but they will be in the future.
   *
   * @param key - The attribute key.
   * @param value - the attribute value. You can either pass in a raw value, or an attribute
   * object with a `value` and an optional `unit` (if applicable to your attribute).
   *
   * @example
   * ```typescript
   * scope.setAttribute('is_admin', true);
   * scope.setAttribute('clicked_products', [130, 554, 292]);
   * scope.setAttribute('render_duration', { value: 'render_duration', unit: 'ms' });
   * ```
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setAttribute(t, n) {
    return this.setAttributes({ [t]: n });
  }
  /**
   * Removes the attribute with the given key from the scope.
   *
   * @param key - The attribute key.
   *
   * @example
   * ```typescript
   * scope.removeAttribute('is_admin');
   * ```
   */
  removeAttribute(t) {
    return t in this._attributes && (delete this._attributes[t], this._notifyScopeListeners()), this;
  }
  /**
   * Set an object that will be merged into existing extra on the scope,
   * and will be sent as extra data with the event.
   */
  setExtras(t) {
    return this._extra = l(l({}, this._extra), t), this._notifyScopeListeners(), this;
  }
  /**
   * Set a single key:value extra entry that will be sent as extra data with the event.
   */
  setExtra(t, n) {
    return this._extra = S(l({}, this._extra), { [t]: n }), this._notifyScopeListeners(), this;
  }
  /**
   * Sets the fingerprint on the scope to send with the events.
   * @param {string[]} fingerprint Fingerprint to group events in Sentry.
   */
  setFingerprint(t) {
    return this._fingerprint = t, this._notifyScopeListeners(), this;
  }
  /**
   * Sets the level on the scope for future events.
   */
  setLevel(t) {
    return this._level = t, this._notifyScopeListeners(), this;
  }
  /**
   * Sets the transaction name on the scope so that the name of e.g. taken server route or
   * the page location is attached to future events.
   *
   * IMPORTANT: Calling this function does NOT change the name of the currently active
   * root span. If you want to change the name of the active root span, use
   * `Sentry.updateSpanName(rootSpan, 'new name')` instead.
   *
   * By default, the SDK updates the scope's transaction name automatically on sensible
   * occasions, such as a page navigation or when handling a new request on the server.
   */
  setTransactionName(t) {
    return this._transactionName = t, this._notifyScopeListeners(), this;
  }
  /**
   * Sets context data with the given name.
   * Data passed as context will be normalized. You can also pass `null` to unset the context.
   * Note that context data will not be merged - calling `setContext` will overwrite an existing context with the same key.
   */
  setContext(t, n) {
    return n === null ? delete this._contexts[t] : this._contexts[t] = n, this._notifyScopeListeners(), this;
  }
  /**
   * Set the session for the scope.
   */
  setSession(t) {
    return t ? this._session = t : delete this._session, this._notifyScopeListeners(), this;
  }
  /**
   * Get the session from the scope.
   */
  getSession() {
    return this._session;
  }
  /**
   * Updates the scope with provided data. Can work in three variations:
   * - plain object containing updatable attributes
   * - Scope instance that'll extract the attributes from
   * - callback function that'll receive the current scope as an argument and allow for modifications
   */
  update(t) {
    if (!t)
      return this;
    const n = typeof t == "function" ? t(this) : t, r = n instanceof G ? n.getScopeData() : ot(n) ? t : void 0, {
      tags: s,
      attributes: i,
      extra: o,
      user: a,
      contexts: c,
      level: u,
      fingerprint: f = [],
      propagationContext: p
    } = r || {};
    return this._tags = l(l({}, this._tags), s), this._attributes = l(l({}, this._attributes), i), this._extra = l(l({}, this._extra), o), this._contexts = l(l({}, this._contexts), c), a && Object.keys(a).length && (this._user = a), u && (this._level = u), f.length && (this._fingerprint = f), p && (this._propagationContext = p), this;
  }
  /**
   * Clears the current scope and resets its properties.
   * Note: The client will not be cleared.
   */
  clear() {
    return this._breadcrumbs = [], this._tags = {}, this._attributes = {}, this._extra = {}, this._user = {}, this._contexts = {}, this._level = void 0, this._transactionName = void 0, this._fingerprint = void 0, this._session = void 0, Lt(this, void 0), this._attachments = [], this.setPropagationContext({ traceId: at(), sampleRand: Math.random() }), this._notifyScopeListeners(), this;
  }
  /**
   * Adds a breadcrumb to the scope.
   * By default, the last 100 breadcrumbs are kept.
   */
  addBreadcrumb(t, n) {
    var i;
    const r = typeof n == "number" ? n : go;
    if (r <= 0)
      return this;
    const s = S(l({
      timestamp: $()
    }, t), {
      // Breadcrumb messages can theoretically be infinitely large and they're held in memory so we truncate them not to leak (too much) memory
      message: t.message ? $t(t.message, 2048) : t.message
    });
    return this._breadcrumbs.push(s), this._breadcrumbs.length > r && (this._breadcrumbs = this._breadcrumbs.slice(-r), (i = this._client) == null || i.recordDroppedEvent("buffer_overflow", "log_item")), this._notifyScopeListeners(), this;
  }
  /**
   * Get the last breadcrumb of the scope.
   */
  getLastBreadcrumb() {
    return this._breadcrumbs[this._breadcrumbs.length - 1];
  }
  /**
   * Clear all breadcrumbs from the scope.
   */
  clearBreadcrumbs() {
    return this._breadcrumbs = [], this._notifyScopeListeners(), this;
  }
  /**
   * Add an attachment to the scope.
   */
  addAttachment(t) {
    return this._attachments.push(t), this;
  }
  /**
   * Clear all attachments from the scope.
   */
  clearAttachments() {
    return this._attachments = [], this;
  }
  /**
   * Get the data of this scope, which should be applied to an event during processing.
   */
  getScopeData() {
    return {
      breadcrumbs: this._breadcrumbs,
      attachments: this._attachments,
      contexts: this._contexts,
      tags: this._tags,
      attributes: this._attributes,
      extra: this._extra,
      user: this._user,
      level: this._level,
      fingerprint: this._fingerprint || [],
      eventProcessors: this._eventProcessors,
      propagationContext: this._propagationContext,
      sdkProcessingMetadata: this._sdkProcessingMetadata,
      transactionName: this._transactionName,
      span: ht(this)
    };
  }
  /**
   * Add data which will be accessible during event processing but won't get sent to Sentry.
   */
  setSDKProcessingMetadata(t) {
    return this._sdkProcessingMetadata = Bt(this._sdkProcessingMetadata, t, 2), this;
  }
  /**
   * Add propagation context to the scope, used for distributed tracing
   */
  setPropagationContext(t) {
    return this._propagationContext = t, this;
  }
  /**
   * Get propagation context from the scope, used for distributed tracing
   */
  getPropagationContext() {
    return this._propagationContext;
  }
  /**
   * Capture an exception for this scope.
   *
   * @returns {string} The id of the captured Sentry event.
   */
  captureException(t, n) {
    const r = (n == null ? void 0 : n.event_id) || D();
    if (!this._client)
      return y && h.warn("No client configured on scope - will not capture exception!"), r;
    const s = new Error("Sentry syntheticException");
    return this._client.captureException(
      t,
      S(l({
        originalException: t,
        syntheticException: s
      }, n), {
        event_id: r
      }),
      this
    ), r;
  }
  /**
   * Capture a message for this scope.
   *
   * @returns {string} The id of the captured message.
   */
  captureMessage(t, n, r) {
    var o;
    const s = (r == null ? void 0 : r.event_id) || D();
    if (!this._client)
      return y && h.warn("No client configured on scope - will not capture message!"), s;
    const i = (o = r == null ? void 0 : r.syntheticException) != null ? o : new Error(t);
    return this._client.captureMessage(
      t,
      n,
      S(l({
        originalException: t,
        syntheticException: i
      }, r), {
        event_id: s
      }),
      this
    ), s;
  }
  /**
   * Capture a Sentry event for this scope.
   *
   * @returns {string} The id of the captured event.
   */
  captureEvent(t, n) {
    const r = (n == null ? void 0 : n.event_id) || D();
    return this._client ? (this._client.captureEvent(t, S(l({}, n), { event_id: r }), this), r) : (y && h.warn("No client configured on scope - will not capture event!"), r);
  }
  /**
   * This will be called on every set call.
   */
  _notifyScopeListeners() {
    this._notifyingListeners || (this._notifyingListeners = !0, this._scopeListeners.forEach((t) => {
      t(this);
    }), this._notifyingListeners = !1);
  }
}
function yo() {
  return bt("defaultCurrentScope", () => new G());
}
function So() {
  return bt("defaultIsolationScope", () => new G());
}
class Eo {
  constructor(t, n) {
    let r;
    t ? r = t : r = new G();
    let s;
    n ? s = n : s = new G(), this._stack = [{ scope: r }], this._isolationScope = s;
  }
  /**
   * Fork a scope for the stack.
   */
  withScope(t) {
    const n = this._pushScope();
    let r;
    try {
      r = t(n);
    } catch (s) {
      throw this._popScope(), s;
    }
    return At(r) ? r.then(
      (s) => (this._popScope(), s),
      (s) => {
        throw this._popScope(), s;
      }
    ) : (this._popScope(), r);
  }
  /**
   * Get the client of the stack.
   */
  getClient() {
    return this.getStackTop().client;
  }
  /**
   * Returns the scope of the top stack.
   */
  getScope() {
    return this.getStackTop().scope;
  }
  /**
   * Get the isolation scope for the stack.
   */
  getIsolationScope() {
    return this._isolationScope;
  }
  /**
   * Returns the topmost scope layer in the order domain > local > process.
   */
  getStackTop() {
    return this._stack[this._stack.length - 1];
  }
  /**
   * Push a scope to the stack.
   */
  _pushScope() {
    const t = this.getScope().clone();
    return this._stack.push({
      client: this.getClient(),
      scope: t
    }), t;
  }
  /**
   * Pop a scope from the stack.
   */
  _popScope() {
    return this._stack.length <= 1 ? !1 : !!this._stack.pop();
  }
}
function _t() {
  const e = Et(), t = ve(e);
  return t.stack = t.stack || new Eo(yo(), So());
}
function bo(e) {
  return _t().withScope(e);
}
function To(e, t) {
  const n = _t();
  return n.withScope(() => (n.getStackTop().scope = e, t(e)));
}
function Sr(e) {
  return _t().withScope(() => e(_t().getIsolationScope()));
}
function Io() {
  return {
    withIsolationScope: Sr,
    withScope: bo,
    withSetScope: To,
    withSetIsolationScope: (e, t) => Sr(t),
    getCurrentScope: () => _t().getScope(),
    getIsolationScope: () => _t().getIsolationScope()
  };
}
function Gt(e) {
  const t = ve(e);
  return t.acs ? t.acs : Io();
}
function v() {
  const e = Et();
  return Gt(e).getCurrentScope();
}
function C() {
  const e = Et();
  return Gt(e).getIsolationScope();
}
function kn() {
  return bt("globalScope", () => new G());
}
function V(...e) {
  const t = Et(), n = Gt(t);
  if (e.length === 2) {
    const [r, s] = e;
    return r ? n.withSetScope(r, s) : n.withScope(s);
  }
  return n.withScope(e[0]);
}
function I() {
  return v().getClient();
}
function vs(e) {
  const t = e.getPropagationContext(), { traceId: n, parentSpanId: r, propagationSpanId: s } = t, i = {
    trace_id: n,
    span_id: s || Rt()
  };
  return r && (i.parent_span_id = r), i;
}
const le = "sentry.source", Ms = "sentry.sample_rate", Ao = "sentry.previous_trace_sample_rate", jt = "sentry.op", J = "sentry.origin", ws = "sentry.measurement_unit", Cs = "sentry.measurement_value", Er = "sentry.custom_span_name", On = "sentry.profile_id", vn = "sentry.exclusive_time", Ro = 0, Mn = 1, T = 2;
function No(e) {
  if (e < 400 && e >= 100)
    return { code: Mn };
  if (e >= 400 && e < 500)
    switch (e) {
      case 401:
        return { code: T, message: "unauthenticated" };
      case 403:
        return { code: T, message: "permission_denied" };
      case 404:
        return { code: T, message: "not_found" };
      case 409:
        return { code: T, message: "already_exists" };
      case 413:
        return { code: T, message: "failed_precondition" };
      case 429:
        return { code: T, message: "resource_exhausted" };
      case 499:
        return { code: T, message: "cancelled" };
      default:
        return { code: T, message: "invalid_argument" };
    }
  if (e >= 500 && e < 600)
    switch (e) {
      case 501:
        return { code: T, message: "unimplemented" };
      case 503:
        return { code: T, message: "unavailable" };
      case 504:
        return { code: T, message: "deadline_exceeded" };
      default:
        return { code: T, message: "internal_error" };
    }
  return { code: T, message: "internal_error" };
}
function br(e, t) {
  e.setAttribute("http.response.status_code", t);
  const n = No(t);
  n.message !== "unknown_error" && e.setStatus(n);
}
const xs = "_sentryScope", Ps = "_sentryIsolationScope";
function ko(e) {
  try {
    const t = b.WeakRef;
    if (typeof t == "function")
      return new t(e);
  } catch (t) {
  }
  return e;
}
function Oo(e) {
  if (e) {
    if (typeof e == "object" && "deref" in e && typeof e.deref == "function")
      try {
        return e.deref();
      } catch (t) {
        return;
      }
    return e;
  }
}
function vo(e, t, n) {
  e && (B(e, Ps, ko(n)), B(e, xs, t));
}
function fe(e) {
  const t = e;
  return {
    scope: t[xs],
    isolationScope: Oo(t[Ps])
  };
}
const Mo = "sentry-", wo = /^sentry-/;
function Co(e) {
  const t = xo(e);
  if (!t)
    return;
  const n = Object.entries(t).reduce((r, [s, i]) => {
    if (s.match(wo)) {
      const o = s.slice(Mo.length);
      r[o] = i;
    }
    return r;
  }, {});
  if (Object.keys(n).length > 0)
    return n;
}
function xo(e) {
  if (!(!e || !ue(e) && !Array.isArray(e)))
    return Array.isArray(e) ? e.reduce((t, n) => {
      const r = Tr(n);
      return Object.entries(r).forEach(([s, i]) => {
        t[s] = i;
      }), t;
    }, {}) : Tr(e);
}
function Tr(e) {
  return e.split(",").map((t) => {
    const n = t.indexOf("=");
    if (n === -1)
      return [];
    const r = t.slice(0, n), s = t.slice(n + 1);
    return [r, s].map((i) => {
      try {
        return decodeURIComponent(i.trim());
      } catch (o) {
        return;
      }
    });
  }).reduce((t, [n, r]) => (n && r && (t[n] = r), t), {});
}
const Po = /^o(\d+)\./, Do = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)([\w.-]+)(?::(\d+))?\/(.+)/;
function $o(e) {
  return e === "http" || e === "https";
}
function Nt(e, t = !1) {
  const { host: n, path: r, pass: s, port: i, projectId: o, protocol: a, publicKey: c } = e;
  return `${a}://${c}${t && s ? `:${s}` : ""}@${n}${i ? `:${i}` : ""}/${r && `${r}/`}${o}`;
}
function Ds(e) {
  const t = Do.exec(e);
  if (!t) {
    Tt(() => {
      console.error(`Invalid Sentry Dsn: ${e}`);
    });
    return;
  }
  const [n, r, s = "", i = "", o = "", a = ""] = t.slice(1);
  let c = "", u = a;
  const f = u.split("/");
  if (f.length > 1 && (c = f.slice(0, -1).join("/"), u = f.pop()), u) {
    const p = u.match(/^\d+/);
    p && (u = p[0]);
  }
  return $s({ host: i, pass: s, path: c, projectId: u, port: o, protocol: n, publicKey: r });
}
function $s(e) {
  return {
    protocol: e.protocol,
    publicKey: e.publicKey || "",
    pass: e.pass || "",
    host: e.host,
    port: e.port || "",
    path: e.path || "",
    projectId: e.projectId
  };
}
function Lo(e) {
  if (!y)
    return !0;
  const { port: t, projectId: n, protocol: r } = e;
  return ["protocol", "publicKey", "host", "projectId"].find((o) => e[o] ? !1 : (h.error(`Invalid Sentry Dsn: ${o} missing`), !0)) ? !1 : n.match(/^\d+$/) ? $o(r) ? t && isNaN(parseInt(t, 10)) ? (h.error(`Invalid Sentry Dsn: Invalid port ${t}`), !1) : !0 : (h.error(`Invalid Sentry Dsn: Invalid protocol ${r}`), !1) : (h.error(`Invalid Sentry Dsn: Invalid projectId ${n}`), !1);
}
function jo(e) {
  const t = e.match(Po);
  return t == null ? void 0 : t[1];
}
function Fo(e) {
  const t = e.getOptions(), { host: n } = e.getDsn() || {};
  let r;
  return t.orgId ? r = String(t.orgId) : n && (r = jo(n)), r;
}
function Uo(e) {
  const t = typeof e == "string" ? Ds(e) : $s(e);
  if (!(!t || !Lo(t)))
    return t;
}
function wn(e) {
  if (typeof e == "boolean")
    return Number(e);
  const t = typeof e == "string" ? parseFloat(e) : e;
  if (!(typeof t != "number" || isNaN(t) || t < 0 || t > 1))
    return t;
}
const Ls = 0, Cn = 1;
let Ir = !1;
function Bo(e) {
  const { spanId: t, traceId: n } = e.spanContext(), { data: r, op: s, parent_span_id: i, status: o, origin: a, links: c } = M(e);
  return {
    parent_span_id: i,
    span_id: t,
    trace_id: n,
    data: r,
    op: s,
    status: o,
    origin: a,
    links: c
  };
}
function js(e) {
  const { spanId: t, traceId: n, isRemote: r } = e.spanContext(), s = r ? t : M(e).parent_span_id, i = fe(e).scope, o = r ? (i == null ? void 0 : i.getPropagationContext().propagationSpanId) || Rt() : t;
  return {
    parent_span_id: s,
    span_id: o,
    trace_id: n
  };
}
function Fs(e) {
  if (e && e.length > 0)
    return e.map((o) => {
      var a = o, { context: c } = a, u = c, { spanId: t, traceId: n, traceFlags: r } = u, s = Xt(u, ["spanId", "traceId", "traceFlags"]), { attributes: i } = a;
      return l({
        span_id: t,
        trace_id: n,
        sampled: r === Cn,
        attributes: i
      }, s);
    });
}
function dt(e) {
  return typeof e == "number" ? Ar(e) : Array.isArray(e) ? e[0] + e[1] / 1e9 : e instanceof Date ? Ar(e.getTime()) : mt();
}
function Ar(e) {
  return e > 9999999999 ? e / 1e3 : e;
}
function M(e) {
  var r;
  if (Ho(e))
    return e.getSpanJSON();
  const { spanId: t, traceId: n } = e.spanContext();
  if (Go(e)) {
    const { attributes: s, startTime: i, name: o, endTime: a, status: c, links: u } = e, f = "parentSpanId" in e ? e.parentSpanId : "parentSpanContext" in e ? (r = e.parentSpanContext) == null ? void 0 : r.spanId : void 0;
    return {
      span_id: t,
      trace_id: n,
      data: s,
      description: o,
      parent_span_id: f,
      start_timestamp: dt(i),
      // This is [0,0] by default in OTEL, in which case we want to interpret this as no end time
      timestamp: dt(a) || void 0,
      status: Us(c),
      op: s[jt],
      origin: s[J],
      links: Fs(u)
    };
  }
  return {
    span_id: t,
    trace_id: n,
    start_timestamp: 0,
    data: {}
  };
}
function Go(e) {
  const t = e;
  return !!t.attributes && !!t.startTime && !!t.name && !!t.endTime && !!t.status;
}
function Ho(e) {
  return typeof e.getSpanJSON == "function";
}
function Ht(e) {
  const { traceFlags: t } = e.spanContext();
  return t === Cn;
}
function Us(e) {
  if (!(!e || e.code === Ro))
    return e.code === Mn ? "ok" : e.message || "internal_error";
}
const wt = "_sentryChildSpans", on = "_sentryRootSpan";
function Bs(e, t) {
  const n = e[on] || e;
  B(t, on, n), e[wt] ? e[wt].add(t) : B(e, wt, /* @__PURE__ */ new Set([t]));
}
function Wo(e) {
  const t = /* @__PURE__ */ new Set();
  function n(r) {
    if (!t.has(r) && Ht(r)) {
      t.add(r);
      const s = r[wt] ? Array.from(r[wt]) : [];
      for (const i of s)
        n(i);
    }
  }
  return n(e), Array.from(t);
}
function F(e) {
  return e[on] || e;
}
function Ce() {
  const e = Et(), t = Gt(e);
  return t.getActiveSpan ? t.getActiveSpan() : ht(v());
}
function an() {
  Ir || (Tt(() => {
    console.warn(
      "[Sentry] Returning null from `beforeSendSpan` is disallowed. To drop certain spans, configure the respective integrations directly or use `ignoreSpans`."
    );
  }), Ir = !0);
}
let Rr = !1;
function Zf() {
  if (Rr)
    return;
  function e() {
    const t = Ce(), n = t && F(t);
    if (n) {
      const r = "internal_error";
      y && h.log(`[Tracing] Root span: ${r} -> Global error occurred`), n.setStatus({ code: T, message: r });
    }
  }
  e.tag = "sentry_tracingErrorCallback", Rr = !0, Xi(e), Qi(e);
}
function xn(e) {
  var n;
  if (typeof __SENTRY_TRACING__ == "boolean" && !__SENTRY_TRACING__)
    return !1;
  const t = e || ((n = I()) == null ? void 0 : n.getOptions());
  return !!t && // Note: This check is `!= null`, meaning "nullish". `0` is not "nullish", `undefined` and `null` are. (This comment was brought to you by 15 minutes of questioning life)
  (t.tracesSampleRate != null || !!t.tracesSampler);
}
function Nr(e) {
  h.log(`Ignoring span ${e.op} - ${e.description} because it matches \`ignoreSpans\`.`);
}
function cn(e, t) {
  if (!(t != null && t.length) || !e.description)
    return !1;
  for (const n of t) {
    if (Jo(n)) {
      if (oe(e.description, n))
        return y && Nr(e), !0;
      continue;
    }
    if (!n.name && !n.op)
      continue;
    const r = n.name ? oe(e.description, n.name) : !0, s = n.op ? e.op && oe(e.op, n.op) : !0;
    if (r && s)
      return y && Nr(e), !0;
  }
  return !1;
}
function qo(e, t) {
  const n = t.parent_span_id, r = t.span_id;
  if (n)
    for (const s of e)
      s.parent_span_id === r && (s.parent_span_id = n);
}
function Jo(e) {
  return typeof e == "string" || e instanceof RegExp;
}
const Pn = "production", Gs = "_frozenDsc";
function Xe(e, t) {
  B(e, Gs, t);
}
function Hs(e, t) {
  const n = t.getOptions(), { publicKey: r } = t.getDsn() || {}, s = {
    environment: n.environment || Pn,
    release: n.release,
    public_key: r,
    trace_id: e,
    org_id: Fo(t)
  };
  return t.emit("createDsc", s), s;
}
function Ws(e, t) {
  const n = t.getPropagationContext();
  return n.dsc || Hs(n.traceId, e);
}
function gt(e) {
  var _, g, E, N;
  const t = I();
  if (!t)
    return {};
  const n = F(e), r = M(n), s = r.data, i = n.spanContext().traceState, o = (g = (_ = i == null ? void 0 : i.get("sentry.sample_rate")) != null ? _ : s[Ms]) != null ? g : s[Ao];
  function a(R) {
    return (typeof o == "number" || typeof o == "string") && (R.sample_rate = `${o}`), R;
  }
  const c = n[Gs];
  if (c)
    return a(c);
  const u = i == null ? void 0 : i.get("sentry.dsc"), f = u && Co(u);
  if (f)
    return a(f);
  const p = Hs(e.spanContext().traceId, t), m = s[le], d = r.description;
  return m !== "url" && d && (p.transaction = d), xn() && (p.sampled = String(Ht(n)), p.sample_rand = // In OTEL we store the sample rand on the trace state because we cannot access scopes for NonRecordingSpans
  // The Sentry OTEL SpanSampler takes care of writing the sample rand on the root span
  (N = i == null ? void 0 : i.get("sentry.sample_rand")) != null ? N : (
    // On all other platforms we can actually get the scopes from a root span (we use this as a fallback)
    (E = fe(n).scope) == null ? void 0 : E.getPropagationContext().sampleRand.toString()
  )), a(p), t.emit("createDsc", p, n), p;
}
class Wt {
  constructor(t = {}) {
    this._traceId = t.traceId || at(), this._spanId = t.spanId || Rt();
  }
  /** @inheritdoc */
  spanContext() {
    return {
      spanId: this._spanId,
      traceId: this._traceId,
      traceFlags: Ls
    };
  }
  /** @inheritdoc */
  end(t) {
  }
  /** @inheritdoc */
  setAttribute(t, n) {
    return this;
  }
  /** @inheritdoc */
  setAttributes(t) {
    return this;
  }
  /** @inheritdoc */
  setStatus(t) {
    return this;
  }
  /** @inheritdoc */
  updateName(t) {
    return this;
  }
  /** @inheritdoc */
  isRecording() {
    return !1;
  }
  /** @inheritdoc */
  addEvent(t, n, r) {
    return this;
  }
  /** @inheritDoc */
  addLink(t) {
    return this;
  }
  /** @inheritDoc */
  addLinks(t) {
    return this;
  }
  /**
   * This should generally not be used,
   * but we need it for being compliant with the OTEL Span interface.
   *
   * @hidden
   * @internal
   */
  recordException(t, n) {
  }
}
function P(e, t = 100, n = 1 / 0) {
  try {
    return un("", e, t, n);
  } catch (r) {
    return { ERROR: `**non-serializable** (${r})` };
  }
}
function qs(e, t = 3, n = 100 * 1024) {
  const r = P(e, t);
  return Vo(r) > n ? qs(e, t - 1, n) : r;
}
function un(e, t, n = 1 / 0, r = 1 / 0, s = Xo()) {
  const [i, o] = s;
  if (t == null || // this matches null and undefined -> eqeq not eqeqeq
  ["boolean", "string"].includes(typeof t) || typeof t == "number" && Number.isFinite(t))
    return t;
  const a = zo(e, t);
  if (!a.startsWith("[object "))
    return a;
  if (t.__sentry_skip_normalization__)
    return t;
  const c = typeof t.__sentry_override_normalization_depth__ == "number" ? t.__sentry_override_normalization_depth__ : n;
  if (c === 0)
    return a.replace("object ", "");
  if (i(t))
    return "[Circular ~]";
  const u = t;
  if (u && typeof u.toJSON == "function")
    try {
      const d = u.toJSON();
      return un("", d, c - 1, r, s);
    } catch (d) {
    }
  const f = Array.isArray(t) ? [] : {};
  let p = 0;
  const m = Ns(t);
  for (const d in m) {
    if (!Object.prototype.hasOwnProperty.call(m, d))
      continue;
    if (p >= r) {
      f[d] = "[MaxProperties ~]";
      break;
    }
    const _ = m[d];
    f[d] = un(d, _, c - 1, r, s), p++;
  }
  return o(t), f;
}
function zo(e, t) {
  try {
    if (e === "domain" && t && typeof t == "object" && t._events)
      return "[Domain]";
    if (e === "domainEmitter")
      return "[DomainEmitter]";
    if (typeof global != "undefined" && t === global)
      return "[Global]";
    if (typeof window != "undefined" && t === window)
      return "[Window]";
    if (typeof document != "undefined" && t === document)
      return "[Document]";
    if (Is(t))
      return bs(t);
    if (io(t))
      return "[SyntheticEvent]";
    if (typeof t == "number" && !Number.isFinite(t))
      return `[${t}]`;
    if (typeof t == "function")
      return `[Function: ${Es(t)}]`;
    if (typeof t == "symbol")
      return `[${String(t)}]`;
    if (typeof t == "bigint")
      return `[BigInt: ${String(t)}]`;
    const n = Yo(t);
    return /^HTML(\w*)Element$/.test(n) ? `[HTMLElement: ${n}]` : `[object ${n}]`;
  } catch (n) {
    return `**non-serializable** (${n})`;
  }
}
function Yo(e) {
  const t = Object.getPrototypeOf(e);
  return t != null && t.constructor ? t.constructor.name : "null prototype";
}
function Ko(e) {
  return ~-encodeURI(e).split(/%..|./).length;
}
function Vo(e) {
  return Ko(JSON.stringify(e));
}
function Xo() {
  const e = /* @__PURE__ */ new WeakSet();
  function t(r) {
    return e.has(r) ? !0 : (e.add(r), !1);
  }
  function n(r) {
    e.delete(r);
  }
  return [t, n];
}
function X(e, t = []) {
  return [e, t];
}
function Zo(e, t) {
  const [n, r] = e;
  return [n, [...r, t]];
}
function Ft(e, t) {
  const n = e[1];
  for (const r of n) {
    const s = r[0].type;
    if (t(r, s))
      return !0;
  }
  return !1;
}
function ln(e) {
  const t = ve(b);
  return t.encodePolyfill ? t.encodePolyfill(e) : new TextEncoder().encode(e);
}
function Qo(e) {
  const [t, n] = e;
  let r = JSON.stringify(t);
  function s(i) {
    typeof r == "string" ? r = typeof i == "string" ? r + i : [ln(r), i] : r.push(typeof i == "string" ? ln(i) : i);
  }
  for (const i of n) {
    const [o, a] = i;
    if (s(`
${JSON.stringify(o)}
`), typeof a == "string" || a instanceof Uint8Array)
      s(a);
    else {
      let c;
      try {
        c = JSON.stringify(a);
      } catch (u) {
        c = JSON.stringify(P(a));
      }
      s(c);
    }
  }
  return typeof r == "string" ? r : ta(r);
}
function ta(e) {
  const t = e.reduce((s, i) => s + i.length, 0), n = new Uint8Array(t);
  let r = 0;
  for (const s of e)
    n.set(s, r), r += s.length;
  return n;
}
function ea(e) {
  return [{
    type: "span"
  }, e];
}
function na(e) {
  const t = typeof e.data == "string" ? ln(e.data) : e.data;
  return [
    {
      type: "attachment",
      length: t.length,
      filename: e.filename,
      content_type: e.contentType,
      attachment_type: e.attachmentType
    },
    t
  ];
}
const ra = {
  session: "session",
  sessions: "session",
  attachment: "attachment",
  transaction: "transaction",
  event: "error",
  client_report: "internal",
  user_report: "default",
  profile: "profile",
  profile_chunk: "profile",
  replay_event: "replay",
  replay_recording: "replay",
  check_in: "monitor",
  feedback: "feedback",
  span: "span",
  raw_security: "security",
  log: "log_item",
  metric: "metric",
  trace_metric: "metric"
};
function kr(e) {
  return ra[e];
}
function Js(e) {
  if (!(e != null && e.sdk))
    return;
  const { name: t, version: n } = e.sdk;
  return { name: t, version: n };
}
function sa(e, t, n, r) {
  var i;
  const s = (i = e.sdkProcessingMetadata) == null ? void 0 : i.dynamicSamplingContext;
  return l(l(l({
    event_id: e.event_id,
    sent_at: (/* @__PURE__ */ new Date()).toISOString()
  }, t && { sdk: t }), !!n && r && { dsn: Nt(r) }), s && {
    trace: s
  });
}
function ia(e, t) {
  var r, s, i, o;
  if (!t)
    return e;
  const n = e.sdk || {};
  return e.sdk = S(l({}, n), {
    name: n.name || t.name,
    version: n.version || t.version,
    integrations: [...((r = e.sdk) == null ? void 0 : r.integrations) || [], ...t.integrations || []],
    packages: [...((s = e.sdk) == null ? void 0 : s.packages) || [], ...t.packages || []],
    settings: (i = e.sdk) != null && i.settings || t.settings ? l(l({}, (o = e.sdk) == null ? void 0 : o.settings), t.settings) : void 0
  }), e;
}
function oa(e, t, n, r) {
  const s = Js(n), i = l(l({
    sent_at: (/* @__PURE__ */ new Date()).toISOString()
  }, s && { sdk: s }), !!r && t && { dsn: Nt(t) }), o = "aggregates" in e ? [{ type: "sessions" }, e] : [{ type: "session" }, e.toJSON()];
  return X(i, [o]);
}
function aa(e, t, n, r) {
  const s = Js(n), i = e.type && e.type !== "replay_event" ? e.type : "event";
  ia(e, n == null ? void 0 : n.sdk);
  const o = sa(e, s, r, t);
  return delete e.sdkProcessingMetadata, X(o, [[{ type: i }, e]]);
}
function ca(e, t) {
  function n(d) {
    return !!d.trace_id && !!d.public_key;
  }
  const r = gt(e[0]), s = t == null ? void 0 : t.getDsn(), i = t == null ? void 0 : t.getOptions().tunnel, o = l(l({
    sent_at: (/* @__PURE__ */ new Date()).toISOString()
  }, n(r) && { trace: r }), !!i && s && { dsn: Nt(s) }), { beforeSendSpan: a, ignoreSpans: c } = (t == null ? void 0 : t.getOptions()) || {}, u = c != null && c.length ? e.filter((d) => !cn(M(d), c)) : e, f = e.length - u.length;
  f && (t == null || t.recordDroppedEvent("before_send", "span", f));
  const p = a ? (d) => {
    const _ = M(d), g = a(_);
    return g || (an(), _);
  } : M, m = [];
  for (const d of u) {
    const _ = p(d);
    _ && m.push(ea(_));
  }
  return X(o, m);
}
function ua(e) {
  if (!y) return;
  const { description: t = "< unknown name >", op: n = "< unknown op >", parent_span_id: r } = M(e), { spanId: s } = e.spanContext(), i = Ht(e), o = F(e), a = o === e, c = `[Tracing] Starting ${i ? "sampled" : "unsampled"} ${a ? "root " : ""}span`, u = [`op: ${n}`, `name: ${t}`, `ID: ${s}`];
  if (r && u.push(`parent ID: ${r}`), !a) {
    const { op: f, description: p } = M(o);
    u.push(`root ID: ${o.spanContext().spanId}`), f && u.push(`root op: ${f}`), p && u.push(`root description: ${p}`);
  }
  h.log(`${c}
  ${u.join(`
  `)}`);
}
function la(e) {
  if (!y) return;
  const { description: t = "< unknown name >", op: n = "< unknown op >" } = M(e), { spanId: r } = e.spanContext(), i = F(e) === e, o = `[Tracing] Finishing "${n}" ${i ? "root " : ""}span "${t}" with ID ${r}`;
  h.log(o);
}
function Qf(e, t, n, r = Ce()) {
  const s = r && F(r);
  s && (y && h.log(`[Measurement] Setting measurement on root span: ${e} = ${t} ${n}`), s.addEvent(e, {
    [Cs]: t,
    [ws]: n
  }));
}
function Or(e) {
  if (!e || e.length === 0)
    return;
  const t = {};
  return e.forEach((n) => {
    const r = n.attributes || {}, s = r[ws], i = r[Cs];
    typeof s == "string" && typeof i == "number" && (t[n.name] = { value: i, unit: s });
  }), t;
}
const vr = 1e3;
class Dn {
  /** Epoch timestamp in seconds when the span started. */
  /** Epoch timestamp in seconds when the span ended. */
  /** Internal keeper of the status */
  /** The timed events added to this span. */
  /** if true, treat span as a standalone span (not part of a transaction) */
  /**
   * You should never call the constructor manually, always use `Sentry.startSpan()`
   * or other span methods.
   * @internal
   * @hideconstructor
   * @hidden
   */
  constructor(t = {}) {
    this._traceId = t.traceId || at(), this._spanId = t.spanId || Rt(), this._startTime = t.startTimestamp || mt(), this._links = t.links, this._attributes = {}, this.setAttributes(l({
      [J]: "manual",
      [jt]: t.op
    }, t.attributes)), this._name = t.name, t.parentSpanId && (this._parentSpanId = t.parentSpanId), "sampled" in t && (this._sampled = t.sampled), t.endTimestamp && (this._endTime = t.endTimestamp), this._events = [], this._isStandaloneSpan = t.isStandalone, this._endTime && this._onSpanEnded();
  }
  /** @inheritDoc */
  addLink(t) {
    return this._links ? this._links.push(t) : this._links = [t], this;
  }
  /** @inheritDoc */
  addLinks(t) {
    return this._links ? this._links.push(...t) : this._links = t, this;
  }
  /**
   * This should generally not be used,
   * but it is needed for being compliant with the OTEL Span interface.
   *
   * @hidden
   * @internal
   */
  recordException(t, n) {
  }
  /** @inheritdoc */
  spanContext() {
    const { _spanId: t, _traceId: n, _sampled: r } = this;
    return {
      spanId: t,
      traceId: n,
      traceFlags: r ? Cn : Ls
    };
  }
  /** @inheritdoc */
  setAttribute(t, n) {
    return n === void 0 ? delete this._attributes[t] : this._attributes[t] = n, this;
  }
  /** @inheritdoc */
  setAttributes(t) {
    return Object.keys(t).forEach((n) => this.setAttribute(n, t[n])), this;
  }
  /**
   * This should generally not be used,
   * but we need it for browser tracing where we want to adjust the start time afterwards.
   * USE THIS WITH CAUTION!
   *
   * @hidden
   * @internal
   */
  updateStartTime(t) {
    this._startTime = dt(t);
  }
  /**
   * @inheritDoc
   */
  setStatus(t) {
    return this._status = t, this;
  }
  /**
   * @inheritDoc
   */
  updateName(t) {
    return this._name = t, this.setAttribute(le, "custom"), this;
  }
  /** @inheritdoc */
  end(t) {
    this._endTime || (this._endTime = dt(t), la(this), this._onSpanEnded());
  }
  /**
   * Get JSON representation of this span.
   *
   * @hidden
   * @internal This method is purely for internal purposes and should not be used outside
   * of SDK code. If you need to get a JSON representation of a span,
   * use `spanToJSON(span)` instead.
   */
  getSpanJSON() {
    return {
      data: this._attributes,
      description: this._name,
      op: this._attributes[jt],
      parent_span_id: this._parentSpanId,
      span_id: this._spanId,
      start_timestamp: this._startTime,
      status: Us(this._status),
      timestamp: this._endTime,
      trace_id: this._traceId,
      origin: this._attributes[J],
      profile_id: this._attributes[On],
      exclusive_time: this._attributes[vn],
      measurements: Or(this._events),
      is_segment: this._isStandaloneSpan && F(this) === this || void 0,
      segment_id: this._isStandaloneSpan ? F(this).spanContext().spanId : void 0,
      links: Fs(this._links)
    };
  }
  /** @inheritdoc */
  isRecording() {
    return !this._endTime && !!this._sampled;
  }
  /**
   * @inheritdoc
   */
  addEvent(t, n, r) {
    y && h.log("[Tracing] Adding an event to span:", t);
    const s = Mr(n) ? n : r || mt(), i = Mr(n) ? {} : n || {}, o = {
      name: t,
      time: dt(s),
      attributes: i
    };
    return this._events.push(o), this;
  }
  /**
   * This method should generally not be used,
   * but for now we need a way to publicly check if the `_isStandaloneSpan` flag is set.
   * USE THIS WITH CAUTION!
   * @internal
   * @hidden
   * @experimental
   */
  isStandaloneSpan() {
    return !!this._isStandaloneSpan;
  }
  /** Emit `spanEnd` when the span is ended. */
  _onSpanEnded() {
    const t = I();
    if (t && t.emit("spanEnd", this), !(this._isStandaloneSpan || this === F(this)))
      return;
    if (this._isStandaloneSpan) {
      this._sampled ? da(ca([this], t)) : (y && h.log("[Tracing] Discarding standalone span because its trace was not chosen to be sampled."), t && t.recordDroppedEvent("sample_rate", "span"));
      return;
    }
    const r = this._convertSpanToTransaction();
    r && (fe(this).scope || v()).captureEvent(r);
  }
  /**
   * Finish the transaction & prepare the event to send to Sentry.
   */
  _convertSpanToTransaction() {
    var f;
    if (!wr(M(this)))
      return;
    this._name || (y && h.warn("Transaction has no name, falling back to `<unlabeled transaction>`."), this._name = "<unlabeled transaction>");
    const { scope: t, isolationScope: n } = fe(this), r = (f = t == null ? void 0 : t.getScopeData().sdkProcessingMetadata) == null ? void 0 : f.normalizedRequest;
    if (this._sampled !== !0)
      return;
    const i = Wo(this).filter((p) => p !== this && !fa(p)).map((p) => M(p)).filter(wr), o = this._attributes[le];
    delete this._attributes[Er], i.forEach((p) => {
      delete p.data[Er];
    });
    const a = l({
      contexts: {
        trace: Bo(this)
      },
      spans: (
        // spans.sort() mutates the array, but `spans` is already a copy so we can safely do this here
        // we do not use spans anymore after this point
        i.length > vr ? i.sort((p, m) => p.start_timestamp - m.start_timestamp).slice(0, vr) : i
      ),
      start_timestamp: this._startTime,
      timestamp: this._endTime,
      transaction: this._name,
      type: "transaction",
      sdkProcessingMetadata: {
        capturedSpanScope: t,
        capturedSpanIsolationScope: n,
        dynamicSamplingContext: gt(this)
      },
      request: r
    }, o && {
      transaction_info: {
        source: o
      }
    }), c = Or(this._events);
    return c && Object.keys(c).length && (y && h.log(
      "[Measurements] Adding measurements to transaction event",
      JSON.stringify(c, void 0, 2)
    ), a.measurements = c), a;
  }
}
function Mr(e) {
  return e && typeof e == "number" || e instanceof Date || Array.isArray(e);
}
function wr(e) {
  return !!e.start_timestamp && !!e.timestamp && !!e.span_id && !!e.trace_id;
}
function fa(e) {
  return e instanceof Dn && e.isStandaloneSpan();
}
function da(e) {
  const t = I();
  if (!t)
    return;
  const n = e[1];
  if (!n || n.length === 0) {
    t.recordDroppedEvent("before_send", "span");
    return;
  }
  t.sendEnvelope(e);
}
function xe(e, t, n = () => {
}, r = () => {
}) {
  let s;
  try {
    s = e();
  } catch (i) {
    throw t(i), n(), i;
  }
  return pa(s, t, n, r);
}
function pa(e, t, n, r) {
  return At(e) ? e.then(
    (s) => (n(), r(s), s),
    (s) => {
      throw t(s), n(), s;
    }
  ) : (n(), r(e), e);
}
function zs(e, t, n) {
  if (!xn(e))
    return [!1];
  let r, s;
  typeof e.tracesSampler == "function" ? (s = e.tracesSampler(S(l({}, t), {
    inheritOrSampleWith: (a) => typeof t.parentSampleRate == "number" ? t.parentSampleRate : typeof t.parentSampled == "boolean" ? Number(t.parentSampled) : a
  })), r = !0) : t.parentSampled !== void 0 ? s = t.parentSampled : typeof e.tracesSampleRate != "undefined" && (s = e.tracesSampleRate, r = !0);
  const i = wn(s);
  if (i === void 0)
    return y && h.warn(
      `[Tracing] Discarding root span because of invalid sample rate. Sample rate must be a boolean or a number between 0 and 1. Got ${JSON.stringify(
        s
      )} of type ${JSON.stringify(typeof s)}.`
    ), [!1];
  if (!i)
    return y && h.log(
      `[Tracing] Discarding transaction because ${typeof e.tracesSampler == "function" ? "tracesSampler returned 0 or false" : "a negative sampling decision was inherited or tracesSampleRate is set to 0"}`
    ), [!1, i, r];
  const o = n < i;
  return o || y && h.log(
    `[Tracing] Discarding transaction because it's not included in the random sample (sampling rate = ${Number(
      s
    )})`
  ), [o, i, r];
}
const Ys = "__SENTRY_SUPPRESS_TRACING__";
function qt(e, t) {
  const n = Pe();
  if (n.startSpan)
    return n.startSpan(e, t);
  const r = jn(e), { forceTransaction: s, parentSpan: i, scope: o } = e, a = o == null ? void 0 : o.clone();
  return V(a, () => Ks(i)(() => {
    const u = v(), f = Fn(u, i), m = e.onlyIfParent && !f ? new Wt() : Ln({
      parentSpan: f,
      spanArguments: r,
      forceTransaction: s,
      scope: u
    });
    return Lt(u, m), xe(
      () => t(m),
      () => {
        const { status: d } = M(m);
        m.isRecording() && (!d || d === "ok") && m.setStatus({ code: T, message: "internal_error" });
      },
      () => {
        m.end();
      }
    );
  }));
}
function de(e, t) {
  const n = Pe();
  if (n.startSpanManual)
    return n.startSpanManual(e, t);
  const r = jn(e), { forceTransaction: s, parentSpan: i, scope: o } = e, a = o == null ? void 0 : o.clone();
  return V(a, () => Ks(i)(() => {
    const u = v(), f = Fn(u, i), m = e.onlyIfParent && !f ? new Wt() : Ln({
      parentSpan: f,
      spanArguments: r,
      forceTransaction: s,
      scope: u
    });
    return Lt(u, m), xe(
      // We pass the `finish` function to the callback, so the user can finish the span manually
      // this is mainly here for historic purposes because previously, we instructed users to call
      // `finish` instead of `span.end()` to also clean up the scope. Nowadays, calling `span.end()`
      // or `finish` has the same effect and we simply leave it here to avoid breaking user code.
      () => t(m, () => m.end()),
      () => {
        const { status: d } = M(m);
        m.isRecording() && (!d || d === "ok") && m.setStatus({ code: T, message: "internal_error" });
      }
    );
  }));
}
function td(e) {
  const t = Pe();
  if (t.startInactiveSpan)
    return t.startInactiveSpan(e);
  const n = jn(e), { forceTransaction: r, parentSpan: s } = e;
  return (e.scope ? (o) => V(e.scope, o) : s !== void 0 ? (o) => $n(s, o) : (o) => o())(() => {
    const o = v(), a = Fn(o, s);
    return e.onlyIfParent && !a ? new Wt() : Ln({
      parentSpan: a,
      spanArguments: n,
      forceTransaction: r,
      scope: o
    });
  });
}
function $n(e, t) {
  const n = Pe();
  return n.withActiveSpan ? n.withActiveSpan(e, t) : V((r) => (Lt(r, e || void 0), t(r)));
}
function ed(e) {
  return V((t) => (t.setPropagationContext({
    traceId: at(),
    sampleRand: Math.random()
  }), y && h.log(`Starting a new trace with id ${t.getPropagationContext().traceId}`), $n(null, e)));
}
function Ln({
  parentSpan: e,
  spanArguments: t,
  forceTransaction: n,
  scope: r
}) {
  if (!xn()) {
    const o = new Wt();
    if (n || !e) {
      const a = l({
        sampled: "false",
        sample_rate: "0",
        transaction: t.name
      }, gt(o));
      Xe(o, a);
    }
    return o;
  }
  const s = C();
  let i;
  if (e && !n)
    i = ma(e, r, t), Bs(e, i);
  else if (e) {
    const o = gt(e), { traceId: a, spanId: c } = e.spanContext(), u = Ht(e);
    i = Cr(
      l({
        traceId: a,
        parentSpanId: c
      }, t),
      r,
      u
    ), Xe(i, o);
  } else {
    const {
      traceId: o,
      dsc: a,
      parentSpanId: c,
      sampled: u
    } = l(l({}, s.getPropagationContext()), r.getPropagationContext());
    i = Cr(
      l({
        traceId: o,
        parentSpanId: c
      }, t),
      r,
      u
    ), a && Xe(i, a);
  }
  return ua(i), vo(i, r, s), i;
}
function jn(e) {
  const t = e.experimental || {}, n = l({
    isStandalone: t.standalone
  }, e);
  if (e.startTime) {
    const r = l({}, n);
    return r.startTimestamp = dt(e.startTime), delete r.startTime, r;
  }
  return n;
}
function Pe() {
  const e = Et();
  return Gt(e);
}
function Cr(e, t, n) {
  var _, g;
  const r = I(), s = (r == null ? void 0 : r.getOptions()) || {}, { name: i = "" } = e, o = { spanAttributes: l({}, e.attributes), spanName: i, parentSampled: n };
  r == null || r.emit("beforeSampling", o, { decision: !1 });
  const a = (_ = o.parentSampled) != null ? _ : n, c = o.spanAttributes, u = t.getPropagationContext(), [f, p, m] = t.getScopeData().sdkProcessingMetadata[Ys] ? [!1] : zs(
    s,
    {
      name: i,
      parentSampled: a,
      attributes: c,
      parentSampleRate: wn((g = u.dsc) == null ? void 0 : g.sample_rate)
    },
    u.sampleRand
  ), d = new Dn(S(l({}, e), {
    attributes: l({
      [le]: "custom",
      [Ms]: p !== void 0 && m ? p : void 0
    }, c),
    sampled: f
  }));
  return !f && r && (y && h.log("[Tracing] Discarding root span because its trace was not chosen to be sampled."), r.recordDroppedEvent("sample_rate", "transaction")), r && r.emit("spanStart", d), d;
}
function ma(e, t, n) {
  const { spanId: r, traceId: s } = e.spanContext(), i = t.getScopeData().sdkProcessingMetadata[Ys] ? !1 : Ht(e), o = i ? new Dn(S(l({}, n), {
    parentSpanId: r,
    traceId: s,
    sampled: i
  })) : new Wt({ traceId: s });
  Bs(e, o);
  const a = I();
  return a && (a.emit("spanStart", o), n.endTimestamp && a.emit("spanEnd", o)), o;
}
function Fn(e, t) {
  if (t)
    return t;
  if (t === null)
    return;
  const n = ht(e);
  if (!n)
    return;
  const r = I();
  return (r ? r.getOptions() : {}).parentSpanIsAlwaysRootSpan ? F(n) : n;
}
function Ks(e) {
  return e !== void 0 ? (t) => $n(e, t) : (t) => t();
}
const Ze = 0, xr = 1, Pr = 2;
function De(e) {
  return new yt((t) => {
    t(e);
  });
}
function Un(e) {
  return new yt((t, n) => {
    n(e);
  });
}
class yt {
  constructor(t) {
    this._state = Ze, this._handlers = [], this._runExecutor(t);
  }
  /** @inheritdoc */
  then(t, n) {
    return new yt((r, s) => {
      this._handlers.push([
        !1,
        (i) => {
          if (!t)
            r(i);
          else
            try {
              r(t(i));
            } catch (o) {
              s(o);
            }
        },
        (i) => {
          if (!n)
            s(i);
          else
            try {
              r(n(i));
            } catch (o) {
              s(o);
            }
        }
      ]), this._executeHandlers();
    });
  }
  /** @inheritdoc */
  catch(t) {
    return this.then((n) => n, t);
  }
  /** @inheritdoc */
  finally(t) {
    return new yt((n, r) => {
      let s, i;
      return this.then(
        (o) => {
          i = !1, s = o, t && t();
        },
        (o) => {
          i = !0, s = o, t && t();
        }
      ).then(() => {
        if (i) {
          r(s);
          return;
        }
        n(s);
      });
    });
  }
  /** Excute the resolve/reject handlers. */
  _executeHandlers() {
    if (this._state === Ze)
      return;
    const t = this._handlers.slice();
    this._handlers = [], t.forEach((n) => {
      n[0] || (this._state === xr && n[1](this._value), this._state === Pr && n[2](this._value), n[0] = !0);
    });
  }
  /** Run the executor for the SyncPromise. */
  _runExecutor(t) {
    const n = (i, o) => {
      if (this._state === Ze) {
        if (At(o)) {
          o.then(r, s);
          return;
        }
        this._state = i, this._value = o, this._executeHandlers();
      }
    }, r = (i) => {
      n(xr, i);
    }, s = (i) => {
      n(Pr, i);
    };
    try {
      t(r, s);
    } catch (i) {
      s(i);
    }
  }
}
function ha(e, t, n, r = 0) {
  try {
    const s = fn(t, n, e, r);
    return At(s) ? s : De(s);
  } catch (s) {
    return Un(s);
  }
}
function fn(e, t, n, r) {
  const s = n[r];
  if (!e || !s)
    return e;
  const i = s(l({}, e), t);
  return y && i === null && h.log(`Event processor "${s.id || "?"}" dropped event`), At(i) ? i.then((o) => fn(o, t, n, r + 1)) : fn(i, t, n, r + 1);
}
function _a(e, t) {
  const { fingerprint: n, span: r, breadcrumbs: s, sdkProcessingMetadata: i } = t;
  ga(e, t), r && Ea(e, r), ba(e, n), ya(e, s), Sa(e, i);
}
function St(e, t) {
  const {
    extra: n,
    tags: r,
    user: s,
    contexts: i,
    level: o,
    sdkProcessingMetadata: a,
    breadcrumbs: c,
    fingerprint: u,
    eventProcessors: f,
    attachments: p,
    propagationContext: m,
    transactionName: d,
    span: _
  } = t;
  ee(e, "extra", n), ee(e, "tags", r), ee(e, "user", s), ee(e, "contexts", i), e.sdkProcessingMetadata = Bt(e.sdkProcessingMetadata, a, 2), o && (e.level = o), d && (e.transactionName = d), _ && (e.span = _), c.length && (e.breadcrumbs = [...e.breadcrumbs, ...c]), u.length && (e.fingerprint = [...e.fingerprint, ...u]), f.length && (e.eventProcessors = [...e.eventProcessors, ...f]), p.length && (e.attachments = [...e.attachments, ...p]), e.propagationContext = l(l({}, e.propagationContext), m);
}
function ee(e, t, n) {
  e[t] = Bt(e[t], n, 1);
}
function ga(e, t) {
  const { extra: n, tags: r, user: s, contexts: i, level: o, transactionName: a } = t;
  Object.keys(n).length && (e.extra = l(l({}, n), e.extra)), Object.keys(r).length && (e.tags = l(l({}, r), e.tags)), Object.keys(s).length && (e.user = l(l({}, s), e.user)), Object.keys(i).length && (e.contexts = l(l({}, i), e.contexts)), o && (e.level = o), a && e.type !== "transaction" && (e.transaction = a);
}
function ya(e, t) {
  const n = [...e.breadcrumbs || [], ...t];
  e.breadcrumbs = n.length ? n : void 0;
}
function Sa(e, t) {
  e.sdkProcessingMetadata = l(l({}, e.sdkProcessingMetadata), t);
}
function Ea(e, t) {
  e.contexts = l({
    trace: js(t)
  }, e.contexts), e.sdkProcessingMetadata = l({
    dynamicSamplingContext: gt(t)
  }, e.sdkProcessingMetadata);
  const n = F(t), r = M(n).description;
  r && !e.transaction && e.type === "transaction" && (e.transaction = r);
}
function ba(e, t) {
  e.fingerprint = e.fingerprint ? Array.isArray(e.fingerprint) ? e.fingerprint : [e.fingerprint] : [], t && (e.fingerprint = e.fingerprint.concat(t)), e.fingerprint.length || delete e.fingerprint;
}
let W, Dr, $r, Y;
function Ta(e) {
  const t = b._sentryDebugIds, n = b._debugIds;
  if (!t && !n)
    return {};
  const r = t ? Object.keys(t) : [], s = n ? Object.keys(n) : [];
  if (Y && r.length === Dr && s.length === $r)
    return Y;
  Dr = r.length, $r = s.length, Y = {}, W || (W = {});
  const i = (o, a) => {
    for (const c of o) {
      const u = a[c], f = W == null ? void 0 : W[c];
      if (f && Y && u)
        Y[f[0]] = u, W && (W[c] = [f[0], u]);
      else if (u) {
        const p = e(c);
        for (let m = p.length - 1; m >= 0; m--) {
          const d = p[m], _ = d == null ? void 0 : d.filename;
          if (_ && Y && W) {
            Y[_] = u, W[c] = [_, u];
            break;
          }
        }
      }
    }
  };
  return t && i(r, t), n && i(s, n), Y;
}
function Ia(e, t, n, r, s, i) {
  const { normalizeDepth: o = 3, normalizeMaxBreadth: a = 1e3 } = e, c = S(l({}, t), {
    event_id: t.event_id || n.event_id || D(),
    timestamp: t.timestamp || $()
  }), u = n.integrations || e.integrations.map((E) => E.name);
  Aa(c, e), ka(c, u), s && s.emit("applyFrameMetadata", t), t.type === void 0 && Ra(c, e.stackParser);
  const f = va(r, n.captureContext);
  n.mechanism && pt(c, n.mechanism);
  const p = s ? s.getEventProcessors() : [], m = kn().getScopeData();
  if (i) {
    const E = i.getScopeData();
    St(m, E);
  }
  if (f) {
    const E = f.getScopeData();
    St(m, E);
  }
  const d = [...n.attachments || [], ...m.attachments];
  d.length && (n.attachments = d), _a(c, m);
  const _ = [
    ...p,
    // Run scope event processors _after_ all other processors
    ...m.eventProcessors
  ];
  return ha(_, c, n).then((E) => (E && Na(E), typeof o == "number" && o > 0 ? Oa(E, o, a) : E));
}
function Aa(e, t) {
  var a, c;
  const { environment: n, release: r, dist: s, maxValueLength: i } = t;
  e.environment = e.environment || n || Pn, !e.release && r && (e.release = r), !e.dist && s && (e.dist = s);
  const o = e.request;
  o != null && o.url && i && (o.url = $t(o.url, i)), i && ((c = (a = e.exception) == null ? void 0 : a.values) == null || c.forEach((u) => {
    u.value && (u.value = $t(u.value, i));
  }));
}
function Ra(e, t) {
  var r, s;
  const n = Ta(t);
  (s = (r = e.exception) == null ? void 0 : r.values) == null || s.forEach((i) => {
    var o, a;
    (a = (o = i.stacktrace) == null ? void 0 : o.frames) == null || a.forEach((c) => {
      c.filename && (c.debug_id = n[c.filename]);
    });
  });
}
function Na(e) {
  var r, s;
  const t = {};
  if ((s = (r = e.exception) == null ? void 0 : r.values) == null || s.forEach((i) => {
    var o, a;
    (a = (o = i.stacktrace) == null ? void 0 : o.frames) == null || a.forEach((c) => {
      c.debug_id && (c.abs_path ? t[c.abs_path] = c.debug_id : c.filename && (t[c.filename] = c.debug_id), delete c.debug_id);
    });
  }), Object.keys(t).length === 0)
    return;
  e.debug_meta = e.debug_meta || {}, e.debug_meta.images = e.debug_meta.images || [];
  const n = e.debug_meta.images;
  Object.entries(t).forEach(([i, o]) => {
    n.push({
      type: "sourcemap",
      code_file: i,
      debug_id: o
    });
  });
}
function ka(e, t) {
  t.length > 0 && (e.sdk = e.sdk || {}, e.sdk.integrations = [...e.sdk.integrations || [], ...t]);
}
function Oa(e, t, n) {
  var s, i;
  if (!e)
    return null;
  const r = l(l(l(l(l({}, e), e.breadcrumbs && {
    breadcrumbs: e.breadcrumbs.map((o) => l(l({}, o), o.data && {
      data: P(o.data, t, n)
    }))
  }), e.user && {
    user: P(e.user, t, n)
  }), e.contexts && {
    contexts: P(e.contexts, t, n)
  }), e.extra && {
    extra: P(e.extra, t, n)
  });
  return (s = e.contexts) != null && s.trace && r.contexts && (r.contexts.trace = e.contexts.trace, e.contexts.trace.data && (r.contexts.trace.data = P(e.contexts.trace.data, t, n))), e.spans && (r.spans = e.spans.map((o) => l(l({}, o), o.data && {
    data: P(o.data, t, n)
  }))), (i = e.contexts) != null && i.flags && r.contexts && (r.contexts.flags = P(e.contexts.flags, 3, n)), r;
}
function va(e, t) {
  if (!t)
    return e;
  const n = e ? e.clone() : new G();
  return n.update(t), n;
}
function Ma(e) {
  if (e)
    return wa(e) ? { captureContext: e } : xa(e) ? {
      captureContext: e
    } : e;
}
function wa(e) {
  return e instanceof G || typeof e == "function";
}
const Ca = [
  "user",
  "level",
  "extra",
  "contexts",
  "tags",
  "fingerprint",
  "propagationContext"
];
function xa(e) {
  return Object.keys(e).some((t) => Ca.includes(t));
}
function O(e, t) {
  return v().captureException(e, Ma(t));
}
function Lr(e, t) {
  const n = typeof t == "string" ? t : void 0, r = typeof t != "string" ? { captureContext: t } : void 0;
  return v().captureMessage(e, n, r);
}
function Pa(e, t) {
  return v().captureEvent(e, t);
}
function nd(e, t) {
  C().setContext(e, t);
}
function rd(e) {
  C().setExtras(e);
}
function jr(e, t) {
  C().setExtra(e, t);
}
function sd(e) {
  C().setTags(e);
}
function Fr(e, t) {
  C().setTag(e, t);
}
function id(e) {
  C().setUser(e);
}
function Vs() {
  return C().lastEventId();
}
function $e(e) {
  C().addEventProcessor(e);
}
const Da = "7";
function $a(e) {
  const t = e.protocol ? `${e.protocol}:` : "", n = e.port ? `:${e.port}` : "";
  return `${t}//${e.host}${n}${e.path ? `/${e.path}` : ""}/api/`;
}
function La(e) {
  return `${$a(e)}${e.projectId}/envelope/`;
}
function ja(e, t) {
  const n = {
    sentry_version: Da
  };
  return e.publicKey && (n.sentry_key = e.publicKey), t && (n.sentry_client = `${t.name}/${t.version}`), new URLSearchParams(n).toString();
}
function Xs(e, t, n) {
  return t || `${La(e)}?${ja(e, n)}`;
}
const Ur = [];
function Fa(e, t) {
  const n = {};
  return t.forEach((r) => {
    r && Zs(e, r, n);
  }), n;
}
function Br(e, t) {
  for (const n of t)
    n != null && n.afterAllSetup && n.afterAllSetup(e);
}
function Zs(e, t, n) {
  if (n[t.name]) {
    y && h.log(`Integration skipped because it was already installed: ${t.name}`);
    return;
  }
  if (n[t.name] = t, !Ur.includes(t.name) && typeof t.setupOnce == "function" && (t.setupOnce(), Ur.push(t.name)), t.setup && typeof t.setup == "function" && t.setup(e), typeof t.preprocessEvent == "function") {
    const r = t.preprocessEvent.bind(t);
    e.on("preprocessEvent", (s, i) => r(s, i, e));
  }
  if (typeof t.processEvent == "function") {
    const r = t.processEvent.bind(t), s = Object.assign((i, o) => r(i, o, e), {
      id: t.name
    });
    e.addEventProcessor(s);
  }
  y && h.log(`Integration installed: ${t.name}`);
}
function Qs(e, t) {
  return t ? V(t, () => {
    const n = Ce(), r = n ? js(n) : vs(t);
    return [n ? gt(n) : Ws(e, t), r];
  }) : [void 0, void 0];
}
const Ua = {
  trace: 1,
  debug: 5,
  info: 9,
  warn: 13,
  error: 17,
  fatal: 21
};
function Ba(e) {
  return [
    {
      type: "log",
      item_count: e.length,
      content_type: "application/vnd.sentry.items.log+json"
    },
    {
      items: e
    }
  ];
}
function Ga(e, t, n, r) {
  const s = {};
  return t != null && t.sdk && (s.sdk = {
    name: t.sdk.name,
    version: t.sdk.version
  }), n && r && (s.dsn = Nt(r)), X(s, [Ba(e)]);
}
const Ha = 100;
function Wa(e) {
  var t;
  switch (typeof e) {
    case "number":
      return Number.isInteger(e) ? {
        value: e,
        type: "integer"
      } : {
        value: e,
        type: "double"
      };
    case "boolean":
      return {
        value: e,
        type: "boolean"
      };
    case "string":
      return {
        value: e,
        type: "string"
      };
    default: {
      let n = "";
      try {
        n = (t = JSON.stringify(e)) != null ? t : "";
      } catch (r) {
      }
      return {
        value: n,
        type: "string"
      };
    }
  }
}
function j(e, t, n, r = !0) {
  n && (!e[t] || r) && (e[t] = n);
}
function qa(e, t) {
  const n = Bn(), r = ei(e);
  r === void 0 ? n.set(e, [t]) : r.length >= Ha ? (ti(e, r), n.set(e, [t])) : n.set(e, [...r, t]);
}
function pe(e, t = v(), n = qa) {
  var or, ar, cr;
  const r = (or = t == null ? void 0 : t.getClient()) != null ? or : I();
  if (!r) {
    y && h.warn("No client available to capture log.");
    return;
  }
  const { release: s, environment: i, enableLogs: o = !1, beforeSendLog: a } = r.getOptions();
  if (!o) {
    y && h.warn("logging option not enabled, log will not be captured.");
    return;
  }
  const [, c] = Qs(r, t), u = l({}, e.attributes), {
    user: { id: f, email: p, username: m }
  } = Ja(t);
  j(u, "user.id", f, !1), j(u, "user.email", p, !1), j(u, "user.name", m, !1), j(u, "sentry.release", s), j(u, "sentry.environment", i);
  const { name: d, version: _ } = (cr = (ar = r.getSdkMetadata()) == null ? void 0 : ar.sdk) != null ? cr : {};
  j(u, "sentry.sdk.name", d), j(u, "sentry.sdk.version", _);
  const g = r.getIntegrationByName("Replay"), E = g == null ? void 0 : g.getReplayId(!0);
  j(u, "sentry.replay_id", E), E && (g == null ? void 0 : g.getRecordingMode()) === "buffer" && j(u, "sentry._internal.replay_is_buffering", !0);
  const N = e.message;
  if (An(N)) {
    const { __sentry_template_string__: Kt, __sentry_template_values__: et = [] } = N;
    et != null && et.length && (u["sentry.message.template"] = Kt), et.forEach((ji, Fi) => {
      u[`sentry.message.parameter.${Fi}`] = ji;
    });
  }
  const R = ht(t);
  j(u, "sentry.trace.parent_span_id", R == null ? void 0 : R.spanContext().spanId);
  const x = S(l({}, e), { attributes: u });
  r.emit("beforeCaptureLog", x);
  const H = a ? Tt(() => a(x)) : x;
  if (!H) {
    r.recordDroppedEvent("before_send", "log_item", 1), y && h.warn("beforeSendLog returned null, log will not be captured.");
    return;
  }
  const { level: Q, message: We, attributes: Yt = {}, severityNumber: qe } = H, Li = {
    timestamp: mt(),
    level: Q,
    body: We,
    trace_id: c == null ? void 0 : c.trace_id,
    severity_number: qe != null ? qe : Ua[Q],
    attributes: Object.keys(Yt).reduce(
      (Kt, et) => (Kt[et] = Wa(Yt[et]), Kt),
      {}
    )
  };
  n(r, Li), r.emit("afterCaptureLog", H);
}
function ti(e, t) {
  var i;
  const n = (i = t != null ? t : ei(e)) != null ? i : [];
  if (n.length === 0)
    return;
  const r = e.getOptions(), s = Ga(n, r._metadata, r.tunnel, e.getDsn());
  Bn().set(e, []), e.emit("flushLogs"), e.sendEnvelope(s);
}
function ei(e) {
  return Bn().get(e);
}
function Ja(e) {
  const t = kn().getScopeData();
  return St(t, C().getScopeData()), St(t, e.getScopeData()), t;
}
function Bn() {
  return bt("clientToLogBufferMap", () => /* @__PURE__ */ new WeakMap());
}
function za(e) {
  return [
    {
      type: "trace_metric",
      item_count: e.length,
      content_type: "application/vnd.sentry.items.trace-metric+json"
    },
    {
      items: e
    }
  ];
}
function Ya(e, t, n, r) {
  const s = {};
  return t != null && t.sdk && (s.sdk = {
    name: t.sdk.name,
    version: t.sdk.version
  }), n && r && (s.dsn = Nt(r)), X(s, [za(e)]);
}
const Ka = 1e3;
function Va(e) {
  var t;
  switch (typeof e) {
    case "number":
      return Number.isInteger(e) ? {
        value: e,
        type: "integer"
      } : {
        value: e,
        type: "double"
      };
    case "boolean":
      return {
        value: e,
        type: "boolean"
      };
    case "string":
      return {
        value: e,
        type: "string"
      };
    default: {
      let n = "";
      try {
        n = (t = JSON.stringify(e)) != null ? t : "";
      } catch (r) {
      }
      return {
        value: n,
        type: "string"
      };
    }
  }
}
function q(e, t, n, r = !0) {
  n && (r || !(t in e)) && (e[t] = n);
}
function Xa(e, t) {
  const n = Gn(), r = ri(e);
  r === void 0 ? n.set(e, [t]) : r.length >= Ka ? (ni(e, r), n.set(e, [t])) : n.set(e, [...r, t]);
}
function Za(e, t, n) {
  var d, _;
  const { release: r, environment: s } = t.getOptions(), i = l({}, e.attributes), {
    user: { id: o, email: a, username: c }
  } = ec(n);
  q(i, "user.id", o, !1), q(i, "user.email", a, !1), q(i, "user.name", c, !1), q(i, "sentry.release", r), q(i, "sentry.environment", s);
  const { name: u, version: f } = (_ = (d = t.getSdkMetadata()) == null ? void 0 : d.sdk) != null ? _ : {};
  q(i, "sentry.sdk.name", u), q(i, "sentry.sdk.version", f);
  const p = t.getIntegrationByName("Replay"), m = p == null ? void 0 : p.getReplayId(!0);
  return q(i, "sentry.replay_id", m), m && (p == null ? void 0 : p.getRecordingMode()) === "buffer" && q(i, "sentry._internal.replay_is_buffering", !0), S(l({}, e), {
    attributes: i
  });
}
function Qa(e, t, n) {
  const r = {};
  for (const c in e.attributes)
    e.attributes[c] !== void 0 && (r[c] = Va(e.attributes[c]));
  const [, s] = Qs(t, n), i = ht(n), o = i ? i.spanContext().traceId : s == null ? void 0 : s.trace_id, a = i ? i.spanContext().spanId : void 0;
  return {
    timestamp: mt(),
    trace_id: o != null ? o : "",
    span_id: a,
    name: e.name,
    type: e.type,
    unit: e.unit,
    value: e.value,
    attributes: r
  };
}
function tc(e, t) {
  var d, _, g, E;
  const n = (d = t == null ? void 0 : t.scope) != null ? d : v(), r = (_ = t == null ? void 0 : t.captureSerializedMetric) != null ? _ : Xa, s = (g = n == null ? void 0 : n.getClient()) != null ? g : I();
  if (!s) {
    y && h.warn("No client available to capture metric.");
    return;
  }
  const { _experiments: i, enableMetrics: o, beforeSendMetric: a } = s.getOptions();
  if (!((E = o != null ? o : i == null ? void 0 : i.enableMetrics) != null ? E : !0)) {
    y && h.warn("metrics option not enabled, metric will not be captured.");
    return;
  }
  const u = Za(e, s, n);
  s.emit("processMetric", u);
  const f = a || (i == null ? void 0 : i.beforeSendMetric), p = f ? f(u) : u;
  if (!p) {
    y && h.log("`beforeSendMetric` returned `null`, will not send metric.");
    return;
  }
  const m = Qa(p, s, n);
  y && h.log("[Metric]", m), r(s, m), s.emit("afterCaptureMetric", p);
}
function ni(e, t) {
  var i;
  const n = (i = t != null ? t : ri(e)) != null ? i : [];
  if (n.length === 0)
    return;
  const r = e.getOptions(), s = Ya(n, r._metadata, r.tunnel, e.getDsn());
  Gn().set(e, []), e.emit("flushMetrics"), e.sendEnvelope(s);
}
function ri(e) {
  return Gn().get(e);
}
function ec(e) {
  const t = kn().getScopeData();
  return St(t, C().getScopeData()), St(t, e.getScopeData()), t;
}
function Gn() {
  return bt("clientToMetricBufferMap", () => /* @__PURE__ */ new WeakMap());
}
const Hn = Symbol.for("SentryBufferFullError");
function si(e = 100) {
  const t = /* @__PURE__ */ new Set();
  function n() {
    return t.size < e;
  }
  function r(o) {
    t.delete(o);
  }
  function s(o) {
    if (!n())
      return Un(Hn);
    const a = o();
    return t.add(a), a.then(
      () => r(a),
      () => r(a)
    ), a;
  }
  function i(o) {
    if (!t.size)
      return De(!0);
    const a = Promise.allSettled(Array.from(t)).then(() => !0);
    if (!o)
      return a;
    const c = [a, new Promise((u) => setTimeout(() => u(!1), o))];
    return Promise.race(c);
  }
  return {
    get $() {
      return Array.from(t);
    },
    add: s,
    drain: i
  };
}
const nc = 60 * 1e3;
function rc(e, t = Date.now()) {
  const n = parseInt(`${e}`, 10);
  if (!isNaN(n))
    return n * 1e3;
  const r = Date.parse(`${e}`);
  return isNaN(r) ? nc : r - t;
}
function sc(e, t) {
  return e[t] || e.all || 0;
}
function ic(e, t, n = Date.now()) {
  return sc(e, t) > n;
}
function oc(e, { statusCode: t, headers: n }, r = Date.now()) {
  const s = l({}, e), i = n == null ? void 0 : n["x-sentry-rate-limits"], o = n == null ? void 0 : n["retry-after"];
  if (i)
    for (const a of i.trim().split(",")) {
      const [c, u, , , f] = a.split(":", 5), p = parseInt(c, 10), m = (isNaN(p) ? 60 : p) * 1e3;
      if (!u)
        s.all = r + m;
      else
        for (const d of u.split(";"))
          d === "metric_bucket" ? (!f || f.split(";").includes("custom")) && (s[d] = r + m) : s[d] = r + m;
    }
  else o ? s.all = r + rc(o, r) : t === 429 && (s.all = r + 60 * 1e3);
  return s;
}
const ii = 64;
function ac(e, t, n = si(
  e.bufferSize || ii
)) {
  let r = {};
  const s = (o) => n.drain(o);
  function i(o) {
    const a = [];
    if (Ft(o, (p, m) => {
      const d = kr(m);
      ic(r, d) ? e.recordDroppedEvent("ratelimit_backoff", d) : a.push(p);
    }), a.length === 0)
      return Promise.resolve({});
    const c = X(o[0], a), u = (p) => {
      Ft(c, (m, d) => {
        e.recordDroppedEvent(p, kr(d));
      });
    }, f = () => t({ body: Qo(c) }).then(
      (p) => (p.statusCode !== void 0 && (p.statusCode < 200 || p.statusCode >= 300) && y && h.warn(`Sentry responded with status code ${p.statusCode} to sent event.`), r = oc(r, p), p),
      (p) => {
        throw u("network_error"), y && h.error("Encountered error running transport request:", p), p;
      }
    );
    return n.add(f).then(
      (p) => p,
      (p) => {
        if (p === Hn)
          return y && h.error("Skipped sending event because buffer is full."), u("queue_overflow"), Promise.resolve({});
        throw p;
      }
    );
  }
  return {
    send: i,
    flush: s
  };
}
function cc(e, t, n) {
  const r = [
    { type: "client_report" },
    {
      timestamp: $(),
      discarded_events: e
    }
  ];
  return X(t ? { dsn: t } : {}, [r]);
}
function oi(e) {
  const t = [];
  e.message && t.push(e.message);
  try {
    const n = e.exception.values[e.exception.values.length - 1];
    n != null && n.value && (t.push(n.value), n.type && t.push(`${n.type}: ${n.value}`));
  } catch (n) {
  }
  return t;
}
function uc(e) {
  var c, u, f;
  const { trace_id: t, parent_span_id: n, span_id: r, status: s, origin: i, data: o, op: a } = (u = (c = e.contexts) == null ? void 0 : c.trace) != null ? u : {};
  return {
    data: o != null ? o : {},
    description: e.transaction,
    op: a,
    parent_span_id: n,
    span_id: r != null ? r : "",
    start_timestamp: (f = e.start_timestamp) != null ? f : 0,
    status: s,
    timestamp: e.timestamp,
    trace_id: t != null ? t : "",
    origin: i,
    profile_id: o == null ? void 0 : o[On],
    exclusive_time: o == null ? void 0 : o[vn],
    measurements: e.measurements,
    is_segment: !0
  };
}
function lc(e) {
  return {
    type: "transaction",
    timestamp: e.timestamp,
    start_timestamp: e.start_timestamp,
    transaction: e.description,
    contexts: {
      trace: {
        trace_id: e.trace_id,
        span_id: e.span_id,
        parent_span_id: e.parent_span_id,
        op: e.op,
        status: e.status,
        origin: e.origin,
        data: l(l(l({}, e.data), e.profile_id && { [On]: e.profile_id }), e.exclusive_time && { [vn]: e.exclusive_time })
      }
    },
    measurements: e.measurements
  };
}
const Gr = "Not capturing exception because it's already been captured.", Hr = "Discarded session because of missing or non-string release", ai = Symbol.for("SentryInternalError"), ci = Symbol.for("SentryDoNotSendEventError"), fc = 5e3;
function ae(e) {
  return {
    message: e,
    [ai]: !0
  };
}
function Qe(e) {
  return {
    message: e,
    [ci]: !0
  };
}
function Wr(e) {
  return !!e && typeof e == "object" && ai in e;
}
function qr(e) {
  return !!e && typeof e == "object" && ci in e;
}
function Jr(e, t, n, r, s) {
  let i = 0, o, a = !1;
  e.on(n, () => {
    i = 0, clearTimeout(o), a = !1;
  }), e.on(t, (c) => {
    i += r(c), i >= 8e5 ? s(e) : a || (a = !0, o = setTimeout(() => {
      s(e);
    }, fc));
  }), e.on("flush", () => {
    s(e);
  });
}
class dc {
  /** Options passed to the SDK. */
  /** The client Dsn, if specified in options. Without this Dsn, the SDK will be disabled. */
  /** Array of set up integrations. */
  /** Number of calls being processed */
  /** Holds flushable  */
  // eslint-disable-next-line @typescript-eslint/ban-types
  /**
   * Initializes this client instance.
   *
   * @param options Options for the client.
   */
  constructor(t) {
    var r, s, i, o, a, c, u;
    if (this._options = t, this._integrations = {}, this._numProcessing = 0, this._outcomes = {}, this._hooks = {}, this._eventProcessors = [], this._promiseBuffer = si((s = (r = t.transportOptions) == null ? void 0 : r.bufferSize) != null ? s : ii), t.dsn ? this._dsn = Uo(t.dsn) : y && h.warn("No DSN provided, client will not send events."), this._dsn) {
      const f = Xs(
        this._dsn,
        t.tunnel,
        t._metadata ? t._metadata.sdk : void 0
      );
      this._transport = t.transport(S(l({
        tunnel: this._options.tunnel,
        recordDroppedEvent: this.recordDroppedEvent.bind(this)
      }, t.transportOptions), {
        url: f
      }));
    }
    this._options.enableLogs = (o = this._options.enableLogs) != null ? o : (i = this._options._experiments) == null ? void 0 : i.enableLogs, this._options.enableLogs && Jr(this, "afterCaptureLog", "flushLogs", _c, ti), ((u = (c = this._options.enableMetrics) != null ? c : (a = this._options._experiments) == null ? void 0 : a.enableMetrics) != null ? u : !0) && Jr(
      this,
      "afterCaptureMetric",
      "flushMetrics",
      hc,
      ni
    );
  }
  /**
   * Captures an exception event and sends it to Sentry.
   *
   * Unlike `captureException` exported from every SDK, this method requires that you pass it the current scope.
   */
  captureException(t, n, r) {
    const s = D();
    if (yr(t))
      return y && h.log(Gr), s;
    const i = l({
      event_id: s
    }, n);
    return this._process(
      () => this.eventFromException(t, i).then((o) => this._captureEvent(o, i, r)).then((o) => o),
      "error"
    ), i.event_id;
  }
  /**
   * Captures a message event and sends it to Sentry.
   *
   * Unlike `captureMessage` exported from every SDK, this method requires that you pass it the current scope.
   */
  captureMessage(t, n, r, s) {
    const i = l({
      event_id: D()
    }, r), o = An(t) ? t : String(t), a = Rn(t), c = a ? this.eventFromMessage(o, n, i) : this.eventFromException(t, i);
    return this._process(
      () => c.then((u) => this._captureEvent(u, i, s)),
      a ? "unknown" : "error"
    ), i.event_id;
  }
  /**
   * Captures a manually created event and sends it to Sentry.
   *
   * Unlike `captureEvent` exported from every SDK, this method requires that you pass it the current scope.
   */
  captureEvent(t, n, r) {
    const s = D();
    if (n != null && n.originalException && yr(n.originalException))
      return y && h.log(Gr), s;
    const i = l({
      event_id: s
    }, n), o = t.sdkProcessingMetadata || {}, a = o.capturedSpanScope, c = o.capturedSpanIsolationScope, u = zr(t.type);
    return this._process(
      () => this._captureEvent(t, i, a || r, c),
      u
    ), i.event_id;
  }
  /**
   * Captures a session.
   */
  captureSession(t) {
    this.sendSession(t), rn(t, { init: !1 });
  }
  /**
   * Create a cron monitor check in and send it to Sentry. This method is not available on all clients.
   *
   * @param checkIn An object that describes a check in.
   * @param upsertMonitorConfig An optional object that describes a monitor config. Use this if you want
   * to create a monitor automatically when sending a check in.
   * @param scope An optional scope containing event metadata.
   * @returns A string representing the id of the check in.
   */
  /**
   * Get the current Dsn.
   */
  getDsn() {
    return this._dsn;
  }
  /**
   * Get the current options.
   */
  getOptions() {
    return this._options;
  }
  /**
   * Get the SDK metadata.
   * @see SdkMetadata
   */
  getSdkMetadata() {
    return this._options._metadata;
  }
  /**
   * Returns the transport that is used by the client.
   * Please note that the transport gets lazy initialized so it will only be there once the first event has been sent.
   */
  getTransport() {
    return this._transport;
  }
  /**
   * Wait for all events to be sent or the timeout to expire, whichever comes first.
   *
   * @param timeout Maximum time in ms the client should wait for events to be flushed. Omitting this parameter will
   *   cause the client to wait until all events are sent before resolving the promise.
   * @returns A promise that will resolve with `true` if all events are sent before the timeout, or `false` if there are
   * still events in the queue when the timeout is reached.
   */
  // @ts-expect-error - PromiseLike is a subset of Promise
  flush(t) {
    return w(this, null, function* () {
      const n = this._transport;
      if (!n)
        return !0;
      this.emit("flush");
      const r = yield this._isClientDoneProcessing(t), s = yield n.flush(t);
      return r && s;
    });
  }
  /**
   * Flush the event queue and set the client to `enabled = false`. See {@link Client.flush}.
   *
   * @param {number} timeout Maximum time in ms the client should wait before shutting down. Omitting this parameter will cause
   *   the client to wait until all events are sent before disabling itself.
   * @returns {Promise<boolean>} A promise which resolves to `true` if the flush completes successfully before the timeout, or `false` if
   * it doesn't.
   */
  // @ts-expect-error - PromiseLike is a subset of Promise
  close(t) {
    return w(this, null, function* () {
      const n = yield this.flush(t);
      return this.getOptions().enabled = !1, this.emit("close"), n;
    });
  }
  /**
   * Get all installed event processors.
   */
  getEventProcessors() {
    return this._eventProcessors;
  }
  /**
   * Adds an event processor that applies to any event processed by this client.
   */
  addEventProcessor(t) {
    this._eventProcessors.push(t);
  }
  /**
   * Initialize this client.
   * Call this after the client was set on a scope.
   */
  init() {
    (this._isEnabled() || // Force integrations to be setup even if no DSN was set when we have
    // Spotlight enabled. This is particularly important for browser as we
    // don't support the `spotlight` option there and rely on the users
    // adding the `spotlightBrowserIntegration()` to their integrations which
    // wouldn't get initialized with the check below when there's no DSN set.
    this._options.integrations.some(({ name: t }) => t.startsWith("Spotlight"))) && this._setupIntegrations();
  }
  /**
   * Gets an installed integration by its name.
   *
   * @returns {Integration|undefined} The installed integration or `undefined` if no integration with that `name` was installed.
   */
  getIntegrationByName(t) {
    return this._integrations[t];
  }
  /**
   * Add an integration to the client.
   * This can be used to e.g. lazy load integrations.
   * In most cases, this should not be necessary,
   * and you're better off just passing the integrations via `integrations: []` at initialization time.
   * However, if you find the need to conditionally load & add an integration, you can use `addIntegration` to do so.
   */
  addIntegration(t) {
    const n = this._integrations[t.name];
    Zs(this, t, this._integrations), n || Br(this, [t]);
  }
  /**
   * Send a fully prepared event to Sentry.
   */
  sendEvent(t, n = {}) {
    this.emit("beforeSendEvent", t, n);
    let r = aa(t, this._dsn, this._options._metadata, this._options.tunnel);
    for (const s of n.attachments || [])
      r = Zo(r, na(s));
    this.sendEnvelope(r).then((s) => this.emit("afterSendEvent", t, s));
  }
  /**
   * Send a session or session aggregrates to Sentry.
   */
  sendSession(t) {
    const { release: n, environment: r = Pn } = this._options;
    if ("aggregates" in t) {
      const i = t.attrs || {};
      if (!i.release && !n) {
        y && h.warn(Hr);
        return;
      }
      i.release = i.release || n, i.environment = i.environment || r, t.attrs = i;
    } else {
      if (!t.release && !n) {
        y && h.warn(Hr);
        return;
      }
      t.release = t.release || n, t.environment = t.environment || r;
    }
    this.emit("beforeSendSession", t);
    const s = oa(t, this._dsn, this._options._metadata, this._options.tunnel);
    this.sendEnvelope(s);
  }
  /**
   * Record on the client that an event got dropped (ie, an event that will not be sent to Sentry).
   */
  recordDroppedEvent(t, n, r = 1) {
    if (this._options.sendClientReports) {
      const s = `${t}:${n}`;
      y && h.log(`Recording outcome: "${s}"${r > 1 ? ` (${r} times)` : ""}`), this._outcomes[s] = (this._outcomes[s] || 0) + r;
    }
  }
  /* eslint-disable @typescript-eslint/unified-signatures */
  /**
   * Register a callback for whenever a span is started.
   * Receives the span as argument.
   * @returns {() => void} A function that, when executed, removes the registered callback.
   */
  /**
   * Register a hook on this client.
   */
  on(t, n) {
    const r = this._hooks[t] = this._hooks[t] || /* @__PURE__ */ new Set(), s = (...i) => n(...i);
    return r.add(s), () => {
      r.delete(s);
    };
  }
  /** Fire a hook whenever a span starts. */
  /**
   * Emit a hook that was previously registered via `on()`.
   */
  emit(t, ...n) {
    const r = this._hooks[t];
    r && r.forEach((s) => s(...n));
  }
  /**
   * Send an envelope to Sentry.
   */
  // @ts-expect-error - PromiseLike is a subset of Promise
  sendEnvelope(t) {
    return w(this, null, function* () {
      if (this.emit("beforeEnvelope", t), this._isEnabled() && this._transport)
        try {
          return yield this._transport.send(t);
        } catch (n) {
          return y && h.error("Error while sending envelope:", n), {};
        }
      return y && h.error("Transport disabled"), {};
    });
  }
  /* eslint-enable @typescript-eslint/unified-signatures */
  /** Setup integrations for this client. */
  _setupIntegrations() {
    const { integrations: t } = this._options;
    this._integrations = Fa(this, t), Br(this, t);
  }
  /** Updates existing session based on the provided event */
  _updateSessionFromEvent(t, n) {
    var c, u;
    let r = n.level === "fatal", s = !1;
    const i = (c = n.exception) == null ? void 0 : c.values;
    if (i) {
      s = !0, r = !1;
      for (const f of i)
        if (((u = f.mechanism) == null ? void 0 : u.handled) === !1) {
          r = !0;
          break;
        }
    }
    const o = t.status === "ok";
    (o && t.errors === 0 || o && r) && (rn(t, S(l({}, r && { status: "crashed" }), {
      errors: t.errors || Number(s || r)
    })), this.captureSession(t));
  }
  /**
   * Determine if the client is finished processing. Returns a promise because it will wait `timeout` ms before saying
   * "no" (resolving to `false`) in order to give the client a chance to potentially finish first.
   *
   * @param timeout The time, in ms, after which to resolve to `false` if the client is still busy. Passing `0` (or not
   * passing anything) will make the promise wait as long as it takes for processing to finish before resolving to
   * `true`.
   * @returns A promise which will resolve to `true` if processing is already done or finishes before the timeout, and
   * `false` otherwise
   */
  _isClientDoneProcessing(t) {
    return w(this, null, function* () {
      let n = 0;
      for (; !t || n < t; ) {
        if (yield new Promise((r) => setTimeout(r, 1)), !this._numProcessing)
          return !0;
        n++;
      }
      return !1;
    });
  }
  /** Determines whether this SDK is enabled and a transport is present. */
  _isEnabled() {
    return this.getOptions().enabled !== !1 && this._transport !== void 0;
  }
  /**
   * Adds common information to events.
   *
   * The information includes release and environment from `options`,
   * breadcrumbs and context (extra, tags and user) from the scope.
   *
   * Information that is already present in the event is never overwritten. For
   * nested objects, such as the context, keys are merged.
   *
   * @param event The original event.
   * @param hint May contain additional information about the original exception.
   * @param currentScope A scope containing event metadata.
   * @returns A new event with more information.
   */
  _prepareEvent(t, n, r, s) {
    const i = this.getOptions(), o = Object.keys(this._integrations);
    return !n.integrations && (o != null && o.length) && (n.integrations = o), this.emit("preprocessEvent", t, n), t.type || s.setLastEventId(t.event_id || n.event_id), Ia(i, t, n, r, this, s).then((a) => {
      if (a === null)
        return a;
      this.emit("postprocessEvent", a, n), a.contexts = l({
        trace: vs(r)
      }, a.contexts);
      const c = Ws(this, r);
      return a.sdkProcessingMetadata = l({
        dynamicSamplingContext: c
      }, a.sdkProcessingMetadata), a;
    });
  }
  /**
   * Processes the event and logs an error in case of rejection
   * @param event
   * @param hint
   * @param scope
   */
  _captureEvent(t, n = {}, r = v(), s = C()) {
    return y && dn(t) && h.log(`Captured error event \`${oi(t)[0] || "<unknown>"}\``), this._processEvent(t, n, r, s).then(
      (i) => i.event_id,
      (i) => {
        y && (qr(i) ? h.log(i.message) : Wr(i) ? h.warn(i.message) : h.warn(i));
      }
    );
  }
  /**
   * Processes an event (either error or message) and sends it to Sentry.
   *
   * This also adds breadcrumbs and context information to the event. However,
   * platform specific meta data (such as the User's IP address) must be added
   * by the SDK implementor.
   *
   *
   * @param event The event to send to Sentry.
   * @param hint May contain additional information about the original exception.
   * @param currentScope A scope containing event metadata.
   * @returns A SyncPromise that resolves with the event or rejects in case event was/will not be send.
   */
  _processEvent(t, n, r, s) {
    const i = this.getOptions(), { sampleRate: o } = i, a = ui(t), c = dn(t), f = `before send for type \`${t.type || "error"}\``, p = typeof o == "undefined" ? void 0 : wn(o);
    if (c && typeof p == "number" && Math.random() > p)
      return this.recordDroppedEvent("sample_rate", "error"), Un(
        Qe(
          `Discarding event because it's not included in the random sample (sampling rate = ${o})`
        )
      );
    const m = zr(t.type);
    return this._prepareEvent(t, n, r, s).then((d) => {
      if (d === null)
        throw this.recordDroppedEvent("event_processor", m), Qe("An event processor returned `null`, will not send event.");
      if (n.data && n.data.__sentry__ === !0)
        return d;
      const g = mc(this, i, d, n);
      return pc(g, f);
    }).then((d) => {
      var E;
      if (d === null) {
        if (this.recordDroppedEvent("before_send", m), a) {
          const R = 1 + (t.spans || []).length;
          this.recordDroppedEvent("before_send", "span", R);
        }
        throw Qe(`${f} returned \`null\`, will not send event.`);
      }
      const _ = r.getSession() || s.getSession();
      if (c && _ && this._updateSessionFromEvent(_, d), a) {
        const N = ((E = d.sdkProcessingMetadata) == null ? void 0 : E.spanCountBeforeProcessing) || 0, R = d.spans ? d.spans.length : 0, x = N - R;
        x > 0 && this.recordDroppedEvent("before_send", "span", x);
      }
      const g = d.transaction_info;
      if (a && g && d.transaction !== t.transaction) {
        const N = "custom";
        d.transaction_info = S(l({}, g), {
          source: N
        });
      }
      return this.sendEvent(d, n), d;
    }).then(null, (d) => {
      throw qr(d) || Wr(d) ? d : (this.captureException(d, {
        mechanism: {
          handled: !1,
          type: "internal"
        },
        data: {
          __sentry__: !0
        },
        originalException: d
      }), ae(
        `Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.
Reason: ${d}`
      ));
    });
  }
  /**
   * Occupies the client with processing and event
   */
  _process(t, n) {
    this._numProcessing++, this._promiseBuffer.add(t).then(
      (r) => (this._numProcessing--, r),
      (r) => (this._numProcessing--, r === Hn && this.recordDroppedEvent("queue_overflow", n), r)
    );
  }
  /**
   * Clears outcomes on this client and returns them.
   */
  _clearOutcomes() {
    const t = this._outcomes;
    return this._outcomes = {}, Object.entries(t).map(([n, r]) => {
      const [s, i] = n.split(":");
      return {
        reason: s,
        category: i,
        quantity: r
      };
    });
  }
  /**
   * Sends client reports as an envelope.
   */
  _flushOutcomes() {
    y && h.log("Flushing outcomes...");
    const t = this._clearOutcomes();
    if (t.length === 0) {
      y && h.log("No outcomes to send");
      return;
    }
    if (!this._dsn) {
      y && h.log("No dsn provided, will not send outcomes");
      return;
    }
    y && h.log("Sending outcomes:", t);
    const n = cc(t, this._options.tunnel && Nt(this._dsn));
    this.sendEnvelope(n);
  }
  /**
   * Creates an {@link Event} from all inputs to `captureException` and non-primitive inputs to `captureMessage`.
   */
}
function zr(e) {
  return e === "replay_event" ? "replay" : e || "error";
}
function pc(e, t) {
  const n = `${t} must return \`null\` or a valid event.`;
  if (At(e))
    return e.then(
      (r) => {
        if (!ot(r) && r !== null)
          throw ae(n);
        return r;
      },
      (r) => {
        throw ae(`${t} rejected with ${r}`);
      }
    );
  if (!ot(e) && e !== null)
    throw ae(n);
  return e;
}
function mc(e, t, n, r) {
  const { beforeSend: s, beforeSendTransaction: i, beforeSendSpan: o, ignoreSpans: a } = t;
  let c = n;
  if (dn(c) && s)
    return s(c, r);
  if (ui(c)) {
    if (o || a) {
      const u = uc(c);
      if (a != null && a.length && cn(u, a))
        return null;
      if (o) {
        const f = o(u);
        f ? c = Bt(n, lc(f)) : an();
      }
      if (c.spans) {
        const f = [], p = c.spans;
        for (const d of p) {
          if (a != null && a.length && cn(d, a)) {
            qo(p, d);
            continue;
          }
          if (o) {
            const _ = o(d);
            _ ? f.push(_) : (an(), f.push(d));
          } else
            f.push(d);
        }
        const m = c.spans.length - f.length;
        m && e.recordDroppedEvent("before_send", "span", m), c.spans = f;
      }
    }
    if (i) {
      if (c.spans) {
        const u = c.spans.length;
        c.sdkProcessingMetadata = S(l({}, n.sdkProcessingMetadata), {
          spanCountBeforeProcessing: u
        });
      }
      return i(c, r);
    }
  }
  return c;
}
function dn(e) {
  return e.type === void 0;
}
function ui(e) {
  return e.type === "transaction";
}
function hc(e) {
  let t = 0;
  return e.name && (t += e.name.length * 2), t += 8, t + li(e.attributes);
}
function _c(e) {
  let t = 0;
  return e.message && (t += e.message.length * 2), t + li(e.attributes);
}
function li(e) {
  if (!e)
    return 0;
  let t = 0;
  return Object.values(e).forEach((n) => {
    Array.isArray(n) ? t += n.length * Yr(n[0]) : Rn(n) ? t += Yr(n) : t += 100;
  }), t;
}
function Yr(e) {
  return typeof e == "string" ? e.length * 2 : typeof e == "number" ? 8 : typeof e == "boolean" ? 4 : 0;
}
function gc(e, t) {
  t.debug === !0 && (y ? h.enable() : Tt(() => {
    console.warn("[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle.");
  })), v().update(t.initialScope);
  const r = new e(t);
  return yc(r), r.init(), r;
}
function yc(e) {
  v().setClient(e);
}
function fi(e, t) {
  let n;
  return Ft(e, (r, s) => (t.includes(s) && (n = Array.isArray(r) ? r[1] : void 0), !!n)), n;
}
function Sc(e, t) {
  return (n) => {
    const r = e(n);
    return S(l({}, r), {
      send: (s) => w(null, null, function* () {
        const i = fi(s, ["event", "transaction", "profile", "replay_event"]);
        return i && (i.release = t), r.send(s);
      })
    });
  };
}
function Ec(e, t) {
  return X(
    t ? S(l({}, e[0]), {
      dsn: t
    }) : e[0],
    e[1]
  );
}
function od(e, t) {
  return (n) => {
    const r = e(n), s = /* @__PURE__ */ new Map();
    function i(c, u) {
      const f = u ? `${c}:${u}` : c;
      let p = s.get(f);
      if (!p) {
        const m = Ds(c);
        if (!m)
          return;
        const d = Xs(m, n.tunnel);
        p = u ? Sc(e, u)(S(l({}, n), { url: d })) : e(S(l({}, n), { url: d })), s.set(f, p);
      }
      return [c, p];
    }
    function o(c) {
      return w(this, null, function* () {
        function u(d) {
          const _ = d != null && d.length ? d : ["event"];
          return fi(c, _);
        }
        const f = t({ envelope: c, getEvent: u }).map((d) => typeof d == "string" ? i(d, void 0) : i(d.dsn, d.release)).filter((d) => !!d), p = f.length ? f : [["", r]];
        return (yield Promise.all(
          p.map(([d, _]) => _.send(Ec(c, d)))
        ))[0];
      });
    }
    function a(c) {
      return w(this, null, function* () {
        const u = [...s.values(), r];
        return (yield Promise.all(u.map((p) => p.flush(c)))).every((p) => p);
      });
    }
    return {
      send: o,
      flush: a
    };
  };
}
function bc(e, ...t) {
  const n = new String(String.raw(e, ...t));
  return n.__sentry_template_string__ = e.join("\0").replace(/%/g, "%%").replace(/\0/g, "%s"), n.__sentry_template_values__ = t, n;
}
const Tc = bc;
function Ic(e, t, n = [t], r = "npm") {
  const s = e._metadata || {};
  s.sdk || (s.sdk = {
    name: `sentry.javascript.${t}`,
    packages: n.map((i) => ({
      name: `${r}:@sentry/${i}`,
      version: nt
    })),
    version: nt
  }), e._metadata = s;
}
const Ac = 100;
function Rc(e, t) {
  const n = I(), r = C();
  if (!n) return;
  const { beforeBreadcrumb: s = null, maxBreadcrumbs: i = Ac } = n.getOptions();
  if (i <= 0) return;
  const o = $(), a = l({ timestamp: o }, e), c = s ? Tt(() => s(a, t)) : a;
  c !== null && (n.emit && n.emit("beforeAddBreadcrumb", c, t), r.addBreadcrumb(c, i));
}
let Kr;
const Nc = "FunctionToString", Vr = /* @__PURE__ */ new WeakMap(), kc = (() => ({
  name: Nc,
  setupOnce() {
    Kr = Function.prototype.toString;
    try {
      Function.prototype.toString = function(...e) {
        const t = Rs(this), n = Vr.has(I()) && t !== void 0 ? t : this;
        return Kr.apply(n, e);
      };
    } catch (e) {
    }
  },
  setup(e) {
    Vr.set(e, !0);
  }
})), Oc = kc, vc = [
  /^Script error\.?$/,
  /^Javascript error: Script error\.? on line 0$/,
  /^ResizeObserver loop completed with undelivered notifications.$/,
  // The browser logs this when a ResizeObserver handler takes a bit longer. Usually this is not an actual issue though. It indicates slowness.
  /^Cannot redefine property: googletag$/,
  // This is thrown when google tag manager is used in combination with an ad blocker
  /^Can't find variable: gmo$/,
  // Error from Google Search App https://issuetracker.google.com/issues/396043331
  /^undefined is not an object \(evaluating 'a\.[A-Z]'\)$/,
  // Random error that happens but not actionable or noticeable to end-users.
  `can't redefine non-configurable property "solana"`,
  // Probably a browser extension or custom browser (Brave) throwing this error
  "vv().getRestrictions is not a function. (In 'vv().getRestrictions(1,a)', 'vv().getRestrictions' is undefined)",
  // Error thrown by GTM, seemingly not affecting end-users
  "Can't find variable: _AutofillCallbackHandler",
  // Unactionable error in instagram webview https://developers.facebook.com/community/threads/320013549791141/
  /^Non-Error promise rejection captured with value: Object Not Found Matching Id:\d+, MethodName:simulateEvent, ParamCount:\d+$/,
  // unactionable error from CEFSharp, a .NET library that embeds chromium in .NET apps
  /^Java exception was raised during method invocation$/
  // error from Facebook Mobile browser (https://github.com/getsentry/sentry-javascript/issues/15065)
], Mc = "EventFilters", wc = (e = {}) => {
  let t;
  return {
    name: Mc,
    setup(n) {
      const r = n.getOptions();
      t = Xr(e, r);
    },
    processEvent(n, r, s) {
      if (!t) {
        const i = s.getOptions();
        t = Xr(e, i);
      }
      return xc(n, t) ? null : n;
    }
  };
}, Cc = ((e = {}) => S(l({}, wc(e)), {
  name: "InboundFilters"
}));
function Xr(e = {}, t = {}) {
  return {
    allowUrls: [...e.allowUrls || [], ...t.allowUrls || []],
    denyUrls: [...e.denyUrls || [], ...t.denyUrls || []],
    ignoreErrors: [
      ...e.ignoreErrors || [],
      ...t.ignoreErrors || [],
      ...e.disableErrorDefaults ? [] : vc
    ],
    ignoreTransactions: [...e.ignoreTransactions || [], ...t.ignoreTransactions || []]
  };
}
function xc(e, t) {
  if (e.type) {
    if (e.type === "transaction" && Dc(e, t.ignoreTransactions))
      return y && h.warn(
        `Event dropped due to being matched by \`ignoreTransactions\` option.
Event: ${ut(e)}`
      ), !0;
  } else {
    if (Pc(e, t.ignoreErrors))
      return y && h.warn(
        `Event dropped due to being matched by \`ignoreErrors\` option.
Event: ${ut(e)}`
      ), !0;
    if (Fc(e))
      return y && h.warn(
        `Event dropped due to not having an error message, error type or stacktrace.
Event: ${ut(
          e
        )}`
      ), !0;
    if ($c(e, t.denyUrls))
      return y && h.warn(
        `Event dropped due to being matched by \`denyUrls\` option.
Event: ${ut(
          e
        )}.
Url: ${me(e)}`
      ), !0;
    if (!Lc(e, t.allowUrls))
      return y && h.warn(
        `Event dropped due to not being matched by \`allowUrls\` option.
Event: ${ut(
          e
        )}.
Url: ${me(e)}`
      ), !0;
  }
  return !1;
}
function Pc(e, t) {
  return t != null && t.length ? oi(e).some((n) => we(n, t)) : !1;
}
function Dc(e, t) {
  if (!(t != null && t.length))
    return !1;
  const n = e.transaction;
  return n ? we(n, t) : !1;
}
function $c(e, t) {
  if (!(t != null && t.length))
    return !1;
  const n = me(e);
  return n ? we(n, t) : !1;
}
function Lc(e, t) {
  if (!(t != null && t.length))
    return !0;
  const n = me(e);
  return n ? we(n, t) : !0;
}
function jc(e = []) {
  for (let t = e.length - 1; t >= 0; t--) {
    const n = e[t];
    if (n && n.filename !== "<anonymous>" && n.filename !== "[native code]")
      return n.filename || null;
  }
  return null;
}
function me(e) {
  var t, n, r;
  try {
    const s = [...(n = (t = e.exception) == null ? void 0 : t.values) != null ? n : []].reverse().find((o) => {
      var a, c, u;
      return ((a = o.mechanism) == null ? void 0 : a.parent_id) === void 0 && ((u = (c = o.stacktrace) == null ? void 0 : c.frames) == null ? void 0 : u.length);
    }), i = (r = s == null ? void 0 : s.stacktrace) == null ? void 0 : r.frames;
    return i ? jc(i) : null;
  } catch (s) {
    return y && h.error(`Cannot extract url for event ${ut(e)}`), null;
  }
}
function Fc(e) {
  var t, n;
  return (n = (t = e.exception) == null ? void 0 : t.values) != null && n.length ? (
    // No top-level message
    !e.message && // There are no exception values that have a stacktrace, a non-generic-Error type or value
    !e.exception.values.some((r) => r.stacktrace || r.type && r.type !== "Error" || r.value)
  ) : !1;
}
const di = /* @__PURE__ */ new Map(), Zr = /* @__PURE__ */ new Set();
function Uc(e) {
  if (b._sentryModuleMetadata)
    for (const t of Object.keys(b._sentryModuleMetadata)) {
      const n = b._sentryModuleMetadata[t];
      if (Zr.has(t))
        continue;
      Zr.add(t);
      const r = e(t);
      for (const s of r.reverse())
        if (s.filename) {
          di.set(s.filename, n);
          break;
        }
    }
}
function Bc(e, t) {
  return Uc(e), di.get(t);
}
function pi(e, t) {
  var n, r;
  (r = (n = t.exception) == null ? void 0 : n.values) == null || r.forEach((s) => {
    var i, o;
    (o = (i = s.stacktrace) == null ? void 0 : i.frames) == null || o.forEach((a) => {
      if (!a.filename || a.module_metadata)
        return;
      const c = Bc(e, a.filename);
      c && (a.module_metadata = c);
    });
  });
}
function mi(e) {
  var t, n;
  (n = (t = e.exception) == null ? void 0 : t.values) == null || n.forEach((r) => {
    var s, i;
    (i = (s = r.stacktrace) == null ? void 0 : s.frames) == null || i.forEach((o) => {
      delete o.module_metadata;
    });
  });
}
const ad = () => ({
  name: "ModuleMetadata",
  setup(e) {
    e.on("beforeEnvelope", (t) => {
      Ft(t, (n, r) => {
        if (r === "event") {
          const s = Array.isArray(n) ? n[1] : void 0;
          s && (mi(s), n[1] = s);
        }
      });
    }), e.on("applyFrameMetadata", (t) => {
      if (t.type)
        return;
      const n = e.getOptions().stackParser;
      pi(n, t);
    });
  }
});
function hi(e) {
  const t = "console";
  bn(t, e), Tn(t, Gc);
}
function Gc() {
  "console" in b && yn.forEach(function(e) {
    e in b.console && ct(b.console, e, function(t) {
      return ce[e] = t, function(...n) {
        In("console", { args: n, level: e });
        const s = ce[e];
        s == null || s.apply(b.console, n);
      };
    });
  });
}
function Qr(e) {
  return e === "warn" ? "warning" : ["fatal", "error", "warning", "log", "info", "debug"].includes(e) ? e : "log";
}
const Hc = "CaptureConsole", Wc = ((e = {}) => {
  var r;
  const t = e.levels || yn, n = (r = e.handled) != null ? r : !0;
  return {
    name: Hc,
    setup(s) {
      "console" in b && hi(({ args: i, level: o }) => {
        I() !== s || !t.includes(o) || qc(i, o, n);
      });
    }
  };
}), cd = Wc;
function qc(e, t, n) {
  const r = Qr(t), s = new Error(), i = {
    level: Qr(t),
    extra: {
      arguments: e
    }
  };
  V((o) => {
    if (o.addEventProcessor((u) => (u.logger = "console", pt(u, {
      handled: n,
      type: "auto.core.capture_console"
    }), u)), t === "assert") {
      if (!e[0]) {
        const u = `Assertion failed: ${gr(e.slice(1), " ") || "console.assert"}`;
        o.setExtra("arguments", e.slice(1)), o.captureMessage(u, r, { captureContext: i, syntheticException: s });
      }
      return;
    }
    const a = e.find((u) => u instanceof Error);
    if (a) {
      O(a, i);
      return;
    }
    const c = gr(e, " ");
    o.captureMessage(c, r, { captureContext: i, syntheticException: s });
  });
}
const Jc = "ExtraErrorData", zc = ((e = {}) => {
  const { depth: t = 3, captureErrorCause: n = !0 } = e;
  return {
    name: Jc,
    processEvent(r, s, i) {
      const { maxValueLength: o } = i.getOptions();
      return Yc(r, s, t, n, o);
    }
  };
}), ud = zc;
function Yc(e, t = {}, n, r, s) {
  if (!t.originalException || !rt(t.originalException))
    return e;
  const i = t.originalException.name || t.originalException.constructor.name, o = _i(t.originalException, r, s);
  if (o) {
    const a = l({}, e.contexts), c = P(o, n);
    return ot(c) && (B(c, "__sentry_skip_normalization__", !0), a[i] = c), S(l({}, e), {
      contexts: a
    });
  }
  return e;
}
function _i(e, t, n) {
  try {
    const r = [
      "name",
      "message",
      "stack",
      "line",
      "column",
      "fileName",
      "lineNumber",
      "columnNumber",
      "toJSON"
    ], s = {};
    for (const i of Object.keys(e)) {
      if (r.indexOf(i) !== -1)
        continue;
      const o = e[i];
      s[i] = rt(o) || typeof o == "string" ? n ? $t(`${o}`, n) : `${o}` : o;
    }
    if (t && e.cause !== void 0)
      if (rt(e.cause)) {
        const i = e.cause.name || e.cause.constructor.name;
        s.cause = { [i]: _i(e.cause, !1, n) };
      } else
        s.cause = e.cause;
    if (typeof e.toJSON == "function") {
      const i = e.toJSON();
      for (const o of Object.keys(i)) {
        const a = i[o];
        s[o] = rt(a) ? a.toString() : a;
      }
    }
    return s;
  } catch (r) {
    y && h.error("Unable to extract extra data from the Error object:", r);
  }
  return null;
}
function Kc(e, t) {
  let n = 0;
  for (let r = e.length - 1; r >= 0; r--) {
    const s = e[r];
    s === "." ? e.splice(r, 1) : s === ".." ? (e.splice(r, 1), n++) : n && (e.splice(r, 1), n--);
  }
  if (t)
    for (; n--; n)
      e.unshift("..");
  return e;
}
const Vc = /^(\S+:\\|\/?)([\s\S]*?)((?:\.{1,2}|[^/\\]+?|)(\.[^./\\]*|))(?:[/\\]*)$/;
function Xc(e) {
  const t = e.length > 1024 ? `<truncated>${e.slice(-1024)}` : e, n = Vc.exec(t);
  return n ? n.slice(1) : [];
}
function ts(...e) {
  let t = "", n = !1;
  for (let r = e.length - 1; r >= -1 && !n; r--) {
    const s = r >= 0 ? e[r] : "/";
    s && (t = `${s}/${t}`, n = s.charAt(0) === "/");
  }
  return t = Kc(
    t.split("/").filter((r) => !!r),
    !n
  ).join("/"), (n ? "/" : "") + t || ".";
}
function es(e) {
  let t = 0;
  for (; t < e.length && e[t] === ""; t++)
    ;
  let n = e.length - 1;
  for (; n >= 0 && e[n] === ""; n--)
    ;
  return t > n ? [] : e.slice(t, n - t + 1);
}
function Zc(e, t) {
  e = ts(e).slice(1), t = ts(t).slice(1);
  const n = es(e.split("/")), r = es(t.split("/")), s = Math.min(n.length, r.length);
  let i = s;
  for (let a = 0; a < s; a++)
    if (n[a] !== r[a]) {
      i = a;
      break;
    }
  let o = [];
  for (let a = i; a < n.length; a++)
    o.push("..");
  return o = o.concat(r.slice(i)), o.join("/");
}
function Qc(e, t) {
  return Xc(e)[2] || "";
}
const tu = "RewriteFrames", ld = (e = {}) => {
  const t = e.root, n = e.prefix || "app:///", r = "window" in b && !!b.window, s = e.iteratee || eu({ isBrowser: r, root: t, prefix: n });
  function i(a) {
    try {
      return S(l({}, a), {
        exception: S(l({}, a.exception), {
          // The check for this is performed inside `process` call itself, safe to skip here
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          values: a.exception.values.map((c) => l(l({}, c), c.stacktrace && { stacktrace: o(c.stacktrace) }))
        })
      });
    } catch (c) {
      return a;
    }
  }
  function o(a) {
    var c;
    return S(l({}, a), {
      frames: (c = a == null ? void 0 : a.frames) == null ? void 0 : c.map((u) => s(u))
    });
  }
  return {
    name: tu,
    processEvent(a) {
      let c = a;
      return a.exception && Array.isArray(a.exception.values) && (c = i(c)), c;
    }
  };
};
function eu({
  isBrowser: e,
  root: t,
  prefix: n
}) {
  return (r) => {
    if (!r.filename)
      return r;
    const s = /^[a-zA-Z]:\\/.test(r.filename) || // or the presence of a backslash without a forward slash (which are not allowed on Windows)
    r.filename.includes("\\") && !r.filename.includes("/"), i = /^\//.test(r.filename);
    if (e) {
      if (t) {
        const o = r.filename;
        o.indexOf(t) === 0 && (r.filename = o.replace(t, n));
      }
    } else if (s || i) {
      const o = s ? r.filename.replace(/^[a-zA-Z]:/, "").replace(/\\/g, "/") : r.filename, a = t ? Zc(t, o) : Qc(o);
      r.filename = `${n}${a}`;
    }
    return r;
  };
}
const nu = [
  "reauthenticate",
  "signInAnonymously",
  "signInWithOAuth",
  "signInWithIdToken",
  "signInWithOtp",
  "signInWithPassword",
  "signInWithSSO",
  "signOut",
  "signUp",
  "verifyOtp"
], ru = [
  "createUser",
  "deleteUser",
  "listUsers",
  "getUserById",
  "updateUserById",
  "inviteUserByEmail"
], su = {
  eq: "eq",
  neq: "neq",
  gt: "gt",
  gte: "gte",
  lt: "lt",
  lte: "lte",
  like: "like",
  "like(all)": "likeAllOf",
  "like(any)": "likeAnyOf",
  ilike: "ilike",
  "ilike(all)": "ilikeAllOf",
  "ilike(any)": "ilikeAnyOf",
  is: "is",
  in: "in",
  cs: "contains",
  cd: "containedBy",
  sr: "rangeGt",
  nxl: "rangeGte",
  sl: "rangeLt",
  nxr: "rangeLte",
  adj: "rangeAdjacent",
  ov: "overlaps",
  fts: "",
  plfts: "plain",
  phfts: "phrase",
  wfts: "websearch",
  not: "not"
}, gi = ["select", "insert", "upsert", "update", "delete"];
function Le(e) {
  try {
    e.__SENTRY_INSTRUMENTED__ = !0;
  } catch (t) {
  }
}
function je(e) {
  try {
    return e.__SENTRY_INSTRUMENTED__;
  } catch (t) {
    return !1;
  }
}
function iu(e, t = {}) {
  var n;
  switch (e) {
    case "GET":
      return "select";
    case "POST":
      return (n = t.Prefer) != null && n.includes("resolution=") ? "upsert" : "insert";
    case "PATCH":
      return "update";
    case "DELETE":
      return "delete";
    default:
      return "<unknown-op>";
  }
}
function ou(e, t) {
  if (t === "" || t === "*")
    return "select(*)";
  if (e === "select")
    return `select(${t})`;
  if (e === "or" || e.endsWith(".or"))
    return `${e}${t}`;
  const [n, ...r] = t.split(".");
  let s;
  return n != null && n.startsWith("fts") ? s = "textSearch" : n != null && n.startsWith("plfts") ? s = "textSearch[plain]" : n != null && n.startsWith("phfts") ? s = "textSearch[phrase]" : n != null && n.startsWith("wfts") ? s = "textSearch[websearch]" : s = n && su[n] || "filter", `${s}(${e}, ${r.join(".")})`;
}
function ns(e, t = !1) {
  return new Proxy(e, {
    apply(n, r, s) {
      return qt(
        {
          name: `auth ${t ? "(admin) " : ""}${e.name}`,
          attributes: {
            [J]: "auto.db.supabase",
            [jt]: "db",
            "db.system": "postgresql",
            "db.operation": `auth.${t ? "admin." : ""}${e.name}`
          }
        },
        (i) => Reflect.apply(n, r, s).then((o) => (o && typeof o == "object" && "error" in o && o.error ? (i.setStatus({ code: T }), O(o.error, {
          mechanism: {
            handled: !1,
            type: "auto.db.supabase.auth"
          }
        })) : i.setStatus({ code: Mn }), i.end(), o)).catch((o) => {
          throw i.setStatus({ code: T }), i.end(), O(o, {
            mechanism: {
              handled: !1,
              type: "auto.db.supabase.auth"
            }
          }), o;
        }).then(...s)
      );
    }
  });
}
function au(e) {
  const t = e.auth;
  if (!(!t || je(e.auth))) {
    for (const n of nu) {
      const r = t[n];
      r && typeof e.auth[n] == "function" && (e.auth[n] = ns(r));
    }
    for (const n of ru) {
      const r = t.admin[n];
      r && typeof e.auth.admin[n] == "function" && (e.auth.admin[n] = ns(r, !0));
    }
    Le(e.auth);
  }
}
function cu(e) {
  je(e.prototype.from) || (e.prototype.from = new Proxy(
    e.prototype.from,
    {
      apply(t, n, r) {
        const s = Reflect.apply(t, n, r), i = s.constructor;
        return lu(i), s;
      }
    }
  ), Le(e.prototype.from));
}
function uu(e) {
  je(e.prototype.then) || (e.prototype.then = new Proxy(
    e.prototype.then,
    {
      apply(t, n, r) {
        var d;
        const s = gi, i = n, o = iu(i.method, i.headers);
        if (!s.includes(o) || !((d = i == null ? void 0 : i.url) != null && d.pathname) || typeof i.url.pathname != "string")
          return Reflect.apply(t, n, r);
        const a = i.url.pathname.split("/"), c = a.length > 0 ? a[a.length - 1] : "", u = [];
        for (const [_, g] of i.url.searchParams.entries())
          u.push(ou(_, g));
        const f = /* @__PURE__ */ Object.create(null);
        if (ot(i.body))
          for (const [_, g] of Object.entries(i.body))
            f[_] = g;
        const p = `${o === "select" ? "" : `${o}${f ? "(...) " : ""}`}${u.join(
          " "
        )} from(${c})`, m = {
          "db.table": c,
          "db.schema": i.schema,
          "db.url": i.url.origin,
          "db.sdk": i.headers["X-Client-Info"],
          "db.system": "postgresql",
          "db.operation": o,
          [J]: "auto.db.supabase",
          [jt]: "db"
        };
        return u.length && (m["db.query"] = u), Object.keys(f).length && (m["db.body"] = f), qt(
          {
            name: p,
            attributes: m
          },
          (_) => Reflect.apply(t, n, []).then(
            (g) => {
              if (_ && (g && typeof g == "object" && "status" in g && br(_, g.status || 500), _.end()), g.error) {
                const R = new Error(g.error.message);
                g.error.code && (R.code = g.error.code), g.error.details && (R.details = g.error.details);
                const x = {};
                u.length && (x.query = u), Object.keys(f).length && (x.body = f), O(R, (H) => (H.addEventProcessor((Q) => (pt(Q, {
                  handled: !1,
                  type: "auto.db.supabase.postgres"
                }), Q)), H.setContext("supabase", x), H));
              }
              const E = {
                type: "supabase",
                category: `db.${o}`,
                message: p
              }, N = {};
              return u.length && (N.query = u), Object.keys(f).length && (N.body = f), Object.keys(N).length && (E.data = N), Rc(E), g;
            },
            (g) => {
              throw _ && (br(_, 500), _.end()), g;
            }
          ).then(...r)
        );
      }
    }
  ), Le(e.prototype.then));
}
function lu(e) {
  for (const t of gi)
    je(e.prototype[t]) || (e.prototype[t] = new Proxy(
      e.prototype[t],
      {
        apply(n, r, s) {
          const i = Reflect.apply(n, r, s), o = i.constructor;
          return y && h.log(`Instrumenting ${t} operation's PostgRESTFilterBuilder`), uu(o), i;
        }
      }
    ), Le(e.prototype[t]));
}
const fu = (e) => {
  if (!e) {
    y && h.warn("Supabase integration was not installed because no Supabase client was provided.");
    return;
  }
  const t = e.constructor === Function ? e : e.constructor;
  cu(t), au(e);
}, du = "Supabase", pu = ((e) => ({
  setupOnce() {
    fu(e);
  },
  name: du
})), fd = (e) => pu(e.supabaseClient), mu = 10, hu = "ZodErrors";
function _u(e) {
  return rt(e) && e.name === "ZodError" && Array.isArray(e.issues);
}
function gu(e) {
  return S(l({}, e), {
    path: "path" in e && Array.isArray(e.path) ? e.path.join(".") : void 0,
    keys: "keys" in e ? JSON.stringify(e.keys) : void 0,
    unionErrors: "unionErrors" in e ? JSON.stringify(e.unionErrors) : void 0
  });
}
function yu(e) {
  return e.map((t) => typeof t == "number" ? "<array>" : t).join(".");
}
function Su(e) {
  const t = /* @__PURE__ */ new Set();
  for (const r of e.issues) {
    const s = yu(r.path);
    s.length > 0 && t.add(s);
  }
  const n = Array.from(t);
  if (n.length === 0) {
    let r = "variable";
    if (e.issues.length > 0) {
      const s = e.issues[0];
      s !== void 0 && "expected" in s && typeof s.expected == "string" && (r = s.expected);
    }
    return `Failed to validate ${r}`;
  }
  return `Failed to validate keys: ${$t(n.join(", "), 100)}`;
}
function Eu(e, t = !1, n, r) {
  var s;
  if (!((s = n.exception) != null && s.values) || !r.originalException || !_u(r.originalException) || r.originalException.issues.length === 0)
    return n;
  try {
    const o = (t ? r.originalException.issues : r.originalException.issues.slice(0, e)).map(gu);
    return t && (Array.isArray(r.attachments) || (r.attachments = []), r.attachments.push({
      filename: "zod_issues.json",
      data: JSON.stringify({
        issues: o
      })
    })), S(l({}, n), {
      exception: S(l({}, n.exception), {
        values: [
          S(l({}, n.exception.values[0]), {
            value: Su(r.originalException)
          }),
          ...n.exception.values.slice(1)
        ]
      }),
      extra: S(l({}, n.extra), {
        "zoderror.issues": o.slice(0, e)
      })
    });
  } catch (i) {
    return S(l({}, n), {
      extra: S(l({}, n.extra), {
        "zoderrors sentry integration parse error": {
          message: "an exception was thrown while processing ZodError within applyZodErrorsToEvent()",
          error: i instanceof Error ? `${i.name}: ${i.message}
${i.stack}` : "unknown"
        }
      })
    });
  }
}
const bu = ((e = {}) => {
  var n;
  const t = (n = e.limit) != null ? n : mu;
  return {
    name: hu,
    processEvent(r, s) {
      return Eu(t, e.saveZodIssuesAsAttachment, r, s);
    }
  };
}), pd = bu, md = (e) => ({
  name: "ThirdPartyErrorsFilter",
  setup(t) {
    t.on("beforeEnvelope", (n) => {
      Ft(n, (r, s) => {
        if (s === "event") {
          const i = Array.isArray(r) ? r[1] : void 0;
          i && (mi(i), r[1] = i);
        }
      });
    }), t.on("applyFrameMetadata", (n) => {
      if (n.type)
        return;
      const r = t.getOptions().stackParser;
      pi(r, n);
    });
  },
  processEvent(t) {
    const n = Tu(t);
    if (n) {
      const r = e.behaviour === "drop-error-if-contains-third-party-frames" || e.behaviour === "apply-tag-if-contains-third-party-frames" ? "some" : "every";
      if (n[r]((i) => !i.some((o) => e.filterKeys.includes(o)))) {
        if (e.behaviour === "drop-error-if-contains-third-party-frames" || e.behaviour === "drop-error-if-exclusively-contains-third-party-frames")
          return null;
        t.tags = S(l({}, t.tags), {
          third_party_code: !0
        });
      }
    }
    return t;
  }
});
function Tu(e) {
  const t = Vi(e);
  if (t)
    return t.filter((n) => {
      var r;
      return !!n.filename && ((r = n.lineno) != null ? r : n.colno) != null;
    }).map((n) => n.module_metadata ? Object.keys(n.module_metadata).filter((r) => r.startsWith(rs)).map((r) => r.slice(rs.length)) : []);
}
const rs = "_sentryBundlerPluginAppKey:", Iu = 100, Au = 10, ne = "flag.evaluation.";
function Ru(e) {
  const n = v().getScopeData().contexts.flags, r = n ? n.values : [];
  return r.length && (e.contexts === void 0 && (e.contexts = {}), e.contexts.flags = { values: [...r] }), e;
}
function Nu(e, t, n = Iu) {
  const r = v().getScopeData().contexts;
  r.flags || (r.flags = { values: [] });
  const s = r.flags.values;
  ku(s, e, t, n);
}
function ku(e, t, n, r) {
  if (typeof n != "boolean")
    return;
  if (e.length > r) {
    y && h.error(`[Feature Flags] insertToFlagBuffer called on a buffer larger than maxSize=${r}`);
    return;
  }
  const s = e.findIndex((i) => i.flag === t);
  s !== -1 && e.splice(s, 1), e.length === r && e.shift(), e.push({
    flag: t,
    result: n
  });
}
function Ou(e, t, n = Au) {
  if (typeof t != "boolean")
    return;
  const r = Ce();
  if (!r)
    return;
  const s = M(r).data;
  if (`${ne}${e}` in s) {
    r.setAttribute(`${ne}${e}`, t);
    return;
  }
  Object.keys(s).filter((o) => o.startsWith(ne)).length < n && r.setAttribute(`${ne}${e}`, t);
}
const hd = () => ({
  name: "FeatureFlags",
  processEvent(e, t, n) {
    return Ru(e);
  },
  addFeatureFlag(e, t) {
    Nu(e, t), Ou(e, t);
  }
});
function kt(e, t, n, r, s) {
  pe({ level: e, message: t, attributes: n, severityNumber: s }, r);
}
function vu(e, t, { scope: n } = {}) {
  kt("trace", e, t, n);
}
function Mu(e, t, { scope: n } = {}) {
  kt("debug", e, t, n);
}
function wu(e, t, { scope: n } = {}) {
  kt("info", e, t, n);
}
function Cu(e, t, { scope: n } = {}) {
  kt("warn", e, t, n);
}
function xu(e, t, { scope: n } = {}) {
  kt("error", e, t, n);
}
function Pu(e, t, { scope: n } = {}) {
  kt("fatal", e, t, n);
}
const _d = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  debug: Mu,
  error: xu,
  fatal: Pu,
  fmt: Tc,
  info: wu,
  trace: vu,
  warn: Cu
}, Symbol.toStringTag, { value: "Module" }));
function pn(e, t, n) {
  return "util" in b && typeof b.util.format == "function" ? b.util.format(...e) : Du(e, t, n);
}
function Du(e, t, n) {
  return e.map(
    (r) => Rn(r) ? String(r) : JSON.stringify(P(r, t, n))
  ).join(" ");
}
function $u(e) {
  return /%[sdifocO]/.test(e);
}
function Lu(e, t) {
  const n = {}, r = new Array(t.length).fill("{}").join(" ");
  return n["sentry.message.template"] = `${e} ${r}`, t.forEach((s, i) => {
    n[`sentry.message.parameter.${i}`] = s;
  }), n;
}
const ju = "ConsoleLogs", ss = {
  [J]: "auto.log.console"
}, Fu = ((e = {}) => {
  const t = e.levels || yn;
  return {
    name: ju,
    setup(n) {
      const { enableLogs: r, normalizeDepth: s = 3, normalizeMaxBreadth: i = 1e3 } = n.getOptions();
      if (!r) {
        y && h.warn("`enableLogs` is not enabled, ConsoleLogs integration disabled");
        return;
      }
      hi(({ args: o, level: a }) => {
        if (I() !== n || !t.includes(a))
          return;
        const c = o[0], u = o.slice(1);
        if (a === "assert") {
          if (!c) {
            const d = u.length > 0 ? `Assertion failed: ${pn(u, s, i)}` : "Assertion failed";
            pe({ level: "error", message: d, attributes: ss });
          }
          return;
        }
        const f = a === "log", p = o.length > 1 && typeof o[0] == "string" && !$u(o[0]), m = l(l({}, ss), p ? Lu(c, u) : {});
        pe({
          level: f ? "info" : a,
          message: pn(o, s, i),
          severityNumber: f ? 10 : void 0,
          attributes: m
        });
      });
    }
  };
}), gd = Fu;
function Wn(e, t, n, r) {
  tc(
    { type: e, name: t, value: n, unit: r == null ? void 0 : r.unit, attributes: r == null ? void 0 : r.attributes },
    { scope: r == null ? void 0 : r.scope }
  );
}
function Uu(e, t = 1, n) {
  Wn("counter", e, t, n);
}
function Bu(e, t, n) {
  Wn("gauge", e, t, n);
}
function Gu(e, t, n) {
  Wn("distribution", e, t, n);
}
const yd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  count: Uu,
  distribution: Gu,
  gauge: Bu
}, Symbol.toStringTag, { value: "Module" })), Hu = ["trace", "debug", "info", "warn", "error", "fatal"];
function Sd(e = {}) {
  var r;
  const t = new Set((r = e.levels) != null ? r : Hu), n = e.client;
  return {
    log(s) {
      const R = s, { type: i, level: o, message: a, args: c, tag: u, date: f } = R, p = Xt(R, ["type", "level", "message", "args", "tag", "date"]), m = n || I();
      if (!m)
        return;
      const d = Ju(i, o);
      if (!t.has(d))
        return;
      const { normalizeDepth: _ = 3, normalizeMaxBreadth: g = 1e3 } = m.getOptions(), E = [];
      a && E.push(a), c && c.length > 0 && E.push(pn(c, _, g));
      const N = E.join(" ");
      p["sentry.origin"] = "auto.log.consola", u && (p["consola.tag"] = u), i && (p["consola.type"] = i), o != null && typeof o == "number" && (p["consola.level"] = o), pe({
        level: d,
        message: N,
        attributes: p
      });
    }
  };
}
const Wu = {
  // Consola built-in types
  silent: "trace",
  fatal: "fatal",
  error: "error",
  warn: "warn",
  log: "info",
  info: "info",
  success: "info",
  fail: "error",
  ready: "info",
  start: "info",
  box: "info",
  debug: "debug",
  trace: "trace",
  verbose: "debug",
  // Custom types that might exist
  critical: "fatal",
  notice: "info"
}, qu = {
  0: "fatal",
  // Fatal and Error
  1: "warn",
  // Warnings
  2: "info",
  // Normal logs
  3: "info",
  // Informational logs, success, fail, ready, start, ...
  4: "debug",
  // Debug logs
  5: "trace"
  // Trace logs
};
function Ju(e, t) {
  if (e === "verbose")
    return "debug";
  if (e === "silent")
    return "trace";
  if (e) {
    const n = Wu[e];
    if (n)
      return n;
  }
  if (typeof t == "number") {
    const n = qu[t];
    if (n)
      return n;
  }
  return "info";
}
const zu = "gen_ai.prompt", qn = "gen_ai.system", L = "gen_ai.request.model", yi = "gen_ai.request.stream", Jn = "gen_ai.request.temperature", Si = "gen_ai.request.max_tokens", zn = "gen_ai.request.frequency_penalty", Ei = "gen_ai.request.presence_penalty", Yn = "gen_ai.request.top_p", bi = "gen_ai.request.top_k", Yu = "gen_ai.request.encoding_format", Ku = "gen_ai.request.dimensions", Ot = "gen_ai.response.finish_reasons", vt = "gen_ai.response.model", Jt = "gen_ai.response.id", Fe = "gen_ai.usage.input_tokens", Ue = "gen_ai.usage.output_tokens", Be = "gen_ai.usage.total_tokens", Kn = "gen_ai.operation.name", st = "gen_ai.request.messages", U = "gen_ai.response.text", Vn = "gen_ai.request.available_tools", Ge = "gen_ai.response.streaming", Z = "gen_ai.response.tool_calls", Vu = "openai.response.id", Ti = "openai.response.model", Xu = "openai.response.timestamp", Zu = "openai.usage.completion_tokens", Qu = "openai.usage.prompt_tokens", tn = {
  CHAT: "chat",
  RESPONSES: "responses",
  EMBEDDINGS: "embeddings"
}, is = "anthropic.response.timestamp", Ii = 2e4, he = (e) => new TextEncoder().encode(e).length, _e = (e) => he(JSON.stringify(e));
function Xn(e, t) {
  if (he(e) <= t)
    return e;
  let n = 0, r = e.length, s = "";
  for (; n <= r; ) {
    const i = Math.floor((n + r) / 2), o = e.slice(0, i);
    he(o) <= t ? (s = o, n = i + 1) : r = i - 1;
  }
  return s;
}
function tl(e) {
  return typeof e == "string" ? e : e.text;
}
function os(e, t) {
  return typeof e == "string" ? t : S(l({}, e), { text: t });
}
function el(e) {
  return e !== null && typeof e == "object" && "content" in e && typeof e.content == "string";
}
function nl(e) {
  return e !== null && typeof e == "object" && "parts" in e && Array.isArray(e.parts) && e.parts.length > 0;
}
function rl(e, t) {
  const n = S(l({}, e), { content: "" }), r = _e(n), s = t - r;
  if (s <= 0)
    return [];
  const i = Xn(e.content, s);
  return [S(l({}, e), { content: i })];
}
function sl(e, t) {
  const { parts: n } = e, r = n.map((a) => os(a, "")), s = _e(S(l({}, e), { parts: r }));
  let i = t - s;
  if (i <= 0)
    return [];
  const o = [];
  for (const a of n) {
    const c = tl(a), u = he(c);
    if (u <= i)
      o.push(a), i -= u;
    else if (o.length === 0) {
      const f = Xn(c, i);
      f && o.push(os(a, f));
      break;
    } else
      break;
  }
  return o.length > 0 ? [S(l({}, e), { parts: o })] : [];
}
function il(e, t) {
  return !e || typeof e != "object" ? [] : el(e) ? rl(e, t) : nl(e) ? sl(e, t) : [];
}
function ol(e, t) {
  if (!Array.isArray(e) || e.length === 0 || _e(e) <= t)
    return e;
  const r = e.map(_e);
  let s = 0, i = e.length;
  for (let o = e.length - 1; o >= 0; o--) {
    const a = r[o];
    if (a && s + a > t)
      break;
    a && (s += a), i = o;
  }
  if (i === e.length) {
    const o = e[e.length - 1];
    return il(o, t);
  }
  return e.slice(i);
}
function al(e) {
  return ol(e, Ii);
}
function cl(e) {
  return Xn(e, Ii);
}
function zt(e) {
  return e.includes("messages") ? "messages" : e.includes("completions") ? "completions" : e.includes("models") ? "models" : e.includes("chat") ? "chat" : e.split(".").pop() || "unknown";
}
function ge(e) {
  return `gen_ai.${zt(e)}`;
}
function Ai(e, t) {
  return e ? `${e}.${t}` : t;
}
function Zn(e, t, n, r, s) {
  if (t !== void 0 && e.setAttributes({
    [Fe]: t
  }), n !== void 0 && e.setAttributes({
    [Ue]: n
  }), t !== void 0 || n !== void 0 || r !== void 0 || s !== void 0) {
    const i = (t != null ? t : 0) + (n != null ? n : 0) + (r != null ? r : 0) + (s != null ? s : 0);
    e.setAttributes({
      [Be]: i
    });
  }
}
function it(e) {
  if (typeof e == "string")
    return cl(e);
  if (Array.isArray(e)) {
    const t = al(e);
    return JSON.stringify(t);
  }
  return JSON.stringify(e);
}
const ul = "OpenAI", ll = ["responses.create", "chat.completions.create", "embeddings.create"], fl = [
  "response.output_item.added",
  "response.function_call_arguments.delta",
  "response.function_call_arguments.done",
  "response.output_item.done"
], dl = [
  "response.created",
  "response.in_progress",
  "response.failed",
  "response.completed",
  "response.incomplete",
  "response.queued",
  "response.output_text.delta",
  ...fl
];
function Qn(e) {
  return e.includes("chat.completions") ? tn.CHAT : e.includes("responses") ? tn.RESPONSES : e.includes("embeddings") ? tn.EMBEDDINGS : e.split(".").pop() || "unknown";
}
function as(e) {
  return `gen_ai.${Qn(e)}`;
}
function pl(e) {
  return ll.includes(e);
}
function ml(e, t) {
  return e ? `${e}.${t}` : t;
}
function hl(e) {
  return e !== null && typeof e == "object" && "object" in e && e.object === "chat.completion";
}
function _l(e) {
  return e !== null && typeof e == "object" && "object" in e && e.object === "response";
}
function gl(e) {
  if (e === null || typeof e != "object" || !("object" in e))
    return !1;
  const t = e;
  return t.object === "list" && typeof t.model == "string" && t.model.toLowerCase().includes("embedding");
}
function yl(e) {
  return e !== null && typeof e == "object" && "type" in e && typeof e.type == "string" && e.type.startsWith("response.");
}
function Sl(e) {
  return e !== null && typeof e == "object" && "object" in e && e.object === "chat.completion.chunk";
}
function El(e, t, n) {
  if (tr(e, t.id, t.model, t.created), t.usage && He(
    e,
    t.usage.prompt_tokens,
    t.usage.completion_tokens,
    t.usage.total_tokens
  ), Array.isArray(t.choices)) {
    const r = t.choices.map((s) => s.finish_reason).filter((s) => s !== null);
    if (r.length > 0 && e.setAttributes({
      [Ot]: JSON.stringify(r)
    }), n) {
      const s = t.choices.map((i) => {
        var o;
        return (o = i.message) == null ? void 0 : o.tool_calls;
      }).filter((i) => Array.isArray(i) && i.length > 0).flat();
      s.length > 0 && e.setAttributes({
        [Z]: JSON.stringify(s)
      });
    }
  }
}
function bl(e, t, n) {
  if (tr(e, t.id, t.model, t.created_at), t.status && e.setAttributes({
    [Ot]: JSON.stringify([t.status])
  }), t.usage && He(
    e,
    t.usage.input_tokens,
    t.usage.output_tokens,
    t.usage.total_tokens
  ), n) {
    const r = t;
    if (Array.isArray(r.output) && r.output.length > 0) {
      const s = r.output.filter(
        (i) => typeof i == "object" && i !== null && i.type === "function_call"
      );
      s.length > 0 && e.setAttributes({
        [Z]: JSON.stringify(s)
      });
    }
  }
}
function Tl(e, t) {
  e.setAttributes({
    [Ti]: t.model,
    [vt]: t.model
  }), t.usage && He(e, t.usage.prompt_tokens, void 0, t.usage.total_tokens);
}
function He(e, t, n, r) {
  t !== void 0 && e.setAttributes({
    [Qu]: t,
    [Fe]: t
  }), n !== void 0 && e.setAttributes({
    [Zu]: n,
    [Ue]: n
  }), r !== void 0 && e.setAttributes({
    [Be]: r
  });
}
function tr(e, t, n, r) {
  e.setAttributes({
    [Vu]: t,
    [Jt]: t
  }), e.setAttributes({
    [Ti]: n,
    [vt]: n
  }), e.setAttributes({
    [Xu]: new Date(r * 1e3).toISOString()
  });
}
function Il(e, t) {
  for (const n of e) {
    const r = n.index;
    if (!(r === void 0 || !n.function))
      if (!(r in t.chatCompletionToolCalls))
        t.chatCompletionToolCalls[r] = S(l({}, n), {
          function: {
            name: n.function.name,
            arguments: n.function.arguments || ""
          }
        });
      else {
        const s = t.chatCompletionToolCalls[r];
        n.function.arguments && (s != null && s.function) && (s.function.arguments += n.function.arguments);
      }
  }
}
function Al(e, t, n) {
  var r, s, i, o, a, c;
  t.responseId = (r = e.id) != null ? r : t.responseId, t.responseModel = (s = e.model) != null ? s : t.responseModel, t.responseTimestamp = (i = e.created) != null ? i : t.responseTimestamp, e.usage && (t.promptTokens = e.usage.prompt_tokens, t.completionTokens = e.usage.completion_tokens, t.totalTokens = e.usage.total_tokens);
  for (const u of (o = e.choices) != null ? o : [])
    n && ((a = u.delta) != null && a.content && t.responseTexts.push(u.delta.content), (c = u.delta) != null && c.tool_calls && Il(u.delta.tool_calls, t)), u.finish_reason && t.finishReasons.push(u.finish_reason);
}
function Rl(e, t, n, r) {
  var i, o, a;
  if (!(e && typeof e == "object")) {
    t.eventTypes.push("unknown:non-object");
    return;
  }
  if (e instanceof Error) {
    r.setStatus({ code: T, message: "internal_error" }), O(e, {
      mechanism: {
        handled: !1,
        type: "auto.ai.openai.stream-response"
      }
    });
    return;
  }
  if (!("type" in e)) return;
  const s = e;
  if (!dl.includes(s.type)) {
    t.eventTypes.push(s.type);
    return;
  }
  if (n && (s.type === "response.output_item.done" && "item" in s && t.responsesApiToolCalls.push(s.item), s.type === "response.output_text.delta" && "delta" in s && s.delta)) {
    t.responseTexts.push(s.delta);
    return;
  }
  if ("response" in s) {
    const { response: c } = s;
    t.responseId = (i = c.id) != null ? i : t.responseId, t.responseModel = (o = c.model) != null ? o : t.responseModel, t.responseTimestamp = (a = c.created_at) != null ? a : t.responseTimestamp, c.usage && (t.promptTokens = c.usage.input_tokens, t.completionTokens = c.usage.output_tokens, t.totalTokens = c.usage.total_tokens), c.status && t.finishReasons.push(c.status), n && c.output_text && t.responseTexts.push(c.output_text);
  }
}
function Nl(e, t, n) {
  return Zt(this, null, function* () {
    const r = {
      eventTypes: [],
      responseTexts: [],
      finishReasons: [],
      responseId: "",
      responseModel: "",
      responseTimestamp: 0,
      promptTokens: void 0,
      completionTokens: void 0,
      totalTokens: void 0,
      chatCompletionToolCalls: {},
      responsesApiToolCalls: []
    };
    try {
      try {
        for (var s = Qt(e), i, o, a; i = !(o = yield new z(s.next())).done; i = !1) {
          const c = o.value;
          Sl(c) ? Al(c, r, n) : yl(c) && Rl(c, r, n, t), yield c;
        }
      } catch (o) {
        a = [o];
      } finally {
        try {
          i && (o = s.return) && (yield new z(o.call(s)));
        } finally {
          if (a)
            throw a[0];
        }
      }
    } finally {
      tr(t, r.responseId, r.responseModel, r.responseTimestamp), He(t, r.promptTokens, r.completionTokens, r.totalTokens), t.setAttributes({
        [Ge]: !0
      }), r.finishReasons.length && t.setAttributes({
        [Ot]: JSON.stringify(r.finishReasons)
      }), n && r.responseTexts.length && t.setAttributes({
        [U]: r.responseTexts.join("")
      });
      const u = [...Object.values(r.chatCompletionToolCalls), ...r.responsesApiToolCalls];
      u.length > 0 && t.setAttributes({
        [Z]: JSON.stringify(u)
      }), t.end();
    }
  });
}
function kl(e, t) {
  var r;
  const n = {
    [qn]: "openai",
    [Kn]: Qn(t),
    [J]: "auto.ai.openai"
  };
  if (e.length > 0 && typeof e[0] == "object" && e[0] !== null) {
    const s = e[0], i = Array.isArray(s.tools) ? s.tools : [], a = s.web_search_options && typeof s.web_search_options == "object" ? [l({ type: "web_search_options" }, s.web_search_options)] : [], c = [...i, ...a];
    c.length > 0 && (n[Vn] = JSON.stringify(c));
  }
  if (e.length > 0 && typeof e[0] == "object" && e[0] !== null) {
    const s = e[0];
    n[L] = (r = s.model) != null ? r : "unknown", "temperature" in s && (n[Jn] = s.temperature), "top_p" in s && (n[Yn] = s.top_p), "frequency_penalty" in s && (n[zn] = s.frequency_penalty), "presence_penalty" in s && (n[Ei] = s.presence_penalty), "stream" in s && (n[yi] = s.stream), "encoding_format" in s && (n[Yu] = s.encoding_format), "dimensions" in s && (n[Ku] = s.dimensions);
  } else
    n[L] = "unknown";
  return n;
}
function Ol(e, t, n) {
  var s;
  if (!t || typeof t != "object") return;
  const r = t;
  if (hl(r)) {
    if (El(e, r, n), n && ((s = r.choices) != null && s.length)) {
      const i = r.choices.map((o) => {
        var a;
        return ((a = o.message) == null ? void 0 : a.content) || "";
      });
      e.setAttributes({ [U]: JSON.stringify(i) });
    }
  } else _l(r) ? (bl(e, r, n), n && r.output_text && e.setAttributes({ [U]: r.output_text })) : gl(r) && Tl(e, r);
}
function cs(e, t) {
  if ("messages" in t) {
    const n = it(t.messages);
    e.setAttributes({ [st]: n });
  }
  if ("input" in t) {
    const n = it(t.input);
    e.setAttributes({ [st]: n });
  }
}
function vl() {
  var s, i, o, a;
  const t = v().getClient(), n = t == null ? void 0 : t.getIntegrationByName(ul), r = n ? !!(t != null && t.getOptions().sendDefaultPii) : !1;
  return {
    recordInputs: (i = (s = n == null ? void 0 : n.options) == null ? void 0 : s.recordInputs) != null ? i : r,
    recordOutputs: (a = (o = n == null ? void 0 : n.options) == null ? void 0 : o.recordOutputs) != null ? a : r
  };
}
function Ml(e, t, n, r) {
  return function(...i) {
    return w(this, null, function* () {
      const o = r || vl(), a = kl(i, t), c = a[L] || "unknown", u = Qn(t), f = i[0];
      return f && typeof f == "object" && f.stream === !0 ? de(
        {
          name: `${u} ${c} stream-response`,
          op: as(t),
          attributes: a
        },
        (m) => w(null, null, function* () {
          var d;
          try {
            o.recordInputs && i[0] && typeof i[0] == "object" && cs(m, i[0]);
            const _ = yield e.apply(n, i);
            return Nl(
              _,
              m,
              (d = o.recordOutputs) != null ? d : !1
            );
          } catch (_) {
            throw m.setStatus({ code: T, message: "internal_error" }), O(_, {
              mechanism: {
                handled: !1,
                type: "auto.ai.openai.stream",
                data: {
                  function: t
                }
              }
            }), m.end(), _;
          }
        })
      ) : qt(
        {
          name: `${u} ${c}`,
          op: as(t),
          attributes: a
        },
        (m) => w(null, null, function* () {
          try {
            o.recordInputs && i[0] && typeof i[0] == "object" && cs(m, i[0]);
            const d = yield e.apply(n, i);
            return Ol(m, d, o.recordOutputs), d;
          } catch (d) {
            throw O(d, {
              mechanism: {
                handled: !1,
                type: "auto.ai.openai",
                data: {
                  function: t
                }
              }
            }), d;
          }
        })
      );
    });
  };
}
function Ri(e, t = "", n) {
  return new Proxy(e, {
    get(r, s) {
      const i = r[s], o = ml(t, String(s));
      return typeof i == "function" && pl(o) ? Ml(i, o, r, n) : typeof i == "function" ? i.bind(r) : i && typeof i == "object" ? Ri(i, o, n) : i;
    }
  });
}
function Ed(e, t) {
  return Ri(e, "", t);
}
function wl(e, t) {
  var n, r;
  return "type" in e && typeof e.type == "string" && e.type === "error" ? (t.setStatus({ code: T, message: (r = (n = e.error) == null ? void 0 : n.type) != null ? r : "internal_error" }), O(e.error, {
    mechanism: {
      handled: !1,
      type: "auto.ai.anthropic.anthropic_error"
    }
  }), !0) : !1;
}
function Cl(e, t) {
  if (e.type === "message_delta" && e.usage && "output_tokens" in e.usage && typeof e.usage.output_tokens == "number" && (t.completionTokens = e.usage.output_tokens), e.message) {
    const n = e.message;
    n.id && (t.responseId = n.id), n.model && (t.responseModel = n.model), n.stop_reason && t.finishReasons.push(n.stop_reason), n.usage && (typeof n.usage.input_tokens == "number" && (t.promptTokens = n.usage.input_tokens), typeof n.usage.cache_creation_input_tokens == "number" && (t.cacheCreationInputTokens = n.usage.cache_creation_input_tokens), typeof n.usage.cache_read_input_tokens == "number" && (t.cacheReadInputTokens = n.usage.cache_read_input_tokens));
  }
}
function xl(e, t) {
  e.type !== "content_block_start" || typeof e.index != "number" || !e.content_block || (e.content_block.type === "tool_use" || e.content_block.type === "server_tool_use") && (t.activeToolBlocks[e.index] = {
    id: e.content_block.id,
    name: e.content_block.name,
    inputJsonParts: []
  });
}
function Pl(e, t, n) {
  if (!(e.type !== "content_block_delta" || !e.delta)) {
    if (typeof e.index == "number" && "partial_json" in e.delta && typeof e.delta.partial_json == "string") {
      const r = t.activeToolBlocks[e.index];
      r && r.inputJsonParts.push(e.delta.partial_json);
    }
    n && typeof e.delta.text == "string" && t.responseTexts.push(e.delta.text);
  }
}
function Dl(e, t) {
  if (e.type !== "content_block_stop" || typeof e.index != "number") return;
  const n = t.activeToolBlocks[e.index];
  if (!n) return;
  const r = n.inputJsonParts.join("");
  let s;
  try {
    s = r ? JSON.parse(r) : {};
  } catch (i) {
    s = { __unparsed: r };
  }
  t.toolCalls.push({
    type: "tool_use",
    id: n.id,
    name: n.name,
    input: s
  }), delete t.activeToolBlocks[e.index];
}
function Ni(e, t, n, r) {
  !(e && typeof e == "object") || wl(e, r) || (Cl(e, t), xl(e, t), Pl(e, t, n), Dl(e, t));
}
function $l(e, t, n) {
  t.isRecording() && (e.responseId && t.setAttributes({
    [Jt]: e.responseId
  }), e.responseModel && t.setAttributes({
    [vt]: e.responseModel
  }), Zn(
    t,
    e.promptTokens,
    e.completionTokens,
    e.cacheCreationInputTokens,
    e.cacheReadInputTokens
  ), t.setAttributes({
    [Ge]: !0
  }), e.finishReasons.length > 0 && t.setAttributes({
    [Ot]: JSON.stringify(e.finishReasons)
  }), n && e.responseTexts.length > 0 && t.setAttributes({
    [U]: e.responseTexts.join("")
  }), n && e.toolCalls.length > 0 && t.setAttributes({
    [Z]: JSON.stringify(e.toolCalls)
  }), t.end());
}
function Ll(e, t, n) {
  return Zt(this, null, function* () {
    const r = {
      responseTexts: [],
      finishReasons: [],
      responseId: "",
      responseModel: "",
      promptTokens: void 0,
      completionTokens: void 0,
      cacheCreationInputTokens: void 0,
      cacheReadInputTokens: void 0,
      toolCalls: [],
      activeToolBlocks: {}
    };
    try {
      try {
        for (var s = Qt(e), i, o, a; i = !(o = yield new z(s.next())).done; i = !1) {
          const c = o.value;
          Ni(c, r, n, t), yield c;
        }
      } catch (o) {
        a = [o];
      } finally {
        try {
          i && (o = s.return) && (yield new z(o.call(s)));
        } finally {
          if (a)
            throw a[0];
        }
      }
    } finally {
      r.responseId && t.setAttributes({
        [Jt]: r.responseId
      }), r.responseModel && t.setAttributes({
        [vt]: r.responseModel
      }), Zn(
        t,
        r.promptTokens,
        r.completionTokens,
        r.cacheCreationInputTokens,
        r.cacheReadInputTokens
      ), t.setAttributes({
        [Ge]: !0
      }), r.finishReasons.length > 0 && t.setAttributes({
        [Ot]: JSON.stringify(r.finishReasons)
      }), n && r.responseTexts.length > 0 && t.setAttributes({
        [U]: r.responseTexts.join("")
      }), n && r.toolCalls.length > 0 && t.setAttributes({
        [Z]: JSON.stringify(r.toolCalls)
      }), t.end();
    }
  });
}
function jl(e, t, n) {
  const r = {
    responseTexts: [],
    finishReasons: [],
    responseId: "",
    responseModel: "",
    promptTokens: void 0,
    completionTokens: void 0,
    cacheCreationInputTokens: void 0,
    cacheReadInputTokens: void 0,
    toolCalls: [],
    activeToolBlocks: {}
  };
  return e.on("streamEvent", (s) => {
    Ni(s, r, n, t);
  }), e.on("message", () => {
    $l(r, t, n);
  }), e.on("error", (s) => {
    O(s, {
      mechanism: {
        handled: !1,
        type: "auto.ai.anthropic.stream_error"
      }
    }), t.isRecording() && (t.setStatus({ code: T, message: "stream_error" }), t.end());
  }), e;
}
const Fl = [
  "messages.create",
  "messages.stream",
  "messages.countTokens",
  "models.get",
  "completions.create",
  "models.retrieve",
  "beta.messages.create"
];
function Ul(e) {
  return Fl.includes(e);
}
function Bl(e, t) {
  t.error && (e.setStatus({ code: T, message: t.error.type || "internal_error" }), O(t.error, {
    mechanism: {
      handled: !1,
      type: "auto.ai.anthropic.anthropic_error"
    }
  }));
}
function Gl(e, t) {
  var r;
  const n = {
    [qn]: "anthropic",
    [Kn]: zt(t),
    [J]: "auto.ai.anthropic"
  };
  if (e.length > 0 && typeof e[0] == "object" && e[0] !== null) {
    const s = e[0];
    s.tools && Array.isArray(s.tools) && (n[Vn] = JSON.stringify(s.tools)), n[L] = (r = s.model) != null ? r : "unknown", "temperature" in s && (n[Jn] = s.temperature), "top_p" in s && (n[Yn] = s.top_p), "stream" in s && (n[yi] = s.stream), "top_k" in s && (n[bi] = s.top_k), "frequency_penalty" in s && (n[zn] = s.frequency_penalty), "max_tokens" in s && (n[Si] = s.max_tokens);
  } else
    t === "models.retrieve" || t === "models.get" ? n[L] = e[0] : n[L] = "unknown";
  return n;
}
function mn(e, t) {
  if ("messages" in t) {
    const n = it(t.messages);
    e.setAttributes({ [st]: n });
  }
  if ("input" in t) {
    const n = it(t.input);
    e.setAttributes({ [st]: n });
  }
  "prompt" in t && e.setAttributes({ [zu]: JSON.stringify(t.prompt) });
}
function Hl(e, t) {
  if ("content" in t && Array.isArray(t.content)) {
    e.setAttributes({
      [U]: t.content.map((r) => r.text).filter((r) => !!r).join("")
    });
    const n = [];
    for (const r of t.content)
      (r.type === "tool_use" || r.type === "server_tool_use") && n.push(r);
    n.length > 0 && e.setAttributes({ [Z]: JSON.stringify(n) });
  }
  "completion" in t && e.setAttributes({ [U]: t.completion }), "input_tokens" in t && e.setAttributes({ [U]: JSON.stringify(t.input_tokens) });
}
function Wl(e, t) {
  "id" in t && "model" in t && (e.setAttributes({
    [Jt]: t.id,
    [vt]: t.model
  }), "created" in t && typeof t.created == "number" && e.setAttributes({
    [is]: new Date(t.created * 1e3).toISOString()
  }), "created_at" in t && typeof t.created_at == "number" && e.setAttributes({
    [is]: new Date(t.created_at * 1e3).toISOString()
  }), "usage" in t && t.usage && Zn(
    e,
    t.usage.input_tokens,
    t.usage.output_tokens,
    t.usage.cache_creation_input_tokens,
    t.usage.cache_read_input_tokens
  ));
}
function ql(e, t, n) {
  if (!(!t || typeof t != "object")) {
    if ("type" in t && t.type === "error") {
      Bl(e, t);
      return;
    }
    n && Hl(e, t), Wl(e, t);
  }
}
function us(e, t, n) {
  throw O(e, {
    mechanism: { handled: !1, type: "auto.ai.anthropic", data: { function: n } }
  }), t.isRecording() && (t.setStatus({ code: T, message: "internal_error" }), t.end()), e;
}
function Jl(e, t, n, r, s, i, o, a, c, u, f) {
  var d;
  const p = (d = s[L]) != null ? d : "unknown", m = {
    name: `${i} ${p} stream-response`,
    op: ge(o),
    attributes: s
  };
  return u && !f ? de(m, (_) => w(null, null, function* () {
    var g;
    try {
      c.recordInputs && a && mn(_, a);
      const E = yield e.apply(n, r);
      return Ll(
        E,
        _,
        (g = c.recordOutputs) != null ? g : !1
      );
    } catch (E) {
      return us(E, _, o);
    }
  })) : de(m, (_) => {
    var g;
    try {
      c.recordInputs && a && mn(_, a);
      const E = t.apply(n, r);
      return jl(E, _, (g = c.recordOutputs) != null ? g : !1);
    } catch (E) {
      return us(E, _, o);
    }
  });
}
function zl(e, t, n, r) {
  return new Proxy(e, {
    apply(s, i, o) {
      var d;
      const a = Gl(o, t), c = (d = a[L]) != null ? d : "unknown", u = zt(t), f = typeof o[0] == "object" ? o[0] : void 0, p = !!(f != null && f.stream), m = t === "messages.stream";
      return p || m ? Jl(
        e,
        s,
        n,
        o,
        a,
        u,
        t,
        f,
        r,
        p,
        m
      ) : qt(
        {
          name: `${u} ${c}`,
          op: ge(t),
          attributes: a
        },
        (_) => (r.recordInputs && f && mn(_, f), xe(
          () => s.apply(n, o),
          (g) => {
            O(g, {
              mechanism: {
                handled: !1,
                type: "auto.ai.anthropic",
                data: {
                  function: t
                }
              }
            });
          },
          () => {
          },
          (g) => ql(_, g, r.recordOutputs)
        ))
      );
    }
  });
}
function ki(e, t = "", n) {
  return new Proxy(e, {
    get(r, s) {
      const i = r[s], o = Ai(t, String(s));
      return typeof i == "function" && Ul(o) ? zl(i, o, r, n) : typeof i == "function" ? i.bind(r) : i && typeof i == "object" ? ki(i, o, n) : i;
    }
  });
}
function bd(e, t) {
  var s;
  const n = !!((s = I()) != null && s.getOptions().sendDefaultPii), r = l({
    recordInputs: n,
    recordOutputs: n
  }, t);
  return ki(e, "", r);
}
const ls = [
  "models.generateContent",
  "models.generateContentStream",
  "chats.create",
  "sendMessage",
  "sendMessageStream"
], Yl = "google_genai", Oi = "chats.create", Kl = "chat";
function Vl(e, t) {
  var r;
  const n = e == null ? void 0 : e.promptFeedback;
  if (n != null && n.blockReason) {
    const s = (r = n.blockReasonMessage) != null ? r : n.blockReason;
    return t.setStatus({ code: T, message: `Content blocked: ${s}` }), O(`Content blocked: ${s}`, {
      mechanism: { handled: !1, type: "auto.ai.google_genai" }
    }), !0;
  }
  return !1;
}
function Xl(e, t) {
  typeof e.responseId == "string" && (t.responseId = e.responseId), typeof e.modelVersion == "string" && (t.responseModel = e.modelVersion);
  const n = e.usageMetadata;
  n && (typeof n.promptTokenCount == "number" && (t.promptTokens = n.promptTokenCount), typeof n.candidatesTokenCount == "number" && (t.completionTokens = n.candidatesTokenCount), typeof n.totalTokenCount == "number" && (t.totalTokens = n.totalTokenCount));
}
function Zl(e, t, n) {
  var r, s, i;
  Array.isArray(e.functionCalls) && t.toolCalls.push(...e.functionCalls);
  for (const o of (r = e.candidates) != null ? r : []) {
    o != null && o.finishReason && !t.finishReasons.includes(o.finishReason) && t.finishReasons.push(o.finishReason);
    for (const a of (i = (s = o == null ? void 0 : o.content) == null ? void 0 : s.parts) != null ? i : [])
      n && a.text && t.responseTexts.push(a.text), a.functionCall && t.toolCalls.push({
        type: "function",
        id: a.functionCall.id,
        name: a.functionCall.name,
        arguments: a.functionCall.args
      });
  }
}
function Ql(e, t, n, r) {
  !e || Vl(e, r) || (Xl(e, t), Zl(e, t, n));
}
function tf(e, t, n) {
  return Zt(this, null, function* () {
    const r = {
      responseTexts: [],
      finishReasons: [],
      toolCalls: []
    };
    try {
      try {
        for (var s = Qt(e), i, o, a; i = !(o = yield new z(s.next())).done; i = !1) {
          const c = o.value;
          Ql(c, r, n, t), yield c;
        }
      } catch (o) {
        a = [o];
      } finally {
        try {
          i && (o = s.return) && (yield new z(o.call(s)));
        } finally {
          if (a)
            throw a[0];
        }
      }
    } finally {
      const c = {
        [Ge]: !0
      };
      r.responseId && (c[Jt] = r.responseId), r.responseModel && (c[vt] = r.responseModel), r.promptTokens !== void 0 && (c[Fe] = r.promptTokens), r.completionTokens !== void 0 && (c[Ue] = r.completionTokens), r.totalTokens !== void 0 && (c[Be] = r.totalTokens), r.finishReasons.length && (c[Ot] = JSON.stringify(r.finishReasons)), n && r.responseTexts.length && (c[U] = r.responseTexts.join("")), n && r.toolCalls.length && (c[Z] = JSON.stringify(r.toolCalls)), t.setAttributes(c), t.end();
    }
  });
}
function ef(e) {
  if (ls.includes(e))
    return !0;
  const t = e.split(".").pop();
  return ls.includes(t);
}
function nf(e) {
  return e.includes("Stream") || e.endsWith("generateContentStream") || e.endsWith("sendMessageStream");
}
function fs(e, t) {
  if ("model" in e && typeof e.model == "string")
    return e.model;
  if (t && typeof t == "object") {
    const n = t;
    if ("model" in n && typeof n.model == "string")
      return n.model;
    if ("modelVersion" in n && typeof n.modelVersion == "string")
      return n.modelVersion;
  }
  return "unknown";
}
function rf(e) {
  const t = {};
  return "temperature" in e && typeof e.temperature == "number" && (t[Jn] = e.temperature), "topP" in e && typeof e.topP == "number" && (t[Yn] = e.topP), "topK" in e && typeof e.topK == "number" && (t[bi] = e.topK), "maxOutputTokens" in e && typeof e.maxOutputTokens == "number" && (t[Si] = e.maxOutputTokens), "frequencyPenalty" in e && typeof e.frequencyPenalty == "number" && (t[zn] = e.frequencyPenalty), "presencePenalty" in e && typeof e.presencePenalty == "number" && (t[Ei] = e.presencePenalty), t;
}
function sf(e, t, n) {
  const r = {
    [qn]: Yl,
    [Kn]: zt(e),
    [J]: "auto.ai.google_genai"
  };
  if (t) {
    if (r[L] = fs(t, n), "config" in t && typeof t.config == "object" && t.config) {
      const s = t.config;
      if (Object.assign(r, rf(s)), "tools" in s && Array.isArray(s.tools)) {
        const i = s.tools.flatMap(
          (o) => o.functionDeclarations
        );
        r[Vn] = JSON.stringify(i);
      }
    }
  } else
    r[L] = fs({}, n);
  return r;
}
function ds(e, t) {
  if ("contents" in t) {
    const n = t.contents, r = it(n);
    e.setAttributes({ [st]: r });
  }
  if ("message" in t) {
    const n = t.message, r = it(n);
    e.setAttributes({ [st]: r });
  }
  if ("history" in t) {
    const n = t.history, r = it(n);
    e.setAttributes({ [st]: r });
  }
}
function of(e, t, n) {
  if (!(!t || typeof t != "object")) {
    if (t.usageMetadata && typeof t.usageMetadata == "object") {
      const r = t.usageMetadata;
      typeof r.promptTokenCount == "number" && e.setAttributes({
        [Fe]: r.promptTokenCount
      }), typeof r.candidatesTokenCount == "number" && e.setAttributes({
        [Ue]: r.candidatesTokenCount
      }), typeof r.totalTokenCount == "number" && e.setAttributes({
        [Be]: r.totalTokenCount
      });
    }
    if (n && Array.isArray(t.candidates) && t.candidates.length > 0) {
      const r = t.candidates.map((s) => {
        var i;
        return (i = s.content) != null && i.parts && Array.isArray(s.content.parts) ? s.content.parts.map((o) => typeof o.text == "string" ? o.text : "").filter((o) => o.length > 0).join("") : "";
      }).filter((s) => s.length > 0);
      r.length > 0 && e.setAttributes({
        [U]: r.join("")
      });
    }
    if (n && t.functionCalls) {
      const r = t.functionCalls;
      Array.isArray(r) && r.length > 0 && e.setAttributes({
        [Z]: JSON.stringify(r)
      });
    }
  }
}
function ps(e, t, n, r) {
  const s = t === Oi;
  return new Proxy(e, {
    apply(i, o, a) {
      var m;
      const c = a[0], u = sf(t, c, n), f = (m = u[L]) != null ? m : "unknown", p = zt(t);
      return nf(t) ? de(
        {
          name: `${p} ${f} stream-response`,
          op: ge(t),
          attributes: u
        },
        (d) => w(null, null, function* () {
          try {
            r.recordInputs && c && ds(d, c);
            const _ = yield i.apply(n, a);
            return tf(_, d, !!r.recordOutputs);
          } catch (_) {
            throw d.setStatus({ code: T, message: "internal_error" }), O(_, {
              mechanism: {
                handled: !1,
                type: "auto.ai.google_genai",
                data: { function: t }
              }
            }), d.end(), _;
          }
        })
      ) : qt(
        {
          name: s ? `${p} ${f} create` : `${p} ${f}`,
          op: ge(t),
          attributes: u
        },
        (d) => (r.recordInputs && c && ds(d, c), xe(
          () => i.apply(n, a),
          (_) => {
            O(_, {
              mechanism: { handled: !1, type: "auto.ai.google_genai", data: { function: t } }
            });
          },
          () => {
          },
          (_) => {
            s || of(d, _, r.recordOutputs);
          }
        ))
      );
    }
  });
}
function hn(e, t = "", n) {
  return new Proxy(e, {
    get: (r, s, i) => {
      const o = Reflect.get(r, s, i), a = Ai(t, String(s));
      if (typeof o == "function" && ef(a)) {
        if (a === Oi) {
          const c = ps(o, a, r, n);
          return function(...f) {
            const p = c(...f);
            return p && typeof p == "object" ? hn(p, Kl, n) : p;
          };
        }
        return ps(o, a, r, n);
      }
      return typeof o == "function" ? o.bind(r) : o && typeof o == "object" ? hn(o, a, n) : o;
    }
  });
}
function Td(e, t) {
  var s;
  const n = !!((s = I()) != null && s.getOptions().sendDefaultPii), r = l({
    recordInputs: n,
    recordOutputs: n
  }, t);
  return hn(e, "", r);
}
function Id(e) {
  const t = v();
  e(t);
}
const A = typeof __SENTRY_DEBUG__ == "undefined" ? !0 : __SENTRY_DEBUG__, ms = "finishReason", hs = ["heartbeatFailed", "idleTimeout", "documentHidden"];
let vi;
function af() {
  return vi;
}
function ye(e) {
  vi = e;
}
function Mt(e) {
  return e / 1e3;
}
function cf(e) {
  return e * 1e3;
}
class Mi {
  constructor(t = 1e3) {
    this.spans = [], this._maxlen = t;
  }
  /**
   * This is just so that we don't run out of memory while recording a lot
   * of spans. At some point we just stop and flush out the start of the
   * trace tree (i.e.the first n spans with the smallest
   * start_timestamp).
   */
  add(t) {
    this.spans.length > this._maxlen ? t.spanRecorder = void 0 : this.spans.push(t);
  }
}
class er {
  /**
   * You should never call the constructor manually, always use `Sentry.startTransaction()`
   * or call `startChild()` on an existing span.
   * @internal
   * @hideconstructor
   * @hidden
   */
  constructor(t) {
    var n, r, s, i, o, a, c, u, f, p, m, d, _;
    if (this.name = "", this.traceId = D(), this.spanId = D().substring(16), this.startTimestamp = $(), this.tags = {}, this.data = {}, this.attributes = {}, this.instrumenter = "sentry", !t)
      return this;
    this.traceId = (n = t.traceId) != null ? n : this.traceId, this.spanId = (r = t.spanId) != null ? r : this.spanId, this.parentSpanId = (s = t.parentSpanId) != null ? s : this.parentSpanId, "sampled" in t && (this.sampled = t.sampled), this.op = (i = t.op) != null ? i : this.op, this.description = (a = (o = t.description) != null ? o : t.name) != null ? a : this.description, this.name = (u = (c = t.name) != null ? c : t.description) != null ? u : this.name, this.data = t.data ? l({}, t.data) : this.data, this.tags = t.tags ? l({}, t.tags) : this.tags, this.attributes = t.attributes ? l({}, t.attributes) : this.attributes, this.status = (f = t.status) != null ? f : this.status, this.startTimestamp = (p = t.startTimestamp) != null ? p : this.startTimestamp, this.endTimestamp = (m = t.endTimestamp) != null ? m : this.endTimestamp, this.instrumenter = (d = t.instrumenter) != null ? d : this.instrumenter, this.origin = (_ = t.origin) != null ? _ : this.origin;
  }
  /**
   * @inheritDoc
   * @deprecated
   */
  child(t) {
    return this.startChild(t);
  }
  /**
   * @inheritDoc
   */
  startChild(t) {
    var r;
    const n = new er(S(l({}, t), {
      parentSpanId: this.spanId,
      sampled: this.sampled,
      attributes: (r = t == null ? void 0 : t.attributes) != null ? r : {},
      instrumenter: this.instrumenter,
      traceId: this.traceId
    }));
    return n.spanRecorder = this.spanRecorder, n.spanRecorder && n.spanRecorder.add(n), n.transaction = this.transaction, n;
  }
  /**
   * @inheritDoc
   */
  setTag(t, n) {
    return this.tags = S(l({}, this.tags), { [t]: n }), this;
  }
  /**
   * @inheritDoc
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  setData(t, n) {
    return this.data = S(l({}, this.data), { [t]: n }), this;
  }
  /**
   * @inheritDoc
   */
  setAttribute(t, n) {
    return n === void 0 ? delete this.attributes[t] : this.attributes[t] = n, this;
  }
  /**
   * @inheritDoc
   */
  setAttributes(t) {
    return Object.keys(t).forEach((n) => this.setAttribute(n, t[n])), this;
  }
  /**
   * @inheritDoc
   */
  setStatus(t) {
    var n;
    return this.status = typeof t == "string" ? t : (n = t.message) != null ? n : t.code, this;
  }
  /**
   * @inheritDoc
   */
  setHttpStatus(t) {
    this.setTag("http.status_code", String(t));
    const n = lf(t);
    return n !== "unknown_error" && this.setStatus(n), this;
  }
  /**
   * @inheritDoc
   */
  addEvent(t, n, r) {
    return this;
  }
  /**
   * @inheritDoc
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addLink(t) {
    return this;
  }
  /**
   * @inheritDoc
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addLinks(t) {
    return this;
  }
  /**
   * @inheritDoc
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  recordException(t) {
  }
  /**
   * @inheritDoc
   */
  isSuccess() {
    return this.status === "ok";
  }
  /**
   * @inheritDoc
   */
  setName(t) {
    this.name = t, this.description = t;
  }
  /**
   * @inheritDoc
   */
  updateName(t) {
    return this.setName(t), this;
  }
  /**
   * @inheritDoc
   */
  end(t) {
    this.finish(uf(t));
  }
  /**
   * @inheritDoc
   */
  finish(t) {
    this.endTimestamp = typeof t == "number" ? t : $();
  }
  /**
   * @inheritDoc
   */
  toTraceparent() {
    let t = "";
    return this.sampled !== void 0 && (t = this.sampled ? "-1" : "-0"), `${this.traceId}-${this.spanId}${t}`;
  }
  /**
   * @inheritDoc
   */
  toContext() {
    return ie({
      data: this.data,
      description: this.description,
      attributes: this.attributes,
      name: this.name,
      endTimestamp: this.endTimestamp,
      op: this.op,
      parentSpanId: this.parentSpanId,
      sampled: this.sampled,
      spanId: this.spanId,
      startTimestamp: this.startTimestamp,
      status: typeof this.status == "number" ? String(this.status) : this.status,
      tags: this.tags,
      traceId: this.traceId
    });
  }
  /**
   * @inheritDoc
   */
  updateWithContext(t) {
    var n, r, s, i, o, a, c, u, f;
    return this.data = (n = t.data) != null ? n : {}, this.description = (r = t.description) != null ? r : t.name, this.name = (i = (s = t.name) != null ? s : t.description) != null ? i : this.name, this.endTimestamp = t.endTimestamp, this.op = t.op, this.parentSpanId = t.parentSpanId, this.sampled = t.sampled, this.spanId = (o = t.spanId) != null ? o : this.spanId, this.startTimestamp = (a = t.startTimestamp) != null ? a : this.startTimestamp, this.status = t.status, this.tags = (c = t.tags) != null ? c : {}, this.attributes = (u = t.attributes) != null ? u : this.attributes, this.traceId = (f = t.traceId) != null ? f : this.traceId, this;
  }
  /**
   * @inheritDoc
   */
  getTraceContext() {
    return ie({
      data: Object.keys(this.data).length > 0 ? this.data : void 0,
      description: this.description,
      op: this.op,
      parent_span_id: this.parentSpanId,
      span_id: this.spanId,
      status: typeof this.status == "number" ? String(this.status) : this.status,
      tags: Object.keys(this.tags).length > 0 ? this.tags : void 0,
      trace_id: this.traceId
    });
  }
  /**
   * @inheritDoc
   */
  toJSON() {
    const t = Object.keys(this.data).length > 0 ? this.data : {};
    return ie({
      data: t,
      description: this.description,
      op: this.op,
      parent_span_id: this.parentSpanId,
      span_id: this.spanId,
      start_timestamp: this.startTimestamp,
      status: typeof this.status == "number" ? String(this.status) : this.status,
      tags: Object.keys(this.tags).length > 0 ? this.tags : void 0,
      timestamp: this.endTimestamp,
      trace_id: this.traceId,
      origin: this.origin
    });
  }
  /**
   * Return OTEL-like span context data.
   */
  spanContext() {
    return {
      traceId: this.traceId,
      spanId: this.spanId,
      traceFlags: this.sampled ? 1 : 0
    };
  }
  /**
   * Whether span is recording (sampled and not finished).
   */
  isRecording() {
    return this.sampled !== !1 && this.endTimestamp === void 0;
  }
}
function uf(e) {
  if (e === void 0)
    return $();
  if (Array.isArray(e) && e.length === 2) {
    const [t, n] = e;
    return t + n / 1e9;
  }
  return e instanceof Date ? e.getTime() / 1e3 : typeof e == "number" ? e > 1e12 ? Mt(e) : e : $();
}
function lf(e) {
  if (e < 400 && e >= 100)
    return "ok";
  if (e >= 400 && e < 500)
    switch (e) {
      case 401:
        return "unauthenticated";
      case 403:
        return "permission_denied";
      case 404:
        return "not_found";
      case 409:
        return "already_exists";
      case 413:
        return "failed_precondition";
      case 429:
        return "resource_exhausted";
      default:
        return "invalid_argument";
    }
  if (e >= 500 && e < 600)
    switch (e) {
      case 501:
        return "unimplemented";
      case 503:
        return "unavailable";
      case 504:
        return "deadline_exceeded";
      default:
        return "internal_error";
    }
  return "unknown_error";
}
class wi extends er {
  /**
   * This constructor should never be called manually. Those instrumenting tracing should use
   * `Sentry.startTransaction()`, and internal methods should use `hub.startTransaction()`.
   * @internal
   * @hideconstructor
   * @hidden
   */
  constructor(t) {
    super(t), this._measurements = {}, this._contexts = {}, this.name = t.name || "", this.metadata = l({
      source: "custom",
      spanMetadata: {}
    }, t.metadata), this._trimEnd = t.trimEnd, this.transaction = this;
  }
  /**
   * JSDoc
   */
  setName(t) {
    this.name = t;
  }
  /**
   * Attach additional context to the transaction.
   * @deprecated Prefer attributes or scope data.
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  setContext(t, n) {
    this._contexts[t] = n;
  }
  /**
   * Record a single measurement.
   * @deprecated Prefer top-level `setMeasurement`.
   */
  setMeasurement(t, n, r = "") {
    this._measurements[t] = { value: n, unit: r };
  }
  /**
   * Attaches SpanRecorder to the span itself
   * @param maxlen maximum number of spans that can be recorded
   */
  initSpanRecorder(t = 1e3) {
    this.spanRecorder || (this.spanRecorder = new Mi(t)), this.spanRecorder.add(this);
  }
  /**
   * Set observed measurements for this transaction.
   * @hidden
   */
  setMeasurements(t) {
    this._measurements = l({}, t);
  }
  /**
   * Set metadata for this transaction.
   * @hidden
   */
  setMetadata(t) {
    this.metadata = l(l({}, this.metadata), t);
  }
  /**
   * Return dynamic sampling context for this transaction.
   */
  getDynamicSamplingContext() {
    var t;
    return ((t = this.metadata) == null ? void 0 : t.dynamicSamplingContext) || {};
  }
  /**
   * Placeholder profile id (not used in miniapp tracing).
   */
  getProfileId() {
  }
  /**
   * @inheritDoc
   */
  finish(t) {
    if (this.endTimestamp !== void 0)
      return;
    if (this.name || (A && h.warn("Transaction has no name, falling back to `<unlabeled transaction>`."), this.name = "<unlabeled transaction>"), super.finish(t), this.sampled !== !0) {
      A && h.log("[Tracing] Discarding transaction because its trace was not chosen to be sampled.");
      return;
    }
    const n = this.spanRecorder ? this.spanRecorder.spans.filter((o) => o !== this && o.endTimestamp) : [], r = n.map((o) => o.toJSON());
    this._trimEnd && n.length > 0 && (this.endTimestamp = n.reduce((o, a) => o.endTimestamp && a.endTimestamp ? o.endTimestamp > a.endTimestamp ? o : a : o).endTimestamp);
    const s = {
      contexts: l({
        trace: this.getTraceContext()
      }, this._contexts),
      spans: r,
      start_timestamp: this.startTimestamp,
      tags: this.tags,
      timestamp: this.endTimestamp,
      transaction: this.name,
      type: "transaction",
      sdkProcessingMetadata: this.metadata
    };
    return Object.keys(this._measurements).length > 0 && (A && h.log(
      "[Measurements] Adding measurements to transaction",
      JSON.stringify(this._measurements, void 0, 2)
    ), s.measurements = this._measurements), A && h.log(`[Tracing] Finishing ${this.op} transaction: ${this.name}.`), Pa(s);
  }
  /**
   * @inheritDoc
   */
  toContext() {
    const t = super.toContext();
    return ie(S(l({}, t), {
      name: this.name,
      trimEnd: this._trimEnd
    }));
  }
  /**
   * @inheritDoc
   */
  updateWithContext(t) {
    var n;
    return super.updateWithContext(t), this.name = (n = t.name) != null ? n : "", this._trimEnd = t.trimEnd, this;
  }
}
const ff = 1e3, df = 5e3;
class pf extends Mi {
  constructor(t, n, r = "", s) {
    super(s), this._pushActivity = t, this._popActivity = n, this.transactionSpanId = r;
  }
  /**
   * @inheritDoc
   */
  add(t) {
    t.spanId !== this.transactionSpanId && (t.finish = (n) => {
      t.endTimestamp = typeof n == "number" ? n : $(), this._popActivity(t.spanId);
    }, t.endTimestamp === void 0 && this._pushActivity(t.spanId)), super.add(t);
  }
}
class mf extends wi {
  constructor(t, n = ff, r = !1) {
    super(t), this._idleTimeout = n, this._onScope = r, this.activities = {}, this._heartbeatCounter = 0, this._finished = !1, this._beforeFinishCallbacks = [], r && (A && h.log(`Setting idle transaction as active. Span ID: ${this.spanId}`), ye(this)), this._initTimeout = setTimeout(() => {
      this._finished || this.finish();
    }, this._idleTimeout);
  }
  /** {@inheritDoc} */
  finish(t = $()) {
    if (this._finished = !0, this.activities = {}, this.spanRecorder) {
      A && h.log("[Tracing] finishing IdleTransaction", new Date(t * 1e3).toISOString(), this.op);
      for (const n of this._beforeFinishCallbacks)
        n(this, t);
      this.spanRecorder.spans = this.spanRecorder.spans.filter((n) => {
        if (n.spanId === this.spanId)
          return !0;
        n.endTimestamp || (n.endTimestamp = t, n.setStatus("cancelled"), A && h.log("[Tracing] cancelling span since transaction ended early", JSON.stringify(n, void 0, 2)));
        const r = n.startTimestamp < t;
        return r || A && h.log(
          "[Tracing] discarding Span since it happened after Transaction was finished",
          JSON.stringify(n, void 0, 2)
        ), r;
      }), A && h.log("[Tracing] flushing IdleTransaction");
    } else
      A && h.log("[Tracing] No active IdleTransaction");
    return this._onScope && ye(void 0), super.finish(t);
  }
  /**
   * Register a callback function that gets excecuted before the transaction finishes.
   * Useful for cleanup or if you want to add any additional spans based on current context.
   *
   * This is exposed because users have no other way of running something before an idle transaction
   * finishes.
   */
  registerBeforeFinishCallback(t) {
    this._beforeFinishCallbacks.push(t);
  }
  /**
   * @inheritDoc
   */
  initSpanRecorder(t) {
    if (!this.spanRecorder) {
      const n = (s) => {
        this._finished || this._pushActivity(s);
      }, r = (s) => {
        this._finished || this._popActivity(s);
      };
      this.spanRecorder = new pf(n, r, this.spanId, t), A && h.log("Starting heartbeat"), this._pingHeartbeat();
    }
    this.spanRecorder.add(this);
  }
  /**
   * Start tracking a specific activity.
   * @param spanId The span id that represents the activity
   */
  _pushActivity(t) {
    this._initTimeout && (clearTimeout(this._initTimeout), this._initTimeout = void 0), A && h.log(`[Tracing] pushActivity: ${t}`), this.activities[t] = !0, A && h.log("[Tracing] new activities count", Object.keys(this.activities).length);
  }
  /**
   * Remove an activity from usage
   * @param spanId The span id that represents the activity
   */
  _popActivity(t) {
    if (this.activities[t] && (A && h.log(`[Tracing] popActivity ${t}`), delete this.activities[t], A && h.log("[Tracing] new activities count", Object.keys(this.activities).length)), Object.keys(this.activities).length === 0) {
      const n = this._idleTimeout, r = $() + n / 1e3;
      setTimeout(() => {
        this._finished || (this.setTag(ms, hs[1]), this.finish(r));
      }, n);
    }
  }
  /**
   * Checks when entries of this.activities are not changing for 3 beats.
   * If this occurs we finish the transaction.
   */
  _beat() {
    if (this._finished)
      return;
    const t = Object.keys(this.activities).join("");
    t === this._prevHeartbeatString ? this._heartbeatCounter += 1 : this._heartbeatCounter = 1, this._prevHeartbeatString = t, this._heartbeatCounter >= 3 ? (A && h.log("[Tracing] Transaction finished because of no change for 3 heart beats"), this.setStatus("deadline_exceeded"), this.setTag(ms, hs[0]), this.finish()) : this._pingHeartbeat();
  }
  /**
   * Pings the heartbeat
   */
  _pingHeartbeat() {
    A && h.log(`pinging Heartbeat -> current counter: ${this._heartbeatCounter}`), setTimeout(() => {
      this._beat();
    }, df);
  }
}
const hf = 3600;
let K, Se;
function _f() {
  return {
    traceId: at(),
    spanId: Rt(),
    sampleRand: Math.random()
  };
}
function nr() {
  return K || (K = _f()), K;
}
function Ci(e) {
  const t = nr();
  return K = l(l({}, t), e), K;
}
function gf(e = !1) {
  const t = K;
  return K = {
    traceId: e && t ? t.traceId : at(),
    spanId: Rt(),
    sampleRand: Math.random()
  }, K;
}
function yf() {
  return Se;
}
function Sf(e, t, n, r, s, i) {
  Se = {
    spanContext: {
      traceId: e,
      spanId: t,
      traceFlags: n ? 1 : 0
    },
    startTimestamp: r,
    sampleRate: s,
    sampleRand: i
  };
}
function Ef() {
  return Se ? Date.now() / 1e3 - Se.startTimestamp <= hf : !1;
}
function xi(e, t, n) {
  const [r, s] = zs(
    { tracesSampleRate: t.tracesSampleRate, tracesSampler: t.tracesSampler },
    n,
    Math.random()
  );
  return e.sampled = r, e.sampled ? (A && h.log(`[Tracing] starting ${e.op} transaction - ${e.name}`), e) : (A && h.log(
    `[Tracing] Discarding transaction because it's not included in the random sample (sampling rate = ${Number(
      s != null ? s : 0
    )})`
  ), e);
}
function Ad(e, t, n) {
  var p, m;
  const r = I(), s = r && r.getOptions && r.getOptions() || {}, i = (p = n == null ? void 0 : n.traceContinuityMode) != null ? p : "off", o = (m = n == null ? void 0 : n.consistentTraceSampling) != null ? m : !1, a = Pi(
    e,
    i,
    o
  ), c = a.name || a.op || "unknown-transaction", u = l({
    parentSampled: a.parentSampled,
    transactionContext: S(l({}, a), { name: c }),
    name: c
  }, t);
  let f = new wi(S(l({}, a), { name: c }));
  if (f = xi(f, s, u), f.sampled) {
    const d = s._experiments && s._experiments.maxSpans;
    f.initSpanRecorder(d), ye(f);
  }
  return Ci({
    traceId: f.traceId,
    spanId: f.spanId,
    sampled: f.sampled
  }), f;
}
function bf(e, t, n, r, s) {
  var d, _;
  const i = I(), o = i && i.getOptions && i.getOptions() || {}, a = (d = s == null ? void 0 : s.traceContinuityMode) != null ? d : "off", c = (_ = s == null ? void 0 : s.consistentTraceSampling) != null ? _ : !1, u = Pi(
    e,
    a,
    c
  ), f = u.name || u.op || "unknown-transaction", p = l({
    parentSampled: u.parentSampled,
    transactionContext: S(l({}, u), { name: f }),
    name: f
  }, r);
  let m = new mf(S(l({}, u), { name: f }), t, n);
  if (m = xi(m, o, p), m.sampled) {
    const g = o._experiments && o._experiments.maxSpans;
    m.initSpanRecorder(g), ye(m);
  }
  return Ci({
    traceId: m.traceId,
    spanId: m.spanId,
    sampled: m.sampled
  }), m.registerBeforeFinishCallback((g) => {
    var R;
    const E = (R = o.tracesSampleRate) != null ? R : 1, N = nr();
    Sf(
      g.traceId,
      g.spanId,
      g.sampled,
      g.startTimestamp,
      E,
      N.sampleRand
    ), A && h.log(`[Tracing] Updated previous trace info: traceId=${g.traceId}, spanId=${g.spanId}`);
  }), m;
}
function Pi(e, t, n) {
  if (t === "off")
    return e;
  const r = nr(), s = yf(), i = Ef();
  if (t === "session") {
    const o = S(l({}, e), {
      traceId: r.traceId
      // Each transaction is a root span in session mode, no parent
    });
    return n && i && s && (o.parentSampled = s.spanContext.traceFlags === 1), A && h.log(`[Tracing] Session mode: reusing traceId=${r.traceId}`), o;
  }
  if (t === "link") {
    const o = gf(!1), a = S(l({}, e), {
      traceId: o.traceId
    });
    return n && i && s && (a.parentSampled = s.spanContext.traceFlags === 1), i && s ? (a.metadata = S(l({}, a.metadata), {
      previousTrace: {
        traceId: s.spanContext.traceId,
        spanId: s.spanContext.spanId,
        sampled: s.spanContext.traceFlags === 1
      }
    }), A && h.log(
      `[Tracing] Link mode: new traceId=${o.traceId}, linked from previous traceId=${s.spanContext.traceId}`
    )) : A && h.log(`[Tracing] Link mode: new traceId=${o.traceId} (first trace)`), a;
  }
  return e;
}
const Tf = "sentry.javascript.miniapp", _s = "10.27.0-rc.1", lt = "?", If = /^\s*at (?:(.*?) ?\()?((?:file|https?|blob|chrome-extension|address|native|eval|webpack|<anonymous>|[-a-z]+:|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i, Af = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:file|https?|blob|chrome|webpack|resource|moz-extension).*?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js))(?::(\d+))?(?::(\d+))?\s*$/i, Rf = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i, Nf = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i, kf = /\((\S*)(?::(\d+))(?::(\d+))\)/, Of = /^\s*at (.*?) ?\((\S*):(\d+):(\d+)\)/i;
function Ut(e) {
  let t = null;
  const n = e && e.framesToPop;
  try {
    if (t = Mf(e), t)
      return gs(t, n);
  } catch (r) {
  }
  try {
    if (t = vf(e), t)
      return gs(t, n);
  } catch (r) {
  }
  return {
    message: rr(e),
    name: e && e.name,
    stack: [],
    failed: !0
  };
}
function vf(e) {
  if (!e || !e.stack)
    return null;
  const t = [], n = e.stack.split(`
`);
  let r, s, i, o;
  for (let a = 0; a < n.length; ++a) {
    if (i = If.exec(n[a])) {
      const c = i[2] && i[2].indexOf("native") === 0;
      r = i[2] && i[2].indexOf("eval") === 0, r && (s = kf.exec(i[2])) && (i[2] = s[1], i[3] = s[2], i[4] = s[3]), o = {
        url: i[2],
        func: i[1] || lt,
        args: c ? [i[2]] : [],
        line: i[3] ? +i[3] : null,
        column: i[4] ? +i[4] : null
      };
    } else if (i = Rf.exec(n[a]))
      o = {
        url: i[2],
        func: i[1] || lt,
        args: [],
        line: +i[3],
        column: i[4] ? +i[4] : null
      };
    else if (i = Af.exec(n[a]))
      r = i[3] && i[3].indexOf(" > eval") > -1, r && (s = Nf.exec(i[3])) ? (i[1] = i[1] || "eval", i[3] = s[1], i[4] = s[2], i[5] = "") : a === 0 && !i[5] && e.columnNumber !== void 0 && (t[0].column = e.columnNumber + 1), o = {
        url: i[3],
        func: i[1] || lt,
        args: i[2] ? i[2].split(",") : [],
        line: i[4] ? +i[4] : null,
        column: i[5] ? +i[5] : null
      };
    else if (i = Of.exec(n[a]))
      o = {
        url: i[2],
        func: i[1] || lt,
        args: [],
        line: i[3] ? +i[3] : null,
        column: i[4] ? +i[4] : null
      };
    else
      continue;
    !o.func && o.line && (o.func = lt), t.push(o);
  }
  return t.length ? {
    message: rr(e),
    name: e.name,
    stack: t
  } : null;
}
function Mf(e) {
  if (!e || !e.stacktrace)
    return null;
  const t = e.stacktrace, n = / line (\d+).*script (?:in )?(\S+)(?:: in function (\S+))?$/i, r = / line (\d+), column (\d+)\s*(?:in (?:<anonymous function: ([^>]+)>|([^\)]+))\((.*)\))? in (.*):\s*$/i, s = t.split(`
`), i = [];
  let o;
  for (let a = 0; a < s.length; a += 2) {
    let c = null;
    (o = n.exec(s[a])) ? c = {
      url: o[2],
      func: o[3],
      args: [],
      line: +o[1],
      column: null
    } : (o = r.exec(s[a])) && (c = {
      url: o[6],
      func: o[3] || o[4],
      args: o[5] ? o[5].split(",") : [],
      line: +o[1],
      column: +o[2]
    }), c && (!c.func && c.line && (c.func = lt), i.push(c));
  }
  return i.length ? {
    message: rr(e),
    name: e.name,
    stack: i
  } : null;
}
function gs(e, t) {
  try {
    return S(l({}, e), {
      stack: e.stack.slice(t)
    });
  } catch (n) {
    return e;
  }
}
function rr(e) {
  const t = e && e.message;
  return t ? t.error && typeof t.error.message == "string" ? t.error.message : t : "No error message";
}
const wf = 100;
function Di(e) {
  const t = sr(e.stack), n = {
    type: e.name,
    value: e.message
  };
  return t && t.length && (n.stacktrace = { frames: t }), n.type === void 0 && n.value === "" && (n.value = "Unrecoverable error caught"), n;
}
function Cf(e, t, n) {
  const r = {
    exception: {
      values: [
        {
          type: Nn(e) ? e.constructor.name : n ? "UnhandledRejection" : "Error",
          value: `Non-Error ${n ? "promise rejection" : "exception"} captured with keys: ${lo(e)}`
        }
      ]
    },
    extra: {
      __serialized__: qs(e)
    }
  };
  if (t) {
    const s = Ut(t), i = sr(s.stack);
    r.stacktrace = {
      frames: i
    };
  }
  return r;
}
function ys(e) {
  return {
    exception: {
      values: [Di(e)]
    }
  };
}
function sr(e) {
  if (!e || !e.length)
    return [];
  let t = e;
  const n = t[0].func || "", r = t[t.length - 1].func || "";
  return (n.indexOf("captureMessage") !== -1 || n.indexOf("captureException") !== -1) && (t = t.slice(1)), r.indexOf("sentryWrapped") !== -1 && (t = t.slice(0, -1)), t.map(
    (s) => ({
      colno: s.column === null ? void 0 : s.column,
      filename: s.url || t[0].url,
      function: s.func || "?",
      in_app: !0,
      lineno: s.line === null ? void 0 : s.line
    })
  ).slice(0, wf).reverse();
}
function xf(e, t, n = {}) {
  let r;
  if (eo(e) && e.error)
    return e = e.error, r = ys(Ut(e)), r;
  if (mr(e) || no(e)) {
    const s = e, i = s.name || (mr(s) ? "DOMError" : "DOMException"), o = s.message ? `${i}: ${s.message}` : i;
    return r = _n(o, t, n), nn(r, o), r;
  }
  return rt(e) ? (r = ys(Ut(e)), r) : ot(e) || Nn(e) ? (r = Cf(e, t, n.rejection), pt(r, {
    synthetic: !0
  }), r) : (r = _n(e, t, n), nn(r, `${e}`), pt(r, {
    synthetic: !0
  }), r);
}
function _n(e, t, n = {}) {
  const r = {
    message: e
  };
  if (n.attachStacktrace && t) {
    const s = Ut(t), i = sr(s.stack);
    r.stacktrace = {
      frames: i
    };
  }
  return r;
}
const Pf = () => {
  let e = {
    // tslint:disable-next-line: no-empty
    request: () => {
    },
    // tslint:disable-next-line: no-empty
    httpRequest: () => {
    },
    // tslint:disable-next-line: no-empty
    getSystemInfoSync: () => {
    },
    getPerformance: () => ({}),
    onAppHide: function(t) {
    },
    canIUse: function(t) {
      return !1;
    }
  };
  if (typeof wx == "object")
    e = wx;
  else if (typeof my == "object")
    e = my;
  else if (typeof tt == "object")
    e = tt;
  else if (typeof dd == "object")
    e = dd;
  else if (typeof qq == "object")
    e = qq;
  else if (typeof swan == "object")
    e = swan;
  else
    throw new Error("sentry-miniapp 暂不支持此平台");
  return e;
}, Df = () => {
  let e = "unknown";
  return typeof wx == "object" ? e = "wechat" : typeof my == "object" ? e = "alipay" : typeof tt == "object" ? e = "bytedance" : typeof dd == "object" ? e = "dingtalk" : typeof qq == "object" ? e = "qq" : typeof swan == "object" && (e = "swan"), e;
}, k = Pf(), $i = Df(), $f = "application/json";
function ir(e) {
  function t(n) {
    return new yt((r, s) => {
      const i = k.request || k.httpRequest;
      if (typeof i != "function") {
        s(new Error("Miniapp request function is not available"));
        return;
      }
      i({
        url: e.url,
        method: "POST",
        data: n.body,
        header: { "content-type": $f },
        success(o) {
          var a, c, u, f;
          r({
            statusCode: o == null ? void 0 : o.statusCode,
            headers: {
              "x-sentry-rate-limits": (c = (a = o == null ? void 0 : o.headers) == null ? void 0 : a["X-Sentry-Rate-Limits"]) != null ? c : null,
              "retry-after": (f = (u = o == null ? void 0 : o.headers) == null ? void 0 : u["Retry-After"]) != null ? f : null
            }
          });
        },
        fail(o) {
          s(o);
        }
      });
    });
  }
  return ac(e, t);
}
const Rd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  makeMiniappTransport: ir
}, Symbol.toStringTag, { value: "Module" })), Lf = () => [];
class jf extends dc {
  /**
   * Creates a new Miniapp SDK instance.
   *
   * @param options Configuration options for this SDK.
   */
  constructor(t = {}) {
    const n = t.transport || ir, r = t.stackParser || Lf, s = t.integrations || t.defaultIntegrations || [], i = S(l({}, t), {
      transport: n,
      stackParser: r,
      integrations: s,
      dsn: t.dsn,
      // ensure defaults for required fields
      tracesSampleRate: t.tracesSampleRate
    });
    Ic(i, "miniapp", ["miniapp"]), super(i);
  }
  /**
   * @inheritDoc
   */
  _prepareEvent(t, n, r, s) {
    return t.platform = t.platform || "javascript", t.sdk = S(l({}, t.sdk), {
      name: Tf,
      packages: [
        ...t.sdk && t.sdk.packages || [],
        {
          name: "npm:@sentry/miniapp",
          version: _s
        }
      ],
      version: _s
    }), super._prepareEvent(t, n, r, s);
  }
  /**
   * Show a report dialog to the user to send feedback to a specific event.
   * 向用户显示报告对话框以将反馈发送到特定事件。---> 小程序上暂时用不到&不考虑。
   *
   * @param options Set individual options for the dialog
   */
  showReportDialog(t = {}) {
    console.log("sentry-miniapp 暂未实现该方法", t);
  }
  /**
   * @inheritDoc
   */
  // eslint-disable-next-line deprecation/deprecation
  eventFromException(t, n) {
    const r = n && n.syntheticException ? n.syntheticException : void 0, s = xf(t, r, {
      attachStacktrace: this._options.attachStacktrace
    });
    return n && n.event_id && (s.event_id = n.event_id), Promise.resolve(s);
  }
  /**
   * @inheritDoc
   */
  // eslint-disable-next-line deprecation/deprecation
  eventFromMessage(t, n = "info", r) {
    const s = r && r.syntheticException ? r.syntheticException : void 0, i = _n(String(t), s, {
      attachStacktrace: this._options.attachStacktrace
    });
    return i.level = n, r && r.event_id && (i.event_id = r.event_id), Promise.resolve(i);
  }
}
function Ff() {
  setTimeout(() => {
  });
}
function ft(e, t = {}, n) {
  if (typeof e != "function")
    return e;
  try {
    const s = e.__sentry_wrapped__;
    if (s)
      return s;
    if (Rs(e))
      return e;
  } catch (s) {
    return e;
  }
  const r = function(...s) {
    try {
      const i = s.map((o) => ft(o, t));
      return e.handleEvent ? e.handleEvent.apply(this, i) : e.apply(this, i);
    } catch (i) {
      throw Ff(), V((o) => {
        o.addEventProcessor((a) => {
          const c = l({}, a);
          return t.mechanism && (nn(c, void 0), pt(c, t.mechanism)), c.extra = S(l({}, c.extra), {
            arguments: P(s, 3)
          }), c;
        }), O(i);
      }), i;
    }
  };
  try {
    for (const s in e)
      Object.prototype.hasOwnProperty.call(e, s) && (r[s] = e[s]);
  } catch (s) {
  }
  As(r, e), B(e, "__sentry_wrapped__", r);
  try {
    const s = Object.getOwnPropertyDescriptor(r, "name");
    s != null && s.configurable && Object.defineProperty(r, "name", {
      get() {
        return e.name;
      }
    });
  } catch (s) {
  }
  return r;
}
const Ne = class Ne {
  /** JSDoc */
  constructor(t) {
    this.name = Ne.id, this._onErrorHandlerInstalled = !1, this._onUnhandledRejectionHandlerInstalled = !1, this._onPageNotFoundHandlerInstalled = !1, this._onMemoryWarningHandlerInstalled = !1, this._options = l({
      onerror: !0,
      onunhandledrejection: !0,
      onpagenotfound: !0,
      onmemorywarning: !0
    }, t);
  }
  /**
   * @inheritDoc
   */
  setupOnce() {
    Error.stackTraceLimit = 50, this._options.onerror && (h.log("Global Handler attached: onError"), this._installGlobalOnErrorHandler()), this._options.onunhandledrejection && (h.log("Global Handler attached: onunhandledrejection"), this._installGlobalOnUnhandledRejectionHandler()), this._options.onpagenotfound && (h.log("Global Handler attached: onPageNotFound"), this._installGlobalOnPageNotFoundHandler()), this._options.onmemorywarning && (h.log("Global Handler attached: onMemoryWarning"), this._installGlobalOnMemoryWarningHandler());
  }
  /** JSDoc */
  _installGlobalOnErrorHandler() {
    this._onErrorHandlerInstalled || (k.onError && k.onError((t) => {
      const n = typeof t == "string" ? new Error(t) : t;
      O(n);
    }), this._onErrorHandlerInstalled = !0);
  }
  /** JSDoc */
  _installGlobalOnUnhandledRejectionHandler() {
    this._onUnhandledRejectionHandlerInstalled || (k.onUnhandledRejection && k.onUnhandledRejection(
      ({ reason: t, promise: n }) => {
        const r = typeof t == "string" ? new Error(t) : t;
        O(r, {
          data: n
        });
      }
    ), this._onUnhandledRejectionHandlerInstalled = !0);
  }
  /** JSDoc */
  _installGlobalOnPageNotFoundHandler() {
    this._onPageNotFoundHandlerInstalled || (k.onPageNotFound && k.onPageNotFound((t) => {
      const n = t.path.split("?")[0];
      Fr("pagenotfound", n), jr("message", JSON.stringify(t)), Lr(`页面无法找到: ${n}`);
    }), this._onPageNotFoundHandlerInstalled = !0);
  }
  /** JSDoc */
  _installGlobalOnMemoryWarningHandler() {
    this._onMemoryWarningHandlerInstalled || (k.onMemoryWarning && k.onMemoryWarning(({ level: t = -1 }) => {
      let n = "没有获取到告警级别信息";
      switch (t) {
        case 5:
          n = "TRIM_MEMORY_RUNNING_MODERATE";
          break;
        case 10:
          n = "TRIM_MEMORY_RUNNING_LOW";
          break;
        case 15:
          n = "TRIM_MEMORY_RUNNING_CRITICAL";
          break;
        default:
          return;
      }
      Fr("memory-warning", String(t)), jr("message", n), Lr("内存不足告警");
    }), this._onMemoryWarningHandlerInstalled = !0);
  }
};
Ne.id = "GlobalHandlers";
let Ee = Ne;
const ke = class ke {
  constructor() {
    this._ignoreOnError = 0, this.name = ke.id;
  }
  /** JSDoc */
  _wrapTimeFunction(t) {
    return function(...n) {
      const r = n[0];
      return n[0] = ft(r, {
        mechanism: {
          data: { function: re(t) },
          handled: !0,
          type: "instrument"
        }
      }), t.apply(this, n);
    };
  }
  /** JSDoc */
  _wrapRAF(t) {
    return function(n) {
      return t(
        ft(n, {
          mechanism: {
            data: {
              function: "requestAnimationFrame",
              handler: re(t)
            },
            handled: !0,
            type: "instrument"
          }
        })
      );
    };
  }
  /** JSDoc */
  _wrapEventTarget(t) {
    const n = b, r = n[t] && n[t].prototype;
    !r || !r.hasOwnProperty || !r.hasOwnProperty("addEventListener") || (ct(r, "addEventListener", function(s) {
      return function(i, o, a) {
        try {
          typeof o.handleEvent == "function" && (o.handleEvent = ft(o.handleEvent.bind(o), {
            mechanism: {
              data: {
                function: "handleEvent",
                handler: re(o),
                target: t
              },
              handled: !0,
              type: "instrument"
            }
          }));
        } catch (c) {
        }
        return s.call(
          this,
          i,
          ft(o, {
            mechanism: {
              data: {
                function: "addEventListener",
                handler: re(o),
                target: t
              },
              handled: !0,
              type: "instrument"
            }
          }),
          a
        );
      };
    }), ct(r, "removeEventListener", function(s) {
      return function(i, o, a) {
        let c = o;
        try {
          c = c && (c.__sentry_wrapped__ || c);
        } catch (u) {
        }
        return s.call(this, i, c, a);
      };
    }));
  }
  /**
   * Wrap timer functions and event targets to catch errors
   * and provide better metadata.
   */
  setupOnce() {
    this._ignoreOnError = this._ignoreOnError;
    const t = b;
    ct(t, "setTimeout", this._wrapTimeFunction.bind(this)), ct(t, "setInterval", this._wrapTimeFunction.bind(this)), ct(t, "requestAnimationFrame", this._wrapRAF.bind(this)), [
      "EventTarget",
      "Window",
      "Node",
      "ApplicationCache",
      "AudioTrackList",
      "ChannelMergerNode",
      "CryptoOperation",
      "EventSource",
      "FileReader",
      "HTMLUnknownElement",
      "IDBDatabase",
      "IDBRequest",
      "IDBTransaction",
      "KeyOperation",
      "MediaController",
      "MessagePort",
      "ModalWindow",
      "Notification",
      "SVGElementInstance",
      "Screen",
      "TextTrack",
      "TextTrackCue",
      "TextTrackList",
      "WebSocket",
      "WebSocketWorker",
      "Worker",
      "XMLHttpRequest",
      "XMLHttpRequestEventTarget",
      "XMLHttpRequestUpload"
    ].forEach(this._wrapEventTarget.bind(this));
  }
};
ke.id = "TryCatch";
let be = ke;
function re(e) {
  try {
    return e && e.name || "<anonymous>";
  } catch (t) {
    return "<anonymous>";
  }
}
const Uf = "cause", Bf = 5, Ct = class Ct {
  /**
   * @inheritDoc
   */
  constructor(t = {}) {
    this.name = Ct.id, this._key = t.key || Uf, this._limit = t.limit || Bf;
  }
  /**
   * @inheritDoc
   */
  setupOnce() {
    $e((t, n) => {
      const r = I(), s = r && r.getIntegrationByName(Ct.id);
      return s ? s._handler(t, n) : t;
    });
  }
  /**
   * @inheritDoc
   */
  _handler(t, n) {
    if (!t.exception || !t.exception.values || !n || !(n.originalException instanceof Error))
      return t;
    const r = this._walkErrorTree(n.originalException, this._key);
    return t.exception.values = [...r, ...t.exception.values], t;
  }
  /**
   * @inheritDoc
   */
  _walkErrorTree(t, n, r = []) {
    if (!(t[n] instanceof Error) || r.length + 1 >= this._limit)
      return r;
    const s = Ut(t[n]), i = Di(s);
    return this._walkErrorTree(t[n], n, [i, ...r]);
  }
};
Ct.id = "LinkedErrors";
let Te = Ct;
const xt = class xt {
  constructor() {
    this.name = xt.id;
  }
  /**
   * @inheritDoc
   */
  setupOnce() {
    $e((t) => {
      const n = I();
      if (n && n.getIntegrationByName(xt.id))
        try {
          const s = k.getSystemInfoSync(), {
            SDKVersion: i = "0.0.0",
            batteryLevel: o,
            // 微信小程序
            currentBattery: a,
            // 支付宝小程序、 钉钉小程序
            battery: c,
            // 字节跳动小程序
            brand: u,
            language: f,
            model: p,
            pixelRatio: m,
            platform: d,
            screenHeight: _,
            screenWidth: g,
            // statusBarHeight,
            system: E,
            version: N,
            // windowHeight,
            // windowWidth,
            app: R,
            // 支付宝小程序
            appName: x
            // 字节跳动小程序
            // fontSizeSetting, // 支付宝小程序、 钉钉小程序、微信小程序
          } = s, [H, Q] = E.split(" "), We = S(l({}, t.tags), {
            SDKVersion: i
          }), Yt = R || x || $i || "app";
          return S(l({}, t), {
            tags: We,
            contexts: S(l({}, t.contexts), {
              device: {
                brand: u,
                battery_level: o || a || c,
                model: p,
                language: f,
                platform: d,
                screen_dpi: m,
                screen_height: _,
                screen_width: g
              },
              os: {
                name: H || E,
                version: Q || E
              },
              browser: {
                name: Yt,
                version: N
              }
            })
          });
        } catch (s) {
          console.warn(`sentry-miniapp get system info fail: ${s}`);
        }
      return t;
    });
  }
};
xt.id = "System";
let Ie = xt;
const Pt = class Pt {
  /**
   * @inheritDoc
   */
  constructor(t) {
    this.name = Pt.id, this._options = l({
      enable: !0
    }, t);
  }
  /**
   * @inheritDoc
   */
  setupOnce() {
    $e((t) => {
      const n = I();
      if (n && n.getIntegrationByName(Pt.id) && this._options.enable)
        try {
          const s = getCurrentPages().map(
            (i) => ({
              route: i.route,
              options: i.options
            })
          );
          return S(l({}, t), {
            extra: S(l({}, t.extra), {
              routers: s
            })
          });
        } catch (s) {
          console.warn(`sentry-miniapp get router info fail: ${s}`);
        }
      return t;
    });
  }
};
Pt.id = "Router";
let Ae = Pt;
const Dt = class Dt {
  constructor() {
    this.name = Dt.id;
  }
  /**
   * @inheritDoc
   */
  setupOnce() {
    $e((t) => {
      const n = I();
      return n && n.getIntegrationByName(Dt.id) && $i === "wechat" && k.getLaunchOptionsSync && k.getLaunchOptionsSync().scene === 1129 ? null : t;
    });
  }
};
Dt.id = "IgnoreMpcrawlerErrors";
let Re = Dt;
const Nd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GlobalHandlers: Ee,
  IgnoreMpcrawlerErrors: Re,
  LinkedErrors: Te,
  Router: Ae,
  System: Ie,
  TryCatch: be
}, Symbol.toStringTag, { value: "Module" })), Gf = 1e12;
class Hf {
  constructor(t = !1) {
    this._reportAllChanges = t, this._measurements = {};
  }
  addPerformanceEntries(t) {
    var r;
    const n = this._getPerformance();
    n && (this._timeOrigin = this._getTimeOrigin(n, t), this._observer = (r = n.createObserver) == null ? void 0 : r.call(n, (s) => {
      var o;
      (((o = s == null ? void 0 : s.getEntries) == null ? void 0 : o.call(s)) || []).forEach((a) => this._handleEntry(t, a));
    }), this._observer && this._observer.observe({
      entryTypes: ["navigation", "render", "script", "loadPackage", "resource"]
    }));
  }
  _getPerformance() {
    if (!k.getPerformance)
      return;
    const t = k.getPerformance();
    if (!(!t || typeof t.createObserver != "function"))
      return t;
  }
  _getTimeOrigin(t, n) {
    if (typeof t.timeOrigin == "number")
      return Mt(t.timeOrigin);
    const r = typeof t.now == "function" ? t.now() : void 0;
    return typeof r == "number" ? Mt(Date.now() - r) : n.startTimestamp;
  }
  _handleEntry(t, n) {
    if (t.endTimestamp !== void 0) {
      this._stopObserver();
      return;
    }
    const r = this._toTimestamp(n.startTime, t.startTimestamp), s = this._toTimestamp(n.startTime + n.duration, t.startTimestamp);
    Wf(t, {
      op: this._mapOp(n),
      description: this._getDescription(n),
      startTimestamp: r,
      endTimestamp: s,
      data: this._buildSpanData(n)
    }), this._recordMeasurements(n, t, r), t.setTag("sentry_reportAllChanges", this._reportAllChanges), Object.keys(this._measurements).length > 0 && t.setMeasurements(this._measurements);
  }
  _mapOp(t) {
    switch (t.entryType) {
      case "navigation":
        return "navigation";
      case "render":
        return "ui.render";
      case "script":
        return "script";
      case "loadPackage":
        return "resource.package";
      case "resource":
        return "resource";
      default:
        return t.entryType || "custom";
    }
  }
  _getDescription(t) {
    return t.path || t.moduleName || t.name;
  }
  _buildSpanData(t) {
    const n = { entryType: t.entryType };
    return t.moduleName && (n.moduleName = t.moduleName), t.path && (n.path = t.path), typeof t.duration == "number" && (n.duration = t.duration), n;
  }
  _recordMeasurements(t, n, r) {
    const s = (t.name || "").toLowerCase(), i = t.duration, o = Math.max((r - n.startTimestamp) * 1e3, 0);
    if (s === "first-paint" || s === "firstpaint" ? this._measurements.fp = { value: o, unit: "millisecond" } : s === "first-contentful-paint" || s === "firstcontentfulpaint" ? this._measurements.fcp = { value: o, unit: "millisecond" } : s === "largest-contentful-paint" || s === "largestcontentfulpaint" || s === "lcp" ? this._measurements.lcp = { value: o, unit: "millisecond" } : (s === "first-input-delay" || s === "firstinputdelay" || s === "fid") && typeof i == "number" ? this._measurements.fid = { value: i, unit: "millisecond" } : t.entryType === "navigation" && typeof i == "number" && !this._measurements.navigation && (this._measurements.navigation = { value: i, unit: "millisecond" }), this._reportAllChanges && typeof i == "number") {
      const a = this._measurementKey(t);
      a && !this._measurements[a] && (this._measurements[a] = { value: i, unit: "millisecond" });
    }
  }
  _measurementKey(t) {
    const n = t.name || t.entryType;
    if (n)
      return n.replace(/\s+/g, "_").toLowerCase();
  }
  _toTimestamp(t, n) {
    var s;
    return t > Gf ? Mt(t) : ((s = this._timeOrigin) != null ? s : n) + Mt(t);
  }
  _stopObserver(t) {
    var n;
    (n = this._observer) == null || n.disconnect(), this._observer = void 0, t && !t.endTimestamp && t.finish();
  }
}
function Wf(e, r) {
  var s = r, { startTimestamp: t } = s, n = Xt(s, ["startTimestamp"]);
  return t && e.startTimestamp > t && (e.startTimestamp = t), e.startChild(l({
    startTimestamp: t
  }, n));
}
function qf(e, t = !0, n = !0) {
  const r = b, s = k.onAppRoute || r.wx && r.wx.onAppRoute;
  if (typeof s != "function")
    return;
  let i = !1, o;
  const a = (u, f) => {
    (f && t || !f && n) && (o && typeof o.finish == "function" && o.finish(), o = e(u));
  }, c = (u, f = !1) => {
    const p = (u == null ? void 0 : u.path) || (u == null ? void 0 : u.route) || (u == null ? void 0 : u.url) || "", m = typeof p == "string" && p.length > 0 ? p : "unknown-route";
    a(
      {
        name: m,
        op: "navigation",
        description: (u == null ? void 0 : u.openType) || (u == null ? void 0 : u.event) || void 0,
        metadata: { requestPath: m }
      },
      f
    );
  };
  if (t && typeof r.getCurrentPages == "function") {
    const u = r.getCurrentPages() || [], f = u[u.length - 1];
    f && f.route && (i = !0, c({ path: f.route }, !0));
  }
  s((u) => {
    const f = !i;
    i = !0, c(u, f);
  });
}
const Jf = {
  traceRequest: !0
}, zf = 600, Yf = l({
  idleTimeout: 5e3,
  startTransactionOnLocationChange: !0,
  startTransactionOnPageLoad: !0,
  maxTransactionDuration: zf,
  routingInstrumentation: qf,
  // Default to 'link' mode for better trace continuity while maintaining separate traces
  traceContinuityMode: "link",
  consistentTraceSampling: !1
}, Jf), Oe = class Oe {
  constructor(t) {
    this.name = Oe.id, this._configuredIdleTimeout = t == null ? void 0 : t.idleTimeout, this.options = l(l({}, Yf), t);
    const { _metricOptions: n } = this.options;
    this._metrics = new Hf(n && n._reportAllChanges);
  }
  setupOnce() {
    var s;
    const {
      routingInstrumentation: t,
      startTransactionOnLocationChange: n,
      startTransactionOnPageLoad: r
      // traceRequest,
      // shouldCreateSpanForRequest,
    } = this.options;
    t(
      (i) => this._createRouteTransaction(i),
      r,
      n
    ), (s = k.onAppHide) == null || s.call(k, () => {
      const i = af();
      i == null || i.finish();
    });
  }
  /** Create routing idle transaction. */
  _createRouteTransaction(t) {
    var p;
    const {
      beforeNavigate: n,
      idleTimeout: r,
      maxTransactionDuration: s,
      traceContinuityMode: i,
      consistentTraceSampling: o
    } = this.options, a = S(l({}, t), {
      trimEnd: !0
    }), c = typeof n == "function" ? n(a) : a;
    if (c === void 0)
      return;
    const u = {
      traceContinuityMode: i != null ? i : "link",
      consistentTraceSampling: o != null ? o : !1
    };
    A && h.log(
      `[MiniAppTracing] Creating route transaction with traceContinuityMode=${u.traceContinuityMode}`
    );
    const f = bf(
      c,
      r,
      !0,
      {},
      u
    );
    return f.registerBeforeFinishCallback((m, d) => {
      Kf(cf(s), m, d);
    }), f.setTag("idleTimeout", (p = this._configuredIdleTimeout) != null ? p : r), f.setTag("traceContinuityMode", i != null ? i : "link"), this._metrics.addPerformanceEntries(f), f;
  }
};
Oe.id = "MiniAppTracing";
let gn = Oe;
function Kf(e, t, n) {
  const r = n - t.startTimestamp;
  n && (r > e || r < 0) && (t.setStatus("deadline_exceeded"), t.setTag("maxTransactionDurationExceeded", "true"));
}
const Vf = [
  Cc(),
  Oc(),
  new be(),
  new Ee(),
  new Te(),
  new Ie(),
  new Ae(),
  new Re(),
  new gn()
];
function kd(e = {}) {
  e.defaultIntegrations === void 0 && (e.defaultIntegrations = Vf), e.normalizeDepth = e.normalizeDepth || 5;
  const t = l({
    integrations: e.integrations || e.defaultIntegrations || [],
    stackParser: e.stackParser || (() => []),
    transport: e.transport || ir
  }, e);
  gc(jf, t);
}
function Od(e = {}) {
  e.eventId || (e.eventId = Vs());
  const t = I();
  t && t.showReportDialog(e);
}
function vd() {
  return Vs();
}
function Md(e) {
  const t = I();
  return t ? t.flush(e) : De(!1);
}
function wd(e) {
  const t = I();
  return t ? t.close(e) : De(!1);
}
function Cd(e) {
  return ft(e)();
}
export {
  Nd as Integrations,
  gn as MiniAppTracing,
  jf as MiniappClient,
  Tf as SDK_NAME,
  _s as SDK_VERSION,
  Rd as Transports,
  Rc as addBreadcrumb,
  $e as addEventProcessor,
  cd as captureConsoleIntegration,
  Pa as captureEvent,
  O as captureException,
  Lr as captureMessage,
  wd as close,
  Id as configureScope,
  gd as consoleLoggingIntegration,
  Sd as createConsolaReporter,
  Vf as defaultIntegrations,
  ud as extraErrorDataIntegration,
  hd as featureFlagsIntegration,
  Md as flush,
  Ce as getActiveSpan,
  v as getCurrentScope,
  F as getRootSpan,
  Wo as getSpanDescendants,
  No as getSpanStatusFromHttpCode,
  kd as init,
  bd as instrumentAnthropicAiClient,
  Td as instrumentGoogleGenAIClient,
  Ed as instrumentOpenAiClient,
  fu as instrumentSupabaseClient,
  vd as lastEventId,
  _d as logger,
  od as makeMultiplexedTransport,
  yd as metrics,
  ad as moduleMetadataIntegration,
  Zf as registerSpanErrorInstrumentation,
  ld as rewriteFramesIntegration,
  nd as setContext,
  jr as setExtra,
  rd as setExtras,
  br as setHttpStatus,
  Qf as setMeasurement,
  Fr as setTag,
  sd as setTags,
  id as setUser,
  Od as showReportDialog,
  td as startInactiveSpan,
  ed as startNewTrace,
  qt as startSpan,
  de as startSpanManual,
  Ad as startTransaction,
  fd as supabaseIntegration,
  md as thirdPartyErrorFilterIntegration,
  $n as withActiveSpan,
  V as withScope,
  Cd as wrap,
  pd as zodErrorsIntegration
};
