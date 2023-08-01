import validator from 'validator';
import { UrlValidatorAdapter } from './url-validator.adapter';

jest.mock('validator', () => {
  return {
    isURL: () => true,
  };
});

const makeSut = () => {
  return new UrlValidatorAdapter();
};

describe('UrlValidator Adapter', () => {
  test('Should return true if URL is valid', () => {
    const sut = makeSut();
    const url = 'http://valid_url.com';
    const isValid = sut.isValid(url);

    expect(isValid).toBe(true);
  });

  test('Should return false if URL is invalid', () => {
    const sut = makeSut();
    jest.spyOn(validator, 'isURL').mockReturnValueOnce(false);
    const url = 'invalid_url.com';
    const isValid = sut.isValid(url);

    expect(isValid).toBe(false);
  });

  test('Should calls validator.isURL with correct value', () => {
    const sut = makeSut();
    const isURLSpy = jest.spyOn(validator, 'isURL').mockReturnValueOnce(false);
    const url = 'any_url.com';
    sut.isValid(url);

    expect(isURLSpy).toHaveBeenCalledWith(url);
  });
});
