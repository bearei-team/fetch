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

  Object.assign(err, { options });

  if ((err.type as string)?.toLowerCase() === 'aborted') {
    throw Object.assign(err, { status: 408, message: 'request timeout' });
  }

  if (isResponseError) {
    throw err;
  }

  throw err;
};

const initHandleRequestError =
  (options: InitHandleRequestErrorOptions) => (error: unknown) =>
    handleRequestError(error, options);

export default initHandleRequestError;
