import { useMemo, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import ProposalStatusCard from '../components/proposal/ProposalStatusCard';
import TimelineCard from '../components/proposal/TimelineCard';
import FileUpload from '../components/ui/FileUpload';

const initialForm = {
  nama: '',
  statusPegawai: 'PNS',
  identitas: '', // NIP atau NRPTT
  unit: '',
  jenis: 'Pelatihan',
  tanggal: '',
  catatan: '',
};

type FormErrors = Partial<Record<keyof typeof initialForm, string>>;

const proposalRows = [
  { nama: 'Budi Santoso', unit: 'Rawat Jalan', jenis: 'Pelatihan', tanggal: '2026-07-15', status: 'Pending' },
  { nama: 'Dewi Lestari', unit: 'Keperawatan', jenis: 'Workshop', tanggal: '2026-07-10', status: 'Approved' },
  { nama: 'Andi Pratama', unit: 'Administrasi', jenis: 'Sosialisasi', tanggal: '2026-07-08', status: 'Reviewed' },
  { nama: 'Sarah Putri', unit: 'Rehabilitasi', jenis: 'Pelatihan', tanggal: '2026-07-06', status: 'Pending' },
];

export default function ProposalPage() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [, setFile] = useState<File | null>(null);

  const [submitted, setSubmitted] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const handleChange = (field: keyof typeof initialForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear error when user types
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!form.nama.trim()) newErrors.nama = 'Nama pegawai wajib diisi';
    if (!form.unit.trim()) newErrors.unit = 'Unit kerja wajib diisi';
    if (!form.tanggal) newErrors.tanggal = 'Tanggal pelaksanaan wajib diisi';

    // Validasi identitas berdasarkan status pegawai
    if (!form.identitas.trim()) {
      newErrors.identitas = form.statusPegawai === 'PNS' ? 'NIP wajib diisi' : 'NRPTT/NIK wajib diisi';
    } else if (form.statusPegawai === 'PNS' && !/^\d+$/.test(form.identitas)) {
      newErrors.identitas = 'NIP harus berupa angka';
    } else if (form.statusPegawai === 'PNS' && form.identitas.length < 18) {
      newErrors.identitas = 'NIP PNS umumnya 18 digit';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!validateForm()) return;

    // TODO: Connect to Context / Backend
    // For MVP, we simulate successful submission
    const responseOk = true;

    if (responseOk) {
      setSubmitted(true);
      setForm(initialForm);
      setFile(null);
      setErrors({});

      // Hide success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  const filteredRows = useMemo(() => {
    return proposalRows.filter((row) => {
      const matchesSearch = [row.nama, row.unit, row.jenis, row.status].join(' ').toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'all' ? true : row.status.toLowerCase() === statusFilter.toLowerCase();
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-blue-700">Pengajuan Diklat</p>
          <h2 className="mt-2 text-2xl font-bold">Form Realisasi Diklat</h2>
          <p className="mt-2 text-sm text-slate-600">
            Form ini membantu unit kerja mengajukan realisasi diklat secara digital untuk PNS dan PPPK.
          </p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            {submitted && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Pengajuan berhasil diterima dan masuk antrian verifikasi.
              </div>
            )}

            <div>
              <label className="mb-1 block text-sm font-medium">Nama Pegawai</label>
              <Input
                value={form.nama}
                onChange={(e) => handleChange('nama', e.target.value)}
                className={errors.nama ? 'border-red-500 bg-red-50' : ''}
              />
              {errors.nama && <p className="mt-1 text-xs text-red-500">{errors.nama}</p>}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Status Kepegawaian</label>
              <div className="flex gap-4 mt-1">
                {['PNS', 'PPPK', 'Non ASN'].map((status) => (
                  <label key={status} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="statusPegawai"
                      value={status}
                      checked={form.statusPegawai === status}
                      onChange={(e) => {
                        handleChange('statusPegawai', e.target.value);
                        handleChange('identitas', ''); // reset identitas if status changes
                      }}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm">{status}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                {form.statusPegawai === 'PNS' ? 'NIP (Nomor Induk Pegawai)' : 'NRPTT / NIK'}
              </label>
              <Input
                value={form.identitas}
                onChange={(e) => handleChange('identitas', e.target.value)}
                className={errors.identitas ? 'border-red-500 bg-red-50' : ''}
                placeholder={form.statusPegawai === 'PNS' ? 'Masukkan 18 digit NIP' : 'Masukkan nomor identitas'}
              />
              {errors.identitas && <p className="mt-1 text-xs text-red-500">{errors.identitas}</p>}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Unit Kerja</label>
              <Input
                value={form.unit}
                onChange={(e) => handleChange('unit', e.target.value)}
                className={errors.unit ? 'border-red-500 bg-red-50' : ''}
              />
              {errors.unit && <p className="mt-1 text-xs text-red-500">{errors.unit}</p>}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">Jenis Diklat</label>
                <select
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  value={form.jenis}
                  onChange={(e) => handleChange('jenis', e.target.value)}
                >
                  <option>Pelatihan</option>
                  <option>Workshop</option>
                  <option>Sosialisasi</option>
                  <option>Seminar / Webinar</option>
                  <option>Bimbingan Teknis</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Tanggal Pelaksanaan</label>
                <input
                  type="date"
                  className={`w-full rounded-xl border px-3 py-2 outline-none focus:ring-1 ${errors.tanggal ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500'}`}
                  value={form.tanggal}
                  onChange={(e) => handleChange('tanggal', e.target.value)}
                />
                {errors.tanggal && <p className="mt-1 text-xs text-red-500">{errors.tanggal}</p>}
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Catatan / Tujuan</label>
              <textarea
                className="min-h-20 w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                value={form.catatan}
                onChange={(e) => handleChange('catatan', e.target.value)}
                placeholder="Jelaskan secara singkat tujuan atau urgensi mengikuti diklat ini..."
              />
            </div>

            <div className="pt-2 pb-2">
              <FileUpload
                label="Unggah Dokumen Pendukung (Opsional)"
                accept=".pdf,.jpg,.jpeg,.png"
                onFileSelect={(f) => setFile(f)}
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button className="rounded-full bg-blue-700 px-5 py-2 font-semibold text-white hover:bg-blue-800 transition-colors" type="submit">
                Ajukan Sekarang
              </button>
              <Link to="/proposal/form" className="rounded-full border border-slate-300 px-5 py-2 font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                Buka Form Role
              </Link>
            </div>
          </form>
        </section>

        <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold">Status Proposal Interaktif</h3>
          <ProposalStatusCard title="Pengajuan Diterima" description="Usulan sudah masuk sistem" status="pending" />
          <ProposalStatusCard title="Dokumen Diverifikasi" description="Bagian Diklat sedang memeriksa kelengkapan" status="reviewed" />
          <ProposalStatusCard title="Persetujuan Final" description="Direktur siap mengambil keputusan" status="approved" />
        </section>
      </div>

      <Card className="border-slate-200 bg-white">
        <CardHeader>
          <CardTitle>Daftar Proposal Realistis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <Input placeholder="Cari proposal..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-sm" />
            <select className="rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">Semua Status</option>
              <option value="pending">Pending</option>
              <option value="reviewed">Reviewed</option>
              <option value="approved">Approved</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead>
                <tr className="text-left text-slate-500">
                  <th className="px-3 py-2 font-medium">Nama Pegawai</th>
                  <th className="px-3 py-2 font-medium">Unit Kerja</th>
                  <th className="px-3 py-2 font-medium">Jenis Diklat</th>
                  <th className="px-3 py-2 font-medium">Tanggal</th>
                  <th className="px-3 py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRows.length > 0 ? (
                  filteredRows.map((row) => (
                    <tr key={row.nama} className="hover:bg-slate-50 transition-colors">
                      <td className="px-3 py-3 font-medium text-slate-800">{row.nama}</td>
                      <td className="px-3 py-3 text-slate-600">{row.unit}</td>
                      <td className="px-3 py-3 text-slate-600">{row.jenis}</td>
                      <td className="px-3 py-3 text-slate-600">{row.tanggal}</td>
                      <td className="px-3 py-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          row.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                          row.status === 'Reviewed' ? 'bg-blue-100 text-blue-800' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-3 py-8 text-center text-slate-500">
                      Tidak ada proposal yang ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <TimelineCard />
    </div>
  );
}
