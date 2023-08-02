import request from 'supertest';
import app from '../config/app.config';

describe('Body Parser Middleware', () => {
  test('Should parse body as json', async () => {
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body);
    });
    await request(app)
      .post('/test_body_parser')
      .send({ name: 'original_url' })
      .expect({ name: 'original_url' });
  });
});
