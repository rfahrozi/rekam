import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useToast } from '../components/ui/toast';
import FileUpload from '../components/ui/FileUpload';

type ScheduleStatus = 'TERJADWAL' | 'TERLAMBAT' | 'SELESAI';

interface PresentationSchedule {
  id: string;
  pegawai: string;
  unit: string;
  topik: string;
  jadwal: string;
  status: ScheduleStatus;
  beritaAcara: File | null;
  hasilEvaluasi: string;
  rekomendasi: string;
}

// Mock data untuk presentasi H+6
const mockSchedules: PresentationSchedule[] = [
  {
    id: 'ev-001',
    pegawai: 'Budi Santoso',
    unit: 'Rawat Jalan',
    topik: 'Pelatihan Basic Trauma Cardiac Life Support',
    jadwal: '2026-07-15 09:00 WIB',
    status: 'TERJADWAL',
    beritaAcara: null,
    hasilEvaluasi: '',
    rekomendasi: '',
  },
  {
    id: 'ev-002',
    pegawai: 'Dewi Lestari',
    unit: 'Keperawatan',
    topik: 'Workshop Keselamatan Pasien',
    jadwal: '2026-07-10 13:30 WIB',
    status: 'TERLAMBAT',
    beritaAcara: null,
    hasilEvaluasi: '',
    rekomendasi: '',
  },
  {
    id: 'ev-003',
    pegawai: 'Andi Pratama',
    unit: 'Administrasi',
    topik: 'Sosialisasi Sistem Informasi Manajemen RS',
    jadwal: '2026-07-08 10:00 WIB',
    status: 'SELESAI',
    beritaAcara: null,
    hasilEvaluasi: 'Presentasi disampaikan dengan sangat jelas. Peserta mampu menjawab sesi Q&A dengan baik.',
    rekomendasi: 'Diharapkan ilmu ini dapat segera ditransfer ke staf administrasi lainnya dalam bentuk inhouse mini-training.',
  },
];

export default function EvaluationPage() {
  const { pushToast } = useToast();
  const [schedules, setSchedules] = useState<PresentationSchedule[]>(mockSchedules);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Form State (Detail Kanan)
  const [formBeritaAcara, setFormBeritaAcara] = useState<File | null>(null);
  const [formEvaluasi, setFormEvaluasi] = useState('');
  const [formRekomendasi, setFormRekomendasi] = useState('');

  const activeSchedule = schedules.find((s) => s.id === selectedId);

  const handleSelectSchedule = (schedule: PresentationSchedule) => {
    setSelectedId(schedule.id);
    // Populate form data
    setFormBeritaAcara(schedule.beritaAcara);
    setFormEvaluasi(schedule.hasilEvaluasi);
    setFormRekomendasi(schedule.rekomendasi);
  };

  const handleSaveEvaluation = () => {
    if (!selectedId) return;

    if (!formEvaluasi.trim()) {
      pushToast({
        title: 'Gagal Menyimpan',
        description: 'Hasil evaluasi harus diisi untuk menutup siklus kompetensi.',
        tone: 'error',
      });
      return;
    }

    // Update State
    setSchedules((prev) =>
      prev.map((item) =>
        item.id === selectedId
          ? {
              ...item,
              status: 'SELESAI',
              beritaAcara: formBeritaAcara,
              hasilEvaluasi: formEvaluasi,
              rekomendasi: formRekomendasi,
            }
          : item
      )
    );

    pushToast({
      title: 'Siklus Evaluasi Ditutup',
      description: 'Laporan evaluasi, rekomendasi, dan jadwal presentasi berhasil disimpan secara digital.',
      tone: 'success',
    });
  };

  const handleCreateRecommendation = () => {
    if (!formRekomendasi.trim()) {
      pushToast({
        title: 'Formulir Kosong',
        description: 'Tuliskan rekomendasi terlebih dahulu.',
        tone: 'warning',
      });
      return;
    }
    pushToast({
      title: 'Rekomendasi Dibuat',
      description: 'Draft rekomendasi telah tersimpan ke sistem.',
      tone: 'neutral',
    });
  };

  // Helper render badge
  const renderStatusBadge = (status: ScheduleStatus) => {
    switch (status) {
      case 'SELESAI':
        return <span className="bg-emerald-100 text-emerald-700 border-emerald-200 border px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase">Selesai</span>;
      case 'TERLAMBAT':
        return <span className="bg-rose-100 text-rose-700 border-rose-200 border px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase">Terlambat H+6</span>;
      case 'TERJADWAL':
      default:
        return <span className="bg-blue-100 text-blue-700 border-blue-200 border px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase">Terjadwal</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">Tindak Lanjut H+6</p>
        <h2 className="mt-1 text-2xl font-bold text-slate-900">Jadwal Presentasi & Laporan Evaluasi</h2>
        <p className="mt-1 text-sm text-slate-500 max-w-3xl">
          Dokumentasikan hasil sosialisasi pegawai yang kembali dari masa pelatihan (H+6). Pastikan semua siklus evaluasi kompetensi ditutup dengan berita acara dan rekomendasi.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[350px_1fr] items-start">
        {/* Panel Kiri: Master List (Kalender/Jadwal) */}
        <Card className="border-slate-200 bg-white shadow-sm flex flex-col max-h-[800px]">
          <CardHeader className="border-b border-slate-100 pb-4">
            <CardTitle className="text-lg">Daftar Agenda Presentasi</CardTitle>
          </CardHeader>
          <div className="overflow-y-auto p-4 space-y-3">
            {schedules.map((item) => {
              const isSelected = item.id === selectedId;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelectSchedule(item)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-blue-50 border-blue-300 shadow-md ring-1 ring-blue-100'
                      : 'bg-white border-slate-200 hover:border-blue-200 hover:bg-slate-50 shadow-sm'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className={`font-semibold text-sm ${isSelected ? 'text-blue-900' : 'text-slate-800'}`}>
                      {item.pegawai}
                    </h4>
                    {renderStatusBadge(item.status)}
                  </div>
                  <p className="text-xs font-medium text-slate-500 mb-1 line-clamp-1">{item.topik}</p>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-2">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {item.jadwal}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Panel Kanan: Detail & Form Eksekusi */}
        <Card className="border-slate-200 bg-white shadow-sm min-h-[600px]">
          {!activeSchedule ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-12 min-h-[600px]">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-700">Pilih Jadwal Presentasi</h3>
              <p className="text-sm text-slate-500 max-w-sm mt-1">
                Pilih salah satu agenda di panel sebelah kiri untuk mulai mengisi Berita Acara dan Hasil Evaluasi.
              </p>
            </div>
          ) : (
            <>
              <CardHeader className="border-b border-slate-100 bg-slate-50 rounded-t-xl pb-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Topik Presentasi</span>
                    <CardTitle className="text-xl text-slate-900 leading-snug">{activeSchedule.topik}</CardTitle>
                  </div>
                  <div className="shrink-0 text-right">
                    {renderStatusBadge(activeSchedule.status)}
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-200">
                  <div>
                    <span className="text-xs text-slate-500 block">Pemateri</span>
                    <span className="text-sm font-semibold text-slate-800">{activeSchedule.pegawai}</span>
                  </div>
                  <div className="w-px h-8 bg-slate-200"></div>
                  <div>
                    <span className="text-xs text-slate-500 block">Unit Kerja</span>
                    <span className="text-sm font-semibold text-slate-800">{activeSchedule.unit}</span>
                  </div>
                  <div className="w-px h-8 bg-slate-200"></div>
                  <div>
                    <span className="text-xs text-slate-500 block">Jadwal</span>
                    <span className="text-sm font-semibold text-slate-800">{activeSchedule.jadwal}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6 space-y-8">
                {/* Section Upload */}
                <section>
                  <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs">1</span>
                    Dokumen Pendukung
                  </h4>
                  <FileUpload
                    label="Unggah Berita Acara & Daftar Hadir (PDF)"
                    accept=".pdf"
                    onFileSelect={(f) => setFormBeritaAcara(f)}
                  />
                  {activeSchedule.status === 'SELESAI' && !formBeritaAcara && (
                    <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                      File lama tidak ditemukan / belum diunggah.
                    </p>
                  )}
                </section>

                <hr className="border-slate-100" />

                {/* Section Formulir Evaluasi & Rekomendasi */}
                <section className="space-y-6">
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 mb-2 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs">2</span>
                      Catatan Evaluasi Akhir
                    </h4>
                    <p className="text-xs text-slate-500 mb-3">Tuliskan kesimpulan pelaksanaan, efektivitas materi, dan performa pemateri.</p>
                    <textarea
                      rows={4}
                      value={formEvaluasi}
                      onChange={(e) => setFormEvaluasi(e.target.value)}
                      placeholder="Misal: Materi sangat relevan dengan kebutuhan unit kerja..."
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    />
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-800 mb-2 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs">3</span>
                      Rekomendasi Tindak Lanjut
                    </h4>
                    <p className="text-xs text-slate-500 mb-3">Arahan langkah strategis atau aplikasi ilmu di lapangan.</p>
                    <textarea
                      rows={3}
                      value={formRekomendasi}
                      onChange={(e) => setFormRekomendasi(e.target.value)}
                      placeholder="Tuliskan rekomendasi tindakan..."
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    />
                  </div>
                </section>

                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleSaveEvaluation}
                    className="flex-1 bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2.5 rounded-full transition-colors shadow-sm"
                  >
                    Simpan & Tutup Evaluasi
                  </button>
                  <button
                    onClick={handleCreateRecommendation}
                    className="sm:w-auto w-full border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold py-2.5 px-6 rounded-full transition-colors"
                  >
                    Buat Draft Rekomendasi
                  </button>
                </div>
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
