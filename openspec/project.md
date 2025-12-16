# Project Context

## Purpose
This repository is a Sentry SDK for Mini Program / Mini Game runtimes (e.g. WeChat, Alipay, ByteDance, DingTalk, QQ, Baidu Swan). It provides error monitoring, performance tracing (platform-dependent), structured logging, and metrics by adapting `@sentry/core` to the constraints of miniapp environments.

## Tech Stack
- **Language**: TypeScript (ESM package; builds ESM + CJS outputs)
- **Build**: Vite library build (`vite.config.ts`) + `vite-plugin-dts` for `.d.ts` generation, `terser` minification for release builds
- **Runtime dependency**: `@sentry/core` (currently `10.27.0`)
- **Type-checking**: `tsc --noEmit` (`pnpm lint`)
- **Package manager**: `pnpm` (lockfile: `pnpm-lock.yaml`)
- **Target runtime**: Miniapp JS engines (no Node.js runtime APIs; uses platform globals like `wx` / `my` / `tt` / `dd` / `qq` / `swan`)

## Project Conventions

### Code Style
- Keep changes consistent with surrounding files; the repo does not currently enforce ESLint/Prettier.
- TypeScript compiler settings are strict (`strict: true`, `noUnusedLocals`, `noUnusedParameters`), so new code should type-check cleanly.
- Prefer single-quoted strings in TS source (common style in `src/`); use semicolons as the existing code does.
- Avoid runtime usage of Node.js built-ins; the build treats Node built-ins as externals.

### Architecture Patterns
- **Public entrypoint**: `src/index.ts` re-exports `@sentry/core` APIs and this package’s miniapp-specific SDK functions.
- **Platform abstraction**: `src/crossPlatform.ts` selects a platform SDK from globals (`wx`, `my`, `tt`, `dd`, `qq`, `swan`) and exposes `sdk` + `appName`.
- **Transport**: `src/transports/xhr.ts` sends envelopes via miniapp request APIs (`sdk.request` or `sdk.httpRequest`).
- **Integrations**: miniapp-specific integrations live in `src/integrations/`; defaults are wired in `src/sdk.ts`.
- **Tracing**: miniapp tracing helpers/instrumentation live under `src/tracing/`.
- **Polyfills**: `src/polyfills/` are treated as side-effectful and must remain safe to import early.

### Testing Strategy
- No unit test runner is configured yet (`npm test` is a placeholder).
- Use `pnpm lint` (type-check) and `pnpm build` (bundle + `.d.ts` generation) as the primary CI-like checks.
- Manual smoke testing is typically done via the miniapp examples in `examples/` (e.g. `pnpm dev:weapp`, `pnpm dev:alipay`).

### Git Workflow
- Prefer small, focused PRs on feature branches.
- Update docs (README / OpenSpec specs) alongside behavior changes.
- No specific commit message convention is currently enforced.

## Domain Context
- Miniapp lifecycles and global error hooks differ from browsers (e.g. `onError`, `onUnhandledRejection`, `onPageNotFound`, `onMemoryWarning`).
- Networking is performed through platform SDK APIs (e.g. `request` / `httpRequest`), not `fetch`/XHR.
- Platform APIs and capabilities vary; features like tracing may not be available or require different instrumentation per platform.

## Important Constraints
- The published artifact is `dist/` and must be usable when copied into consumer miniapp projects (package.json `miniprogram` points at `dist`).
- Maintain dual-module support (ESM + CJS) and stable types (`dist/index.d.ts`).
- Keep bundle size reasonable and avoid introducing heavy new dependencies unless justified.
- Do not rely on Node.js runtime APIs; code must run inside miniapp sandboxes.

## External Dependencies
- Sentry ingest API (via DSN) and `@sentry/core` behavior for scopes, envelopes, tracing, logger, and metrics.
- Miniapp platform SDK globals: `wx`, `my`, `tt`, `dd`, `qq`, `swan`.
