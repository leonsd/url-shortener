import { UrlShortenerModel } from '../models/url-shortener.model';

export interface UrlShortener {
  run(originalUrl: string): Promise<UrlShortenerModel>;
}
