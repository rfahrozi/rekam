import { useRole } from '../contexts/RoleContext';
import { Card, CardContent, CardHeader } from '../components/ui/card';

const roleContent: Record<string, { title: string; description: string; tasks: string[] }> = {
  admin: {
    title: 'Panel Admin',
    description: 'Mengelola seluruh alur dan akses sistem.',
    tasks: ['Pantau semua proposal', 'Kelola peran pengguna', 'Pantau status SLA keseluruhan'],
  },
  bagian_diklat: {
    title: 'Panel Bagian Diklat',
    description: 'Mengatur verifikasi, penjadwalan, dan dokumentasi pelatihan.',
    tasks: ['Verifikasi usulan', 'Jadwalkan presentasi', 'Arsip dokumen pasca-diklat'],
  },
  unit_kerja: {
    title: 'Panel Unit Kerja',
    description: 'Mengajukan dan memantau pengajuan diklat unit.',
    tasks: ['Buat proposal baru', 'Pantau status pengajuan', 'Lampirkan dokumen pendukung'],
  },
  direktur: {
    title: 'Panel Direktur',
    description: 'Melihat ringkasan persetujuan dan mengambil keputusan.',
    tasks: ['Review usulan', 'Setujui atau tolak pengajuan', 'Pantau efektivitas pelaksanaan'],
  },
  peserta: {
    title: 'Panel Peserta',
    description: 'Mengunggah dokumen akhir dan memantau kewajiban pasca-diklat.',
    tasks: ['Unggah laporan', 'Upload sertifikat', 'Pantau tenggat pasca-diklat'],
  },
};

export default function RoleDashboardPage() {
  const { role, roleLabel } = useRole();
  const content = roleContent[role];

  return (
    <div className="space-y-6">
      <Card className="border-slate-200 bg-white">
        <CardHeader>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">Role-based Frontend</p>
          <h2 className="mt-2 text-2xl font-semibold">{content.title}</h2>
          <p className="mt-2 text-sm text-slate-600">Peran aktif: {roleLabel}</p>
          <p className="mt-3 text-sm text-slate-600">{content.description}</p>
        </CardHeader>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {content.tasks.map((task) => (
          <Card key={task} className="border-slate-200 bg-white">
            <CardContent className="p-5">
              <p className="text-sm font-medium text-slate-800">{task}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
