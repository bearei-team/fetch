import { CONFIGS as configs } from './config';
import type { FetchOptions } from './fetch';

export type HandleRequestURLOptions = Pick<FetchOptions, 'params' | 'isEncode'>;

const handleRequestURL = (
  url: string,
  { params = {}, isEncode = true }: HandleRequestURLOptions,
) => {
  const handleFullURL = () => {
    let fullURL!: URL;

    try {
      fullURL = new URL(url);
    } catch (error) {
      fullURL = new URL(`${configs.get('baseURL')}${url}`);
    }

    return fullURL;
  };

  const { searchParams, origin, pathname } = handleFullURL();
  const requestURL = `${origin}${pathname !== '/' ? pathname : ''}`;
  const queries = {} as Record<string, unknown>;

  for (const key of searchParams.keys()) {
    Object.assign(queries, { [key]: searchParams.get(key) });
  }

  const queryParams = { ...queries, ...params };
  const paramsString = Object.keys(queryParams)
    .map(key => `${key}=${queryParams[key]}`)
    .join('&');

  const paramsResult = isEncode
    ? encodeURIComponent(paramsString)
    : paramsString;

  return paramsString ? `${requestURL}?${paramsResult}` : requestURL;
};

export default handleRequestURL;
