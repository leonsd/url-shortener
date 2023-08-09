import { ValidationComposite } from './validation-composite';
import { GenericObject, Validation } from '../../protocols/validation.protocol';

const makeFakeObject = () => {
  return {
    url: 'any_url',
  };
};

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: GenericObject): void | Error {}
  }

  return new ValidationStub();
};

interface SutTypes {
  sut: ValidationComposite;
  validationStubs: Validation[];
}

const makeSut = (): SutTypes => {
  const validationStubs = [makeValidation(), makeValidation()];
  const sut = new ValidationComposite(validationStubs);

  return {
    sut,
    validationStubs,
  };
};

describe('Validation Composite', () => {
  test('Should return an error if any validation fails', async () => {
    const { sut, validationStubs } = makeSut();
    const input = makeFakeObject();

    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new Error());
    const errorFirstValidation = sut.validate(input);
    expect(errorFirstValidation).toBeTruthy();

    jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(new Error());
    const errorLastValidation = sut.validate(input);
    expect(errorLastValidation).toBeTruthy();
  });
});
