import { UrlModel } from '../../domain/models/url.model';

export interface GetUrlRepository {
  getByCode(code: string): Promise<UrlModel | null>;
}
