import request from 'supertest';
import express from 'express';
import router from '../routes';

describe('GET /health', () => {
  it('returns 200', async () => {
    const app = express();
    app.use(router);
    await request(app).get('/health').expect(200);
  });
});
