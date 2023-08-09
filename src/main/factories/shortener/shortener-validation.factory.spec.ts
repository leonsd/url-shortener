import { makeShortenerValidator } from './shortener-validation.factory';
import { ValidationComposite } from '../../../presentation/helpers/validations/validation-composite';
import { Validation } from '../../../presentation/protocols/validation.protocol';
import { RequiredFieldsValidation } from '../../../presentation/helpers/validations/required-fields/required-fields.validation';
import { UrlValidator } from '../../../presentation/protocols/url-validator.protocol';
import { UrlValidation } from '../../../presentation/helpers/validations/url/url.validation';

jest.mock('../../../presentation/helpers/validations/validation-composite');

const makeUrlValidator = (): UrlValidator => {
  class UrlValidatorStub implements UrlValidator {
    isValid(url: string): boolean {
      return true;
    }
  }

  return new UrlValidatorStub();
};

describe('ShortenerValidations Factory', () => {
  test('Should call ValidationComposite with all validations', async () => {
    const validations: Validation[] = [];
    validations.push(
      new RequiredFieldsValidation('url'),
      new UrlValidation('url', makeUrlValidator()),
    );

    makeShortenerValidator();
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
