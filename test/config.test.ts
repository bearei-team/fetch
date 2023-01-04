import handleConfigs, { CONFIGS as configs } from '../src/config';

describe('test/defaults.test.ts', () => {
  test('should set the global default params', async () => {
    handleConfigs({ baseUrl: 'https://baerei.com' });

    expect(configs.get('baseUrl')).toEqual('https://baerei.com');
  });
});
