import handleDefaults, { DEFAULTS as defaults } from '../src/defaults';

describe('test/defaults.test.ts', () => {
  test('should set the global default params', async () => {
    handleDefaults({ baseUrl: 'https://baerei.com' });

    expect(defaults.get('baseUrl')).toEqual('https://baerei.com');
  });
});
