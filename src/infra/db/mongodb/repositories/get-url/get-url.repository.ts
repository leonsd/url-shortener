import { GetUrlRepository } from '../../../../../data/protocols/get-url-repository.protocol';
import { UrlShortenerModel } from '../../../../../domain/models/url-shortener.model';
import { MongoHelper } from '../../helpers/mongo.helper';

export class GetUrlMongoRepository implements GetUrlRepository {
  async getByCode(code: string): Promise<UrlShortenerModel | null> {
    const query = { shortened: code };
    const urlCollection = await MongoHelper.getCollection('urls');
    const url = await urlCollection.findOne<UrlShortenerModel>(query);

    return url ? MongoHelper.map(url) : null;
  }
}
