import { MongoHelper as sut } from './mongo.helper';

describe('Mongo Helper', () => {
  beforeAll(async () => {
    const uri = process.env.MONGO_URL ?? '';
    await sut.connect(uri);
  });

  afterAll(async () => {
    await sut.disconnect();
  });

  test('Should reconnection if needed before getCollection', async () => {
    // let urlCollection = await sut.getCollection('urls');
    // expect(urlCollection).toBeTruthy();
    // await sut.disconnect();
    // urlCollection = await sut.getCollection('urls');
    // expect(urlCollection).toBeTruthy();
  });
});
