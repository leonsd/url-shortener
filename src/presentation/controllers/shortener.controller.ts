import {
  Controller,
  HttpRequest,
  HttpResponse,
  ShortenerDto,
  UrlValidator,
} from './shortener.protocol';
import { InvalidParamError, MissingParamError, ServerError } from '../errors';
import { UrlShortener } from '../../domain/usecases/url-shortener.usecase';

export class ShortenerController implements Controller {
  constructor(
    private readonly urlValidator: UrlValidator,
    private readonly urlShortener: UrlShortener,
  ) {}

  async handle(httpRequest: HttpRequest<ShortenerDto>): Promise<HttpResponse> {
    try {
      const url = httpRequest.body?.url ?? '';
      if (!url) {
        return {
          statusCode: 400,
          body: new MissingParamError('url'),
        };
      }

      const isValid = this.urlValidator.isValid(url);
      if (!isValid) {
        return {
          statusCode: 400,
          body: new InvalidParamError('url'),
        };
      }

      const urlShortener = this.urlShortener.run(url);

      return {
        statusCode: 200,
        body: {
          urlShortener,
        },
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: new ServerError(),
      };
    }
  }
}
