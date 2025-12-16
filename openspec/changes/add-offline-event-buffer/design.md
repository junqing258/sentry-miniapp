## Context
Miniapp environments may drop network requests when backgrounded or offline, leading to lost error reports. The SDK currently sends envelopes directly via the platform request API without persistence.

## Goals / Non-Goals
- Goals:
  - Improve event delivery reliability in flaky/offline conditions.
  - Keep default behavior unchanged (buffer is opt-in).
  - Avoid crashes if storage APIs are unavailable or quota is exceeded.
- Non-Goals:
  - Guarantee delivery (best-effort only).
  - Provide strong encryption at rest (would require broader key-management decisions).

## Decisions
- Store buffered items in platform storage when available; otherwise fall back to an in-memory queue for the current session.
- Cap buffer growth with limits (max items / max age / optional max bytes) and drop oldest entries on overflow.
- Drain strategy: attempt on SDK init, and again on lifecycle hooks when available (platform-dependent).

## Risks / Trade-offs
- Persisted envelopes may include user data.
  - Mitigation: default disabled; enabling is an explicit user choice; document the trade-off in `README.md`.
- Storage quotas and serialization errors.
  - Mitigation: best-effort writes; drop oldest; never throw during capture.

## Migration Plan
No migration is required because the feature is opt-in and introduces new configuration only.

## Open Questions
- Which lifecycle hook(s) should be preferred across platforms for retry (e.g. app foreground vs next cold start)?
- Should we expose a user hook to filter which events/envelopes are eligible for persistence?

