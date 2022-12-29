import initHandleRequestError from '../src/error';

describe('test/error.test.ts', () => {
  test('should be handle local request errors', async () => {
    try {
      const handleRequestError = initHandleRequestError({
        data: 'eC10b2tlbg==',
        url: 'https://leaf-x.com',
      });

      handleRequestError(
        new Error('Link failed, please check your local network.'),
      );
    } catch (error) {
      const relError = error as Record<string, unknown>;

      expect(relError.message).toEqual(
        'Link failed, please check your local network.',
      );
    }
  });

  test('should be handle request response errors', async () => {
    try {
      const handleRequestError = initHandleRequestError({
        data: 'eC10b2tlbg==',
        url: 'https://leaf-x.com',
      });

      handleRequestError({
        status: 400,
        statusText: 'Params error',
        headers: {},
      });
    } catch (error) {
      const relError = error as Record<string, unknown>;

      expect(relError.status).toEqual(400);
    }
  });
});
