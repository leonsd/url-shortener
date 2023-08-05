import validator from 'validator';
import { CodeValidatorAdapter } from './code-validator.adapter';

jest.mock('validator', () => {
  return {
    isLength: () => true,
  };
});

const makeSut = (): CodeValidatorAdapter => {
  return new CodeValidatorAdapter();
};

describe('CodeValidator Adapter', () => {
  test('Should return true if code is valid', () => {
    const sut = makeSut();
    const code = 'L6lVAf';
    const isValid = sut.isValid(code);

    expect(isValid).toBe(true);
  });

  test('Should return false if code is invalid', () => {
    const sut = makeSut();
    jest.spyOn(validator, 'isLength').mockReturnValueOnce(false);
    const code = '123456';
    const isValid = sut.isValid(code);

    expect(isValid).toBe(false);
  });

  test('Should calls validator.isLength with correct value', () => {
    const sut = makeSut();
    const isLengthSpy = jest
      .spyOn(validator, 'isLength')
      .mockReturnValueOnce(false);
    const code = 'L6lVAf';
    const options = { min: 6, max: 6 };
    sut.isValid(code);

    expect(isLengthSpy).toHaveBeenCalledWith(code, options);
  });
});
