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
  if (typeof error === 'object' && error !== null) {
    const errs = error as Record<string, unknown>;

    Object.assign(errs, { options });

    if ((errs.type as string)?.toLowerCase() === 'aborted') {
      throw Object.assign(errs, { status: 408, message: 'request timeout' });
    }

    throw errs;
  }

  throw error;
};

const initHandleRequestError =
  (options: InitHandleRequestErrorOptions) => (error: unknown) =>
    handleRequestError(error, options);

export default initHandleRequestError;
