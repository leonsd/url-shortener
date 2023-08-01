import { URL } from 'url';
import { Controller } from '../protocols/controller.protocol';
import { HttpRequest, HttpResponse } from '../protocols/http.protocol';
import { ShortenerDto } from '../protocols/shortener-dto.protocol';

export class ShortenerController implements Controller {
  async handle(httpRequest: HttpRequest<ShortenerDto>): Promise<HttpResponse> {
    const url = httpRequest.body?.url ?? '';
    try {
      new URL(url);
    } catch (error) {
      return {
        statusCode: 400,
        body: new Error(),
      };
    }

    return {
      statusCode: 200,
      body: {},
    };
  }
}
