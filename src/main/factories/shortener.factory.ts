import { ShortenerAdapter } from '../../infra/shortener/shortener.adapter';
import { UrlShortenerMongoRepository } from '../../infra/db/mongodb/repositories/url-shortener.repository';
import { CreateShortenedUrl } from '../../data/usecases/url-shortener.usecase';
import { ShortenerController } from '../../presentation/controllers/shortener.controller';
import { UrlValidatorAdapter } from '../../utils/adapters/url-validator.adapter';
import { Controller } from '../../presentation/protocols/controller.protocol';

export const makeShortenerController = (): Controller => {
  const shortener = new ShortenerAdapter();
  const urlShortenerMonboRepository = new UrlShortenerMongoRepository();
  const urlValidator = new UrlValidatorAdapter();
  const createShortenedUrl = new CreateShortenedUrl(
    shortener,
    urlShortenerMonboRepository,
  );

  return new ShortenerController(urlValidator, createShortenedUrl);
};
