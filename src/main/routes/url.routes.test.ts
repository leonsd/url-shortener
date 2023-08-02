import request from 'supertest';
import app from '../config/app.config';
import { env } from '../config/env.config';
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo.helper';

describe('Url Router', () => {
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

  test('Should return an shortened url on success', async () => {
    const response = await request(app).post('/shortener').send({
      url: 'http://any-url.com.br',
    });

    expect(response.status).toBe(201);
    expect(response.body).toBeTruthy();
    expect(response.body.shortenedUrl).toMatch(
      new RegExp(`${env.domain}:${env.port}/`),
    );
  });
});
