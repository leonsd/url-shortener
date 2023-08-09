import { ShortenerController } from './shortener.controller';
import { GenericObject, Validation } from './shortener.protocol';
import { UrlModel } from '../../../domain/models/url.model';
import { UrlShortener } from '../../../domain/usecases/url-shortener.usecase';
import { ServerError } from '../../errors';

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: GenericObject): void | Error {}
  }

  return new ValidationStub();
};

const makeUrlShortenerStub = (): UrlShortener => {
  class UrlShortenerStub implements UrlShortener {
    run(url: string): Promise<UrlModel> {
      return Promise.resolve({
        id: 'valid_id',
        original: 'original_url',
        shortened: 'shortened_url',
      });
    }
  }

  return new UrlShortenerStub();
};

interface SutTypes {
  sut: ShortenerController;
  validationStub: Validation;
  urlShortenerStub: UrlShortener;
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation();
  const urlShortenerStub = makeUrlShortenerStub();
  const sut = new ShortenerController(validationStub, urlShortenerStub);

  return {
    sut,
    validationStub,
    urlShortenerStub,
  };
};

describe('Shortener Controller', () => {
  test('Should return 400 if no url is provided', async () => {
    const { sut, validationStub } = makeSut();
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error());
    const httpRequest = {
      body: { url: '' },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });

  test('Should return 400 if no body is provided', async () => {
    const { sut, validationStub } = makeSut();
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error());
    const httpRequest = {};

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });

  test('Should return 400 if invalid url', async () => {
    const { sut, validationStub } = makeSut();
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error());
    const httpRequest = {
      body: {
        url: 'invalid_url',
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
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
    expect(httpResponse.body).toEqual({
      shortenedUrl: 'shortened_url',
    });
  });
});
