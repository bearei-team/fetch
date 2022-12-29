import type { FetchOptions } from './fetch';

/**
 * Handle default options
 */
export interface HandleDefaultsOptions
  extends Pick<FetchOptions, 'headers' | 'timeout'> {
  /**
   * Request base URL
   *
   * BaseURL` will be automatically prepended to `url`, unless `url` is an
   * absolute URL
   */
  baseUrl?: string;
}

export const DEFAULTS = new Map();

const handleDefaults = (options: HandleDefaultsOptions) =>
  Object.entries(options).forEach(([key, value]) => DEFAULTS.set(key, value));

export default handleDefaults;
