import { useEffect, useState, useMemo } from 'react';
import { useRole } from '../contexts/RoleContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useToast } from '../components/ui/toast';

type Proposal = {
  id: number;
  nama: string;
  unit: string;
  jenis: string;
  status: string;
  tanggal: string;
};

// Data mock untuk modul Pengajuan Proposal
const mockProposals: Proposal[] = [
  { id: 1, nama: 'Budi Santoso', unit: 'Rawat Jalan', jenis: 'Pelatihan', status: 'Pending', tanggal: '2026-07-15' },
  { id: 2, nama: 'Dewi Lestari', unit: 'Keperawatan', jenis: 'Workshop', status: 'Disetujui', tanggal: '2026-07-10' },
  { id: 3, nama: 'Andi Pratama', unit: 'Administrasi', jenis: 'Sosialisasi', status: 'Reviewed', tanggal: '2026-07-08' },
  { id: 4, nama: 'Sarah Putri', unit: 'Rehabilitasi', jenis: 'Pelatihan', status: 'Perlu Revisi', tanggal: '2026-07-06' },
  { id: 5, nama: 'Ahmad Faisal', unit: 'Farmasi', jenis: 'Bimbingan Teknis', status: 'Ditolak', tanggal: '2026-07-01' },
];

// Data mock agregat khusus untuk Laporan Pimpinan (Realisasi Diklat & Kompetensi)
const mockLaporanStrategis = {
  pemenuhanJp: {
    target: 20, // misal 20 JP per ASN per tahun
    pencapaianRataRata: 16.5,
    persentasePegawaiMemenuhi: 78,
  },
  skp: {
    totalAkumulasi: 450,
    pegawaiEligibleSTR: 120, // Pegawai yang sudah memenuhi SKP perpanjangan STR
    pegawaiWarning: 15, // Pegawai yang kurang SKP
  },
  realisasiBulanan: {
    inhouse: 4,
    eksternal: 6,
    totalPeserta: 45,
  },
  kepatuhanSla: {
    tepatWaktuH3: 88, // Persentase upload sertifikat tepat waktu
    terlambat: 12,
  }
};

export default function DashboardPage() {
  const { role, roleLabel } = useRole();
  const { pushToast } = useToast();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [laporan, setLaporan] = useState(mockLaporanStrategis);

  useEffect(() => {
    // Simulasi fetch data dari server
    const loadData = setTimeout(() => {
      setProposals(mockProposals);
      setLaporan(mockLaporanStrategis);
    }, 500);
    return () => clearTimeout(loadData);
  }, []);

  // Kalkulasi statistik proposal
  const stats = useMemo(() => {
    const total = proposals.length;
    const pending = proposals.filter((p) => p.status === 'Pending' || p.status === 'Reviewed').length;
    const approved = proposals.filter((p) => p.status === 'Disetujui').length;
    const rejected = proposals.filter((p) => p.status === 'Ditolak' || p.status === 'Perlu Revisi').length;

    return [
      { label: 'Total Pengajuan', value: total, icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
      { label: 'Menunggu Review', value: pending, icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
      { label: 'Disetujui', value: approved, icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
      { label: 'Ditolak / Revisi', value: rejected, icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' },
    ];
  }, [proposals]);

  const handleExport = () => {
    pushToast({
      title: 'Mengekspor Laporan Strategis...',
      description: 'Laporan Rekapitulasi Sertifikat dan SKP sedang diunduh.',
      tone: 'success'
    });
  };

  const isManagement = role === 'admin' || role === 'direktur' || role === 'bagian_diklat';
  const isPimpinan = role === 'direktur' || role === 'admin';

  return (
    <div className="space-y-6">
      <Card className="border-slate-200 bg-gradient-to-r from-blue-700 to-slate-900 text-white shadow-md">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">Ringkasan Operasional</p>
              <h2 className="mt-2 text-2xl font-bold">Dashboard APLIKASI REKAM RSJKO Engku Haji Daud</h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-200">
                Selamat datang, <span className="font-semibold text-white">{roleLabel}</span>. Kelola pengajuan, persetujuan, dan pelacakan kelengkapan diklat Anda di sini.
              </p>
            </div>

            {/* Tombol Export HANYA tampil untuk role manajemen */}
            {isManagement && (
              <button
                onClick={handleExport}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/20 border border-white/20 transition-all backdrop-blur-sm whitespace-nowrap"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
                Export Excel Laporan
              </button>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* KPI Stats Proposal */}
      {isManagement && (
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <Card key={item.label} className="border-slate-200 bg-white shadow-sm transition-transform hover:-translate-y-1 duration-200">
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">{item.label}</p>
                  <p className="mt-1 text-3xl font-bold text-slate-900">{item.value}</p>
                </div>
                <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>
      )}

      {/* LAPORAN STRATEGIS UNTUK PIMPINAN (Diambil dari Form Sertifikat) */}
      {isPimpinan && (
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Laporan Strategis & Evaluasi Kompetensi
          </h3>
          <div className="grid gap-6 md:grid-cols-2">

            {/* Laporan 1: Pemenuhan JP */}
            <Card className="border-slate-200 bg-white shadow-sm overflow-hidden relative">
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-slate-700">1. Kepatuhan Pemenuhan JP ASN (Min. {laporan.pemenuhanJp.target} JP)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-3 mb-2">
                  <span className="text-4xl font-bold text-slate-900">{laporan.pemenuhanJp.persentasePegawaiMemenuhi}%</span>
                  <span className="text-sm font-medium text-slate-500 mb-1">Pegawai Memenuhi Syarat</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 mt-4 mb-2">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${laporan.pemenuhanJp.persentasePegawaiMemenuhi}%` }}></div>
                </div>
                <p className="text-xs text-slate-500">Rata-rata pencapaian RS: <strong>{laporan.pemenuhanJp.pencapaianRataRata} JP</strong> per individu per tahun.</p>
              </CardContent>
            </Card>

            {/* Laporan 2: Rekapitulasi SKP (Tenaga Kesehatan) */}
            <Card className="border-slate-200 bg-white shadow-sm overflow-hidden relative">
              <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-slate-700">2. Rekapitulasi SKP (Persiapan STR)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                    <p className="text-xs font-medium text-emerald-800 uppercase tracking-wide">Aman / Eligible</p>
                    <p className="text-2xl font-bold text-emerald-700 mt-1">{laporan.skp.pegawaiEligibleSTR} <span className="text-sm font-normal">Nakes</span></p>
                  </div>
                  <div className="p-3 bg-rose-50 rounded-xl border border-rose-100">
                    <p className="text-xs font-medium text-rose-800 uppercase tracking-wide">Warning (Kurang SKP)</p>
                    <p className="text-2xl font-bold text-rose-700 mt-1">{laporan.skp.pegawaiWarning} <span className="text-sm font-normal">Nakes</span></p>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-3">Total Akumulasi RS: <strong>{laporan.skp.totalAkumulasi} Poin Kredit Profesional</strong> terkumpul.</p>
              </CardContent>
            </Card>

            {/* Laporan 3: Realisasi Bulanan */}
            <Card className="border-slate-200 bg-white shadow-sm overflow-hidden relative">
              <div className="absolute top-0 left-0 w-1 h-full bg-purple-500"></div>
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-slate-700">3. Realisasi Diklat Berjalan (Bulan Ini)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-slate-900">{laporan.realisasiBulanan.inhouse + laporan.realisasiBulanan.eksternal}</p>
                    <p className="text-sm font-medium text-slate-500">Total Program Diklat</p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-sm font-medium text-slate-700"><span className="text-purple-600 font-bold">{laporan.realisasiBulanan.inhouse}</span> Inhouse Training</p>
                    <p className="text-sm font-medium text-slate-700"><span className="text-indigo-600 font-bold">{laporan.realisasiBulanan.eksternal}</span> Diklat Eksternal</p>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-4 border-t border-slate-100 pt-3">
                  Telah menghasilkan total <strong>{laporan.realisasiBulanan.totalPeserta} sertifikat</strong> pegawai yang diterbitkan bulan ini.
                </p>
              </CardContent>
            </Card>

            {/* Laporan 4: Kepatuhan SLA */}
            <Card className="border-slate-200 bg-white shadow-sm overflow-hidden relative">
              <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-slate-700">4. Audit Kepatuhan Administrasi Pasca-Diklat</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mt-2">
                  <div className="relative w-16 h-16 flex items-center justify-center rounded-full bg-amber-50 border-4 border-amber-400">
                    <span className="font-bold text-amber-700 text-lg">{laporan.kepatuhanSla.tepatWaktuH3}%</span>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">Tepat Waktu (Max H+3)</p>
                    <p className="text-sm text-slate-500 mt-1">Mengunggah nomor, bukti fisik sertifikat, & laporan presentasi.</p>
                  </div>
                </div>
                <div className="mt-4 p-2.5 bg-rose-50 text-rose-700 text-xs rounded-lg flex gap-2 items-start border border-rose-100">
                  <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Terdapat {laporan.kepatuhanSla.terlambat}% pegawai yang terlambat melakukan serah terima administrasi.
                </div>
              </CardContent>
            </Card>

          </div>
        </section>
      )}

      {/* Basic Tracker untuk user biasa / non pimpinan */}
      {!isPimpinan && (
        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle>Status Pengajuan Terbaru</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {proposals.length > 0 ? (
                  proposals.map((proposal) => (
                    <li key={proposal.id} className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 hover:bg-slate-100 transition-colors cursor-default">
                      <div>
                        <p className="font-semibold text-slate-900">{proposal.nama}</p>
                        <p className="text-sm text-slate-500 mt-0.5">{proposal.unit} • {proposal.jenis}</p>
                      </div>
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide
                        ${proposal.status === 'Disetujui' ? 'bg-emerald-100 text-emerald-800' :
                          proposal.status === 'Ditolak' ? 'bg-rose-100 text-rose-800' :
                          proposal.status === 'Perlu Revisi' ? 'bg-amber-100 text-amber-800' :
                          'bg-blue-100 text-blue-800'}`}>
                        {proposal.status}
                      </span>
                    </li>
                  ))
                ) : (
                  <li className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 p-8 text-center">
                    <p className="text-sm font-medium text-slate-600">Memuat data terbaru...</p>
                  </li>
                )}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle>Tindak Lanjut Prioritas</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4 text-sm text-slate-700">
                <li className="flex gap-3 items-start rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
                  <svg className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">Unggah laporan pasca-diklat sebelum H+3 dari kepulangan.</span>
                </li>
                <li className="flex gap-3 items-start rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                  <svg className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Jadwalkan presentasi hasil kepada unit maksimal H+6.</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>
      )}
    </div>
  );
}
