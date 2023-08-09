import { MongoHelper } from '../../helpers/mongo.helper';
import {
  CreateUrlShortenerRepository,
  UrlData,
} from '../../../../../data/protocols/db/url-shortener-repository.protocol';
import { UrlModel } from '../../../../../domain/models/url.model';
import { UrlEntity } from '../../entities/url.entity';

export class UrlShortenerMongoRepository implements CreateUrlShortenerRepository {
  async create(urlData: UrlData): Promise<UrlModel> {
    const entity = await UrlEntity.create(urlData);

    return MongoHelper.map<UrlData>(entity) as UrlModel;
  }
}
