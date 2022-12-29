import 'isomorphic-fetch';
import initHandleResponse from '../src/response';

describe('test/response.test.ts', () => {
  test('should be a JSON data response', async () => {
    const response = new Response(JSON.stringify({}), {
      headers: { 'content-type': 'application/json; charset=utf-8' },
    });

    const handleResponse = initHandleResponse({ url: 'https://baerei.com' });

    await handleResponse(response).then(result =>
      expect(typeof result.data).toEqual('object'),
    );
  });

  test('should be a text data response', async () => {
    const response = new Response('ok', {
      headers: { 'content-type': 'text/plain; charset=utf-8' },
    });

    const handleResponse = initHandleResponse({ url: 'https://baerei.com' });

    await handleResponse(response).then(result =>
      expect(result.data).toEqual('ok'),
    );
  });

  test('should be octal stream data response and formatted as JSON data', async () => {
    const response = new Response(Buffer.from(JSON.stringify({})), {
      headers: { 'content-type': 'application/octet-stream; charset=utf-8' },
    });

    const handleResponse = initHandleResponse({ url: 'https://baerei.com' });

    await handleResponse(response).then(result =>
      expect(typeof result.data).toEqual('object'),
    );
  });

  test('should be octal stream data response and formatted as text data', async () => {
    const response = new Response(Buffer.from(''), {
      headers: { 'content-type': 'application/octet-stream; charset=utf-8' },
    });

    const handleResponse = initHandleResponse({ url: 'https://baerei.com' });

    await handleResponse(response).then(result =>
      expect(typeof result.data).toEqual('string'),
    );
  });

  test('should be other types of data response', async () => {
    const response = new Response('ok', {
      headers: { 'content-type': 'text/html; charset=utf-8' },
    });

    const handleResponse = initHandleResponse({ url: 'https://baerei.com' });

    await handleResponse(response).then(result =>
      expect(result.data).toEqual('ok'),
    );
  });

  test('should be no data response', async () => {
    const response = new Response('ok');

    response.headers.delete('content-type');

    const handleResponse = initHandleResponse({ url: 'https://baerei.com' });

    await handleResponse(response).then(result =>
      expect(result.data).toEqual('ok'),
    );
  });
});
