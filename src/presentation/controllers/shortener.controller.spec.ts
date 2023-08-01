import { UrlShortenerModel } from '../../domain/models/url-shortener.model';
import { UrlShortener } from '../../domain/usecases/url-shortener.usecase';
import { InvalidParamError, MissingParamError, ServerError } from '../errors';
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

const makeUrlShortenerStub = (): UrlShortener => {
  class UrlShortenerStub implements UrlShortener {
    run(url: string): Promise<UrlShortenerModel> {
      return Promise.resolve({
        id: 'valid_id',
        originalUrl: 'original_url',
        shortenedUrl: 'shortened_url',
      });
    }
  }

  return new UrlShortenerStub();
};

interface SutTypes {
  sut: ShortenerController;
  urlValidatorAdapterStub: UrlValidator;
  urlShortenerStub: UrlShortener;
}

const makeSut = (): SutTypes => {
  const urlValidatorAdapterStub = makeUrlValidatorAdapterStub();
  const urlShortenerStub = makeUrlShortenerStub();
  const sut = new ShortenerController(
    urlValidatorAdapterStub,
    urlShortenerStub,
  );

  return {
    sut,
    urlValidatorAdapterStub,
    urlShortenerStub,
  };
};

describe('Shortener Controller', () => {
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

  test('Should return 400 if no body is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {};
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('url'));
  });

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

  test('Should call urlShortener.run with correct value', async () => {
    const { sut, urlShortenerStub } = makeSut();
    const runSpy = jest.spyOn(urlShortenerStub, 'run');
    const httpRequest = {
      body: {
        url: 'valid_url',
      },
    };
    await sut.handle(httpRequest);

    expect(runSpy).toHaveBeenCalledWith(httpRequest.body.url);
  });

  test('Should return 500 if urlShortener.run throws', async () => {
    const { sut, urlShortenerStub } = makeSut();
    jest.spyOn(urlShortenerStub, 'run').mockImplementationOnce(() => {
      throw new Error('Server error');
    });
    const httpRequest = {
      body: {
        url: 'valid_url',
      },
    };
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test('Should return 201 if success', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        url: 'valid_url',
      },
    };
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(201);
    expect(httpResponse.body).toEqual({ shortenedUrl: 'shortened_url' });
  });
});
