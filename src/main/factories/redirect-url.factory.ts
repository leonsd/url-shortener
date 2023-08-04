import { GetUrlMongoRepository } from '../../infra/db/mongodb/repositories/get-url/get-url.repository';
import { GetUrlUseCase } from '../../data/usecases/get-url/get-url.usecase';
import { RedirectToOriginalUrlController } from '../../presentation/controllers/redirect-to-original-url.controller';
import { CodeValidatorAdapter } from '../../utils/adapters/code-validator.adapter';
import { Controller } from '../../presentation/protocols/controller.protocol';

export const makeRedirectToOriginalUrlController = (): Controller => {
  const getUrlMongoRepository = new GetUrlMongoRepository();
  const codeValidator = new CodeValidatorAdapter();
  const getUrlUseCase = new GetUrlUseCase(getUrlMongoRepository);

  return new RedirectToOriginalUrlController(codeValidator, getUrlUseCase);
};
