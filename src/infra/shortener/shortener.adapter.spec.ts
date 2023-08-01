import * as nanoidModule from 'nanoid';

import { ShortenerAdapter } from './shortener.adapter';
import { Shortener } from '../../data/protocols/shortener.protocol';

jest.mock('nanoid', () => {
  return {
    __esModule: true,
    nanoid: () => '123456',
  };
});

const makeSut = (): Shortener => {
  return new ShortenerAdapter();
};

describe('Shortener Adapter', () => {
  test('Should throw if nanoid failed', async () => {
    const sut = makeSut();
    const size = 6;
    jest.spyOn(nanoidModule, 'nanoid').mockImplementationOnce(() => {
      throw new Error();
    });
    const fn = () => sut.shorten(size);

    expect(fn).toThrow(Error);
  });
});
