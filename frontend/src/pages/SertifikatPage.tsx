import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { useToast } from '../components/ui/toast';
import FileUpload from '../components/ui/FileUpload';

// Definisi tipe data Sertifikat sesuai format asli
type CertificateRow = {
  id: string;
  judulPelatihan: string;
  noSertifikat: string;
  tanggalSertifikat: string;
  skp: number | '';
  jp: number | '';
  file: File | null;
};

export default function SertifikatPage() {
  const { pushToast } = useToast();

  // State Identitas Pegawai sesuai format asli
  const [identitas, setIdentitas] = useState({
    nama: 'Budi Santoso',
    nip: '198010102005011001',
    pangkat: 'Penata Muda Tk. I / III/b',
    jabatan: 'Perawat Ahli Pertama',
  });

  // State Daftar Sertifikat Dinamis
  const [certificates, setCertificates] = useState<CertificateRow[]>([
    {
      id: Date.now().toString(),
      judulPelatihan: '',
      noSertifikat: '',
      tanggalSertifikat: '',
      skp: '',
      jp: '',
      file: null,
    },
  ]);

  const handleIdentitasChange = (field: keyof typeof identitas, value: string) => {
    setIdentitas((prev) => ({ ...prev, [field]: value }));
  };

  const handleRowChange = (id: string, field: keyof CertificateRow, value: string | number | File | null) => {
    setCertificates((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const addRow = () => {
    setCertificates((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        judulPelatihan: '',
        noSertifikat: '',
        tanggalSertifikat: '',
        skp: '',
        jp: '',
        file: null,
      },
    ]);
  };

  const removeRow = (id: string) => {
    if (certificates.length === 1) return; // Jangan hapus jika sisa 1 baris
    setCertificates((prev) => prev.filter((row) => row.id !== id));
  };

  const handleSave = () => {
    pushToast({
      title: 'Data Tersimpan',
      description: 'Daftar sertifikat pengembangan kompetensi berhasil disimpan.',
      tone: 'success',
    });
  };

  const handleGeneratePDF = () => {
    pushToast({
      title: 'Memproses Laporan PDF...',
      description: 'Mempersiapkan layout cetak untuk laporan. Anda bisa menyimpannya sebagai PDF lewat dialog Print.',
      tone: 'neutral',
    });

    // Menunggu sedikit agar UI sempat merender toast sebelum window.print memblokir thread
    setTimeout(() => {
      window.print();
    }, 500);
  };

  // Kalkulasi total
  const totalJP = certificates.reduce((sum, row) => sum + (Number(row.jp) || 0), 0);
  const totalSKP = certificates.reduce((sum, row) => sum + (Number(row.skp) || 0), 0);

  return (
    <div className="space-y-6 print-container relative">
      {/* Tombol Print (Sembunyi saat print) */}
      <style>{`
        @media print {
          body {
            background-color: white !important;
          }
          body * {
            visibility: hidden;
          }
          .print-container, .print-container * {
            visibility: visible;
          }
          .print-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .no-print {
            display: none !important;
          }
          .print-table {
            border-collapse: collapse;
            width: 100%;
            margin-top: 20px;
          }
          .print-table th, .print-table td {
            border: 1px solid black;
            padding: 8px 6px;
            font-size: 12px;
            vertical-align: middle;
          }
          .print-table th {
            text-align: center;
            font-weight: bold;
            background-color: #f3f4f6 !important;
            -webkit-print-color-adjust: exact;
          }
          .print-title {
            text-align: center;
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 24px;
            text-decoration: underline;
          }
        }
      `}</style>

      {/* Tampilan Khusus Print (Header Formal Format Asli) */}
      <div className="hidden print:block w-full text-black">
        <h1 className="print-title">DAFTAR SERTIFIKAT PENGEMBANGAN KOMPETENSI</h1>

        <table className="w-full text-sm mb-4">
          <tbody>
            <tr>
              <td className="w-40 font-semibold py-1">NAMA</td>
              <td className="w-4">:</td>
              <td>{identitas.nama}</td>
            </tr>
            <tr>
              <td className="font-semibold py-1">NIP</td>
              <td>:</td>
              <td>{identitas.nip}</td>
            </tr>
            <tr>
              <td className="font-semibold py-1">PANGKAT/GOL</td>
              <td>:</td>
              <td>{identitas.pangkat}</td>
            </tr>
            <tr>
              <td className="font-semibold py-1">JABATAN</td>
              <td>:</td>
              <td>{identitas.jabatan}</td>
            </tr>
          </tbody>
        </table>

        <table className="print-table">
          <thead>
            <tr>
              <th className="w-10">NO</th>
              <th>JUDUL PELATIHAN</th>
              <th className="w-32">NO SERTIFIKAT</th>
              <th className="w-24">TANGGAL<br/>SERTIFIKAT</th>
              <th className="w-16">JUMLAH<br/>SKP</th>
              <th className="w-16">JUMLAH<br/>JP</th>
              <th className="w-32">Cuplikan Gambar<br/>Sertifikat</th>
            </tr>
          </thead>
          <tbody>
            {certificates.map((row, index) => (
              <tr key={row.id}>
                <td className="text-center">{index + 1}</td>
                <td>{row.judulPelatihan}</td>
                <td className="text-center">{row.noSertifikat}</td>
                <td className="text-center">{row.tanggalSertifikat}</td>
                <td className="text-center">{row.skp || '-'}</td>
                <td className="text-center">{row.jp || '-'}</td>
                <td className="text-center italic text-gray-500 text-[10px]">
                  {row.file ? '[Terdapat Lampiran]' : '[Tanpa Lampiran]'}
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={4} className="text-right font-bold uppercase">Total Jam Pelajaran / SKP</td>
              <td className="text-center font-bold">{totalSKP}</td>
              <td className="text-center font-bold">{totalJP}</td>
              <td className="bg-gray-100"></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Antarmuka Normal Aplikasi */}
      <div className="no-print space-y-6">
        <Card className="border-slate-200 bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">Pelaporan Pegawai</p>
              <CardTitle className="mt-1">Daftar Sertifikat Pengembangan Kompetensi</CardTitle>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200 transition-colors border border-slate-200"
              >
                Simpan Sementara
              </button>
              <button
                onClick={handleGeneratePDF}
                className="inline-flex items-center gap-2 rounded-full bg-blue-700 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-800 transition-colors shadow-sm"
              >
                 <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Generate Laporan (PDF)
              </button>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-8">

            {/* Bagian Identitas */}
            <section>
              <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700">1</span>
                Data Identitas Diri
              </h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">Nama Lengkap</label>
                  <Input value={identitas.nama} onChange={(e) => handleIdentitasChange('nama', e.target.value)} />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">NIP</label>
                  <Input value={identitas.nip} onChange={(e) => handleIdentitasChange('nip', e.target.value)} />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">Pangkat/Gol</label>
                  <Input value={identitas.pangkat} onChange={(e) => handleIdentitasChange('pangkat', e.target.value)} />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">Jabatan</label>
                  <Input value={identitas.jabatan} onChange={(e) => handleIdentitasChange('jabatan', e.target.value)} />
                </div>
              </div>
            </section>

            <hr className="border-slate-100" />

            {/* Bagian Input Sertifikat */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700">2</span>
                  Daftar Sertifikat Terkumpul
                </h3>
                <div className="text-sm font-medium text-slate-500 flex gap-4 bg-slate-50 px-4 py-2 rounded-lg border border-slate-200">
                  <span>Total SKP: <span className="font-bold text-blue-700">{totalSKP}</span></span>
                  <span>Total JP: <span className="font-bold text-blue-700">{totalJP}</span></span>
                </div>
              </div>

              <div className="space-y-4">
                {certificates.map((row, index) => (
                  <div key={row.id} className="relative rounded-xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition-all hover:border-blue-300 group">
                    <div className="absolute top-4 right-4">
                      {certificates.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeRow(row.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Hapus baris ini"
                        >
                           <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>

                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
                      Sertifikat #{index + 1}
                    </p>

                    <div className="grid gap-4 md:grid-cols-12 mb-4">
                      <div className="md:col-span-12">
                        <label className="mb-1 block text-sm font-medium text-slate-600">Judul Pelatihan</label>
                        <Input
                          placeholder="Contoh: Workshop Asuhan Keperawatan Berkelanjutan"
                          value={row.judulPelatihan}
                          onChange={(e) => handleRowChange(row.id, 'judulPelatihan', e.target.value)}
                        />
                      </div>

                      <div className="md:col-span-4">
                        <label className="mb-1 block text-sm font-medium text-slate-600">No Sertifikat</label>
                        <Input
                          placeholder="Nomor sertifikat"
                          value={row.noSertifikat}
                          onChange={(e) => handleRowChange(row.id, 'noSertifikat', e.target.value)}
                        />
                      </div>
                      <div className="md:col-span-4">
                        <label className="mb-1 block text-sm font-medium text-slate-600">Tanggal Sertifikat</label>
                        <Input
                          type="date"
                          value={row.tanggalSertifikat}
                          onChange={(e) => handleRowChange(row.id, 'tanggalSertifikat', e.target.value)}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="mb-1 block text-sm font-medium text-slate-600">Jml SKP</label>
                        <Input
                          type="number"
                          placeholder="0"
                          value={row.skp}
                          onChange={(e) => handleRowChange(row.id, 'skp', parseInt(e.target.value) || '')}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="mb-1 block text-sm font-medium text-slate-600">Jml JP</label>
                        <Input
                          type="number"
                          placeholder="0"
                          value={row.jp}
                          onChange={(e) => handleRowChange(row.id, 'jp', parseInt(e.target.value) || '')}
                        />
                      </div>
                    </div>

                    {/* Modul Upload File */}
                    <div className="mt-4 pt-4 border-t border-slate-200 border-dashed">
                      <FileUpload
                        label="Unggah Cuplikan Gambar Sertifikat (PDF/JPG)"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onFileSelect={(file) => handleRowChange(row.id, 'file', file)}
                      />
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addRow}
                  className="w-full rounded-xl border-2 border-dashed border-slate-300 bg-white py-4 text-sm font-semibold text-slate-600 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Tambah Sertifikat Lainnya
                </button>
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
