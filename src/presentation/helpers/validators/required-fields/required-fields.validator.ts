import { MissingParamError } from '../../../errors';
import {
  GenericObject,
  Validation,
} from '../../../protocols/validation.protocol';

export class RequiredFieldsValidator implements Validation {
  constructor(private readonly fieldName: string) {}

  validate(input: GenericObject): void | Error {
    if (!input[this.fieldName]) {
      return new MissingParamError(this.fieldName);
    }
  }
}
