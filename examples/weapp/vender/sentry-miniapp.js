var Wi = Object.defineProperty, Ji = Object.defineProperties;
var Yi = Object.getOwnPropertyDescriptors;
var pe = Object.getOwnPropertySymbols;
var Er = Object.prototype.hasOwnProperty, br = Object.prototype.propertyIsEnumerable;
var dn = (t, e) => (e = Symbol[t]) ? e : Symbol.for("Symbol." + t);
var Sr = (t, e, n) => e in t ? Wi(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n, d = (t, e) => {
  for (var n in e || (e = {}))
    Er.call(e, n) && Sr(t, n, e[n]);
  if (pe)
    for (var n of pe(e))
      br.call(e, n) && Sr(t, n, e[n]);
  return t;
}, E = (t, e) => Ji(t, Yi(e));
var pn = (t, e) => {
  var n = {};
  for (var r in t)
    Er.call(t, r) && e.indexOf(r) < 0 && (n[r] = t[r]);
  if (t != null && pe)
    for (var r of pe(t))
      e.indexOf(r) < 0 && br.call(t, r) && (n[r] = t[r]);
  return n;
};
var L = (t, e, n) => new Promise((r, s) => {
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
}), rt = function(t, e) {
  this[0] = t, this[1] = e;
}, me = (t, e, n) => {
  var r = (o, a, c, u) => {
    try {
      var f = n[o](a), p = (a = f.value) instanceof rt, m = f.done;
      Promise.resolve(p ? a[0] : a).then((l) => p ? r(o === "return" ? o : "next", a[1] ? { done: l.done, value: l.value } : l, c, u) : c({ value: l, done: m })).catch((l) => r("throw", l, c, u));
    } catch (l) {
      u(l);
    }
  }, s = (o) => i[o] = (a) => new Promise((c, u) => r(o, a, c, u)), i = {};
  return n = n.apply(t, e), i[dn("asyncIterator")] = () => i, s("next"), s("throw"), s("return"), i;
};
var _e = (t, e, n) => (e = t[dn("asyncIterator")]) ? e.call(t) : (t = t[dn("iterator")](), e = {}, n = (r, s) => (s = t[r]) && (e[r] = (i) => new Promise((o, a, c) => (i = s.call(t, i), c = i.done, Promise.resolve(i.value).then((u) => o({ value: u, done: c }), a)))), n("next"), n("return"), e);
const Tr = (
  // eslint-disable-next-line no-undef
  typeof globalThis != "undefined" && globalThis || // eslint-disable-next-line no-undef
  typeof self != "undefined" && self || // eslint-disable-next-line no-undef
  typeof window != "undefined" && window || // eslint-disable-next-line no-undef
  typeof global != "undefined" && global || {}
);
class Vi {
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
Tr.URLSearchParams || (Tr.URLSearchParams = Vi);
const y = typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__, b = globalThis, dt = "10.27.0";
function xt() {
  return We(b), b;
}
function We(t) {
  const e = t.__SENTRY__ = t.__SENTRY__ || {};
  return e.version = e.version || dt, e[dt] = e[dt] || {};
}
function Dt(t, e, n = b) {
  const r = n.__SENTRY__ = n.__SENTRY__ || {}, s = r[dt] = r[dt] || {};
  return s[t] || (s[t] = e());
}
const $n = [
  "debug",
  "info",
  "warn",
  "error",
  "log",
  "assert",
  "trace"
], Ki = "Sentry Logger ", Re = {};
function $t(t) {
  if (!("console" in b))
    return t();
  const e = b.console, n = {}, r = Object.keys(Re);
  r.forEach((s) => {
    const i = Re[s];
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
function Xi() {
  Fn().enabled = !0;
}
function Zi() {
  Fn().enabled = !1;
}
function vs() {
  return Fn().enabled;
}
function Qi(...t) {
  Ln("log", ...t);
}
function to(...t) {
  Ln("warn", ...t);
}
function eo(...t) {
  Ln("error", ...t);
}
function Ln(t, ...e) {
  y && vs() && $t(() => {
    b.console[t](`${Ki}[${t}]:`, ...e);
  });
}
function Fn() {
  return y ? Dt("loggerSettings", () => ({ enabled: !1 })) : { enabled: !1 };
}
const g = {
  /** Enable logging. */
  enable: Xi,
  /** Disable logging. */
  disable: Zi,
  /** Check if logging is enabled. */
  isEnabled: vs,
  /** Log a message. */
  log: Qi,
  /** Log a warning. */
  warn: to,
  /** Log an error. */
  error: eo
}, mn = "<anonymous>";
function Ms(t) {
  try {
    return !t || typeof t != "function" ? mn : t.name || mn;
  } catch (e) {
    return mn;
  }
}
function no(t) {
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
function ws(t) {
  return "__v_isVNode" in t && t.__v_isVNode ? "[VueVNode]" : "[VueViewModel]";
}
const Ee = {}, Ir = {};
function Un(t, e) {
  Ee[t] = Ee[t] || [], Ee[t].push(e);
}
function jn(t, e) {
  if (!Ir[t]) {
    Ir[t] = !0;
    try {
      e();
    } catch (n) {
      y && g.error(`Error while instrumenting ${t}`, n);
    }
  }
}
function Bn(t, e) {
  const n = t && Ee[t];
  if (n)
    for (const r of n)
      try {
        r(e);
      } catch (s) {
        y && g.error(
          `Error while triggering instrumentation handler.
Type: ${t}
Name: ${Ms(r)}
Error:`,
          s
        );
      }
}
let _n = null;
function ro(t) {
  const e = "error";
  Un(e, t), jn(e, so);
}
function so() {
  _n = b.onerror, b.onerror = function(t, e, n, r, s) {
    return Bn("error", {
      column: r,
      error: s,
      line: n,
      msg: t,
      url: e
    }), _n ? _n.apply(this, arguments) : !1;
  }, b.onerror.__SENTRY_INSTRUMENTED__ = !0;
}
let gn = null;
function io(t) {
  const e = "unhandledrejection";
  Un(e, t), jn(e, oo);
}
function oo() {
  gn = b.onunhandledrejection, b.onunhandledrejection = function(t) {
    return Bn("unhandledrejection", t), gn ? gn.apply(this, arguments) : !0;
  }, b.onunhandledrejection.__SENTRY_INSTRUMENTED__ = !0;
}
const Cs = Object.prototype.toString;
function pt(t) {
  switch (Cs.call(t)) {
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
  return Cs.call(t) === `[object ${e}]`;
}
function Ps(t) {
  return Lt(t, "ErrorEvent");
}
function Ar(t) {
  return Lt(t, "DOMError");
}
function ao(t) {
  return Lt(t, "DOMException");
}
function ke(t) {
  return Lt(t, "String");
}
function Je(t) {
  return typeof t == "object" && t !== null && "__sentry_template_string__" in t && "__sentry_template_values__" in t;
}
function Gn(t) {
  return t === null || Je(t) || typeof t != "object" && typeof t != "function";
}
function yt(t) {
  return Lt(t, "Object");
}
function Ye(t) {
  return typeof Event != "undefined" && Ve(t, Event);
}
function co(t) {
  return typeof Element != "undefined" && Ve(t, Element);
}
function uo(t) {
  return Lt(t, "RegExp");
}
function Ft(t) {
  return !!(t != null && t.then && typeof t.then == "function");
}
function lo(t) {
  return yt(t) && "nativeEvent" in t && "preventDefault" in t && "stopPropagation" in t;
}
function Ve(t, e) {
  try {
    return t instanceof e;
  } catch (n) {
    return !1;
  }
}
function xs(t) {
  return !!(typeof t == "object" && t !== null && (t.__isVue || t._isVue || t.__v_isVNode));
}
const fo = b, po = 80;
function mo(t, e = {}) {
  if (!t)
    return "<unknown>";
  try {
    let n = t;
    const r = 5, s = [];
    let i = 0, o = 0;
    const a = " > ", c = a.length;
    let u;
    const f = Array.isArray(e) ? e : e.keyAttrs, p = !Array.isArray(e) && e.maxStringLength || po;
    for (; n && i++ < r && (u = _o(n, f), !(u === "html" || i > 1 && o + s.length * c + u.length >= p)); )
      s.push(u), o += u.length, n = n.parentNode;
    return s.reverse().join(a);
  } catch (n) {
    return "<unknown>";
  }
}
function _o(t, e) {
  const n = t, r = [];
  if (!(n != null && n.tagName))
    return "";
  if (fo.HTMLElement && n instanceof HTMLElement && n.dataset) {
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
    if (o && ke(o)) {
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
function Rt(t, e, n) {
  if (!(e in t))
    return;
  const r = t[e];
  if (typeof r != "function")
    return;
  const s = n(r);
  typeof s == "function" && Ds(s, r);
  try {
    t[e] = s;
  } catch (i) {
    y && g.log(`Failed to replace method "${e}" in object`, t);
  }
}
function z(t, e, n) {
  try {
    Object.defineProperty(t, e, {
      // enumerable: false, // the default, so we can save on bundle size by not explicitly setting it
      value: n,
      writable: !0,
      configurable: !0
    });
  } catch (r) {
    y && g.log(`Failed to add non-enumerable property "${e}" to object`, t);
  }
}
function Ds(t, e) {
  try {
    const n = e.prototype || {};
    t.prototype = e.prototype = n, z(t, "__sentry_original__", e);
  } catch (n) {
  }
}
function $s(t) {
  return t.__sentry_original__;
}
function Ls(t) {
  if (pt(t))
    return d({
      message: t.message,
      name: t.name,
      stack: t.stack
    }, Rr(t));
  if (Ye(t)) {
    const e = d({
      type: t.type,
      target: Nr(t.target),
      currentTarget: Nr(t.currentTarget)
    }, Rr(t));
    return typeof CustomEvent != "undefined" && Ve(t, CustomEvent) && (e.detail = t.detail), e;
  } else
    return t;
}
function Nr(t) {
  try {
    return co(t) ? mo(t) : Object.prototype.toString.call(t);
  } catch (e) {
    return "<unknown>";
  }
}
function Rr(t) {
  if (typeof t == "object" && t !== null) {
    const e = {};
    for (const n in t)
      Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    return e;
  } else
    return {};
}
function go(t) {
  const e = Object.keys(Ls(t));
  return e.sort(), e[0] ? e.join(", ") : "[object has no keys]";
}
function te(t, e = 0) {
  return typeof t != "string" || e === 0 || t.length <= e ? t : `${t.slice(0, e)}...`;
}
function kr(t, e) {
  if (!Array.isArray(t))
    return "";
  const n = [];
  for (let r = 0; r < t.length; r++) {
    const s = t[r];
    try {
      xs(s) ? n.push(ws(s)) : n.push(String(s));
    } catch (i) {
      n.push("[value cannot be serialized]");
    }
  }
  return n.join(e);
}
function be(t, e, n = !1) {
  return ke(t) ? uo(e) ? e.test(t) : ke(e) ? n ? t === e : t.includes(e) : !1 : !1;
}
function Ke(t, e = [], n = !1) {
  return e.some((r) => be(t, r, n));
}
function ho() {
  const t = b;
  return t.crypto || t.msCrypto;
}
let hn;
function yo() {
  return Math.random() * 16;
}
function W(t = ho()) {
  try {
    if (t != null && t.randomUUID)
      return t.randomUUID().replace(/-/g, "");
  } catch (e) {
  }
  return hn || (hn = "10000000100040008000" + 1e11), hn.replace(
    /[018]/g,
    (e) => (
      // eslint-disable-next-line no-bitwise
      (e ^ (yo() & 15) >> e / 4).toString(16)
    )
  );
}
function Fs(t) {
  var e, n;
  return (n = (e = t.exception) == null ? void 0 : e.values) == null ? void 0 : n[0];
}
function kt(t) {
  const { message: e, event_id: n } = t;
  if (e)
    return e;
  const r = Fs(t);
  return r ? r.type && r.value ? `${r.type}: ${r.value}` : r.type || r.value || n || "<unknown>" : n || "<unknown>";
}
function In(t, e, n) {
  const r = t.exception = t.exception || {}, s = r.values = r.values || [], i = s[0] = s[0] || {};
  i.value || (i.value = e || ""), i.type || (i.type = "Error");
}
function ot(t, e) {
  const n = Fs(t);
  if (!n)
    return;
  const r = { type: "generic", handled: !0 }, s = n.mechanism;
  if (n.mechanism = d(d(d({}, r), s), e), e && "data" in e) {
    const i = d(d({}, s == null ? void 0 : s.data), e.data);
    n.mechanism.data = i;
  }
}
function Or(t) {
  if (So(t))
    return !0;
  try {
    z(t, "__sentry_captured__", !0);
  } catch (e) {
  }
  return !1;
}
function So(t) {
  try {
    return t.__sentry_captured__;
  } catch (e) {
  }
}
const Us = 1e3;
function re() {
  return Date.now() / Us;
}
function Eo() {
  const { performance: t } = b;
  if (!(t != null && t.now) || !t.timeOrigin)
    return re;
  const e = t.timeOrigin;
  return () => (e + t.now()) / Us;
}
let ge;
function Q() {
  return (ge != null ? ge : ge = Eo())();
}
function An(t, e = {}) {
  if (e.user && (!t.ipAddress && e.user.ip_address && (t.ipAddress = e.user.ip_address), !t.did && !e.did && (t.did = e.user.id || e.user.email || e.user.username)), t.timestamp = e.timestamp || Q(), e.abnormal_mechanism && (t.abnormal_mechanism = e.abnormal_mechanism), e.ignoreDuration && (t.ignoreDuration = e.ignoreDuration), e.sid && (t.sid = e.sid.length === 32 ? e.sid : W()), e.init !== void 0 && (t.init = e.init), !t.did && e.did && (t.did = `${e.did}`), typeof e.started == "number" && (t.started = e.started), t.ignoreDuration)
    t.duration = void 0;
  else if (typeof e.duration == "number")
    t.duration = e.duration;
  else {
    const n = t.timestamp - t.started;
    t.duration = n >= 0 ? n : 0;
  }
  e.release && (t.release = e.release), e.environment && (t.environment = e.environment), !t.ipAddress && e.ipAddress && (t.ipAddress = e.ipAddress), !t.userAgent && e.userAgent && (t.userAgent = e.userAgent), typeof e.errors == "number" && (t.errors = e.errors), e.status && (t.status = e.status);
}
function se(t, e, n = 2) {
  if (!e || typeof e != "object" || n <= 0)
    return e;
  if (t && Object.keys(e).length === 0)
    return t;
  const r = d({}, t);
  for (const s in e)
    Object.prototype.hasOwnProperty.call(e, s) && (r[s] = se(r[s], e[s], n - 1));
  return r;
}
function at() {
  return W();
}
function Ut() {
  return W().substring(16);
}
const Nn = "_sentrySpan";
function St(t, e) {
  e ? z(t, Nn, e) : delete t[Nn];
}
function Mt(t) {
  return t[Nn];
}
const bo = 100;
class Y {
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
    const e = new Y();
    return e._breadcrumbs = [...this._breadcrumbs], e._tags = d({}, this._tags), e._attributes = d({}, this._attributes), e._extra = d({}, this._extra), e._contexts = d({}, this._contexts), this._contexts.flags && (e._contexts.flags = {
      values: [...this._contexts.flags.values]
    }), e._user = this._user, e._level = this._level, e._session = this._session, e._transactionName = this._transactionName, e._fingerprint = this._fingerprint, e._eventProcessors = [...this._eventProcessors], e._attachments = [...this._attachments], e._sdkProcessingMetadata = d({}, this._sdkProcessingMetadata), e._propagationContext = d({}, this._propagationContext), e._client = this._client, e._lastEventId = this._lastEventId, St(e, Mt(this)), e;
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
    }, this._session && An(this._session, { user: e }), this._notifyScopeListeners(), this;
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
    return this._tags = d(d({}, this._tags), e), this._notifyScopeListeners(), this;
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
    return this._attributes = d(d({}, this._attributes), e), this._notifyScopeListeners(), this;
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
    return this._extra = d(d({}, this._extra), e), this._notifyScopeListeners(), this;
  }
  /**
   * Set a single key:value extra entry that will be sent as extra data with the event.
   */
  setExtra(e, n) {
    return this._extra = E(d({}, this._extra), { [e]: n }), this._notifyScopeListeners(), this;
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
    const n = typeof e == "function" ? e(this) : e, r = n instanceof Y ? n.getScopeData() : yt(n) ? e : void 0, {
      tags: s,
      attributes: i,
      extra: o,
      user: a,
      contexts: c,
      level: u,
      fingerprint: f = [],
      propagationContext: p
    } = r || {};
    return this._tags = d(d({}, this._tags), s), this._attributes = d(d({}, this._attributes), i), this._extra = d(d({}, this._extra), o), this._contexts = d(d({}, this._contexts), c), a && Object.keys(a).length && (this._user = a), u && (this._level = u), f.length && (this._fingerprint = f), p && (this._propagationContext = p), this;
  }
  /**
   * Clears the current scope and resets its properties.
   * Note: The client will not be cleared.
   */
  clear() {
    return this._breadcrumbs = [], this._tags = {}, this._attributes = {}, this._extra = {}, this._user = {}, this._contexts = {}, this._level = void 0, this._transactionName = void 0, this._fingerprint = void 0, this._session = void 0, St(this, void 0), this._attachments = [], this.setPropagationContext({ traceId: at(), sampleRand: Math.random() }), this._notifyScopeListeners(), this;
  }
  /**
   * Adds a breadcrumb to the scope.
   * By default, the last 100 breadcrumbs are kept.
   */
  addBreadcrumb(e, n) {
    var i;
    const r = typeof n == "number" ? n : bo;
    if (r <= 0)
      return this;
    const s = E(d({
      timestamp: re()
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
    return this._sdkProcessingMetadata = se(this._sdkProcessingMetadata, e, 2), this;
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
    const r = (n == null ? void 0 : n.event_id) || W();
    if (!this._client)
      return y && g.warn("No client configured on scope - will not capture exception!"), r;
    const s = new Error("Sentry syntheticException");
    return this._client.captureException(
      e,
      E(d({
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
    const s = (r == null ? void 0 : r.event_id) || W();
    if (!this._client)
      return y && g.warn("No client configured on scope - will not capture message!"), s;
    const i = (o = r == null ? void 0 : r.syntheticException) != null ? o : new Error(e);
    return this._client.captureMessage(
      e,
      n,
      E(d({
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
    const r = (n == null ? void 0 : n.event_id) || W();
    return this._client ? (this._client.captureEvent(e, E(d({}, n), { event_id: r }), this), r) : (y && g.warn("No client configured on scope - will not capture event!"), r);
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
function To() {
  return Dt("defaultCurrentScope", () => new Y());
}
function Io() {
  return Dt("defaultIsolationScope", () => new Y());
}
class Ao {
  constructor(e, n) {
    let r;
    e ? r = e : r = new Y();
    let s;
    n ? s = n : s = new Y(), this._stack = [{ scope: r }], this._isolationScope = s;
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
  return e.stack = e.stack || new Ao(To(), Io());
}
function No(t) {
  return wt().withScope(t);
}
function Ro(t, e) {
  const n = wt();
  return n.withScope(() => (n.getStackTop().scope = t, e(t)));
}
function vr(t) {
  return wt().withScope(() => t(wt().getIsolationScope()));
}
function ko() {
  return {
    withIsolationScope: vr,
    withScope: No,
    withSetScope: Ro,
    withSetIsolationScope: (t, e) => vr(e),
    getCurrentScope: () => wt().getScope(),
    getIsolationScope: () => wt().getIsolationScope()
  };
}
function ie(t) {
  const e = We(t);
  return e.acs ? e.acs : ko();
}
function v() {
  const t = xt();
  return ie(t).getCurrentScope();
}
function U() {
  const t = xt();
  return ie(t).getIsolationScope();
}
function Hn() {
  return Dt("globalScope", () => new Y());
}
function ut(...t) {
  const e = xt(), n = ie(e);
  if (t.length === 2) {
    const [r, s] = t;
    return r ? n.withSetScope(r, s) : n.withScope(s);
  }
  return n.withScope(t[0]);
}
function O() {
  return v().getClient();
}
function js(t) {
  const e = t.getPropagationContext(), { traceId: n, parentSpanId: r, propagationSpanId: s } = e, i = {
    trace_id: n,
    span_id: s || Ut()
  };
  return r && (i.parent_span_id = r), i;
}
const et = "sentry.source", Bs = "sentry.sample_rate", Oo = "sentry.previous_trace_sample_rate", ee = "sentry.op", D = "sentry.origin", Oe = "sentry.idle_span_finish_reason", Gs = "sentry.measurement_unit", Hs = "sentry.measurement_value", Mr = "sentry.custom_span_name", zn = "sentry.profile_id", qn = "sentry.exclusive_time", vo = 0, Xe = 1, R = 2;
function Mo(t) {
  if (t < 400 && t >= 100)
    return { code: Xe };
  if (t >= 400 && t < 500)
    switch (t) {
      case 401:
        return { code: R, message: "unauthenticated" };
      case 403:
        return { code: R, message: "permission_denied" };
      case 404:
        return { code: R, message: "not_found" };
      case 409:
        return { code: R, message: "already_exists" };
      case 413:
        return { code: R, message: "failed_precondition" };
      case 429:
        return { code: R, message: "resource_exhausted" };
      case 499:
        return { code: R, message: "cancelled" };
      default:
        return { code: R, message: "invalid_argument" };
    }
  if (t >= 500 && t < 600)
    switch (t) {
      case 501:
        return { code: R, message: "unimplemented" };
      case 503:
        return { code: R, message: "unavailable" };
      case 504:
        return { code: R, message: "deadline_exceeded" };
      default:
        return { code: R, message: "internal_error" };
    }
  return { code: R, message: "internal_error" };
}
function wr(t, e) {
  t.setAttribute("http.response.status_code", e);
  const n = Mo(e);
  n.message !== "unknown_error" && t.setStatus(n);
}
const zs = "_sentryScope", qs = "_sentryIsolationScope";
function wo(t) {
  try {
    const e = b.WeakRef;
    if (typeof e == "function")
      return new e(t);
  } catch (e) {
  }
  return t;
}
function Co(t) {
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
function Po(t, e, n) {
  t && (z(t, qs, wo(n)), z(t, zs, e));
}
function ve(t) {
  const e = t;
  return {
    scope: e[zs],
    isolationScope: Co(e[qs])
  };
}
const xo = "sentry-", Do = /^sentry-/;
function $o(t) {
  const e = Lo(t);
  if (!e)
    return;
  const n = Object.entries(e).reduce((r, [s, i]) => {
    if (s.match(Do)) {
      const o = s.slice(xo.length);
      r[o] = i;
    }
    return r;
  }, {});
  if (Object.keys(n).length > 0)
    return n;
}
function Lo(t) {
  if (!(!t || !ke(t) && !Array.isArray(t)))
    return Array.isArray(t) ? t.reduce((e, n) => {
      const r = Cr(n);
      return Object.entries(r).forEach(([s, i]) => {
        e[s] = i;
      }), e;
    }, {}) : Cr(t);
}
function Cr(t) {
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
const Fo = /^o(\d+)\./, Uo = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)([\w.-]+)(?::(\d+))?\/(.+)/;
function jo(t) {
  return t === "http" || t === "https";
}
function jt(t, e = !1) {
  const { host: n, path: r, pass: s, port: i, projectId: o, protocol: a, publicKey: c } = t;
  return `${a}://${c}${e && s ? `:${s}` : ""}@${n}${i ? `:${i}` : ""}/${r && `${r}/`}${o}`;
}
function Ws(t) {
  const e = Uo.exec(t);
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
    const p = u.match(/^\d+/);
    p && (u = p[0]);
  }
  return Js({ host: i, pass: s, path: c, projectId: u, port: o, protocol: n, publicKey: r });
}
function Js(t) {
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
function Bo(t) {
  if (!y)
    return !0;
  const { port: e, projectId: n, protocol: r } = t;
  return ["protocol", "publicKey", "host", "projectId"].find((o) => t[o] ? !1 : (g.error(`Invalid Sentry Dsn: ${o} missing`), !0)) ? !1 : n.match(/^\d+$/) ? jo(r) ? e && isNaN(parseInt(e, 10)) ? (g.error(`Invalid Sentry Dsn: Invalid port ${e}`), !1) : !0 : (g.error(`Invalid Sentry Dsn: Invalid protocol ${r}`), !1) : (g.error(`Invalid Sentry Dsn: Invalid projectId ${n}`), !1);
}
function Go(t) {
  const e = t.match(Fo);
  return e == null ? void 0 : e[1];
}
function Ho(t) {
  const e = t.getOptions(), { host: n } = t.getDsn() || {};
  let r;
  return e.orgId ? r = String(e.orgId) : n && (r = Go(n)), r;
}
function zo(t) {
  const e = typeof t == "string" ? Ws(t) : Js(t);
  if (!(!e || !Bo(e)))
    return e;
}
function Wn(t) {
  if (typeof t == "boolean")
    return Number(t);
  const e = typeof t == "string" ? parseFloat(t) : t;
  if (!(typeof e != "number" || isNaN(e) || e < 0 || e > 1))
    return e;
}
const Ys = 0, Jn = 1;
let Pr = !1;
function qo(t) {
  const { spanId: e, traceId: n } = t.spanContext(), { data: r, op: s, parent_span_id: i, status: o, origin: a, links: c } = A(t);
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
function Vs(t) {
  const { spanId: e, traceId: n, isRemote: r } = t.spanContext(), s = r ? e : A(t).parent_span_id, i = ve(t).scope, o = r ? (i == null ? void 0 : i.getPropagationContext().propagationSpanId) || Ut() : e;
  return {
    parent_span_id: s,
    span_id: o,
    trace_id: n
  };
}
function Ks(t) {
  if (t && t.length > 0)
    return t.map((o) => {
      var a = o, { context: c } = a, u = c, { spanId: e, traceId: n, traceFlags: r } = u, s = pn(u, ["spanId", "traceId", "traceFlags"]), { attributes: i } = a;
      return d({
        span_id: e,
        trace_id: n,
        sampled: r === Jn,
        attributes: i
      }, s);
    });
}
function mt(t) {
  return typeof t == "number" ? xr(t) : Array.isArray(t) ? t[0] + t[1] / 1e9 : t instanceof Date ? xr(t.getTime()) : Q();
}
function xr(t) {
  return t > 9999999999 ? t / 1e3 : t;
}
function A(t) {
  var r;
  if (Jo(t))
    return t.getSpanJSON();
  const { spanId: e, traceId: n } = t.spanContext();
  if (Wo(t)) {
    const { attributes: s, startTime: i, name: o, endTime: a, status: c, links: u } = t, f = "parentSpanId" in t ? t.parentSpanId : "parentSpanContext" in t ? (r = t.parentSpanContext) == null ? void 0 : r.spanId : void 0;
    return {
      span_id: e,
      trace_id: n,
      data: s,
      description: o,
      parent_span_id: f,
      start_timestamp: mt(i),
      // This is [0,0] by default in OTEL, in which case we want to interpret this as no end time
      timestamp: mt(a) || void 0,
      status: Xs(c),
      op: s[ee],
      origin: s[D],
      links: Ks(u)
    };
  }
  return {
    span_id: e,
    trace_id: n,
    start_timestamp: 0,
    data: {}
  };
}
function Wo(t) {
  const e = t;
  return !!e.attributes && !!e.startTime && !!e.name && !!e.endTime && !!e.status;
}
function Jo(t) {
  return typeof t.getSpanJSON == "function";
}
function Et(t) {
  const { traceFlags: e } = t.spanContext();
  return e === Jn;
}
function Xs(t) {
  if (!(!t || t.code === vo))
    return t.code === Xe ? "ok" : t.message || "internal_error";
}
const _t = "_sentryChildSpans", Rn = "_sentryRootSpan";
function Zs(t, e) {
  const n = t[Rn] || t;
  z(e, Rn, n), t[_t] ? t[_t].add(e) : z(t, _t, /* @__PURE__ */ new Set([e]));
}
function Yo(t, e) {
  t[_t] && t[_t].delete(e);
}
function Te(t) {
  const e = /* @__PURE__ */ new Set();
  function n(r) {
    if (!e.has(r) && Et(r)) {
      e.add(r);
      const s = r[_t] ? Array.from(r[_t]) : [];
      for (const i of s)
        n(i);
    }
  }
  return n(t), Array.from(e);
}
function G(t) {
  return t[Rn] || t;
}
function Bt() {
  const t = xt(), e = ie(t);
  return e.getActiveSpan ? e.getActiveSpan() : Mt(v());
}
function kn() {
  Pr || ($t(() => {
    console.warn(
      "[Sentry] Returning null from `beforeSendSpan` is disallowed. To drop certain spans, configure the respective integrations directly or use `ignoreSpans`."
    );
  }), Pr = !0);
}
let Dr = !1;
function pd() {
  if (Dr)
    return;
  function t() {
    const e = Bt(), n = e && G(e);
    if (n) {
      const r = "internal_error";
      y && g.log(`[Tracing] Root span: ${r} -> Global error occurred`), n.setStatus({ code: R, message: r });
    }
  }
  t.tag = "sentry_tracingErrorCallback", Dr = !0, ro(t), io(t);
}
function Ze(t) {
  var n;
  if (typeof __SENTRY_TRACING__ == "boolean" && !__SENTRY_TRACING__)
    return !1;
  const e = t || ((n = O()) == null ? void 0 : n.getOptions());
  return !!e && // Note: This check is `!= null`, meaning "nullish". `0` is not "nullish", `undefined` and `null` are. (This comment was brought to you by 15 minutes of questioning life)
  (e.tracesSampleRate != null || !!e.tracesSampler);
}
function $r(t) {
  g.log(`Ignoring span ${t.op} - ${t.description} because it matches \`ignoreSpans\`.`);
}
function Me(t, e) {
  if (!(e != null && e.length) || !t.description)
    return !1;
  for (const n of e) {
    if (Ko(n)) {
      if (be(t.description, n))
        return y && $r(t), !0;
      continue;
    }
    if (!n.name && !n.op)
      continue;
    const r = n.name ? be(t.description, n.name) : !0, s = n.op ? t.op && be(t.op, n.op) : !0;
    if (r && s)
      return y && $r(t), !0;
  }
  return !1;
}
function Vo(t, e) {
  const n = e.parent_span_id, r = e.span_id;
  if (n)
    for (const s of t)
      s.parent_span_id === r && (s.parent_span_id = n);
}
function Ko(t) {
  return typeof t == "string" || t instanceof RegExp;
}
const Yn = "production", Qs = "_frozenDsc";
function Ie(t, e) {
  z(t, Qs, e);
}
function ti(t, e) {
  const n = e.getOptions(), { publicKey: r } = e.getDsn() || {}, s = {
    environment: n.environment || Yn,
    release: n.release,
    public_key: r,
    trace_id: t,
    org_id: Ho(e)
  };
  return e.emit("createDsc", s), s;
}
function ei(t, e) {
  const n = e.getPropagationContext();
  return n.dsc || ti(n.traceId, t);
}
function ct(t) {
  var _, S, h, N;
  const e = O();
  if (!e)
    return {};
  const n = G(t), r = A(n), s = r.data, i = n.spanContext().traceState, o = (S = (_ = i == null ? void 0 : i.get("sentry.sample_rate")) != null ? _ : s[Bs]) != null ? S : s[Oo];
  function a(I) {
    return (typeof o == "number" || typeof o == "string") && (I.sample_rate = `${o}`), I;
  }
  const c = n[Qs];
  if (c)
    return a(c);
  const u = i == null ? void 0 : i.get("sentry.dsc"), f = u && $o(u);
  if (f)
    return a(f);
  const p = ti(t.spanContext().traceId, e), m = s[et], l = r.description;
  return m !== "url" && l && (p.transaction = l), Ze() && (p.sampled = String(Et(n)), p.sample_rand = // In OTEL we store the sample rand on the trace state because we cannot access scopes for NonRecordingSpans
  // The Sentry OTEL SpanSampler takes care of writing the sample rand on the root span
  (N = i == null ? void 0 : i.get("sentry.sample_rand")) != null ? N : (
    // On all other platforms we can actually get the scopes from a root span (we use this as a fallback)
    (h = ve(n).scope) == null ? void 0 : h.getPropagationContext().sampleRand.toString()
  )), a(p), e.emit("createDsc", p, n), p;
}
class bt {
  constructor(e = {}) {
    this._traceId = e.traceId || at(), this._spanId = e.spanId || Ut();
  }
  /** @inheritdoc */
  spanContext() {
    return {
      spanId: this._spanId,
      traceId: this._traceId,
      traceFlags: Ys
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
function B(t, e = 100, n = 1 / 0) {
  try {
    return On("", t, e, n);
  } catch (r) {
    return { ERROR: `**non-serializable** (${r})` };
  }
}
function ni(t, e = 3, n = 100 * 1024) {
  const r = B(t, e);
  return ta(r) > n ? ni(t, e - 1, n) : r;
}
function On(t, e, n = 1 / 0, r = 1 / 0, s = ea()) {
  const [i, o] = s;
  if (e == null || // this matches null and undefined -> eqeq not eqeqeq
  ["boolean", "string"].includes(typeof e) || typeof e == "number" && Number.isFinite(e))
    return e;
  const a = Xo(t, e);
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
      return On("", l, c - 1, r, s);
    } catch (l) {
    }
  const f = Array.isArray(e) ? [] : {};
  let p = 0;
  const m = Ls(e);
  for (const l in m) {
    if (!Object.prototype.hasOwnProperty.call(m, l))
      continue;
    if (p >= r) {
      f[l] = "[MaxProperties ~]";
      break;
    }
    const _ = m[l];
    f[l] = On(l, _, c - 1, r, s), p++;
  }
  return o(e), f;
}
function Xo(t, e) {
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
    if (xs(e))
      return ws(e);
    if (lo(e))
      return "[SyntheticEvent]";
    if (typeof e == "number" && !Number.isFinite(e))
      return `[${e}]`;
    if (typeof e == "function")
      return `[Function: ${Ms(e)}]`;
    if (typeof e == "symbol")
      return `[${String(e)}]`;
    if (typeof e == "bigint")
      return `[BigInt: ${String(e)}]`;
    const n = Zo(e);
    return /^HTML(\w*)Element$/.test(n) ? `[HTMLElement: ${n}]` : `[object ${n}]`;
  } catch (n) {
    return `**non-serializable** (${n})`;
  }
}
function Zo(t) {
  const e = Object.getPrototypeOf(t);
  return e != null && e.constructor ? e.constructor.name : "null prototype";
}
function Qo(t) {
  return ~-encodeURI(t).split(/%..|./).length;
}
function ta(t) {
  return Qo(JSON.stringify(t));
}
function ea() {
  const t = /* @__PURE__ */ new WeakSet();
  function e(r) {
    return t.has(r) ? !0 : (t.add(r), !1);
  }
  function n(r) {
    t.delete(r);
  }
  return [e, n];
}
function lt(t, e = []) {
  return [t, e];
}
function na(t, e) {
  const [n, r] = t;
  return [n, [...r, e]];
}
function ne(t, e) {
  const n = t[1];
  for (const r of n) {
    const s = r[0].type;
    if (e(r, s))
      return !0;
  }
  return !1;
}
function vn(t) {
  const e = We(b);
  return e.encodePolyfill ? e.encodePolyfill(t) : new TextEncoder().encode(t);
}
function ra(t) {
  const [e, n] = t;
  let r = JSON.stringify(e);
  function s(i) {
    typeof r == "string" ? r = typeof i == "string" ? r + i : [vn(r), i] : r.push(typeof i == "string" ? vn(i) : i);
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
        c = JSON.stringify(B(a));
      }
      s(c);
    }
  }
  return typeof r == "string" ? r : sa(r);
}
function sa(t) {
  const e = t.reduce((s, i) => s + i.length, 0), n = new Uint8Array(e);
  let r = 0;
  for (const s of t)
    n.set(s, r), r += s.length;
  return n;
}
function ia(t) {
  return [{
    type: "span"
  }, t];
}
function oa(t) {
  const e = typeof t.data == "string" ? vn(t.data) : t.data;
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
const aa = {
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
function Lr(t) {
  return aa[t];
}
function ri(t) {
  if (!(t != null && t.sdk))
    return;
  const { name: e, version: n } = t.sdk;
  return { name: e, version: n };
}
function ca(t, e, n, r) {
  var i;
  const s = (i = t.sdkProcessingMetadata) == null ? void 0 : i.dynamicSamplingContext;
  return d(d(d({
    event_id: t.event_id,
    sent_at: (/* @__PURE__ */ new Date()).toISOString()
  }, e && { sdk: e }), !!n && r && { dsn: jt(r) }), s && {
    trace: s
  });
}
function ua(t, e) {
  var r, s, i, o;
  if (!e)
    return t;
  const n = t.sdk || {};
  return t.sdk = E(d({}, n), {
    name: n.name || e.name,
    version: n.version || e.version,
    integrations: [...((r = t.sdk) == null ? void 0 : r.integrations) || [], ...e.integrations || []],
    packages: [...((s = t.sdk) == null ? void 0 : s.packages) || [], ...e.packages || []],
    settings: (i = t.sdk) != null && i.settings || e.settings ? d(d({}, (o = t.sdk) == null ? void 0 : o.settings), e.settings) : void 0
  }), t;
}
function la(t, e, n, r) {
  const s = ri(n), i = d(d({
    sent_at: (/* @__PURE__ */ new Date()).toISOString()
  }, s && { sdk: s }), !!r && e && { dsn: jt(e) }), o = "aggregates" in t ? [{ type: "sessions" }, t] : [{ type: "session" }, t.toJSON()];
  return lt(i, [o]);
}
function fa(t, e, n, r) {
  const s = ri(n), i = t.type && t.type !== "replay_event" ? t.type : "event";
  ua(t, n == null ? void 0 : n.sdk);
  const o = ca(t, s, r, e);
  return delete t.sdkProcessingMetadata, lt(o, [[{ type: i }, t]]);
}
function da(t, e) {
  function n(l) {
    return !!l.trace_id && !!l.public_key;
  }
  const r = ct(t[0]), s = e == null ? void 0 : e.getDsn(), i = e == null ? void 0 : e.getOptions().tunnel, o = d(d({
    sent_at: (/* @__PURE__ */ new Date()).toISOString()
  }, n(r) && { trace: r }), !!i && s && { dsn: jt(s) }), { beforeSendSpan: a, ignoreSpans: c } = (e == null ? void 0 : e.getOptions()) || {}, u = c != null && c.length ? t.filter((l) => !Me(A(l), c)) : t, f = t.length - u.length;
  f && (e == null || e.recordDroppedEvent("before_send", "span", f));
  const p = a ? (l) => {
    const _ = A(l), S = a(_);
    return S || (kn(), _);
  } : A, m = [];
  for (const l of u) {
    const _ = p(l);
    _ && m.push(ia(_));
  }
  return lt(o, m);
}
function pa(t) {
  if (!y) return;
  const { description: e = "< unknown name >", op: n = "< unknown op >", parent_span_id: r } = A(t), { spanId: s } = t.spanContext(), i = Et(t), o = G(t), a = o === t, c = `[Tracing] Starting ${i ? "sampled" : "unsampled"} ${a ? "root " : ""}span`, u = [`op: ${n}`, `name: ${e}`, `ID: ${s}`];
  if (r && u.push(`parent ID: ${r}`), !a) {
    const { op: f, description: p } = A(o);
    u.push(`root ID: ${o.spanContext().spanId}`), f && u.push(`root op: ${f}`), p && u.push(`root description: ${p}`);
  }
  g.log(`${c}
  ${u.join(`
  `)}`);
}
function ma(t) {
  if (!y) return;
  const { description: e = "< unknown name >", op: n = "< unknown op >" } = A(t), { spanId: r } = t.spanContext(), i = G(t) === t, o = `[Tracing] Finishing "${n}" ${i ? "root " : ""}span "${e}" with ID ${r}`;
  g.log(o);
}
function _a(t, e, n, r = Bt()) {
  const s = r && G(r);
  s && (y && g.log(`[Measurement] Setting measurement on root span: ${t} = ${e} ${n}`), s.addEvent(t, {
    [Hs]: e,
    [Gs]: n
  }));
}
function Fr(t) {
  if (!t || t.length === 0)
    return;
  const e = {};
  return t.forEach((n) => {
    const r = n.attributes || {}, s = r[Gs], i = r[Hs];
    typeof s == "string" && typeof i == "number" && (e[n.name] = { value: i, unit: s });
  }), e;
}
const Ur = 1e3;
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
    this._traceId = e.traceId || at(), this._spanId = e.spanId || Ut(), this._startTime = e.startTimestamp || Q(), this._links = e.links, this._attributes = {}, this.setAttributes(d({
      [D]: "manual",
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
      traceFlags: r ? Jn : Ys
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
    this._startTime = mt(e);
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
    return this._name = e, this.setAttribute(et, "custom"), this;
  }
  /** @inheritdoc */
  end(e) {
    this._endTime || (this._endTime = mt(e), ma(this), this._onSpanEnded());
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
      status: Xs(this._status),
      timestamp: this._endTime,
      trace_id: this._traceId,
      origin: this._attributes[D],
      profile_id: this._attributes[zn],
      exclusive_time: this._attributes[qn],
      measurements: Fr(this._events),
      is_segment: this._isStandaloneSpan && G(this) === this || void 0,
      segment_id: this._isStandaloneSpan ? G(this).spanContext().spanId : void 0,
      links: Ks(this._links)
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
    y && g.log("[Tracing] Adding an event to span:", e);
    const s = jr(n) ? n : r || Q(), i = jr(n) ? {} : n || {}, o = {
      name: e,
      time: mt(s),
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
    const e = O();
    if (e && e.emit("spanEnd", this), !(this._isStandaloneSpan || this === G(this)))
      return;
    if (this._isStandaloneSpan) {
      this._sampled ? ha(da([this], e)) : (y && g.log("[Tracing] Discarding standalone span because its trace was not chosen to be sampled."), e && e.recordDroppedEvent("sample_rate", "span"));
      return;
    }
    const r = this._convertSpanToTransaction();
    r && (ve(this).scope || v()).captureEvent(r);
  }
  /**
   * Finish the transaction & prepare the event to send to Sentry.
   */
  _convertSpanToTransaction() {
    var f;
    if (!Br(A(this)))
      return;
    this._name || (y && g.warn("Transaction has no name, falling back to `<unlabeled transaction>`."), this._name = "<unlabeled transaction>");
    const { scope: e, isolationScope: n } = ve(this), r = (f = e == null ? void 0 : e.getScopeData().sdkProcessingMetadata) == null ? void 0 : f.normalizedRequest;
    if (this._sampled !== !0)
      return;
    const i = Te(this).filter((p) => p !== this && !ga(p)).map((p) => A(p)).filter(Br), o = this._attributes[et];
    delete this._attributes[Mr], i.forEach((p) => {
      delete p.data[Mr];
    });
    const a = d({
      contexts: {
        trace: qo(this)
      },
      spans: (
        // spans.sort() mutates the array, but `spans` is already a copy so we can safely do this here
        // we do not use spans anymore after this point
        i.length > Ur ? i.sort((p, m) => p.start_timestamp - m.start_timestamp).slice(0, Ur) : i
      ),
      start_timestamp: this._startTime,
      timestamp: this._endTime,
      transaction: this._name,
      type: "transaction",
      sdkProcessingMetadata: {
        capturedSpanScope: e,
        capturedSpanIsolationScope: n,
        dynamicSamplingContext: ct(this)
      },
      request: r
    }, o && {
      transaction_info: {
        source: o
      }
    }), c = Fr(this._events);
    return c && Object.keys(c).length && (y && g.log(
      "[Measurements] Adding measurements to transaction event",
      JSON.stringify(c, void 0, 2)
    ), a.measurements = c), a;
  }
}
function jr(t) {
  return t && typeof t == "number" || t instanceof Date || Array.isArray(t);
}
function Br(t) {
  return !!t.start_timestamp && !!t.timestamp && !!t.span_id && !!t.trace_id;
}
function ga(t) {
  return t instanceof Qe && t.isStandaloneSpan();
}
function ha(t) {
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
function tn(t, e, n = () => {
}, r = () => {
}) {
  let s;
  try {
    s = t();
  } catch (i) {
    throw e(i), n(), i;
  }
  return ya(s, e, n, r);
}
function ya(t, e, n, r) {
  return Ft(t) ? t.then(
    (s) => (n(), r(s), s),
    (s) => {
      throw e(s), n(), s;
    }
  ) : (n(), r(t), t);
}
function Sa(t, e, n) {
  if (!Ze(t))
    return [!1];
  let r, s;
  typeof t.tracesSampler == "function" ? (s = t.tracesSampler(E(d({}, e), {
    inheritOrSampleWith: (a) => typeof e.parentSampleRate == "number" ? e.parentSampleRate : typeof e.parentSampled == "boolean" ? Number(e.parentSampled) : a
  })), r = !0) : e.parentSampled !== void 0 ? s = e.parentSampled : typeof t.tracesSampleRate != "undefined" && (s = t.tracesSampleRate, r = !0);
  const i = Wn(s);
  if (i === void 0)
    return y && g.warn(
      `[Tracing] Discarding root span because of invalid sample rate. Sample rate must be a boolean or a number between 0 and 1. Got ${JSON.stringify(
        s
      )} of type ${JSON.stringify(typeof s)}.`
    ), [!1];
  if (!i)
    return y && g.log(
      `[Tracing] Discarding transaction because ${typeof t.tracesSampler == "function" ? "tracesSampler returned 0 or false" : "a negative sampling decision was inherited or tracesSampleRate is set to 0"}`
    ), [!1, i, r];
  const o = n < i;
  return o || y && g.log(
    `[Tracing] Discarding transaction because it's not included in the random sample (sampling rate = ${Number(
      s
    )})`
  ), [o, i, r];
}
const si = "__SENTRY_SUPPRESS_TRACING__";
function oe(t, e) {
  const n = nn();
  if (n.startSpan)
    return n.startSpan(t, e);
  const r = Kn(t), { forceTransaction: s, parentSpan: i, scope: o } = t, a = o == null ? void 0 : o.clone();
  return ut(a, () => oi(i)(() => {
    const u = v(), f = Xn(u, i), m = t.onlyIfParent && !f ? new bt() : Vn({
      parentSpan: f,
      spanArguments: r,
      forceTransaction: s,
      scope: u
    });
    return St(u, m), tn(
      () => e(m),
      () => {
        const { status: l } = A(m);
        m.isRecording() && (!l || l === "ok") && m.setStatus({ code: R, message: "internal_error" });
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
  const r = Kn(t), { forceTransaction: s, parentSpan: i, scope: o } = t, a = o == null ? void 0 : o.clone();
  return ut(a, () => oi(i)(() => {
    const u = v(), f = Xn(u, i), m = t.onlyIfParent && !f ? new bt() : Vn({
      parentSpan: f,
      spanArguments: r,
      forceTransaction: s,
      scope: u
    });
    return St(u, m), tn(
      // We pass the `finish` function to the callback, so the user can finish the span manually
      // this is mainly here for historic purposes because previously, we instructed users to call
      // `finish` instead of `span.end()` to also clean up the scope. Nowadays, calling `span.end()`
      // or `finish` has the same effect and we simply leave it here to avoid breaking user code.
      () => e(m, () => m.end()),
      () => {
        const { status: l } = A(m);
        m.isRecording() && (!l || l === "ok") && m.setStatus({ code: R, message: "internal_error" });
      }
    );
  }));
}
function ii(t) {
  const e = nn();
  if (e.startInactiveSpan)
    return e.startInactiveSpan(t);
  const n = Kn(t), { forceTransaction: r, parentSpan: s } = t;
  return (t.scope ? (o) => ut(t.scope, o) : s !== void 0 ? (o) => en(s, o) : (o) => o())(() => {
    const o = v(), a = Xn(o, s);
    return t.onlyIfParent && !a ? new bt() : Vn({
      parentSpan: a,
      spanArguments: n,
      forceTransaction: r,
      scope: o
    });
  });
}
function en(t, e) {
  const n = nn();
  return n.withActiveSpan ? n.withActiveSpan(t, e) : ut((r) => (St(r, t || void 0), e(r)));
}
function md(t) {
  return ut((e) => (e.setPropagationContext({
    traceId: at(),
    sampleRand: Math.random()
  }), y && g.log(`Starting a new trace with id ${e.getPropagationContext().traceId}`), en(null, t)));
}
function Vn({
  parentSpan: t,
  spanArguments: e,
  forceTransaction: n,
  scope: r
}) {
  if (!Ze()) {
    const o = new bt();
    if (n || !t) {
      const a = d({
        sampled: "false",
        sample_rate: "0",
        transaction: e.name
      }, ct(o));
      Ie(o, a);
    }
    return o;
  }
  const s = U();
  let i;
  if (t && !n)
    i = Ea(t, r, e), Zs(t, i);
  else if (t) {
    const o = ct(t), { traceId: a, spanId: c } = t.spanContext(), u = Et(t);
    i = Gr(
      d({
        traceId: a,
        parentSpanId: c
      }, e),
      r,
      u
    ), Ie(i, o);
  } else {
    const {
      traceId: o,
      dsc: a,
      parentSpanId: c,
      sampled: u
    } = d(d({}, s.getPropagationContext()), r.getPropagationContext());
    i = Gr(
      d({
        traceId: o,
        parentSpanId: c
      }, e),
      r,
      u
    ), a && Ie(i, a);
  }
  return pa(i), Po(i, r, s), i;
}
function Kn(t) {
  const e = t.experimental || {}, n = d({
    isStandalone: e.standalone
  }, t);
  if (t.startTime) {
    const r = d({}, n);
    return r.startTimestamp = mt(t.startTime), delete r.startTime, r;
  }
  return n;
}
function nn() {
  const t = xt();
  return ie(t);
}
function Gr(t, e, n) {
  var _, S;
  const r = O(), s = (r == null ? void 0 : r.getOptions()) || {}, { name: i = "" } = t, o = { spanAttributes: d({}, t.attributes), spanName: i, parentSampled: n };
  r == null || r.emit("beforeSampling", o, { decision: !1 });
  const a = (_ = o.parentSampled) != null ? _ : n, c = o.spanAttributes, u = e.getPropagationContext(), [f, p, m] = e.getScopeData().sdkProcessingMetadata[si] ? [!1] : Sa(
    s,
    {
      name: i,
      parentSampled: a,
      attributes: c,
      parentSampleRate: Wn((S = u.dsc) == null ? void 0 : S.sample_rate)
    },
    u.sampleRand
  ), l = new Qe(E(d({}, t), {
    attributes: d({
      [et]: "custom",
      [Bs]: p !== void 0 && m ? p : void 0
    }, c),
    sampled: f
  }));
  return !f && r && (y && g.log("[Tracing] Discarding root span because its trace was not chosen to be sampled."), r.recordDroppedEvent("sample_rate", "transaction")), r && r.emit("spanStart", l), l;
}
function Ea(t, e, n) {
  const { spanId: r, traceId: s } = t.spanContext(), i = e.getScopeData().sdkProcessingMetadata[si] ? !1 : Et(t), o = i ? new Qe(E(d({}, n), {
    parentSpanId: r,
    traceId: s,
    sampled: i
  })) : new bt({ traceId: s });
  Zs(t, o);
  const a = O();
  return a && (a.emit("spanStart", o), n.endTimestamp && a.emit("spanEnd", o)), o;
}
function Xn(t, e) {
  if (e)
    return e;
  if (e === null)
    return;
  const n = Mt(t);
  if (!n)
    return;
  const r = O();
  return (r ? r.getOptions() : {}).parentSpanIsAlwaysRootSpan ? G(n) : n;
}
function oi(t) {
  return t !== void 0 ? (e) => en(t, e) : (e) => e();
}
const yn = {
  idleTimeout: 1e3,
  finalTimeout: 3e4,
  childSpanTimeout: 15e3
}, ba = "heartbeatFailed", Ta = "idleTimeout", Ia = "finalTimeout", Aa = "externalFinish";
function Na(t, e = {}) {
  const n = /* @__PURE__ */ new Map();
  let r = !1, s, i = Aa, o = !e.disableAutoFinish;
  const a = [], {
    idleTimeout: c = yn.idleTimeout,
    finalTimeout: u = yn.finalTimeout,
    childSpanTimeout: f = yn.childSpanTimeout,
    beforeSpanEnd: p,
    trimIdleSpanEndTimestamp: m = !0
  } = e, l = O();
  if (!l || !Ze()) {
    const T = new bt(), C = d({
      sample_rate: "0",
      sampled: "false"
    }, ct(T));
    return Ie(T, C), T;
  }
  const _ = v(), S = Bt(), h = Ra(t);
  h.end = new Proxy(h.end, {
    apply(T, C, Wt) {
      if (p && p(h), C instanceof bt)
        return;
      const [Jt, ...nt] = Wt, It = Jt || Q(), j = mt(It), M = Te(h).filter((K) => K !== h), Yt = A(h);
      if (!M.length || !m)
        return Tt(j), Reflect.apply(T, C, [j, ...nt]);
      const At = l.getOptions().ignoreSpans, ue = M == null ? void 0 : M.reduce((K, fe) => {
        const de = A(fe);
        return !de.timestamp || At && Me(de, At) ? K : K ? Math.max(K, de.timestamp) : de.timestamp;
      }, void 0), Nt = Yt.start_timestamp, le = Math.min(
        Nt ? Nt + u / 1e3 : 1 / 0,
        Math.max(Nt || -1 / 0, Math.min(j, ue || 1 / 0))
      );
      return Tt(le), Reflect.apply(T, C, [le, ...nt]);
    }
  });
  function N() {
    s && (clearTimeout(s), s = void 0);
  }
  function I(T) {
    N(), s = setTimeout(() => {
      !r && n.size === 0 && o && (i = Ta, h.end(T));
    }, c);
  }
  function k(T) {
    s = setTimeout(() => {
      !r && o && (i = ba, h.end(T));
    }, f);
  }
  function P(T) {
    N(), n.set(T, !0);
    const C = Q();
    k(C + f / 1e3);
  }
  function V(T) {
    if (n.has(T) && n.delete(T), n.size === 0) {
      const C = Q();
      I(C + c / 1e3);
    }
  }
  function Tt(T) {
    r = !0, n.clear(), a.forEach((M) => M()), St(_, S);
    const C = A(h), { start_timestamp: Wt } = C;
    if (!Wt)
      return;
    C.data[Oe] || h.setAttribute(Oe, i);
    const nt = C.status;
    (!nt || nt === "unknown") && h.setStatus({ code: Xe }), g.log(`[Tracing] Idle span "${C.op}" finished`);
    const It = Te(h).filter((M) => M !== h);
    let j = 0;
    It.forEach((M) => {
      M.isRecording() && (M.setStatus({ code: R, message: "cancelled" }), M.end(T), y && g.log("[Tracing] Cancelling span since span ended early", JSON.stringify(M, void 0, 2)));
      const Yt = A(M), { timestamp: At = 0, start_timestamp: ue = 0 } = Yt, Nt = ue <= T, le = (u + c) / 1e3, K = At - ue <= le;
      if (y) {
        const fe = JSON.stringify(M, void 0, 2);
        Nt ? K || g.log("[Tracing] Discarding span since it finished after idle span final timeout", fe) : g.log("[Tracing] Discarding span since it happened after idle span was finished", fe);
      }
      (!K || !Nt) && (Yo(h, M), j++);
    }), j > 0 && h.setAttribute("sentry.idle_span_discarded_spans", j);
  }
  return a.push(
    l.on("spanStart", (T) => {
      if (r || T === h || A(T).timestamp || T instanceof Qe && T.isStandaloneSpan())
        return;
      Te(h).includes(T) && P(T.spanContext().spanId);
    })
  ), a.push(
    l.on("spanEnd", (T) => {
      r || V(T.spanContext().spanId);
    })
  ), a.push(
    l.on("idleSpanEnableAutoFinish", (T) => {
      T === h && (o = !0, I(), n.size && k());
    })
  ), e.disableAutoFinish || I(), setTimeout(() => {
    r || (h.setStatus({ code: R, message: "deadline_exceeded" }), i = Ia, h.end());
  }, u), h;
}
function Ra(t) {
  const e = ii(t);
  return St(v(), e), y && g.log("[Tracing] Started span is an idle span"), e;
}
const Sn = 0, Hr = 1, zr = 2;
function Gt(t) {
  return new Ct((e) => {
    e(t);
  });
}
function Zn(t) {
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
      n[0] || (this._state === Hr && n[1](this._value), this._state === zr && n[2](this._value), n[0] = !0);
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
      n(Hr, i);
    }, s = (i) => {
      n(zr, i);
    };
    try {
      e(r, s);
    } catch (i) {
      s(i);
    }
  }
}
function ka(t, e, n, r = 0) {
  try {
    const s = Mn(e, n, t, r);
    return Ft(s) ? s : Gt(s);
  } catch (s) {
    return Zn(s);
  }
}
function Mn(t, e, n, r) {
  const s = n[r];
  if (!t || !s)
    return t;
  const i = s(d({}, t), e);
  return y && i === null && g.log(`Event processor "${s.id || "?"}" dropped event`), Ft(i) ? i.then((o) => Mn(o, e, n, r + 1)) : Mn(i, e, n, r + 1);
}
function Oa(t, e) {
  const { fingerprint: n, span: r, breadcrumbs: s, sdkProcessingMetadata: i } = e;
  va(t, e), r && Ca(t, r), Pa(t, n), Ma(t, s), wa(t, i);
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
    attachments: p,
    propagationContext: m,
    transactionName: l,
    span: _
  } = e;
  he(t, "extra", n), he(t, "tags", r), he(t, "user", s), he(t, "contexts", i), t.sdkProcessingMetadata = se(t.sdkProcessingMetadata, a, 2), o && (t.level = o), l && (t.transactionName = l), _ && (t.span = _), c.length && (t.breadcrumbs = [...t.breadcrumbs, ...c]), u.length && (t.fingerprint = [...t.fingerprint, ...u]), f.length && (t.eventProcessors = [...t.eventProcessors, ...f]), p.length && (t.attachments = [...t.attachments, ...p]), t.propagationContext = d(d({}, t.propagationContext), m);
}
function he(t, e, n) {
  t[e] = se(t[e], n, 1);
}
function va(t, e) {
  const { extra: n, tags: r, user: s, contexts: i, level: o, transactionName: a } = e;
  Object.keys(n).length && (t.extra = d(d({}, n), t.extra)), Object.keys(r).length && (t.tags = d(d({}, r), t.tags)), Object.keys(s).length && (t.user = d(d({}, s), t.user)), Object.keys(i).length && (t.contexts = d(d({}, i), t.contexts)), o && (t.level = o), a && t.type !== "transaction" && (t.transaction = a);
}
function Ma(t, e) {
  const n = [...t.breadcrumbs || [], ...e];
  t.breadcrumbs = n.length ? n : void 0;
}
function wa(t, e) {
  t.sdkProcessingMetadata = d(d({}, t.sdkProcessingMetadata), e);
}
function Ca(t, e) {
  t.contexts = d({
    trace: Vs(e)
  }, t.contexts), t.sdkProcessingMetadata = d({
    dynamicSamplingContext: ct(e)
  }, t.sdkProcessingMetadata);
  const n = G(e), r = A(n).description;
  r && !t.transaction && t.type === "transaction" && (t.transaction = r);
}
function Pa(t, e) {
  t.fingerprint = t.fingerprint ? Array.isArray(t.fingerprint) ? t.fingerprint : [t.fingerprint] : [], e && (t.fingerprint = t.fingerprint.concat(e)), t.fingerprint.length || delete t.fingerprint;
}
let X, qr, Wr, st;
function xa(t) {
  const e = b._sentryDebugIds, n = b._debugIds;
  if (!e && !n)
    return {};
  const r = e ? Object.keys(e) : [], s = n ? Object.keys(n) : [];
  if (st && r.length === qr && s.length === Wr)
    return st;
  qr = r.length, Wr = s.length, st = {}, X || (X = {});
  const i = (o, a) => {
    for (const c of o) {
      const u = a[c], f = X == null ? void 0 : X[c];
      if (f && st && u)
        st[f[0]] = u, X && (X[c] = [f[0], u]);
      else if (u) {
        const p = t(c);
        for (let m = p.length - 1; m >= 0; m--) {
          const l = p[m], _ = l == null ? void 0 : l.filename;
          if (_ && st && X) {
            st[_] = u, X[c] = [_, u];
            break;
          }
        }
      }
    }
  };
  return e && i(r, e), n && i(s, n), st;
}
function Da(t, e, n, r, s, i) {
  const { normalizeDepth: o = 3, normalizeMaxBreadth: a = 1e3 } = t, c = E(d({}, e), {
    event_id: e.event_id || n.event_id || W(),
    timestamp: e.timestamp || re()
  }), u = n.integrations || t.integrations.map((h) => h.name);
  $a(c, t), Ua(c, u), s && s.emit("applyFrameMetadata", e), e.type === void 0 && La(c, t.stackParser);
  const f = Ba(r, n.captureContext);
  n.mechanism && ot(c, n.mechanism);
  const p = s ? s.getEventProcessors() : [], m = Hn().getScopeData();
  if (i) {
    const h = i.getScopeData();
    Pt(m, h);
  }
  if (f) {
    const h = f.getScopeData();
    Pt(m, h);
  }
  const l = [...n.attachments || [], ...m.attachments];
  l.length && (n.attachments = l), Oa(c, m);
  const _ = [
    ...p,
    // Run scope event processors _after_ all other processors
    ...m.eventProcessors
  ];
  return ka(_, c, n).then((h) => (h && Fa(h), typeof o == "number" && o > 0 ? ja(h, o, a) : h));
}
function $a(t, e) {
  var a, c;
  const { environment: n, release: r, dist: s, maxValueLength: i } = e;
  t.environment = t.environment || n || Yn, !t.release && r && (t.release = r), !t.dist && s && (t.dist = s);
  const o = t.request;
  o != null && o.url && i && (o.url = te(o.url, i)), i && ((c = (a = t.exception) == null ? void 0 : a.values) == null || c.forEach((u) => {
    u.value && (u.value = te(u.value, i));
  }));
}
function La(t, e) {
  var r, s;
  const n = xa(e);
  (s = (r = t.exception) == null ? void 0 : r.values) == null || s.forEach((i) => {
    var o, a;
    (a = (o = i.stacktrace) == null ? void 0 : o.frames) == null || a.forEach((c) => {
      c.filename && (c.debug_id = n[c.filename]);
    });
  });
}
function Fa(t) {
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
function Ua(t, e) {
  e.length > 0 && (t.sdk = t.sdk || {}, t.sdk.integrations = [...t.sdk.integrations || [], ...e]);
}
function ja(t, e, n) {
  var s, i;
  if (!t)
    return null;
  const r = d(d(d(d(d({}, t), t.breadcrumbs && {
    breadcrumbs: t.breadcrumbs.map((o) => d(d({}, o), o.data && {
      data: B(o.data, e, n)
    }))
  }), t.user && {
    user: B(t.user, e, n)
  }), t.contexts && {
    contexts: B(t.contexts, e, n)
  }), t.extra && {
    extra: B(t.extra, e, n)
  });
  return (s = t.contexts) != null && s.trace && r.contexts && (r.contexts.trace = t.contexts.trace, t.contexts.trace.data && (r.contexts.trace.data = B(t.contexts.trace.data, e, n))), t.spans && (r.spans = t.spans.map((o) => d(d({}, o), o.data && {
    data: B(o.data, e, n)
  }))), (i = t.contexts) != null && i.flags && r.contexts && (r.contexts.flags = B(t.contexts.flags, 3, n)), r;
}
function Ba(t, e) {
  if (!e)
    return t;
  const n = t ? t.clone() : new Y();
  return n.update(e), n;
}
function Ga(t) {
  if (t)
    return Ha(t) ? { captureContext: t } : qa(t) ? {
      captureContext: t
    } : t;
}
function Ha(t) {
  return t instanceof Y || typeof t == "function";
}
const za = [
  "user",
  "level",
  "extra",
  "contexts",
  "tags",
  "fingerprint",
  "propagationContext"
];
function qa(t) {
  return Object.keys(t).some((e) => za.includes(e));
}
function x(t, e) {
  return v().captureException(t, Ga(e));
}
function Jr(t, e) {
  const n = typeof e == "string" ? e : void 0, r = typeof e != "string" ? { captureContext: e } : void 0;
  return v().captureMessage(t, n, r);
}
function _d(t, e) {
  return v().captureEvent(t, e);
}
function gd(t, e) {
  U().setContext(t, e);
}
function hd(t) {
  U().setExtras(t);
}
function Yr(t, e) {
  U().setExtra(t, e);
}
function yd(t) {
  U().setTags(t);
}
function Vr(t, e) {
  U().setTag(t, e);
}
function Sd(t) {
  U().setUser(t);
}
function ai() {
  return U().lastEventId();
}
function rn(t) {
  U().addEventProcessor(t);
}
const Wa = "7";
function Ja(t) {
  const e = t.protocol ? `${t.protocol}:` : "", n = t.port ? `:${t.port}` : "";
  return `${e}//${t.host}${n}${t.path ? `/${t.path}` : ""}/api/`;
}
function Ya(t) {
  return `${Ja(t)}${t.projectId}/envelope/`;
}
function Va(t, e) {
  const n = {
    sentry_version: Wa
  };
  return t.publicKey && (n.sentry_key = t.publicKey), e && (n.sentry_client = `${e.name}/${e.version}`), new URLSearchParams(n).toString();
}
function ci(t, e, n) {
  return e || `${Ya(t)}?${Va(t, n)}`;
}
const Kr = [];
function Ka(t, e) {
  const n = {};
  return e.forEach((r) => {
    r && ui(t, r, n);
  }), n;
}
function Xr(t, e) {
  for (const n of e)
    n != null && n.afterAllSetup && n.afterAllSetup(t);
}
function ui(t, e, n) {
  if (n[e.name]) {
    y && g.log(`Integration skipped because it was already installed: ${e.name}`);
    return;
  }
  if (n[e.name] = e, !Kr.includes(e.name) && typeof e.setupOnce == "function" && (e.setupOnce(), Kr.push(e.name)), e.setup && typeof e.setup == "function" && e.setup(t), typeof e.preprocessEvent == "function") {
    const r = e.preprocessEvent.bind(e);
    t.on("preprocessEvent", (s, i) => r(s, i, t));
  }
  if (typeof e.processEvent == "function") {
    const r = e.processEvent.bind(e), s = Object.assign((i, o) => r(i, o, t), {
      id: e.name
    });
    t.addEventProcessor(s);
  }
  y && g.log(`Integration installed: ${e.name}`);
}
function li(t, e) {
  return e ? ut(e, () => {
    const n = Bt(), r = n ? Vs(n) : js(e);
    return [n ? ct(n) : ei(t, e), r];
  }) : [void 0, void 0];
}
const Xa = {
  trace: 1,
  debug: 5,
  info: 9,
  warn: 13,
  error: 17,
  fatal: 21
};
function Za(t) {
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
function Qa(t, e, n, r) {
  const s = {};
  return e != null && e.sdk && (s.sdk = {
    name: e.sdk.name,
    version: e.sdk.version
  }), n && r && (s.dsn = jt(r)), lt(s, [Za(t)]);
}
const tc = 100;
function ec(t) {
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
function q(t, e, n, r = !0) {
  n && (!t[e] || r) && (t[e] = n);
}
function nc(t, e) {
  const n = Qn(), r = di(t);
  r === void 0 ? n.set(t, [e]) : r.length >= tc ? (fi(t, r), n.set(t, [e])) : n.set(t, [...r, e]);
}
function Ce(t, e = v(), n = nc) {
  var Jt, nt, It;
  const r = (Jt = e == null ? void 0 : e.getClient()) != null ? Jt : O();
  if (!r) {
    y && g.warn("No client available to capture log.");
    return;
  }
  const { release: s, environment: i, enableLogs: o = !1, beforeSendLog: a } = r.getOptions();
  if (!o) {
    y && g.warn("logging option not enabled, log will not be captured.");
    return;
  }
  const [, c] = li(r, e), u = d({}, t.attributes), {
    user: { id: f, email: p, username: m }
  } = rc(e);
  q(u, "user.id", f, !1), q(u, "user.email", p, !1), q(u, "user.name", m, !1), q(u, "sentry.release", s), q(u, "sentry.environment", i);
  const { name: l, version: _ } = (It = (nt = r.getSdkMetadata()) == null ? void 0 : nt.sdk) != null ? It : {};
  q(u, "sentry.sdk.name", l), q(u, "sentry.sdk.version", _);
  const S = r.getIntegrationByName("Replay"), h = S == null ? void 0 : S.getReplayId(!0);
  q(u, "sentry.replay_id", h), h && (S == null ? void 0 : S.getRecordingMode()) === "buffer" && q(u, "sentry._internal.replay_is_buffering", !0);
  const N = t.message;
  if (Je(N)) {
    const { __sentry_template_string__: j, __sentry_template_values__: M = [] } = N;
    M != null && M.length && (u["sentry.message.template"] = j), M.forEach((Yt, At) => {
      u[`sentry.message.parameter.${At}`] = Yt;
    });
  }
  const I = Mt(e);
  q(u, "sentry.trace.parent_span_id", I == null ? void 0 : I.spanContext().spanId);
  const k = E(d({}, t), { attributes: u });
  r.emit("beforeCaptureLog", k);
  const P = a ? $t(() => a(k)) : k;
  if (!P) {
    r.recordDroppedEvent("before_send", "log_item", 1), y && g.warn("beforeSendLog returned null, log will not be captured.");
    return;
  }
  const { level: V, message: Tt, attributes: T = {}, severityNumber: C } = P, Wt = {
    timestamp: Q(),
    level: V,
    body: Tt,
    trace_id: c == null ? void 0 : c.trace_id,
    severity_number: C != null ? C : Xa[V],
    attributes: Object.keys(T).reduce(
      (j, M) => (j[M] = ec(T[M]), j),
      {}
    )
  };
  n(r, Wt), r.emit("afterCaptureLog", P);
}
function fi(t, e) {
  var i;
  const n = (i = e != null ? e : di(t)) != null ? i : [];
  if (n.length === 0)
    return;
  const r = t.getOptions(), s = Qa(n, r._metadata, r.tunnel, t.getDsn());
  Qn().set(t, []), t.emit("flushLogs"), t.sendEnvelope(s);
}
function di(t) {
  return Qn().get(t);
}
function rc(t) {
  const e = Hn().getScopeData();
  return Pt(e, U().getScopeData()), Pt(e, t.getScopeData()), e;
}
function Qn() {
  return Dt("clientToLogBufferMap", () => /* @__PURE__ */ new WeakMap());
}
function sc(t) {
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
function ic(t, e, n, r) {
  const s = {};
  return e != null && e.sdk && (s.sdk = {
    name: e.sdk.name,
    version: e.sdk.version
  }), n && r && (s.dsn = jt(r)), lt(s, [sc(t)]);
}
const oc = 1e3;
function ac(t) {
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
function Z(t, e, n, r = !0) {
  n && (r || !(e in t)) && (t[e] = n);
}
function cc(t, e) {
  const n = tr(), r = mi(t);
  r === void 0 ? n.set(t, [e]) : r.length >= oc ? (pi(t, r), n.set(t, [e])) : n.set(t, [...r, e]);
}
function uc(t, e, n) {
  var l, _;
  const { release: r, environment: s } = e.getOptions(), i = d({}, t.attributes), {
    user: { id: o, email: a, username: c }
  } = dc(n);
  Z(i, "user.id", o, !1), Z(i, "user.email", a, !1), Z(i, "user.name", c, !1), Z(i, "sentry.release", r), Z(i, "sentry.environment", s);
  const { name: u, version: f } = (_ = (l = e.getSdkMetadata()) == null ? void 0 : l.sdk) != null ? _ : {};
  Z(i, "sentry.sdk.name", u), Z(i, "sentry.sdk.version", f);
  const p = e.getIntegrationByName("Replay"), m = p == null ? void 0 : p.getReplayId(!0);
  return Z(i, "sentry.replay_id", m), m && (p == null ? void 0 : p.getRecordingMode()) === "buffer" && Z(i, "sentry._internal.replay_is_buffering", !0), E(d({}, t), {
    attributes: i
  });
}
function lc(t, e, n) {
  const r = {};
  for (const c in t.attributes)
    t.attributes[c] !== void 0 && (r[c] = ac(t.attributes[c]));
  const [, s] = li(e, n), i = Mt(n), o = i ? i.spanContext().traceId : s == null ? void 0 : s.trace_id, a = i ? i.spanContext().spanId : void 0;
  return {
    timestamp: Q(),
    trace_id: o != null ? o : "",
    span_id: a,
    name: t.name,
    type: t.type,
    unit: t.unit,
    value: t.value,
    attributes: r
  };
}
function fc(t, e) {
  var l, _, S, h;
  const n = (l = e == null ? void 0 : e.scope) != null ? l : v(), r = (_ = e == null ? void 0 : e.captureSerializedMetric) != null ? _ : cc, s = (S = n == null ? void 0 : n.getClient()) != null ? S : O();
  if (!s) {
    y && g.warn("No client available to capture metric.");
    return;
  }
  const { _experiments: i, enableMetrics: o, beforeSendMetric: a } = s.getOptions();
  if (!((h = o != null ? o : i == null ? void 0 : i.enableMetrics) != null ? h : !0)) {
    y && g.warn("metrics option not enabled, metric will not be captured.");
    return;
  }
  const u = uc(t, s, n);
  s.emit("processMetric", u);
  const f = a || (i == null ? void 0 : i.beforeSendMetric), p = f ? f(u) : u;
  if (!p) {
    y && g.log("`beforeSendMetric` returned `null`, will not send metric.");
    return;
  }
  const m = lc(p, s, n);
  y && g.log("[Metric]", m), r(s, m), s.emit("afterCaptureMetric", p);
}
function pi(t, e) {
  var i;
  const n = (i = e != null ? e : mi(t)) != null ? i : [];
  if (n.length === 0)
    return;
  const r = t.getOptions(), s = ic(n, r._metadata, r.tunnel, t.getDsn());
  tr().set(t, []), t.emit("flushMetrics"), t.sendEnvelope(s);
}
function mi(t) {
  return tr().get(t);
}
function dc(t) {
  const e = Hn().getScopeData();
  return Pt(e, U().getScopeData()), Pt(e, t.getScopeData()), e;
}
function tr() {
  return Dt("clientToMetricBufferMap", () => /* @__PURE__ */ new WeakMap());
}
const er = Symbol.for("SentryBufferFullError");
function _i(t = 100) {
  const e = /* @__PURE__ */ new Set();
  function n() {
    return e.size < t;
  }
  function r(o) {
    e.delete(o);
  }
  function s(o) {
    if (!n())
      return Zn(er);
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
const pc = 60 * 1e3;
function mc(t, e = Date.now()) {
  const n = parseInt(`${t}`, 10);
  if (!isNaN(n))
    return n * 1e3;
  const r = Date.parse(`${t}`);
  return isNaN(r) ? pc : r - e;
}
function _c(t, e) {
  return t[e] || t.all || 0;
}
function gc(t, e, n = Date.now()) {
  return _c(t, e) > n;
}
function hc(t, { statusCode: e, headers: n }, r = Date.now()) {
  const s = d({}, t), i = n == null ? void 0 : n["x-sentry-rate-limits"], o = n == null ? void 0 : n["retry-after"];
  if (i)
    for (const a of i.trim().split(",")) {
      const [c, u, , , f] = a.split(":", 5), p = parseInt(c, 10), m = (isNaN(p) ? 60 : p) * 1e3;
      if (!u)
        s.all = r + m;
      else
        for (const l of u.split(";"))
          l === "metric_bucket" ? (!f || f.split(";").includes("custom")) && (s[l] = r + m) : s[l] = r + m;
    }
  else o ? s.all = r + mc(o, r) : e === 429 && (s.all = r + 60 * 1e3);
  return s;
}
const gi = 64;
function yc(t, e, n = _i(
  t.bufferSize || gi
)) {
  let r = {};
  const s = (o) => n.drain(o);
  function i(o) {
    const a = [];
    if (ne(o, (p, m) => {
      const l = Lr(m);
      gc(r, l) ? t.recordDroppedEvent("ratelimit_backoff", l) : a.push(p);
    }), a.length === 0)
      return Promise.resolve({});
    const c = lt(o[0], a), u = (p) => {
      ne(c, (m, l) => {
        t.recordDroppedEvent(p, Lr(l));
      });
    }, f = () => e({ body: ra(c) }).then(
      (p) => (p.statusCode !== void 0 && (p.statusCode < 200 || p.statusCode >= 300) && y && g.warn(`Sentry responded with status code ${p.statusCode} to sent event.`), r = hc(r, p), p),
      (p) => {
        throw u("network_error"), y && g.error("Encountered error running transport request:", p), p;
      }
    );
    return n.add(f).then(
      (p) => p,
      (p) => {
        if (p === er)
          return y && g.error("Skipped sending event because buffer is full."), u("queue_overflow"), Promise.resolve({});
        throw p;
      }
    );
  }
  return {
    send: i,
    flush: s
  };
}
function Sc(t, e, n) {
  const r = [
    { type: "client_report" },
    {
      timestamp: re(),
      discarded_events: t
    }
  ];
  return lt(e ? { dsn: e } : {}, [r]);
}
function hi(t) {
  const e = [];
  t.message && e.push(t.message);
  try {
    const n = t.exception.values[t.exception.values.length - 1];
    n != null && n.value && (e.push(n.value), n.type && e.push(`${n.type}: ${n.value}`));
  } catch (n) {
  }
  return e;
}
function Ec(t) {
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
    profile_id: o == null ? void 0 : o[zn],
    exclusive_time: o == null ? void 0 : o[qn],
    measurements: t.measurements,
    is_segment: !0
  };
}
function bc(t) {
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
        data: d(d(d({}, t.data), t.profile_id && { [zn]: t.profile_id }), t.exclusive_time && { [qn]: t.exclusive_time })
      }
    },
    measurements: t.measurements
  };
}
const Zr = "Not capturing exception because it's already been captured.", Qr = "Discarded session because of missing or non-string release", yi = Symbol.for("SentryInternalError"), Si = Symbol.for("SentryDoNotSendEventError"), Tc = 5e3;
function Ae(t) {
  return {
    message: t,
    [yi]: !0
  };
}
function En(t) {
  return {
    message: t,
    [Si]: !0
  };
}
function ts(t) {
  return !!t && typeof t == "object" && yi in t;
}
function es(t) {
  return !!t && typeof t == "object" && Si in t;
}
function ns(t, e, n, r, s) {
  let i = 0, o, a = !1;
  t.on(n, () => {
    i = 0, clearTimeout(o), a = !1;
  }), t.on(e, (c) => {
    i += r(c), i >= 8e5 ? s(t) : a || (a = !0, o = setTimeout(() => {
      s(t);
    }, Tc));
  }), t.on("flush", () => {
    s(t);
  });
}
class Ic {
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
    if (this._options = e, this._integrations = {}, this._numProcessing = 0, this._outcomes = {}, this._hooks = {}, this._eventProcessors = [], this._promiseBuffer = _i((s = (r = e.transportOptions) == null ? void 0 : r.bufferSize) != null ? s : gi), e.dsn ? this._dsn = zo(e.dsn) : y && g.warn("No DSN provided, client will not send events."), this._dsn) {
      const f = ci(
        this._dsn,
        e.tunnel,
        e._metadata ? e._metadata.sdk : void 0
      );
      this._transport = e.transport(E(d({
        tunnel: this._options.tunnel,
        recordDroppedEvent: this.recordDroppedEvent.bind(this)
      }, e.transportOptions), {
        url: f
      }));
    }
    this._options.enableLogs = (o = this._options.enableLogs) != null ? o : (i = this._options._experiments) == null ? void 0 : i.enableLogs, this._options.enableLogs && ns(this, "afterCaptureLog", "flushLogs", kc, fi), ((u = (c = this._options.enableMetrics) != null ? c : (a = this._options._experiments) == null ? void 0 : a.enableMetrics) != null ? u : !0) && ns(
      this,
      "afterCaptureMetric",
      "flushMetrics",
      Rc,
      pi
    );
  }
  /**
   * Captures an exception event and sends it to Sentry.
   *
   * Unlike `captureException` exported from every SDK, this method requires that you pass it the current scope.
   */
  captureException(e, n, r) {
    const s = W();
    if (Or(e))
      return y && g.log(Zr), s;
    const i = d({
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
    const i = d({
      event_id: W()
    }, r), o = Je(e) ? e : String(e), a = Gn(e), c = a ? this.eventFromMessage(o, n, i) : this.eventFromException(e, i);
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
    const s = W();
    if (n != null && n.originalException && Or(n.originalException))
      return y && g.log(Zr), s;
    const i = d({
      event_id: s
    }, n), o = e.sdkProcessingMetadata || {}, a = o.capturedSpanScope, c = o.capturedSpanIsolationScope, u = rs(e.type);
    return this._process(
      () => this._captureEvent(e, i, a || r, c),
      u
    ), i.event_id;
  }
  /**
   * Captures a session.
   */
  captureSession(e) {
    this.sendSession(e), An(e, { init: !1 });
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
    return L(this, null, function* () {
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
    return L(this, null, function* () {
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
    ui(this, e, this._integrations), n || Xr(this, [e]);
  }
  /**
   * Send a fully prepared event to Sentry.
   */
  sendEvent(e, n = {}) {
    this.emit("beforeSendEvent", e, n);
    let r = fa(e, this._dsn, this._options._metadata, this._options.tunnel);
    for (const s of n.attachments || [])
      r = na(r, oa(s));
    this.sendEnvelope(r).then((s) => this.emit("afterSendEvent", e, s));
  }
  /**
   * Send a session or session aggregrates to Sentry.
   */
  sendSession(e) {
    const { release: n, environment: r = Yn } = this._options;
    if ("aggregates" in e) {
      const i = e.attrs || {};
      if (!i.release && !n) {
        y && g.warn(Qr);
        return;
      }
      i.release = i.release || n, i.environment = i.environment || r, e.attrs = i;
    } else {
      if (!e.release && !n) {
        y && g.warn(Qr);
        return;
      }
      e.release = e.release || n, e.environment = e.environment || r;
    }
    this.emit("beforeSendSession", e);
    const s = la(e, this._dsn, this._options._metadata, this._options.tunnel);
    this.sendEnvelope(s);
  }
  /**
   * Record on the client that an event got dropped (ie, an event that will not be sent to Sentry).
   */
  recordDroppedEvent(e, n, r = 1) {
    if (this._options.sendClientReports) {
      const s = `${e}:${n}`;
      y && g.log(`Recording outcome: "${s}"${r > 1 ? ` (${r} times)` : ""}`), this._outcomes[s] = (this._outcomes[s] || 0) + r;
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
    return L(this, null, function* () {
      if (this.emit("beforeEnvelope", e), this._isEnabled() && this._transport)
        try {
          return yield this._transport.send(e);
        } catch (n) {
          return y && g.error("Error while sending envelope:", n), {};
        }
      return y && g.error("Transport disabled"), {};
    });
  }
  /* eslint-enable @typescript-eslint/unified-signatures */
  /** Setup integrations for this client. */
  _setupIntegrations() {
    const { integrations: e } = this._options;
    this._integrations = Ka(this, e), Xr(this, e);
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
    (o && e.errors === 0 || o && r) && (An(e, E(d({}, r && { status: "crashed" }), {
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
    return L(this, null, function* () {
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
    return !n.integrations && (o != null && o.length) && (n.integrations = o), this.emit("preprocessEvent", e, n), e.type || s.setLastEventId(e.event_id || n.event_id), Da(i, e, n, r, this, s).then((a) => {
      if (a === null)
        return a;
      this.emit("postprocessEvent", a, n), a.contexts = d({
        trace: js(r)
      }, a.contexts);
      const c = ei(this, r);
      return a.sdkProcessingMetadata = d({
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
  _captureEvent(e, n = {}, r = v(), s = U()) {
    return y && wn(e) && g.log(`Captured error event \`${hi(e)[0] || "<unknown>"}\``), this._processEvent(e, n, r, s).then(
      (i) => i.event_id,
      (i) => {
        y && (es(i) ? g.log(i.message) : ts(i) ? g.warn(i.message) : g.warn(i));
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
    const i = this.getOptions(), { sampleRate: o } = i, a = Ei(e), c = wn(e), f = `before send for type \`${e.type || "error"}\``, p = typeof o == "undefined" ? void 0 : Wn(o);
    if (c && typeof p == "number" && Math.random() > p)
      return this.recordDroppedEvent("sample_rate", "error"), Zn(
        En(
          `Discarding event because it's not included in the random sample (sampling rate = ${o})`
        )
      );
    const m = rs(e.type);
    return this._prepareEvent(e, n, r, s).then((l) => {
      if (l === null)
        throw this.recordDroppedEvent("event_processor", m), En("An event processor returned `null`, will not send event.");
      if (n.data && n.data.__sentry__ === !0)
        return l;
      const S = Nc(this, i, l, n);
      return Ac(S, f);
    }).then((l) => {
      var h;
      if (l === null) {
        if (this.recordDroppedEvent("before_send", m), a) {
          const I = 1 + (e.spans || []).length;
          this.recordDroppedEvent("before_send", "span", I);
        }
        throw En(`${f} returned \`null\`, will not send event.`);
      }
      const _ = r.getSession() || s.getSession();
      if (c && _ && this._updateSessionFromEvent(_, l), a) {
        const N = ((h = l.sdkProcessingMetadata) == null ? void 0 : h.spanCountBeforeProcessing) || 0, I = l.spans ? l.spans.length : 0, k = N - I;
        k > 0 && this.recordDroppedEvent("before_send", "span", k);
      }
      const S = l.transaction_info;
      if (a && S && l.transaction !== e.transaction) {
        const N = "custom";
        l.transaction_info = E(d({}, S), {
          source: N
        });
      }
      return this.sendEvent(l, n), l;
    }).then(null, (l) => {
      throw es(l) || ts(l) ? l : (this.captureException(l, {
        mechanism: {
          handled: !1,
          type: "internal"
        },
        data: {
          __sentry__: !0
        },
        originalException: l
      }), Ae(
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
      (r) => (this._numProcessing--, r === er && this.recordDroppedEvent("queue_overflow", n), r)
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
    y && g.log("Flushing outcomes...");
    const e = this._clearOutcomes();
    if (e.length === 0) {
      y && g.log("No outcomes to send");
      return;
    }
    if (!this._dsn) {
      y && g.log("No dsn provided, will not send outcomes");
      return;
    }
    y && g.log("Sending outcomes:", e);
    const n = Sc(e, this._options.tunnel && jt(this._dsn));
    this.sendEnvelope(n);
  }
  /**
   * Creates an {@link Event} from all inputs to `captureException` and non-primitive inputs to `captureMessage`.
   */
}
function rs(t) {
  return t === "replay_event" ? "replay" : t || "error";
}
function Ac(t, e) {
  const n = `${e} must return \`null\` or a valid event.`;
  if (Ft(t))
    return t.then(
      (r) => {
        if (!yt(r) && r !== null)
          throw Ae(n);
        return r;
      },
      (r) => {
        throw Ae(`${e} rejected with ${r}`);
      }
    );
  if (!yt(t) && t !== null)
    throw Ae(n);
  return t;
}
function Nc(t, e, n, r) {
  const { beforeSend: s, beforeSendTransaction: i, beforeSendSpan: o, ignoreSpans: a } = e;
  let c = n;
  if (wn(c) && s)
    return s(c, r);
  if (Ei(c)) {
    if (o || a) {
      const u = Ec(c);
      if (a != null && a.length && Me(u, a))
        return null;
      if (o) {
        const f = o(u);
        f ? c = se(n, bc(f)) : kn();
      }
      if (c.spans) {
        const f = [], p = c.spans;
        for (const l of p) {
          if (a != null && a.length && Me(l, a)) {
            Vo(p, l);
            continue;
          }
          if (o) {
            const _ = o(l);
            _ ? f.push(_) : (kn(), f.push(l));
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
        c.sdkProcessingMetadata = E(d({}, n.sdkProcessingMetadata), {
          spanCountBeforeProcessing: u
        });
      }
      return i(c, r);
    }
  }
  return c;
}
function wn(t) {
  return t.type === void 0;
}
function Ei(t) {
  return t.type === "transaction";
}
function Rc(t) {
  let e = 0;
  return t.name && (e += t.name.length * 2), e += 8, e + bi(t.attributes);
}
function kc(t) {
  let e = 0;
  return t.message && (e += t.message.length * 2), e + bi(t.attributes);
}
function bi(t) {
  if (!t)
    return 0;
  let e = 0;
  return Object.values(t).forEach((n) => {
    Array.isArray(n) ? e += n.length * ss(n[0]) : Gn(n) ? e += ss(n) : e += 100;
  }), e;
}
function ss(t) {
  return typeof t == "string" ? t.length * 2 : typeof t == "number" ? 8 : typeof t == "boolean" ? 4 : 0;
}
function Oc(t, e) {
  e.debug === !0 && (y ? g.enable() : $t(() => {
    console.warn("[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle.");
  })), v().update(e.initialScope);
  const r = new t(e);
  return vc(r), r.init(), r;
}
function vc(t) {
  v().setClient(t);
}
function Ti(t, e) {
  let n;
  return ne(t, (r, s) => (e.includes(s) && (n = Array.isArray(r) ? r[1] : void 0), !!n)), n;
}
function Mc(t, e) {
  return (n) => {
    const r = t(n);
    return E(d({}, r), {
      send: (s) => L(null, null, function* () {
        const i = Ti(s, ["event", "transaction", "profile", "replay_event"]);
        return i && (i.release = e), r.send(s);
      })
    });
  };
}
function wc(t, e) {
  return lt(
    e ? E(d({}, t[0]), {
      dsn: e
    }) : t[0],
    t[1]
  );
}
function Ed(t, e) {
  return (n) => {
    const r = t(n), s = /* @__PURE__ */ new Map();
    function i(c, u) {
      const f = u ? `${c}:${u}` : c;
      let p = s.get(f);
      if (!p) {
        const m = Ws(c);
        if (!m)
          return;
        const l = ci(m, n.tunnel);
        p = u ? Mc(t, u)(E(d({}, n), { url: l })) : t(E(d({}, n), { url: l })), s.set(f, p);
      }
      return [c, p];
    }
    function o(c) {
      return L(this, null, function* () {
        function u(l) {
          const _ = l != null && l.length ? l : ["event"];
          return Ti(c, _);
        }
        const f = e({ envelope: c, getEvent: u }).map((l) => typeof l == "string" ? i(l, void 0) : i(l.dsn, l.release)).filter((l) => !!l), p = f.length ? f : [["", r]];
        return (yield Promise.all(
          p.map(([l, _]) => _.send(wc(c, l)))
        ))[0];
      });
    }
    function a(c) {
      return L(this, null, function* () {
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
function Cc(t, ...e) {
  const n = new String(String.raw(t, ...e));
  return n.__sentry_template_string__ = t.join("\0").replace(/%/g, "%%").replace(/\0/g, "%s"), n.__sentry_template_values__ = e, n;
}
const Pc = Cc;
function xc(t, e, n = [e], r = "npm") {
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
const Dc = 100;
function $c(t, e) {
  const n = O(), r = U();
  if (!n) return;
  const { beforeBreadcrumb: s = null, maxBreadcrumbs: i = Dc } = n.getOptions();
  if (i <= 0) return;
  const o = re(), a = d({ timestamp: o }, t), c = s ? $t(() => s(a, e)) : a;
  c !== null && (n.emit && n.emit("beforeAddBreadcrumb", c, e), r.addBreadcrumb(c, i));
}
let is;
const Lc = "FunctionToString", os = /* @__PURE__ */ new WeakMap(), Fc = (() => ({
  name: Lc,
  setupOnce() {
    is = Function.prototype.toString;
    try {
      Function.prototype.toString = function(...t) {
        const e = $s(this), n = os.has(O()) && e !== void 0 ? e : this;
        return is.apply(n, t);
      };
    } catch (t) {
    }
  },
  setup(t) {
    os.set(t, !0);
  }
})), Uc = Fc, jc = [
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
], Bc = "EventFilters", Gc = (t = {}) => {
  let e;
  return {
    name: Bc,
    setup(n) {
      const r = n.getOptions();
      e = as(t, r);
    },
    processEvent(n, r, s) {
      if (!e) {
        const i = s.getOptions();
        e = as(t, i);
      }
      return zc(n, e) ? null : n;
    }
  };
}, Hc = ((t = {}) => E(d({}, Gc(t)), {
  name: "InboundFilters"
}));
function as(t = {}, e = {}) {
  return {
    allowUrls: [...t.allowUrls || [], ...e.allowUrls || []],
    denyUrls: [...t.denyUrls || [], ...e.denyUrls || []],
    ignoreErrors: [
      ...t.ignoreErrors || [],
      ...e.ignoreErrors || [],
      ...t.disableErrorDefaults ? [] : jc
    ],
    ignoreTransactions: [...t.ignoreTransactions || [], ...e.ignoreTransactions || []]
  };
}
function zc(t, e) {
  if (t.type) {
    if (t.type === "transaction" && Wc(t, e.ignoreTransactions))
      return y && g.warn(
        `Event dropped due to being matched by \`ignoreTransactions\` option.
Event: ${kt(t)}`
      ), !0;
  } else {
    if (qc(t, e.ignoreErrors))
      return y && g.warn(
        `Event dropped due to being matched by \`ignoreErrors\` option.
Event: ${kt(t)}`
      ), !0;
    if (Kc(t))
      return y && g.warn(
        `Event dropped due to not having an error message, error type or stacktrace.
Event: ${kt(
          t
        )}`
      ), !0;
    if (Jc(t, e.denyUrls))
      return y && g.warn(
        `Event dropped due to being matched by \`denyUrls\` option.
Event: ${kt(
          t
        )}.
Url: ${Pe(t)}`
      ), !0;
    if (!Yc(t, e.allowUrls))
      return y && g.warn(
        `Event dropped due to not being matched by \`allowUrls\` option.
Event: ${kt(
          t
        )}.
Url: ${Pe(t)}`
      ), !0;
  }
  return !1;
}
function qc(t, e) {
  return e != null && e.length ? hi(t).some((n) => Ke(n, e)) : !1;
}
function Wc(t, e) {
  if (!(e != null && e.length))
    return !1;
  const n = t.transaction;
  return n ? Ke(n, e) : !1;
}
function Jc(t, e) {
  if (!(e != null && e.length))
    return !1;
  const n = Pe(t);
  return n ? Ke(n, e) : !1;
}
function Yc(t, e) {
  if (!(e != null && e.length))
    return !0;
  const n = Pe(t);
  return n ? Ke(n, e) : !0;
}
function Vc(t = []) {
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
    return i ? Vc(i) : null;
  } catch (s) {
    return y && g.error(`Cannot extract url for event ${kt(t)}`), null;
  }
}
function Kc(t) {
  var e, n;
  return (n = (e = t.exception) == null ? void 0 : e.values) != null && n.length ? (
    // No top-level message
    !t.message && // There are no exception values that have a stacktrace, a non-generic-Error type or value
    !t.exception.values.some((r) => r.stacktrace || r.type && r.type !== "Error" || r.value)
  ) : !1;
}
const Ii = /* @__PURE__ */ new Map(), cs = /* @__PURE__ */ new Set();
function Xc(t) {
  if (b._sentryModuleMetadata)
    for (const e of Object.keys(b._sentryModuleMetadata)) {
      const n = b._sentryModuleMetadata[e];
      if (cs.has(e))
        continue;
      cs.add(e);
      const r = t(e);
      for (const s of r.reverse())
        if (s.filename) {
          Ii.set(s.filename, n);
          break;
        }
    }
}
function Zc(t, e) {
  return Xc(t), Ii.get(e);
}
function Ai(t, e) {
  var n, r;
  (r = (n = e.exception) == null ? void 0 : n.values) == null || r.forEach((s) => {
    var i, o;
    (o = (i = s.stacktrace) == null ? void 0 : i.frames) == null || o.forEach((a) => {
      if (!a.filename || a.module_metadata)
        return;
      const c = Zc(t, a.filename);
      c && (a.module_metadata = c);
    });
  });
}
function Ni(t) {
  var e, n;
  (n = (e = t.exception) == null ? void 0 : e.values) == null || n.forEach((r) => {
    var s, i;
    (i = (s = r.stacktrace) == null ? void 0 : s.frames) == null || i.forEach((o) => {
      delete o.module_metadata;
    });
  });
}
const bd = () => ({
  name: "ModuleMetadata",
  setup(t) {
    t.on("beforeEnvelope", (e) => {
      ne(e, (n, r) => {
        if (r === "event") {
          const s = Array.isArray(n) ? n[1] : void 0;
          s && (Ni(s), n[1] = s);
        }
      });
    }), t.on("applyFrameMetadata", (e) => {
      if (e.type)
        return;
      const n = t.getOptions().stackParser;
      Ai(n, e);
    });
  }
});
function Ri(t) {
  const e = "console";
  Un(e, t), jn(e, Qc);
}
function Qc() {
  "console" in b && $n.forEach(function(t) {
    t in b.console && Rt(b.console, t, function(e) {
      return Re[t] = e, function(...n) {
        Bn("console", { args: n, level: t });
        const s = Re[t];
        s == null || s.apply(b.console, n);
      };
    });
  });
}
function us(t) {
  return t === "warn" ? "warning" : ["fatal", "error", "warning", "log", "info", "debug"].includes(t) ? t : "log";
}
const tu = "CaptureConsole", eu = ((t = {}) => {
  var r;
  const e = t.levels || $n, n = (r = t.handled) != null ? r : !0;
  return {
    name: tu,
    setup(s) {
      "console" in b && Ri(({ args: i, level: o }) => {
        O() !== s || !e.includes(o) || nu(i, o, n);
      });
    }
  };
}), Td = eu;
function nu(t, e, n) {
  const r = us(e), s = new Error(), i = {
    level: us(e),
    extra: {
      arguments: t
    }
  };
  ut((o) => {
    if (o.addEventProcessor((u) => (u.logger = "console", ot(u, {
      handled: n,
      type: "auto.core.capture_console"
    }), u)), e === "assert") {
      if (!t[0]) {
        const u = `Assertion failed: ${kr(t.slice(1), " ") || "console.assert"}`;
        o.setExtra("arguments", t.slice(1)), o.captureMessage(u, r, { captureContext: i, syntheticException: s });
      }
      return;
    }
    const a = t.find((u) => u instanceof Error);
    if (a) {
      x(a, i);
      return;
    }
    const c = kr(t, " ");
    o.captureMessage(c, r, { captureContext: i, syntheticException: s });
  });
}
const ru = "ExtraErrorData", su = ((t = {}) => {
  const { depth: e = 3, captureErrorCause: n = !0 } = t;
  return {
    name: ru,
    processEvent(r, s, i) {
      const { maxValueLength: o } = i.getOptions();
      return iu(r, s, e, n, o);
    }
  };
}), Id = su;
function iu(t, e = {}, n, r, s) {
  if (!e.originalException || !pt(e.originalException))
    return t;
  const i = e.originalException.name || e.originalException.constructor.name, o = ki(e.originalException, r, s);
  if (o) {
    const a = d({}, t.contexts), c = B(o, n);
    return yt(c) && (z(c, "__sentry_skip_normalization__", !0), a[i] = c), E(d({}, t), {
      contexts: a
    });
  }
  return t;
}
function ki(t, e, n) {
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
      s[i] = pt(o) || typeof o == "string" ? n ? te(`${o}`, n) : `${o}` : o;
    }
    if (e && t.cause !== void 0)
      if (pt(t.cause)) {
        const i = t.cause.name || t.cause.constructor.name;
        s.cause = { [i]: ki(t.cause, !1, n) };
      } else
        s.cause = t.cause;
    if (typeof t.toJSON == "function") {
      const i = t.toJSON();
      for (const o of Object.keys(i)) {
        const a = i[o];
        s[o] = pt(a) ? a.toString() : a;
      }
    }
    return s;
  } catch (r) {
    y && g.error("Unable to extract extra data from the Error object:", r);
  }
  return null;
}
function ou(t, e) {
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
const au = /^(\S+:\\|\/?)([\s\S]*?)((?:\.{1,2}|[^/\\]+?|)(\.[^./\\]*|))(?:[/\\]*)$/;
function cu(t) {
  const e = t.length > 1024 ? `<truncated>${t.slice(-1024)}` : t, n = au.exec(e);
  return n ? n.slice(1) : [];
}
function ls(...t) {
  let e = "", n = !1;
  for (let r = t.length - 1; r >= -1 && !n; r--) {
    const s = r >= 0 ? t[r] : "/";
    s && (e = `${s}/${e}`, n = s.charAt(0) === "/");
  }
  return e = ou(
    e.split("/").filter((r) => !!r),
    !n
  ).join("/"), (n ? "/" : "") + e || ".";
}
function fs(t) {
  let e = 0;
  for (; e < t.length && t[e] === ""; e++)
    ;
  let n = t.length - 1;
  for (; n >= 0 && t[n] === ""; n--)
    ;
  return e > n ? [] : t.slice(e, n - e + 1);
}
function uu(t, e) {
  t = ls(t).slice(1), e = ls(e).slice(1);
  const n = fs(t.split("/")), r = fs(e.split("/")), s = Math.min(n.length, r.length);
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
function lu(t, e) {
  return cu(t)[2] || "";
}
const fu = "RewriteFrames", Ad = (t = {}) => {
  const e = t.root, n = t.prefix || "app:///", r = "window" in b && !!b.window, s = t.iteratee || du({ isBrowser: r, root: e, prefix: n });
  function i(a) {
    try {
      return E(d({}, a), {
        exception: E(d({}, a.exception), {
          // The check for this is performed inside `process` call itself, safe to skip here
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          values: a.exception.values.map((c) => d(d({}, c), c.stacktrace && { stacktrace: o(c.stacktrace) }))
        })
      });
    } catch (c) {
      return a;
    }
  }
  function o(a) {
    var c;
    return E(d({}, a), {
      frames: (c = a == null ? void 0 : a.frames) == null ? void 0 : c.map((u) => s(u))
    });
  }
  return {
    name: fu,
    processEvent(a) {
      let c = a;
      return a.exception && Array.isArray(a.exception.values) && (c = i(c)), c;
    }
  };
};
function du({
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
      const o = s ? r.filename.replace(/^[a-zA-Z]:/, "").replace(/\\/g, "/") : r.filename, a = e ? uu(e, o) : lu(o);
      r.filename = `${n}${a}`;
    }
    return r;
  };
}
const pu = [
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
], mu = [
  "createUser",
  "deleteUser",
  "listUsers",
  "getUserById",
  "updateUserById",
  "inviteUserByEmail"
], _u = {
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
}, Oi = ["select", "insert", "upsert", "update", "delete"];
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
function gu(t, e = {}) {
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
function hu(t, e) {
  if (e === "" || e === "*")
    return "select(*)";
  if (t === "select")
    return `select(${e})`;
  if (t === "or" || t.endsWith(".or"))
    return `${t}${e}`;
  const [n, ...r] = e.split(".");
  let s;
  return n != null && n.startsWith("fts") ? s = "textSearch" : n != null && n.startsWith("plfts") ? s = "textSearch[plain]" : n != null && n.startsWith("phfts") ? s = "textSearch[phrase]" : n != null && n.startsWith("wfts") ? s = "textSearch[websearch]" : s = n && _u[n] || "filter", `${s}(${t}, ${r.join(".")})`;
}
function ds(t, e = !1) {
  return new Proxy(t, {
    apply(n, r, s) {
      return oe(
        {
          name: `auth ${e ? "(admin) " : ""}${t.name}`,
          attributes: {
            [D]: "auto.db.supabase",
            [ee]: "db",
            "db.system": "postgresql",
            "db.operation": `auth.${e ? "admin." : ""}${t.name}`
          }
        },
        (i) => Reflect.apply(n, r, s).then((o) => (o && typeof o == "object" && "error" in o && o.error ? (i.setStatus({ code: R }), x(o.error, {
          mechanism: {
            handled: !1,
            type: "auto.db.supabase.auth"
          }
        })) : i.setStatus({ code: Xe }), i.end(), o)).catch((o) => {
          throw i.setStatus({ code: R }), i.end(), x(o, {
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
function yu(t) {
  const e = t.auth;
  if (!(!e || on(t.auth))) {
    for (const n of pu) {
      const r = e[n];
      r && typeof t.auth[n] == "function" && (t.auth[n] = ds(r));
    }
    for (const n of mu) {
      const r = e.admin[n];
      r && typeof t.auth.admin[n] == "function" && (t.auth.admin[n] = ds(r, !0));
    }
    sn(t.auth);
  }
}
function Su(t) {
  on(t.prototype.from) || (t.prototype.from = new Proxy(
    t.prototype.from,
    {
      apply(e, n, r) {
        const s = Reflect.apply(e, n, r), i = s.constructor;
        return bu(i), s;
      }
    }
  ), sn(t.prototype.from));
}
function Eu(t) {
  on(t.prototype.then) || (t.prototype.then = new Proxy(
    t.prototype.then,
    {
      apply(e, n, r) {
        var l;
        const s = Oi, i = n, o = gu(i.method, i.headers);
        if (!s.includes(o) || !((l = i == null ? void 0 : i.url) != null && l.pathname) || typeof i.url.pathname != "string")
          return Reflect.apply(e, n, r);
        const a = i.url.pathname.split("/"), c = a.length > 0 ? a[a.length - 1] : "", u = [];
        for (const [_, S] of i.url.searchParams.entries())
          u.push(hu(_, S));
        const f = /* @__PURE__ */ Object.create(null);
        if (yt(i.body))
          for (const [_, S] of Object.entries(i.body))
            f[_] = S;
        const p = `${o === "select" ? "" : `${o}${f ? "(...) " : ""}`}${u.join(
          " "
        )} from(${c})`, m = {
          "db.table": c,
          "db.schema": i.schema,
          "db.url": i.url.origin,
          "db.sdk": i.headers["X-Client-Info"],
          "db.system": "postgresql",
          "db.operation": o,
          [D]: "auto.db.supabase",
          [ee]: "db"
        };
        return u.length && (m["db.query"] = u), Object.keys(f).length && (m["db.body"] = f), oe(
          {
            name: p,
            attributes: m
          },
          (_) => Reflect.apply(e, n, []).then(
            (S) => {
              if (_ && (S && typeof S == "object" && "status" in S && wr(_, S.status || 500), _.end()), S.error) {
                const I = new Error(S.error.message);
                S.error.code && (I.code = S.error.code), S.error.details && (I.details = S.error.details);
                const k = {};
                u.length && (k.query = u), Object.keys(f).length && (k.body = f), x(I, (P) => (P.addEventProcessor((V) => (ot(V, {
                  handled: !1,
                  type: "auto.db.supabase.postgres"
                }), V)), P.setContext("supabase", k), P));
              }
              const h = {
                type: "supabase",
                category: `db.${o}`,
                message: p
              }, N = {};
              return u.length && (N.query = u), Object.keys(f).length && (N.body = f), Object.keys(N).length && (h.data = N), $c(h), S;
            },
            (S) => {
              throw _ && (wr(_, 500), _.end()), S;
            }
          ).then(...r)
        );
      }
    }
  ), sn(t.prototype.then));
}
function bu(t) {
  for (const e of Oi)
    on(t.prototype[e]) || (t.prototype[e] = new Proxy(
      t.prototype[e],
      {
        apply(n, r, s) {
          const i = Reflect.apply(n, r, s), o = i.constructor;
          return y && g.log(`Instrumenting ${e} operation's PostgRESTFilterBuilder`), Eu(o), i;
        }
      }
    ), sn(t.prototype[e]));
}
const Tu = (t) => {
  if (!t) {
    y && g.warn("Supabase integration was not installed because no Supabase client was provided.");
    return;
  }
  const e = t.constructor === Function ? t : t.constructor;
  Su(e), yu(t);
}, Iu = "Supabase", Au = ((t) => ({
  setupOnce() {
    Tu(t);
  },
  name: Iu
})), Nd = (t) => Au(t.supabaseClient), Nu = 10, Ru = "ZodErrors";
function ku(t) {
  return pt(t) && t.name === "ZodError" && Array.isArray(t.issues);
}
function Ou(t) {
  return E(d({}, t), {
    path: "path" in t && Array.isArray(t.path) ? t.path.join(".") : void 0,
    keys: "keys" in t ? JSON.stringify(t.keys) : void 0,
    unionErrors: "unionErrors" in t ? JSON.stringify(t.unionErrors) : void 0
  });
}
function vu(t) {
  return t.map((e) => typeof e == "number" ? "<array>" : e).join(".");
}
function Mu(t) {
  const e = /* @__PURE__ */ new Set();
  for (const r of t.issues) {
    const s = vu(r.path);
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
function wu(t, e = !1, n, r) {
  var s;
  if (!((s = n.exception) != null && s.values) || !r.originalException || !ku(r.originalException) || r.originalException.issues.length === 0)
    return n;
  try {
    const o = (e ? r.originalException.issues : r.originalException.issues.slice(0, t)).map(Ou);
    return e && (Array.isArray(r.attachments) || (r.attachments = []), r.attachments.push({
      filename: "zod_issues.json",
      data: JSON.stringify({
        issues: o
      })
    })), E(d({}, n), {
      exception: E(d({}, n.exception), {
        values: [
          E(d({}, n.exception.values[0]), {
            value: Mu(r.originalException)
          }),
          ...n.exception.values.slice(1)
        ]
      }),
      extra: E(d({}, n.extra), {
        "zoderror.issues": o.slice(0, t)
      })
    });
  } catch (i) {
    return E(d({}, n), {
      extra: E(d({}, n.extra), {
        "zoderrors sentry integration parse error": {
          message: "an exception was thrown while processing ZodError within applyZodErrorsToEvent()",
          error: i instanceof Error ? `${i.name}: ${i.message}
${i.stack}` : "unknown"
        }
      })
    });
  }
}
const Cu = ((t = {}) => {
  var n;
  const e = (n = t.limit) != null ? n : Nu;
  return {
    name: Ru,
    processEvent(r, s) {
      return wu(e, t.saveZodIssuesAsAttachment, r, s);
    }
  };
}), Rd = Cu, kd = (t) => ({
  name: "ThirdPartyErrorsFilter",
  setup(e) {
    e.on("beforeEnvelope", (n) => {
      ne(n, (r, s) => {
        if (s === "event") {
          const i = Array.isArray(r) ? r[1] : void 0;
          i && (Ni(i), r[1] = i);
        }
      });
    }), e.on("applyFrameMetadata", (n) => {
      if (n.type)
        return;
      const r = e.getOptions().stackParser;
      Ai(r, n);
    });
  },
  processEvent(e) {
    const n = Pu(e);
    if (n) {
      const r = t.behaviour === "drop-error-if-contains-third-party-frames" || t.behaviour === "apply-tag-if-contains-third-party-frames" ? "some" : "every";
      if (n[r]((i) => !i.some((o) => t.filterKeys.includes(o)))) {
        if (t.behaviour === "drop-error-if-contains-third-party-frames" || t.behaviour === "drop-error-if-exclusively-contains-third-party-frames")
          return null;
        e.tags = E(d({}, e.tags), {
          third_party_code: !0
        });
      }
    }
    return e;
  }
});
function Pu(t) {
  const e = no(t);
  if (e)
    return e.filter((n) => {
      var r;
      return !!n.filename && ((r = n.lineno) != null ? r : n.colno) != null;
    }).map((n) => n.module_metadata ? Object.keys(n.module_metadata).filter((r) => r.startsWith(ps)).map((r) => r.slice(ps.length)) : []);
}
const ps = "_sentryBundlerPluginAppKey:", xu = 100, Du = 10, ye = "flag.evaluation.";
function $u(t) {
  const n = v().getScopeData().contexts.flags, r = n ? n.values : [];
  return r.length && (t.contexts === void 0 && (t.contexts = {}), t.contexts.flags = { values: [...r] }), t;
}
function Lu(t, e, n = xu) {
  const r = v().getScopeData().contexts;
  r.flags || (r.flags = { values: [] });
  const s = r.flags.values;
  Fu(s, t, e, n);
}
function Fu(t, e, n, r) {
  if (typeof n != "boolean")
    return;
  if (t.length > r) {
    y && g.error(`[Feature Flags] insertToFlagBuffer called on a buffer larger than maxSize=${r}`);
    return;
  }
  const s = t.findIndex((i) => i.flag === e);
  s !== -1 && t.splice(s, 1), t.length === r && t.shift(), t.push({
    flag: e,
    result: n
  });
}
function Uu(t, e, n = Du) {
  if (typeof e != "boolean")
    return;
  const r = Bt();
  if (!r)
    return;
  const s = A(r).data;
  if (`${ye}${t}` in s) {
    r.setAttribute(`${ye}${t}`, e);
    return;
  }
  Object.keys(s).filter((o) => o.startsWith(ye)).length < n && r.setAttribute(`${ye}${t}`, e);
}
const Od = () => ({
  name: "FeatureFlags",
  processEvent(t, e, n) {
    return $u(t);
  },
  addFeatureFlag(t, e) {
    Lu(t, e), Uu(t, e);
  }
});
function Ht(t, e, n, r, s) {
  Ce({ level: t, message: e, attributes: n, severityNumber: s }, r);
}
function ju(t, e, { scope: n } = {}) {
  Ht("trace", t, e, n);
}
function Bu(t, e, { scope: n } = {}) {
  Ht("debug", t, e, n);
}
function Gu(t, e, { scope: n } = {}) {
  Ht("info", t, e, n);
}
function Hu(t, e, { scope: n } = {}) {
  Ht("warn", t, e, n);
}
function zu(t, e, { scope: n } = {}) {
  Ht("error", t, e, n);
}
function qu(t, e, { scope: n } = {}) {
  Ht("fatal", t, e, n);
}
const vd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  debug: Bu,
  error: zu,
  fatal: qu,
  fmt: Pc,
  info: Gu,
  trace: ju,
  warn: Hu
}, Symbol.toStringTag, { value: "Module" }));
function Cn(t, e, n) {
  return "util" in b && typeof b.util.format == "function" ? b.util.format(...t) : Wu(t, e, n);
}
function Wu(t, e, n) {
  return t.map(
    (r) => Gn(r) ? String(r) : JSON.stringify(B(r, e, n))
  ).join(" ");
}
function Ju(t) {
  return /%[sdifocO]/.test(t);
}
function Yu(t, e) {
  const n = {}, r = new Array(e.length).fill("{}").join(" ");
  return n["sentry.message.template"] = `${t} ${r}`, e.forEach((s, i) => {
    n[`sentry.message.parameter.${i}`] = s;
  }), n;
}
const Vu = "ConsoleLogs", ms = {
  [D]: "auto.log.console"
}, Ku = ((t = {}) => {
  const e = t.levels || $n;
  return {
    name: Vu,
    setup(n) {
      const { enableLogs: r, normalizeDepth: s = 3, normalizeMaxBreadth: i = 1e3 } = n.getOptions();
      if (!r) {
        y && g.warn("`enableLogs` is not enabled, ConsoleLogs integration disabled");
        return;
      }
      Ri(({ args: o, level: a }) => {
        if (O() !== n || !e.includes(a))
          return;
        const c = o[0], u = o.slice(1);
        if (a === "assert") {
          if (!c) {
            const l = u.length > 0 ? `Assertion failed: ${Cn(u, s, i)}` : "Assertion failed";
            Ce({ level: "error", message: l, attributes: ms });
          }
          return;
        }
        const f = a === "log", p = o.length > 1 && typeof o[0] == "string" && !Ju(o[0]), m = d(d({}, ms), p ? Yu(c, u) : {});
        Ce({
          level: f ? "info" : a,
          message: Cn(o, s, i),
          severityNumber: f ? 10 : void 0,
          attributes: m
        });
      });
    }
  };
}), Md = Ku;
function nr(t, e, n, r) {
  fc(
    { type: t, name: e, value: n, unit: r == null ? void 0 : r.unit, attributes: r == null ? void 0 : r.attributes },
    { scope: r == null ? void 0 : r.scope }
  );
}
function Xu(t, e = 1, n) {
  nr("counter", t, e, n);
}
function Zu(t, e, n) {
  nr("gauge", t, e, n);
}
function Qu(t, e, n) {
  nr("distribution", t, e, n);
}
const wd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  count: Xu,
  distribution: Qu,
  gauge: Zu
}, Symbol.toStringTag, { value: "Module" })), tl = ["trace", "debug", "info", "warn", "error", "fatal"];
function Cd(t = {}) {
  var r;
  const e = new Set((r = t.levels) != null ? r : tl), n = t.client;
  return {
    log(s) {
      const I = s, { type: i, level: o, message: a, args: c, tag: u, date: f } = I, p = pn(I, ["type", "level", "message", "args", "tag", "date"]), m = n || O();
      if (!m)
        return;
      const l = rl(i, o);
      if (!e.has(l))
        return;
      const { normalizeDepth: _ = 3, normalizeMaxBreadth: S = 1e3 } = m.getOptions(), h = [];
      a && h.push(a), c && c.length > 0 && h.push(Cn(c, _, S));
      const N = h.join(" ");
      p["sentry.origin"] = "auto.log.consola", u && (p["consola.tag"] = u), i && (p["consola.type"] = i), o != null && typeof o == "number" && (p["consola.level"] = o), Ce({
        level: l,
        message: N,
        attributes: p
      });
    }
  };
}
const el = {
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
}, nl = {
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
function rl(t, e) {
  if (t === "verbose")
    return "debug";
  if (t === "silent")
    return "trace";
  if (t) {
    const n = el[t];
    if (n)
      return n;
  }
  if (typeof e == "number") {
    const n = nl[e];
    if (n)
      return n;
  }
  return "info";
}
const sl = "gen_ai.prompt", rr = "gen_ai.system", H = "gen_ai.request.model", vi = "gen_ai.request.stream", sr = "gen_ai.request.temperature", Mi = "gen_ai.request.max_tokens", ir = "gen_ai.request.frequency_penalty", wi = "gen_ai.request.presence_penalty", or = "gen_ai.request.top_p", Ci = "gen_ai.request.top_k", il = "gen_ai.request.encoding_format", ol = "gen_ai.request.dimensions", zt = "gen_ai.response.finish_reasons", qt = "gen_ai.response.model", ae = "gen_ai.response.id", an = "gen_ai.usage.input_tokens", cn = "gen_ai.usage.output_tokens", un = "gen_ai.usage.total_tokens", ar = "gen_ai.operation.name", gt = "gen_ai.request.messages", J = "gen_ai.response.text", cr = "gen_ai.request.available_tools", ln = "gen_ai.response.streaming", ft = "gen_ai.response.tool_calls", al = "openai.response.id", Pi = "openai.response.model", cl = "openai.response.timestamp", ul = "openai.usage.completion_tokens", ll = "openai.usage.prompt_tokens", bn = {
  CHAT: "chat",
  RESPONSES: "responses",
  EMBEDDINGS: "embeddings"
}, _s = "anthropic.response.timestamp", xi = 2e4, xe = (t) => new TextEncoder().encode(t).length, De = (t) => xe(JSON.stringify(t));
function ur(t, e) {
  if (xe(t) <= e)
    return t;
  let n = 0, r = t.length, s = "";
  for (; n <= r; ) {
    const i = Math.floor((n + r) / 2), o = t.slice(0, i);
    xe(o) <= e ? (s = o, n = i + 1) : r = i - 1;
  }
  return s;
}
function fl(t) {
  return typeof t == "string" ? t : t.text;
}
function gs(t, e) {
  return typeof t == "string" ? e : E(d({}, t), { text: e });
}
function dl(t) {
  return t !== null && typeof t == "object" && "content" in t && typeof t.content == "string";
}
function pl(t) {
  return t !== null && typeof t == "object" && "parts" in t && Array.isArray(t.parts) && t.parts.length > 0;
}
function ml(t, e) {
  const n = E(d({}, t), { content: "" }), r = De(n), s = e - r;
  if (s <= 0)
    return [];
  const i = ur(t.content, s);
  return [E(d({}, t), { content: i })];
}
function _l(t, e) {
  const { parts: n } = t, r = n.map((a) => gs(a, "")), s = De(E(d({}, t), { parts: r }));
  let i = e - s;
  if (i <= 0)
    return [];
  const o = [];
  for (const a of n) {
    const c = fl(a), u = xe(c);
    if (u <= i)
      o.push(a), i -= u;
    else if (o.length === 0) {
      const f = ur(c, i);
      f && o.push(gs(a, f));
      break;
    } else
      break;
  }
  return o.length > 0 ? [E(d({}, t), { parts: o })] : [];
}
function gl(t, e) {
  return !t || typeof t != "object" ? [] : dl(t) ? ml(t, e) : pl(t) ? _l(t, e) : [];
}
function hl(t, e) {
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
    return gl(o, e);
  }
  return t.slice(i);
}
function yl(t) {
  return hl(t, xi);
}
function Sl(t) {
  return ur(t, xi);
}
function ce(t) {
  return t.includes("messages") ? "messages" : t.includes("completions") ? "completions" : t.includes("models") ? "models" : t.includes("chat") ? "chat" : t.split(".").pop() || "unknown";
}
function $e(t) {
  return `gen_ai.${ce(t)}`;
}
function Di(t, e) {
  return t ? `${t}.${e}` : e;
}
function lr(t, e, n, r, s) {
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
function ht(t) {
  if (typeof t == "string")
    return Sl(t);
  if (Array.isArray(t)) {
    const e = yl(t);
    return JSON.stringify(e);
  }
  return JSON.stringify(t);
}
const El = "OpenAI", bl = ["responses.create", "chat.completions.create", "embeddings.create"], Tl = [
  "response.output_item.added",
  "response.function_call_arguments.delta",
  "response.function_call_arguments.done",
  "response.output_item.done"
], Il = [
  "response.created",
  "response.in_progress",
  "response.failed",
  "response.completed",
  "response.incomplete",
  "response.queued",
  "response.output_text.delta",
  ...Tl
];
function fr(t) {
  return t.includes("chat.completions") ? bn.CHAT : t.includes("responses") ? bn.RESPONSES : t.includes("embeddings") ? bn.EMBEDDINGS : t.split(".").pop() || "unknown";
}
function hs(t) {
  return `gen_ai.${fr(t)}`;
}
function Al(t) {
  return bl.includes(t);
}
function Nl(t, e) {
  return t ? `${t}.${e}` : e;
}
function Rl(t) {
  return t !== null && typeof t == "object" && "object" in t && t.object === "chat.completion";
}
function kl(t) {
  return t !== null && typeof t == "object" && "object" in t && t.object === "response";
}
function Ol(t) {
  if (t === null || typeof t != "object" || !("object" in t))
    return !1;
  const e = t;
  return e.object === "list" && typeof e.model == "string" && e.model.toLowerCase().includes("embedding");
}
function vl(t) {
  return t !== null && typeof t == "object" && "type" in t && typeof t.type == "string" && t.type.startsWith("response.");
}
function Ml(t) {
  return t !== null && typeof t == "object" && "object" in t && t.object === "chat.completion.chunk";
}
function wl(t, e, n) {
  if (dr(t, e.id, e.model, e.created), e.usage && fn(
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
        [ft]: JSON.stringify(s)
      });
    }
  }
}
function Cl(t, e, n) {
  if (dr(t, e.id, e.model, e.created_at), e.status && t.setAttributes({
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
        [ft]: JSON.stringify(s)
      });
    }
  }
}
function Pl(t, e) {
  t.setAttributes({
    [Pi]: e.model,
    [qt]: e.model
  }), e.usage && fn(t, e.usage.prompt_tokens, void 0, e.usage.total_tokens);
}
function fn(t, e, n, r) {
  e !== void 0 && t.setAttributes({
    [ll]: e,
    [an]: e
  }), n !== void 0 && t.setAttributes({
    [ul]: n,
    [cn]: n
  }), r !== void 0 && t.setAttributes({
    [un]: r
  });
}
function dr(t, e, n, r) {
  t.setAttributes({
    [al]: e,
    [ae]: e
  }), t.setAttributes({
    [Pi]: n,
    [qt]: n
  }), t.setAttributes({
    [cl]: new Date(r * 1e3).toISOString()
  });
}
function xl(t, e) {
  for (const n of t) {
    const r = n.index;
    if (!(r === void 0 || !n.function))
      if (!(r in e.chatCompletionToolCalls))
        e.chatCompletionToolCalls[r] = E(d({}, n), {
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
function Dl(t, e, n) {
  var r, s, i, o, a, c;
  e.responseId = (r = t.id) != null ? r : e.responseId, e.responseModel = (s = t.model) != null ? s : e.responseModel, e.responseTimestamp = (i = t.created) != null ? i : e.responseTimestamp, t.usage && (e.promptTokens = t.usage.prompt_tokens, e.completionTokens = t.usage.completion_tokens, e.totalTokens = t.usage.total_tokens);
  for (const u of (o = t.choices) != null ? o : [])
    n && ((a = u.delta) != null && a.content && e.responseTexts.push(u.delta.content), (c = u.delta) != null && c.tool_calls && xl(u.delta.tool_calls, e)), u.finish_reason && e.finishReasons.push(u.finish_reason);
}
function $l(t, e, n, r) {
  var i, o, a;
  if (!(t && typeof t == "object")) {
    e.eventTypes.push("unknown:non-object");
    return;
  }
  if (t instanceof Error) {
    r.setStatus({ code: R, message: "internal_error" }), x(t, {
      mechanism: {
        handled: !1,
        type: "auto.ai.openai.stream-response"
      }
    });
    return;
  }
  if (!("type" in t)) return;
  const s = t;
  if (!Il.includes(s.type)) {
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
function Ll(t, e, n) {
  return me(this, null, function* () {
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
        for (var s = _e(t), i, o, a; i = !(o = yield new rt(s.next())).done; i = !1) {
          const c = o.value;
          Ml(c) ? Dl(c, r, n) : vl(c) && $l(c, r, n, e), yield c;
        }
      } catch (o) {
        a = [o];
      } finally {
        try {
          i && (o = s.return) && (yield new rt(o.call(s)));
        } finally {
          if (a)
            throw a[0];
        }
      }
    } finally {
      dr(e, r.responseId, r.responseModel, r.responseTimestamp), fn(e, r.promptTokens, r.completionTokens, r.totalTokens), e.setAttributes({
        [ln]: !0
      }), r.finishReasons.length && e.setAttributes({
        [zt]: JSON.stringify(r.finishReasons)
      }), n && r.responseTexts.length && e.setAttributes({
        [J]: r.responseTexts.join("")
      });
      const u = [...Object.values(r.chatCompletionToolCalls), ...r.responsesApiToolCalls];
      u.length > 0 && e.setAttributes({
        [ft]: JSON.stringify(u)
      }), e.end();
    }
  });
}
function Fl(t, e) {
  var r;
  const n = {
    [rr]: "openai",
    [ar]: fr(e),
    [D]: "auto.ai.openai"
  };
  if (t.length > 0 && typeof t[0] == "object" && t[0] !== null) {
    const s = t[0], i = Array.isArray(s.tools) ? s.tools : [], a = s.web_search_options && typeof s.web_search_options == "object" ? [d({ type: "web_search_options" }, s.web_search_options)] : [], c = [...i, ...a];
    c.length > 0 && (n[cr] = JSON.stringify(c));
  }
  if (t.length > 0 && typeof t[0] == "object" && t[0] !== null) {
    const s = t[0];
    n[H] = (r = s.model) != null ? r : "unknown", "temperature" in s && (n[sr] = s.temperature), "top_p" in s && (n[or] = s.top_p), "frequency_penalty" in s && (n[ir] = s.frequency_penalty), "presence_penalty" in s && (n[wi] = s.presence_penalty), "stream" in s && (n[vi] = s.stream), "encoding_format" in s && (n[il] = s.encoding_format), "dimensions" in s && (n[ol] = s.dimensions);
  } else
    n[H] = "unknown";
  return n;
}
function Ul(t, e, n) {
  var s;
  if (!e || typeof e != "object") return;
  const r = e;
  if (Rl(r)) {
    if (wl(t, r, n), n && ((s = r.choices) != null && s.length)) {
      const i = r.choices.map((o) => {
        var a;
        return ((a = o.message) == null ? void 0 : a.content) || "";
      });
      t.setAttributes({ [J]: JSON.stringify(i) });
    }
  } else kl(r) ? (Cl(t, r, n), n && r.output_text && t.setAttributes({ [J]: r.output_text })) : Ol(r) && Pl(t, r);
}
function ys(t, e) {
  if ("messages" in e) {
    const n = ht(e.messages);
    t.setAttributes({ [gt]: n });
  }
  if ("input" in e) {
    const n = ht(e.input);
    t.setAttributes({ [gt]: n });
  }
}
function jl() {
  var s, i, o, a;
  const e = v().getClient(), n = e == null ? void 0 : e.getIntegrationByName(El), r = n ? !!(e != null && e.getOptions().sendDefaultPii) : !1;
  return {
    recordInputs: (i = (s = n == null ? void 0 : n.options) == null ? void 0 : s.recordInputs) != null ? i : r,
    recordOutputs: (a = (o = n == null ? void 0 : n.options) == null ? void 0 : o.recordOutputs) != null ? a : r
  };
}
function Bl(t, e, n, r) {
  return function(...i) {
    return L(this, null, function* () {
      const o = r || jl(), a = Fl(i, e), c = a[H] || "unknown", u = fr(e), f = i[0];
      return f && typeof f == "object" && f.stream === !0 ? we(
        {
          name: `${u} ${c} stream-response`,
          op: hs(e),
          attributes: a
        },
        (m) => L(null, null, function* () {
          var l;
          try {
            o.recordInputs && i[0] && typeof i[0] == "object" && ys(m, i[0]);
            const _ = yield t.apply(n, i);
            return Ll(
              _,
              m,
              (l = o.recordOutputs) != null ? l : !1
            );
          } catch (_) {
            throw m.setStatus({ code: R, message: "internal_error" }), x(_, {
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
      ) : oe(
        {
          name: `${u} ${c}`,
          op: hs(e),
          attributes: a
        },
        (m) => L(null, null, function* () {
          try {
            o.recordInputs && i[0] && typeof i[0] == "object" && ys(m, i[0]);
            const l = yield t.apply(n, i);
            return Ul(m, l, o.recordOutputs), l;
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
function $i(t, e = "", n) {
  return new Proxy(t, {
    get(r, s) {
      const i = r[s], o = Nl(e, String(s));
      return typeof i == "function" && Al(o) ? Bl(i, o, r, n) : typeof i == "function" ? i.bind(r) : i && typeof i == "object" ? $i(i, o, n) : i;
    }
  });
}
function Pd(t, e) {
  return $i(t, "", e);
}
function Gl(t, e) {
  var n, r;
  return "type" in t && typeof t.type == "string" && t.type === "error" ? (e.setStatus({ code: R, message: (r = (n = t.error) == null ? void 0 : n.type) != null ? r : "internal_error" }), x(t.error, {
    mechanism: {
      handled: !1,
      type: "auto.ai.anthropic.anthropic_error"
    }
  }), !0) : !1;
}
function Hl(t, e) {
  if (t.type === "message_delta" && t.usage && "output_tokens" in t.usage && typeof t.usage.output_tokens == "number" && (e.completionTokens = t.usage.output_tokens), t.message) {
    const n = t.message;
    n.id && (e.responseId = n.id), n.model && (e.responseModel = n.model), n.stop_reason && e.finishReasons.push(n.stop_reason), n.usage && (typeof n.usage.input_tokens == "number" && (e.promptTokens = n.usage.input_tokens), typeof n.usage.cache_creation_input_tokens == "number" && (e.cacheCreationInputTokens = n.usage.cache_creation_input_tokens), typeof n.usage.cache_read_input_tokens == "number" && (e.cacheReadInputTokens = n.usage.cache_read_input_tokens));
  }
}
function zl(t, e) {
  t.type !== "content_block_start" || typeof t.index != "number" || !t.content_block || (t.content_block.type === "tool_use" || t.content_block.type === "server_tool_use") && (e.activeToolBlocks[t.index] = {
    id: t.content_block.id,
    name: t.content_block.name,
    inputJsonParts: []
  });
}
function ql(t, e, n) {
  if (!(t.type !== "content_block_delta" || !t.delta)) {
    if (typeof t.index == "number" && "partial_json" in t.delta && typeof t.delta.partial_json == "string") {
      const r = e.activeToolBlocks[t.index];
      r && r.inputJsonParts.push(t.delta.partial_json);
    }
    n && typeof t.delta.text == "string" && e.responseTexts.push(t.delta.text);
  }
}
function Wl(t, e) {
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
function Li(t, e, n, r) {
  !(t && typeof t == "object") || Gl(t, r) || (Hl(t, e), zl(t, e), ql(t, e, n), Wl(t, e));
}
function Jl(t, e, n) {
  e.isRecording() && (t.responseId && e.setAttributes({
    [ae]: t.responseId
  }), t.responseModel && e.setAttributes({
    [qt]: t.responseModel
  }), lr(
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
    [J]: t.responseTexts.join("")
  }), n && t.toolCalls.length > 0 && e.setAttributes({
    [ft]: JSON.stringify(t.toolCalls)
  }), e.end());
}
function Yl(t, e, n) {
  return me(this, null, function* () {
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
        for (var s = _e(t), i, o, a; i = !(o = yield new rt(s.next())).done; i = !1) {
          const c = o.value;
          Li(c, r, n, e), yield c;
        }
      } catch (o) {
        a = [o];
      } finally {
        try {
          i && (o = s.return) && (yield new rt(o.call(s)));
        } finally {
          if (a)
            throw a[0];
        }
      }
    } finally {
      r.responseId && e.setAttributes({
        [ae]: r.responseId
      }), r.responseModel && e.setAttributes({
        [qt]: r.responseModel
      }), lr(
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
        [J]: r.responseTexts.join("")
      }), n && r.toolCalls.length > 0 && e.setAttributes({
        [ft]: JSON.stringify(r.toolCalls)
      }), e.end();
    }
  });
}
function Vl(t, e, n) {
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
    Li(s, r, n, e);
  }), t.on("message", () => {
    Jl(r, e, n);
  }), t.on("error", (s) => {
    x(s, {
      mechanism: {
        handled: !1,
        type: "auto.ai.anthropic.stream_error"
      }
    }), e.isRecording() && (e.setStatus({ code: R, message: "stream_error" }), e.end());
  }), t;
}
const Kl = [
  "messages.create",
  "messages.stream",
  "messages.countTokens",
  "models.get",
  "completions.create",
  "models.retrieve",
  "beta.messages.create"
];
function Xl(t) {
  return Kl.includes(t);
}
function Zl(t, e) {
  e.error && (t.setStatus({ code: R, message: e.error.type || "internal_error" }), x(e.error, {
    mechanism: {
      handled: !1,
      type: "auto.ai.anthropic.anthropic_error"
    }
  }));
}
function Ql(t, e) {
  var r;
  const n = {
    [rr]: "anthropic",
    [ar]: ce(e),
    [D]: "auto.ai.anthropic"
  };
  if (t.length > 0 && typeof t[0] == "object" && t[0] !== null) {
    const s = t[0];
    s.tools && Array.isArray(s.tools) && (n[cr] = JSON.stringify(s.tools)), n[H] = (r = s.model) != null ? r : "unknown", "temperature" in s && (n[sr] = s.temperature), "top_p" in s && (n[or] = s.top_p), "stream" in s && (n[vi] = s.stream), "top_k" in s && (n[Ci] = s.top_k), "frequency_penalty" in s && (n[ir] = s.frequency_penalty), "max_tokens" in s && (n[Mi] = s.max_tokens);
  } else
    e === "models.retrieve" || e === "models.get" ? n[H] = t[0] : n[H] = "unknown";
  return n;
}
function Pn(t, e) {
  if ("messages" in e) {
    const n = ht(e.messages);
    t.setAttributes({ [gt]: n });
  }
  if ("input" in e) {
    const n = ht(e.input);
    t.setAttributes({ [gt]: n });
  }
  "prompt" in e && t.setAttributes({ [sl]: JSON.stringify(e.prompt) });
}
function tf(t, e) {
  if ("content" in e && Array.isArray(e.content)) {
    t.setAttributes({
      [J]: e.content.map((r) => r.text).filter((r) => !!r).join("")
    });
    const n = [];
    for (const r of e.content)
      (r.type === "tool_use" || r.type === "server_tool_use") && n.push(r);
    n.length > 0 && t.setAttributes({ [ft]: JSON.stringify(n) });
  }
  "completion" in e && t.setAttributes({ [J]: e.completion }), "input_tokens" in e && t.setAttributes({ [J]: JSON.stringify(e.input_tokens) });
}
function ef(t, e) {
  "id" in e && "model" in e && (t.setAttributes({
    [ae]: e.id,
    [qt]: e.model
  }), "created" in e && typeof e.created == "number" && t.setAttributes({
    [_s]: new Date(e.created * 1e3).toISOString()
  }), "created_at" in e && typeof e.created_at == "number" && t.setAttributes({
    [_s]: new Date(e.created_at * 1e3).toISOString()
  }), "usage" in e && e.usage && lr(
    t,
    e.usage.input_tokens,
    e.usage.output_tokens,
    e.usage.cache_creation_input_tokens,
    e.usage.cache_read_input_tokens
  ));
}
function nf(t, e, n) {
  if (!(!e || typeof e != "object")) {
    if ("type" in e && e.type === "error") {
      Zl(t, e);
      return;
    }
    n && tf(t, e), ef(t, e);
  }
}
function Ss(t, e, n) {
  throw x(t, {
    mechanism: { handled: !1, type: "auto.ai.anthropic", data: { function: n } }
  }), e.isRecording() && (e.setStatus({ code: R, message: "internal_error" }), e.end()), t;
}
function rf(t, e, n, r, s, i, o, a, c, u, f) {
  var l;
  const p = (l = s[H]) != null ? l : "unknown", m = {
    name: `${i} ${p} stream-response`,
    op: $e(o),
    attributes: s
  };
  return u && !f ? we(m, (_) => L(null, null, function* () {
    var S;
    try {
      c.recordInputs && a && Pn(_, a);
      const h = yield t.apply(n, r);
      return Yl(
        h,
        _,
        (S = c.recordOutputs) != null ? S : !1
      );
    } catch (h) {
      return Ss(h, _, o);
    }
  })) : we(m, (_) => {
    var S;
    try {
      c.recordInputs && a && Pn(_, a);
      const h = e.apply(n, r);
      return Vl(h, _, (S = c.recordOutputs) != null ? S : !1);
    } catch (h) {
      return Ss(h, _, o);
    }
  });
}
function sf(t, e, n, r) {
  return new Proxy(t, {
    apply(s, i, o) {
      var l;
      const a = Ql(o, e), c = (l = a[H]) != null ? l : "unknown", u = ce(e), f = typeof o[0] == "object" ? o[0] : void 0, p = !!(f != null && f.stream), m = e === "messages.stream";
      return p || m ? rf(
        t,
        s,
        n,
        o,
        a,
        u,
        e,
        f,
        r,
        p,
        m
      ) : oe(
        {
          name: `${u} ${c}`,
          op: $e(e),
          attributes: a
        },
        (_) => (r.recordInputs && f && Pn(_, f), tn(
          () => s.apply(n, o),
          (S) => {
            x(S, {
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
          (S) => nf(_, S, r.recordOutputs)
        ))
      );
    }
  });
}
function Fi(t, e = "", n) {
  return new Proxy(t, {
    get(r, s) {
      const i = r[s], o = Di(e, String(s));
      return typeof i == "function" && Xl(o) ? sf(i, o, r, n) : typeof i == "function" ? i.bind(r) : i && typeof i == "object" ? Fi(i, o, n) : i;
    }
  });
}
function xd(t, e) {
  var s;
  const n = !!((s = O()) != null && s.getOptions().sendDefaultPii), r = d({
    recordInputs: n,
    recordOutputs: n
  }, e);
  return Fi(t, "", r);
}
const Es = [
  "models.generateContent",
  "models.generateContentStream",
  "chats.create",
  "sendMessage",
  "sendMessageStream"
], of = "google_genai", Ui = "chats.create", af = "chat";
function cf(t, e) {
  var r;
  const n = t == null ? void 0 : t.promptFeedback;
  if (n != null && n.blockReason) {
    const s = (r = n.blockReasonMessage) != null ? r : n.blockReason;
    return e.setStatus({ code: R, message: `Content blocked: ${s}` }), x(`Content blocked: ${s}`, {
      mechanism: { handled: !1, type: "auto.ai.google_genai" }
    }), !0;
  }
  return !1;
}
function uf(t, e) {
  typeof t.responseId == "string" && (e.responseId = t.responseId), typeof t.modelVersion == "string" && (e.responseModel = t.modelVersion);
  const n = t.usageMetadata;
  n && (typeof n.promptTokenCount == "number" && (e.promptTokens = n.promptTokenCount), typeof n.candidatesTokenCount == "number" && (e.completionTokens = n.candidatesTokenCount), typeof n.totalTokenCount == "number" && (e.totalTokens = n.totalTokenCount));
}
function lf(t, e, n) {
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
function ff(t, e, n, r) {
  !t || cf(t, r) || (uf(t, e), lf(t, e, n));
}
function df(t, e, n) {
  return me(this, null, function* () {
    const r = {
      responseTexts: [],
      finishReasons: [],
      toolCalls: []
    };
    try {
      try {
        for (var s = _e(t), i, o, a; i = !(o = yield new rt(s.next())).done; i = !1) {
          const c = o.value;
          ff(c, r, n, e), yield c;
        }
      } catch (o) {
        a = [o];
      } finally {
        try {
          i && (o = s.return) && (yield new rt(o.call(s)));
        } finally {
          if (a)
            throw a[0];
        }
      }
    } finally {
      const c = {
        [ln]: !0
      };
      r.responseId && (c[ae] = r.responseId), r.responseModel && (c[qt] = r.responseModel), r.promptTokens !== void 0 && (c[an] = r.promptTokens), r.completionTokens !== void 0 && (c[cn] = r.completionTokens), r.totalTokens !== void 0 && (c[un] = r.totalTokens), r.finishReasons.length && (c[zt] = JSON.stringify(r.finishReasons)), n && r.responseTexts.length && (c[J] = r.responseTexts.join("")), n && r.toolCalls.length && (c[ft] = JSON.stringify(r.toolCalls)), e.setAttributes(c), e.end();
    }
  });
}
function pf(t) {
  if (Es.includes(t))
    return !0;
  const e = t.split(".").pop();
  return Es.includes(e);
}
function mf(t) {
  return t.includes("Stream") || t.endsWith("generateContentStream") || t.endsWith("sendMessageStream");
}
function bs(t, e) {
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
function _f(t) {
  const e = {};
  return "temperature" in t && typeof t.temperature == "number" && (e[sr] = t.temperature), "topP" in t && typeof t.topP == "number" && (e[or] = t.topP), "topK" in t && typeof t.topK == "number" && (e[Ci] = t.topK), "maxOutputTokens" in t && typeof t.maxOutputTokens == "number" && (e[Mi] = t.maxOutputTokens), "frequencyPenalty" in t && typeof t.frequencyPenalty == "number" && (e[ir] = t.frequencyPenalty), "presencePenalty" in t && typeof t.presencePenalty == "number" && (e[wi] = t.presencePenalty), e;
}
function gf(t, e, n) {
  const r = {
    [rr]: of,
    [ar]: ce(t),
    [D]: "auto.ai.google_genai"
  };
  if (e) {
    if (r[H] = bs(e, n), "config" in e && typeof e.config == "object" && e.config) {
      const s = e.config;
      if (Object.assign(r, _f(s)), "tools" in s && Array.isArray(s.tools)) {
        const i = s.tools.flatMap(
          (o) => o.functionDeclarations
        );
        r[cr] = JSON.stringify(i);
      }
    }
  } else
    r[H] = bs({}, n);
  return r;
}
function Ts(t, e) {
  if ("contents" in e) {
    const n = e.contents, r = ht(n);
    t.setAttributes({ [gt]: r });
  }
  if ("message" in e) {
    const n = e.message, r = ht(n);
    t.setAttributes({ [gt]: r });
  }
  if ("history" in e) {
    const n = e.history, r = ht(n);
    t.setAttributes({ [gt]: r });
  }
}
function hf(t, e, n) {
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
        [J]: r.join("")
      });
    }
    if (n && e.functionCalls) {
      const r = e.functionCalls;
      Array.isArray(r) && r.length > 0 && t.setAttributes({
        [ft]: JSON.stringify(r)
      });
    }
  }
}
function Is(t, e, n, r) {
  const s = e === Ui;
  return new Proxy(t, {
    apply(i, o, a) {
      var m;
      const c = a[0], u = gf(e, c, n), f = (m = u[H]) != null ? m : "unknown", p = ce(e);
      return mf(e) ? we(
        {
          name: `${p} ${f} stream-response`,
          op: $e(e),
          attributes: u
        },
        (l) => L(null, null, function* () {
          try {
            r.recordInputs && c && Ts(l, c);
            const _ = yield i.apply(n, a);
            return df(_, l, !!r.recordOutputs);
          } catch (_) {
            throw l.setStatus({ code: R, message: "internal_error" }), x(_, {
              mechanism: {
                handled: !1,
                type: "auto.ai.google_genai",
                data: { function: e }
              }
            }), l.end(), _;
          }
        })
      ) : oe(
        {
          name: s ? `${p} ${f} create` : `${p} ${f}`,
          op: $e(e),
          attributes: u
        },
        (l) => (r.recordInputs && c && Ts(l, c), tn(
          () => i.apply(n, a),
          (_) => {
            x(_, {
              mechanism: { handled: !1, type: "auto.ai.google_genai", data: { function: e } }
            });
          },
          () => {
          },
          (_) => {
            s || hf(l, _, r.recordOutputs);
          }
        ))
      );
    }
  });
}
function xn(t, e = "", n) {
  return new Proxy(t, {
    get: (r, s, i) => {
      const o = Reflect.get(r, s, i), a = Di(e, String(s));
      if (typeof o == "function" && pf(a)) {
        if (a === Ui) {
          const c = Is(o, a, r, n);
          return function(...f) {
            const p = c(...f);
            return p && typeof p == "object" ? xn(p, af, n) : p;
          };
        }
        return Is(o, a, r, n);
      }
      return typeof o == "function" ? o.bind(r) : o && typeof o == "object" ? xn(o, a, n) : o;
    }
  });
}
function Dd(t, e) {
  var s;
  const n = !!((s = O()) != null && s.getOptions().sendDefaultPii), r = d({
    recordInputs: n,
    recordOutputs: n
  }, e);
  return xn(t, "", r);
}
const yf = "sentry.javascript.miniapp", As = "10.27.0-rc.1", Ne = "?", Sf = /^\s*at (?:(.*?) ?\()?((?:file|https?|blob|chrome-extension|address|native|eval|webpack|<anonymous>|[-a-z]+:|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i, Ef = /\((\S*)(?::(\d+))(?::(\d+))\)/, bf = /^\s*at (.*?) ?\((\S*):(\d+):(\d+)\)/i;
function pr(t) {
  let e = null;
  const n = t && t.framesToPop;
  try {
    if (e = If(t), e)
      return Ns(e, n);
  } catch (r) {
  }
  try {
    if (e = Tf(t), e)
      return Ns(e, n);
  } catch (r) {
  }
  return {
    message: mr(t),
    name: t && t.name,
    stack: [],
    failed: !0
  };
}
function Tf(t) {
  if (!t || !t.stack)
    return null;
  const e = [], n = t.stack.split(`
`);
  let r, s, i, o;
  for (let a = 0; a < n.length; ++a) {
    if (i = Sf.exec(n[a])) {
      const c = i[2] && i[2].indexOf("native") === 0;
      r = i[2] && i[2].indexOf("eval") === 0, r && (s = Ef.exec(i[2])) && (i[2] = s[1], i[3] = s[2], i[4] = s[3]), o = {
        url: i[2],
        func: i[1] || Ne,
        args: c ? [i[2]] : [],
        line: i[3] ? +i[3] : null,
        column: i[4] ? +i[4] : null
      };
    } else if (i = bf.exec(n[a]))
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
    message: mr(t),
    name: t.name,
    stack: e
  } : null;
}
function If(t) {
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
    message: mr(t),
    name: t.name,
    stack: i
  } : null;
}
function Ns(t, e) {
  try {
    return E(d({}, t), {
      stack: t.stack.slice(e)
    });
  } catch (n) {
    return t;
  }
}
function mr(t) {
  const e = t && t.message;
  return e ? e.error && typeof e.error.message == "string" ? e.error.message : e : "No error message";
}
const Af = 100;
function _r(t) {
  const e = pr(t), n = gr(e.stack), r = {
    type: Nf(t),
    value: Rf(t)
  };
  return n.length && (r.stacktrace = { frames: n }), r.type === void 0 && r.value === "" && (r.value = "Unrecoverable error caught"), r;
}
function Nf(t) {
  const e = t == null ? void 0 : t.name;
  return !e && ji(t) ? t.message && Array.isArray(t.message) && t.message.length == 2 ? t.message[0] : "WebAssembly.Exception" : e;
}
function Rf(t) {
  const e = t == null ? void 0 : t.message;
  return ji(t) ? Array.isArray(t.message) && t.message.length == 2 ? t.message[1] : "wasm exception" : e ? e.error && typeof e.error.message == "string" ? e.error.message : e : "No error message";
}
function ji(t) {
  return typeof WebAssembly != "undefined" && typeof WebAssembly.Exception != "undefined" ? t instanceof WebAssembly.Exception : !1;
}
function kf(t, e, n) {
  const r = O(), s = r == null ? void 0 : r.getOptions().normalizeDepth, i = Pf(t), o = {
    __serialized__: ni(t, s)
  };
  if (i)
    return {
      exception: {
        values: [_r(i)]
      },
      extra: o
    };
  const a = {
    exception: {
      values: [
        {
          type: Ye(t) ? t.constructor.name : n ? "UnhandledRejection" : "Error",
          value: wf(t, { isUnhandledRejection: n })
        }
      ]
    },
    extra: o
  };
  if (e) {
    const c = pr(e), u = gr(c.stack);
    u.length && (a.exception.values[0].stacktrace = { frames: u });
  }
  return a;
}
function Tn(t) {
  return {
    exception: {
      values: [_r(t)]
    }
  };
}
function Of(t, e, n) {
  const r = (e == null ? void 0 : e.syntheticException) || void 0, s = Mf(t, r, n);
  return ot(s), s.level = "error", e != null && e.event_id && (s.event_id = e.event_id), Gt(s);
}
function vf(t, e = "info", n, r) {
  const s = (n == null ? void 0 : n.syntheticException) || void 0, i = Dn(t, s, r);
  return i.level = e, n != null && n.event_id && (i.event_id = n.event_id), Gt(i);
}
function Mf(t, e, n, r) {
  let s;
  if (Ps(t) && t.error)
    return Tn(t.error);
  if (Ar(t) || ao(t)) {
    const i = t;
    if ("stack" in t)
      s = Tn(t);
    else {
      const o = i.name || (Ar(i) ? "DOMError" : "DOMException"), a = i.message ? `${o}: ${i.message}` : o;
      s = Dn(a, e, n), In(s, a);
    }
    return "code" in i && (s.tags = E(d({}, s.tags), { "DOMException.code": `${i.code}` })), s;
  }
  return pt(t) ? Tn(t) : yt(t) || Ye(t) ? (s = kf(t, e, r), ot(s, {
    synthetic: !0
  }), s) : (s = Dn(t, e, n), In(s, `${t}`), ot(s, {
    synthetic: !0
  }), s);
}
function Dn(t, e, n) {
  const r = {};
  if (n && e) {
    const s = pr(e), i = gr(s.stack);
    i.length && (r.exception = {
      values: [{ value: t, stacktrace: { frames: i } }]
    }), ot(r, { synthetic: !0 });
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
function wf(t, { isUnhandledRejection: e }) {
  const n = go(t), r = "exception";
  return Ps(t) ? `Event \`ErrorEvent\` captured as ${r} with message \`${t.message}\`` : Ye(t) ? `Event \`${Cf(t)}\` (type=${t.type}) captured as ${r}` : `Object captured as ${r} with keys: ${n}`;
}
function Cf(t) {
  try {
    const e = Object.getPrototypeOf(t);
    return e ? e.constructor.name : void 0;
  } catch (e) {
  }
}
function Pf(t) {
  for (const e in t)
    if (Object.prototype.hasOwnProperty.call(t, e)) {
      const n = t[e];
      if (n instanceof Error)
        return n;
    }
}
function gr(t) {
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
  ).slice(0, Af).reverse();
}
const xf = () => {
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
}, Df = () => {
  let t = "unknown";
  return typeof wx == "object" ? t = "wechat" : typeof my == "object" ? t = "alipay" : typeof tt == "object" ? t = "bytedance" : typeof dd == "object" ? t = "dingtalk" : typeof qq == "object" ? t = "qq" : typeof swan == "object" && (t = "swan"), t;
}, w = xf(), Bi = Df(), $f = "application/json";
function hr(t) {
  function e(n) {
    return new Ct((r, s) => {
      const i = w.request || w.httpRequest;
      if (typeof i != "function") {
        s(new Error("Miniapp request function is not available"));
        return;
      }
      i({
        url: t.url,
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
  return yc(t, e);
}
const $d = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  makeMiniappTransport: hr
}, Symbol.toStringTag, { value: "Module" })), Lf = () => [];
class Ff extends Ic {
  /**
   * Creates a new Miniapp SDK instance.
   *
   * @param options Configuration options for this SDK.
   */
  constructor(e = {}) {
    const n = e.transport || hr, r = e.stackParser || Lf, s = e.integrations || e.defaultIntegrations || [], i = E(d({}, e), {
      transport: n,
      stackParser: r,
      integrations: s,
      dsn: e.dsn,
      // ensure defaults for required fields
      tracesSampleRate: e.tracesSampleRate
    });
    xc(i, "miniapp", ["miniapp"]), super(i);
  }
  /**
   * @inheritDoc
   */
  _prepareEvent(e, n, r, s) {
    return e.platform = e.platform || "javascript", e.sdk = E(d({}, e.sdk), {
      name: yf,
      packages: [
        ...e.sdk && e.sdk.packages || [],
        {
          name: "npm:@sentry/miniapp",
          version: As
        }
      ],
      version: As
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
    return Of(e, n, this._options.attachStacktrace);
  }
  /**
   * @inheritDoc
   */
  // eslint-disable-next-line deprecation/deprecation
  eventFromMessage(e, n = "info", r) {
    return vf(e, n, r, this._options.attachStacktrace);
  }
}
function Uf() {
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
    if ($s(t))
      return t;
  } catch (s) {
    return t;
  }
  const r = function(...s) {
    try {
      const i = s.map((o) => Ot(o, e));
      return t.handleEvent ? t.handleEvent.apply(this, i) : t.apply(this, i);
    } catch (i) {
      throw Uf(), ut((o) => {
        o.addEventProcessor((a) => {
          const c = d({}, a);
          return e.mechanism && (In(c, void 0), ot(c, e.mechanism)), c.extra = E(d({}, c.extra), {
            arguments: B(s, 3)
          }), c;
        }), x(i);
      }), i;
    }
  };
  try {
    for (const s in t)
      Object.prototype.hasOwnProperty.call(t, s) && (r[s] = t[s]);
  } catch (s) {
  }
  Ds(r, t), z(t, "__sentry_wrapped__", r);
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
    this.name = ze.id, this._onErrorHandlerInstalled = !1, this._onUnhandledRejectionHandlerInstalled = !1, this._onPageNotFoundHandlerInstalled = !1, this._onMemoryWarningHandlerInstalled = !1, this._options = d({
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
    this._onErrorHandlerInstalled || (w.onError && w.onError((e) => {
      const n = typeof e == "string" ? new Error(e) : e;
      x(n);
    }), this._onErrorHandlerInstalled = !0);
  }
  /** JSDoc */
  _installGlobalOnUnhandledRejectionHandler() {
    this._onUnhandledRejectionHandlerInstalled || (w.onUnhandledRejection && w.onUnhandledRejection(
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
    this._onPageNotFoundHandlerInstalled || (w.onPageNotFound && w.onPageNotFound((e) => {
      const n = e.path.split("?")[0];
      Vr("pagenotfound", n), Yr("message", JSON.stringify(e)), Jr(`页面无法找到: ${n}`);
    }), this._onPageNotFoundHandlerInstalled = !0);
  }
  /** JSDoc */
  _installGlobalOnMemoryWarningHandler() {
    this._onMemoryWarningHandlerInstalled || (w.onMemoryWarning && w.onMemoryWarning(({ level: e = -1 }) => {
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
      Vr("memory-warning", String(e)), Yr("message", n), Jr("内存不足告警");
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
          data: { function: Se(e) },
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
              handler: Se(e)
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
    !r || !r.hasOwnProperty || !r.hasOwnProperty("addEventListener") || (Rt(r, "addEventListener", function(s) {
      return function(i, o, a) {
        try {
          typeof o.handleEvent == "function" && (o.handleEvent = Ot(o.handleEvent.bind(o), {
            mechanism: {
              data: {
                function: "handleEvent",
                handler: Se(o),
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
                handler: Se(o),
                target: e
              },
              handled: !0,
              type: "instrument"
            }
          }),
          a
        );
      };
    }), Rt(r, "removeEventListener", function(s) {
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
    const e = b;
    Rt(e, "setTimeout", this._wrapTimeFunction.bind(this)), Rt(e, "setInterval", this._wrapTimeFunction.bind(this)), Rt(e, "requestAnimationFrame", this._wrapRAF.bind(this)), [
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
function Se(t) {
  try {
    return t && t.name || "<anonymous>";
  } catch (e) {
    return "<anonymous>";
  }
}
const jf = "cause", Bf = 5, Kt = class Kt {
  /**
   * @inheritDoc
   */
  constructor(e = {}) {
    this.name = Kt.id, this._key = e.key || jf, this._limit = e.limit || Bf;
  }
  /**
   * @inheritDoc
   */
  setupOnce() {
    rn((e, n) => {
      const r = O(), s = r && r.getIntegrationByName(Kt.id);
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
    const s = _r(e[n]);
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
      const n = O();
      if (n && n.getIntegrationByName(Xt.id))
        try {
          const s = w.getSystemInfoSync(), {
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
            platform: l,
            screenHeight: _,
            screenWidth: S,
            // statusBarHeight,
            system: h,
            version: N,
            // windowHeight,
            // windowWidth,
            app: I,
            // 支付宝小程序
            appName: k
            // 字节跳动小程序
            // fontSizeSetting, // 支付宝小程序、 钉钉小程序、微信小程序
          } = s, [P, V] = h.split(" "), Tt = E(d({}, e.tags), {
            SDKVersion: i
          }), T = I || k || Bi || "app";
          return E(d({}, e), {
            tags: Tt,
            contexts: E(d({}, e.contexts), {
              device: {
                brand: u,
                battery_level: o || a || c,
                model: p,
                language: f,
                platform: l,
                screen_dpi: m,
                screen_height: _,
                screen_width: S
              },
              os: {
                name: P || h,
                version: V || h
              },
              browser: {
                name: T,
                version: N
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
    this.name = Zt.id, this._options = d({
      enable: !0
    }, e);
  }
  /**
   * @inheritDoc
   */
  setupOnce() {
    rn((e) => {
      const n = O();
      if (n && n.getIntegrationByName(Zt.id) && this._options.enable)
        try {
          const s = getCurrentPages().map(
            (i) => ({
              route: i.route,
              options: i.options
            })
          );
          return E(d({}, e), {
            extra: E(d({}, e.extra), {
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
      const n = O();
      return n && n.getIntegrationByName(Qt.id) && Bi === "wechat" && w.getLaunchOptionsSync && w.getLaunchOptionsSync().scene === 1129 ? null : e;
    });
  }
};
Qt.id = "IgnoreMpcrawlerErrors";
let Ge = Qt;
const Ld = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GlobalHandlers: Le,
  IgnoreMpcrawlerErrors: Ge,
  LinkedErrors: Ue,
  Router: Be,
  System: je,
  TryCatch: Fe
}, Symbol.toStringTag, { value: "Module" })), Gf = [
  Hc(),
  Uc(),
  new Fe(),
  new Le(),
  new Ue(),
  new je(),
  new Be(),
  new Ge()
];
function Fd(t = {}) {
  t.defaultIntegrations === void 0 && (t.defaultIntegrations = Gf), t.normalizeDepth = t.normalizeDepth || 5;
  const e = d({
    integrations: t.integrations || t.defaultIntegrations || [],
    stackParser: t.stackParser || (() => []),
    transport: t.transport || hr
  }, t);
  Oc(Ff, e);
}
function Ud(t = {}) {
  t.eventId || (t.eventId = ai());
  const e = O();
  e && e.showReportDialog(t);
}
function jd() {
  return ai();
}
function Bd(t) {
  const e = O();
  return e ? e.flush(t) : Gt(!1);
}
function Gd(t) {
  const e = O();
  return e ? e.close(t) : Gt(!1);
}
function Hd(t) {
  return Ot(t)();
}
const Rs = 2147483647;
function F(t) {
  return typeof t == "number" && isFinite(t);
}
function it(t) {
  return t / 1e3;
}
function Vt(t, e, n, r) {
  const s = A(t).start_timestamp;
  return s && s > e && typeof t.updateStartTime == "function" && t.updateStartTime(e), en(t, () => {
    const i = ii(d({
      startTime: e
    }, r));
    return i && i.end(n), i;
  });
}
function Hf(t, e) {
  return e.some((n) => typeof n == "string" ? t === n : n.test(t));
}
class zf {
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
    const i = it(s), { op: o, start_timestamp: a } = A(e), c = ((u = r.getEntries) == null ? void 0 : u.call(r)) || [];
    c.slice(this._performanceCursor).forEach((f) => {
      const p = it(f.startTime), m = it(Math.max(0, f.duration));
      if (!(o === "navigation" && a && i + p < a) && !this._shouldIgnoreEntry(f, n))
        switch (f.entryType) {
          case "navigation": {
            this._addNavigationSpans(e, f, i);
            break;
          }
          case "render": {
            this._addRenderSpan(e, f, p, m, i);
            break;
          }
          case "script": {
            this._addScriptSpan(e, f, p, m, i);
            break;
          }
          case "loadPackage": {
            this._addPackageSpan(e, f, p, m, i);
            break;
          }
          case "resource": {
            this._addResourceSpan(e, f, p, m, i, n.ignoreResourceSpans);
            break;
          }
        }
    }), this._performanceCursor = Math.max(c.length - 1, 0), this._trackSystemInfo(e), (o === "pageload" || o === "navigation") && (e.setAttribute("performance.timeOrigin", i), Object.entries(this._measurements).forEach(([f, p]) => {
      _a(f, p.value, p.unit);
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
    const s = A(e);
    this._timeOrigin = this._getTimeOrigin(r, s.start_timestamp), this._measurements = {}, this._performanceCursor = 0, this._observer = (i = r.createObserver) == null ? void 0 : i.call(r, (o) => {
      var u;
      const a = ((u = o == null ? void 0 : o.getEntries) == null ? void 0 : u.call(o)) || [], c = A(e);
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
    if (!w.getPerformance)
      return;
    const e = w.getPerformance();
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
    return r ? it(r) : n;
  }
  _shouldIgnoreEntry(e, n) {
    const { ignorePerformanceEntryNames: r = [] } = n;
    return r.length > 0 && e.name ? Hf(e.name, r) : !1;
  }
  _handleEntry(e, n, r, s = {}) {
    var c;
    const i = (c = this._timeOrigin) != null ? c : r, o = it(n.startTime), a = it(Math.max(0, n.duration));
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
    const s = r + it(n.startTime), i = s + it(Math.max(0, n.duration)), o = {
      [D]: "auto.ui.miniapp.metrics",
      "performance.entry_type": n.entryType
    };
    n.path && (o["navigation.path"] = n.path), n.referrerPath && (o["navigation.referrer_path"] = n.referrerPath), F(n.viewLayerReadyTime) && (o["navigation.view_layer_ready_time"] = n.viewLayerReadyTime), Vt(e, s, i, {
      name: n.path || n.name || "navigation",
      op: "browser.navigation",
      attributes: o
    }), F(n.duration) && !this._measurements["navigation.duration"] && (this._measurements["navigation.duration"] = { value: n.duration, unit: "millisecond" }), F(n.viewLayerReadyTime) && (this._measurements["navigation.view_layer_ready"] = { value: n.viewLayerReadyTime, unit: "millisecond" });
  }
  /**
   * Add render spans for UI rendering performance.
   */
  _addRenderSpan(e, n, r, s, i) {
    const o = i + r, a = o + s, c = {
      [D]: "auto.ui.miniapp.metrics",
      "performance.entry_type": n.entryType
    };
    n.path && (c["ui.component_path"] = n.path), F(n.viewLayerReadyTime) && (c["ui.view_layer_ready_time"] = n.viewLayerReadyTime), F(n.firstRenderTime) && (c["ui.first_render_time"] = n.firstRenderTime), Vt(e, o, a, {
      name: n.path || n.name || "render",
      op: "ui.render",
      attributes: c
    }), F(n.firstRenderTime) && (this._measurements["ui.first_render"] = { value: n.firstRenderTime, unit: "millisecond" });
  }
  /**
   * Add script execution spans.
   */
  _addScriptSpan(e, n, r, s, i) {
    const o = i + r, a = o + s, c = {
      [D]: "auto.resource.miniapp.metrics",
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
      [D]: "auto.resource.miniapp.metrics",
      "performance.entry_type": n.entryType
    };
    n.packageName && (c["resource.package_name"] = n.packageName), F(n.packageSize) && n.packageSize < Rs && (c["resource.package_size"] = n.packageSize), Vt(e, o, a, {
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
      [D]: "auto.resource.miniapp.metrics",
      "performance.entry_type": n.entryType
    };
    n.initiatorType && (f["resource.initiator_type"] = n.initiatorType), F(n.transferSize) && n.transferSize < Rs && (f["http.response_transfer_size"] = n.transferSize), n.path && (f["resource.path"] = n.path), Vt(e, c, u, {
      name: n.path || n.name || "resource",
      op: a,
      attributes: f
    });
  }
  /**
   * Track system information (similar to browser's _trackNavigator).
   */
  _trackSystemInfo(e) {
    if (w.getSystemInfoSync)
      try {
        const n = w.getSystemInfoSync();
        if (!n)
          return;
        n.networkType && e.setAttribute("network.type", n.networkType), n.platform && e.setAttribute("device.platform", n.platform), n.model && e.setAttribute("device.model", n.model), n.system && e.setAttribute("os.version", n.system), F(n.benchmarkLevel) && e.setAttribute("device.benchmark_level", String(n.benchmarkLevel));
      } catch (n) {
      }
  }
  _recordMeasurements(e, n, r) {
    const s = (e.name || "").toLowerCase(), i = e.duration, o = Math.max((r - n) * 1e3, 0);
    if (s === "first-paint" || s === "firstpaint" ? this._measurements.fp = { value: o, unit: "millisecond" } : s === "first-contentful-paint" || s === "firstcontentfulpaint" ? this._measurements.fcp = { value: o, unit: "millisecond" } : s === "largest-contentful-paint" || s === "largestcontentfulpaint" || s === "lcp" ? this._measurements.lcp = { value: o, unit: "millisecond" } : (s === "first-input-delay" || s === "firstinputdelay" || s === "fid") && F(i) && (this._measurements.fid = { value: i, unit: "millisecond" }), F(e.viewLayerReadyTime) && !this._measurements.view_layer_ready && (this._measurements.view_layer_ready = { value: e.viewLayerReadyTime, unit: "millisecond" }), F(e.firstRenderTime) && !this._measurements.first_render && (this._measurements.first_render = { value: e.firstRenderTime, unit: "millisecond" }), this._reportAllChanges && F(i)) {
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
const qf = {
  traceRequest: !0
}, $ = typeof __SENTRY_DEBUG__ == "undefined" ? !0 : __SENTRY_DEBUG__;
function Gi() {
  const t = Bt(), e = t && G(t);
  if (!e)
    return;
  const n = A(e).op;
  return n === "navigation" || n === "pageload" ? e : void 0;
}
function Hi(t) {
  return { name: t.path || "unknown", source: "url" };
}
function zi(t, e) {
  const n = {
    [D]: e
  };
  return t.openType && (n["miniapp.open_type"] = t.openType), t.scene !== void 0 && (n["miniapp.scene"] = t.scene), t.isTabBar !== void 0 && (n["miniapp.is_tabbar"] = t.isTabBar), t.webviewId !== void 0 && (n["miniapp.webview_id"] = t.webviewId), t.query && (n["miniapp.query"] = t.query), n;
}
function Wf(t) {
  return {
    path: (t == null ? void 0 : t.path) || (t == null ? void 0 : t.route) || (t == null ? void 0 : t.url) || "unknown-route",
    query: t == null ? void 0 : t.query,
    scene: t == null ? void 0 : t.scene,
    openType: t == null ? void 0 : t.openType,
    isTabBar: t == null ? void 0 : t.isTabBar,
    webviewId: t == null ? void 0 : t.webviewId
  };
}
function Jf(t, e = !1) {
  return !!(t === "appLaunch" || e);
}
function Yf(t, e) {
  const { instrumentPageLoad: n = !0, instrumentNavigation: r = !0 } = t, s = b, i = s.wx || s.my;
  if (!i) {
    $ && g.warn("[MiniAppTracing] No miniapp global object found");
    return;
  }
  const o = w.onAppRoute || i.onAppRoute, a = w.onAppRouteDone || i.onAppRouteDone, c = w.onBeforePageLoad || i.onBeforePageLoad, u = w.onAfterPageLoad || i.onAfterPageLoad;
  if (typeof o != "function") {
    $ && g.warn("[MiniAppTracing] onAppRoute not available");
    return;
  }
  let f = !0, p = !1;
  if (n && typeof s.getCurrentPages == "function") {
    const m = s.getCurrentPages() || [], l = m[m.length - 1];
    if (l != null && l.route) {
      p = !0, f = !1;
      const _ = {
        path: l.route,
        openType: "appLaunch"
      };
      ks(_, e);
    }
  }
  o((m) => {
    const l = Wf(m), _ = !p && Jf(l.openType, f);
    if (f && (f = !1), _ && n) {
      p = !0, ks(l, e);
      return;
    }
    r && p && Vf(l, e);
  }), typeof a == "function" && a((m) => {
    $ && g.log("[MiniAppTracing] Route done:", m == null ? void 0 : m.path);
  }), typeof c == "function" && c((m) => {
    $ && g.log("[MiniAppTracing] Before page load:", m == null ? void 0 : m.path);
  }), typeof u == "function" && u((m) => {
    $ && g.log("[MiniAppTracing] After page load:", m == null ? void 0 : m.path);
  });
}
function ks(t, e) {
  const { name: n, source: r } = Hi(t), s = zi(t, "auto.pageload.miniapp");
  s[et] = r;
  const i = Gi();
  i ? ((A(i).data || {})[et] !== "custom" && (i.updateName(n), i.setAttribute(et, r)), i.setAttributes(s), $ && g.log(`[MiniAppTracing] Updated pageload span: ${n}`)) : (v().setTransactionName(n), e({
    name: n,
    op: "pageload",
    attributes: s
  }), $ && g.log(`[MiniAppTracing] Created pageload span: ${n}`));
}
function Vf(t, e) {
  const { name: n, source: r } = Hi(t), s = zi(t, "auto.navigation.miniapp");
  s[et] = r, v().setTransactionName(n), e({
    name: n,
    op: "navigation",
    attributes: s
  }), $ && g.log(`[MiniAppTracing] Created navigation span: ${n}`);
}
function zd() {
  return Gi();
}
const Kf = 3600;
let vt, He;
function Xf() {
  return {
    traceId: at(),
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
    traceId: t && e ? e.traceId : at(),
    spanId: Ut(),
    sampleRand: Math.random()
  }, vt;
}
function td() {
  return He;
}
function ed(t, e, n, r, s, i) {
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
function nd() {
  return He ? Date.now() / 1e3 - He.startTimestamp <= Kf : !1;
}
const rd = 1e3, sd = 3e4, id = 15e3, od = "MiniAppTracing", qi = "_sentry_miniapp_idleSpan";
function yr(t) {
  return t[qi];
}
function Os(t, e) {
  z(t, qi, e);
}
const ad = d({
  idleTimeout: rd,
  finalTimeout: sd,
  childSpanTimeout: id,
  instrumentPageLoad: !0,
  instrumentNavigation: !0,
  traceContinuityMode: "link",
  consistentTraceSampling: !1
}, qf);
function qd(t = {}) {
  const e = d(d({}, ad), t), {
    idleTimeout: n,
    finalTimeout: r,
    childSpanTimeout: s,
    instrumentPageLoad: i,
    instrumentNavigation: o,
    traceContinuityMode: a,
    consistentTraceSampling: c,
    beforeStartSpan: u,
    _metricOptions: f,
    ignoreResourceSpans: p,
    ignorePerformanceEntryNames: m
  } = e, l = {
    ignoreResourceSpans: p,
    ignorePerformanceEntryNames: m
  };
  let _, S, h;
  return {
    name: od,
    setupOnce() {
      _ = new zf(f == null ? void 0 : f._reportAllChanges);
    },
    setup(N) {
      var I;
      (I = w.onAppHide) == null || I.call(w, () => {
        const k = yr(N);
        k && !A(k).timestamp && ($ && g.log("[MiniAppTracing] App hiding, finishing active span"), k.setAttribute(Oe, "appHide"), k.end());
      });
    },
    afterAllSetup(N) {
      Yf(
        {
          instrumentPageLoad: i,
          instrumentNavigation: o
        },
        (k) => {
          cd(N, k, {
            idleTimeout: n,
            finalTimeout: r,
            childSpanTimeout: s,
            traceContinuityMode: a,
            consistentTraceSampling: c,
            beforeStartSpan: u,
            metricsInstrumentation: _,
            performanceEntriesOptions: l,
            latestRoute: {
              get name() {
                return S;
              },
              set name(P) {
                S = P;
              },
              get source() {
                return h;
              },
              set source(P) {
                h = P;
              }
            }
          });
        }
      );
    }
  };
}
function cd(t, e, n) {
  const {
    idleTimeout: r,
    finalTimeout: s,
    childSpanTimeout: i,
    traceContinuityMode: o,
    consistentTraceSampling: a,
    beforeStartSpan: c,
    metricsInstrumentation: u,
    performanceEntriesOptions: f,
    latestRoute: p
  } = n;
  ud(t);
  const m = ld(o, a), l = c ? c(e) : e;
  m && m.length > 0 && (l.links = [
    ...l.links || [],
    ...m
  ]);
  const _ = l.attributes || {};
  p.name = l.name, p.source = _[et];
  const S = Na(l, {
    idleTimeout: r,
    finalTimeout: s,
    childSpanTimeout: i,
    beforeSpanEnd: (h) => {
      var P;
      u == null || u.addPerformanceEntries(h, f), Os(t, void 0);
      const N = v(), I = N.getPropagationContext();
      N.setPropagationContext(E(d({}, I), {
        traceId: h.spanContext().traceId,
        sampled: Et(h),
        dsc: ct(h)
      }));
      const k = A(h);
      ed(
        h.spanContext().traceId,
        h.spanContext().spanId,
        Et(h),
        k.start_timestamp,
        1,
        (P = I.sampleRand) != null ? P : Math.random()
      ), $ && g.log(
        `[MiniAppTracing] Span ended: ${k.op} - ${k.description}, traceId=${h.spanContext().traceId}`
      );
    }
  });
  return S.setAttribute("miniapp.trace_continuity_mode", o), Os(t, S), $ && g.log(
    `[MiniAppTracing] Started ${e.op} span: ${e.name}, traceId=${S.spanContext().traceId}`
  ), S;
}
function ud(t) {
  const e = yr(t);
  e && !A(e).timestamp && ($ && g.log(`[MiniAppTracing] Finishing current active span with op: ${A(e).op}`), e.setAttribute(Oe, "navigationStart"), e.end());
}
function ld(t, e) {
  var s;
  if (t === "off") {
    v().setPropagationContext({
      traceId: at(),
      sampleRand: Math.random()
    });
    return;
  }
  const n = td(), r = nd();
  if (t === "session") {
    const i = Zf();
    v().setPropagationContext(d({
      traceId: i.traceId,
      sampleRand: i.sampleRand
    }, e && r && n && {
      sampled: n.spanContext.traceFlags === 1
    })), $ && g.log(`[MiniAppTracing] Session mode: reusing traceId=${i.traceId}`);
    return;
  }
  if (t === "link") {
    const i = Qf(!1);
    if (v().setPropagationContext(d({
      traceId: i.traceId,
      sampleRand: i.sampleRand
    }, e && r && n && {
      sampled: n.spanContext.traceFlags === 1
    })), r && n)
      return $ && g.log(
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
function Wd() {
  const t = O();
  return t ? yr(t) : void 0;
}
export {
  Ld as Integrations,
  Ff as MiniappClient,
  yf as SDK_NAME,
  As as SDK_VERSION,
  $d as Transports,
  $c as addBreadcrumb,
  rn as addEventProcessor,
  Td as captureConsoleIntegration,
  _d as captureEvent,
  x as captureException,
  Jr as captureMessage,
  Gd as close,
  Md as consoleLoggingIntegration,
  Cd as createConsolaReporter,
  Gf as defaultIntegrations,
  Id as extraErrorDataIntegration,
  Od as featureFlagsIntegration,
  Bd as flush,
  zd as getActiveMiniAppRootSpan,
  Wd as getActiveMiniAppSpan,
  Bt as getActiveSpan,
  v as getCurrentScope,
  G as getRootSpan,
  Te as getSpanDescendants,
  Mo as getSpanStatusFromHttpCode,
  Fd as init,
  xd as instrumentAnthropicAiClient,
  Dd as instrumentGoogleGenAIClient,
  Yf as instrumentMiniAppRouter,
  Pd as instrumentOpenAiClient,
  Tu as instrumentSupabaseClient,
  jd as lastEventId,
  vd as logger,
  Ed as makeMultiplexedTransport,
  wd as metrics,
  qd as miniappTracingIntegration,
  bd as moduleMetadataIntegration,
  pd as registerSpanErrorInstrumentation,
  Ad as rewriteFramesIntegration,
  gd as setContext,
  Yr as setExtra,
  hd as setExtras,
  wr as setHttpStatus,
  _a as setMeasurement,
  Vr as setTag,
  yd as setTags,
  Sd as setUser,
  Ud as showReportDialog,
  ii as startInactiveSpan,
  cd as startMiniAppTracingNavigationSpan,
  md as startNewTrace,
  oe as startSpan,
  we as startSpanManual,
  Nd as supabaseIntegration,
  kd as thirdPartyErrorFilterIntegration,
  en as withActiveSpan,
  ut as withScope,
  Hd as wrap,
  Rd as zodErrorsIntegration
};
