import {
  UrlShortener,
  UrlShortenerModel,
  Shortener,
  UrlShortenerRepository,
} from './url-shortener.protocol';

export class CreateShortenedUrl implements UrlShortener {
  constructor(
    private readonly shortener: Shortener,
    private readonly urlShortenerRepository: UrlShortenerRepository,
  ) {}

  async run(originalUrl: string): Promise<UrlShortenerModel> {
    const size = 6;
    const shortened = this.shortener.shorten(size);
    const urlData = {
      original: originalUrl,
      shortened,
    };
    const url = await this.urlShortenerRepository.create(urlData);

    return url;
  }
}
