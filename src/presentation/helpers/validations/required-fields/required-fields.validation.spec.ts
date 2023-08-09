import { RequiredFieldsValidation } from './required-fields.validation';
import { Validation } from '../../../protocols/validation.protocol';
import { MissingParamError } from '../../../errors';

const makeFakeObject = () => {
  return {
    url: 'any_url',
  };
};

const makeSut = (): Validation => {
  return new RequiredFieldsValidation('url');
};

describe('RequiredFields Validator', () => {
  test('Should return MissingParamError if field is not provided', async () => {
    const sut = makeSut();
    const input = makeFakeObject();
    input.url = '';

    const error = sut.validate(input);
    expect(error).toEqual(new MissingParamError('url'));
  });

  test('Should return void if field provided', async () => {
    const sut = makeSut();
    const input = makeFakeObject();

    const error = sut.validate(input);
    expect(error).toBeFalsy();
  });
});
