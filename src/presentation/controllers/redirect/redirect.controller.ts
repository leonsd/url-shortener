import { Controller, HttpRequest, HttpResponse } from './redirect.protocol';
import { NotFoundError } from '../../errors';
import {
  badRequest,
  notFound,
  found,
  serverError,
} from '../../helpers/http/http.helper';
import { GetUrl } from '../../../domain/usecases/get-url.usecase';
import { Validation } from '../../protocols/validation.protocol';

export class RedirectController implements Controller {
  constructor(
    private readonly validator: Validation,
    private readonly getUrlUseCase: GetUrl,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse<string | Error>> {
    try {
      const code = httpRequest.params?.code as string;
      const error = this.validator.validate(httpRequest.params);
      if (error) {
        return badRequest(error);
      }

      const url = await this.getUrlUseCase.run(code);
      if (!url) {
        return notFound(new NotFoundError('Url'));
      }

      return found<string>(url.original);
    } catch (error) {
      return serverError();
    }
  }
}
