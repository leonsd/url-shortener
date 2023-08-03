import { RedirectToOriginalUrlController } from './redirect-to-original-url.controller';

const makeSut = (): RedirectToOriginalUrlController => {
  return new RedirectToOriginalUrlController();
};

describe('RedirectToOriginalUrl Controller', () => {
  test('Should return 400 if incorrect path param', async () => {
    const sut = makeSut();
    const httpRequest = {
      params: {
        code: 'invalid_code',
      },
    };
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
  });
});
