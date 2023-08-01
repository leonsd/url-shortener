import { ShortenerController } from './shortener.controller';

const makeSut = (): ShortenerController => {
  return new ShortenerController();
};

describe('Shortener Controller', () => {
  test('Should return 400 if invalid url', async () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        url: 'invalid_url',
      },
    };
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
  });
});
