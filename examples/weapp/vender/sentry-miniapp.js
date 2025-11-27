var br = Object.defineProperty, Er = Object.defineProperties;
var Tr = Object.getOwnPropertyDescriptors;
var _t = Object.getOwnPropertySymbols;
var Pe = Object.prototype.hasOwnProperty, xe = Object.prototype.propertyIsEnumerable;
var Ce = (e, t, n) => t in e ? br(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, l = (e, t) => {
  for (var n in t || (t = {}))
    Pe.call(t, n) && Ce(e, n, t[n]);
  if (_t)
    for (var n of _t(t))
      xe.call(t, n) && Ce(e, n, t[n]);
  return e;
}, _ = (e, t) => Er(e, Tr(t));
var Jt = (e, t) => {
  var n = {};
  for (var r in e)
    Pe.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && _t)
    for (var r of _t(e))
      t.indexOf(r) < 0 && xe.call(e, r) && (n[r] = e[r]);
  return n;
};
var Q = (e, t, n) => new Promise((r, s) => {
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
});
const $e = (
  // eslint-disable-next-line no-undef
  typeof globalThis != "undefined" && globalThis || // eslint-disable-next-line no-undef
  typeof self != "undefined" && self || // eslint-disable-next-line no-undef
  typeof window != "undefined" && window || // eslint-disable-next-line no-undef
  typeof global != "undefined" && global || {}
);
class Ir {
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
$e.URLSearchParams || ($e.URLSearchParams = Ir);
const g = typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__, v = globalThis, U = "10.27.0";
function lt() {
  return jt(v), v;
}
function jt(e) {
  const t = e.__SENTRY__ = e.__SENTRY__ || {};
  return t.version = t.version || U, t[U] = t[U] || {};
}
function q(e, t, n = v) {
  const r = n.__SENTRY__ = n.__SENTRY__ || {}, s = r[U] = r[U] || {};
  return s[e] || (s[e] = t());
}
const vr = "Sentry Logger ", Le = {};
function V(e) {
  if (!("console" in v))
    return e();
  const t = v.console, n = {}, r = Object.keys(Le);
  r.forEach((s) => {
    const i = Le[s];
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
function kr() {
  he().enabled = !0;
}
function Nr() {
  he().enabled = !1;
}
function vn() {
  return he().enabled;
}
function Rr(...e) {
  pe("log", ...e);
}
function wr(...e) {
  pe("warn", ...e);
}
function Ar(...e) {
  pe("error", ...e);
}
function pe(e, ...t) {
  g && vn() && V(() => {
    v.console[e](`${vr}[${e}]:`, ...t);
  });
}
function he() {
  return g ? q("loggerSettings", () => ({ enabled: !1 })) : { enabled: !1 };
}
const h = {
  /** Enable logging. */
  enable: kr,
  /** Disable logging. */
  disable: Nr,
  /** Check if logging is enabled. */
  isEnabled: vn,
  /** Log a message. */
  log: Rr,
  /** Log a warning. */
  warn: wr,
  /** Log an error. */
  error: Ar
}, Xt = "<anonymous>";
function Or(e) {
  try {
    return !e || typeof e != "function" ? Xt : e.name || Xt;
  } catch (t) {
    return Xt;
  }
}
function Mr(e) {
  return "__v_isVNode" in e && e.__v_isVNode ? "[VueVNode]" : "[VueViewModel]";
}
const kn = Object.prototype.toString;
function Nn(e) {
  switch (kn.call(e)) {
    case "[object Error]":
    case "[object Exception]":
    case "[object DOMException]":
    case "[object WebAssembly.Exception]":
      return !0;
    default:
      return Ut(e, Error);
  }
}
function K(e, t) {
  return kn.call(e) === `[object ${t}]`;
}
function Dr(e) {
  return K(e, "ErrorEvent");
}
function Fe(e) {
  return K(e, "DOMError");
}
function Cr(e) {
  return K(e, "DOMException");
}
function vt(e) {
  return K(e, "String");
}
function me(e) {
  return typeof e == "object" && e !== null && "__sentry_template_string__" in e && "__sentry_template_values__" in e;
}
function Rn(e) {
  return e === null || me(e) || typeof e != "object" && typeof e != "function";
}
function at(e) {
  return K(e, "Object");
}
function ge(e) {
  return typeof Event != "undefined" && Ut(e, Event);
}
function Pr(e) {
  return typeof Element != "undefined" && Ut(e, Element);
}
function xr(e) {
  return K(e, "RegExp");
}
function dt(e) {
  return !!(e != null && e.then && typeof e.then == "function");
}
function $r(e) {
  return at(e) && "nativeEvent" in e && "preventDefault" in e && "stopPropagation" in e;
}
function Ut(e, t) {
  try {
    return e instanceof t;
  } catch (n) {
    return !1;
  }
}
function Lr(e) {
  return !!(typeof e == "object" && e !== null && (e.__isVue || e._isVue || e.__v_isVNode));
}
const Fr = v, jr = 80;
function Ur(e, t = {}) {
  if (!e)
    return "<unknown>";
  try {
    let n = e;
    const r = 5, s = [];
    let i = 0, o = 0;
    const a = " > ", c = a.length;
    let u;
    const d = Array.isArray(t) ? t : t.keyAttrs, f = !Array.isArray(t) && t.maxStringLength || jr;
    for (; n && i++ < r && (u = Br(n, d), !(u === "html" || i > 1 && o + s.length * c + u.length >= f)); )
      s.push(u), o += u.length, n = n.parentNode;
    return s.reverse().join(a);
  } catch (n) {
    return "<unknown>";
  }
}
function Br(e, t) {
  const n = e, r = [];
  if (!(n != null && n.tagName))
    return "";
  if (Fr.HTMLElement && n instanceof HTMLElement && n.dataset) {
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
    if (o && vt(o)) {
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
function et(e, t, n) {
  if (!(t in e))
    return;
  const r = e[t];
  if (typeof r != "function")
    return;
  const s = n(r);
  typeof s == "function" && wn(s, r);
  try {
    e[t] = s;
  } catch (i) {
    g && h.log(`Failed to replace method "${t}" in object`, e);
  }
}
function Bt(e, t, n) {
  try {
    Object.defineProperty(e, t, {
      // enumerable: false, // the default, so we can save on bundle size by not explicitly setting it
      value: n,
      writable: !0,
      configurable: !0
    });
  } catch (r) {
    g && h.log(`Failed to add non-enumerable property "${t}" to object`, e);
  }
}
function wn(e, t) {
  try {
    const n = t.prototype || {};
    e.prototype = t.prototype = n, Bt(e, "__sentry_original__", t);
  } catch (n) {
  }
}
function An(e) {
  return e.__sentry_original__;
}
function On(e) {
  if (Nn(e))
    return l({
      message: e.message,
      name: e.name,
      stack: e.stack
    }, Ue(e));
  if (ge(e)) {
    const t = l({
      type: e.type,
      target: je(e.target),
      currentTarget: je(e.currentTarget)
    }, Ue(e));
    return typeof CustomEvent != "undefined" && Ut(e, CustomEvent) && (t.detail = e.detail), t;
  } else
    return e;
}
function je(e) {
  try {
    return Pr(e) ? Ur(e) : Object.prototype.toString.call(e);
  } catch (t) {
    return "<unknown>";
  }
}
function Ue(e) {
  if (typeof e == "object" && e !== null) {
    const t = {};
    for (const n in e)
      Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    return t;
  } else
    return {};
}
function Hr(e) {
  const t = Object.keys(On(e));
  return t.sort(), t[0] ? t.join(", ") : "[object has no keys]";
}
function Et(e) {
  return ee(e, /* @__PURE__ */ new Map());
}
function ee(e, t) {
  if (e === null || typeof e != "object")
    return e;
  const n = t.get(e);
  if (n !== void 0)
    return n;
  if (Array.isArray(e)) {
    const r = [];
    return t.set(e, r), e.forEach((s) => {
      r.push(ee(s, t));
    }), r;
  }
  if (Gr(e)) {
    const r = {};
    return t.set(e, r), Object.keys(e).forEach((i) => {
      const o = e[i];
      o !== void 0 && (r[i] = ee(o, t));
    }), r;
  }
  return e;
}
function Gr(e) {
  const t = e.constructor;
  return t === Object || t === void 0;
}
function ne(e, t = 0) {
  return typeof e != "string" || t === 0 || e.length <= t ? e : `${e.slice(0, t)}...`;
}
function Tt(e, t, n = !1) {
  return vt(e) ? xr(t) ? t.test(e) : vt(t) ? n ? e === t : e.includes(t) : !1 : !1;
}
function Ht(e, t = [], n = !1) {
  return t.some((r) => Tt(e, r, n));
}
function zr() {
  const e = v;
  return e.crypto || e.msCrypto;
}
let Zt;
function Wr() {
  return Math.random() * 16;
}
function R(e = zr()) {
  try {
    if (e != null && e.randomUUID)
      return e.randomUUID().replace(/-/g, "");
  } catch (t) {
  }
  return Zt || (Zt = "10000000100040008000" + 1e11), Zt.replace(
    /[018]/g,
    (t) => (
      // eslint-disable-next-line no-bitwise
      (t ^ (Wr() & 15) >> t / 4).toString(16)
    )
  );
}
function Mn(e) {
  var t, n;
  return (n = (t = e.exception) == null ? void 0 : t.values) == null ? void 0 : n[0];
}
function B(e) {
  const { message: t, event_id: n } = e;
  if (t)
    return t;
  const r = Mn(e);
  return r ? r.type && r.value ? `${r.type}: ${r.value}` : r.type || r.value || n || "<unknown>" : n || "<unknown>";
}
function re(e, t, n) {
  const r = e.exception = e.exception || {}, s = r.values = r.values || [], i = s[0] = s[0] || {};
  i.value || (i.value = t || ""), i.type || (i.type = "Error");
}
function kt(e, t) {
  const n = Mn(e);
  if (!n)
    return;
  const r = { type: "generic", handled: !0 }, s = n.mechanism;
  if (n.mechanism = l(l(l({}, r), s), t), t && "data" in t) {
    const i = l(l({}, s == null ? void 0 : s.data), t.data);
    n.mechanism.data = i;
  }
}
function Be(e) {
  if (Yr(e))
    return !0;
  try {
    Bt(e, "__sentry_captured__", !0);
  } catch (t) {
  }
  return !1;
}
function Yr(e) {
  try {
    return e.__sentry_captured__;
  } catch (t) {
  }
}
const Dn = 1e3;
function w() {
  return Date.now() / Dn;
}
function qr() {
  const { performance: e } = v;
  if (!(e != null && e.now) || !e.timeOrigin)
    return w;
  const t = e.timeOrigin;
  return () => (t + e.now()) / Dn;
}
let yt;
function Gt() {
  return (yt != null ? yt : yt = qr())();
}
function se(e, t = {}) {
  if (t.user && (!e.ipAddress && t.user.ip_address && (e.ipAddress = t.user.ip_address), !e.did && !t.did && (e.did = t.user.id || t.user.email || t.user.username)), e.timestamp = t.timestamp || Gt(), t.abnormal_mechanism && (e.abnormal_mechanism = t.abnormal_mechanism), t.ignoreDuration && (e.ignoreDuration = t.ignoreDuration), t.sid && (e.sid = t.sid.length === 32 ? t.sid : R()), t.init !== void 0 && (e.init = t.init), !e.did && t.did && (e.did = `${t.did}`), typeof t.started == "number" && (e.started = t.started), e.ignoreDuration)
    e.duration = void 0;
  else if (typeof t.duration == "number")
    e.duration = t.duration;
  else {
    const n = e.timestamp - e.started;
    e.duration = n >= 0 ? n : 0;
  }
  t.release && (e.release = t.release), t.environment && (e.environment = t.environment), !e.ipAddress && t.ipAddress && (e.ipAddress = t.ipAddress), !e.userAgent && t.userAgent && (e.userAgent = t.userAgent), typeof t.errors == "number" && (e.errors = t.errors), t.status && (e.status = t.status);
}
function ft(e, t, n = 2) {
  if (!t || typeof t != "object" || n <= 0)
    return t;
  if (e && Object.keys(t).length === 0)
    return e;
  const r = l({}, e);
  for (const s in t)
    Object.prototype.hasOwnProperty.call(t, s) && (r[s] = ft(r[s], t[s], n - 1));
  return r;
}
function Nt() {
  return R();
}
function zt() {
  return R().substring(16);
}
const ie = "_sentrySpan";
function He(e, t) {
  t ? Bt(e, ie, t) : delete e[ie];
}
function ct(e) {
  return e[ie];
}
const Vr = 100;
class C {
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
      traceId: Nt(),
      sampleRand: Math.random()
    };
  }
  /**
   * Clone all data from this scope into a new scope.
   */
  clone() {
    const t = new C();
    return t._breadcrumbs = [...this._breadcrumbs], t._tags = l({}, this._tags), t._attributes = l({}, this._attributes), t._extra = l({}, this._extra), t._contexts = l({}, this._contexts), this._contexts.flags && (t._contexts.flags = {
      values: [...this._contexts.flags.values]
    }), t._user = this._user, t._level = this._level, t._session = this._session, t._transactionName = this._transactionName, t._fingerprint = this._fingerprint, t._eventProcessors = [...this._eventProcessors], t._attachments = [...this._attachments], t._sdkProcessingMetadata = l({}, this._sdkProcessingMetadata), t._propagationContext = l({}, this._propagationContext), t._client = this._client, t._lastEventId = this._lastEventId, He(t, ct(this)), t;
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
    }, this._session && se(this._session, { user: t }), this._notifyScopeListeners(), this;
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
    return this._extra = _(l({}, this._extra), { [t]: n }), this._notifyScopeListeners(), this;
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
    const n = typeof t == "function" ? t(this) : t, r = n instanceof C ? n.getScopeData() : at(n) ? t : void 0, {
      tags: s,
      attributes: i,
      extra: o,
      user: a,
      contexts: c,
      level: u,
      fingerprint: d = [],
      propagationContext: f
    } = r || {};
    return this._tags = l(l({}, this._tags), s), this._attributes = l(l({}, this._attributes), i), this._extra = l(l({}, this._extra), o), this._contexts = l(l({}, this._contexts), c), a && Object.keys(a).length && (this._user = a), u && (this._level = u), d.length && (this._fingerprint = d), f && (this._propagationContext = f), this;
  }
  /**
   * Clears the current scope and resets its properties.
   * Note: The client will not be cleared.
   */
  clear() {
    return this._breadcrumbs = [], this._tags = {}, this._attributes = {}, this._extra = {}, this._user = {}, this._contexts = {}, this._level = void 0, this._transactionName = void 0, this._fingerprint = void 0, this._session = void 0, He(this, void 0), this._attachments = [], this.setPropagationContext({ traceId: Nt(), sampleRand: Math.random() }), this._notifyScopeListeners(), this;
  }
  /**
   * Adds a breadcrumb to the scope.
   * By default, the last 100 breadcrumbs are kept.
   */
  addBreadcrumb(t, n) {
    var i;
    const r = typeof n == "number" ? n : Vr;
    if (r <= 0)
      return this;
    const s = _(l({
      timestamp: w()
    }, t), {
      // Breadcrumb messages can theoretically be infinitely large and they're held in memory so we truncate them not to leak (too much) memory
      message: t.message ? ne(t.message, 2048) : t.message
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
      span: ct(this)
    };
  }
  /**
   * Add data which will be accessible during event processing but won't get sent to Sentry.
   */
  setSDKProcessingMetadata(t) {
    return this._sdkProcessingMetadata = ft(this._sdkProcessingMetadata, t, 2), this;
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
    const r = (n == null ? void 0 : n.event_id) || R();
    if (!this._client)
      return g && h.warn("No client configured on scope - will not capture exception!"), r;
    const s = new Error("Sentry syntheticException");
    return this._client.captureException(
      t,
      _(l({
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
    const s = (r == null ? void 0 : r.event_id) || R();
    if (!this._client)
      return g && h.warn("No client configured on scope - will not capture message!"), s;
    const i = (o = r == null ? void 0 : r.syntheticException) != null ? o : new Error(t);
    return this._client.captureMessage(
      t,
      n,
      _(l({
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
    const r = (n == null ? void 0 : n.event_id) || R();
    return this._client ? (this._client.captureEvent(t, _(l({}, n), { event_id: r }), this), r) : (g && h.warn("No client configured on scope - will not capture event!"), r);
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
function Kr() {
  return q("defaultCurrentScope", () => new C());
}
function Jr() {
  return q("defaultIsolationScope", () => new C());
}
class Xr {
  constructor(t, n) {
    let r;
    t ? r = t : r = new C();
    let s;
    n ? s = n : s = new C(), this._stack = [{ scope: r }], this._isolationScope = s;
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
    return dt(r) ? r.then(
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
function z() {
  const e = lt(), t = jt(e);
  return t.stack = t.stack || new Xr(Kr(), Jr());
}
function Zr(e) {
  return z().withScope(e);
}
function Qr(e, t) {
  const n = z();
  return n.withScope(() => (n.getStackTop().scope = e, t(e)));
}
function Ge(e) {
  return z().withScope(() => e(z().getIsolationScope()));
}
function ts() {
  return {
    withIsolationScope: Ge,
    withScope: Zr,
    withSetScope: Qr,
    withSetIsolationScope: (e, t) => Ge(t),
    getCurrentScope: () => z().getScope(),
    getIsolationScope: () => z().getIsolationScope()
  };
}
function Wt(e) {
  const t = jt(e);
  return t.acs ? t.acs : ts();
}
function O() {
  const e = lt();
  return Wt(e).getCurrentScope();
}
function A() {
  const e = lt();
  return Wt(e).getIsolationScope();
}
function _e() {
  return q("globalScope", () => new C());
}
function Cn(...e) {
  const t = lt(), n = Wt(t);
  if (e.length === 2) {
    const [r, s] = e;
    return r ? n.withSetScope(r, s) : n.withScope(s);
  }
  return n.withScope(e[0]);
}
function k() {
  return O().getClient();
}
function Pn(e) {
  const t = e.getPropagationContext(), { traceId: n, parentSpanId: r, propagationSpanId: s } = t, i = {
    trace_id: n,
    span_id: s || zt()
  };
  return r && (i.parent_span_id = r), i;
}
const es = "sentry.source", ns = "sentry.sample_rate", rs = "sentry.previous_trace_sample_rate", ss = "sentry.op", is = "sentry.origin", xn = "sentry.profile_id", $n = "sentry.exclusive_time", os = 0, as = 1, cs = "_sentryScope", us = "_sentryIsolationScope";
function ls(e) {
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
function Ln(e) {
  const t = e;
  return {
    scope: t[cs],
    isolationScope: ls(t[us])
  };
}
const ds = "sentry-", fs = /^sentry-/;
function ps(e) {
  const t = hs(e);
  if (!t)
    return;
  const n = Object.entries(t).reduce((r, [s, i]) => {
    if (s.match(fs)) {
      const o = s.slice(ds.length);
      r[o] = i;
    }
    return r;
  }, {});
  if (Object.keys(n).length > 0)
    return n;
}
function hs(e) {
  if (!(!e || !vt(e) && !Array.isArray(e)))
    return Array.isArray(e) ? e.reduce((t, n) => {
      const r = ze(n);
      return Object.entries(r).forEach(([s, i]) => {
        t[s] = i;
      }), t;
    }, {}) : ze(e);
}
function ze(e) {
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
const ms = /^o(\d+)\./, gs = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)([\w.-]+)(?::(\d+))?\/(.+)/;
function _s(e) {
  return e === "http" || e === "https";
}
function pt(e, t = !1) {
  const { host: n, path: r, pass: s, port: i, projectId: o, protocol: a, publicKey: c } = e;
  return `${a}://${c}${t && s ? `:${s}` : ""}@${n}${i ? `:${i}` : ""}/${r && `${r}/`}${o}`;
}
function ys(e) {
  const t = gs.exec(e);
  if (!t) {
    V(() => {
      console.error(`Invalid Sentry Dsn: ${e}`);
    });
    return;
  }
  const [n, r, s = "", i = "", o = "", a = ""] = t.slice(1);
  let c = "", u = a;
  const d = u.split("/");
  if (d.length > 1 && (c = d.slice(0, -1).join("/"), u = d.pop()), u) {
    const f = u.match(/^\d+/);
    f && (u = f[0]);
  }
  return Fn({ host: i, pass: s, path: c, projectId: u, port: o, protocol: n, publicKey: r });
}
function Fn(e) {
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
function Ss(e) {
  if (!g)
    return !0;
  const { port: t, projectId: n, protocol: r } = e;
  return ["protocol", "publicKey", "host", "projectId"].find((o) => e[o] ? !1 : (h.error(`Invalid Sentry Dsn: ${o} missing`), !0)) ? !1 : n.match(/^\d+$/) ? _s(r) ? t && isNaN(parseInt(t, 10)) ? (h.error(`Invalid Sentry Dsn: Invalid port ${t}`), !1) : !0 : (h.error(`Invalid Sentry Dsn: Invalid protocol ${r}`), !1) : (h.error(`Invalid Sentry Dsn: Invalid projectId ${n}`), !1);
}
function bs(e) {
  const t = e.match(ms);
  return t == null ? void 0 : t[1];
}
function Es(e) {
  const t = e.getOptions(), { host: n } = e.getDsn() || {};
  let r;
  return t.orgId ? r = String(t.orgId) : n && (r = bs(n)), r;
}
function Ts(e) {
  const t = typeof e == "string" ? ys(e) : Fn(e);
  if (!(!t || !Ss(t)))
    return t;
}
function jn(e) {
  if (typeof e == "boolean")
    return Number(e);
  const t = typeof e == "string" ? parseFloat(e) : e;
  if (!(typeof t != "number" || isNaN(t) || t < 0 || t > 1))
    return t;
}
const Un = 1;
let We = !1;
function Bn(e) {
  const { spanId: t, traceId: n, isRemote: r } = e.spanContext(), s = r ? t : ye(e).parent_span_id, i = Ln(e).scope, o = r ? (i == null ? void 0 : i.getPropagationContext().propagationSpanId) || zt() : t;
  return {
    parent_span_id: s,
    span_id: o,
    trace_id: n
  };
}
function Is(e) {
  if (e && e.length > 0)
    return e.map((o) => {
      var a = o, { context: c } = a, u = c, { spanId: t, traceId: n, traceFlags: r } = u, s = Jt(u, ["spanId", "traceId", "traceFlags"]), { attributes: i } = a;
      return l({
        span_id: t,
        trace_id: n,
        sampled: r === Un,
        attributes: i
      }, s);
    });
}
function Ye(e) {
  return typeof e == "number" ? qe(e) : Array.isArray(e) ? e[0] + e[1] / 1e9 : e instanceof Date ? qe(e.getTime()) : Gt();
}
function qe(e) {
  return e > 9999999999 ? e / 1e3 : e;
}
function ye(e) {
  var r;
  if (ks(e))
    return e.getSpanJSON();
  const { spanId: t, traceId: n } = e.spanContext();
  if (vs(e)) {
    const { attributes: s, startTime: i, name: o, endTime: a, status: c, links: u } = e, d = "parentSpanId" in e ? e.parentSpanId : "parentSpanContext" in e ? (r = e.parentSpanContext) == null ? void 0 : r.spanId : void 0;
    return {
      span_id: t,
      trace_id: n,
      data: s,
      description: o,
      parent_span_id: d,
      start_timestamp: Ye(i),
      // This is [0,0] by default in OTEL, in which case we want to interpret this as no end time
      timestamp: Ye(a) || void 0,
      status: Rs(c),
      op: s[ss],
      origin: s[is],
      links: Is(u)
    };
  }
  return {
    span_id: t,
    trace_id: n,
    start_timestamp: 0,
    data: {}
  };
}
function vs(e) {
  const t = e;
  return !!t.attributes && !!t.startTime && !!t.name && !!t.endTime && !!t.status;
}
function ks(e) {
  return typeof e.getSpanJSON == "function";
}
function Ns(e) {
  const { traceFlags: t } = e.spanContext();
  return t === Un;
}
function Rs(e) {
  if (!(!e || e.code === os))
    return e.code === as ? "ok" : e.message || "internal_error";
}
const ws = "_sentryRootSpan";
function Hn(e) {
  return e[ws] || e;
}
function As() {
  const e = lt(), t = Wt(e);
  return t.getActiveSpan ? t.getActiveSpan() : ct(O());
}
function Ve() {
  We || (V(() => {
    console.warn(
      "[Sentry] Returning null from `beforeSendSpan` is disallowed. To drop certain spans, configure the respective integrations directly or use `ignoreSpans`."
    );
  }), We = !0);
}
function Gn(e) {
  var n;
  if (typeof __SENTRY_TRACING__ == "boolean" && !__SENTRY_TRACING__)
    return !1;
  const t = e || ((n = k()) == null ? void 0 : n.getOptions());
  return !!t && // Note: This check is `!= null`, meaning "nullish". `0` is not "nullish", `undefined` and `null` are. (This comment was brought to you by 15 minutes of questioning life)
  (t.tracesSampleRate != null || !!t.tracesSampler);
}
function Ke(e) {
  h.log(`Ignoring span ${e.op} - ${e.description} because it matches \`ignoreSpans\`.`);
}
function Je(e, t) {
  if (!(t != null && t.length) || !e.description)
    return !1;
  for (const n of t) {
    if (Ms(n)) {
      if (Tt(e.description, n))
        return g && Ke(e), !0;
      continue;
    }
    if (!n.name && !n.op)
      continue;
    const r = n.name ? Tt(e.description, n.name) : !0, s = n.op ? e.op && Tt(e.op, n.op) : !0;
    if (r && s)
      return g && Ke(e), !0;
  }
  return !1;
}
function Os(e, t) {
  const n = t.parent_span_id, r = t.span_id;
  if (n)
    for (const s of e)
      s.parent_span_id === r && (s.parent_span_id = n);
}
function Ms(e) {
  return typeof e == "string" || e instanceof RegExp;
}
const Se = "production", Ds = "_frozenDsc";
function zn(e, t) {
  const n = t.getOptions(), { publicKey: r } = t.getDsn() || {}, s = {
    environment: n.environment || Se,
    release: n.release,
    public_key: r,
    trace_id: e,
    org_id: Es(t)
  };
  return t.emit("createDsc", s), s;
}
function Wn(e, t) {
  const n = t.getPropagationContext();
  return n.dsc || zn(n.traceId, e);
}
function Yn(e) {
  var y, S, b, N;
  const t = k();
  if (!t)
    return {};
  const n = Hn(e), r = ye(n), s = r.data, i = n.spanContext().traceState, o = (S = (y = i == null ? void 0 : i.get("sentry.sample_rate")) != null ? y : s[ns]) != null ? S : s[rs];
  function a(I) {
    return (typeof o == "number" || typeof o == "string") && (I.sample_rate = `${o}`), I;
  }
  const c = n[Ds];
  if (c)
    return a(c);
  const u = i == null ? void 0 : i.get("sentry.dsc"), d = u && ps(u);
  if (d)
    return a(d);
  const f = zn(e.spanContext().traceId, t), m = s[es], p = r.description;
  return m !== "url" && p && (f.transaction = p), Gn() && (f.sampled = String(Ns(n)), f.sample_rand = // In OTEL we store the sample rand on the trace state because we cannot access scopes for NonRecordingSpans
  // The Sentry OTEL SpanSampler takes care of writing the sample rand on the root span
  (N = i == null ? void 0 : i.get("sentry.sample_rand")) != null ? N : (
    // On all other platforms we can actually get the scopes from a root span (we use this as a fallback)
    (b = Ln(n).scope) == null ? void 0 : b.getPropagationContext().sampleRand.toString()
  )), a(f), t.emit("createDsc", f, n), f;
}
function D(e, t = 100, n = 1 / 0) {
  try {
    return oe("", e, t, n);
  } catch (r) {
    return { ERROR: `**non-serializable** (${r})` };
  }
}
function qn(e, t = 3, n = 100 * 1024) {
  const r = D(e, t);
  return $s(r) > n ? qn(e, t - 1, n) : r;
}
function oe(e, t, n = 1 / 0, r = 1 / 0, s = Ls()) {
  const [i, o] = s;
  if (t == null || // this matches null and undefined -> eqeq not eqeqeq
  ["boolean", "string"].includes(typeof t) || typeof t == "number" && Number.isFinite(t))
    return t;
  const a = Cs(e, t);
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
      const p = u.toJSON();
      return oe("", p, c - 1, r, s);
    } catch (p) {
    }
  const d = Array.isArray(t) ? [] : {};
  let f = 0;
  const m = On(t);
  for (const p in m) {
    if (!Object.prototype.hasOwnProperty.call(m, p))
      continue;
    if (f >= r) {
      d[p] = "[MaxProperties ~]";
      break;
    }
    const y = m[p];
    d[p] = oe(p, y, c - 1, r, s), f++;
  }
  return o(t), d;
}
function Cs(e, t) {
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
    if (Lr(t))
      return Mr(t);
    if ($r(t))
      return "[SyntheticEvent]";
    if (typeof t == "number" && !Number.isFinite(t))
      return `[${t}]`;
    if (typeof t == "function")
      return `[Function: ${Or(t)}]`;
    if (typeof t == "symbol")
      return `[${String(t)}]`;
    if (typeof t == "bigint")
      return `[BigInt: ${String(t)}]`;
    const n = Ps(t);
    return /^HTML(\w*)Element$/.test(n) ? `[HTMLElement: ${n}]` : `[object ${n}]`;
  } catch (n) {
    return `**non-serializable** (${n})`;
  }
}
function Ps(e) {
  const t = Object.getPrototypeOf(e);
  return t != null && t.constructor ? t.constructor.name : "null prototype";
}
function xs(e) {
  return ~-encodeURI(e).split(/%..|./).length;
}
function $s(e) {
  return xs(JSON.stringify(e));
}
function Ls() {
  const e = /* @__PURE__ */ new WeakSet();
  function t(r) {
    return e.has(r) ? !0 : (e.add(r), !1);
  }
  function n(r) {
    e.delete(r);
  }
  return [t, n];
}
function J(e, t = []) {
  return [e, t];
}
function Fs(e, t) {
  const [n, r] = e;
  return [n, [...r, t]];
}
function Xe(e, t) {
  const n = e[1];
  for (const r of n) {
    const s = r[0].type;
    if (t(r, s))
      return !0;
  }
  return !1;
}
function ae(e) {
  const t = jt(v);
  return t.encodePolyfill ? t.encodePolyfill(e) : new TextEncoder().encode(e);
}
function js(e) {
  const [t, n] = e;
  let r = JSON.stringify(t);
  function s(i) {
    typeof r == "string" ? r = typeof i == "string" ? r + i : [ae(r), i] : r.push(typeof i == "string" ? ae(i) : i);
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
        c = JSON.stringify(D(a));
      }
      s(c);
    }
  }
  return typeof r == "string" ? r : Us(r);
}
function Us(e) {
  const t = e.reduce((s, i) => s + i.length, 0), n = new Uint8Array(t);
  let r = 0;
  for (const s of e)
    n.set(s, r), r += s.length;
  return n;
}
function Bs(e) {
  const t = typeof e.data == "string" ? ae(e.data) : e.data;
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
const Hs = {
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
function Ze(e) {
  return Hs[e];
}
function Vn(e) {
  if (!(e != null && e.sdk))
    return;
  const { name: t, version: n } = e.sdk;
  return { name: t, version: n };
}
function Gs(e, t, n, r) {
  var i;
  const s = (i = e.sdkProcessingMetadata) == null ? void 0 : i.dynamicSamplingContext;
  return l(l(l({
    event_id: e.event_id,
    sent_at: (/* @__PURE__ */ new Date()).toISOString()
  }, t && { sdk: t }), !!n && r && { dsn: pt(r) }), s && {
    trace: s
  });
}
function zs(e, t) {
  var r, s, i, o;
  if (!t)
    return e;
  const n = e.sdk || {};
  return e.sdk = _(l({}, n), {
    name: n.name || t.name,
    version: n.version || t.version,
    integrations: [...((r = e.sdk) == null ? void 0 : r.integrations) || [], ...t.integrations || []],
    packages: [...((s = e.sdk) == null ? void 0 : s.packages) || [], ...t.packages || []],
    settings: (i = e.sdk) != null && i.settings || t.settings ? l(l({}, (o = e.sdk) == null ? void 0 : o.settings), t.settings) : void 0
  }), e;
}
function Ws(e, t, n, r) {
  const s = Vn(n), i = l(l({
    sent_at: (/* @__PURE__ */ new Date()).toISOString()
  }, s && { sdk: s }), !!r && t && { dsn: pt(t) }), o = "aggregates" in e ? [{ type: "sessions" }, e] : [{ type: "session" }, e.toJSON()];
  return J(i, [o]);
}
function Ys(e, t, n, r) {
  const s = Vn(n), i = e.type && e.type !== "replay_event" ? e.type : "event";
  zs(e, n == null ? void 0 : n.sdk);
  const o = Gs(e, s, r, t);
  return delete e.sdkProcessingMetadata, J(o, [[{ type: i }, e]]);
}
function qs(e, t, n) {
  if (!Gn(e))
    return [!1];
  let r, s;
  typeof e.tracesSampler == "function" ? (s = e.tracesSampler(_(l({}, t), {
    inheritOrSampleWith: (a) => typeof t.parentSampleRate == "number" ? t.parentSampleRate : typeof t.parentSampled == "boolean" ? Number(t.parentSampled) : a
  })), r = !0) : t.parentSampled !== void 0 ? s = t.parentSampled : typeof e.tracesSampleRate != "undefined" && (s = e.tracesSampleRate, r = !0);
  const i = jn(s);
  if (i === void 0)
    return g && h.warn(
      `[Tracing] Discarding root span because of invalid sample rate. Sample rate must be a boolean or a number between 0 and 1. Got ${JSON.stringify(
        s
      )} of type ${JSON.stringify(typeof s)}.`
    ), [!1];
  if (!i)
    return g && h.log(
      `[Tracing] Discarding transaction because ${typeof e.tracesSampler == "function" ? "tracesSampler returned 0 or false" : "a negative sampling decision was inherited or tracesSampleRate is set to 0"}`
    ), [!1, i, r];
  const o = n < i;
  return o || g && h.log(
    `[Tracing] Discarding transaction because it's not included in the random sample (sampling rate = ${Number(
      s
    )})`
  ), [o, i, r];
}
const Qt = 0, Qe = 1, tn = 2;
function Yt(e) {
  return new W((t) => {
    t(e);
  });
}
function be(e) {
  return new W((t, n) => {
    n(e);
  });
}
class W {
  constructor(t) {
    this._state = Qt, this._handlers = [], this._runExecutor(t);
  }
  /** @inheritdoc */
  then(t, n) {
    return new W((r, s) => {
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
    return new W((n, r) => {
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
    if (this._state === Qt)
      return;
    const t = this._handlers.slice();
    this._handlers = [], t.forEach((n) => {
      n[0] || (this._state === Qe && n[1](this._value), this._state === tn && n[2](this._value), n[0] = !0);
    });
  }
  /** Run the executor for the SyncPromise. */
  _runExecutor(t) {
    const n = (i, o) => {
      if (this._state === Qt) {
        if (dt(o)) {
          o.then(r, s);
          return;
        }
        this._state = i, this._value = o, this._executeHandlers();
      }
    }, r = (i) => {
      n(Qe, i);
    }, s = (i) => {
      n(tn, i);
    };
    try {
      t(r, s);
    } catch (i) {
      s(i);
    }
  }
}
function Vs(e, t, n, r = 0) {
  try {
    const s = ce(t, n, e, r);
    return dt(s) ? s : Yt(s);
  } catch (s) {
    return be(s);
  }
}
function ce(e, t, n, r) {
  const s = n[r];
  if (!e || !s)
    return e;
  const i = s(l({}, e), t);
  return g && i === null && h.log(`Event processor "${s.id || "?"}" dropped event`), dt(i) ? i.then((o) => ce(o, t, n, r + 1)) : ce(i, t, n, r + 1);
}
function Ks(e, t) {
  const { fingerprint: n, span: r, breadcrumbs: s, sdkProcessingMetadata: i } = t;
  Js(e, t), r && Qs(e, r), ti(e, n), Xs(e, s), Zs(e, i);
}
function Y(e, t) {
  const {
    extra: n,
    tags: r,
    user: s,
    contexts: i,
    level: o,
    sdkProcessingMetadata: a,
    breadcrumbs: c,
    fingerprint: u,
    eventProcessors: d,
    attachments: f,
    propagationContext: m,
    transactionName: p,
    span: y
  } = t;
  St(e, "extra", n), St(e, "tags", r), St(e, "user", s), St(e, "contexts", i), e.sdkProcessingMetadata = ft(e.sdkProcessingMetadata, a, 2), o && (e.level = o), p && (e.transactionName = p), y && (e.span = y), c.length && (e.breadcrumbs = [...e.breadcrumbs, ...c]), u.length && (e.fingerprint = [...e.fingerprint, ...u]), d.length && (e.eventProcessors = [...e.eventProcessors, ...d]), f.length && (e.attachments = [...e.attachments, ...f]), e.propagationContext = l(l({}, e.propagationContext), m);
}
function St(e, t, n) {
  e[t] = ft(e[t], n, 1);
}
function Js(e, t) {
  const { extra: n, tags: r, user: s, contexts: i, level: o, transactionName: a } = t;
  Object.keys(n).length && (e.extra = l(l({}, n), e.extra)), Object.keys(r).length && (e.tags = l(l({}, r), e.tags)), Object.keys(s).length && (e.user = l(l({}, s), e.user)), Object.keys(i).length && (e.contexts = l(l({}, i), e.contexts)), o && (e.level = o), a && e.type !== "transaction" && (e.transaction = a);
}
function Xs(e, t) {
  const n = [...e.breadcrumbs || [], ...t];
  e.breadcrumbs = n.length ? n : void 0;
}
function Zs(e, t) {
  e.sdkProcessingMetadata = l(l({}, e.sdkProcessingMetadata), t);
}
function Qs(e, t) {
  e.contexts = l({
    trace: Bn(t)
  }, e.contexts), e.sdkProcessingMetadata = l({
    dynamicSamplingContext: Yn(t)
  }, e.sdkProcessingMetadata);
  const n = Hn(t), r = ye(n).description;
  r && !e.transaction && e.type === "transaction" && (e.transaction = r);
}
function ti(e, t) {
  e.fingerprint = e.fingerprint ? Array.isArray(e.fingerprint) ? e.fingerprint : [e.fingerprint] : [], t && (e.fingerprint = e.fingerprint.concat(t)), e.fingerprint.length || delete e.fingerprint;
}
let P, en, nn, L;
function ei(e) {
  const t = v._sentryDebugIds, n = v._debugIds;
  if (!t && !n)
    return {};
  const r = t ? Object.keys(t) : [], s = n ? Object.keys(n) : [];
  if (L && r.length === en && s.length === nn)
    return L;
  en = r.length, nn = s.length, L = {}, P || (P = {});
  const i = (o, a) => {
    for (const c of o) {
      const u = a[c], d = P == null ? void 0 : P[c];
      if (d && L && u)
        L[d[0]] = u, P && (P[c] = [d[0], u]);
      else if (u) {
        const f = e(c);
        for (let m = f.length - 1; m >= 0; m--) {
          const p = f[m], y = p == null ? void 0 : p.filename;
          if (y && L && P) {
            L[y] = u, P[c] = [y, u];
            break;
          }
        }
      }
    }
  };
  return t && i(r, t), n && i(s, n), L;
}
function ni(e, t, n, r, s, i) {
  const { normalizeDepth: o = 3, normalizeMaxBreadth: a = 1e3 } = e, c = _(l({}, t), {
    event_id: t.event_id || n.event_id || R(),
    timestamp: t.timestamp || w()
  }), u = n.integrations || e.integrations.map((b) => b.name);
  ri(c, e), oi(c, u), s && s.emit("applyFrameMetadata", t), t.type === void 0 && si(c, e.stackParser);
  const d = ci(r, n.captureContext);
  n.mechanism && kt(c, n.mechanism);
  const f = s ? s.getEventProcessors() : [], m = _e().getScopeData();
  if (i) {
    const b = i.getScopeData();
    Y(m, b);
  }
  if (d) {
    const b = d.getScopeData();
    Y(m, b);
  }
  const p = [...n.attachments || [], ...m.attachments];
  p.length && (n.attachments = p), Ks(c, m);
  const y = [
    ...f,
    // Run scope event processors _after_ all other processors
    ...m.eventProcessors
  ];
  return Vs(y, c, n).then((b) => (b && ii(b), typeof o == "number" && o > 0 ? ai(b, o, a) : b));
}
function ri(e, t) {
  var a, c;
  const { environment: n, release: r, dist: s, maxValueLength: i } = t;
  e.environment = e.environment || n || Se, !e.release && r && (e.release = r), !e.dist && s && (e.dist = s);
  const o = e.request;
  o != null && o.url && i && (o.url = ne(o.url, i)), i && ((c = (a = e.exception) == null ? void 0 : a.values) == null || c.forEach((u) => {
    u.value && (u.value = ne(u.value, i));
  }));
}
function si(e, t) {
  var r, s;
  const n = ei(t);
  (s = (r = e.exception) == null ? void 0 : r.values) == null || s.forEach((i) => {
    var o, a;
    (a = (o = i.stacktrace) == null ? void 0 : o.frames) == null || a.forEach((c) => {
      c.filename && (c.debug_id = n[c.filename]);
    });
  });
}
function ii(e) {
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
function oi(e, t) {
  t.length > 0 && (e.sdk = e.sdk || {}, e.sdk.integrations = [...e.sdk.integrations || [], ...t]);
}
function ai(e, t, n) {
  var s, i;
  if (!e)
    return null;
  const r = l(l(l(l(l({}, e), e.breadcrumbs && {
    breadcrumbs: e.breadcrumbs.map((o) => l(l({}, o), o.data && {
      data: D(o.data, t, n)
    }))
  }), e.user && {
    user: D(e.user, t, n)
  }), e.contexts && {
    contexts: D(e.contexts, t, n)
  }), e.extra && {
    extra: D(e.extra, t, n)
  });
  return (s = e.contexts) != null && s.trace && r.contexts && (r.contexts.trace = e.contexts.trace, e.contexts.trace.data && (r.contexts.trace.data = D(e.contexts.trace.data, t, n))), e.spans && (r.spans = e.spans.map((o) => l(l({}, o), o.data && {
    data: D(o.data, t, n)
  }))), (i = e.contexts) != null && i.flags && r.contexts && (r.contexts.flags = D(e.contexts.flags, 3, n)), r;
}
function ci(e, t) {
  if (!t)
    return e;
  const n = e ? e.clone() : new C();
  return n.update(t), n;
}
function ui(e) {
  if (e)
    return li(e) ? { captureContext: e } : fi(e) ? {
      captureContext: e
    } : e;
}
function li(e) {
  return e instanceof C || typeof e == "function";
}
const di = [
  "user",
  "level",
  "extra",
  "contexts",
  "tags",
  "fingerprint",
  "propagationContext"
];
function fi(e) {
  return Object.keys(e).some((t) => di.includes(t));
}
function ue(e, t) {
  return O().captureException(e, ui(t));
}
function rn(e, t) {
  const n = typeof t == "string" ? t : void 0, r = typeof t != "string" ? { captureContext: t } : void 0;
  return O().captureMessage(e, n, r);
}
function pi(e, t) {
  return O().captureEvent(e, t);
}
function Sa(e, t) {
  A().setContext(e, t);
}
function ba(e) {
  A().setExtras(e);
}
function sn(e, t) {
  A().setExtra(e, t);
}
function Ea(e) {
  A().setTags(e);
}
function on(e, t) {
  A().setTag(e, t);
}
function Ta(e) {
  A().setUser(e);
}
function Kn() {
  return A().lastEventId();
}
function qt(e) {
  A().addEventProcessor(e);
}
const hi = "7";
function mi(e) {
  const t = e.protocol ? `${e.protocol}:` : "", n = e.port ? `:${e.port}` : "";
  return `${t}//${e.host}${n}${e.path ? `/${e.path}` : ""}/api/`;
}
function gi(e) {
  return `${mi(e)}${e.projectId}/envelope/`;
}
function _i(e, t) {
  const n = {
    sentry_version: hi
  };
  return e.publicKey && (n.sentry_key = e.publicKey), t && (n.sentry_client = `${t.name}/${t.version}`), new URLSearchParams(n).toString();
}
function yi(e, t, n) {
  return t || `${gi(e)}?${_i(e, n)}`;
}
const an = [];
function Si(e, t) {
  const n = {};
  return t.forEach((r) => {
    r && Jn(e, r, n);
  }), n;
}
function cn(e, t) {
  for (const n of t)
    n != null && n.afterAllSetup && n.afterAllSetup(e);
}
function Jn(e, t, n) {
  if (n[t.name]) {
    g && h.log(`Integration skipped because it was already installed: ${t.name}`);
    return;
  }
  if (n[t.name] = t, !an.includes(t.name) && typeof t.setupOnce == "function" && (t.setupOnce(), an.push(t.name)), t.setup && typeof t.setup == "function" && t.setup(e), typeof t.preprocessEvent == "function") {
    const r = t.preprocessEvent.bind(t);
    e.on("preprocessEvent", (s, i) => r(s, i, e));
  }
  if (typeof t.processEvent == "function") {
    const r = t.processEvent.bind(t), s = Object.assign((i, o) => r(i, o, e), {
      id: t.name
    });
    e.addEventProcessor(s);
  }
  g && h.log(`Integration installed: ${t.name}`);
}
function Xn(e, t) {
  return t ? Cn(t, () => {
    const n = As(), r = n ? Bn(n) : Pn(t);
    return [n ? Yn(n) : Wn(e, t), r];
  }) : [void 0, void 0];
}
const bi = {
  trace: 1,
  debug: 5,
  info: 9,
  warn: 13,
  error: 17,
  fatal: 21
};
function Ei(e) {
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
function Ti(e, t, n, r) {
  const s = {};
  return t != null && t.sdk && (s.sdk = {
    name: t.sdk.name,
    version: t.sdk.version
  }), n && r && (s.dsn = pt(r)), J(s, [Ei(e)]);
}
const Ii = 100;
function vi(e) {
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
function M(e, t, n, r = !0) {
  n && (!e[t] || r) && (e[t] = n);
}
function ki(e, t) {
  const n = Ee(), r = Qn(e);
  r === void 0 ? n.set(e, [t]) : r.length >= Ii ? (Zn(e, r), n.set(e, [t])) : n.set(e, [...r, t]);
}
function Ni(e, t = O(), n = ki) {
  var Oe, Me, De;
  const r = (Oe = t == null ? void 0 : t.getClient()) != null ? Oe : k();
  if (!r) {
    g && h.warn("No client available to capture log.");
    return;
  }
  const { release: s, environment: i, enableLogs: o = !1, beforeSendLog: a } = r.getOptions();
  if (!o) {
    g && h.warn("logging option not enabled, log will not be captured.");
    return;
  }
  const [, c] = Xn(r, t), u = l({}, e.attributes), {
    user: { id: d, email: f, username: m }
  } = Ri(t);
  M(u, "user.id", d, !1), M(u, "user.email", f, !1), M(u, "user.name", m, !1), M(u, "sentry.release", s), M(u, "sentry.environment", i);
  const { name: p, version: y } = (De = (Me = r.getSdkMetadata()) == null ? void 0 : Me.sdk) != null ? De : {};
  M(u, "sentry.sdk.name", p), M(u, "sentry.sdk.version", y);
  const S = r.getIntegrationByName("Replay"), b = S == null ? void 0 : S.getReplayId(!0);
  M(u, "sentry.replay_id", b), b && (S == null ? void 0 : S.getRecordingMode()) === "buffer" && M(u, "sentry._internal.replay_is_buffering", !0);
  const N = e.message;
  if (me(N)) {
    const { __sentry_template_string__: gt, __sentry_template_values__: j = [] } = N;
    j != null && j.length && (u["sentry.message.template"] = gt), j.forEach((yr, Sr) => {
      u[`sentry.message.parameter.${Sr}`] = yr;
    });
  }
  const I = ct(t);
  M(u, "sentry.trace.parent_span_id", I == null ? void 0 : I.spanContext().spanId);
  const $ = _(l({}, e), { attributes: u });
  r.emit("beforeCaptureLog", $);
  const Z = a ? V(() => a($)) : $;
  if (!Z) {
    r.recordDroppedEvent("before_send", "log_item", 1), g && h.warn("beforeSendLog returned null, log will not be captured.");
    return;
  }
  const { level: ht, message: Vt, attributes: mt = {}, severityNumber: Kt } = Z, _r = {
    timestamp: Gt(),
    level: ht,
    body: Vt,
    trace_id: c == null ? void 0 : c.trace_id,
    severity_number: Kt != null ? Kt : bi[ht],
    attributes: Object.keys(mt).reduce(
      (gt, j) => (gt[j] = vi(mt[j]), gt),
      {}
    )
  };
  n(r, _r), r.emit("afterCaptureLog", Z);
}
function Zn(e, t) {
  var i;
  const n = (i = t != null ? t : Qn(e)) != null ? i : [];
  if (n.length === 0)
    return;
  const r = e.getOptions(), s = Ti(n, r._metadata, r.tunnel, e.getDsn());
  Ee().set(e, []), e.emit("flushLogs"), e.sendEnvelope(s);
}
function Qn(e) {
  return Ee().get(e);
}
function Ri(e) {
  const t = _e().getScopeData();
  return Y(t, A().getScopeData()), Y(t, e.getScopeData()), t;
}
function Ee() {
  return q("clientToLogBufferMap", () => /* @__PURE__ */ new WeakMap());
}
function wi(e) {
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
function Ai(e, t, n, r) {
  const s = {};
  return t != null && t.sdk && (s.sdk = {
    name: t.sdk.name,
    version: t.sdk.version
  }), n && r && (s.dsn = pt(r)), J(s, [wi(e)]);
}
const Oi = 1e3;
function Mi(e) {
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
function x(e, t, n, r = !0) {
  n && (r || !(t in e)) && (e[t] = n);
}
function Di(e, t) {
  const n = Te(), r = er(e);
  r === void 0 ? n.set(e, [t]) : r.length >= Oi ? (tr(e, r), n.set(e, [t])) : n.set(e, [...r, t]);
}
function Ci(e, t, n) {
  var p, y;
  const { release: r, environment: s } = t.getOptions(), i = l({}, e.attributes), {
    user: { id: o, email: a, username: c }
  } = $i(n);
  x(i, "user.id", o, !1), x(i, "user.email", a, !1), x(i, "user.name", c, !1), x(i, "sentry.release", r), x(i, "sentry.environment", s);
  const { name: u, version: d } = (y = (p = t.getSdkMetadata()) == null ? void 0 : p.sdk) != null ? y : {};
  x(i, "sentry.sdk.name", u), x(i, "sentry.sdk.version", d);
  const f = t.getIntegrationByName("Replay"), m = f == null ? void 0 : f.getReplayId(!0);
  return x(i, "sentry.replay_id", m), m && (f == null ? void 0 : f.getRecordingMode()) === "buffer" && x(i, "sentry._internal.replay_is_buffering", !0), _(l({}, e), {
    attributes: i
  });
}
function Pi(e, t, n) {
  const r = {};
  for (const c in e.attributes)
    e.attributes[c] !== void 0 && (r[c] = Mi(e.attributes[c]));
  const [, s] = Xn(t, n), i = ct(n), o = i ? i.spanContext().traceId : s == null ? void 0 : s.trace_id, a = i ? i.spanContext().spanId : void 0;
  return {
    timestamp: Gt(),
    trace_id: o != null ? o : "",
    span_id: a,
    name: e.name,
    type: e.type,
    unit: e.unit,
    value: e.value,
    attributes: r
  };
}
function xi(e, t) {
  var p, y, S, b;
  const n = (p = t == null ? void 0 : t.scope) != null ? p : O(), r = (y = t == null ? void 0 : t.captureSerializedMetric) != null ? y : Di, s = (S = n == null ? void 0 : n.getClient()) != null ? S : k();
  if (!s) {
    g && h.warn("No client available to capture metric.");
    return;
  }
  const { _experiments: i, enableMetrics: o, beforeSendMetric: a } = s.getOptions();
  if (!((b = o != null ? o : i == null ? void 0 : i.enableMetrics) != null ? b : !0)) {
    g && h.warn("metrics option not enabled, metric will not be captured.");
    return;
  }
  const u = Ci(e, s, n);
  s.emit("processMetric", u);
  const d = a || (i == null ? void 0 : i.beforeSendMetric), f = d ? d(u) : u;
  if (!f) {
    g && h.log("`beforeSendMetric` returned `null`, will not send metric.");
    return;
  }
  const m = Pi(f, s, n);
  g && h.log("[Metric]", m), r(s, m), s.emit("afterCaptureMetric", f);
}
function tr(e, t) {
  var i;
  const n = (i = t != null ? t : er(e)) != null ? i : [];
  if (n.length === 0)
    return;
  const r = e.getOptions(), s = Ai(n, r._metadata, r.tunnel, e.getDsn());
  Te().set(e, []), e.emit("flushMetrics"), e.sendEnvelope(s);
}
function er(e) {
  return Te().get(e);
}
function $i(e) {
  const t = _e().getScopeData();
  return Y(t, A().getScopeData()), Y(t, e.getScopeData()), t;
}
function Te() {
  return q("clientToMetricBufferMap", () => /* @__PURE__ */ new WeakMap());
}
const Ie = Symbol.for("SentryBufferFullError");
function nr(e = 100) {
  const t = /* @__PURE__ */ new Set();
  function n() {
    return t.size < e;
  }
  function r(o) {
    t.delete(o);
  }
  function s(o) {
    if (!n())
      return be(Ie);
    const a = o();
    return t.add(a), a.then(
      () => r(a),
      () => r(a)
    ), a;
  }
  function i(o) {
    if (!t.size)
      return Yt(!0);
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
const Li = 60 * 1e3;
function Fi(e, t = Date.now()) {
  const n = parseInt(`${e}`, 10);
  if (!isNaN(n))
    return n * 1e3;
  const r = Date.parse(`${e}`);
  return isNaN(r) ? Li : r - t;
}
function ji(e, t) {
  return e[t] || e.all || 0;
}
function Ui(e, t, n = Date.now()) {
  return ji(e, t) > n;
}
function Bi(e, { statusCode: t, headers: n }, r = Date.now()) {
  const s = l({}, e), i = n == null ? void 0 : n["x-sentry-rate-limits"], o = n == null ? void 0 : n["retry-after"];
  if (i)
    for (const a of i.trim().split(",")) {
      const [c, u, , , d] = a.split(":", 5), f = parseInt(c, 10), m = (isNaN(f) ? 60 : f) * 1e3;
      if (!u)
        s.all = r + m;
      else
        for (const p of u.split(";"))
          p === "metric_bucket" ? (!d || d.split(";").includes("custom")) && (s[p] = r + m) : s[p] = r + m;
    }
  else o ? s.all = r + Fi(o, r) : t === 429 && (s.all = r + 60 * 1e3);
  return s;
}
const rr = 64;
function Hi(e, t, n = nr(
  e.bufferSize || rr
)) {
  let r = {};
  const s = (o) => n.drain(o);
  function i(o) {
    const a = [];
    if (Xe(o, (f, m) => {
      const p = Ze(m);
      Ui(r, p) ? e.recordDroppedEvent("ratelimit_backoff", p) : a.push(f);
    }), a.length === 0)
      return Promise.resolve({});
    const c = J(o[0], a), u = (f) => {
      Xe(c, (m, p) => {
        e.recordDroppedEvent(f, Ze(p));
      });
    }, d = () => t({ body: js(c) }).then(
      (f) => (f.statusCode !== void 0 && (f.statusCode < 200 || f.statusCode >= 300) && g && h.warn(`Sentry responded with status code ${f.statusCode} to sent event.`), r = Bi(r, f), f),
      (f) => {
        throw u("network_error"), g && h.error("Encountered error running transport request:", f), f;
      }
    );
    return n.add(d).then(
      (f) => f,
      (f) => {
        if (f === Ie)
          return g && h.error("Skipped sending event because buffer is full."), u("queue_overflow"), Promise.resolve({});
        throw f;
      }
    );
  }
  return {
    send: i,
    flush: s
  };
}
function Gi(e, t, n) {
  const r = [
    { type: "client_report" },
    {
      timestamp: w(),
      discarded_events: e
    }
  ];
  return J(t ? { dsn: t } : {}, [r]);
}
function sr(e) {
  const t = [];
  e.message && t.push(e.message);
  try {
    const n = e.exception.values[e.exception.values.length - 1];
    n != null && n.value && (t.push(n.value), n.type && t.push(`${n.type}: ${n.value}`));
  } catch (n) {
  }
  return t;
}
function zi(e) {
  var c, u, d;
  const { trace_id: t, parent_span_id: n, span_id: r, status: s, origin: i, data: o, op: a } = (u = (c = e.contexts) == null ? void 0 : c.trace) != null ? u : {};
  return {
    data: o != null ? o : {},
    description: e.transaction,
    op: a,
    parent_span_id: n,
    span_id: r != null ? r : "",
    start_timestamp: (d = e.start_timestamp) != null ? d : 0,
    status: s,
    timestamp: e.timestamp,
    trace_id: t != null ? t : "",
    origin: i,
    profile_id: o == null ? void 0 : o[xn],
    exclusive_time: o == null ? void 0 : o[$n],
    measurements: e.measurements,
    is_segment: !0
  };
}
function Wi(e) {
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
        data: l(l(l({}, e.data), e.profile_id && { [xn]: e.profile_id }), e.exclusive_time && { [$n]: e.exclusive_time })
      }
    },
    measurements: e.measurements
  };
}
const un = "Not capturing exception because it's already been captured.", ln = "Discarded session because of missing or non-string release", ir = Symbol.for("SentryInternalError"), or = Symbol.for("SentryDoNotSendEventError"), Yi = 5e3;
function It(e) {
  return {
    message: e,
    [ir]: !0
  };
}
function te(e) {
  return {
    message: e,
    [or]: !0
  };
}
function dn(e) {
  return !!e && typeof e == "object" && ir in e;
}
function fn(e) {
  return !!e && typeof e == "object" && or in e;
}
function pn(e, t, n, r, s) {
  let i = 0, o, a = !1;
  e.on(n, () => {
    i = 0, clearTimeout(o), a = !1;
  }), e.on(t, (c) => {
    i += r(c), i >= 8e5 ? s(e) : a || (a = !0, o = setTimeout(() => {
      s(e);
    }, Yi));
  }), e.on("flush", () => {
    s(e);
  });
}
class qi {
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
    if (this._options = t, this._integrations = {}, this._numProcessing = 0, this._outcomes = {}, this._hooks = {}, this._eventProcessors = [], this._promiseBuffer = nr((s = (r = t.transportOptions) == null ? void 0 : r.bufferSize) != null ? s : rr), t.dsn ? this._dsn = Ts(t.dsn) : g && h.warn("No DSN provided, client will not send events."), this._dsn) {
      const d = yi(
        this._dsn,
        t.tunnel,
        t._metadata ? t._metadata.sdk : void 0
      );
      this._transport = t.transport(_(l({
        tunnel: this._options.tunnel,
        recordDroppedEvent: this.recordDroppedEvent.bind(this)
      }, t.transportOptions), {
        url: d
      }));
    }
    this._options.enableLogs = (o = this._options.enableLogs) != null ? o : (i = this._options._experiments) == null ? void 0 : i.enableLogs, this._options.enableLogs && pn(this, "afterCaptureLog", "flushLogs", Xi, Zn), ((u = (c = this._options.enableMetrics) != null ? c : (a = this._options._experiments) == null ? void 0 : a.enableMetrics) != null ? u : !0) && pn(
      this,
      "afterCaptureMetric",
      "flushMetrics",
      Ji,
      tr
    );
  }
  /**
   * Captures an exception event and sends it to Sentry.
   *
   * Unlike `captureException` exported from every SDK, this method requires that you pass it the current scope.
   */
  captureException(t, n, r) {
    const s = R();
    if (Be(t))
      return g && h.log(un), s;
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
      event_id: R()
    }, r), o = me(t) ? t : String(t), a = Rn(t), c = a ? this.eventFromMessage(o, n, i) : this.eventFromException(t, i);
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
    const s = R();
    if (n != null && n.originalException && Be(n.originalException))
      return g && h.log(un), s;
    const i = l({
      event_id: s
    }, n), o = t.sdkProcessingMetadata || {}, a = o.capturedSpanScope, c = o.capturedSpanIsolationScope, u = hn(t.type);
    return this._process(
      () => this._captureEvent(t, i, a || r, c),
      u
    ), i.event_id;
  }
  /**
   * Captures a session.
   */
  captureSession(t) {
    this.sendSession(t), se(t, { init: !1 });
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
    return Q(this, null, function* () {
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
    return Q(this, null, function* () {
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
    Jn(this, t, this._integrations), n || cn(this, [t]);
  }
  /**
   * Send a fully prepared event to Sentry.
   */
  sendEvent(t, n = {}) {
    this.emit("beforeSendEvent", t, n);
    let r = Ys(t, this._dsn, this._options._metadata, this._options.tunnel);
    for (const s of n.attachments || [])
      r = Fs(r, Bs(s));
    this.sendEnvelope(r).then((s) => this.emit("afterSendEvent", t, s));
  }
  /**
   * Send a session or session aggregrates to Sentry.
   */
  sendSession(t) {
    const { release: n, environment: r = Se } = this._options;
    if ("aggregates" in t) {
      const i = t.attrs || {};
      if (!i.release && !n) {
        g && h.warn(ln);
        return;
      }
      i.release = i.release || n, i.environment = i.environment || r, t.attrs = i;
    } else {
      if (!t.release && !n) {
        g && h.warn(ln);
        return;
      }
      t.release = t.release || n, t.environment = t.environment || r;
    }
    this.emit("beforeSendSession", t);
    const s = Ws(t, this._dsn, this._options._metadata, this._options.tunnel);
    this.sendEnvelope(s);
  }
  /**
   * Record on the client that an event got dropped (ie, an event that will not be sent to Sentry).
   */
  recordDroppedEvent(t, n, r = 1) {
    if (this._options.sendClientReports) {
      const s = `${t}:${n}`;
      g && h.log(`Recording outcome: "${s}"${r > 1 ? ` (${r} times)` : ""}`), this._outcomes[s] = (this._outcomes[s] || 0) + r;
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
    return Q(this, null, function* () {
      if (this.emit("beforeEnvelope", t), this._isEnabled() && this._transport)
        try {
          return yield this._transport.send(t);
        } catch (n) {
          return g && h.error("Error while sending envelope:", n), {};
        }
      return g && h.error("Transport disabled"), {};
    });
  }
  /* eslint-enable @typescript-eslint/unified-signatures */
  /** Setup integrations for this client. */
  _setupIntegrations() {
    const { integrations: t } = this._options;
    this._integrations = Si(this, t), cn(this, t);
  }
  /** Updates existing session based on the provided event */
  _updateSessionFromEvent(t, n) {
    var c, u;
    let r = n.level === "fatal", s = !1;
    const i = (c = n.exception) == null ? void 0 : c.values;
    if (i) {
      s = !0, r = !1;
      for (const d of i)
        if (((u = d.mechanism) == null ? void 0 : u.handled) === !1) {
          r = !0;
          break;
        }
    }
    const o = t.status === "ok";
    (o && t.errors === 0 || o && r) && (se(t, _(l({}, r && { status: "crashed" }), {
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
    return Q(this, null, function* () {
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
    return !n.integrations && (o != null && o.length) && (n.integrations = o), this.emit("preprocessEvent", t, n), t.type || s.setLastEventId(t.event_id || n.event_id), ni(i, t, n, r, this, s).then((a) => {
      if (a === null)
        return a;
      this.emit("postprocessEvent", a, n), a.contexts = l({
        trace: Pn(r)
      }, a.contexts);
      const c = Wn(this, r);
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
  _captureEvent(t, n = {}, r = O(), s = A()) {
    return g && le(t) && h.log(`Captured error event \`${sr(t)[0] || "<unknown>"}\``), this._processEvent(t, n, r, s).then(
      (i) => i.event_id,
      (i) => {
        g && (fn(i) ? h.log(i.message) : dn(i) ? h.warn(i.message) : h.warn(i));
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
    const i = this.getOptions(), { sampleRate: o } = i, a = ar(t), c = le(t), d = `before send for type \`${t.type || "error"}\``, f = typeof o == "undefined" ? void 0 : jn(o);
    if (c && typeof f == "number" && Math.random() > f)
      return this.recordDroppedEvent("sample_rate", "error"), be(
        te(
          `Discarding event because it's not included in the random sample (sampling rate = ${o})`
        )
      );
    const m = hn(t.type);
    return this._prepareEvent(t, n, r, s).then((p) => {
      if (p === null)
        throw this.recordDroppedEvent("event_processor", m), te("An event processor returned `null`, will not send event.");
      if (n.data && n.data.__sentry__ === !0)
        return p;
      const S = Ki(this, i, p, n);
      return Vi(S, d);
    }).then((p) => {
      var b;
      if (p === null) {
        if (this.recordDroppedEvent("before_send", m), a) {
          const I = 1 + (t.spans || []).length;
          this.recordDroppedEvent("before_send", "span", I);
        }
        throw te(`${d} returned \`null\`, will not send event.`);
      }
      const y = r.getSession() || s.getSession();
      if (c && y && this._updateSessionFromEvent(y, p), a) {
        const N = ((b = p.sdkProcessingMetadata) == null ? void 0 : b.spanCountBeforeProcessing) || 0, I = p.spans ? p.spans.length : 0, $ = N - I;
        $ > 0 && this.recordDroppedEvent("before_send", "span", $);
      }
      const S = p.transaction_info;
      if (a && S && p.transaction !== t.transaction) {
        const N = "custom";
        p.transaction_info = _(l({}, S), {
          source: N
        });
      }
      return this.sendEvent(p, n), p;
    }).then(null, (p) => {
      throw fn(p) || dn(p) ? p : (this.captureException(p, {
        mechanism: {
          handled: !1,
          type: "internal"
        },
        data: {
          __sentry__: !0
        },
        originalException: p
      }), It(
        `Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.
Reason: ${p}`
      ));
    });
  }
  /**
   * Occupies the client with processing and event
   */
  _process(t, n) {
    this._numProcessing++, this._promiseBuffer.add(t).then(
      (r) => (this._numProcessing--, r),
      (r) => (this._numProcessing--, r === Ie && this.recordDroppedEvent("queue_overflow", n), r)
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
    g && h.log("Flushing outcomes...");
    const t = this._clearOutcomes();
    if (t.length === 0) {
      g && h.log("No outcomes to send");
      return;
    }
    if (!this._dsn) {
      g && h.log("No dsn provided, will not send outcomes");
      return;
    }
    g && h.log("Sending outcomes:", t);
    const n = Gi(t, this._options.tunnel && pt(this._dsn));
    this.sendEnvelope(n);
  }
  /**
   * Creates an {@link Event} from all inputs to `captureException` and non-primitive inputs to `captureMessage`.
   */
}
function hn(e) {
  return e === "replay_event" ? "replay" : e || "error";
}
function Vi(e, t) {
  const n = `${t} must return \`null\` or a valid event.`;
  if (dt(e))
    return e.then(
      (r) => {
        if (!at(r) && r !== null)
          throw It(n);
        return r;
      },
      (r) => {
        throw It(`${t} rejected with ${r}`);
      }
    );
  if (!at(e) && e !== null)
    throw It(n);
  return e;
}
function Ki(e, t, n, r) {
  const { beforeSend: s, beforeSendTransaction: i, beforeSendSpan: o, ignoreSpans: a } = t;
  let c = n;
  if (le(c) && s)
    return s(c, r);
  if (ar(c)) {
    if (o || a) {
      const u = zi(c);
      if (a != null && a.length && Je(u, a))
        return null;
      if (o) {
        const d = o(u);
        d ? c = ft(n, Wi(d)) : Ve();
      }
      if (c.spans) {
        const d = [], f = c.spans;
        for (const p of f) {
          if (a != null && a.length && Je(p, a)) {
            Os(f, p);
            continue;
          }
          if (o) {
            const y = o(p);
            y ? d.push(y) : (Ve(), d.push(p));
          } else
            d.push(p);
        }
        const m = c.spans.length - d.length;
        m && e.recordDroppedEvent("before_send", "span", m), c.spans = d;
      }
    }
    if (i) {
      if (c.spans) {
        const u = c.spans.length;
        c.sdkProcessingMetadata = _(l({}, n.sdkProcessingMetadata), {
          spanCountBeforeProcessing: u
        });
      }
      return i(c, r);
    }
  }
  return c;
}
function le(e) {
  return e.type === void 0;
}
function ar(e) {
  return e.type === "transaction";
}
function Ji(e) {
  let t = 0;
  return e.name && (t += e.name.length * 2), t += 8, t + cr(e.attributes);
}
function Xi(e) {
  let t = 0;
  return e.message && (t += e.message.length * 2), t + cr(e.attributes);
}
function cr(e) {
  if (!e)
    return 0;
  let t = 0;
  return Object.values(e).forEach((n) => {
    Array.isArray(n) ? t += n.length * mn(n[0]) : Rn(n) ? t += mn(n) : t += 100;
  }), t;
}
function mn(e) {
  return typeof e == "string" ? e.length * 2 : typeof e == "number" ? 8 : typeof e == "boolean" ? 4 : 0;
}
function Zi(e, t) {
  t.debug === !0 && (g ? h.enable() : V(() => {
    console.warn("[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle.");
  })), O().update(t.initialScope);
  const r = new e(t);
  return Qi(r), r.init(), r;
}
function Qi(e) {
  O().setClient(e);
}
function to(e, ...t) {
  const n = new String(String.raw(e, ...t));
  return n.__sentry_template_string__ = e.join("\0").replace(/%/g, "%%").replace(/\0/g, "%s"), n.__sentry_template_values__ = t, n;
}
const eo = to;
function no(e, t, n = [t], r = "npm") {
  const s = e._metadata || {};
  s.sdk || (s.sdk = {
    name: `sentry.javascript.${t}`,
    packages: n.map((i) => ({
      name: `${r}:@sentry/${i}`,
      version: U
    })),
    version: U
  }), e._metadata = s;
}
const ro = 100;
function Ia(e, t) {
  const n = k(), r = A();
  if (!n) return;
  const { beforeBreadcrumb: s = null, maxBreadcrumbs: i = ro } = n.getOptions();
  if (i <= 0) return;
  const o = w(), a = l({ timestamp: o }, e), c = s ? V(() => s(a, t)) : a;
  c !== null && (n.emit && n.emit("beforeAddBreadcrumb", c, t), r.addBreadcrumb(c, i));
}
let gn;
const so = "FunctionToString", _n = /* @__PURE__ */ new WeakMap(), io = (() => ({
  name: so,
  setupOnce() {
    gn = Function.prototype.toString;
    try {
      Function.prototype.toString = function(...e) {
        const t = An(this), n = _n.has(k()) && t !== void 0 ? t : this;
        return gn.apply(n, e);
      };
    } catch (e) {
    }
  },
  setup(e) {
    _n.set(e, !0);
  }
})), oo = io, ao = [
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
], co = "EventFilters", uo = (e = {}) => {
  let t;
  return {
    name: co,
    setup(n) {
      const r = n.getOptions();
      t = yn(e, r);
    },
    processEvent(n, r, s) {
      if (!t) {
        const i = s.getOptions();
        t = yn(e, i);
      }
      return fo(n, t) ? null : n;
    }
  };
}, lo = ((e = {}) => _(l({}, uo(e)), {
  name: "InboundFilters"
}));
function yn(e = {}, t = {}) {
  return {
    allowUrls: [...e.allowUrls || [], ...t.allowUrls || []],
    denyUrls: [...e.denyUrls || [], ...t.denyUrls || []],
    ignoreErrors: [
      ...e.ignoreErrors || [],
      ...t.ignoreErrors || [],
      ...e.disableErrorDefaults ? [] : ao
    ],
    ignoreTransactions: [...e.ignoreTransactions || [], ...t.ignoreTransactions || []]
  };
}
function fo(e, t) {
  if (e.type) {
    if (e.type === "transaction" && ho(e, t.ignoreTransactions))
      return g && h.warn(
        `Event dropped due to being matched by \`ignoreTransactions\` option.
Event: ${B(e)}`
      ), !0;
  } else {
    if (po(e, t.ignoreErrors))
      return g && h.warn(
        `Event dropped due to being matched by \`ignoreErrors\` option.
Event: ${B(e)}`
      ), !0;
    if (yo(e))
      return g && h.warn(
        `Event dropped due to not having an error message, error type or stacktrace.
Event: ${B(
          e
        )}`
      ), !0;
    if (mo(e, t.denyUrls))
      return g && h.warn(
        `Event dropped due to being matched by \`denyUrls\` option.
Event: ${B(
          e
        )}.
Url: ${Rt(e)}`
      ), !0;
    if (!go(e, t.allowUrls))
      return g && h.warn(
        `Event dropped due to not being matched by \`allowUrls\` option.
Event: ${B(
          e
        )}.
Url: ${Rt(e)}`
      ), !0;
  }
  return !1;
}
function po(e, t) {
  return t != null && t.length ? sr(e).some((n) => Ht(n, t)) : !1;
}
function ho(e, t) {
  if (!(t != null && t.length))
    return !1;
  const n = e.transaction;
  return n ? Ht(n, t) : !1;
}
function mo(e, t) {
  if (!(t != null && t.length))
    return !1;
  const n = Rt(e);
  return n ? Ht(n, t) : !1;
}
function go(e, t) {
  if (!(t != null && t.length))
    return !0;
  const n = Rt(e);
  return n ? Ht(n, t) : !0;
}
function _o(e = []) {
  for (let t = e.length - 1; t >= 0; t--) {
    const n = e[t];
    if (n && n.filename !== "<anonymous>" && n.filename !== "[native code]")
      return n.filename || null;
  }
  return null;
}
function Rt(e) {
  var t, n, r;
  try {
    const s = [...(n = (t = e.exception) == null ? void 0 : t.values) != null ? n : []].reverse().find((o) => {
      var a, c, u;
      return ((a = o.mechanism) == null ? void 0 : a.parent_id) === void 0 && ((u = (c = o.stacktrace) == null ? void 0 : c.frames) == null ? void 0 : u.length);
    }), i = (r = s == null ? void 0 : s.stacktrace) == null ? void 0 : r.frames;
    return i ? _o(i) : null;
  } catch (s) {
    return g && h.error(`Cannot extract url for event ${B(e)}`), null;
  }
}
function yo(e) {
  var t, n;
  return (n = (t = e.exception) == null ? void 0 : t.values) != null && n.length ? (
    // No top-level message
    !e.message && // There are no exception values that have a stacktrace, a non-generic-Error type or value
    !e.exception.values.some((r) => r.stacktrace || r.type && r.type !== "Error" || r.value)
  ) : !1;
}
function X(e, t, n, r, s) {
  Ni({ level: e, message: t, attributes: n, severityNumber: s }, r);
}
function So(e, t, { scope: n } = {}) {
  X("trace", e, t, n);
}
function bo(e, t, { scope: n } = {}) {
  X("debug", e, t, n);
}
function Eo(e, t, { scope: n } = {}) {
  X("info", e, t, n);
}
function To(e, t, { scope: n } = {}) {
  X("warn", e, t, n);
}
function Io(e, t, { scope: n } = {}) {
  X("error", e, t, n);
}
function vo(e, t, { scope: n } = {}) {
  X("fatal", e, t, n);
}
const va = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  debug: bo,
  error: Io,
  fatal: vo,
  fmt: eo,
  info: Eo,
  trace: So,
  warn: To
}, Symbol.toStringTag, { value: "Module" }));
function ve(e, t, n, r) {
  xi(
    { type: e, name: t, value: n, unit: r == null ? void 0 : r.unit, attributes: r == null ? void 0 : r.attributes },
    { scope: r == null ? void 0 : r.scope }
  );
}
function ko(e, t = 1, n) {
  ve("counter", e, t, n);
}
function No(e, t, n) {
  ve("gauge", e, t, n);
}
function Ro(e, t, n) {
  ve("distribution", e, t, n);
}
const ka = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  count: ko,
  distribution: Ro,
  gauge: No
}, Symbol.toStringTag, { value: "Module" }));
function Na(e) {
  const t = O();
  e(t);
}
const E = typeof __SENTRY_DEBUG__ == "undefined" ? !0 : __SENTRY_DEBUG__, Sn = "finishReason", bn = ["heartbeatFailed", "idleTimeout", "documentHidden"];
let ur;
function wo() {
  return ur;
}
function wt(e) {
  ur = e;
}
function nt(e) {
  return e / 1e3;
}
function Ao(e) {
  return e * 1e3;
}
class lr {
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
class ke {
  /**
   * You should never call the constructor manually, always use `Sentry.startTransaction()`
   * or call `startChild()` on an existing span.
   * @internal
   * @hideconstructor
   * @hidden
   */
  constructor(t) {
    var n, r, s, i, o, a, c, u, d, f, m, p, y;
    if (this.name = "", this.traceId = R(), this.spanId = R().substring(16), this.startTimestamp = w(), this.tags = {}, this.data = {}, this.attributes = {}, this.instrumenter = "sentry", !t)
      return this;
    this.traceId = (n = t.traceId) != null ? n : this.traceId, this.spanId = (r = t.spanId) != null ? r : this.spanId, this.parentSpanId = (s = t.parentSpanId) != null ? s : this.parentSpanId, "sampled" in t && (this.sampled = t.sampled), this.op = (i = t.op) != null ? i : this.op, this.description = (a = (o = t.description) != null ? o : t.name) != null ? a : this.description, this.name = (u = (c = t.name) != null ? c : t.description) != null ? u : this.name, this.data = t.data ? l({}, t.data) : this.data, this.tags = t.tags ? l({}, t.tags) : this.tags, this.attributes = t.attributes ? l({}, t.attributes) : this.attributes, this.status = (d = t.status) != null ? d : this.status, this.startTimestamp = (f = t.startTimestamp) != null ? f : this.startTimestamp, this.endTimestamp = (m = t.endTimestamp) != null ? m : this.endTimestamp, this.instrumenter = (p = t.instrumenter) != null ? p : this.instrumenter, this.origin = (y = t.origin) != null ? y : this.origin;
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
    const n = new ke(_(l({}, t), {
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
    return this.tags = _(l({}, this.tags), { [t]: n }), this;
  }
  /**
   * @inheritDoc
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  setData(t, n) {
    return this.data = _(l({}, this.data), { [t]: n }), this;
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
    const n = Mo(t);
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
    this.finish(Oo(t));
  }
  /**
   * @inheritDoc
   */
  finish(t) {
    this.endTimestamp = typeof t == "number" ? t : w();
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
    return Et({
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
    var n, r, s, i, o, a, c, u, d;
    return this.data = (n = t.data) != null ? n : {}, this.description = (r = t.description) != null ? r : t.name, this.name = (i = (s = t.name) != null ? s : t.description) != null ? i : this.name, this.endTimestamp = t.endTimestamp, this.op = t.op, this.parentSpanId = t.parentSpanId, this.sampled = t.sampled, this.spanId = (o = t.spanId) != null ? o : this.spanId, this.startTimestamp = (a = t.startTimestamp) != null ? a : this.startTimestamp, this.status = t.status, this.tags = (c = t.tags) != null ? c : {}, this.attributes = (u = t.attributes) != null ? u : this.attributes, this.traceId = (d = t.traceId) != null ? d : this.traceId, this;
  }
  /**
   * @inheritDoc
   */
  getTraceContext() {
    return Et({
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
    return Et({
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
function Oo(e) {
  if (e === void 0)
    return w();
  if (Array.isArray(e) && e.length === 2) {
    const [t, n] = e;
    return t + n / 1e9;
  }
  return e instanceof Date ? e.getTime() / 1e3 : typeof e == "number" ? e > 1e12 ? nt(e) : e : w();
}
function Mo(e) {
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
class dr extends ke {
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
    this.spanRecorder || (this.spanRecorder = new lr(t)), this.spanRecorder.add(this);
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
    if (this.name || (E && h.warn("Transaction has no name, falling back to `<unlabeled transaction>`."), this.name = "<unlabeled transaction>"), super.finish(t), this.sampled !== !0) {
      E && h.log("[Tracing] Discarding transaction because its trace was not chosen to be sampled.");
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
    return Object.keys(this._measurements).length > 0 && (E && h.log(
      "[Measurements] Adding measurements to transaction",
      JSON.stringify(this._measurements, void 0, 2)
    ), s.measurements = this._measurements), E && h.log(`[Tracing] Finishing ${this.op} transaction: ${this.name}.`), pi(s);
  }
  /**
   * @inheritDoc
   */
  toContext() {
    const t = super.toContext();
    return Et(_(l({}, t), {
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
const Do = 1e3, Co = 5e3;
class Po extends lr {
  constructor(t, n, r = "", s) {
    super(s), this._pushActivity = t, this._popActivity = n, this.transactionSpanId = r;
  }
  /**
   * @inheritDoc
   */
  add(t) {
    t.spanId !== this.transactionSpanId && (t.finish = (n) => {
      t.endTimestamp = typeof n == "number" ? n : w(), this._popActivity(t.spanId);
    }, t.endTimestamp === void 0 && this._pushActivity(t.spanId)), super.add(t);
  }
}
class xo extends dr {
  constructor(t, n = Do, r = !1) {
    super(t), this._idleTimeout = n, this._onScope = r, this.activities = {}, this._heartbeatCounter = 0, this._finished = !1, this._beforeFinishCallbacks = [], r && (E && h.log(`Setting idle transaction as active. Span ID: ${this.spanId}`), wt(this)), this._initTimeout = setTimeout(() => {
      this._finished || this.finish();
    }, this._idleTimeout);
  }
  /** {@inheritDoc} */
  finish(t = w()) {
    if (this._finished = !0, this.activities = {}, this.spanRecorder) {
      E && h.log("[Tracing] finishing IdleTransaction", new Date(t * 1e3).toISOString(), this.op);
      for (const n of this._beforeFinishCallbacks)
        n(this, t);
      this.spanRecorder.spans = this.spanRecorder.spans.filter((n) => {
        if (n.spanId === this.spanId)
          return !0;
        n.endTimestamp || (n.endTimestamp = t, n.setStatus("cancelled"), E && h.log("[Tracing] cancelling span since transaction ended early", JSON.stringify(n, void 0, 2)));
        const r = n.startTimestamp < t;
        return r || E && h.log(
          "[Tracing] discarding Span since it happened after Transaction was finished",
          JSON.stringify(n, void 0, 2)
        ), r;
      }), E && h.log("[Tracing] flushing IdleTransaction");
    } else
      E && h.log("[Tracing] No active IdleTransaction");
    return this._onScope && wt(void 0), super.finish(t);
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
      this.spanRecorder = new Po(n, r, this.spanId, t), E && h.log("Starting heartbeat"), this._pingHeartbeat();
    }
    this.spanRecorder.add(this);
  }
  /**
   * Start tracking a specific activity.
   * @param spanId The span id that represents the activity
   */
  _pushActivity(t) {
    this._initTimeout && (clearTimeout(this._initTimeout), this._initTimeout = void 0), E && h.log(`[Tracing] pushActivity: ${t}`), this.activities[t] = !0, E && h.log("[Tracing] new activities count", Object.keys(this.activities).length);
  }
  /**
   * Remove an activity from usage
   * @param spanId The span id that represents the activity
   */
  _popActivity(t) {
    if (this.activities[t] && (E && h.log(`[Tracing] popActivity ${t}`), delete this.activities[t], E && h.log("[Tracing] new activities count", Object.keys(this.activities).length)), Object.keys(this.activities).length === 0) {
      const n = this._idleTimeout, r = w() + n / 1e3;
      setTimeout(() => {
        this._finished || (this.setTag(Sn, bn[1]), this.finish(r));
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
    t === this._prevHeartbeatString ? this._heartbeatCounter += 1 : this._heartbeatCounter = 1, this._prevHeartbeatString = t, this._heartbeatCounter >= 3 ? (E && h.log("[Tracing] Transaction finished because of no change for 3 heart beats"), this.setStatus("deadline_exceeded"), this.setTag(Sn, bn[0]), this.finish()) : this._pingHeartbeat();
  }
  /**
   * Pings the heartbeat
   */
  _pingHeartbeat() {
    E && h.log(`pinging Heartbeat -> current counter: ${this._heartbeatCounter}`), setTimeout(() => {
      this._beat();
    }, Co);
  }
}
const $o = 3600;
let F, At;
function Lo() {
  return {
    traceId: Nt(),
    spanId: zt(),
    sampleRand: Math.random()
  };
}
function Ne() {
  return F || (F = Lo()), F;
}
function fr(e) {
  const t = Ne();
  return F = l(l({}, t), e), F;
}
function Fo(e = !1) {
  const t = F;
  return F = {
    traceId: e && t ? t.traceId : Nt(),
    spanId: zt(),
    sampleRand: Math.random()
  }, F;
}
function jo() {
  return At;
}
function Uo(e, t, n, r, s, i) {
  At = {
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
function Bo() {
  return At ? Date.now() / 1e3 - At.startTimestamp <= $o : !1;
}
function pr(e, t, n) {
  const [r, s] = qs(
    { tracesSampleRate: t.tracesSampleRate, tracesSampler: t.tracesSampler },
    n,
    Math.random()
  );
  return e.sampled = r, e.sampled ? (E && h.log(`[Tracing] starting ${e.op} transaction - ${e.name}`), e) : (E && h.log(
    `[Tracing] Discarding transaction because it's not included in the random sample (sampling rate = ${Number(
      s != null ? s : 0
    )})`
  ), e);
}
function Ra(e, t, n) {
  var f, m;
  const r = k(), s = r && r.getOptions && r.getOptions() || {}, i = (f = n == null ? void 0 : n.traceContinuityMode) != null ? f : "off", o = (m = n == null ? void 0 : n.consistentTraceSampling) != null ? m : !1, a = hr(
    e,
    i,
    o
  ), c = a.name || a.op || "unknown-transaction", u = l({
    parentSampled: a.parentSampled,
    transactionContext: _(l({}, a), { name: c }),
    name: c
  }, t);
  let d = new dr(_(l({}, a), { name: c }));
  if (d = pr(d, s, u), d.sampled) {
    const p = s._experiments && s._experiments.maxSpans;
    d.initSpanRecorder(p), wt(d);
  }
  return fr({
    traceId: d.traceId,
    spanId: d.spanId,
    sampled: d.sampled
  }), d;
}
function Ho(e, t, n, r, s) {
  var p, y;
  const i = k(), o = i && i.getOptions && i.getOptions() || {}, a = (p = s == null ? void 0 : s.traceContinuityMode) != null ? p : "off", c = (y = s == null ? void 0 : s.consistentTraceSampling) != null ? y : !1, u = hr(
    e,
    a,
    c
  ), d = u.name || u.op || "unknown-transaction", f = l({
    parentSampled: u.parentSampled,
    transactionContext: _(l({}, u), { name: d }),
    name: d
  }, r);
  let m = new xo(_(l({}, u), { name: d }), t, n);
  if (m = pr(m, o, f), m.sampled) {
    const S = o._experiments && o._experiments.maxSpans;
    m.initSpanRecorder(S), wt(m);
  }
  return fr({
    traceId: m.traceId,
    spanId: m.spanId,
    sampled: m.sampled
  }), m.registerBeforeFinishCallback((S) => {
    var I;
    const b = (I = o.tracesSampleRate) != null ? I : 1, N = Ne();
    Uo(
      S.traceId,
      S.spanId,
      S.sampled,
      S.startTimestamp,
      b,
      N.sampleRand
    ), E && h.log(`[Tracing] Updated previous trace info: traceId=${S.traceId}, spanId=${S.spanId}`);
  }), m;
}
function hr(e, t, n) {
  if (t === "off")
    return e;
  const r = Ne(), s = jo(), i = Bo();
  if (t === "session") {
    const o = _(l({}, e), {
      traceId: r.traceId
      // Each transaction is a root span in session mode, no parent
    });
    return n && i && s && (o.parentSampled = s.spanContext.traceFlags === 1), E && h.log(`[Tracing] Session mode: reusing traceId=${r.traceId}`), o;
  }
  if (t === "link") {
    const o = Fo(!1), a = _(l({}, e), {
      traceId: o.traceId
    });
    return n && i && s && (a.parentSampled = s.spanContext.traceFlags === 1), i && s ? (a.metadata = _(l({}, a.metadata), {
      previousTrace: {
        traceId: s.spanContext.traceId,
        spanId: s.spanContext.spanId,
        sampled: s.spanContext.traceFlags === 1
      }
    }), E && h.log(
      `[Tracing] Link mode: new traceId=${o.traceId}, linked from previous traceId=${s.spanContext.traceId}`
    )) : E && h.log(`[Tracing] Link mode: new traceId=${o.traceId} (first trace)`), a;
  }
  return e;
}
const Go = "sentry.javascript.miniapp", En = "10.27.0-rc.1", H = "?", zo = /^\s*at (?:(.*?) ?\()?((?:file|https?|blob|chrome-extension|address|native|eval|webpack|<anonymous>|[-a-z]+:|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i, Wo = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:file|https?|blob|chrome|webpack|resource|moz-extension).*?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js))(?::(\d+))?(?::(\d+))?\s*$/i, Yo = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i, qo = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i, Vo = /\((\S*)(?::(\d+))(?::(\d+))\)/, Ko = /^\s*at (.*?) ?\((\S*):(\d+):(\d+)\)/i;
function ut(e) {
  let t = null;
  const n = e && e.framesToPop;
  try {
    if (t = Xo(e), t)
      return Tn(t, n);
  } catch (r) {
  }
  try {
    if (t = Jo(e), t)
      return Tn(t, n);
  } catch (r) {
  }
  return {
    message: Re(e),
    name: e && e.name,
    stack: [],
    failed: !0
  };
}
function Jo(e) {
  if (!e || !e.stack)
    return null;
  const t = [], n = e.stack.split(`
`);
  let r, s, i, o;
  for (let a = 0; a < n.length; ++a) {
    if (i = zo.exec(n[a])) {
      const c = i[2] && i[2].indexOf("native") === 0;
      r = i[2] && i[2].indexOf("eval") === 0, r && (s = Vo.exec(i[2])) && (i[2] = s[1], i[3] = s[2], i[4] = s[3]), o = {
        url: i[2],
        func: i[1] || H,
        args: c ? [i[2]] : [],
        line: i[3] ? +i[3] : null,
        column: i[4] ? +i[4] : null
      };
    } else if (i = Yo.exec(n[a]))
      o = {
        url: i[2],
        func: i[1] || H,
        args: [],
        line: +i[3],
        column: i[4] ? +i[4] : null
      };
    else if (i = Wo.exec(n[a]))
      r = i[3] && i[3].indexOf(" > eval") > -1, r && (s = qo.exec(i[3])) ? (i[1] = i[1] || "eval", i[3] = s[1], i[4] = s[2], i[5] = "") : a === 0 && !i[5] && e.columnNumber !== void 0 && (t[0].column = e.columnNumber + 1), o = {
        url: i[3],
        func: i[1] || H,
        args: i[2] ? i[2].split(",") : [],
        line: i[4] ? +i[4] : null,
        column: i[5] ? +i[5] : null
      };
    else if (i = Ko.exec(n[a]))
      o = {
        url: i[2],
        func: i[1] || H,
        args: [],
        line: i[3] ? +i[3] : null,
        column: i[4] ? +i[4] : null
      };
    else
      continue;
    !o.func && o.line && (o.func = H), t.push(o);
  }
  return t.length ? {
    message: Re(e),
    name: e.name,
    stack: t
  } : null;
}
function Xo(e) {
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
    }), c && (!c.func && c.line && (c.func = H), i.push(c));
  }
  return i.length ? {
    message: Re(e),
    name: e.name,
    stack: i
  } : null;
}
function Tn(e, t) {
  try {
    return _(l({}, e), {
      stack: e.stack.slice(t)
    });
  } catch (n) {
    return e;
  }
}
function Re(e) {
  const t = e && e.message;
  return t ? t.error && typeof t.error.message == "string" ? t.error.message : t : "No error message";
}
const Zo = 100;
function mr(e) {
  const t = we(e.stack), n = {
    type: e.name,
    value: e.message
  };
  return t && t.length && (n.stacktrace = { frames: t }), n.type === void 0 && n.value === "" && (n.value = "Unrecoverable error caught"), n;
}
function Qo(e, t, n) {
  const r = {
    exception: {
      values: [
        {
          type: ge(e) ? e.constructor.name : n ? "UnhandledRejection" : "Error",
          value: `Non-Error ${n ? "promise rejection" : "exception"} captured with keys: ${Hr(e)}`
        }
      ]
    },
    extra: {
      __serialized__: qn(e)
    }
  };
  if (t) {
    const s = ut(t), i = we(s.stack);
    r.stacktrace = {
      frames: i
    };
  }
  return r;
}
function In(e) {
  return {
    exception: {
      values: [mr(e)]
    }
  };
}
function we(e) {
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
  ).slice(0, Zo).reverse();
}
function ta(e, t, n = {}) {
  let r;
  if (Dr(e) && e.error)
    return e = e.error, r = In(ut(e)), r;
  if (Fe(e) || Cr(e)) {
    const s = e, i = s.name || (Fe(s) ? "DOMError" : "DOMException"), o = s.message ? `${i}: ${s.message}` : i;
    return r = de(o, t, n), re(r, o), r;
  }
  return Nn(e) ? (r = In(ut(e)), r) : at(e) || ge(e) ? (r = Qo(e, t, n.rejection), kt(r, {
    synthetic: !0
  }), r) : (r = de(e, t, n), re(r, `${e}`), kt(r, {
    synthetic: !0
  }), r);
}
function de(e, t, n = {}) {
  const r = {
    message: e
  };
  if (n.attachStacktrace && t) {
    const s = ut(t), i = we(s.stack);
    r.stacktrace = {
      frames: i
    };
  }
  return r;
}
const ea = () => {
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
}, na = () => {
  let e = "unknown";
  return typeof wx == "object" ? e = "wechat" : typeof my == "object" ? e = "alipay" : typeof tt == "object" ? e = "bytedance" : typeof dd == "object" ? e = "dingtalk" : typeof qq == "object" ? e = "qq" : typeof swan == "object" && (e = "swan"), e;
}, T = ea(), gr = na(), ra = "application/json";
function Ae(e) {
  function t(n) {
    return new W((r, s) => {
      const i = T.request || T.httpRequest;
      if (typeof i != "function") {
        s(new Error("Miniapp request function is not available"));
        return;
      }
      i({
        url: e.url,
        method: "POST",
        data: n.body,
        header: { "content-type": ra },
        success(o) {
          var a, c, u, d;
          r({
            statusCode: o == null ? void 0 : o.statusCode,
            headers: {
              "x-sentry-rate-limits": (c = (a = o == null ? void 0 : o.headers) == null ? void 0 : a["X-Sentry-Rate-Limits"]) != null ? c : null,
              "retry-after": (d = (u = o == null ? void 0 : o.headers) == null ? void 0 : u["Retry-After"]) != null ? d : null
            }
          });
        },
        fail(o) {
          s(o);
        }
      });
    });
  }
  return Hi(e, t);
}
const wa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  makeMiniappTransport: Ae
}, Symbol.toStringTag, { value: "Module" })), sa = () => [];
class ia extends qi {
  /**
   * Creates a new Miniapp SDK instance.
   *
   * @param options Configuration options for this SDK.
   */
  constructor(t = {}) {
    const n = t.transport || Ae, r = t.stackParser || sa, s = t.integrations || t.defaultIntegrations || [], i = _(l({}, t), {
      transport: n,
      stackParser: r,
      integrations: s,
      dsn: t.dsn,
      // ensure defaults for required fields
      tracesSampleRate: t.tracesSampleRate
    });
    no(i, "miniapp", ["miniapp"]), super(i);
  }
  /**
   * @inheritDoc
   */
  _prepareEvent(t, n, r, s) {
    return t.platform = t.platform || "javascript", t.sdk = _(l({}, t.sdk), {
      name: Go,
      packages: [
        ...t.sdk && t.sdk.packages || [],
        {
          name: "npm:@sentry/miniapp",
          version: En
        }
      ],
      version: En
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
    const r = n && n.syntheticException ? n.syntheticException : void 0, s = ta(t, r, {
      attachStacktrace: this._options.attachStacktrace
    });
    return n && n.event_id && (s.event_id = n.event_id), Promise.resolve(s);
  }
  /**
   * @inheritDoc
   */
  // eslint-disable-next-line deprecation/deprecation
  eventFromMessage(t, n = "info", r) {
    const s = r && r.syntheticException ? r.syntheticException : void 0, i = de(String(t), s, {
      attachStacktrace: this._options.attachStacktrace
    });
    return i.level = n, r && r.event_id && (i.event_id = r.event_id), Promise.resolve(i);
  }
}
function oa() {
  setTimeout(() => {
  });
}
function G(e, t = {}, n) {
  if (typeof e != "function")
    return e;
  try {
    const s = e.__sentry_wrapped__;
    if (s)
      return s;
    if (An(e))
      return e;
  } catch (s) {
    return e;
  }
  const r = function(...s) {
    try {
      const i = s.map((o) => G(o, t));
      return e.handleEvent ? e.handleEvent.apply(this, i) : e.apply(this, i);
    } catch (i) {
      throw oa(), Cn((o) => {
        o.addEventProcessor((a) => {
          const c = l({}, a);
          return t.mechanism && (re(c, void 0), kt(c, t.mechanism)), c.extra = _(l({}, c.extra), {
            arguments: D(s, 3)
          }), c;
        }), ue(i);
      }), i;
    }
  };
  try {
    for (const s in e)
      Object.prototype.hasOwnProperty.call(e, s) && (r[s] = e[s]);
  } catch (s) {
  }
  wn(r, e), Bt(e, "__sentry_wrapped__", r);
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
const $t = class $t {
  /** JSDoc */
  constructor(t) {
    this.name = $t.id, this._onErrorHandlerInstalled = !1, this._onUnhandledRejectionHandlerInstalled = !1, this._onPageNotFoundHandlerInstalled = !1, this._onMemoryWarningHandlerInstalled = !1, this._options = l({
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
    this._onErrorHandlerInstalled || (T.onError && T.onError((t) => {
      const n = typeof t == "string" ? new Error(t) : t;
      ue(n);
    }), this._onErrorHandlerInstalled = !0);
  }
  /** JSDoc */
  _installGlobalOnUnhandledRejectionHandler() {
    this._onUnhandledRejectionHandlerInstalled || (T.onUnhandledRejection && T.onUnhandledRejection(
      ({ reason: t, promise: n }) => {
        const r = typeof t == "string" ? new Error(t) : t;
        ue(r, {
          data: n
        });
      }
    ), this._onUnhandledRejectionHandlerInstalled = !0);
  }
  /** JSDoc */
  _installGlobalOnPageNotFoundHandler() {
    this._onPageNotFoundHandlerInstalled || (T.onPageNotFound && T.onPageNotFound((t) => {
      const n = t.path.split("?")[0];
      on("pagenotfound", n), sn("message", JSON.stringify(t)), rn(`页面无法找到: ${n}`);
    }), this._onPageNotFoundHandlerInstalled = !0);
  }
  /** JSDoc */
  _installGlobalOnMemoryWarningHandler() {
    this._onMemoryWarningHandlerInstalled || (T.onMemoryWarning && T.onMemoryWarning(({ level: t = -1 }) => {
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
      on("memory-warning", String(t)), sn("message", n), rn("内存不足告警");
    }), this._onMemoryWarningHandlerInstalled = !0);
  }
};
$t.id = "GlobalHandlers";
let Ot = $t;
const Lt = class Lt {
  constructor() {
    this._ignoreOnError = 0, this.name = Lt.id;
  }
  /** JSDoc */
  _wrapTimeFunction(t) {
    return function(...n) {
      const r = n[0];
      return n[0] = G(r, {
        mechanism: {
          data: { function: bt(t) },
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
        G(n, {
          mechanism: {
            data: {
              function: "requestAnimationFrame",
              handler: bt(t)
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
    const n = v, r = n[t] && n[t].prototype;
    !r || !r.hasOwnProperty || !r.hasOwnProperty("addEventListener") || (et(r, "addEventListener", function(s) {
      return function(i, o, a) {
        try {
          typeof o.handleEvent == "function" && (o.handleEvent = G(o.handleEvent.bind(o), {
            mechanism: {
              data: {
                function: "handleEvent",
                handler: bt(o),
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
          G(o, {
            mechanism: {
              data: {
                function: "addEventListener",
                handler: bt(o),
                target: t
              },
              handled: !0,
              type: "instrument"
            }
          }),
          a
        );
      };
    }), et(r, "removeEventListener", function(s) {
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
    const t = v;
    et(t, "setTimeout", this._wrapTimeFunction.bind(this)), et(t, "setInterval", this._wrapTimeFunction.bind(this)), et(t, "requestAnimationFrame", this._wrapRAF.bind(this)), [
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
Lt.id = "TryCatch";
let Mt = Lt;
function bt(e) {
  try {
    return e && e.name || "<anonymous>";
  } catch (t) {
    return "<anonymous>";
  }
}
const aa = "cause", ca = 5, rt = class rt {
  /**
   * @inheritDoc
   */
  constructor(t = {}) {
    this.name = rt.id, this._key = t.key || aa, this._limit = t.limit || ca;
  }
  /**
   * @inheritDoc
   */
  setupOnce() {
    qt((t, n) => {
      const r = k(), s = r && r.getIntegrationByName(rt.id);
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
    const s = ut(t[n]), i = mr(s);
    return this._walkErrorTree(t[n], n, [i, ...r]);
  }
};
rt.id = "LinkedErrors";
let Dt = rt;
const st = class st {
  constructor() {
    this.name = st.id;
  }
  /**
   * @inheritDoc
   */
  setupOnce() {
    qt((t) => {
      const n = k();
      if (n && n.getIntegrationByName(st.id))
        try {
          const s = T.getSystemInfoSync(), {
            SDKVersion: i = "0.0.0",
            batteryLevel: o,
            // 微信小程序
            currentBattery: a,
            // 支付宝小程序、 钉钉小程序
            battery: c,
            // 字节跳动小程序
            brand: u,
            language: d,
            model: f,
            pixelRatio: m,
            platform: p,
            screenHeight: y,
            screenWidth: S,
            // statusBarHeight,
            system: b,
            version: N,
            // windowHeight,
            // windowWidth,
            app: I,
            // 支付宝小程序
            appName: $
            // 字节跳动小程序
            // fontSizeSetting, // 支付宝小程序、 钉钉小程序、微信小程序
          } = s, [Z, ht] = b.split(" "), Vt = _(l({}, t.tags), {
            SDKVersion: i
          }), mt = I || $ || gr || "app";
          return _(l({}, t), {
            tags: Vt,
            contexts: _(l({}, t.contexts), {
              device: {
                brand: u,
                battery_level: o || a || c,
                model: f,
                language: d,
                platform: p,
                screen_dpi: m,
                screen_height: y,
                screen_width: S
              },
              os: {
                name: Z || b,
                version: ht || b
              },
              browser: {
                name: mt,
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
st.id = "System";
let Ct = st;
const it = class it {
  /**
   * @inheritDoc
   */
  constructor(t) {
    this.name = it.id, this._options = l({
      enable: !0
    }, t);
  }
  /**
   * @inheritDoc
   */
  setupOnce() {
    qt((t) => {
      const n = k();
      if (n && n.getIntegrationByName(it.id) && this._options.enable)
        try {
          const s = getCurrentPages().map(
            (i) => ({
              route: i.route,
              options: i.options
            })
          );
          return _(l({}, t), {
            extra: _(l({}, t.extra), {
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
it.id = "Router";
let Pt = it;
const ot = class ot {
  constructor() {
    this.name = ot.id;
  }
  /**
   * @inheritDoc
   */
  setupOnce() {
    qt((t) => {
      const n = k();
      return n && n.getIntegrationByName(ot.id) && gr === "wechat" && T.getLaunchOptionsSync && T.getLaunchOptionsSync().scene === 1129 ? null : t;
    });
  }
};
ot.id = "IgnoreMpcrawlerErrors";
let xt = ot;
const Aa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GlobalHandlers: Ot,
  IgnoreMpcrawlerErrors: xt,
  LinkedErrors: Dt,
  Router: Pt,
  System: Ct,
  TryCatch: Mt
}, Symbol.toStringTag, { value: "Module" })), ua = 1e12;
class la {
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
    if (!T.getPerformance)
      return;
    const t = T.getPerformance();
    if (!(!t || typeof t.createObserver != "function"))
      return t;
  }
  _getTimeOrigin(t, n) {
    if (typeof t.timeOrigin == "number")
      return nt(t.timeOrigin);
    const r = typeof t.now == "function" ? t.now() : void 0;
    return typeof r == "number" ? nt(Date.now() - r) : n.startTimestamp;
  }
  _handleEntry(t, n) {
    if (t.endTimestamp !== void 0) {
      this._stopObserver();
      return;
    }
    const r = this._toTimestamp(n.startTime, t.startTimestamp), s = this._toTimestamp(n.startTime + n.duration, t.startTimestamp);
    da(t, {
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
    return t > ua ? nt(t) : ((s = this._timeOrigin) != null ? s : n) + nt(t);
  }
  _stopObserver(t) {
    var n;
    (n = this._observer) == null || n.disconnect(), this._observer = void 0, t && !t.endTimestamp && t.finish();
  }
}
function da(e, r) {
  var s = r, { startTimestamp: t } = s, n = Jt(s, ["startTimestamp"]);
  return t && e.startTimestamp > t && (e.startTimestamp = t), e.startChild(l({
    startTimestamp: t
  }, n));
}
function fa(e, t = !0, n = !0) {
  const r = v, s = T.onAppRoute || r.wx && r.wx.onAppRoute;
  if (typeof s != "function")
    return;
  let i = !1, o;
  const a = (u, d) => {
    (d && t || !d && n) && (o && typeof o.finish == "function" && o.finish(), o = e(u));
  }, c = (u, d = !1) => {
    const f = (u == null ? void 0 : u.path) || (u == null ? void 0 : u.route) || (u == null ? void 0 : u.url) || "", m = typeof f == "string" && f.length > 0 ? f : "unknown-route";
    a(
      {
        name: m,
        op: "navigation",
        description: (u == null ? void 0 : u.openType) || (u == null ? void 0 : u.event) || void 0,
        metadata: { requestPath: m }
      },
      d
    );
  };
  if (t && typeof r.getCurrentPages == "function") {
    const u = r.getCurrentPages() || [], d = u[u.length - 1];
    d && d.route && (i = !0, c({ path: d.route }, !0));
  }
  s((u) => {
    const d = !i;
    i = !0, c(u, d);
  });
}
const pa = {
  traceRequest: !0
}, ha = 600, ma = l({
  idleTimeout: 5e3,
  startTransactionOnLocationChange: !0,
  startTransactionOnPageLoad: !0,
  maxTransactionDuration: ha,
  routingInstrumentation: fa,
  // Default to 'link' mode for better trace continuity while maintaining separate traces
  traceContinuityMode: "link",
  consistentTraceSampling: !1
}, pa), Ft = class Ft {
  constructor(t) {
    this.name = Ft.id, this._configuredIdleTimeout = t == null ? void 0 : t.idleTimeout, this.options = l(l({}, ma), t);
    const { _metricOptions: n } = this.options;
    this._metrics = new la(n && n._reportAllChanges);
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
    ), (s = T.onAppHide) == null || s.call(T, () => {
      const i = wo();
      i == null || i.finish();
    });
  }
  /** Create routing idle transaction. */
  _createRouteTransaction(t) {
    var f;
    const {
      beforeNavigate: n,
      idleTimeout: r,
      maxTransactionDuration: s,
      traceContinuityMode: i,
      consistentTraceSampling: o
    } = this.options, a = _(l({}, t), {
      trimEnd: !0
    }), c = typeof n == "function" ? n(a) : a;
    if (c === void 0)
      return;
    const u = {
      traceContinuityMode: i != null ? i : "link",
      consistentTraceSampling: o != null ? o : !1
    };
    E && h.log(
      `[MiniAppTracing] Creating route transaction with traceContinuityMode=${u.traceContinuityMode}`
    );
    const d = Ho(
      c,
      r,
      !0,
      {},
      u
    );
    return d.registerBeforeFinishCallback((m, p) => {
      ga(Ao(s), m, p);
    }), d.setTag("idleTimeout", (f = this._configuredIdleTimeout) != null ? f : r), d.setTag("traceContinuityMode", i != null ? i : "link"), this._metrics.addPerformanceEntries(d), d;
  }
};
Ft.id = "MiniAppTracing";
let fe = Ft;
function ga(e, t, n) {
  const r = n - t.startTimestamp;
  n && (r > e || r < 0) && (t.setStatus("deadline_exceeded"), t.setTag("maxTransactionDurationExceeded", "true"));
}
const _a = [
  lo(),
  oo(),
  new Mt(),
  new Ot(),
  new Dt(),
  new Ct(),
  new Pt(),
  new xt(),
  new fe()
];
function Oa(e = {}) {
  e.defaultIntegrations === void 0 && (e.defaultIntegrations = _a), e.normalizeDepth = e.normalizeDepth || 5;
  const t = l({
    integrations: e.integrations || e.defaultIntegrations || [],
    stackParser: e.stackParser || (() => []),
    transport: e.transport || Ae
  }, e);
  Zi(ia, t);
}
function Ma(e = {}) {
  e.eventId || (e.eventId = Kn());
  const t = k();
  t && t.showReportDialog(e);
}
function Da() {
  return Kn();
}
function Ca(e) {
  const t = k();
  return t ? t.flush(e) : Yt(!1);
}
function Pa(e) {
  const t = k();
  return t ? t.close(e) : Yt(!1);
}
function xa(e) {
  return G(e)();
}
export {
  Aa as Integrations,
  fe as MiniAppTracing,
  ia as MiniappClient,
  Go as SDK_NAME,
  En as SDK_VERSION,
  wa as Transports,
  Ia as addBreadcrumb,
  qt as addEventProcessor,
  pi as captureEvent,
  ue as captureException,
  rn as captureMessage,
  Pa as close,
  Na as configureScope,
  _a as defaultIntegrations,
  Ca as flush,
  O as getCurrentScope,
  Oa as init,
  Da as lastEventId,
  va as logger,
  ka as metrics,
  Sa as setContext,
  sn as setExtra,
  ba as setExtras,
  on as setTag,
  Ea as setTags,
  Ta as setUser,
  Ma as showReportDialog,
  Ra as startTransaction,
  Cn as withScope,
  xa as wrap
};
