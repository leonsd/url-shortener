import { MissingParamError } from '../../../errors';
import { GenericObject, Validator } from '../../../protocols/validator.protocol';

export class RequiredFieldsValidator implements Validator {
  constructor(private readonly fieldName: string) {}

  validate(input: GenericObject): void | Error {
    if (!input[this.fieldName]) {
      return new MissingParamError(this.fieldName);
    }
  }
}
