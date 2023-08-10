import { UrlModel, GetUrlRepository, GetUrl } from './get-url.protocol';

export class GetUrlUseCase implements GetUrl {
  constructor(private readonly urlRepository: GetUrlRepository) {}

  async run(code: string): Promise<UrlModel | null> {
    const url = await this.urlRepository.getByCode(code);

    return url;
  }
}
