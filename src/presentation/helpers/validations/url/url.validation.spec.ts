import { UrlValidation } from './url.validation';
import { UrlValidator } from '../../../protocols/url-validator.protocol';
import { InvalidParamError } from '../../../errors';

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

    sut.validate(input);
    expect(isValidSpy).toHaveBeenCalledWith(input.url);
  });

  test('Should return InvalidParamError if validation fails', async () => {
    const { sut, urlValidatorStub } = makeSut();
    jest.spyOn(urlValidatorStub, 'isValid').mockReturnValueOnce(false);
    const input = makeFakeObject();

    const error = sut.validate(input);
    expect(error).toEqual(new InvalidParamError('url'));
  });

  test('Should return void if validation succeeds', async () => {
    const { sut } = makeSut();
    const input = makeFakeObject();

    const error = sut.validate(input);
    expect(error).toBeFalsy();
  });
});
