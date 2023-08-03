import { GetUrlRepository } from '../../../../../data/protocols/get-url-repository.protocol';
import { UrlShortenerModel } from '../../../../../domain/models/url-shortener.model';

export class GetUrlMongoRepository implements GetUrlRepository {
  async getByCode(code: string): Promise<UrlShortenerModel> {
    return null as unknown as UrlShortenerModel;
  }
}
