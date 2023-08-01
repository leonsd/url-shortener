import { UrlShortenerModel } from '../../domain/models/url-shortener.model';

export interface UrlData {
  original: string;
  shortened: string;
}

export interface UrlShortenerRepository {
  create(urlData: UrlData): Promise<UrlShortenerModel>;
}
