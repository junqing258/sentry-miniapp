# Repository Guidelines

## Project Structure & Module Organization

- `src/`: TypeScript source for the Sentry Miniapp SDK (integrations, transports, tracing, polyfills).
- `dist/`: built artifacts used for publishing and for copying into miniapp projects.
- `examples/`: runnable sample miniapps per platform (e.g. `examples/weapp/`, `examples/alipay/`); `vendor/` / `vender/` hold built SDK copies.
- `docs/`: project notes (see `docs/cross-platform.md` for platform API differences).
- `scripts/`: small maintenance utilities (e.g. version bump).
- `openspec/`: spec/change proposals and tasks (if included in your checkout).

## Build, Test, and Development Commands

- `pnpm install`: install dependencies (Node `>=16`; `.npmrc` defaults to the npmmirror registry).
- `pnpm build`: build the library with Vite into `dist/`.
- `pnpm dev:weapp`: watch-build into `examples/weapp/vender/` for local debugging.
- `pnpm lint`: typecheck only (`tsc --noEmit`).
- `pnpm run version`: sync version strings (e.g. bumps `src/version.ts` via `scripts/versionbump.js`).

## Coding Style & Naming Conventions

- TypeScript + ESM (`"type": "module"`). Keep changes compatible with the configured TS target (see `tsconfig.json`).
- No repo-wide formatter/linter is enforced; match the surrounding file’s style and avoid reformat-only diffs.
- Naming: `PascalCase` for classes/types, `camelCase` for variables/functions; keep filenames consistent with nearby modules.

## Testing Guidelines

- No automated test runner is configured (`pnpm test` currently exits). Validate changes by running `pnpm lint` + `pnpm build`, then smoke-testing the relevant `examples/<platform>/` app.

## Commit & Pull Request Guidelines

- Follow Conventional Commits used in git history (e.g. `feat(tracing): ...`, `chore(openspec): ...`; often in 简体中文).
- Optional helper: `./commit.sh` generates a commit message from staged diffs (requires `codex` CLI) and ignores `dist/` and `pnpm-lock.yaml`.
- PRs should include: what changed, affected platform(s), verification steps, and screenshots/video when examples/UI behavior changes.

## Security & Configuration Tips

- Never commit real DSNs or secrets; keep placeholders like `__DSN__` in docs/examples.
- Avoid hand-editing generated outputs under `dist/` and `examples/**/vendor|vender/` unless preparing a release.
