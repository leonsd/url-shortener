import { UrlEntity } from '../../entities/url.entity';
import { GetUrlRepository } from '../../../../../data/protocols/db/get-url-repository.protocol';
import { UrlModel } from '../../../../../domain/models/url.model';
import { MongoHelper } from '../../helpers/mongo.helper';

export class GetUrlMongoRepository implements GetUrlRepository {
  async getByCode(code: string): Promise<UrlModel | null> {
    const query = { shortened: code };
    const entity = await UrlEntity.findOne(query);

    return MongoHelper.map<UrlModel>(entity);
  }
}
