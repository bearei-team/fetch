import { CONFIGS as configs } from './config';
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

  const results = {
    'content-type': 'application/json; charset=utf-8',
    accept: '*/*',
    ...configs.get('headers'),
    ...nextHeaders,
  };

  if (results['content-type'].startsWith('multipart/form-data')) {
    delete results['content-type'];
  }

  return results;
};

export default handleRequestHeaders;
