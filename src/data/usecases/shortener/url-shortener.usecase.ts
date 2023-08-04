import {
  UrlShortener,
  UrlShortenerModel,
  Shortener,
  CreateUrlShortenerRepository,
} from './url-shortener.protocol';
import { mapper } from './helpers/map.helper';

export class CreateShortenedUrl implements UrlShortener {
  constructor(
    private readonly shortener: Shortener,
    private readonly urlShortenerRepository: CreateUrlShortenerRepository,
  ) {}

  async run(originalUrl: string): Promise<UrlShortenerModel> {
    const size = 6;
    const shortened = this.shortener.shorten(size);
    const urlData = {
      original: originalUrl,
      shortened,
    };
    const url = await this.urlShortenerRepository.create(urlData);

    return mapper(url);
  }
}
