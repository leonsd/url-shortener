import { GetUrlUseCase } from './get-url.usecase';
import { UrlShortenerModel } from '../../../domain/models/url-shortener.model';
import { GetUrlRepository } from './get-url.protocol';

const makeUrlRepositoryStub = () => {
  class GetUrlRepositoryStub implements GetUrlRepository {
    async getByCode(code: string): Promise<UrlShortenerModel | null> {
      return Promise.resolve({
        id: 'valid_id',
        original: 'valid_original_url',
        shortened: 'valid_shortened_url',
      });
    }
  }

  return new GetUrlRepositoryStub();
};

const makeSut = () => {
  const getUrlRepositoryStub = makeUrlRepositoryStub();
  const sut = new GetUrlUseCase(getUrlRepositoryStub);

  return {
    sut,
    getUrlRepositoryStub,
  };
};

describe('GetUrl Usecase', () => {
  test('Should call urlRepository.getByCode with correct value', async () => {
    const { sut, getUrlRepositoryStub } = makeSut();
    const getByCodeSpy = jest.spyOn(getUrlRepositoryStub, 'getByCode');
    const code = 'valid_code';
    await sut.run(code);

    expect(getByCodeSpy).toHaveBeenCalledWith(code);
  });

  test('Should throw if urlRepository.getByCode throws', async () => {
    const { sut, getUrlRepositoryStub } = makeSut();
    jest.spyOn(getUrlRepositoryStub, 'getByCode').mockImplementationOnce(() => {
      throw new Error();
    });
    const code = 'valid_code';
    const promise = sut.run(code);

    expect(promise).rejects.toThrow();
  });

  test('Should return UrlShortenerModel if success', async () => {
    const { sut } = makeSut();
    const code = 'valid_code';
    const url = await sut.run(code);

    expect(url).toBeTruthy();
    expect(url?.id).toBeTruthy();
    expect(url?.original).toBe('valid_original_url');
    expect(url?.shortened).toBe('valid_shortened_url');
  });

  test('Should return null if urlRepository.getByCode return null', async () => {
    const { sut, getUrlRepositoryStub } = makeSut();
    jest.spyOn(getUrlRepositoryStub, 'getByCode').mockImplementationOnce(() => {
      return Promise.resolve(null);
    });
    const code = 'valid_code';
    const url = await sut.run(code);

    expect(url).toBe(null);
  });
});
