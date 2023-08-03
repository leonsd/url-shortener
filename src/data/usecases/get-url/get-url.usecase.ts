import { GetUrl } from '../../../domain/usecases/get-url.usecase';
import { GetUrlRepository } from '../../protocols/get-url-repository.protocol';
import { UrlShortenerModel } from '../shortener/url-shortener.protocol';

export class GetUrlUseCase implements GetUrl {
  constructor(private readonly urlRepository: GetUrlRepository) {}

  async run(code: string): Promise<UrlShortenerModel> {
    return null as unknown as UrlShortenerModel;
  }
}
