## ADDED Requirements

### Requirement: Optional Offline Envelope Buffer
When enabled, the SDK SHALL persist Sentry envelopes which fail to send due to request errors, and SHALL retry sending them later.

#### Scenario: Send fails and envelope is buffered
- **WHEN** the SDK attempts to send an envelope and the platform request call fails
- **THEN** the SDK buffers the envelope for a later retry
- **AND** the SDK does not throw to user code as a result of buffering

#### Scenario: Buffered envelopes are retried
- **WHEN** the SDK initializes or a retry trigger occurs (e.g. app foreground/resume where available)
- **THEN** the SDK attempts to send buffered envelopes before dropping them

### Requirement: Buffer Limits And Eviction
The SDK MUST bound offline buffer growth using configurable limits and MUST evict older buffered envelopes when limits are exceeded.

#### Scenario: Buffer overflows
- **WHEN** a new envelope would exceed configured limits (count/age/size)
- **THEN** the SDK evicts the oldest buffered envelopes until the buffer is within limits

### Requirement: Storage Failure Safety
The SDK SHALL treat persistence as best-effort and SHALL continue operating if storage APIs are unavailable or persistence fails.

#### Scenario: Storage is unavailable
- **WHEN** the SDK cannot read or write the configured storage backend
- **THEN** the SDK falls back to an in-memory buffer for the current session (or drops buffered items if necessary)
- **AND** the SDK continues sending envelopes directly when possible

### Requirement: Explicit Opt-In Configuration
Offline persistence MUST be disabled by default and MUST require explicit user enablement via SDK configuration.

#### Scenario: Default behavior
- **WHEN** the user does not configure offline buffering
- **THEN** the SDK does not persist envelopes to storage

