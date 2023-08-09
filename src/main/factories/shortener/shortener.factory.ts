import { NanoidAdapter } from '../../../infra/uuid/nanoid/nanoid.adapter';
import { UrlShortenerMongoRepository } from '../../../infra/db/mongodb/repositories/url-shortener/url-shortener.repository';
import { CreateShortenedUrl } from '../../../data/usecases/shortener/url-shortener.usecase';
import { ShortenerController } from '../../../presentation/controllers/shortener/shortener.controller';
import { UrlValidatorAdapter } from '../../../utils/adapters/url-validator/url-validator.adapter';
import { Controller } from '../../../presentation/protocols/controller.protocol';

export const makeShortenerController = (): Controller => {
  const nanoidAdapter = new NanoidAdapter();
  const urlShortenerMonboRepository = new UrlShortenerMongoRepository();
  const urlValidator = new UrlValidatorAdapter();
  const createShortenedUrl = new CreateShortenedUrl(
    nanoidAdapter,
    urlShortenerMonboRepository,
  );

  return new ShortenerController(urlValidator, createShortenedUrl);
};
