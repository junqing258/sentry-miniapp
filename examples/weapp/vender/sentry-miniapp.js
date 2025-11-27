var qo = Object.defineProperty, Wo = Object.defineProperties;
var Jo = Object.getOwnPropertyDescriptors;
var le = Object.getOwnPropertySymbols;
var yr = Object.prototype.hasOwnProperty, Sr = Object.prototype.propertyIsEnumerable;
var un = (t, e) => (e = Symbol[t]) ? e : Symbol.for("Symbol." + t);
var hr = (t, e, n) => e in t ? qo(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n, f = (t, e) => {
  for (var n in e || (e = {}))
    yr.call(e, n) && hr(t, n, e[n]);
  if (le)
    for (var n of le(e))
      Sr.call(e, n) && hr(t, n, e[n]);
  return t;
}, E = (t, e) => Wo(t, Jo(e));
var ln = (t, e) => {
  var n = {};
  for (var r in t)
    yr.call(t, r) && e.indexOf(r) < 0 && (n[r] = t[r]);
  if (t != null && le)
    for (var r of le(t))
      e.indexOf(r) < 0 && Sr.call(t, r) && (n[r] = t[r]);
  return n;
};
var D = (t, e, n) => new Promise((r, s) => {
  var o = (c) => {
    try {
      a(n.next(c));
    } catch (u) {
      s(u);
    }
  }, i = (c) => {
    try {
      a(n.throw(c));
    } catch (u) {
      s(u);
    }
  }, a = (c) => c.done ? r(c.value) : Promise.resolve(c.value).then(o, i);
  a((n = n.apply(t, e)).next());
}), nt = function(t, e) {
  this[0] = t, this[1] = e;
}, fe = (t, e, n) => {
  var r = (i, a, c, u) => {
    try {
      var d = n[i](a), p = (a = d.value) instanceof nt, m = d.done;
      Promise.resolve(p ? a[0] : a).then((l) => p ? r(i === "return" ? i : "next", a[1] ? { done: l.done, value: l.value } : l, c, u) : c({ value: l, done: m })).catch((l) => r("throw", l, c, u));
    } catch (l) {
      u(l);
    }
  }, s = (i) => o[i] = (a) => new Promise((c, u) => r(i, a, c, u)), o = {};
  return n = n.apply(t, e), o[un("asyncIterator")] = () => o, s("next"), s("throw"), s("return"), o;
};
var pe = (t, e, n) => (e = t[un("asyncIterator")]) ? e.call(t) : (t = t[un("iterator")](), e = {}, n = (r, s) => (s = t[r]) && (e[r] = (o) => new Promise((i, a, c) => (o = s.call(t, o), c = o.done, Promise.resolve(o.value).then((u) => i({ value: u, done: c }), a)))), n("next"), n("return"), e);
const Er = (
  // eslint-disable-next-line no-undef
  typeof globalThis != "undefined" && globalThis || // eslint-disable-next-line no-undef
  typeof self != "undefined" && self || // eslint-disable-next-line no-undef
  typeof window != "undefined" && window || // eslint-disable-next-line no-undef
  typeof global != "undefined" && global || {}
);
class zo {
  constructor(e) {
    if (this._entries = [], !!e) {
      if (typeof e == "string") {
        const n = e.startsWith("?") ? e.slice(1) : e;
        n.length > 0 && n.split("&").forEach((r) => {
          if (!r)
            return;
          const [s, o = ""] = r.split("=");
          this.append(decodeURIComponent(s), decodeURIComponent(o));
        });
        return;
      }
      if (Array.isArray(e)) {
        e.forEach(([n, r]) => this.append(n, r));
        return;
      }
      Object.keys(e).forEach((n) => {
        const r = e[n];
        r != null && this.append(n, String(r));
      });
    }
  }
  append(e, n) {
    this._entries.push([e, n]);
  }
  toString() {
    return this._entries.map(([e, n]) => `${encodeURIComponent(e)}=${encodeURIComponent(n)}`).join("&");
  }
}
Er.URLSearchParams || (Er.URLSearchParams = zo);
const S = typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__, b = globalThis, lt = "10.27.0";
function wt() {
  return qe(b), b;
}
function qe(t) {
  const e = t.__SENTRY__ = t.__SENTRY__ || {};
  return e.version = e.version || lt, e[lt] = e[lt] || {};
}
function Pt(t, e, n = b) {
  const r = n.__SENTRY__ = n.__SENTRY__ || {}, s = r[lt] = r[lt] || {};
  return s[t] || (s[t] = e());
}
const Pn = [
  "debug",
  "info",
  "warn",
  "error",
  "log",
  "assert",
  "trace"
], Yo = "Sentry Logger ", Ae = {};
function xt(t) {
  if (!("console" in b))
    return t();
  const e = b.console, n = {}, r = Object.keys(Ae);
  r.forEach((s) => {
    const o = Ae[s];
    n[s] = e[s], e[s] = o;
  });
  try {
    return t();
  } finally {
    r.forEach((s) => {
      e[s] = n[s];
    });
  }
}
function Vo() {
  Dn().enabled = !0;
}
function Ko() {
  Dn().enabled = !1;
}
function Rs() {
  return Dn().enabled;
}
function Xo(...t) {
  xn("log", ...t);
}
function Zo(...t) {
  xn("warn", ...t);
}
function Qo(...t) {
  xn("error", ...t);
}
function xn(t, ...e) {
  S && Rs() && xt(() => {
    b.console[t](`${Yo}[${t}]:`, ...e);
  });
}
function Dn() {
  return S ? Pt("loggerSettings", () => ({ enabled: !1 })) : { enabled: !1 };
}
const g = {
  /** Enable logging. */
  enable: Vo,
  /** Disable logging. */
  disable: Ko,
  /** Check if logging is enabled. */
  isEnabled: Rs,
  /** Log a message. */
  log: Xo,
  /** Log a warning. */
  warn: Zo,
  /** Log an error. */
  error: Qo
}, fn = "<anonymous>";
function Os(t) {
  try {
    return !t || typeof t != "function" ? fn : t.name || fn;
  } catch (e) {
    return fn;
  }
}
function ti(t) {
  const e = t.exception;
  if (e) {
    const n = [];
    try {
      return e.values.forEach((r) => {
        r.stacktrace.frames && n.push(...r.stacktrace.frames);
      }), n;
    } catch (r) {
      return;
    }
  }
}
function ks(t) {
  return "__v_isVNode" in t && t.__v_isVNode ? "[VueVNode]" : "[VueViewModel]";
}
const ye = {}, br = {};
function $n(t, e) {
  ye[t] = ye[t] || [], ye[t].push(e);
}
function Ln(t, e) {
  if (!br[t]) {
    br[t] = !0;
    try {
      e();
    } catch (n) {
      S && g.error(`Error while instrumenting ${t}`, n);
    }
  }
}
function Fn(t, e) {
  const n = t && ye[t];
  if (n)
    for (const r of n)
      try {
        r(e);
      } catch (s) {
        S && g.error(
          `Error while triggering instrumentation handler.
Type: ${t}
Name: ${Os(r)}
Error:`,
          s
        );
      }
}
let pn = null;
function ei(t) {
  const e = "error";
  $n(e, t), Ln(e, ni);
}
function ni() {
  pn = b.onerror, b.onerror = function(t, e, n, r, s) {
    return Fn("error", {
      column: r,
      error: s,
      line: n,
      msg: t,
      url: e
    }), pn ? pn.apply(this, arguments) : !1;
  }, b.onerror.__SENTRY_INSTRUMENTED__ = !0;
}
let dn = null;
function ri(t) {
  const e = "unhandledrejection";
  $n(e, t), Ln(e, si);
}
function si() {
  dn = b.onunhandledrejection, b.onunhandledrejection = function(t) {
    return Fn("unhandledrejection", t), dn ? dn.apply(this, arguments) : !0;
  }, b.onunhandledrejection.__SENTRY_INSTRUMENTED__ = !0;
}
const Ms = Object.prototype.toString;
function ft(t) {
  switch (Ms.call(t)) {
    case "[object Error]":
    case "[object Exception]":
    case "[object DOMException]":
    case "[object WebAssembly.Exception]":
      return !0;
    default:
      return ze(t, Error);
  }
}
function Dt(t, e) {
  return Ms.call(t) === `[object ${e}]`;
}
function vs(t) {
  return Dt(t, "ErrorEvent");
}
function Tr(t) {
  return Dt(t, "DOMError");
}
function oi(t) {
  return Dt(t, "DOMException");
}
function Ne(t) {
  return Dt(t, "String");
}
function We(t) {
  return typeof t == "object" && t !== null && "__sentry_template_string__" in t && "__sentry_template_values__" in t;
}
function Un(t) {
  return t === null || We(t) || typeof t != "object" && typeof t != "function";
}
function gt(t) {
  return Dt(t, "Object");
}
function Je(t) {
  return typeof Event != "undefined" && ze(t, Event);
}
function ii(t) {
  return typeof Element != "undefined" && ze(t, Element);
}
function ai(t) {
  return Dt(t, "RegExp");
}
function $t(t) {
  return !!(t != null && t.then && typeof t.then == "function");
}
function ci(t) {
  return gt(t) && "nativeEvent" in t && "preventDefault" in t && "stopPropagation" in t;
}
function ze(t, e) {
  try {
    return t instanceof e;
  } catch (n) {
    return !1;
  }
}
function Cs(t) {
  return !!(typeof t == "object" && t !== null && (t.__isVue || t._isVue || t.__v_isVNode));
}
const ui = b, li = 80;
function fi(t, e = {}) {
  if (!t)
    return "<unknown>";
  try {
    let n = t;
    const r = 5, s = [];
    let o = 0, i = 0;
    const a = " > ", c = a.length;
    let u;
    const d = Array.isArray(e) ? e : e.keyAttrs, p = !Array.isArray(e) && e.maxStringLength || li;
    for (; n && o++ < r && (u = pi(n, d), !(u === "html" || o > 1 && i + s.length * c + u.length >= p)); )
      s.push(u), i += u.length, n = n.parentNode;
    return s.reverse().join(a);
  } catch (n) {
    return "<unknown>";
  }
}
function pi(t, e) {
  const n = t, r = [];
  if (!(n != null && n.tagName))
    return "";
  if (ui.HTMLElement && n instanceof HTMLElement && n.dataset) {
    if (n.dataset.sentryComponent)
      return n.dataset.sentryComponent;
    if (n.dataset.sentryElement)
      return n.dataset.sentryElement;
  }
  r.push(n.tagName.toLowerCase());
  const s = e != null && e.length ? e.filter((i) => n.getAttribute(i)).map((i) => [i, n.getAttribute(i)]) : null;
  if (s != null && s.length)
    s.forEach((i) => {
      r.push(`[${i[0]}="${i[1]}"]`);
    });
  else {
    n.id && r.push(`#${n.id}`);
    const i = n.className;
    if (i && Ne(i)) {
      const a = i.split(/\s+/);
      for (const c of a)
        r.push(`.${c}`);
    }
  }
  const o = ["aria-label", "type", "name", "title", "alt"];
  for (const i of o) {
    const a = n.getAttribute(i);
    a && r.push(`[${i}="${a}"]`);
  }
  return r.join("");
}
function At(t, e, n) {
  if (!(e in t))
    return;
  const r = t[e];
  if (typeof r != "function")
    return;
  const s = n(r);
  typeof s == "function" && ws(s, r);
  try {
    t[e] = s;
  } catch (o) {
    S && g.log(`Failed to replace method "${e}" in object`, t);
  }
}
function G(t, e, n) {
  try {
    Object.defineProperty(t, e, {
      // enumerable: false, // the default, so we can save on bundle size by not explicitly setting it
      value: n,
      writable: !0,
      configurable: !0
    });
  } catch (r) {
    S && g.log(`Failed to add non-enumerable property "${e}" to object`, t);
  }
}
function ws(t, e) {
  try {
    const n = e.prototype || {};
    t.prototype = e.prototype = n, G(t, "__sentry_original__", e);
  } catch (n) {
  }
}
function Ps(t) {
  return t.__sentry_original__;
}
function xs(t) {
  if (ft(t))
    return f({
      message: t.message,
      name: t.name,
      stack: t.stack
    }, Ar(t));
  if (Je(t)) {
    const e = f({
      type: t.type,
      target: Ir(t.target),
      currentTarget: Ir(t.currentTarget)
    }, Ar(t));
    return typeof CustomEvent != "undefined" && ze(t, CustomEvent) && (e.detail = t.detail), e;
  } else
    return t;
}
function Ir(t) {
  try {
    return ii(t) ? fi(t) : Object.prototype.toString.call(t);
  } catch (e) {
    return "<unknown>";
  }
}
function Ar(t) {
  if (typeof t == "object" && t !== null) {
    const e = {};
    for (const n in t)
      Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    return e;
  } else
    return {};
}
function di(t) {
  const e = Object.keys(xs(t));
  return e.sort(), e[0] ? e.join(", ") : "[object has no keys]";
}
function Xt(t, e = 0) {
  return typeof t != "string" || e === 0 || t.length <= e ? t : `${t.slice(0, e)}...`;
}
function Nr(t, e) {
  if (!Array.isArray(t))
    return "";
  const n = [];
  for (let r = 0; r < t.length; r++) {
    const s = t[r];
    try {
      Cs(s) ? n.push(ks(s)) : n.push(String(s));
    } catch (o) {
      n.push("[value cannot be serialized]");
    }
  }
  return n.join(e);
}
function Se(t, e, n = !1) {
  return Ne(t) ? ai(e) ? e.test(t) : Ne(e) ? n ? t === e : t.includes(e) : !1 : !1;
}
function Ye(t, e = [], n = !1) {
  return e.some((r) => Se(t, r, n));
}
function mi() {
  const t = b;
  return t.crypto || t.msCrypto;
}
let mn;
function _i() {
  return Math.random() * 16;
}
function q(t = mi()) {
  try {
    if (t != null && t.randomUUID)
      return t.randomUUID().replace(/-/g, "");
  } catch (e) {
  }
  return mn || (mn = "10000000100040008000" + 1e11), mn.replace(
    /[018]/g,
    (e) => (
      // eslint-disable-next-line no-bitwise
      (e ^ (_i() & 15) >> e / 4).toString(16)
    )
  );
}
function Ds(t) {
  var e, n;
  return (n = (e = t.exception) == null ? void 0 : e.values) == null ? void 0 : n[0];
}
function Nt(t) {
  const { message: e, event_id: n } = t;
  if (e)
    return e;
  const r = Ds(t);
  return r ? r.type && r.value ? `${r.type}: ${r.value}` : r.type || r.value || n || "<unknown>" : n || "<unknown>";
}
function En(t, e, n) {
  const r = t.exception = t.exception || {}, s = r.values = r.values || [], o = s[0] = s[0] || {};
  o.value || (o.value = e || ""), o.type || (o.type = "Error");
}
function st(t, e) {
  const n = Ds(t);
  if (!n)
    return;
  const r = { type: "generic", handled: !0 }, s = n.mechanism;
  if (n.mechanism = f(f(f({}, r), s), e), e && "data" in e) {
    const o = f(f({}, s == null ? void 0 : s.data), e.data);
    n.mechanism.data = o;
  }
}
function Rr(t) {
  if (gi(t))
    return !0;
  try {
    G(t, "__sentry_captured__", !0);
  } catch (e) {
  }
  return !1;
}
function gi(t) {
  try {
    return t.__sentry_captured__;
  } catch (e) {
  }
}
const $s = 1e3;
function te() {
  return Date.now() / $s;
}
function hi() {
  const { performance: t } = b;
  if (!(t != null && t.now) || !t.timeOrigin)
    return te;
  const e = t.timeOrigin;
  return () => (e + t.now()) / $s;
}
let de;
function Z() {
  return (de != null ? de : de = hi())();
}
function bn(t, e = {}) {
  if (e.user && (!t.ipAddress && e.user.ip_address && (t.ipAddress = e.user.ip_address), !t.did && !e.did && (t.did = e.user.id || e.user.email || e.user.username)), t.timestamp = e.timestamp || Z(), e.abnormal_mechanism && (t.abnormal_mechanism = e.abnormal_mechanism), e.ignoreDuration && (t.ignoreDuration = e.ignoreDuration), e.sid && (t.sid = e.sid.length === 32 ? e.sid : q()), e.init !== void 0 && (t.init = e.init), !t.did && e.did && (t.did = `${e.did}`), typeof e.started == "number" && (t.started = e.started), t.ignoreDuration)
    t.duration = void 0;
  else if (typeof e.duration == "number")
    t.duration = e.duration;
  else {
    const n = t.timestamp - t.started;
    t.duration = n >= 0 ? n : 0;
  }
  e.release && (t.release = e.release), e.environment && (t.environment = e.environment), !t.ipAddress && e.ipAddress && (t.ipAddress = e.ipAddress), !t.userAgent && e.userAgent && (t.userAgent = e.userAgent), typeof e.errors == "number" && (t.errors = e.errors), e.status && (t.status = e.status);
}
function ee(t, e, n = 2) {
  if (!e || typeof e != "object" || n <= 0)
    return e;
  if (t && Object.keys(e).length === 0)
    return t;
  const r = f({}, t);
  for (const s in e)
    Object.prototype.hasOwnProperty.call(e, s) && (r[s] = ee(r[s], e[s], n - 1));
  return r;
}
function ot() {
  return q();
}
function Lt() {
  return q().substring(16);
}
const Tn = "_sentrySpan";
function ht(t, e) {
  e ? G(t, Tn, e) : delete t[Tn];
}
function kt(t) {
  return t[Tn];
}
const yi = 100;
class J {
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
      traceId: ot(),
      sampleRand: Math.random()
    };
  }
  /**
   * Clone all data from this scope into a new scope.
   */
  clone() {
    const e = new J();
    return e._breadcrumbs = [...this._breadcrumbs], e._tags = f({}, this._tags), e._attributes = f({}, this._attributes), e._extra = f({}, this._extra), e._contexts = f({}, this._contexts), this._contexts.flags && (e._contexts.flags = {
      values: [...this._contexts.flags.values]
    }), e._user = this._user, e._level = this._level, e._session = this._session, e._transactionName = this._transactionName, e._fingerprint = this._fingerprint, e._eventProcessors = [...this._eventProcessors], e._attachments = [...this._attachments], e._sdkProcessingMetadata = f({}, this._sdkProcessingMetadata), e._propagationContext = f({}, this._propagationContext), e._client = this._client, e._lastEventId = this._lastEventId, ht(e, kt(this)), e;
  }
  /**
   * Update the client assigned to this scope.
   * Note that not every scope will have a client assigned - isolation scopes & the global scope will generally not have a client,
   * as well as manually created scopes.
   */
  setClient(e) {
    this._client = e;
  }
  /**
   * Set the ID of the last captured error event.
   * This is generally only captured on the isolation scope.
   */
  setLastEventId(e) {
    this._lastEventId = e;
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
  addScopeListener(e) {
    this._scopeListeners.push(e);
  }
  /**
   * Add an event processor that will be called before an event is sent.
   */
  addEventProcessor(e) {
    return this._eventProcessors.push(e), this;
  }
  /**
   * Set the user for this scope.
   * Set to `null` to unset the user.
   */
  setUser(e) {
    return this._user = e || {
      email: void 0,
      id: void 0,
      ip_address: void 0,
      username: void 0
    }, this._session && bn(this._session, { user: e }), this._notifyScopeListeners(), this;
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
  setTags(e) {
    return this._tags = f(f({}, this._tags), e), this._notifyScopeListeners(), this;
  }
  /**
   * Set a single tag that will be sent as tags data with the event.
   */
  setTag(e, n) {
    return this.setTags({ [e]: n });
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
  setAttributes(e) {
    return this._attributes = f(f({}, this._attributes), e), this._notifyScopeListeners(), this;
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
  setAttribute(e, n) {
    return this.setAttributes({ [e]: n });
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
  removeAttribute(e) {
    return e in this._attributes && (delete this._attributes[e], this._notifyScopeListeners()), this;
  }
  /**
   * Set an object that will be merged into existing extra on the scope,
   * and will be sent as extra data with the event.
   */
  setExtras(e) {
    return this._extra = f(f({}, this._extra), e), this._notifyScopeListeners(), this;
  }
  /**
   * Set a single key:value extra entry that will be sent as extra data with the event.
   */
  setExtra(e, n) {
    return this._extra = E(f({}, this._extra), { [e]: n }), this._notifyScopeListeners(), this;
  }
  /**
   * Sets the fingerprint on the scope to send with the events.
   * @param {string[]} fingerprint Fingerprint to group events in Sentry.
   */
  setFingerprint(e) {
    return this._fingerprint = e, this._notifyScopeListeners(), this;
  }
  /**
   * Sets the level on the scope for future events.
   */
  setLevel(e) {
    return this._level = e, this._notifyScopeListeners(), this;
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
  setTransactionName(e) {
    return this._transactionName = e, this._notifyScopeListeners(), this;
  }
  /**
   * Sets context data with the given name.
   * Data passed as context will be normalized. You can also pass `null` to unset the context.
   * Note that context data will not be merged - calling `setContext` will overwrite an existing context with the same key.
   */
  setContext(e, n) {
    return n === null ? delete this._contexts[e] : this._contexts[e] = n, this._notifyScopeListeners(), this;
  }
  /**
   * Set the session for the scope.
   */
  setSession(e) {
    return e ? this._session = e : delete this._session, this._notifyScopeListeners(), this;
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
  update(e) {
    if (!e)
      return this;
    const n = typeof e == "function" ? e(this) : e, r = n instanceof J ? n.getScopeData() : gt(n) ? e : void 0, {
      tags: s,
      attributes: o,
      extra: i,
      user: a,
      contexts: c,
      level: u,
      fingerprint: d = [],
      propagationContext: p
    } = r || {};
    return this._tags = f(f({}, this._tags), s), this._attributes = f(f({}, this._attributes), o), this._extra = f(f({}, this._extra), i), this._contexts = f(f({}, this._contexts), c), a && Object.keys(a).length && (this._user = a), u && (this._level = u), d.length && (this._fingerprint = d), p && (this._propagationContext = p), this;
  }
  /**
   * Clears the current scope and resets its properties.
   * Note: The client will not be cleared.
   */
  clear() {
    return this._breadcrumbs = [], this._tags = {}, this._attributes = {}, this._extra = {}, this._user = {}, this._contexts = {}, this._level = void 0, this._transactionName = void 0, this._fingerprint = void 0, this._session = void 0, ht(this, void 0), this._attachments = [], this.setPropagationContext({ traceId: ot(), sampleRand: Math.random() }), this._notifyScopeListeners(), this;
  }
  /**
   * Adds a breadcrumb to the scope.
   * By default, the last 100 breadcrumbs are kept.
   */
  addBreadcrumb(e, n) {
    var o;
    const r = typeof n == "number" ? n : yi;
    if (r <= 0)
      return this;
    const s = E(f({
      timestamp: te()
    }, e), {
      // Breadcrumb messages can theoretically be infinitely large and they're held in memory so we truncate them not to leak (too much) memory
      message: e.message ? Xt(e.message, 2048) : e.message
    });
    return this._breadcrumbs.push(s), this._breadcrumbs.length > r && (this._breadcrumbs = this._breadcrumbs.slice(-r), (o = this._client) == null || o.recordDroppedEvent("buffer_overflow", "log_item")), this._notifyScopeListeners(), this;
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
  addAttachment(e) {
    return this._attachments.push(e), this;
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
      span: kt(this)
    };
  }
  /**
   * Add data which will be accessible during event processing but won't get sent to Sentry.
   */
  setSDKProcessingMetadata(e) {
    return this._sdkProcessingMetadata = ee(this._sdkProcessingMetadata, e, 2), this;
  }
  /**
   * Add propagation context to the scope, used for distributed tracing
   */
  setPropagationContext(e) {
    return this._propagationContext = e, this;
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
  captureException(e, n) {
    const r = (n == null ? void 0 : n.event_id) || q();
    if (!this._client)
      return S && g.warn("No client configured on scope - will not capture exception!"), r;
    const s = new Error("Sentry syntheticException");
    return this._client.captureException(
      e,
      E(f({
        originalException: e,
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
  captureMessage(e, n, r) {
    var i;
    const s = (r == null ? void 0 : r.event_id) || q();
    if (!this._client)
      return S && g.warn("No client configured on scope - will not capture message!"), s;
    const o = (i = r == null ? void 0 : r.syntheticException) != null ? i : new Error(e);
    return this._client.captureMessage(
      e,
      n,
      E(f({
        originalException: e,
        syntheticException: o
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
  captureEvent(e, n) {
    const r = (n == null ? void 0 : n.event_id) || q();
    return this._client ? (this._client.captureEvent(e, E(f({}, n), { event_id: r }), this), r) : (S && g.warn("No client configured on scope - will not capture event!"), r);
  }
  /**
   * This will be called on every set call.
   */
  _notifyScopeListeners() {
    this._notifyingListeners || (this._notifyingListeners = !0, this._scopeListeners.forEach((e) => {
      e(this);
    }), this._notifyingListeners = !1);
  }
}
function Si() {
  return Pt("defaultCurrentScope", () => new J());
}
function Ei() {
  return Pt("defaultIsolationScope", () => new J());
}
class bi {
  constructor(e, n) {
    let r;
    e ? r = e : r = new J();
    let s;
    n ? s = n : s = new J(), this._stack = [{ scope: r }], this._isolationScope = s;
  }
  /**
   * Fork a scope for the stack.
   */
  withScope(e) {
    const n = this._pushScope();
    let r;
    try {
      r = e(n);
    } catch (s) {
      throw this._popScope(), s;
    }
    return $t(r) ? r.then(
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
    const e = this.getScope().clone();
    return this._stack.push({
      client: this.getClient(),
      scope: e
    }), e;
  }
  /**
   * Pop a scope from the stack.
   */
  _popScope() {
    return this._stack.length <= 1 ? !1 : !!this._stack.pop();
  }
}
function Mt() {
  const t = wt(), e = qe(t);
  return e.stack = e.stack || new bi(Si(), Ei());
}
function Ti(t) {
  return Mt().withScope(t);
}
function Ii(t, e) {
  const n = Mt();
  return n.withScope(() => (n.getStackTop().scope = t, e(t)));
}
function Or(t) {
  return Mt().withScope(() => t(Mt().getIsolationScope()));
}
function Ai() {
  return {
    withIsolationScope: Or,
    withScope: Ti,
    withSetScope: Ii,
    withSetIsolationScope: (t, e) => Or(e),
    getCurrentScope: () => Mt().getScope(),
    getIsolationScope: () => Mt().getIsolationScope()
  };
}
function ne(t) {
  const e = qe(t);
  return e.acs ? e.acs : Ai();
}
function k() {
  const t = wt();
  return ne(t).getCurrentScope();
}
function $() {
  const t = wt();
  return ne(t).getIsolationScope();
}
function jn() {
  return Pt("globalScope", () => new J());
}
function at(...t) {
  const e = wt(), n = ne(e);
  if (t.length === 2) {
    const [r, s] = t;
    return r ? n.withSetScope(r, s) : n.withScope(s);
  }
  return n.withScope(t[0]);
}
function O() {
  return k().getClient();
}
function Ls(t) {
  const e = t.getPropagationContext(), { traceId: n, parentSpanId: r, propagationSpanId: s } = e, o = {
    trace_id: n,
    span_id: s || Lt()
  };
  return r && (o.parent_span_id = r), o;
}
const Q = "sentry.source", Fs = "sentry.sample_rate", Ni = "sentry.previous_trace_sample_rate", Zt = "sentry.op", z = "sentry.origin", Re = "sentry.idle_span_finish_reason", Us = "sentry.measurement_unit", js = "sentry.measurement_value", kr = "sentry.custom_span_name", Bn = "sentry.profile_id", Gn = "sentry.exclusive_time", Ri = 0, Ve = 1, N = 2;
function Oi(t) {
  if (t < 400 && t >= 100)
    return { code: Ve };
  if (t >= 400 && t < 500)
    switch (t) {
      case 401:
        return { code: N, message: "unauthenticated" };
      case 403:
        return { code: N, message: "permission_denied" };
      case 404:
        return { code: N, message: "not_found" };
      case 409:
        return { code: N, message: "already_exists" };
      case 413:
        return { code: N, message: "failed_precondition" };
      case 429:
        return { code: N, message: "resource_exhausted" };
      case 499:
        return { code: N, message: "cancelled" };
      default:
        return { code: N, message: "invalid_argument" };
    }
  if (t >= 500 && t < 600)
    switch (t) {
      case 501:
        return { code: N, message: "unimplemented" };
      case 503:
        return { code: N, message: "unavailable" };
      case 504:
        return { code: N, message: "deadline_exceeded" };
      default:
        return { code: N, message: "internal_error" };
    }
  return { code: N, message: "internal_error" };
}
function Mr(t, e) {
  t.setAttribute("http.response.status_code", e);
  const n = Oi(e);
  n.message !== "unknown_error" && t.setStatus(n);
}
const Bs = "_sentryScope", Gs = "_sentryIsolationScope";
function ki(t) {
  try {
    const e = b.WeakRef;
    if (typeof e == "function")
      return new e(t);
  } catch (e) {
  }
  return t;
}
function Mi(t) {
  if (t) {
    if (typeof t == "object" && "deref" in t && typeof t.deref == "function")
      try {
        return t.deref();
      } catch (e) {
        return;
      }
    return t;
  }
}
function vi(t, e, n) {
  t && (G(t, Gs, ki(n)), G(t, Bs, e));
}
function Oe(t) {
  const e = t;
  return {
    scope: e[Bs],
    isolationScope: Mi(e[Gs])
  };
}
const Ci = "sentry-", wi = /^sentry-/;
function Pi(t) {
  const e = xi(t);
  if (!e)
    return;
  const n = Object.entries(e).reduce((r, [s, o]) => {
    if (s.match(wi)) {
      const i = s.slice(Ci.length);
      r[i] = o;
    }
    return r;
  }, {});
  if (Object.keys(n).length > 0)
    return n;
}
function xi(t) {
  if (!(!t || !Ne(t) && !Array.isArray(t)))
    return Array.isArray(t) ? t.reduce((e, n) => {
      const r = vr(n);
      return Object.entries(r).forEach(([s, o]) => {
        e[s] = o;
      }), e;
    }, {}) : vr(t);
}
function vr(t) {
  return t.split(",").map((e) => {
    const n = e.indexOf("=");
    if (n === -1)
      return [];
    const r = e.slice(0, n), s = e.slice(n + 1);
    return [r, s].map((o) => {
      try {
        return decodeURIComponent(o.trim());
      } catch (i) {
        return;
      }
    });
  }).reduce((e, [n, r]) => (n && r && (e[n] = r), e), {});
}
const Di = /^o(\d+)\./, $i = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)([\w.-]+)(?::(\d+))?\/(.+)/;
function Li(t) {
  return t === "http" || t === "https";
}
function Ft(t, e = !1) {
  const { host: n, path: r, pass: s, port: o, projectId: i, protocol: a, publicKey: c } = t;
  return `${a}://${c}${e && s ? `:${s}` : ""}@${n}${o ? `:${o}` : ""}/${r && `${r}/`}${i}`;
}
function Hs(t) {
  const e = $i.exec(t);
  if (!e) {
    xt(() => {
      console.error(`Invalid Sentry Dsn: ${t}`);
    });
    return;
  }
  const [n, r, s = "", o = "", i = "", a = ""] = e.slice(1);
  let c = "", u = a;
  const d = u.split("/");
  if (d.length > 1 && (c = d.slice(0, -1).join("/"), u = d.pop()), u) {
    const p = u.match(/^\d+/);
    p && (u = p[0]);
  }
  return qs({ host: o, pass: s, path: c, projectId: u, port: i, protocol: n, publicKey: r });
}
function qs(t) {
  return {
    protocol: t.protocol,
    publicKey: t.publicKey || "",
    pass: t.pass || "",
    host: t.host,
    port: t.port || "",
    path: t.path || "",
    projectId: t.projectId
  };
}
function Fi(t) {
  if (!S)
    return !0;
  const { port: e, projectId: n, protocol: r } = t;
  return ["protocol", "publicKey", "host", "projectId"].find((i) => t[i] ? !1 : (g.error(`Invalid Sentry Dsn: ${i} missing`), !0)) ? !1 : n.match(/^\d+$/) ? Li(r) ? e && isNaN(parseInt(e, 10)) ? (g.error(`Invalid Sentry Dsn: Invalid port ${e}`), !1) : !0 : (g.error(`Invalid Sentry Dsn: Invalid protocol ${r}`), !1) : (g.error(`Invalid Sentry Dsn: Invalid projectId ${n}`), !1);
}
function Ui(t) {
  const e = t.match(Di);
  return e == null ? void 0 : e[1];
}
function ji(t) {
  const e = t.getOptions(), { host: n } = t.getDsn() || {};
  let r;
  return e.orgId ? r = String(e.orgId) : n && (r = Ui(n)), r;
}
function Bi(t) {
  const e = typeof t == "string" ? Hs(t) : qs(t);
  if (!(!e || !Fi(e)))
    return e;
}
function Hn(t) {
  if (typeof t == "boolean")
    return Number(t);
  const e = typeof t == "string" ? parseFloat(t) : t;
  if (!(typeof e != "number" || isNaN(e) || e < 0 || e > 1))
    return e;
}
const Ws = 0, qn = 1;
let Cr = !1;
function Gi(t) {
  const { spanId: e, traceId: n } = t.spanContext(), { data: r, op: s, parent_span_id: o, status: i, origin: a, links: c } = A(t);
  return {
    parent_span_id: o,
    span_id: e,
    trace_id: n,
    data: r,
    op: s,
    status: i,
    origin: a,
    links: c
  };
}
function Js(t) {
  const { spanId: e, traceId: n, isRemote: r } = t.spanContext(), s = r ? e : A(t).parent_span_id, o = Oe(t).scope, i = r ? (o == null ? void 0 : o.getPropagationContext().propagationSpanId) || Lt() : e;
  return {
    parent_span_id: s,
    span_id: i,
    trace_id: n
  };
}
function zs(t) {
  if (t && t.length > 0)
    return t.map((i) => {
      var a = i, { context: c } = a, u = c, { spanId: e, traceId: n, traceFlags: r } = u, s = ln(u, ["spanId", "traceId", "traceFlags"]), { attributes: o } = a;
      return f({
        span_id: e,
        trace_id: n,
        sampled: r === qn,
        attributes: o
      }, s);
    });
}
function pt(t) {
  return typeof t == "number" ? wr(t) : Array.isArray(t) ? t[0] + t[1] / 1e9 : t instanceof Date ? wr(t.getTime()) : Z();
}
function wr(t) {
  return t > 9999999999 ? t / 1e3 : t;
}
function A(t) {
  var r;
  if (qi(t))
    return t.getSpanJSON();
  const { spanId: e, traceId: n } = t.spanContext();
  if (Hi(t)) {
    const { attributes: s, startTime: o, name: i, endTime: a, status: c, links: u } = t, d = "parentSpanId" in t ? t.parentSpanId : "parentSpanContext" in t ? (r = t.parentSpanContext) == null ? void 0 : r.spanId : void 0;
    return {
      span_id: e,
      trace_id: n,
      data: s,
      description: i,
      parent_span_id: d,
      start_timestamp: pt(o),
      // This is [0,0] by default in OTEL, in which case we want to interpret this as no end time
      timestamp: pt(a) || void 0,
      status: Ys(c),
      op: s[Zt],
      origin: s[z],
      links: zs(u)
    };
  }
  return {
    span_id: e,
    trace_id: n,
    start_timestamp: 0,
    data: {}
  };
}
function Hi(t) {
  const e = t;
  return !!e.attributes && !!e.startTime && !!e.name && !!e.endTime && !!e.status;
}
function qi(t) {
  return typeof t.getSpanJSON == "function";
}
function yt(t) {
  const { traceFlags: e } = t.spanContext();
  return e === qn;
}
function Ys(t) {
  if (!(!t || t.code === Ri))
    return t.code === Ve ? "ok" : t.message || "internal_error";
}
const dt = "_sentryChildSpans", In = "_sentryRootSpan";
function Vs(t, e) {
  const n = t[In] || t;
  G(e, In, n), t[dt] ? t[dt].add(e) : G(t, dt, /* @__PURE__ */ new Set([e]));
}
function Wi(t, e) {
  t[dt] && t[dt].delete(e);
}
function Ee(t) {
  const e = /* @__PURE__ */ new Set();
  function n(r) {
    if (!e.has(r) && yt(r)) {
      e.add(r);
      const s = r[dt] ? Array.from(r[dt]) : [];
      for (const o of s)
        n(o);
    }
  }
  return n(t), Array.from(e);
}
function j(t) {
  return t[In] || t;
}
function Ut() {
  const t = wt(), e = ne(t);
  return e.getActiveSpan ? e.getActiveSpan() : kt(k());
}
function An() {
  Cr || (xt(() => {
    console.warn(
      "[Sentry] Returning null from `beforeSendSpan` is disallowed. To drop certain spans, configure the respective integrations directly or use `ignoreSpans`."
    );
  }), Cr = !0);
}
let Pr = !1;
function up() {
  if (Pr)
    return;
  function t() {
    const e = Ut(), n = e && j(e);
    if (n) {
      const r = "internal_error";
      S && g.log(`[Tracing] Root span: ${r} -> Global error occurred`), n.setStatus({ code: N, message: r });
    }
  }
  t.tag = "sentry_tracingErrorCallback", Pr = !0, ei(t), ri(t);
}
function Ke(t) {
  var n;
  if (typeof __SENTRY_TRACING__ == "boolean" && !__SENTRY_TRACING__)
    return !1;
  const e = t || ((n = O()) == null ? void 0 : n.getOptions());
  return !!e && // Note: This check is `!= null`, meaning "nullish". `0` is not "nullish", `undefined` and `null` are. (This comment was brought to you by 15 minutes of questioning life)
  (e.tracesSampleRate != null || !!e.tracesSampler);
}
function xr(t) {
  g.log(`Ignoring span ${t.op} - ${t.description} because it matches \`ignoreSpans\`.`);
}
function ke(t, e) {
  if (!(e != null && e.length) || !t.description)
    return !1;
  for (const n of e) {
    if (zi(n)) {
      if (Se(t.description, n))
        return S && xr(t), !0;
      continue;
    }
    if (!n.name && !n.op)
      continue;
    const r = n.name ? Se(t.description, n.name) : !0, s = n.op ? t.op && Se(t.op, n.op) : !0;
    if (r && s)
      return S && xr(t), !0;
  }
  return !1;
}
function Ji(t, e) {
  const n = e.parent_span_id, r = e.span_id;
  if (n)
    for (const s of t)
      s.parent_span_id === r && (s.parent_span_id = n);
}
function zi(t) {
  return typeof t == "string" || t instanceof RegExp;
}
const Wn = "production", Ks = "_frozenDsc";
function be(t, e) {
  G(t, Ks, e);
}
function Xs(t, e) {
  const n = e.getOptions(), { publicKey: r } = e.getDsn() || {}, s = {
    environment: n.environment || Wn,
    release: n.release,
    public_key: r,
    trace_id: t,
    org_id: ji(e)
  };
  return e.emit("createDsc", s), s;
}
function Zs(t, e) {
  const n = e.getPropagationContext();
  return n.dsc || Xs(n.traceId, t);
}
function it(t) {
  var _, y, h, I;
  const e = O();
  if (!e)
    return {};
  const n = j(t), r = A(n), s = r.data, o = n.spanContext().traceState, i = (y = (_ = o == null ? void 0 : o.get("sentry.sample_rate")) != null ? _ : s[Fs]) != null ? y : s[Ni];
  function a(R) {
    return (typeof i == "number" || typeof i == "string") && (R.sample_rate = `${i}`), R;
  }
  const c = n[Ks];
  if (c)
    return a(c);
  const u = o == null ? void 0 : o.get("sentry.dsc"), d = u && Pi(u);
  if (d)
    return a(d);
  const p = Xs(t.spanContext().traceId, e), m = s[Q], l = r.description;
  return m !== "url" && l && (p.transaction = l), Ke() && (p.sampled = String(yt(n)), p.sample_rand = // In OTEL we store the sample rand on the trace state because we cannot access scopes for NonRecordingSpans
  // The Sentry OTEL SpanSampler takes care of writing the sample rand on the root span
  (I = o == null ? void 0 : o.get("sentry.sample_rand")) != null ? I : (
    // On all other platforms we can actually get the scopes from a root span (we use this as a fallback)
    (h = Oe(n).scope) == null ? void 0 : h.getPropagationContext().sampleRand.toString()
  )), a(p), e.emit("createDsc", p, n), p;
}
class St {
  constructor(e = {}) {
    this._traceId = e.traceId || ot(), this._spanId = e.spanId || Lt();
  }
  /** @inheritdoc */
  spanContext() {
    return {
      spanId: this._spanId,
      traceId: this._traceId,
      traceFlags: Ws
    };
  }
  /** @inheritdoc */
  end(e) {
  }
  /** @inheritdoc */
  setAttribute(e, n) {
    return this;
  }
  /** @inheritdoc */
  setAttributes(e) {
    return this;
  }
  /** @inheritdoc */
  setStatus(e) {
    return this;
  }
  /** @inheritdoc */
  updateName(e) {
    return this;
  }
  /** @inheritdoc */
  isRecording() {
    return !1;
  }
  /** @inheritdoc */
  addEvent(e, n, r) {
    return this;
  }
  /** @inheritDoc */
  addLink(e) {
    return this;
  }
  /** @inheritDoc */
  addLinks(e) {
    return this;
  }
  /**
   * This should generally not be used,
   * but we need it for being compliant with the OTEL Span interface.
   *
   * @hidden
   * @internal
   */
  recordException(e, n) {
  }
}
function F(t, e = 100, n = 1 / 0) {
  try {
    return Nn("", t, e, n);
  } catch (r) {
    return { ERROR: `**non-serializable** (${r})` };
  }
}
function Qs(t, e = 3, n = 100 * 1024) {
  const r = F(t, e);
  return Xi(r) > n ? Qs(t, e - 1, n) : r;
}
function Nn(t, e, n = 1 / 0, r = 1 / 0, s = Zi()) {
  const [o, i] = s;
  if (e == null || // this matches null and undefined -> eqeq not eqeqeq
  ["boolean", "string"].includes(typeof e) || typeof e == "number" && Number.isFinite(e))
    return e;
  const a = Yi(t, e);
  if (!a.startsWith("[object "))
    return a;
  if (e.__sentry_skip_normalization__)
    return e;
  const c = typeof e.__sentry_override_normalization_depth__ == "number" ? e.__sentry_override_normalization_depth__ : n;
  if (c === 0)
    return a.replace("object ", "");
  if (o(e))
    return "[Circular ~]";
  const u = e;
  if (u && typeof u.toJSON == "function")
    try {
      const l = u.toJSON();
      return Nn("", l, c - 1, r, s);
    } catch (l) {
    }
  const d = Array.isArray(e) ? [] : {};
  let p = 0;
  const m = xs(e);
  for (const l in m) {
    if (!Object.prototype.hasOwnProperty.call(m, l))
      continue;
    if (p >= r) {
      d[l] = "[MaxProperties ~]";
      break;
    }
    const _ = m[l];
    d[l] = Nn(l, _, c - 1, r, s), p++;
  }
  return i(e), d;
}
function Yi(t, e) {
  try {
    if (t === "domain" && e && typeof e == "object" && e._events)
      return "[Domain]";
    if (t === "domainEmitter")
      return "[DomainEmitter]";
    if (typeof global != "undefined" && e === global)
      return "[Global]";
    if (typeof window != "undefined" && e === window)
      return "[Window]";
    if (typeof document != "undefined" && e === document)
      return "[Document]";
    if (Cs(e))
      return ks(e);
    if (ci(e))
      return "[SyntheticEvent]";
    if (typeof e == "number" && !Number.isFinite(e))
      return `[${e}]`;
    if (typeof e == "function")
      return `[Function: ${Os(e)}]`;
    if (typeof e == "symbol")
      return `[${String(e)}]`;
    if (typeof e == "bigint")
      return `[BigInt: ${String(e)}]`;
    const n = Vi(e);
    return /^HTML(\w*)Element$/.test(n) ? `[HTMLElement: ${n}]` : `[object ${n}]`;
  } catch (n) {
    return `**non-serializable** (${n})`;
  }
}
function Vi(t) {
  const e = Object.getPrototypeOf(t);
  return e != null && e.constructor ? e.constructor.name : "null prototype";
}
function Ki(t) {
  return ~-encodeURI(t).split(/%..|./).length;
}
function Xi(t) {
  return Ki(JSON.stringify(t));
}
function Zi() {
  const t = /* @__PURE__ */ new WeakSet();
  function e(r) {
    return t.has(r) ? !0 : (t.add(r), !1);
  }
  function n(r) {
    t.delete(r);
  }
  return [e, n];
}
function ct(t, e = []) {
  return [t, e];
}
function Qi(t, e) {
  const [n, r] = t;
  return [n, [...r, e]];
}
function Qt(t, e) {
  const n = t[1];
  for (const r of n) {
    const s = r[0].type;
    if (e(r, s))
      return !0;
  }
  return !1;
}
function Rn(t) {
  const e = qe(b);
  return e.encodePolyfill ? e.encodePolyfill(t) : new TextEncoder().encode(t);
}
function ta(t) {
  const [e, n] = t;
  let r = JSON.stringify(e);
  function s(o) {
    typeof r == "string" ? r = typeof o == "string" ? r + o : [Rn(r), o] : r.push(typeof o == "string" ? Rn(o) : o);
  }
  for (const o of n) {
    const [i, a] = o;
    if (s(`
${JSON.stringify(i)}
`), typeof a == "string" || a instanceof Uint8Array)
      s(a);
    else {
      let c;
      try {
        c = JSON.stringify(a);
      } catch (u) {
        c = JSON.stringify(F(a));
      }
      s(c);
    }
  }
  return typeof r == "string" ? r : ea(r);
}
function ea(t) {
  const e = t.reduce((s, o) => s + o.length, 0), n = new Uint8Array(e);
  let r = 0;
  for (const s of t)
    n.set(s, r), r += s.length;
  return n;
}
function na(t) {
  return [{
    type: "span"
  }, t];
}
function ra(t) {
  const e = typeof t.data == "string" ? Rn(t.data) : t.data;
  return [
    {
      type: "attachment",
      length: e.length,
      filename: t.filename,
      content_type: t.contentType,
      attachment_type: t.attachmentType
    },
    e
  ];
}
const sa = {
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
function Dr(t) {
  return sa[t];
}
function to(t) {
  if (!(t != null && t.sdk))
    return;
  const { name: e, version: n } = t.sdk;
  return { name: e, version: n };
}
function oa(t, e, n, r) {
  var o;
  const s = (o = t.sdkProcessingMetadata) == null ? void 0 : o.dynamicSamplingContext;
  return f(f(f({
    event_id: t.event_id,
    sent_at: (/* @__PURE__ */ new Date()).toISOString()
  }, e && { sdk: e }), !!n && r && { dsn: Ft(r) }), s && {
    trace: s
  });
}
function ia(t, e) {
  var r, s, o, i;
  if (!e)
    return t;
  const n = t.sdk || {};
  return t.sdk = E(f({}, n), {
    name: n.name || e.name,
    version: n.version || e.version,
    integrations: [...((r = t.sdk) == null ? void 0 : r.integrations) || [], ...e.integrations || []],
    packages: [...((s = t.sdk) == null ? void 0 : s.packages) || [], ...e.packages || []],
    settings: (o = t.sdk) != null && o.settings || e.settings ? f(f({}, (i = t.sdk) == null ? void 0 : i.settings), e.settings) : void 0
  }), t;
}
function aa(t, e, n, r) {
  const s = to(n), o = f(f({
    sent_at: (/* @__PURE__ */ new Date()).toISOString()
  }, s && { sdk: s }), !!r && e && { dsn: Ft(e) }), i = "aggregates" in t ? [{ type: "sessions" }, t] : [{ type: "session" }, t.toJSON()];
  return ct(o, [i]);
}
function ca(t, e, n, r) {
  const s = to(n), o = t.type && t.type !== "replay_event" ? t.type : "event";
  ia(t, n == null ? void 0 : n.sdk);
  const i = oa(t, s, r, e);
  return delete t.sdkProcessingMetadata, ct(i, [[{ type: o }, t]]);
}
function ua(t, e) {
  function n(l) {
    return !!l.trace_id && !!l.public_key;
  }
  const r = it(t[0]), s = e == null ? void 0 : e.getDsn(), o = e == null ? void 0 : e.getOptions().tunnel, i = f(f({
    sent_at: (/* @__PURE__ */ new Date()).toISOString()
  }, n(r) && { trace: r }), !!o && s && { dsn: Ft(s) }), { beforeSendSpan: a, ignoreSpans: c } = (e == null ? void 0 : e.getOptions()) || {}, u = c != null && c.length ? t.filter((l) => !ke(A(l), c)) : t, d = t.length - u.length;
  d && (e == null || e.recordDroppedEvent("before_send", "span", d));
  const p = a ? (l) => {
    const _ = A(l), y = a(_);
    return y || (An(), _);
  } : A, m = [];
  for (const l of u) {
    const _ = p(l);
    _ && m.push(na(_));
  }
  return ct(i, m);
}
function la(t) {
  if (!S) return;
  const { description: e = "< unknown name >", op: n = "< unknown op >", parent_span_id: r } = A(t), { spanId: s } = t.spanContext(), o = yt(t), i = j(t), a = i === t, c = `[Tracing] Starting ${o ? "sampled" : "unsampled"} ${a ? "root " : ""}span`, u = [`op: ${n}`, `name: ${e}`, `ID: ${s}`];
  if (r && u.push(`parent ID: ${r}`), !a) {
    const { op: d, description: p } = A(i);
    u.push(`root ID: ${i.spanContext().spanId}`), d && u.push(`root op: ${d}`), p && u.push(`root description: ${p}`);
  }
  g.log(`${c}
  ${u.join(`
  `)}`);
}
function fa(t) {
  if (!S) return;
  const { description: e = "< unknown name >", op: n = "< unknown op >" } = A(t), { spanId: r } = t.spanContext(), o = j(t) === t, i = `[Tracing] Finishing "${n}" ${o ? "root " : ""}span "${e}" with ID ${r}`;
  g.log(i);
}
function pa(t, e, n, r = Ut()) {
  const s = r && j(r);
  s && (S && g.log(`[Measurement] Setting measurement on root span: ${t} = ${e} ${n}`), s.addEvent(t, {
    [js]: e,
    [Us]: n
  }));
}
function $r(t) {
  if (!t || t.length === 0)
    return;
  const e = {};
  return t.forEach((n) => {
    const r = n.attributes || {}, s = r[Us], o = r[js];
    typeof s == "string" && typeof o == "number" && (e[n.name] = { value: o, unit: s });
  }), e;
}
const Lr = 1e3;
class Xe {
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
  constructor(e = {}) {
    this._traceId = e.traceId || ot(), this._spanId = e.spanId || Lt(), this._startTime = e.startTimestamp || Z(), this._links = e.links, this._attributes = {}, this.setAttributes(f({
      [z]: "manual",
      [Zt]: e.op
    }, e.attributes)), this._name = e.name, e.parentSpanId && (this._parentSpanId = e.parentSpanId), "sampled" in e && (this._sampled = e.sampled), e.endTimestamp && (this._endTime = e.endTimestamp), this._events = [], this._isStandaloneSpan = e.isStandalone, this._endTime && this._onSpanEnded();
  }
  /** @inheritDoc */
  addLink(e) {
    return this._links ? this._links.push(e) : this._links = [e], this;
  }
  /** @inheritDoc */
  addLinks(e) {
    return this._links ? this._links.push(...e) : this._links = e, this;
  }
  /**
   * This should generally not be used,
   * but it is needed for being compliant with the OTEL Span interface.
   *
   * @hidden
   * @internal
   */
  recordException(e, n) {
  }
  /** @inheritdoc */
  spanContext() {
    const { _spanId: e, _traceId: n, _sampled: r } = this;
    return {
      spanId: e,
      traceId: n,
      traceFlags: r ? qn : Ws
    };
  }
  /** @inheritdoc */
  setAttribute(e, n) {
    return n === void 0 ? delete this._attributes[e] : this._attributes[e] = n, this;
  }
  /** @inheritdoc */
  setAttributes(e) {
    return Object.keys(e).forEach((n) => this.setAttribute(n, e[n])), this;
  }
  /**
   * This should generally not be used,
   * but we need it for browser tracing where we want to adjust the start time afterwards.
   * USE THIS WITH CAUTION!
   *
   * @hidden
   * @internal
   */
  updateStartTime(e) {
    this._startTime = pt(e);
  }
  /**
   * @inheritDoc
   */
  setStatus(e) {
    return this._status = e, this;
  }
  /**
   * @inheritDoc
   */
  updateName(e) {
    return this._name = e, this.setAttribute(Q, "custom"), this;
  }
  /** @inheritdoc */
  end(e) {
    this._endTime || (this._endTime = pt(e), fa(this), this._onSpanEnded());
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
      op: this._attributes[Zt],
      parent_span_id: this._parentSpanId,
      span_id: this._spanId,
      start_timestamp: this._startTime,
      status: Ys(this._status),
      timestamp: this._endTime,
      trace_id: this._traceId,
      origin: this._attributes[z],
      profile_id: this._attributes[Bn],
      exclusive_time: this._attributes[Gn],
      measurements: $r(this._events),
      is_segment: this._isStandaloneSpan && j(this) === this || void 0,
      segment_id: this._isStandaloneSpan ? j(this).spanContext().spanId : void 0,
      links: zs(this._links)
    };
  }
  /** @inheritdoc */
  isRecording() {
    return !this._endTime && !!this._sampled;
  }
  /**
   * @inheritdoc
   */
  addEvent(e, n, r) {
    S && g.log("[Tracing] Adding an event to span:", e);
    const s = Fr(n) ? n : r || Z(), o = Fr(n) ? {} : n || {}, i = {
      name: e,
      time: pt(s),
      attributes: o
    };
    return this._events.push(i), this;
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
    const e = O();
    if (e && e.emit("spanEnd", this), !(this._isStandaloneSpan || this === j(this)))
      return;
    if (this._isStandaloneSpan) {
      this._sampled ? ma(ua([this], e)) : (S && g.log("[Tracing] Discarding standalone span because its trace was not chosen to be sampled."), e && e.recordDroppedEvent("sample_rate", "span"));
      return;
    }
    const r = this._convertSpanToTransaction();
    r && (Oe(this).scope || k()).captureEvent(r);
  }
  /**
   * Finish the transaction & prepare the event to send to Sentry.
   */
  _convertSpanToTransaction() {
    var d;
    if (!Ur(A(this)))
      return;
    this._name || (S && g.warn("Transaction has no name, falling back to `<unlabeled transaction>`."), this._name = "<unlabeled transaction>");
    const { scope: e, isolationScope: n } = Oe(this), r = (d = e == null ? void 0 : e.getScopeData().sdkProcessingMetadata) == null ? void 0 : d.normalizedRequest;
    if (this._sampled !== !0)
      return;
    const o = Ee(this).filter((p) => p !== this && !da(p)).map((p) => A(p)).filter(Ur), i = this._attributes[Q];
    delete this._attributes[kr], o.forEach((p) => {
      delete p.data[kr];
    });
    const a = f({
      contexts: {
        trace: Gi(this)
      },
      spans: (
        // spans.sort() mutates the array, but `spans` is already a copy so we can safely do this here
        // we do not use spans anymore after this point
        o.length > Lr ? o.sort((p, m) => p.start_timestamp - m.start_timestamp).slice(0, Lr) : o
      ),
      start_timestamp: this._startTime,
      timestamp: this._endTime,
      transaction: this._name,
      type: "transaction",
      sdkProcessingMetadata: {
        capturedSpanScope: e,
        capturedSpanIsolationScope: n,
        dynamicSamplingContext: it(this)
      },
      request: r
    }, i && {
      transaction_info: {
        source: i
      }
    }), c = $r(this._events);
    return c && Object.keys(c).length && (S && g.log(
      "[Measurements] Adding measurements to transaction event",
      JSON.stringify(c, void 0, 2)
    ), a.measurements = c), a;
  }
}
function Fr(t) {
  return t && typeof t == "number" || t instanceof Date || Array.isArray(t);
}
function Ur(t) {
  return !!t.start_timestamp && !!t.timestamp && !!t.span_id && !!t.trace_id;
}
function da(t) {
  return t instanceof Xe && t.isStandaloneSpan();
}
function ma(t) {
  const e = O();
  if (!e)
    return;
  const n = t[1];
  if (!n || n.length === 0) {
    e.recordDroppedEvent("before_send", "span");
    return;
  }
  e.sendEnvelope(t);
}
function Ze(t, e, n = () => {
}, r = () => {
}) {
  let s;
  try {
    s = t();
  } catch (o) {
    throw e(o), n(), o;
  }
  return _a(s, e, n, r);
}
function _a(t, e, n, r) {
  return $t(t) ? t.then(
    (s) => (n(), r(s), s),
    (s) => {
      throw e(s), n(), s;
    }
  ) : (n(), r(t), t);
}
function ga(t, e, n) {
  if (!Ke(t))
    return [!1];
  let r, s;
  typeof t.tracesSampler == "function" ? (s = t.tracesSampler(E(f({}, e), {
    inheritOrSampleWith: (a) => typeof e.parentSampleRate == "number" ? e.parentSampleRate : typeof e.parentSampled == "boolean" ? Number(e.parentSampled) : a
  })), r = !0) : e.parentSampled !== void 0 ? s = e.parentSampled : typeof t.tracesSampleRate != "undefined" && (s = t.tracesSampleRate, r = !0);
  const o = Hn(s);
  if (o === void 0)
    return S && g.warn(
      `[Tracing] Discarding root span because of invalid sample rate. Sample rate must be a boolean or a number between 0 and 1. Got ${JSON.stringify(
        s
      )} of type ${JSON.stringify(typeof s)}.`
    ), [!1];
  if (!o)
    return S && g.log(
      `[Tracing] Discarding transaction because ${typeof t.tracesSampler == "function" ? "tracesSampler returned 0 or false" : "a negative sampling decision was inherited or tracesSampleRate is set to 0"}`
    ), [!1, o, r];
  const i = n < o;
  return i || S && g.log(
    `[Tracing] Discarding transaction because it's not included in the random sample (sampling rate = ${Number(
      s
    )})`
  ), [i, o, r];
}
const eo = "__SENTRY_SUPPRESS_TRACING__";
function re(t, e) {
  const n = Qe();
  if (n.startSpan)
    return n.startSpan(t, e);
  const r = Yn(t), { forceTransaction: s, parentSpan: o, scope: i } = t, a = i == null ? void 0 : i.clone();
  return at(a, () => ro(o)(() => {
    const u = k(), d = Vn(u, o), m = t.onlyIfParent && !d ? new St() : zn({
      parentSpan: d,
      spanArguments: r,
      forceTransaction: s,
      scope: u
    });
    return ht(u, m), Ze(
      () => e(m),
      () => {
        const { status: l } = A(m);
        m.isRecording() && (!l || l === "ok") && m.setStatus({ code: N, message: "internal_error" });
      },
      () => {
        m.end();
      }
    );
  }));
}
function Me(t, e) {
  const n = Qe();
  if (n.startSpanManual)
    return n.startSpanManual(t, e);
  const r = Yn(t), { forceTransaction: s, parentSpan: o, scope: i } = t, a = i == null ? void 0 : i.clone();
  return at(a, () => ro(o)(() => {
    const u = k(), d = Vn(u, o), m = t.onlyIfParent && !d ? new St() : zn({
      parentSpan: d,
      spanArguments: r,
      forceTransaction: s,
      scope: u
    });
    return ht(u, m), Ze(
      // We pass the `finish` function to the callback, so the user can finish the span manually
      // this is mainly here for historic purposes because previously, we instructed users to call
      // `finish` instead of `span.end()` to also clean up the scope. Nowadays, calling `span.end()`
      // or `finish` has the same effect and we simply leave it here to avoid breaking user code.
      () => e(m, () => m.end()),
      () => {
        const { status: l } = A(m);
        m.isRecording() && (!l || l === "ok") && m.setStatus({ code: N, message: "internal_error" });
      }
    );
  }));
}
function no(t) {
  const e = Qe();
  if (e.startInactiveSpan)
    return e.startInactiveSpan(t);
  const n = Yn(t), { forceTransaction: r, parentSpan: s } = t;
  return (t.scope ? (i) => at(t.scope, i) : s !== void 0 ? (i) => Jn(s, i) : (i) => i())(() => {
    const i = k(), a = Vn(i, s);
    return t.onlyIfParent && !a ? new St() : zn({
      parentSpan: a,
      spanArguments: n,
      forceTransaction: r,
      scope: i
    });
  });
}
function Jn(t, e) {
  const n = Qe();
  return n.withActiveSpan ? n.withActiveSpan(t, e) : at((r) => (ht(r, t || void 0), e(r)));
}
function lp(t) {
  return at((e) => (e.setPropagationContext({
    traceId: ot(),
    sampleRand: Math.random()
  }), S && g.log(`Starting a new trace with id ${e.getPropagationContext().traceId}`), Jn(null, t)));
}
function zn({
  parentSpan: t,
  spanArguments: e,
  forceTransaction: n,
  scope: r
}) {
  if (!Ke()) {
    const i = new St();
    if (n || !t) {
      const a = f({
        sampled: "false",
        sample_rate: "0",
        transaction: e.name
      }, it(i));
      be(i, a);
    }
    return i;
  }
  const s = $();
  let o;
  if (t && !n)
    o = ha(t, r, e), Vs(t, o);
  else if (t) {
    const i = it(t), { traceId: a, spanId: c } = t.spanContext(), u = yt(t);
    o = jr(
      f({
        traceId: a,
        parentSpanId: c
      }, e),
      r,
      u
    ), be(o, i);
  } else {
    const {
      traceId: i,
      dsc: a,
      parentSpanId: c,
      sampled: u
    } = f(f({}, s.getPropagationContext()), r.getPropagationContext());
    o = jr(
      f({
        traceId: i,
        parentSpanId: c
      }, e),
      r,
      u
    ), a && be(o, a);
  }
  return la(o), vi(o, r, s), o;
}
function Yn(t) {
  const e = t.experimental || {}, n = f({
    isStandalone: e.standalone
  }, t);
  if (t.startTime) {
    const r = f({}, n);
    return r.startTimestamp = pt(t.startTime), delete r.startTime, r;
  }
  return n;
}
function Qe() {
  const t = wt();
  return ne(t);
}
function jr(t, e, n) {
  var _, y;
  const r = O(), s = (r == null ? void 0 : r.getOptions()) || {}, { name: o = "" } = t, i = { spanAttributes: f({}, t.attributes), spanName: o, parentSampled: n };
  r == null || r.emit("beforeSampling", i, { decision: !1 });
  const a = (_ = i.parentSampled) != null ? _ : n, c = i.spanAttributes, u = e.getPropagationContext(), [d, p, m] = e.getScopeData().sdkProcessingMetadata[eo] ? [!1] : ga(
    s,
    {
      name: o,
      parentSampled: a,
      attributes: c,
      parentSampleRate: Hn((y = u.dsc) == null ? void 0 : y.sample_rate)
    },
    u.sampleRand
  ), l = new Xe(E(f({}, t), {
    attributes: f({
      [Q]: "custom",
      [Fs]: p !== void 0 && m ? p : void 0
    }, c),
    sampled: d
  }));
  return !d && r && (S && g.log("[Tracing] Discarding root span because its trace was not chosen to be sampled."), r.recordDroppedEvent("sample_rate", "transaction")), r && r.emit("spanStart", l), l;
}
function ha(t, e, n) {
  const { spanId: r, traceId: s } = t.spanContext(), o = e.getScopeData().sdkProcessingMetadata[eo] ? !1 : yt(t), i = o ? new Xe(E(f({}, n), {
    parentSpanId: r,
    traceId: s,
    sampled: o
  })) : new St({ traceId: s });
  Vs(t, i);
  const a = O();
  return a && (a.emit("spanStart", i), n.endTimestamp && a.emit("spanEnd", i)), i;
}
function Vn(t, e) {
  if (e)
    return e;
  if (e === null)
    return;
  const n = kt(t);
  if (!n)
    return;
  const r = O();
  return (r ? r.getOptions() : {}).parentSpanIsAlwaysRootSpan ? j(n) : n;
}
function ro(t) {
  return t !== void 0 ? (e) => Jn(t, e) : (e) => e();
}
const _n = {
  idleTimeout: 1e3,
  finalTimeout: 3e4,
  childSpanTimeout: 15e3
}, ya = "heartbeatFailed", Sa = "idleTimeout", Ea = "finalTimeout", ba = "externalFinish";
function Ta(t, e = {}) {
  const n = /* @__PURE__ */ new Map();
  let r = !1, s, o = ba, i = !e.disableAutoFinish;
  const a = [], {
    idleTimeout: c = _n.idleTimeout,
    finalTimeout: u = _n.finalTimeout,
    childSpanTimeout: d = _n.childSpanTimeout,
    beforeSpanEnd: p,
    trimIdleSpanEndTimestamp: m = !0
  } = e, l = O();
  if (!l || !Ke()) {
    const T = new St(), C = f({
      sample_rate: "0",
      sampled: "false"
    }, it(T));
    return be(T, C), T;
  }
  const _ = k(), y = Ut(), h = Ia(t);
  h.end = new Proxy(h.end, {
    apply(T, C, qt) {
      if (p && p(h), C instanceof St)
        return;
      const [Wt, ...et] = qt, bt = Wt || Z(), L = pt(bt), M = Ee(h).filter((V) => V !== h), Jt = A(h);
      if (!M.length || !m)
        return Et(L), Reflect.apply(T, C, [L, ...et]);
      const Tt = l.getOptions().ignoreSpans, ie = M == null ? void 0 : M.reduce((V, ce) => {
        const ue = A(ce);
        return !ue.timestamp || Tt && ke(ue, Tt) ? V : V ? Math.max(V, ue.timestamp) : ue.timestamp;
      }, void 0), It = Jt.start_timestamp, ae = Math.min(
        It ? It + u / 1e3 : 1 / 0,
        Math.max(It || -1 / 0, Math.min(L, ie || 1 / 0))
      );
      return Et(ae), Reflect.apply(T, C, [ae, ...et]);
    }
  });
  function I() {
    s && (clearTimeout(s), s = void 0);
  }
  function R(T) {
    I(), s = setTimeout(() => {
      !r && n.size === 0 && i && (o = Sa, h.end(T));
    }, c);
  }
  function w(T) {
    s = setTimeout(() => {
      !r && i && (o = ya, h.end(T));
    }, d);
  }
  function U(T) {
    I(), n.set(T, !0);
    const C = Z();
    w(C + d / 1e3);
  }
  function Y(T) {
    if (n.has(T) && n.delete(T), n.size === 0) {
      const C = Z();
      R(C + c / 1e3);
    }
  }
  function Et(T) {
    r = !0, n.clear(), a.forEach((M) => M()), ht(_, y);
    const C = A(h), { start_timestamp: qt } = C;
    if (!qt)
      return;
    C.data[Re] || h.setAttribute(Re, o);
    const et = C.status;
    (!et || et === "unknown") && h.setStatus({ code: Ve }), g.log(`[Tracing] Idle span "${C.op}" finished`);
    const bt = Ee(h).filter((M) => M !== h);
    let L = 0;
    bt.forEach((M) => {
      M.isRecording() && (M.setStatus({ code: N, message: "cancelled" }), M.end(T), S && g.log("[Tracing] Cancelling span since span ended early", JSON.stringify(M, void 0, 2)));
      const Jt = A(M), { timestamp: Tt = 0, start_timestamp: ie = 0 } = Jt, It = ie <= T, ae = (u + c) / 1e3, V = Tt - ie <= ae;
      if (S) {
        const ce = JSON.stringify(M, void 0, 2);
        It ? V || g.log("[Tracing] Discarding span since it finished after idle span final timeout", ce) : g.log("[Tracing] Discarding span since it happened after idle span was finished", ce);
      }
      (!V || !It) && (Wi(h, M), L++);
    }), L > 0 && h.setAttribute("sentry.idle_span_discarded_spans", L);
  }
  return a.push(
    l.on("spanStart", (T) => {
      if (r || T === h || A(T).timestamp || T instanceof Xe && T.isStandaloneSpan())
        return;
      Ee(h).includes(T) && U(T.spanContext().spanId);
    })
  ), a.push(
    l.on("spanEnd", (T) => {
      r || Y(T.spanContext().spanId);
    })
  ), a.push(
    l.on("idleSpanEnableAutoFinish", (T) => {
      T === h && (i = !0, R(), n.size && w());
    })
  ), e.disableAutoFinish || R(), setTimeout(() => {
    r || (h.setStatus({ code: N, message: "deadline_exceeded" }), o = Ea, h.end());
  }, u), h;
}
function Ia(t) {
  const e = no(t);
  return ht(k(), e), S && g.log("[Tracing] Started span is an idle span"), e;
}
const gn = 0, Br = 1, Gr = 2;
function jt(t) {
  return new vt((e) => {
    e(t);
  });
}
function Kn(t) {
  return new vt((e, n) => {
    n(t);
  });
}
class vt {
  constructor(e) {
    this._state = gn, this._handlers = [], this._runExecutor(e);
  }
  /** @inheritdoc */
  then(e, n) {
    return new vt((r, s) => {
      this._handlers.push([
        !1,
        (o) => {
          if (!e)
            r(o);
          else
            try {
              r(e(o));
            } catch (i) {
              s(i);
            }
        },
        (o) => {
          if (!n)
            s(o);
          else
            try {
              r(n(o));
            } catch (i) {
              s(i);
            }
        }
      ]), this._executeHandlers();
    });
  }
  /** @inheritdoc */
  catch(e) {
    return this.then((n) => n, e);
  }
  /** @inheritdoc */
  finally(e) {
    return new vt((n, r) => {
      let s, o;
      return this.then(
        (i) => {
          o = !1, s = i, e && e();
        },
        (i) => {
          o = !0, s = i, e && e();
        }
      ).then(() => {
        if (o) {
          r(s);
          return;
        }
        n(s);
      });
    });
  }
  /** Excute the resolve/reject handlers. */
  _executeHandlers() {
    if (this._state === gn)
      return;
    const e = this._handlers.slice();
    this._handlers = [], e.forEach((n) => {
      n[0] || (this._state === Br && n[1](this._value), this._state === Gr && n[2](this._value), n[0] = !0);
    });
  }
  /** Run the executor for the SyncPromise. */
  _runExecutor(e) {
    const n = (o, i) => {
      if (this._state === gn) {
        if ($t(i)) {
          i.then(r, s);
          return;
        }
        this._state = o, this._value = i, this._executeHandlers();
      }
    }, r = (o) => {
      n(Br, o);
    }, s = (o) => {
      n(Gr, o);
    };
    try {
      e(r, s);
    } catch (o) {
      s(o);
    }
  }
}
function Aa(t, e, n, r = 0) {
  try {
    const s = On(e, n, t, r);
    return $t(s) ? s : jt(s);
  } catch (s) {
    return Kn(s);
  }
}
function On(t, e, n, r) {
  const s = n[r];
  if (!t || !s)
    return t;
  const o = s(f({}, t), e);
  return S && o === null && g.log(`Event processor "${s.id || "?"}" dropped event`), $t(o) ? o.then((i) => On(i, e, n, r + 1)) : On(o, e, n, r + 1);
}
function Na(t, e) {
  const { fingerprint: n, span: r, breadcrumbs: s, sdkProcessingMetadata: o } = e;
  Ra(t, e), r && Ma(t, r), va(t, n), Oa(t, s), ka(t, o);
}
function Ct(t, e) {
  const {
    extra: n,
    tags: r,
    user: s,
    contexts: o,
    level: i,
    sdkProcessingMetadata: a,
    breadcrumbs: c,
    fingerprint: u,
    eventProcessors: d,
    attachments: p,
    propagationContext: m,
    transactionName: l,
    span: _
  } = e;
  me(t, "extra", n), me(t, "tags", r), me(t, "user", s), me(t, "contexts", o), t.sdkProcessingMetadata = ee(t.sdkProcessingMetadata, a, 2), i && (t.level = i), l && (t.transactionName = l), _ && (t.span = _), c.length && (t.breadcrumbs = [...t.breadcrumbs, ...c]), u.length && (t.fingerprint = [...t.fingerprint, ...u]), d.length && (t.eventProcessors = [...t.eventProcessors, ...d]), p.length && (t.attachments = [...t.attachments, ...p]), t.propagationContext = f(f({}, t.propagationContext), m);
}
function me(t, e, n) {
  t[e] = ee(t[e], n, 1);
}
function Ra(t, e) {
  const { extra: n, tags: r, user: s, contexts: o, level: i, transactionName: a } = e;
  Object.keys(n).length && (t.extra = f(f({}, n), t.extra)), Object.keys(r).length && (t.tags = f(f({}, r), t.tags)), Object.keys(s).length && (t.user = f(f({}, s), t.user)), Object.keys(o).length && (t.contexts = f(f({}, o), t.contexts)), i && (t.level = i), a && t.type !== "transaction" && (t.transaction = a);
}
function Oa(t, e) {
  const n = [...t.breadcrumbs || [], ...e];
  t.breadcrumbs = n.length ? n : void 0;
}
function ka(t, e) {
  t.sdkProcessingMetadata = f(f({}, t.sdkProcessingMetadata), e);
}
function Ma(t, e) {
  t.contexts = f({
    trace: Js(e)
  }, t.contexts), t.sdkProcessingMetadata = f({
    dynamicSamplingContext: it(e)
  }, t.sdkProcessingMetadata);
  const n = j(e), r = A(n).description;
  r && !t.transaction && t.type === "transaction" && (t.transaction = r);
}
function va(t, e) {
  t.fingerprint = t.fingerprint ? Array.isArray(t.fingerprint) ? t.fingerprint : [t.fingerprint] : [], e && (t.fingerprint = t.fingerprint.concat(e)), t.fingerprint.length || delete t.fingerprint;
}
let K, Hr, qr, rt;
function Ca(t) {
  const e = b._sentryDebugIds, n = b._debugIds;
  if (!e && !n)
    return {};
  const r = e ? Object.keys(e) : [], s = n ? Object.keys(n) : [];
  if (rt && r.length === Hr && s.length === qr)
    return rt;
  Hr = r.length, qr = s.length, rt = {}, K || (K = {});
  const o = (i, a) => {
    for (const c of i) {
      const u = a[c], d = K == null ? void 0 : K[c];
      if (d && rt && u)
        rt[d[0]] = u, K && (K[c] = [d[0], u]);
      else if (u) {
        const p = t(c);
        for (let m = p.length - 1; m >= 0; m--) {
          const l = p[m], _ = l == null ? void 0 : l.filename;
          if (_ && rt && K) {
            rt[_] = u, K[c] = [_, u];
            break;
          }
        }
      }
    }
  };
  return e && o(r, e), n && o(s, n), rt;
}
function wa(t, e, n, r, s, o) {
  const { normalizeDepth: i = 3, normalizeMaxBreadth: a = 1e3 } = t, c = E(f({}, e), {
    event_id: e.event_id || n.event_id || q(),
    timestamp: e.timestamp || te()
  }), u = n.integrations || t.integrations.map((h) => h.name);
  Pa(c, t), $a(c, u), s && s.emit("applyFrameMetadata", e), e.type === void 0 && xa(c, t.stackParser);
  const d = Fa(r, n.captureContext);
  n.mechanism && st(c, n.mechanism);
  const p = s ? s.getEventProcessors() : [], m = jn().getScopeData();
  if (o) {
    const h = o.getScopeData();
    Ct(m, h);
  }
  if (d) {
    const h = d.getScopeData();
    Ct(m, h);
  }
  const l = [...n.attachments || [], ...m.attachments];
  l.length && (n.attachments = l), Na(c, m);
  const _ = [
    ...p,
    // Run scope event processors _after_ all other processors
    ...m.eventProcessors
  ];
  return Aa(_, c, n).then((h) => (h && Da(h), typeof i == "number" && i > 0 ? La(h, i, a) : h));
}
function Pa(t, e) {
  var a, c;
  const { environment: n, release: r, dist: s, maxValueLength: o } = e;
  t.environment = t.environment || n || Wn, !t.release && r && (t.release = r), !t.dist && s && (t.dist = s);
  const i = t.request;
  i != null && i.url && o && (i.url = Xt(i.url, o)), o && ((c = (a = t.exception) == null ? void 0 : a.values) == null || c.forEach((u) => {
    u.value && (u.value = Xt(u.value, o));
  }));
}
function xa(t, e) {
  var r, s;
  const n = Ca(e);
  (s = (r = t.exception) == null ? void 0 : r.values) == null || s.forEach((o) => {
    var i, a;
    (a = (i = o.stacktrace) == null ? void 0 : i.frames) == null || a.forEach((c) => {
      c.filename && (c.debug_id = n[c.filename]);
    });
  });
}
function Da(t) {
  var r, s;
  const e = {};
  if ((s = (r = t.exception) == null ? void 0 : r.values) == null || s.forEach((o) => {
    var i, a;
    (a = (i = o.stacktrace) == null ? void 0 : i.frames) == null || a.forEach((c) => {
      c.debug_id && (c.abs_path ? e[c.abs_path] = c.debug_id : c.filename && (e[c.filename] = c.debug_id), delete c.debug_id);
    });
  }), Object.keys(e).length === 0)
    return;
  t.debug_meta = t.debug_meta || {}, t.debug_meta.images = t.debug_meta.images || [];
  const n = t.debug_meta.images;
  Object.entries(e).forEach(([o, i]) => {
    n.push({
      type: "sourcemap",
      code_file: o,
      debug_id: i
    });
  });
}
function $a(t, e) {
  e.length > 0 && (t.sdk = t.sdk || {}, t.sdk.integrations = [...t.sdk.integrations || [], ...e]);
}
function La(t, e, n) {
  var s, o;
  if (!t)
    return null;
  const r = f(f(f(f(f({}, t), t.breadcrumbs && {
    breadcrumbs: t.breadcrumbs.map((i) => f(f({}, i), i.data && {
      data: F(i.data, e, n)
    }))
  }), t.user && {
    user: F(t.user, e, n)
  }), t.contexts && {
    contexts: F(t.contexts, e, n)
  }), t.extra && {
    extra: F(t.extra, e, n)
  });
  return (s = t.contexts) != null && s.trace && r.contexts && (r.contexts.trace = t.contexts.trace, t.contexts.trace.data && (r.contexts.trace.data = F(t.contexts.trace.data, e, n))), t.spans && (r.spans = t.spans.map((i) => f(f({}, i), i.data && {
    data: F(i.data, e, n)
  }))), (o = t.contexts) != null && o.flags && r.contexts && (r.contexts.flags = F(t.contexts.flags, 3, n)), r;
}
function Fa(t, e) {
  if (!e)
    return t;
  const n = t ? t.clone() : new J();
  return n.update(e), n;
}
function Ua(t) {
  if (t)
    return ja(t) ? { captureContext: t } : Ga(t) ? {
      captureContext: t
    } : t;
}
function ja(t) {
  return t instanceof J || typeof t == "function";
}
const Ba = [
  "user",
  "level",
  "extra",
  "contexts",
  "tags",
  "fingerprint",
  "propagationContext"
];
function Ga(t) {
  return Object.keys(t).some((e) => Ba.includes(e));
}
function P(t, e) {
  return k().captureException(t, Ua(e));
}
function Wr(t, e) {
  const n = typeof e == "string" ? e : void 0, r = typeof e != "string" ? { captureContext: e } : void 0;
  return k().captureMessage(t, n, r);
}
function fp(t, e) {
  return k().captureEvent(t, e);
}
function pp(t, e) {
  $().setContext(t, e);
}
function dp(t) {
  $().setExtras(t);
}
function Jr(t, e) {
  $().setExtra(t, e);
}
function mp(t) {
  $().setTags(t);
}
function zr(t, e) {
  $().setTag(t, e);
}
function _p(t) {
  $().setUser(t);
}
function so() {
  return $().lastEventId();
}
function tn(t) {
  $().addEventProcessor(t);
}
const Ha = "7";
function qa(t) {
  const e = t.protocol ? `${t.protocol}:` : "", n = t.port ? `:${t.port}` : "";
  return `${e}//${t.host}${n}${t.path ? `/${t.path}` : ""}/api/`;
}
function Wa(t) {
  return `${qa(t)}${t.projectId}/envelope/`;
}
function Ja(t, e) {
  const n = {
    sentry_version: Ha
  };
  return t.publicKey && (n.sentry_key = t.publicKey), e && (n.sentry_client = `${e.name}/${e.version}`), new URLSearchParams(n).toString();
}
function oo(t, e, n) {
  return e || `${Wa(t)}?${Ja(t, n)}`;
}
const Yr = [];
function za(t, e) {
  const n = {};
  return e.forEach((r) => {
    r && io(t, r, n);
  }), n;
}
function Vr(t, e) {
  for (const n of e)
    n != null && n.afterAllSetup && n.afterAllSetup(t);
}
function io(t, e, n) {
  if (n[e.name]) {
    S && g.log(`Integration skipped because it was already installed: ${e.name}`);
    return;
  }
  if (n[e.name] = e, !Yr.includes(e.name) && typeof e.setupOnce == "function" && (e.setupOnce(), Yr.push(e.name)), e.setup && typeof e.setup == "function" && e.setup(t), typeof e.preprocessEvent == "function") {
    const r = e.preprocessEvent.bind(e);
    t.on("preprocessEvent", (s, o) => r(s, o, t));
  }
  if (typeof e.processEvent == "function") {
    const r = e.processEvent.bind(e), s = Object.assign((o, i) => r(o, i, t), {
      id: e.name
    });
    t.addEventProcessor(s);
  }
  S && g.log(`Integration installed: ${e.name}`);
}
function ao(t, e) {
  return e ? at(e, () => {
    const n = Ut(), r = n ? Js(n) : Ls(e);
    return [n ? it(n) : Zs(t, e), r];
  }) : [void 0, void 0];
}
const Ya = {
  trace: 1,
  debug: 5,
  info: 9,
  warn: 13,
  error: 17,
  fatal: 21
};
function Va(t) {
  return [
    {
      type: "log",
      item_count: t.length,
      content_type: "application/vnd.sentry.items.log+json"
    },
    {
      items: t
    }
  ];
}
function Ka(t, e, n, r) {
  const s = {};
  return e != null && e.sdk && (s.sdk = {
    name: e.sdk.name,
    version: e.sdk.version
  }), n && r && (s.dsn = Ft(r)), ct(s, [Va(t)]);
}
const Xa = 100;
function Za(t) {
  var e;
  switch (typeof t) {
    case "number":
      return Number.isInteger(t) ? {
        value: t,
        type: "integer"
      } : {
        value: t,
        type: "double"
      };
    case "boolean":
      return {
        value: t,
        type: "boolean"
      };
    case "string":
      return {
        value: t,
        type: "string"
      };
    default: {
      let n = "";
      try {
        n = (e = JSON.stringify(t)) != null ? e : "";
      } catch (r) {
      }
      return {
        value: n,
        type: "string"
      };
    }
  }
}
function H(t, e, n, r = !0) {
  n && (!t[e] || r) && (t[e] = n);
}
function Qa(t, e) {
  const n = Xn(), r = uo(t);
  r === void 0 ? n.set(t, [e]) : r.length >= Xa ? (co(t, r), n.set(t, [e])) : n.set(t, [...r, e]);
}
function ve(t, e = k(), n = Qa) {
  var Wt, et, bt;
  const r = (Wt = e == null ? void 0 : e.getClient()) != null ? Wt : O();
  if (!r) {
    S && g.warn("No client available to capture log.");
    return;
  }
  const { release: s, environment: o, enableLogs: i = !1, beforeSendLog: a } = r.getOptions();
  if (!i) {
    S && g.warn("logging option not enabled, log will not be captured.");
    return;
  }
  const [, c] = ao(r, e), u = f({}, t.attributes), {
    user: { id: d, email: p, username: m }
  } = tc(e);
  H(u, "user.id", d, !1), H(u, "user.email", p, !1), H(u, "user.name", m, !1), H(u, "sentry.release", s), H(u, "sentry.environment", o);
  const { name: l, version: _ } = (bt = (et = r.getSdkMetadata()) == null ? void 0 : et.sdk) != null ? bt : {};
  H(u, "sentry.sdk.name", l), H(u, "sentry.sdk.version", _);
  const y = r.getIntegrationByName("Replay"), h = y == null ? void 0 : y.getReplayId(!0);
  H(u, "sentry.replay_id", h), h && (y == null ? void 0 : y.getRecordingMode()) === "buffer" && H(u, "sentry._internal.replay_is_buffering", !0);
  const I = t.message;
  if (We(I)) {
    const { __sentry_template_string__: L, __sentry_template_values__: M = [] } = I;
    M != null && M.length && (u["sentry.message.template"] = L), M.forEach((Jt, Tt) => {
      u[`sentry.message.parameter.${Tt}`] = Jt;
    });
  }
  const R = kt(e);
  H(u, "sentry.trace.parent_span_id", R == null ? void 0 : R.spanContext().spanId);
  const w = E(f({}, t), { attributes: u });
  r.emit("beforeCaptureLog", w);
  const U = a ? xt(() => a(w)) : w;
  if (!U) {
    r.recordDroppedEvent("before_send", "log_item", 1), S && g.warn("beforeSendLog returned null, log will not be captured.");
    return;
  }
  const { level: Y, message: Et, attributes: T = {}, severityNumber: C } = U, qt = {
    timestamp: Z(),
    level: Y,
    body: Et,
    trace_id: c == null ? void 0 : c.trace_id,
    severity_number: C != null ? C : Ya[Y],
    attributes: Object.keys(T).reduce(
      (L, M) => (L[M] = Za(T[M]), L),
      {}
    )
  };
  n(r, qt), r.emit("afterCaptureLog", U);
}
function co(t, e) {
  var o;
  const n = (o = e != null ? e : uo(t)) != null ? o : [];
  if (n.length === 0)
    return;
  const r = t.getOptions(), s = Ka(n, r._metadata, r.tunnel, t.getDsn());
  Xn().set(t, []), t.emit("flushLogs"), t.sendEnvelope(s);
}
function uo(t) {
  return Xn().get(t);
}
function tc(t) {
  const e = jn().getScopeData();
  return Ct(e, $().getScopeData()), Ct(e, t.getScopeData()), e;
}
function Xn() {
  return Pt("clientToLogBufferMap", () => /* @__PURE__ */ new WeakMap());
}
function ec(t) {
  return [
    {
      type: "trace_metric",
      item_count: t.length,
      content_type: "application/vnd.sentry.items.trace-metric+json"
    },
    {
      items: t
    }
  ];
}
function nc(t, e, n, r) {
  const s = {};
  return e != null && e.sdk && (s.sdk = {
    name: e.sdk.name,
    version: e.sdk.version
  }), n && r && (s.dsn = Ft(r)), ct(s, [ec(t)]);
}
const rc = 1e3;
function sc(t) {
  var e;
  switch (typeof t) {
    case "number":
      return Number.isInteger(t) ? {
        value: t,
        type: "integer"
      } : {
        value: t,
        type: "double"
      };
    case "boolean":
      return {
        value: t,
        type: "boolean"
      };
    case "string":
      return {
        value: t,
        type: "string"
      };
    default: {
      let n = "";
      try {
        n = (e = JSON.stringify(t)) != null ? e : "";
      } catch (r) {
      }
      return {
        value: n,
        type: "string"
      };
    }
  }
}
function X(t, e, n, r = !0) {
  n && (r || !(e in t)) && (t[e] = n);
}
function oc(t, e) {
  const n = Zn(), r = fo(t);
  r === void 0 ? n.set(t, [e]) : r.length >= rc ? (lo(t, r), n.set(t, [e])) : n.set(t, [...r, e]);
}
function ic(t, e, n) {
  var l, _;
  const { release: r, environment: s } = e.getOptions(), o = f({}, t.attributes), {
    user: { id: i, email: a, username: c }
  } = uc(n);
  X(o, "user.id", i, !1), X(o, "user.email", a, !1), X(o, "user.name", c, !1), X(o, "sentry.release", r), X(o, "sentry.environment", s);
  const { name: u, version: d } = (_ = (l = e.getSdkMetadata()) == null ? void 0 : l.sdk) != null ? _ : {};
  X(o, "sentry.sdk.name", u), X(o, "sentry.sdk.version", d);
  const p = e.getIntegrationByName("Replay"), m = p == null ? void 0 : p.getReplayId(!0);
  return X(o, "sentry.replay_id", m), m && (p == null ? void 0 : p.getRecordingMode()) === "buffer" && X(o, "sentry._internal.replay_is_buffering", !0), E(f({}, t), {
    attributes: o
  });
}
function ac(t, e, n) {
  const r = {};
  for (const c in t.attributes)
    t.attributes[c] !== void 0 && (r[c] = sc(t.attributes[c]));
  const [, s] = ao(e, n), o = kt(n), i = o ? o.spanContext().traceId : s == null ? void 0 : s.trace_id, a = o ? o.spanContext().spanId : void 0;
  return {
    timestamp: Z(),
    trace_id: i != null ? i : "",
    span_id: a,
    name: t.name,
    type: t.type,
    unit: t.unit,
    value: t.value,
    attributes: r
  };
}
function cc(t, e) {
  var l, _, y, h;
  const n = (l = e == null ? void 0 : e.scope) != null ? l : k(), r = (_ = e == null ? void 0 : e.captureSerializedMetric) != null ? _ : oc, s = (y = n == null ? void 0 : n.getClient()) != null ? y : O();
  if (!s) {
    S && g.warn("No client available to capture metric.");
    return;
  }
  const { _experiments: o, enableMetrics: i, beforeSendMetric: a } = s.getOptions();
  if (!((h = i != null ? i : o == null ? void 0 : o.enableMetrics) != null ? h : !0)) {
    S && g.warn("metrics option not enabled, metric will not be captured.");
    return;
  }
  const u = ic(t, s, n);
  s.emit("processMetric", u);
  const d = a || (o == null ? void 0 : o.beforeSendMetric), p = d ? d(u) : u;
  if (!p) {
    S && g.log("`beforeSendMetric` returned `null`, will not send metric.");
    return;
  }
  const m = ac(p, s, n);
  S && g.log("[Metric]", m), r(s, m), s.emit("afterCaptureMetric", p);
}
function lo(t, e) {
  var o;
  const n = (o = e != null ? e : fo(t)) != null ? o : [];
  if (n.length === 0)
    return;
  const r = t.getOptions(), s = nc(n, r._metadata, r.tunnel, t.getDsn());
  Zn().set(t, []), t.emit("flushMetrics"), t.sendEnvelope(s);
}
function fo(t) {
  return Zn().get(t);
}
function uc(t) {
  const e = jn().getScopeData();
  return Ct(e, $().getScopeData()), Ct(e, t.getScopeData()), e;
}
function Zn() {
  return Pt("clientToMetricBufferMap", () => /* @__PURE__ */ new WeakMap());
}
const Qn = Symbol.for("SentryBufferFullError");
function po(t = 100) {
  const e = /* @__PURE__ */ new Set();
  function n() {
    return e.size < t;
  }
  function r(i) {
    e.delete(i);
  }
  function s(i) {
    if (!n())
      return Kn(Qn);
    const a = i();
    return e.add(a), a.then(
      () => r(a),
      () => r(a)
    ), a;
  }
  function o(i) {
    if (!e.size)
      return jt(!0);
    const a = Promise.allSettled(Array.from(e)).then(() => !0);
    if (!i)
      return a;
    const c = [a, new Promise((u) => setTimeout(() => u(!1), i))];
    return Promise.race(c);
  }
  return {
    get $() {
      return Array.from(e);
    },
    add: s,
    drain: o
  };
}
const lc = 60 * 1e3;
function fc(t, e = Date.now()) {
  const n = parseInt(`${t}`, 10);
  if (!isNaN(n))
    return n * 1e3;
  const r = Date.parse(`${t}`);
  return isNaN(r) ? lc : r - e;
}
function pc(t, e) {
  return t[e] || t.all || 0;
}
function dc(t, e, n = Date.now()) {
  return pc(t, e) > n;
}
function mc(t, { statusCode: e, headers: n }, r = Date.now()) {
  const s = f({}, t), o = n == null ? void 0 : n["x-sentry-rate-limits"], i = n == null ? void 0 : n["retry-after"];
  if (o)
    for (const a of o.trim().split(",")) {
      const [c, u, , , d] = a.split(":", 5), p = parseInt(c, 10), m = (isNaN(p) ? 60 : p) * 1e3;
      if (!u)
        s.all = r + m;
      else
        for (const l of u.split(";"))
          l === "metric_bucket" ? (!d || d.split(";").includes("custom")) && (s[l] = r + m) : s[l] = r + m;
    }
  else i ? s.all = r + fc(i, r) : e === 429 && (s.all = r + 60 * 1e3);
  return s;
}
const mo = 64;
function _c(t, e, n = po(
  t.bufferSize || mo
)) {
  let r = {};
  const s = (i) => n.drain(i);
  function o(i) {
    const a = [];
    if (Qt(i, (p, m) => {
      const l = Dr(m);
      dc(r, l) ? t.recordDroppedEvent("ratelimit_backoff", l) : a.push(p);
    }), a.length === 0)
      return Promise.resolve({});
    const c = ct(i[0], a), u = (p) => {
      Qt(c, (m, l) => {
        t.recordDroppedEvent(p, Dr(l));
      });
    }, d = () => e({ body: ta(c) }).then(
      (p) => (p.statusCode !== void 0 && (p.statusCode < 200 || p.statusCode >= 300) && S && g.warn(`Sentry responded with status code ${p.statusCode} to sent event.`), r = mc(r, p), p),
      (p) => {
        throw u("network_error"), S && g.error("Encountered error running transport request:", p), p;
      }
    );
    return n.add(d).then(
      (p) => p,
      (p) => {
        if (p === Qn)
          return S && g.error("Skipped sending event because buffer is full."), u("queue_overflow"), Promise.resolve({});
        throw p;
      }
    );
  }
  return {
    send: o,
    flush: s
  };
}
function gc(t, e, n) {
  const r = [
    { type: "client_report" },
    {
      timestamp: te(),
      discarded_events: t
    }
  ];
  return ct(e ? { dsn: e } : {}, [r]);
}
function _o(t) {
  const e = [];
  t.message && e.push(t.message);
  try {
    const n = t.exception.values[t.exception.values.length - 1];
    n != null && n.value && (e.push(n.value), n.type && e.push(`${n.type}: ${n.value}`));
  } catch (n) {
  }
  return e;
}
function hc(t) {
  var c, u, d;
  const { trace_id: e, parent_span_id: n, span_id: r, status: s, origin: o, data: i, op: a } = (u = (c = t.contexts) == null ? void 0 : c.trace) != null ? u : {};
  return {
    data: i != null ? i : {},
    description: t.transaction,
    op: a,
    parent_span_id: n,
    span_id: r != null ? r : "",
    start_timestamp: (d = t.start_timestamp) != null ? d : 0,
    status: s,
    timestamp: t.timestamp,
    trace_id: e != null ? e : "",
    origin: o,
    profile_id: i == null ? void 0 : i[Bn],
    exclusive_time: i == null ? void 0 : i[Gn],
    measurements: t.measurements,
    is_segment: !0
  };
}
function yc(t) {
  return {
    type: "transaction",
    timestamp: t.timestamp,
    start_timestamp: t.start_timestamp,
    transaction: t.description,
    contexts: {
      trace: {
        trace_id: t.trace_id,
        span_id: t.span_id,
        parent_span_id: t.parent_span_id,
        op: t.op,
        status: t.status,
        origin: t.origin,
        data: f(f(f({}, t.data), t.profile_id && { [Bn]: t.profile_id }), t.exclusive_time && { [Gn]: t.exclusive_time })
      }
    },
    measurements: t.measurements
  };
}
const Kr = "Not capturing exception because it's already been captured.", Xr = "Discarded session because of missing or non-string release", go = Symbol.for("SentryInternalError"), ho = Symbol.for("SentryDoNotSendEventError"), Sc = 5e3;
function Te(t) {
  return {
    message: t,
    [go]: !0
  };
}
function hn(t) {
  return {
    message: t,
    [ho]: !0
  };
}
function Zr(t) {
  return !!t && typeof t == "object" && go in t;
}
function Qr(t) {
  return !!t && typeof t == "object" && ho in t;
}
function ts(t, e, n, r, s) {
  let o = 0, i, a = !1;
  t.on(n, () => {
    o = 0, clearTimeout(i), a = !1;
  }), t.on(e, (c) => {
    o += r(c), o >= 8e5 ? s(t) : a || (a = !0, i = setTimeout(() => {
      s(t);
    }, Sc));
  }), t.on("flush", () => {
    s(t);
  });
}
class Ec {
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
  constructor(e) {
    var r, s, o, i, a, c, u;
    if (this._options = e, this._integrations = {}, this._numProcessing = 0, this._outcomes = {}, this._hooks = {}, this._eventProcessors = [], this._promiseBuffer = po((s = (r = e.transportOptions) == null ? void 0 : r.bufferSize) != null ? s : mo), e.dsn ? this._dsn = Bi(e.dsn) : S && g.warn("No DSN provided, client will not send events."), this._dsn) {
      const d = oo(
        this._dsn,
        e.tunnel,
        e._metadata ? e._metadata.sdk : void 0
      );
      this._transport = e.transport(E(f({
        tunnel: this._options.tunnel,
        recordDroppedEvent: this.recordDroppedEvent.bind(this)
      }, e.transportOptions), {
        url: d
      }));
    }
    this._options.enableLogs = (i = this._options.enableLogs) != null ? i : (o = this._options._experiments) == null ? void 0 : o.enableLogs, this._options.enableLogs && ts(this, "afterCaptureLog", "flushLogs", Ac, co), ((u = (c = this._options.enableMetrics) != null ? c : (a = this._options._experiments) == null ? void 0 : a.enableMetrics) != null ? u : !0) && ts(
      this,
      "afterCaptureMetric",
      "flushMetrics",
      Ic,
      lo
    );
  }
  /**
   * Captures an exception event and sends it to Sentry.
   *
   * Unlike `captureException` exported from every SDK, this method requires that you pass it the current scope.
   */
  captureException(e, n, r) {
    const s = q();
    if (Rr(e))
      return S && g.log(Kr), s;
    const o = f({
      event_id: s
    }, n);
    return this._process(
      () => this.eventFromException(e, o).then((i) => this._captureEvent(i, o, r)).then((i) => i),
      "error"
    ), o.event_id;
  }
  /**
   * Captures a message event and sends it to Sentry.
   *
   * Unlike `captureMessage` exported from every SDK, this method requires that you pass it the current scope.
   */
  captureMessage(e, n, r, s) {
    const o = f({
      event_id: q()
    }, r), i = We(e) ? e : String(e), a = Un(e), c = a ? this.eventFromMessage(i, n, o) : this.eventFromException(e, o);
    return this._process(
      () => c.then((u) => this._captureEvent(u, o, s)),
      a ? "unknown" : "error"
    ), o.event_id;
  }
  /**
   * Captures a manually created event and sends it to Sentry.
   *
   * Unlike `captureEvent` exported from every SDK, this method requires that you pass it the current scope.
   */
  captureEvent(e, n, r) {
    const s = q();
    if (n != null && n.originalException && Rr(n.originalException))
      return S && g.log(Kr), s;
    const o = f({
      event_id: s
    }, n), i = e.sdkProcessingMetadata || {}, a = i.capturedSpanScope, c = i.capturedSpanIsolationScope, u = es(e.type);
    return this._process(
      () => this._captureEvent(e, o, a || r, c),
      u
    ), o.event_id;
  }
  /**
   * Captures a session.
   */
  captureSession(e) {
    this.sendSession(e), bn(e, { init: !1 });
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
  flush(e) {
    return D(this, null, function* () {
      const n = this._transport;
      if (!n)
        return !0;
      this.emit("flush");
      const r = yield this._isClientDoneProcessing(e), s = yield n.flush(e);
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
  close(e) {
    return D(this, null, function* () {
      const n = yield this.flush(e);
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
  addEventProcessor(e) {
    this._eventProcessors.push(e);
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
    this._options.integrations.some(({ name: e }) => e.startsWith("Spotlight"))) && this._setupIntegrations();
  }
  /**
   * Gets an installed integration by its name.
   *
   * @returns {Integration|undefined} The installed integration or `undefined` if no integration with that `name` was installed.
   */
  getIntegrationByName(e) {
    return this._integrations[e];
  }
  /**
   * Add an integration to the client.
   * This can be used to e.g. lazy load integrations.
   * In most cases, this should not be necessary,
   * and you're better off just passing the integrations via `integrations: []` at initialization time.
   * However, if you find the need to conditionally load & add an integration, you can use `addIntegration` to do so.
   */
  addIntegration(e) {
    const n = this._integrations[e.name];
    io(this, e, this._integrations), n || Vr(this, [e]);
  }
  /**
   * Send a fully prepared event to Sentry.
   */
  sendEvent(e, n = {}) {
    this.emit("beforeSendEvent", e, n);
    let r = ca(e, this._dsn, this._options._metadata, this._options.tunnel);
    for (const s of n.attachments || [])
      r = Qi(r, ra(s));
    this.sendEnvelope(r).then((s) => this.emit("afterSendEvent", e, s));
  }
  /**
   * Send a session or session aggregrates to Sentry.
   */
  sendSession(e) {
    const { release: n, environment: r = Wn } = this._options;
    if ("aggregates" in e) {
      const o = e.attrs || {};
      if (!o.release && !n) {
        S && g.warn(Xr);
        return;
      }
      o.release = o.release || n, o.environment = o.environment || r, e.attrs = o;
    } else {
      if (!e.release && !n) {
        S && g.warn(Xr);
        return;
      }
      e.release = e.release || n, e.environment = e.environment || r;
    }
    this.emit("beforeSendSession", e);
    const s = aa(e, this._dsn, this._options._metadata, this._options.tunnel);
    this.sendEnvelope(s);
  }
  /**
   * Record on the client that an event got dropped (ie, an event that will not be sent to Sentry).
   */
  recordDroppedEvent(e, n, r = 1) {
    if (this._options.sendClientReports) {
      const s = `${e}:${n}`;
      S && g.log(`Recording outcome: "${s}"${r > 1 ? ` (${r} times)` : ""}`), this._outcomes[s] = (this._outcomes[s] || 0) + r;
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
  on(e, n) {
    const r = this._hooks[e] = this._hooks[e] || /* @__PURE__ */ new Set(), s = (...o) => n(...o);
    return r.add(s), () => {
      r.delete(s);
    };
  }
  /** Fire a hook whenever a span starts. */
  /**
   * Emit a hook that was previously registered via `on()`.
   */
  emit(e, ...n) {
    const r = this._hooks[e];
    r && r.forEach((s) => s(...n));
  }
  /**
   * Send an envelope to Sentry.
   */
  // @ts-expect-error - PromiseLike is a subset of Promise
  sendEnvelope(e) {
    return D(this, null, function* () {
      if (this.emit("beforeEnvelope", e), this._isEnabled() && this._transport)
        try {
          return yield this._transport.send(e);
        } catch (n) {
          return S && g.error("Error while sending envelope:", n), {};
        }
      return S && g.error("Transport disabled"), {};
    });
  }
  /* eslint-enable @typescript-eslint/unified-signatures */
  /** Setup integrations for this client. */
  _setupIntegrations() {
    const { integrations: e } = this._options;
    this._integrations = za(this, e), Vr(this, e);
  }
  /** Updates existing session based on the provided event */
  _updateSessionFromEvent(e, n) {
    var c, u;
    let r = n.level === "fatal", s = !1;
    const o = (c = n.exception) == null ? void 0 : c.values;
    if (o) {
      s = !0, r = !1;
      for (const d of o)
        if (((u = d.mechanism) == null ? void 0 : u.handled) === !1) {
          r = !0;
          break;
        }
    }
    const i = e.status === "ok";
    (i && e.errors === 0 || i && r) && (bn(e, E(f({}, r && { status: "crashed" }), {
      errors: e.errors || Number(s || r)
    })), this.captureSession(e));
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
  _isClientDoneProcessing(e) {
    return D(this, null, function* () {
      let n = 0;
      for (; !e || n < e; ) {
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
  _prepareEvent(e, n, r, s) {
    const o = this.getOptions(), i = Object.keys(this._integrations);
    return !n.integrations && (i != null && i.length) && (n.integrations = i), this.emit("preprocessEvent", e, n), e.type || s.setLastEventId(e.event_id || n.event_id), wa(o, e, n, r, this, s).then((a) => {
      if (a === null)
        return a;
      this.emit("postprocessEvent", a, n), a.contexts = f({
        trace: Ls(r)
      }, a.contexts);
      const c = Zs(this, r);
      return a.sdkProcessingMetadata = f({
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
  _captureEvent(e, n = {}, r = k(), s = $()) {
    return S && kn(e) && g.log(`Captured error event \`${_o(e)[0] || "<unknown>"}\``), this._processEvent(e, n, r, s).then(
      (o) => o.event_id,
      (o) => {
        S && (Qr(o) ? g.log(o.message) : Zr(o) ? g.warn(o.message) : g.warn(o));
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
  _processEvent(e, n, r, s) {
    const o = this.getOptions(), { sampleRate: i } = o, a = yo(e), c = kn(e), d = `before send for type \`${e.type || "error"}\``, p = typeof i == "undefined" ? void 0 : Hn(i);
    if (c && typeof p == "number" && Math.random() > p)
      return this.recordDroppedEvent("sample_rate", "error"), Kn(
        hn(
          `Discarding event because it's not included in the random sample (sampling rate = ${i})`
        )
      );
    const m = es(e.type);
    return this._prepareEvent(e, n, r, s).then((l) => {
      if (l === null)
        throw this.recordDroppedEvent("event_processor", m), hn("An event processor returned `null`, will not send event.");
      if (n.data && n.data.__sentry__ === !0)
        return l;
      const y = Tc(this, o, l, n);
      return bc(y, d);
    }).then((l) => {
      var h;
      if (l === null) {
        if (this.recordDroppedEvent("before_send", m), a) {
          const R = 1 + (e.spans || []).length;
          this.recordDroppedEvent("before_send", "span", R);
        }
        throw hn(`${d} returned \`null\`, will not send event.`);
      }
      const _ = r.getSession() || s.getSession();
      if (c && _ && this._updateSessionFromEvent(_, l), a) {
        const I = ((h = l.sdkProcessingMetadata) == null ? void 0 : h.spanCountBeforeProcessing) || 0, R = l.spans ? l.spans.length : 0, w = I - R;
        w > 0 && this.recordDroppedEvent("before_send", "span", w);
      }
      const y = l.transaction_info;
      if (a && y && l.transaction !== e.transaction) {
        const I = "custom";
        l.transaction_info = E(f({}, y), {
          source: I
        });
      }
      return this.sendEvent(l, n), l;
    }).then(null, (l) => {
      throw Qr(l) || Zr(l) ? l : (this.captureException(l, {
        mechanism: {
          handled: !1,
          type: "internal"
        },
        data: {
          __sentry__: !0
        },
        originalException: l
      }), Te(
        `Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.
Reason: ${l}`
      ));
    });
  }
  /**
   * Occupies the client with processing and event
   */
  _process(e, n) {
    this._numProcessing++, this._promiseBuffer.add(e).then(
      (r) => (this._numProcessing--, r),
      (r) => (this._numProcessing--, r === Qn && this.recordDroppedEvent("queue_overflow", n), r)
    );
  }
  /**
   * Clears outcomes on this client and returns them.
   */
  _clearOutcomes() {
    const e = this._outcomes;
    return this._outcomes = {}, Object.entries(e).map(([n, r]) => {
      const [s, o] = n.split(":");
      return {
        reason: s,
        category: o,
        quantity: r
      };
    });
  }
  /**
   * Sends client reports as an envelope.
   */
  _flushOutcomes() {
    S && g.log("Flushing outcomes...");
    const e = this._clearOutcomes();
    if (e.length === 0) {
      S && g.log("No outcomes to send");
      return;
    }
    if (!this._dsn) {
      S && g.log("No dsn provided, will not send outcomes");
      return;
    }
    S && g.log("Sending outcomes:", e);
    const n = gc(e, this._options.tunnel && Ft(this._dsn));
    this.sendEnvelope(n);
  }
  /**
   * Creates an {@link Event} from all inputs to `captureException` and non-primitive inputs to `captureMessage`.
   */
}
function es(t) {
  return t === "replay_event" ? "replay" : t || "error";
}
function bc(t, e) {
  const n = `${e} must return \`null\` or a valid event.`;
  if ($t(t))
    return t.then(
      (r) => {
        if (!gt(r) && r !== null)
          throw Te(n);
        return r;
      },
      (r) => {
        throw Te(`${e} rejected with ${r}`);
      }
    );
  if (!gt(t) && t !== null)
    throw Te(n);
  return t;
}
function Tc(t, e, n, r) {
  const { beforeSend: s, beforeSendTransaction: o, beforeSendSpan: i, ignoreSpans: a } = e;
  let c = n;
  if (kn(c) && s)
    return s(c, r);
  if (yo(c)) {
    if (i || a) {
      const u = hc(c);
      if (a != null && a.length && ke(u, a))
        return null;
      if (i) {
        const d = i(u);
        d ? c = ee(n, yc(d)) : An();
      }
      if (c.spans) {
        const d = [], p = c.spans;
        for (const l of p) {
          if (a != null && a.length && ke(l, a)) {
            Ji(p, l);
            continue;
          }
          if (i) {
            const _ = i(l);
            _ ? d.push(_) : (An(), d.push(l));
          } else
            d.push(l);
        }
        const m = c.spans.length - d.length;
        m && t.recordDroppedEvent("before_send", "span", m), c.spans = d;
      }
    }
    if (o) {
      if (c.spans) {
        const u = c.spans.length;
        c.sdkProcessingMetadata = E(f({}, n.sdkProcessingMetadata), {
          spanCountBeforeProcessing: u
        });
      }
      return o(c, r);
    }
  }
  return c;
}
function kn(t) {
  return t.type === void 0;
}
function yo(t) {
  return t.type === "transaction";
}
function Ic(t) {
  let e = 0;
  return t.name && (e += t.name.length * 2), e += 8, e + So(t.attributes);
}
function Ac(t) {
  let e = 0;
  return t.message && (e += t.message.length * 2), e + So(t.attributes);
}
function So(t) {
  if (!t)
    return 0;
  let e = 0;
  return Object.values(t).forEach((n) => {
    Array.isArray(n) ? e += n.length * ns(n[0]) : Un(n) ? e += ns(n) : e += 100;
  }), e;
}
function ns(t) {
  return typeof t == "string" ? t.length * 2 : typeof t == "number" ? 8 : typeof t == "boolean" ? 4 : 0;
}
function Nc(t, e) {
  e.debug === !0 && (S ? g.enable() : xt(() => {
    console.warn("[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle.");
  })), k().update(e.initialScope);
  const r = new t(e);
  return Rc(r), r.init(), r;
}
function Rc(t) {
  k().setClient(t);
}
function Eo(t, e) {
  let n;
  return Qt(t, (r, s) => (e.includes(s) && (n = Array.isArray(r) ? r[1] : void 0), !!n)), n;
}
function Oc(t, e) {
  return (n) => {
    const r = t(n);
    return E(f({}, r), {
      send: (s) => D(null, null, function* () {
        const o = Eo(s, ["event", "transaction", "profile", "replay_event"]);
        return o && (o.release = e), r.send(s);
      })
    });
  };
}
function kc(t, e) {
  return ct(
    e ? E(f({}, t[0]), {
      dsn: e
    }) : t[0],
    t[1]
  );
}
function gp(t, e) {
  return (n) => {
    const r = t(n), s = /* @__PURE__ */ new Map();
    function o(c, u) {
      const d = u ? `${c}:${u}` : c;
      let p = s.get(d);
      if (!p) {
        const m = Hs(c);
        if (!m)
          return;
        const l = oo(m, n.tunnel);
        p = u ? Oc(t, u)(E(f({}, n), { url: l })) : t(E(f({}, n), { url: l })), s.set(d, p);
      }
      return [c, p];
    }
    function i(c) {
      return D(this, null, function* () {
        function u(l) {
          const _ = l != null && l.length ? l : ["event"];
          return Eo(c, _);
        }
        const d = e({ envelope: c, getEvent: u }).map((l) => typeof l == "string" ? o(l, void 0) : o(l.dsn, l.release)).filter((l) => !!l), p = d.length ? d : [["", r]];
        return (yield Promise.all(
          p.map(([l, _]) => _.send(kc(c, l)))
        ))[0];
      });
    }
    function a(c) {
      return D(this, null, function* () {
        const u = [...s.values(), r];
        return (yield Promise.all(u.map((p) => p.flush(c)))).every((p) => p);
      });
    }
    return {
      send: i,
      flush: a
    };
  };
}
function Mc(t, ...e) {
  const n = new String(String.raw(t, ...e));
  return n.__sentry_template_string__ = t.join("\0").replace(/%/g, "%%").replace(/\0/g, "%s"), n.__sentry_template_values__ = e, n;
}
const vc = Mc;
function Cc(t, e, n = [e], r = "npm") {
  const s = t._metadata || {};
  s.sdk || (s.sdk = {
    name: `sentry.javascript.${e}`,
    packages: n.map((o) => ({
      name: `${r}:@sentry/${o}`,
      version: lt
    })),
    version: lt
  }), t._metadata = s;
}
const wc = 100;
function Pc(t, e) {
  const n = O(), r = $();
  if (!n) return;
  const { beforeBreadcrumb: s = null, maxBreadcrumbs: o = wc } = n.getOptions();
  if (o <= 0) return;
  const i = te(), a = f({ timestamp: i }, t), c = s ? xt(() => s(a, e)) : a;
  c !== null && (n.emit && n.emit("beforeAddBreadcrumb", c, e), r.addBreadcrumb(c, o));
}
let rs;
const xc = "FunctionToString", ss = /* @__PURE__ */ new WeakMap(), Dc = (() => ({
  name: xc,
  setupOnce() {
    rs = Function.prototype.toString;
    try {
      Function.prototype.toString = function(...t) {
        const e = Ps(this), n = ss.has(O()) && e !== void 0 ? e : this;
        return rs.apply(n, t);
      };
    } catch (t) {
    }
  },
  setup(t) {
    ss.set(t, !0);
  }
})), $c = Dc, Lc = [
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
], Fc = "EventFilters", Uc = (t = {}) => {
  let e;
  return {
    name: Fc,
    setup(n) {
      const r = n.getOptions();
      e = os(t, r);
    },
    processEvent(n, r, s) {
      if (!e) {
        const o = s.getOptions();
        e = os(t, o);
      }
      return Bc(n, e) ? null : n;
    }
  };
}, jc = ((t = {}) => E(f({}, Uc(t)), {
  name: "InboundFilters"
}));
function os(t = {}, e = {}) {
  return {
    allowUrls: [...t.allowUrls || [], ...e.allowUrls || []],
    denyUrls: [...t.denyUrls || [], ...e.denyUrls || []],
    ignoreErrors: [
      ...t.ignoreErrors || [],
      ...e.ignoreErrors || [],
      ...t.disableErrorDefaults ? [] : Lc
    ],
    ignoreTransactions: [...t.ignoreTransactions || [], ...e.ignoreTransactions || []]
  };
}
function Bc(t, e) {
  if (t.type) {
    if (t.type === "transaction" && Hc(t, e.ignoreTransactions))
      return S && g.warn(
        `Event dropped due to being matched by \`ignoreTransactions\` option.
Event: ${Nt(t)}`
      ), !0;
  } else {
    if (Gc(t, e.ignoreErrors))
      return S && g.warn(
        `Event dropped due to being matched by \`ignoreErrors\` option.
Event: ${Nt(t)}`
      ), !0;
    if (zc(t))
      return S && g.warn(
        `Event dropped due to not having an error message, error type or stacktrace.
Event: ${Nt(
          t
        )}`
      ), !0;
    if (qc(t, e.denyUrls))
      return S && g.warn(
        `Event dropped due to being matched by \`denyUrls\` option.
Event: ${Nt(
          t
        )}.
Url: ${Ce(t)}`
      ), !0;
    if (!Wc(t, e.allowUrls))
      return S && g.warn(
        `Event dropped due to not being matched by \`allowUrls\` option.
Event: ${Nt(
          t
        )}.
Url: ${Ce(t)}`
      ), !0;
  }
  return !1;
}
function Gc(t, e) {
  return e != null && e.length ? _o(t).some((n) => Ye(n, e)) : !1;
}
function Hc(t, e) {
  if (!(e != null && e.length))
    return !1;
  const n = t.transaction;
  return n ? Ye(n, e) : !1;
}
function qc(t, e) {
  if (!(e != null && e.length))
    return !1;
  const n = Ce(t);
  return n ? Ye(n, e) : !1;
}
function Wc(t, e) {
  if (!(e != null && e.length))
    return !0;
  const n = Ce(t);
  return n ? Ye(n, e) : !0;
}
function Jc(t = []) {
  for (let e = t.length - 1; e >= 0; e--) {
    const n = t[e];
    if (n && n.filename !== "<anonymous>" && n.filename !== "[native code]")
      return n.filename || null;
  }
  return null;
}
function Ce(t) {
  var e, n, r;
  try {
    const s = [...(n = (e = t.exception) == null ? void 0 : e.values) != null ? n : []].reverse().find((i) => {
      var a, c, u;
      return ((a = i.mechanism) == null ? void 0 : a.parent_id) === void 0 && ((u = (c = i.stacktrace) == null ? void 0 : c.frames) == null ? void 0 : u.length);
    }), o = (r = s == null ? void 0 : s.stacktrace) == null ? void 0 : r.frames;
    return o ? Jc(o) : null;
  } catch (s) {
    return S && g.error(`Cannot extract url for event ${Nt(t)}`), null;
  }
}
function zc(t) {
  var e, n;
  return (n = (e = t.exception) == null ? void 0 : e.values) != null && n.length ? (
    // No top-level message
    !t.message && // There are no exception values that have a stacktrace, a non-generic-Error type or value
    !t.exception.values.some((r) => r.stacktrace || r.type && r.type !== "Error" || r.value)
  ) : !1;
}
const bo = /* @__PURE__ */ new Map(), is = /* @__PURE__ */ new Set();
function Yc(t) {
  if (b._sentryModuleMetadata)
    for (const e of Object.keys(b._sentryModuleMetadata)) {
      const n = b._sentryModuleMetadata[e];
      if (is.has(e))
        continue;
      is.add(e);
      const r = t(e);
      for (const s of r.reverse())
        if (s.filename) {
          bo.set(s.filename, n);
          break;
        }
    }
}
function Vc(t, e) {
  return Yc(t), bo.get(e);
}
function To(t, e) {
  var n, r;
  (r = (n = e.exception) == null ? void 0 : n.values) == null || r.forEach((s) => {
    var o, i;
    (i = (o = s.stacktrace) == null ? void 0 : o.frames) == null || i.forEach((a) => {
      if (!a.filename || a.module_metadata)
        return;
      const c = Vc(t, a.filename);
      c && (a.module_metadata = c);
    });
  });
}
function Io(t) {
  var e, n;
  (n = (e = t.exception) == null ? void 0 : e.values) == null || n.forEach((r) => {
    var s, o;
    (o = (s = r.stacktrace) == null ? void 0 : s.frames) == null || o.forEach((i) => {
      delete i.module_metadata;
    });
  });
}
const hp = () => ({
  name: "ModuleMetadata",
  setup(t) {
    t.on("beforeEnvelope", (e) => {
      Qt(e, (n, r) => {
        if (r === "event") {
          const s = Array.isArray(n) ? n[1] : void 0;
          s && (Io(s), n[1] = s);
        }
      });
    }), t.on("applyFrameMetadata", (e) => {
      if (e.type)
        return;
      const n = t.getOptions().stackParser;
      To(n, e);
    });
  }
});
function Ao(t) {
  const e = "console";
  $n(e, t), Ln(e, Kc);
}
function Kc() {
  "console" in b && Pn.forEach(function(t) {
    t in b.console && At(b.console, t, function(e) {
      return Ae[t] = e, function(...n) {
        Fn("console", { args: n, level: t });
        const s = Ae[t];
        s == null || s.apply(b.console, n);
      };
    });
  });
}
function as(t) {
  return t === "warn" ? "warning" : ["fatal", "error", "warning", "log", "info", "debug"].includes(t) ? t : "log";
}
const Xc = "CaptureConsole", Zc = ((t = {}) => {
  var r;
  const e = t.levels || Pn, n = (r = t.handled) != null ? r : !0;
  return {
    name: Xc,
    setup(s) {
      "console" in b && Ao(({ args: o, level: i }) => {
        O() !== s || !e.includes(i) || Qc(o, i, n);
      });
    }
  };
}), yp = Zc;
function Qc(t, e, n) {
  const r = as(e), s = new Error(), o = {
    level: as(e),
    extra: {
      arguments: t
    }
  };
  at((i) => {
    if (i.addEventProcessor((u) => (u.logger = "console", st(u, {
      handled: n,
      type: "auto.core.capture_console"
    }), u)), e === "assert") {
      if (!t[0]) {
        const u = `Assertion failed: ${Nr(t.slice(1), " ") || "console.assert"}`;
        i.setExtra("arguments", t.slice(1)), i.captureMessage(u, r, { captureContext: o, syntheticException: s });
      }
      return;
    }
    const a = t.find((u) => u instanceof Error);
    if (a) {
      P(a, o);
      return;
    }
    const c = Nr(t, " ");
    i.captureMessage(c, r, { captureContext: o, syntheticException: s });
  });
}
const tu = "ExtraErrorData", eu = ((t = {}) => {
  const { depth: e = 3, captureErrorCause: n = !0 } = t;
  return {
    name: tu,
    processEvent(r, s, o) {
      const { maxValueLength: i } = o.getOptions();
      return nu(r, s, e, n, i);
    }
  };
}), Sp = eu;
function nu(t, e = {}, n, r, s) {
  if (!e.originalException || !ft(e.originalException))
    return t;
  const o = e.originalException.name || e.originalException.constructor.name, i = No(e.originalException, r, s);
  if (i) {
    const a = f({}, t.contexts), c = F(i, n);
    return gt(c) && (G(c, "__sentry_skip_normalization__", !0), a[o] = c), E(f({}, t), {
      contexts: a
    });
  }
  return t;
}
function No(t, e, n) {
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
    for (const o of Object.keys(t)) {
      if (r.indexOf(o) !== -1)
        continue;
      const i = t[o];
      s[o] = ft(i) || typeof i == "string" ? n ? Xt(`${i}`, n) : `${i}` : i;
    }
    if (e && t.cause !== void 0)
      if (ft(t.cause)) {
        const o = t.cause.name || t.cause.constructor.name;
        s.cause = { [o]: No(t.cause, !1, n) };
      } else
        s.cause = t.cause;
    if (typeof t.toJSON == "function") {
      const o = t.toJSON();
      for (const i of Object.keys(o)) {
        const a = o[i];
        s[i] = ft(a) ? a.toString() : a;
      }
    }
    return s;
  } catch (r) {
    S && g.error("Unable to extract extra data from the Error object:", r);
  }
  return null;
}
function ru(t, e) {
  let n = 0;
  for (let r = t.length - 1; r >= 0; r--) {
    const s = t[r];
    s === "." ? t.splice(r, 1) : s === ".." ? (t.splice(r, 1), n++) : n && (t.splice(r, 1), n--);
  }
  if (e)
    for (; n--; n)
      t.unshift("..");
  return t;
}
const su = /^(\S+:\\|\/?)([\s\S]*?)((?:\.{1,2}|[^/\\]+?|)(\.[^./\\]*|))(?:[/\\]*)$/;
function ou(t) {
  const e = t.length > 1024 ? `<truncated>${t.slice(-1024)}` : t, n = su.exec(e);
  return n ? n.slice(1) : [];
}
function cs(...t) {
  let e = "", n = !1;
  for (let r = t.length - 1; r >= -1 && !n; r--) {
    const s = r >= 0 ? t[r] : "/";
    s && (e = `${s}/${e}`, n = s.charAt(0) === "/");
  }
  return e = ru(
    e.split("/").filter((r) => !!r),
    !n
  ).join("/"), (n ? "/" : "") + e || ".";
}
function us(t) {
  let e = 0;
  for (; e < t.length && t[e] === ""; e++)
    ;
  let n = t.length - 1;
  for (; n >= 0 && t[n] === ""; n--)
    ;
  return e > n ? [] : t.slice(e, n - e + 1);
}
function iu(t, e) {
  t = cs(t).slice(1), e = cs(e).slice(1);
  const n = us(t.split("/")), r = us(e.split("/")), s = Math.min(n.length, r.length);
  let o = s;
  for (let a = 0; a < s; a++)
    if (n[a] !== r[a]) {
      o = a;
      break;
    }
  let i = [];
  for (let a = o; a < n.length; a++)
    i.push("..");
  return i = i.concat(r.slice(o)), i.join("/");
}
function au(t, e) {
  return ou(t)[2] || "";
}
const cu = "RewriteFrames", Ep = (t = {}) => {
  const e = t.root, n = t.prefix || "app:///", r = "window" in b && !!b.window, s = t.iteratee || uu({ isBrowser: r, root: e, prefix: n });
  function o(a) {
    try {
      return E(f({}, a), {
        exception: E(f({}, a.exception), {
          // The check for this is performed inside `process` call itself, safe to skip here
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          values: a.exception.values.map((c) => f(f({}, c), c.stacktrace && { stacktrace: i(c.stacktrace) }))
        })
      });
    } catch (c) {
      return a;
    }
  }
  function i(a) {
    var c;
    return E(f({}, a), {
      frames: (c = a == null ? void 0 : a.frames) == null ? void 0 : c.map((u) => s(u))
    });
  }
  return {
    name: cu,
    processEvent(a) {
      let c = a;
      return a.exception && Array.isArray(a.exception.values) && (c = o(c)), c;
    }
  };
};
function uu({
  isBrowser: t,
  root: e,
  prefix: n
}) {
  return (r) => {
    if (!r.filename)
      return r;
    const s = /^[a-zA-Z]:\\/.test(r.filename) || // or the presence of a backslash without a forward slash (which are not allowed on Windows)
    r.filename.includes("\\") && !r.filename.includes("/"), o = /^\//.test(r.filename);
    if (t) {
      if (e) {
        const i = r.filename;
        i.indexOf(e) === 0 && (r.filename = i.replace(e, n));
      }
    } else if (s || o) {
      const i = s ? r.filename.replace(/^[a-zA-Z]:/, "").replace(/\\/g, "/") : r.filename, a = e ? iu(e, i) : au(i);
      r.filename = `${n}${a}`;
    }
    return r;
  };
}
const lu = [
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
], fu = [
  "createUser",
  "deleteUser",
  "listUsers",
  "getUserById",
  "updateUserById",
  "inviteUserByEmail"
], pu = {
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
}, Ro = ["select", "insert", "upsert", "update", "delete"];
function en(t) {
  try {
    t.__SENTRY_INSTRUMENTED__ = !0;
  } catch (e) {
  }
}
function nn(t) {
  try {
    return t.__SENTRY_INSTRUMENTED__;
  } catch (e) {
    return !1;
  }
}
function du(t, e = {}) {
  var n;
  switch (t) {
    case "GET":
      return "select";
    case "POST":
      return (n = e.Prefer) != null && n.includes("resolution=") ? "upsert" : "insert";
    case "PATCH":
      return "update";
    case "DELETE":
      return "delete";
    default:
      return "<unknown-op>";
  }
}
function mu(t, e) {
  if (e === "" || e === "*")
    return "select(*)";
  if (t === "select")
    return `select(${e})`;
  if (t === "or" || t.endsWith(".or"))
    return `${t}${e}`;
  const [n, ...r] = e.split(".");
  let s;
  return n != null && n.startsWith("fts") ? s = "textSearch" : n != null && n.startsWith("plfts") ? s = "textSearch[plain]" : n != null && n.startsWith("phfts") ? s = "textSearch[phrase]" : n != null && n.startsWith("wfts") ? s = "textSearch[websearch]" : s = n && pu[n] || "filter", `${s}(${t}, ${r.join(".")})`;
}
function ls(t, e = !1) {
  return new Proxy(t, {
    apply(n, r, s) {
      return re(
        {
          name: `auth ${e ? "(admin) " : ""}${t.name}`,
          attributes: {
            [z]: "auto.db.supabase",
            [Zt]: "db",
            "db.system": "postgresql",
            "db.operation": `auth.${e ? "admin." : ""}${t.name}`
          }
        },
        (o) => Reflect.apply(n, r, s).then((i) => (i && typeof i == "object" && "error" in i && i.error ? (o.setStatus({ code: N }), P(i.error, {
          mechanism: {
            handled: !1,
            type: "auto.db.supabase.auth"
          }
        })) : o.setStatus({ code: Ve }), o.end(), i)).catch((i) => {
          throw o.setStatus({ code: N }), o.end(), P(i, {
            mechanism: {
              handled: !1,
              type: "auto.db.supabase.auth"
            }
          }), i;
        }).then(...s)
      );
    }
  });
}
function _u(t) {
  const e = t.auth;
  if (!(!e || nn(t.auth))) {
    for (const n of lu) {
      const r = e[n];
      r && typeof t.auth[n] == "function" && (t.auth[n] = ls(r));
    }
    for (const n of fu) {
      const r = e.admin[n];
      r && typeof t.auth.admin[n] == "function" && (t.auth.admin[n] = ls(r, !0));
    }
    en(t.auth);
  }
}
function gu(t) {
  nn(t.prototype.from) || (t.prototype.from = new Proxy(
    t.prototype.from,
    {
      apply(e, n, r) {
        const s = Reflect.apply(e, n, r), o = s.constructor;
        return yu(o), s;
      }
    }
  ), en(t.prototype.from));
}
function hu(t) {
  nn(t.prototype.then) || (t.prototype.then = new Proxy(
    t.prototype.then,
    {
      apply(e, n, r) {
        var l;
        const s = Ro, o = n, i = du(o.method, o.headers);
        if (!s.includes(i) || !((l = o == null ? void 0 : o.url) != null && l.pathname) || typeof o.url.pathname != "string")
          return Reflect.apply(e, n, r);
        const a = o.url.pathname.split("/"), c = a.length > 0 ? a[a.length - 1] : "", u = [];
        for (const [_, y] of o.url.searchParams.entries())
          u.push(mu(_, y));
        const d = /* @__PURE__ */ Object.create(null);
        if (gt(o.body))
          for (const [_, y] of Object.entries(o.body))
            d[_] = y;
        const p = `${i === "select" ? "" : `${i}${d ? "(...) " : ""}`}${u.join(
          " "
        )} from(${c})`, m = {
          "db.table": c,
          "db.schema": o.schema,
          "db.url": o.url.origin,
          "db.sdk": o.headers["X-Client-Info"],
          "db.system": "postgresql",
          "db.operation": i,
          [z]: "auto.db.supabase",
          [Zt]: "db"
        };
        return u.length && (m["db.query"] = u), Object.keys(d).length && (m["db.body"] = d), re(
          {
            name: p,
            attributes: m
          },
          (_) => Reflect.apply(e, n, []).then(
            (y) => {
              if (_ && (y && typeof y == "object" && "status" in y && Mr(_, y.status || 500), _.end()), y.error) {
                const R = new Error(y.error.message);
                y.error.code && (R.code = y.error.code), y.error.details && (R.details = y.error.details);
                const w = {};
                u.length && (w.query = u), Object.keys(d).length && (w.body = d), P(R, (U) => (U.addEventProcessor((Y) => (st(Y, {
                  handled: !1,
                  type: "auto.db.supabase.postgres"
                }), Y)), U.setContext("supabase", w), U));
              }
              const h = {
                type: "supabase",
                category: `db.${i}`,
                message: p
              }, I = {};
              return u.length && (I.query = u), Object.keys(d).length && (I.body = d), Object.keys(I).length && (h.data = I), Pc(h), y;
            },
            (y) => {
              throw _ && (Mr(_, 500), _.end()), y;
            }
          ).then(...r)
        );
      }
    }
  ), en(t.prototype.then));
}
function yu(t) {
  for (const e of Ro)
    nn(t.prototype[e]) || (t.prototype[e] = new Proxy(
      t.prototype[e],
      {
        apply(n, r, s) {
          const o = Reflect.apply(n, r, s), i = o.constructor;
          return S && g.log(`Instrumenting ${e} operation's PostgRESTFilterBuilder`), hu(i), o;
        }
      }
    ), en(t.prototype[e]));
}
const Su = (t) => {
  if (!t) {
    S && g.warn("Supabase integration was not installed because no Supabase client was provided.");
    return;
  }
  const e = t.constructor === Function ? t : t.constructor;
  gu(e), _u(t);
}, Eu = "Supabase", bu = ((t) => ({
  setupOnce() {
    Su(t);
  },
  name: Eu
})), bp = (t) => bu(t.supabaseClient), Tu = 10, Iu = "ZodErrors";
function Au(t) {
  return ft(t) && t.name === "ZodError" && Array.isArray(t.issues);
}
function Nu(t) {
  return E(f({}, t), {
    path: "path" in t && Array.isArray(t.path) ? t.path.join(".") : void 0,
    keys: "keys" in t ? JSON.stringify(t.keys) : void 0,
    unionErrors: "unionErrors" in t ? JSON.stringify(t.unionErrors) : void 0
  });
}
function Ru(t) {
  return t.map((e) => typeof e == "number" ? "<array>" : e).join(".");
}
function Ou(t) {
  const e = /* @__PURE__ */ new Set();
  for (const r of t.issues) {
    const s = Ru(r.path);
    s.length > 0 && e.add(s);
  }
  const n = Array.from(e);
  if (n.length === 0) {
    let r = "variable";
    if (t.issues.length > 0) {
      const s = t.issues[0];
      s !== void 0 && "expected" in s && typeof s.expected == "string" && (r = s.expected);
    }
    return `Failed to validate ${r}`;
  }
  return `Failed to validate keys: ${Xt(n.join(", "), 100)}`;
}
function ku(t, e = !1, n, r) {
  var s;
  if (!((s = n.exception) != null && s.values) || !r.originalException || !Au(r.originalException) || r.originalException.issues.length === 0)
    return n;
  try {
    const i = (e ? r.originalException.issues : r.originalException.issues.slice(0, t)).map(Nu);
    return e && (Array.isArray(r.attachments) || (r.attachments = []), r.attachments.push({
      filename: "zod_issues.json",
      data: JSON.stringify({
        issues: i
      })
    })), E(f({}, n), {
      exception: E(f({}, n.exception), {
        values: [
          E(f({}, n.exception.values[0]), {
            value: Ou(r.originalException)
          }),
          ...n.exception.values.slice(1)
        ]
      }),
      extra: E(f({}, n.extra), {
        "zoderror.issues": i.slice(0, t)
      })
    });
  } catch (o) {
    return E(f({}, n), {
      extra: E(f({}, n.extra), {
        "zoderrors sentry integration parse error": {
          message: "an exception was thrown while processing ZodError within applyZodErrorsToEvent()",
          error: o instanceof Error ? `${o.name}: ${o.message}
${o.stack}` : "unknown"
        }
      })
    });
  }
}
const Mu = ((t = {}) => {
  var n;
  const e = (n = t.limit) != null ? n : Tu;
  return {
    name: Iu,
    processEvent(r, s) {
      return ku(e, t.saveZodIssuesAsAttachment, r, s);
    }
  };
}), Tp = Mu, Ip = (t) => ({
  name: "ThirdPartyErrorsFilter",
  setup(e) {
    e.on("beforeEnvelope", (n) => {
      Qt(n, (r, s) => {
        if (s === "event") {
          const o = Array.isArray(r) ? r[1] : void 0;
          o && (Io(o), r[1] = o);
        }
      });
    }), e.on("applyFrameMetadata", (n) => {
      if (n.type)
        return;
      const r = e.getOptions().stackParser;
      To(r, n);
    });
  },
  processEvent(e) {
    const n = vu(e);
    if (n) {
      const r = t.behaviour === "drop-error-if-contains-third-party-frames" || t.behaviour === "apply-tag-if-contains-third-party-frames" ? "some" : "every";
      if (n[r]((o) => !o.some((i) => t.filterKeys.includes(i)))) {
        if (t.behaviour === "drop-error-if-contains-third-party-frames" || t.behaviour === "drop-error-if-exclusively-contains-third-party-frames")
          return null;
        e.tags = E(f({}, e.tags), {
          third_party_code: !0
        });
      }
    }
    return e;
  }
});
function vu(t) {
  const e = ti(t);
  if (e)
    return e.filter((n) => {
      var r;
      return !!n.filename && ((r = n.lineno) != null ? r : n.colno) != null;
    }).map((n) => n.module_metadata ? Object.keys(n.module_metadata).filter((r) => r.startsWith(fs)).map((r) => r.slice(fs.length)) : []);
}
const fs = "_sentryBundlerPluginAppKey:", Cu = 100, wu = 10, _e = "flag.evaluation.";
function Pu(t) {
  const n = k().getScopeData().contexts.flags, r = n ? n.values : [];
  return r.length && (t.contexts === void 0 && (t.contexts = {}), t.contexts.flags = { values: [...r] }), t;
}
function xu(t, e, n = Cu) {
  const r = k().getScopeData().contexts;
  r.flags || (r.flags = { values: [] });
  const s = r.flags.values;
  Du(s, t, e, n);
}
function Du(t, e, n, r) {
  if (typeof n != "boolean")
    return;
  if (t.length > r) {
    S && g.error(`[Feature Flags] insertToFlagBuffer called on a buffer larger than maxSize=${r}`);
    return;
  }
  const s = t.findIndex((o) => o.flag === e);
  s !== -1 && t.splice(s, 1), t.length === r && t.shift(), t.push({
    flag: e,
    result: n
  });
}
function $u(t, e, n = wu) {
  if (typeof e != "boolean")
    return;
  const r = Ut();
  if (!r)
    return;
  const s = A(r).data;
  if (`${_e}${t}` in s) {
    r.setAttribute(`${_e}${t}`, e);
    return;
  }
  Object.keys(s).filter((i) => i.startsWith(_e)).length < n && r.setAttribute(`${_e}${t}`, e);
}
const Ap = () => ({
  name: "FeatureFlags",
  processEvent(t, e, n) {
    return Pu(t);
  },
  addFeatureFlag(t, e) {
    xu(t, e), $u(t, e);
  }
});
function Bt(t, e, n, r, s) {
  ve({ level: t, message: e, attributes: n, severityNumber: s }, r);
}
function Lu(t, e, { scope: n } = {}) {
  Bt("trace", t, e, n);
}
function Fu(t, e, { scope: n } = {}) {
  Bt("debug", t, e, n);
}
function Uu(t, e, { scope: n } = {}) {
  Bt("info", t, e, n);
}
function ju(t, e, { scope: n } = {}) {
  Bt("warn", t, e, n);
}
function Bu(t, e, { scope: n } = {}) {
  Bt("error", t, e, n);
}
function Gu(t, e, { scope: n } = {}) {
  Bt("fatal", t, e, n);
}
const Np = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  debug: Fu,
  error: Bu,
  fatal: Gu,
  fmt: vc,
  info: Uu,
  trace: Lu,
  warn: ju
}, Symbol.toStringTag, { value: "Module" }));
function Mn(t, e, n) {
  return "util" in b && typeof b.util.format == "function" ? b.util.format(...t) : Hu(t, e, n);
}
function Hu(t, e, n) {
  return t.map(
    (r) => Un(r) ? String(r) : JSON.stringify(F(r, e, n))
  ).join(" ");
}
function qu(t) {
  return /%[sdifocO]/.test(t);
}
function Wu(t, e) {
  const n = {}, r = new Array(e.length).fill("{}").join(" ");
  return n["sentry.message.template"] = `${t} ${r}`, e.forEach((s, o) => {
    n[`sentry.message.parameter.${o}`] = s;
  }), n;
}
const Ju = "ConsoleLogs", ps = {
  [z]: "auto.log.console"
}, zu = ((t = {}) => {
  const e = t.levels || Pn;
  return {
    name: Ju,
    setup(n) {
      const { enableLogs: r, normalizeDepth: s = 3, normalizeMaxBreadth: o = 1e3 } = n.getOptions();
      if (!r) {
        S && g.warn("`enableLogs` is not enabled, ConsoleLogs integration disabled");
        return;
      }
      Ao(({ args: i, level: a }) => {
        if (O() !== n || !e.includes(a))
          return;
        const c = i[0], u = i.slice(1);
        if (a === "assert") {
          if (!c) {
            const l = u.length > 0 ? `Assertion failed: ${Mn(u, s, o)}` : "Assertion failed";
            ve({ level: "error", message: l, attributes: ps });
          }
          return;
        }
        const d = a === "log", p = i.length > 1 && typeof i[0] == "string" && !qu(i[0]), m = f(f({}, ps), p ? Wu(c, u) : {});
        ve({
          level: d ? "info" : a,
          message: Mn(i, s, o),
          severityNumber: d ? 10 : void 0,
          attributes: m
        });
      });
    }
  };
}), Rp = zu;
function tr(t, e, n, r) {
  cc(
    { type: t, name: e, value: n, unit: r == null ? void 0 : r.unit, attributes: r == null ? void 0 : r.attributes },
    { scope: r == null ? void 0 : r.scope }
  );
}
function Yu(t, e = 1, n) {
  tr("counter", t, e, n);
}
function Vu(t, e, n) {
  tr("gauge", t, e, n);
}
function Ku(t, e, n) {
  tr("distribution", t, e, n);
}
const Op = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  count: Yu,
  distribution: Ku,
  gauge: Vu
}, Symbol.toStringTag, { value: "Module" })), Xu = ["trace", "debug", "info", "warn", "error", "fatal"];
function kp(t = {}) {
  var r;
  const e = new Set((r = t.levels) != null ? r : Xu), n = t.client;
  return {
    log(s) {
      const R = s, { type: o, level: i, message: a, args: c, tag: u, date: d } = R, p = ln(R, ["type", "level", "message", "args", "tag", "date"]), m = n || O();
      if (!m)
        return;
      const l = tl(o, i);
      if (!e.has(l))
        return;
      const { normalizeDepth: _ = 3, normalizeMaxBreadth: y = 1e3 } = m.getOptions(), h = [];
      a && h.push(a), c && c.length > 0 && h.push(Mn(c, _, y));
      const I = h.join(" ");
      p["sentry.origin"] = "auto.log.consola", u && (p["consola.tag"] = u), o && (p["consola.type"] = o), i != null && typeof i == "number" && (p["consola.level"] = i), ve({
        level: l,
        message: I,
        attributes: p
      });
    }
  };
}
const Zu = {
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
}, Qu = {
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
function tl(t, e) {
  if (t === "verbose")
    return "debug";
  if (t === "silent")
    return "trace";
  if (t) {
    const n = Zu[t];
    if (n)
      return n;
  }
  if (typeof e == "number") {
    const n = Qu[e];
    if (n)
      return n;
  }
  return "info";
}
const el = "gen_ai.prompt", er = "gen_ai.system", B = "gen_ai.request.model", Oo = "gen_ai.request.stream", nr = "gen_ai.request.temperature", ko = "gen_ai.request.max_tokens", rr = "gen_ai.request.frequency_penalty", Mo = "gen_ai.request.presence_penalty", sr = "gen_ai.request.top_p", vo = "gen_ai.request.top_k", nl = "gen_ai.request.encoding_format", rl = "gen_ai.request.dimensions", Gt = "gen_ai.response.finish_reasons", Ht = "gen_ai.response.model", se = "gen_ai.response.id", rn = "gen_ai.usage.input_tokens", sn = "gen_ai.usage.output_tokens", on = "gen_ai.usage.total_tokens", or = "gen_ai.operation.name", mt = "gen_ai.request.messages", W = "gen_ai.response.text", ir = "gen_ai.request.available_tools", an = "gen_ai.response.streaming", ut = "gen_ai.response.tool_calls", sl = "openai.response.id", Co = "openai.response.model", ol = "openai.response.timestamp", il = "openai.usage.completion_tokens", al = "openai.usage.prompt_tokens", yn = {
  CHAT: "chat",
  RESPONSES: "responses",
  EMBEDDINGS: "embeddings"
}, ds = "anthropic.response.timestamp", wo = 2e4, we = (t) => new TextEncoder().encode(t).length, Pe = (t) => we(JSON.stringify(t));
function ar(t, e) {
  if (we(t) <= e)
    return t;
  let n = 0, r = t.length, s = "";
  for (; n <= r; ) {
    const o = Math.floor((n + r) / 2), i = t.slice(0, o);
    we(i) <= e ? (s = i, n = o + 1) : r = o - 1;
  }
  return s;
}
function cl(t) {
  return typeof t == "string" ? t : t.text;
}
function ms(t, e) {
  return typeof t == "string" ? e : E(f({}, t), { text: e });
}
function ul(t) {
  return t !== null && typeof t == "object" && "content" in t && typeof t.content == "string";
}
function ll(t) {
  return t !== null && typeof t == "object" && "parts" in t && Array.isArray(t.parts) && t.parts.length > 0;
}
function fl(t, e) {
  const n = E(f({}, t), { content: "" }), r = Pe(n), s = e - r;
  if (s <= 0)
    return [];
  const o = ar(t.content, s);
  return [E(f({}, t), { content: o })];
}
function pl(t, e) {
  const { parts: n } = t, r = n.map((a) => ms(a, "")), s = Pe(E(f({}, t), { parts: r }));
  let o = e - s;
  if (o <= 0)
    return [];
  const i = [];
  for (const a of n) {
    const c = cl(a), u = we(c);
    if (u <= o)
      i.push(a), o -= u;
    else if (i.length === 0) {
      const d = ar(c, o);
      d && i.push(ms(a, d));
      break;
    } else
      break;
  }
  return i.length > 0 ? [E(f({}, t), { parts: i })] : [];
}
function dl(t, e) {
  return !t || typeof t != "object" ? [] : ul(t) ? fl(t, e) : ll(t) ? pl(t, e) : [];
}
function ml(t, e) {
  if (!Array.isArray(t) || t.length === 0 || Pe(t) <= e)
    return t;
  const r = t.map(Pe);
  let s = 0, o = t.length;
  for (let i = t.length - 1; i >= 0; i--) {
    const a = r[i];
    if (a && s + a > e)
      break;
    a && (s += a), o = i;
  }
  if (o === t.length) {
    const i = t[t.length - 1];
    return dl(i, e);
  }
  return t.slice(o);
}
function _l(t) {
  return ml(t, wo);
}
function gl(t) {
  return ar(t, wo);
}
function oe(t) {
  return t.includes("messages") ? "messages" : t.includes("completions") ? "completions" : t.includes("models") ? "models" : t.includes("chat") ? "chat" : t.split(".").pop() || "unknown";
}
function xe(t) {
  return `gen_ai.${oe(t)}`;
}
function Po(t, e) {
  return t ? `${t}.${e}` : e;
}
function cr(t, e, n, r, s) {
  if (e !== void 0 && t.setAttributes({
    [rn]: e
  }), n !== void 0 && t.setAttributes({
    [sn]: n
  }), e !== void 0 || n !== void 0 || r !== void 0 || s !== void 0) {
    const o = (e != null ? e : 0) + (n != null ? n : 0) + (r != null ? r : 0) + (s != null ? s : 0);
    t.setAttributes({
      [on]: o
    });
  }
}
function _t(t) {
  if (typeof t == "string")
    return gl(t);
  if (Array.isArray(t)) {
    const e = _l(t);
    return JSON.stringify(e);
  }
  return JSON.stringify(t);
}
const hl = "OpenAI", yl = ["responses.create", "chat.completions.create", "embeddings.create"], Sl = [
  "response.output_item.added",
  "response.function_call_arguments.delta",
  "response.function_call_arguments.done",
  "response.output_item.done"
], El = [
  "response.created",
  "response.in_progress",
  "response.failed",
  "response.completed",
  "response.incomplete",
  "response.queued",
  "response.output_text.delta",
  ...Sl
];
function ur(t) {
  return t.includes("chat.completions") ? yn.CHAT : t.includes("responses") ? yn.RESPONSES : t.includes("embeddings") ? yn.EMBEDDINGS : t.split(".").pop() || "unknown";
}
function _s(t) {
  return `gen_ai.${ur(t)}`;
}
function bl(t) {
  return yl.includes(t);
}
function Tl(t, e) {
  return t ? `${t}.${e}` : e;
}
function Il(t) {
  return t !== null && typeof t == "object" && "object" in t && t.object === "chat.completion";
}
function Al(t) {
  return t !== null && typeof t == "object" && "object" in t && t.object === "response";
}
function Nl(t) {
  if (t === null || typeof t != "object" || !("object" in t))
    return !1;
  const e = t;
  return e.object === "list" && typeof e.model == "string" && e.model.toLowerCase().includes("embedding");
}
function Rl(t) {
  return t !== null && typeof t == "object" && "type" in t && typeof t.type == "string" && t.type.startsWith("response.");
}
function Ol(t) {
  return t !== null && typeof t == "object" && "object" in t && t.object === "chat.completion.chunk";
}
function kl(t, e, n) {
  if (lr(t, e.id, e.model, e.created), e.usage && cn(
    t,
    e.usage.prompt_tokens,
    e.usage.completion_tokens,
    e.usage.total_tokens
  ), Array.isArray(e.choices)) {
    const r = e.choices.map((s) => s.finish_reason).filter((s) => s !== null);
    if (r.length > 0 && t.setAttributes({
      [Gt]: JSON.stringify(r)
    }), n) {
      const s = e.choices.map((o) => {
        var i;
        return (i = o.message) == null ? void 0 : i.tool_calls;
      }).filter((o) => Array.isArray(o) && o.length > 0).flat();
      s.length > 0 && t.setAttributes({
        [ut]: JSON.stringify(s)
      });
    }
  }
}
function Ml(t, e, n) {
  if (lr(t, e.id, e.model, e.created_at), e.status && t.setAttributes({
    [Gt]: JSON.stringify([e.status])
  }), e.usage && cn(
    t,
    e.usage.input_tokens,
    e.usage.output_tokens,
    e.usage.total_tokens
  ), n) {
    const r = e;
    if (Array.isArray(r.output) && r.output.length > 0) {
      const s = r.output.filter(
        (o) => typeof o == "object" && o !== null && o.type === "function_call"
      );
      s.length > 0 && t.setAttributes({
        [ut]: JSON.stringify(s)
      });
    }
  }
}
function vl(t, e) {
  t.setAttributes({
    [Co]: e.model,
    [Ht]: e.model
  }), e.usage && cn(t, e.usage.prompt_tokens, void 0, e.usage.total_tokens);
}
function cn(t, e, n, r) {
  e !== void 0 && t.setAttributes({
    [al]: e,
    [rn]: e
  }), n !== void 0 && t.setAttributes({
    [il]: n,
    [sn]: n
  }), r !== void 0 && t.setAttributes({
    [on]: r
  });
}
function lr(t, e, n, r) {
  t.setAttributes({
    [sl]: e,
    [se]: e
  }), t.setAttributes({
    [Co]: n,
    [Ht]: n
  }), t.setAttributes({
    [ol]: new Date(r * 1e3).toISOString()
  });
}
function Cl(t, e) {
  for (const n of t) {
    const r = n.index;
    if (!(r === void 0 || !n.function))
      if (!(r in e.chatCompletionToolCalls))
        e.chatCompletionToolCalls[r] = E(f({}, n), {
          function: {
            name: n.function.name,
            arguments: n.function.arguments || ""
          }
        });
      else {
        const s = e.chatCompletionToolCalls[r];
        n.function.arguments && (s != null && s.function) && (s.function.arguments += n.function.arguments);
      }
  }
}
function wl(t, e, n) {
  var r, s, o, i, a, c;
  e.responseId = (r = t.id) != null ? r : e.responseId, e.responseModel = (s = t.model) != null ? s : e.responseModel, e.responseTimestamp = (o = t.created) != null ? o : e.responseTimestamp, t.usage && (e.promptTokens = t.usage.prompt_tokens, e.completionTokens = t.usage.completion_tokens, e.totalTokens = t.usage.total_tokens);
  for (const u of (i = t.choices) != null ? i : [])
    n && ((a = u.delta) != null && a.content && e.responseTexts.push(u.delta.content), (c = u.delta) != null && c.tool_calls && Cl(u.delta.tool_calls, e)), u.finish_reason && e.finishReasons.push(u.finish_reason);
}
function Pl(t, e, n, r) {
  var o, i, a;
  if (!(t && typeof t == "object")) {
    e.eventTypes.push("unknown:non-object");
    return;
  }
  if (t instanceof Error) {
    r.setStatus({ code: N, message: "internal_error" }), P(t, {
      mechanism: {
        handled: !1,
        type: "auto.ai.openai.stream-response"
      }
    });
    return;
  }
  if (!("type" in t)) return;
  const s = t;
  if (!El.includes(s.type)) {
    e.eventTypes.push(s.type);
    return;
  }
  if (n && (s.type === "response.output_item.done" && "item" in s && e.responsesApiToolCalls.push(s.item), s.type === "response.output_text.delta" && "delta" in s && s.delta)) {
    e.responseTexts.push(s.delta);
    return;
  }
  if ("response" in s) {
    const { response: c } = s;
    e.responseId = (o = c.id) != null ? o : e.responseId, e.responseModel = (i = c.model) != null ? i : e.responseModel, e.responseTimestamp = (a = c.created_at) != null ? a : e.responseTimestamp, c.usage && (e.promptTokens = c.usage.input_tokens, e.completionTokens = c.usage.output_tokens, e.totalTokens = c.usage.total_tokens), c.status && e.finishReasons.push(c.status), n && c.output_text && e.responseTexts.push(c.output_text);
  }
}
function xl(t, e, n) {
  return fe(this, null, function* () {
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
        for (var s = pe(t), o, i, a; o = !(i = yield new nt(s.next())).done; o = !1) {
          const c = i.value;
          Ol(c) ? wl(c, r, n) : Rl(c) && Pl(c, r, n, e), yield c;
        }
      } catch (i) {
        a = [i];
      } finally {
        try {
          o && (i = s.return) && (yield new nt(i.call(s)));
        } finally {
          if (a)
            throw a[0];
        }
      }
    } finally {
      lr(e, r.responseId, r.responseModel, r.responseTimestamp), cn(e, r.promptTokens, r.completionTokens, r.totalTokens), e.setAttributes({
        [an]: !0
      }), r.finishReasons.length && e.setAttributes({
        [Gt]: JSON.stringify(r.finishReasons)
      }), n && r.responseTexts.length && e.setAttributes({
        [W]: r.responseTexts.join("")
      });
      const u = [...Object.values(r.chatCompletionToolCalls), ...r.responsesApiToolCalls];
      u.length > 0 && e.setAttributes({
        [ut]: JSON.stringify(u)
      }), e.end();
    }
  });
}
function Dl(t, e) {
  var r;
  const n = {
    [er]: "openai",
    [or]: ur(e),
    [z]: "auto.ai.openai"
  };
  if (t.length > 0 && typeof t[0] == "object" && t[0] !== null) {
    const s = t[0], o = Array.isArray(s.tools) ? s.tools : [], a = s.web_search_options && typeof s.web_search_options == "object" ? [f({ type: "web_search_options" }, s.web_search_options)] : [], c = [...o, ...a];
    c.length > 0 && (n[ir] = JSON.stringify(c));
  }
  if (t.length > 0 && typeof t[0] == "object" && t[0] !== null) {
    const s = t[0];
    n[B] = (r = s.model) != null ? r : "unknown", "temperature" in s && (n[nr] = s.temperature), "top_p" in s && (n[sr] = s.top_p), "frequency_penalty" in s && (n[rr] = s.frequency_penalty), "presence_penalty" in s && (n[Mo] = s.presence_penalty), "stream" in s && (n[Oo] = s.stream), "encoding_format" in s && (n[nl] = s.encoding_format), "dimensions" in s && (n[rl] = s.dimensions);
  } else
    n[B] = "unknown";
  return n;
}
function $l(t, e, n) {
  var s;
  if (!e || typeof e != "object") return;
  const r = e;
  if (Il(r)) {
    if (kl(t, r, n), n && ((s = r.choices) != null && s.length)) {
      const o = r.choices.map((i) => {
        var a;
        return ((a = i.message) == null ? void 0 : a.content) || "";
      });
      t.setAttributes({ [W]: JSON.stringify(o) });
    }
  } else Al(r) ? (Ml(t, r, n), n && r.output_text && t.setAttributes({ [W]: r.output_text })) : Nl(r) && vl(t, r);
}
function gs(t, e) {
  if ("messages" in e) {
    const n = _t(e.messages);
    t.setAttributes({ [mt]: n });
  }
  if ("input" in e) {
    const n = _t(e.input);
    t.setAttributes({ [mt]: n });
  }
}
function Ll() {
  var s, o, i, a;
  const e = k().getClient(), n = e == null ? void 0 : e.getIntegrationByName(hl), r = n ? !!(e != null && e.getOptions().sendDefaultPii) : !1;
  return {
    recordInputs: (o = (s = n == null ? void 0 : n.options) == null ? void 0 : s.recordInputs) != null ? o : r,
    recordOutputs: (a = (i = n == null ? void 0 : n.options) == null ? void 0 : i.recordOutputs) != null ? a : r
  };
}
function Fl(t, e, n, r) {
  return function(...o) {
    return D(this, null, function* () {
      const i = r || Ll(), a = Dl(o, e), c = a[B] || "unknown", u = ur(e), d = o[0];
      return d && typeof d == "object" && d.stream === !0 ? Me(
        {
          name: `${u} ${c} stream-response`,
          op: _s(e),
          attributes: a
        },
        (m) => D(null, null, function* () {
          var l;
          try {
            i.recordInputs && o[0] && typeof o[0] == "object" && gs(m, o[0]);
            const _ = yield t.apply(n, o);
            return xl(
              _,
              m,
              (l = i.recordOutputs) != null ? l : !1
            );
          } catch (_) {
            throw m.setStatus({ code: N, message: "internal_error" }), P(_, {
              mechanism: {
                handled: !1,
                type: "auto.ai.openai.stream",
                data: {
                  function: e
                }
              }
            }), m.end(), _;
          }
        })
      ) : re(
        {
          name: `${u} ${c}`,
          op: _s(e),
          attributes: a
        },
        (m) => D(null, null, function* () {
          try {
            i.recordInputs && o[0] && typeof o[0] == "object" && gs(m, o[0]);
            const l = yield t.apply(n, o);
            return $l(m, l, i.recordOutputs), l;
          } catch (l) {
            throw P(l, {
              mechanism: {
                handled: !1,
                type: "auto.ai.openai",
                data: {
                  function: e
                }
              }
            }), l;
          }
        })
      );
    });
  };
}
function xo(t, e = "", n) {
  return new Proxy(t, {
    get(r, s) {
      const o = r[s], i = Tl(e, String(s));
      return typeof o == "function" && bl(i) ? Fl(o, i, r, n) : typeof o == "function" ? o.bind(r) : o && typeof o == "object" ? xo(o, i, n) : o;
    }
  });
}
function Mp(t, e) {
  return xo(t, "", e);
}
function Ul(t, e) {
  var n, r;
  return "type" in t && typeof t.type == "string" && t.type === "error" ? (e.setStatus({ code: N, message: (r = (n = t.error) == null ? void 0 : n.type) != null ? r : "internal_error" }), P(t.error, {
    mechanism: {
      handled: !1,
      type: "auto.ai.anthropic.anthropic_error"
    }
  }), !0) : !1;
}
function jl(t, e) {
  if (t.type === "message_delta" && t.usage && "output_tokens" in t.usage && typeof t.usage.output_tokens == "number" && (e.completionTokens = t.usage.output_tokens), t.message) {
    const n = t.message;
    n.id && (e.responseId = n.id), n.model && (e.responseModel = n.model), n.stop_reason && e.finishReasons.push(n.stop_reason), n.usage && (typeof n.usage.input_tokens == "number" && (e.promptTokens = n.usage.input_tokens), typeof n.usage.cache_creation_input_tokens == "number" && (e.cacheCreationInputTokens = n.usage.cache_creation_input_tokens), typeof n.usage.cache_read_input_tokens == "number" && (e.cacheReadInputTokens = n.usage.cache_read_input_tokens));
  }
}
function Bl(t, e) {
  t.type !== "content_block_start" || typeof t.index != "number" || !t.content_block || (t.content_block.type === "tool_use" || t.content_block.type === "server_tool_use") && (e.activeToolBlocks[t.index] = {
    id: t.content_block.id,
    name: t.content_block.name,
    inputJsonParts: []
  });
}
function Gl(t, e, n) {
  if (!(t.type !== "content_block_delta" || !t.delta)) {
    if (typeof t.index == "number" && "partial_json" in t.delta && typeof t.delta.partial_json == "string") {
      const r = e.activeToolBlocks[t.index];
      r && r.inputJsonParts.push(t.delta.partial_json);
    }
    n && typeof t.delta.text == "string" && e.responseTexts.push(t.delta.text);
  }
}
function Hl(t, e) {
  if (t.type !== "content_block_stop" || typeof t.index != "number") return;
  const n = e.activeToolBlocks[t.index];
  if (!n) return;
  const r = n.inputJsonParts.join("");
  let s;
  try {
    s = r ? JSON.parse(r) : {};
  } catch (o) {
    s = { __unparsed: r };
  }
  e.toolCalls.push({
    type: "tool_use",
    id: n.id,
    name: n.name,
    input: s
  }), delete e.activeToolBlocks[t.index];
}
function Do(t, e, n, r) {
  !(t && typeof t == "object") || Ul(t, r) || (jl(t, e), Bl(t, e), Gl(t, e, n), Hl(t, e));
}
function ql(t, e, n) {
  e.isRecording() && (t.responseId && e.setAttributes({
    [se]: t.responseId
  }), t.responseModel && e.setAttributes({
    [Ht]: t.responseModel
  }), cr(
    e,
    t.promptTokens,
    t.completionTokens,
    t.cacheCreationInputTokens,
    t.cacheReadInputTokens
  ), e.setAttributes({
    [an]: !0
  }), t.finishReasons.length > 0 && e.setAttributes({
    [Gt]: JSON.stringify(t.finishReasons)
  }), n && t.responseTexts.length > 0 && e.setAttributes({
    [W]: t.responseTexts.join("")
  }), n && t.toolCalls.length > 0 && e.setAttributes({
    [ut]: JSON.stringify(t.toolCalls)
  }), e.end());
}
function Wl(t, e, n) {
  return fe(this, null, function* () {
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
        for (var s = pe(t), o, i, a; o = !(i = yield new nt(s.next())).done; o = !1) {
          const c = i.value;
          Do(c, r, n, e), yield c;
        }
      } catch (i) {
        a = [i];
      } finally {
        try {
          o && (i = s.return) && (yield new nt(i.call(s)));
        } finally {
          if (a)
            throw a[0];
        }
      }
    } finally {
      r.responseId && e.setAttributes({
        [se]: r.responseId
      }), r.responseModel && e.setAttributes({
        [Ht]: r.responseModel
      }), cr(
        e,
        r.promptTokens,
        r.completionTokens,
        r.cacheCreationInputTokens,
        r.cacheReadInputTokens
      ), e.setAttributes({
        [an]: !0
      }), r.finishReasons.length > 0 && e.setAttributes({
        [Gt]: JSON.stringify(r.finishReasons)
      }), n && r.responseTexts.length > 0 && e.setAttributes({
        [W]: r.responseTexts.join("")
      }), n && r.toolCalls.length > 0 && e.setAttributes({
        [ut]: JSON.stringify(r.toolCalls)
      }), e.end();
    }
  });
}
function Jl(t, e, n) {
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
  return t.on("streamEvent", (s) => {
    Do(s, r, n, e);
  }), t.on("message", () => {
    ql(r, e, n);
  }), t.on("error", (s) => {
    P(s, {
      mechanism: {
        handled: !1,
        type: "auto.ai.anthropic.stream_error"
      }
    }), e.isRecording() && (e.setStatus({ code: N, message: "stream_error" }), e.end());
  }), t;
}
const zl = [
  "messages.create",
  "messages.stream",
  "messages.countTokens",
  "models.get",
  "completions.create",
  "models.retrieve",
  "beta.messages.create"
];
function Yl(t) {
  return zl.includes(t);
}
function Vl(t, e) {
  e.error && (t.setStatus({ code: N, message: e.error.type || "internal_error" }), P(e.error, {
    mechanism: {
      handled: !1,
      type: "auto.ai.anthropic.anthropic_error"
    }
  }));
}
function Kl(t, e) {
  var r;
  const n = {
    [er]: "anthropic",
    [or]: oe(e),
    [z]: "auto.ai.anthropic"
  };
  if (t.length > 0 && typeof t[0] == "object" && t[0] !== null) {
    const s = t[0];
    s.tools && Array.isArray(s.tools) && (n[ir] = JSON.stringify(s.tools)), n[B] = (r = s.model) != null ? r : "unknown", "temperature" in s && (n[nr] = s.temperature), "top_p" in s && (n[sr] = s.top_p), "stream" in s && (n[Oo] = s.stream), "top_k" in s && (n[vo] = s.top_k), "frequency_penalty" in s && (n[rr] = s.frequency_penalty), "max_tokens" in s && (n[ko] = s.max_tokens);
  } else
    e === "models.retrieve" || e === "models.get" ? n[B] = t[0] : n[B] = "unknown";
  return n;
}
function vn(t, e) {
  if ("messages" in e) {
    const n = _t(e.messages);
    t.setAttributes({ [mt]: n });
  }
  if ("input" in e) {
    const n = _t(e.input);
    t.setAttributes({ [mt]: n });
  }
  "prompt" in e && t.setAttributes({ [el]: JSON.stringify(e.prompt) });
}
function Xl(t, e) {
  if ("content" in e && Array.isArray(e.content)) {
    t.setAttributes({
      [W]: e.content.map((r) => r.text).filter((r) => !!r).join("")
    });
    const n = [];
    for (const r of e.content)
      (r.type === "tool_use" || r.type === "server_tool_use") && n.push(r);
    n.length > 0 && t.setAttributes({ [ut]: JSON.stringify(n) });
  }
  "completion" in e && t.setAttributes({ [W]: e.completion }), "input_tokens" in e && t.setAttributes({ [W]: JSON.stringify(e.input_tokens) });
}
function Zl(t, e) {
  "id" in e && "model" in e && (t.setAttributes({
    [se]: e.id,
    [Ht]: e.model
  }), "created" in e && typeof e.created == "number" && t.setAttributes({
    [ds]: new Date(e.created * 1e3).toISOString()
  }), "created_at" in e && typeof e.created_at == "number" && t.setAttributes({
    [ds]: new Date(e.created_at * 1e3).toISOString()
  }), "usage" in e && e.usage && cr(
    t,
    e.usage.input_tokens,
    e.usage.output_tokens,
    e.usage.cache_creation_input_tokens,
    e.usage.cache_read_input_tokens
  ));
}
function Ql(t, e, n) {
  if (!(!e || typeof e != "object")) {
    if ("type" in e && e.type === "error") {
      Vl(t, e);
      return;
    }
    n && Xl(t, e), Zl(t, e);
  }
}
function hs(t, e, n) {
  throw P(t, {
    mechanism: { handled: !1, type: "auto.ai.anthropic", data: { function: n } }
  }), e.isRecording() && (e.setStatus({ code: N, message: "internal_error" }), e.end()), t;
}
function tf(t, e, n, r, s, o, i, a, c, u, d) {
  var l;
  const p = (l = s[B]) != null ? l : "unknown", m = {
    name: `${o} ${p} stream-response`,
    op: xe(i),
    attributes: s
  };
  return u && !d ? Me(m, (_) => D(null, null, function* () {
    var y;
    try {
      c.recordInputs && a && vn(_, a);
      const h = yield t.apply(n, r);
      return Wl(
        h,
        _,
        (y = c.recordOutputs) != null ? y : !1
      );
    } catch (h) {
      return hs(h, _, i);
    }
  })) : Me(m, (_) => {
    var y;
    try {
      c.recordInputs && a && vn(_, a);
      const h = e.apply(n, r);
      return Jl(h, _, (y = c.recordOutputs) != null ? y : !1);
    } catch (h) {
      return hs(h, _, i);
    }
  });
}
function ef(t, e, n, r) {
  return new Proxy(t, {
    apply(s, o, i) {
      var l;
      const a = Kl(i, e), c = (l = a[B]) != null ? l : "unknown", u = oe(e), d = typeof i[0] == "object" ? i[0] : void 0, p = !!(d != null && d.stream), m = e === "messages.stream";
      return p || m ? tf(
        t,
        s,
        n,
        i,
        a,
        u,
        e,
        d,
        r,
        p,
        m
      ) : re(
        {
          name: `${u} ${c}`,
          op: xe(e),
          attributes: a
        },
        (_) => (r.recordInputs && d && vn(_, d), Ze(
          () => s.apply(n, i),
          (y) => {
            P(y, {
              mechanism: {
                handled: !1,
                type: "auto.ai.anthropic",
                data: {
                  function: e
                }
              }
            });
          },
          () => {
          },
          (y) => Ql(_, y, r.recordOutputs)
        ))
      );
    }
  });
}
function $o(t, e = "", n) {
  return new Proxy(t, {
    get(r, s) {
      const o = r[s], i = Po(e, String(s));
      return typeof o == "function" && Yl(i) ? ef(o, i, r, n) : typeof o == "function" ? o.bind(r) : o && typeof o == "object" ? $o(o, i, n) : o;
    }
  });
}
function vp(t, e) {
  var s;
  const n = !!((s = O()) != null && s.getOptions().sendDefaultPii), r = f({
    recordInputs: n,
    recordOutputs: n
  }, e);
  return $o(t, "", r);
}
const ys = [
  "models.generateContent",
  "models.generateContentStream",
  "chats.create",
  "sendMessage",
  "sendMessageStream"
], nf = "google_genai", Lo = "chats.create", rf = "chat";
function sf(t, e) {
  var r;
  const n = t == null ? void 0 : t.promptFeedback;
  if (n != null && n.blockReason) {
    const s = (r = n.blockReasonMessage) != null ? r : n.blockReason;
    return e.setStatus({ code: N, message: `Content blocked: ${s}` }), P(`Content blocked: ${s}`, {
      mechanism: { handled: !1, type: "auto.ai.google_genai" }
    }), !0;
  }
  return !1;
}
function of(t, e) {
  typeof t.responseId == "string" && (e.responseId = t.responseId), typeof t.modelVersion == "string" && (e.responseModel = t.modelVersion);
  const n = t.usageMetadata;
  n && (typeof n.promptTokenCount == "number" && (e.promptTokens = n.promptTokenCount), typeof n.candidatesTokenCount == "number" && (e.completionTokens = n.candidatesTokenCount), typeof n.totalTokenCount == "number" && (e.totalTokens = n.totalTokenCount));
}
function af(t, e, n) {
  var r, s, o;
  Array.isArray(t.functionCalls) && e.toolCalls.push(...t.functionCalls);
  for (const i of (r = t.candidates) != null ? r : []) {
    i != null && i.finishReason && !e.finishReasons.includes(i.finishReason) && e.finishReasons.push(i.finishReason);
    for (const a of (o = (s = i == null ? void 0 : i.content) == null ? void 0 : s.parts) != null ? o : [])
      n && a.text && e.responseTexts.push(a.text), a.functionCall && e.toolCalls.push({
        type: "function",
        id: a.functionCall.id,
        name: a.functionCall.name,
        arguments: a.functionCall.args
      });
  }
}
function cf(t, e, n, r) {
  !t || sf(t, r) || (of(t, e), af(t, e, n));
}
function uf(t, e, n) {
  return fe(this, null, function* () {
    const r = {
      responseTexts: [],
      finishReasons: [],
      toolCalls: []
    };
    try {
      try {
        for (var s = pe(t), o, i, a; o = !(i = yield new nt(s.next())).done; o = !1) {
          const c = i.value;
          cf(c, r, n, e), yield c;
        }
      } catch (i) {
        a = [i];
      } finally {
        try {
          o && (i = s.return) && (yield new nt(i.call(s)));
        } finally {
          if (a)
            throw a[0];
        }
      }
    } finally {
      const c = {
        [an]: !0
      };
      r.responseId && (c[se] = r.responseId), r.responseModel && (c[Ht] = r.responseModel), r.promptTokens !== void 0 && (c[rn] = r.promptTokens), r.completionTokens !== void 0 && (c[sn] = r.completionTokens), r.totalTokens !== void 0 && (c[on] = r.totalTokens), r.finishReasons.length && (c[Gt] = JSON.stringify(r.finishReasons)), n && r.responseTexts.length && (c[W] = r.responseTexts.join("")), n && r.toolCalls.length && (c[ut] = JSON.stringify(r.toolCalls)), e.setAttributes(c), e.end();
    }
  });
}
function lf(t) {
  if (ys.includes(t))
    return !0;
  const e = t.split(".").pop();
  return ys.includes(e);
}
function ff(t) {
  return t.includes("Stream") || t.endsWith("generateContentStream") || t.endsWith("sendMessageStream");
}
function Ss(t, e) {
  if ("model" in t && typeof t.model == "string")
    return t.model;
  if (e && typeof e == "object") {
    const n = e;
    if ("model" in n && typeof n.model == "string")
      return n.model;
    if ("modelVersion" in n && typeof n.modelVersion == "string")
      return n.modelVersion;
  }
  return "unknown";
}
function pf(t) {
  const e = {};
  return "temperature" in t && typeof t.temperature == "number" && (e[nr] = t.temperature), "topP" in t && typeof t.topP == "number" && (e[sr] = t.topP), "topK" in t && typeof t.topK == "number" && (e[vo] = t.topK), "maxOutputTokens" in t && typeof t.maxOutputTokens == "number" && (e[ko] = t.maxOutputTokens), "frequencyPenalty" in t && typeof t.frequencyPenalty == "number" && (e[rr] = t.frequencyPenalty), "presencePenalty" in t && typeof t.presencePenalty == "number" && (e[Mo] = t.presencePenalty), e;
}
function df(t, e, n) {
  const r = {
    [er]: nf,
    [or]: oe(t),
    [z]: "auto.ai.google_genai"
  };
  if (e) {
    if (r[B] = Ss(e, n), "config" in e && typeof e.config == "object" && e.config) {
      const s = e.config;
      if (Object.assign(r, pf(s)), "tools" in s && Array.isArray(s.tools)) {
        const o = s.tools.flatMap(
          (i) => i.functionDeclarations
        );
        r[ir] = JSON.stringify(o);
      }
    }
  } else
    r[B] = Ss({}, n);
  return r;
}
function Es(t, e) {
  if ("contents" in e) {
    const n = e.contents, r = _t(n);
    t.setAttributes({ [mt]: r });
  }
  if ("message" in e) {
    const n = e.message, r = _t(n);
    t.setAttributes({ [mt]: r });
  }
  if ("history" in e) {
    const n = e.history, r = _t(n);
    t.setAttributes({ [mt]: r });
  }
}
function mf(t, e, n) {
  if (!(!e || typeof e != "object")) {
    if (e.usageMetadata && typeof e.usageMetadata == "object") {
      const r = e.usageMetadata;
      typeof r.promptTokenCount == "number" && t.setAttributes({
        [rn]: r.promptTokenCount
      }), typeof r.candidatesTokenCount == "number" && t.setAttributes({
        [sn]: r.candidatesTokenCount
      }), typeof r.totalTokenCount == "number" && t.setAttributes({
        [on]: r.totalTokenCount
      });
    }
    if (n && Array.isArray(e.candidates) && e.candidates.length > 0) {
      const r = e.candidates.map((s) => {
        var o;
        return (o = s.content) != null && o.parts && Array.isArray(s.content.parts) ? s.content.parts.map((i) => typeof i.text == "string" ? i.text : "").filter((i) => i.length > 0).join("") : "";
      }).filter((s) => s.length > 0);
      r.length > 0 && t.setAttributes({
        [W]: r.join("")
      });
    }
    if (n && e.functionCalls) {
      const r = e.functionCalls;
      Array.isArray(r) && r.length > 0 && t.setAttributes({
        [ut]: JSON.stringify(r)
      });
    }
  }
}
function bs(t, e, n, r) {
  const s = e === Lo;
  return new Proxy(t, {
    apply(o, i, a) {
      var m;
      const c = a[0], u = df(e, c, n), d = (m = u[B]) != null ? m : "unknown", p = oe(e);
      return ff(e) ? Me(
        {
          name: `${p} ${d} stream-response`,
          op: xe(e),
          attributes: u
        },
        (l) => D(null, null, function* () {
          try {
            r.recordInputs && c && Es(l, c);
            const _ = yield o.apply(n, a);
            return uf(_, l, !!r.recordOutputs);
          } catch (_) {
            throw l.setStatus({ code: N, message: "internal_error" }), P(_, {
              mechanism: {
                handled: !1,
                type: "auto.ai.google_genai",
                data: { function: e }
              }
            }), l.end(), _;
          }
        })
      ) : re(
        {
          name: s ? `${p} ${d} create` : `${p} ${d}`,
          op: xe(e),
          attributes: u
        },
        (l) => (r.recordInputs && c && Es(l, c), Ze(
          () => o.apply(n, a),
          (_) => {
            P(_, {
              mechanism: { handled: !1, type: "auto.ai.google_genai", data: { function: e } }
            });
          },
          () => {
          },
          (_) => {
            s || mf(l, _, r.recordOutputs);
          }
        ))
      );
    }
  });
}
function Cn(t, e = "", n) {
  return new Proxy(t, {
    get: (r, s, o) => {
      const i = Reflect.get(r, s, o), a = Po(e, String(s));
      if (typeof i == "function" && lf(a)) {
        if (a === Lo) {
          const c = bs(i, a, r, n);
          return function(...d) {
            const p = c(...d);
            return p && typeof p == "object" ? Cn(p, rf, n) : p;
          };
        }
        return bs(i, a, r, n);
      }
      return typeof i == "function" ? i.bind(r) : i && typeof i == "object" ? Cn(i, a, n) : i;
    }
  });
}
function Cp(t, e) {
  var s;
  const n = !!((s = O()) != null && s.getOptions().sendDefaultPii), r = f({
    recordInputs: n,
    recordOutputs: n
  }, e);
  return Cn(t, "", r);
}
const _f = "sentry.javascript.miniapp", Ts = "10.27.0-rc.1", Ie = "?", gf = /^\s*at (?:(.*?) ?\()?((?:file|https?|blob|chrome-extension|address|native|eval|webpack|<anonymous>|[-a-z]+:|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i, hf = /\((\S*)(?::(\d+))(?::(\d+))\)/, yf = /^\s*at (.*?) ?\((\S*):(\d+):(\d+)\)/i;
function fr(t) {
  let e = null;
  const n = t && t.framesToPop;
  try {
    if (e = Ef(t), e)
      return Is(e, n);
  } catch (r) {
  }
  try {
    if (e = Sf(t), e)
      return Is(e, n);
  } catch (r) {
  }
  return {
    message: pr(t),
    name: t && t.name,
    stack: [],
    failed: !0
  };
}
function Sf(t) {
  if (!t || !t.stack)
    return null;
  const e = [], n = t.stack.split(`
`);
  let r, s, o, i;
  for (let a = 0; a < n.length; ++a) {
    if (o = gf.exec(n[a])) {
      const c = o[2] && o[2].indexOf("native") === 0;
      r = o[2] && o[2].indexOf("eval") === 0, r && (s = hf.exec(o[2])) && (o[2] = s[1], o[3] = s[2], o[4] = s[3]), i = {
        url: o[2],
        func: o[1] || Ie,
        args: c ? [o[2]] : [],
        line: o[3] ? +o[3] : null,
        column: o[4] ? +o[4] : null
      };
    } else if (o = yf.exec(n[a]))
      i = {
        url: o[2],
        func: o[1] || Ie,
        args: [],
        line: o[3] ? +o[3] : null,
        column: o[4] ? +o[4] : null
      };
    else
      continue;
    !i.func && i.line && (i.func = Ie), e.push(i);
  }
  return e.length ? {
    message: pr(t),
    name: t.name,
    stack: e
  } : null;
}
function Ef(t) {
  if (!t || !t.stacktrace)
    return null;
  const e = t.stacktrace, n = / line (\d+).*script (?:in )?(\S+)(?:: in function (\S+))?$/i, r = / line (\d+), column (\d+)\s*(?:in (?:<anonymous function: ([^>]+)>|([^\)]+))\((.*)\))? in (.*):\s*$/i, s = e.split(`
`), o = [];
  let i;
  for (let a = 0; a < s.length; a += 2) {
    let c = null;
    (i = n.exec(s[a])) ? c = {
      url: i[2],
      func: i[3],
      args: [],
      line: +i[1],
      column: null
    } : (i = r.exec(s[a])) && (c = {
      url: i[6],
      func: i[3] || i[4],
      args: i[5] ? i[5].split(",") : [],
      line: +i[1],
      column: +i[2]
    }), c && (!c.func && c.line && (c.func = Ie), o.push(c));
  }
  return o.length ? {
    message: pr(t),
    name: t.name,
    stack: o
  } : null;
}
function Is(t, e) {
  try {
    return E(f({}, t), {
      stack: t.stack.slice(e)
    });
  } catch (n) {
    return t;
  }
}
function pr(t) {
  const e = t && t.message;
  return e ? e.error && typeof e.error.message == "string" ? e.error.message : e : "No error message";
}
const bf = 100;
function dr(t) {
  const e = fr(t), n = mr(e.stack), r = {
    type: Tf(t),
    value: If(t)
  };
  return n.length && (r.stacktrace = { frames: n }), r.type === void 0 && r.value === "" && (r.value = "Unrecoverable error caught"), r;
}
function Tf(t) {
  const e = t == null ? void 0 : t.name;
  return !e && Fo(t) ? t.message && Array.isArray(t.message) && t.message.length == 2 ? t.message[0] : "WebAssembly.Exception" : e;
}
function If(t) {
  const e = t == null ? void 0 : t.message;
  return Fo(t) ? Array.isArray(t.message) && t.message.length == 2 ? t.message[1] : "wasm exception" : e ? e.error && typeof e.error.message == "string" ? e.error.message : e : "No error message";
}
function Fo(t) {
  return typeof WebAssembly != "undefined" && typeof WebAssembly.Exception != "undefined" ? t instanceof WebAssembly.Exception : !1;
}
function Af(t, e, n) {
  const r = O(), s = r == null ? void 0 : r.getOptions().normalizeDepth, o = vf(t), i = {
    __serialized__: Qs(t, s)
  };
  if (o)
    return {
      exception: {
        values: [dr(o)]
      },
      extra: i
    };
  const a = {
    exception: {
      values: [
        {
          type: Je(t) ? t.constructor.name : n ? "UnhandledRejection" : "Error",
          value: kf(t, { isUnhandledRejection: n })
        }
      ]
    },
    extra: i
  };
  if (e) {
    const c = fr(e), u = mr(c.stack);
    u.length && (a.exception.values[0].stacktrace = { frames: u });
  }
  return a;
}
function Sn(t) {
  return {
    exception: {
      values: [dr(t)]
    }
  };
}
function Nf(t, e, n) {
  const r = (e == null ? void 0 : e.syntheticException) || void 0, s = Of(t, r, n);
  return st(s), s.level = "error", e != null && e.event_id && (s.event_id = e.event_id), jt(s);
}
function Rf(t, e = "info", n, r) {
  const s = (n == null ? void 0 : n.syntheticException) || void 0, o = wn(t, s, r);
  return o.level = e, n != null && n.event_id && (o.event_id = n.event_id), jt(o);
}
function Of(t, e, n, r) {
  let s;
  if (vs(t) && t.error)
    return Sn(t.error);
  if (Tr(t) || oi(t)) {
    const o = t;
    if ("stack" in t)
      s = Sn(t);
    else {
      const i = o.name || (Tr(o) ? "DOMError" : "DOMException"), a = o.message ? `${i}: ${o.message}` : i;
      s = wn(a, e, n), En(s, a);
    }
    return "code" in o && (s.tags = E(f({}, s.tags), { "DOMException.code": `${o.code}` })), s;
  }
  return ft(t) ? Sn(t) : gt(t) || Je(t) ? (s = Af(t, e, r), st(s, {
    synthetic: !0
  }), s) : (s = wn(t, e, n), En(s, `${t}`), st(s, {
    synthetic: !0
  }), s);
}
function wn(t, e, n) {
  const r = {};
  if (n && e) {
    const s = fr(e), o = mr(s.stack);
    o.length && (r.exception = {
      values: [{ value: t, stacktrace: { frames: o } }]
    }), st(r, { synthetic: !0 });
  }
  if (We(t)) {
    const { __sentry_template_string__: s, __sentry_template_values__: o } = t;
    return r.logentry = {
      message: s,
      params: o
    }, r;
  }
  return r.message = t, r;
}
function kf(t, { isUnhandledRejection: e }) {
  const n = di(t), r = "exception";
  return vs(t) ? `Event \`ErrorEvent\` captured as ${r} with message \`${t.message}\`` : Je(t) ? `Event \`${Mf(t)}\` (type=${t.type}) captured as ${r}` : `Object captured as ${r} with keys: ${n}`;
}
function Mf(t) {
  try {
    const e = Object.getPrototypeOf(t);
    return e ? e.constructor.name : void 0;
  } catch (e) {
  }
}
function vf(t) {
  for (const e in t)
    if (Object.prototype.hasOwnProperty.call(t, e)) {
      const n = t[e];
      if (n instanceof Error)
        return n;
    }
}
function mr(t) {
  if (!t || !t.length)
    return [];
  let e = t;
  const n = e[0].func || "", r = e[e.length - 1].func || "";
  return (n.indexOf("captureMessage") !== -1 || n.indexOf("captureException") !== -1) && (e = e.slice(1)), r.indexOf("sentryWrapped") !== -1 && (e = e.slice(0, -1)), e.map(
    (s) => ({
      colno: s.column === null ? void 0 : s.column,
      filename: s.url || e[0].url,
      function: s.func || "?",
      in_app: !0,
      lineno: s.line === null ? void 0 : s.line
    })
  ).slice(0, bf).reverse();
}
const Cf = () => {
  let t = {
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
    onAppHide: function(e) {
    },
    canIUse: function(e) {
      return !1;
    }
  };
  if (typeof wx == "object")
    t = wx;
  else if (typeof my == "object")
    t = my;
  else if (typeof tt == "object")
    t = tt;
  else if (typeof dd == "object")
    t = dd;
  else if (typeof qq == "object")
    t = qq;
  else if (typeof swan == "object")
    t = swan;
  else
    throw new Error("sentry-miniapp 暂不支持此平台");
  return t;
}, wf = () => {
  let t = "unknown";
  return typeof wx == "object" ? t = "wechat" : typeof my == "object" ? t = "alipay" : typeof tt == "object" ? t = "bytedance" : typeof dd == "object" ? t = "dingtalk" : typeof qq == "object" ? t = "qq" : typeof swan == "object" && (t = "swan"), t;
}, v = Cf(), Uo = wf(), Pf = "application/json";
function _r(t) {
  function e(n) {
    return new vt((r, s) => {
      const o = v.request || v.httpRequest;
      if (typeof o != "function") {
        s(new Error("Miniapp request function is not available"));
        return;
      }
      o({
        url: t.url,
        method: "POST",
        data: n.body,
        header: { "content-type": Pf },
        success(i) {
          var a, c, u, d;
          r({
            statusCode: i == null ? void 0 : i.statusCode,
            headers: {
              "x-sentry-rate-limits": (c = (a = i == null ? void 0 : i.headers) == null ? void 0 : a["X-Sentry-Rate-Limits"]) != null ? c : null,
              "retry-after": (d = (u = i == null ? void 0 : i.headers) == null ? void 0 : u["Retry-After"]) != null ? d : null
            }
          });
        },
        fail(i) {
          s(i);
        }
      });
    });
  }
  return _c(t, e);
}
const wp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  makeMiniappTransport: _r
}, Symbol.toStringTag, { value: "Module" })), xf = () => [];
class Df extends Ec {
  /**
   * Creates a new Miniapp SDK instance.
   *
   * @param options Configuration options for this SDK.
   */
  constructor(e = {}) {
    const n = e.transport || _r, r = e.stackParser || xf, s = e.integrations || e.defaultIntegrations || [], o = E(f({}, e), {
      transport: n,
      stackParser: r,
      integrations: s,
      dsn: e.dsn,
      // ensure defaults for required fields
      tracesSampleRate: e.tracesSampleRate
    });
    Cc(o, "miniapp", ["miniapp"]), super(o);
  }
  /**
   * @inheritDoc
   */
  _prepareEvent(e, n, r, s) {
    return e.platform = e.platform || "javascript", e.sdk = E(f({}, e.sdk), {
      name: _f,
      packages: [
        ...e.sdk && e.sdk.packages || [],
        {
          name: "npm:@sentry/miniapp",
          version: Ts
        }
      ],
      version: Ts
    }), super._prepareEvent(e, n, r, s);
  }
  /**
   * Show a report dialog to the user to send feedback to a specific event.
   * 向用户显示报告对话框以将反馈发送到特定事件。---> 小程序上暂时用不到&不考虑。
   *
   * @param options Set individual options for the dialog
   */
  showReportDialog(e = {}) {
    console.log("sentry-miniapp 暂未实现该方法", e);
  }
  /**
   * @inheritDoc
   */
  // eslint-disable-next-line deprecation/deprecation
  eventFromException(e, n) {
    return Nf(e, n, this._options.attachStacktrace);
  }
  /**
   * @inheritDoc
   */
  // eslint-disable-next-line deprecation/deprecation
  eventFromMessage(e, n = "info", r) {
    return Rf(e, n, r, this._options.attachStacktrace);
  }
}
function $f() {
  setTimeout(() => {
  });
}
function Rt(t, e = {}, n) {
  if (typeof t != "function")
    return t;
  try {
    const s = t.__sentry_wrapped__;
    if (s)
      return s;
    if (Ps(t))
      return t;
  } catch (s) {
    return t;
  }
  const r = function(...s) {
    try {
      const o = s.map((i) => Rt(i, e));
      return t.handleEvent ? t.handleEvent.apply(this, o) : t.apply(this, o);
    } catch (o) {
      throw $f(), at((i) => {
        i.addEventProcessor((a) => {
          const c = f({}, a);
          return e.mechanism && (En(c, void 0), st(c, e.mechanism)), c.extra = E(f({}, c.extra), {
            arguments: F(s, 3)
          }), c;
        }), P(o);
      }), o;
    }
  };
  try {
    for (const s in t)
      Object.prototype.hasOwnProperty.call(t, s) && (r[s] = t[s]);
  } catch (s) {
  }
  ws(r, t), G(t, "__sentry_wrapped__", r);
  try {
    const s = Object.getOwnPropertyDescriptor(r, "name");
    s != null && s.configurable && Object.defineProperty(r, "name", {
      get() {
        return t.name;
      }
    });
  } catch (s) {
  }
  return r;
}
const Ge = class Ge {
  /** JSDoc */
  constructor(e) {
    this.name = Ge.id, this._onErrorHandlerInstalled = !1, this._onUnhandledRejectionHandlerInstalled = !1, this._onPageNotFoundHandlerInstalled = !1, this._onMemoryWarningHandlerInstalled = !1, this._options = f({
      onerror: !0,
      onunhandledrejection: !0,
      onpagenotfound: !0,
      onmemorywarning: !0
    }, e);
  }
  /**
   * @inheritDoc
   */
  setupOnce() {
    Error.stackTraceLimit = 50, this._options.onerror && (g.log("Global Handler attached: onError"), this._installGlobalOnErrorHandler()), this._options.onunhandledrejection && (g.log("Global Handler attached: onunhandledrejection"), this._installGlobalOnUnhandledRejectionHandler()), this._options.onpagenotfound && (g.log("Global Handler attached: onPageNotFound"), this._installGlobalOnPageNotFoundHandler()), this._options.onmemorywarning && (g.log("Global Handler attached: onMemoryWarning"), this._installGlobalOnMemoryWarningHandler());
  }
  /** JSDoc */
  _installGlobalOnErrorHandler() {
    this._onErrorHandlerInstalled || (v.onError && v.onError((e) => {
      const n = typeof e == "string" ? new Error(e) : e;
      P(n);
    }), this._onErrorHandlerInstalled = !0);
  }
  /** JSDoc */
  _installGlobalOnUnhandledRejectionHandler() {
    this._onUnhandledRejectionHandlerInstalled || (v.onUnhandledRejection && v.onUnhandledRejection(
      ({ reason: e, promise: n }) => {
        const r = typeof e == "string" ? new Error(e) : e;
        P(r, {
          data: n
        });
      }
    ), this._onUnhandledRejectionHandlerInstalled = !0);
  }
  /** JSDoc */
  _installGlobalOnPageNotFoundHandler() {
    this._onPageNotFoundHandlerInstalled || (v.onPageNotFound && v.onPageNotFound((e) => {
      const n = e.path.split("?")[0];
      zr("pagenotfound", n), Jr("message", JSON.stringify(e)), Wr(`页面无法找到: ${n}`);
    }), this._onPageNotFoundHandlerInstalled = !0);
  }
  /** JSDoc */
  _installGlobalOnMemoryWarningHandler() {
    this._onMemoryWarningHandlerInstalled || (v.onMemoryWarning && v.onMemoryWarning(({ level: e = -1 }) => {
      let n = "没有获取到告警级别信息";
      switch (e) {
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
      zr("memory-warning", String(e)), Jr("message", n), Wr("内存不足告警");
    }), this._onMemoryWarningHandlerInstalled = !0);
  }
};
Ge.id = "GlobalHandlers";
let De = Ge;
const He = class He {
  constructor() {
    this._ignoreOnError = 0, this.name = He.id;
  }
  /** JSDoc */
  _wrapTimeFunction(e) {
    return function(...n) {
      const r = n[0];
      return n[0] = Rt(r, {
        mechanism: {
          data: { function: ge(e) },
          handled: !0,
          type: "instrument"
        }
      }), e.apply(this, n);
    };
  }
  /** JSDoc */
  _wrapRAF(e) {
    return function(n) {
      return e(
        Rt(n, {
          mechanism: {
            data: {
              function: "requestAnimationFrame",
              handler: ge(e)
            },
            handled: !0,
            type: "instrument"
          }
        })
      );
    };
  }
  /** JSDoc */
  _wrapEventTarget(e) {
    const n = b, r = n[e] && n[e].prototype;
    !r || !r.hasOwnProperty || !r.hasOwnProperty("addEventListener") || (At(r, "addEventListener", function(s) {
      return function(o, i, a) {
        try {
          typeof i.handleEvent == "function" && (i.handleEvent = Rt(i.handleEvent.bind(i), {
            mechanism: {
              data: {
                function: "handleEvent",
                handler: ge(i),
                target: e
              },
              handled: !0,
              type: "instrument"
            }
          }));
        } catch (c) {
        }
        return s.call(
          this,
          o,
          Rt(i, {
            mechanism: {
              data: {
                function: "addEventListener",
                handler: ge(i),
                target: e
              },
              handled: !0,
              type: "instrument"
            }
          }),
          a
        );
      };
    }), At(r, "removeEventListener", function(s) {
      return function(o, i, a) {
        let c = i;
        try {
          c = c && (c.__sentry_wrapped__ || c);
        } catch (u) {
        }
        return s.call(this, o, c, a);
      };
    }));
  }
  /**
   * Wrap timer functions and event targets to catch errors
   * and provide better metadata.
   */
  setupOnce() {
    this._ignoreOnError = this._ignoreOnError;
    const e = b;
    At(e, "setTimeout", this._wrapTimeFunction.bind(this)), At(e, "setInterval", this._wrapTimeFunction.bind(this)), At(e, "requestAnimationFrame", this._wrapRAF.bind(this)), [
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
He.id = "TryCatch";
let $e = He;
function ge(t) {
  try {
    return t && t.name || "<anonymous>";
  } catch (e) {
    return "<anonymous>";
  }
}
const Lf = "cause", Ff = 5, zt = class zt {
  /**
   * @inheritDoc
   */
  constructor(e = {}) {
    this.name = zt.id, this._key = e.key || Lf, this._limit = e.limit || Ff;
  }
  /**
   * @inheritDoc
   */
  setupOnce() {
    tn((e, n) => {
      const r = O(), s = r && r.getIntegrationByName(zt.id);
      return s ? s._handler(e, n) : e;
    });
  }
  /**
   * @inheritDoc
   */
  _handler(e, n) {
    if (!e.exception || !e.exception.values || !n || !(n.originalException instanceof Error))
      return e;
    const r = this._walkErrorTree(n.originalException, this._key);
    return e.exception.values = [...r, ...e.exception.values], e;
  }
  /**
   * @inheritDoc
   */
  _walkErrorTree(e, n, r = []) {
    if (!(e[n] instanceof Error) || r.length + 1 >= this._limit)
      return r;
    const s = dr(e[n]);
    return this._walkErrorTree(e[n], n, [s, ...r]);
  }
};
zt.id = "LinkedErrors";
let Le = zt;
const Yt = class Yt {
  constructor() {
    this.name = Yt.id;
  }
  /**
   * @inheritDoc
   */
  setupOnce() {
    tn((e) => {
      const n = O();
      if (n && n.getIntegrationByName(Yt.id))
        try {
          const s = v.getSystemInfoSync(), {
            SDKVersion: o = "0.0.0",
            batteryLevel: i,
            // 微信小程序
            currentBattery: a,
            // 支付宝小程序、 钉钉小程序
            battery: c,
            // 字节跳动小程序
            brand: u,
            language: d,
            model: p,
            pixelRatio: m,
            platform: l,
            screenHeight: _,
            screenWidth: y,
            // statusBarHeight,
            system: h,
            version: I,
            // windowHeight,
            // windowWidth,
            app: R,
            // 支付宝小程序
            appName: w
            // 字节跳动小程序
            // fontSizeSetting, // 支付宝小程序、 钉钉小程序、微信小程序
          } = s, [U, Y] = h.split(" "), Et = E(f({}, e.tags), {
            SDKVersion: o
          }), T = R || w || Uo || "app";
          return E(f({}, e), {
            tags: Et,
            contexts: E(f({}, e.contexts), {
              device: {
                brand: u,
                battery_level: i || a || c,
                model: p,
                language: d,
                platform: l,
                screen_dpi: m,
                screen_height: _,
                screen_width: y
              },
              os: {
                name: U || h,
                version: Y || h
              },
              browser: {
                name: T,
                version: I
              }
            })
          });
        } catch (s) {
          console.warn(`sentry-miniapp get system info fail: ${s}`);
        }
      return e;
    });
  }
};
Yt.id = "System";
let Fe = Yt;
const Vt = class Vt {
  /**
   * @inheritDoc
   */
  constructor(e) {
    this.name = Vt.id, this._options = f({
      enable: !0
    }, e);
  }
  /**
   * @inheritDoc
   */
  setupOnce() {
    tn((e) => {
      const n = O();
      if (n && n.getIntegrationByName(Vt.id) && this._options.enable)
        try {
          const s = getCurrentPages().map(
            (o) => ({
              route: o.route,
              options: o.options
            })
          );
          return E(f({}, e), {
            extra: E(f({}, e.extra), {
              routers: s
            })
          });
        } catch (s) {
          console.warn(`sentry-miniapp get router info fail: ${s}`);
        }
      return e;
    });
  }
};
Vt.id = "Router";
let Ue = Vt;
const Kt = class Kt {
  constructor() {
    this.name = Kt.id;
  }
  /**
   * @inheritDoc
   */
  setupOnce() {
    tn((e) => {
      const n = O();
      return n && n.getIntegrationByName(Kt.id) && Uo === "wechat" && v.getLaunchOptionsSync && v.getLaunchOptionsSync().scene === 1129 ? null : e;
    });
  }
};
Kt.id = "IgnoreMpcrawlerErrors";
let je = Kt;
const Pp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GlobalHandlers: De,
  IgnoreMpcrawlerErrors: je,
  LinkedErrors: Le,
  Router: Ue,
  System: Fe,
  TryCatch: $e
}, Symbol.toStringTag, { value: "Module" })), Uf = [
  jc(),
  $c(),
  new $e(),
  new De(),
  new Le(),
  new Fe(),
  new Ue(),
  new je()
];
function xp(t = {}) {
  t.defaultIntegrations === void 0 && (t.defaultIntegrations = Uf), t.normalizeDepth = t.normalizeDepth || 5;
  const e = f({
    integrations: t.integrations || t.defaultIntegrations || [],
    stackParser: t.stackParser || (() => []),
    transport: t.transport || _r
  }, t);
  Nc(Df, e);
}
function Dp(t = {}) {
  t.eventId || (t.eventId = so());
  const e = O();
  e && e.showReportDialog(t);
}
function $p() {
  return so();
}
function Lp(t) {
  const e = O();
  return e ? e.flush(t) : jt(!1);
}
function Fp(t) {
  const e = O();
  return e ? e.close(t) : jt(!1);
}
function Up(t) {
  return Rt(t)();
}
const jf = 1e12;
function he(t) {
  return t / 1e3;
}
class Bf {
  constructor(e = !1) {
    this._reportAllChanges = e, this._measurements = {};
  }
  /**
   * Add performance entries from the miniapp performance API.
   * Called when the idle span is being ended.
   */
  addPerformanceEntriesFromSpan(e) {
    const n = this._getPerformance();
    if (!n)
      return;
    const s = A(e).start_timestamp;
    this._timeOrigin = this._getTimeOrigin(n, s), this._stopObserver(), this._applyMeasurementsToSpan();
  }
  /**
   * Start observing performance entries and create child spans.
   * Should be called when a new route span starts.
   */
  startObserving(e) {
    var s;
    const n = this._getPerformance();
    if (!n)
      return;
    const r = A(e);
    this._timeOrigin = this._getTimeOrigin(n, r.start_timestamp), this._measurements = {}, this._observer = (s = n.createObserver) == null ? void 0 : s.call(n, (o) => {
      var c;
      const i = ((c = o == null ? void 0 : o.getEntries) == null ? void 0 : c.call(o)) || [], a = A(e);
      if (a.timestamp !== void 0) {
        this._stopObserver();
        return;
      }
      i.forEach((u) => this._handleEntry(e, u, a.start_timestamp));
    }), this._observer && this._observer.observe({
      entryTypes: ["navigation", "render", "script", "loadPackage", "resource"]
    });
  }
  _getPerformance() {
    if (!v.getPerformance)
      return;
    const e = v.getPerformance();
    if (!(!e || typeof e.createObserver != "function"))
      return e;
  }
  _getTimeOrigin(e, n) {
    if (typeof e.timeOrigin == "number")
      return he(e.timeOrigin);
    const r = typeof e.now == "function" ? e.now() : void 0;
    return typeof r == "number" ? he(Date.now() - r) : n;
  }
  _handleEntry(e, n, r) {
    const s = this._toTimestamp(n.startTime, r), o = this._toTimestamp(n.startTime + n.duration, r), i = no({
      name: this._getDescription(n) || n.entryType,
      op: this._mapOp(n),
      startTime: s,
      attributes: this._buildSpanAttributes(n)
    });
    i && i.end(o), this._recordMeasurements(n, r, s);
  }
  _mapOp(e) {
    switch (e.entryType) {
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
        return e.entryType || "custom";
    }
  }
  _getDescription(e) {
    return e.path || e.moduleName || e.name;
  }
  _buildSpanAttributes(e) {
    const n = {
      "performance.entry_type": e.entryType
    };
    return e.moduleName && (n["performance.module_name"] = e.moduleName), e.path && (n["performance.path"] = e.path), typeof e.duration == "number" && (n["performance.duration_ms"] = e.duration), n;
  }
  _recordMeasurements(e, n, r) {
    const s = (e.name || "").toLowerCase(), o = e.duration, i = Math.max((r - n) * 1e3, 0);
    if (s === "first-paint" || s === "firstpaint" ? this._measurements.fp = { value: i, unit: "millisecond" } : s === "first-contentful-paint" || s === "firstcontentfulpaint" ? this._measurements.fcp = { value: i, unit: "millisecond" } : s === "largest-contentful-paint" || s === "largestcontentfulpaint" || s === "lcp" ? this._measurements.lcp = { value: i, unit: "millisecond" } : (s === "first-input-delay" || s === "firstinputdelay" || s === "fid") && typeof o == "number" ? this._measurements.fid = { value: o, unit: "millisecond" } : e.entryType === "navigation" && typeof o == "number" && !this._measurements.navigation && (this._measurements.navigation = { value: o, unit: "millisecond" }), this._reportAllChanges && typeof o == "number") {
      const a = this._measurementKey(e);
      a && !this._measurements[a] && (this._measurements[a] = { value: o, unit: "millisecond" });
    }
  }
  _measurementKey(e) {
    const n = e.name || e.entryType;
    if (n)
      return n.replace(/\s+/g, "_").toLowerCase();
  }
  _toTimestamp(e, n) {
    var s;
    return e > jf ? he(e) : ((s = this._timeOrigin) != null ? s : n) + he(e);
  }
  _applyMeasurementsToSpan() {
    for (const [e, n] of Object.entries(this._measurements))
      pa(e, n.value, n.unit);
  }
  _stopObserver() {
    var e;
    (e = this._observer) == null || e.disconnect(), this._observer = void 0;
  }
}
const Gf = {
  traceRequest: !0
}, x = typeof __SENTRY_DEBUG__ == "undefined" ? !0 : __SENTRY_DEBUG__;
function jo() {
  const t = Ut(), e = t && j(t);
  if (!e)
    return;
  const n = A(e).op;
  return n === "navigation" || n === "pageload" ? e : void 0;
}
function Bo(t) {
  return { name: t.path || "unknown", source: "url" };
}
function Go(t, e) {
  const n = {
    [z]: e
  };
  return t.openType && (n["miniapp.open_type"] = t.openType), t.scene !== void 0 && (n["miniapp.scene"] = t.scene), t.isTabBar !== void 0 && (n["miniapp.is_tabbar"] = t.isTabBar), t.webviewId !== void 0 && (n["miniapp.webview_id"] = t.webviewId), t.query && (n["miniapp.query"] = t.query), n;
}
function Hf(t) {
  return {
    path: (t == null ? void 0 : t.path) || (t == null ? void 0 : t.route) || (t == null ? void 0 : t.url) || "unknown-route",
    query: t == null ? void 0 : t.query,
    scene: t == null ? void 0 : t.scene,
    openType: t == null ? void 0 : t.openType,
    isTabBar: t == null ? void 0 : t.isTabBar,
    webviewId: t == null ? void 0 : t.webviewId
  };
}
function qf(t, e = !1) {
  return !!(t === "appLaunch" || e);
}
function Wf(t, e) {
  const { instrumentPageLoad: n = !0, instrumentNavigation: r = !0 } = t, s = b, o = s.wx || s.my;
  if (!o) {
    x && g.warn("[MiniAppTracing] No miniapp global object found");
    return;
  }
  const i = v.onAppRoute || o.onAppRoute, a = v.onAppRouteDone || o.onAppRouteDone, c = v.onBeforePageLoad || o.onBeforePageLoad, u = v.onAfterPageLoad || o.onAfterPageLoad;
  if (typeof i != "function") {
    x && g.warn("[MiniAppTracing] onAppRoute not available");
    return;
  }
  let d = !0, p = !1;
  if (n && typeof s.getCurrentPages == "function") {
    const m = s.getCurrentPages() || [], l = m[m.length - 1];
    if (l != null && l.route) {
      p = !0, d = !1;
      const _ = {
        path: l.route,
        openType: "appLaunch"
      };
      As(_, e);
    }
  }
  i((m) => {
    const l = Hf(m), _ = !p && qf(l.openType, d);
    if (d && (d = !1), _ && n) {
      p = !0, As(l, e);
      return;
    }
    r && p && Jf(l, e);
  }), typeof a == "function" && a((m) => {
    x && g.log("[MiniAppTracing] Route done:", m == null ? void 0 : m.path);
  }), typeof c == "function" && c((m) => {
    x && g.log("[MiniAppTracing] Before page load:", m == null ? void 0 : m.path);
  }), typeof u == "function" && u((m) => {
    x && g.log("[MiniAppTracing] After page load:", m == null ? void 0 : m.path);
  });
}
function As(t, e) {
  const { name: n, source: r } = Bo(t), s = Go(t, "auto.pageload.miniapp");
  s[Q] = r;
  const o = jo();
  o ? ((A(o).data || {})[Q] !== "custom" && (o.updateName(n), o.setAttribute(Q, r)), o.setAttributes(s), x && g.log(`[MiniAppTracing] Updated pageload span: ${n}`)) : (k().setTransactionName(n), e({
    name: n,
    op: "pageload",
    attributes: s
  }), x && g.log(`[MiniAppTracing] Created pageload span: ${n}`));
}
function Jf(t, e) {
  const { name: n, source: r } = Bo(t), s = Go(t, "auto.navigation.miniapp");
  s[Q] = r, k().setTransactionName(n), e({
    name: n,
    op: "navigation",
    attributes: s
  }), x && g.log(`[MiniAppTracing] Created navigation span: ${n}`);
}
function jp() {
  return jo();
}
const zf = 3600;
let Ot, Be;
function Yf() {
  return {
    traceId: ot(),
    spanId: Lt(),
    sampleRand: Math.random()
  };
}
function Vf() {
  return Ot || (Ot = Yf()), Ot;
}
function Kf(t = !1) {
  const e = Ot;
  return Ot = {
    traceId: t && e ? e.traceId : ot(),
    spanId: Lt(),
    sampleRand: Math.random()
  }, Ot;
}
function Xf() {
  return Be;
}
function Zf(t, e, n, r, s, o) {
  Be = {
    spanContext: {
      traceId: t,
      spanId: e,
      traceFlags: n ? 1 : 0
    },
    startTimestamp: r,
    sampleRate: s,
    sampleRand: o
  };
}
function Qf() {
  return Be ? Date.now() / 1e3 - Be.startTimestamp <= zf : !1;
}
const tp = 1e3, ep = 3e4, np = 15e3, rp = "MiniAppTracing", Ho = "_sentry_miniapp_idleSpan";
function gr(t) {
  return t[Ho];
}
function Ns(t, e) {
  G(t, Ho, e);
}
const sp = f({
  idleTimeout: tp,
  finalTimeout: ep,
  childSpanTimeout: np,
  instrumentPageLoad: !0,
  instrumentNavigation: !0,
  traceContinuityMode: "link",
  consistentTraceSampling: !1
}, Gf);
function Bp(t = {}) {
  const e = f(f({}, sp), t), {
    idleTimeout: n,
    finalTimeout: r,
    childSpanTimeout: s,
    instrumentPageLoad: o,
    instrumentNavigation: i,
    traceContinuityMode: a,
    consistentTraceSampling: c,
    beforeStartSpan: u,
    _metricOptions: d
  } = e;
  let p, m, l;
  return {
    name: rp,
    setupOnce() {
      p = new Bf(d == null ? void 0 : d._reportAllChanges);
    },
    setup(_) {
      var y;
      (y = v.onAppHide) == null || y.call(v, () => {
        const h = gr(_);
        h && !A(h).timestamp && (x && g.log("[MiniAppTracing] App hiding, finishing active span"), h.setAttribute(Re, "appHide"), h.end());
      });
    },
    afterAllSetup(_) {
      Wf(
        {
          instrumentPageLoad: o,
          instrumentNavigation: i
        },
        (h) => {
          op(_, h, {
            idleTimeout: n,
            finalTimeout: r,
            childSpanTimeout: s,
            traceContinuityMode: a,
            consistentTraceSampling: c,
            beforeStartSpan: u,
            metricsInstrumentation: p,
            latestRoute: {
              get name() {
                return m;
              },
              set name(I) {
                m = I;
              },
              get source() {
                return l;
              },
              set source(I) {
                l = I;
              }
            }
          });
        }
      );
    }
  };
}
function op(t, e, n) {
  const {
    idleTimeout: r,
    finalTimeout: s,
    childSpanTimeout: o,
    traceContinuityMode: i,
    consistentTraceSampling: a,
    beforeStartSpan: c,
    metricsInstrumentation: u,
    latestRoute: d
  } = n;
  ip(t);
  const p = ap(i, a), m = c ? c(e) : e;
  p && p.length > 0 && (m.links = [
    ...m.links || [],
    ...p
  ]);
  const l = m.attributes || {};
  d.name = m.name, d.source = l[Q];
  const _ = Ta(m, {
    idleTimeout: r,
    finalTimeout: s,
    childSpanTimeout: o,
    beforeSpanEnd: (y) => {
      var w;
      u == null || u.addPerformanceEntriesFromSpan(y), Ns(t, void 0);
      const h = k(), I = h.getPropagationContext();
      h.setPropagationContext(E(f({}, I), {
        traceId: y.spanContext().traceId,
        sampled: yt(y),
        dsc: it(y)
      }));
      const R = A(y);
      Zf(
        y.spanContext().traceId,
        y.spanContext().spanId,
        yt(y),
        R.start_timestamp,
        1,
        (w = I.sampleRand) != null ? w : Math.random()
      ), x && g.log(
        `[MiniAppTracing] Span ended: ${R.op} - ${R.description}, traceId=${y.spanContext().traceId}`
      );
    }
  });
  return _.setAttribute("miniapp.trace_continuity_mode", i), Ns(t, _), x && g.log(
    `[MiniAppTracing] Started ${e.op} span: ${e.name}, traceId=${_.spanContext().traceId}`
  ), _;
}
function ip(t) {
  const e = gr(t);
  e && !A(e).timestamp && (x && g.log(`[MiniAppTracing] Finishing current active span with op: ${A(e).op}`), e.setAttribute(Re, "navigationStart"), e.end());
}
function ap(t, e) {
  var s;
  if (t === "off") {
    k().setPropagationContext({
      traceId: ot(),
      sampleRand: Math.random()
    });
    return;
  }
  const n = Xf(), r = Qf();
  if (t === "session") {
    const o = Vf();
    k().setPropagationContext(f({
      traceId: o.traceId,
      sampleRand: o.sampleRand
    }, e && r && n && {
      sampled: n.spanContext.traceFlags === 1
    })), x && g.log(`[MiniAppTracing] Session mode: reusing traceId=${o.traceId}`);
    return;
  }
  if (t === "link") {
    const o = Kf(!1);
    if (k().setPropagationContext(f({
      traceId: o.traceId,
      sampleRand: o.sampleRand
    }, e && r && n && {
      sampled: n.spanContext.traceFlags === 1
    })), r && n)
      return x && g.log(
        `[MiniAppTracing] Link mode: new traceId=${o.traceId}, linked from ${n.spanContext.traceId}`
      ), [
        {
          context: {
            traceId: n.spanContext.traceId,
            spanId: n.spanContext.spanId,
            traceFlags: (s = n.spanContext.traceFlags) != null ? s : 0
          },
          attributes: {
            "sentry.link.type": "previous_trace"
          }
        }
      ];
  }
}
function Gp() {
  const t = O();
  return t ? gr(t) : void 0;
}
export {
  Pp as Integrations,
  Df as MiniappClient,
  _f as SDK_NAME,
  Ts as SDK_VERSION,
  wp as Transports,
  Pc as addBreadcrumb,
  tn as addEventProcessor,
  yp as captureConsoleIntegration,
  fp as captureEvent,
  P as captureException,
  Wr as captureMessage,
  Fp as close,
  Rp as consoleLoggingIntegration,
  kp as createConsolaReporter,
  Uf as defaultIntegrations,
  Sp as extraErrorDataIntegration,
  Ap as featureFlagsIntegration,
  Lp as flush,
  jp as getActiveMiniAppRootSpan,
  Gp as getActiveMiniAppSpan,
  Ut as getActiveSpan,
  k as getCurrentScope,
  j as getRootSpan,
  Ee as getSpanDescendants,
  Oi as getSpanStatusFromHttpCode,
  xp as init,
  vp as instrumentAnthropicAiClient,
  Cp as instrumentGoogleGenAIClient,
  Wf as instrumentMiniAppRouter,
  Mp as instrumentOpenAiClient,
  Su as instrumentSupabaseClient,
  $p as lastEventId,
  Np as logger,
  gp as makeMultiplexedTransport,
  Op as metrics,
  Bp as miniappTracingIntegration,
  hp as moduleMetadataIntegration,
  up as registerSpanErrorInstrumentation,
  Ep as rewriteFramesIntegration,
  pp as setContext,
  Jr as setExtra,
  dp as setExtras,
  Mr as setHttpStatus,
  pa as setMeasurement,
  zr as setTag,
  mp as setTags,
  _p as setUser,
  Dp as showReportDialog,
  no as startInactiveSpan,
  op as startMiniAppTracingNavigationSpan,
  lp as startNewTrace,
  re as startSpan,
  Me as startSpanManual,
  bp as supabaseIntegration,
  Ip as thirdPartyErrorFilterIntegration,
  Jn as withActiveSpan,
  at as withScope,
  Up as wrap,
  Tp as zodErrorsIntegration
};
