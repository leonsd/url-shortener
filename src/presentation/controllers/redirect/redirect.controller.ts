import {
  Controller,
  HttpRequest,
  HttpResponse,
  Validation,
} from './redirect.protocol';
import { NotFoundError } from '../../errors';
import { GetUrl } from '../../../domain/usecases/get-url.usecase';
import {
  badRequest,
  notFound,
  found,
  serverError,
} from '../../helpers/http/http.helper';

export class RedirectController implements Controller {
  constructor(
    private readonly validator: Validation,
    private readonly getUrlUseCase: GetUrl,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse<string | Error>> {
    try {
      const error = this.validator.validate(httpRequest.params);
      if (error) {
        return badRequest(error);
      }

      const code = httpRequest.params.code;
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
