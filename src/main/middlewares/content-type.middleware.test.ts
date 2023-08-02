import request from 'supertest';
import app from '../config/app.config';

describe('CORS Middleware', () => {
  test('Should return content-type as json', async () => {
    app.get('/content_type', (req, res) => {
      res.send('');
    });
    await request(app).get('/content_type').expect('Content-Type', /json/);
  });
});
