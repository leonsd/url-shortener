import { UrlShortenerMongoRepository } from './url-shortener.repository';
import { MongoHelper } from '../helpers/mongo.helper';
import {
  CreateUrlShortenerRepository,
  UrlData,
} from '../../../../data/protocols/url-shortener-repository.protocol';

const makeSut = (): CreateUrlShortenerRepository => {
  return new UrlShortenerMongoRepository();
};

describe('UrlShortener Repository', () => {
  beforeAll(async () => {
    const uri = process.env.MONGO_URL ?? '';
    await MongoHelper.connect(uri);
  });

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('urls');
    await accountCollection.deleteMany({});
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  test('Should create shortened url with success', async () => {
    const sut = makeSut();
    const urlData: UrlData = {
      original: 'valid_url.com',
      shortened: 'valid_url',
    };
    const url = await sut.create(urlData);

    expect(url).toBeTruthy();
    expect(url.id).toBeTruthy();
    expect(url.original).toBe(urlData.original);
    expect(url.shortened).toBe(urlData.shortened);
  });
});
