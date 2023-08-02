import { UrlShortenerModel } from '../../domain/models/url-shortener.model';

export interface UrlData {
  original: string;
  shortened: string;
}

export interface CreateUrlShortenerRepository {
  create(urlData: UrlData): Promise<UrlShortenerModel>;
}
