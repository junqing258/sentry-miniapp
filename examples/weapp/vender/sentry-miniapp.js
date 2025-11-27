var Go = Object.defineProperty, Ho = Object.defineProperties;
var qo = Object.getOwnPropertyDescriptors;
var fe = Object.getOwnPropertySymbols;
var gr = Object.prototype.hasOwnProperty, hr = Object.prototype.propertyIsEnumerable;
var cn = (t, e) => (e = Symbol[t]) ? e : Symbol.for("Symbol." + t);
var _r = (t, e, n) => e in t ? Go(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n, f = (t, e) => {
  for (var n in e || (e = {}))
    gr.call(e, n) && _r(t, n, e[n]);
  if (fe)
    for (var n of fe(e))
      hr.call(e, n) && _r(t, n, e[n]);
  return t;
}, E = (t, e) => Ho(t, qo(e));
var un = (t, e) => {
  var n = {};
  for (var r in t)
    gr.call(t, r) && e.indexOf(r) < 0 && (n[r] = t[r]);
  if (t != null && fe)
    for (var r of fe(t))
      e.indexOf(r) < 0 && hr.call(t, r) && (n[r] = t[r]);
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
}, pe = (t, e, n) => {
  var r = (i, a, c, u) => {
    try {
      var d = n[i](a), p = (a = d.value) instanceof nt, m = d.done;
      Promise.resolve(p ? a[0] : a).then((l) => p ? r(i === "return" ? i : "next", a[1] ? { done: l.done, value: l.value } : l, c, u) : c({ value: l, done: m })).catch((l) => r("throw", l, c, u));
    } catch (l) {
      u(l);
    }
  }, s = (i) => o[i] = (a) => new Promise((c, u) => r(i, a, c, u)), o = {};
  return n = n.apply(t, e), o[cn("asyncIterator")] = () => o, s("next"), s("throw"), s("return"), o;
};
var de = (t, e, n) => (e = t[cn("asyncIterator")]) ? e.call(t) : (t = t[cn("iterator")](), e = {}, n = (r, s) => (s = t[r]) && (e[r] = (o) => new Promise((i, a, c) => (o = s.call(t, o), c = o.done, Promise.resolve(o.value).then((u) => i({ value: u, done: c }), a)))), n("next"), n("return"), e);
const yr = (
  // eslint-disable-next-line no-undef
  typeof globalThis != "undefined" && globalThis || // eslint-disable-next-line no-undef
  typeof self != "undefined" && self || // eslint-disable-next-line no-undef
  typeof window != "undefined" && window || // eslint-disable-next-line no-undef
  typeof global != "undefined" && global || {}
);
class Jo {
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
yr.URLSearchParams || (yr.URLSearchParams = Jo);
const S = typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__, b = globalThis, ut = "10.27.0";
function xt() {
  return qe(b), b;
}
function qe(t) {
  const e = t.__SENTRY__ = t.__SENTRY__ || {};
  return e.version = e.version || ut, e[ut] = e[ut] || {};
}
function Pt(t, e, n = b) {
  const r = n.__SENTRY__ = n.__SENTRY__ || {}, s = r[ut] = r[ut] || {};
  return s[t] || (s[t] = e());
}
const Cn = [
  "debug",
  "info",
  "warn",
  "error",
  "log",
  "assert",
  "trace"
], zo = "Sentry Logger ", Ae = {};
function Dt(t) {
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
function Wo() {
  xn().enabled = !0;
}
function Yo() {
  xn().enabled = !1;
}
function Ns() {
  return xn().enabled;
}
function Vo(...t) {
  wn("log", ...t);
}
function Ko(...t) {
  wn("warn", ...t);
}
function Xo(...t) {
  wn("error", ...t);
}
function wn(t, ...e) {
  S && Ns() && Dt(() => {
    b.console[t](`${zo}[${t}]:`, ...e);
  });
}
function xn() {
  return S ? Pt("loggerSettings", () => ({ enabled: !1 })) : { enabled: !1 };
}
const g = {
  /** Enable logging. */
  enable: Wo,
  /** Disable logging. */
  disable: Yo,
  /** Check if logging is enabled. */
  isEnabled: Ns,
  /** Log a message. */
  log: Vo,
  /** Log a warning. */
  warn: Ko,
  /** Log an error. */
  error: Xo
}, ln = "<anonymous>";
function Rs(t) {
  try {
    return !t || typeof t != "function" ? ln : t.name || ln;
  } catch (e) {
    return ln;
  }
}
function Zo(t) {
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
function Os(t) {
  return "__v_isVNode" in t && t.__v_isVNode ? "[VueVNode]" : "[VueViewModel]";
}
const Se = {}, Sr = {};
function Pn(t, e) {
  Se[t] = Se[t] || [], Se[t].push(e);
}
function Dn(t, e) {
  if (!Sr[t]) {
    Sr[t] = !0;
    try {
      e();
    } catch (n) {
      S && g.error(`Error while instrumenting ${t}`, n);
    }
  }
}
function $n(t, e) {
  const n = t && Se[t];
  if (n)
    for (const r of n)
      try {
        r(e);
      } catch (s) {
        S && g.error(
          `Error while triggering instrumentation handler.
Type: ${t}
Name: ${Rs(r)}
Error:`,
          s
        );
      }
}
let fn = null;
function Qo(t) {
  const e = "error";
  Pn(e, t), Dn(e, ti);
}
function ti() {
  fn = b.onerror, b.onerror = function(t, e, n, r, s) {
    return $n("error", {
      column: r,
      error: s,
      line: n,
      msg: t,
      url: e
    }), fn ? fn.apply(this, arguments) : !1;
  }, b.onerror.__SENTRY_INSTRUMENTED__ = !0;
}
let pn = null;
function ei(t) {
  const e = "unhandledrejection";
  Pn(e, t), Dn(e, ni);
}
function ni() {
  pn = b.onunhandledrejection, b.onunhandledrejection = function(t) {
    return $n("unhandledrejection", t), pn ? pn.apply(this, arguments) : !0;
  }, b.onunhandledrejection.__SENTRY_INSTRUMENTED__ = !0;
}
const ks = Object.prototype.toString;
function lt(t) {
  switch (ks.call(t)) {
    case "[object Error]":
    case "[object Exception]":
    case "[object DOMException]":
    case "[object WebAssembly.Exception]":
      return !0;
    default:
      return Je(t, Error);
  }
}
function $t(t, e) {
  return ks.call(t) === `[object ${e}]`;
}
function ri(t) {
  return $t(t, "ErrorEvent");
}
function Er(t) {
  return $t(t, "DOMError");
}
function si(t) {
  return $t(t, "DOMException");
}
function Ne(t) {
  return $t(t, "String");
}
function Ln(t) {
  return typeof t == "object" && t !== null && "__sentry_template_string__" in t && "__sentry_template_values__" in t;
}
function Fn(t) {
  return t === null || Ln(t) || typeof t != "object" && typeof t != "function";
}
function _t(t) {
  return $t(t, "Object");
}
function Un(t) {
  return typeof Event != "undefined" && Je(t, Event);
}
function oi(t) {
  return typeof Element != "undefined" && Je(t, Element);
}
function ii(t) {
  return $t(t, "RegExp");
}
function Lt(t) {
  return !!(t != null && t.then && typeof t.then == "function");
}
function ai(t) {
  return _t(t) && "nativeEvent" in t && "preventDefault" in t && "stopPropagation" in t;
}
function Je(t, e) {
  try {
    return t instanceof e;
  } catch (n) {
    return !1;
  }
}
function Ms(t) {
  return !!(typeof t == "object" && t !== null && (t.__isVue || t._isVue || t.__v_isVNode));
}
const ci = b, ui = 80;
function li(t, e = {}) {
  if (!t)
    return "<unknown>";
  try {
    let n = t;
    const r = 5, s = [];
    let o = 0, i = 0;
    const a = " > ", c = a.length;
    let u;
    const d = Array.isArray(e) ? e : e.keyAttrs, p = !Array.isArray(e) && e.maxStringLength || ui;
    for (; n && o++ < r && (u = fi(n, d), !(u === "html" || o > 1 && i + s.length * c + u.length >= p)); )
      s.push(u), i += u.length, n = n.parentNode;
    return s.reverse().join(a);
  } catch (n) {
    return "<unknown>";
  }
}
function fi(t, e) {
  const n = t, r = [];
  if (!(n != null && n.tagName))
    return "";
  if (ci.HTMLElement && n instanceof HTMLElement && n.dataset) {
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
function It(t, e, n) {
  if (!(e in t))
    return;
  const r = t[e];
  if (typeof r != "function")
    return;
  const s = n(r);
  typeof s == "function" && vs(s, r);
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
function vs(t, e) {
  try {
    const n = e.prototype || {};
    t.prototype = e.prototype = n, G(t, "__sentry_original__", e);
  } catch (n) {
  }
}
function Cs(t) {
  return t.__sentry_original__;
}
function ws(t) {
  if (lt(t))
    return f({
      message: t.message,
      name: t.name,
      stack: t.stack
    }, Tr(t));
  if (Un(t)) {
    const e = f({
      type: t.type,
      target: br(t.target),
      currentTarget: br(t.currentTarget)
    }, Tr(t));
    return typeof CustomEvent != "undefined" && Je(t, CustomEvent) && (e.detail = t.detail), e;
  } else
    return t;
}
function br(t) {
  try {
    return oi(t) ? li(t) : Object.prototype.toString.call(t);
  } catch (e) {
    return "<unknown>";
  }
}
function Tr(t) {
  if (typeof t == "object" && t !== null) {
    const e = {};
    for (const n in t)
      Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    return e;
  } else
    return {};
}
function pi(t) {
  const e = Object.keys(ws(t));
  return e.sort(), e[0] ? e.join(", ") : "[object has no keys]";
}
function Xt(t, e = 0) {
  return typeof t != "string" || e === 0 || t.length <= e ? t : `${t.slice(0, e)}...`;
}
function Ir(t, e) {
  if (!Array.isArray(t))
    return "";
  const n = [];
  for (let r = 0; r < t.length; r++) {
    const s = t[r];
    try {
      Ms(s) ? n.push(Os(s)) : n.push(String(s));
    } catch (o) {
      n.push("[value cannot be serialized]");
    }
  }
  return n.join(e);
}
function Ee(t, e, n = !1) {
  return Ne(t) ? ii(e) ? e.test(t) : Ne(e) ? n ? t === e : t.includes(e) : !1 : !1;
}
function ze(t, e = [], n = !1) {
  return e.some((r) => Ee(t, r, n));
}
function di() {
  const t = b;
  return t.crypto || t.msCrypto;
}
let dn;
function mi() {
  return Math.random() * 16;
}
function q(t = di()) {
  try {
    if (t != null && t.randomUUID)
      return t.randomUUID().replace(/-/g, "");
  } catch (e) {
  }
  return dn || (dn = "10000000100040008000" + 1e11), dn.replace(
    /[018]/g,
    (e) => (
      // eslint-disable-next-line no-bitwise
      (e ^ (mi() & 15) >> e / 4).toString(16)
    )
  );
}
function xs(t) {
  var e, n;
  return (n = (e = t.exception) == null ? void 0 : e.values) == null ? void 0 : n[0];
}
function At(t) {
  const { message: e, event_id: n } = t;
  if (e)
    return e;
  const r = xs(t);
  return r ? r.type && r.value ? `${r.type}: ${r.value}` : r.type || r.value || n || "<unknown>" : n || "<unknown>";
}
function yn(t, e, n) {
  const r = t.exception = t.exception || {}, s = r.values = r.values || [], o = s[0] = s[0] || {};
  o.value || (o.value = e || ""), o.type || (o.type = "Error");
}
function kt(t, e) {
  const n = xs(t);
  if (!n)
    return;
  const r = { type: "generic", handled: !0 }, s = n.mechanism;
  if (n.mechanism = f(f(f({}, r), s), e), e && "data" in e) {
    const o = f(f({}, s == null ? void 0 : s.data), e.data);
    n.mechanism.data = o;
  }
}
function Ar(t) {
  if (_i(t))
    return !0;
  try {
    G(t, "__sentry_captured__", !0);
  } catch (e) {
  }
  return !1;
}
function _i(t) {
  try {
    return t.__sentry_captured__;
  } catch (e) {
  }
}
const Ps = 1e3;
function ee() {
  return Date.now() / Ps;
}
function gi() {
  const { performance: t } = b;
  if (!(t != null && t.now) || !t.timeOrigin)
    return ee;
  const e = t.timeOrigin;
  return () => (e + t.now()) / Ps;
}
let me;
function Z() {
  return (me != null ? me : me = gi())();
}
function Sn(t, e = {}) {
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
function ne(t, e, n = 2) {
  if (!e || typeof e != "object" || n <= 0)
    return e;
  if (t && Object.keys(e).length === 0)
    return t;
  const r = f({}, t);
  for (const s in e)
    Object.prototype.hasOwnProperty.call(e, s) && (r[s] = ne(r[s], e[s], n - 1));
  return r;
}
function st() {
  return q();
}
function Ft() {
  return q().substring(16);
}
const En = "_sentrySpan";
function gt(t, e) {
  e ? G(t, En, e) : delete t[En];
}
function Mt(t) {
  return t[En];
}
const hi = 100;
class z {
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
      traceId: st(),
      sampleRand: Math.random()
    };
  }
  /**
   * Clone all data from this scope into a new scope.
   */
  clone() {
    const e = new z();
    return e._breadcrumbs = [...this._breadcrumbs], e._tags = f({}, this._tags), e._attributes = f({}, this._attributes), e._extra = f({}, this._extra), e._contexts = f({}, this._contexts), this._contexts.flags && (e._contexts.flags = {
      values: [...this._contexts.flags.values]
    }), e._user = this._user, e._level = this._level, e._session = this._session, e._transactionName = this._transactionName, e._fingerprint = this._fingerprint, e._eventProcessors = [...this._eventProcessors], e._attachments = [...this._attachments], e._sdkProcessingMetadata = f({}, this._sdkProcessingMetadata), e._propagationContext = f({}, this._propagationContext), e._client = this._client, e._lastEventId = this._lastEventId, gt(e, Mt(this)), e;
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
    }, this._session && Sn(this._session, { user: e }), this._notifyScopeListeners(), this;
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
    const n = typeof e == "function" ? e(this) : e, r = n instanceof z ? n.getScopeData() : _t(n) ? e : void 0, {
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
    return this._breadcrumbs = [], this._tags = {}, this._attributes = {}, this._extra = {}, this._user = {}, this._contexts = {}, this._level = void 0, this._transactionName = void 0, this._fingerprint = void 0, this._session = void 0, gt(this, void 0), this._attachments = [], this.setPropagationContext({ traceId: st(), sampleRand: Math.random() }), this._notifyScopeListeners(), this;
  }
  /**
   * Adds a breadcrumb to the scope.
   * By default, the last 100 breadcrumbs are kept.
   */
  addBreadcrumb(e, n) {
    var o;
    const r = typeof n == "number" ? n : hi;
    if (r <= 0)
      return this;
    const s = E(f({
      timestamp: ee()
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
      span: Mt(this)
    };
  }
  /**
   * Add data which will be accessible during event processing but won't get sent to Sentry.
   */
  setSDKProcessingMetadata(e) {
    return this._sdkProcessingMetadata = ne(this._sdkProcessingMetadata, e, 2), this;
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
function yi() {
  return Pt("defaultCurrentScope", () => new z());
}
function Si() {
  return Pt("defaultIsolationScope", () => new z());
}
class Ei {
  constructor(e, n) {
    let r;
    e ? r = e : r = new z();
    let s;
    n ? s = n : s = new z(), this._stack = [{ scope: r }], this._isolationScope = s;
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
    return Lt(r) ? r.then(
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
function vt() {
  const t = xt(), e = qe(t);
  return e.stack = e.stack || new Ei(yi(), Si());
}
function bi(t) {
  return vt().withScope(t);
}
function Ti(t, e) {
  const n = vt();
  return n.withScope(() => (n.getStackTop().scope = t, e(t)));
}
function Nr(t) {
  return vt().withScope(() => t(vt().getIsolationScope()));
}
function Ii() {
  return {
    withIsolationScope: Nr,
    withScope: bi,
    withSetScope: Ti,
    withSetIsolationScope: (t, e) => Nr(e),
    getCurrentScope: () => vt().getScope(),
    getIsolationScope: () => vt().getIsolationScope()
  };
}
function re(t) {
  const e = qe(t);
  return e.acs ? e.acs : Ii();
}
function O() {
  const t = xt();
  return re(t).getCurrentScope();
}
function $() {
  const t = xt();
  return re(t).getIsolationScope();
}
function jn() {
  return Pt("globalScope", () => new z());
}
function it(...t) {
  const e = xt(), n = re(e);
  if (t.length === 2) {
    const [r, s] = t;
    return r ? n.withSetScope(r, s) : n.withScope(s);
  }
  return n.withScope(t[0]);
}
function k() {
  return O().getClient();
}
function Ds(t) {
  const e = t.getPropagationContext(), { traceId: n, parentSpanId: r, propagationSpanId: s } = e, o = {
    trace_id: n,
    span_id: s || Ft()
  };
  return r && (o.parent_span_id = r), o;
}
const Q = "sentry.source", $s = "sentry.sample_rate", Ai = "sentry.previous_trace_sample_rate", Zt = "sentry.op", W = "sentry.origin", Re = "sentry.idle_span_finish_reason", Ls = "sentry.measurement_unit", Fs = "sentry.measurement_value", Rr = "sentry.custom_span_name", Bn = "sentry.profile_id", Gn = "sentry.exclusive_time", Ni = 0, We = 1, N = 2;
function Ri(t) {
  if (t < 400 && t >= 100)
    return { code: We };
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
function Or(t, e) {
  t.setAttribute("http.response.status_code", e);
  const n = Ri(e);
  n.message !== "unknown_error" && t.setStatus(n);
}
const Us = "_sentryScope", js = "_sentryIsolationScope";
function Oi(t) {
  try {
    const e = b.WeakRef;
    if (typeof e == "function")
      return new e(t);
  } catch (e) {
  }
  return t;
}
function ki(t) {
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
function Mi(t, e, n) {
  t && (G(t, js, Oi(n)), G(t, Us, e));
}
function Oe(t) {
  const e = t;
  return {
    scope: e[Us],
    isolationScope: ki(e[js])
  };
}
const vi = "sentry-", Ci = /^sentry-/;
function wi(t) {
  const e = xi(t);
  if (!e)
    return;
  const n = Object.entries(e).reduce((r, [s, o]) => {
    if (s.match(Ci)) {
      const i = s.slice(vi.length);
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
      const r = kr(n);
      return Object.entries(r).forEach(([s, o]) => {
        e[s] = o;
      }), e;
    }, {}) : kr(t);
}
function kr(t) {
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
const Pi = /^o(\d+)\./, Di = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)([\w.-]+)(?::(\d+))?\/(.+)/;
function $i(t) {
  return t === "http" || t === "https";
}
function Ut(t, e = !1) {
  const { host: n, path: r, pass: s, port: o, projectId: i, protocol: a, publicKey: c } = t;
  return `${a}://${c}${e && s ? `:${s}` : ""}@${n}${o ? `:${o}` : ""}/${r && `${r}/`}${i}`;
}
function Bs(t) {
  const e = Di.exec(t);
  if (!e) {
    Dt(() => {
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
  return Gs({ host: o, pass: s, path: c, projectId: u, port: i, protocol: n, publicKey: r });
}
function Gs(t) {
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
function Li(t) {
  if (!S)
    return !0;
  const { port: e, projectId: n, protocol: r } = t;
  return ["protocol", "publicKey", "host", "projectId"].find((i) => t[i] ? !1 : (g.error(`Invalid Sentry Dsn: ${i} missing`), !0)) ? !1 : n.match(/^\d+$/) ? $i(r) ? e && isNaN(parseInt(e, 10)) ? (g.error(`Invalid Sentry Dsn: Invalid port ${e}`), !1) : !0 : (g.error(`Invalid Sentry Dsn: Invalid protocol ${r}`), !1) : (g.error(`Invalid Sentry Dsn: Invalid projectId ${n}`), !1);
}
function Fi(t) {
  const e = t.match(Pi);
  return e == null ? void 0 : e[1];
}
function Ui(t) {
  const e = t.getOptions(), { host: n } = t.getDsn() || {};
  let r;
  return e.orgId ? r = String(e.orgId) : n && (r = Fi(n)), r;
}
function ji(t) {
  const e = typeof t == "string" ? Bs(t) : Gs(t);
  if (!(!e || !Li(e)))
    return e;
}
function Hn(t) {
  if (typeof t == "boolean")
    return Number(t);
  const e = typeof t == "string" ? parseFloat(t) : t;
  if (!(typeof e != "number" || isNaN(e) || e < 0 || e > 1))
    return e;
}
const Hs = 0, qn = 1;
let Mr = !1;
function Bi(t) {
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
function qs(t) {
  const { spanId: e, traceId: n, isRemote: r } = t.spanContext(), s = r ? e : A(t).parent_span_id, o = Oe(t).scope, i = r ? (o == null ? void 0 : o.getPropagationContext().propagationSpanId) || Ft() : e;
  return {
    parent_span_id: s,
    span_id: i,
    trace_id: n
  };
}
function Js(t) {
  if (t && t.length > 0)
    return t.map((i) => {
      var a = i, { context: c } = a, u = c, { spanId: e, traceId: n, traceFlags: r } = u, s = un(u, ["spanId", "traceId", "traceFlags"]), { attributes: o } = a;
      return f({
        span_id: e,
        trace_id: n,
        sampled: r === qn,
        attributes: o
      }, s);
    });
}
function ft(t) {
  return typeof t == "number" ? vr(t) : Array.isArray(t) ? t[0] + t[1] / 1e9 : t instanceof Date ? vr(t.getTime()) : Z();
}
function vr(t) {
  return t > 9999999999 ? t / 1e3 : t;
}
function A(t) {
  var r;
  if (Hi(t))
    return t.getSpanJSON();
  const { spanId: e, traceId: n } = t.spanContext();
  if (Gi(t)) {
    const { attributes: s, startTime: o, name: i, endTime: a, status: c, links: u } = t, d = "parentSpanId" in t ? t.parentSpanId : "parentSpanContext" in t ? (r = t.parentSpanContext) == null ? void 0 : r.spanId : void 0;
    return {
      span_id: e,
      trace_id: n,
      data: s,
      description: i,
      parent_span_id: d,
      start_timestamp: ft(o),
      // This is [0,0] by default in OTEL, in which case we want to interpret this as no end time
      timestamp: ft(a) || void 0,
      status: zs(c),
      op: s[Zt],
      origin: s[W],
      links: Js(u)
    };
  }
  return {
    span_id: e,
    trace_id: n,
    start_timestamp: 0,
    data: {}
  };
}
function Gi(t) {
  const e = t;
  return !!e.attributes && !!e.startTime && !!e.name && !!e.endTime && !!e.status;
}
function Hi(t) {
  return typeof t.getSpanJSON == "function";
}
function ht(t) {
  const { traceFlags: e } = t.spanContext();
  return e === qn;
}
function zs(t) {
  if (!(!t || t.code === Ni))
    return t.code === We ? "ok" : t.message || "internal_error";
}
const pt = "_sentryChildSpans", bn = "_sentryRootSpan";
function Ws(t, e) {
  const n = t[bn] || t;
  G(e, bn, n), t[pt] ? t[pt].add(e) : G(t, pt, /* @__PURE__ */ new Set([e]));
}
function qi(t, e) {
  t[pt] && t[pt].delete(e);
}
function be(t) {
  const e = /* @__PURE__ */ new Set();
  function n(r) {
    if (!e.has(r) && ht(r)) {
      e.add(r);
      const s = r[pt] ? Array.from(r[pt]) : [];
      for (const o of s)
        n(o);
    }
  }
  return n(t), Array.from(e);
}
function j(t) {
  return t[bn] || t;
}
function jt() {
  const t = xt(), e = re(t);
  return e.getActiveSpan ? e.getActiveSpan() : Mt(O());
}
function Tn() {
  Mr || (Dt(() => {
    console.warn(
      "[Sentry] Returning null from `beforeSendSpan` is disallowed. To drop certain spans, configure the respective integrations directly or use `ignoreSpans`."
    );
  }), Mr = !0);
}
let Cr = !1;
function sp() {
  if (Cr)
    return;
  function t() {
    const e = jt(), n = e && j(e);
    if (n) {
      const r = "internal_error";
      S && g.log(`[Tracing] Root span: ${r} -> Global error occurred`), n.setStatus({ code: N, message: r });
    }
  }
  t.tag = "sentry_tracingErrorCallback", Cr = !0, Qo(t), ei(t);
}
function Ye(t) {
  var n;
  if (typeof __SENTRY_TRACING__ == "boolean" && !__SENTRY_TRACING__)
    return !1;
  const e = t || ((n = k()) == null ? void 0 : n.getOptions());
  return !!e && // Note: This check is `!= null`, meaning "nullish". `0` is not "nullish", `undefined` and `null` are. (This comment was brought to you by 15 minutes of questioning life)
  (e.tracesSampleRate != null || !!e.tracesSampler);
}
function wr(t) {
  g.log(`Ignoring span ${t.op} - ${t.description} because it matches \`ignoreSpans\`.`);
}
function ke(t, e) {
  if (!(e != null && e.length) || !t.description)
    return !1;
  for (const n of e) {
    if (zi(n)) {
      if (Ee(t.description, n))
        return S && wr(t), !0;
      continue;
    }
    if (!n.name && !n.op)
      continue;
    const r = n.name ? Ee(t.description, n.name) : !0, s = n.op ? t.op && Ee(t.op, n.op) : !0;
    if (r && s)
      return S && wr(t), !0;
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
const Jn = "production", Ys = "_frozenDsc";
function Te(t, e) {
  G(t, Ys, e);
}
function Vs(t, e) {
  const n = e.getOptions(), { publicKey: r } = e.getDsn() || {}, s = {
    environment: n.environment || Jn,
    release: n.release,
    public_key: r,
    trace_id: t,
    org_id: Ui(e)
  };
  return e.emit("createDsc", s), s;
}
function Ks(t, e) {
  const n = e.getPropagationContext();
  return n.dsc || Vs(n.traceId, t);
}
function ot(t) {
  var _, y, h, I;
  const e = k();
  if (!e)
    return {};
  const n = j(t), r = A(n), s = r.data, o = n.spanContext().traceState, i = (y = (_ = o == null ? void 0 : o.get("sentry.sample_rate")) != null ? _ : s[$s]) != null ? y : s[Ai];
  function a(R) {
    return (typeof i == "number" || typeof i == "string") && (R.sample_rate = `${i}`), R;
  }
  const c = n[Ys];
  if (c)
    return a(c);
  const u = o == null ? void 0 : o.get("sentry.dsc"), d = u && wi(u);
  if (d)
    return a(d);
  const p = Vs(t.spanContext().traceId, e), m = s[Q], l = r.description;
  return m !== "url" && l && (p.transaction = l), Ye() && (p.sampled = String(ht(n)), p.sample_rand = // In OTEL we store the sample rand on the trace state because we cannot access scopes for NonRecordingSpans
  // The Sentry OTEL SpanSampler takes care of writing the sample rand on the root span
  (I = o == null ? void 0 : o.get("sentry.sample_rand")) != null ? I : (
    // On all other platforms we can actually get the scopes from a root span (we use this as a fallback)
    (h = Oe(n).scope) == null ? void 0 : h.getPropagationContext().sampleRand.toString()
  )), a(p), e.emit("createDsc", p, n), p;
}
class yt {
  constructor(e = {}) {
    this._traceId = e.traceId || st(), this._spanId = e.spanId || Ft();
  }
  /** @inheritdoc */
  spanContext() {
    return {
      spanId: this._spanId,
      traceId: this._traceId,
      traceFlags: Hs
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
    return In("", t, e, n);
  } catch (r) {
    return { ERROR: `**non-serializable** (${r})` };
  }
}
function Xs(t, e = 3, n = 100 * 1024) {
  const r = F(t, e);
  return Ki(r) > n ? Xs(t, e - 1, n) : r;
}
function In(t, e, n = 1 / 0, r = 1 / 0, s = Xi()) {
  const [o, i] = s;
  if (e == null || // this matches null and undefined -> eqeq not eqeqeq
  ["boolean", "string"].includes(typeof e) || typeof e == "number" && Number.isFinite(e))
    return e;
  const a = Wi(t, e);
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
      return In("", l, c - 1, r, s);
    } catch (l) {
    }
  const d = Array.isArray(e) ? [] : {};
  let p = 0;
  const m = ws(e);
  for (const l in m) {
    if (!Object.prototype.hasOwnProperty.call(m, l))
      continue;
    if (p >= r) {
      d[l] = "[MaxProperties ~]";
      break;
    }
    const _ = m[l];
    d[l] = In(l, _, c - 1, r, s), p++;
  }
  return i(e), d;
}
function Wi(t, e) {
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
    if (Ms(e))
      return Os(e);
    if (ai(e))
      return "[SyntheticEvent]";
    if (typeof e == "number" && !Number.isFinite(e))
      return `[${e}]`;
    if (typeof e == "function")
      return `[Function: ${Rs(e)}]`;
    if (typeof e == "symbol")
      return `[${String(e)}]`;
    if (typeof e == "bigint")
      return `[BigInt: ${String(e)}]`;
    const n = Yi(e);
    return /^HTML(\w*)Element$/.test(n) ? `[HTMLElement: ${n}]` : `[object ${n}]`;
  } catch (n) {
    return `**non-serializable** (${n})`;
  }
}
function Yi(t) {
  const e = Object.getPrototypeOf(t);
  return e != null && e.constructor ? e.constructor.name : "null prototype";
}
function Vi(t) {
  return ~-encodeURI(t).split(/%..|./).length;
}
function Ki(t) {
  return Vi(JSON.stringify(t));
}
function Xi() {
  const t = /* @__PURE__ */ new WeakSet();
  function e(r) {
    return t.has(r) ? !0 : (t.add(r), !1);
  }
  function n(r) {
    t.delete(r);
  }
  return [e, n];
}
function at(t, e = []) {
  return [t, e];
}
function Zi(t, e) {
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
function An(t) {
  const e = qe(b);
  return e.encodePolyfill ? e.encodePolyfill(t) : new TextEncoder().encode(t);
}
function Qi(t) {
  const [e, n] = t;
  let r = JSON.stringify(e);
  function s(o) {
    typeof r == "string" ? r = typeof o == "string" ? r + o : [An(r), o] : r.push(typeof o == "string" ? An(o) : o);
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
  return typeof r == "string" ? r : ta(r);
}
function ta(t) {
  const e = t.reduce((s, o) => s + o.length, 0), n = new Uint8Array(e);
  let r = 0;
  for (const s of t)
    n.set(s, r), r += s.length;
  return n;
}
function ea(t) {
  return [{
    type: "span"
  }, t];
}
function na(t) {
  const e = typeof t.data == "string" ? An(t.data) : t.data;
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
function xr(t) {
  return ra[t];
}
function Zs(t) {
  if (!(t != null && t.sdk))
    return;
  const { name: e, version: n } = t.sdk;
  return { name: e, version: n };
}
function sa(t, e, n, r) {
  var o;
  const s = (o = t.sdkProcessingMetadata) == null ? void 0 : o.dynamicSamplingContext;
  return f(f(f({
    event_id: t.event_id,
    sent_at: (/* @__PURE__ */ new Date()).toISOString()
  }, e && { sdk: e }), !!n && r && { dsn: Ut(r) }), s && {
    trace: s
  });
}
function oa(t, e) {
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
function ia(t, e, n, r) {
  const s = Zs(n), o = f(f({
    sent_at: (/* @__PURE__ */ new Date()).toISOString()
  }, s && { sdk: s }), !!r && e && { dsn: Ut(e) }), i = "aggregates" in t ? [{ type: "sessions" }, t] : [{ type: "session" }, t.toJSON()];
  return at(o, [i]);
}
function aa(t, e, n, r) {
  const s = Zs(n), o = t.type && t.type !== "replay_event" ? t.type : "event";
  oa(t, n == null ? void 0 : n.sdk);
  const i = sa(t, s, r, e);
  return delete t.sdkProcessingMetadata, at(i, [[{ type: o }, t]]);
}
function ca(t, e) {
  function n(l) {
    return !!l.trace_id && !!l.public_key;
  }
  const r = ot(t[0]), s = e == null ? void 0 : e.getDsn(), o = e == null ? void 0 : e.getOptions().tunnel, i = f(f({
    sent_at: (/* @__PURE__ */ new Date()).toISOString()
  }, n(r) && { trace: r }), !!o && s && { dsn: Ut(s) }), { beforeSendSpan: a, ignoreSpans: c } = (e == null ? void 0 : e.getOptions()) || {}, u = c != null && c.length ? t.filter((l) => !ke(A(l), c)) : t, d = t.length - u.length;
  d && (e == null || e.recordDroppedEvent("before_send", "span", d));
  const p = a ? (l) => {
    const _ = A(l), y = a(_);
    return y || (Tn(), _);
  } : A, m = [];
  for (const l of u) {
    const _ = p(l);
    _ && m.push(ea(_));
  }
  return at(i, m);
}
function ua(t) {
  if (!S) return;
  const { description: e = "< unknown name >", op: n = "< unknown op >", parent_span_id: r } = A(t), { spanId: s } = t.spanContext(), o = ht(t), i = j(t), a = i === t, c = `[Tracing] Starting ${o ? "sampled" : "unsampled"} ${a ? "root " : ""}span`, u = [`op: ${n}`, `name: ${e}`, `ID: ${s}`];
  if (r && u.push(`parent ID: ${r}`), !a) {
    const { op: d, description: p } = A(i);
    u.push(`root ID: ${i.spanContext().spanId}`), d && u.push(`root op: ${d}`), p && u.push(`root description: ${p}`);
  }
  g.log(`${c}
  ${u.join(`
  `)}`);
}
function la(t) {
  if (!S) return;
  const { description: e = "< unknown name >", op: n = "< unknown op >" } = A(t), { spanId: r } = t.spanContext(), o = j(t) === t, i = `[Tracing] Finishing "${n}" ${o ? "root " : ""}span "${e}" with ID ${r}`;
  g.log(i);
}
function fa(t, e, n, r = jt()) {
  const s = r && j(r);
  s && (S && g.log(`[Measurement] Setting measurement on root span: ${t} = ${e} ${n}`), s.addEvent(t, {
    [Fs]: e,
    [Ls]: n
  }));
}
function Pr(t) {
  if (!t || t.length === 0)
    return;
  const e = {};
  return t.forEach((n) => {
    const r = n.attributes || {}, s = r[Ls], o = r[Fs];
    typeof s == "string" && typeof o == "number" && (e[n.name] = { value: o, unit: s });
  }), e;
}
const Dr = 1e3;
class Ve {
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
    this._traceId = e.traceId || st(), this._spanId = e.spanId || Ft(), this._startTime = e.startTimestamp || Z(), this._links = e.links, this._attributes = {}, this.setAttributes(f({
      [W]: "manual",
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
      traceFlags: r ? qn : Hs
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
    this._startTime = ft(e);
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
    this._endTime || (this._endTime = ft(e), la(this), this._onSpanEnded());
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
      status: zs(this._status),
      timestamp: this._endTime,
      trace_id: this._traceId,
      origin: this._attributes[W],
      profile_id: this._attributes[Bn],
      exclusive_time: this._attributes[Gn],
      measurements: Pr(this._events),
      is_segment: this._isStandaloneSpan && j(this) === this || void 0,
      segment_id: this._isStandaloneSpan ? j(this).spanContext().spanId : void 0,
      links: Js(this._links)
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
    const s = $r(n) ? n : r || Z(), o = $r(n) ? {} : n || {}, i = {
      name: e,
      time: ft(s),
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
    const e = k();
    if (e && e.emit("spanEnd", this), !(this._isStandaloneSpan || this === j(this)))
      return;
    if (this._isStandaloneSpan) {
      this._sampled ? da(ca([this], e)) : (S && g.log("[Tracing] Discarding standalone span because its trace was not chosen to be sampled."), e && e.recordDroppedEvent("sample_rate", "span"));
      return;
    }
    const r = this._convertSpanToTransaction();
    r && (Oe(this).scope || O()).captureEvent(r);
  }
  /**
   * Finish the transaction & prepare the event to send to Sentry.
   */
  _convertSpanToTransaction() {
    var d;
    if (!Lr(A(this)))
      return;
    this._name || (S && g.warn("Transaction has no name, falling back to `<unlabeled transaction>`."), this._name = "<unlabeled transaction>");
    const { scope: e, isolationScope: n } = Oe(this), r = (d = e == null ? void 0 : e.getScopeData().sdkProcessingMetadata) == null ? void 0 : d.normalizedRequest;
    if (this._sampled !== !0)
      return;
    const o = be(this).filter((p) => p !== this && !pa(p)).map((p) => A(p)).filter(Lr), i = this._attributes[Q];
    delete this._attributes[Rr], o.forEach((p) => {
      delete p.data[Rr];
    });
    const a = f({
      contexts: {
        trace: Bi(this)
      },
      spans: (
        // spans.sort() mutates the array, but `spans` is already a copy so we can safely do this here
        // we do not use spans anymore after this point
        o.length > Dr ? o.sort((p, m) => p.start_timestamp - m.start_timestamp).slice(0, Dr) : o
      ),
      start_timestamp: this._startTime,
      timestamp: this._endTime,
      transaction: this._name,
      type: "transaction",
      sdkProcessingMetadata: {
        capturedSpanScope: e,
        capturedSpanIsolationScope: n,
        dynamicSamplingContext: ot(this)
      },
      request: r
    }, i && {
      transaction_info: {
        source: i
      }
    }), c = Pr(this._events);
    return c && Object.keys(c).length && (S && g.log(
      "[Measurements] Adding measurements to transaction event",
      JSON.stringify(c, void 0, 2)
    ), a.measurements = c), a;
  }
}
function $r(t) {
  return t && typeof t == "number" || t instanceof Date || Array.isArray(t);
}
function Lr(t) {
  return !!t.start_timestamp && !!t.timestamp && !!t.span_id && !!t.trace_id;
}
function pa(t) {
  return t instanceof Ve && t.isStandaloneSpan();
}
function da(t) {
  const e = k();
  if (!e)
    return;
  const n = t[1];
  if (!n || n.length === 0) {
    e.recordDroppedEvent("before_send", "span");
    return;
  }
  e.sendEnvelope(t);
}
function Ke(t, e, n = () => {
}, r = () => {
}) {
  let s;
  try {
    s = t();
  } catch (o) {
    throw e(o), n(), o;
  }
  return ma(s, e, n, r);
}
function ma(t, e, n, r) {
  return Lt(t) ? t.then(
    (s) => (n(), r(s), s),
    (s) => {
      throw e(s), n(), s;
    }
  ) : (n(), r(t), t);
}
function _a(t, e, n) {
  if (!Ye(t))
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
const Qs = "__SENTRY_SUPPRESS_TRACING__";
function se(t, e) {
  const n = Xe();
  if (n.startSpan)
    return n.startSpan(t, e);
  const r = Yn(t), { forceTransaction: s, parentSpan: o, scope: i } = t, a = i == null ? void 0 : i.clone();
  return it(a, () => eo(o)(() => {
    const u = O(), d = Vn(u, o), m = t.onlyIfParent && !d ? new yt() : Wn({
      parentSpan: d,
      spanArguments: r,
      forceTransaction: s,
      scope: u
    });
    return gt(u, m), Ke(
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
  const n = Xe();
  if (n.startSpanManual)
    return n.startSpanManual(t, e);
  const r = Yn(t), { forceTransaction: s, parentSpan: o, scope: i } = t, a = i == null ? void 0 : i.clone();
  return it(a, () => eo(o)(() => {
    const u = O(), d = Vn(u, o), m = t.onlyIfParent && !d ? new yt() : Wn({
      parentSpan: d,
      spanArguments: r,
      forceTransaction: s,
      scope: u
    });
    return gt(u, m), Ke(
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
function to(t) {
  const e = Xe();
  if (e.startInactiveSpan)
    return e.startInactiveSpan(t);
  const n = Yn(t), { forceTransaction: r, parentSpan: s } = t;
  return (t.scope ? (i) => it(t.scope, i) : s !== void 0 ? (i) => zn(s, i) : (i) => i())(() => {
    const i = O(), a = Vn(i, s);
    return t.onlyIfParent && !a ? new yt() : Wn({
      parentSpan: a,
      spanArguments: n,
      forceTransaction: r,
      scope: i
    });
  });
}
function zn(t, e) {
  const n = Xe();
  return n.withActiveSpan ? n.withActiveSpan(t, e) : it((r) => (gt(r, t || void 0), e(r)));
}
function op(t) {
  return it((e) => (e.setPropagationContext({
    traceId: st(),
    sampleRand: Math.random()
  }), S && g.log(`Starting a new trace with id ${e.getPropagationContext().traceId}`), zn(null, t)));
}
function Wn({
  parentSpan: t,
  spanArguments: e,
  forceTransaction: n,
  scope: r
}) {
  if (!Ye()) {
    const i = new yt();
    if (n || !t) {
      const a = f({
        sampled: "false",
        sample_rate: "0",
        transaction: e.name
      }, ot(i));
      Te(i, a);
    }
    return i;
  }
  const s = $();
  let o;
  if (t && !n)
    o = ga(t, r, e), Ws(t, o);
  else if (t) {
    const i = ot(t), { traceId: a, spanId: c } = t.spanContext(), u = ht(t);
    o = Fr(
      f({
        traceId: a,
        parentSpanId: c
      }, e),
      r,
      u
    ), Te(o, i);
  } else {
    const {
      traceId: i,
      dsc: a,
      parentSpanId: c,
      sampled: u
    } = f(f({}, s.getPropagationContext()), r.getPropagationContext());
    o = Fr(
      f({
        traceId: i,
        parentSpanId: c
      }, e),
      r,
      u
    ), a && Te(o, a);
  }
  return ua(o), Mi(o, r, s), o;
}
function Yn(t) {
  const e = t.experimental || {}, n = f({
    isStandalone: e.standalone
  }, t);
  if (t.startTime) {
    const r = f({}, n);
    return r.startTimestamp = ft(t.startTime), delete r.startTime, r;
  }
  return n;
}
function Xe() {
  const t = xt();
  return re(t);
}
function Fr(t, e, n) {
  var _, y;
  const r = k(), s = (r == null ? void 0 : r.getOptions()) || {}, { name: o = "" } = t, i = { spanAttributes: f({}, t.attributes), spanName: o, parentSampled: n };
  r == null || r.emit("beforeSampling", i, { decision: !1 });
  const a = (_ = i.parentSampled) != null ? _ : n, c = i.spanAttributes, u = e.getPropagationContext(), [d, p, m] = e.getScopeData().sdkProcessingMetadata[Qs] ? [!1] : _a(
    s,
    {
      name: o,
      parentSampled: a,
      attributes: c,
      parentSampleRate: Hn((y = u.dsc) == null ? void 0 : y.sample_rate)
    },
    u.sampleRand
  ), l = new Ve(E(f({}, t), {
    attributes: f({
      [Q]: "custom",
      [$s]: p !== void 0 && m ? p : void 0
    }, c),
    sampled: d
  }));
  return !d && r && (S && g.log("[Tracing] Discarding root span because its trace was not chosen to be sampled."), r.recordDroppedEvent("sample_rate", "transaction")), r && r.emit("spanStart", l), l;
}
function ga(t, e, n) {
  const { spanId: r, traceId: s } = t.spanContext(), o = e.getScopeData().sdkProcessingMetadata[Qs] ? !1 : ht(t), i = o ? new Ve(E(f({}, n), {
    parentSpanId: r,
    traceId: s,
    sampled: o
  })) : new yt({ traceId: s });
  Ws(t, i);
  const a = k();
  return a && (a.emit("spanStart", i), n.endTimestamp && a.emit("spanEnd", i)), i;
}
function Vn(t, e) {
  if (e)
    return e;
  if (e === null)
    return;
  const n = Mt(t);
  if (!n)
    return;
  const r = k();
  return (r ? r.getOptions() : {}).parentSpanIsAlwaysRootSpan ? j(n) : n;
}
function eo(t) {
  return t !== void 0 ? (e) => zn(t, e) : (e) => e();
}
const mn = {
  idleTimeout: 1e3,
  finalTimeout: 3e4,
  childSpanTimeout: 15e3
}, ha = "heartbeatFailed", ya = "idleTimeout", Sa = "finalTimeout", Ea = "externalFinish";
function ba(t, e = {}) {
  const n = /* @__PURE__ */ new Map();
  let r = !1, s, o = Ea, i = !e.disableAutoFinish;
  const a = [], {
    idleTimeout: c = mn.idleTimeout,
    finalTimeout: u = mn.finalTimeout,
    childSpanTimeout: d = mn.childSpanTimeout,
    beforeSpanEnd: p,
    trimIdleSpanEndTimestamp: m = !0
  } = e, l = k();
  if (!l || !Ye()) {
    const T = new yt(), C = f({
      sample_rate: "0",
      sampled: "false"
    }, ot(T));
    return Te(T, C), T;
  }
  const _ = O(), y = jt(), h = Ta(t);
  h.end = new Proxy(h.end, {
    apply(T, C, qt) {
      if (p && p(h), C instanceof yt)
        return;
      const [Jt, ...et] = qt, Et = Jt || Z(), L = ft(Et), M = be(h).filter((V) => V !== h), zt = A(h);
      if (!M.length || !m)
        return St(L), Reflect.apply(T, C, [L, ...et]);
      const bt = l.getOptions().ignoreSpans, ae = M == null ? void 0 : M.reduce((V, ue) => {
        const le = A(ue);
        return !le.timestamp || bt && ke(le, bt) ? V : V ? Math.max(V, le.timestamp) : le.timestamp;
      }, void 0), Tt = zt.start_timestamp, ce = Math.min(
        Tt ? Tt + u / 1e3 : 1 / 0,
        Math.max(Tt || -1 / 0, Math.min(L, ae || 1 / 0))
      );
      return St(ce), Reflect.apply(T, C, [ce, ...et]);
    }
  });
  function I() {
    s && (clearTimeout(s), s = void 0);
  }
  function R(T) {
    I(), s = setTimeout(() => {
      !r && n.size === 0 && i && (o = ya, h.end(T));
    }, c);
  }
  function w(T) {
    s = setTimeout(() => {
      !r && i && (o = ha, h.end(T));
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
  function St(T) {
    r = !0, n.clear(), a.forEach((M) => M()), gt(_, y);
    const C = A(h), { start_timestamp: qt } = C;
    if (!qt)
      return;
    C.data[Re] || h.setAttribute(Re, o);
    const et = C.status;
    (!et || et === "unknown") && h.setStatus({ code: We }), g.log(`[Tracing] Idle span "${C.op}" finished`);
    const Et = be(h).filter((M) => M !== h);
    let L = 0;
    Et.forEach((M) => {
      M.isRecording() && (M.setStatus({ code: N, message: "cancelled" }), M.end(T), S && g.log("[Tracing] Cancelling span since span ended early", JSON.stringify(M, void 0, 2)));
      const zt = A(M), { timestamp: bt = 0, start_timestamp: ae = 0 } = zt, Tt = ae <= T, ce = (u + c) / 1e3, V = bt - ae <= ce;
      if (S) {
        const ue = JSON.stringify(M, void 0, 2);
        Tt ? V || g.log("[Tracing] Discarding span since it finished after idle span final timeout", ue) : g.log("[Tracing] Discarding span since it happened after idle span was finished", ue);
      }
      (!V || !Tt) && (qi(h, M), L++);
    }), L > 0 && h.setAttribute("sentry.idle_span_discarded_spans", L);
  }
  return a.push(
    l.on("spanStart", (T) => {
      if (r || T === h || A(T).timestamp || T instanceof Ve && T.isStandaloneSpan())
        return;
      be(h).includes(T) && U(T.spanContext().spanId);
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
    r || (h.setStatus({ code: N, message: "deadline_exceeded" }), o = Sa, h.end());
  }, u), h;
}
function Ta(t) {
  const e = to(t);
  return gt(O(), e), S && g.log("[Tracing] Started span is an idle span"), e;
}
const _n = 0, Ur = 1, jr = 2;
function Ze(t) {
  return new Ct((e) => {
    e(t);
  });
}
function Kn(t) {
  return new Ct((e, n) => {
    n(t);
  });
}
class Ct {
  constructor(e) {
    this._state = _n, this._handlers = [], this._runExecutor(e);
  }
  /** @inheritdoc */
  then(e, n) {
    return new Ct((r, s) => {
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
    return new Ct((n, r) => {
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
    if (this._state === _n)
      return;
    const e = this._handlers.slice();
    this._handlers = [], e.forEach((n) => {
      n[0] || (this._state === Ur && n[1](this._value), this._state === jr && n[2](this._value), n[0] = !0);
    });
  }
  /** Run the executor for the SyncPromise. */
  _runExecutor(e) {
    const n = (o, i) => {
      if (this._state === _n) {
        if (Lt(i)) {
          i.then(r, s);
          return;
        }
        this._state = o, this._value = i, this._executeHandlers();
      }
    }, r = (o) => {
      n(Ur, o);
    }, s = (o) => {
      n(jr, o);
    };
    try {
      e(r, s);
    } catch (o) {
      s(o);
    }
  }
}
function Ia(t, e, n, r = 0) {
  try {
    const s = Nn(e, n, t, r);
    return Lt(s) ? s : Ze(s);
  } catch (s) {
    return Kn(s);
  }
}
function Nn(t, e, n, r) {
  const s = n[r];
  if (!t || !s)
    return t;
  const o = s(f({}, t), e);
  return S && o === null && g.log(`Event processor "${s.id || "?"}" dropped event`), Lt(o) ? o.then((i) => Nn(i, e, n, r + 1)) : Nn(o, e, n, r + 1);
}
function Aa(t, e) {
  const { fingerprint: n, span: r, breadcrumbs: s, sdkProcessingMetadata: o } = e;
  Na(t, e), r && ka(t, r), Ma(t, n), Ra(t, s), Oa(t, o);
}
function wt(t, e) {
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
  _e(t, "extra", n), _e(t, "tags", r), _e(t, "user", s), _e(t, "contexts", o), t.sdkProcessingMetadata = ne(t.sdkProcessingMetadata, a, 2), i && (t.level = i), l && (t.transactionName = l), _ && (t.span = _), c.length && (t.breadcrumbs = [...t.breadcrumbs, ...c]), u.length && (t.fingerprint = [...t.fingerprint, ...u]), d.length && (t.eventProcessors = [...t.eventProcessors, ...d]), p.length && (t.attachments = [...t.attachments, ...p]), t.propagationContext = f(f({}, t.propagationContext), m);
}
function _e(t, e, n) {
  t[e] = ne(t[e], n, 1);
}
function Na(t, e) {
  const { extra: n, tags: r, user: s, contexts: o, level: i, transactionName: a } = e;
  Object.keys(n).length && (t.extra = f(f({}, n), t.extra)), Object.keys(r).length && (t.tags = f(f({}, r), t.tags)), Object.keys(s).length && (t.user = f(f({}, s), t.user)), Object.keys(o).length && (t.contexts = f(f({}, o), t.contexts)), i && (t.level = i), a && t.type !== "transaction" && (t.transaction = a);
}
function Ra(t, e) {
  const n = [...t.breadcrumbs || [], ...e];
  t.breadcrumbs = n.length ? n : void 0;
}
function Oa(t, e) {
  t.sdkProcessingMetadata = f(f({}, t.sdkProcessingMetadata), e);
}
function ka(t, e) {
  t.contexts = f({
    trace: qs(e)
  }, t.contexts), t.sdkProcessingMetadata = f({
    dynamicSamplingContext: ot(e)
  }, t.sdkProcessingMetadata);
  const n = j(e), r = A(n).description;
  r && !t.transaction && t.type === "transaction" && (t.transaction = r);
}
function Ma(t, e) {
  t.fingerprint = t.fingerprint ? Array.isArray(t.fingerprint) ? t.fingerprint : [t.fingerprint] : [], e && (t.fingerprint = t.fingerprint.concat(e)), t.fingerprint.length || delete t.fingerprint;
}
let K, Br, Gr, rt;
function va(t) {
  const e = b._sentryDebugIds, n = b._debugIds;
  if (!e && !n)
    return {};
  const r = e ? Object.keys(e) : [], s = n ? Object.keys(n) : [];
  if (rt && r.length === Br && s.length === Gr)
    return rt;
  Br = r.length, Gr = s.length, rt = {}, K || (K = {});
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
function Ca(t, e, n, r, s, o) {
  const { normalizeDepth: i = 3, normalizeMaxBreadth: a = 1e3 } = t, c = E(f({}, e), {
    event_id: e.event_id || n.event_id || q(),
    timestamp: e.timestamp || ee()
  }), u = n.integrations || t.integrations.map((h) => h.name);
  wa(c, t), Da(c, u), s && s.emit("applyFrameMetadata", e), e.type === void 0 && xa(c, t.stackParser);
  const d = La(r, n.captureContext);
  n.mechanism && kt(c, n.mechanism);
  const p = s ? s.getEventProcessors() : [], m = jn().getScopeData();
  if (o) {
    const h = o.getScopeData();
    wt(m, h);
  }
  if (d) {
    const h = d.getScopeData();
    wt(m, h);
  }
  const l = [...n.attachments || [], ...m.attachments];
  l.length && (n.attachments = l), Aa(c, m);
  const _ = [
    ...p,
    // Run scope event processors _after_ all other processors
    ...m.eventProcessors
  ];
  return Ia(_, c, n).then((h) => (h && Pa(h), typeof i == "number" && i > 0 ? $a(h, i, a) : h));
}
function wa(t, e) {
  var a, c;
  const { environment: n, release: r, dist: s, maxValueLength: o } = e;
  t.environment = t.environment || n || Jn, !t.release && r && (t.release = r), !t.dist && s && (t.dist = s);
  const i = t.request;
  i != null && i.url && o && (i.url = Xt(i.url, o)), o && ((c = (a = t.exception) == null ? void 0 : a.values) == null || c.forEach((u) => {
    u.value && (u.value = Xt(u.value, o));
  }));
}
function xa(t, e) {
  var r, s;
  const n = va(e);
  (s = (r = t.exception) == null ? void 0 : r.values) == null || s.forEach((o) => {
    var i, a;
    (a = (i = o.stacktrace) == null ? void 0 : i.frames) == null || a.forEach((c) => {
      c.filename && (c.debug_id = n[c.filename]);
    });
  });
}
function Pa(t) {
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
function Da(t, e) {
  e.length > 0 && (t.sdk = t.sdk || {}, t.sdk.integrations = [...t.sdk.integrations || [], ...e]);
}
function $a(t, e, n) {
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
function La(t, e) {
  if (!e)
    return t;
  const n = t ? t.clone() : new z();
  return n.update(e), n;
}
function Fa(t) {
  if (t)
    return Ua(t) ? { captureContext: t } : Ba(t) ? {
      captureContext: t
    } : t;
}
function Ua(t) {
  return t instanceof z || typeof t == "function";
}
const ja = [
  "user",
  "level",
  "extra",
  "contexts",
  "tags",
  "fingerprint",
  "propagationContext"
];
function Ba(t) {
  return Object.keys(t).some((e) => ja.includes(e));
}
function x(t, e) {
  return O().captureException(t, Fa(e));
}
function Hr(t, e) {
  const n = typeof e == "string" ? e : void 0, r = typeof e != "string" ? { captureContext: e } : void 0;
  return O().captureMessage(t, n, r);
}
function ip(t, e) {
  return O().captureEvent(t, e);
}
function ap(t, e) {
  $().setContext(t, e);
}
function cp(t) {
  $().setExtras(t);
}
function qr(t, e) {
  $().setExtra(t, e);
}
function up(t) {
  $().setTags(t);
}
function Jr(t, e) {
  $().setTag(t, e);
}
function lp(t) {
  $().setUser(t);
}
function no() {
  return $().lastEventId();
}
function Qe(t) {
  $().addEventProcessor(t);
}
const Ga = "7";
function Ha(t) {
  const e = t.protocol ? `${t.protocol}:` : "", n = t.port ? `:${t.port}` : "";
  return `${e}//${t.host}${n}${t.path ? `/${t.path}` : ""}/api/`;
}
function qa(t) {
  return `${Ha(t)}${t.projectId}/envelope/`;
}
function Ja(t, e) {
  const n = {
    sentry_version: Ga
  };
  return t.publicKey && (n.sentry_key = t.publicKey), e && (n.sentry_client = `${e.name}/${e.version}`), new URLSearchParams(n).toString();
}
function ro(t, e, n) {
  return e || `${qa(t)}?${Ja(t, n)}`;
}
const zr = [];
function za(t, e) {
  const n = {};
  return e.forEach((r) => {
    r && so(t, r, n);
  }), n;
}
function Wr(t, e) {
  for (const n of e)
    n != null && n.afterAllSetup && n.afterAllSetup(t);
}
function so(t, e, n) {
  if (n[e.name]) {
    S && g.log(`Integration skipped because it was already installed: ${e.name}`);
    return;
  }
  if (n[e.name] = e, !zr.includes(e.name) && typeof e.setupOnce == "function" && (e.setupOnce(), zr.push(e.name)), e.setup && typeof e.setup == "function" && e.setup(t), typeof e.preprocessEvent == "function") {
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
function oo(t, e) {
  return e ? it(e, () => {
    const n = jt(), r = n ? qs(n) : Ds(e);
    return [n ? ot(n) : Ks(t, e), r];
  }) : [void 0, void 0];
}
const Wa = {
  trace: 1,
  debug: 5,
  info: 9,
  warn: 13,
  error: 17,
  fatal: 21
};
function Ya(t) {
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
function Va(t, e, n, r) {
  const s = {};
  return e != null && e.sdk && (s.sdk = {
    name: e.sdk.name,
    version: e.sdk.version
  }), n && r && (s.dsn = Ut(r)), at(s, [Ya(t)]);
}
const Ka = 100;
function Xa(t) {
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
function Za(t, e) {
  const n = Xn(), r = ao(t);
  r === void 0 ? n.set(t, [e]) : r.length >= Ka ? (io(t, r), n.set(t, [e])) : n.set(t, [...r, e]);
}
function ve(t, e = O(), n = Za) {
  var Jt, et, Et;
  const r = (Jt = e == null ? void 0 : e.getClient()) != null ? Jt : k();
  if (!r) {
    S && g.warn("No client available to capture log.");
    return;
  }
  const { release: s, environment: o, enableLogs: i = !1, beforeSendLog: a } = r.getOptions();
  if (!i) {
    S && g.warn("logging option not enabled, log will not be captured.");
    return;
  }
  const [, c] = oo(r, e), u = f({}, t.attributes), {
    user: { id: d, email: p, username: m }
  } = Qa(e);
  H(u, "user.id", d, !1), H(u, "user.email", p, !1), H(u, "user.name", m, !1), H(u, "sentry.release", s), H(u, "sentry.environment", o);
  const { name: l, version: _ } = (Et = (et = r.getSdkMetadata()) == null ? void 0 : et.sdk) != null ? Et : {};
  H(u, "sentry.sdk.name", l), H(u, "sentry.sdk.version", _);
  const y = r.getIntegrationByName("Replay"), h = y == null ? void 0 : y.getReplayId(!0);
  H(u, "sentry.replay_id", h), h && (y == null ? void 0 : y.getRecordingMode()) === "buffer" && H(u, "sentry._internal.replay_is_buffering", !0);
  const I = t.message;
  if (Ln(I)) {
    const { __sentry_template_string__: L, __sentry_template_values__: M = [] } = I;
    M != null && M.length && (u["sentry.message.template"] = L), M.forEach((zt, bt) => {
      u[`sentry.message.parameter.${bt}`] = zt;
    });
  }
  const R = Mt(e);
  H(u, "sentry.trace.parent_span_id", R == null ? void 0 : R.spanContext().spanId);
  const w = E(f({}, t), { attributes: u });
  r.emit("beforeCaptureLog", w);
  const U = a ? Dt(() => a(w)) : w;
  if (!U) {
    r.recordDroppedEvent("before_send", "log_item", 1), S && g.warn("beforeSendLog returned null, log will not be captured.");
    return;
  }
  const { level: Y, message: St, attributes: T = {}, severityNumber: C } = U, qt = {
    timestamp: Z(),
    level: Y,
    body: St,
    trace_id: c == null ? void 0 : c.trace_id,
    severity_number: C != null ? C : Wa[Y],
    attributes: Object.keys(T).reduce(
      (L, M) => (L[M] = Xa(T[M]), L),
      {}
    )
  };
  n(r, qt), r.emit("afterCaptureLog", U);
}
function io(t, e) {
  var o;
  const n = (o = e != null ? e : ao(t)) != null ? o : [];
  if (n.length === 0)
    return;
  const r = t.getOptions(), s = Va(n, r._metadata, r.tunnel, t.getDsn());
  Xn().set(t, []), t.emit("flushLogs"), t.sendEnvelope(s);
}
function ao(t) {
  return Xn().get(t);
}
function Qa(t) {
  const e = jn().getScopeData();
  return wt(e, $().getScopeData()), wt(e, t.getScopeData()), e;
}
function Xn() {
  return Pt("clientToLogBufferMap", () => /* @__PURE__ */ new WeakMap());
}
function tc(t) {
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
function ec(t, e, n, r) {
  const s = {};
  return e != null && e.sdk && (s.sdk = {
    name: e.sdk.name,
    version: e.sdk.version
  }), n && r && (s.dsn = Ut(r)), at(s, [tc(t)]);
}
const nc = 1e3;
function rc(t) {
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
function sc(t, e) {
  const n = Zn(), r = uo(t);
  r === void 0 ? n.set(t, [e]) : r.length >= nc ? (co(t, r), n.set(t, [e])) : n.set(t, [...r, e]);
}
function oc(t, e, n) {
  var l, _;
  const { release: r, environment: s } = e.getOptions(), o = f({}, t.attributes), {
    user: { id: i, email: a, username: c }
  } = cc(n);
  X(o, "user.id", i, !1), X(o, "user.email", a, !1), X(o, "user.name", c, !1), X(o, "sentry.release", r), X(o, "sentry.environment", s);
  const { name: u, version: d } = (_ = (l = e.getSdkMetadata()) == null ? void 0 : l.sdk) != null ? _ : {};
  X(o, "sentry.sdk.name", u), X(o, "sentry.sdk.version", d);
  const p = e.getIntegrationByName("Replay"), m = p == null ? void 0 : p.getReplayId(!0);
  return X(o, "sentry.replay_id", m), m && (p == null ? void 0 : p.getRecordingMode()) === "buffer" && X(o, "sentry._internal.replay_is_buffering", !0), E(f({}, t), {
    attributes: o
  });
}
function ic(t, e, n) {
  const r = {};
  for (const c in t.attributes)
    t.attributes[c] !== void 0 && (r[c] = rc(t.attributes[c]));
  const [, s] = oo(e, n), o = Mt(n), i = o ? o.spanContext().traceId : s == null ? void 0 : s.trace_id, a = o ? o.spanContext().spanId : void 0;
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
function ac(t, e) {
  var l, _, y, h;
  const n = (l = e == null ? void 0 : e.scope) != null ? l : O(), r = (_ = e == null ? void 0 : e.captureSerializedMetric) != null ? _ : sc, s = (y = n == null ? void 0 : n.getClient()) != null ? y : k();
  if (!s) {
    S && g.warn("No client available to capture metric.");
    return;
  }
  const { _experiments: o, enableMetrics: i, beforeSendMetric: a } = s.getOptions();
  if (!((h = i != null ? i : o == null ? void 0 : o.enableMetrics) != null ? h : !0)) {
    S && g.warn("metrics option not enabled, metric will not be captured.");
    return;
  }
  const u = oc(t, s, n);
  s.emit("processMetric", u);
  const d = a || (o == null ? void 0 : o.beforeSendMetric), p = d ? d(u) : u;
  if (!p) {
    S && g.log("`beforeSendMetric` returned `null`, will not send metric.");
    return;
  }
  const m = ic(p, s, n);
  S && g.log("[Metric]", m), r(s, m), s.emit("afterCaptureMetric", p);
}
function co(t, e) {
  var o;
  const n = (o = e != null ? e : uo(t)) != null ? o : [];
  if (n.length === 0)
    return;
  const r = t.getOptions(), s = ec(n, r._metadata, r.tunnel, t.getDsn());
  Zn().set(t, []), t.emit("flushMetrics"), t.sendEnvelope(s);
}
function uo(t) {
  return Zn().get(t);
}
function cc(t) {
  const e = jn().getScopeData();
  return wt(e, $().getScopeData()), wt(e, t.getScopeData()), e;
}
function Zn() {
  return Pt("clientToMetricBufferMap", () => /* @__PURE__ */ new WeakMap());
}
const Qn = Symbol.for("SentryBufferFullError");
function lo(t = 100) {
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
      return Ze(!0);
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
const uc = 60 * 1e3;
function lc(t, e = Date.now()) {
  const n = parseInt(`${t}`, 10);
  if (!isNaN(n))
    return n * 1e3;
  const r = Date.parse(`${t}`);
  return isNaN(r) ? uc : r - e;
}
function fc(t, e) {
  return t[e] || t.all || 0;
}
function pc(t, e, n = Date.now()) {
  return fc(t, e) > n;
}
function dc(t, { statusCode: e, headers: n }, r = Date.now()) {
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
  else i ? s.all = r + lc(i, r) : e === 429 && (s.all = r + 60 * 1e3);
  return s;
}
const fo = 64;
function mc(t, e, n = lo(
  t.bufferSize || fo
)) {
  let r = {};
  const s = (i) => n.drain(i);
  function o(i) {
    const a = [];
    if (Qt(i, (p, m) => {
      const l = xr(m);
      pc(r, l) ? t.recordDroppedEvent("ratelimit_backoff", l) : a.push(p);
    }), a.length === 0)
      return Promise.resolve({});
    const c = at(i[0], a), u = (p) => {
      Qt(c, (m, l) => {
        t.recordDroppedEvent(p, xr(l));
      });
    }, d = () => e({ body: Qi(c) }).then(
      (p) => (p.statusCode !== void 0 && (p.statusCode < 200 || p.statusCode >= 300) && S && g.warn(`Sentry responded with status code ${p.statusCode} to sent event.`), r = dc(r, p), p),
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
function _c(t, e, n) {
  const r = [
    { type: "client_report" },
    {
      timestamp: ee(),
      discarded_events: t
    }
  ];
  return at(e ? { dsn: e } : {}, [r]);
}
function po(t) {
  const e = [];
  t.message && e.push(t.message);
  try {
    const n = t.exception.values[t.exception.values.length - 1];
    n != null && n.value && (e.push(n.value), n.type && e.push(`${n.type}: ${n.value}`));
  } catch (n) {
  }
  return e;
}
function gc(t) {
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
function hc(t) {
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
const Yr = "Not capturing exception because it's already been captured.", Vr = "Discarded session because of missing or non-string release", mo = Symbol.for("SentryInternalError"), _o = Symbol.for("SentryDoNotSendEventError"), yc = 5e3;
function Ie(t) {
  return {
    message: t,
    [mo]: !0
  };
}
function gn(t) {
  return {
    message: t,
    [_o]: !0
  };
}
function Kr(t) {
  return !!t && typeof t == "object" && mo in t;
}
function Xr(t) {
  return !!t && typeof t == "object" && _o in t;
}
function Zr(t, e, n, r, s) {
  let o = 0, i, a = !1;
  t.on(n, () => {
    o = 0, clearTimeout(i), a = !1;
  }), t.on(e, (c) => {
    o += r(c), o >= 8e5 ? s(t) : a || (a = !0, i = setTimeout(() => {
      s(t);
    }, yc));
  }), t.on("flush", () => {
    s(t);
  });
}
class Sc {
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
    if (this._options = e, this._integrations = {}, this._numProcessing = 0, this._outcomes = {}, this._hooks = {}, this._eventProcessors = [], this._promiseBuffer = lo((s = (r = e.transportOptions) == null ? void 0 : r.bufferSize) != null ? s : fo), e.dsn ? this._dsn = ji(e.dsn) : S && g.warn("No DSN provided, client will not send events."), this._dsn) {
      const d = ro(
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
    this._options.enableLogs = (i = this._options.enableLogs) != null ? i : (o = this._options._experiments) == null ? void 0 : o.enableLogs, this._options.enableLogs && Zr(this, "afterCaptureLog", "flushLogs", Ic, io), ((u = (c = this._options.enableMetrics) != null ? c : (a = this._options._experiments) == null ? void 0 : a.enableMetrics) != null ? u : !0) && Zr(
      this,
      "afterCaptureMetric",
      "flushMetrics",
      Tc,
      co
    );
  }
  /**
   * Captures an exception event and sends it to Sentry.
   *
   * Unlike `captureException` exported from every SDK, this method requires that you pass it the current scope.
   */
  captureException(e, n, r) {
    const s = q();
    if (Ar(e))
      return S && g.log(Yr), s;
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
    }, r), i = Ln(e) ? e : String(e), a = Fn(e), c = a ? this.eventFromMessage(i, n, o) : this.eventFromException(e, o);
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
    if (n != null && n.originalException && Ar(n.originalException))
      return S && g.log(Yr), s;
    const o = f({
      event_id: s
    }, n), i = e.sdkProcessingMetadata || {}, a = i.capturedSpanScope, c = i.capturedSpanIsolationScope, u = Qr(e.type);
    return this._process(
      () => this._captureEvent(e, o, a || r, c),
      u
    ), o.event_id;
  }
  /**
   * Captures a session.
   */
  captureSession(e) {
    this.sendSession(e), Sn(e, { init: !1 });
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
    so(this, e, this._integrations), n || Wr(this, [e]);
  }
  /**
   * Send a fully prepared event to Sentry.
   */
  sendEvent(e, n = {}) {
    this.emit("beforeSendEvent", e, n);
    let r = aa(e, this._dsn, this._options._metadata, this._options.tunnel);
    for (const s of n.attachments || [])
      r = Zi(r, na(s));
    this.sendEnvelope(r).then((s) => this.emit("afterSendEvent", e, s));
  }
  /**
   * Send a session or session aggregrates to Sentry.
   */
  sendSession(e) {
    const { release: n, environment: r = Jn } = this._options;
    if ("aggregates" in e) {
      const o = e.attrs || {};
      if (!o.release && !n) {
        S && g.warn(Vr);
        return;
      }
      o.release = o.release || n, o.environment = o.environment || r, e.attrs = o;
    } else {
      if (!e.release && !n) {
        S && g.warn(Vr);
        return;
      }
      e.release = e.release || n, e.environment = e.environment || r;
    }
    this.emit("beforeSendSession", e);
    const s = ia(e, this._dsn, this._options._metadata, this._options.tunnel);
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
    this._integrations = za(this, e), Wr(this, e);
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
    (i && e.errors === 0 || i && r) && (Sn(e, E(f({}, r && { status: "crashed" }), {
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
    return !n.integrations && (i != null && i.length) && (n.integrations = i), this.emit("preprocessEvent", e, n), e.type || s.setLastEventId(e.event_id || n.event_id), Ca(o, e, n, r, this, s).then((a) => {
      if (a === null)
        return a;
      this.emit("postprocessEvent", a, n), a.contexts = f({
        trace: Ds(r)
      }, a.contexts);
      const c = Ks(this, r);
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
  _captureEvent(e, n = {}, r = O(), s = $()) {
    return S && Rn(e) && g.log(`Captured error event \`${po(e)[0] || "<unknown>"}\``), this._processEvent(e, n, r, s).then(
      (o) => o.event_id,
      (o) => {
        S && (Xr(o) ? g.log(o.message) : Kr(o) ? g.warn(o.message) : g.warn(o));
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
    const o = this.getOptions(), { sampleRate: i } = o, a = go(e), c = Rn(e), d = `before send for type \`${e.type || "error"}\``, p = typeof i == "undefined" ? void 0 : Hn(i);
    if (c && typeof p == "number" && Math.random() > p)
      return this.recordDroppedEvent("sample_rate", "error"), Kn(
        gn(
          `Discarding event because it's not included in the random sample (sampling rate = ${i})`
        )
      );
    const m = Qr(e.type);
    return this._prepareEvent(e, n, r, s).then((l) => {
      if (l === null)
        throw this.recordDroppedEvent("event_processor", m), gn("An event processor returned `null`, will not send event.");
      if (n.data && n.data.__sentry__ === !0)
        return l;
      const y = bc(this, o, l, n);
      return Ec(y, d);
    }).then((l) => {
      var h;
      if (l === null) {
        if (this.recordDroppedEvent("before_send", m), a) {
          const R = 1 + (e.spans || []).length;
          this.recordDroppedEvent("before_send", "span", R);
        }
        throw gn(`${d} returned \`null\`, will not send event.`);
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
      throw Xr(l) || Kr(l) ? l : (this.captureException(l, {
        mechanism: {
          handled: !1,
          type: "internal"
        },
        data: {
          __sentry__: !0
        },
        originalException: l
      }), Ie(
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
    const n = _c(e, this._options.tunnel && Ut(this._dsn));
    this.sendEnvelope(n);
  }
  /**
   * Creates an {@link Event} from all inputs to `captureException` and non-primitive inputs to `captureMessage`.
   */
}
function Qr(t) {
  return t === "replay_event" ? "replay" : t || "error";
}
function Ec(t, e) {
  const n = `${e} must return \`null\` or a valid event.`;
  if (Lt(t))
    return t.then(
      (r) => {
        if (!_t(r) && r !== null)
          throw Ie(n);
        return r;
      },
      (r) => {
        throw Ie(`${e} rejected with ${r}`);
      }
    );
  if (!_t(t) && t !== null)
    throw Ie(n);
  return t;
}
function bc(t, e, n, r) {
  const { beforeSend: s, beforeSendTransaction: o, beforeSendSpan: i, ignoreSpans: a } = e;
  let c = n;
  if (Rn(c) && s)
    return s(c, r);
  if (go(c)) {
    if (i || a) {
      const u = gc(c);
      if (a != null && a.length && ke(u, a))
        return null;
      if (i) {
        const d = i(u);
        d ? c = ne(n, hc(d)) : Tn();
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
            _ ? d.push(_) : (Tn(), d.push(l));
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
function Rn(t) {
  return t.type === void 0;
}
function go(t) {
  return t.type === "transaction";
}
function Tc(t) {
  let e = 0;
  return t.name && (e += t.name.length * 2), e += 8, e + ho(t.attributes);
}
function Ic(t) {
  let e = 0;
  return t.message && (e += t.message.length * 2), e + ho(t.attributes);
}
function ho(t) {
  if (!t)
    return 0;
  let e = 0;
  return Object.values(t).forEach((n) => {
    Array.isArray(n) ? e += n.length * ts(n[0]) : Fn(n) ? e += ts(n) : e += 100;
  }), e;
}
function ts(t) {
  return typeof t == "string" ? t.length * 2 : typeof t == "number" ? 8 : typeof t == "boolean" ? 4 : 0;
}
function Ac(t, e) {
  e.debug === !0 && (S ? g.enable() : Dt(() => {
    console.warn("[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle.");
  })), O().update(e.initialScope);
  const r = new t(e);
  return Nc(r), r.init(), r;
}
function Nc(t) {
  O().setClient(t);
}
function yo(t, e) {
  let n;
  return Qt(t, (r, s) => (e.includes(s) && (n = Array.isArray(r) ? r[1] : void 0), !!n)), n;
}
function Rc(t, e) {
  return (n) => {
    const r = t(n);
    return E(f({}, r), {
      send: (s) => D(null, null, function* () {
        const o = yo(s, ["event", "transaction", "profile", "replay_event"]);
        return o && (o.release = e), r.send(s);
      })
    });
  };
}
function Oc(t, e) {
  return at(
    e ? E(f({}, t[0]), {
      dsn: e
    }) : t[0],
    t[1]
  );
}
function fp(t, e) {
  return (n) => {
    const r = t(n), s = /* @__PURE__ */ new Map();
    function o(c, u) {
      const d = u ? `${c}:${u}` : c;
      let p = s.get(d);
      if (!p) {
        const m = Bs(c);
        if (!m)
          return;
        const l = ro(m, n.tunnel);
        p = u ? Rc(t, u)(E(f({}, n), { url: l })) : t(E(f({}, n), { url: l })), s.set(d, p);
      }
      return [c, p];
    }
    function i(c) {
      return D(this, null, function* () {
        function u(l) {
          const _ = l != null && l.length ? l : ["event"];
          return yo(c, _);
        }
        const d = e({ envelope: c, getEvent: u }).map((l) => typeof l == "string" ? o(l, void 0) : o(l.dsn, l.release)).filter((l) => !!l), p = d.length ? d : [["", r]];
        return (yield Promise.all(
          p.map(([l, _]) => _.send(Oc(c, l)))
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
function kc(t, ...e) {
  const n = new String(String.raw(t, ...e));
  return n.__sentry_template_string__ = t.join("\0").replace(/%/g, "%%").replace(/\0/g, "%s"), n.__sentry_template_values__ = e, n;
}
const Mc = kc;
function vc(t, e, n = [e], r = "npm") {
  const s = t._metadata || {};
  s.sdk || (s.sdk = {
    name: `sentry.javascript.${e}`,
    packages: n.map((o) => ({
      name: `${r}:@sentry/${o}`,
      version: ut
    })),
    version: ut
  }), t._metadata = s;
}
const Cc = 100;
function wc(t, e) {
  const n = k(), r = $();
  if (!n) return;
  const { beforeBreadcrumb: s = null, maxBreadcrumbs: o = Cc } = n.getOptions();
  if (o <= 0) return;
  const i = ee(), a = f({ timestamp: i }, t), c = s ? Dt(() => s(a, e)) : a;
  c !== null && (n.emit && n.emit("beforeAddBreadcrumb", c, e), r.addBreadcrumb(c, o));
}
let es;
const xc = "FunctionToString", ns = /* @__PURE__ */ new WeakMap(), Pc = (() => ({
  name: xc,
  setupOnce() {
    es = Function.prototype.toString;
    try {
      Function.prototype.toString = function(...t) {
        const e = Cs(this), n = ns.has(k()) && e !== void 0 ? e : this;
        return es.apply(n, t);
      };
    } catch (t) {
    }
  },
  setup(t) {
    ns.set(t, !0);
  }
})), Dc = Pc, $c = [
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
], Lc = "EventFilters", Fc = (t = {}) => {
  let e;
  return {
    name: Lc,
    setup(n) {
      const r = n.getOptions();
      e = rs(t, r);
    },
    processEvent(n, r, s) {
      if (!e) {
        const o = s.getOptions();
        e = rs(t, o);
      }
      return jc(n, e) ? null : n;
    }
  };
}, Uc = ((t = {}) => E(f({}, Fc(t)), {
  name: "InboundFilters"
}));
function rs(t = {}, e = {}) {
  return {
    allowUrls: [...t.allowUrls || [], ...e.allowUrls || []],
    denyUrls: [...t.denyUrls || [], ...e.denyUrls || []],
    ignoreErrors: [
      ...t.ignoreErrors || [],
      ...e.ignoreErrors || [],
      ...t.disableErrorDefaults ? [] : $c
    ],
    ignoreTransactions: [...t.ignoreTransactions || [], ...e.ignoreTransactions || []]
  };
}
function jc(t, e) {
  if (t.type) {
    if (t.type === "transaction" && Gc(t, e.ignoreTransactions))
      return S && g.warn(
        `Event dropped due to being matched by \`ignoreTransactions\` option.
Event: ${At(t)}`
      ), !0;
  } else {
    if (Bc(t, e.ignoreErrors))
      return S && g.warn(
        `Event dropped due to being matched by \`ignoreErrors\` option.
Event: ${At(t)}`
      ), !0;
    if (zc(t))
      return S && g.warn(
        `Event dropped due to not having an error message, error type or stacktrace.
Event: ${At(
          t
        )}`
      ), !0;
    if (Hc(t, e.denyUrls))
      return S && g.warn(
        `Event dropped due to being matched by \`denyUrls\` option.
Event: ${At(
          t
        )}.
Url: ${Ce(t)}`
      ), !0;
    if (!qc(t, e.allowUrls))
      return S && g.warn(
        `Event dropped due to not being matched by \`allowUrls\` option.
Event: ${At(
          t
        )}.
Url: ${Ce(t)}`
      ), !0;
  }
  return !1;
}
function Bc(t, e) {
  return e != null && e.length ? po(t).some((n) => ze(n, e)) : !1;
}
function Gc(t, e) {
  if (!(e != null && e.length))
    return !1;
  const n = t.transaction;
  return n ? ze(n, e) : !1;
}
function Hc(t, e) {
  if (!(e != null && e.length))
    return !1;
  const n = Ce(t);
  return n ? ze(n, e) : !1;
}
function qc(t, e) {
  if (!(e != null && e.length))
    return !0;
  const n = Ce(t);
  return n ? ze(n, e) : !0;
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
    return S && g.error(`Cannot extract url for event ${At(t)}`), null;
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
const So = /* @__PURE__ */ new Map(), ss = /* @__PURE__ */ new Set();
function Wc(t) {
  if (b._sentryModuleMetadata)
    for (const e of Object.keys(b._sentryModuleMetadata)) {
      const n = b._sentryModuleMetadata[e];
      if (ss.has(e))
        continue;
      ss.add(e);
      const r = t(e);
      for (const s of r.reverse())
        if (s.filename) {
          So.set(s.filename, n);
          break;
        }
    }
}
function Yc(t, e) {
  return Wc(t), So.get(e);
}
function Eo(t, e) {
  var n, r;
  (r = (n = e.exception) == null ? void 0 : n.values) == null || r.forEach((s) => {
    var o, i;
    (i = (o = s.stacktrace) == null ? void 0 : o.frames) == null || i.forEach((a) => {
      if (!a.filename || a.module_metadata)
        return;
      const c = Yc(t, a.filename);
      c && (a.module_metadata = c);
    });
  });
}
function bo(t) {
  var e, n;
  (n = (e = t.exception) == null ? void 0 : e.values) == null || n.forEach((r) => {
    var s, o;
    (o = (s = r.stacktrace) == null ? void 0 : s.frames) == null || o.forEach((i) => {
      delete i.module_metadata;
    });
  });
}
const pp = () => ({
  name: "ModuleMetadata",
  setup(t) {
    t.on("beforeEnvelope", (e) => {
      Qt(e, (n, r) => {
        if (r === "event") {
          const s = Array.isArray(n) ? n[1] : void 0;
          s && (bo(s), n[1] = s);
        }
      });
    }), t.on("applyFrameMetadata", (e) => {
      if (e.type)
        return;
      const n = t.getOptions().stackParser;
      Eo(n, e);
    });
  }
});
function To(t) {
  const e = "console";
  Pn(e, t), Dn(e, Vc);
}
function Vc() {
  "console" in b && Cn.forEach(function(t) {
    t in b.console && It(b.console, t, function(e) {
      return Ae[t] = e, function(...n) {
        $n("console", { args: n, level: t });
        const s = Ae[t];
        s == null || s.apply(b.console, n);
      };
    });
  });
}
function os(t) {
  return t === "warn" ? "warning" : ["fatal", "error", "warning", "log", "info", "debug"].includes(t) ? t : "log";
}
const Kc = "CaptureConsole", Xc = ((t = {}) => {
  var r;
  const e = t.levels || Cn, n = (r = t.handled) != null ? r : !0;
  return {
    name: Kc,
    setup(s) {
      "console" in b && To(({ args: o, level: i }) => {
        k() !== s || !e.includes(i) || Zc(o, i, n);
      });
    }
  };
}), dp = Xc;
function Zc(t, e, n) {
  const r = os(e), s = new Error(), o = {
    level: os(e),
    extra: {
      arguments: t
    }
  };
  it((i) => {
    if (i.addEventProcessor((u) => (u.logger = "console", kt(u, {
      handled: n,
      type: "auto.core.capture_console"
    }), u)), e === "assert") {
      if (!t[0]) {
        const u = `Assertion failed: ${Ir(t.slice(1), " ") || "console.assert"}`;
        i.setExtra("arguments", t.slice(1)), i.captureMessage(u, r, { captureContext: o, syntheticException: s });
      }
      return;
    }
    const a = t.find((u) => u instanceof Error);
    if (a) {
      x(a, o);
      return;
    }
    const c = Ir(t, " ");
    i.captureMessage(c, r, { captureContext: o, syntheticException: s });
  });
}
const Qc = "ExtraErrorData", tu = ((t = {}) => {
  const { depth: e = 3, captureErrorCause: n = !0 } = t;
  return {
    name: Qc,
    processEvent(r, s, o) {
      const { maxValueLength: i } = o.getOptions();
      return eu(r, s, e, n, i);
    }
  };
}), mp = tu;
function eu(t, e = {}, n, r, s) {
  if (!e.originalException || !lt(e.originalException))
    return t;
  const o = e.originalException.name || e.originalException.constructor.name, i = Io(e.originalException, r, s);
  if (i) {
    const a = f({}, t.contexts), c = F(i, n);
    return _t(c) && (G(c, "__sentry_skip_normalization__", !0), a[o] = c), E(f({}, t), {
      contexts: a
    });
  }
  return t;
}
function Io(t, e, n) {
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
      s[o] = lt(i) || typeof i == "string" ? n ? Xt(`${i}`, n) : `${i}` : i;
    }
    if (e && t.cause !== void 0)
      if (lt(t.cause)) {
        const o = t.cause.name || t.cause.constructor.name;
        s.cause = { [o]: Io(t.cause, !1, n) };
      } else
        s.cause = t.cause;
    if (typeof t.toJSON == "function") {
      const o = t.toJSON();
      for (const i of Object.keys(o)) {
        const a = o[i];
        s[i] = lt(a) ? a.toString() : a;
      }
    }
    return s;
  } catch (r) {
    S && g.error("Unable to extract extra data from the Error object:", r);
  }
  return null;
}
function nu(t, e) {
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
const ru = /^(\S+:\\|\/?)([\s\S]*?)((?:\.{1,2}|[^/\\]+?|)(\.[^./\\]*|))(?:[/\\]*)$/;
function su(t) {
  const e = t.length > 1024 ? `<truncated>${t.slice(-1024)}` : t, n = ru.exec(e);
  return n ? n.slice(1) : [];
}
function is(...t) {
  let e = "", n = !1;
  for (let r = t.length - 1; r >= -1 && !n; r--) {
    const s = r >= 0 ? t[r] : "/";
    s && (e = `${s}/${e}`, n = s.charAt(0) === "/");
  }
  return e = nu(
    e.split("/").filter((r) => !!r),
    !n
  ).join("/"), (n ? "/" : "") + e || ".";
}
function as(t) {
  let e = 0;
  for (; e < t.length && t[e] === ""; e++)
    ;
  let n = t.length - 1;
  for (; n >= 0 && t[n] === ""; n--)
    ;
  return e > n ? [] : t.slice(e, n - e + 1);
}
function ou(t, e) {
  t = is(t).slice(1), e = is(e).slice(1);
  const n = as(t.split("/")), r = as(e.split("/")), s = Math.min(n.length, r.length);
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
function iu(t, e) {
  return su(t)[2] || "";
}
const au = "RewriteFrames", _p = (t = {}) => {
  const e = t.root, n = t.prefix || "app:///", r = "window" in b && !!b.window, s = t.iteratee || cu({ isBrowser: r, root: e, prefix: n });
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
    name: au,
    processEvent(a) {
      let c = a;
      return a.exception && Array.isArray(a.exception.values) && (c = o(c)), c;
    }
  };
};
function cu({
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
      const i = s ? r.filename.replace(/^[a-zA-Z]:/, "").replace(/\\/g, "/") : r.filename, a = e ? ou(e, i) : iu(i);
      r.filename = `${n}${a}`;
    }
    return r;
  };
}
const uu = [
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
], lu = [
  "createUser",
  "deleteUser",
  "listUsers",
  "getUserById",
  "updateUserById",
  "inviteUserByEmail"
], fu = {
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
}, Ao = ["select", "insert", "upsert", "update", "delete"];
function tn(t) {
  try {
    t.__SENTRY_INSTRUMENTED__ = !0;
  } catch (e) {
  }
}
function en(t) {
  try {
    return t.__SENTRY_INSTRUMENTED__;
  } catch (e) {
    return !1;
  }
}
function pu(t, e = {}) {
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
function du(t, e) {
  if (e === "" || e === "*")
    return "select(*)";
  if (t === "select")
    return `select(${e})`;
  if (t === "or" || t.endsWith(".or"))
    return `${t}${e}`;
  const [n, ...r] = e.split(".");
  let s;
  return n != null && n.startsWith("fts") ? s = "textSearch" : n != null && n.startsWith("plfts") ? s = "textSearch[plain]" : n != null && n.startsWith("phfts") ? s = "textSearch[phrase]" : n != null && n.startsWith("wfts") ? s = "textSearch[websearch]" : s = n && fu[n] || "filter", `${s}(${t}, ${r.join(".")})`;
}
function cs(t, e = !1) {
  return new Proxy(t, {
    apply(n, r, s) {
      return se(
        {
          name: `auth ${e ? "(admin) " : ""}${t.name}`,
          attributes: {
            [W]: "auto.db.supabase",
            [Zt]: "db",
            "db.system": "postgresql",
            "db.operation": `auth.${e ? "admin." : ""}${t.name}`
          }
        },
        (o) => Reflect.apply(n, r, s).then((i) => (i && typeof i == "object" && "error" in i && i.error ? (o.setStatus({ code: N }), x(i.error, {
          mechanism: {
            handled: !1,
            type: "auto.db.supabase.auth"
          }
        })) : o.setStatus({ code: We }), o.end(), i)).catch((i) => {
          throw o.setStatus({ code: N }), o.end(), x(i, {
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
function mu(t) {
  const e = t.auth;
  if (!(!e || en(t.auth))) {
    for (const n of uu) {
      const r = e[n];
      r && typeof t.auth[n] == "function" && (t.auth[n] = cs(r));
    }
    for (const n of lu) {
      const r = e.admin[n];
      r && typeof t.auth.admin[n] == "function" && (t.auth.admin[n] = cs(r, !0));
    }
    tn(t.auth);
  }
}
function _u(t) {
  en(t.prototype.from) || (t.prototype.from = new Proxy(
    t.prototype.from,
    {
      apply(e, n, r) {
        const s = Reflect.apply(e, n, r), o = s.constructor;
        return hu(o), s;
      }
    }
  ), tn(t.prototype.from));
}
function gu(t) {
  en(t.prototype.then) || (t.prototype.then = new Proxy(
    t.prototype.then,
    {
      apply(e, n, r) {
        var l;
        const s = Ao, o = n, i = pu(o.method, o.headers);
        if (!s.includes(i) || !((l = o == null ? void 0 : o.url) != null && l.pathname) || typeof o.url.pathname != "string")
          return Reflect.apply(e, n, r);
        const a = o.url.pathname.split("/"), c = a.length > 0 ? a[a.length - 1] : "", u = [];
        for (const [_, y] of o.url.searchParams.entries())
          u.push(du(_, y));
        const d = /* @__PURE__ */ Object.create(null);
        if (_t(o.body))
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
          [W]: "auto.db.supabase",
          [Zt]: "db"
        };
        return u.length && (m["db.query"] = u), Object.keys(d).length && (m["db.body"] = d), se(
          {
            name: p,
            attributes: m
          },
          (_) => Reflect.apply(e, n, []).then(
            (y) => {
              if (_ && (y && typeof y == "object" && "status" in y && Or(_, y.status || 500), _.end()), y.error) {
                const R = new Error(y.error.message);
                y.error.code && (R.code = y.error.code), y.error.details && (R.details = y.error.details);
                const w = {};
                u.length && (w.query = u), Object.keys(d).length && (w.body = d), x(R, (U) => (U.addEventProcessor((Y) => (kt(Y, {
                  handled: !1,
                  type: "auto.db.supabase.postgres"
                }), Y)), U.setContext("supabase", w), U));
              }
              const h = {
                type: "supabase",
                category: `db.${i}`,
                message: p
              }, I = {};
              return u.length && (I.query = u), Object.keys(d).length && (I.body = d), Object.keys(I).length && (h.data = I), wc(h), y;
            },
            (y) => {
              throw _ && (Or(_, 500), _.end()), y;
            }
          ).then(...r)
        );
      }
    }
  ), tn(t.prototype.then));
}
function hu(t) {
  for (const e of Ao)
    en(t.prototype[e]) || (t.prototype[e] = new Proxy(
      t.prototype[e],
      {
        apply(n, r, s) {
          const o = Reflect.apply(n, r, s), i = o.constructor;
          return S && g.log(`Instrumenting ${e} operation's PostgRESTFilterBuilder`), gu(i), o;
        }
      }
    ), tn(t.prototype[e]));
}
const yu = (t) => {
  if (!t) {
    S && g.warn("Supabase integration was not installed because no Supabase client was provided.");
    return;
  }
  const e = t.constructor === Function ? t : t.constructor;
  _u(e), mu(t);
}, Su = "Supabase", Eu = ((t) => ({
  setupOnce() {
    yu(t);
  },
  name: Su
})), gp = (t) => Eu(t.supabaseClient), bu = 10, Tu = "ZodErrors";
function Iu(t) {
  return lt(t) && t.name === "ZodError" && Array.isArray(t.issues);
}
function Au(t) {
  return E(f({}, t), {
    path: "path" in t && Array.isArray(t.path) ? t.path.join(".") : void 0,
    keys: "keys" in t ? JSON.stringify(t.keys) : void 0,
    unionErrors: "unionErrors" in t ? JSON.stringify(t.unionErrors) : void 0
  });
}
function Nu(t) {
  return t.map((e) => typeof e == "number" ? "<array>" : e).join(".");
}
function Ru(t) {
  const e = /* @__PURE__ */ new Set();
  for (const r of t.issues) {
    const s = Nu(r.path);
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
function Ou(t, e = !1, n, r) {
  var s;
  if (!((s = n.exception) != null && s.values) || !r.originalException || !Iu(r.originalException) || r.originalException.issues.length === 0)
    return n;
  try {
    const i = (e ? r.originalException.issues : r.originalException.issues.slice(0, t)).map(Au);
    return e && (Array.isArray(r.attachments) || (r.attachments = []), r.attachments.push({
      filename: "zod_issues.json",
      data: JSON.stringify({
        issues: i
      })
    })), E(f({}, n), {
      exception: E(f({}, n.exception), {
        values: [
          E(f({}, n.exception.values[0]), {
            value: Ru(r.originalException)
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
const ku = ((t = {}) => {
  var n;
  const e = (n = t.limit) != null ? n : bu;
  return {
    name: Tu,
    processEvent(r, s) {
      return Ou(e, t.saveZodIssuesAsAttachment, r, s);
    }
  };
}), hp = ku, yp = (t) => ({
  name: "ThirdPartyErrorsFilter",
  setup(e) {
    e.on("beforeEnvelope", (n) => {
      Qt(n, (r, s) => {
        if (s === "event") {
          const o = Array.isArray(r) ? r[1] : void 0;
          o && (bo(o), r[1] = o);
        }
      });
    }), e.on("applyFrameMetadata", (n) => {
      if (n.type)
        return;
      const r = e.getOptions().stackParser;
      Eo(r, n);
    });
  },
  processEvent(e) {
    const n = Mu(e);
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
function Mu(t) {
  const e = Zo(t);
  if (e)
    return e.filter((n) => {
      var r;
      return !!n.filename && ((r = n.lineno) != null ? r : n.colno) != null;
    }).map((n) => n.module_metadata ? Object.keys(n.module_metadata).filter((r) => r.startsWith(us)).map((r) => r.slice(us.length)) : []);
}
const us = "_sentryBundlerPluginAppKey:", vu = 100, Cu = 10, ge = "flag.evaluation.";
function wu(t) {
  const n = O().getScopeData().contexts.flags, r = n ? n.values : [];
  return r.length && (t.contexts === void 0 && (t.contexts = {}), t.contexts.flags = { values: [...r] }), t;
}
function xu(t, e, n = vu) {
  const r = O().getScopeData().contexts;
  r.flags || (r.flags = { values: [] });
  const s = r.flags.values;
  Pu(s, t, e, n);
}
function Pu(t, e, n, r) {
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
function Du(t, e, n = Cu) {
  if (typeof e != "boolean")
    return;
  const r = jt();
  if (!r)
    return;
  const s = A(r).data;
  if (`${ge}${t}` in s) {
    r.setAttribute(`${ge}${t}`, e);
    return;
  }
  Object.keys(s).filter((i) => i.startsWith(ge)).length < n && r.setAttribute(`${ge}${t}`, e);
}
const Sp = () => ({
  name: "FeatureFlags",
  processEvent(t, e, n) {
    return wu(t);
  },
  addFeatureFlag(t, e) {
    xu(t, e), Du(t, e);
  }
});
function Bt(t, e, n, r, s) {
  ve({ level: t, message: e, attributes: n, severityNumber: s }, r);
}
function $u(t, e, { scope: n } = {}) {
  Bt("trace", t, e, n);
}
function Lu(t, e, { scope: n } = {}) {
  Bt("debug", t, e, n);
}
function Fu(t, e, { scope: n } = {}) {
  Bt("info", t, e, n);
}
function Uu(t, e, { scope: n } = {}) {
  Bt("warn", t, e, n);
}
function ju(t, e, { scope: n } = {}) {
  Bt("error", t, e, n);
}
function Bu(t, e, { scope: n } = {}) {
  Bt("fatal", t, e, n);
}
const Ep = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  debug: Lu,
  error: ju,
  fatal: Bu,
  fmt: Mc,
  info: Fu,
  trace: $u,
  warn: Uu
}, Symbol.toStringTag, { value: "Module" }));
function On(t, e, n) {
  return "util" in b && typeof b.util.format == "function" ? b.util.format(...t) : Gu(t, e, n);
}
function Gu(t, e, n) {
  return t.map(
    (r) => Fn(r) ? String(r) : JSON.stringify(F(r, e, n))
  ).join(" ");
}
function Hu(t) {
  return /%[sdifocO]/.test(t);
}
function qu(t, e) {
  const n = {}, r = new Array(e.length).fill("{}").join(" ");
  return n["sentry.message.template"] = `${t} ${r}`, e.forEach((s, o) => {
    n[`sentry.message.parameter.${o}`] = s;
  }), n;
}
const Ju = "ConsoleLogs", ls = {
  [W]: "auto.log.console"
}, zu = ((t = {}) => {
  const e = t.levels || Cn;
  return {
    name: Ju,
    setup(n) {
      const { enableLogs: r, normalizeDepth: s = 3, normalizeMaxBreadth: o = 1e3 } = n.getOptions();
      if (!r) {
        S && g.warn("`enableLogs` is not enabled, ConsoleLogs integration disabled");
        return;
      }
      To(({ args: i, level: a }) => {
        if (k() !== n || !e.includes(a))
          return;
        const c = i[0], u = i.slice(1);
        if (a === "assert") {
          if (!c) {
            const l = u.length > 0 ? `Assertion failed: ${On(u, s, o)}` : "Assertion failed";
            ve({ level: "error", message: l, attributes: ls });
          }
          return;
        }
        const d = a === "log", p = i.length > 1 && typeof i[0] == "string" && !Hu(i[0]), m = f(f({}, ls), p ? qu(c, u) : {});
        ve({
          level: d ? "info" : a,
          message: On(i, s, o),
          severityNumber: d ? 10 : void 0,
          attributes: m
        });
      });
    }
  };
}), bp = zu;
function tr(t, e, n, r) {
  ac(
    { type: t, name: e, value: n, unit: r == null ? void 0 : r.unit, attributes: r == null ? void 0 : r.attributes },
    { scope: r == null ? void 0 : r.scope }
  );
}
function Wu(t, e = 1, n) {
  tr("counter", t, e, n);
}
function Yu(t, e, n) {
  tr("gauge", t, e, n);
}
function Vu(t, e, n) {
  tr("distribution", t, e, n);
}
const Tp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  count: Wu,
  distribution: Vu,
  gauge: Yu
}, Symbol.toStringTag, { value: "Module" })), Ku = ["trace", "debug", "info", "warn", "error", "fatal"];
function Ip(t = {}) {
  var r;
  const e = new Set((r = t.levels) != null ? r : Ku), n = t.client;
  return {
    log(s) {
      const R = s, { type: o, level: i, message: a, args: c, tag: u, date: d } = R, p = un(R, ["type", "level", "message", "args", "tag", "date"]), m = n || k();
      if (!m)
        return;
      const l = Qu(o, i);
      if (!e.has(l))
        return;
      const { normalizeDepth: _ = 3, normalizeMaxBreadth: y = 1e3 } = m.getOptions(), h = [];
      a && h.push(a), c && c.length > 0 && h.push(On(c, _, y));
      const I = h.join(" ");
      p["sentry.origin"] = "auto.log.consola", u && (p["consola.tag"] = u), o && (p["consola.type"] = o), i != null && typeof i == "number" && (p["consola.level"] = i), ve({
        level: l,
        message: I,
        attributes: p
      });
    }
  };
}
const Xu = {
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
}, Zu = {
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
function Qu(t, e) {
  if (t === "verbose")
    return "debug";
  if (t === "silent")
    return "trace";
  if (t) {
    const n = Xu[t];
    if (n)
      return n;
  }
  if (typeof e == "number") {
    const n = Zu[e];
    if (n)
      return n;
  }
  return "info";
}
const tl = "gen_ai.prompt", er = "gen_ai.system", B = "gen_ai.request.model", No = "gen_ai.request.stream", nr = "gen_ai.request.temperature", Ro = "gen_ai.request.max_tokens", rr = "gen_ai.request.frequency_penalty", Oo = "gen_ai.request.presence_penalty", sr = "gen_ai.request.top_p", ko = "gen_ai.request.top_k", el = "gen_ai.request.encoding_format", nl = "gen_ai.request.dimensions", Gt = "gen_ai.response.finish_reasons", Ht = "gen_ai.response.model", oe = "gen_ai.response.id", nn = "gen_ai.usage.input_tokens", rn = "gen_ai.usage.output_tokens", sn = "gen_ai.usage.total_tokens", or = "gen_ai.operation.name", dt = "gen_ai.request.messages", J = "gen_ai.response.text", ir = "gen_ai.request.available_tools", on = "gen_ai.response.streaming", ct = "gen_ai.response.tool_calls", rl = "openai.response.id", Mo = "openai.response.model", sl = "openai.response.timestamp", ol = "openai.usage.completion_tokens", il = "openai.usage.prompt_tokens", hn = {
  CHAT: "chat",
  RESPONSES: "responses",
  EMBEDDINGS: "embeddings"
}, fs = "anthropic.response.timestamp", vo = 2e4, we = (t) => new TextEncoder().encode(t).length, xe = (t) => we(JSON.stringify(t));
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
function al(t) {
  return typeof t == "string" ? t : t.text;
}
function ps(t, e) {
  return typeof t == "string" ? e : E(f({}, t), { text: e });
}
function cl(t) {
  return t !== null && typeof t == "object" && "content" in t && typeof t.content == "string";
}
function ul(t) {
  return t !== null && typeof t == "object" && "parts" in t && Array.isArray(t.parts) && t.parts.length > 0;
}
function ll(t, e) {
  const n = E(f({}, t), { content: "" }), r = xe(n), s = e - r;
  if (s <= 0)
    return [];
  const o = ar(t.content, s);
  return [E(f({}, t), { content: o })];
}
function fl(t, e) {
  const { parts: n } = t, r = n.map((a) => ps(a, "")), s = xe(E(f({}, t), { parts: r }));
  let o = e - s;
  if (o <= 0)
    return [];
  const i = [];
  for (const a of n) {
    const c = al(a), u = we(c);
    if (u <= o)
      i.push(a), o -= u;
    else if (i.length === 0) {
      const d = ar(c, o);
      d && i.push(ps(a, d));
      break;
    } else
      break;
  }
  return i.length > 0 ? [E(f({}, t), { parts: i })] : [];
}
function pl(t, e) {
  return !t || typeof t != "object" ? [] : cl(t) ? ll(t, e) : ul(t) ? fl(t, e) : [];
}
function dl(t, e) {
  if (!Array.isArray(t) || t.length === 0 || xe(t) <= e)
    return t;
  const r = t.map(xe);
  let s = 0, o = t.length;
  for (let i = t.length - 1; i >= 0; i--) {
    const a = r[i];
    if (a && s + a > e)
      break;
    a && (s += a), o = i;
  }
  if (o === t.length) {
    const i = t[t.length - 1];
    return pl(i, e);
  }
  return t.slice(o);
}
function ml(t) {
  return dl(t, vo);
}
function _l(t) {
  return ar(t, vo);
}
function ie(t) {
  return t.includes("messages") ? "messages" : t.includes("completions") ? "completions" : t.includes("models") ? "models" : t.includes("chat") ? "chat" : t.split(".").pop() || "unknown";
}
function Pe(t) {
  return `gen_ai.${ie(t)}`;
}
function Co(t, e) {
  return t ? `${t}.${e}` : e;
}
function cr(t, e, n, r, s) {
  if (e !== void 0 && t.setAttributes({
    [nn]: e
  }), n !== void 0 && t.setAttributes({
    [rn]: n
  }), e !== void 0 || n !== void 0 || r !== void 0 || s !== void 0) {
    const o = (e != null ? e : 0) + (n != null ? n : 0) + (r != null ? r : 0) + (s != null ? s : 0);
    t.setAttributes({
      [sn]: o
    });
  }
}
function mt(t) {
  if (typeof t == "string")
    return _l(t);
  if (Array.isArray(t)) {
    const e = ml(t);
    return JSON.stringify(e);
  }
  return JSON.stringify(t);
}
const gl = "OpenAI", hl = ["responses.create", "chat.completions.create", "embeddings.create"], yl = [
  "response.output_item.added",
  "response.function_call_arguments.delta",
  "response.function_call_arguments.done",
  "response.output_item.done"
], Sl = [
  "response.created",
  "response.in_progress",
  "response.failed",
  "response.completed",
  "response.incomplete",
  "response.queued",
  "response.output_text.delta",
  ...yl
];
function ur(t) {
  return t.includes("chat.completions") ? hn.CHAT : t.includes("responses") ? hn.RESPONSES : t.includes("embeddings") ? hn.EMBEDDINGS : t.split(".").pop() || "unknown";
}
function ds(t) {
  return `gen_ai.${ur(t)}`;
}
function El(t) {
  return hl.includes(t);
}
function bl(t, e) {
  return t ? `${t}.${e}` : e;
}
function Tl(t) {
  return t !== null && typeof t == "object" && "object" in t && t.object === "chat.completion";
}
function Il(t) {
  return t !== null && typeof t == "object" && "object" in t && t.object === "response";
}
function Al(t) {
  if (t === null || typeof t != "object" || !("object" in t))
    return !1;
  const e = t;
  return e.object === "list" && typeof e.model == "string" && e.model.toLowerCase().includes("embedding");
}
function Nl(t) {
  return t !== null && typeof t == "object" && "type" in t && typeof t.type == "string" && t.type.startsWith("response.");
}
function Rl(t) {
  return t !== null && typeof t == "object" && "object" in t && t.object === "chat.completion.chunk";
}
function Ol(t, e, n) {
  if (lr(t, e.id, e.model, e.created), e.usage && an(
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
        [ct]: JSON.stringify(s)
      });
    }
  }
}
function kl(t, e, n) {
  if (lr(t, e.id, e.model, e.created_at), e.status && t.setAttributes({
    [Gt]: JSON.stringify([e.status])
  }), e.usage && an(
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
        [ct]: JSON.stringify(s)
      });
    }
  }
}
function Ml(t, e) {
  t.setAttributes({
    [Mo]: e.model,
    [Ht]: e.model
  }), e.usage && an(t, e.usage.prompt_tokens, void 0, e.usage.total_tokens);
}
function an(t, e, n, r) {
  e !== void 0 && t.setAttributes({
    [il]: e,
    [nn]: e
  }), n !== void 0 && t.setAttributes({
    [ol]: n,
    [rn]: n
  }), r !== void 0 && t.setAttributes({
    [sn]: r
  });
}
function lr(t, e, n, r) {
  t.setAttributes({
    [rl]: e,
    [oe]: e
  }), t.setAttributes({
    [Mo]: n,
    [Ht]: n
  }), t.setAttributes({
    [sl]: new Date(r * 1e3).toISOString()
  });
}
function vl(t, e) {
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
function Cl(t, e, n) {
  var r, s, o, i, a, c;
  e.responseId = (r = t.id) != null ? r : e.responseId, e.responseModel = (s = t.model) != null ? s : e.responseModel, e.responseTimestamp = (o = t.created) != null ? o : e.responseTimestamp, t.usage && (e.promptTokens = t.usage.prompt_tokens, e.completionTokens = t.usage.completion_tokens, e.totalTokens = t.usage.total_tokens);
  for (const u of (i = t.choices) != null ? i : [])
    n && ((a = u.delta) != null && a.content && e.responseTexts.push(u.delta.content), (c = u.delta) != null && c.tool_calls && vl(u.delta.tool_calls, e)), u.finish_reason && e.finishReasons.push(u.finish_reason);
}
function wl(t, e, n, r) {
  var o, i, a;
  if (!(t && typeof t == "object")) {
    e.eventTypes.push("unknown:non-object");
    return;
  }
  if (t instanceof Error) {
    r.setStatus({ code: N, message: "internal_error" }), x(t, {
      mechanism: {
        handled: !1,
        type: "auto.ai.openai.stream-response"
      }
    });
    return;
  }
  if (!("type" in t)) return;
  const s = t;
  if (!Sl.includes(s.type)) {
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
  return pe(this, null, function* () {
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
        for (var s = de(t), o, i, a; o = !(i = yield new nt(s.next())).done; o = !1) {
          const c = i.value;
          Rl(c) ? Cl(c, r, n) : Nl(c) && wl(c, r, n, e), yield c;
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
      lr(e, r.responseId, r.responseModel, r.responseTimestamp), an(e, r.promptTokens, r.completionTokens, r.totalTokens), e.setAttributes({
        [on]: !0
      }), r.finishReasons.length && e.setAttributes({
        [Gt]: JSON.stringify(r.finishReasons)
      }), n && r.responseTexts.length && e.setAttributes({
        [J]: r.responseTexts.join("")
      });
      const u = [...Object.values(r.chatCompletionToolCalls), ...r.responsesApiToolCalls];
      u.length > 0 && e.setAttributes({
        [ct]: JSON.stringify(u)
      }), e.end();
    }
  });
}
function Pl(t, e) {
  var r;
  const n = {
    [er]: "openai",
    [or]: ur(e),
    [W]: "auto.ai.openai"
  };
  if (t.length > 0 && typeof t[0] == "object" && t[0] !== null) {
    const s = t[0], o = Array.isArray(s.tools) ? s.tools : [], a = s.web_search_options && typeof s.web_search_options == "object" ? [f({ type: "web_search_options" }, s.web_search_options)] : [], c = [...o, ...a];
    c.length > 0 && (n[ir] = JSON.stringify(c));
  }
  if (t.length > 0 && typeof t[0] == "object" && t[0] !== null) {
    const s = t[0];
    n[B] = (r = s.model) != null ? r : "unknown", "temperature" in s && (n[nr] = s.temperature), "top_p" in s && (n[sr] = s.top_p), "frequency_penalty" in s && (n[rr] = s.frequency_penalty), "presence_penalty" in s && (n[Oo] = s.presence_penalty), "stream" in s && (n[No] = s.stream), "encoding_format" in s && (n[el] = s.encoding_format), "dimensions" in s && (n[nl] = s.dimensions);
  } else
    n[B] = "unknown";
  return n;
}
function Dl(t, e, n) {
  var s;
  if (!e || typeof e != "object") return;
  const r = e;
  if (Tl(r)) {
    if (Ol(t, r, n), n && ((s = r.choices) != null && s.length)) {
      const o = r.choices.map((i) => {
        var a;
        return ((a = i.message) == null ? void 0 : a.content) || "";
      });
      t.setAttributes({ [J]: JSON.stringify(o) });
    }
  } else Il(r) ? (kl(t, r, n), n && r.output_text && t.setAttributes({ [J]: r.output_text })) : Al(r) && Ml(t, r);
}
function ms(t, e) {
  if ("messages" in e) {
    const n = mt(e.messages);
    t.setAttributes({ [dt]: n });
  }
  if ("input" in e) {
    const n = mt(e.input);
    t.setAttributes({ [dt]: n });
  }
}
function $l() {
  var s, o, i, a;
  const e = O().getClient(), n = e == null ? void 0 : e.getIntegrationByName(gl), r = n ? !!(e != null && e.getOptions().sendDefaultPii) : !1;
  return {
    recordInputs: (o = (s = n == null ? void 0 : n.options) == null ? void 0 : s.recordInputs) != null ? o : r,
    recordOutputs: (a = (i = n == null ? void 0 : n.options) == null ? void 0 : i.recordOutputs) != null ? a : r
  };
}
function Ll(t, e, n, r) {
  return function(...o) {
    return D(this, null, function* () {
      const i = r || $l(), a = Pl(o, e), c = a[B] || "unknown", u = ur(e), d = o[0];
      return d && typeof d == "object" && d.stream === !0 ? Me(
        {
          name: `${u} ${c} stream-response`,
          op: ds(e),
          attributes: a
        },
        (m) => D(null, null, function* () {
          var l;
          try {
            i.recordInputs && o[0] && typeof o[0] == "object" && ms(m, o[0]);
            const _ = yield t.apply(n, o);
            return xl(
              _,
              m,
              (l = i.recordOutputs) != null ? l : !1
            );
          } catch (_) {
            throw m.setStatus({ code: N, message: "internal_error" }), x(_, {
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
      ) : se(
        {
          name: `${u} ${c}`,
          op: ds(e),
          attributes: a
        },
        (m) => D(null, null, function* () {
          try {
            i.recordInputs && o[0] && typeof o[0] == "object" && ms(m, o[0]);
            const l = yield t.apply(n, o);
            return Dl(m, l, i.recordOutputs), l;
          } catch (l) {
            throw x(l, {
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
function wo(t, e = "", n) {
  return new Proxy(t, {
    get(r, s) {
      const o = r[s], i = bl(e, String(s));
      return typeof o == "function" && El(i) ? Ll(o, i, r, n) : typeof o == "function" ? o.bind(r) : o && typeof o == "object" ? wo(o, i, n) : o;
    }
  });
}
function Ap(t, e) {
  return wo(t, "", e);
}
function Fl(t, e) {
  var n, r;
  return "type" in t && typeof t.type == "string" && t.type === "error" ? (e.setStatus({ code: N, message: (r = (n = t.error) == null ? void 0 : n.type) != null ? r : "internal_error" }), x(t.error, {
    mechanism: {
      handled: !1,
      type: "auto.ai.anthropic.anthropic_error"
    }
  }), !0) : !1;
}
function Ul(t, e) {
  if (t.type === "message_delta" && t.usage && "output_tokens" in t.usage && typeof t.usage.output_tokens == "number" && (e.completionTokens = t.usage.output_tokens), t.message) {
    const n = t.message;
    n.id && (e.responseId = n.id), n.model && (e.responseModel = n.model), n.stop_reason && e.finishReasons.push(n.stop_reason), n.usage && (typeof n.usage.input_tokens == "number" && (e.promptTokens = n.usage.input_tokens), typeof n.usage.cache_creation_input_tokens == "number" && (e.cacheCreationInputTokens = n.usage.cache_creation_input_tokens), typeof n.usage.cache_read_input_tokens == "number" && (e.cacheReadInputTokens = n.usage.cache_read_input_tokens));
  }
}
function jl(t, e) {
  t.type !== "content_block_start" || typeof t.index != "number" || !t.content_block || (t.content_block.type === "tool_use" || t.content_block.type === "server_tool_use") && (e.activeToolBlocks[t.index] = {
    id: t.content_block.id,
    name: t.content_block.name,
    inputJsonParts: []
  });
}
function Bl(t, e, n) {
  if (!(t.type !== "content_block_delta" || !t.delta)) {
    if (typeof t.index == "number" && "partial_json" in t.delta && typeof t.delta.partial_json == "string") {
      const r = e.activeToolBlocks[t.index];
      r && r.inputJsonParts.push(t.delta.partial_json);
    }
    n && typeof t.delta.text == "string" && e.responseTexts.push(t.delta.text);
  }
}
function Gl(t, e) {
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
function xo(t, e, n, r) {
  !(t && typeof t == "object") || Fl(t, r) || (Ul(t, e), jl(t, e), Bl(t, e, n), Gl(t, e));
}
function Hl(t, e, n) {
  e.isRecording() && (t.responseId && e.setAttributes({
    [oe]: t.responseId
  }), t.responseModel && e.setAttributes({
    [Ht]: t.responseModel
  }), cr(
    e,
    t.promptTokens,
    t.completionTokens,
    t.cacheCreationInputTokens,
    t.cacheReadInputTokens
  ), e.setAttributes({
    [on]: !0
  }), t.finishReasons.length > 0 && e.setAttributes({
    [Gt]: JSON.stringify(t.finishReasons)
  }), n && t.responseTexts.length > 0 && e.setAttributes({
    [J]: t.responseTexts.join("")
  }), n && t.toolCalls.length > 0 && e.setAttributes({
    [ct]: JSON.stringify(t.toolCalls)
  }), e.end());
}
function ql(t, e, n) {
  return pe(this, null, function* () {
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
        for (var s = de(t), o, i, a; o = !(i = yield new nt(s.next())).done; o = !1) {
          const c = i.value;
          xo(c, r, n, e), yield c;
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
        [oe]: r.responseId
      }), r.responseModel && e.setAttributes({
        [Ht]: r.responseModel
      }), cr(
        e,
        r.promptTokens,
        r.completionTokens,
        r.cacheCreationInputTokens,
        r.cacheReadInputTokens
      ), e.setAttributes({
        [on]: !0
      }), r.finishReasons.length > 0 && e.setAttributes({
        [Gt]: JSON.stringify(r.finishReasons)
      }), n && r.responseTexts.length > 0 && e.setAttributes({
        [J]: r.responseTexts.join("")
      }), n && r.toolCalls.length > 0 && e.setAttributes({
        [ct]: JSON.stringify(r.toolCalls)
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
    xo(s, r, n, e);
  }), t.on("message", () => {
    Hl(r, e, n);
  }), t.on("error", (s) => {
    x(s, {
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
function Wl(t) {
  return zl.includes(t);
}
function Yl(t, e) {
  e.error && (t.setStatus({ code: N, message: e.error.type || "internal_error" }), x(e.error, {
    mechanism: {
      handled: !1,
      type: "auto.ai.anthropic.anthropic_error"
    }
  }));
}
function Vl(t, e) {
  var r;
  const n = {
    [er]: "anthropic",
    [or]: ie(e),
    [W]: "auto.ai.anthropic"
  };
  if (t.length > 0 && typeof t[0] == "object" && t[0] !== null) {
    const s = t[0];
    s.tools && Array.isArray(s.tools) && (n[ir] = JSON.stringify(s.tools)), n[B] = (r = s.model) != null ? r : "unknown", "temperature" in s && (n[nr] = s.temperature), "top_p" in s && (n[sr] = s.top_p), "stream" in s && (n[No] = s.stream), "top_k" in s && (n[ko] = s.top_k), "frequency_penalty" in s && (n[rr] = s.frequency_penalty), "max_tokens" in s && (n[Ro] = s.max_tokens);
  } else
    e === "models.retrieve" || e === "models.get" ? n[B] = t[0] : n[B] = "unknown";
  return n;
}
function kn(t, e) {
  if ("messages" in e) {
    const n = mt(e.messages);
    t.setAttributes({ [dt]: n });
  }
  if ("input" in e) {
    const n = mt(e.input);
    t.setAttributes({ [dt]: n });
  }
  "prompt" in e && t.setAttributes({ [tl]: JSON.stringify(e.prompt) });
}
function Kl(t, e) {
  if ("content" in e && Array.isArray(e.content)) {
    t.setAttributes({
      [J]: e.content.map((r) => r.text).filter((r) => !!r).join("")
    });
    const n = [];
    for (const r of e.content)
      (r.type === "tool_use" || r.type === "server_tool_use") && n.push(r);
    n.length > 0 && t.setAttributes({ [ct]: JSON.stringify(n) });
  }
  "completion" in e && t.setAttributes({ [J]: e.completion }), "input_tokens" in e && t.setAttributes({ [J]: JSON.stringify(e.input_tokens) });
}
function Xl(t, e) {
  "id" in e && "model" in e && (t.setAttributes({
    [oe]: e.id,
    [Ht]: e.model
  }), "created" in e && typeof e.created == "number" && t.setAttributes({
    [fs]: new Date(e.created * 1e3).toISOString()
  }), "created_at" in e && typeof e.created_at == "number" && t.setAttributes({
    [fs]: new Date(e.created_at * 1e3).toISOString()
  }), "usage" in e && e.usage && cr(
    t,
    e.usage.input_tokens,
    e.usage.output_tokens,
    e.usage.cache_creation_input_tokens,
    e.usage.cache_read_input_tokens
  ));
}
function Zl(t, e, n) {
  if (!(!e || typeof e != "object")) {
    if ("type" in e && e.type === "error") {
      Yl(t, e);
      return;
    }
    n && Kl(t, e), Xl(t, e);
  }
}
function _s(t, e, n) {
  throw x(t, {
    mechanism: { handled: !1, type: "auto.ai.anthropic", data: { function: n } }
  }), e.isRecording() && (e.setStatus({ code: N, message: "internal_error" }), e.end()), t;
}
function Ql(t, e, n, r, s, o, i, a, c, u, d) {
  var l;
  const p = (l = s[B]) != null ? l : "unknown", m = {
    name: `${o} ${p} stream-response`,
    op: Pe(i),
    attributes: s
  };
  return u && !d ? Me(m, (_) => D(null, null, function* () {
    var y;
    try {
      c.recordInputs && a && kn(_, a);
      const h = yield t.apply(n, r);
      return ql(
        h,
        _,
        (y = c.recordOutputs) != null ? y : !1
      );
    } catch (h) {
      return _s(h, _, i);
    }
  })) : Me(m, (_) => {
    var y;
    try {
      c.recordInputs && a && kn(_, a);
      const h = e.apply(n, r);
      return Jl(h, _, (y = c.recordOutputs) != null ? y : !1);
    } catch (h) {
      return _s(h, _, i);
    }
  });
}
function tf(t, e, n, r) {
  return new Proxy(t, {
    apply(s, o, i) {
      var l;
      const a = Vl(i, e), c = (l = a[B]) != null ? l : "unknown", u = ie(e), d = typeof i[0] == "object" ? i[0] : void 0, p = !!(d != null && d.stream), m = e === "messages.stream";
      return p || m ? Ql(
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
      ) : se(
        {
          name: `${u} ${c}`,
          op: Pe(e),
          attributes: a
        },
        (_) => (r.recordInputs && d && kn(_, d), Ke(
          () => s.apply(n, i),
          (y) => {
            x(y, {
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
          (y) => Zl(_, y, r.recordOutputs)
        ))
      );
    }
  });
}
function Po(t, e = "", n) {
  return new Proxy(t, {
    get(r, s) {
      const o = r[s], i = Co(e, String(s));
      return typeof o == "function" && Wl(i) ? tf(o, i, r, n) : typeof o == "function" ? o.bind(r) : o && typeof o == "object" ? Po(o, i, n) : o;
    }
  });
}
function Np(t, e) {
  var s;
  const n = !!((s = k()) != null && s.getOptions().sendDefaultPii), r = f({
    recordInputs: n,
    recordOutputs: n
  }, e);
  return Po(t, "", r);
}
const gs = [
  "models.generateContent",
  "models.generateContentStream",
  "chats.create",
  "sendMessage",
  "sendMessageStream"
], ef = "google_genai", Do = "chats.create", nf = "chat";
function rf(t, e) {
  var r;
  const n = t == null ? void 0 : t.promptFeedback;
  if (n != null && n.blockReason) {
    const s = (r = n.blockReasonMessage) != null ? r : n.blockReason;
    return e.setStatus({ code: N, message: `Content blocked: ${s}` }), x(`Content blocked: ${s}`, {
      mechanism: { handled: !1, type: "auto.ai.google_genai" }
    }), !0;
  }
  return !1;
}
function sf(t, e) {
  typeof t.responseId == "string" && (e.responseId = t.responseId), typeof t.modelVersion == "string" && (e.responseModel = t.modelVersion);
  const n = t.usageMetadata;
  n && (typeof n.promptTokenCount == "number" && (e.promptTokens = n.promptTokenCount), typeof n.candidatesTokenCount == "number" && (e.completionTokens = n.candidatesTokenCount), typeof n.totalTokenCount == "number" && (e.totalTokens = n.totalTokenCount));
}
function of(t, e, n) {
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
function af(t, e, n, r) {
  !t || rf(t, r) || (sf(t, e), of(t, e, n));
}
function cf(t, e, n) {
  return pe(this, null, function* () {
    const r = {
      responseTexts: [],
      finishReasons: [],
      toolCalls: []
    };
    try {
      try {
        for (var s = de(t), o, i, a; o = !(i = yield new nt(s.next())).done; o = !1) {
          const c = i.value;
          af(c, r, n, e), yield c;
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
        [on]: !0
      };
      r.responseId && (c[oe] = r.responseId), r.responseModel && (c[Ht] = r.responseModel), r.promptTokens !== void 0 && (c[nn] = r.promptTokens), r.completionTokens !== void 0 && (c[rn] = r.completionTokens), r.totalTokens !== void 0 && (c[sn] = r.totalTokens), r.finishReasons.length && (c[Gt] = JSON.stringify(r.finishReasons)), n && r.responseTexts.length && (c[J] = r.responseTexts.join("")), n && r.toolCalls.length && (c[ct] = JSON.stringify(r.toolCalls)), e.setAttributes(c), e.end();
    }
  });
}
function uf(t) {
  if (gs.includes(t))
    return !0;
  const e = t.split(".").pop();
  return gs.includes(e);
}
function lf(t) {
  return t.includes("Stream") || t.endsWith("generateContentStream") || t.endsWith("sendMessageStream");
}
function hs(t, e) {
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
function ff(t) {
  const e = {};
  return "temperature" in t && typeof t.temperature == "number" && (e[nr] = t.temperature), "topP" in t && typeof t.topP == "number" && (e[sr] = t.topP), "topK" in t && typeof t.topK == "number" && (e[ko] = t.topK), "maxOutputTokens" in t && typeof t.maxOutputTokens == "number" && (e[Ro] = t.maxOutputTokens), "frequencyPenalty" in t && typeof t.frequencyPenalty == "number" && (e[rr] = t.frequencyPenalty), "presencePenalty" in t && typeof t.presencePenalty == "number" && (e[Oo] = t.presencePenalty), e;
}
function pf(t, e, n) {
  const r = {
    [er]: ef,
    [or]: ie(t),
    [W]: "auto.ai.google_genai"
  };
  if (e) {
    if (r[B] = hs(e, n), "config" in e && typeof e.config == "object" && e.config) {
      const s = e.config;
      if (Object.assign(r, ff(s)), "tools" in s && Array.isArray(s.tools)) {
        const o = s.tools.flatMap(
          (i) => i.functionDeclarations
        );
        r[ir] = JSON.stringify(o);
      }
    }
  } else
    r[B] = hs({}, n);
  return r;
}
function ys(t, e) {
  if ("contents" in e) {
    const n = e.contents, r = mt(n);
    t.setAttributes({ [dt]: r });
  }
  if ("message" in e) {
    const n = e.message, r = mt(n);
    t.setAttributes({ [dt]: r });
  }
  if ("history" in e) {
    const n = e.history, r = mt(n);
    t.setAttributes({ [dt]: r });
  }
}
function df(t, e, n) {
  if (!(!e || typeof e != "object")) {
    if (e.usageMetadata && typeof e.usageMetadata == "object") {
      const r = e.usageMetadata;
      typeof r.promptTokenCount == "number" && t.setAttributes({
        [nn]: r.promptTokenCount
      }), typeof r.candidatesTokenCount == "number" && t.setAttributes({
        [rn]: r.candidatesTokenCount
      }), typeof r.totalTokenCount == "number" && t.setAttributes({
        [sn]: r.totalTokenCount
      });
    }
    if (n && Array.isArray(e.candidates) && e.candidates.length > 0) {
      const r = e.candidates.map((s) => {
        var o;
        return (o = s.content) != null && o.parts && Array.isArray(s.content.parts) ? s.content.parts.map((i) => typeof i.text == "string" ? i.text : "").filter((i) => i.length > 0).join("") : "";
      }).filter((s) => s.length > 0);
      r.length > 0 && t.setAttributes({
        [J]: r.join("")
      });
    }
    if (n && e.functionCalls) {
      const r = e.functionCalls;
      Array.isArray(r) && r.length > 0 && t.setAttributes({
        [ct]: JSON.stringify(r)
      });
    }
  }
}
function Ss(t, e, n, r) {
  const s = e === Do;
  return new Proxy(t, {
    apply(o, i, a) {
      var m;
      const c = a[0], u = pf(e, c, n), d = (m = u[B]) != null ? m : "unknown", p = ie(e);
      return lf(e) ? Me(
        {
          name: `${p} ${d} stream-response`,
          op: Pe(e),
          attributes: u
        },
        (l) => D(null, null, function* () {
          try {
            r.recordInputs && c && ys(l, c);
            const _ = yield o.apply(n, a);
            return cf(_, l, !!r.recordOutputs);
          } catch (_) {
            throw l.setStatus({ code: N, message: "internal_error" }), x(_, {
              mechanism: {
                handled: !1,
                type: "auto.ai.google_genai",
                data: { function: e }
              }
            }), l.end(), _;
          }
        })
      ) : se(
        {
          name: s ? `${p} ${d} create` : `${p} ${d}`,
          op: Pe(e),
          attributes: u
        },
        (l) => (r.recordInputs && c && ys(l, c), Ke(
          () => o.apply(n, a),
          (_) => {
            x(_, {
              mechanism: { handled: !1, type: "auto.ai.google_genai", data: { function: e } }
            });
          },
          () => {
          },
          (_) => {
            s || df(l, _, r.recordOutputs);
          }
        ))
      );
    }
  });
}
function Mn(t, e = "", n) {
  return new Proxy(t, {
    get: (r, s, o) => {
      const i = Reflect.get(r, s, o), a = Co(e, String(s));
      if (typeof i == "function" && uf(a)) {
        if (a === Do) {
          const c = Ss(i, a, r, n);
          return function(...d) {
            const p = c(...d);
            return p && typeof p == "object" ? Mn(p, nf, n) : p;
          };
        }
        return Ss(i, a, r, n);
      }
      return typeof i == "function" ? i.bind(r) : i && typeof i == "object" ? Mn(i, a, n) : i;
    }
  });
}
function Rp(t, e) {
  var s;
  const n = !!((s = k()) != null && s.getOptions().sendDefaultPii), r = f({
    recordInputs: n,
    recordOutputs: n
  }, e);
  return Mn(t, "", r);
}
function Op(t) {
  const e = O();
  t(e);
}
const mf = "sentry.javascript.miniapp", Es = "10.27.0-rc.1", Nt = "?", _f = /^\s*at (?:(.*?) ?\()?((?:file|https?|blob|chrome-extension|address|native|eval|webpack|<anonymous>|[-a-z]+:|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i, gf = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:file|https?|blob|chrome|webpack|resource|moz-extension).*?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js))(?::(\d+))?(?::(\d+))?\s*$/i, hf = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i, yf = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i, Sf = /\((\S*)(?::(\d+))(?::(\d+))\)/, Ef = /^\s*at (.*?) ?\((\S*):(\d+):(\d+)\)/i;
function te(t) {
  let e = null;
  const n = t && t.framesToPop;
  try {
    if (e = Tf(t), e)
      return bs(e, n);
  } catch (r) {
  }
  try {
    if (e = bf(t), e)
      return bs(e, n);
  } catch (r) {
  }
  return {
    message: fr(t),
    name: t && t.name,
    stack: [],
    failed: !0
  };
}
function bf(t) {
  if (!t || !t.stack)
    return null;
  const e = [], n = t.stack.split(`
`);
  let r, s, o, i;
  for (let a = 0; a < n.length; ++a) {
    if (o = _f.exec(n[a])) {
      const c = o[2] && o[2].indexOf("native") === 0;
      r = o[2] && o[2].indexOf("eval") === 0, r && (s = Sf.exec(o[2])) && (o[2] = s[1], o[3] = s[2], o[4] = s[3]), i = {
        url: o[2],
        func: o[1] || Nt,
        args: c ? [o[2]] : [],
        line: o[3] ? +o[3] : null,
        column: o[4] ? +o[4] : null
      };
    } else if (o = hf.exec(n[a]))
      i = {
        url: o[2],
        func: o[1] || Nt,
        args: [],
        line: +o[3],
        column: o[4] ? +o[4] : null
      };
    else if (o = gf.exec(n[a]))
      r = o[3] && o[3].indexOf(" > eval") > -1, r && (s = yf.exec(o[3])) ? (o[1] = o[1] || "eval", o[3] = s[1], o[4] = s[2], o[5] = "") : a === 0 && !o[5] && t.columnNumber !== void 0 && (e[0].column = t.columnNumber + 1), i = {
        url: o[3],
        func: o[1] || Nt,
        args: o[2] ? o[2].split(",") : [],
        line: o[4] ? +o[4] : null,
        column: o[5] ? +o[5] : null
      };
    else if (o = Ef.exec(n[a]))
      i = {
        url: o[2],
        func: o[1] || Nt,
        args: [],
        line: o[3] ? +o[3] : null,
        column: o[4] ? +o[4] : null
      };
    else
      continue;
    !i.func && i.line && (i.func = Nt), e.push(i);
  }
  return e.length ? {
    message: fr(t),
    name: t.name,
    stack: e
  } : null;
}
function Tf(t) {
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
    }), c && (!c.func && c.line && (c.func = Nt), o.push(c));
  }
  return o.length ? {
    message: fr(t),
    name: t.name,
    stack: o
  } : null;
}
function bs(t, e) {
  try {
    return E(f({}, t), {
      stack: t.stack.slice(e)
    });
  } catch (n) {
    return t;
  }
}
function fr(t) {
  const e = t && t.message;
  return e ? e.error && typeof e.error.message == "string" ? e.error.message : e : "No error message";
}
const If = 100;
function $o(t) {
  const e = pr(t.stack), n = {
    type: t.name,
    value: t.message
  };
  return e && e.length && (n.stacktrace = { frames: e }), n.type === void 0 && n.value === "" && (n.value = "Unrecoverable error caught"), n;
}
function Af(t, e, n) {
  const r = {
    exception: {
      values: [
        {
          type: Un(t) ? t.constructor.name : n ? "UnhandledRejection" : "Error",
          value: `Non-Error ${n ? "promise rejection" : "exception"} captured with keys: ${pi(t)}`
        }
      ]
    },
    extra: {
      __serialized__: Xs(t)
    }
  };
  if (e) {
    const s = te(e), o = pr(s.stack);
    r.stacktrace = {
      frames: o
    };
  }
  return r;
}
function Ts(t) {
  return {
    exception: {
      values: [$o(t)]
    }
  };
}
function pr(t) {
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
  ).slice(0, If).reverse();
}
function Nf(t, e, n = {}) {
  let r;
  if (ri(t) && t.error)
    return t = t.error, r = Ts(te(t)), r;
  if (Er(t) || si(t)) {
    const s = t, o = s.name || (Er(s) ? "DOMError" : "DOMException"), i = s.message ? `${o}: ${s.message}` : o;
    return r = vn(i, e, n), yn(r, i), r;
  }
  return lt(t) ? (r = Ts(te(t)), r) : _t(t) || Un(t) ? (r = Af(t, e, n.rejection), kt(r, {
    synthetic: !0
  }), r) : (r = vn(t, e, n), yn(r, `${t}`), kt(r, {
    synthetic: !0
  }), r);
}
function vn(t, e, n = {}) {
  const r = {
    message: t
  };
  if (n.attachStacktrace && e) {
    const s = te(e), o = pr(s.stack);
    r.stacktrace = {
      frames: o
    };
  }
  return r;
}
const Rf = () => {
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
}, Of = () => {
  let t = "unknown";
  return typeof wx == "object" ? t = "wechat" : typeof my == "object" ? t = "alipay" : typeof tt == "object" ? t = "bytedance" : typeof dd == "object" ? t = "dingtalk" : typeof qq == "object" ? t = "qq" : typeof swan == "object" && (t = "swan"), t;
}, v = Rf(), Lo = Of(), kf = "application/json";
function dr(t) {
  function e(n) {
    return new Ct((r, s) => {
      const o = v.request || v.httpRequest;
      if (typeof o != "function") {
        s(new Error("Miniapp request function is not available"));
        return;
      }
      o({
        url: t.url,
        method: "POST",
        data: n.body,
        header: { "content-type": kf },
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
  return mc(t, e);
}
const kp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  makeMiniappTransport: dr
}, Symbol.toStringTag, { value: "Module" })), Mf = () => [];
class vf extends Sc {
  /**
   * Creates a new Miniapp SDK instance.
   *
   * @param options Configuration options for this SDK.
   */
  constructor(e = {}) {
    const n = e.transport || dr, r = e.stackParser || Mf, s = e.integrations || e.defaultIntegrations || [], o = E(f({}, e), {
      transport: n,
      stackParser: r,
      integrations: s,
      dsn: e.dsn,
      // ensure defaults for required fields
      tracesSampleRate: e.tracesSampleRate
    });
    vc(o, "miniapp", ["miniapp"]), super(o);
  }
  /**
   * @inheritDoc
   */
  _prepareEvent(e, n, r, s) {
    return e.platform = e.platform || "javascript", e.sdk = E(f({}, e.sdk), {
      name: mf,
      packages: [
        ...e.sdk && e.sdk.packages || [],
        {
          name: "npm:@sentry/miniapp",
          version: Es
        }
      ],
      version: Es
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
    const r = n && n.syntheticException ? n.syntheticException : void 0, s = Nf(e, r, {
      attachStacktrace: this._options.attachStacktrace
    });
    return n && n.event_id && (s.event_id = n.event_id), Promise.resolve(s);
  }
  /**
   * @inheritDoc
   */
  // eslint-disable-next-line deprecation/deprecation
  eventFromMessage(e, n = "info", r) {
    const s = r && r.syntheticException ? r.syntheticException : void 0, o = vn(String(e), s, {
      attachStacktrace: this._options.attachStacktrace
    });
    return o.level = n, r && r.event_id && (o.event_id = r.event_id), Promise.resolve(o);
  }
}
function Cf() {
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
    if (Cs(t))
      return t;
  } catch (s) {
    return t;
  }
  const r = function(...s) {
    try {
      const o = s.map((i) => Rt(i, e));
      return t.handleEvent ? t.handleEvent.apply(this, o) : t.apply(this, o);
    } catch (o) {
      throw Cf(), it((i) => {
        i.addEventProcessor((a) => {
          const c = f({}, a);
          return e.mechanism && (yn(c, void 0), kt(c, e.mechanism)), c.extra = E(f({}, c.extra), {
            arguments: F(s, 3)
          }), c;
        }), x(o);
      }), o;
    }
  };
  try {
    for (const s in t)
      Object.prototype.hasOwnProperty.call(t, s) && (r[s] = t[s]);
  } catch (s) {
  }
  vs(r, t), G(t, "__sentry_wrapped__", r);
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
      x(n);
    }), this._onErrorHandlerInstalled = !0);
  }
  /** JSDoc */
  _installGlobalOnUnhandledRejectionHandler() {
    this._onUnhandledRejectionHandlerInstalled || (v.onUnhandledRejection && v.onUnhandledRejection(
      ({ reason: e, promise: n }) => {
        const r = typeof e == "string" ? new Error(e) : e;
        x(r, {
          data: n
        });
      }
    ), this._onUnhandledRejectionHandlerInstalled = !0);
  }
  /** JSDoc */
  _installGlobalOnPageNotFoundHandler() {
    this._onPageNotFoundHandlerInstalled || (v.onPageNotFound && v.onPageNotFound((e) => {
      const n = e.path.split("?")[0];
      Jr("pagenotfound", n), qr("message", JSON.stringify(e)), Hr(`页面无法找到: ${n}`);
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
      Jr("memory-warning", String(e)), qr("message", n), Hr("内存不足告警");
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
          data: { function: he(e) },
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
              handler: he(e)
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
    !r || !r.hasOwnProperty || !r.hasOwnProperty("addEventListener") || (It(r, "addEventListener", function(s) {
      return function(o, i, a) {
        try {
          typeof i.handleEvent == "function" && (i.handleEvent = Rt(i.handleEvent.bind(i), {
            mechanism: {
              data: {
                function: "handleEvent",
                handler: he(i),
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
                handler: he(i),
                target: e
              },
              handled: !0,
              type: "instrument"
            }
          }),
          a
        );
      };
    }), It(r, "removeEventListener", function(s) {
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
    It(e, "setTimeout", this._wrapTimeFunction.bind(this)), It(e, "setInterval", this._wrapTimeFunction.bind(this)), It(e, "requestAnimationFrame", this._wrapRAF.bind(this)), [
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
function he(t) {
  try {
    return t && t.name || "<anonymous>";
  } catch (e) {
    return "<anonymous>";
  }
}
const wf = "cause", xf = 5, Wt = class Wt {
  /**
   * @inheritDoc
   */
  constructor(e = {}) {
    this.name = Wt.id, this._key = e.key || wf, this._limit = e.limit || xf;
  }
  /**
   * @inheritDoc
   */
  setupOnce() {
    Qe((e, n) => {
      const r = k(), s = r && r.getIntegrationByName(Wt.id);
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
    const s = te(e[n]), o = $o(s);
    return this._walkErrorTree(e[n], n, [o, ...r]);
  }
};
Wt.id = "LinkedErrors";
let Le = Wt;
const Yt = class Yt {
  constructor() {
    this.name = Yt.id;
  }
  /**
   * @inheritDoc
   */
  setupOnce() {
    Qe((e) => {
      const n = k();
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
          } = s, [U, Y] = h.split(" "), St = E(f({}, e.tags), {
            SDKVersion: o
          }), T = R || w || Lo || "app";
          return E(f({}, e), {
            tags: St,
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
    Qe((e) => {
      const n = k();
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
    Qe((e) => {
      const n = k();
      return n && n.getIntegrationByName(Kt.id) && Lo === "wechat" && v.getLaunchOptionsSync && v.getLaunchOptionsSync().scene === 1129 ? null : e;
    });
  }
};
Kt.id = "IgnoreMpcrawlerErrors";
let je = Kt;
const Mp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GlobalHandlers: De,
  IgnoreMpcrawlerErrors: je,
  LinkedErrors: Le,
  Router: Ue,
  System: Fe,
  TryCatch: $e
}, Symbol.toStringTag, { value: "Module" })), Pf = [
  Uc(),
  Dc(),
  new $e(),
  new De(),
  new Le(),
  new Fe(),
  new Ue(),
  new je()
];
function vp(t = {}) {
  t.defaultIntegrations === void 0 && (t.defaultIntegrations = Pf), t.normalizeDepth = t.normalizeDepth || 5;
  const e = f({
    integrations: t.integrations || t.defaultIntegrations || [],
    stackParser: t.stackParser || (() => []),
    transport: t.transport || dr
  }, t);
  Ac(vf, e);
}
function Cp(t = {}) {
  t.eventId || (t.eventId = no());
  const e = k();
  e && e.showReportDialog(t);
}
function wp() {
  return no();
}
function xp(t) {
  const e = k();
  return e ? e.flush(t) : Ze(!1);
}
function Pp(t) {
  const e = k();
  return e ? e.close(t) : Ze(!1);
}
function Dp(t) {
  return Rt(t)();
}
const Df = 1e12;
function ye(t) {
  return t / 1e3;
}
class $f {
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
      return ye(e.timeOrigin);
    const r = typeof e.now == "function" ? e.now() : void 0;
    return typeof r == "number" ? ye(Date.now() - r) : n;
  }
  _handleEntry(e, n, r) {
    const s = this._toTimestamp(n.startTime, r), o = this._toTimestamp(n.startTime + n.duration, r), i = to({
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
    return e > Df ? ye(e) : ((s = this._timeOrigin) != null ? s : n) + ye(e);
  }
  _applyMeasurementsToSpan() {
    for (const [e, n] of Object.entries(this._measurements))
      fa(e, n.value, n.unit);
  }
  _stopObserver() {
    var e;
    (e = this._observer) == null || e.disconnect(), this._observer = void 0;
  }
}
const Lf = {
  traceRequest: !0
}, P = typeof __SENTRY_DEBUG__ == "undefined" ? !0 : __SENTRY_DEBUG__;
function Fo() {
  const t = jt(), e = t && j(t);
  if (!e)
    return;
  const n = A(e).op;
  return n === "navigation" || n === "pageload" ? e : void 0;
}
function Uo(t) {
  return { name: t.path || "unknown", source: "url" };
}
function jo(t, e) {
  const n = {
    [W]: e
  };
  return t.openType && (n["miniapp.open_type"] = t.openType), t.scene !== void 0 && (n["miniapp.scene"] = t.scene), t.isTabBar !== void 0 && (n["miniapp.is_tabbar"] = t.isTabBar), t.webviewId !== void 0 && (n["miniapp.webview_id"] = t.webviewId), t.query && (n["miniapp.query"] = t.query), n;
}
function Ff(t) {
  return {
    path: (t == null ? void 0 : t.path) || (t == null ? void 0 : t.route) || (t == null ? void 0 : t.url) || "unknown-route",
    query: t == null ? void 0 : t.query,
    scene: t == null ? void 0 : t.scene,
    openType: t == null ? void 0 : t.openType,
    isTabBar: t == null ? void 0 : t.isTabBar,
    webviewId: t == null ? void 0 : t.webviewId
  };
}
function Uf(t, e = !1) {
  return !!(t === "appLaunch" || e);
}
function jf(t, e) {
  const { instrumentPageLoad: n = !0, instrumentNavigation: r = !0 } = t, s = b, o = s.wx || s.my;
  if (!o) {
    P && g.warn("[MiniAppTracing] No miniapp global object found");
    return;
  }
  const i = v.onAppRoute || o.onAppRoute, a = v.onAppRouteDone || o.onAppRouteDone, c = v.onBeforePageLoad || o.onBeforePageLoad, u = v.onAfterPageLoad || o.onAfterPageLoad;
  if (typeof i != "function") {
    P && g.warn("[MiniAppTracing] onAppRoute not available");
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
      Is(_, e);
    }
  }
  i((m) => {
    const l = Ff(m), _ = !p && Uf(l.openType, d);
    if (d && (d = !1), _ && n) {
      p = !0, Is(l, e);
      return;
    }
    r && p && Bf(l, e);
  }), typeof a == "function" && a((m) => {
    P && g.log("[MiniAppTracing] Route done:", m == null ? void 0 : m.path);
  }), typeof c == "function" && c((m) => {
    P && g.log("[MiniAppTracing] Before page load:", m == null ? void 0 : m.path);
  }), typeof u == "function" && u((m) => {
    P && g.log("[MiniAppTracing] After page load:", m == null ? void 0 : m.path);
  });
}
function Is(t, e) {
  const { name: n, source: r } = Uo(t), s = jo(t, "auto.pageload.miniapp");
  s[Q] = r;
  const o = Fo();
  o ? ((A(o).data || {})[Q] !== "custom" && (o.updateName(n), o.setAttribute(Q, r)), o.setAttributes(s), P && g.log(`[MiniAppTracing] Updated pageload span: ${n}`)) : (O().setTransactionName(n), e({
    name: n,
    op: "pageload",
    attributes: s
  }), P && g.log(`[MiniAppTracing] Created pageload span: ${n}`));
}
function Bf(t, e) {
  const { name: n, source: r } = Uo(t), s = jo(t, "auto.navigation.miniapp");
  s[Q] = r, O().setTransactionName(n), e({
    name: n,
    op: "navigation",
    attributes: s
  }), P && g.log(`[MiniAppTracing] Created navigation span: ${n}`);
}
function $p() {
  return Fo();
}
const Gf = 3600;
let Ot, Be;
function Hf() {
  return {
    traceId: st(),
    spanId: Ft(),
    sampleRand: Math.random()
  };
}
function qf() {
  return Ot || (Ot = Hf()), Ot;
}
function Jf(t = !1) {
  const e = Ot;
  return Ot = {
    traceId: t && e ? e.traceId : st(),
    spanId: Ft(),
    sampleRand: Math.random()
  }, Ot;
}
function zf() {
  return Be;
}
function Wf(t, e, n, r, s, o) {
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
function Yf() {
  return Be ? Date.now() / 1e3 - Be.startTimestamp <= Gf : !1;
}
const Vf = 1e3, Kf = 3e4, Xf = 15e3, Zf = "MiniAppTracing", Bo = "_sentry_miniapp_idleSpan";
function mr(t) {
  return t[Bo];
}
function As(t, e) {
  G(t, Bo, e);
}
const Qf = f({
  idleTimeout: Vf,
  finalTimeout: Kf,
  childSpanTimeout: Xf,
  instrumentPageLoad: !0,
  instrumentNavigation: !0,
  traceContinuityMode: "link",
  consistentTraceSampling: !1
}, Lf);
function Lp(t = {}) {
  const e = f(f({}, Qf), t), {
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
    name: Zf,
    setupOnce() {
      p = new $f(d == null ? void 0 : d._reportAllChanges);
    },
    setup(_) {
      var y;
      (y = v.onAppHide) == null || y.call(v, () => {
        const h = mr(_);
        h && !A(h).timestamp && (P && g.log("[MiniAppTracing] App hiding, finishing active span"), h.setAttribute(Re, "appHide"), h.end());
      });
    },
    afterAllSetup(_) {
      jf(
        {
          instrumentPageLoad: o,
          instrumentNavigation: i
        },
        (h) => {
          tp(_, h, {
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
function tp(t, e, n) {
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
  ep(t);
  const p = np(i, a), m = c ? c(e) : e;
  p && p.length > 0 && (m.links = [
    ...m.links || [],
    ...p
  ]);
  const l = m.attributes || {};
  d.name = m.name, d.source = l[Q];
  const _ = ba(m, {
    idleTimeout: r,
    finalTimeout: s,
    childSpanTimeout: o,
    beforeSpanEnd: (y) => {
      var w;
      u == null || u.addPerformanceEntriesFromSpan(y), As(t, void 0);
      const h = O(), I = h.getPropagationContext();
      h.setPropagationContext(E(f({}, I), {
        traceId: y.spanContext().traceId,
        sampled: ht(y),
        dsc: ot(y)
      }));
      const R = A(y);
      Wf(
        y.spanContext().traceId,
        y.spanContext().spanId,
        ht(y),
        R.start_timestamp,
        1,
        (w = I.sampleRand) != null ? w : Math.random()
      ), P && g.log(
        `[MiniAppTracing] Span ended: ${R.op} - ${R.description}, traceId=${y.spanContext().traceId}`
      );
    }
  });
  return _.setAttribute("miniapp.trace_continuity_mode", i), As(t, _), P && g.log(
    `[MiniAppTracing] Started ${e.op} span: ${e.name}, traceId=${_.spanContext().traceId}`
  ), _;
}
function ep(t) {
  const e = mr(t);
  e && !A(e).timestamp && (P && g.log(`[MiniAppTracing] Finishing current active span with op: ${A(e).op}`), e.setAttribute(Re, "navigationStart"), e.end());
}
function np(t, e) {
  var s;
  if (t === "off") {
    O().setPropagationContext({
      traceId: st(),
      sampleRand: Math.random()
    });
    return;
  }
  const n = zf(), r = Yf();
  if (t === "session") {
    const o = qf();
    O().setPropagationContext(f({
      traceId: o.traceId,
      sampleRand: o.sampleRand
    }, e && r && n && {
      sampled: n.spanContext.traceFlags === 1
    })), P && g.log(`[MiniAppTracing] Session mode: reusing traceId=${o.traceId}`);
    return;
  }
  if (t === "link") {
    const o = Jf(!1);
    if (O().setPropagationContext(f({
      traceId: o.traceId,
      sampleRand: o.sampleRand
    }, e && r && n && {
      sampled: n.spanContext.traceFlags === 1
    })), r && n)
      return P && g.log(
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
function Fp() {
  const t = k();
  return t ? mr(t) : void 0;
}
export {
  Mp as Integrations,
  vf as MiniappClient,
  mf as SDK_NAME,
  Es as SDK_VERSION,
  kp as Transports,
  wc as addBreadcrumb,
  Qe as addEventProcessor,
  dp as captureConsoleIntegration,
  ip as captureEvent,
  x as captureException,
  Hr as captureMessage,
  Pp as close,
  Op as configureScope,
  bp as consoleLoggingIntegration,
  Ip as createConsolaReporter,
  Pf as defaultIntegrations,
  mp as extraErrorDataIntegration,
  Sp as featureFlagsIntegration,
  xp as flush,
  $p as getActiveMiniAppRootSpan,
  Fp as getActiveMiniAppSpan,
  jt as getActiveSpan,
  O as getCurrentScope,
  j as getRootSpan,
  be as getSpanDescendants,
  Ri as getSpanStatusFromHttpCode,
  vp as init,
  Np as instrumentAnthropicAiClient,
  Rp as instrumentGoogleGenAIClient,
  jf as instrumentMiniAppRouter,
  Ap as instrumentOpenAiClient,
  yu as instrumentSupabaseClient,
  wp as lastEventId,
  Ep as logger,
  fp as makeMultiplexedTransport,
  Tp as metrics,
  Lp as miniappTracingIntegration,
  pp as moduleMetadataIntegration,
  sp as registerSpanErrorInstrumentation,
  _p as rewriteFramesIntegration,
  ap as setContext,
  qr as setExtra,
  cp as setExtras,
  Or as setHttpStatus,
  fa as setMeasurement,
  Jr as setTag,
  up as setTags,
  lp as setUser,
  Cp as showReportDialog,
  to as startInactiveSpan,
  tp as startMiniAppTracingNavigationSpan,
  op as startNewTrace,
  se as startSpan,
  Me as startSpanManual,
  gp as supabaseIntegration,
  yp as thirdPartyErrorFilterIntegration,
  zn as withActiveSpan,
  it as withScope,
  Dp as wrap,
  hp as zodErrorsIntegration
};
