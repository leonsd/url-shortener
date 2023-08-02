import { CreateShortenedUrl } from './url-shortener.usecase';
import {
  Shortener,
  UrlShortener,
  UrlShortenerModel,
} from './url-shortener.protocol';
import {
  UrlData,
  CreateUrlShortenerRepository,
} from '../protocols/url-shortener-repository.protocol';

jest.mock('nanoid', () => {
  return {
    nanoid: (size = 21) => '123456',
  };
});

const makeUrlShortenerStub = (): Shortener => {
  class UrlShortener implements Shortener {
    shorten(size = 6): string {
      return 'shortened_url';
    }
  }

  return new UrlShortener();
};

const makeUrlShortenerRepositoryStub = (): CreateUrlShortenerRepository => {
  class UrlShortenerRepositoryStub implements CreateUrlShortenerRepository {
    create(urlData: UrlData): Promise<UrlShortenerModel> {
      return Promise.resolve({
        id: 'valid_id',
        original: 'original_id',
        shortened: 'shortened_id',
      });
    }
  }

  return new UrlShortenerRepositoryStub();
};

interface SutTypes {
  sut: UrlShortener;
  urlShortenerStub: Shortener;
  urlShortenerRepositoryStub: CreateUrlShortenerRepository;
}

const makeSut = (): SutTypes => {
  const urlShortenerRepositoryStub = makeUrlShortenerRepositoryStub();
  const urlShortenerStub = makeUrlShortenerStub();
  const sut = new CreateShortenedUrl(
    urlShortenerStub,
    urlShortenerRepositoryStub,
  );

  return {
    sut,
    urlShortenerStub,
    urlShortenerRepositoryStub,
  };
};

describe('UrlShortener', () => {
  test('Should throw if shortener.shorten throws', async () => {
    const { sut, urlShortenerStub } = makeSut();
    jest.spyOn(urlShortenerStub, 'shorten').mockImplementationOnce(() => {
      throw new Error();
    });
    const originalUrl = 'valid_original_url';
    const promise = sut.run(originalUrl);

    expect(promise).rejects.toThrow();
  });

  test('Should call UrlShortenerRepository.create with correct value', async () => {
    const { sut, urlShortenerRepositoryStub } = makeSut();
    const createSpy = jest.spyOn(urlShortenerRepositoryStub, 'create');
    const originalUrl = 'valid_original_url';
    await sut.run(originalUrl);

    expect(createSpy).toHaveBeenCalledWith({
      original: originalUrl,
      shortened: 'shortened_url',
    });
  });
});
