import * as sut from './map.helper';
import { UrlShortenerModel } from '../../../domain/models/url-shortener.model';
import { env } from '../../../main/config/env.config';

describe('Map Helper', () => {
  test('Should return shortened with domain', async () => {
    const url: UrlShortenerModel = {
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
});
