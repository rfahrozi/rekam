import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useToast } from '../components/ui/toast';

const requiredDocuments = ['Laporan Kegiatan', 'Laporan Dana', 'Bukti Transaksi', 'Sertifikat'];

type UploadedFileState = Record<string, File | null>;

export default function PostTrainingUploadPage() {
  const [files, setFiles] = useState<UploadedFileState>({});
  const [isDragging, setIsDragging] = useState(false);
  const { pushToast } = useToast();

  const handleFileChange = (documentName: string, selectedFiles: FileList | null) => {
    const file = selectedFiles?.[0] ?? null;
    setFiles((prev) => ({ ...prev, [documentName]: file }));
  };

  const handleDrop = (documentName: string, event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    handleFileChange(documentName, event.dataTransfer.files);
  };

  const handleSubmit = () => {
    const hasFiles = Object.values(files).some(Boolean);
    pushToast({
      title: hasFiles ? 'Dokumen terkirim' : 'Belum ada dokumen',
      description: hasFiles
        ? 'Unggahan dokumen pasca-diklat berhasil disimpan.'
        : 'Silakan pilih minimal satu dokumen sebelum mengirim.',
      tone: hasFiles ? 'success' : 'warning',
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-slate-200 bg-white">
        <CardHeader>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">Unggah Dokumen</p>
          <CardTitle>Portal Pasca Diklat</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {requiredDocuments.map((doc) => (
              <div key={doc} className="rounded-xl border border-slate-200 p-4">
                <label className="mb-2 block text-sm font-medium text-slate-700">{doc}</label>
                <div
                  className={`rounded-xl border-2 border-dashed p-4 text-sm transition ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-slate-300 bg-slate-50'}`}
                  onDragOver={(event) => {
                    event.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(event) => handleDrop(doc, event)}
                >
                  <p className="text-slate-600">Seret dan lepas file di sini atau pilih dari perangkat Anda.</p>
                  <input
                    type="file"
                    className="mt-3 w-full text-sm"
                    onChange={(event) => handleFileChange(doc, event.target.files)}
                  />
                </div>
                {files[doc] ? (
                  <p className="mt-2 text-xs text-slate-600">Terpilih: {files[doc]?.name} ({Math.round((files[doc]?.size ?? 0) / 1024)} KB)</p>
                ) : (
                  <p className="mt-2 text-xs text-slate-500">Belum ada berkas yang dipilih.</p>
                )}
              </div>
            ))}
          </div>
          <button className="mt-6 rounded-full bg-blue-700 px-4 py-2 text-sm font-semibold text-white" onClick={handleSubmit}>
            Kirim Dokumen
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
