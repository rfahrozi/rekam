import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: ['http://localhost:5173', 'https://frontend-xi-mauve-79.vercel.app', 'https://frontend-4napld5k3-fahrozis-projects.vercel.app'],
  credentials: true
}));
app.use(express.json());

// Routes Moduler
app.use('/api/auth', authRoutes);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'diklat-backend' });
});

// Mock Proposals Route (Akan diganti dengan DB nanti)
app.get('/api/proposals', (_req, res) => {
  res.json([
    {
      id: 1,
      nama: 'Budi Santoso',
      unit: 'Rawat Jalan',
      jenis: 'Pelatihan',
      status: 'Menunggu Verifikasi',
      tanggal: '2026-07-15',
    },
    {
      id: 2,
      nama: 'Dewi Lestari',
      unit: 'Keperawatan',
      jenis: 'Workshop',
      status: 'Disetujui',
      tanggal: '2026-07-10',
    },
  ]);
});

app.post('/api/proposals', (req, res) => {
  const newProposal = {
    id: Date.now(),
    ...req.body,
    status: 'Menunggu Verifikasi',
  };

  res.status(201).json(newProposal);
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Backend running on http://localhost:${port}`);
  });
}

export default app;
