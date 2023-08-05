import * as sut from './map.helper';
import { UrlModel } from '../../../../domain/models/url.model';
import { env } from '../../../../main/config/env.config';

jest.mock('../../../../main/config/env.config', () => {
  return {
    env: {
      port: Number(process.env.PORT) || 3000,
      domain: process.env.DOMAIN ?? 'localhost',
    },
  };
});

describe('Map Helper', () => {
  test('Should return shortened with domain', async () => {
    env.port = null;
    const url: UrlModel = {
      id: 'valid_id',
      original: 'original_url',
      shortened: 'shortened_url',
    };
    const mapped = sut.mapper(url);

    expect(mapped).toBeTruthy();
    expect(mapped.id).toBeTruthy();
    expect(mapped.original).toBe(url.original);
    expect(mapped.shortened).toBe(`${env.domain}/${url.shortened}`);
  });

  test('Should return shortened with domain and port', async () => {
    env.port = 3000;
    const url: UrlModel = {
      id: 'valid_id',
      original: 'original_url',
      shortened: 'shortened_url',
    };
    const mapped = sut.mapper(url);

    expect(mapped).toBeTruthy();
    expect(mapped.id).toBeTruthy();
    expect(mapped.original).toBe(url.original);
    expect(mapped.shortened).toBe(`${env.domain}:${env.port}/${url.shortened}`);
  });
});
