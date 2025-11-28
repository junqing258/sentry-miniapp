var Vi = Object.defineProperty, Ki = Object.defineProperties;
var Xi = Object.getOwnPropertyDescriptors;
var me = Object.getOwnPropertySymbols;
var Ir = Object.prototype.hasOwnProperty, Ar = Object.prototype.propertyIsEnumerable;
var pn = (t, e) => (e = Symbol[t]) ? e : Symbol.for("Symbol." + t);
var Tr = (t, e, n) => e in t ? Vi(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n, p = (t, e) => {
  for (var n in e || (e = {}))
    Ir.call(e, n) && Tr(t, n, e[n]);
  if (me)
    for (var n of me(e))
      Ar.call(e, n) && Tr(t, n, e[n]);
  return t;
}, b = (t, e) => Ki(t, Xi(e));
var dn = (t, e) => {
  var n = {};
  for (var r in t)
    Ir.call(t, r) && e.indexOf(r) < 0 && (n[r] = t[r]);
  if (t != null && me)
    for (var r of me(t))
      e.indexOf(r) < 0 && Ar.call(t, r) && (n[r] = t[r]);
  return n;
};
var F = (t, e, n) => new Promise((r, s) => {
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
  a((n = n.apply(t, e)).next());
}), st = function(t, e) {
  this[0] = t, this[1] = e;
}, _e = (t, e, n) => {
  var r = (o, a, c, u) => {
    try {
      var f = n[o](a), d = (a = f.value) instanceof st, m = f.done;
      Promise.resolve(d ? a[0] : a).then((l) => d ? r(o === "return" ? o : "next", a[1] ? { done: l.done, value: l.value } : l, c, u) : c({ value: l, done: m })).catch((l) => r("throw", l, c, u));
    } catch (l) {
      u(l);
    }
  }, s = (o) => i[o] = (a) => new Promise((c, u) => r(o, a, c, u)), i = {};
  return n = n.apply(t, e), i[pn("asyncIterator")] = () => i, s("next"), s("throw"), s("return"), i;
};
var ge = (t, e, n) => (e = t[pn("asyncIterator")]) ? e.call(t) : (t = t[pn("iterator")](), e = {}, n = (r, s) => (s = t[r]) && (e[r] = (i) => new Promise((o, a, c) => (i = s.call(t, i), c = i.done, Promise.resolve(i.value).then((u) => o({ value: u, done: c }), a)))), n("next"), n("return"), e);
const Rr = (
  // eslint-disable-next-line no-undef 
  typeof globalThis != "undefined" && globalThis || // eslint-disable-next-line no-undef
  typeof self != "undefined" && self || // eslint-disable-next-line no-undef
  typeof window != "undefined" && window || // eslint-disable-next-line no-undef
  typeof global != "undefined" && global || {}
);
class Zi {
  constructor(e) {
    if (this._entries = [], !!e) {
      if (typeof e == "string") {
        const n = e.startsWith("?") ? e.slice(1) : e;
        n.length > 0 && n.split("&").forEach((r) => {
          if (!r)
            return;
          const [s, i = ""] = r.split("=");
          this.append(decodeURIComponent(s), decodeURIComponent(i));
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
Rr.URLSearchParams || (Rr.URLSearchParams = Zi);
const S = typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__, I = globalThis, dt = "10.27.0";
function xt() {
  return We(I), I;
}
function We(t) {
  const e = t.__SENTRY__ = t.__SENTRY__ || {};
  return e.version = e.version || dt, e[dt] = e[dt] || {};
}
function Dt(t, e, n = I) {
  const r = n.__SENTRY__ = n.__SENTRY__ || {}, s = r[dt] = r[dt] || {};
  return s[t] || (s[t] = e());
}
const Fn = [
  "debug",
  "info",
  "warn",
  "error",
  "log",
  "assert",
  "trace"
], Qi = "Sentry Logger ", ke = {};
function $t(t) {
  if (!("console" in I))
    return t();
  const e = I.console, n = {}, r = Object.keys(ke);
  r.forEach((s) => {
    const i = ke[s];
    n[s] = e[s], e[s] = i;
  });
  try {
    return t();
  } finally {
    r.forEach((s) => {
      e[s] = n[s];
    });
  }
}
function to() {
  jn().enabled = !0;
}
function eo() {
  jn().enabled = !1;
}
function Ps() {
  return jn().enabled;
}
function no(...t) {
  Un("log", ...t);
}
function ro(...t) {
  Un("warn", ...t);
}
function so(...t) {
  Un("error", ...t);
}
function Un(t, ...e) {
  S && Ps() && $t(() => {
    I.console[t](`${Qi}[${t}]:`, ...e);
  });
}
function jn() {
  return S ? Dt("loggerSettings", () => ({ enabled: !1 })) : { enabled: !1 };
}
const g = {
  /** Enable logging. */
  enable: to,
  /** Disable logging. */
  disable: eo,
  /** Check if logging is enabled. */
  isEnabled: Ps,
  /** Log a message. */
  log: no,
  /** Log a warning. */
  warn: ro,
  /** Log an error. */
  error: so
}, mn = "<anonymous>";
function xs(t) {
  try {
    return !t || typeof t != "function" ? mn : t.name || mn;
  } catch (e) {
    return mn;
  }
}
function io(t) {
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
function Ds(t) {
  return "__v_isVNode" in t && t.__v_isVNode ? "[VueVNode]" : "[VueViewModel]";
}
const be = {}, Nr = {};
function Bn(t, e) {
  be[t] = be[t] || [], be[t].push(e);
}
function Gn(t, e) {
  if (!Nr[t]) {
    Nr[t] = !0;
    try {
      e();
    } catch (n) {
      S && g.error(`Error while instrumenting ${t}`, n);
    }
  }
}
function Hn(t, e) {
  const n = t && be[t];
  if (n)
    for (const r of n)
      try {
        r(e);
      } catch (s) {
        S && g.error(
          `Error while triggering instrumentation handler.
Type: ${t}
Name: ${xs(r)}
Error:`,
          s
        );
      }
}
let _n = null;
function oo(t) {
  const e = "error";
  Bn(e, t), Gn(e, ao);
}
function ao() {
  _n = I.onerror, I.onerror = function(t, e, n, r, s) {
    return Hn("error", {
      column: r,
      error: s,
      line: n,
      msg: t,
      url: e
    }), _n ? _n.apply(this, arguments) : !1;
  }, I.onerror.__SENTRY_INSTRUMENTED__ = !0;
}
let gn = null;
function co(t) {
  const e = "unhandledrejection";
  Bn(e, t), Gn(e, uo);
}
function uo() {
  gn = I.onunhandledrejection, I.onunhandledrejection = function(t) {
    return Hn("unhandledrejection", t), gn ? gn.apply(this, arguments) : !0;
  }, I.onunhandledrejection.__SENTRY_INSTRUMENTED__ = !0;
}
const $s = Object.prototype.toString;
function mt(t) {
  switch ($s.call(t)) {
    case "[object Error]":
    case "[object Exception]":
    case "[object DOMException]":
    case "[object WebAssembly.Exception]":
      return !0;
    default:
      return Ve(t, Error);
  }
}
function Lt(t, e) {
  return $s.call(t) === `[object ${e}]`;
}
function Ls(t) {
  return Lt(t, "ErrorEvent");
}
function kr(t) {
  return Lt(t, "DOMError");
}
function lo(t) {
  return Lt(t, "DOMException");
}
function Oe(t) {
  return Lt(t, "String");
}
function Je(t) {
  return typeof t == "object" && t !== null && "__sentry_template_string__" in t && "__sentry_template_values__" in t;
}
function zn(t) {
  return t === null || Je(t) || typeof t != "object" && typeof t != "function";
}
function St(t) {
  return Lt(t, "Object");
}
function Ye(t) {
  return typeof Event != "undefined" && Ve(t, Event);
}
function fo(t) {
  return typeof Element != "undefined" && Ve(t, Element);
}
function po(t) {
  return Lt(t, "RegExp");
}
function Ft(t) {
  return !!(t != null && t.then && typeof t.then == "function");
}
function mo(t) {
  return St(t) && "nativeEvent" in t && "preventDefault" in t && "stopPropagation" in t;
}
function Ve(t, e) {
  try {
    return t instanceof e;
  } catch (n) {
    return !1;
  }
}
function Fs(t) {
  return !!(typeof t == "object" && t !== null && (t.__isVue || t._isVue || t.__v_isVNode));
}
const _o = I, go = 80;
function ho(t, e = {}) {
  if (!t)
    return "<unknown>";
  try {
    let n = t;
    const r = 5, s = [];
    let i = 0, o = 0;
    const a = " > ", c = a.length;
    let u;
    const f = Array.isArray(e) ? e : e.keyAttrs, d = !Array.isArray(e) && e.maxStringLength || go;
    for (; n && i++ < r && (u = yo(n, f), !(u === "html" || i > 1 && o + s.length * c + u.length >= d)); )
      s.push(u), o += u.length, n = n.parentNode;
    return s.reverse().join(a);
  } catch (n) {
    return "<unknown>";
  }
}
function yo(t, e) {
  const n = t, r = [];
  if (!(n != null && n.tagName))
    return "";
  if (_o.HTMLElement && n instanceof HTMLElement && n.dataset) {
    if (n.dataset.sentryComponent)
      return n.dataset.sentryComponent;
    if (n.dataset.sentryElement)
      return n.dataset.sentryElement;
  }
  r.push(n.tagName.toLowerCase());
  const s = e != null && e.length ? e.filter((o) => n.getAttribute(o)).map((o) => [o, n.getAttribute(o)]) : null;
  if (s != null && s.length)
    s.forEach((o) => {
      r.push(`[${o[0]}="${o[1]}"]`);
    });
  else {
    n.id && r.push(`#${n.id}`);
    const o = n.className;
    if (o && Oe(o)) {
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
function Nt(t, e, n) {
  if (!(e in t))
    return;
  const r = t[e];
  if (typeof r != "function")
    return;
  const s = n(r);
  typeof s == "function" && Us(s, r);
  try {
    t[e] = s;
  } catch (i) {
    S && g.log(`Failed to replace method "${e}" in object`, t);
  }
}
function W(t, e, n) {
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
function Us(t, e) {
  try {
    const n = e.prototype || {};
    t.prototype = e.prototype = n, W(t, "__sentry_original__", e);
  } catch (n) {
  }
}
function js(t) {
  return t.__sentry_original__;
}
function Bs(t) {
  if (mt(t))
    return p({
      message: t.message,
      name: t.name,
      stack: t.stack
    }, vr(t));
  if (Ye(t)) {
    const e = p({
      type: t.type,
      target: Or(t.target),
      currentTarget: Or(t.currentTarget)
    }, vr(t));
    return typeof CustomEvent != "undefined" && Ve(t, CustomEvent) && (e.detail = t.detail), e;
  } else
    return t;
}
function Or(t) {
  try {
    return fo(t) ? ho(t) : Object.prototype.toString.call(t);
  } catch (e) {
    return "<unknown>";
  }
}
function vr(t) {
  if (typeof t == "object" && t !== null) {
    const e = {};
    for (const n in t)
      Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    return e;
  } else
    return {};
}
function So(t) {
  const e = Object.keys(Bs(t));
  return e.sort(), e[0] ? e.join(", ") : "[object has no keys]";
}
function te(t, e = 0) {
  return typeof t != "string" || e === 0 || t.length <= e ? t : `${t.slice(0, e)}...`;
}
function Mr(t, e) {
  if (!Array.isArray(t))
    return "";
  const n = [];
  for (let r = 0; r < t.length; r++) {
    const s = t[r];
    try {
      Fs(s) ? n.push(Ds(s)) : n.push(String(s));
    } catch (i) {
      n.push("[value cannot be serialized]");
    }
  }
  return n.join(e);
}
function Te(t, e, n = !1) {
  return Oe(t) ? po(e) ? e.test(t) : Oe(e) ? n ? t === e : t.includes(e) : !1 : !1;
}
function Ke(t, e = [], n = !1) {
  return e.some((r) => Te(t, r, n));
}
function Eo() {
  const t = I;
  return t.crypto || t.msCrypto;
}
let hn;
function bo() {
  return Math.random() * 16;
}
function Y(t = Eo()) {
  try {
    if (t != null && t.randomUUID)
      return t.randomUUID().replace(/-/g, "");
  } catch (e) {
  }
  return hn || (hn = "10000000100040008000" + 1e11), hn.replace(
    /[018]/g,
    (e) => (
      // eslint-disable-next-line no-bitwise
      (e ^ (bo() & 15) >> e / 4).toString(16)
    )
  );
}
function Gs(t) {
  var e, n;
  return (n = (e = t.exception) == null ? void 0 : e.values) == null ? void 0 : n[0];
}
function kt(t) {
  const { message: e, event_id: n } = t;
  if (e)
    return e;
  const r = Gs(t);
  return r ? r.type && r.value ? `${r.type}: ${r.value}` : r.type || r.value || n || "<unknown>" : n || "<unknown>";
}
function Rn(t, e, n) {
  const r = t.exception = t.exception || {}, s = r.values = r.values || [], i = s[0] = s[0] || {};
  i.value || (i.value = e || ""), i.type || (i.type = "Error");
}
function at(t, e) {
  const n = Gs(t);
  if (!n)
    return;
  const r = { type: "generic", handled: !0 }, s = n.mechanism;
  if (n.mechanism = p(p(p({}, r), s), e), e && "data" in e) {
    const i = p(p({}, s == null ? void 0 : s.data), e.data);
    n.mechanism.data = i;
  }
}
function wr(t) {
  if (To(t))
    return !0;
  try {
    W(t, "__sentry_captured__", !0);
  } catch (e) {
  }
  return !1;
}
function To(t) {
  try {
    return t.__sentry_captured__;
  } catch (e) {
  }
}
const Hs = 1e3;
function se() {
  return Date.now() / Hs;
}
function Io() {
  const { performance: t } = I;
  if (!(t != null && t.now) || !t.timeOrigin)
    return se;
  const e = t.timeOrigin;
  return () => (e + t.now()) / Hs;
}
let he;
function H() {
  return (he != null ? he : he = Io())();
}
function Nn(t, e = {}) {
  if (e.user && (!t.ipAddress && e.user.ip_address && (t.ipAddress = e.user.ip_address), !t.did && !e.did && (t.did = e.user.id || e.user.email || e.user.username)), t.timestamp = e.timestamp || H(), e.abnormal_mechanism && (t.abnormal_mechanism = e.abnormal_mechanism), e.ignoreDuration && (t.ignoreDuration = e.ignoreDuration), e.sid && (t.sid = e.sid.length === 32 ? e.sid : Y()), e.init !== void 0 && (t.init = e.init), !t.did && e.did && (t.did = `${e.did}`), typeof e.started == "number" && (t.started = e.started), t.ignoreDuration)
    t.duration = void 0;
  else if (typeof e.duration == "number")
    t.duration = e.duration;
  else {
    const n = t.timestamp - t.started;
    t.duration = n >= 0 ? n : 0;
  }
  e.release && (t.release = e.release), e.environment && (t.environment = e.environment), !t.ipAddress && e.ipAddress && (t.ipAddress = e.ipAddress), !t.userAgent && e.userAgent && (t.userAgent = e.userAgent), typeof e.errors == "number" && (t.errors = e.errors), e.status && (t.status = e.status);
}
function ie(t, e, n = 2) {
  if (!e || typeof e != "object" || n <= 0)
    return e;
  if (t && Object.keys(e).length === 0)
    return t;
  const r = p({}, t);
  for (const s in e)
    Object.prototype.hasOwnProperty.call(e, s) && (r[s] = ie(r[s], e[s], n - 1));
  return r;
}
function ct() {
  return Y();
}
function Ut() {
  return Y().substring(16);
}
const kn = "_sentrySpan";
function Et(t, e) {
  e ? W(t, kn, e) : delete t[kn];
}
function Mt(t) {
  return t[kn];
}
const Ao = 100;
class K {
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
      traceId: ct(),
      sampleRand: Math.random()
    };
  }
  /**
   * Clone all data from this scope into a new scope.
   */
  clone() {
    const e = new K();
    return e._breadcrumbs = [...this._breadcrumbs], e._tags = p({}, this._tags), e._attributes = p({}, this._attributes), e._extra = p({}, this._extra), e._contexts = p({}, this._contexts), this._contexts.flags && (e._contexts.flags = {
      values: [...this._contexts.flags.values]
    }), e._user = this._user, e._level = this._level, e._session = this._session, e._transactionName = this._transactionName, e._fingerprint = this._fingerprint, e._eventProcessors = [...this._eventProcessors], e._attachments = [...this._attachments], e._sdkProcessingMetadata = p({}, this._sdkProcessingMetadata), e._propagationContext = p({}, this._propagationContext), e._client = this._client, e._lastEventId = this._lastEventId, Et(e, Mt(this)), e;
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
    }, this._session && Nn(this._session, { user: e }), this._notifyScopeListeners(), this;
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
    return this._tags = p(p({}, this._tags), e), this._notifyScopeListeners(), this;
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
    return this._attributes = p(p({}, this._attributes), e), this._notifyScopeListeners(), this;
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
    return this._extra = p(p({}, this._extra), e), this._notifyScopeListeners(), this;
  }
  /**
   * Set a single key:value extra entry that will be sent as extra data with the event.
   */
  setExtra(e, n) {
    return this._extra = b(p({}, this._extra), { [e]: n }), this._notifyScopeListeners(), this;
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
    const n = typeof e == "function" ? e(this) : e, r = n instanceof K ? n.getScopeData() : St(n) ? e : void 0, {
      tags: s,
      attributes: i,
      extra: o,
      user: a,
      contexts: c,
      level: u,
      fingerprint: f = [],
      propagationContext: d
    } = r || {};
    return this._tags = p(p({}, this._tags), s), this._attributes = p(p({}, this._attributes), i), this._extra = p(p({}, this._extra), o), this._contexts = p(p({}, this._contexts), c), a && Object.keys(a).length && (this._user = a), u && (this._level = u), f.length && (this._fingerprint = f), d && (this._propagationContext = d), this;
  }
  /**
   * Clears the current scope and resets its properties.
   * Note: The client will not be cleared.
   */
  clear() {
    return this._breadcrumbs = [], this._tags = {}, this._attributes = {}, this._extra = {}, this._user = {}, this._contexts = {}, this._level = void 0, this._transactionName = void 0, this._fingerprint = void 0, this._session = void 0, Et(this, void 0), this._attachments = [], this.setPropagationContext({ traceId: ct(), sampleRand: Math.random() }), this._notifyScopeListeners(), this;
  }
  /**
   * Adds a breadcrumb to the scope.
   * By default, the last 100 breadcrumbs are kept.
   */
  addBreadcrumb(e, n) {
    var i;
    const r = typeof n == "number" ? n : Ao;
    if (r <= 0)
      return this;
    const s = b(p({
      timestamp: se()
    }, e), {
      // Breadcrumb messages can theoretically be infinitely large and they're held in memory so we truncate them not to leak (too much) memory
      message: e.message ? te(e.message, 2048) : e.message
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
      span: Mt(this)
    };
  }
  /**
   * Add data which will be accessible during event processing but won't get sent to Sentry.
   */
  setSDKProcessingMetadata(e) {
    return this._sdkProcessingMetadata = ie(this._sdkProcessingMetadata, e, 2), this;
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
    const r = (n == null ? void 0 : n.event_id) || Y();
    if (!this._client)
      return S && g.warn("No client configured on scope - will not capture exception!"), r;
    const s = new Error("Sentry syntheticException");
    return this._client.captureException(
      e,
      b(p({
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
    var o;
    const s = (r == null ? void 0 : r.event_id) || Y();
    if (!this._client)
      return S && g.warn("No client configured on scope - will not capture message!"), s;
    const i = (o = r == null ? void 0 : r.syntheticException) != null ? o : new Error(e);
    return this._client.captureMessage(
      e,
      n,
      b(p({
        originalException: e,
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
  captureEvent(e, n) {
    const r = (n == null ? void 0 : n.event_id) || Y();
    return this._client ? (this._client.captureEvent(e, b(p({}, n), { event_id: r }), this), r) : (S && g.warn("No client configured on scope - will not capture event!"), r);
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
function Ro() {
  return Dt("defaultCurrentScope", () => new K());
}
function No() {
  return Dt("defaultIsolationScope", () => new K());
}
class ko {
  constructor(e, n) {
    let r;
    e ? r = e : r = new K();
    let s;
    n ? s = n : s = new K(), this._stack = [{ scope: r }], this._isolationScope = s;
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
    return Ft(r) ? r.then(
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
function wt() {
  const t = xt(), e = We(t);
  return e.stack = e.stack || new ko(Ro(), No());
}
function Oo(t) {
  return wt().withScope(t);
}
function vo(t, e) {
  const n = wt();
  return n.withScope(() => (n.getStackTop().scope = t, e(t)));
}
function Cr(t) {
  return wt().withScope(() => t(wt().getIsolationScope()));
}
function Mo() {
  return {
    withIsolationScope: Cr,
    withScope: Oo,
    withSetScope: vo,
    withSetIsolationScope: (t, e) => Cr(e),
    getCurrentScope: () => wt().getScope(),
    getIsolationScope: () => wt().getIsolationScope()
  };
}
function oe(t) {
  const e = We(t);
  return e.acs ? e.acs : Mo();
}
function w() {
  const t = xt();
  return oe(t).getCurrentScope();
}
function j() {
  const t = xt();
  return oe(t).getIsolationScope();
}
function qn() {
  return Dt("globalScope", () => new K());
}
function lt(...t) {
  const e = xt(), n = oe(e);
  if (t.length === 2) {
    const [r, s] = t;
    return r ? n.withSetScope(r, s) : n.withScope(s);
  }
  return n.withScope(t[0]);
}
function v() {
  return w().getClient();
}
function zs(t) {
  const e = t.getPropagationContext(), { traceId: n, parentSpanId: r, propagationSpanId: s } = e, i = {
    trace_id: n,
    span_id: s || Ut()
  };
  return r && (i.parent_span_id = r), i;
}
const nt = "sentry.source", qs = "sentry.sample_rate", wo = "sentry.previous_trace_sample_rate", ee = "sentry.op", L = "sentry.origin", ne = "sentry.idle_span_finish_reason", Ws = "sentry.measurement_unit", Js = "sentry.measurement_value", Pr = "sentry.custom_span_name", Wn = "sentry.profile_id", Jn = "sentry.exclusive_time", Co = 0, Xe = 1, O = 2;
function Po(t) {
  if (t < 400 && t >= 100)
    return { code: Xe };
  if (t >= 400 && t < 500)
    switch (t) {
      case 401:
        return { code: O, message: "unauthenticated" };
      case 403:
        return { code: O, message: "permission_denied" };
      case 404:
        return { code: O, message: "not_found" };
      case 409:
        return { code: O, message: "already_exists" };
      case 413:
        return { code: O, message: "failed_precondition" };
      case 429:
        return { code: O, message: "resource_exhausted" };
      case 499:
        return { code: O, message: "cancelled" };
      default:
        return { code: O, message: "invalid_argument" };
    }
  if (t >= 500 && t < 600)
    switch (t) {
      case 501:
        return { code: O, message: "unimplemented" };
      case 503:
        return { code: O, message: "unavailable" };
      case 504:
        return { code: O, message: "deadline_exceeded" };
      default:
        return { code: O, message: "internal_error" };
    }
  return { code: O, message: "internal_error" };
}
function xr(t, e) {
  t.setAttribute("http.response.status_code", e);
  const n = Po(e);
  n.message !== "unknown_error" && t.setStatus(n);
}
const Ys = "_sentryScope", Vs = "_sentryIsolationScope";
function xo(t) {
  try {
    const e = I.WeakRef;
    if (typeof e == "function")
      return new e(t);
  } catch (e) {
  }
  return t;
}
function Do(t) {
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
function $o(t, e, n) {
  t && (W(t, Vs, xo(n)), W(t, Ys, e));
}
function ve(t) {
  const e = t;
  return {
    scope: e[Ys],
    isolationScope: Do(e[Vs])
  };
}
const Lo = "sentry-", Fo = /^sentry-/;
function Uo(t) {
  const e = jo(t);
  if (!e)
    return;
  const n = Object.entries(e).reduce((r, [s, i]) => {
    if (s.match(Fo)) {
      const o = s.slice(Lo.length);
      r[o] = i;
    }
    return r;
  }, {});
  if (Object.keys(n).length > 0)
    return n;
}
function jo(t) {
  if (!(!t || !Oe(t) && !Array.isArray(t)))
    return Array.isArray(t) ? t.reduce((e, n) => {
      const r = Dr(n);
      return Object.entries(r).forEach(([s, i]) => {
        e[s] = i;
      }), e;
    }, {}) : Dr(t);
}
function Dr(t) {
  return t.split(",").map((e) => {
    const n = e.indexOf("=");
    if (n === -1)
      return [];
    const r = e.slice(0, n), s = e.slice(n + 1);
    return [r, s].map((i) => {
      try {
        return decodeURIComponent(i.trim());
      } catch (o) {
        return;
      }
    });
  }).reduce((e, [n, r]) => (n && r && (e[n] = r), e), {});
}
const Bo = /^o(\d+)\./, Go = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)([\w.-]+)(?::(\d+))?\/(.+)/;
function Ho(t) {
  return t === "http" || t === "https";
}
function jt(t, e = !1) {
  const { host: n, path: r, pass: s, port: i, projectId: o, protocol: a, publicKey: c } = t;
  return `${a}://${c}${e && s ? `:${s}` : ""}@${n}${i ? `:${i}` : ""}/${r && `${r}/`}${o}`;
}
function Ks(t) {
  const e = Go.exec(t);
  if (!e) {
    $t(() => {
      console.error(`Invalid Sentry Dsn: ${t}`);
    });
    return;
  }
  const [n, r, s = "", i = "", o = "", a = ""] = e.slice(1);
  let c = "", u = a;
  const f = u.split("/");
  if (f.length > 1 && (c = f.slice(0, -1).join("/"), u = f.pop()), u) {
    const d = u.match(/^\d+/);
    d && (u = d[0]);
  }
  return Xs({ host: i, pass: s, path: c, projectId: u, port: o, protocol: n, publicKey: r });
}
function Xs(t) {
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
function zo(t) {
  if (!S)
    return !0;
  const { port: e, projectId: n, protocol: r } = t;
  return ["protocol", "publicKey", "host", "projectId"].find((o) => t[o] ? !1 : (g.error(`Invalid Sentry Dsn: ${o} missing`), !0)) ? !1 : n.match(/^\d+$/) ? Ho(r) ? e && isNaN(parseInt(e, 10)) ? (g.error(`Invalid Sentry Dsn: Invalid port ${e}`), !1) : !0 : (g.error(`Invalid Sentry Dsn: Invalid protocol ${r}`), !1) : (g.error(`Invalid Sentry Dsn: Invalid projectId ${n}`), !1);
}
function qo(t) {
  const e = t.match(Bo);
  return e == null ? void 0 : e[1];
}
function Wo(t) {
  const e = t.getOptions(), { host: n } = t.getDsn() || {};
  let r;
  return e.orgId ? r = String(e.orgId) : n && (r = qo(n)), r;
}
function Jo(t) {
  const e = typeof t == "string" ? Ks(t) : Xs(t);
  if (!(!e || !zo(e)))
    return e;
}
function Yn(t) {
  if (typeof t == "boolean")
    return Number(t);
  const e = typeof t == "string" ? parseFloat(t) : t;
  if (!(typeof e != "number" || isNaN(e) || e < 0 || e > 1))
    return e;
}
const Zs = 0, Vn = 1;
let $r = !1;
function Yo(t) {
  const { spanId: e, traceId: n } = t.spanContext(), { data: r, op: s, parent_span_id: i, status: o, origin: a, links: c } = N(t);
  return {
    parent_span_id: i,
    span_id: e,
    trace_id: n,
    data: r,
    op: s,
    status: o,
    origin: a,
    links: c
  };
}
function Qs(t) {
  const { spanId: e, traceId: n, isRemote: r } = t.spanContext(), s = r ? e : N(t).parent_span_id, i = ve(t).scope, o = r ? (i == null ? void 0 : i.getPropagationContext().propagationSpanId) || Ut() : e;
  return {
    parent_span_id: s,
    span_id: o,
    trace_id: n
  };
}
function ti(t) {
  if (t && t.length > 0)
    return t.map((o) => {
      var a = o, { context: c } = a, u = c, { spanId: e, traceId: n, traceFlags: r } = u, s = dn(u, ["spanId", "traceId", "traceFlags"]), { attributes: i } = a;
      return p({
        span_id: e,
        trace_id: n,
        sampled: r === Vn,
        attributes: i
      }, s);
    });
}
function _t(t) {
  return typeof t == "number" ? Lr(t) : Array.isArray(t) ? t[0] + t[1] / 1e9 : t instanceof Date ? Lr(t.getTime()) : H();
}
function Lr(t) {
  return t > 9999999999 ? t / 1e3 : t;
}
function N(t) {
  var r;
  if (Ko(t))
    return t.getSpanJSON();
  const { spanId: e, traceId: n } = t.spanContext();
  if (Vo(t)) {
    const { attributes: s, startTime: i, name: o, endTime: a, status: c, links: u } = t, f = "parentSpanId" in t ? t.parentSpanId : "parentSpanContext" in t ? (r = t.parentSpanContext) == null ? void 0 : r.spanId : void 0;
    return {
      span_id: e,
      trace_id: n,
      data: s,
      description: o,
      parent_span_id: f,
      start_timestamp: _t(i),
      // This is [0,0] by default in OTEL, in which case we want to interpret this as no end time
      timestamp: _t(a) || void 0,
      status: ei(c),
      op: s[ee],
      origin: s[L],
      links: ti(u)
    };
  }
  return {
    span_id: e,
    trace_id: n,
    start_timestamp: 0,
    data: {}
  };
}
function Vo(t) {
  const e = t;
  return !!e.attributes && !!e.startTime && !!e.name && !!e.endTime && !!e.status;
}
function Ko(t) {
  return typeof t.getSpanJSON == "function";
}
function bt(t) {
  const { traceFlags: e } = t.spanContext();
  return e === Vn;
}
function ei(t) {
  if (!(!t || t.code === Co))
    return t.code === Xe ? "ok" : t.message || "internal_error";
}
const gt = "_sentryChildSpans", On = "_sentryRootSpan";
function ni(t, e) {
  const n = t[On] || t;
  W(e, On, n), t[gt] ? t[gt].add(e) : W(t, gt, /* @__PURE__ */ new Set([e]));
}
function Xo(t, e) {
  t[gt] && t[gt].delete(e);
}
function Ie(t) {
  const e = /* @__PURE__ */ new Set();
  function n(r) {
    if (!e.has(r) && bt(r)) {
      e.add(r);
      const s = r[gt] ? Array.from(r[gt]) : [];
      for (const i of s)
        n(i);
    }
  }
  return n(t), Array.from(e);
}
function z(t) {
  return t[On] || t;
}
function Bt() {
  const t = xt(), e = oe(t);
  return e.getActiveSpan ? e.getActiveSpan() : Mt(w());
}
function vn() {
  $r || ($t(() => {
    console.warn(
      "[Sentry] Returning null from `beforeSendSpan` is disallowed. To drop certain spans, configure the respective integrations directly or use `ignoreSpans`."
    );
  }), $r = !0);
}
let Fr = !1;
function pp() {
  if (Fr)
    return;
  function t() {
    const e = Bt(), n = e && z(e);
    if (n) {
      const r = "internal_error";
      S && g.log(`[Tracing] Root span: ${r} -> Global error occurred`), n.setStatus({ code: O, message: r });
    }
  }
  t.tag = "sentry_tracingErrorCallback", Fr = !0, oo(t), co(t);
}
function Ze(t) {
  var n;
  if (typeof __SENTRY_TRACING__ == "boolean" && !__SENTRY_TRACING__)
    return !1;
  const e = t || ((n = v()) == null ? void 0 : n.getOptions());
  return !!e && // Note: This check is `!= null`, meaning "nullish". `0` is not "nullish", `undefined` and `null` are. (This comment was brought to you by 15 minutes of questioning life)
  (e.tracesSampleRate != null || !!e.tracesSampler);
}
function Ur(t) {
  g.log(`Ignoring span ${t.op} - ${t.description} because it matches \`ignoreSpans\`.`);
}
function Me(t, e) {
  if (!(e != null && e.length) || !t.description)
    return !1;
  for (const n of e) {
    if (Qo(n)) {
      if (Te(t.description, n))
        return S && Ur(t), !0;
      continue;
    }
    if (!n.name && !n.op)
      continue;
    const r = n.name ? Te(t.description, n.name) : !0, s = n.op ? t.op && Te(t.op, n.op) : !0;
    if (r && s)
      return S && Ur(t), !0;
  }
  return !1;
}
function Zo(t, e) {
  const n = e.parent_span_id, r = e.span_id;
  if (n)
    for (const s of t)
      s.parent_span_id === r && (s.parent_span_id = n);
}
function Qo(t) {
  return typeof t == "string" || t instanceof RegExp;
}
const Kn = "production", ri = "_frozenDsc";
function Ae(t, e) {
  W(t, ri, e);
}
function si(t, e) {
  const n = e.getOptions(), { publicKey: r } = e.getDsn() || {}, s = {
    environment: n.environment || Kn,
    release: n.release,
    public_key: r,
    trace_id: t,
    org_id: Wo(e)
  };
  return e.emit("createDsc", s), s;
}
function ii(t, e) {
  const n = e.getPropagationContext();
  return n.dsc || si(n.traceId, t);
}
function ut(t) {
  var h, y, _, E;
  const e = v();
  if (!e)
    return {};
  const n = z(t), r = N(n), s = r.data, i = n.spanContext().traceState, o = (y = (h = i == null ? void 0 : i.get("sentry.sample_rate")) != null ? h : s[qs]) != null ? y : s[wo];
  function a(T) {
    return (typeof o == "number" || typeof o == "string") && (T.sample_rate = `${o}`), T;
  }
  const c = n[ri];
  if (c)
    return a(c);
  const u = i == null ? void 0 : i.get("sentry.dsc"), f = u && Uo(u);
  if (f)
    return a(f);
  const d = si(t.spanContext().traceId, e), m = s[nt], l = r.description;
  return m !== "url" && l && (d.transaction = l), Ze() && (d.sampled = String(bt(n)), d.sample_rand = // In OTEL we store the sample rand on the trace state because we cannot access scopes for NonRecordingSpans
  // The Sentry OTEL SpanSampler takes care of writing the sample rand on the root span
  (E = i == null ? void 0 : i.get("sentry.sample_rand")) != null ? E : (
    // On all other platforms we can actually get the scopes from a root span (we use this as a fallback)
    (_ = ve(n).scope) == null ? void 0 : _.getPropagationContext().sampleRand.toString()
  )), a(d), e.emit("createDsc", d, n), d;
}
class Tt {
  constructor(e = {}) {
    this._traceId = e.traceId || ct(), this._spanId = e.spanId || Ut();
  }
  /** @inheritdoc */
  spanContext() {
    return {
      spanId: this._spanId,
      traceId: this._traceId,
      traceFlags: Zs
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
function G(t, e = 100, n = 1 / 0) {
  try {
    return Mn("", t, e, n);
  } catch (r) {
    return { ERROR: `**non-serializable** (${r})` };
  }
}
function oi(t, e = 3, n = 100 * 1024) {
  const r = G(t, e);
  return ra(r) > n ? oi(t, e - 1, n) : r;
}
function Mn(t, e, n = 1 / 0, r = 1 / 0, s = sa()) {
  const [i, o] = s;
  if (e == null || // this matches null and undefined -> eqeq not eqeqeq
  ["boolean", "string"].includes(typeof e) || typeof e == "number" && Number.isFinite(e))
    return e;
  const a = ta(t, e);
  if (!a.startsWith("[object "))
    return a;
  if (e.__sentry_skip_normalization__)
    return e;
  const c = typeof e.__sentry_override_normalization_depth__ == "number" ? e.__sentry_override_normalization_depth__ : n;
  if (c === 0)
    return a.replace("object ", "");
  if (i(e))
    return "[Circular ~]";
  const u = e;
  if (u && typeof u.toJSON == "function")
    try {
      const l = u.toJSON();
      return Mn("", l, c - 1, r, s);
    } catch (l) {
    }
  const f = Array.isArray(e) ? [] : {};
  let d = 0;
  const m = Bs(e);
  for (const l in m) {
    if (!Object.prototype.hasOwnProperty.call(m, l))
      continue;
    if (d >= r) {
      f[l] = "[MaxProperties ~]";
      break;
    }
    const h = m[l];
    f[l] = Mn(l, h, c - 1, r, s), d++;
  }
  return o(e), f;
}
function ta(t, e) {
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
    if (Fs(e))
      return Ds(e);
    if (mo(e))
      return "[SyntheticEvent]";
    if (typeof e == "number" && !Number.isFinite(e))
      return `[${e}]`;
    if (typeof e == "function")
      return `[Function: ${xs(e)}]`;
    if (typeof e == "symbol")
      return `[${String(e)}]`;
    if (typeof e == "bigint")
      return `[BigInt: ${String(e)}]`;
    const n = ea(e);
    return /^HTML(\w*)Element$/.test(n) ? `[HTMLElement: ${n}]` : `[object ${n}]`;
  } catch (n) {
    return `**non-serializable** (${n})`;
  }
}
function ea(t) {
  const e = Object.getPrototypeOf(t);
  return e != null && e.constructor ? e.constructor.name : "null prototype";
}
function na(t) {
  return ~-encodeURI(t).split(/%..|./).length;
}
function ra(t) {
  return na(JSON.stringify(t));
}
function sa() {
  const t = /* @__PURE__ */ new WeakSet();
  function e(r) {
    return t.has(r) ? !0 : (t.add(r), !1);
  }
  function n(r) {
    t.delete(r);
  }
  return [e, n];
}
function ft(t, e = []) {
  return [t, e];
}
function ia(t, e) {
  const [n, r] = t;
  return [n, [...r, e]];
}
function re(t, e) {
  const n = t[1];
  for (const r of n) {
    const s = r[0].type;
    if (e(r, s))
      return !0;
  }
  return !1;
}
function wn(t) {
  const e = We(I);
  return e.encodePolyfill ? e.encodePolyfill(t) : new TextEncoder().encode(t);
}
function oa(t) {
  const [e, n] = t;
  let r = JSON.stringify(e);
  function s(i) {
    typeof r == "string" ? r = typeof i == "string" ? r + i : [wn(r), i] : r.push(typeof i == "string" ? wn(i) : i);
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
        c = JSON.stringify(G(a));
      }
      s(c);
    }
  }
  return typeof r == "string" ? r : aa(r);
}
function aa(t) {
  const e = t.reduce((s, i) => s + i.length, 0), n = new Uint8Array(e);
  let r = 0;
  for (const s of t)
    n.set(s, r), r += s.length;
  return n;
}
function ca(t) {
  return [{
    type: "span"
  }, t];
}
function ua(t) {
  const e = typeof t.data == "string" ? wn(t.data) : t.data;
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
const la = {
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
function jr(t) {
  return la[t];
}
function ai(t) {
  if (!(t != null && t.sdk))
    return;
  const { name: e, version: n } = t.sdk;
  return { name: e, version: n };
}
function fa(t, e, n, r) {
  var i;
  const s = (i = t.sdkProcessingMetadata) == null ? void 0 : i.dynamicSamplingContext;
  return p(p(p({
    event_id: t.event_id,
    sent_at: (/* @__PURE__ */ new Date()).toISOString()
  }, e && { sdk: e }), !!n && r && { dsn: jt(r) }), s && {
    trace: s
  });
}
function pa(t, e) {
  var r, s, i, o;
  if (!e)
    return t;
  const n = t.sdk || {};
  return t.sdk = b(p({}, n), {
    name: n.name || e.name,
    version: n.version || e.version,
    integrations: [...((r = t.sdk) == null ? void 0 : r.integrations) || [], ...e.integrations || []],
    packages: [...((s = t.sdk) == null ? void 0 : s.packages) || [], ...e.packages || []],
    settings: (i = t.sdk) != null && i.settings || e.settings ? p(p({}, (o = t.sdk) == null ? void 0 : o.settings), e.settings) : void 0
  }), t;
}
function da(t, e, n, r) {
  const s = ai(n), i = p(p({
    sent_at: (/* @__PURE__ */ new Date()).toISOString()
  }, s && { sdk: s }), !!r && e && { dsn: jt(e) }), o = "aggregates" in t ? [{ type: "sessions" }, t] : [{ type: "session" }, t.toJSON()];
  return ft(i, [o]);
}
function ma(t, e, n, r) {
  const s = ai(n), i = t.type && t.type !== "replay_event" ? t.type : "event";
  pa(t, n == null ? void 0 : n.sdk);
  const o = fa(t, s, r, e);
  return delete t.sdkProcessingMetadata, ft(o, [[{ type: i }, t]]);
}
function _a(t, e) {
  function n(l) {
    return !!l.trace_id && !!l.public_key;
  }
  const r = ut(t[0]), s = e == null ? void 0 : e.getDsn(), i = e == null ? void 0 : e.getOptions().tunnel, o = p(p({
    sent_at: (/* @__PURE__ */ new Date()).toISOString()
  }, n(r) && { trace: r }), !!i && s && { dsn: jt(s) }), { beforeSendSpan: a, ignoreSpans: c } = (e == null ? void 0 : e.getOptions()) || {}, u = c != null && c.length ? t.filter((l) => !Me(N(l), c)) : t, f = t.length - u.length;
  f && (e == null || e.recordDroppedEvent("before_send", "span", f));
  const d = a ? (l) => {
    const h = N(l), y = a(h);
    return y || (vn(), h);
  } : N, m = [];
  for (const l of u) {
    const h = d(l);
    h && m.push(ca(h));
  }
  return ft(o, m);
}
function ga(t) {
  if (!S) return;
  const { description: e = "< unknown name >", op: n = "< unknown op >", parent_span_id: r } = N(t), { spanId: s } = t.spanContext(), i = bt(t), o = z(t), a = o === t, c = `[Tracing] Starting ${i ? "sampled" : "unsampled"} ${a ? "root " : ""}span`, u = [`op: ${n}`, `name: ${e}`, `ID: ${s}`];
  if (r && u.push(`parent ID: ${r}`), !a) {
    const { op: f, description: d } = N(o);
    u.push(`root ID: ${o.spanContext().spanId}`), f && u.push(`root op: ${f}`), d && u.push(`root description: ${d}`);
  }
  g.log(`${c}
  ${u.join(`
  `)}`);
}
function ha(t) {
  if (!S) return;
  const { description: e = "< unknown name >", op: n = "< unknown op >" } = N(t), { spanId: r } = t.spanContext(), i = z(t) === t, o = `[Tracing] Finishing "${n}" ${i ? "root " : ""}span "${e}" with ID ${r}`;
  g.log(o);
}
function ya(t, e, n, r = Bt()) {
  const s = r && z(r);
  s && (S && g.log(`[Measurement] Setting measurement on root span: ${t} = ${e} ${n}`), s.addEvent(t, {
    [Js]: e,
    [Ws]: n
  }));
}
function Br(t) {
  if (!t || t.length === 0)
    return;
  const e = {};
  return t.forEach((n) => {
    const r = n.attributes || {}, s = r[Ws], i = r[Js];
    typeof s == "string" && typeof i == "number" && (e[n.name] = { value: i, unit: s });
  }), e;
}
const Gr = 1e3;
class Qe {
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
    this._traceId = e.traceId || ct(), this._spanId = e.spanId || Ut(), this._startTime = e.startTimestamp || H(), this._links = e.links, this._attributes = {}, this.setAttributes(p({
      [L]: "manual",
      [ee]: e.op
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
      traceFlags: r ? Vn : Zs
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
    this._startTime = _t(e);
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
    return this._name = e, this.setAttribute(nt, "custom"), this;
  }
  /** @inheritdoc */
  end(e) {
    this._endTime || (this._endTime = _t(e), ha(this), this._onSpanEnded());
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
      op: this._attributes[ee],
      parent_span_id: this._parentSpanId,
      span_id: this._spanId,
      start_timestamp: this._startTime,
      status: ei(this._status),
      timestamp: this._endTime,
      trace_id: this._traceId,
      origin: this._attributes[L],
      profile_id: this._attributes[Wn],
      exclusive_time: this._attributes[Jn],
      measurements: Br(this._events),
      is_segment: this._isStandaloneSpan && z(this) === this || void 0,
      segment_id: this._isStandaloneSpan ? z(this).spanContext().spanId : void 0,
      links: ti(this._links)
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
    const s = Hr(n) ? n : r || H(), i = Hr(n) ? {} : n || {}, o = {
      name: e,
      time: _t(s),
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
    const e = v();
    if (e && e.emit("spanEnd", this), !(this._isStandaloneSpan || this === z(this)))
      return;
    if (this._isStandaloneSpan) {
      this._sampled ? Ea(_a([this], e)) : (S && g.log("[Tracing] Discarding standalone span because its trace was not chosen to be sampled."), e && e.recordDroppedEvent("sample_rate", "span"));
      return;
    }
    const r = this._convertSpanToTransaction();
    r && (ve(this).scope || w()).captureEvent(r);
  }
  /**
   * Finish the transaction & prepare the event to send to Sentry.
   */
  _convertSpanToTransaction() {
    var f;
    if (!zr(N(this)))
      return;
    this._name || (S && g.warn("Transaction has no name, falling back to `<unlabeled transaction>`."), this._name = "<unlabeled transaction>");
    const { scope: e, isolationScope: n } = ve(this), r = (f = e == null ? void 0 : e.getScopeData().sdkProcessingMetadata) == null ? void 0 : f.normalizedRequest;
    if (this._sampled !== !0)
      return;
    const i = Ie(this).filter((d) => d !== this && !Sa(d)).map((d) => N(d)).filter(zr), o = this._attributes[nt];
    delete this._attributes[Pr], i.forEach((d) => {
      delete d.data[Pr];
    });
    const a = p({
      contexts: {
        trace: Yo(this)
      },
      spans: (
        // spans.sort() mutates the array, but `spans` is already a copy so we can safely do this here
        // we do not use spans anymore after this point
        i.length > Gr ? i.sort((d, m) => d.start_timestamp - m.start_timestamp).slice(0, Gr) : i
      ),
      start_timestamp: this._startTime,
      timestamp: this._endTime,
      transaction: this._name,
      type: "transaction",
      sdkProcessingMetadata: {
        capturedSpanScope: e,
        capturedSpanIsolationScope: n,
        dynamicSamplingContext: ut(this)
      },
      request: r
    }, o && {
      transaction_info: {
        source: o
      }
    }), c = Br(this._events);
    return c && Object.keys(c).length && (S && g.log(
      "[Measurements] Adding measurements to transaction event",
      JSON.stringify(c, void 0, 2)
    ), a.measurements = c), a;
  }
}
function Hr(t) {
  return t && typeof t == "number" || t instanceof Date || Array.isArray(t);
}
function zr(t) {
  return !!t.start_timestamp && !!t.timestamp && !!t.span_id && !!t.trace_id;
}
function Sa(t) {
  return t instanceof Qe && t.isStandaloneSpan();
}
function Ea(t) {
  const e = v();
  if (!e)
    return;
  const n = t[1];
  if (!n || n.length === 0) {
    e.recordDroppedEvent("before_send", "span");
    return;
  }
  e.sendEnvelope(t);
}
function tn(t, e, n = () => {
}, r = () => {
}) {
  let s;
  try {
    s = t();
  } catch (i) {
    throw e(i), n(), i;
  }
  return ba(s, e, n, r);
}
function ba(t, e, n, r) {
  return Ft(t) ? t.then(
    (s) => (n(), r(s), s),
    (s) => {
      throw e(s), n(), s;
    }
  ) : (n(), r(t), t);
}
function Ta(t, e, n) {
  if (!Ze(t))
    return [!1];
  let r, s;
  typeof t.tracesSampler == "function" ? (s = t.tracesSampler(b(p({}, e), {
    inheritOrSampleWith: (a) => typeof e.parentSampleRate == "number" ? e.parentSampleRate : typeof e.parentSampled == "boolean" ? Number(e.parentSampled) : a
  })), r = !0) : e.parentSampled !== void 0 ? s = e.parentSampled : typeof t.tracesSampleRate != "undefined" && (s = t.tracesSampleRate, r = !0);
  const i = Yn(s);
  if (i === void 0)
    return S && g.warn(
      `[Tracing] Discarding root span because of invalid sample rate. Sample rate must be a boolean or a number between 0 and 1. Got ${JSON.stringify(
        s
      )} of type ${JSON.stringify(typeof s)}.`
    ), [!1];
  if (!i)
    return S && g.log(
      `[Tracing] Discarding transaction because ${typeof t.tracesSampler == "function" ? "tracesSampler returned 0 or false" : "a negative sampling decision was inherited or tracesSampleRate is set to 0"}`
    ), [!1, i, r];
  const o = n < i;
  return o || S && g.log(
    `[Tracing] Discarding transaction because it's not included in the random sample (sampling rate = ${Number(
      s
    )})`
  ), [o, i, r];
}
const ci = "__SENTRY_SUPPRESS_TRACING__";
function ae(t, e) {
  const n = nn();
  if (n.startSpan)
    return n.startSpan(t, e);
  const r = Zn(t), { forceTransaction: s, parentSpan: i, scope: o } = t, a = o == null ? void 0 : o.clone();
  return lt(a, () => li(i)(() => {
    const u = w(), f = Qn(u, i), m = t.onlyIfParent && !f ? new Tt() : Xn({
      parentSpan: f,
      spanArguments: r,
      forceTransaction: s,
      scope: u
    });
    return Et(u, m), tn(
      () => e(m),
      () => {
        const { status: l } = N(m);
        m.isRecording() && (!l || l === "ok") && m.setStatus({ code: O, message: "internal_error" });
      },
      () => {
        m.end();
      }
    );
  }));
}
function we(t, e) {
  const n = nn();
  if (n.startSpanManual)
    return n.startSpanManual(t, e);
  const r = Zn(t), { forceTransaction: s, parentSpan: i, scope: o } = t, a = o == null ? void 0 : o.clone();
  return lt(a, () => li(i)(() => {
    const u = w(), f = Qn(u, i), m = t.onlyIfParent && !f ? new Tt() : Xn({
      parentSpan: f,
      spanArguments: r,
      forceTransaction: s,
      scope: u
    });
    return Et(u, m), tn(
      // We pass the `finish` function to the callback, so the user can finish the span manually
      // this is mainly here for historic purposes because previously, we instructed users to call
      // `finish` instead of `span.end()` to also clean up the scope. Nowadays, calling `span.end()`
      // or `finish` has the same effect and we simply leave it here to avoid breaking user code.
      () => e(m, () => m.end()),
      () => {
        const { status: l } = N(m);
        m.isRecording() && (!l || l === "ok") && m.setStatus({ code: O, message: "internal_error" });
      }
    );
  }));
}
function ui(t) {
  const e = nn();
  if (e.startInactiveSpan)
    return e.startInactiveSpan(t);
  const n = Zn(t), { forceTransaction: r, parentSpan: s } = t;
  return (t.scope ? (o) => lt(t.scope, o) : s !== void 0 ? (o) => en(s, o) : (o) => o())(() => {
    const o = w(), a = Qn(o, s);
    return t.onlyIfParent && !a ? new Tt() : Xn({
      parentSpan: a,
      spanArguments: n,
      forceTransaction: r,
      scope: o
    });
  });
}
function en(t, e) {
  const n = nn();
  return n.withActiveSpan ? n.withActiveSpan(t, e) : lt((r) => (Et(r, t || void 0), e(r)));
}
function dp(t) {
  return lt((e) => (e.setPropagationContext({
    traceId: ct(),
    sampleRand: Math.random()
  }), S && g.log(`Starting a new trace with id ${e.getPropagationContext().traceId}`), en(null, t)));
}
function Xn({
  parentSpan: t,
  spanArguments: e,
  forceTransaction: n,
  scope: r
}) {
  if (!Ze()) {
    const o = new Tt();
    if (n || !t) {
      const a = p({
        sampled: "false",
        sample_rate: "0",
        transaction: e.name
      }, ut(o));
      Ae(o, a);
    }
    return o;
  }
  const s = j();
  let i;
  if (t && !n)
    i = Ia(t, r, e), ni(t, i);
  else if (t) {
    const o = ut(t), { traceId: a, spanId: c } = t.spanContext(), u = bt(t);
    i = qr(
      p({
        traceId: a,
        parentSpanId: c
      }, e),
      r,
      u
    ), Ae(i, o);
  } else {
    const {
      traceId: o,
      dsc: a,
      parentSpanId: c,
      sampled: u
    } = p(p({}, s.getPropagationContext()), r.getPropagationContext());
    i = qr(
      p({
        traceId: o,
        parentSpanId: c
      }, e),
      r,
      u
    ), a && Ae(i, a);
  }
  return ga(i), $o(i, r, s), i;
}
function Zn(t) {
  const e = t.experimental || {}, n = p({
    isStandalone: e.standalone
  }, t);
  if (t.startTime) {
    const r = p({}, n);
    return r.startTimestamp = _t(t.startTime), delete r.startTime, r;
  }
  return n;
}
function nn() {
  const t = xt();
  return oe(t);
}
function qr(t, e, n) {
  var h, y;
  const r = v(), s = (r == null ? void 0 : r.getOptions()) || {}, { name: i = "" } = t, o = { spanAttributes: p({}, t.attributes), spanName: i, parentSampled: n };
  r == null || r.emit("beforeSampling", o, { decision: !1 });
  const a = (h = o.parentSampled) != null ? h : n, c = o.spanAttributes, u = e.getPropagationContext(), [f, d, m] = e.getScopeData().sdkProcessingMetadata[ci] ? [!1] : Ta(
    s,
    {
      name: i,
      parentSampled: a,
      attributes: c,
      parentSampleRate: Yn((y = u.dsc) == null ? void 0 : y.sample_rate)
    },
    u.sampleRand
  ), l = new Qe(b(p({}, t), {
    attributes: p({
      [nt]: "custom",
      [qs]: d !== void 0 && m ? d : void 0
    }, c),
    sampled: f
  }));
  return !f && r && (S && g.log("[Tracing] Discarding root span because its trace was not chosen to be sampled."), r.recordDroppedEvent("sample_rate", "transaction")), r && r.emit("spanStart", l), l;
}
function Ia(t, e, n) {
  const { spanId: r, traceId: s } = t.spanContext(), i = e.getScopeData().sdkProcessingMetadata[ci] ? !1 : bt(t), o = i ? new Qe(b(p({}, n), {
    parentSpanId: r,
    traceId: s,
    sampled: i
  })) : new Tt({ traceId: s });
  ni(t, o);
  const a = v();
  return a && (a.emit("spanStart", o), n.endTimestamp && a.emit("spanEnd", o)), o;
}
function Qn(t, e) {
  if (e)
    return e;
  if (e === null)
    return;
  const n = Mt(t);
  if (!n)
    return;
  const r = v();
  return (r ? r.getOptions() : {}).parentSpanIsAlwaysRootSpan ? z(n) : n;
}
function li(t) {
  return t !== void 0 ? (e) => en(t, e) : (e) => e();
}
const yn = {
  idleTimeout: 1e3,
  finalTimeout: 3e4,
  childSpanTimeout: 15e3
}, Aa = "heartbeatFailed", Ra = "idleTimeout", Na = "finalTimeout", ka = "externalFinish";
function Oa(t, e = {}) {
  const n = /* @__PURE__ */ new Map();
  let r = !1, s, i = ka, o = !e.disableAutoFinish;
  const a = [], {
    idleTimeout: c = yn.idleTimeout,
    finalTimeout: u = yn.finalTimeout,
    childSpanTimeout: f = yn.childSpanTimeout,
    beforeSpanEnd: d,
    trimIdleSpanEndTimestamp: m = !0
  } = e, l = v();
  if (!l || !Ze()) {
    const R = new Tt(), x = p({
      sample_rate: "0",
      sampled: "false"
    }, ut(R));
    return Ae(R, x), R;
  }
  const h = w(), y = Bt(), _ = va(t);
  _.end = new Proxy(_.end, {
    apply(R, x, Wt) {
      if (d && d(_), x instanceof Tt)
        return;
      const [Jt, ...rt] = Wt, It = Jt || H(), B = _t(It), C = Ie(_).filter((Z) => Z !== _), Yt = N(_);
      if (!C.length || !m)
        return X(B), Reflect.apply(R, x, [B, ...rt]);
      const At = l.getOptions().ignoreSpans, le = C == null ? void 0 : C.reduce((Z, pe) => {
        const de = N(pe);
        return !de.timestamp || At && Me(de, At) ? Z : Z ? Math.max(Z, de.timestamp) : de.timestamp;
      }, void 0), Rt = Yt.start_timestamp, fe = Math.min(
        Rt ? Rt + u / 1e3 : 1 / 0,
        Math.max(Rt || -1 / 0, Math.min(B, le || 1 / 0))
      );
      return X(fe), Reflect.apply(R, x, [fe, ...rt]);
    }
  });
  function E() {
    s && (clearTimeout(s), s = void 0);
  }
  function T(R) {
    E(), s = setTimeout(() => {
      !r && n.size === 0 && o && (i = Ra, _.end(R));
    }, c);
  }
  function k(R) {
    s = setTimeout(() => {
      !r && o && (i = Aa, _.end(R));
    }, f);
  }
  function A(R) {
    E(), n.set(R, !0);
    const x = H();
    k(x + f / 1e3);
  }
  function $(R) {
    if (n.has(R) && n.delete(R), n.size === 0) {
      const x = H();
      T(x + c / 1e3);
    }
  }
  function X(R) {
    r = !0, n.clear(), a.forEach((C) => C()), Et(h, y);
    const x = N(_), { start_timestamp: Wt } = x;
    if (!Wt)
      return;
    x.data[ne] || _.setAttribute(ne, i);
    const rt = x.status;
    (!rt || rt === "unknown") && _.setStatus({ code: Xe }), g.log(`[Tracing] Idle span "${x.op}" finished`);
    const It = Ie(_).filter((C) => C !== _);
    let B = 0;
    It.forEach((C) => {
      C.isRecording() && (C.setStatus({ code: O, message: "cancelled" }), C.end(R), S && g.log("[Tracing] Cancelling span since span ended early", JSON.stringify(C, void 0, 2)));
      const Yt = N(C), { timestamp: At = 0, start_timestamp: le = 0 } = Yt, Rt = le <= R, fe = (u + c) / 1e3, Z = At - le <= fe;
      if (S) {
        const pe = JSON.stringify(C, void 0, 2);
        Rt ? Z || g.log("[Tracing] Discarding span since it finished after idle span final timeout", pe) : g.log("[Tracing] Discarding span since it happened after idle span was finished", pe);
      }
      (!Z || !Rt) && (Xo(_, C), B++);
    }), B > 0 && _.setAttribute("sentry.idle_span_discarded_spans", B);
  }
  return a.push(
    l.on("spanStart", (R) => {
      if (r || R === _ || N(R).timestamp || R instanceof Qe && R.isStandaloneSpan())
        return;
      Ie(_).includes(R) && A(R.spanContext().spanId);
    })
  ), a.push(
    l.on("spanEnd", (R) => {
      r || $(R.spanContext().spanId);
    })
  ), a.push(
    l.on("idleSpanEnableAutoFinish", (R) => {
      R === _ && (o = !0, T(), n.size && k());
    })
  ), e.disableAutoFinish || T(), setTimeout(() => {
    r || (_.setStatus({ code: O, message: "deadline_exceeded" }), i = Na, _.end());
  }, u), _;
}
function va(t) {
  const e = ui(t);
  return Et(w(), e), S && g.log("[Tracing] Started span is an idle span"), e;
}
const Sn = 0, Wr = 1, Jr = 2;
function Gt(t) {
  return new Ct((e) => {
    e(t);
  });
}
function tr(t) {
  return new Ct((e, n) => {
    n(t);
  });
}
class Ct {
  constructor(e) {
    this._state = Sn, this._handlers = [], this._runExecutor(e);
  }
  /** @inheritdoc */
  then(e, n) {
    return new Ct((r, s) => {
      this._handlers.push([
        !1,
        (i) => {
          if (!e)
            r(i);
          else
            try {
              r(e(i));
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
  catch(e) {
    return this.then((n) => n, e);
  }
  /** @inheritdoc */
  finally(e) {
    return new Ct((n, r) => {
      let s, i;
      return this.then(
        (o) => {
          i = !1, s = o, e && e();
        },
        (o) => {
          i = !0, s = o, e && e();
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
    if (this._state === Sn)
      return;
    const e = this._handlers.slice();
    this._handlers = [], e.forEach((n) => {
      n[0] || (this._state === Wr && n[1](this._value), this._state === Jr && n[2](this._value), n[0] = !0);
    });
  }
  /** Run the executor for the SyncPromise. */
  _runExecutor(e) {
    const n = (i, o) => {
      if (this._state === Sn) {
        if (Ft(o)) {
          o.then(r, s);
          return;
        }
        this._state = i, this._value = o, this._executeHandlers();
      }
    }, r = (i) => {
      n(Wr, i);
    }, s = (i) => {
      n(Jr, i);
    };
    try {
      e(r, s);
    } catch (i) {
      s(i);
    }
  }
}
function Ma(t, e, n, r = 0) {
  try {
    const s = Cn(e, n, t, r);
    return Ft(s) ? s : Gt(s);
  } catch (s) {
    return tr(s);
  }
}
function Cn(t, e, n, r) {
  const s = n[r];
  if (!t || !s)
    return t;
  const i = s(p({}, t), e);
  return S && i === null && g.log(`Event processor "${s.id || "?"}" dropped event`), Ft(i) ? i.then((o) => Cn(o, e, n, r + 1)) : Cn(i, e, n, r + 1);
}
function wa(t, e) {
  const { fingerprint: n, span: r, breadcrumbs: s, sdkProcessingMetadata: i } = e;
  Ca(t, e), r && Da(t, r), $a(t, n), Pa(t, s), xa(t, i);
}
function Pt(t, e) {
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
    attachments: d,
    propagationContext: m,
    transactionName: l,
    span: h
  } = e;
  ye(t, "extra", n), ye(t, "tags", r), ye(t, "user", s), ye(t, "contexts", i), t.sdkProcessingMetadata = ie(t.sdkProcessingMetadata, a, 2), o && (t.level = o), l && (t.transactionName = l), h && (t.span = h), c.length && (t.breadcrumbs = [...t.breadcrumbs, ...c]), u.length && (t.fingerprint = [...t.fingerprint, ...u]), f.length && (t.eventProcessors = [...t.eventProcessors, ...f]), d.length && (t.attachments = [...t.attachments, ...d]), t.propagationContext = p(p({}, t.propagationContext), m);
}
function ye(t, e, n) {
  t[e] = ie(t[e], n, 1);
}
function Ca(t, e) {
  const { extra: n, tags: r, user: s, contexts: i, level: o, transactionName: a } = e;
  Object.keys(n).length && (t.extra = p(p({}, n), t.extra)), Object.keys(r).length && (t.tags = p(p({}, r), t.tags)), Object.keys(s).length && (t.user = p(p({}, s), t.user)), Object.keys(i).length && (t.contexts = p(p({}, i), t.contexts)), o && (t.level = o), a && t.type !== "transaction" && (t.transaction = a);
}
function Pa(t, e) {
  const n = [...t.breadcrumbs || [], ...e];
  t.breadcrumbs = n.length ? n : void 0;
}
function xa(t, e) {
  t.sdkProcessingMetadata = p(p({}, t.sdkProcessingMetadata), e);
}
function Da(t, e) {
  t.contexts = p({
    trace: Qs(e)
  }, t.contexts), t.sdkProcessingMetadata = p({
    dynamicSamplingContext: ut(e)
  }, t.sdkProcessingMetadata);
  const n = z(e), r = N(n).description;
  r && !t.transaction && t.type === "transaction" && (t.transaction = r);
}
function $a(t, e) {
  t.fingerprint = t.fingerprint ? Array.isArray(t.fingerprint) ? t.fingerprint : [t.fingerprint] : [], e && (t.fingerprint = t.fingerprint.concat(e)), t.fingerprint.length || delete t.fingerprint;
}
let Q, Yr, Vr, it;
function La(t) {
  const e = I._sentryDebugIds, n = I._debugIds;
  if (!e && !n)
    return {};
  const r = e ? Object.keys(e) : [], s = n ? Object.keys(n) : [];
  if (it && r.length === Yr && s.length === Vr)
    return it;
  Yr = r.length, Vr = s.length, it = {}, Q || (Q = {});
  const i = (o, a) => {
    for (const c of o) {
      const u = a[c], f = Q == null ? void 0 : Q[c];
      if (f && it && u)
        it[f[0]] = u, Q && (Q[c] = [f[0], u]);
      else if (u) {
        const d = t(c);
        for (let m = d.length - 1; m >= 0; m--) {
          const l = d[m], h = l == null ? void 0 : l.filename;
          if (h && it && Q) {
            it[h] = u, Q[c] = [h, u];
            break;
          }
        }
      }
    }
  };
  return e && i(r, e), n && i(s, n), it;
}
function Fa(t, e, n, r, s, i) {
  const { normalizeDepth: o = 3, normalizeMaxBreadth: a = 1e3 } = t, c = b(p({}, e), {
    event_id: e.event_id || n.event_id || Y(),
    timestamp: e.timestamp || se()
  }), u = n.integrations || t.integrations.map((_) => _.name);
  Ua(c, t), Ga(c, u), s && s.emit("applyFrameMetadata", e), e.type === void 0 && ja(c, t.stackParser);
  const f = za(r, n.captureContext);
  n.mechanism && at(c, n.mechanism);
  const d = s ? s.getEventProcessors() : [], m = qn().getScopeData();
  if (i) {
    const _ = i.getScopeData();
    Pt(m, _);
  }
  if (f) {
    const _ = f.getScopeData();
    Pt(m, _);
  }
  const l = [...n.attachments || [], ...m.attachments];
  l.length && (n.attachments = l), wa(c, m);
  const h = [
    ...d,
    // Run scope event processors _after_ all other processors
    ...m.eventProcessors
  ];
  return Ma(h, c, n).then((_) => (_ && Ba(_), typeof o == "number" && o > 0 ? Ha(_, o, a) : _));
}
function Ua(t, e) {
  var a, c;
  const { environment: n, release: r, dist: s, maxValueLength: i } = e;
  t.environment = t.environment || n || Kn, !t.release && r && (t.release = r), !t.dist && s && (t.dist = s);
  const o = t.request;
  o != null && o.url && i && (o.url = te(o.url, i)), i && ((c = (a = t.exception) == null ? void 0 : a.values) == null || c.forEach((u) => {
    u.value && (u.value = te(u.value, i));
  }));
}
function ja(t, e) {
  var r, s;
  const n = La(e);
  (s = (r = t.exception) == null ? void 0 : r.values) == null || s.forEach((i) => {
    var o, a;
    (a = (o = i.stacktrace) == null ? void 0 : o.frames) == null || a.forEach((c) => {
      c.filename && (c.debug_id = n[c.filename]);
    });
  });
}
function Ba(t) {
  var r, s;
  const e = {};
  if ((s = (r = t.exception) == null ? void 0 : r.values) == null || s.forEach((i) => {
    var o, a;
    (a = (o = i.stacktrace) == null ? void 0 : o.frames) == null || a.forEach((c) => {
      c.debug_id && (c.abs_path ? e[c.abs_path] = c.debug_id : c.filename && (e[c.filename] = c.debug_id), delete c.debug_id);
    });
  }), Object.keys(e).length === 0)
    return;
  t.debug_meta = t.debug_meta || {}, t.debug_meta.images = t.debug_meta.images || [];
  const n = t.debug_meta.images;
  Object.entries(e).forEach(([i, o]) => {
    n.push({
      type: "sourcemap",
      code_file: i,
      debug_id: o
    });
  });
}
function Ga(t, e) {
  e.length > 0 && (t.sdk = t.sdk || {}, t.sdk.integrations = [...t.sdk.integrations || [], ...e]);
}
function Ha(t, e, n) {
  var s, i;
  if (!t)
    return null;
  const r = p(p(p(p(p({}, t), t.breadcrumbs && {
    breadcrumbs: t.breadcrumbs.map((o) => p(p({}, o), o.data && {
      data: G(o.data, e, n)
    }))
  }), t.user && {
    user: G(t.user, e, n)
  }), t.contexts && {
    contexts: G(t.contexts, e, n)
  }), t.extra && {
    extra: G(t.extra, e, n)
  });
  return (s = t.contexts) != null && s.trace && r.contexts && (r.contexts.trace = t.contexts.trace, t.contexts.trace.data && (r.contexts.trace.data = G(t.contexts.trace.data, e, n))), t.spans && (r.spans = t.spans.map((o) => p(p({}, o), o.data && {
    data: G(o.data, e, n)
  }))), (i = t.contexts) != null && i.flags && r.contexts && (r.contexts.flags = G(t.contexts.flags, 3, n)), r;
}
function za(t, e) {
  if (!e)
    return t;
  const n = t ? t.clone() : new K();
  return n.update(e), n;
}
function qa(t) {
  if (t)
    return Wa(t) ? { captureContext: t } : Ya(t) ? {
      captureContext: t
    } : t;
}
function Wa(t) {
  return t instanceof K || typeof t == "function";
}
const Ja = [
  "user",
  "level",
  "extra",
  "contexts",
  "tags",
  "fingerprint",
  "propagationContext"
];
function Ya(t) {
  return Object.keys(t).some((e) => Ja.includes(e));
}
function D(t, e) {
  return w().captureException(t, qa(e));
}
function Kr(t, e) {
  const n = typeof e == "string" ? e : void 0, r = typeof e != "string" ? { captureContext: e } : void 0;
  return w().captureMessage(t, n, r);
}
function mp(t, e) {
  return w().captureEvent(t, e);
}
function _p(t, e) {
  j().setContext(t, e);
}
function gp(t) {
  j().setExtras(t);
}
function Xr(t, e) {
  j().setExtra(t, e);
}
function hp(t) {
  j().setTags(t);
}
function Zr(t, e) {
  j().setTag(t, e);
}
function yp(t) {
  j().setUser(t);
}
function fi() {
  return j().lastEventId();
}
function rn(t) {
  j().addEventProcessor(t);
}
const Va = "7";
function Ka(t) {
  const e = t.protocol ? `${t.protocol}:` : "", n = t.port ? `:${t.port}` : "";
  return `${e}//${t.host}${n}${t.path ? `/${t.path}` : ""}/api/`;
}
function Xa(t) {
  return `${Ka(t)}${t.projectId}/envelope/`;
}
function Za(t, e) {
  const n = {
    sentry_version: Va
  };
  return t.publicKey && (n.sentry_key = t.publicKey), e && (n.sentry_client = `${e.name}/${e.version}`), new URLSearchParams(n).toString();
}
function pi(t, e, n) {
  return e || `${Xa(t)}?${Za(t, n)}`;
}
const Qr = [];
function Qa(t, e) {
  const n = {};
  return e.forEach((r) => {
    r && di(t, r, n);
  }), n;
}
function ts(t, e) {
  for (const n of e)
    n != null && n.afterAllSetup && n.afterAllSetup(t);
}
function di(t, e, n) {
  if (n[e.name]) {
    S && g.log(`Integration skipped because it was already installed: ${e.name}`);
    return;
  }
  if (n[e.name] = e, !Qr.includes(e.name) && typeof e.setupOnce == "function" && (e.setupOnce(), Qr.push(e.name)), e.setup && typeof e.setup == "function" && e.setup(t), typeof e.preprocessEvent == "function") {
    const r = e.preprocessEvent.bind(e);
    t.on("preprocessEvent", (s, i) => r(s, i, t));
  }
  if (typeof e.processEvent == "function") {
    const r = e.processEvent.bind(e), s = Object.assign((i, o) => r(i, o, t), {
      id: e.name
    });
    t.addEventProcessor(s);
  }
  S && g.log(`Integration installed: ${e.name}`);
}
function mi(t, e) {
  return e ? lt(e, () => {
    const n = Bt(), r = n ? Qs(n) : zs(e);
    return [n ? ut(n) : ii(t, e), r];
  }) : [void 0, void 0];
}
const tc = {
  trace: 1,
  debug: 5,
  info: 9,
  warn: 13,
  error: 17,
  fatal: 21
};
function ec(t) {
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
function nc(t, e, n, r) {
  const s = {};
  return e != null && e.sdk && (s.sdk = {
    name: e.sdk.name,
    version: e.sdk.version
  }), n && r && (s.dsn = jt(r)), ft(s, [ec(t)]);
}
const rc = 100;
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
function J(t, e, n, r = !0) {
  n && (!t[e] || r) && (t[e] = n);
}
function ic(t, e) {
  const n = er(), r = gi(t);
  r === void 0 ? n.set(t, [e]) : r.length >= rc ? (_i(t, r), n.set(t, [e])) : n.set(t, [...r, e]);
}
function Ce(t, e = w(), n = ic) {
  var Jt, rt, It;
  const r = (Jt = e == null ? void 0 : e.getClient()) != null ? Jt : v();
  if (!r) {
    S && g.warn("No client available to capture log.");
    return;
  }
  const { release: s, environment: i, enableLogs: o = !1, beforeSendLog: a } = r.getOptions();
  if (!o) {
    S && g.warn("logging option not enabled, log will not be captured.");
    return;
  }
  const [, c] = mi(r, e), u = p({}, t.attributes), {
    user: { id: f, email: d, username: m }
  } = oc(e);
  J(u, "user.id", f, !1), J(u, "user.email", d, !1), J(u, "user.name", m, !1), J(u, "sentry.release", s), J(u, "sentry.environment", i);
  const { name: l, version: h } = (It = (rt = r.getSdkMetadata()) == null ? void 0 : rt.sdk) != null ? It : {};
  J(u, "sentry.sdk.name", l), J(u, "sentry.sdk.version", h);
  const y = r.getIntegrationByName("Replay"), _ = y == null ? void 0 : y.getReplayId(!0);
  J(u, "sentry.replay_id", _), _ && (y == null ? void 0 : y.getRecordingMode()) === "buffer" && J(u, "sentry._internal.replay_is_buffering", !0);
  const E = t.message;
  if (Je(E)) {
    const { __sentry_template_string__: B, __sentry_template_values__: C = [] } = E;
    C != null && C.length && (u["sentry.message.template"] = B), C.forEach((Yt, At) => {
      u[`sentry.message.parameter.${At}`] = Yt;
    });
  }
  const T = Mt(e);
  J(u, "sentry.trace.parent_span_id", T == null ? void 0 : T.spanContext().spanId);
  const k = b(p({}, t), { attributes: u });
  r.emit("beforeCaptureLog", k);
  const A = a ? $t(() => a(k)) : k;
  if (!A) {
    r.recordDroppedEvent("before_send", "log_item", 1), S && g.warn("beforeSendLog returned null, log will not be captured.");
    return;
  }
  const { level: $, message: X, attributes: R = {}, severityNumber: x } = A, Wt = {
    timestamp: H(),
    level: $,
    body: X,
    trace_id: c == null ? void 0 : c.trace_id,
    severity_number: x != null ? x : tc[$],
    attributes: Object.keys(R).reduce(
      (B, C) => (B[C] = sc(R[C]), B),
      {}
    )
  };
  n(r, Wt), r.emit("afterCaptureLog", A);
}
function _i(t, e) {
  var i;
  const n = (i = e != null ? e : gi(t)) != null ? i : [];
  if (n.length === 0)
    return;
  const r = t.getOptions(), s = nc(n, r._metadata, r.tunnel, t.getDsn());
  er().set(t, []), t.emit("flushLogs"), t.sendEnvelope(s);
}
function gi(t) {
  return er().get(t);
}
function oc(t) {
  const e = qn().getScopeData();
  return Pt(e, j().getScopeData()), Pt(e, t.getScopeData()), e;
}
function er() {
  return Dt("clientToLogBufferMap", () => /* @__PURE__ */ new WeakMap());
}
function ac(t) {
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
function cc(t, e, n, r) {
  const s = {};
  return e != null && e.sdk && (s.sdk = {
    name: e.sdk.name,
    version: e.sdk.version
  }), n && r && (s.dsn = jt(r)), ft(s, [ac(t)]);
}
const uc = 1e3;
function lc(t) {
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
function et(t, e, n, r = !0) {
  n && (r || !(e in t)) && (t[e] = n);
}
function fc(t, e) {
  const n = nr(), r = yi(t);
  r === void 0 ? n.set(t, [e]) : r.length >= uc ? (hi(t, r), n.set(t, [e])) : n.set(t, [...r, e]);
}
function pc(t, e, n) {
  var l, h;
  const { release: r, environment: s } = e.getOptions(), i = p({}, t.attributes), {
    user: { id: o, email: a, username: c }
  } = _c(n);
  et(i, "user.id", o, !1), et(i, "user.email", a, !1), et(i, "user.name", c, !1), et(i, "sentry.release", r), et(i, "sentry.environment", s);
  const { name: u, version: f } = (h = (l = e.getSdkMetadata()) == null ? void 0 : l.sdk) != null ? h : {};
  et(i, "sentry.sdk.name", u), et(i, "sentry.sdk.version", f);
  const d = e.getIntegrationByName("Replay"), m = d == null ? void 0 : d.getReplayId(!0);
  return et(i, "sentry.replay_id", m), m && (d == null ? void 0 : d.getRecordingMode()) === "buffer" && et(i, "sentry._internal.replay_is_buffering", !0), b(p({}, t), {
    attributes: i
  });
}
function dc(t, e, n) {
  const r = {};
  for (const c in t.attributes)
    t.attributes[c] !== void 0 && (r[c] = lc(t.attributes[c]));
  const [, s] = mi(e, n), i = Mt(n), o = i ? i.spanContext().traceId : s == null ? void 0 : s.trace_id, a = i ? i.spanContext().spanId : void 0;
  return {
    timestamp: H(),
    trace_id: o != null ? o : "",
    span_id: a,
    name: t.name,
    type: t.type,
    unit: t.unit,
    value: t.value,
    attributes: r
  };
}
function mc(t, e) {
  var l, h, y, _;
  const n = (l = e == null ? void 0 : e.scope) != null ? l : w(), r = (h = e == null ? void 0 : e.captureSerializedMetric) != null ? h : fc, s = (y = n == null ? void 0 : n.getClient()) != null ? y : v();
  if (!s) {
    S && g.warn("No client available to capture metric.");
    return;
  }
  const { _experiments: i, enableMetrics: o, beforeSendMetric: a } = s.getOptions();
  if (!((_ = o != null ? o : i == null ? void 0 : i.enableMetrics) != null ? _ : !0)) {
    S && g.warn("metrics option not enabled, metric will not be captured.");
    return;
  }
  const u = pc(t, s, n);
  s.emit("processMetric", u);
  const f = a || (i == null ? void 0 : i.beforeSendMetric), d = f ? f(u) : u;
  if (!d) {
    S && g.log("`beforeSendMetric` returned `null`, will not send metric.");
    return;
  }
  const m = dc(d, s, n);
  S && g.log("[Metric]", m), r(s, m), s.emit("afterCaptureMetric", d);
}
function hi(t, e) {
  var i;
  const n = (i = e != null ? e : yi(t)) != null ? i : [];
  if (n.length === 0)
    return;
  const r = t.getOptions(), s = cc(n, r._metadata, r.tunnel, t.getDsn());
  nr().set(t, []), t.emit("flushMetrics"), t.sendEnvelope(s);
}
function yi(t) {
  return nr().get(t);
}
function _c(t) {
  const e = qn().getScopeData();
  return Pt(e, j().getScopeData()), Pt(e, t.getScopeData()), e;
}
function nr() {
  return Dt("clientToMetricBufferMap", () => /* @__PURE__ */ new WeakMap());
}
const rr = Symbol.for("SentryBufferFullError");
function Si(t = 100) {
  const e = /* @__PURE__ */ new Set();
  function n() {
    return e.size < t;
  }
  function r(o) {
    e.delete(o);
  }
  function s(o) {
    if (!n())
      return tr(rr);
    const a = o();
    return e.add(a), a.then(
      () => r(a),
      () => r(a)
    ), a;
  }
  function i(o) {
    if (!e.size)
      return Gt(!0);
    const a = Promise.allSettled(Array.from(e)).then(() => !0);
    if (!o)
      return a;
    const c = [a, new Promise((u) => setTimeout(() => u(!1), o))];
    return Promise.race(c);
  }
  return {
    get $() {
      return Array.from(e);
    },
    add: s,
    drain: i
  };
}
const gc = 60 * 1e3;
function hc(t, e = Date.now()) {
  const n = parseInt(`${t}`, 10);
  if (!isNaN(n))
    return n * 1e3;
  const r = Date.parse(`${t}`);
  return isNaN(r) ? gc : r - e;
}
function yc(t, e) {
  return t[e] || t.all || 0;
}
function Sc(t, e, n = Date.now()) {
  return yc(t, e) > n;
}
function Ec(t, { statusCode: e, headers: n }, r = Date.now()) {
  const s = p({}, t), i = n == null ? void 0 : n["x-sentry-rate-limits"], o = n == null ? void 0 : n["retry-after"];
  if (i)
    for (const a of i.trim().split(",")) {
      const [c, u, , , f] = a.split(":", 5), d = parseInt(c, 10), m = (isNaN(d) ? 60 : d) * 1e3;
      if (!u)
        s.all = r + m;
      else
        for (const l of u.split(";"))
          l === "metric_bucket" ? (!f || f.split(";").includes("custom")) && (s[l] = r + m) : s[l] = r + m;
    }
  else o ? s.all = r + hc(o, r) : e === 429 && (s.all = r + 60 * 1e3);
  return s;
}
const Ei = 64;
function bc(t, e, n = Si(
  t.bufferSize || Ei
)) {
  let r = {};
  const s = (o) => n.drain(o);
  function i(o) {
    const a = [];
    if (re(o, (d, m) => {
      const l = jr(m);
      Sc(r, l) ? t.recordDroppedEvent("ratelimit_backoff", l) : a.push(d);
    }), a.length === 0)
      return Promise.resolve({});
    const c = ft(o[0], a), u = (d) => {
      re(c, (m, l) => {
        t.recordDroppedEvent(d, jr(l));
      });
    }, f = () => e({ body: oa(c) }).then(
      (d) => (d.statusCode !== void 0 && (d.statusCode < 200 || d.statusCode >= 300) && S && g.warn(`Sentry responded with status code ${d.statusCode} to sent event.`), r = Ec(r, d), d),
      (d) => {
        throw u("network_error"), S && g.error("Encountered error running transport request:", d), d;
      }
    );
    return n.add(f).then(
      (d) => d,
      (d) => {
        if (d === rr)
          return S && g.error("Skipped sending event because buffer is full."), u("queue_overflow"), Promise.resolve({});
        throw d;
      }
    );
  }
  return {
    send: i,
    flush: s
  };
}
function Tc(t, e, n) {
  const r = [
    { type: "client_report" },
    {
      timestamp: se(),
      discarded_events: t
    }
  ];
  return ft(e ? { dsn: e } : {}, [r]);
}
function bi(t) {
  const e = [];
  t.message && e.push(t.message);
  try {
    const n = t.exception.values[t.exception.values.length - 1];
    n != null && n.value && (e.push(n.value), n.type && e.push(`${n.type}: ${n.value}`));
  } catch (n) {
  }
  return e;
}
function Ic(t) {
  var c, u, f;
  const { trace_id: e, parent_span_id: n, span_id: r, status: s, origin: i, data: o, op: a } = (u = (c = t.contexts) == null ? void 0 : c.trace) != null ? u : {};
  return {
    data: o != null ? o : {},
    description: t.transaction,
    op: a,
    parent_span_id: n,
    span_id: r != null ? r : "",
    start_timestamp: (f = t.start_timestamp) != null ? f : 0,
    status: s,
    timestamp: t.timestamp,
    trace_id: e != null ? e : "",
    origin: i,
    profile_id: o == null ? void 0 : o[Wn],
    exclusive_time: o == null ? void 0 : o[Jn],
    measurements: t.measurements,
    is_segment: !0
  };
}
function Ac(t) {
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
        data: p(p(p({}, t.data), t.profile_id && { [Wn]: t.profile_id }), t.exclusive_time && { [Jn]: t.exclusive_time })
      }
    },
    measurements: t.measurements
  };
}
const es = "Not capturing exception because it's already been captured.", ns = "Discarded session because of missing or non-string release", Ti = Symbol.for("SentryInternalError"), Ii = Symbol.for("SentryDoNotSendEventError"), Rc = 5e3;
function Re(t) {
  return {
    message: t,
    [Ti]: !0
  };
}
function En(t) {
  return {
    message: t,
    [Ii]: !0
  };
}
function rs(t) {
  return !!t && typeof t == "object" && Ti in t;
}
function ss(t) {
  return !!t && typeof t == "object" && Ii in t;
}
function is(t, e, n, r, s) {
  let i = 0, o, a = !1;
  t.on(n, () => {
    i = 0, clearTimeout(o), a = !1;
  }), t.on(e, (c) => {
    i += r(c), i >= 8e5 ? s(t) : a || (a = !0, o = setTimeout(() => {
      s(t);
    }, Rc));
  }), t.on("flush", () => {
    s(t);
  });
}
class Nc {
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
    var r, s, i, o, a, c, u;
    if (this._options = e, this._integrations = {}, this._numProcessing = 0, this._outcomes = {}, this._hooks = {}, this._eventProcessors = [], this._promiseBuffer = Si((s = (r = e.transportOptions) == null ? void 0 : r.bufferSize) != null ? s : Ei), e.dsn ? this._dsn = Jo(e.dsn) : S && g.warn("No DSN provided, client will not send events."), this._dsn) {
      const f = pi(
        this._dsn,
        e.tunnel,
        e._metadata ? e._metadata.sdk : void 0
      );
      this._transport = e.transport(b(p({
        tunnel: this._options.tunnel,
        recordDroppedEvent: this.recordDroppedEvent.bind(this)
      }, e.transportOptions), {
        url: f
      }));
    }
    this._options.enableLogs = (o = this._options.enableLogs) != null ? o : (i = this._options._experiments) == null ? void 0 : i.enableLogs, this._options.enableLogs && is(this, "afterCaptureLog", "flushLogs", Mc, _i), ((u = (c = this._options.enableMetrics) != null ? c : (a = this._options._experiments) == null ? void 0 : a.enableMetrics) != null ? u : !0) && is(
      this,
      "afterCaptureMetric",
      "flushMetrics",
      vc,
      hi
    );
  }
  /**
   * Captures an exception event and sends it to Sentry.
   *
   * Unlike `captureException` exported from every SDK, this method requires that you pass it the current scope.
   */
  captureException(e, n, r) {
    const s = Y();
    if (wr(e))
      return S && g.log(es), s;
    const i = p({
      event_id: s
    }, n);
    return this._process(
      () => this.eventFromException(e, i).then((o) => this._captureEvent(o, i, r)).then((o) => o),
      "error"
    ), i.event_id;
  }
  /**
   * Captures a message event and sends it to Sentry.
   *
   * Unlike `captureMessage` exported from every SDK, this method requires that you pass it the current scope.
   */
  captureMessage(e, n, r, s) {
    const i = p({
      event_id: Y()
    }, r), o = Je(e) ? e : String(e), a = zn(e), c = a ? this.eventFromMessage(o, n, i) : this.eventFromException(e, i);
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
  captureEvent(e, n, r) {
    const s = Y();
    if (n != null && n.originalException && wr(n.originalException))
      return S && g.log(es), s;
    const i = p({
      event_id: s
    }, n), o = e.sdkProcessingMetadata || {}, a = o.capturedSpanScope, c = o.capturedSpanIsolationScope, u = os(e.type);
    return this._process(
      () => this._captureEvent(e, i, a || r, c),
      u
    ), i.event_id;
  }
  /**
   * Captures a session.
   */
  captureSession(e) {
    this.sendSession(e), Nn(e, { init: !1 });
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
    return F(this, null, function* () {
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
    return F(this, null, function* () {
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
    di(this, e, this._integrations), n || ts(this, [e]);
  }
  /**
   * Send a fully prepared event to Sentry.
   */
  sendEvent(e, n = {}) {
    this.emit("beforeSendEvent", e, n);
    let r = ma(e, this._dsn, this._options._metadata, this._options.tunnel);
    for (const s of n.attachments || [])
      r = ia(r, ua(s));
    this.sendEnvelope(r).then((s) => this.emit("afterSendEvent", e, s));
  }
  /**
   * Send a session or session aggregrates to Sentry.
   */
  sendSession(e) {
    const { release: n, environment: r = Kn } = this._options;
    if ("aggregates" in e) {
      const i = e.attrs || {};
      if (!i.release && !n) {
        S && g.warn(ns);
        return;
      }
      i.release = i.release || n, i.environment = i.environment || r, e.attrs = i;
    } else {
      if (!e.release && !n) {
        S && g.warn(ns);
        return;
      }
      e.release = e.release || n, e.environment = e.environment || r;
    }
    this.emit("beforeSendSession", e);
    const s = da(e, this._dsn, this._options._metadata, this._options.tunnel);
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
    const r = this._hooks[e] = this._hooks[e] || /* @__PURE__ */ new Set(), s = (...i) => n(...i);
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
    return F(this, null, function* () {
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
    this._integrations = Qa(this, e), ts(this, e);
  }
  /** Updates existing session based on the provided event */
  _updateSessionFromEvent(e, n) {
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
    const o = e.status === "ok";
    (o && e.errors === 0 || o && r) && (Nn(e, b(p({}, r && { status: "crashed" }), {
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
    return F(this, null, function* () {
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
    const i = this.getOptions(), o = Object.keys(this._integrations);
    return !n.integrations && (o != null && o.length) && (n.integrations = o), this.emit("preprocessEvent", e, n), e.type || s.setLastEventId(e.event_id || n.event_id), Fa(i, e, n, r, this, s).then((a) => {
      if (a === null)
        return a;
      this.emit("postprocessEvent", a, n), a.contexts = p({
        trace: zs(r)
      }, a.contexts);
      const c = ii(this, r);
      return a.sdkProcessingMetadata = p({
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
  _captureEvent(e, n = {}, r = w(), s = j()) {
    return S && Pn(e) && g.log(`Captured error event \`${bi(e)[0] || "<unknown>"}\``), this._processEvent(e, n, r, s).then(
      (i) => i.event_id,
      (i) => {
        S && (ss(i) ? g.log(i.message) : rs(i) ? g.warn(i.message) : g.warn(i));
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
    const i = this.getOptions(), { sampleRate: o } = i, a = Ai(e), c = Pn(e), f = `before send for type \`${e.type || "error"}\``, d = typeof o == "undefined" ? void 0 : Yn(o);
    if (c && typeof d == "number" && Math.random() > d)
      return this.recordDroppedEvent("sample_rate", "error"), tr(
        En(
          `Discarding event because it's not included in the random sample (sampling rate = ${o})`
        )
      );
    const m = os(e.type);
    return this._prepareEvent(e, n, r, s).then((l) => {
      if (l === null)
        throw this.recordDroppedEvent("event_processor", m), En("An event processor returned `null`, will not send event.");
      if (n.data && n.data.__sentry__ === !0)
        return l;
      const y = Oc(this, i, l, n);
      return kc(y, f);
    }).then((l) => {
      var _;
      if (l === null) {
        if (this.recordDroppedEvent("before_send", m), a) {
          const T = 1 + (e.spans || []).length;
          this.recordDroppedEvent("before_send", "span", T);
        }
        throw En(`${f} returned \`null\`, will not send event.`);
      }
      const h = r.getSession() || s.getSession();
      if (c && h && this._updateSessionFromEvent(h, l), a) {
        const E = ((_ = l.sdkProcessingMetadata) == null ? void 0 : _.spanCountBeforeProcessing) || 0, T = l.spans ? l.spans.length : 0, k = E - T;
        k > 0 && this.recordDroppedEvent("before_send", "span", k);
      }
      const y = l.transaction_info;
      if (a && y && l.transaction !== e.transaction) {
        const E = "custom";
        l.transaction_info = b(p({}, y), {
          source: E
        });
      }
      return this.sendEvent(l, n), l;
    }).then(null, (l) => {
      throw ss(l) || rs(l) ? l : (this.captureException(l, {
        mechanism: {
          handled: !1,
          type: "internal"
        },
        data: {
          __sentry__: !0
        },
        originalException: l
      }), Re(
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
      (r) => (this._numProcessing--, r === rr && this.recordDroppedEvent("queue_overflow", n), r)
    );
  }
  /**
   * Clears outcomes on this client and returns them.
   */
  _clearOutcomes() {
    const e = this._outcomes;
    return this._outcomes = {}, Object.entries(e).map(([n, r]) => {
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
    const n = Tc(e, this._options.tunnel && jt(this._dsn));
    this.sendEnvelope(n);
  }
  /**
   * Creates an {@link Event} from all inputs to `captureException` and non-primitive inputs to `captureMessage`.
   */
}
function os(t) {
  return t === "replay_event" ? "replay" : t || "error";
}
function kc(t, e) {
  const n = `${e} must return \`null\` or a valid event.`;
  if (Ft(t))
    return t.then(
      (r) => {
        if (!St(r) && r !== null)
          throw Re(n);
        return r;
      },
      (r) => {
        throw Re(`${e} rejected with ${r}`);
      }
    );
  if (!St(t) && t !== null)
    throw Re(n);
  return t;
}
function Oc(t, e, n, r) {
  const { beforeSend: s, beforeSendTransaction: i, beforeSendSpan: o, ignoreSpans: a } = e;
  let c = n;
  if (Pn(c) && s)
    return s(c, r);
  if (Ai(c)) {
    if (o || a) {
      const u = Ic(c);
      if (a != null && a.length && Me(u, a))
        return null;
      if (o) {
        const f = o(u);
        f ? c = ie(n, Ac(f)) : vn();
      }
      if (c.spans) {
        const f = [], d = c.spans;
        for (const l of d) {
          if (a != null && a.length && Me(l, a)) {
            Zo(d, l);
            continue;
          }
          if (o) {
            const h = o(l);
            h ? f.push(h) : (vn(), f.push(l));
          } else
            f.push(l);
        }
        const m = c.spans.length - f.length;
        m && t.recordDroppedEvent("before_send", "span", m), c.spans = f;
      }
    }
    if (i) {
      if (c.spans) {
        const u = c.spans.length;
        c.sdkProcessingMetadata = b(p({}, n.sdkProcessingMetadata), {
          spanCountBeforeProcessing: u
        });
      }
      return i(c, r);
    }
  }
  return c;
}
function Pn(t) {
  return t.type === void 0;
}
function Ai(t) {
  return t.type === "transaction";
}
function vc(t) {
  let e = 0;
  return t.name && (e += t.name.length * 2), e += 8, e + Ri(t.attributes);
}
function Mc(t) {
  let e = 0;
  return t.message && (e += t.message.length * 2), e + Ri(t.attributes);
}
function Ri(t) {
  if (!t)
    return 0;
  let e = 0;
  return Object.values(t).forEach((n) => {
    Array.isArray(n) ? e += n.length * as(n[0]) : zn(n) ? e += as(n) : e += 100;
  }), e;
}
function as(t) {
  return typeof t == "string" ? t.length * 2 : typeof t == "number" ? 8 : typeof t == "boolean" ? 4 : 0;
}
function wc(t, e) {
  e.debug === !0 && (S ? g.enable() : $t(() => {
    console.warn("[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle.");
  })), w().update(e.initialScope);
  const r = new t(e);
  return Cc(r), r.init(), r;
}
function Cc(t) {
  w().setClient(t);
}
function Ni(t, e) {
  let n;
  return re(t, (r, s) => (e.includes(s) && (n = Array.isArray(r) ? r[1] : void 0), !!n)), n;
}
function Pc(t, e) {
  return (n) => {
    const r = t(n);
    return b(p({}, r), {
      send: (s) => F(null, null, function* () {
        const i = Ni(s, ["event", "transaction", "profile", "replay_event"]);
        return i && (i.release = e), r.send(s);
      })
    });
  };
}
function xc(t, e) {
  return ft(
    e ? b(p({}, t[0]), {
      dsn: e
    }) : t[0],
    t[1]
  );
}
function Sp(t, e) {
  return (n) => {
    const r = t(n), s = /* @__PURE__ */ new Map();
    function i(c, u) {
      const f = u ? `${c}:${u}` : c;
      let d = s.get(f);
      if (!d) {
        const m = Ks(c);
        if (!m)
          return;
        const l = pi(m, n.tunnel);
        d = u ? Pc(t, u)(b(p({}, n), { url: l })) : t(b(p({}, n), { url: l })), s.set(f, d);
      }
      return [c, d];
    }
    function o(c) {
      return F(this, null, function* () {
        function u(l) {
          const h = l != null && l.length ? l : ["event"];
          return Ni(c, h);
        }
        const f = e({ envelope: c, getEvent: u }).map((l) => typeof l == "string" ? i(l, void 0) : i(l.dsn, l.release)).filter((l) => !!l), d = f.length ? f : [["", r]];
        return (yield Promise.all(
          d.map(([l, h]) => h.send(xc(c, l)))
        ))[0];
      });
    }
    function a(c) {
      return F(this, null, function* () {
        const u = [...s.values(), r];
        return (yield Promise.all(u.map((d) => d.flush(c)))).every((d) => d);
      });
    }
    return {
      send: o,
      flush: a
    };
  };
}
function Dc(t, ...e) {
  const n = new String(String.raw(t, ...e));
  return n.__sentry_template_string__ = t.join("\0").replace(/%/g, "%%").replace(/\0/g, "%s"), n.__sentry_template_values__ = e, n;
}
const $c = Dc;
function Lc(t, e, n = [e], r = "npm") {
  const s = t._metadata || {};
  s.sdk || (s.sdk = {
    name: `sentry.javascript.${e}`,
    packages: n.map((i) => ({
      name: `${r}:@sentry/${i}`,
      version: dt
    })),
    version: dt
  }), t._metadata = s;
}
const Fc = 100;
function Uc(t, e) {
  const n = v(), r = j();
  if (!n) return;
  const { beforeBreadcrumb: s = null, maxBreadcrumbs: i = Fc } = n.getOptions();
  if (i <= 0) return;
  const o = se(), a = p({ timestamp: o }, t), c = s ? $t(() => s(a, e)) : a;
  c !== null && (n.emit && n.emit("beforeAddBreadcrumb", c, e), r.addBreadcrumb(c, i));
}
let cs;
const jc = "FunctionToString", us = /* @__PURE__ */ new WeakMap(), Bc = (() => ({
  name: jc,
  setupOnce() {
    cs = Function.prototype.toString;
    try {
      Function.prototype.toString = function(...t) {
        const e = js(this), n = us.has(v()) && e !== void 0 ? e : this;
        return cs.apply(n, t);
      };
    } catch (t) {
    }
  },
  setup(t) {
    us.set(t, !0);
  }
})), Gc = Bc, Hc = [
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
], zc = "EventFilters", qc = (t = {}) => {
  let e;
  return {
    name: zc,
    setup(n) {
      const r = n.getOptions();
      e = ls(t, r);
    },
    processEvent(n, r, s) {
      if (!e) {
        const i = s.getOptions();
        e = ls(t, i);
      }
      return Jc(n, e) ? null : n;
    }
  };
}, Wc = ((t = {}) => b(p({}, qc(t)), {
  name: "InboundFilters"
}));
function ls(t = {}, e = {}) {
  return {
    allowUrls: [...t.allowUrls || [], ...e.allowUrls || []],
    denyUrls: [...t.denyUrls || [], ...e.denyUrls || []],
    ignoreErrors: [
      ...t.ignoreErrors || [],
      ...e.ignoreErrors || [],
      ...t.disableErrorDefaults ? [] : Hc
    ],
    ignoreTransactions: [...t.ignoreTransactions || [], ...e.ignoreTransactions || []]
  };
}
function Jc(t, e) {
  if (t.type) {
    if (t.type === "transaction" && Vc(t, e.ignoreTransactions))
      return S && g.warn(
        `Event dropped due to being matched by \`ignoreTransactions\` option.
Event: ${kt(t)}`
      ), !0;
  } else {
    if (Yc(t, e.ignoreErrors))
      return S && g.warn(
        `Event dropped due to being matched by \`ignoreErrors\` option.
Event: ${kt(t)}`
      ), !0;
    if (Qc(t))
      return S && g.warn(
        `Event dropped due to not having an error message, error type or stacktrace.
Event: ${kt(
          t
        )}`
      ), !0;
    if (Kc(t, e.denyUrls))
      return S && g.warn(
        `Event dropped due to being matched by \`denyUrls\` option.
Event: ${kt(
          t
        )}.
Url: ${Pe(t)}`
      ), !0;
    if (!Xc(t, e.allowUrls))
      return S && g.warn(
        `Event dropped due to not being matched by \`allowUrls\` option.
Event: ${kt(
          t
        )}.
Url: ${Pe(t)}`
      ), !0;
  }
  return !1;
}
function Yc(t, e) {
  return e != null && e.length ? bi(t).some((n) => Ke(n, e)) : !1;
}
function Vc(t, e) {
  if (!(e != null && e.length))
    return !1;
  const n = t.transaction;
  return n ? Ke(n, e) : !1;
}
function Kc(t, e) {
  if (!(e != null && e.length))
    return !1;
  const n = Pe(t);
  return n ? Ke(n, e) : !1;
}
function Xc(t, e) {
  if (!(e != null && e.length))
    return !0;
  const n = Pe(t);
  return n ? Ke(n, e) : !0;
}
function Zc(t = []) {
  for (let e = t.length - 1; e >= 0; e--) {
    const n = t[e];
    if (n && n.filename !== "<anonymous>" && n.filename !== "[native code]")
      return n.filename || null;
  }
  return null;
}
function Pe(t) {
  var e, n, r;
  try {
    const s = [...(n = (e = t.exception) == null ? void 0 : e.values) != null ? n : []].reverse().find((o) => {
      var a, c, u;
      return ((a = o.mechanism) == null ? void 0 : a.parent_id) === void 0 && ((u = (c = o.stacktrace) == null ? void 0 : c.frames) == null ? void 0 : u.length);
    }), i = (r = s == null ? void 0 : s.stacktrace) == null ? void 0 : r.frames;
    return i ? Zc(i) : null;
  } catch (s) {
    return S && g.error(`Cannot extract url for event ${kt(t)}`), null;
  }
}
function Qc(t) {
  var e, n;
  return (n = (e = t.exception) == null ? void 0 : e.values) != null && n.length ? (
    // No top-level message
    !t.message && // There are no exception values that have a stacktrace, a non-generic-Error type or value
    !t.exception.values.some((r) => r.stacktrace || r.type && r.type !== "Error" || r.value)
  ) : !1;
}
const ki = /* @__PURE__ */ new Map(), fs = /* @__PURE__ */ new Set();
function tu(t) {
  if (I._sentryModuleMetadata)
    for (const e of Object.keys(I._sentryModuleMetadata)) {
      const n = I._sentryModuleMetadata[e];
      if (fs.has(e))
        continue;
      fs.add(e);
      const r = t(e);
      for (const s of r.reverse())
        if (s.filename) {
          ki.set(s.filename, n);
          break;
        }
    }
}
function eu(t, e) {
  return tu(t), ki.get(e);
}
function Oi(t, e) {
  var n, r;
  (r = (n = e.exception) == null ? void 0 : n.values) == null || r.forEach((s) => {
    var i, o;
    (o = (i = s.stacktrace) == null ? void 0 : i.frames) == null || o.forEach((a) => {
      if (!a.filename || a.module_metadata)
        return;
      const c = eu(t, a.filename);
      c && (a.module_metadata = c);
    });
  });
}
function vi(t) {
  var e, n;
  (n = (e = t.exception) == null ? void 0 : e.values) == null || n.forEach((r) => {
    var s, i;
    (i = (s = r.stacktrace) == null ? void 0 : s.frames) == null || i.forEach((o) => {
      delete o.module_metadata;
    });
  });
}
const Ep = () => ({
  name: "ModuleMetadata",
  setup(t) {
    t.on("beforeEnvelope", (e) => {
      re(e, (n, r) => {
        if (r === "event") {
          const s = Array.isArray(n) ? n[1] : void 0;
          s && (vi(s), n[1] = s);
        }
      });
    }), t.on("applyFrameMetadata", (e) => {
      if (e.type)
        return;
      const n = t.getOptions().stackParser;
      Oi(n, e);
    });
  }
});
function Mi(t) {
  const e = "console";
  Bn(e, t), Gn(e, nu);
}
function nu() {
  "console" in I && Fn.forEach(function(t) {
    t in I.console && Nt(I.console, t, function(e) {
      return ke[t] = e, function(...n) {
        Hn("console", { args: n, level: t });
        const s = ke[t];
        s == null || s.apply(I.console, n);
      };
    });
  });
}
function ps(t) {
  return t === "warn" ? "warning" : ["fatal", "error", "warning", "log", "info", "debug"].includes(t) ? t : "log";
}
const ru = "CaptureConsole", su = ((t = {}) => {
  var r;
  const e = t.levels || Fn, n = (r = t.handled) != null ? r : !0;
  return {
    name: ru,
    setup(s) {
      "console" in I && Mi(({ args: i, level: o }) => {
        v() !== s || !e.includes(o) || iu(i, o, n);
      });
    }
  };
}), bp = su;
function iu(t, e, n) {
  const r = ps(e), s = new Error(), i = {
    level: ps(e),
    extra: {
      arguments: t
    }
  };
  lt((o) => {
    if (o.addEventProcessor((u) => (u.logger = "console", at(u, {
      handled: n,
      type: "auto.core.capture_console"
    }), u)), e === "assert") {
      if (!t[0]) {
        const u = `Assertion failed: ${Mr(t.slice(1), " ") || "console.assert"}`;
        o.setExtra("arguments", t.slice(1)), o.captureMessage(u, r, { captureContext: i, syntheticException: s });
      }
      return;
    }
    const a = t.find((u) => u instanceof Error);
    if (a) {
      D(a, i);
      return;
    }
    const c = Mr(t, " ");
    o.captureMessage(c, r, { captureContext: i, syntheticException: s });
  });
}
const ou = "ExtraErrorData", au = ((t = {}) => {
  const { depth: e = 3, captureErrorCause: n = !0 } = t;
  return {
    name: ou,
    processEvent(r, s, i) {
      const { maxValueLength: o } = i.getOptions();
      return cu(r, s, e, n, o);
    }
  };
}), Tp = au;
function cu(t, e = {}, n, r, s) {
  if (!e.originalException || !mt(e.originalException))
    return t;
  const i = e.originalException.name || e.originalException.constructor.name, o = wi(e.originalException, r, s);
  if (o) {
    const a = p({}, t.contexts), c = G(o, n);
    return St(c) && (W(c, "__sentry_skip_normalization__", !0), a[i] = c), b(p({}, t), {
      contexts: a
    });
  }
  return t;
}
function wi(t, e, n) {
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
    for (const i of Object.keys(t)) {
      if (r.indexOf(i) !== -1)
        continue;
      const o = t[i];
      s[i] = mt(o) || typeof o == "string" ? n ? te(`${o}`, n) : `${o}` : o;
    }
    if (e && t.cause !== void 0)
      if (mt(t.cause)) {
        const i = t.cause.name || t.cause.constructor.name;
        s.cause = { [i]: wi(t.cause, !1, n) };
      } else
        s.cause = t.cause;
    if (typeof t.toJSON == "function") {
      const i = t.toJSON();
      for (const o of Object.keys(i)) {
        const a = i[o];
        s[o] = mt(a) ? a.toString() : a;
      }
    }
    return s;
  } catch (r) {
    S && g.error("Unable to extract extra data from the Error object:", r);
  }
  return null;
}
function uu(t, e) {
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
const lu = /^(\S+:\\|\/?)([\s\S]*?)((?:\.{1,2}|[^/\\]+?|)(\.[^./\\]*|))(?:[/\\]*)$/;
function fu(t) {
  const e = t.length > 1024 ? `<truncated>${t.slice(-1024)}` : t, n = lu.exec(e);
  return n ? n.slice(1) : [];
}
function ds(...t) {
  let e = "", n = !1;
  for (let r = t.length - 1; r >= -1 && !n; r--) {
    const s = r >= 0 ? t[r] : "/";
    s && (e = `${s}/${e}`, n = s.charAt(0) === "/");
  }
  return e = uu(
    e.split("/").filter((r) => !!r),
    !n
  ).join("/"), (n ? "/" : "") + e || ".";
}
function ms(t) {
  let e = 0;
  for (; e < t.length && t[e] === ""; e++)
    ;
  let n = t.length - 1;
  for (; n >= 0 && t[n] === ""; n--)
    ;
  return e > n ? [] : t.slice(e, n - e + 1);
}
function pu(t, e) {
  t = ds(t).slice(1), e = ds(e).slice(1);
  const n = ms(t.split("/")), r = ms(e.split("/")), s = Math.min(n.length, r.length);
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
function du(t, e) {
  return fu(t)[2] || "";
}
const mu = "RewriteFrames", Ip = (t = {}) => {
  const e = t.root, n = t.prefix || "app:///", r = "window" in I && !!I.window, s = t.iteratee || _u({ isBrowser: r, root: e, prefix: n });
  function i(a) {
    try {
      return b(p({}, a), {
        exception: b(p({}, a.exception), {
          // The check for this is performed inside `process` call itself, safe to skip here
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          values: a.exception.values.map((c) => p(p({}, c), c.stacktrace && { stacktrace: o(c.stacktrace) }))
        })
      });
    } catch (c) {
      return a;
    }
  }
  function o(a) {
    var c;
    return b(p({}, a), {
      frames: (c = a == null ? void 0 : a.frames) == null ? void 0 : c.map((u) => s(u))
    });
  }
  return {
    name: mu,
    processEvent(a) {
      let c = a;
      return a.exception && Array.isArray(a.exception.values) && (c = i(c)), c;
    }
  };
};
function _u({
  isBrowser: t,
  root: e,
  prefix: n
}) {
  return (r) => {
    if (!r.filename)
      return r;
    const s = /^[a-zA-Z]:\\/.test(r.filename) || // or the presence of a backslash without a forward slash (which are not allowed on Windows)
    r.filename.includes("\\") && !r.filename.includes("/"), i = /^\//.test(r.filename);
    if (t) {
      if (e) {
        const o = r.filename;
        o.indexOf(e) === 0 && (r.filename = o.replace(e, n));
      }
    } else if (s || i) {
      const o = s ? r.filename.replace(/^[a-zA-Z]:/, "").replace(/\\/g, "/") : r.filename, a = e ? pu(e, o) : du(o);
      r.filename = `${n}${a}`;
    }
    return r;
  };
}
const gu = [
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
], hu = [
  "createUser",
  "deleteUser",
  "listUsers",
  "getUserById",
  "updateUserById",
  "inviteUserByEmail"
], yu = {
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
}, Ci = ["select", "insert", "upsert", "update", "delete"];
function sn(t) {
  try {
    t.__SENTRY_INSTRUMENTED__ = !0;
  } catch (e) {
  }
}
function on(t) {
  try {
    return t.__SENTRY_INSTRUMENTED__;
  } catch (e) {
    return !1;
  }
}
function Su(t, e = {}) {
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
function Eu(t, e) {
  if (e === "" || e === "*")
    return "select(*)";
  if (t === "select")
    return `select(${e})`;
  if (t === "or" || t.endsWith(".or"))
    return `${t}${e}`;
  const [n, ...r] = e.split(".");
  let s;
  return n != null && n.startsWith("fts") ? s = "textSearch" : n != null && n.startsWith("plfts") ? s = "textSearch[plain]" : n != null && n.startsWith("phfts") ? s = "textSearch[phrase]" : n != null && n.startsWith("wfts") ? s = "textSearch[websearch]" : s = n && yu[n] || "filter", `${s}(${t}, ${r.join(".")})`;
}
function _s(t, e = !1) {
  return new Proxy(t, {
    apply(n, r, s) {
      return ae(
        {
          name: `auth ${e ? "(admin) " : ""}${t.name}`,
          attributes: {
            [L]: "auto.db.supabase",
            [ee]: "db",
            "db.system": "postgresql",
            "db.operation": `auth.${e ? "admin." : ""}${t.name}`
          }
        },
        (i) => Reflect.apply(n, r, s).then((o) => (o && typeof o == "object" && "error" in o && o.error ? (i.setStatus({ code: O }), D(o.error, {
          mechanism: {
            handled: !1,
            type: "auto.db.supabase.auth"
          }
        })) : i.setStatus({ code: Xe }), i.end(), o)).catch((o) => {
          throw i.setStatus({ code: O }), i.end(), D(o, {
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
function bu(t) {
  const e = t.auth;
  if (!(!e || on(t.auth))) {
    for (const n of gu) {
      const r = e[n];
      r && typeof t.auth[n] == "function" && (t.auth[n] = _s(r));
    }
    for (const n of hu) {
      const r = e.admin[n];
      r && typeof t.auth.admin[n] == "function" && (t.auth.admin[n] = _s(r, !0));
    }
    sn(t.auth);
  }
}
function Tu(t) {
  on(t.prototype.from) || (t.prototype.from = new Proxy(
    t.prototype.from,
    {
      apply(e, n, r) {
        const s = Reflect.apply(e, n, r), i = s.constructor;
        return Au(i), s;
      }
    }
  ), sn(t.prototype.from));
}
function Iu(t) {
  on(t.prototype.then) || (t.prototype.then = new Proxy(
    t.prototype.then,
    {
      apply(e, n, r) {
        var l;
        const s = Ci, i = n, o = Su(i.method, i.headers);
        if (!s.includes(o) || !((l = i == null ? void 0 : i.url) != null && l.pathname) || typeof i.url.pathname != "string")
          return Reflect.apply(e, n, r);
        const a = i.url.pathname.split("/"), c = a.length > 0 ? a[a.length - 1] : "", u = [];
        for (const [h, y] of i.url.searchParams.entries())
          u.push(Eu(h, y));
        const f = /* @__PURE__ */ Object.create(null);
        if (St(i.body))
          for (const [h, y] of Object.entries(i.body))
            f[h] = y;
        const d = `${o === "select" ? "" : `${o}${f ? "(...) " : ""}`}${u.join(
          " "
        )} from(${c})`, m = {
          "db.table": c,
          "db.schema": i.schema,
          "db.url": i.url.origin,
          "db.sdk": i.headers["X-Client-Info"],
          "db.system": "postgresql",
          "db.operation": o,
          [L]: "auto.db.supabase",
          [ee]: "db"
        };
        return u.length && (m["db.query"] = u), Object.keys(f).length && (m["db.body"] = f), ae(
          {
            name: d,
            attributes: m
          },
          (h) => Reflect.apply(e, n, []).then(
            (y) => {
              if (h && (y && typeof y == "object" && "status" in y && xr(h, y.status || 500), h.end()), y.error) {
                const T = new Error(y.error.message);
                y.error.code && (T.code = y.error.code), y.error.details && (T.details = y.error.details);
                const k = {};
                u.length && (k.query = u), Object.keys(f).length && (k.body = f), D(T, (A) => (A.addEventProcessor(($) => (at($, {
                  handled: !1,
                  type: "auto.db.supabase.postgres"
                }), $)), A.setContext("supabase", k), A));
              }
              const _ = {
                type: "supabase",
                category: `db.${o}`,
                message: d
              }, E = {};
              return u.length && (E.query = u), Object.keys(f).length && (E.body = f), Object.keys(E).length && (_.data = E), Uc(_), y;
            },
            (y) => {
              throw h && (xr(h, 500), h.end()), y;
            }
          ).then(...r)
        );
      }
    }
  ), sn(t.prototype.then));
}
function Au(t) {
  for (const e of Ci)
    on(t.prototype[e]) || (t.prototype[e] = new Proxy(
      t.prototype[e],
      {
        apply(n, r, s) {
          const i = Reflect.apply(n, r, s), o = i.constructor;
          return S && g.log(`Instrumenting ${e} operation's PostgRESTFilterBuilder`), Iu(o), i;
        }
      }
    ), sn(t.prototype[e]));
}
const Ru = (t) => {
  if (!t) {
    S && g.warn("Supabase integration was not installed because no Supabase client was provided.");
    return;
  }
  const e = t.constructor === Function ? t : t.constructor;
  Tu(e), bu(t);
}, Nu = "Supabase", ku = ((t) => ({
  setupOnce() {
    Ru(t);
  },
  name: Nu
})), Ap = (t) => ku(t.supabaseClient), Ou = 10, vu = "ZodErrors";
function Mu(t) {
  return mt(t) && t.name === "ZodError" && Array.isArray(t.issues);
}
function wu(t) {
  return b(p({}, t), {
    path: "path" in t && Array.isArray(t.path) ? t.path.join(".") : void 0,
    keys: "keys" in t ? JSON.stringify(t.keys) : void 0,
    unionErrors: "unionErrors" in t ? JSON.stringify(t.unionErrors) : void 0
  });
}
function Cu(t) {
  return t.map((e) => typeof e == "number" ? "<array>" : e).join(".");
}
function Pu(t) {
  const e = /* @__PURE__ */ new Set();
  for (const r of t.issues) {
    const s = Cu(r.path);
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
  return `Failed to validate keys: ${te(n.join(", "), 100)}`;
}
function xu(t, e = !1, n, r) {
  var s;
  if (!((s = n.exception) != null && s.values) || !r.originalException || !Mu(r.originalException) || r.originalException.issues.length === 0)
    return n;
  try {
    const o = (e ? r.originalException.issues : r.originalException.issues.slice(0, t)).map(wu);
    return e && (Array.isArray(r.attachments) || (r.attachments = []), r.attachments.push({
      filename: "zod_issues.json",
      data: JSON.stringify({
        issues: o
      })
    })), b(p({}, n), {
      exception: b(p({}, n.exception), {
        values: [
          b(p({}, n.exception.values[0]), {
            value: Pu(r.originalException)
          }),
          ...n.exception.values.slice(1)
        ]
      }),
      extra: b(p({}, n.extra), {
        "zoderror.issues": o.slice(0, t)
      })
    });
  } catch (i) {
    return b(p({}, n), {
      extra: b(p({}, n.extra), {
        "zoderrors sentry integration parse error": {
          message: "an exception was thrown while processing ZodError within applyZodErrorsToEvent()",
          error: i instanceof Error ? `${i.name}: ${i.message}
${i.stack}` : "unknown"
        }
      })
    });
  }
}
const Du = ((t = {}) => {
  var n;
  const e = (n = t.limit) != null ? n : Ou;
  return {
    name: vu,
    processEvent(r, s) {
      return xu(e, t.saveZodIssuesAsAttachment, r, s);
    }
  };
}), Rp = Du, Np = (t) => ({
  name: "ThirdPartyErrorsFilter",
  setup(e) {
    e.on("beforeEnvelope", (n) => {
      re(n, (r, s) => {
        if (s === "event") {
          const i = Array.isArray(r) ? r[1] : void 0;
          i && (vi(i), r[1] = i);
        }
      });
    }), e.on("applyFrameMetadata", (n) => {
      if (n.type)
        return;
      const r = e.getOptions().stackParser;
      Oi(r, n);
    });
  },
  processEvent(e) {
    const n = $u(e);
    if (n) {
      const r = t.behaviour === "drop-error-if-contains-third-party-frames" || t.behaviour === "apply-tag-if-contains-third-party-frames" ? "some" : "every";
      if (n[r]((i) => !i.some((o) => t.filterKeys.includes(o)))) {
        if (t.behaviour === "drop-error-if-contains-third-party-frames" || t.behaviour === "drop-error-if-exclusively-contains-third-party-frames")
          return null;
        e.tags = b(p({}, e.tags), {
          third_party_code: !0
        });
      }
    }
    return e;
  }
});
function $u(t) {
  const e = io(t);
  if (e)
    return e.filter((n) => {
      var r;
      return !!n.filename && ((r = n.lineno) != null ? r : n.colno) != null;
    }).map((n) => n.module_metadata ? Object.keys(n.module_metadata).filter((r) => r.startsWith(gs)).map((r) => r.slice(gs.length)) : []);
}
const gs = "_sentryBundlerPluginAppKey:", Lu = 100, Fu = 10, Se = "flag.evaluation.";
function Uu(t) {
  const n = w().getScopeData().contexts.flags, r = n ? n.values : [];
  return r.length && (t.contexts === void 0 && (t.contexts = {}), t.contexts.flags = { values: [...r] }), t;
}
function ju(t, e, n = Lu) {
  const r = w().getScopeData().contexts;
  r.flags || (r.flags = { values: [] });
  const s = r.flags.values;
  Bu(s, t, e, n);
}
function Bu(t, e, n, r) {
  if (typeof n != "boolean")
    return;
  if (t.length > r) {
    S && g.error(`[Feature Flags] insertToFlagBuffer called on a buffer larger than maxSize=${r}`);
    return;
  }
  const s = t.findIndex((i) => i.flag === e);
  s !== -1 && t.splice(s, 1), t.length === r && t.shift(), t.push({
    flag: e,
    result: n
  });
}
function Gu(t, e, n = Fu) {
  if (typeof e != "boolean")
    return;
  const r = Bt();
  if (!r)
    return;
  const s = N(r).data;
  if (`${Se}${t}` in s) {
    r.setAttribute(`${Se}${t}`, e);
    return;
  }
  Object.keys(s).filter((o) => o.startsWith(Se)).length < n && r.setAttribute(`${Se}${t}`, e);
}
const kp = () => ({
  name: "FeatureFlags",
  processEvent(t, e, n) {
    return Uu(t);
  },
  addFeatureFlag(t, e) {
    ju(t, e), Gu(t, e);
  }
});
function Ht(t, e, n, r, s) {
  Ce({ level: t, message: e, attributes: n, severityNumber: s }, r);
}
function Hu(t, e, { scope: n } = {}) {
  Ht("trace", t, e, n);
}
function zu(t, e, { scope: n } = {}) {
  Ht("debug", t, e, n);
}
function qu(t, e, { scope: n } = {}) {
  Ht("info", t, e, n);
}
function Wu(t, e, { scope: n } = {}) {
  Ht("warn", t, e, n);
}
function Ju(t, e, { scope: n } = {}) {
  Ht("error", t, e, n);
}
function Yu(t, e, { scope: n } = {}) {
  Ht("fatal", t, e, n);
}
const Op = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  debug: zu,
  error: Ju,
  fatal: Yu,
  fmt: $c,
  info: qu,
  trace: Hu,
  warn: Wu
}, Symbol.toStringTag, { value: "Module" }));
function xn(t, e, n) {
  return "util" in I && typeof I.util.format == "function" ? I.util.format(...t) : Vu(t, e, n);
}
function Vu(t, e, n) {
  return t.map(
    (r) => zn(r) ? String(r) : JSON.stringify(G(r, e, n))
  ).join(" ");
}
function Ku(t) {
  return /%[sdifocO]/.test(t);
}
function Xu(t, e) {
  const n = {}, r = new Array(e.length).fill("{}").join(" ");
  return n["sentry.message.template"] = `${t} ${r}`, e.forEach((s, i) => {
    n[`sentry.message.parameter.${i}`] = s;
  }), n;
}
const Zu = "ConsoleLogs", hs = {
  [L]: "auto.log.console"
}, Qu = ((t = {}) => {
  const e = t.levels || Fn;
  return {
    name: Zu,
    setup(n) {
      const { enableLogs: r, normalizeDepth: s = 3, normalizeMaxBreadth: i = 1e3 } = n.getOptions();
      if (!r) {
        S && g.warn("`enableLogs` is not enabled, ConsoleLogs integration disabled");
        return;
      }
      Mi(({ args: o, level: a }) => {
        if (v() !== n || !e.includes(a))
          return;
        const c = o[0], u = o.slice(1);
        if (a === "assert") {
          if (!c) {
            const l = u.length > 0 ? `Assertion failed: ${xn(u, s, i)}` : "Assertion failed";
            Ce({ level: "error", message: l, attributes: hs });
          }
          return;
        }
        const f = a === "log", d = o.length > 1 && typeof o[0] == "string" && !Ku(o[0]), m = p(p({}, hs), d ? Xu(c, u) : {});
        Ce({
          level: f ? "info" : a,
          message: xn(o, s, i),
          severityNumber: f ? 10 : void 0,
          attributes: m
        });
      });
    }
  };
}), vp = Qu;
function sr(t, e, n, r) {
  mc(
    { type: t, name: e, value: n, unit: r == null ? void 0 : r.unit, attributes: r == null ? void 0 : r.attributes },
    { scope: r == null ? void 0 : r.scope }
  );
}
function tl(t, e = 1, n) {
  sr("counter", t, e, n);
}
function el(t, e, n) {
  sr("gauge", t, e, n);
}
function nl(t, e, n) {
  sr("distribution", t, e, n);
}
const Mp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  count: tl,
  distribution: nl,
  gauge: el
}, Symbol.toStringTag, { value: "Module" })), rl = ["trace", "debug", "info", "warn", "error", "fatal"];
function wp(t = {}) {
  var r;
  const e = new Set((r = t.levels) != null ? r : rl), n = t.client;
  return {
    log(s) {
      const T = s, { type: i, level: o, message: a, args: c, tag: u, date: f } = T, d = dn(T, ["type", "level", "message", "args", "tag", "date"]), m = n || v();
      if (!m)
        return;
      const l = ol(i, o);
      if (!e.has(l))
        return;
      const { normalizeDepth: h = 3, normalizeMaxBreadth: y = 1e3 } = m.getOptions(), _ = [];
      a && _.push(a), c && c.length > 0 && _.push(xn(c, h, y));
      const E = _.join(" ");
      d["sentry.origin"] = "auto.log.consola", u && (d["consola.tag"] = u), i && (d["consola.type"] = i), o != null && typeof o == "number" && (d["consola.level"] = o), Ce({
        level: l,
        message: E,
        attributes: d
      });
    }
  };
}
const sl = {
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
}, il = {
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
function ol(t, e) {
  if (t === "verbose")
    return "debug";
  if (t === "silent")
    return "trace";
  if (t) {
    const n = sl[t];
    if (n)
      return n;
  }
  if (typeof e == "number") {
    const n = il[e];
    if (n)
      return n;
  }
  return "info";
}
const al = "gen_ai.prompt", ir = "gen_ai.system", q = "gen_ai.request.model", Pi = "gen_ai.request.stream", or = "gen_ai.request.temperature", xi = "gen_ai.request.max_tokens", ar = "gen_ai.request.frequency_penalty", Di = "gen_ai.request.presence_penalty", cr = "gen_ai.request.top_p", $i = "gen_ai.request.top_k", cl = "gen_ai.request.encoding_format", ul = "gen_ai.request.dimensions", zt = "gen_ai.response.finish_reasons", qt = "gen_ai.response.model", ce = "gen_ai.response.id", an = "gen_ai.usage.input_tokens", cn = "gen_ai.usage.output_tokens", un = "gen_ai.usage.total_tokens", ur = "gen_ai.operation.name", ht = "gen_ai.request.messages", V = "gen_ai.response.text", lr = "gen_ai.request.available_tools", ln = "gen_ai.response.streaming", pt = "gen_ai.response.tool_calls", ll = "openai.response.id", Li = "openai.response.model", fl = "openai.response.timestamp", pl = "openai.usage.completion_tokens", dl = "openai.usage.prompt_tokens", bn = {
  CHAT: "chat",
  RESPONSES: "responses",
  EMBEDDINGS: "embeddings"
}, ys = "anthropic.response.timestamp", Fi = 2e4, xe = (t) => new TextEncoder().encode(t).length, De = (t) => xe(JSON.stringify(t));
function fr(t, e) {
  if (xe(t) <= e)
    return t;
  let n = 0, r = t.length, s = "";
  for (; n <= r; ) {
    const i = Math.floor((n + r) / 2), o = t.slice(0, i);
    xe(o) <= e ? (s = o, n = i + 1) : r = i - 1;
  }
  return s;
}
function ml(t) {
  return typeof t == "string" ? t : t.text;
}
function Ss(t, e) {
  return typeof t == "string" ? e : b(p({}, t), { text: e });
}
function _l(t) {
  return t !== null && typeof t == "object" && "content" in t && typeof t.content == "string";
}
function gl(t) {
  return t !== null && typeof t == "object" && "parts" in t && Array.isArray(t.parts) && t.parts.length > 0;
}
function hl(t, e) {
  const n = b(p({}, t), { content: "" }), r = De(n), s = e - r;
  if (s <= 0)
    return [];
  const i = fr(t.content, s);
  return [b(p({}, t), { content: i })];
}
function yl(t, e) {
  const { parts: n } = t, r = n.map((a) => Ss(a, "")), s = De(b(p({}, t), { parts: r }));
  let i = e - s;
  if (i <= 0)
    return [];
  const o = [];
  for (const a of n) {
    const c = ml(a), u = xe(c);
    if (u <= i)
      o.push(a), i -= u;
    else if (o.length === 0) {
      const f = fr(c, i);
      f && o.push(Ss(a, f));
      break;
    } else
      break;
  }
  return o.length > 0 ? [b(p({}, t), { parts: o })] : [];
}
function Sl(t, e) {
  return !t || typeof t != "object" ? [] : _l(t) ? hl(t, e) : gl(t) ? yl(t, e) : [];
}
function El(t, e) {
  if (!Array.isArray(t) || t.length === 0 || De(t) <= e)
    return t;
  const r = t.map(De);
  let s = 0, i = t.length;
  for (let o = t.length - 1; o >= 0; o--) {
    const a = r[o];
    if (a && s + a > e)
      break;
    a && (s += a), i = o;
  }
  if (i === t.length) {
    const o = t[t.length - 1];
    return Sl(o, e);
  }
  return t.slice(i);
}
function bl(t) {
  return El(t, Fi);
}
function Tl(t) {
  return fr(t, Fi);
}
function ue(t) {
  return t.includes("messages") ? "messages" : t.includes("completions") ? "completions" : t.includes("models") ? "models" : t.includes("chat") ? "chat" : t.split(".").pop() || "unknown";
}
function $e(t) {
  return `gen_ai.${ue(t)}`;
}
function Ui(t, e) {
  return t ? `${t}.${e}` : e;
}
function pr(t, e, n, r, s) {
  if (e !== void 0 && t.setAttributes({
    [an]: e
  }), n !== void 0 && t.setAttributes({
    [cn]: n
  }), e !== void 0 || n !== void 0 || r !== void 0 || s !== void 0) {
    const i = (e != null ? e : 0) + (n != null ? n : 0) + (r != null ? r : 0) + (s != null ? s : 0);
    t.setAttributes({
      [un]: i
    });
  }
}
function yt(t) {
  if (typeof t == "string")
    return Tl(t);
  if (Array.isArray(t)) {
    const e = bl(t);
    return JSON.stringify(e);
  }
  return JSON.stringify(t);
}
const Il = "OpenAI", Al = ["responses.create", "chat.completions.create", "embeddings.create"], Rl = [
  "response.output_item.added",
  "response.function_call_arguments.delta",
  "response.function_call_arguments.done",
  "response.output_item.done"
], Nl = [
  "response.created",
  "response.in_progress",
  "response.failed",
  "response.completed",
  "response.incomplete",
  "response.queued",
  "response.output_text.delta",
  ...Rl
];
function dr(t) {
  return t.includes("chat.completions") ? bn.CHAT : t.includes("responses") ? bn.RESPONSES : t.includes("embeddings") ? bn.EMBEDDINGS : t.split(".").pop() || "unknown";
}
function Es(t) {
  return `gen_ai.${dr(t)}`;
}
function kl(t) {
  return Al.includes(t);
}
function Ol(t, e) {
  return t ? `${t}.${e}` : e;
}
function vl(t) {
  return t !== null && typeof t == "object" && "object" in t && t.object === "chat.completion";
}
function Ml(t) {
  return t !== null && typeof t == "object" && "object" in t && t.object === "response";
}
function wl(t) {
  if (t === null || typeof t != "object" || !("object" in t))
    return !1;
  const e = t;
  return e.object === "list" && typeof e.model == "string" && e.model.toLowerCase().includes("embedding");
}
function Cl(t) {
  return t !== null && typeof t == "object" && "type" in t && typeof t.type == "string" && t.type.startsWith("response.");
}
function Pl(t) {
  return t !== null && typeof t == "object" && "object" in t && t.object === "chat.completion.chunk";
}
function xl(t, e, n) {
  if (mr(t, e.id, e.model, e.created), e.usage && fn(
    t,
    e.usage.prompt_tokens,
    e.usage.completion_tokens,
    e.usage.total_tokens
  ), Array.isArray(e.choices)) {
    const r = e.choices.map((s) => s.finish_reason).filter((s) => s !== null);
    if (r.length > 0 && t.setAttributes({
      [zt]: JSON.stringify(r)
    }), n) {
      const s = e.choices.map((i) => {
        var o;
        return (o = i.message) == null ? void 0 : o.tool_calls;
      }).filter((i) => Array.isArray(i) && i.length > 0).flat();
      s.length > 0 && t.setAttributes({
        [pt]: JSON.stringify(s)
      });
    }
  }
}
function Dl(t, e, n) {
  if (mr(t, e.id, e.model, e.created_at), e.status && t.setAttributes({
    [zt]: JSON.stringify([e.status])
  }), e.usage && fn(
    t,
    e.usage.input_tokens,
    e.usage.output_tokens,
    e.usage.total_tokens
  ), n) {
    const r = e;
    if (Array.isArray(r.output) && r.output.length > 0) {
      const s = r.output.filter(
        (i) => typeof i == "object" && i !== null && i.type === "function_call"
      );
      s.length > 0 && t.setAttributes({
        [pt]: JSON.stringify(s)
      });
    }
  }
}
function $l(t, e) {
  t.setAttributes({
    [Li]: e.model,
    [qt]: e.model
  }), e.usage && fn(t, e.usage.prompt_tokens, void 0, e.usage.total_tokens);
}
function fn(t, e, n, r) {
  e !== void 0 && t.setAttributes({
    [dl]: e,
    [an]: e
  }), n !== void 0 && t.setAttributes({
    [pl]: n,
    [cn]: n
  }), r !== void 0 && t.setAttributes({
    [un]: r
  });
}
function mr(t, e, n, r) {
  t.setAttributes({
    [ll]: e,
    [ce]: e
  }), t.setAttributes({
    [Li]: n,
    [qt]: n
  }), t.setAttributes({
    [fl]: new Date(r * 1e3).toISOString()
  });
}
function Ll(t, e) {
  for (const n of t) {
    const r = n.index;
    if (!(r === void 0 || !n.function))
      if (!(r in e.chatCompletionToolCalls))
        e.chatCompletionToolCalls[r] = b(p({}, n), {
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
function Fl(t, e, n) {
  var r, s, i, o, a, c;
  e.responseId = (r = t.id) != null ? r : e.responseId, e.responseModel = (s = t.model) != null ? s : e.responseModel, e.responseTimestamp = (i = t.created) != null ? i : e.responseTimestamp, t.usage && (e.promptTokens = t.usage.prompt_tokens, e.completionTokens = t.usage.completion_tokens, e.totalTokens = t.usage.total_tokens);
  for (const u of (o = t.choices) != null ? o : [])
    n && ((a = u.delta) != null && a.content && e.responseTexts.push(u.delta.content), (c = u.delta) != null && c.tool_calls && Ll(u.delta.tool_calls, e)), u.finish_reason && e.finishReasons.push(u.finish_reason);
}
function Ul(t, e, n, r) {
  var i, o, a;
  if (!(t && typeof t == "object")) {
    e.eventTypes.push("unknown:non-object");
    return;
  }
  if (t instanceof Error) {
    r.setStatus({ code: O, message: "internal_error" }), D(t, {
      mechanism: {
        handled: !1,
        type: "auto.ai.openai.stream-response"
      }
    });
    return;
  }
  if (!("type" in t)) return;
  const s = t;
  if (!Nl.includes(s.type)) {
    e.eventTypes.push(s.type);
    return;
  }
  if (n && (s.type === "response.output_item.done" && "item" in s && e.responsesApiToolCalls.push(s.item), s.type === "response.output_text.delta" && "delta" in s && s.delta)) {
    e.responseTexts.push(s.delta);
    return;
  }
  if ("response" in s) {
    const { response: c } = s;
    e.responseId = (i = c.id) != null ? i : e.responseId, e.responseModel = (o = c.model) != null ? o : e.responseModel, e.responseTimestamp = (a = c.created_at) != null ? a : e.responseTimestamp, c.usage && (e.promptTokens = c.usage.input_tokens, e.completionTokens = c.usage.output_tokens, e.totalTokens = c.usage.total_tokens), c.status && e.finishReasons.push(c.status), n && c.output_text && e.responseTexts.push(c.output_text);
  }
}
function jl(t, e, n) {
  return _e(this, null, function* () {
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
        for (var s = ge(t), i, o, a; i = !(o = yield new st(s.next())).done; i = !1) {
          const c = o.value;
          Pl(c) ? Fl(c, r, n) : Cl(c) && Ul(c, r, n, e), yield c;
        }
      } catch (o) {
        a = [o];
      } finally {
        try {
          i && (o = s.return) && (yield new st(o.call(s)));
        } finally {
          if (a)
            throw a[0];
        }
      }
    } finally {
      mr(e, r.responseId, r.responseModel, r.responseTimestamp), fn(e, r.promptTokens, r.completionTokens, r.totalTokens), e.setAttributes({
        [ln]: !0
      }), r.finishReasons.length && e.setAttributes({
        [zt]: JSON.stringify(r.finishReasons)
      }), n && r.responseTexts.length && e.setAttributes({
        [V]: r.responseTexts.join("")
      });
      const u = [...Object.values(r.chatCompletionToolCalls), ...r.responsesApiToolCalls];
      u.length > 0 && e.setAttributes({
        [pt]: JSON.stringify(u)
      }), e.end();
    }
  });
}
function Bl(t, e) {
  var r;
  const n = {
    [ir]: "openai",
    [ur]: dr(e),
    [L]: "auto.ai.openai"
  };
  if (t.length > 0 && typeof t[0] == "object" && t[0] !== null) {
    const s = t[0], i = Array.isArray(s.tools) ? s.tools : [], a = s.web_search_options && typeof s.web_search_options == "object" ? [p({ type: "web_search_options" }, s.web_search_options)] : [], c = [...i, ...a];
    c.length > 0 && (n[lr] = JSON.stringify(c));
  }
  if (t.length > 0 && typeof t[0] == "object" && t[0] !== null) {
    const s = t[0];
    n[q] = (r = s.model) != null ? r : "unknown", "temperature" in s && (n[or] = s.temperature), "top_p" in s && (n[cr] = s.top_p), "frequency_penalty" in s && (n[ar] = s.frequency_penalty), "presence_penalty" in s && (n[Di] = s.presence_penalty), "stream" in s && (n[Pi] = s.stream), "encoding_format" in s && (n[cl] = s.encoding_format), "dimensions" in s && (n[ul] = s.dimensions);
  } else
    n[q] = "unknown";
  return n;
}
function Gl(t, e, n) {
  var s;
  if (!e || typeof e != "object") return;
  const r = e;
  if (vl(r)) {
    if (xl(t, r, n), n && ((s = r.choices) != null && s.length)) {
      const i = r.choices.map((o) => {
        var a;
        return ((a = o.message) == null ? void 0 : a.content) || "";
      });
      t.setAttributes({ [V]: JSON.stringify(i) });
    }
  } else Ml(r) ? (Dl(t, r, n), n && r.output_text && t.setAttributes({ [V]: r.output_text })) : wl(r) && $l(t, r);
}
function bs(t, e) {
  if ("messages" in e) {
    const n = yt(e.messages);
    t.setAttributes({ [ht]: n });
  }
  if ("input" in e) {
    const n = yt(e.input);
    t.setAttributes({ [ht]: n });
  }
}
function Hl() {
  var s, i, o, a;
  const e = w().getClient(), n = e == null ? void 0 : e.getIntegrationByName(Il), r = n ? !!(e != null && e.getOptions().sendDefaultPii) : !1;
  return {
    recordInputs: (i = (s = n == null ? void 0 : n.options) == null ? void 0 : s.recordInputs) != null ? i : r,
    recordOutputs: (a = (o = n == null ? void 0 : n.options) == null ? void 0 : o.recordOutputs) != null ? a : r
  };
}
function zl(t, e, n, r) {
  return function(...i) {
    return F(this, null, function* () {
      const o = r || Hl(), a = Bl(i, e), c = a[q] || "unknown", u = dr(e), f = i[0];
      return f && typeof f == "object" && f.stream === !0 ? we(
        {
          name: `${u} ${c} stream-response`,
          op: Es(e),
          attributes: a
        },
        (m) => F(null, null, function* () {
          var l;
          try {
            o.recordInputs && i[0] && typeof i[0] == "object" && bs(m, i[0]);
            const h = yield t.apply(n, i);
            return jl(
              h,
              m,
              (l = o.recordOutputs) != null ? l : !1
            );
          } catch (h) {
            throw m.setStatus({ code: O, message: "internal_error" }), D(h, {
              mechanism: {
                handled: !1,
                type: "auto.ai.openai.stream",
                data: {
                  function: e
                }
              }
            }), m.end(), h;
          }
        })
      ) : ae(
        {
          name: `${u} ${c}`,
          op: Es(e),
          attributes: a
        },
        (m) => F(null, null, function* () {
          try {
            o.recordInputs && i[0] && typeof i[0] == "object" && bs(m, i[0]);
            const l = yield t.apply(n, i);
            return Gl(m, l, o.recordOutputs), l;
          } catch (l) {
            throw D(l, {
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
function ji(t, e = "", n) {
  return new Proxy(t, {
    get(r, s) {
      const i = r[s], o = Ol(e, String(s));
      return typeof i == "function" && kl(o) ? zl(i, o, r, n) : typeof i == "function" ? i.bind(r) : i && typeof i == "object" ? ji(i, o, n) : i;
    }
  });
}
function Cp(t, e) {
  return ji(t, "", e);
}
function ql(t, e) {
  var n, r;
  return "type" in t && typeof t.type == "string" && t.type === "error" ? (e.setStatus({ code: O, message: (r = (n = t.error) == null ? void 0 : n.type) != null ? r : "internal_error" }), D(t.error, {
    mechanism: {
      handled: !1,
      type: "auto.ai.anthropic.anthropic_error"
    }
  }), !0) : !1;
}
function Wl(t, e) {
  if (t.type === "message_delta" && t.usage && "output_tokens" in t.usage && typeof t.usage.output_tokens == "number" && (e.completionTokens = t.usage.output_tokens), t.message) {
    const n = t.message;
    n.id && (e.responseId = n.id), n.model && (e.responseModel = n.model), n.stop_reason && e.finishReasons.push(n.stop_reason), n.usage && (typeof n.usage.input_tokens == "number" && (e.promptTokens = n.usage.input_tokens), typeof n.usage.cache_creation_input_tokens == "number" && (e.cacheCreationInputTokens = n.usage.cache_creation_input_tokens), typeof n.usage.cache_read_input_tokens == "number" && (e.cacheReadInputTokens = n.usage.cache_read_input_tokens));
  }
}
function Jl(t, e) {
  t.type !== "content_block_start" || typeof t.index != "number" || !t.content_block || (t.content_block.type === "tool_use" || t.content_block.type === "server_tool_use") && (e.activeToolBlocks[t.index] = {
    id: t.content_block.id,
    name: t.content_block.name,
    inputJsonParts: []
  });
}
function Yl(t, e, n) {
  if (!(t.type !== "content_block_delta" || !t.delta)) {
    if (typeof t.index == "number" && "partial_json" in t.delta && typeof t.delta.partial_json == "string") {
      const r = e.activeToolBlocks[t.index];
      r && r.inputJsonParts.push(t.delta.partial_json);
    }
    n && typeof t.delta.text == "string" && e.responseTexts.push(t.delta.text);
  }
}
function Vl(t, e) {
  if (t.type !== "content_block_stop" || typeof t.index != "number") return;
  const n = e.activeToolBlocks[t.index];
  if (!n) return;
  const r = n.inputJsonParts.join("");
  let s;
  try {
    s = r ? JSON.parse(r) : {};
  } catch (i) {
    s = { __unparsed: r };
  }
  e.toolCalls.push({
    type: "tool_use",
    id: n.id,
    name: n.name,
    input: s
  }), delete e.activeToolBlocks[t.index];
}
function Bi(t, e, n, r) {
  !(t && typeof t == "object") || ql(t, r) || (Wl(t, e), Jl(t, e), Yl(t, e, n), Vl(t, e));
}
function Kl(t, e, n) {
  e.isRecording() && (t.responseId && e.setAttributes({
    [ce]: t.responseId
  }), t.responseModel && e.setAttributes({
    [qt]: t.responseModel
  }), pr(
    e,
    t.promptTokens,
    t.completionTokens,
    t.cacheCreationInputTokens,
    t.cacheReadInputTokens
  ), e.setAttributes({
    [ln]: !0
  }), t.finishReasons.length > 0 && e.setAttributes({
    [zt]: JSON.stringify(t.finishReasons)
  }), n && t.responseTexts.length > 0 && e.setAttributes({
    [V]: t.responseTexts.join("")
  }), n && t.toolCalls.length > 0 && e.setAttributes({
    [pt]: JSON.stringify(t.toolCalls)
  }), e.end());
}
function Xl(t, e, n) {
  return _e(this, null, function* () {
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
        for (var s = ge(t), i, o, a; i = !(o = yield new st(s.next())).done; i = !1) {
          const c = o.value;
          Bi(c, r, n, e), yield c;
        }
      } catch (o) {
        a = [o];
      } finally {
        try {
          i && (o = s.return) && (yield new st(o.call(s)));
        } finally {
          if (a)
            throw a[0];
        }
      }
    } finally {
      r.responseId && e.setAttributes({
        [ce]: r.responseId
      }), r.responseModel && e.setAttributes({
        [qt]: r.responseModel
      }), pr(
        e,
        r.promptTokens,
        r.completionTokens,
        r.cacheCreationInputTokens,
        r.cacheReadInputTokens
      ), e.setAttributes({
        [ln]: !0
      }), r.finishReasons.length > 0 && e.setAttributes({
        [zt]: JSON.stringify(r.finishReasons)
      }), n && r.responseTexts.length > 0 && e.setAttributes({
        [V]: r.responseTexts.join("")
      }), n && r.toolCalls.length > 0 && e.setAttributes({
        [pt]: JSON.stringify(r.toolCalls)
      }), e.end();
    }
  });
}
function Zl(t, e, n) {
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
    Bi(s, r, n, e);
  }), t.on("message", () => {
    Kl(r, e, n);
  }), t.on("error", (s) => {
    D(s, {
      mechanism: {
        handled: !1,
        type: "auto.ai.anthropic.stream_error"
      }
    }), e.isRecording() && (e.setStatus({ code: O, message: "stream_error" }), e.end());
  }), t;
}
const Ql = [
  "messages.create",
  "messages.stream",
  "messages.countTokens",
  "models.get",
  "completions.create",
  "models.retrieve",
  "beta.messages.create"
];
function tf(t) {
  return Ql.includes(t);
}
function ef(t, e) {
  e.error && (t.setStatus({ code: O, message: e.error.type || "internal_error" }), D(e.error, {
    mechanism: {
      handled: !1,
      type: "auto.ai.anthropic.anthropic_error"
    }
  }));
}
function nf(t, e) {
  var r;
  const n = {
    [ir]: "anthropic",
    [ur]: ue(e),
    [L]: "auto.ai.anthropic"
  };
  if (t.length > 0 && typeof t[0] == "object" && t[0] !== null) {
    const s = t[0];
    s.tools && Array.isArray(s.tools) && (n[lr] = JSON.stringify(s.tools)), n[q] = (r = s.model) != null ? r : "unknown", "temperature" in s && (n[or] = s.temperature), "top_p" in s && (n[cr] = s.top_p), "stream" in s && (n[Pi] = s.stream), "top_k" in s && (n[$i] = s.top_k), "frequency_penalty" in s && (n[ar] = s.frequency_penalty), "max_tokens" in s && (n[xi] = s.max_tokens);
  } else
    e === "models.retrieve" || e === "models.get" ? n[q] = t[0] : n[q] = "unknown";
  return n;
}
function Dn(t, e) {
  if ("messages" in e) {
    const n = yt(e.messages);
    t.setAttributes({ [ht]: n });
  }
  if ("input" in e) {
    const n = yt(e.input);
    t.setAttributes({ [ht]: n });
  }
  "prompt" in e && t.setAttributes({ [al]: JSON.stringify(e.prompt) });
}
function rf(t, e) {
  if ("content" in e && Array.isArray(e.content)) {
    t.setAttributes({
      [V]: e.content.map((r) => r.text).filter((r) => !!r).join("")
    });
    const n = [];
    for (const r of e.content)
      (r.type === "tool_use" || r.type === "server_tool_use") && n.push(r);
    n.length > 0 && t.setAttributes({ [pt]: JSON.stringify(n) });
  }
  "completion" in e && t.setAttributes({ [V]: e.completion }), "input_tokens" in e && t.setAttributes({ [V]: JSON.stringify(e.input_tokens) });
}
function sf(t, e) {
  "id" in e && "model" in e && (t.setAttributes({
    [ce]: e.id,
    [qt]: e.model
  }), "created" in e && typeof e.created == "number" && t.setAttributes({
    [ys]: new Date(e.created * 1e3).toISOString()
  }), "created_at" in e && typeof e.created_at == "number" && t.setAttributes({
    [ys]: new Date(e.created_at * 1e3).toISOString()
  }), "usage" in e && e.usage && pr(
    t,
    e.usage.input_tokens,
    e.usage.output_tokens,
    e.usage.cache_creation_input_tokens,
    e.usage.cache_read_input_tokens
  ));
}
function of(t, e, n) {
  if (!(!e || typeof e != "object")) {
    if ("type" in e && e.type === "error") {
      ef(t, e);
      return;
    }
    n && rf(t, e), sf(t, e);
  }
}
function Ts(t, e, n) {
  throw D(t, {
    mechanism: { handled: !1, type: "auto.ai.anthropic", data: { function: n } }
  }), e.isRecording() && (e.setStatus({ code: O, message: "internal_error" }), e.end()), t;
}
function af(t, e, n, r, s, i, o, a, c, u, f) {
  var l;
  const d = (l = s[q]) != null ? l : "unknown", m = {
    name: `${i} ${d} stream-response`,
    op: $e(o),
    attributes: s
  };
  return u && !f ? we(m, (h) => F(null, null, function* () {
    var y;
    try {
      c.recordInputs && a && Dn(h, a);
      const _ = yield t.apply(n, r);
      return Xl(
        _,
        h,
        (y = c.recordOutputs) != null ? y : !1
      );
    } catch (_) {
      return Ts(_, h, o);
    }
  })) : we(m, (h) => {
    var y;
    try {
      c.recordInputs && a && Dn(h, a);
      const _ = e.apply(n, r);
      return Zl(_, h, (y = c.recordOutputs) != null ? y : !1);
    } catch (_) {
      return Ts(_, h, o);
    }
  });
}
function cf(t, e, n, r) {
  return new Proxy(t, {
    apply(s, i, o) {
      var l;
      const a = nf(o, e), c = (l = a[q]) != null ? l : "unknown", u = ue(e), f = typeof o[0] == "object" ? o[0] : void 0, d = !!(f != null && f.stream), m = e === "messages.stream";
      return d || m ? af(
        t,
        s,
        n,
        o,
        a,
        u,
        e,
        f,
        r,
        d,
        m
      ) : ae(
        {
          name: `${u} ${c}`,
          op: $e(e),
          attributes: a
        },
        (h) => (r.recordInputs && f && Dn(h, f), tn(
          () => s.apply(n, o),
          (y) => {
            D(y, {
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
          (y) => of(h, y, r.recordOutputs)
        ))
      );
    }
  });
}
function Gi(t, e = "", n) {
  return new Proxy(t, {
    get(r, s) {
      const i = r[s], o = Ui(e, String(s));
      return typeof i == "function" && tf(o) ? cf(i, o, r, n) : typeof i == "function" ? i.bind(r) : i && typeof i == "object" ? Gi(i, o, n) : i;
    }
  });
}
function Pp(t, e) {
  var s;
  const n = !!((s = v()) != null && s.getOptions().sendDefaultPii), r = p({
    recordInputs: n,
    recordOutputs: n
  }, e);
  return Gi(t, "", r);
}
const Is = [
  "models.generateContent",
  "models.generateContentStream",
  "chats.create",
  "sendMessage",
  "sendMessageStream"
], uf = "google_genai", Hi = "chats.create", lf = "chat";
function ff(t, e) {
  var r;
  const n = t == null ? void 0 : t.promptFeedback;
  if (n != null && n.blockReason) {
    const s = (r = n.blockReasonMessage) != null ? r : n.blockReason;
    return e.setStatus({ code: O, message: `Content blocked: ${s}` }), D(`Content blocked: ${s}`, {
      mechanism: { handled: !1, type: "auto.ai.google_genai" }
    }), !0;
  }
  return !1;
}
function pf(t, e) {
  typeof t.responseId == "string" && (e.responseId = t.responseId), typeof t.modelVersion == "string" && (e.responseModel = t.modelVersion);
  const n = t.usageMetadata;
  n && (typeof n.promptTokenCount == "number" && (e.promptTokens = n.promptTokenCount), typeof n.candidatesTokenCount == "number" && (e.completionTokens = n.candidatesTokenCount), typeof n.totalTokenCount == "number" && (e.totalTokens = n.totalTokenCount));
}
function df(t, e, n) {
  var r, s, i;
  Array.isArray(t.functionCalls) && e.toolCalls.push(...t.functionCalls);
  for (const o of (r = t.candidates) != null ? r : []) {
    o != null && o.finishReason && !e.finishReasons.includes(o.finishReason) && e.finishReasons.push(o.finishReason);
    for (const a of (i = (s = o == null ? void 0 : o.content) == null ? void 0 : s.parts) != null ? i : [])
      n && a.text && e.responseTexts.push(a.text), a.functionCall && e.toolCalls.push({
        type: "function",
        id: a.functionCall.id,
        name: a.functionCall.name,
        arguments: a.functionCall.args
      });
  }
}
function mf(t, e, n, r) {
  !t || ff(t, r) || (pf(t, e), df(t, e, n));
}
function _f(t, e, n) {
  return _e(this, null, function* () {
    const r = {
      responseTexts: [],
      finishReasons: [],
      toolCalls: []
    };
    try {
      try {
        for (var s = ge(t), i, o, a; i = !(o = yield new st(s.next())).done; i = !1) {
          const c = o.value;
          mf(c, r, n, e), yield c;
        }
      } catch (o) {
        a = [o];
      } finally {
        try {
          i && (o = s.return) && (yield new st(o.call(s)));
        } finally {
          if (a)
            throw a[0];
        }
      }
    } finally {
      const c = {
        [ln]: !0
      };
      r.responseId && (c[ce] = r.responseId), r.responseModel && (c[qt] = r.responseModel), r.promptTokens !== void 0 && (c[an] = r.promptTokens), r.completionTokens !== void 0 && (c[cn] = r.completionTokens), r.totalTokens !== void 0 && (c[un] = r.totalTokens), r.finishReasons.length && (c[zt] = JSON.stringify(r.finishReasons)), n && r.responseTexts.length && (c[V] = r.responseTexts.join("")), n && r.toolCalls.length && (c[pt] = JSON.stringify(r.toolCalls)), e.setAttributes(c), e.end();
    }
  });
}
function gf(t) {
  if (Is.includes(t))
    return !0;
  const e = t.split(".").pop();
  return Is.includes(e);
}
function hf(t) {
  return t.includes("Stream") || t.endsWith("generateContentStream") || t.endsWith("sendMessageStream");
}
function As(t, e) {
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
function yf(t) {
  const e = {};
  return "temperature" in t && typeof t.temperature == "number" && (e[or] = t.temperature), "topP" in t && typeof t.topP == "number" && (e[cr] = t.topP), "topK" in t && typeof t.topK == "number" && (e[$i] = t.topK), "maxOutputTokens" in t && typeof t.maxOutputTokens == "number" && (e[xi] = t.maxOutputTokens), "frequencyPenalty" in t && typeof t.frequencyPenalty == "number" && (e[ar] = t.frequencyPenalty), "presencePenalty" in t && typeof t.presencePenalty == "number" && (e[Di] = t.presencePenalty), e;
}
function Sf(t, e, n) {
  const r = {
    [ir]: uf,
    [ur]: ue(t),
    [L]: "auto.ai.google_genai"
  };
  if (e) {
    if (r[q] = As(e, n), "config" in e && typeof e.config == "object" && e.config) {
      const s = e.config;
      if (Object.assign(r, yf(s)), "tools" in s && Array.isArray(s.tools)) {
        const i = s.tools.flatMap(
          (o) => o.functionDeclarations
        );
        r[lr] = JSON.stringify(i);
      }
    }
  } else
    r[q] = As({}, n);
  return r;
}
function Rs(t, e) {
  if ("contents" in e) {
    const n = e.contents, r = yt(n);
    t.setAttributes({ [ht]: r });
  }
  if ("message" in e) {
    const n = e.message, r = yt(n);
    t.setAttributes({ [ht]: r });
  }
  if ("history" in e) {
    const n = e.history, r = yt(n);
    t.setAttributes({ [ht]: r });
  }
}
function Ef(t, e, n) {
  if (!(!e || typeof e != "object")) {
    if (e.usageMetadata && typeof e.usageMetadata == "object") {
      const r = e.usageMetadata;
      typeof r.promptTokenCount == "number" && t.setAttributes({
        [an]: r.promptTokenCount
      }), typeof r.candidatesTokenCount == "number" && t.setAttributes({
        [cn]: r.candidatesTokenCount
      }), typeof r.totalTokenCount == "number" && t.setAttributes({
        [un]: r.totalTokenCount
      });
    }
    if (n && Array.isArray(e.candidates) && e.candidates.length > 0) {
      const r = e.candidates.map((s) => {
        var i;
        return (i = s.content) != null && i.parts && Array.isArray(s.content.parts) ? s.content.parts.map((o) => typeof o.text == "string" ? o.text : "").filter((o) => o.length > 0).join("") : "";
      }).filter((s) => s.length > 0);
      r.length > 0 && t.setAttributes({
        [V]: r.join("")
      });
    }
    if (n && e.functionCalls) {
      const r = e.functionCalls;
      Array.isArray(r) && r.length > 0 && t.setAttributes({
        [pt]: JSON.stringify(r)
      });
    }
  }
}
function Ns(t, e, n, r) {
  const s = e === Hi;
  return new Proxy(t, {
    apply(i, o, a) {
      var m;
      const c = a[0], u = Sf(e, c, n), f = (m = u[q]) != null ? m : "unknown", d = ue(e);
      return hf(e) ? we(
        {
          name: `${d} ${f} stream-response`,
          op: $e(e),
          attributes: u
        },
        (l) => F(null, null, function* () {
          try {
            r.recordInputs && c && Rs(l, c);
            const h = yield i.apply(n, a);
            return _f(h, l, !!r.recordOutputs);
          } catch (h) {
            throw l.setStatus({ code: O, message: "internal_error" }), D(h, {
              mechanism: {
                handled: !1,
                type: "auto.ai.google_genai",
                data: { function: e }
              }
            }), l.end(), h;
          }
        })
      ) : ae(
        {
          name: s ? `${d} ${f} create` : `${d} ${f}`,
          op: $e(e),
          attributes: u
        },
        (l) => (r.recordInputs && c && Rs(l, c), tn(
          () => i.apply(n, a),
          (h) => {
            D(h, {
              mechanism: { handled: !1, type: "auto.ai.google_genai", data: { function: e } }
            });
          },
          () => {
          },
          (h) => {
            s || Ef(l, h, r.recordOutputs);
          }
        ))
      );
    }
  });
}
function $n(t, e = "", n) {
  return new Proxy(t, {
    get: (r, s, i) => {
      const o = Reflect.get(r, s, i), a = Ui(e, String(s));
      if (typeof o == "function" && gf(a)) {
        if (a === Hi) {
          const c = Ns(o, a, r, n);
          return function(...f) {
            const d = c(...f);
            return d && typeof d == "object" ? $n(d, lf, n) : d;
          };
        }
        return Ns(o, a, r, n);
      }
      return typeof o == "function" ? o.bind(r) : o && typeof o == "object" ? $n(o, a, n) : o;
    }
  });
}
function xp(t, e) {
  var s;
  const n = !!((s = v()) != null && s.getOptions().sendDefaultPii), r = p({
    recordInputs: n,
    recordOutputs: n
  }, e);
  return $n(t, "", r);
}
const bf = "sentry.javascript.miniapp", ks = "10.27.0-rc.1", Ne = "?", Tf = /^\s*at (?:(.*?) ?\()?((?:file|https?|blob|chrome-extension|address|native|eval|webpack|<anonymous>|[-a-z]+:|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i, If = /\((\S*)(?::(\d+))(?::(\d+))\)/, Af = /^\s*at (.*?) ?\((\S*):(\d+):(\d+)\)/i;
function _r(t) {
  let e = null;
  const n = t && t.framesToPop;
  try {
    if (e = Nf(t), e)
      return Os(e, n);
  } catch (r) {
  }
  try {
    if (e = Rf(t), e)
      return Os(e, n);
  } catch (r) {
  }
  return {
    message: gr(t),
    name: t && t.name,
    stack: [],
    failed: !0
  };
}
function Rf(t) {
  if (!t || !t.stack)
    return null;
  const e = [], n = t.stack.split(`
`);
  let r, s, i, o;
  for (let a = 0; a < n.length; ++a) {
    if (i = Tf.exec(n[a])) {
      const c = i[2] && i[2].indexOf("native") === 0;
      r = i[2] && i[2].indexOf("eval") === 0, r && (s = If.exec(i[2])) && (i[2] = s[1], i[3] = s[2], i[4] = s[3]), o = {
        url: i[2],
        func: i[1] || Ne,
        args: c ? [i[2]] : [],
        line: i[3] ? +i[3] : null,
        column: i[4] ? +i[4] : null
      };
    } else if (i = Af.exec(n[a]))
      o = {
        url: i[2],
        func: i[1] || Ne,
        args: [],
        line: i[3] ? +i[3] : null,
        column: i[4] ? +i[4] : null
      };
    else
      continue;
    !o.func && o.line && (o.func = Ne), e.push(o);
  }
  return e.length ? {
    message: gr(t),
    name: t.name,
    stack: e
  } : null;
}
function Nf(t) {
  if (!t || !t.stacktrace)
    return null;
  const e = t.stacktrace, n = / line (\d+).*script (?:in )?(\S+)(?:: in function (\S+))?$/i, r = / line (\d+), column (\d+)\s*(?:in (?:<anonymous function: ([^>]+)>|([^\)]+))\((.*)\))? in (.*):\s*$/i, s = e.split(`
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
    }), c && (!c.func && c.line && (c.func = Ne), i.push(c));
  }
  return i.length ? {
    message: gr(t),
    name: t.name,
    stack: i
  } : null;
}
function Os(t, e) {
  try {
    return b(p({}, t), {
      stack: t.stack.slice(e)
    });
  } catch (n) {
    return t;
  }
}
function gr(t) {
  const e = t && t.message;
  return e ? e.error && typeof e.error.message == "string" ? e.error.message : e : "No error message";
}
const kf = 100;
function hr(t) {
  const e = _r(t), n = yr(e.stack), r = {
    type: Of(t),
    value: vf(t)
  };
  return n.length && (r.stacktrace = { frames: n }), r.type === void 0 && r.value === "" && (r.value = "Unrecoverable error caught"), r;
}
function Of(t) {
  const e = t == null ? void 0 : t.name;
  return !e && zi(t) ? t.message && Array.isArray(t.message) && t.message.length == 2 ? t.message[0] : "WebAssembly.Exception" : e;
}
function vf(t) {
  const e = t == null ? void 0 : t.message;
  return zi(t) ? Array.isArray(t.message) && t.message.length == 2 ? t.message[1] : "wasm exception" : e ? e.error && typeof e.error.message == "string" ? e.error.message : e : "No error message";
}
function zi(t) {
  return typeof WebAssembly != "undefined" && typeof WebAssembly.Exception != "undefined" ? t instanceof WebAssembly.Exception : !1;
}
function Mf(t, e, n) {
  const r = v(), s = r == null ? void 0 : r.getOptions().normalizeDepth, i = $f(t), o = {
    __serialized__: oi(t, s)
  };
  if (i)
    return {
      exception: {
        values: [hr(i)]
      },
      extra: o
    };
  const a = {
    exception: {
      values: [
        {
          type: Ye(t) ? t.constructor.name : n ? "UnhandledRejection" : "Error",
          value: xf(t, { isUnhandledRejection: n })
        }
      ]
    },
    extra: o
  };
  if (e) {
    const c = _r(e), u = yr(c.stack);
    u.length && (a.exception.values[0].stacktrace = { frames: u });
  }
  return a;
}
function Tn(t) {
  return {
    exception: {
      values: [hr(t)]
    }
  };
}
function wf(t, e, n) {
  const r = (e == null ? void 0 : e.syntheticException) || void 0, s = Pf(t, r, n);
  return at(s), s.level = "error", e != null && e.event_id && (s.event_id = e.event_id), Gt(s);
}
function Cf(t, e = "info", n, r) {
  const s = (n == null ? void 0 : n.syntheticException) || void 0, i = Ln(t, s, r);
  return i.level = e, n != null && n.event_id && (i.event_id = n.event_id), Gt(i);
}
function Pf(t, e, n, r) {
  let s;
  if (Ls(t) && t.error)
    return Tn(t.error);
  if (kr(t) || lo(t)) {
    const i = t;
    if ("stack" in t)
      s = Tn(t);
    else {
      const o = i.name || (kr(i) ? "DOMError" : "DOMException"), a = i.message ? `${o}: ${i.message}` : o;
      s = Ln(a, e, n), Rn(s, a);
    }
    return "code" in i && (s.tags = b(p({}, s.tags), { "DOMException.code": `${i.code}` })), s;
  }
  return mt(t) ? Tn(t) : St(t) || Ye(t) ? (s = Mf(t, e, r), at(s, {
    synthetic: !0
  }), s) : (s = Ln(t, e, n), Rn(s, `${t}`), at(s, {
    synthetic: !0
  }), s);
}
function Ln(t, e, n) {
  const r = {};
  if (n && e) {
    const s = _r(e), i = yr(s.stack);
    i.length && (r.exception = {
      values: [{ value: t, stacktrace: { frames: i } }]
    }), at(r, { synthetic: !0 });
  }
  if (Je(t)) {
    const { __sentry_template_string__: s, __sentry_template_values__: i } = t;
    return r.logentry = {
      message: s,
      params: i
    }, r;
  }
  return r.message = t, r;
}
function xf(t, { isUnhandledRejection: e }) {
  const n = So(t), r = "exception";
  return Ls(t) ? `Event \`ErrorEvent\` captured as ${r} with message \`${t.message}\`` : Ye(t) ? `Event \`${Df(t)}\` (type=${t.type}) captured as ${r}` : `Object captured as ${r} with keys: ${n}`;
}
function Df(t) {
  try {
    const e = Object.getPrototypeOf(t);
    return e ? e.constructor.name : void 0;
  } catch (e) {
  }
}
function $f(t) {
  for (const e in t)
    if (Object.prototype.hasOwnProperty.call(t, e)) {
      const n = t[e];
      if (n instanceof Error)
        return n;
    }
}
function yr(t) {
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
  ).slice(0, kf).reverse();
}
const Lf = () => {
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
}, Ff = () => {
  let t = "unknown";
  return typeof wx == "object" ? t = "wechat" : typeof my == "object" ? t = "alipay" : typeof tt == "object" ? t = "bytedance" : typeof dd == "object" ? t = "dingtalk" : typeof qq == "object" ? t = "qq" : typeof swan == "object" && (t = "swan"), t;
}, M = Lf(), qi = Ff(), Uf = "application/json";
function Sr(t) {
  function e(n) {
    return new Ct((r, s) => {
      const i = M.request || M.httpRequest;
      if (typeof i != "function") {
        s(new Error("Miniapp request function is not available"));
        return;
      }
      i({
        url: t.url,
        method: "POST",
        data: n.body,
        header: { "content-type": Uf },
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
  return bc(t, e);
}
const Dp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  makeMiniappTransport: Sr
}, Symbol.toStringTag, { value: "Module" })), jf = () => [];
class Bf extends Nc {
  /**
   * Creates a new Miniapp SDK instance.
   *
   * @param options Configuration options for this SDK.
   */
  constructor(e = {}) {
    const n = e.transport || Sr, r = e.stackParser || jf, s = e.integrations || e.defaultIntegrations || [], i = b(p({}, e), {
      transport: n,
      stackParser: r,
      integrations: s,
      dsn: e.dsn,
      // ensure defaults for required fields
      tracesSampleRate: e.tracesSampleRate
    });
    Lc(i, "miniapp", ["miniapp"]), super(i);
  }
  /**
   * @inheritDoc
   */
  _prepareEvent(e, n, r, s) {
    return e.platform = e.platform || "javascript", e.sdk = b(p({}, e.sdk), {
      name: bf,
      packages: [
        ...e.sdk && e.sdk.packages || [],
        {
          name: "npm:@sentry/miniapp",
          version: ks
        }
      ],
      version: ks
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
    return wf(e, n, this._options.attachStacktrace);
  }
  /**
   * @inheritDoc
   */
  // eslint-disable-next-line deprecation/deprecation
  eventFromMessage(e, n = "info", r) {
    return Cf(e, n, r, this._options.attachStacktrace);
  }
}
function Gf() {
  setTimeout(() => {
  });
}
function Ot(t, e = {}, n) {
  if (typeof t != "function")
    return t;
  try {
    const s = t.__sentry_wrapped__;
    if (s)
      return s;
    if (js(t))
      return t;
  } catch (s) {
    return t;
  }
  const r = function(...s) {
    try {
      const i = s.map((o) => Ot(o, e));
      return t.handleEvent ? t.handleEvent.apply(this, i) : t.apply(this, i);
    } catch (i) {
      throw Gf(), lt((o) => {
        o.addEventProcessor((a) => {
          const c = p({}, a);
          return e.mechanism && (Rn(c, void 0), at(c, e.mechanism)), c.extra = b(p({}, c.extra), {
            arguments: G(s, 3)
          }), c;
        }), D(i);
      }), i;
    }
  };
  try {
    for (const s in t)
      Object.prototype.hasOwnProperty.call(t, s) && (r[s] = t[s]);
  } catch (s) {
  }
  Us(r, t), W(t, "__sentry_wrapped__", r);
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
const ze = class ze {
  /** JSDoc */
  constructor(e) {
    this.name = ze.id, this._onErrorHandlerInstalled = !1, this._onUnhandledRejectionHandlerInstalled = !1, this._onPageNotFoundHandlerInstalled = !1, this._onMemoryWarningHandlerInstalled = !1, this._options = p({
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
    this._onErrorHandlerInstalled || (M.onError && M.onError((e) => {
      const n = typeof e == "string" ? new Error(e) : e;
      D(n);
    }), this._onErrorHandlerInstalled = !0);
  }
  /** JSDoc */
  _installGlobalOnUnhandledRejectionHandler() {
    this._onUnhandledRejectionHandlerInstalled || (M.onUnhandledRejection && M.onUnhandledRejection(
      ({ reason: e, promise: n }) => {
        const r = typeof e == "string" ? new Error(e) : e;
        D(r, {
          data: n
        });
      }
    ), this._onUnhandledRejectionHandlerInstalled = !0);
  }
  /** JSDoc */
  _installGlobalOnPageNotFoundHandler() {
    this._onPageNotFoundHandlerInstalled || (M.onPageNotFound && M.onPageNotFound((e) => {
      const n = e.path.split("?")[0];
      Zr("pagenotfound", n), Xr("message", JSON.stringify(e)), Kr(`页面无法找到: ${n}`);
    }), this._onPageNotFoundHandlerInstalled = !0);
  }
  /** JSDoc */
  _installGlobalOnMemoryWarningHandler() {
    this._onMemoryWarningHandlerInstalled || (M.onMemoryWarning && M.onMemoryWarning(({ level: e = -1 }) => {
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
      Zr("memory-warning", String(e)), Xr("message", n), Kr("内存不足告警");
    }), this._onMemoryWarningHandlerInstalled = !0);
  }
};
ze.id = "GlobalHandlers";
let Le = ze;
const qe = class qe {
  constructor() {
    this._ignoreOnError = 0, this.name = qe.id;
  }
  /** JSDoc */
  _wrapTimeFunction(e) {
    return function(...n) {
      const r = n[0];
      return n[0] = Ot(r, {
        mechanism: {
          data: { function: Ee(e) },
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
        Ot(n, {
          mechanism: {
            data: {
              function: "requestAnimationFrame",
              handler: Ee(e)
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
    const n = I, r = n[e] && n[e].prototype;
    !r || !r.hasOwnProperty || !r.hasOwnProperty("addEventListener") || (Nt(r, "addEventListener", function(s) {
      return function(i, o, a) {
        try {
          typeof o.handleEvent == "function" && (o.handleEvent = Ot(o.handleEvent.bind(o), {
            mechanism: {
              data: {
                function: "handleEvent",
                handler: Ee(o),
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
          i,
          Ot(o, {
            mechanism: {
              data: {
                function: "addEventListener",
                handler: Ee(o),
                target: e
              },
              handled: !0,
              type: "instrument"
            }
          }),
          a
        );
      };
    }), Nt(r, "removeEventListener", function(s) {
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
    const e = I;
    Nt(e, "setTimeout", this._wrapTimeFunction.bind(this)), Nt(e, "setInterval", this._wrapTimeFunction.bind(this)), Nt(e, "requestAnimationFrame", this._wrapRAF.bind(this)), [
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
qe.id = "TryCatch";
let Fe = qe;
function Ee(t) {
  try {
    return t && t.name || "<anonymous>";
  } catch (e) {
    return "<anonymous>";
  }
}
const Hf = "cause", zf = 5, Kt = class Kt {
  /**
   * @inheritDoc
   */
  constructor(e = {}) {
    this.name = Kt.id, this._key = e.key || Hf, this._limit = e.limit || zf;
  }
  /**
   * @inheritDoc
   */
  setupOnce() {
    rn((e, n) => {
      const r = v(), s = r && r.getIntegrationByName(Kt.id);
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
    const s = hr(e[n]);
    return this._walkErrorTree(e[n], n, [s, ...r]);
  }
};
Kt.id = "LinkedErrors";
let Ue = Kt;
const Xt = class Xt {
  constructor() {
    this.name = Xt.id;
  }
  /**
   * @inheritDoc
   */
  setupOnce() {
    rn((e) => {
      const n = v();
      if (n && n.getIntegrationByName(Xt.id))
        try {
          const s = M.getSystemInfoSync(), {
            SDKVersion: i = "0.0.0",
            batteryLevel: o,
            // 微信小程序
            currentBattery: a,
            // 支付宝小程序、 钉钉小程序
            battery: c,
            // 字节跳动小程序
            brand: u,
            language: f,
            model: d,
            pixelRatio: m,
            platform: l,
            screenHeight: h,
            screenWidth: y,
            // statusBarHeight,
            system: _,
            version: E,
            // windowHeight,
            // windowWidth,
            app: T,
            // 支付宝小程序
            appName: k
            // 字节跳动小程序
            // fontSizeSetting, // 支付宝小程序、 钉钉小程序、微信小程序
          } = s, [A, $] = _.split(" "), X = b(p({}, e.tags), {
            SDKVersion: i
          }), R = T || k || qi || "app";
          return b(p({}, e), {
            tags: X,
            contexts: b(p({}, e.contexts), {
              device: {
                brand: u,
                battery_level: o || a || c,
                model: d,
                language: f,
                platform: l,
                screen_dpi: m,
                screen_height: h,
                screen_width: y
              },
              os: {
                name: A || _,
                version: $ || _
              },
              browser: {
                name: R,
                version: E
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
Xt.id = "System";
let je = Xt;
const Zt = class Zt {
  /**
   * @inheritDoc
   */
  constructor(e) {
    this.name = Zt.id, this._options = p({
      enable: !0
    }, e);
  }
  /**
   * @inheritDoc
   */
  setupOnce() {
    rn((e) => {
      const n = v();
      if (n && n.getIntegrationByName(Zt.id) && this._options.enable)
        try {
          const s = getCurrentPages().map(
            (i) => ({
              route: i.route,
              options: i.options
            })
          );
          return b(p({}, e), {
            extra: b(p({}, e.extra), {
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
Zt.id = "Router";
let Be = Zt;
const Qt = class Qt {
  constructor() {
    this.name = Qt.id;
  }
  /**
   * @inheritDoc
   */
  setupOnce() {
    rn((e) => {
      const n = v();
      return n && n.getIntegrationByName(Qt.id) && qi === "wechat" && M.getLaunchOptionsSync && M.getLaunchOptionsSync().scene === 1129 ? null : e;
    });
  }
};
Qt.id = "IgnoreMpcrawlerErrors";
let Ge = Qt;
const $p = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GlobalHandlers: Le,
  IgnoreMpcrawlerErrors: Ge,
  LinkedErrors: Ue,
  Router: Be,
  System: je,
  TryCatch: Fe
}, Symbol.toStringTag, { value: "Module" })), qf = [
  Wc(),
  Gc(),
  new Fe(),
  new Le(),
  new Ue(),
  new je(),
  new Be(),
  new Ge()
];
function Lp(t = {}) {
  t.defaultIntegrations === void 0 && (t.defaultIntegrations = qf), t.normalizeDepth = t.normalizeDepth || 5;
  const e = p({
    integrations: t.integrations || t.defaultIntegrations || [],
    stackParser: t.stackParser || (() => []),
    transport: t.transport || Sr
  }, t);
  wc(Bf, e);
}
function Fp(t = {}) {
  t.eventId || (t.eventId = fi());
  const e = v();
  e && e.showReportDialog(t);
}
function Up() {
  return fi();
}
function jp(t) {
  const e = v();
  return e ? e.flush(t) : Gt(!1);
}
function Bp(t) {
  const e = v();
  return e ? e.close(t) : Gt(!1);
}
function Gp(t) {
  return Ot(t)();
}
const vs = 2147483647;
function U(t) {
  return typeof t == "number" && isFinite(t);
}
function ot(t) {
  return t / 1e3;
}
function Vt(t, e, n, r) {
  const s = N(t).start_timestamp;
  return s && s > e && typeof t.updateStartTime == "function" && t.updateStartTime(e), en(t, () => {
    const i = ui(p({
      startTime: e
    }, r));
    return i && i.end(n), i;
  });
}
function Wf(t, e) {
  return e.some((n) => typeof n == "string" ? t === n : n.test(t));
}
class Jf {
  constructor(e = !1) {
    this._reportAllChanges = e, this._measurements = {}, this._performanceCursor = 0;
  }
  /**
   * Add performance entries from the miniapp performance API.
   * Called when the idle span is being ended.
   * Following the pattern from @sentry-internal/browser-utils.
   */
  addPerformanceEntries(e, n = {}) {
    var u;
    const r = this._getPerformance();
    if (!r)
      return;
    const s = this._getMiniProgramTimeOrigin(r);
    if (!s)
      return;
    const i = ot(s), { op: o, start_timestamp: a } = N(e), c = ((u = r.getEntries) == null ? void 0 : u.call(r)) || [];
    c.slice(this._performanceCursor).forEach((f) => {
      const d = ot(f.startTime), m = ot(Math.max(0, f.duration));
      if (!(o === "navigation" && a && i + d < a) && !this._shouldIgnoreEntry(f, n))
        switch (f.entryType) {
          case "navigation": {
            this._addNavigationSpans(e, f, i);
            break;
          }
          case "render": {
            this._addRenderSpan(e, f, d, m, i);
            break;
          }
          case "script": {
            this._addScriptSpan(e, f, d, m, i);
            break;
          }
          case "loadPackage": {
            this._addPackageSpan(e, f, d, m, i);
            break;
          }
          case "resource": {
            this._addResourceSpan(e, f, d, m, i, n.ignoreResourceSpans);
            break;
          }
        }
    }), this._performanceCursor = Math.max(c.length - 1, 0), this._trackSystemInfo(e), (o === "pageload" || o === "navigation") && (e.setAttribute("performance.timeOrigin", i), Object.entries(this._measurements).forEach(([f, d]) => {
      ya(f, d.value, d.unit);
    })), this._measurements = {};
  }
  /**
   * Legacy method for backward compatibility.
   * @deprecated Use addPerformanceEntries instead.
   */
  addPerformanceEntriesFromSpan(e) {
    this.addPerformanceEntries(e), this._stopObserver();
  }
  /**
   * Start observing performance entries and create child spans.
   * Should be called when a new route span starts.
   */
  startObserving(e, n = {}) {
    var i;
    const r = this._getPerformance();
    if (!r)
      return;
    const s = N(e);
    this._timeOrigin = this._getTimeOrigin(r, s.start_timestamp), this._measurements = {}, this._performanceCursor = 0, this._observer = (i = r.createObserver) == null ? void 0 : i.call(r, (o) => {
      var u;
      const a = ((u = o == null ? void 0 : o.getEntries) == null ? void 0 : u.call(o)) || [], c = N(e);
      if (c.timestamp !== void 0) {
        this._stopObserver();
        return;
      }
      a.forEach((f) => this._handleEntry(e, f, c.start_timestamp, n));
    }), this._observer && this._observer.observe({
      entryTypes: ["navigation", "render", "script", "loadPackage", "resource"]
    });
  }
  _getPerformance() {
    if (!M.getPerformance)
      return;
    const e = M.getPerformance();
    if (e)
      return e;
  }
  _getMiniProgramTimeOrigin(e) {
    if (typeof e.timeOrigin == "number")
      return e.timeOrigin;
    const n = typeof e.now == "function" ? e.now() : void 0;
    if (typeof n == "number")
      return Date.now() - n;
  }
  _getTimeOrigin(e, n) {
    const r = this._getMiniProgramTimeOrigin(e);
    return r ? ot(r) : n;
  }
  _shouldIgnoreEntry(e, n) {
    const { ignorePerformanceEntryNames: r = [] } = n;
    return r.length > 0 && e.name ? Wf(e.name, r) : !1;
  }
  _handleEntry(e, n, r, s = {}) {
    var c;
    const i = (c = this._timeOrigin) != null ? c : r, o = ot(n.startTime), a = ot(Math.max(0, n.duration));
    if (!this._shouldIgnoreEntry(n, s)) {
      switch (n.entryType) {
        case "navigation":
          this._addNavigationSpans(e, n, i);
          break;
        case "render":
          this._addRenderSpan(e, n, o, a, i);
          break;
        case "script":
          this._addScriptSpan(e, n, o, a, i);
          break;
        case "loadPackage":
          this._addPackageSpan(e, n, o, a, i);
          break;
        case "resource":
          this._addResourceSpan(e, n, o, a, i, s.ignoreResourceSpans);
          break;
      }
      this._recordMeasurements(n, r, i + o);
    }
  }
  /**
   * Add navigation related spans (similar to browser's _addNavigationSpans).
   */
  _addNavigationSpans(e, n, r) {
    const s = r + ot(n.startTime), i = s + ot(Math.max(0, n.duration)), o = {
      [L]: "auto.ui.miniapp.metrics",
      "performance.entry_type": n.entryType
    };
    n.path && (o["navigation.path"] = n.path), n.referrerPath && (o["navigation.referrer_path"] = n.referrerPath), U(n.viewLayerReadyTime) && (o["navigation.view_layer_ready_time"] = n.viewLayerReadyTime), Vt(e, s, i, {
      name: n.path || n.name || "navigation",
      op: "browser.navigation",
      attributes: o
    }), U(n.duration) && !this._measurements["navigation.duration"] && (this._measurements["navigation.duration"] = { value: n.duration, unit: "millisecond" }), U(n.viewLayerReadyTime) && (this._measurements["navigation.view_layer_ready"] = { value: n.viewLayerReadyTime, unit: "millisecond" });
  }
  /**
   * Add render spans for UI rendering performance.
   */
  _addRenderSpan(e, n, r, s, i) {
    const o = i + r, a = o + s, c = {
      [L]: "auto.ui.miniapp.metrics",
      "performance.entry_type": n.entryType
    };
    n.path && (c["ui.component_path"] = n.path), U(n.viewLayerReadyTime) && (c["ui.view_layer_ready_time"] = n.viewLayerReadyTime), U(n.firstRenderTime) && (c["ui.first_render_time"] = n.firstRenderTime), Vt(e, o, a, {
      name: n.path || n.name || "render",
      op: "ui.render",
      attributes: c
    }), U(n.firstRenderTime) && (this._measurements["ui.first_render"] = { value: n.firstRenderTime, unit: "millisecond" });
  }
  /**
   * Add script execution spans.
   */
  _addScriptSpan(e, n, r, s, i) {
    const o = i + r, a = o + s, c = {
      [L]: "auto.resource.miniapp.metrics",
      "performance.entry_type": n.entryType
    };
    n.moduleName && (c["code.filepath"] = n.moduleName), Vt(e, o, a, {
      name: n.moduleName || n.name || "script",
      op: "script",
      attributes: c
    });
  }
  /**
   * Add package loading spans.
   */
  _addPackageSpan(e, n, r, s, i) {
    const o = i + r, a = o + s, c = {
      [L]: "auto.resource.miniapp.metrics",
      "performance.entry_type": n.entryType
    };
    n.packageName && (c["resource.package_name"] = n.packageName), U(n.packageSize) && n.packageSize < vs && (c["resource.package_size"] = n.packageSize), Vt(e, o, a, {
      name: n.packageName || n.name || "loadPackage",
      op: "resource.package",
      attributes: c
    });
  }
  /**
   * Add resource loading spans (similar to browser's _addResourceSpans).
   */
  _addResourceSpan(e, n, r, s, i, o) {
    if (n.initiatorType === "xmlhttprequest" || n.initiatorType === "fetch")
      return;
    const a = n.initiatorType ? `resource.${n.initiatorType}` : "resource.other";
    if (o != null && o.includes(a))
      return;
    const c = i + r, u = c + s, f = {
      [L]: "auto.resource.miniapp.metrics",
      "performance.entry_type": n.entryType
    };
    n.initiatorType && (f["resource.initiator_type"] = n.initiatorType), U(n.transferSize) && n.transferSize < vs && (f["http.response_transfer_size"] = n.transferSize), n.path && (f["resource.path"] = n.path), Vt(e, c, u, {
      name: n.path || n.name || "resource",
      op: a,
      attributes: f
    });
  }
  /**
   * Track system information (similar to browser's _trackNavigator).
   */
  _trackSystemInfo(e) {
    if (M.getSystemInfoSync)
      try {
        const n = M.getSystemInfoSync();
        if (!n)
          return;
        n.networkType && e.setAttribute("network.type", n.networkType), n.platform && e.setAttribute("device.platform", n.platform), n.model && e.setAttribute("device.model", n.model), n.system && e.setAttribute("os.version", n.system), U(n.benchmarkLevel) && e.setAttribute("device.benchmark_level", String(n.benchmarkLevel));
      } catch (n) {
      }
  }
  _recordMeasurements(e, n, r) {
    const s = (e.name || "").toLowerCase(), i = e.duration, o = Math.max((r - n) * 1e3, 0);
    if (s === "first-paint" || s === "firstpaint" ? this._measurements.fp = { value: o, unit: "millisecond" } : s === "first-contentful-paint" || s === "firstcontentfulpaint" ? this._measurements.fcp = { value: o, unit: "millisecond" } : s === "largest-contentful-paint" || s === "largestcontentfulpaint" || s === "lcp" ? this._measurements.lcp = { value: o, unit: "millisecond" } : (s === "first-input-delay" || s === "firstinputdelay" || s === "fid") && U(i) && (this._measurements.fid = { value: i, unit: "millisecond" }), U(e.viewLayerReadyTime) && !this._measurements.view_layer_ready && (this._measurements.view_layer_ready = { value: e.viewLayerReadyTime, unit: "millisecond" }), U(e.firstRenderTime) && !this._measurements.first_render && (this._measurements.first_render = { value: e.firstRenderTime, unit: "millisecond" }), this._reportAllChanges && U(i)) {
      const a = this._measurementKey(e);
      a && !this._measurements[a] && (this._measurements[a] = { value: i, unit: "millisecond" });
    }
  }
  _measurementKey(e) {
    const n = e.name || e.entryType;
    if (n)
      return n.replace(/\s+/g, "_").toLowerCase();
  }
  _stopObserver() {
    var e;
    (e = this._observer) == null || e.disconnect(), this._observer = void 0;
  }
}
const Yf = {
  traceRequest: !0
}, P = typeof __SENTRY_DEBUG__ == "undefined" ? !0 : __SENTRY_DEBUG__;
function Er() {
  const t = Bt(), e = t && z(t);
  if (!e)
    return;
  const n = N(e).op;
  return n === "navigation" || n === "pageload" ? e : void 0;
}
function Wi(t) {
  return { name: t.path || "unknown", source: "url" };
}
function Ji(t, e) {
  const n = {
    [L]: e
  };
  return t.openType && (n["miniapp.open_type"] = t.openType), t.scene !== void 0 && (n["miniapp.scene"] = t.scene), t.isTabBar !== void 0 && (n["miniapp.is_tabbar"] = t.isTabBar), t.webviewId !== void 0 && (n["miniapp.webview_id"] = t.webviewId), t.query && (n["miniapp.query"] = t.query), n;
}
function In(t) {
  return {
    path: (t == null ? void 0 : t.path) || (t == null ? void 0 : t.route) || (t == null ? void 0 : t.url) || "unknown-route",
    query: t == null ? void 0 : t.query,
    scene: t == null ? void 0 : t.scene,
    openType: t == null ? void 0 : t.openType,
    isTabBar: t == null ? void 0 : t.isTabBar,
    webviewId: t == null ? void 0 : t.webviewId,
    routeEventId: t == null ? void 0 : t.routeEventId,
    timeStamp: t == null ? void 0 : t.timeStamp
  };
}
function Ms(t, e = !1) {
  return !!(t === "appLaunch" || e);
}
function Vf(t, e) {
  const { instrumentPageLoad: n = !0, instrumentNavigation: r = !0, endSpanOnRouteComplete: s = !0 } = t, i = I, o = i.wx || i.my;
  if (!o) {
    P && g.warn("[MiniAppTracing] No miniapp global object found");
    return;
  }
  const a = M.onBeforeAppRoute || o.onBeforeAppRoute, c = M.onAppRoute || o.onAppRoute, u = M.onAppRouteDone || o.onAppRouteDone, f = M.onBeforePageLoad || o.onBeforePageLoad, d = M.onAfterPageLoad || o.onAfterPageLoad, m = typeof a == "function";
  if (!m && typeof c != "function") {
    P && g.warn("[MiniAppTracing] No route event API available");
    return;
  }
  let l = !0, h = !1;
  const y = /* @__PURE__ */ new Map();
  if (n && typeof i.getCurrentPages == "function") {
    const _ = i.getCurrentPages() || [], E = _[_.length - 1];
    if (E != null && E.route) {
      h = !0, l = !1;
      const T = {
        path: E.route,
        openType: "appLaunch"
      };
      An(T, e);
    }
  }
  m ? (P && g.log("[MiniAppTracing] Using new route event API (onBeforeAppRoute)"), a((_) => {
    const E = In(_), T = E.routeEventId, k = E.timeStamp ? E.timeStamp / 1e3 : H();
    P && g.log("[MiniAppTracing] onBeforeAppRoute:", E.path, "routeEventId:", T);
    const A = !h && Ms(E.openType, l);
    l && (l = !1), !(A && !n || !A && !r) && (T && y.set(T, {
      route: E,
      startTime: k,
      isPageLoad: A
    }), A && n ? (h = !0, An(E, e, k)) : r && h && ws(E, e, k));
  }), typeof c == "function" && c((_) => {
    const E = In(_), T = E.routeEventId, k = E.timeStamp ? E.timeStamp / 1e3 : H();
    P && g.log("[MiniAppTracing] onAppRoute:", E.path, "routeEventId:", T);
    const A = Er();
    if (T) {
      const $ = y.get(T);
      if ($) {
        const X = (k - $.startTime) * 1e3;
        A && (A.setAttribute("miniapp.route_duration_ms", X), A.setAttribute("miniapp.route_event_id", T)), P && g.log(`[MiniAppTracing] Route completed: ${E.path}, duration: ${X.toFixed(2)}ms`), y.delete(T);
      }
    }
    s && A && !N(A).timestamp && (A.setAttribute(ne, "routeComplete"), A.end(k), P && g.log(`[MiniAppTracing] Ended span on onAppRoute: ${E.path}`));
  }), typeof u == "function" && u((_) => {
    P && g.log("[MiniAppTracing] onAppRouteDone:", _ == null ? void 0 : _.path);
  })) : (P && g.log("[MiniAppTracing] Using legacy route event API (onAppRoute)"), c((_) => {
    const E = In(_), T = !h && Ms(E.openType, l);
    if (l && (l = !1), T && n) {
      h = !0, An(E, e);
      return;
    }
    r && h && ws(E, e);
  }), typeof u == "function" && u((_) => {
    P && g.log("[MiniAppTracing] Route done:", _ == null ? void 0 : _.path);
  })), typeof f == "function" && f((_) => {
    P && g.log("[MiniAppTracing] onBeforePageLoad:", _ == null ? void 0 : _.path);
  }), typeof d == "function" && d((_) => {
    P && g.log("[MiniAppTracing] onAfterPageLoad:", _ == null ? void 0 : _.path);
  });
}
function An(t, e, n) {
  const { name: r, source: s } = Wi(t), i = Ji(t, "auto.pageload.miniapp");
  i[nt] = s;
  const o = Er();
  if (o)
    (N(o).data || {})[nt] !== "custom" && (o.updateName(r), o.setAttribute(nt, s)), o.setAttributes(i), P && g.log(`[MiniAppTracing] Updated pageload span: ${r}`);
  else {
    w().setTransactionName(r);
    const a = {
      name: r,
      op: "pageload",
      attributes: i
    };
    n !== void 0 && (a.startTime = n), e(a), P && g.log(`[MiniAppTracing] Created pageload span: ${r}${n ? " (with accurate timing)" : ""}`);
  }
}
function ws(t, e, n) {
  const { name: r, source: s } = Wi(t), i = Ji(t, "auto.navigation.miniapp");
  i[nt] = s, w().setTransactionName(r);
  const o = {
    name: r,
    op: "navigation",
    attributes: i
  };
  n !== void 0 && (o.startTime = n), e(o), P && g.log(`[MiniAppTracing] Created navigation span: ${r}${n ? " (with accurate timing)" : ""}`);
}
function Hp() {
  return Er();
}
const Kf = 3600;
let vt, He;
function Xf() {
  return {
    traceId: ct(),
    spanId: Ut(),
    sampleRand: Math.random()
  };
}
function Zf() {
  return vt || (vt = Xf()), vt;
}
function Qf(t = !1) {
  const e = vt;
  return vt = {
    traceId: t && e ? e.traceId : ct(),
    spanId: Ut(),
    sampleRand: Math.random()
  }, vt;
}
function tp() {
  return He;
}
function ep(t, e, n, r, s, i) {
  He = {
    spanContext: {
      traceId: t,
      spanId: e,
      traceFlags: n ? 1 : 0
    },
    startTimestamp: r,
    sampleRate: s,
    sampleRand: i
  };
}
function np() {
  return He ? Date.now() / 1e3 - He.startTimestamp <= Kf : !1;
}
const rp = 1e3, sp = 3e4, ip = 15e3, op = "MiniAppTracing", Yi = "_sentry_miniapp_idleSpan";
function br(t) {
  return t[Yi];
}
function Cs(t, e) {
  W(t, Yi, e);
}
const ap = p({
  idleTimeout: rp,
  finalTimeout: sp,
  childSpanTimeout: ip,
  instrumentPageLoad: !0,
  instrumentNavigation: !0,
  endSpanOnRouteComplete: !0,
  traceContinuityMode: "link",
  consistentTraceSampling: !1
}, Yf);
function zp(t = {}) {
  const e = p(p({}, ap), t), {
    idleTimeout: n,
    finalTimeout: r,
    childSpanTimeout: s,
    instrumentPageLoad: i,
    instrumentNavigation: o,
    endSpanOnRouteComplete: a,
    traceContinuityMode: c,
    consistentTraceSampling: u,
    beforeStartSpan: f,
    _metricOptions: d,
    ignoreResourceSpans: m,
    ignorePerformanceEntryNames: l
  } = e, h = {
    ignoreResourceSpans: m,
    ignorePerformanceEntryNames: l
  };
  let y, _, E;
  return {
    name: op,
    setupOnce() {
      y = new Jf(d == null ? void 0 : d._reportAllChanges);
    },
    setup(T) {
      var k;
      (k = M.onAppHide) == null || k.call(M, () => {
        const A = br(T);
        A && !N(A).timestamp && (P && g.log("[MiniAppTracing] App hiding, finishing active span"), A.setAttribute(ne, "appHide"), A.end());
      });
    },
    afterAllSetup(T) {
      Vf(
        {
          instrumentPageLoad: i,
          instrumentNavigation: o,
          endSpanOnRouteComplete: a
        },
        (A) => {
          cp(T, A, {
            idleTimeout: n,
            finalTimeout: r,
            childSpanTimeout: s,
            traceContinuityMode: c,
            consistentTraceSampling: u,
            beforeStartSpan: f,
            metricsInstrumentation: y,
            performanceEntriesOptions: h,
            latestRoute: {
              get name() {
                return _;
              },
              set name($) {
                _ = $;
              },
              get source() {
                return E;
              },
              set source($) {
                E = $;
              }
            }
          });
        }
      );
    }
  };
}
function cp(t, e, n) {
  const {
    idleTimeout: r,
    finalTimeout: s,
    childSpanTimeout: i,
    traceContinuityMode: o,
    consistentTraceSampling: a,
    beforeStartSpan: c,
    metricsInstrumentation: u,
    performanceEntriesOptions: f,
    latestRoute: d
  } = n;
  up(t);
  const m = lp(o, a), l = c ? c(e) : e;
  m && m.length > 0 && (l.links = [
    ...l.links || [],
    ...m
  ]);
  const h = l.attributes || {};
  d.name = l.name, d.source = h[nt];
  const y = Oa(l, {
    idleTimeout: r,
    finalTimeout: s,
    childSpanTimeout: i,
    beforeSpanEnd: (_) => {
      var A;
      u == null || u.addPerformanceEntries(_, f), Cs(t, void 0);
      const E = w(), T = E.getPropagationContext();
      E.setPropagationContext(b(p({}, T), {
        traceId: _.spanContext().traceId,
        sampled: bt(_),
        dsc: ut(_)
      }));
      const k = N(_);
      ep(
        _.spanContext().traceId,
        _.spanContext().spanId,
        bt(_),
        k.start_timestamp,
        1,
        (A = T.sampleRand) != null ? A : Math.random()
      ), P && g.log(
        `[MiniAppTracing] Span ended: ${k.op} - ${k.description}, traceId=${_.spanContext().traceId}`
      );
    }
  });
  return y.setAttribute("miniapp.trace_continuity_mode", o), Cs(t, y), P && g.log(
    `[MiniAppTracing] Started ${e.op} span: ${e.name}, traceId=${y.spanContext().traceId}`
  ), y;
}
function up(t) {
  const e = br(t);
  e && !N(e).timestamp && (P && g.log(`[MiniAppTracing] Finishing current active span with op: ${N(e).op}`), e.setAttribute(ne, "navigationStart"), e.end());
}
function lp(t, e) {
  var s;
  if (t === "off") {
    w().setPropagationContext({
      traceId: ct(),
      sampleRand: Math.random()
    });
    return;
  }
  const n = tp(), r = np();
  if (t === "session") {
    const i = Zf();
    w().setPropagationContext(p({
      traceId: i.traceId,
      sampleRand: i.sampleRand
    }, e && r && n && {
      sampled: n.spanContext.traceFlags === 1
    })), P && g.log(`[MiniAppTracing] Session mode: reusing traceId=${i.traceId}`);
    return;
  }
  if (t === "link") {
    const i = Qf(!1);
    if (w().setPropagationContext(p({
      traceId: i.traceId,
      sampleRand: i.sampleRand
    }, e && r && n && {
      sampled: n.spanContext.traceFlags === 1
    })), r && n)
      return P && g.log(
        `[MiniAppTracing] Link mode: new traceId=${i.traceId}, linked from ${n.spanContext.traceId}`
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
function qp() {
  const t = v();
  return t ? br(t) : void 0;
}
export {
  $p as Integrations,
  Bf as MiniappClient,
  bf as SDK_NAME,
  ks as SDK_VERSION,
  Dp as Transports,
  Uc as addBreadcrumb,
  rn as addEventProcessor,
  bp as captureConsoleIntegration,
  mp as captureEvent,
  D as captureException,
  Kr as captureMessage,
  Bp as close,
  vp as consoleLoggingIntegration,
  wp as createConsolaReporter,
  qf as defaultIntegrations,
  Tp as extraErrorDataIntegration,
  kp as featureFlagsIntegration,
  jp as flush,
  Hp as getActiveMiniAppRootSpan,
  qp as getActiveMiniAppSpan,
  Bt as getActiveSpan,
  w as getCurrentScope,
  z as getRootSpan,
  Ie as getSpanDescendants,
  Po as getSpanStatusFromHttpCode,
  Lp as init,
  Pp as instrumentAnthropicAiClient,
  xp as instrumentGoogleGenAIClient,
  Vf as instrumentMiniAppRouter,
  Cp as instrumentOpenAiClient,
  Ru as instrumentSupabaseClient,
  Up as lastEventId,
  Op as logger,
  Sp as makeMultiplexedTransport,
  Mp as metrics,
  zp as miniappTracingIntegration,
  Ep as moduleMetadataIntegration,
  pp as registerSpanErrorInstrumentation,
  Ip as rewriteFramesIntegration,
  _p as setContext,
  Xr as setExtra,
  gp as setExtras,
  xr as setHttpStatus,
  ya as setMeasurement,
  Zr as setTag,
  hp as setTags,
  yp as setUser,
  Fp as showReportDialog,
  ui as startInactiveSpan,
  cp as startMiniAppTracingNavigationSpan,
  dp as startNewTrace,
  ae as startSpan,
  we as startSpanManual,
  Ap as supabaseIntegration,
  Np as thirdPartyErrorFilterIntegration,
  en as withActiveSpan,
  lt as withScope,
  Gp as wrap,
  Rp as zodErrorsIntegration
};
