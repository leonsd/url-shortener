import { Controller } from '../protocols/controller.protocol';
import { HttpRequest, HttpResponse } from '../protocols/http.protocol';
import { ShortenerDto } from '../protocols/shortener-dto.protocol';
import { InvalidParamError, MissingParamError } from '../errors';
import { UrlValidator } from '../protocols/url-validator.protocol';
import { UrlShortener } from '../../domain/usecases/url-shortener.usecase';

export class ShortenerController implements Controller {
  constructor(
    private readonly urlValidator: UrlValidator,
    private readonly urlShortener: UrlShortener,
  ) {}

  async handle(httpRequest: HttpRequest<ShortenerDto>): Promise<HttpResponse> {
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
  }
}
