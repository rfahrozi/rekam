import { useRole } from '../contexts/RoleContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const roleFields: Record<string, string[]> = {
  admin: ['Nama Pegawai', 'Unit Kerja', 'Jenis Diklat', 'Catatan Internal'],
  bagian_diklat: ['Nama Pegawai', 'Unit Kerja', 'Jenis Diklat', 'Kelengkapan Dokumen', 'Catatan Verifikasi'],
  unit_kerja: ['Nama Pegawai', 'Unit Kerja', 'Jenis Diklat', 'Tanggal Pelaksanaan', 'Tujuan Pengajuan'],
  direktur: ['Nama Pegawai', 'Unit Kerja', 'Jenis Diklat', 'Pertimbangan Persetujuan', 'Keputusan'],
  peserta: ['Nama Pegawai', 'Jenis Diklat', 'Dokumen Pasca', 'Catatan Pengiriman'],
};

export default function ProposalFormPage() {
  const { role, roleLabel } = useRole();
  const fields = roleFields[role] ?? roleFields.unit_kerja;

  return (
    <div className="space-y-6">
      <Card className="border-slate-200 bg-white">
        <CardHeader>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">Form Proposal</p>
          <CardTitle>Form Khusus {roleLabel}</CardTitle>
          <p className="mt-2 text-sm text-slate-600">Antarmuka form disesuaikan dengan kebutuhan peran pengguna.</p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {fields.map((field) => (
              <div key={field} className="rounded-xl border border-slate-200 p-4">
                <label className="mb-2 block text-sm font-medium text-slate-700">{field}</label>
                <input className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm" />
              </div>
            ))}
          </div>
          <button className="mt-6 rounded-full bg-blue-700 px-4 py-2 text-sm font-semibold text-white">Simpan</button>
        </CardContent>
      </Card>
    </div>
  );
}
