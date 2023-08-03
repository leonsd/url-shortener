import { UrlShortenerModel } from '../models/url-shortener.model';

export interface GetUrl {
  run(code: string): Promise<UrlShortenerModel | null>;
}
