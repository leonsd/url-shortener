export interface GenericObject {
  [key: string]: string;
}

export interface Validator {
  validate(input: GenericObject): void | Error;
}
