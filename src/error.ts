import type { FetchOptions } from './fetch';

/**
 * Initialize the request error handle options
 */
export interface InitHandleRequestErrorOptions extends FetchOptions {
  /**
   * Request URL
   */
  url: string;
}

const handleRequestError = (
  error: unknown,
  options: InitHandleRequestErrorOptions,
) => {
  const err = error as Record<string, unknown>;
  const isResponseError = err.status && err.statusText && err.headers;

  if (err.message === 'Aborted') {
    throw Object.assign(new Error('Request Timeout'), { status: 408 });
  }

  if (isResponseError) {
    throw err;
  }

  throw Object.assign(err, { options });
};

const initHandleRequestError =
  (options: InitHandleRequestErrorOptions) => (error: unknown) =>
    handleRequestError(error, options);

export default initHandleRequestError;
