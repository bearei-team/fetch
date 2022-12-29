import { DEFAULTS as defaults } from './defaults';
import type { FetchOptions } from './fetch';

const handleRequestHeaders = (
  headers: FetchOptions['headers'] = {},
): Record<string, string> => {
  const nextHeaders = {};

  Array.isArray(headers)
    ? headers.forEach(([key, val]) =>
        Object.assign(nextHeaders, { [key]: val }),
      )
    : Object.assign(nextHeaders, headers);

  const result = {
    'content-type': 'application/json; charset=utf-8',
    accept: '*/*',
    ...defaults.get('headers'),
    ...nextHeaders,
  };

  if (result['content-type'].startsWith('multipart/form-data')) {
    delete result['content-type'];
  }

  return result;
};

export default handleRequestHeaders;
