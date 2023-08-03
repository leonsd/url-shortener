import validator from 'validator';
import { CodeValidator } from '../../presentation/protocols/code-validator.protocol';

export class CodeValidatorAdapter implements CodeValidator {
  isValid(code: string): boolean {
    return validator.isAlphanumeric(code);
  }
}
