import { UrlValidation } from './url.validation';
import { UrlValidator } from '../../../protocols/url-validator.protocol';

const makeFakeObject = () => {
  return {
    url: 'any_url',
  };
};

const makeUrlValidator = (): UrlValidator => {
  class UrlValidatorStub implements UrlValidator {
    isValid(url: string): boolean {
      return true;
    }
  }

  return new UrlValidatorStub();
};

interface SutTypes {
  sut: UrlValidation;
  urlValidatorStub: UrlValidator;
}

const makeSut = (): SutTypes => {
  const urlValidatorStub = makeUrlValidator();
  const sut = new UrlValidation('url', urlValidatorStub);

  return {
    sut,
    urlValidatorStub,
  };
};

describe('Url Validation', () => {
  test('Should call UrlValidator with correct value', async () => {
    const { sut, urlValidatorStub } = makeSut();
    const isValidSpy = jest.spyOn(urlValidatorStub, 'isValid');
    const input = makeFakeObject();
    input.url = 'invalid_url';

    sut.validate(input);
    expect(isValidSpy).toHaveBeenCalledWith(input.url);
  });
});
