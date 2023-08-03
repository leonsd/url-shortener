import { UrlShortenerModel } from '../../domain/models/url-shortener.model';
import { GetUrl } from '../../domain/usecases/get-url.usecase';
import { CodeValidator } from '../protocols/code-validator.protocol';
import { RedirectToOriginalUrlController } from './redirect-to-original-url.controller';

const makeCodeValidatorAdapterStub = (): CodeValidator => {
  class CodeValidatorAdapterStub implements CodeValidator {
    isValid(code: string): boolean {
      return true;
    }
  }

  return new CodeValidatorAdapterStub();
};

const makeGetUrlStub = (): GetUrl => {
  class GetUrlStub implements GetUrl {
    run(code: string): Promise<UrlShortenerModel> {
      return Promise.resolve({
        id: 'valid_id',
        original: 'valid_original',
        shortened: 'valid_shortened',
      });
    }
  }

  return new GetUrlStub();
};

interface SutTypes {
  sut: RedirectToOriginalUrlController;
  codeValidatorStub: CodeValidator;
  getUrlStub: GetUrl;
}

const makeSut = (): SutTypes => {
  const codeValidatorStub = makeCodeValidatorAdapterStub();
  const getUrlStub = makeGetUrlStub();
  const sut = new RedirectToOriginalUrlController(codeValidatorStub, getUrlStub);

  return {
    sut,
    codeValidatorStub,
    getUrlStub,
  };
};

describe('RedirectToOriginalUrl Controller', () => {
  test('Should return 400 if incorrect path param', async () => {
    const { sut, codeValidatorStub } = makeSut();
    jest.spyOn(codeValidatorStub, 'isValid').mockReturnValueOnce(false);
    const httpRequest = {
      params: {
        code: 'invalid_code',
      },
    };
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
  });

  test('Should return 404 if GetUrlUseCase.run return null', async () => {
    const { sut, getUrlStub } = makeSut();
    jest.spyOn(getUrlStub, 'run').mockImplementationOnce(() => {
      return Promise.resolve(null);
    });
    const httpRequest = {
      params: {
        code: 'valid_code',
      },
    };
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(404);
  });

  test('Should return 500 if code validator throws', async () => {
    const { sut, codeValidatorStub } = makeSut();
    jest.spyOn(codeValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error();
    });
    const httpRequest = {
      params: {
        code: 'invalid_code',
      },
    };
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(500);
  });

  test('Should return 500 if get url throws', async () => {
    const { sut, getUrlStub } = makeSut();
    jest.spyOn(getUrlStub, 'run').mockImplementationOnce(() => {
      throw new Error();
    });
    const httpRequest = {
      params: {
        code: 'valid_code',
      },
    };
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(500);
  });

  test('Should return 200 if success', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      params: {
        code: 'valid_code',
      },
    };
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(200);
  });
});
