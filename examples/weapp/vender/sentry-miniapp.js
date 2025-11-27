var zn = Object.defineProperty, qn = Object.defineProperties;
var Yn = Object.getOwnPropertyDescriptors;
var it = Object.getOwnPropertySymbols;
var ce = Object.prototype.hasOwnProperty, ue = Object.prototype.propertyIsEnumerable;
var ae = (e, t, n) => t in e ? zn(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, u = (e, t) => {
  for (var n in t || (t = {}))
    ce.call(t, n) && ae(e, n, t[n]);
  if (it)
    for (var n of it(t))
      ue.call(t, n) && ae(e, n, t[n]);
  return e;
}, _ = (e, t) => qn(e, Yn(t));
var Mt = (e, t) => {
  var n = {};
  for (var r in e)
    ce.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && it)
    for (var r of it(e))
      t.indexOf(r) < 0 && ue.call(e, r) && (n[r] = e[r]);
  return n;
};
var W = (e, t, n) => new Promise((r, s) => {
  var i = (c) => {
    try {
      a(n.next(c));
    } catch (l) {
      s(l);
    }
  }, o = (c) => {
    try {
      a(n.throw(c));
    } catch (l) {
      s(l);
    }
  }, a = (c) => c.done ? r(c.value) : Promise.resolve(c.value).then(i, o);
  a((n = n.apply(e, t)).next());
});
const le = (
  // eslint-disable-next-line no-undef
  typeof globalThis != "undefined" && globalThis || // eslint-disable-next-line no-undef
  typeof self != "undefined" && self || // eslint-disable-next-line no-undef
  typeof window != "undefined" && window || // eslint-disable-next-line no-undef
  typeof global != "undefined" && global || {}
);
class Kn {
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
le.URLSearchParams || (le.URLSearchParams = Kn);
const m = typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__, T = globalThis, C = "10.27.0";
function kt() {
  return Nt(T), T;
}
function Nt(e) {
  const t = e.__SENTRY__ = e.__SENTRY__ || {};
  return t.version = t.version || C, t[C] = t[C] || {};
}
function B(e, t, n = T) {
  const r = n.__SENTRY__ = n.__SENTRY__ || {}, s = r[C] = r[C] || {};
  return s[e] || (s[e] = t());
}
const Jn = "Sentry Logger ", de = {};
function Q(e) {
  if (!("console" in T))
    return e();
  const t = T.console, n = {}, r = Object.keys(de);
  r.forEach((s) => {
    const i = de[s];
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
function Vn() {
  Vt().enabled = !0;
}
function Xn() {
  Vt().enabled = !1;
}
function tn() {
  return Vt().enabled;
}
function Zn(...e) {
  Jt("log", ...e);
}
function Qn(...e) {
  Jt("warn", ...e);
}
function tr(...e) {
  Jt("error", ...e);
}
function Jt(e, ...t) {
  m && tn() && Q(() => {
    T.console[e](`${Jn}[${e}]:`, ...t);
  });
}
function Vt() {
  return m ? B("loggerSettings", () => ({ enabled: !1 })) : { enabled: !1 };
}
const p = {
  /** Enable logging. */
  enable: Vn,
  /** Disable logging. */
  disable: Xn,
  /** Check if logging is enabled. */
  isEnabled: tn,
  /** Log a message. */
  log: Zn,
  /** Log a warning. */
  warn: Qn,
  /** Log an error. */
  error: tr
}, Pt = "<anonymous>";
function er(e) {
  try {
    return !e || typeof e != "function" ? Pt : e.name || Pt;
  } catch (t) {
    return Pt;
  }
}
function nr(e) {
  return "__v_isVNode" in e && e.__v_isVNode ? "[VueVNode]" : "[VueViewModel]";
}
const en = Object.prototype.toString;
function nn(e) {
  switch (en.call(e)) {
    case "[object Error]":
    case "[object Exception]":
    case "[object DOMException]":
    case "[object WebAssembly.Exception]":
      return !0;
    default:
      return Rt(e, Error);
  }
}
function H(e, t) {
  return en.call(e) === `[object ${t}]`;
}
function rr(e) {
  return H(e, "ErrorEvent");
}
function pe(e) {
  return H(e, "DOMError");
}
function sr(e) {
  return H(e, "DOMException");
}
function pt(e) {
  return H(e, "String");
}
function rn(e) {
  return typeof e == "object" && e !== null && "__sentry_template_string__" in e && "__sentry_template_values__" in e;
}
function sn(e) {
  return e === null || rn(e) || typeof e != "object" && typeof e != "function";
}
function X(e) {
  return H(e, "Object");
}
function Xt(e) {
  return typeof Event != "undefined" && Rt(e, Event);
}
function ir(e) {
  return typeof Element != "undefined" && Rt(e, Element);
}
function or(e) {
  return H(e, "RegExp");
}
function et(e) {
  return !!(e != null && e.then && typeof e.then == "function");
}
function ar(e) {
  return X(e) && "nativeEvent" in e && "preventDefault" in e && "stopPropagation" in e;
}
function Rt(e, t) {
  try {
    return e instanceof t;
  } catch (n) {
    return !1;
  }
}
function cr(e) {
  return !!(typeof e == "object" && e !== null && (e.__isVue || e._isVue || e.__v_isVNode));
}
const ur = T, lr = 80;
function dr(e, t = {}) {
  if (!e)
    return "<unknown>";
  try {
    let n = e;
    const r = 5, s = [];
    let i = 0, o = 0;
    const a = " > ", c = a.length;
    let l;
    const d = Array.isArray(t) ? t : t.keyAttrs, f = !Array.isArray(t) && t.maxStringLength || lr;
    for (; n && i++ < r && (l = pr(n, d), !(l === "html" || i > 1 && o + s.length * c + l.length >= f)); )
      s.push(l), o += l.length, n = n.parentNode;
    return s.reverse().join(a);
  } catch (n) {
    return "<unknown>";
  }
}
function pr(e, t) {
  const n = e, r = [];
  if (!(n != null && n.tagName))
    return "";
  if (ur.HTMLElement && n instanceof HTMLElement && n.dataset) {
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
    if (o && pt(o)) {
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
function z(e, t, n) {
  if (!(t in e))
    return;
  const r = e[t];
  if (typeof r != "function")
    return;
  const s = n(r);
  typeof s == "function" && on(s, r);
  try {
    e[t] = s;
  } catch (i) {
    m && p.log(`Failed to replace method "${t}" in object`, e);
  }
}
function Ot(e, t, n) {
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
function on(e, t) {
  try {
    const n = t.prototype || {};
    e.prototype = t.prototype = n, Ot(e, "__sentry_original__", t);
  } catch (n) {
  }
}
function an(e) {
  return e.__sentry_original__;
}
function cn(e) {
  if (nn(e))
    return u({
      message: e.message,
      name: e.name,
      stack: e.stack
    }, he(e));
  if (Xt(e)) {
    const t = u({
      type: e.type,
      target: fe(e.target),
      currentTarget: fe(e.currentTarget)
    }, he(e));
    return typeof CustomEvent != "undefined" && Rt(e, CustomEvent) && (t.detail = e.detail), t;
  } else
    return e;
}
function fe(e) {
  try {
    return ir(e) ? dr(e) : Object.prototype.toString.call(e);
  } catch (t) {
    return "<unknown>";
  }
}
function he(e) {
  if (typeof e == "object" && e !== null) {
    const t = {};
    for (const n in e)
      Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    return t;
  } else
    return {};
}
function fr(e) {
  const t = Object.keys(cn(e));
  return t.sort(), t[0] ? t.join(", ") : "[object has no keys]";
}
function ut(e) {
  return Ft(e, /* @__PURE__ */ new Map());
}
function Ft(e, t) {
  if (e === null || typeof e != "object")
    return e;
  const n = t.get(e);
  if (n !== void 0)
    return n;
  if (Array.isArray(e)) {
    const r = [];
    return t.set(e, r), e.forEach((s) => {
      r.push(Ft(s, t));
    }), r;
  }
  if (hr(e)) {
    const r = {};
    return t.set(e, r), Object.keys(e).forEach((i) => {
      const o = e[i];
      o !== void 0 && (r[i] = Ft(o, t));
    }), r;
  }
  return e;
}
function hr(e) {
  const t = e.constructor;
  return t === Object || t === void 0;
}
function Lt(e, t = 0) {
  return typeof e != "string" || t === 0 || e.length <= t ? e : `${e.slice(0, t)}...`;
}
function lt(e, t, n = !1) {
  return pt(e) ? or(t) ? t.test(e) : pt(t) ? n ? e === t : e.includes(t) : !1 : !1;
}
function wt(e, t = [], n = !1) {
  return t.some((r) => lt(e, r, n));
}
function mr() {
  const e = T;
  return e.crypto || e.msCrypto;
}
let xt;
function gr() {
  return Math.random() * 16;
}
function v(e = mr()) {
  try {
    if (e != null && e.randomUUID)
      return e.randomUUID().replace(/-/g, "");
  } catch (t) {
  }
  return xt || (xt = "10000000100040008000" + 1e11), xt.replace(
    /[018]/g,
    (t) => (
      // eslint-disable-next-line no-bitwise
      (t ^ (gr() & 15) >> t / 4).toString(16)
    )
  );
}
function un(e) {
  var t, n;
  return (n = (t = e.exception) == null ? void 0 : t.values) == null ? void 0 : n[0];
}
function $(e) {
  const { message: t, event_id: n } = e;
  if (t)
    return t;
  const r = un(e);
  return r ? r.type && r.value ? `${r.type}: ${r.value}` : r.type || r.value || n || "<unknown>" : n || "<unknown>";
}
function jt(e, t, n) {
  const r = e.exception = e.exception || {}, s = r.values = r.values || [], i = s[0] = s[0] || {};
  i.value || (i.value = t || ""), i.type || (i.type = "Error");
}
function ft(e, t) {
  const n = un(e);
  if (!n)
    return;
  const r = { type: "generic", handled: !0 }, s = n.mechanism;
  if (n.mechanism = u(u(u({}, r), s), t), t && "data" in t) {
    const i = u(u({}, s == null ? void 0 : s.data), t.data);
    n.mechanism.data = i;
  }
}
function me(e) {
  if (_r(e))
    return !0;
  try {
    Ot(e, "__sentry_captured__", !0);
  } catch (t) {
  }
  return !1;
}
function _r(e) {
  try {
    return e.__sentry_captured__;
  } catch (t) {
  }
}
const ln = 1e3;
function k() {
  return Date.now() / ln;
}
function yr() {
  const { performance: e } = T;
  if (!(e != null && e.now) || !e.timeOrigin)
    return k;
  const t = e.timeOrigin;
  return () => (t + e.now()) / ln;
}
let ot;
function dn() {
  return (ot != null ? ot : ot = yr())();
}
function Ut(e, t = {}) {
  if (t.user && (!e.ipAddress && t.user.ip_address && (e.ipAddress = t.user.ip_address), !e.did && !t.did && (e.did = t.user.id || t.user.email || t.user.username)), e.timestamp = t.timestamp || dn(), t.abnormal_mechanism && (e.abnormal_mechanism = t.abnormal_mechanism), t.ignoreDuration && (e.ignoreDuration = t.ignoreDuration), t.sid && (e.sid = t.sid.length === 32 ? t.sid : v()), t.init !== void 0 && (e.init = t.init), !e.did && t.did && (e.did = `${t.did}`), typeof t.started == "number" && (e.started = t.started), e.ignoreDuration)
    e.duration = void 0;
  else if (typeof t.duration == "number")
    e.duration = t.duration;
  else {
    const n = e.timestamp - e.started;
    e.duration = n >= 0 ? n : 0;
  }
  t.release && (e.release = t.release), t.environment && (e.environment = t.environment), !e.ipAddress && t.ipAddress && (e.ipAddress = t.ipAddress), !e.userAgent && t.userAgent && (e.userAgent = t.userAgent), typeof t.errors == "number" && (e.errors = t.errors), t.status && (e.status = t.status);
}
function nt(e, t, n = 2) {
  if (!t || typeof t != "object" || n <= 0)
    return t;
  if (e && Object.keys(t).length === 0)
    return e;
  const r = u({}, e);
  for (const s in t)
    Object.prototype.hasOwnProperty.call(t, s) && (r[s] = nt(r[s], t[s], n - 1));
  return r;
}
function ge() {
  return v();
}
function pn() {
  return v().substring(16);
}
const Bt = "_sentrySpan";
function _e(e, t) {
  t ? Ot(e, Bt, t) : delete e[Bt];
}
function ye(e) {
  return e[Bt];
}
const Sr = 100;
class O {
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
      traceId: ge(),
      sampleRand: Math.random()
    };
  }
  /**
   * Clone all data from this scope into a new scope.
   */
  clone() {
    const t = new O();
    return t._breadcrumbs = [...this._breadcrumbs], t._tags = u({}, this._tags), t._attributes = u({}, this._attributes), t._extra = u({}, this._extra), t._contexts = u({}, this._contexts), this._contexts.flags && (t._contexts.flags = {
      values: [...this._contexts.flags.values]
    }), t._user = this._user, t._level = this._level, t._session = this._session, t._transactionName = this._transactionName, t._fingerprint = this._fingerprint, t._eventProcessors = [...this._eventProcessors], t._attachments = [...this._attachments], t._sdkProcessingMetadata = u({}, this._sdkProcessingMetadata), t._propagationContext = u({}, this._propagationContext), t._client = this._client, t._lastEventId = this._lastEventId, _e(t, ye(this)), t;
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
    }, this._session && Ut(this._session, { user: t }), this._notifyScopeListeners(), this;
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
    return this._tags = u(u({}, this._tags), t), this._notifyScopeListeners(), this;
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
    return this._attributes = u(u({}, this._attributes), t), this._notifyScopeListeners(), this;
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
    return this._extra = u(u({}, this._extra), t), this._notifyScopeListeners(), this;
  }
  /**
   * Set a single key:value extra entry that will be sent as extra data with the event.
   */
  setExtra(t, n) {
    return this._extra = _(u({}, this._extra), { [t]: n }), this._notifyScopeListeners(), this;
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
    const n = typeof t == "function" ? t(this) : t, r = n instanceof O ? n.getScopeData() : X(n) ? t : void 0, {
      tags: s,
      attributes: i,
      extra: o,
      user: a,
      contexts: c,
      level: l,
      fingerprint: d = [],
      propagationContext: f
    } = r || {};
    return this._tags = u(u({}, this._tags), s), this._attributes = u(u({}, this._attributes), i), this._extra = u(u({}, this._extra), o), this._contexts = u(u({}, this._contexts), c), a && Object.keys(a).length && (this._user = a), l && (this._level = l), d.length && (this._fingerprint = d), f && (this._propagationContext = f), this;
  }
  /**
   * Clears the current scope and resets its properties.
   * Note: The client will not be cleared.
   */
  clear() {
    return this._breadcrumbs = [], this._tags = {}, this._attributes = {}, this._extra = {}, this._user = {}, this._contexts = {}, this._level = void 0, this._transactionName = void 0, this._fingerprint = void 0, this._session = void 0, _e(this, void 0), this._attachments = [], this.setPropagationContext({ traceId: ge(), sampleRand: Math.random() }), this._notifyScopeListeners(), this;
  }
  /**
   * Adds a breadcrumb to the scope.
   * By default, the last 100 breadcrumbs are kept.
   */
  addBreadcrumb(t, n) {
    var i;
    const r = typeof n == "number" ? n : Sr;
    if (r <= 0)
      return this;
    const s = _(u({
      timestamp: k()
    }, t), {
      // Breadcrumb messages can theoretically be infinitely large and they're held in memory so we truncate them not to leak (too much) memory
      message: t.message ? Lt(t.message, 2048) : t.message
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
      span: ye(this)
    };
  }
  /**
   * Add data which will be accessible during event processing but won't get sent to Sentry.
   */
  setSDKProcessingMetadata(t) {
    return this._sdkProcessingMetadata = nt(this._sdkProcessingMetadata, t, 2), this;
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
    const r = (n == null ? void 0 : n.event_id) || v();
    if (!this._client)
      return m && p.warn("No client configured on scope - will not capture exception!"), r;
    const s = new Error("Sentry syntheticException");
    return this._client.captureException(
      t,
      _(u({
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
    const s = (r == null ? void 0 : r.event_id) || v();
    if (!this._client)
      return m && p.warn("No client configured on scope - will not capture message!"), s;
    const i = (o = r == null ? void 0 : r.syntheticException) != null ? o : new Error(t);
    return this._client.captureMessage(
      t,
      n,
      _(u({
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
    const r = (n == null ? void 0 : n.event_id) || v();
    return this._client ? (this._client.captureEvent(t, _(u({}, n), { event_id: r }), this), r) : (m && p.warn("No client configured on scope - will not capture event!"), r);
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
function Er() {
  return B("defaultCurrentScope", () => new O());
}
function br() {
  return B("defaultIsolationScope", () => new O());
}
class Tr {
  constructor(t, n) {
    let r;
    t ? r = t : r = new O();
    let s;
    n ? s = n : s = new O(), this._stack = [{ scope: r }], this._isolationScope = s;
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
    return et(r) ? r.then(
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
function j() {
  const e = kt(), t = Nt(e);
  return t.stack = t.stack || new Tr(Er(), br());
}
function Ir(e) {
  return j().withScope(e);
}
function vr(e, t) {
  const n = j();
  return n.withScope(() => (n.getStackTop().scope = e, t(e)));
}
function Se(e) {
  return j().withScope(() => e(j().getIsolationScope()));
}
function kr() {
  return {
    withIsolationScope: Se,
    withScope: Ir,
    withSetScope: vr,
    withSetIsolationScope: (e, t) => Se(t),
    getCurrentScope: () => j().getScope(),
    getIsolationScope: () => j().getIsolationScope()
  };
}
function Zt(e) {
  const t = Nt(e);
  return t.acs ? t.acs : kr();
}
function x() {
  const e = kt();
  return Zt(e).getCurrentScope();
}
function w() {
  const e = kt();
  return Zt(e).getIsolationScope();
}
function Nr() {
  return B("globalScope", () => new O());
}
function Rr(...e) {
  const t = kt(), n = Zt(t);
  if (e.length === 2) {
    const [r, s] = e;
    return r ? n.withSetScope(r, s) : n.withScope(s);
  }
  return n.withScope(e[0]);
}
function I() {
  return x().getClient();
}
function Or(e) {
  const t = e.getPropagationContext(), { traceId: n, parentSpanId: r, propagationSpanId: s } = t, i = {
    trace_id: n,
    span_id: s || pn()
  };
  return r && (i.parent_span_id = r), i;
}
const wr = "sentry.source", Ar = "sentry.sample_rate", Dr = "sentry.previous_trace_sample_rate", Mr = "sentry.op", Pr = "sentry.origin", fn = "sentry.profile_id", hn = "sentry.exclusive_time", xr = 0, Cr = 1, $r = "_sentryScope", Fr = "_sentryIsolationScope";
function Lr(e) {
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
function mn(e) {
  const t = e;
  return {
    scope: t[$r],
    isolationScope: Lr(t[Fr])
  };
}
const jr = "sentry-", Ur = /^sentry-/;
function Br(e) {
  const t = Hr(e);
  if (!t)
    return;
  const n = Object.entries(t).reduce((r, [s, i]) => {
    if (s.match(Ur)) {
      const o = s.slice(jr.length);
      r[o] = i;
    }
    return r;
  }, {});
  if (Object.keys(n).length > 0)
    return n;
}
function Hr(e) {
  if (!(!e || !pt(e) && !Array.isArray(e)))
    return Array.isArray(e) ? e.reduce((t, n) => {
      const r = Ee(n);
      return Object.entries(r).forEach(([s, i]) => {
        t[s] = i;
      }), t;
    }, {}) : Ee(e);
}
function Ee(e) {
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
const Gr = /^o(\d+)\./, Wr = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)([\w.-]+)(?::(\d+))?\/(.+)/;
function zr(e) {
  return e === "http" || e === "https";
}
function rt(e, t = !1) {
  const { host: n, path: r, pass: s, port: i, projectId: o, protocol: a, publicKey: c } = e;
  return `${a}://${c}${t && s ? `:${s}` : ""}@${n}${i ? `:${i}` : ""}/${r && `${r}/`}${o}`;
}
function qr(e) {
  const t = Wr.exec(e);
  if (!t) {
    Q(() => {
      console.error(`Invalid Sentry Dsn: ${e}`);
    });
    return;
  }
  const [n, r, s = "", i = "", o = "", a = ""] = t.slice(1);
  let c = "", l = a;
  const d = l.split("/");
  if (d.length > 1 && (c = d.slice(0, -1).join("/"), l = d.pop()), l) {
    const f = l.match(/^\d+/);
    f && (l = f[0]);
  }
  return gn({ host: i, pass: s, path: c, projectId: l, port: o, protocol: n, publicKey: r });
}
function gn(e) {
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
function Yr(e) {
  if (!m)
    return !0;
  const { port: t, projectId: n, protocol: r } = e;
  return ["protocol", "publicKey", "host", "projectId"].find((o) => e[o] ? !1 : (p.error(`Invalid Sentry Dsn: ${o} missing`), !0)) ? !1 : n.match(/^\d+$/) ? zr(r) ? t && isNaN(parseInt(t, 10)) ? (p.error(`Invalid Sentry Dsn: Invalid port ${t}`), !1) : !0 : (p.error(`Invalid Sentry Dsn: Invalid protocol ${r}`), !1) : (p.error(`Invalid Sentry Dsn: Invalid projectId ${n}`), !1);
}
function Kr(e) {
  const t = e.match(Gr);
  return t == null ? void 0 : t[1];
}
function Jr(e) {
  const t = e.getOptions(), { host: n } = e.getDsn() || {};
  let r;
  return t.orgId ? r = String(t.orgId) : n && (r = Kr(n)), r;
}
function Vr(e) {
  const t = typeof e == "string" ? qr(e) : gn(e);
  if (!(!t || !Yr(t)))
    return t;
}
function _n(e) {
  if (typeof e == "boolean")
    return Number(e);
  const t = typeof e == "string" ? parseFloat(e) : e;
  if (!(typeof t != "number" || isNaN(t) || t < 0 || t > 1))
    return t;
}
const yn = 1;
let be = !1;
function Xr(e) {
  const { spanId: t, traceId: n, isRemote: r } = e.spanContext(), s = r ? t : Qt(e).parent_span_id, i = mn(e).scope, o = r ? (i == null ? void 0 : i.getPropagationContext().propagationSpanId) || pn() : t;
  return {
    parent_span_id: s,
    span_id: o,
    trace_id: n
  };
}
function Zr(e) {
  if (e && e.length > 0)
    return e.map((o) => {
      var a = o, { context: c } = a, l = c, { spanId: t, traceId: n, traceFlags: r } = l, s = Mt(l, ["spanId", "traceId", "traceFlags"]), { attributes: i } = a;
      return u({
        span_id: t,
        trace_id: n,
        sampled: r === yn,
        attributes: i
      }, s);
    });
}
function Te(e) {
  return typeof e == "number" ? Ie(e) : Array.isArray(e) ? e[0] + e[1] / 1e9 : e instanceof Date ? Ie(e.getTime()) : dn();
}
function Ie(e) {
  return e > 9999999999 ? e / 1e3 : e;
}
function Qt(e) {
  var r;
  if (ts(e))
    return e.getSpanJSON();
  const { spanId: t, traceId: n } = e.spanContext();
  if (Qr(e)) {
    const { attributes: s, startTime: i, name: o, endTime: a, status: c, links: l } = e, d = "parentSpanId" in e ? e.parentSpanId : "parentSpanContext" in e ? (r = e.parentSpanContext) == null ? void 0 : r.spanId : void 0;
    return {
      span_id: t,
      trace_id: n,
      data: s,
      description: o,
      parent_span_id: d,
      start_timestamp: Te(i),
      // This is [0,0] by default in OTEL, in which case we want to interpret this as no end time
      timestamp: Te(a) || void 0,
      status: ns(c),
      op: s[Mr],
      origin: s[Pr],
      links: Zr(l)
    };
  }
  return {
    span_id: t,
    trace_id: n,
    start_timestamp: 0,
    data: {}
  };
}
function Qr(e) {
  const t = e;
  return !!t.attributes && !!t.startTime && !!t.name && !!t.endTime && !!t.status;
}
function ts(e) {
  return typeof e.getSpanJSON == "function";
}
function es(e) {
  const { traceFlags: t } = e.spanContext();
  return t === yn;
}
function ns(e) {
  if (!(!e || e.code === xr))
    return e.code === Cr ? "ok" : e.message || "internal_error";
}
const rs = "_sentryRootSpan";
function Sn(e) {
  return e[rs] || e;
}
function ve() {
  be || (Q(() => {
    console.warn(
      "[Sentry] Returning null from `beforeSendSpan` is disallowed. To drop certain spans, configure the respective integrations directly or use `ignoreSpans`."
    );
  }), be = !0);
}
function En(e) {
  var n;
  if (typeof __SENTRY_TRACING__ == "boolean" && !__SENTRY_TRACING__)
    return !1;
  const t = e || ((n = I()) == null ? void 0 : n.getOptions());
  return !!t && // Note: This check is `!= null`, meaning "nullish". `0` is not "nullish", `undefined` and `null` are. (This comment was brought to you by 15 minutes of questioning life)
  (t.tracesSampleRate != null || !!t.tracesSampler);
}
function ke(e) {
  p.log(`Ignoring span ${e.op} - ${e.description} because it matches \`ignoreSpans\`.`);
}
function Ne(e, t) {
  if (!(t != null && t.length) || !e.description)
    return !1;
  for (const n of t) {
    if (is(n)) {
      if (lt(e.description, n))
        return m && ke(e), !0;
      continue;
    }
    if (!n.name && !n.op)
      continue;
    const r = n.name ? lt(e.description, n.name) : !0, s = n.op ? e.op && lt(e.op, n.op) : !0;
    if (r && s)
      return m && ke(e), !0;
  }
  return !1;
}
function ss(e, t) {
  const n = t.parent_span_id, r = t.span_id;
  if (n)
    for (const s of e)
      s.parent_span_id === r && (s.parent_span_id = n);
}
function is(e) {
  return typeof e == "string" || e instanceof RegExp;
}
const te = "production", os = "_frozenDsc";
function bn(e, t) {
  const n = t.getOptions(), { publicKey: r } = t.getDsn() || {}, s = {
    environment: n.environment || te,
    release: n.release,
    public_key: r,
    trace_id: e,
    org_id: Jr(t)
  };
  return t.emit("createDsc", s), s;
}
function as(e, t) {
  const n = t.getPropagationContext();
  return n.dsc || bn(n.traceId, e);
}
function cs(e) {
  var y, N, S, A;
  const t = I();
  if (!t)
    return {};
  const n = Sn(e), r = Qt(n), s = r.data, i = n.spanContext().traceState, o = (N = (y = i == null ? void 0 : i.get("sentry.sample_rate")) != null ? y : s[Ar]) != null ? N : s[Dr];
  function a(M) {
    return (typeof o == "number" || typeof o == "string") && (M.sample_rate = `${o}`), M;
  }
  const c = n[os];
  if (c)
    return a(c);
  const l = i == null ? void 0 : i.get("sentry.dsc"), d = l && Br(l);
  if (d)
    return a(d);
  const f = bn(e.spanContext().traceId, t), g = s[wr], h = r.description;
  return g !== "url" && h && (f.transaction = h), En() && (f.sampled = String(es(n)), f.sample_rand = // In OTEL we store the sample rand on the trace state because we cannot access scopes for NonRecordingSpans
  // The Sentry OTEL SpanSampler takes care of writing the sample rand on the root span
  (A = i == null ? void 0 : i.get("sentry.sample_rand")) != null ? A : (
    // On all other platforms we can actually get the scopes from a root span (we use this as a fallback)
    (S = mn(n).scope) == null ? void 0 : S.getPropagationContext().sampleRand.toString()
  )), a(f), t.emit("createDsc", f, n), f;
}
function R(e, t = 100, n = 1 / 0) {
  try {
    return Ht("", e, t, n);
  } catch (r) {
    return { ERROR: `**non-serializable** (${r})` };
  }
}
function Tn(e, t = 3, n = 100 * 1024) {
  const r = R(e, t);
  return ps(r) > n ? Tn(e, t - 1, n) : r;
}
function Ht(e, t, n = 1 / 0, r = 1 / 0, s = fs()) {
  const [i, o] = s;
  if (t == null || // this matches null and undefined -> eqeq not eqeqeq
  ["boolean", "string"].includes(typeof t) || typeof t == "number" && Number.isFinite(t))
    return t;
  const a = us(e, t);
  if (!a.startsWith("[object "))
    return a;
  if (t.__sentry_skip_normalization__)
    return t;
  const c = typeof t.__sentry_override_normalization_depth__ == "number" ? t.__sentry_override_normalization_depth__ : n;
  if (c === 0)
    return a.replace("object ", "");
  if (i(t))
    return "[Circular ~]";
  const l = t;
  if (l && typeof l.toJSON == "function")
    try {
      const h = l.toJSON();
      return Ht("", h, c - 1, r, s);
    } catch (h) {
    }
  const d = Array.isArray(t) ? [] : {};
  let f = 0;
  const g = cn(t);
  for (const h in g) {
    if (!Object.prototype.hasOwnProperty.call(g, h))
      continue;
    if (f >= r) {
      d[h] = "[MaxProperties ~]";
      break;
    }
    const y = g[h];
    d[h] = Ht(h, y, c - 1, r, s), f++;
  }
  return o(t), d;
}
function us(e, t) {
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
    if (cr(t))
      return nr(t);
    if (ar(t))
      return "[SyntheticEvent]";
    if (typeof t == "number" && !Number.isFinite(t))
      return `[${t}]`;
    if (typeof t == "function")
      return `[Function: ${er(t)}]`;
    if (typeof t == "symbol")
      return `[${String(t)}]`;
    if (typeof t == "bigint")
      return `[BigInt: ${String(t)}]`;
    const n = ls(t);
    return /^HTML(\w*)Element$/.test(n) ? `[HTMLElement: ${n}]` : `[object ${n}]`;
  } catch (n) {
    return `**non-serializable** (${n})`;
  }
}
function ls(e) {
  const t = Object.getPrototypeOf(e);
  return t != null && t.constructor ? t.constructor.name : "null prototype";
}
function ds(e) {
  return ~-encodeURI(e).split(/%..|./).length;
}
function ps(e) {
  return ds(JSON.stringify(e));
}
function fs() {
  const e = /* @__PURE__ */ new WeakSet();
  function t(r) {
    return e.has(r) ? !0 : (e.add(r), !1);
  }
  function n(r) {
    e.delete(r);
  }
  return [t, n];
}
function G(e, t = []) {
  return [e, t];
}
function hs(e, t) {
  const [n, r] = e;
  return [n, [...r, t]];
}
function Re(e, t) {
  const n = e[1];
  for (const r of n) {
    const s = r[0].type;
    if (t(r, s))
      return !0;
  }
  return !1;
}
function Gt(e) {
  const t = Nt(T);
  return t.encodePolyfill ? t.encodePolyfill(e) : new TextEncoder().encode(e);
}
function ms(e) {
  const [t, n] = e;
  let r = JSON.stringify(t);
  function s(i) {
    typeof r == "string" ? r = typeof i == "string" ? r + i : [Gt(r), i] : r.push(typeof i == "string" ? Gt(i) : i);
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
      } catch (l) {
        c = JSON.stringify(R(a));
      }
      s(c);
    }
  }
  return typeof r == "string" ? r : gs(r);
}
function gs(e) {
  const t = e.reduce((s, i) => s + i.length, 0), n = new Uint8Array(t);
  let r = 0;
  for (const s of e)
    n.set(s, r), r += s.length;
  return n;
}
function _s(e) {
  const t = typeof e.data == "string" ? Gt(e.data) : e.data;
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
const ys = {
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
function Oe(e) {
  return ys[e];
}
function In(e) {
  if (!(e != null && e.sdk))
    return;
  const { name: t, version: n } = e.sdk;
  return { name: t, version: n };
}
function Ss(e, t, n, r) {
  var i;
  const s = (i = e.sdkProcessingMetadata) == null ? void 0 : i.dynamicSamplingContext;
  return u(u(u({
    event_id: e.event_id,
    sent_at: (/* @__PURE__ */ new Date()).toISOString()
  }, t && { sdk: t }), !!n && r && { dsn: rt(r) }), s && {
    trace: s
  });
}
function Es(e, t) {
  var r, s, i, o;
  if (!t)
    return e;
  const n = e.sdk || {};
  return e.sdk = _(u({}, n), {
    name: n.name || t.name,
    version: n.version || t.version,
    integrations: [...((r = e.sdk) == null ? void 0 : r.integrations) || [], ...t.integrations || []],
    packages: [...((s = e.sdk) == null ? void 0 : s.packages) || [], ...t.packages || []],
    settings: (i = e.sdk) != null && i.settings || t.settings ? u(u({}, (o = e.sdk) == null ? void 0 : o.settings), t.settings) : void 0
  }), e;
}
function bs(e, t, n, r) {
  const s = In(n), i = u(u({
    sent_at: (/* @__PURE__ */ new Date()).toISOString()
  }, s && { sdk: s }), !!r && t && { dsn: rt(t) }), o = "aggregates" in e ? [{ type: "sessions" }, e] : [{ type: "session" }, e.toJSON()];
  return G(i, [o]);
}
function Ts(e, t, n, r) {
  const s = In(n), i = e.type && e.type !== "replay_event" ? e.type : "event";
  Es(e, n == null ? void 0 : n.sdk);
  const o = Ss(e, s, r, t);
  return delete e.sdkProcessingMetadata, G(o, [[{ type: i }, e]]);
}
function Is(e, t, n) {
  if (!En(e))
    return [!1];
  let r, s;
  typeof e.tracesSampler == "function" ? (s = e.tracesSampler(_(u({}, t), {
    inheritOrSampleWith: (a) => typeof t.parentSampleRate == "number" ? t.parentSampleRate : typeof t.parentSampled == "boolean" ? Number(t.parentSampled) : a
  })), r = !0) : t.parentSampled !== void 0 ? s = t.parentSampled : typeof e.tracesSampleRate != "undefined" && (s = e.tracesSampleRate, r = !0);
  const i = _n(s);
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
const Ct = 0, we = 1, Ae = 2;
function At(e) {
  return new U((t) => {
    t(e);
  });
}
function ee(e) {
  return new U((t, n) => {
    n(e);
  });
}
class U {
  constructor(t) {
    this._state = Ct, this._handlers = [], this._runExecutor(t);
  }
  /** @inheritdoc */
  then(t, n) {
    return new U((r, s) => {
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
    return new U((n, r) => {
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
    if (this._state === Ct)
      return;
    const t = this._handlers.slice();
    this._handlers = [], t.forEach((n) => {
      n[0] || (this._state === we && n[1](this._value), this._state === Ae && n[2](this._value), n[0] = !0);
    });
  }
  /** Run the executor for the SyncPromise. */
  _runExecutor(t) {
    const n = (i, o) => {
      if (this._state === Ct) {
        if (et(o)) {
          o.then(r, s);
          return;
        }
        this._state = i, this._value = o, this._executeHandlers();
      }
    }, r = (i) => {
      n(we, i);
    }, s = (i) => {
      n(Ae, i);
    };
    try {
      t(r, s);
    } catch (i) {
      s(i);
    }
  }
}
function vs(e, t, n, r = 0) {
  try {
    const s = Wt(t, n, e, r);
    return et(s) ? s : At(s);
  } catch (s) {
    return ee(s);
  }
}
function Wt(e, t, n, r) {
  const s = n[r];
  if (!e || !s)
    return e;
  const i = s(u({}, e), t);
  return m && i === null && p.log(`Event processor "${s.id || "?"}" dropped event`), et(i) ? i.then((o) => Wt(o, t, n, r + 1)) : Wt(i, t, n, r + 1);
}
function ks(e, t) {
  const { fingerprint: n, span: r, breadcrumbs: s, sdkProcessingMetadata: i } = t;
  Ns(e, t), r && ws(e, r), As(e, n), Rs(e, s), Os(e, i);
}
function De(e, t) {
  const {
    extra: n,
    tags: r,
    user: s,
    contexts: i,
    level: o,
    sdkProcessingMetadata: a,
    breadcrumbs: c,
    fingerprint: l,
    eventProcessors: d,
    attachments: f,
    propagationContext: g,
    transactionName: h,
    span: y
  } = t;
  at(e, "extra", n), at(e, "tags", r), at(e, "user", s), at(e, "contexts", i), e.sdkProcessingMetadata = nt(e.sdkProcessingMetadata, a, 2), o && (e.level = o), h && (e.transactionName = h), y && (e.span = y), c.length && (e.breadcrumbs = [...e.breadcrumbs, ...c]), l.length && (e.fingerprint = [...e.fingerprint, ...l]), d.length && (e.eventProcessors = [...e.eventProcessors, ...d]), f.length && (e.attachments = [...e.attachments, ...f]), e.propagationContext = u(u({}, e.propagationContext), g);
}
function at(e, t, n) {
  e[t] = nt(e[t], n, 1);
}
function Ns(e, t) {
  const { extra: n, tags: r, user: s, contexts: i, level: o, transactionName: a } = t;
  Object.keys(n).length && (e.extra = u(u({}, n), e.extra)), Object.keys(r).length && (e.tags = u(u({}, r), e.tags)), Object.keys(s).length && (e.user = u(u({}, s), e.user)), Object.keys(i).length && (e.contexts = u(u({}, i), e.contexts)), o && (e.level = o), a && e.type !== "transaction" && (e.transaction = a);
}
function Rs(e, t) {
  const n = [...e.breadcrumbs || [], ...t];
  e.breadcrumbs = n.length ? n : void 0;
}
function Os(e, t) {
  e.sdkProcessingMetadata = u(u({}, e.sdkProcessingMetadata), t);
}
function ws(e, t) {
  e.contexts = u({
    trace: Xr(t)
  }, e.contexts), e.sdkProcessingMetadata = u({
    dynamicSamplingContext: cs(t)
  }, e.sdkProcessingMetadata);
  const n = Sn(t), r = Qt(n).description;
  r && !e.transaction && e.type === "transaction" && (e.transaction = r);
}
function As(e, t) {
  e.fingerprint = e.fingerprint ? Array.isArray(e.fingerprint) ? e.fingerprint : [e.fingerprint] : [], t && (e.fingerprint = e.fingerprint.concat(t)), e.fingerprint.length || delete e.fingerprint;
}
let D, Me, Pe, P;
function Ds(e) {
  const t = T._sentryDebugIds, n = T._debugIds;
  if (!t && !n)
    return {};
  const r = t ? Object.keys(t) : [], s = n ? Object.keys(n) : [];
  if (P && r.length === Me && s.length === Pe)
    return P;
  Me = r.length, Pe = s.length, P = {}, D || (D = {});
  const i = (o, a) => {
    for (const c of o) {
      const l = a[c], d = D == null ? void 0 : D[c];
      if (d && P && l)
        P[d[0]] = l, D && (D[c] = [d[0], l]);
      else if (l) {
        const f = e(c);
        for (let g = f.length - 1; g >= 0; g--) {
          const h = f[g], y = h == null ? void 0 : h.filename;
          if (y && P && D) {
            P[y] = l, D[c] = [y, l];
            break;
          }
        }
      }
    }
  };
  return t && i(r, t), n && i(s, n), P;
}
function Ms(e, t, n, r, s, i) {
  const { normalizeDepth: o = 3, normalizeMaxBreadth: a = 1e3 } = e, c = _(u({}, t), {
    event_id: t.event_id || n.event_id || v(),
    timestamp: t.timestamp || k()
  }), l = n.integrations || e.integrations.map((S) => S.name);
  Ps(c, e), $s(c, l), s && s.emit("applyFrameMetadata", t), t.type === void 0 && xs(c, e.stackParser);
  const d = Ls(r, n.captureContext);
  n.mechanism && ft(c, n.mechanism);
  const f = s ? s.getEventProcessors() : [], g = Nr().getScopeData();
  if (i) {
    const S = i.getScopeData();
    De(g, S);
  }
  if (d) {
    const S = d.getScopeData();
    De(g, S);
  }
  const h = [...n.attachments || [], ...g.attachments];
  h.length && (n.attachments = h), ks(c, g);
  const y = [
    ...f,
    // Run scope event processors _after_ all other processors
    ...g.eventProcessors
  ];
  return vs(y, c, n).then((S) => (S && Cs(S), typeof o == "number" && o > 0 ? Fs(S, o, a) : S));
}
function Ps(e, t) {
  var a, c;
  const { environment: n, release: r, dist: s, maxValueLength: i } = t;
  e.environment = e.environment || n || te, !e.release && r && (e.release = r), !e.dist && s && (e.dist = s);
  const o = e.request;
  o != null && o.url && i && (o.url = Lt(o.url, i)), i && ((c = (a = e.exception) == null ? void 0 : a.values) == null || c.forEach((l) => {
    l.value && (l.value = Lt(l.value, i));
  }));
}
function xs(e, t) {
  var r, s;
  const n = Ds(t);
  (s = (r = e.exception) == null ? void 0 : r.values) == null || s.forEach((i) => {
    var o, a;
    (a = (o = i.stacktrace) == null ? void 0 : o.frames) == null || a.forEach((c) => {
      c.filename && (c.debug_id = n[c.filename]);
    });
  });
}
function Cs(e) {
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
function $s(e, t) {
  t.length > 0 && (e.sdk = e.sdk || {}, e.sdk.integrations = [...e.sdk.integrations || [], ...t]);
}
function Fs(e, t, n) {
  var s, i;
  if (!e)
    return null;
  const r = u(u(u(u(u({}, e), e.breadcrumbs && {
    breadcrumbs: e.breadcrumbs.map((o) => u(u({}, o), o.data && {
      data: R(o.data, t, n)
    }))
  }), e.user && {
    user: R(e.user, t, n)
  }), e.contexts && {
    contexts: R(e.contexts, t, n)
  }), e.extra && {
    extra: R(e.extra, t, n)
  });
  return (s = e.contexts) != null && s.trace && r.contexts && (r.contexts.trace = e.contexts.trace, e.contexts.trace.data && (r.contexts.trace.data = R(e.contexts.trace.data, t, n))), e.spans && (r.spans = e.spans.map((o) => u(u({}, o), o.data && {
    data: R(o.data, t, n)
  }))), (i = e.contexts) != null && i.flags && r.contexts && (r.contexts.flags = R(e.contexts.flags, 3, n)), r;
}
function Ls(e, t) {
  if (!t)
    return e;
  const n = e ? e.clone() : new O();
  return n.update(t), n;
}
function js(e) {
  if (e)
    return Us(e) ? { captureContext: e } : Hs(e) ? {
      captureContext: e
    } : e;
}
function Us(e) {
  return e instanceof O || typeof e == "function";
}
const Bs = [
  "user",
  "level",
  "extra",
  "contexts",
  "tags",
  "fingerprint",
  "propagationContext"
];
function Hs(e) {
  return Object.keys(e).some((t) => Bs.includes(t));
}
function zt(e, t) {
  return x().captureException(e, js(t));
}
function xe(e, t) {
  const n = typeof t == "string" ? t : void 0, r = typeof t != "string" ? { captureContext: t } : void 0;
  return x().captureMessage(e, n, r);
}
function Gs(e, t) {
  return x().captureEvent(e, t);
}
function Io(e, t) {
  w().setContext(e, t);
}
function vo(e) {
  w().setExtras(e);
}
function Ce(e, t) {
  w().setExtra(e, t);
}
function ko(e) {
  w().setTags(e);
}
function $e(e, t) {
  w().setTag(e, t);
}
function No(e) {
  w().setUser(e);
}
function vn() {
  return w().lastEventId();
}
function Dt(e) {
  w().addEventProcessor(e);
}
const Ws = "7";
function zs(e) {
  const t = e.protocol ? `${e.protocol}:` : "", n = e.port ? `:${e.port}` : "";
  return `${t}//${e.host}${n}${e.path ? `/${e.path}` : ""}/api/`;
}
function qs(e) {
  return `${zs(e)}${e.projectId}/envelope/`;
}
function Ys(e, t) {
  const n = {
    sentry_version: Ws
  };
  return e.publicKey && (n.sentry_key = e.publicKey), t && (n.sentry_client = `${t.name}/${t.version}`), new URLSearchParams(n).toString();
}
function Ks(e, t, n) {
  return t || `${qs(e)}?${Ys(e, n)}`;
}
const Fe = [];
function Js(e, t) {
  const n = {};
  return t.forEach((r) => {
    r && kn(e, r, n);
  }), n;
}
function Le(e, t) {
  for (const n of t)
    n != null && n.afterAllSetup && n.afterAllSetup(e);
}
function kn(e, t, n) {
  if (n[t.name]) {
    m && p.log(`Integration skipped because it was already installed: ${t.name}`);
    return;
  }
  if (n[t.name] = t, !Fe.includes(t.name) && typeof t.setupOnce == "function" && (t.setupOnce(), Fe.push(t.name)), t.setup && typeof t.setup == "function" && t.setup(e), typeof t.preprocessEvent == "function") {
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
function Vs(e) {
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
function Xs(e, t, n, r) {
  const s = {};
  return t != null && t.sdk && (s.sdk = {
    name: t.sdk.name,
    version: t.sdk.version
  }), n && r && (s.dsn = rt(r)), G(s, [Vs(e)]);
}
function Zs(e, t) {
  var i;
  const n = (i = t != null ? t : Qs(e)) != null ? i : [];
  if (n.length === 0)
    return;
  const r = e.getOptions(), s = Xs(n, r._metadata, r.tunnel, e.getDsn());
  Nn().set(e, []), e.emit("flushLogs"), e.sendEnvelope(s);
}
function Qs(e) {
  return Nn().get(e);
}
function Nn() {
  return B("clientToLogBufferMap", () => /* @__PURE__ */ new WeakMap());
}
function ti(e) {
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
function ei(e, t, n, r) {
  const s = {};
  return t != null && t.sdk && (s.sdk = {
    name: t.sdk.name,
    version: t.sdk.version
  }), n && r && (s.dsn = rt(r)), G(s, [ti(e)]);
}
function ni(e, t) {
  var i;
  const n = (i = t != null ? t : ri(e)) != null ? i : [];
  if (n.length === 0)
    return;
  const r = e.getOptions(), s = ei(n, r._metadata, r.tunnel, e.getDsn());
  Rn().set(e, []), e.emit("flushMetrics"), e.sendEnvelope(s);
}
function ri(e) {
  return Rn().get(e);
}
function Rn() {
  return B("clientToMetricBufferMap", () => /* @__PURE__ */ new WeakMap());
}
const ne = Symbol.for("SentryBufferFullError");
function On(e = 100) {
  const t = /* @__PURE__ */ new Set();
  function n() {
    return t.size < e;
  }
  function r(o) {
    t.delete(o);
  }
  function s(o) {
    if (!n())
      return ee(ne);
    const a = o();
    return t.add(a), a.then(
      () => r(a),
      () => r(a)
    ), a;
  }
  function i(o) {
    if (!t.size)
      return At(!0);
    const a = Promise.allSettled(Array.from(t)).then(() => !0);
    if (!o)
      return a;
    const c = [a, new Promise((l) => setTimeout(() => l(!1), o))];
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
const si = 60 * 1e3;
function ii(e, t = Date.now()) {
  const n = parseInt(`${e}`, 10);
  if (!isNaN(n))
    return n * 1e3;
  const r = Date.parse(`${e}`);
  return isNaN(r) ? si : r - t;
}
function oi(e, t) {
  return e[t] || e.all || 0;
}
function ai(e, t, n = Date.now()) {
  return oi(e, t) > n;
}
function ci(e, { statusCode: t, headers: n }, r = Date.now()) {
  const s = u({}, e), i = n == null ? void 0 : n["x-sentry-rate-limits"], o = n == null ? void 0 : n["retry-after"];
  if (i)
    for (const a of i.trim().split(",")) {
      const [c, l, , , d] = a.split(":", 5), f = parseInt(c, 10), g = (isNaN(f) ? 60 : f) * 1e3;
      if (!l)
        s.all = r + g;
      else
        for (const h of l.split(";"))
          h === "metric_bucket" ? (!d || d.split(";").includes("custom")) && (s[h] = r + g) : s[h] = r + g;
    }
  else o ? s.all = r + ii(o, r) : t === 429 && (s.all = r + 60 * 1e3);
  return s;
}
const wn = 64;
function ui(e, t, n = On(
  e.bufferSize || wn
)) {
  let r = {};
  const s = (o) => n.drain(o);
  function i(o) {
    const a = [];
    if (Re(o, (f, g) => {
      const h = Oe(g);
      ai(r, h) ? e.recordDroppedEvent("ratelimit_backoff", h) : a.push(f);
    }), a.length === 0)
      return Promise.resolve({});
    const c = G(o[0], a), l = (f) => {
      Re(c, (g, h) => {
        e.recordDroppedEvent(f, Oe(h));
      });
    }, d = () => t({ body: ms(c) }).then(
      (f) => (f.statusCode !== void 0 && (f.statusCode < 200 || f.statusCode >= 300) && m && p.warn(`Sentry responded with status code ${f.statusCode} to sent event.`), r = ci(r, f), f),
      (f) => {
        throw l("network_error"), m && p.error("Encountered error running transport request:", f), f;
      }
    );
    return n.add(d).then(
      (f) => f,
      (f) => {
        if (f === ne)
          return m && p.error("Skipped sending event because buffer is full."), l("queue_overflow"), Promise.resolve({});
        throw f;
      }
    );
  }
  return {
    send: i,
    flush: s
  };
}
function li(e, t, n) {
  const r = [
    { type: "client_report" },
    {
      timestamp: k(),
      discarded_events: e
    }
  ];
  return G(t ? { dsn: t } : {}, [r]);
}
function An(e) {
  const t = [];
  e.message && t.push(e.message);
  try {
    const n = e.exception.values[e.exception.values.length - 1];
    n != null && n.value && (t.push(n.value), n.type && t.push(`${n.type}: ${n.value}`));
  } catch (n) {
  }
  return t;
}
function di(e) {
  var c, l, d;
  const { trace_id: t, parent_span_id: n, span_id: r, status: s, origin: i, data: o, op: a } = (l = (c = e.contexts) == null ? void 0 : c.trace) != null ? l : {};
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
    profile_id: o == null ? void 0 : o[fn],
    exclusive_time: o == null ? void 0 : o[hn],
    measurements: e.measurements,
    is_segment: !0
  };
}
function pi(e) {
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
        data: u(u(u({}, e.data), e.profile_id && { [fn]: e.profile_id }), e.exclusive_time && { [hn]: e.exclusive_time })
      }
    },
    measurements: e.measurements
  };
}
const je = "Not capturing exception because it's already been captured.", Ue = "Discarded session because of missing or non-string release", Dn = Symbol.for("SentryInternalError"), Mn = Symbol.for("SentryDoNotSendEventError"), fi = 5e3;
function dt(e) {
  return {
    message: e,
    [Dn]: !0
  };
}
function $t(e) {
  return {
    message: e,
    [Mn]: !0
  };
}
function Be(e) {
  return !!e && typeof e == "object" && Dn in e;
}
function He(e) {
  return !!e && typeof e == "object" && Mn in e;
}
function Ge(e, t, n, r, s) {
  let i = 0, o, a = !1;
  e.on(n, () => {
    i = 0, clearTimeout(o), a = !1;
  }), e.on(t, (c) => {
    i += r(c), i >= 8e5 ? s(e) : a || (a = !0, o = setTimeout(() => {
      s(e);
    }, fi));
  }), e.on("flush", () => {
    s(e);
  });
}
class hi {
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
    var r, s, i, o, a, c, l;
    if (this._options = t, this._integrations = {}, this._numProcessing = 0, this._outcomes = {}, this._hooks = {}, this._eventProcessors = [], this._promiseBuffer = On((s = (r = t.transportOptions) == null ? void 0 : r.bufferSize) != null ? s : wn), t.dsn ? this._dsn = Vr(t.dsn) : m && p.warn("No DSN provided, client will not send events."), this._dsn) {
      const d = Ks(
        this._dsn,
        t.tunnel,
        t._metadata ? t._metadata.sdk : void 0
      );
      this._transport = t.transport(_(u({
        tunnel: this._options.tunnel,
        recordDroppedEvent: this.recordDroppedEvent.bind(this)
      }, t.transportOptions), {
        url: d
      }));
    }
    this._options.enableLogs = (o = this._options.enableLogs) != null ? o : (i = this._options._experiments) == null ? void 0 : i.enableLogs, this._options.enableLogs && Ge(this, "afterCaptureLog", "flushLogs", yi, Zs), ((l = (c = this._options.enableMetrics) != null ? c : (a = this._options._experiments) == null ? void 0 : a.enableMetrics) != null ? l : !0) && Ge(
      this,
      "afterCaptureMetric",
      "flushMetrics",
      _i,
      ni
    );
  }
  /**
   * Captures an exception event and sends it to Sentry.
   *
   * Unlike `captureException` exported from every SDK, this method requires that you pass it the current scope.
   */
  captureException(t, n, r) {
    const s = v();
    if (me(t))
      return m && p.log(je), s;
    const i = u({
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
    const i = u({
      event_id: v()
    }, r), o = rn(t) ? t : String(t), a = sn(t), c = a ? this.eventFromMessage(o, n, i) : this.eventFromException(t, i);
    return this._process(
      () => c.then((l) => this._captureEvent(l, i, s)),
      a ? "unknown" : "error"
    ), i.event_id;
  }
  /**
   * Captures a manually created event and sends it to Sentry.
   *
   * Unlike `captureEvent` exported from every SDK, this method requires that you pass it the current scope.
   */
  captureEvent(t, n, r) {
    const s = v();
    if (n != null && n.originalException && me(n.originalException))
      return m && p.log(je), s;
    const i = u({
      event_id: s
    }, n), o = t.sdkProcessingMetadata || {}, a = o.capturedSpanScope, c = o.capturedSpanIsolationScope, l = We(t.type);
    return this._process(
      () => this._captureEvent(t, i, a || r, c),
      l
    ), i.event_id;
  }
  /**
   * Captures a session.
   */
  captureSession(t) {
    this.sendSession(t), Ut(t, { init: !1 });
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
    return W(this, null, function* () {
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
    return W(this, null, function* () {
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
    kn(this, t, this._integrations), n || Le(this, [t]);
  }
  /**
   * Send a fully prepared event to Sentry.
   */
  sendEvent(t, n = {}) {
    this.emit("beforeSendEvent", t, n);
    let r = Ts(t, this._dsn, this._options._metadata, this._options.tunnel);
    for (const s of n.attachments || [])
      r = hs(r, _s(s));
    this.sendEnvelope(r).then((s) => this.emit("afterSendEvent", t, s));
  }
  /**
   * Send a session or session aggregrates to Sentry.
   */
  sendSession(t) {
    const { release: n, environment: r = te } = this._options;
    if ("aggregates" in t) {
      const i = t.attrs || {};
      if (!i.release && !n) {
        m && p.warn(Ue);
        return;
      }
      i.release = i.release || n, i.environment = i.environment || r, t.attrs = i;
    } else {
      if (!t.release && !n) {
        m && p.warn(Ue);
        return;
      }
      t.release = t.release || n, t.environment = t.environment || r;
    }
    this.emit("beforeSendSession", t);
    const s = bs(t, this._dsn, this._options._metadata, this._options.tunnel);
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
    return W(this, null, function* () {
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
    this._integrations = Js(this, t), Le(this, t);
  }
  /** Updates existing session based on the provided event */
  _updateSessionFromEvent(t, n) {
    var c, l;
    let r = n.level === "fatal", s = !1;
    const i = (c = n.exception) == null ? void 0 : c.values;
    if (i) {
      s = !0, r = !1;
      for (const d of i)
        if (((l = d.mechanism) == null ? void 0 : l.handled) === !1) {
          r = !0;
          break;
        }
    }
    const o = t.status === "ok";
    (o && t.errors === 0 || o && r) && (Ut(t, _(u({}, r && { status: "crashed" }), {
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
    return W(this, null, function* () {
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
    return !n.integrations && (o != null && o.length) && (n.integrations = o), this.emit("preprocessEvent", t, n), t.type || s.setLastEventId(t.event_id || n.event_id), Ms(i, t, n, r, this, s).then((a) => {
      if (a === null)
        return a;
      this.emit("postprocessEvent", a, n), a.contexts = u({
        trace: Or(r)
      }, a.contexts);
      const c = as(this, r);
      return a.sdkProcessingMetadata = u({
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
  _captureEvent(t, n = {}, r = x(), s = w()) {
    return m && qt(t) && p.log(`Captured error event \`${An(t)[0] || "<unknown>"}\``), this._processEvent(t, n, r, s).then(
      (i) => i.event_id,
      (i) => {
        m && (He(i) ? p.log(i.message) : Be(i) ? p.warn(i.message) : p.warn(i));
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
    const i = this.getOptions(), { sampleRate: o } = i, a = Pn(t), c = qt(t), d = `before send for type \`${t.type || "error"}\``, f = typeof o == "undefined" ? void 0 : _n(o);
    if (c && typeof f == "number" && Math.random() > f)
      return this.recordDroppedEvent("sample_rate", "error"), ee(
        $t(
          `Discarding event because it's not included in the random sample (sampling rate = ${o})`
        )
      );
    const g = We(t.type);
    return this._prepareEvent(t, n, r, s).then((h) => {
      if (h === null)
        throw this.recordDroppedEvent("event_processor", g), $t("An event processor returned `null`, will not send event.");
      if (n.data && n.data.__sentry__ === !0)
        return h;
      const N = gi(this, i, h, n);
      return mi(N, d);
    }).then((h) => {
      var S;
      if (h === null) {
        if (this.recordDroppedEvent("before_send", g), a) {
          const M = 1 + (t.spans || []).length;
          this.recordDroppedEvent("before_send", "span", M);
        }
        throw $t(`${d} returned \`null\`, will not send event.`);
      }
      const y = r.getSession() || s.getSession();
      if (c && y && this._updateSessionFromEvent(y, h), a) {
        const A = ((S = h.sdkProcessingMetadata) == null ? void 0 : S.spanCountBeforeProcessing) || 0, M = h.spans ? h.spans.length : 0, st = A - M;
        st > 0 && this.recordDroppedEvent("before_send", "span", st);
      }
      const N = h.transaction_info;
      if (a && N && h.transaction !== t.transaction) {
        const A = "custom";
        h.transaction_info = _(u({}, N), {
          source: A
        });
      }
      return this.sendEvent(h, n), h;
    }).then(null, (h) => {
      throw He(h) || Be(h) ? h : (this.captureException(h, {
        mechanism: {
          handled: !1,
          type: "internal"
        },
        data: {
          __sentry__: !0
        },
        originalException: h
      }), dt(
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
      (r) => (this._numProcessing--, r === ne && this.recordDroppedEvent("queue_overflow", n), r)
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
    const n = li(t, this._options.tunnel && rt(this._dsn));
    this.sendEnvelope(n);
  }
  /**
   * Creates an {@link Event} from all inputs to `captureException` and non-primitive inputs to `captureMessage`.
   */
}
function We(e) {
  return e === "replay_event" ? "replay" : e || "error";
}
function mi(e, t) {
  const n = `${t} must return \`null\` or a valid event.`;
  if (et(e))
    return e.then(
      (r) => {
        if (!X(r) && r !== null)
          throw dt(n);
        return r;
      },
      (r) => {
        throw dt(`${t} rejected with ${r}`);
      }
    );
  if (!X(e) && e !== null)
    throw dt(n);
  return e;
}
function gi(e, t, n, r) {
  const { beforeSend: s, beforeSendTransaction: i, beforeSendSpan: o, ignoreSpans: a } = t;
  let c = n;
  if (qt(c) && s)
    return s(c, r);
  if (Pn(c)) {
    if (o || a) {
      const l = di(c);
      if (a != null && a.length && Ne(l, a))
        return null;
      if (o) {
        const d = o(l);
        d ? c = nt(n, pi(d)) : ve();
      }
      if (c.spans) {
        const d = [], f = c.spans;
        for (const h of f) {
          if (a != null && a.length && Ne(h, a)) {
            ss(f, h);
            continue;
          }
          if (o) {
            const y = o(h);
            y ? d.push(y) : (ve(), d.push(h));
          } else
            d.push(h);
        }
        const g = c.spans.length - d.length;
        g && e.recordDroppedEvent("before_send", "span", g), c.spans = d;
      }
    }
    if (i) {
      if (c.spans) {
        const l = c.spans.length;
        c.sdkProcessingMetadata = _(u({}, n.sdkProcessingMetadata), {
          spanCountBeforeProcessing: l
        });
      }
      return i(c, r);
    }
  }
  return c;
}
function qt(e) {
  return e.type === void 0;
}
function Pn(e) {
  return e.type === "transaction";
}
function _i(e) {
  let t = 0;
  return e.name && (t += e.name.length * 2), t += 8, t + xn(e.attributes);
}
function yi(e) {
  let t = 0;
  return e.message && (t += e.message.length * 2), t + xn(e.attributes);
}
function xn(e) {
  if (!e)
    return 0;
  let t = 0;
  return Object.values(e).forEach((n) => {
    Array.isArray(n) ? t += n.length * ze(n[0]) : sn(n) ? t += ze(n) : t += 100;
  }), t;
}
function ze(e) {
  return typeof e == "string" ? e.length * 2 : typeof e == "number" ? 8 : typeof e == "boolean" ? 4 : 0;
}
function Si(e, t) {
  t.debug === !0 && (m ? p.enable() : Q(() => {
    console.warn("[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle.");
  })), x().update(t.initialScope);
  const r = new e(t);
  return Ei(r), r.init(), r;
}
function Ei(e) {
  x().setClient(e);
}
function bi(e, t, n = [t], r = "npm") {
  const s = e._metadata || {};
  s.sdk || (s.sdk = {
    name: `sentry.javascript.${t}`,
    packages: n.map((i) => ({
      name: `${r}:@sentry/${i}`,
      version: C
    })),
    version: C
  }), e._metadata = s;
}
const Ti = 100;
function Ro(e, t) {
  const n = I(), r = w();
  if (!n) return;
  const { beforeBreadcrumb: s = null, maxBreadcrumbs: i = Ti } = n.getOptions();
  if (i <= 0) return;
  const o = k(), a = u({ timestamp: o }, e), c = s ? Q(() => s(a, t)) : a;
  c !== null && (n.emit && n.emit("beforeAddBreadcrumb", c, t), r.addBreadcrumb(c, i));
}
let qe;
const Ii = "FunctionToString", Ye = /* @__PURE__ */ new WeakMap(), vi = (() => ({
  name: Ii,
  setupOnce() {
    qe = Function.prototype.toString;
    try {
      Function.prototype.toString = function(...e) {
        const t = an(this), n = Ye.has(I()) && t !== void 0 ? t : this;
        return qe.apply(n, e);
      };
    } catch (e) {
    }
  },
  setup(e) {
    Ye.set(e, !0);
  }
})), ki = vi, Ni = [
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
], Ri = "EventFilters", Oi = (e = {}) => {
  let t;
  return {
    name: Ri,
    setup(n) {
      const r = n.getOptions();
      t = Ke(e, r);
    },
    processEvent(n, r, s) {
      if (!t) {
        const i = s.getOptions();
        t = Ke(e, i);
      }
      return Ai(n, t) ? null : n;
    }
  };
}, wi = ((e = {}) => _(u({}, Oi(e)), {
  name: "InboundFilters"
}));
function Ke(e = {}, t = {}) {
  return {
    allowUrls: [...e.allowUrls || [], ...t.allowUrls || []],
    denyUrls: [...e.denyUrls || [], ...t.denyUrls || []],
    ignoreErrors: [
      ...e.ignoreErrors || [],
      ...t.ignoreErrors || [],
      ...e.disableErrorDefaults ? [] : Ni
    ],
    ignoreTransactions: [...e.ignoreTransactions || [], ...t.ignoreTransactions || []]
  };
}
function Ai(e, t) {
  if (e.type) {
    if (e.type === "transaction" && Mi(e, t.ignoreTransactions))
      return m && p.warn(
        `Event dropped due to being matched by \`ignoreTransactions\` option.
Event: ${$(e)}`
      ), !0;
  } else {
    if (Di(e, t.ignoreErrors))
      return m && p.warn(
        `Event dropped due to being matched by \`ignoreErrors\` option.
Event: ${$(e)}`
      ), !0;
    if ($i(e))
      return m && p.warn(
        `Event dropped due to not having an error message, error type or stacktrace.
Event: ${$(
          e
        )}`
      ), !0;
    if (Pi(e, t.denyUrls))
      return m && p.warn(
        `Event dropped due to being matched by \`denyUrls\` option.
Event: ${$(
          e
        )}.
Url: ${ht(e)}`
      ), !0;
    if (!xi(e, t.allowUrls))
      return m && p.warn(
        `Event dropped due to not being matched by \`allowUrls\` option.
Event: ${$(
          e
        )}.
Url: ${ht(e)}`
      ), !0;
  }
  return !1;
}
function Di(e, t) {
  return t != null && t.length ? An(e).some((n) => wt(n, t)) : !1;
}
function Mi(e, t) {
  if (!(t != null && t.length))
    return !1;
  const n = e.transaction;
  return n ? wt(n, t) : !1;
}
function Pi(e, t) {
  if (!(t != null && t.length))
    return !1;
  const n = ht(e);
  return n ? wt(n, t) : !1;
}
function xi(e, t) {
  if (!(t != null && t.length))
    return !0;
  const n = ht(e);
  return n ? wt(n, t) : !0;
}
function Ci(e = []) {
  for (let t = e.length - 1; t >= 0; t--) {
    const n = e[t];
    if (n && n.filename !== "<anonymous>" && n.filename !== "[native code]")
      return n.filename || null;
  }
  return null;
}
function ht(e) {
  var t, n, r;
  try {
    const s = [...(n = (t = e.exception) == null ? void 0 : t.values) != null ? n : []].reverse().find((o) => {
      var a, c, l;
      return ((a = o.mechanism) == null ? void 0 : a.parent_id) === void 0 && ((l = (c = o.stacktrace) == null ? void 0 : c.frames) == null ? void 0 : l.length);
    }), i = (r = s == null ? void 0 : s.stacktrace) == null ? void 0 : r.frames;
    return i ? Ci(i) : null;
  } catch (s) {
    return m && p.error(`Cannot extract url for event ${$(e)}`), null;
  }
}
function $i(e) {
  var t, n;
  return (n = (t = e.exception) == null ? void 0 : t.values) != null && n.length ? (
    // No top-level message
    !e.message && // There are no exception values that have a stacktrace, a non-generic-Error type or value
    !e.exception.values.some((r) => r.stacktrace || r.type && r.type !== "Error" || r.value)
  ) : !1;
}
function Oo(e) {
  const t = x();
  e(t);
}
const E = typeof __SENTRY_DEBUG__ == "undefined" ? !0 : __SENTRY_DEBUG__, Je = "finishReason", Ve = ["heartbeatFailed", "idleTimeout", "documentHidden"];
let Cn;
function Fi() {
  return Cn;
}
function mt(e) {
  Cn = e;
}
function q(e) {
  return e / 1e3;
}
function Li(e) {
  return e * 1e3;
}
class $n {
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
class re {
  /**
   * You should never call the constructor manually, always use `Sentry.startTransaction()`
   * or call `startChild()` on an existing span.
   * @internal
   * @hideconstructor
   * @hidden
   */
  constructor(t) {
    var n, r, s, i, o, a, c, l, d, f, g, h, y;
    if (this.name = "", this.traceId = v(), this.spanId = v().substring(16), this.startTimestamp = k(), this.tags = {}, this.data = {}, this.attributes = {}, this.instrumenter = "sentry", !t)
      return this;
    this.traceId = (n = t.traceId) != null ? n : this.traceId, this.spanId = (r = t.spanId) != null ? r : this.spanId, this.parentSpanId = (s = t.parentSpanId) != null ? s : this.parentSpanId, "sampled" in t && (this.sampled = t.sampled), this.op = (i = t.op) != null ? i : this.op, this.description = (a = (o = t.description) != null ? o : t.name) != null ? a : this.description, this.name = (l = (c = t.name) != null ? c : t.description) != null ? l : this.name, this.data = t.data ? u({}, t.data) : this.data, this.tags = t.tags ? u({}, t.tags) : this.tags, this.attributes = t.attributes ? u({}, t.attributes) : this.attributes, this.status = (d = t.status) != null ? d : this.status, this.startTimestamp = (f = t.startTimestamp) != null ? f : this.startTimestamp, this.endTimestamp = (g = t.endTimestamp) != null ? g : this.endTimestamp, this.instrumenter = (h = t.instrumenter) != null ? h : this.instrumenter, this.origin = (y = t.origin) != null ? y : this.origin;
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
    const n = new re(_(u({}, t), {
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
    return this.tags = _(u({}, this.tags), { [t]: n }), this;
  }
  /**
   * @inheritDoc
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  setData(t, n) {
    return this.data = _(u({}, this.data), { [t]: n }), this;
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
    const n = Ui(t);
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
    this.finish(ji(t));
  }
  /**
   * @inheritDoc
   */
  finish(t) {
    this.endTimestamp = typeof t == "number" ? t : k();
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
    return ut({
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
    var n, r, s, i, o, a, c, l, d;
    return this.data = (n = t.data) != null ? n : {}, this.description = (r = t.description) != null ? r : t.name, this.name = (i = (s = t.name) != null ? s : t.description) != null ? i : this.name, this.endTimestamp = t.endTimestamp, this.op = t.op, this.parentSpanId = t.parentSpanId, this.sampled = t.sampled, this.spanId = (o = t.spanId) != null ? o : this.spanId, this.startTimestamp = (a = t.startTimestamp) != null ? a : this.startTimestamp, this.status = t.status, this.tags = (c = t.tags) != null ? c : {}, this.attributes = (l = t.attributes) != null ? l : this.attributes, this.traceId = (d = t.traceId) != null ? d : this.traceId, this;
  }
  /**
   * @inheritDoc
   */
  getTraceContext() {
    return ut({
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
    return ut({
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
function ji(e) {
  if (e === void 0)
    return k();
  if (Array.isArray(e) && e.length === 2) {
    const [t, n] = e;
    return t + n / 1e9;
  }
  return e instanceof Date ? e.getTime() / 1e3 : typeof e == "number" ? e > 1e12 ? q(e) : e : k();
}
function Ui(e) {
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
class Fn extends re {
  /**
   * This constructor should never be called manually. Those instrumenting tracing should use
   * `Sentry.startTransaction()`, and internal methods should use `hub.startTransaction()`.
   * @internal
   * @hideconstructor
   * @hidden
   */
  constructor(t) {
    super(t), this._measurements = {}, this._contexts = {}, this.name = t.name || "", this.metadata = u({
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
    this.spanRecorder || (this.spanRecorder = new $n(t)), this.spanRecorder.add(this);
  }
  /**
   * Set observed measurements for this transaction.
   * @hidden
   */
  setMeasurements(t) {
    this._measurements = u({}, t);
  }
  /**
   * Set metadata for this transaction.
   * @hidden
   */
  setMetadata(t) {
    this.metadata = u(u({}, this.metadata), t);
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
      contexts: u({
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
    ), s.measurements = this._measurements), E && p.log(`[Tracing] Finishing ${this.op} transaction: ${this.name}.`), Gs(s);
  }
  /**
   * @inheritDoc
   */
  toContext() {
    const t = super.toContext();
    return ut(_(u({}, t), {
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
const Bi = 1e3, Hi = 5e3;
class Gi extends $n {
  constructor(t, n, r = "", s) {
    super(s), this._pushActivity = t, this._popActivity = n, this.transactionSpanId = r;
  }
  /**
   * @inheritDoc
   */
  add(t) {
    t.spanId !== this.transactionSpanId && (t.finish = (n) => {
      t.endTimestamp = typeof n == "number" ? n : k(), this._popActivity(t.spanId);
    }, t.endTimestamp === void 0 && this._pushActivity(t.spanId)), super.add(t);
  }
}
class Wi extends Fn {
  constructor(t, n = Bi, r = !1) {
    super(t), this._idleTimeout = n, this._onScope = r, this.activities = {}, this._heartbeatCounter = 0, this._finished = !1, this._beforeFinishCallbacks = [], r && (E && p.log(`Setting idle transaction as active. Span ID: ${this.spanId}`), mt(this)), this._initTimeout = setTimeout(() => {
      this._finished || this.finish();
    }, this._idleTimeout);
  }
  /** {@inheritDoc} */
  finish(t = k()) {
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
    return this._onScope && mt(void 0), super.finish(t);
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
      this.spanRecorder = new Gi(n, r, this.spanId, t), E && p.log("Starting heartbeat"), this._pingHeartbeat();
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
      const n = this._idleTimeout, r = k() + n / 1e3;
      setTimeout(() => {
        this._finished || (this.setTag(Je, Ve[1]), this.finish(r));
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
    t === this._prevHeartbeatString ? this._heartbeatCounter += 1 : this._heartbeatCounter = 1, this._prevHeartbeatString = t, this._heartbeatCounter >= 3 ? (E && p.log("[Tracing] Transaction finished because of no change for 3 heart beats"), this.setStatus("deadline_exceeded"), this.setTag(Je, Ve[0]), this.finish()) : this._pingHeartbeat();
  }
  /**
   * Pings the heartbeat
   */
  _pingHeartbeat() {
    E && p.log(`pinging Heartbeat -> current counter: ${this._heartbeatCounter}`), setTimeout(() => {
      this._beat();
    }, Hi);
  }
}
function Ln(e, t, n) {
  const [r, s] = Is(
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
function wo(e, t) {
  const n = I(), r = n && n.getOptions && n.getOptions() || {}, s = e.name || e.op || "unknown-transaction", i = u({
    parentSampled: e.parentSampled,
    transactionContext: _(u({}, e), { name: s }),
    name: s
  }, t);
  let o = new Fn(_(u({}, e), { name: s }));
  if (o = Ln(o, r, i), o.sampled) {
    const a = r._experiments && r._experiments.maxSpans;
    o.initSpanRecorder(a), mt(o);
  }
  return o;
}
function zi(e, t, n, r) {
  const s = I(), i = s && s.getOptions && s.getOptions() || {}, o = e.name || e.op || "unknown-transaction", a = u({
    parentSampled: e.parentSampled,
    transactionContext: _(u({}, e), { name: o }),
    name: o
  }, r);
  let c = new Wi(_(u({}, e), { name: o }), t, n);
  if (c = Ln(c, i, a), c.sampled) {
    const l = i._experiments && i._experiments.maxSpans;
    c.initSpanRecorder(l), mt(c);
  }
  return c;
}
const qi = "sentry.javascript.miniapp", Xe = "10.27.0-rc.1", F = "?", Yi = /^\s*at (?:(.*?) ?\()?((?:file|https?|blob|chrome-extension|address|native|eval|webpack|<anonymous>|[-a-z]+:|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i, Ki = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:file|https?|blob|chrome|webpack|resource|moz-extension).*?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js))(?::(\d+))?(?::(\d+))?\s*$/i, Ji = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i, Vi = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i, Xi = /\((\S*)(?::(\d+))(?::(\d+))\)/, Zi = /^\s*at (.*?) ?\((\S*):(\d+):(\d+)\)/i;
function Z(e) {
  let t = null;
  const n = e && e.framesToPop;
  try {
    if (t = to(e), t)
      return Ze(t, n);
  } catch (r) {
  }
  try {
    if (t = Qi(e), t)
      return Ze(t, n);
  } catch (r) {
  }
  return {
    message: se(e),
    name: e && e.name,
    stack: [],
    failed: !0
  };
}
function Qi(e) {
  if (!e || !e.stack)
    return null;
  const t = [], n = e.stack.split(`
`);
  let r, s, i, o;
  for (let a = 0; a < n.length; ++a) {
    if (i = Yi.exec(n[a])) {
      const c = i[2] && i[2].indexOf("native") === 0;
      r = i[2] && i[2].indexOf("eval") === 0, r && (s = Xi.exec(i[2])) && (i[2] = s[1], i[3] = s[2], i[4] = s[3]), o = {
        url: i[2],
        func: i[1] || F,
        args: c ? [i[2]] : [],
        line: i[3] ? +i[3] : null,
        column: i[4] ? +i[4] : null
      };
    } else if (i = Ji.exec(n[a]))
      o = {
        url: i[2],
        func: i[1] || F,
        args: [],
        line: +i[3],
        column: i[4] ? +i[4] : null
      };
    else if (i = Ki.exec(n[a]))
      r = i[3] && i[3].indexOf(" > eval") > -1, r && (s = Vi.exec(i[3])) ? (i[1] = i[1] || "eval", i[3] = s[1], i[4] = s[2], i[5] = "") : a === 0 && !i[5] && e.columnNumber !== void 0 && (t[0].column = e.columnNumber + 1), o = {
        url: i[3],
        func: i[1] || F,
        args: i[2] ? i[2].split(",") : [],
        line: i[4] ? +i[4] : null,
        column: i[5] ? +i[5] : null
      };
    else if (i = Zi.exec(n[a]))
      o = {
        url: i[2],
        func: i[1] || F,
        args: [],
        line: i[3] ? +i[3] : null,
        column: i[4] ? +i[4] : null
      };
    else
      continue;
    !o.func && o.line && (o.func = F), t.push(o);
  }
  return t.length ? {
    message: se(e),
    name: e.name,
    stack: t
  } : null;
}
function to(e) {
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
    }), c && (!c.func && c.line && (c.func = F), i.push(c));
  }
  return i.length ? {
    message: se(e),
    name: e.name,
    stack: i
  } : null;
}
function Ze(e, t) {
  try {
    return _(u({}, e), {
      stack: e.stack.slice(t)
    });
  } catch (n) {
    return e;
  }
}
function se(e) {
  const t = e && e.message;
  return t ? t.error && typeof t.error.message == "string" ? t.error.message : t : "No error message";
}
const eo = 100;
function jn(e) {
  const t = ie(e.stack), n = {
    type: e.name,
    value: e.message
  };
  return t && t.length && (n.stacktrace = { frames: t }), n.type === void 0 && n.value === "" && (n.value = "Unrecoverable error caught"), n;
}
function no(e, t, n) {
  const r = {
    exception: {
      values: [
        {
          type: Xt(e) ? e.constructor.name : n ? "UnhandledRejection" : "Error",
          value: `Non-Error ${n ? "promise rejection" : "exception"} captured with keys: ${fr(e)}`
        }
      ]
    },
    extra: {
      __serialized__: Tn(e)
    }
  };
  if (t) {
    const s = Z(t), i = ie(s.stack);
    r.stacktrace = {
      frames: i
    };
  }
  return r;
}
function Qe(e) {
  return {
    exception: {
      values: [jn(e)]
    }
  };
}
function ie(e) {
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
  ).slice(0, eo).reverse();
}
function ro(e, t, n = {}) {
  let r;
  if (rr(e) && e.error)
    return e = e.error, r = Qe(Z(e)), r;
  if (pe(e) || sr(e)) {
    const s = e, i = s.name || (pe(s) ? "DOMError" : "DOMException"), o = s.message ? `${i}: ${s.message}` : i;
    return r = Yt(o, t, n), jt(r, o), r;
  }
  return nn(e) ? (r = Qe(Z(e)), r) : X(e) || Xt(e) ? (r = no(e, t, n.rejection), ft(r, {
    synthetic: !0
  }), r) : (r = Yt(e, t, n), jt(r, `${e}`), ft(r, {
    synthetic: !0
  }), r);
}
function Yt(e, t, n = {}) {
  const r = {
    message: e
  };
  if (n.attachStacktrace && t) {
    const s = Z(t), i = ie(s.stack);
    r.stacktrace = {
      frames: i
    };
  }
  return r;
}
const so = () => {
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
}, io = () => {
  let e = "unknown";
  return typeof wx == "object" ? e = "wechat" : typeof my == "object" ? e = "alipay" : typeof tt == "object" ? e = "bytedance" : typeof dd == "object" ? e = "dingtalk" : typeof qq == "object" ? e = "qq" : typeof swan == "object" && (e = "swan"), e;
}, b = so(), Un = io(), oo = "application/json";
function oe(e) {
  function t(n) {
    return new U((r, s) => {
      const i = b.request || b.httpRequest;
      if (typeof i != "function") {
        s(new Error("Miniapp request function is not available"));
        return;
      }
      i({
        url: e.url,
        method: "POST",
        data: n.body,
        header: { "content-type": oo },
        success(o) {
          var a, c, l, d;
          r({
            statusCode: o == null ? void 0 : o.statusCode,
            headers: {
              "x-sentry-rate-limits": (c = (a = o == null ? void 0 : o.headers) == null ? void 0 : a["X-Sentry-Rate-Limits"]) != null ? c : null,
              "retry-after": (d = (l = o == null ? void 0 : o.headers) == null ? void 0 : l["Retry-After"]) != null ? d : null
            }
          });
        },
        fail(o) {
          s(o);
        }
      });
    });
  }
  return ui(e, t);
}
const Ao = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  makeMiniappTransport: oe
}, Symbol.toStringTag, { value: "Module" })), ao = () => [];
class co extends hi {
  /**
   * Creates a new Miniapp SDK instance.
   *
   * @param options Configuration options for this SDK.
   */
  constructor(t = {}) {
    const n = t.transport || oe, r = t.stackParser || ao, s = t.integrations || t.defaultIntegrations || [], i = _(u({}, t), {
      transport: n,
      stackParser: r,
      integrations: s,
      dsn: t.dsn,
      // ensure defaults for required fields
      tracesSampleRate: t.tracesSampleRate
    });
    bi(i, "miniapp", ["miniapp"]), super(i);
  }
  /**
   * @inheritDoc
   */
  _prepareEvent(t, n, r, s) {
    return t.platform = t.platform || "javascript", t.sdk = _(u({}, t.sdk), {
      name: qi,
      packages: [
        ...t.sdk && t.sdk.packages || [],
        {
          name: "npm:@sentry/miniapp",
          version: Xe
        }
      ],
      version: Xe
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
    const r = n && n.syntheticException ? n.syntheticException : void 0, s = ro(t, r, {
      attachStacktrace: this._options.attachStacktrace
    });
    return n && n.event_id && (s.event_id = n.event_id), Promise.resolve(s);
  }
  /**
   * @inheritDoc
   */
  // eslint-disable-next-line deprecation/deprecation
  eventFromMessage(t, n = "info", r) {
    const s = r && r.syntheticException ? r.syntheticException : void 0, i = Yt(String(t), s, {
      attachStacktrace: this._options.attachStacktrace
    });
    return i.level = n, r && r.event_id && (i.event_id = r.event_id), Promise.resolve(i);
  }
}
function uo() {
  setTimeout(() => {
  });
}
function L(e, t = {}, n) {
  if (typeof e != "function")
    return e;
  try {
    const s = e.__sentry_wrapped__;
    if (s)
      return s;
    if (an(e))
      return e;
  } catch (s) {
    return e;
  }
  const r = function(...s) {
    try {
      const i = s.map((o) => L(o, t));
      return e.handleEvent ? e.handleEvent.apply(this, i) : e.apply(this, i);
    } catch (i) {
      throw uo(), Rr((o) => {
        o.addEventProcessor((a) => {
          const c = u({}, a);
          return t.mechanism && (jt(c, void 0), ft(c, t.mechanism)), c.extra = _(u({}, c.extra), {
            arguments: R(s, 3)
          }), c;
        }), zt(i);
      }), i;
    }
  };
  try {
    for (const s in e)
      Object.prototype.hasOwnProperty.call(e, s) && (r[s] = e[s]);
  } catch (s) {
  }
  on(r, e), Ot(e, "__sentry_wrapped__", r);
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
const Tt = class Tt {
  /** JSDoc */
  constructor(t) {
    this.name = Tt.id, this._onErrorHandlerInstalled = !1, this._onUnhandledRejectionHandlerInstalled = !1, this._onPageNotFoundHandlerInstalled = !1, this._onMemoryWarningHandlerInstalled = !1, this._options = u({
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
    this._onErrorHandlerInstalled || (b.onError && b.onError((t) => {
      const n = typeof t == "string" ? new Error(t) : t;
      zt(n);
    }), this._onErrorHandlerInstalled = !0);
  }
  /** JSDoc */
  _installGlobalOnUnhandledRejectionHandler() {
    this._onUnhandledRejectionHandlerInstalled || (b.onUnhandledRejection && b.onUnhandledRejection(
      ({ reason: t, promise: n }) => {
        const r = typeof t == "string" ? new Error(t) : t;
        zt(r, {
          data: n
        });
      }
    ), this._onUnhandledRejectionHandlerInstalled = !0);
  }
  /** JSDoc */
  _installGlobalOnPageNotFoundHandler() {
    this._onPageNotFoundHandlerInstalled || (b.onPageNotFound && b.onPageNotFound((t) => {
      const n = t.path.split("?")[0];
      $e("pagenotfound", n), Ce("message", JSON.stringify(t)), xe(`页面无法找到: ${n}`);
    }), this._onPageNotFoundHandlerInstalled = !0);
  }
  /** JSDoc */
  _installGlobalOnMemoryWarningHandler() {
    this._onMemoryWarningHandlerInstalled || (b.onMemoryWarning && b.onMemoryWarning(({ level: t = -1 }) => {
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
      $e("memory-warning", String(t)), Ce("message", n), xe("内存不足告警");
    }), this._onMemoryWarningHandlerInstalled = !0);
  }
};
Tt.id = "GlobalHandlers";
let gt = Tt;
const It = class It {
  constructor() {
    this._ignoreOnError = 0, this.name = It.id;
  }
  /** JSDoc */
  _wrapTimeFunction(t) {
    return function(...n) {
      const r = n[0];
      return n[0] = L(r, {
        mechanism: {
          data: { function: ct(t) },
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
        L(n, {
          mechanism: {
            data: {
              function: "requestAnimationFrame",
              handler: ct(t)
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
    const n = T, r = n[t] && n[t].prototype;
    !r || !r.hasOwnProperty || !r.hasOwnProperty("addEventListener") || (z(r, "addEventListener", function(s) {
      return function(i, o, a) {
        try {
          typeof o.handleEvent == "function" && (o.handleEvent = L(o.handleEvent.bind(o), {
            mechanism: {
              data: {
                function: "handleEvent",
                handler: ct(o),
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
          L(o, {
            mechanism: {
              data: {
                function: "addEventListener",
                handler: ct(o),
                target: t
              },
              handled: !0,
              type: "instrument"
            }
          }),
          a
        );
      };
    }), z(r, "removeEventListener", function(s) {
      return function(i, o, a) {
        let c = o;
        try {
          c = c && (c.__sentry_wrapped__ || c);
        } catch (l) {
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
    const t = T;
    z(t, "setTimeout", this._wrapTimeFunction.bind(this)), z(t, "setInterval", this._wrapTimeFunction.bind(this)), z(t, "requestAnimationFrame", this._wrapRAF.bind(this)), [
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
It.id = "TryCatch";
let _t = It;
function ct(e) {
  try {
    return e && e.name || "<anonymous>";
  } catch (t) {
    return "<anonymous>";
  }
}
const lo = "cause", po = 5, Y = class Y {
  /**
   * @inheritDoc
   */
  constructor(t = {}) {
    this.name = Y.id, this._key = t.key || lo, this._limit = t.limit || po;
  }
  /**
   * @inheritDoc
   */
  setupOnce() {
    Dt((t, n) => {
      const r = I(), s = r && r.getIntegrationByName(Y.id);
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
    const s = Z(t[n]), i = jn(s);
    return this._walkErrorTree(t[n], n, [i, ...r]);
  }
};
Y.id = "LinkedErrors";
let yt = Y;
const K = class K {
  constructor() {
    this.name = K.id;
  }
  /**
   * @inheritDoc
   */
  setupOnce() {
    Dt((t) => {
      const n = I();
      if (n && n.getIntegrationByName(K.id))
        try {
          const s = b.getSystemInfoSync(), {
            SDKVersion: i = "0.0.0",
            batteryLevel: o,
            // 微信小程序
            currentBattery: a,
            // 支付宝小程序、 钉钉小程序
            battery: c,
            // 字节跳动小程序
            brand: l,
            language: d,
            model: f,
            pixelRatio: g,
            platform: h,
            screenHeight: y,
            screenWidth: N,
            // statusBarHeight,
            system: S,
            version: A,
            // windowHeight,
            // windowWidth,
            app: M,
            // 支付宝小程序
            appName: st
            // 字节跳动小程序
            // fontSizeSetting, // 支付宝小程序、 钉钉小程序、微信小程序
          } = s, [Bn, Hn] = S.split(" "), Gn = _(u({}, t.tags), {
            SDKVersion: i
          }), Wn = M || st || Un || "app";
          return _(u({}, t), {
            tags: Gn,
            contexts: _(u({}, t.contexts), {
              device: {
                brand: l,
                battery_level: o || a || c,
                model: f,
                language: d,
                platform: h,
                screen_dpi: g,
                screen_height: y,
                screen_width: N
              },
              os: {
                name: Bn || S,
                version: Hn || S
              },
              browser: {
                name: Wn,
                version: A
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
K.id = "System";
let St = K;
const J = class J {
  /**
   * @inheritDoc
   */
  constructor(t) {
    this.name = J.id, this._options = u({
      enable: !0
    }, t);
  }
  /**
   * @inheritDoc
   */
  setupOnce() {
    Dt((t) => {
      const n = I();
      if (n && n.getIntegrationByName(J.id) && this._options.enable)
        try {
          const s = getCurrentPages().map(
            (i) => ({
              route: i.route,
              options: i.options
            })
          );
          return _(u({}, t), {
            extra: _(u({}, t.extra), {
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
J.id = "Router";
let Et = J;
const V = class V {
  constructor() {
    this.name = V.id;
  }
  /**
   * @inheritDoc
   */
  setupOnce() {
    Dt((t) => {
      const n = I();
      return n && n.getIntegrationByName(V.id) && Un === "wechat" && b.getLaunchOptionsSync && b.getLaunchOptionsSync().scene === 1129 ? null : t;
    });
  }
};
V.id = "IgnoreMpcrawlerErrors";
let bt = V;
const Do = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GlobalHandlers: gt,
  IgnoreMpcrawlerErrors: bt,
  LinkedErrors: yt,
  Router: Et,
  System: St,
  TryCatch: _t
}, Symbol.toStringTag, { value: "Module" })), fo = 1e12;
class ho {
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
    if (!b.getPerformance)
      return;
    const t = b.getPerformance();
    if (!(!t || typeof t.createObserver != "function"))
      return t;
  }
  _getTimeOrigin(t, n) {
    if (typeof t.timeOrigin == "number")
      return q(t.timeOrigin);
    const r = typeof t.now == "function" ? t.now() : void 0;
    return typeof r == "number" ? q(Date.now() - r) : n.startTimestamp;
  }
  _handleEntry(t, n) {
    if (t.endTimestamp !== void 0) {
      this._stopObserver();
      return;
    }
    const r = this._toTimestamp(n.startTime, t.startTimestamp), s = this._toTimestamp(n.startTime + n.duration, t.startTimestamp);
    mo(t, {
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
    return t > fo ? q(t) : ((s = this._timeOrigin) != null ? s : n) + q(t);
  }
  _stopObserver(t) {
    var n;
    (n = this._observer) == null || n.disconnect(), this._observer = void 0, t && !t.endTimestamp && t.finish();
  }
}
function mo(e, r) {
  var s = r, { startTimestamp: t } = s, n = Mt(s, ["startTimestamp"]);
  return t && e.startTimestamp > t && (e.startTimestamp = t), e.startChild(u({
    startTimestamp: t
  }, n));
}
function go(e, t = !0, n = !0) {
  const r = T, s = b.onAppRoute || r.wx && r.wx.onAppRoute;
  if (typeof s != "function")
    return;
  let i = !1, o;
  const a = (l, d) => {
    (d && t || !d && n) && (o && typeof o.finish == "function" && o.finish(), o = e(l));
  }, c = (l, d = !1) => {
    const f = (l == null ? void 0 : l.path) || (l == null ? void 0 : l.route) || (l == null ? void 0 : l.url) || "", g = typeof f == "string" && f.length > 0 ? f : "unknown-route";
    a(
      {
        name: g,
        op: "navigation",
        description: (l == null ? void 0 : l.openType) || (l == null ? void 0 : l.event) || void 0,
        metadata: { requestPath: g }
      },
      d
    );
  };
  if (t && typeof r.getCurrentPages == "function") {
    const l = r.getCurrentPages() || [], d = l[l.length - 1];
    d && d.route && (i = !0, c({ path: d.route }, !0));
  }
  s((l) => {
    const d = !i;
    i = !0, c(l, d);
  });
}
const _o = {
  traceRequest: !0
}, yo = 600, So = u({
  idleTimeout: 5e3,
  startTransactionOnLocationChange: !0,
  startTransactionOnPageLoad: !0,
  maxTransactionDuration: yo,
  routingInstrumentation: go
}, _o), vt = class vt {
  constructor(t) {
    this.name = vt.id, this._configuredIdleTimeout = t == null ? void 0 : t.idleTimeout, this.options = u(u({}, So), t);
    const { _metricOptions: n } = this.options;
    this._metrics = new ho(n && n._reportAllChanges);
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
    ), (s = b.onAppHide) == null || s.call(b, () => {
      const i = Fi();
      i == null || i.finish();
    });
  }
  /** Create routing idle transaction. */
  _createRouteTransaction(t) {
    var c;
    const { beforeNavigate: n, idleTimeout: r, maxTransactionDuration: s } = this.options, i = _(u({}, t), {
      trimEnd: !0
    }), o = typeof n == "function" ? n(i) : i;
    if (o === void 0)
      return;
    const a = zi(o, r, !0, {});
    return a.registerBeforeFinishCallback((l, d) => {
      Eo(Li(s), l, d);
    }), a.setTag("idleTimeout", (c = this._configuredIdleTimeout) != null ? c : r), this._metrics.addPerformanceEntries(a), a;
  }
};
vt.id = "MiniAppTracing";
let Kt = vt;
function Eo(e, t, n) {
  const r = n - t.startTimestamp;
  n && (r > e || r < 0) && (t.setStatus("deadline_exceeded"), t.setTag("maxTransactionDurationExceeded", "true"));
}
const bo = [
  wi(),
  ki(),
  new _t(),
  new gt(),
  new yt(),
  new St(),
  new Et(),
  new bt(),
  new Kt()
];
function Mo(e = {}) {
  e.defaultIntegrations === void 0 && (e.defaultIntegrations = bo), e.normalizeDepth = e.normalizeDepth || 5;
  const t = u({
    integrations: e.integrations || e.defaultIntegrations || [],
    stackParser: e.stackParser || (() => []),
    transport: e.transport || oe
  }, e);
  Si(co, t);
}
function Po(e = {}) {
  e.eventId || (e.eventId = vn());
  const t = I();
  t && t.showReportDialog(e);
}
function xo() {
  return vn();
}
function Co(e) {
  const t = I();
  return t ? t.flush(e) : At(!1);
}
function $o(e) {
  const t = I();
  return t ? t.close(e) : At(!1);
}
function Fo(e) {
  return L(e)();
}
export {
  Do as Integrations,
  co as MiniappClient,
  qi as SDK_NAME,
  Xe as SDK_VERSION,
  Ao as Transports,
  Ro as addBreadcrumb,
  Dt as addEventProcessor,
  Gs as captureEvent,
  zt as captureException,
  xe as captureMessage,
  $o as close,
  Oo as configureScope,
  bo as defaultIntegrations,
  Co as flush,
  x as getCurrentScope,
  Mo as init,
  xo as lastEventId,
  Io as setContext,
  Ce as setExtra,
  vo as setExtras,
  $e as setTag,
  ko as setTags,
  No as setUser,
  Po as showReportDialog,
  wo as startTransaction,
  Rr as withScope,
  Fo as wrap
};
