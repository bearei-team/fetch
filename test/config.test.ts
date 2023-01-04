import handleConfigs, { CONFIGS as configs } from '../src/config';

describe('test/defaults.test.ts', () => {
  test('should set the global default params', async () => {
    handleConfigs({ baseURL: 'https://baerei.com' });

    expect(configs.get('baseURL')).toEqual('https://baerei.com');
  });
});
