import {
  Controller,
  HttpRequest,
  HttpResponse,
  ShortenedUrl,
} from './shortener.protocol';
import { UrlShortener } from '../../../domain/usecases/url-shortener.usecase';
import { badRequest, created, serverError } from '../../helpers/http/http.helper';
import { Validation } from '../../protocols/validation.protocol';

export class ShortenerController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly createShortenedUrl: UrlShortener,
  ) {}

  async handle(
    httpRequest: HttpRequest,
  ): Promise<HttpResponse<ShortenedUrl | Error>> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error) {
        return badRequest(error);
      }

      const { url } = httpRequest.body;
      const { shortened } = await this.createShortenedUrl.run(url);

      return created<ShortenedUrl>({ shortenedUrl: shortened });
    } catch (error) {
      return serverError();
    }
  }
}
