import { GetUrlMongoRepository } from './get-url.repository';
import { MongoHelper } from '../../helpers/mongo.helper';

const makeSut = (): GetUrlMongoRepository => {
  return new GetUrlMongoRepository();
};

describe('GetUrl Repository', () => {
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

  test('Should get url with success', async () => {
    const sut = makeSut();
    const code = 'valid_shortened_url';
    const collection = await MongoHelper.getCollection('urls');
    await collection.insertOne({
      original: 'valid_original_url',
      shortened: 'valid_shortened_url',
    });
    const url = await sut.getByCode(code);

    expect(url).toBeTruthy();
    expect(url?.id).toBeTruthy();
    expect(url?.original).toBe('valid_original_url');
    expect(url?.shortened).toBe('valid_shortened_url');
  });

  test('Should return null if url not found', async () => {
    const sut = makeSut();
    const code = 'valid_shortened_url';
    const url = await sut.getByCode(code);

    expect(url).toBe(null);
  });
});
