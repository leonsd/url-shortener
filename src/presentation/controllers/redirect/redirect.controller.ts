import {
  Controller,
  CodeValidator,
  HttpRequest,
  HttpResponse,
  RedirectParamsDto,
} from './redirect.protocol';
import { InvalidParamError, NotFoundError } from '../../errors';
import {
  badRequest,
  notFound,
  found,
  serverError,
} from '../../helpers/http.helper';
import { GetUrl } from '../../../domain/usecases/get-url.usecase';

export class RedirectController implements Controller {
  constructor(
    private readonly codeValidator: CodeValidator,
    private readonly getUrlUseCase: GetUrl,
  ) {}

  async handle(
    httpRequest: HttpRequest<unknown, RedirectParamsDto>,
  ): Promise<HttpResponse<string | Error>> {
    try {
      const code = httpRequest.params?.code as string;
      const isValid = this.codeValidator.isValid(code);

      if (!isValid) {
        return badRequest(new InvalidParamError('code'));
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
