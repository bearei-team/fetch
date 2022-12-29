import handleRequestBody from '../src/body';

describe('test/body.test.ts', () => {
  test('should be handle the request body', async () => {
    const result = handleRequestBody({
      data: { 'x-token': 'eC10b2tlbg==' },
      headers: { 'content-type': 'application/json' },
    });

    expect(typeof result).toEqual('string');
    expect(result).toEqual(JSON.stringify({ 'x-token': 'eC10b2tlbg==' }));
  });
});
