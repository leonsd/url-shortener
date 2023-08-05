import { GetUrlRepository } from '../../../../../data/protocols/get-url-repository.protocol';
import { UrlModel } from '../../../../../domain/models/url.model';
import { MongoHelper } from '../../helpers/mongo.helper';

export class GetUrlMongoRepository implements GetUrlRepository {
  async getByCode(code: string): Promise<UrlModel | null> {
    const query = { shortened: code };
    const urlCollection = await MongoHelper.getCollection('urls');
    const url = await urlCollection.findOne<UrlModel>(query);

    return url ? MongoHelper.map(url) : null;
  }
}
