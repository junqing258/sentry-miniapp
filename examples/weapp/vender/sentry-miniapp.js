var mr = Object.defineProperty, gr = Object.defineProperties;
var _r = Object.getOwnPropertyDescriptors;
var gt = Object.getOwnPropertySymbols;
var Ae = Object.prototype.hasOwnProperty, we = Object.prototype.propertyIsEnumerable;
var Oe = (e, t, n) => t in e ? mr(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, l = (e, t) => {
  for (var n in t || (t = {}))
    Ae.call(t, n) && Oe(e, n, t[n]);
  if (gt)
    for (var n of gt(t))
      we.call(t, n) && Oe(e, n, t[n]);
  return e;
}, _ = (e, t) => gr(e, _r(t));
var Yt = (e, t) => {
  var n = {};
  for (var r in e)
    Ae.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && gt)
    for (var r of gt(e))
      t.indexOf(r) < 0 && we.call(e, r) && (n[r] = e[r]);
  return n;
};
var Z = (e, t, n) => new Promise((r, s) => {
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
const Me = (
  // eslint-disable-next-line no-undef
  typeof globalThis != "undefined" && globalThis || // eslint-disable-next-line no-undef
  typeof self != "undefined" && self || // eslint-disable-next-line no-undef
  typeof window != "undefined" && window || // eslint-disable-next-line no-undef
  typeof global != "undefined" && global || {}
);
class yr {
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
Me.URLSearchParams || (Me.URLSearchParams = yr);
const m = typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__, I = globalThis, j = "10.27.0";
function ut() {
  return Lt(I), I;
}
function Lt(e) {
  const t = e.__SENTRY__ = e.__SENTRY__ || {};
  return t.version = t.version || j, t[j] = t[j] || {};
}
function Y(e, t, n = I) {
  const r = n.__SENTRY__ = n.__SENTRY__ || {}, s = r[j] = r[j] || {};
  return s[e] || (s[e] = t());
}
const Sr = "Sentry Logger ", De = {};
function q(e) {
  if (!("console" in I))
    return e();
  const t = I.console, n = {}, r = Object.keys(De);
  r.forEach((s) => {
    const i = De[s];
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
function br() {
  le().enabled = !0;
}
function Er() {
  le().enabled = !1;
}
function bn() {
  return le().enabled;
}
function Tr(...e) {
  ue("log", ...e);
}
function Ir(...e) {
  ue("warn", ...e);
}
function vr(...e) {
  ue("error", ...e);
}
function ue(e, ...t) {
  m && bn() && q(() => {
    I.console[e](`${Sr}[${e}]:`, ...t);
  });
}
function le() {
  return m ? Y("loggerSettings", () => ({ enabled: !1 })) : { enabled: !1 };
}
const p = {
  /** Enable logging. */
  enable: br,
  /** Disable logging. */
  disable: Er,
  /** Check if logging is enabled. */
  isEnabled: bn,
  /** Log a message. */
  log: Tr,
  /** Log a warning. */
  warn: Ir,
  /** Log an error. */
  error: vr
}, qt = "<anonymous>";
function Nr(e) {
  try {
    return !e || typeof e != "function" ? qt : e.name || qt;
  } catch (t) {
    return qt;
  }
}
function kr(e) {
  return "__v_isVNode" in e && e.__v_isVNode ? "[VueVNode]" : "[VueViewModel]";
}
const En = Object.prototype.toString;
function Tn(e) {
  switch (En.call(e)) {
    case "[object Error]":
    case "[object Exception]":
    case "[object DOMException]":
    case "[object WebAssembly.Exception]":
      return !0;
    default:
      return $t(e, Error);
  }
}
function K(e, t) {
  return En.call(e) === `[object ${t}]`;
}
function Rr(e) {
  return K(e, "ErrorEvent");
}
function Pe(e) {
  return K(e, "DOMError");
}
function Or(e) {
  return K(e, "DOMException");
}
function It(e) {
  return K(e, "String");
}
function de(e) {
  return typeof e == "object" && e !== null && "__sentry_template_string__" in e && "__sentry_template_values__" in e;
}
function In(e) {
  return e === null || de(e) || typeof e != "object" && typeof e != "function";
}
function ot(e) {
  return K(e, "Object");
}
function fe(e) {
  return typeof Event != "undefined" && $t(e, Event);
}
function Ar(e) {
  return typeof Element != "undefined" && $t(e, Element);
}
function wr(e) {
  return K(e, "RegExp");
}
function lt(e) {
  return !!(e != null && e.then && typeof e.then == "function");
}
function Mr(e) {
  return ot(e) && "nativeEvent" in e && "preventDefault" in e && "stopPropagation" in e;
}
function $t(e, t) {
  try {
    return e instanceof t;
  } catch (n) {
    return !1;
  }
}
function Dr(e) {
  return !!(typeof e == "object" && e !== null && (e.__isVue || e._isVue || e.__v_isVNode));
}
const Pr = I, Cr = 80;
function xr(e, t = {}) {
  if (!e)
    return "<unknown>";
  try {
    let n = e;
    const r = 5, s = [];
    let i = 0, o = 0;
    const a = " > ", c = a.length;
    let u;
    const d = Array.isArray(t) ? t : t.keyAttrs, f = !Array.isArray(t) && t.maxStringLength || Cr;
    for (; n && i++ < r && (u = Lr(n, d), !(u === "html" || i > 1 && o + s.length * c + u.length >= f)); )
      s.push(u), o += u.length, n = n.parentNode;
    return s.reverse().join(a);
  } catch (n) {
    return "<unknown>";
  }
}
function Lr(e, t) {
  const n = e, r = [];
  if (!(n != null && n.tagName))
    return "";
  if (Pr.HTMLElement && n instanceof HTMLElement && n.dataset) {
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
    if (o && It(o)) {
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
function Q(e, t, n) {
  if (!(t in e))
    return;
  const r = e[t];
  if (typeof r != "function")
    return;
  const s = n(r);
  typeof s == "function" && vn(s, r);
  try {
    e[t] = s;
  } catch (i) {
    m && p.log(`Failed to replace method "${t}" in object`, e);
  }
}
function Ft(e, t, n) {
  try {
    Object.defineProperty(e, t, {
      // enumerable: false, // the default, so we can save on bundle size by not explicitly setting it
      value: n,
      writable: !0,
      configurable: !0
    });
  } catch (r) {
    m && p.log(`Failed to add non-enumerable property "${t}" to object`, e);
  }
}
function vn(e, t) {
  try {
    const n = t.prototype || {};
    e.prototype = t.prototype = n, Ft(e, "__sentry_original__", t);
  } catch (n) {
  }
}
function Nn(e) {
  return e.__sentry_original__;
}
function kn(e) {
  if (Tn(e))
    return l({
      message: e.message,
      name: e.name,
      stack: e.stack
    }, xe(e));
  if (fe(e)) {
    const t = l({
      type: e.type,
      target: Ce(e.target),
      currentTarget: Ce(e.currentTarget)
    }, xe(e));
    return typeof CustomEvent != "undefined" && $t(e, CustomEvent) && (t.detail = e.detail), t;
  } else
    return e;
}
function Ce(e) {
  try {
    return Ar(e) ? xr(e) : Object.prototype.toString.call(e);
  } catch (t) {
    return "<unknown>";
  }
}
function xe(e) {
  if (typeof e == "object" && e !== null) {
    const t = {};
    for (const n in e)
      Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    return t;
  } else
    return {};
}
function $r(e) {
  const t = Object.keys(kn(e));
  return t.sort(), t[0] ? t.join(", ") : "[object has no keys]";
}
function bt(e) {
  return Xt(e, /* @__PURE__ */ new Map());
}
function Xt(e, t) {
  if (e === null || typeof e != "object")
    return e;
  const n = t.get(e);
  if (n !== void 0)
    return n;
  if (Array.isArray(e)) {
    const r = [];
    return t.set(e, r), e.forEach((s) => {
      r.push(Xt(s, t));
    }), r;
  }
  if (Fr(e)) {
    const r = {};
    return t.set(e, r), Object.keys(e).forEach((i) => {
      const o = e[i];
      o !== void 0 && (r[i] = Xt(o, t));
    }), r;
  }
  return e;
}
function Fr(e) {
  const t = e.constructor;
  return t === Object || t === void 0;
}
function Zt(e, t = 0) {
  return typeof e != "string" || t === 0 || e.length <= t ? e : `${e.slice(0, t)}...`;
}
function Et(e, t, n = !1) {
  return It(e) ? wr(t) ? t.test(e) : It(t) ? n ? e === t : e.includes(t) : !1 : !1;
}
function jt(e, t = [], n = !1) {
  return t.some((r) => Et(e, r, n));
}
function jr() {
  const e = I;
  return e.crypto || e.msCrypto;
}
let Kt;
function Ur() {
  return Math.random() * 16;
}
function R(e = jr()) {
  try {
    if (e != null && e.randomUUID)
      return e.randomUUID().replace(/-/g, "");
  } catch (t) {
  }
  return Kt || (Kt = "10000000100040008000" + 1e11), Kt.replace(
    /[018]/g,
    (t) => (
      // eslint-disable-next-line no-bitwise
      (t ^ (Ur() & 15) >> t / 4).toString(16)
    )
  );
}
function Rn(e) {
  var t, n;
  return (n = (t = e.exception) == null ? void 0 : t.values) == null ? void 0 : n[0];
}
function U(e) {
  const { message: t, event_id: n } = e;
  if (t)
    return t;
  const r = Rn(e);
  return r ? r.type && r.value ? `${r.type}: ${r.value}` : r.type || r.value || n || "<unknown>" : n || "<unknown>";
}
function Qt(e, t, n) {
  const r = e.exception = e.exception || {}, s = r.values = r.values || [], i = s[0] = s[0] || {};
  i.value || (i.value = t || ""), i.type || (i.type = "Error");
}
function vt(e, t) {
  const n = Rn(e);
  if (!n)
    return;
  const r = { type: "generic", handled: !0 }, s = n.mechanism;
  if (n.mechanism = l(l(l({}, r), s), t), t && "data" in t) {
    const i = l(l({}, s == null ? void 0 : s.data), t.data);
    n.mechanism.data = i;
  }
}
function Le(e) {
  if (Br(e))
    return !0;
  try {
    Ft(e, "__sentry_captured__", !0);
  } catch (t) {
  }
  return !1;
}
function Br(e) {
  try {
    return e.__sentry_captured__;
  } catch (t) {
  }
}
const On = 1e3;
function O() {
  return Date.now() / On;
}
function Hr() {
  const { performance: e } = I;
  if (!(e != null && e.now) || !e.timeOrigin)
    return O;
  const t = e.timeOrigin;
  return () => (t + e.now()) / On;
}
let _t;
function Ut() {
  return (_t != null ? _t : _t = Hr())();
}
function te(e, t = {}) {
  if (t.user && (!e.ipAddress && t.user.ip_address && (e.ipAddress = t.user.ip_address), !e.did && !t.did && (e.did = t.user.id || t.user.email || t.user.username)), e.timestamp = t.timestamp || Ut(), t.abnormal_mechanism && (e.abnormal_mechanism = t.abnormal_mechanism), t.ignoreDuration && (e.ignoreDuration = t.ignoreDuration), t.sid && (e.sid = t.sid.length === 32 ? t.sid : R()), t.init !== void 0 && (e.init = t.init), !e.did && t.did && (e.did = `${t.did}`), typeof t.started == "number" && (e.started = t.started), e.ignoreDuration)
    e.duration = void 0;
  else if (typeof t.duration == "number")
    e.duration = t.duration;
  else {
    const n = e.timestamp - e.started;
    e.duration = n >= 0 ? n : 0;
  }
  t.release && (e.release = t.release), t.environment && (e.environment = t.environment), !e.ipAddress && t.ipAddress && (e.ipAddress = t.ipAddress), !e.userAgent && t.userAgent && (e.userAgent = t.userAgent), typeof t.errors == "number" && (e.errors = t.errors), t.status && (e.status = t.status);
}
function dt(e, t, n = 2) {
  if (!t || typeof t != "object" || n <= 0)
    return t;
  if (e && Object.keys(t).length === 0)
    return e;
  const r = l({}, e);
  for (const s in t)
    Object.prototype.hasOwnProperty.call(t, s) && (r[s] = dt(r[s], t[s], n - 1));
  return r;
}
function $e() {
  return R();
}
function An() {
  return R().substring(16);
}
const ee = "_sentrySpan";
function Fe(e, t) {
  t ? Ft(e, ee, t) : delete e[ee];
}
function at(e) {
  return e[ee];
}
const Gr = 100;
class P {
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
      traceId: $e(),
      sampleRand: Math.random()
    };
  }
  /**
   * Clone all data from this scope into a new scope.
   */
  clone() {
    const t = new P();
    return t._breadcrumbs = [...this._breadcrumbs], t._tags = l({}, this._tags), t._attributes = l({}, this._attributes), t._extra = l({}, this._extra), t._contexts = l({}, this._contexts), this._contexts.flags && (t._contexts.flags = {
      values: [...this._contexts.flags.values]
    }), t._user = this._user, t._level = this._level, t._session = this._session, t._transactionName = this._transactionName, t._fingerprint = this._fingerprint, t._eventProcessors = [...this._eventProcessors], t._attachments = [...this._attachments], t._sdkProcessingMetadata = l({}, this._sdkProcessingMetadata), t._propagationContext = l({}, this._propagationContext), t._client = this._client, t._lastEventId = this._lastEventId, Fe(t, at(this)), t;
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
    }, this._session && te(this._session, { user: t }), this._notifyScopeListeners(), this;
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
    const n = typeof t == "function" ? t(this) : t, r = n instanceof P ? n.getScopeData() : ot(n) ? t : void 0, {
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
    return this._breadcrumbs = [], this._tags = {}, this._attributes = {}, this._extra = {}, this._user = {}, this._contexts = {}, this._level = void 0, this._transactionName = void 0, this._fingerprint = void 0, this._session = void 0, Fe(this, void 0), this._attachments = [], this.setPropagationContext({ traceId: $e(), sampleRand: Math.random() }), this._notifyScopeListeners(), this;
  }
  /**
   * Adds a breadcrumb to the scope.
   * By default, the last 100 breadcrumbs are kept.
   */
  addBreadcrumb(t, n) {
    var i;
    const r = typeof n == "number" ? n : Gr;
    if (r <= 0)
      return this;
    const s = _(l({
      timestamp: O()
    }, t), {
      // Breadcrumb messages can theoretically be infinitely large and they're held in memory so we truncate them not to leak (too much) memory
      message: t.message ? Zt(t.message, 2048) : t.message
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
      span: at(this)
    };
  }
  /**
   * Add data which will be accessible during event processing but won't get sent to Sentry.
   */
  setSDKProcessingMetadata(t) {
    return this._sdkProcessingMetadata = dt(this._sdkProcessingMetadata, t, 2), this;
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
      return m && p.warn("No client configured on scope - will not capture exception!"), r;
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
      return m && p.warn("No client configured on scope - will not capture message!"), s;
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
    return this._client ? (this._client.captureEvent(t, _(l({}, n), { event_id: r }), this), r) : (m && p.warn("No client configured on scope - will not capture event!"), r);
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
function zr() {
  return Y("defaultCurrentScope", () => new P());
}
function Wr() {
  return Y("defaultIsolationScope", () => new P());
}
class Yr {
  constructor(t, n) {
    let r;
    t ? r = t : r = new P();
    let s;
    n ? s = n : s = new P(), this._stack = [{ scope: r }], this._isolationScope = s;
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
    return lt(r) ? r.then(
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
function G() {
  const e = ut(), t = Lt(e);
  return t.stack = t.stack || new Yr(zr(), Wr());
}
function qr(e) {
  return G().withScope(e);
}
function Kr(e, t) {
  const n = G();
  return n.withScope(() => (n.getStackTop().scope = e, t(e)));
}
function je(e) {
  return G().withScope(() => e(G().getIsolationScope()));
}
function Jr() {
  return {
    withIsolationScope: je,
    withScope: qr,
    withSetScope: Kr,
    withSetIsolationScope: (e, t) => je(t),
    getCurrentScope: () => G().getScope(),
    getIsolationScope: () => G().getIsolationScope()
  };
}
function Bt(e) {
  const t = Lt(e);
  return t.acs ? t.acs : Jr();
}
function w() {
  const e = ut();
  return Bt(e).getCurrentScope();
}
function A() {
  const e = ut();
  return Bt(e).getIsolationScope();
}
function pe() {
  return Y("globalScope", () => new P());
}
function wn(...e) {
  const t = ut(), n = Bt(t);
  if (e.length === 2) {
    const [r, s] = e;
    return r ? n.withSetScope(r, s) : n.withScope(s);
  }
  return n.withScope(e[0]);
}
function v() {
  return w().getClient();
}
function Mn(e) {
  const t = e.getPropagationContext(), { traceId: n, parentSpanId: r, propagationSpanId: s } = t, i = {
    trace_id: n,
    span_id: s || An()
  };
  return r && (i.parent_span_id = r), i;
}
const Vr = "sentry.source", Xr = "sentry.sample_rate", Zr = "sentry.previous_trace_sample_rate", Qr = "sentry.op", ts = "sentry.origin", Dn = "sentry.profile_id", Pn = "sentry.exclusive_time", es = 0, ns = 1, rs = "_sentryScope", ss = "_sentryIsolationScope";
function is(e) {
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
function Cn(e) {
  const t = e;
  return {
    scope: t[rs],
    isolationScope: is(t[ss])
  };
}
const os = "sentry-", as = /^sentry-/;
function cs(e) {
  const t = us(e);
  if (!t)
    return;
  const n = Object.entries(t).reduce((r, [s, i]) => {
    if (s.match(as)) {
      const o = s.slice(os.length);
      r[o] = i;
    }
    return r;
  }, {});
  if (Object.keys(n).length > 0)
    return n;
}
function us(e) {
  if (!(!e || !It(e) && !Array.isArray(e)))
    return Array.isArray(e) ? e.reduce((t, n) => {
      const r = Ue(n);
      return Object.entries(r).forEach(([s, i]) => {
        t[s] = i;
      }), t;
    }, {}) : Ue(e);
}
function Ue(e) {
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
const ls = /^o(\d+)\./, ds = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)([\w.-]+)(?::(\d+))?\/(.+)/;
function fs(e) {
  return e === "http" || e === "https";
}
function ft(e, t = !1) {
  const { host: n, path: r, pass: s, port: i, projectId: o, protocol: a, publicKey: c } = e;
  return `${a}://${c}${t && s ? `:${s}` : ""}@${n}${i ? `:${i}` : ""}/${r && `${r}/`}${o}`;
}
function ps(e) {
  const t = ds.exec(e);
  if (!t) {
    q(() => {
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
  return xn({ host: i, pass: s, path: c, projectId: u, port: o, protocol: n, publicKey: r });
}
function xn(e) {
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
function hs(e) {
  if (!m)
    return !0;
  const { port: t, projectId: n, protocol: r } = e;
  return ["protocol", "publicKey", "host", "projectId"].find((o) => e[o] ? !1 : (p.error(`Invalid Sentry Dsn: ${o} missing`), !0)) ? !1 : n.match(/^\d+$/) ? fs(r) ? t && isNaN(parseInt(t, 10)) ? (p.error(`Invalid Sentry Dsn: Invalid port ${t}`), !1) : !0 : (p.error(`Invalid Sentry Dsn: Invalid protocol ${r}`), !1) : (p.error(`Invalid Sentry Dsn: Invalid projectId ${n}`), !1);
}
function ms(e) {
  const t = e.match(ls);
  return t == null ? void 0 : t[1];
}
function gs(e) {
  const t = e.getOptions(), { host: n } = e.getDsn() || {};
  let r;
  return t.orgId ? r = String(t.orgId) : n && (r = ms(n)), r;
}
function _s(e) {
  const t = typeof e == "string" ? ps(e) : xn(e);
  if (!(!t || !hs(t)))
    return t;
}
function Ln(e) {
  if (typeof e == "boolean")
    return Number(e);
  const t = typeof e == "string" ? parseFloat(e) : e;
  if (!(typeof t != "number" || isNaN(t) || t < 0 || t > 1))
    return t;
}
const $n = 1;
let Be = !1;
function Fn(e) {
  const { spanId: t, traceId: n, isRemote: r } = e.spanContext(), s = r ? t : he(e).parent_span_id, i = Cn(e).scope, o = r ? (i == null ? void 0 : i.getPropagationContext().propagationSpanId) || An() : t;
  return {
    parent_span_id: s,
    span_id: o,
    trace_id: n
  };
}
function ys(e) {
  if (e && e.length > 0)
    return e.map((o) => {
      var a = o, { context: c } = a, u = c, { spanId: t, traceId: n, traceFlags: r } = u, s = Yt(u, ["spanId", "traceId", "traceFlags"]), { attributes: i } = a;
      return l({
        span_id: t,
        trace_id: n,
        sampled: r === $n,
        attributes: i
      }, s);
    });
}
function He(e) {
  return typeof e == "number" ? Ge(e) : Array.isArray(e) ? e[0] + e[1] / 1e9 : e instanceof Date ? Ge(e.getTime()) : Ut();
}
function Ge(e) {
  return e > 9999999999 ? e / 1e3 : e;
}
function he(e) {
  var r;
  if (bs(e))
    return e.getSpanJSON();
  const { spanId: t, traceId: n } = e.spanContext();
  if (Ss(e)) {
    const { attributes: s, startTime: i, name: o, endTime: a, status: c, links: u } = e, d = "parentSpanId" in e ? e.parentSpanId : "parentSpanContext" in e ? (r = e.parentSpanContext) == null ? void 0 : r.spanId : void 0;
    return {
      span_id: t,
      trace_id: n,
      data: s,
      description: o,
      parent_span_id: d,
      start_timestamp: He(i),
      // This is [0,0] by default in OTEL, in which case we want to interpret this as no end time
      timestamp: He(a) || void 0,
      status: Ts(c),
      op: s[Qr],
      origin: s[ts],
      links: ys(u)
    };
  }
  return {
    span_id: t,
    trace_id: n,
    start_timestamp: 0,
    data: {}
  };
}
function Ss(e) {
  const t = e;
  return !!t.attributes && !!t.startTime && !!t.name && !!t.endTime && !!t.status;
}
function bs(e) {
  return typeof e.getSpanJSON == "function";
}
function Es(e) {
  const { traceFlags: t } = e.spanContext();
  return t === $n;
}
function Ts(e) {
  if (!(!e || e.code === es))
    return e.code === ns ? "ok" : e.message || "internal_error";
}
const Is = "_sentryRootSpan";
function jn(e) {
  return e[Is] || e;
}
function vs() {
  const e = ut(), t = Bt(e);
  return t.getActiveSpan ? t.getActiveSpan() : at(w());
}
function ze() {
  Be || (q(() => {
    console.warn(
      "[Sentry] Returning null from `beforeSendSpan` is disallowed. To drop certain spans, configure the respective integrations directly or use `ignoreSpans`."
    );
  }), Be = !0);
}
function Un(e) {
  var n;
  if (typeof __SENTRY_TRACING__ == "boolean" && !__SENTRY_TRACING__)
    return !1;
  const t = e || ((n = v()) == null ? void 0 : n.getOptions());
  return !!t && // Note: This check is `!= null`, meaning "nullish". `0` is not "nullish", `undefined` and `null` are. (This comment was brought to you by 15 minutes of questioning life)
  (t.tracesSampleRate != null || !!t.tracesSampler);
}
function We(e) {
  p.log(`Ignoring span ${e.op} - ${e.description} because it matches \`ignoreSpans\`.`);
}
function Ye(e, t) {
  if (!(t != null && t.length) || !e.description)
    return !1;
  for (const n of t) {
    if (ks(n)) {
      if (Et(e.description, n))
        return m && We(e), !0;
      continue;
    }
    if (!n.name && !n.op)
      continue;
    const r = n.name ? Et(e.description, n.name) : !0, s = n.op ? e.op && Et(e.op, n.op) : !0;
    if (r && s)
      return m && We(e), !0;
  }
  return !1;
}
function Ns(e, t) {
  const n = t.parent_span_id, r = t.span_id;
  if (n)
    for (const s of e)
      s.parent_span_id === r && (s.parent_span_id = n);
}
function ks(e) {
  return typeof e == "string" || e instanceof RegExp;
}
const me = "production", Rs = "_frozenDsc";
function Bn(e, t) {
  const n = t.getOptions(), { publicKey: r } = t.getDsn() || {}, s = {
    environment: n.environment || me,
    release: n.release,
    public_key: r,
    trace_id: e,
    org_id: gs(t)
  };
  return t.emit("createDsc", s), s;
}
function Hn(e, t) {
  const n = t.getPropagationContext();
  return n.dsc || Bn(n.traceId, e);
}
function Gn(e) {
  var y, b, S, N;
  const t = v();
  if (!t)
    return {};
  const n = jn(e), r = he(n), s = r.data, i = n.spanContext().traceState, o = (b = (y = i == null ? void 0 : i.get("sentry.sample_rate")) != null ? y : s[Xr]) != null ? b : s[Zr];
  function a(k) {
    return (typeof o == "number" || typeof o == "string") && (k.sample_rate = `${o}`), k;
  }
  const c = n[Rs];
  if (c)
    return a(c);
  const u = i == null ? void 0 : i.get("sentry.dsc"), d = u && cs(u);
  if (d)
    return a(d);
  const f = Bn(e.spanContext().traceId, t), g = s[Vr], h = r.description;
  return g !== "url" && h && (f.transaction = h), Un() && (f.sampled = String(Es(n)), f.sample_rand = // In OTEL we store the sample rand on the trace state because we cannot access scopes for NonRecordingSpans
  // The Sentry OTEL SpanSampler takes care of writing the sample rand on the root span
  (N = i == null ? void 0 : i.get("sentry.sample_rand")) != null ? N : (
    // On all other platforms we can actually get the scopes from a root span (we use this as a fallback)
    (S = Cn(n).scope) == null ? void 0 : S.getPropagationContext().sampleRand.toString()
  )), a(f), t.emit("createDsc", f, n), f;
}
function D(e, t = 100, n = 1 / 0) {
  try {
    return ne("", e, t, n);
  } catch (r) {
    return { ERROR: `**non-serializable** (${r})` };
  }
}
function zn(e, t = 3, n = 100 * 1024) {
  const r = D(e, t);
  return Ms(r) > n ? zn(e, t - 1, n) : r;
}
function ne(e, t, n = 1 / 0, r = 1 / 0, s = Ds()) {
  const [i, o] = s;
  if (t == null || // this matches null and undefined -> eqeq not eqeqeq
  ["boolean", "string"].includes(typeof t) || typeof t == "number" && Number.isFinite(t))
    return t;
  const a = Os(e, t);
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
      const h = u.toJSON();
      return ne("", h, c - 1, r, s);
    } catch (h) {
    }
  const d = Array.isArray(t) ? [] : {};
  let f = 0;
  const g = kn(t);
  for (const h in g) {
    if (!Object.prototype.hasOwnProperty.call(g, h))
      continue;
    if (f >= r) {
      d[h] = "[MaxProperties ~]";
      break;
    }
    const y = g[h];
    d[h] = ne(h, y, c - 1, r, s), f++;
  }
  return o(t), d;
}
function Os(e, t) {
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
    if (Dr(t))
      return kr(t);
    if (Mr(t))
      return "[SyntheticEvent]";
    if (typeof t == "number" && !Number.isFinite(t))
      return `[${t}]`;
    if (typeof t == "function")
      return `[Function: ${Nr(t)}]`;
    if (typeof t == "symbol")
      return `[${String(t)}]`;
    if (typeof t == "bigint")
      return `[BigInt: ${String(t)}]`;
    const n = As(t);
    return /^HTML(\w*)Element$/.test(n) ? `[HTMLElement: ${n}]` : `[object ${n}]`;
  } catch (n) {
    return `**non-serializable** (${n})`;
  }
}
function As(e) {
  const t = Object.getPrototypeOf(e);
  return t != null && t.constructor ? t.constructor.name : "null prototype";
}
function ws(e) {
  return ~-encodeURI(e).split(/%..|./).length;
}
function Ms(e) {
  return ws(JSON.stringify(e));
}
function Ds() {
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
function Ps(e, t) {
  const [n, r] = e;
  return [n, [...r, t]];
}
function qe(e, t) {
  const n = e[1];
  for (const r of n) {
    const s = r[0].type;
    if (t(r, s))
      return !0;
  }
  return !1;
}
function re(e) {
  const t = Lt(I);
  return t.encodePolyfill ? t.encodePolyfill(e) : new TextEncoder().encode(e);
}
function Cs(e) {
  const [t, n] = e;
  let r = JSON.stringify(t);
  function s(i) {
    typeof r == "string" ? r = typeof i == "string" ? r + i : [re(r), i] : r.push(typeof i == "string" ? re(i) : i);
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
  return typeof r == "string" ? r : xs(r);
}
function xs(e) {
  const t = e.reduce((s, i) => s + i.length, 0), n = new Uint8Array(t);
  let r = 0;
  for (const s of e)
    n.set(s, r), r += s.length;
  return n;
}
function Ls(e) {
  const t = typeof e.data == "string" ? re(e.data) : e.data;
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
const $s = {
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
function Ke(e) {
  return $s[e];
}
function Wn(e) {
  if (!(e != null && e.sdk))
    return;
  const { name: t, version: n } = e.sdk;
  return { name: t, version: n };
}
function Fs(e, t, n, r) {
  var i;
  const s = (i = e.sdkProcessingMetadata) == null ? void 0 : i.dynamicSamplingContext;
  return l(l(l({
    event_id: e.event_id,
    sent_at: (/* @__PURE__ */ new Date()).toISOString()
  }, t && { sdk: t }), !!n && r && { dsn: ft(r) }), s && {
    trace: s
  });
}
function js(e, t) {
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
function Us(e, t, n, r) {
  const s = Wn(n), i = l(l({
    sent_at: (/* @__PURE__ */ new Date()).toISOString()
  }, s && { sdk: s }), !!r && t && { dsn: ft(t) }), o = "aggregates" in e ? [{ type: "sessions" }, e] : [{ type: "session" }, e.toJSON()];
  return J(i, [o]);
}
function Bs(e, t, n, r) {
  const s = Wn(n), i = e.type && e.type !== "replay_event" ? e.type : "event";
  js(e, n == null ? void 0 : n.sdk);
  const o = Fs(e, s, r, t);
  return delete e.sdkProcessingMetadata, J(o, [[{ type: i }, e]]);
}
function Hs(e, t, n) {
  if (!Un(e))
    return [!1];
  let r, s;
  typeof e.tracesSampler == "function" ? (s = e.tracesSampler(_(l({}, t), {
    inheritOrSampleWith: (a) => typeof t.parentSampleRate == "number" ? t.parentSampleRate : typeof t.parentSampled == "boolean" ? Number(t.parentSampled) : a
  })), r = !0) : t.parentSampled !== void 0 ? s = t.parentSampled : typeof e.tracesSampleRate != "undefined" && (s = e.tracesSampleRate, r = !0);
  const i = Ln(s);
  if (i === void 0)
    return m && p.warn(
      `[Tracing] Discarding root span because of invalid sample rate. Sample rate must be a boolean or a number between 0 and 1. Got ${JSON.stringify(
        s
      )} of type ${JSON.stringify(typeof s)}.`
    ), [!1];
  if (!i)
    return m && p.log(
      `[Tracing] Discarding transaction because ${typeof e.tracesSampler == "function" ? "tracesSampler returned 0 or false" : "a negative sampling decision was inherited or tracesSampleRate is set to 0"}`
    ), [!1, i, r];
  const o = n < i;
  return o || m && p.log(
    `[Tracing] Discarding transaction because it's not included in the random sample (sampling rate = ${Number(
      s
    )})`
  ), [o, i, r];
}
const Jt = 0, Je = 1, Ve = 2;
function Ht(e) {
  return new z((t) => {
    t(e);
  });
}
function ge(e) {
  return new z((t, n) => {
    n(e);
  });
}
class z {
  constructor(t) {
    this._state = Jt, this._handlers = [], this._runExecutor(t);
  }
  /** @inheritdoc */
  then(t, n) {
    return new z((r, s) => {
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
    return new z((n, r) => {
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
    if (this._state === Jt)
      return;
    const t = this._handlers.slice();
    this._handlers = [], t.forEach((n) => {
      n[0] || (this._state === Je && n[1](this._value), this._state === Ve && n[2](this._value), n[0] = !0);
    });
  }
  /** Run the executor for the SyncPromise. */
  _runExecutor(t) {
    const n = (i, o) => {
      if (this._state === Jt) {
        if (lt(o)) {
          o.then(r, s);
          return;
        }
        this._state = i, this._value = o, this._executeHandlers();
      }
    }, r = (i) => {
      n(Je, i);
    }, s = (i) => {
      n(Ve, i);
    };
    try {
      t(r, s);
    } catch (i) {
      s(i);
    }
  }
}
function Gs(e, t, n, r = 0) {
  try {
    const s = se(t, n, e, r);
    return lt(s) ? s : Ht(s);
  } catch (s) {
    return ge(s);
  }
}
function se(e, t, n, r) {
  const s = n[r];
  if (!e || !s)
    return e;
  const i = s(l({}, e), t);
  return m && i === null && p.log(`Event processor "${s.id || "?"}" dropped event`), lt(i) ? i.then((o) => se(o, t, n, r + 1)) : se(i, t, n, r + 1);
}
function zs(e, t) {
  const { fingerprint: n, span: r, breadcrumbs: s, sdkProcessingMetadata: i } = t;
  Ws(e, t), r && Ks(e, r), Js(e, n), Ys(e, s), qs(e, i);
}
function W(e, t) {
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
    propagationContext: g,
    transactionName: h,
    span: y
  } = t;
  yt(e, "extra", n), yt(e, "tags", r), yt(e, "user", s), yt(e, "contexts", i), e.sdkProcessingMetadata = dt(e.sdkProcessingMetadata, a, 2), o && (e.level = o), h && (e.transactionName = h), y && (e.span = y), c.length && (e.breadcrumbs = [...e.breadcrumbs, ...c]), u.length && (e.fingerprint = [...e.fingerprint, ...u]), d.length && (e.eventProcessors = [...e.eventProcessors, ...d]), f.length && (e.attachments = [...e.attachments, ...f]), e.propagationContext = l(l({}, e.propagationContext), g);
}
function yt(e, t, n) {
  e[t] = dt(e[t], n, 1);
}
function Ws(e, t) {
  const { extra: n, tags: r, user: s, contexts: i, level: o, transactionName: a } = t;
  Object.keys(n).length && (e.extra = l(l({}, n), e.extra)), Object.keys(r).length && (e.tags = l(l({}, r), e.tags)), Object.keys(s).length && (e.user = l(l({}, s), e.user)), Object.keys(i).length && (e.contexts = l(l({}, i), e.contexts)), o && (e.level = o), a && e.type !== "transaction" && (e.transaction = a);
}
function Ys(e, t) {
  const n = [...e.breadcrumbs || [], ...t];
  e.breadcrumbs = n.length ? n : void 0;
}
function qs(e, t) {
  e.sdkProcessingMetadata = l(l({}, e.sdkProcessingMetadata), t);
}
function Ks(e, t) {
  e.contexts = l({
    trace: Fn(t)
  }, e.contexts), e.sdkProcessingMetadata = l({
    dynamicSamplingContext: Gn(t)
  }, e.sdkProcessingMetadata);
  const n = jn(t), r = he(n).description;
  r && !e.transaction && e.type === "transaction" && (e.transaction = r);
}
function Js(e, t) {
  e.fingerprint = e.fingerprint ? Array.isArray(e.fingerprint) ? e.fingerprint : [e.fingerprint] : [], t && (e.fingerprint = e.fingerprint.concat(t)), e.fingerprint.length || delete e.fingerprint;
}
let C, Xe, Ze, $;
function Vs(e) {
  const t = I._sentryDebugIds, n = I._debugIds;
  if (!t && !n)
    return {};
  const r = t ? Object.keys(t) : [], s = n ? Object.keys(n) : [];
  if ($ && r.length === Xe && s.length === Ze)
    return $;
  Xe = r.length, Ze = s.length, $ = {}, C || (C = {});
  const i = (o, a) => {
    for (const c of o) {
      const u = a[c], d = C == null ? void 0 : C[c];
      if (d && $ && u)
        $[d[0]] = u, C && (C[c] = [d[0], u]);
      else if (u) {
        const f = e(c);
        for (let g = f.length - 1; g >= 0; g--) {
          const h = f[g], y = h == null ? void 0 : h.filename;
          if (y && $ && C) {
            $[y] = u, C[c] = [y, u];
            break;
          }
        }
      }
    }
  };
  return t && i(r, t), n && i(s, n), $;
}
function Xs(e, t, n, r, s, i) {
  const { normalizeDepth: o = 3, normalizeMaxBreadth: a = 1e3 } = e, c = _(l({}, t), {
    event_id: t.event_id || n.event_id || R(),
    timestamp: t.timestamp || O()
  }), u = n.integrations || e.integrations.map((S) => S.name);
  Zs(c, e), ei(c, u), s && s.emit("applyFrameMetadata", t), t.type === void 0 && Qs(c, e.stackParser);
  const d = ri(r, n.captureContext);
  n.mechanism && vt(c, n.mechanism);
  const f = s ? s.getEventProcessors() : [], g = pe().getScopeData();
  if (i) {
    const S = i.getScopeData();
    W(g, S);
  }
  if (d) {
    const S = d.getScopeData();
    W(g, S);
  }
  const h = [...n.attachments || [], ...g.attachments];
  h.length && (n.attachments = h), zs(c, g);
  const y = [
    ...f,
    // Run scope event processors _after_ all other processors
    ...g.eventProcessors
  ];
  return Gs(y, c, n).then((S) => (S && ti(S), typeof o == "number" && o > 0 ? ni(S, o, a) : S));
}
function Zs(e, t) {
  var a, c;
  const { environment: n, release: r, dist: s, maxValueLength: i } = t;
  e.environment = e.environment || n || me, !e.release && r && (e.release = r), !e.dist && s && (e.dist = s);
  const o = e.request;
  o != null && o.url && i && (o.url = Zt(o.url, i)), i && ((c = (a = e.exception) == null ? void 0 : a.values) == null || c.forEach((u) => {
    u.value && (u.value = Zt(u.value, i));
  }));
}
function Qs(e, t) {
  var r, s;
  const n = Vs(t);
  (s = (r = e.exception) == null ? void 0 : r.values) == null || s.forEach((i) => {
    var o, a;
    (a = (o = i.stacktrace) == null ? void 0 : o.frames) == null || a.forEach((c) => {
      c.filename && (c.debug_id = n[c.filename]);
    });
  });
}
function ti(e) {
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
function ei(e, t) {
  t.length > 0 && (e.sdk = e.sdk || {}, e.sdk.integrations = [...e.sdk.integrations || [], ...t]);
}
function ni(e, t, n) {
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
function ri(e, t) {
  if (!t)
    return e;
  const n = e ? e.clone() : new P();
  return n.update(t), n;
}
function si(e) {
  if (e)
    return ii(e) ? { captureContext: e } : ai(e) ? {
      captureContext: e
    } : e;
}
function ii(e) {
  return e instanceof P || typeof e == "function";
}
const oi = [
  "user",
  "level",
  "extra",
  "contexts",
  "tags",
  "fingerprint",
  "propagationContext"
];
function ai(e) {
  return Object.keys(e).some((t) => oi.includes(t));
}
function ie(e, t) {
  return w().captureException(e, si(t));
}
function Qe(e, t) {
  const n = typeof t == "string" ? t : void 0, r = typeof t != "string" ? { captureContext: t } : void 0;
  return w().captureMessage(e, n, r);
}
function ci(e, t) {
  return w().captureEvent(e, t);
}
function ca(e, t) {
  A().setContext(e, t);
}
function ua(e) {
  A().setExtras(e);
}
function tn(e, t) {
  A().setExtra(e, t);
}
function la(e) {
  A().setTags(e);
}
function en(e, t) {
  A().setTag(e, t);
}
function da(e) {
  A().setUser(e);
}
function Yn() {
  return A().lastEventId();
}
function Gt(e) {
  A().addEventProcessor(e);
}
const ui = "7";
function li(e) {
  const t = e.protocol ? `${e.protocol}:` : "", n = e.port ? `:${e.port}` : "";
  return `${t}//${e.host}${n}${e.path ? `/${e.path}` : ""}/api/`;
}
function di(e) {
  return `${li(e)}${e.projectId}/envelope/`;
}
function fi(e, t) {
  const n = {
    sentry_version: ui
  };
  return e.publicKey && (n.sentry_key = e.publicKey), t && (n.sentry_client = `${t.name}/${t.version}`), new URLSearchParams(n).toString();
}
function pi(e, t, n) {
  return t || `${di(e)}?${fi(e, n)}`;
}
const nn = [];
function hi(e, t) {
  const n = {};
  return t.forEach((r) => {
    r && qn(e, r, n);
  }), n;
}
function rn(e, t) {
  for (const n of t)
    n != null && n.afterAllSetup && n.afterAllSetup(e);
}
function qn(e, t, n) {
  if (n[t.name]) {
    m && p.log(`Integration skipped because it was already installed: ${t.name}`);
    return;
  }
  if (n[t.name] = t, !nn.includes(t.name) && typeof t.setupOnce == "function" && (t.setupOnce(), nn.push(t.name)), t.setup && typeof t.setup == "function" && t.setup(e), typeof t.preprocessEvent == "function") {
    const r = t.preprocessEvent.bind(t);
    e.on("preprocessEvent", (s, i) => r(s, i, e));
  }
  if (typeof t.processEvent == "function") {
    const r = t.processEvent.bind(t), s = Object.assign((i, o) => r(i, o, e), {
      id: t.name
    });
    e.addEventProcessor(s);
  }
  m && p.log(`Integration installed: ${t.name}`);
}
function Kn(e, t) {
  return t ? wn(t, () => {
    const n = vs(), r = n ? Fn(n) : Mn(t);
    return [n ? Gn(n) : Hn(e, t), r];
  }) : [void 0, void 0];
}
const mi = {
  trace: 1,
  debug: 5,
  info: 9,
  warn: 13,
  error: 17,
  fatal: 21
};
function gi(e) {
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
function _i(e, t, n, r) {
  const s = {};
  return t != null && t.sdk && (s.sdk = {
    name: t.sdk.name,
    version: t.sdk.version
  }), n && r && (s.dsn = ft(r)), J(s, [gi(e)]);
}
const yi = 100;
function Si(e) {
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
function bi(e, t) {
  const n = _e(), r = Vn(e);
  r === void 0 ? n.set(e, [t]) : r.length >= yi ? (Jn(e, r), n.set(e, [t])) : n.set(e, [...r, t]);
}
function Ei(e, t = w(), n = bi) {
  var Ne, ke, Re;
  const r = (Ne = t == null ? void 0 : t.getClient()) != null ? Ne : v();
  if (!r) {
    m && p.warn("No client available to capture log.");
    return;
  }
  const { release: s, environment: i, enableLogs: o = !1, beforeSendLog: a } = r.getOptions();
  if (!o) {
    m && p.warn("logging option not enabled, log will not be captured.");
    return;
  }
  const [, c] = Kn(r, t), u = l({}, e.attributes), {
    user: { id: d, email: f, username: g }
  } = Ti(t);
  M(u, "user.id", d, !1), M(u, "user.email", f, !1), M(u, "user.name", g, !1), M(u, "sentry.release", s), M(u, "sentry.environment", i);
  const { name: h, version: y } = (Re = (ke = r.getSdkMetadata()) == null ? void 0 : ke.sdk) != null ? Re : {};
  M(u, "sentry.sdk.name", h), M(u, "sentry.sdk.version", y);
  const b = r.getIntegrationByName("Replay"), S = b == null ? void 0 : b.getReplayId(!0);
  M(u, "sentry.replay_id", S), S && (b == null ? void 0 : b.getRecordingMode()) === "buffer" && M(u, "sentry._internal.replay_is_buffering", !0);
  const N = e.message;
  if (de(N)) {
    const { __sentry_template_string__: mt, __sentry_template_values__: F = [] } = N;
    F != null && F.length && (u["sentry.message.template"] = mt), F.forEach((pr, hr) => {
      u[`sentry.message.parameter.${hr}`] = pr;
    });
  }
  const k = at(t);
  M(u, "sentry.trace.parent_span_id", k == null ? void 0 : k.spanContext().spanId);
  const L = _(l({}, e), { attributes: u });
  r.emit("beforeCaptureLog", L);
  const X = a ? q(() => a(L)) : L;
  if (!X) {
    r.recordDroppedEvent("before_send", "log_item", 1), m && p.warn("beforeSendLog returned null, log will not be captured.");
    return;
  }
  const { level: pt, message: zt, attributes: ht = {}, severityNumber: Wt } = X, fr = {
    timestamp: Ut(),
    level: pt,
    body: zt,
    trace_id: c == null ? void 0 : c.trace_id,
    severity_number: Wt != null ? Wt : mi[pt],
    attributes: Object.keys(ht).reduce(
      (mt, F) => (mt[F] = Si(ht[F]), mt),
      {}
    )
  };
  n(r, fr), r.emit("afterCaptureLog", X);
}
function Jn(e, t) {
  var i;
  const n = (i = t != null ? t : Vn(e)) != null ? i : [];
  if (n.length === 0)
    return;
  const r = e.getOptions(), s = _i(n, r._metadata, r.tunnel, e.getDsn());
  _e().set(e, []), e.emit("flushLogs"), e.sendEnvelope(s);
}
function Vn(e) {
  return _e().get(e);
}
function Ti(e) {
  const t = pe().getScopeData();
  return W(t, A().getScopeData()), W(t, e.getScopeData()), t;
}
function _e() {
  return Y("clientToLogBufferMap", () => /* @__PURE__ */ new WeakMap());
}
function Ii(e) {
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
function vi(e, t, n, r) {
  const s = {};
  return t != null && t.sdk && (s.sdk = {
    name: t.sdk.name,
    version: t.sdk.version
  }), n && r && (s.dsn = ft(r)), J(s, [Ii(e)]);
}
const Ni = 1e3;
function ki(e) {
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
function Ri(e, t) {
  const n = ye(), r = Zn(e);
  r === void 0 ? n.set(e, [t]) : r.length >= Ni ? (Xn(e, r), n.set(e, [t])) : n.set(e, [...r, t]);
}
function Oi(e, t, n) {
  var h, y;
  const { release: r, environment: s } = t.getOptions(), i = l({}, e.attributes), {
    user: { id: o, email: a, username: c }
  } = Mi(n);
  x(i, "user.id", o, !1), x(i, "user.email", a, !1), x(i, "user.name", c, !1), x(i, "sentry.release", r), x(i, "sentry.environment", s);
  const { name: u, version: d } = (y = (h = t.getSdkMetadata()) == null ? void 0 : h.sdk) != null ? y : {};
  x(i, "sentry.sdk.name", u), x(i, "sentry.sdk.version", d);
  const f = t.getIntegrationByName("Replay"), g = f == null ? void 0 : f.getReplayId(!0);
  return x(i, "sentry.replay_id", g), g && (f == null ? void 0 : f.getRecordingMode()) === "buffer" && x(i, "sentry._internal.replay_is_buffering", !0), _(l({}, e), {
    attributes: i
  });
}
function Ai(e, t, n) {
  const r = {};
  for (const c in e.attributes)
    e.attributes[c] !== void 0 && (r[c] = ki(e.attributes[c]));
  const [, s] = Kn(t, n), i = at(n), o = i ? i.spanContext().traceId : s == null ? void 0 : s.trace_id, a = i ? i.spanContext().spanId : void 0;
  return {
    timestamp: Ut(),
    trace_id: o != null ? o : "",
    span_id: a,
    name: e.name,
    type: e.type,
    unit: e.unit,
    value: e.value,
    attributes: r
  };
}
function wi(e, t) {
  var h, y, b, S;
  const n = (h = t == null ? void 0 : t.scope) != null ? h : w(), r = (y = t == null ? void 0 : t.captureSerializedMetric) != null ? y : Ri, s = (b = n == null ? void 0 : n.getClient()) != null ? b : v();
  if (!s) {
    m && p.warn("No client available to capture metric.");
    return;
  }
  const { _experiments: i, enableMetrics: o, beforeSendMetric: a } = s.getOptions();
  if (!((S = o != null ? o : i == null ? void 0 : i.enableMetrics) != null ? S : !0)) {
    m && p.warn("metrics option not enabled, metric will not be captured.");
    return;
  }
  const u = Oi(e, s, n);
  s.emit("processMetric", u);
  const d = a || (i == null ? void 0 : i.beforeSendMetric), f = d ? d(u) : u;
  if (!f) {
    m && p.log("`beforeSendMetric` returned `null`, will not send metric.");
    return;
  }
  const g = Ai(f, s, n);
  m && p.log("[Metric]", g), r(s, g), s.emit("afterCaptureMetric", f);
}
function Xn(e, t) {
  var i;
  const n = (i = t != null ? t : Zn(e)) != null ? i : [];
  if (n.length === 0)
    return;
  const r = e.getOptions(), s = vi(n, r._metadata, r.tunnel, e.getDsn());
  ye().set(e, []), e.emit("flushMetrics"), e.sendEnvelope(s);
}
function Zn(e) {
  return ye().get(e);
}
function Mi(e) {
  const t = pe().getScopeData();
  return W(t, A().getScopeData()), W(t, e.getScopeData()), t;
}
function ye() {
  return Y("clientToMetricBufferMap", () => /* @__PURE__ */ new WeakMap());
}
const Se = Symbol.for("SentryBufferFullError");
function Qn(e = 100) {
  const t = /* @__PURE__ */ new Set();
  function n() {
    return t.size < e;
  }
  function r(o) {
    t.delete(o);
  }
  function s(o) {
    if (!n())
      return ge(Se);
    const a = o();
    return t.add(a), a.then(
      () => r(a),
      () => r(a)
    ), a;
  }
  function i(o) {
    if (!t.size)
      return Ht(!0);
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
const Di = 60 * 1e3;
function Pi(e, t = Date.now()) {
  const n = parseInt(`${e}`, 10);
  if (!isNaN(n))
    return n * 1e3;
  const r = Date.parse(`${e}`);
  return isNaN(r) ? Di : r - t;
}
function Ci(e, t) {
  return e[t] || e.all || 0;
}
function xi(e, t, n = Date.now()) {
  return Ci(e, t) > n;
}
function Li(e, { statusCode: t, headers: n }, r = Date.now()) {
  const s = l({}, e), i = n == null ? void 0 : n["x-sentry-rate-limits"], o = n == null ? void 0 : n["retry-after"];
  if (i)
    for (const a of i.trim().split(",")) {
      const [c, u, , , d] = a.split(":", 5), f = parseInt(c, 10), g = (isNaN(f) ? 60 : f) * 1e3;
      if (!u)
        s.all = r + g;
      else
        for (const h of u.split(";"))
          h === "metric_bucket" ? (!d || d.split(";").includes("custom")) && (s[h] = r + g) : s[h] = r + g;
    }
  else o ? s.all = r + Pi(o, r) : t === 429 && (s.all = r + 60 * 1e3);
  return s;
}
const tr = 64;
function $i(e, t, n = Qn(
  e.bufferSize || tr
)) {
  let r = {};
  const s = (o) => n.drain(o);
  function i(o) {
    const a = [];
    if (qe(o, (f, g) => {
      const h = Ke(g);
      xi(r, h) ? e.recordDroppedEvent("ratelimit_backoff", h) : a.push(f);
    }), a.length === 0)
      return Promise.resolve({});
    const c = J(o[0], a), u = (f) => {
      qe(c, (g, h) => {
        e.recordDroppedEvent(f, Ke(h));
      });
    }, d = () => t({ body: Cs(c) }).then(
      (f) => (f.statusCode !== void 0 && (f.statusCode < 200 || f.statusCode >= 300) && m && p.warn(`Sentry responded with status code ${f.statusCode} to sent event.`), r = Li(r, f), f),
      (f) => {
        throw u("network_error"), m && p.error("Encountered error running transport request:", f), f;
      }
    );
    return n.add(d).then(
      (f) => f,
      (f) => {
        if (f === Se)
          return m && p.error("Skipped sending event because buffer is full."), u("queue_overflow"), Promise.resolve({});
        throw f;
      }
    );
  }
  return {
    send: i,
    flush: s
  };
}
function Fi(e, t, n) {
  const r = [
    { type: "client_report" },
    {
      timestamp: O(),
      discarded_events: e
    }
  ];
  return J(t ? { dsn: t } : {}, [r]);
}
function er(e) {
  const t = [];
  e.message && t.push(e.message);
  try {
    const n = e.exception.values[e.exception.values.length - 1];
    n != null && n.value && (t.push(n.value), n.type && t.push(`${n.type}: ${n.value}`));
  } catch (n) {
  }
  return t;
}
function ji(e) {
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
    profile_id: o == null ? void 0 : o[Dn],
    exclusive_time: o == null ? void 0 : o[Pn],
    measurements: e.measurements,
    is_segment: !0
  };
}
function Ui(e) {
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
        data: l(l(l({}, e.data), e.profile_id && { [Dn]: e.profile_id }), e.exclusive_time && { [Pn]: e.exclusive_time })
      }
    },
    measurements: e.measurements
  };
}
const sn = "Not capturing exception because it's already been captured.", on = "Discarded session because of missing or non-string release", nr = Symbol.for("SentryInternalError"), rr = Symbol.for("SentryDoNotSendEventError"), Bi = 5e3;
function Tt(e) {
  return {
    message: e,
    [nr]: !0
  };
}
function Vt(e) {
  return {
    message: e,
    [rr]: !0
  };
}
function an(e) {
  return !!e && typeof e == "object" && nr in e;
}
function cn(e) {
  return !!e && typeof e == "object" && rr in e;
}
function un(e, t, n, r, s) {
  let i = 0, o, a = !1;
  e.on(n, () => {
    i = 0, clearTimeout(o), a = !1;
  }), e.on(t, (c) => {
    i += r(c), i >= 8e5 ? s(e) : a || (a = !0, o = setTimeout(() => {
      s(e);
    }, Bi));
  }), e.on("flush", () => {
    s(e);
  });
}
class Hi {
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
    if (this._options = t, this._integrations = {}, this._numProcessing = 0, this._outcomes = {}, this._hooks = {}, this._eventProcessors = [], this._promiseBuffer = Qn((s = (r = t.transportOptions) == null ? void 0 : r.bufferSize) != null ? s : tr), t.dsn ? this._dsn = _s(t.dsn) : m && p.warn("No DSN provided, client will not send events."), this._dsn) {
      const d = pi(
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
    this._options.enableLogs = (o = this._options.enableLogs) != null ? o : (i = this._options._experiments) == null ? void 0 : i.enableLogs, this._options.enableLogs && un(this, "afterCaptureLog", "flushLogs", Yi, Jn), ((u = (c = this._options.enableMetrics) != null ? c : (a = this._options._experiments) == null ? void 0 : a.enableMetrics) != null ? u : !0) && un(
      this,
      "afterCaptureMetric",
      "flushMetrics",
      Wi,
      Xn
    );
  }
  /**
   * Captures an exception event and sends it to Sentry.
   *
   * Unlike `captureException` exported from every SDK, this method requires that you pass it the current scope.
   */
  captureException(t, n, r) {
    const s = R();
    if (Le(t))
      return m && p.log(sn), s;
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
    }, r), o = de(t) ? t : String(t), a = In(t), c = a ? this.eventFromMessage(o, n, i) : this.eventFromException(t, i);
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
    if (n != null && n.originalException && Le(n.originalException))
      return m && p.log(sn), s;
    const i = l({
      event_id: s
    }, n), o = t.sdkProcessingMetadata || {}, a = o.capturedSpanScope, c = o.capturedSpanIsolationScope, u = ln(t.type);
    return this._process(
      () => this._captureEvent(t, i, a || r, c),
      u
    ), i.event_id;
  }
  /**
   * Captures a session.
   */
  captureSession(t) {
    this.sendSession(t), te(t, { init: !1 });
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
    return Z(this, null, function* () {
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
    return Z(this, null, function* () {
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
    qn(this, t, this._integrations), n || rn(this, [t]);
  }
  /**
   * Send a fully prepared event to Sentry.
   */
  sendEvent(t, n = {}) {
    this.emit("beforeSendEvent", t, n);
    let r = Bs(t, this._dsn, this._options._metadata, this._options.tunnel);
    for (const s of n.attachments || [])
      r = Ps(r, Ls(s));
    this.sendEnvelope(r).then((s) => this.emit("afterSendEvent", t, s));
  }
  /**
   * Send a session or session aggregrates to Sentry.
   */
  sendSession(t) {
    const { release: n, environment: r = me } = this._options;
    if ("aggregates" in t) {
      const i = t.attrs || {};
      if (!i.release && !n) {
        m && p.warn(on);
        return;
      }
      i.release = i.release || n, i.environment = i.environment || r, t.attrs = i;
    } else {
      if (!t.release && !n) {
        m && p.warn(on);
        return;
      }
      t.release = t.release || n, t.environment = t.environment || r;
    }
    this.emit("beforeSendSession", t);
    const s = Us(t, this._dsn, this._options._metadata, this._options.tunnel);
    this.sendEnvelope(s);
  }
  /**
   * Record on the client that an event got dropped (ie, an event that will not be sent to Sentry).
   */
  recordDroppedEvent(t, n, r = 1) {
    if (this._options.sendClientReports) {
      const s = `${t}:${n}`;
      m && p.log(`Recording outcome: "${s}"${r > 1 ? ` (${r} times)` : ""}`), this._outcomes[s] = (this._outcomes[s] || 0) + r;
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
    return Z(this, null, function* () {
      if (this.emit("beforeEnvelope", t), this._isEnabled() && this._transport)
        try {
          return yield this._transport.send(t);
        } catch (n) {
          return m && p.error("Error while sending envelope:", n), {};
        }
      return m && p.error("Transport disabled"), {};
    });
  }
  /* eslint-enable @typescript-eslint/unified-signatures */
  /** Setup integrations for this client. */
  _setupIntegrations() {
    const { integrations: t } = this._options;
    this._integrations = hi(this, t), rn(this, t);
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
    (o && t.errors === 0 || o && r) && (te(t, _(l({}, r && { status: "crashed" }), {
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
    return Z(this, null, function* () {
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
    return !n.integrations && (o != null && o.length) && (n.integrations = o), this.emit("preprocessEvent", t, n), t.type || s.setLastEventId(t.event_id || n.event_id), Xs(i, t, n, r, this, s).then((a) => {
      if (a === null)
        return a;
      this.emit("postprocessEvent", a, n), a.contexts = l({
        trace: Mn(r)
      }, a.contexts);
      const c = Hn(this, r);
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
  _captureEvent(t, n = {}, r = w(), s = A()) {
    return m && oe(t) && p.log(`Captured error event \`${er(t)[0] || "<unknown>"}\``), this._processEvent(t, n, r, s).then(
      (i) => i.event_id,
      (i) => {
        m && (cn(i) ? p.log(i.message) : an(i) ? p.warn(i.message) : p.warn(i));
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
    const i = this.getOptions(), { sampleRate: o } = i, a = sr(t), c = oe(t), d = `before send for type \`${t.type || "error"}\``, f = typeof o == "undefined" ? void 0 : Ln(o);
    if (c && typeof f == "number" && Math.random() > f)
      return this.recordDroppedEvent("sample_rate", "error"), ge(
        Vt(
          `Discarding event because it's not included in the random sample (sampling rate = ${o})`
        )
      );
    const g = ln(t.type);
    return this._prepareEvent(t, n, r, s).then((h) => {
      if (h === null)
        throw this.recordDroppedEvent("event_processor", g), Vt("An event processor returned `null`, will not send event.");
      if (n.data && n.data.__sentry__ === !0)
        return h;
      const b = zi(this, i, h, n);
      return Gi(b, d);
    }).then((h) => {
      var S;
      if (h === null) {
        if (this.recordDroppedEvent("before_send", g), a) {
          const k = 1 + (t.spans || []).length;
          this.recordDroppedEvent("before_send", "span", k);
        }
        throw Vt(`${d} returned \`null\`, will not send event.`);
      }
      const y = r.getSession() || s.getSession();
      if (c && y && this._updateSessionFromEvent(y, h), a) {
        const N = ((S = h.sdkProcessingMetadata) == null ? void 0 : S.spanCountBeforeProcessing) || 0, k = h.spans ? h.spans.length : 0, L = N - k;
        L > 0 && this.recordDroppedEvent("before_send", "span", L);
      }
      const b = h.transaction_info;
      if (a && b && h.transaction !== t.transaction) {
        const N = "custom";
        h.transaction_info = _(l({}, b), {
          source: N
        });
      }
      return this.sendEvent(h, n), h;
    }).then(null, (h) => {
      throw cn(h) || an(h) ? h : (this.captureException(h, {
        mechanism: {
          handled: !1,
          type: "internal"
        },
        data: {
          __sentry__: !0
        },
        originalException: h
      }), Tt(
        `Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.
Reason: ${h}`
      ));
    });
  }
  /**
   * Occupies the client with processing and event
   */
  _process(t, n) {
    this._numProcessing++, this._promiseBuffer.add(t).then(
      (r) => (this._numProcessing--, r),
      (r) => (this._numProcessing--, r === Se && this.recordDroppedEvent("queue_overflow", n), r)
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
    m && p.log("Flushing outcomes...");
    const t = this._clearOutcomes();
    if (t.length === 0) {
      m && p.log("No outcomes to send");
      return;
    }
    if (!this._dsn) {
      m && p.log("No dsn provided, will not send outcomes");
      return;
    }
    m && p.log("Sending outcomes:", t);
    const n = Fi(t, this._options.tunnel && ft(this._dsn));
    this.sendEnvelope(n);
  }
  /**
   * Creates an {@link Event} from all inputs to `captureException` and non-primitive inputs to `captureMessage`.
   */
}
function ln(e) {
  return e === "replay_event" ? "replay" : e || "error";
}
function Gi(e, t) {
  const n = `${t} must return \`null\` or a valid event.`;
  if (lt(e))
    return e.then(
      (r) => {
        if (!ot(r) && r !== null)
          throw Tt(n);
        return r;
      },
      (r) => {
        throw Tt(`${t} rejected with ${r}`);
      }
    );
  if (!ot(e) && e !== null)
    throw Tt(n);
  return e;
}
function zi(e, t, n, r) {
  const { beforeSend: s, beforeSendTransaction: i, beforeSendSpan: o, ignoreSpans: a } = t;
  let c = n;
  if (oe(c) && s)
    return s(c, r);
  if (sr(c)) {
    if (o || a) {
      const u = ji(c);
      if (a != null && a.length && Ye(u, a))
        return null;
      if (o) {
        const d = o(u);
        d ? c = dt(n, Ui(d)) : ze();
      }
      if (c.spans) {
        const d = [], f = c.spans;
        for (const h of f) {
          if (a != null && a.length && Ye(h, a)) {
            Ns(f, h);
            continue;
          }
          if (o) {
            const y = o(h);
            y ? d.push(y) : (ze(), d.push(h));
          } else
            d.push(h);
        }
        const g = c.spans.length - d.length;
        g && e.recordDroppedEvent("before_send", "span", g), c.spans = d;
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
function oe(e) {
  return e.type === void 0;
}
function sr(e) {
  return e.type === "transaction";
}
function Wi(e) {
  let t = 0;
  return e.name && (t += e.name.length * 2), t += 8, t + ir(e.attributes);
}
function Yi(e) {
  let t = 0;
  return e.message && (t += e.message.length * 2), t + ir(e.attributes);
}
function ir(e) {
  if (!e)
    return 0;
  let t = 0;
  return Object.values(e).forEach((n) => {
    Array.isArray(n) ? t += n.length * dn(n[0]) : In(n) ? t += dn(n) : t += 100;
  }), t;
}
function dn(e) {
  return typeof e == "string" ? e.length * 2 : typeof e == "number" ? 8 : typeof e == "boolean" ? 4 : 0;
}
function qi(e, t) {
  t.debug === !0 && (m ? p.enable() : q(() => {
    console.warn("[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle.");
  })), w().update(t.initialScope);
  const r = new e(t);
  return Ki(r), r.init(), r;
}
function Ki(e) {
  w().setClient(e);
}
function Ji(e, ...t) {
  const n = new String(String.raw(e, ...t));
  return n.__sentry_template_string__ = e.join("\0").replace(/%/g, "%%").replace(/\0/g, "%s"), n.__sentry_template_values__ = t, n;
}
const Vi = Ji;
function Xi(e, t, n = [t], r = "npm") {
  const s = e._metadata || {};
  s.sdk || (s.sdk = {
    name: `sentry.javascript.${t}`,
    packages: n.map((i) => ({
      name: `${r}:@sentry/${i}`,
      version: j
    })),
    version: j
  }), e._metadata = s;
}
const Zi = 100;
function fa(e, t) {
  const n = v(), r = A();
  if (!n) return;
  const { beforeBreadcrumb: s = null, maxBreadcrumbs: i = Zi } = n.getOptions();
  if (i <= 0) return;
  const o = O(), a = l({ timestamp: o }, e), c = s ? q(() => s(a, t)) : a;
  c !== null && (n.emit && n.emit("beforeAddBreadcrumb", c, t), r.addBreadcrumb(c, i));
}
let fn;
const Qi = "FunctionToString", pn = /* @__PURE__ */ new WeakMap(), to = (() => ({
  name: Qi,
  setupOnce() {
    fn = Function.prototype.toString;
    try {
      Function.prototype.toString = function(...e) {
        const t = Nn(this), n = pn.has(v()) && t !== void 0 ? t : this;
        return fn.apply(n, e);
      };
    } catch (e) {
    }
  },
  setup(e) {
    pn.set(e, !0);
  }
})), eo = to, no = [
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
], ro = "EventFilters", so = (e = {}) => {
  let t;
  return {
    name: ro,
    setup(n) {
      const r = n.getOptions();
      t = hn(e, r);
    },
    processEvent(n, r, s) {
      if (!t) {
        const i = s.getOptions();
        t = hn(e, i);
      }
      return oo(n, t) ? null : n;
    }
  };
}, io = ((e = {}) => _(l({}, so(e)), {
  name: "InboundFilters"
}));
function hn(e = {}, t = {}) {
  return {
    allowUrls: [...e.allowUrls || [], ...t.allowUrls || []],
    denyUrls: [...e.denyUrls || [], ...t.denyUrls || []],
    ignoreErrors: [
      ...e.ignoreErrors || [],
      ...t.ignoreErrors || [],
      ...e.disableErrorDefaults ? [] : no
    ],
    ignoreTransactions: [...e.ignoreTransactions || [], ...t.ignoreTransactions || []]
  };
}
function oo(e, t) {
  if (e.type) {
    if (e.type === "transaction" && co(e, t.ignoreTransactions))
      return m && p.warn(
        `Event dropped due to being matched by \`ignoreTransactions\` option.
Event: ${U(e)}`
      ), !0;
  } else {
    if (ao(e, t.ignoreErrors))
      return m && p.warn(
        `Event dropped due to being matched by \`ignoreErrors\` option.
Event: ${U(e)}`
      ), !0;
    if (po(e))
      return m && p.warn(
        `Event dropped due to not having an error message, error type or stacktrace.
Event: ${U(
          e
        )}`
      ), !0;
    if (uo(e, t.denyUrls))
      return m && p.warn(
        `Event dropped due to being matched by \`denyUrls\` option.
Event: ${U(
          e
        )}.
Url: ${Nt(e)}`
      ), !0;
    if (!lo(e, t.allowUrls))
      return m && p.warn(
        `Event dropped due to not being matched by \`allowUrls\` option.
Event: ${U(
          e
        )}.
Url: ${Nt(e)}`
      ), !0;
  }
  return !1;
}
function ao(e, t) {
  return t != null && t.length ? er(e).some((n) => jt(n, t)) : !1;
}
function co(e, t) {
  if (!(t != null && t.length))
    return !1;
  const n = e.transaction;
  return n ? jt(n, t) : !1;
}
function uo(e, t) {
  if (!(t != null && t.length))
    return !1;
  const n = Nt(e);
  return n ? jt(n, t) : !1;
}
function lo(e, t) {
  if (!(t != null && t.length))
    return !0;
  const n = Nt(e);
  return n ? jt(n, t) : !0;
}
function fo(e = []) {
  for (let t = e.length - 1; t >= 0; t--) {
    const n = e[t];
    if (n && n.filename !== "<anonymous>" && n.filename !== "[native code]")
      return n.filename || null;
  }
  return null;
}
function Nt(e) {
  var t, n, r;
  try {
    const s = [...(n = (t = e.exception) == null ? void 0 : t.values) != null ? n : []].reverse().find((o) => {
      var a, c, u;
      return ((a = o.mechanism) == null ? void 0 : a.parent_id) === void 0 && ((u = (c = o.stacktrace) == null ? void 0 : c.frames) == null ? void 0 : u.length);
    }), i = (r = s == null ? void 0 : s.stacktrace) == null ? void 0 : r.frames;
    return i ? fo(i) : null;
  } catch (s) {
    return m && p.error(`Cannot extract url for event ${U(e)}`), null;
  }
}
function po(e) {
  var t, n;
  return (n = (t = e.exception) == null ? void 0 : t.values) != null && n.length ? (
    // No top-level message
    !e.message && // There are no exception values that have a stacktrace, a non-generic-Error type or value
    !e.exception.values.some((r) => r.stacktrace || r.type && r.type !== "Error" || r.value)
  ) : !1;
}
function V(e, t, n, r, s) {
  Ei({ level: e, message: t, attributes: n, severityNumber: s }, r);
}
function ho(e, t, { scope: n } = {}) {
  V("trace", e, t, n);
}
function mo(e, t, { scope: n } = {}) {
  V("debug", e, t, n);
}
function go(e, t, { scope: n } = {}) {
  V("info", e, t, n);
}
function _o(e, t, { scope: n } = {}) {
  V("warn", e, t, n);
}
function yo(e, t, { scope: n } = {}) {
  V("error", e, t, n);
}
function So(e, t, { scope: n } = {}) {
  V("fatal", e, t, n);
}
const pa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  debug: mo,
  error: yo,
  fatal: So,
  fmt: Vi,
  info: go,
  trace: ho,
  warn: _o
}, Symbol.toStringTag, { value: "Module" }));
function be(e, t, n, r) {
  wi(
    { type: e, name: t, value: n, unit: r == null ? void 0 : r.unit, attributes: r == null ? void 0 : r.attributes },
    { scope: r == null ? void 0 : r.scope }
  );
}
function bo(e, t = 1, n) {
  be("counter", e, t, n);
}
function Eo(e, t, n) {
  be("gauge", e, t, n);
}
function To(e, t, n) {
  be("distribution", e, t, n);
}
const ha = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  count: bo,
  distribution: To,
  gauge: Eo
}, Symbol.toStringTag, { value: "Module" }));
function ma(e) {
  const t = w();
  e(t);
}
const E = typeof __SENTRY_DEBUG__ == "undefined" ? !0 : __SENTRY_DEBUG__, mn = "finishReason", gn = ["heartbeatFailed", "idleTimeout", "documentHidden"];
let or;
function Io() {
  return or;
}
function kt(e) {
  or = e;
}
function et(e) {
  return e / 1e3;
}
function vo(e) {
  return e * 1e3;
}
class ar {
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
class Ee {
  /**
   * You should never call the constructor manually, always use `Sentry.startTransaction()`
   * or call `startChild()` on an existing span.
   * @internal
   * @hideconstructor
   * @hidden
   */
  constructor(t) {
    var n, r, s, i, o, a, c, u, d, f, g, h, y;
    if (this.name = "", this.traceId = R(), this.spanId = R().substring(16), this.startTimestamp = O(), this.tags = {}, this.data = {}, this.attributes = {}, this.instrumenter = "sentry", !t)
      return this;
    this.traceId = (n = t.traceId) != null ? n : this.traceId, this.spanId = (r = t.spanId) != null ? r : this.spanId, this.parentSpanId = (s = t.parentSpanId) != null ? s : this.parentSpanId, "sampled" in t && (this.sampled = t.sampled), this.op = (i = t.op) != null ? i : this.op, this.description = (a = (o = t.description) != null ? o : t.name) != null ? a : this.description, this.name = (u = (c = t.name) != null ? c : t.description) != null ? u : this.name, this.data = t.data ? l({}, t.data) : this.data, this.tags = t.tags ? l({}, t.tags) : this.tags, this.attributes = t.attributes ? l({}, t.attributes) : this.attributes, this.status = (d = t.status) != null ? d : this.status, this.startTimestamp = (f = t.startTimestamp) != null ? f : this.startTimestamp, this.endTimestamp = (g = t.endTimestamp) != null ? g : this.endTimestamp, this.instrumenter = (h = t.instrumenter) != null ? h : this.instrumenter, this.origin = (y = t.origin) != null ? y : this.origin;
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
    const n = new Ee(_(l({}, t), {
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
    const n = ko(t);
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
    this.finish(No(t));
  }
  /**
   * @inheritDoc
   */
  finish(t) {
    this.endTimestamp = typeof t == "number" ? t : O();
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
    return bt({
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
    return bt({
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
    return bt({
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
function No(e) {
  if (e === void 0)
    return O();
  if (Array.isArray(e) && e.length === 2) {
    const [t, n] = e;
    return t + n / 1e9;
  }
  return e instanceof Date ? e.getTime() / 1e3 : typeof e == "number" ? e > 1e12 ? et(e) : e : O();
}
function ko(e) {
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
class cr extends Ee {
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
    this.spanRecorder || (this.spanRecorder = new ar(t)), this.spanRecorder.add(this);
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
    if (this.name || (E && p.warn("Transaction has no name, falling back to `<unlabeled transaction>`."), this.name = "<unlabeled transaction>"), super.finish(t), this.sampled !== !0) {
      E && p.log("[Tracing] Discarding transaction because its trace was not chosen to be sampled.");
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
    return Object.keys(this._measurements).length > 0 && (E && p.log(
      "[Measurements] Adding measurements to transaction",
      JSON.stringify(this._measurements, void 0, 2)
    ), s.measurements = this._measurements), E && p.log(`[Tracing] Finishing ${this.op} transaction: ${this.name}.`), ci(s);
  }
  /**
   * @inheritDoc
   */
  toContext() {
    const t = super.toContext();
    return bt(_(l({}, t), {
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
const Ro = 1e3, Oo = 5e3;
class Ao extends ar {
  constructor(t, n, r = "", s) {
    super(s), this._pushActivity = t, this._popActivity = n, this.transactionSpanId = r;
  }
  /**
   * @inheritDoc
   */
  add(t) {
    t.spanId !== this.transactionSpanId && (t.finish = (n) => {
      t.endTimestamp = typeof n == "number" ? n : O(), this._popActivity(t.spanId);
    }, t.endTimestamp === void 0 && this._pushActivity(t.spanId)), super.add(t);
  }
}
class wo extends cr {
  constructor(t, n = Ro, r = !1) {
    super(t), this._idleTimeout = n, this._onScope = r, this.activities = {}, this._heartbeatCounter = 0, this._finished = !1, this._beforeFinishCallbacks = [], r && (E && p.log(`Setting idle transaction as active. Span ID: ${this.spanId}`), kt(this)), this._initTimeout = setTimeout(() => {
      this._finished || this.finish();
    }, this._idleTimeout);
  }
  /** {@inheritDoc} */
  finish(t = O()) {
    if (this._finished = !0, this.activities = {}, this.spanRecorder) {
      E && p.log("[Tracing] finishing IdleTransaction", new Date(t * 1e3).toISOString(), this.op);
      for (const n of this._beforeFinishCallbacks)
        n(this, t);
      this.spanRecorder.spans = this.spanRecorder.spans.filter((n) => {
        if (n.spanId === this.spanId)
          return !0;
        n.endTimestamp || (n.endTimestamp = t, n.setStatus("cancelled"), E && p.log("[Tracing] cancelling span since transaction ended early", JSON.stringify(n, void 0, 2)));
        const r = n.startTimestamp < t;
        return r || E && p.log(
          "[Tracing] discarding Span since it happened after Transaction was finished",
          JSON.stringify(n, void 0, 2)
        ), r;
      }), E && p.log("[Tracing] flushing IdleTransaction");
    } else
      E && p.log("[Tracing] No active IdleTransaction");
    return this._onScope && kt(void 0), super.finish(t);
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
      this.spanRecorder = new Ao(n, r, this.spanId, t), E && p.log("Starting heartbeat"), this._pingHeartbeat();
    }
    this.spanRecorder.add(this);
  }
  /**
   * Start tracking a specific activity.
   * @param spanId The span id that represents the activity
   */
  _pushActivity(t) {
    this._initTimeout && (clearTimeout(this._initTimeout), this._initTimeout = void 0), E && p.log(`[Tracing] pushActivity: ${t}`), this.activities[t] = !0, E && p.log("[Tracing] new activities count", Object.keys(this.activities).length);
  }
  /**
   * Remove an activity from usage
   * @param spanId The span id that represents the activity
   */
  _popActivity(t) {
    if (this.activities[t] && (E && p.log(`[Tracing] popActivity ${t}`), delete this.activities[t], E && p.log("[Tracing] new activities count", Object.keys(this.activities).length)), Object.keys(this.activities).length === 0) {
      const n = this._idleTimeout, r = O() + n / 1e3;
      setTimeout(() => {
        this._finished || (this.setTag(mn, gn[1]), this.finish(r));
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
    t === this._prevHeartbeatString ? this._heartbeatCounter += 1 : this._heartbeatCounter = 1, this._prevHeartbeatString = t, this._heartbeatCounter >= 3 ? (E && p.log("[Tracing] Transaction finished because of no change for 3 heart beats"), this.setStatus("deadline_exceeded"), this.setTag(mn, gn[0]), this.finish()) : this._pingHeartbeat();
  }
  /**
   * Pings the heartbeat
   */
  _pingHeartbeat() {
    E && p.log(`pinging Heartbeat -> current counter: ${this._heartbeatCounter}`), setTimeout(() => {
      this._beat();
    }, Oo);
  }
}
function ur(e, t, n) {
  const [r, s] = Hs(
    { tracesSampleRate: t.tracesSampleRate, tracesSampler: t.tracesSampler },
    n,
    Math.random()
  );
  return e.sampled = r, e.sampled ? (E && p.log(`[Tracing] starting ${e.op} transaction - ${e.name}`), e) : (E && p.log(
    `[Tracing] Discarding transaction because it's not included in the random sample (sampling rate = ${Number(
      s != null ? s : 0
    )})`
  ), e);
}
function ga(e, t) {
  const n = v(), r = n && n.getOptions && n.getOptions() || {}, s = e.name || e.op || "unknown-transaction", i = l({
    parentSampled: e.parentSampled,
    transactionContext: _(l({}, e), { name: s }),
    name: s
  }, t);
  let o = new cr(_(l({}, e), { name: s }));
  if (o = ur(o, r, i), o.sampled) {
    const a = r._experiments && r._experiments.maxSpans;
    o.initSpanRecorder(a), kt(o);
  }
  return o;
}
function Mo(e, t, n, r) {
  const s = v(), i = s && s.getOptions && s.getOptions() || {}, o = e.name || e.op || "unknown-transaction", a = l({
    parentSampled: e.parentSampled,
    transactionContext: _(l({}, e), { name: o }),
    name: o
  }, r);
  let c = new wo(_(l({}, e), { name: o }), t, n);
  if (c = ur(c, i, a), c.sampled) {
    const u = i._experiments && i._experiments.maxSpans;
    c.initSpanRecorder(u), kt(c);
  }
  return c;
}
const Do = "sentry.javascript.miniapp", _n = "10.27.0-rc.1", B = "?", Po = /^\s*at (?:(.*?) ?\()?((?:file|https?|blob|chrome-extension|address|native|eval|webpack|<anonymous>|[-a-z]+:|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i, Co = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:file|https?|blob|chrome|webpack|resource|moz-extension).*?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js))(?::(\d+))?(?::(\d+))?\s*$/i, xo = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i, Lo = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i, $o = /\((\S*)(?::(\d+))(?::(\d+))\)/, Fo = /^\s*at (.*?) ?\((\S*):(\d+):(\d+)\)/i;
function ct(e) {
  let t = null;
  const n = e && e.framesToPop;
  try {
    if (t = Uo(e), t)
      return yn(t, n);
  } catch (r) {
  }
  try {
    if (t = jo(e), t)
      return yn(t, n);
  } catch (r) {
  }
  return {
    message: Te(e),
    name: e && e.name,
    stack: [],
    failed: !0
  };
}
function jo(e) {
  if (!e || !e.stack)
    return null;
  const t = [], n = e.stack.split(`
`);
  let r, s, i, o;
  for (let a = 0; a < n.length; ++a) {
    if (i = Po.exec(n[a])) {
      const c = i[2] && i[2].indexOf("native") === 0;
      r = i[2] && i[2].indexOf("eval") === 0, r && (s = $o.exec(i[2])) && (i[2] = s[1], i[3] = s[2], i[4] = s[3]), o = {
        url: i[2],
        func: i[1] || B,
        args: c ? [i[2]] : [],
        line: i[3] ? +i[3] : null,
        column: i[4] ? +i[4] : null
      };
    } else if (i = xo.exec(n[a]))
      o = {
        url: i[2],
        func: i[1] || B,
        args: [],
        line: +i[3],
        column: i[4] ? +i[4] : null
      };
    else if (i = Co.exec(n[a]))
      r = i[3] && i[3].indexOf(" > eval") > -1, r && (s = Lo.exec(i[3])) ? (i[1] = i[1] || "eval", i[3] = s[1], i[4] = s[2], i[5] = "") : a === 0 && !i[5] && e.columnNumber !== void 0 && (t[0].column = e.columnNumber + 1), o = {
        url: i[3],
        func: i[1] || B,
        args: i[2] ? i[2].split(",") : [],
        line: i[4] ? +i[4] : null,
        column: i[5] ? +i[5] : null
      };
    else if (i = Fo.exec(n[a]))
      o = {
        url: i[2],
        func: i[1] || B,
        args: [],
        line: i[3] ? +i[3] : null,
        column: i[4] ? +i[4] : null
      };
    else
      continue;
    !o.func && o.line && (o.func = B), t.push(o);
  }
  return t.length ? {
    message: Te(e),
    name: e.name,
    stack: t
  } : null;
}
function Uo(e) {
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
    }), c && (!c.func && c.line && (c.func = B), i.push(c));
  }
  return i.length ? {
    message: Te(e),
    name: e.name,
    stack: i
  } : null;
}
function yn(e, t) {
  try {
    return _(l({}, e), {
      stack: e.stack.slice(t)
    });
  } catch (n) {
    return e;
  }
}
function Te(e) {
  const t = e && e.message;
  return t ? t.error && typeof t.error.message == "string" ? t.error.message : t : "No error message";
}
const Bo = 100;
function lr(e) {
  const t = Ie(e.stack), n = {
    type: e.name,
    value: e.message
  };
  return t && t.length && (n.stacktrace = { frames: t }), n.type === void 0 && n.value === "" && (n.value = "Unrecoverable error caught"), n;
}
function Ho(e, t, n) {
  const r = {
    exception: {
      values: [
        {
          type: fe(e) ? e.constructor.name : n ? "UnhandledRejection" : "Error",
          value: `Non-Error ${n ? "promise rejection" : "exception"} captured with keys: ${$r(e)}`
        }
      ]
    },
    extra: {
      __serialized__: zn(e)
    }
  };
  if (t) {
    const s = ct(t), i = Ie(s.stack);
    r.stacktrace = {
      frames: i
    };
  }
  return r;
}
function Sn(e) {
  return {
    exception: {
      values: [lr(e)]
    }
  };
}
function Ie(e) {
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
  ).slice(0, Bo).reverse();
}
function Go(e, t, n = {}) {
  let r;
  if (Rr(e) && e.error)
    return e = e.error, r = Sn(ct(e)), r;
  if (Pe(e) || Or(e)) {
    const s = e, i = s.name || (Pe(s) ? "DOMError" : "DOMException"), o = s.message ? `${i}: ${s.message}` : i;
    return r = ae(o, t, n), Qt(r, o), r;
  }
  return Tn(e) ? (r = Sn(ct(e)), r) : ot(e) || fe(e) ? (r = Ho(e, t, n.rejection), vt(r, {
    synthetic: !0
  }), r) : (r = ae(e, t, n), Qt(r, `${e}`), vt(r, {
    synthetic: !0
  }), r);
}
function ae(e, t, n = {}) {
  const r = {
    message: e
  };
  if (n.attachStacktrace && t) {
    const s = ct(t), i = Ie(s.stack);
    r.stacktrace = {
      frames: i
    };
  }
  return r;
}
const zo = () => {
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
}, Wo = () => {
  let e = "unknown";
  return typeof wx == "object" ? e = "wechat" : typeof my == "object" ? e = "alipay" : typeof tt == "object" ? e = "bytedance" : typeof dd == "object" ? e = "dingtalk" : typeof qq == "object" ? e = "qq" : typeof swan == "object" && (e = "swan"), e;
}, T = zo(), dr = Wo(), Yo = "application/json";
function ve(e) {
  function t(n) {
    return new z((r, s) => {
      const i = T.request || T.httpRequest;
      if (typeof i != "function") {
        s(new Error("Miniapp request function is not available"));
        return;
      }
      i({
        url: e.url,
        method: "POST",
        data: n.body,
        header: { "content-type": Yo },
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
  return $i(e, t);
}
const _a = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  makeMiniappTransport: ve
}, Symbol.toStringTag, { value: "Module" })), qo = () => [];
class Ko extends Hi {
  /**
   * Creates a new Miniapp SDK instance.
   *
   * @param options Configuration options for this SDK.
   */
  constructor(t = {}) {
    const n = t.transport || ve, r = t.stackParser || qo, s = t.integrations || t.defaultIntegrations || [], i = _(l({}, t), {
      transport: n,
      stackParser: r,
      integrations: s,
      dsn: t.dsn,
      // ensure defaults for required fields
      tracesSampleRate: t.tracesSampleRate
    });
    Xi(i, "miniapp", ["miniapp"]), super(i);
  }
  /**
   * @inheritDoc
   */
  _prepareEvent(t, n, r, s) {
    return t.platform = t.platform || "javascript", t.sdk = _(l({}, t.sdk), {
      name: Do,
      packages: [
        ...t.sdk && t.sdk.packages || [],
        {
          name: "npm:@sentry/miniapp",
          version: _n
        }
      ],
      version: _n
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
    const r = n && n.syntheticException ? n.syntheticException : void 0, s = Go(t, r, {
      attachStacktrace: this._options.attachStacktrace
    });
    return n && n.event_id && (s.event_id = n.event_id), Promise.resolve(s);
  }
  /**
   * @inheritDoc
   */
  // eslint-disable-next-line deprecation/deprecation
  eventFromMessage(t, n = "info", r) {
    const s = r && r.syntheticException ? r.syntheticException : void 0, i = ae(String(t), s, {
      attachStacktrace: this._options.attachStacktrace
    });
    return i.level = n, r && r.event_id && (i.event_id = r.event_id), Promise.resolve(i);
  }
}
function Jo() {
  setTimeout(() => {
  });
}
function H(e, t = {}, n) {
  if (typeof e != "function")
    return e;
  try {
    const s = e.__sentry_wrapped__;
    if (s)
      return s;
    if (Nn(e))
      return e;
  } catch (s) {
    return e;
  }
  const r = function(...s) {
    try {
      const i = s.map((o) => H(o, t));
      return e.handleEvent ? e.handleEvent.apply(this, i) : e.apply(this, i);
    } catch (i) {
      throw Jo(), wn((o) => {
        o.addEventProcessor((a) => {
          const c = l({}, a);
          return t.mechanism && (Qt(c, void 0), vt(c, t.mechanism)), c.extra = _(l({}, c.extra), {
            arguments: D(s, 3)
          }), c;
        }), ie(i);
      }), i;
    }
  };
  try {
    for (const s in e)
      Object.prototype.hasOwnProperty.call(e, s) && (r[s] = e[s]);
  } catch (s) {
  }
  vn(r, e), Ft(e, "__sentry_wrapped__", r);
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
const Pt = class Pt {
  /** JSDoc */
  constructor(t) {
    this.name = Pt.id, this._onErrorHandlerInstalled = !1, this._onUnhandledRejectionHandlerInstalled = !1, this._onPageNotFoundHandlerInstalled = !1, this._onMemoryWarningHandlerInstalled = !1, this._options = l({
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
    Error.stackTraceLimit = 50, this._options.onerror && (p.log("Global Handler attached: onError"), this._installGlobalOnErrorHandler()), this._options.onunhandledrejection && (p.log("Global Handler attached: onunhandledrejection"), this._installGlobalOnUnhandledRejectionHandler()), this._options.onpagenotfound && (p.log("Global Handler attached: onPageNotFound"), this._installGlobalOnPageNotFoundHandler()), this._options.onmemorywarning && (p.log("Global Handler attached: onMemoryWarning"), this._installGlobalOnMemoryWarningHandler());
  }
  /** JSDoc */
  _installGlobalOnErrorHandler() {
    this._onErrorHandlerInstalled || (T.onError && T.onError((t) => {
      const n = typeof t == "string" ? new Error(t) : t;
      ie(n);
    }), this._onErrorHandlerInstalled = !0);
  }
  /** JSDoc */
  _installGlobalOnUnhandledRejectionHandler() {
    this._onUnhandledRejectionHandlerInstalled || (T.onUnhandledRejection && T.onUnhandledRejection(
      ({ reason: t, promise: n }) => {
        const r = typeof t == "string" ? new Error(t) : t;
        ie(r, {
          data: n
        });
      }
    ), this._onUnhandledRejectionHandlerInstalled = !0);
  }
  /** JSDoc */
  _installGlobalOnPageNotFoundHandler() {
    this._onPageNotFoundHandlerInstalled || (T.onPageNotFound && T.onPageNotFound((t) => {
      const n = t.path.split("?")[0];
      en("pagenotfound", n), tn("message", JSON.stringify(t)), Qe(`页面无法找到: ${n}`);
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
      en("memory-warning", String(t)), tn("message", n), Qe("内存不足告警");
    }), this._onMemoryWarningHandlerInstalled = !0);
  }
};
Pt.id = "GlobalHandlers";
let Rt = Pt;
const Ct = class Ct {
  constructor() {
    this._ignoreOnError = 0, this.name = Ct.id;
  }
  /** JSDoc */
  _wrapTimeFunction(t) {
    return function(...n) {
      const r = n[0];
      return n[0] = H(r, {
        mechanism: {
          data: { function: St(t) },
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
        H(n, {
          mechanism: {
            data: {
              function: "requestAnimationFrame",
              handler: St(t)
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
    const n = I, r = n[t] && n[t].prototype;
    !r || !r.hasOwnProperty || !r.hasOwnProperty("addEventListener") || (Q(r, "addEventListener", function(s) {
      return function(i, o, a) {
        try {
          typeof o.handleEvent == "function" && (o.handleEvent = H(o.handleEvent.bind(o), {
            mechanism: {
              data: {
                function: "handleEvent",
                handler: St(o),
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
          H(o, {
            mechanism: {
              data: {
                function: "addEventListener",
                handler: St(o),
                target: t
              },
              handled: !0,
              type: "instrument"
            }
          }),
          a
        );
      };
    }), Q(r, "removeEventListener", function(s) {
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
    const t = I;
    Q(t, "setTimeout", this._wrapTimeFunction.bind(this)), Q(t, "setInterval", this._wrapTimeFunction.bind(this)), Q(t, "requestAnimationFrame", this._wrapRAF.bind(this)), [
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
Ct.id = "TryCatch";
let Ot = Ct;
function St(e) {
  try {
    return e && e.name || "<anonymous>";
  } catch (t) {
    return "<anonymous>";
  }
}
const Vo = "cause", Xo = 5, nt = class nt {
  /**
   * @inheritDoc
   */
  constructor(t = {}) {
    this.name = nt.id, this._key = t.key || Vo, this._limit = t.limit || Xo;
  }
  /**
   * @inheritDoc
   */
  setupOnce() {
    Gt((t, n) => {
      const r = v(), s = r && r.getIntegrationByName(nt.id);
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
    const s = ct(t[n]), i = lr(s);
    return this._walkErrorTree(t[n], n, [i, ...r]);
  }
};
nt.id = "LinkedErrors";
let At = nt;
const rt = class rt {
  constructor() {
    this.name = rt.id;
  }
  /**
   * @inheritDoc
   */
  setupOnce() {
    Gt((t) => {
      const n = v();
      if (n && n.getIntegrationByName(rt.id))
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
            pixelRatio: g,
            platform: h,
            screenHeight: y,
            screenWidth: b,
            // statusBarHeight,
            system: S,
            version: N,
            // windowHeight,
            // windowWidth,
            app: k,
            // 支付宝小程序
            appName: L
            // 字节跳动小程序
            // fontSizeSetting, // 支付宝小程序、 钉钉小程序、微信小程序
          } = s, [X, pt] = S.split(" "), zt = _(l({}, t.tags), {
            SDKVersion: i
          }), ht = k || L || dr || "app";
          return _(l({}, t), {
            tags: zt,
            contexts: _(l({}, t.contexts), {
              device: {
                brand: u,
                battery_level: o || a || c,
                model: f,
                language: d,
                platform: h,
                screen_dpi: g,
                screen_height: y,
                screen_width: b
              },
              os: {
                name: X || S,
                version: pt || S
              },
              browser: {
                name: ht,
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
rt.id = "System";
let wt = rt;
const st = class st {
  /**
   * @inheritDoc
   */
  constructor(t) {
    this.name = st.id, this._options = l({
      enable: !0
    }, t);
  }
  /**
   * @inheritDoc
   */
  setupOnce() {
    Gt((t) => {
      const n = v();
      if (n && n.getIntegrationByName(st.id) && this._options.enable)
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
st.id = "Router";
let Mt = st;
const it = class it {
  constructor() {
    this.name = it.id;
  }
  /**
   * @inheritDoc
   */
  setupOnce() {
    Gt((t) => {
      const n = v();
      return n && n.getIntegrationByName(it.id) && dr === "wechat" && T.getLaunchOptionsSync && T.getLaunchOptionsSync().scene === 1129 ? null : t;
    });
  }
};
it.id = "IgnoreMpcrawlerErrors";
let Dt = it;
const ya = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GlobalHandlers: Rt,
  IgnoreMpcrawlerErrors: Dt,
  LinkedErrors: At,
  Router: Mt,
  System: wt,
  TryCatch: Ot
}, Symbol.toStringTag, { value: "Module" })), Zo = 1e12;
class Qo {
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
      return et(t.timeOrigin);
    const r = typeof t.now == "function" ? t.now() : void 0;
    return typeof r == "number" ? et(Date.now() - r) : n.startTimestamp;
  }
  _handleEntry(t, n) {
    if (t.endTimestamp !== void 0) {
      this._stopObserver();
      return;
    }
    const r = this._toTimestamp(n.startTime, t.startTimestamp), s = this._toTimestamp(n.startTime + n.duration, t.startTimestamp);
    ta(t, {
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
    return t > Zo ? et(t) : ((s = this._timeOrigin) != null ? s : n) + et(t);
  }
  _stopObserver(t) {
    var n;
    (n = this._observer) == null || n.disconnect(), this._observer = void 0, t && !t.endTimestamp && t.finish();
  }
}
function ta(e, r) {
  var s = r, { startTimestamp: t } = s, n = Yt(s, ["startTimestamp"]);
  return t && e.startTimestamp > t && (e.startTimestamp = t), e.startChild(l({
    startTimestamp: t
  }, n));
}
function ea(e, t = !0, n = !0) {
  const r = I, s = T.onAppRoute || r.wx && r.wx.onAppRoute;
  if (typeof s != "function")
    return;
  let i = !1, o;
  const a = (u, d) => {
    (d && t || !d && n) && (o && typeof o.finish == "function" && o.finish(), o = e(u));
  }, c = (u, d = !1) => {
    const f = (u == null ? void 0 : u.path) || (u == null ? void 0 : u.route) || (u == null ? void 0 : u.url) || "", g = typeof f == "string" && f.length > 0 ? f : "unknown-route";
    a(
      {
        name: g,
        op: "navigation",
        description: (u == null ? void 0 : u.openType) || (u == null ? void 0 : u.event) || void 0,
        metadata: { requestPath: g }
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
const na = {
  traceRequest: !0
}, ra = 600, sa = l({
  idleTimeout: 5e3,
  startTransactionOnLocationChange: !0,
  startTransactionOnPageLoad: !0,
  maxTransactionDuration: ra,
  routingInstrumentation: ea
}, na), xt = class xt {
  constructor(t) {
    this.name = xt.id, this._configuredIdleTimeout = t == null ? void 0 : t.idleTimeout, this.options = l(l({}, sa), t);
    const { _metricOptions: n } = this.options;
    this._metrics = new Qo(n && n._reportAllChanges);
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
      const i = Io();
      i == null || i.finish();
    });
  }
  /** Create routing idle transaction. */
  _createRouteTransaction(t) {
    var c;
    const { beforeNavigate: n, idleTimeout: r, maxTransactionDuration: s } = this.options, i = _(l({}, t), {
      trimEnd: !0
    }), o = typeof n == "function" ? n(i) : i;
    if (o === void 0)
      return;
    const a = Mo(o, r, !0, {});
    return a.registerBeforeFinishCallback((u, d) => {
      ia(vo(s), u, d);
    }), a.setTag("idleTimeout", (c = this._configuredIdleTimeout) != null ? c : r), this._metrics.addPerformanceEntries(a), a;
  }
};
xt.id = "MiniAppTracing";
let ce = xt;
function ia(e, t, n) {
  const r = n - t.startTimestamp;
  n && (r > e || r < 0) && (t.setStatus("deadline_exceeded"), t.setTag("maxTransactionDurationExceeded", "true"));
}
const oa = [
  io(),
  eo(),
  new Ot(),
  new Rt(),
  new At(),
  new wt(),
  new Mt(),
  new Dt(),
  new ce()
];
function Sa(e = {}) {
  e.defaultIntegrations === void 0 && (e.defaultIntegrations = oa), e.normalizeDepth = e.normalizeDepth || 5;
  const t = l({
    integrations: e.integrations || e.defaultIntegrations || [],
    stackParser: e.stackParser || (() => []),
    transport: e.transport || ve
  }, e);
  qi(Ko, t);
}
function ba(e = {}) {
  e.eventId || (e.eventId = Yn());
  const t = v();
  t && t.showReportDialog(e);
}
function Ea() {
  return Yn();
}
function Ta(e) {
  const t = v();
  return t ? t.flush(e) : Ht(!1);
}
function Ia(e) {
  const t = v();
  return t ? t.close(e) : Ht(!1);
}
function va(e) {
  return H(e)();
}
export {
  ya as Integrations,
  Ko as MiniappClient,
  Do as SDK_NAME,
  _n as SDK_VERSION,
  _a as Transports,
  fa as addBreadcrumb,
  Gt as addEventProcessor,
  ci as captureEvent,
  ie as captureException,
  Qe as captureMessage,
  Ia as close,
  ma as configureScope,
  oa as defaultIntegrations,
  Ta as flush,
  w as getCurrentScope,
  Sa as init,
  Ea as lastEventId,
  pa as logger,
  ha as metrics,
  ca as setContext,
  tn as setExtra,
  ua as setExtras,
  en as setTag,
  la as setTags,
  da as setUser,
  ba as showReportDialog,
  ga as startTransaction,
  wn as withScope,
  va as wrap
};
