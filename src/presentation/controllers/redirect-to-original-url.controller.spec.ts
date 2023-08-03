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

interface SutTypes {
  sut: RedirectToOriginalUrlController;
  codeValidatorStub: CodeValidator;
}

const makeSut = (): SutTypes => {
  const codeValidatorStub = makeCodeValidatorAdapterStub();
  const sut = new RedirectToOriginalUrlController(codeValidatorStub);

  return {
    sut,
    codeValidatorStub,
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
});
