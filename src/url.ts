import { DEFAULTS as defaults } from './defaults';
import type { FetchOptions } from './fetch';

export type HandleRequestUrlOptions = Pick<FetchOptions, 'params' | 'isEncode'>;

const handleRequestUrl = (
  url: string,
  { params = {}, isEncode = true }: HandleRequestUrlOptions,
) => {
  const handleFullUrl = () => {
    let fullUrl!: URL;

    try {
      fullUrl = new URL(url);
    } catch (error) {
      fullUrl = new URL(`${defaults.get('baseUrl')}${url}`);
    }

    return fullUrl;
  };

  const { searchParams, origin, pathname } = handleFullUrl();
  const requestUrl = `${origin}${pathname !== '/' ? pathname : ''}`;
  const query = {} as Record<string, unknown>;

  for (const key of searchParams.keys()) {
    Object.assign(query, { [key]: searchParams.get(key) });
  }

  const queryParams = { ...query, ...params };
  const paramsString = Object.keys(queryParams)
    .map(key => `${key}=${queryParams[key]}`)
    .join('&');

  const paramsResult = isEncode
    ? encodeURIComponent(paramsString)
    : paramsString;

  return paramsString ? `${requestUrl}?${paramsResult}` : requestUrl;
};

export default handleRequestUrl;
