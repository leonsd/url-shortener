import validator from 'validator';
import { UrlValidator } from '../../../presentation/protocols/url-validator.protocol';

export class UrlValidatorAdapter implements UrlValidator {
  isValid(url: string): boolean {
    return validator.isURL(url);
  }
}
