import { InvalidParamError } from '../../../errors';
import { CodeValidator } from '../../../protocols/code-validator.protocol';
import {
  GenericObject,
  Validation,
} from '../../../protocols/validation.protocol';

export class CodeValidation implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly codeValidator: CodeValidator,
  ) {}

  validate(input: GenericObject): void | Error {
    const isValid = this.codeValidator.isValid(input[this.fieldName]);

    if (!isValid) {
      return new InvalidParamError(this.fieldName);
    }
  }
}
