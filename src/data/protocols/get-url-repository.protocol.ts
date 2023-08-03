import { UrlShortenerModel } from '../../domain/models/url-shortener.model';

export interface GetUrlRepository {
  getByCode(code: string): Promise<UrlShortenerModel>;
}
