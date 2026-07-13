import { useState } from 'react';

type ProposalStatusCardProps = {
  title: string;
  description: string;
  status: 'pending' | 'reviewed' | 'approved';
};

const toneMap = {
  pending: 'border-amber-200 bg-amber-50 text-amber-700',
  reviewed: 'border-blue-200 bg-blue-50 text-blue-700',
  approved: 'border-emerald-200 bg-emerald-50 text-emerald-700',
};

const stagesMap = {
  pending: ['Usulan diterima', 'Menunggu validasi admin', 'Dokumen masih diperiksa'],
  reviewed: ['Dokumen lengkap', 'Peninjauan oleh bagian diklat', 'Menunggu keputusan direktur'],
  approved: ['Disetujui', 'Jadwal penugasan dibuat', 'Pelaksanaan dapat dimulai'],
};

export default function ProposalStatusCard({ title, description, status }: ProposalStatusCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`rounded-xl border p-4 ${toneMap[status]}`}>
      <button className="flex w-full items-center justify-between text-left" onClick={() => setOpen((prev) => !prev)}>
        <div>
          <p className="font-semibold">{title}</p>
          <p className="text-sm opacity-80">{description}</p>
        </div>
        <span className="text-sm font-medium">{open ? 'Sembunyikan' : 'Lihat detail'}</span>
      </button>
      {open && (
        <div className="mt-3 rounded-lg border border-white/70 bg-white/70 p-3 text-sm">
          <p>Status saat ini: <strong>{status}</strong></p>
          <ul className="mt-2 space-y-1">
            {stagesMap[status].map((stage) => (
              <li key={stage} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-current" />
                {stage}
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">Catatan: dokumen pendukung dan jadwal pelaksanaan akan terus dimonitor.</p>
        </div>
      )}
    </div>
  );
}
