import request from 'supertest';
import app from '../index';

describe('Diklat API', () => {
  it('returns health status', async () => {
    const response = await request(app).get('/api/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  });

  it('creates a proposal', async () => {
    const response = await request(app).post('/api/proposals').send({
      nama: 'Arif',
      unit: 'Administrasi',
      jenis: 'Sosialisasi',
      tanggal: '2026-08-01',
    });

    expect(response.status).toBe(201);
    expect(response.body.status).toBe('Menunggu Verifikasi');
  });
});
