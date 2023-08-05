import { UrlModel } from '../models/url.model';

export interface GetUrl {
  run(code: string): Promise<UrlModel | null>;
}
