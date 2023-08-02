import { UrlShortenerModel } from '../url-shortener.protocol';
import { env } from '../../../main/config/env.config';

export const mapper = (url: UrlShortenerModel): UrlShortenerModel => {
  const port = env.port ? `:${env.port}` : '';
  const shortened = `${env.domain}${port}/${url.shortened}`;

  return Object.assign({}, url, { shortened });
};
