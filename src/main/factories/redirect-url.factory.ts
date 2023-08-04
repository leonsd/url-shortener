import { GetUrlMongoRepository } from '../../infra/db/mongodb/repositories/get-url/get-url.repository';
import { GetUrlUseCase } from '../../data/usecases/get-url/get-url.usecase';
import { RedirectController } from '../../presentation/controllers/redirect/redirect.controller';
import { CodeValidatorAdapter } from '../../utils/adapters/code-validator.adapter';
import { Controller } from '../../presentation/protocols/controller.protocol';

export const makeRedirectController = (): Controller => {
  const getUrlMongoRepository = new GetUrlMongoRepository();
  const codeValidator = new CodeValidatorAdapter();
  const getUrlUseCase = new GetUrlUseCase(getUrlMongoRepository);

  return new RedirectController(codeValidator, getUrlUseCase);
};
