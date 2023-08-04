import request from 'supertest';
import app from '../config/app.config';
import { env } from '../config/env.config';
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo.helper';

describe('RedirectUrl Router', () => {
  beforeAll(async () => {
    const uri = env.mongoUrl;
    await MongoHelper.connect(uri);
  });

  beforeEach(async () => {
    const urlCollection = await MongoHelper.getCollection('urls');
    await urlCollection.deleteMany({});
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  test('Should return 400 if invalid code', async () => {
    const code = 'invalid_code';
    const response = await request(app).get(`/${code}`);

    expect(response.status).toBe(400);
  });

  test('Should return 404 if url not found', async () => {
    const code = 'I1QEC7';
    const response = await request(app).get(`/${code}`);

    expect(response.status).toBe(404);
  });

  test('Should return 302 if success', async () => {
    const code = 'I1QEC7';
    const urlCollection = await MongoHelper.getCollection('urls');
    await urlCollection.insertOne({
      original: 'valid_original_url',
      shortened: code,
    });

    const response = await request(app).get(`/${code}`);

    expect(response.status).toBe(302);
  });
});
