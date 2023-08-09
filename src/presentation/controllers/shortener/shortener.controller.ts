import {
  Controller,
  HttpRequest,
  HttpResponse,
  ShortenerBodyDto,
  ShortenedUrl,
  UrlValidator,
} from './shortener.protocol';
import { InvalidParamError, MissingParamError } from '../../errors';
import { UrlShortener } from '../../../domain/usecases/url-shortener.usecase';
import { badRequest, created, serverError } from '../../helpers/http/http.helper';

export class ShortenerController implements Controller {
  constructor(
    private readonly urlValidator: UrlValidator,
    private readonly createShortenedUrl: UrlShortener,
  ) {}

  async handle(
    httpRequest: HttpRequest<ShortenerBodyDto>,
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

      const { shortened } = await this.createShortenedUrl.run(url);

      return created<ShortenedUrl>({ shortenedUrl: shortened });
    } catch (error) {
      return serverError();
    }
  }
}
