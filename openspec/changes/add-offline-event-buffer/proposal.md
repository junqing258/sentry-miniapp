# Change: Add offline event buffering for miniapps

## Why
Miniapps frequently run with intermittent connectivity or aggressive backgrounding, which can cause Sentry envelope requests to fail and events to be dropped. A small, opt-in offline buffer improves reliability without changing default behavior.

## What Changes
- Add an **opt-in** persistent offline buffer which stores failed Sentry envelopes in miniapp storage and retries later.
- Add `MiniappOptions.offlineBuffer` configuration (enable/disable, limits, storage key).
- Retry buffered envelopes on SDK startup and on lifecycle hooks when available (best-effort; never crash if unsupported).

## Impact
- Affected specs: `event-buffering` (new capability)
- Affected code (expected): `src/backend.ts`, `src/transports/`, `src/crossPlatform.ts`, `src/sdk.ts`, `README.md`
- Compatibility: additive API only (no breaking changes intended); default behavior unchanged because the buffer is disabled unless enabled.

