import { NanoidAdapter } from '../../../infra/uuid/nanoid/nanoid.adapter';
import { UrlShortenerMongoRepository } from '../../../infra/db/mongodb/repositories/url-shortener/url-shortener.repository';
import { CreateShortenedUrl } from '../../../data/usecases/shortener/url-shortener.usecase';
import { ShortenerController } from '../../../presentation/controllers/shortener/shortener.controller';
import { Controller } from '../../../presentation/protocols/controller.protocol';
import { makeShortenerValidator } from './shortener-validation.factory';

export const makeShortenerController = (): Controller => {
  const nanoidAdapter = new NanoidAdapter();
  const urlShortenerMonboRepository = new UrlShortenerMongoRepository();
  const validator = makeShortenerValidator();
  const createShortenedUrl = new CreateShortenedUrl(
    nanoidAdapter,
    urlShortenerMonboRepository,
  );

  return new ShortenerController(validator, createShortenedUrl);
};
