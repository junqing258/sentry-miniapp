import type { ClientOptions, Integration } from '@sentry/core';

/**
 * Configuration options for the Sentry Miniapp SDK.
 */
export interface MiniappOptions extends ClientOptions {
  defaultIntegrations?: Integration[];
}
