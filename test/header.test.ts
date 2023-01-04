import handleRequestHeaders from '../src/header';

describe('test/headers.test.ts', () => {
  test('should be handle request headers', async () => {
    const result = handleRequestHeaders({ 'x-token': 'eC10b2tlbg==' });

    expect(typeof result).toEqual('object');
    expect(result['x-token']).toEqual('eC10b2tlbg==');

    const arrayResult = handleRequestHeaders([['x-token', 'eC10b2tlbg==']]);

    expect(typeof arrayResult).toEqual('object');
    expect(arrayResult['x-token']).toEqual('eC10b2tlbg==');
  });
});
