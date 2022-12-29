import handleDefaults from '../src/defaults';
import handleRequestUrl from '../src/url';

describe('test/url.test.ts', () => {
  test('should be handle URLs without params', async () => {
    const result = handleRequestUrl('https://baerei.com', { params: {} });

    expect(result).toEqual('https://baerei.com');
  });

  test('should be handle URLs with params', async () => {
    const result = handleRequestUrl('https://baerei.com?test=test', {
      params: { name: 'bing' },
    });

    expect(result).toEqual('https://baerei.com?test%3Dtest%26name%3Dbing');
  });

  test('should be the handle path', async () => {
    handleDefaults({ baseUrl: 'https://baerei.com' });

    const result = handleRequestUrl('/v1/api?test=test', {
      params: { name: 'bing' },
    });

    expect(result).toEqual(
      'https://baerei.com/v1/api?test%3Dtest%26name%3Dbing',
    );
  });
});
