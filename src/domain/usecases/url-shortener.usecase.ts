import { UrlModel } from '../models/url.model';

export interface UrlShortener {
  run(originalUrl: string): Promise<UrlModel>;
}
