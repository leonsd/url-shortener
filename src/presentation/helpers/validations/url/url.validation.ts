import { InvalidParamError } from '../../../errors';
import { UrlValidator } from '../../../protocols/url-validator.protocol';
import {
  GenericObject,
  Validation,
} from '../../../protocols/validation.protocol';

export class UrlValidation implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly urlValidator: UrlValidator,
  ) {}

  validate(input: GenericObject): void | Error {
    const isValid = this.urlValidator.isValid(input[this.fieldName]);

    if (!isValid) {
      return new InvalidParamError(this.fieldName);
    }
  }
}
