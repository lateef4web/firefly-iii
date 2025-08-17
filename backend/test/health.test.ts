import request from 'supertest';
import express from 'express';

const app = express();
app.get('/health', (_req, res) => {
  res.status(200).send('OK');
});

describe('GET /health', () => {
  it('responds with OK', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.text).toBe('OK');
  });
});
