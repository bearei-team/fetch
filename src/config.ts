import type { FetchOptions } from './fetch';

/**
 * Handle config options
 */
export interface HandleConfigsOptions
  extends Pick<FetchOptions, 'headers' | 'timeout'> {
  /**
   * Request base URL
   *
   * BaseURL` will be automatically prepended to `url`, unless `url` is an
   * absolute URL
   */
  baseUrl?: string;
}

export const CONFIGS = new Map();

const handleConfigs = (options: HandleConfigsOptions) =>
  Object.entries(options).forEach(([key, value]) => CONFIGS.set(key, value));

export default handleConfigs;
