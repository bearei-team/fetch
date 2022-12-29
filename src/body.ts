import type { FetchOptions } from './fetch';

/**
 * Handle the request body options
 */
export interface HandleRequestBodyOptions
  extends Pick<FetchOptions, 'data' | 'body'> {
  /**
   * Request headers
   */
  headers: Record<string, string>;
}

const handleRequestBody = ({
  data,
  body,
  headers,
}: HandleRequestBodyOptions) => {
  const nextData = data ?? body;
  const isJson =
    typeof nextData === 'object' &&
    nextData !== null &&
    headers['content-type']?.startsWith('application/json');

  return (isJson ? JSON.stringify(nextData) : nextData) as RequestInit['body'];
};

export default handleRequestBody;
