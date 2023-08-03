import { serverError } from '../helpers/http.helper';
import { Controller, HttpRequest, HttpResponse } from './shortener.protocol';

export class RedirectToOriginalUrlController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { code } = httpRequest.params;

      return {
        statusCode: 400,
        body: {},
      };
    } catch (error) {
      return serverError();
    }
  }
}
