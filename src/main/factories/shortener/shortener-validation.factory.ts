import { RequiredFieldsValidation } from '../../../presentation/helpers/validations/required-fields/required-fields.validation';
import { UrlValidation } from '../../../presentation/helpers/validations/url/url.validation';
import { ValidationComposite } from '../../../presentation/helpers/validations/validation-composite';
import { Validation } from '../../../presentation/protocols/validation.protocol';
import { UrlValidatorAdapter } from '../../adapters/url-validator/url-validator.adapter';

export const makeShortenerValidator = (): Validation => {
  const validations: Validation[] = [];
  const requiredFieldValidation = new RequiredFieldsValidation('url');
  const urlValidator = new UrlValidatorAdapter();
  const urlValidation = new UrlValidation('url', urlValidator);

  validations.push(requiredFieldValidation, urlValidation);

  return new ValidationComposite(validations);
};
