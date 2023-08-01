import { UrlShortenerModel } from '../models/url-shortener.model';

export interface UrlShortener {
  run(url: string): Promise<UrlShortenerModel>;
}
