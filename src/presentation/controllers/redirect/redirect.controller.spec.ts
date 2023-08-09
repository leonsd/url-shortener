import { UrlModel } from '../../../domain/models/url.model';
import { GetUrl } from '../../../domain/usecases/get-url.usecase';
import { GenericObject, Validation } from '../../protocols/validation.protocol';
import { RedirectController } from './redirect.controller';

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: GenericObject): void | Error {}
  }

  return new ValidationStub();
};

const makeGetUrlStub = (): GetUrl => {
  class GetUrlStub implements GetUrl {
    run(code: string): Promise<UrlModel> {
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
  sut: RedirectController;
  validatorStub: Validation;
  getUrlStub: GetUrl;
}

const makeSut = (): SutTypes => {
  const validatorStub = makeValidation();
  const getUrlStub = makeGetUrlStub();
  const sut = new RedirectController(validatorStub, getUrlStub);

  return {
    sut,
    validatorStub,
    getUrlStub,
  };
};

describe('RedirectToOriginalUrl Controller', () => {
  test('Should return 400 if incorrect path param', async () => {
    const { sut, validatorStub } = makeSut();
    jest.spyOn(validatorStub, 'validate').mockReturnValueOnce(new Error());
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
    const { sut, validatorStub } = makeSut();
    jest.spyOn(validatorStub, 'validate').mockImplementationOnce(() => {
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

  test('Should return 302 if success', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      params: {
        code: 'valid_code',
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(302);
  });
});
