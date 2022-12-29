import nock from 'nock';
import fetch from '../src/fetch';

const GOOD = 'hello world';
const BAD = 'good bye cruel world';

describe('test/fetch.test.ts', () => {
  beforeAll(async () => {
    nock('https://bearei.com').get('/default/succeed').reply(200, GOOD);
    nock('https://bearei.com').get('/custom/succeed').reply(200, GOOD);
    nock('https://bearei.com').get('/fail').reply(404, BAD);
    nock('https://bearei.com').post('/json/succeed').reply(200, GOOD);
    nock('https://bearei.com').post('/text/succeed').reply(200, GOOD);
  });

  test('should be the default request', async () => {
    await fetch('https://bearei.com/default/succeed').then(result =>
      expect(result.data).toEqual(GOOD),
    );
  });

  test('should be a successful request', async () => {
    await fetch('https://bearei.com/custom/succeed', {
      timeout: 2000,
      headers: {
        token: 'QXV0aG9yaXphdGlvbg==',
        'content-type': 'multipart/form-data',
      },
    }).then(result => expect(result.data).toEqual(GOOD));
  });

  test('should be an exception request', async () => {
    await fetch('https://bearei.com/fail', {
      timeout: 4000,
    }).catch(error => expect(error.status).toEqual(404));
  });

  test('should be a timeout request', async () => {
    await fetch('https://www.bearei.com', {
      timeout: 1,
    }).catch(error => expect(typeof error).toEqual('object'));
  });

  test('should be responding to a request for JSON data', async () => {
    await fetch('https://bearei.com/json/succeed', {
      method: 'POST',
      data: { leaf: 'OK' },
    }).then(result => expect(result.data).toEqual(GOOD));
  });

  test('should be responding to a request for text data', async () => {
    await fetch('https://bearei.com/text/succeed', {
      method: 'POST',
      data: 'ok',
    }).then(result => expect(result.data).toEqual(GOOD));
  });
});
