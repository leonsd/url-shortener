import { UrlShortenerModel } from '../url-shortener.protocol';
import { env } from '../../../main/config/env.config';

export const mapper = (url: UrlShortenerModel): UrlShortenerModel => {
  const shortened = `${env.domain}/${url.shortened}`;

  return Object.assign({}, url, { shortened });
};
