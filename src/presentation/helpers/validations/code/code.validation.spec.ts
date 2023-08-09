import { CodeValidation } from './code.validation';
import { CodeValidator } from '../../../protocols/code-validator.protocol';
import { InvalidParamError } from '../../../errors';

const makeFakeObject = () => {
  return {
    code: 'valid_code',
  };
};

const makeCodeValidator = (): CodeValidator => {
  class CodeValidatorStub implements CodeValidator {
    isValid(url: string): boolean {
      return true;
    }
  }

  return new CodeValidatorStub();
};

interface SutTypes {
  sut: CodeValidation;
  codeValidatorStub: CodeValidator;
}

const makeSut = (): SutTypes => {
  const codeValidatorStub = makeCodeValidator();
  const sut = new CodeValidation('code', codeValidatorStub);

  return {
    sut,
    codeValidatorStub,
  };
};

describe('Code Validation', () => {
  test('Should call CodeValidator with correct value', async () => {
    const { sut, codeValidatorStub } = makeSut();
    const isValidSpy = jest.spyOn(codeValidatorStub, 'isValid');
    const input = makeFakeObject();

    sut.validate(input);
    expect(isValidSpy).toHaveBeenCalledWith(input.code);
  });

  test('Should return InvalidParamError if validation fails', async () => {
    const { sut, codeValidatorStub } = makeSut();
    jest.spyOn(codeValidatorStub, 'isValid').mockReturnValueOnce(false);
    const input = makeFakeObject();

    const error = sut.validate(input);
    expect(error).toEqual(new InvalidParamError('code'));
  });

  test('Should return void if validation succeeds', async () => {
    const { sut } = makeSut();
    const input = makeFakeObject();

    const error = sut.validate(input);
    expect(error).toBeFalsy();
  });
});
