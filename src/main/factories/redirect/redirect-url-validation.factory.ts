import { RequiredFieldsValidation } from '../../../presentation/helpers/validations/required-fields/required-fields.validation';
import { CodeValidation } from '../../../presentation/helpers/validations/code/code.validation';
import { ValidationComposite } from '../../../presentation/helpers/validations/validation-composite';
import { Validation } from '../../../presentation/protocols/validation.protocol';
import { CodeValidatorAdapter } from '../../../utils/adapters/code-validator/code-validator.adapter';

export const makeRedirectValidator = (): Validation => {
  const validations: Validation[] = [];
  const requiredFieldValidation = new RequiredFieldsValidation('code');
  const codeValidator = new CodeValidatorAdapter();
  const codeValidation = new CodeValidation('code', codeValidator);

  validations.push(requiredFieldValidation, codeValidation);

  return new ValidationComposite(validations);
};
