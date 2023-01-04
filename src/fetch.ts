import 'isomorphic-fetch';
import handleRequestBody from './body';
import handleConfigs, { CONFIGS as configs } from './config';
import initHandleRequestError from './error';
import handleRequestHeaders from './header';
import initHandleResponse from './response';
import handleRequestURL from './url';

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
  configs: typeof handleConfigs;
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

  const requestURL = handleRequestURL(url, { params, isEncode });
  const requestTimeout = timeout ?? configs.get('timeout') ?? 3000;
  const requestConfigs = {
    method,
    headers: requestHeaders,
    body: requestBody,
    ...args,
  };

  const fetchOptions = {
    url: requestURL,
    timeout: requestTimeout,
    params,
    ...requestConfigs,
  };

  const handleResponse = initHandleResponse(fetchOptions);
  const handleError = initHandleRequestError(fetchOptions);
  const abort = abortController ?? new AbortController();
  const signal = abort.signal;
  const timer = setTimeout(() => abort.abort(), requestTimeout);
  const handleFinally = () => {
    timer.unref?.();
    clearTimeout(timer);
  };

  return fetch(requestURL, { signal, ...requestConfigs })
    .then(handleResponse)
    .catch(handleError)
    .finally(handleFinally);
};

Object.defineProperty(request, 'configs', {
  value: handleConfigs,
});

export default request as FetchType;
