import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

export default function PostTrainingPage() {
  return (
    <div className="space-y-6">
      <Card className="border-slate-200 bg-white">
        <CardHeader>
          <p className="text-sm font-semibold text-blue-700">Pasca Diklat</p>
          <CardTitle>Portal Unggah Dokumen</CardTitle>
          <p className="mt-2 text-sm text-slate-600">
            Peserta wajib mengunggah laporan kegiatan, bukti transaksi, sertifikat, dan dokumen pendukung sebelum batas H+3.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 p-4">
              <h3 className="font-semibold">Dokumen Wajib</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>• Laporan kegiatan</li>
                <li>• Laporan dana</li>
                <li>• Bukti transaksi</li>
                <li>• Sertifikat</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 p-4">
              <h3 className="font-semibold">Tindak Lanjut</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>• Presentasi hasil paling lambat H+6</li>
                <li>• Berita acara dan evaluasi disimpan secara digital</li>
                <li>• Arsip dapat dilacak oleh Bagian Diklat</li>
              </ul>
            </div>
          </div>
          <div className="mt-6">
            <Link to="/post-training/upload" className="rounded-full bg-blue-700 px-4 py-2 text-sm font-semibold text-white">
              Unggah Dokumen Sekarang
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
