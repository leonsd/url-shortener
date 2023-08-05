import validator from 'validator';
import { CodeValidator } from '../../presentation/protocols/code-validator.protocol';

export class CodeValidatorAdapter implements CodeValidator {
  isValid(code: string): boolean {
    return validator.isLength(code, { min: 6, max: 6 });
  }
}
