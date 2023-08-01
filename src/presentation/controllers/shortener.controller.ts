import {
  Controller,
  HttpRequest,
  HttpResponse,
  ShortenerDto,
  ShortenedUrl,
  UrlValidator,
} from './shortener.protocol';
import { InvalidParamError, MissingParamError } from '../errors';
import { UrlShortener } from '../../domain/usecases/url-shortener.usecase';
import { badRequest, created, serverError } from '../helpers/http.helper';

export class ShortenerController implements Controller {
  constructor(
    private readonly urlValidator: UrlValidator,
    private readonly urlShortener: UrlShortener,
  ) {}

  async handle(
    httpRequest: HttpRequest<ShortenerDto>,
  ): Promise<HttpResponse<ShortenedUrl | Error>> {
    try {
      const url = httpRequest.body?.url ?? '';
      if (!url) {
        return badRequest(new MissingParamError('url'));
      }

      const isValid = this.urlValidator.isValid(url);
      if (!isValid) {
        return badRequest(new InvalidParamError('url'));
      }

      const { shortenedUrl } = await this.urlShortener.run(url);

      return created<ShortenedUrl>({ shortenedUrl });
    } catch (error) {
      return serverError();
    }
  }
}
