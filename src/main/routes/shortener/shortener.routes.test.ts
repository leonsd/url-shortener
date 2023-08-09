import request from 'supertest';
import app from '../../config/app.config';
import { env } from '../../config/env.config';
import { MongoHelper } from '../../../infra/db/mongodb/helpers/mongo.helper';
import { UrlEntity } from '../../../infra/db/mongodb/entities/url.entity';

describe('Url Router', () => {
  beforeAll(async () => {
    const uri = env.mongoUrl;
    await MongoHelper.connect(uri);
  });

  beforeEach(async () => {
    await UrlEntity.deleteMany({});
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  test('Should return 400 if url is no provided', async () => {
    const response = await request(app).post('/shortener').send({});
    expect(response.status).toBe(400);
  });

  test('Should return 400 if invalid url is provided', async () => {
    const response = await request(app).post('/shortener').send({
      url: 'invalid_url',
    });
    expect(response.status).toBe(400);
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
