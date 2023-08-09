import { GetUrlMongoRepository } from '../../../infra/db/mongodb/repositories/get-url/get-url.repository';
import { GetUrlUseCase } from '../../../data/usecases/get-url/get-url.usecase';
import { RedirectController } from '../../../presentation/controllers/redirect/redirect.controller';
import { Controller } from '../../../presentation/protocols/controller.protocol';
import { makeRedirectValidator } from './redirect-url-validation.factory';

export const makeRedirectController = (): Controller => {
  const getUrlMongoRepository = new GetUrlMongoRepository();
  const getUrlUseCase = new GetUrlUseCase(getUrlMongoRepository);
  const validator = makeRedirectValidator();

  return new RedirectController(validator, getUrlUseCase);
};
