import { UrlModel } from '../../domain/models/url.model';

export interface UrlData {
  original: string;
  shortened: string;
}

export interface CreateUrlShortenerRepository {
  create(urlData: UrlData): Promise<UrlModel>;
}
