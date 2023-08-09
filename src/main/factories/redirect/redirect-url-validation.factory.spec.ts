import { makeRedirectValidator } from './redirect-url-validation.factory';
import { ValidationComposite } from '../../../presentation/helpers/validations/validation-composite';
import { Validation } from '../../../presentation/protocols/validation.protocol';
import { RequiredFieldsValidation } from '../../../presentation/helpers/validations/required-fields/required-fields.validation';
import { CodeValidator } from '../../../presentation/protocols/code-validator.protocol';
import { CodeValidation } from '../../../presentation/helpers/validations/code/code.validation';

jest.mock('../../../presentation/helpers/validations/validation-composite');

const makeCodeValidator = (): CodeValidator => {
  class CodeValidatorStub implements CodeValidator {
    isValid(url: string): boolean {
      return true;
    }
  }

  return new CodeValidatorStub();
};

describe('RedirectValidations Factory', () => {
  test('Should call ValidationComposite with all validations', async () => {
    const validations: Validation[] = [];
    validations.push(
      new RequiredFieldsValidation('code'),
      new CodeValidation('code', makeCodeValidator()),
    );

    makeRedirectValidator();
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
