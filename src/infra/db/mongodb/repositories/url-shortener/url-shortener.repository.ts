import { MongoHelper } from '../../helpers/mongo.helper';
import {
  CreateUrlShortenerRepository,
  UrlData,
} from '../../../../../data/protocols/url-shortener-repository.protocol';
import { UrlModel } from '../../../../../domain/models/url.model';

export class UrlShortenerMongoRepository implements CreateUrlShortenerRepository {
  async create(urlData: UrlData): Promise<UrlModel> {
    const urlCollection = await MongoHelper.getCollection('urls');
    await urlCollection.insertOne(urlData);

    return MongoHelper.map<UrlData>(urlData);
  }
}
