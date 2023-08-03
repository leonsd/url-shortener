import { GetUrl } from '../../domain/usecases/get-url.usecase';
import { InvalidParamError, NotFoundError } from '../errors';
import { badRequest, notFound, ok, serverError } from '../helpers/http.helper';
import { CodeValidator } from '../protocols/code-validator.protocol';
import { Controller, HttpRequest, HttpResponse } from './shortener.protocol';

export class RedirectToOriginalUrlController implements Controller {
  constructor(
    private readonly codeValidator: CodeValidator,
    private readonly getUrl: GetUrl,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { code } = httpRequest.params;
      const isValid = this.codeValidator.isValid(code);

      if (!isValid) {
        return badRequest(new InvalidParamError('code'));
      }

      const url = await this.getUrl.run(code);

      if (!url) {
        return notFound(new NotFoundError('Url'));
      }

      return ok(url);
    } catch (error) {
      return serverError();
    }
  }
}
