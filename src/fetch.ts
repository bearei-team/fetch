import 'isomorphic-fetch';
import handleRequestBody from './body';
import handleDefaults, { DEFAULTS as defaults } from './defaults';
import initHandleRequestError from './error';
import handleRequestHeaders from './headers';
import initHandleResponse from './response';
import handleRequestUrl from './url';

/**
 * Body of the request, which is a BodyInit object or null
 */
export type DataType = RequestInit['body'] | unknown;

/**
 * Fetch API options
 */
export interface FetchOptions extends Omit<RequestInit, 'body'> {
  /**
   * Request timeout time
   *
   * The default value is 3000 milliseconds
   */
  timeout?: number;

  /**
   * Request query params
   *
   * The query params will be merged with the URL string params,
   * if the query params and the URL string params have the same key,
   * then the query params will overwrite the URL string params
   */
  params?: Record<string, string>;
  data?: DataType;
  body?: DataType;

  /**
   * Whether to encode URLs or not
   */
  isEncode?: boolean;

  /**
   * The AbortController
   *
   * @see — https://dom.spec.whatwg.org/#abortcontroller
   */
  abortController?: AbortController;
}

export type FetchType = typeof request & {
  defaults: typeof handleDefaults;
};

const request = (url: string, options: FetchOptions = {}) => {
  const {
    method = 'GET',
    params,
    timeout,
    headers,
    data,
    body,
    isEncode,
    abortController,
    ...args
  } = options;

  const requestHeaders = handleRequestHeaders(headers);
  const requestBody = handleRequestBody({
    body,
    data,
    headers: requestHeaders,
  });

  const requestUrl = handleRequestUrl(url, { params, isEncode });
  const requestInit = {
    method,
    headers: requestHeaders,
    body: requestBody,
    ...args,
  };

  const requestTimeout = timeout ?? defaults.get('timeout') ?? 3000;
  const fetchOptions = {
    url: requestUrl,
    timeout: requestTimeout,
    params,
    ...requestInit,
  };

  const handleResponse = initHandleResponse(fetchOptions);
  const handleError = initHandleRequestError(fetchOptions);
  const abort = abortController ?? new AbortController();
  const signal = abort.signal;
  const timer = setTimeout(() => abort.abort(), requestTimeout);

  return fetch(requestUrl, { signal, ...requestInit })
    .then(handleResponse)
    .catch(handleError)
    .finally(() => {
      timer.unref?.();
      clearTimeout(timer);
    });
};

Object.defineProperty(request, 'defaults', {
  value: handleDefaults,
});

export default request as FetchType;
