import { InvalidParamError, MissingParamError } from '../errors';
import { UrlValidator } from '../protocols/url-validator.protocol';
import { ShortenerController } from './shortener.controller';

const makeUrlValidatorAdapterStub = (): UrlValidator => {
  class UrlValidatorAdapterStub implements UrlValidator {
    isValid(url: string): boolean {
      return true;
    }
  }

  return new UrlValidatorAdapterStub();
};

interface SutTypes {
  sut: ShortenerController;
  urlValidatorAdapterStub: UrlValidator;
}

const makeSut = (): SutTypes => {
  const urlValidatorAdapterStub = makeUrlValidatorAdapterStub();
  const sut = new ShortenerController(urlValidatorAdapterStub);

  return {
    sut,
    urlValidatorAdapterStub,
  };
};

describe('Shortener Controller', () => {
  test('Should return 400 if invalid url', async () => {
    const { sut, urlValidatorAdapterStub } = makeSut();
    jest.spyOn(urlValidatorAdapterStub, 'isValid').mockReturnValueOnce(false);
    const httpRequest = {
      body: {
        url: 'invalid_url',
      },
    };
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError('url'));
  });

  test('Should return 400 if no url is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        url: '',
      },
    };
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('url'));
  });
});
