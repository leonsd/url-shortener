import { InvalidParamError } from '../errors';
import { badRequest, serverError } from '../helpers/http.helper';
import { CodeValidator } from '../protocols/code-validator.protocol';
import { Controller, HttpRequest, HttpResponse } from './shortener.protocol';

export class RedirectToOriginalUrlController implements Controller {
  constructor(private readonly codeValidator: CodeValidator) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { code } = httpRequest.params;
      const isValid = this.codeValidator.isValid(code);

      if (!isValid) {
        return badRequest(new InvalidParamError('code'));
      }

      return {
        statusCode: 200,
        body: {},
      };
    } catch (error) {
      return serverError();
    }
  }
}
