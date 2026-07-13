import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRole } from '../contexts/RoleContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import WorkflowStatus from '../components/workflow/WorkflowStatus';
import ApprovalDialog from '../components/workflow/ApprovalDialog';
import AuditTrail from '../components/workflow/AuditTrail';
import { useToast } from '../components/ui/toast';

type AuditLog = {
  id: number;
  timestamp: string;
  actor: string;
  role: string;
  action: string;
  note?: string;
};

type ProposalDetail = {
  id: number;
  nama: string;
  unit: string;
  jenis: string;
  tanggal: string;
  status: string;
  catatan: string;
  history: AuditLog[];
};

// Initial Mock Data dengan struktur Audit Trail
const initialProposals: ProposalDetail[] = [
  {
    id: 1,
    nama: 'Budi Santoso',
    unit: 'Rawat Jalan',
    jenis: 'Pelatihan',
    tanggal: '2026-07-15',
    status: 'Menunggu Verifikasi',
    catatan: 'Pengajuan realisasi diklat untuk pelatihan kepemimpinan internal.',
    history: [
      { id: 101, timestamp: '12 Jul 2026, 08:30', actor: 'Budi Santoso', role: 'Pegawai', action: 'Mengajukan Proposal' }
    ]
  },
  {
    id: 2,
    nama: 'Dewi Lestari',
    unit: 'Keperawatan',
    jenis: 'Workshop',
    tanggal: '2026-07-10',
    status: 'Disetujui',
    catatan: 'Workshop manajemen pasien dan keselamatan kerja.',
    history: [
      { id: 201, timestamp: '01 Jul 2026, 09:00', actor: 'Dewi Lestari', role: 'Pegawai', action: 'Mengajukan Proposal' },
      { id: 202, timestamp: '02 Jul 2026, 10:15', actor: 'Admin Diklat', role: 'Bagian Diklat', action: 'Memverifikasi Kelengkapan' },
      { id: 203, timestamp: '03 Jul 2026, 14:00', actor: 'Dr. Surya', role: 'Direktur', action: 'Disetujui', note: 'Silakan diproses pencairannya.' }
    ]
  },
];

export default function ProposalDetailPage() {
  const { id } = useParams();
  const { role, roleLabel } = useRole();
  const { pushToast } = useToast();

  // State untuk menyimpan modifikasi proposal di level halaman (karena belum ada global Context)
  const [proposals, setProposals] = useState<ProposalDetail[]>(initialProposals);

  const proposal = useMemo(() => proposals.find((item) => item.id === Number(id)) ?? proposals[0], [id, proposals]);

  // State untuk Dialog Approval
  const [dialogOpen, setDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<'approve' | 'reject' | 'revise'>('approve');

  const openActionDialog = (type: 'approve' | 'reject' | 'revise') => {
    setActionType(type);
    setDialogOpen(true);
  };

  const handleActionSubmit = (catatan: string) => {
    setDialogOpen(false);

    let newStatus = proposal.status;
    let actionLabel = '';

    if (actionType === 'approve') {
      newStatus = 'Disetujui';
      actionLabel = 'Disetujui';
    } else if (actionType === 'reject') {
      newStatus = 'Ditolak';
      actionLabel = 'Ditolak';
    } else if (actionType === 'revise') {
      newStatus = 'Perlu Revisi';
      actionLabel = 'Revisi Diminta';
    }

    // Membuat Log History Baru
    const newLog: AuditLog = {
      id: Date.now(),
      timestamp: new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }),
      actor: 'User Simulator', // Di real app ini dari session
      role: roleLabel,
      action: actionLabel,
      note: catatan
    };

    // Update State
    setProposals(prev =>
      prev.map(p =>
        p.id === proposal.id
          ? { ...p, status: newStatus, history: [...p.history, newLog] }
          : p
      )
    );

    pushToast({
      title: `Pengajuan ${actionLabel}`,
      description: `Status pengajuan telah diubah menjadi ${newStatus}.`,
      tone: actionType === 'approve' ? 'success' : actionType === 'reject' ? 'error' : 'neutral',
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-slate-200 bg-white shadow-sm">
        <CardHeader className="border-b border-slate-100 pb-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">Detail Proposal</p>
              <CardTitle className="mt-1">{proposal.nama}</CardTitle>
              <p className="mt-1 text-sm text-slate-500">Melihat sebagai: <span className="font-medium text-slate-800">{roleLabel}</span></p>
            </div>

            {/* Status Badge */}
            <span className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${
               proposal.status === 'Disetujui' ? 'bg-emerald-100 text-emerald-800' :
               proposal.status === 'Ditolak' ? 'bg-rose-100 text-rose-800' :
               proposal.status === 'Perlu Revisi' ? 'bg-amber-100 text-amber-800' :
               'bg-blue-100 text-blue-800'
            }`}>
              {proposal.status}
            </span>
          </div>
        </CardHeader>

        <CardContent className="space-y-8 pt-6">
          {/* Timeline Status Visual */}
          <WorkflowStatus
            current={
              proposal.status === 'Disetujui' ? 'approved' :
              proposal.status === 'Ditolak' ? 'rejected' :
              proposal.status === 'Perlu Revisi' ? 'revision' :
              proposal.status === 'Menunggu Verifikasi' ? 'pending' : 'reviewed'
            }
          />

          {/* Rincian Info */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
              <p className="text-sm font-medium text-slate-500">Unit Kerja</p>
              <p className="mt-1 font-semibold text-slate-900">{proposal.unit}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
              <p className="text-sm font-medium text-slate-500">Jenis Diklat</p>
              <p className="mt-1 font-semibold text-slate-900">{proposal.jenis}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
              <p className="text-sm font-medium text-slate-500">Tanggal Pelaksanaan</p>
              <p className="mt-1 font-semibold text-slate-900">{proposal.tanggal}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
              <p className="text-sm font-medium text-slate-500">Dokumen Pendukung</p>
              <a href="#" className="mt-1 font-semibold text-blue-600 hover:underline flex items-center gap-1">
                 <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
                Terlampir (1 file)
              </a>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-800">Tujuan / Catatan Awal</p>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">{proposal.catatan}</p>
          </div>

          <hr className="border-slate-200" />

          {/* Audit Trail Section */}
          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-4">Riwayat Aktivitas</h3>
            <AuditTrail logs={proposal.history} />
          </section>

          {/* Action Buttons */}
          {(role === 'direktur' || role === 'admin' || role === 'bagian_diklat') &&
           proposal.status !== 'Disetujui' && proposal.status !== 'Ditolak' && (
            <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-200">
              <button
                className="rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 shadow-sm transition-colors"
                onClick={() => openActionDialog('approve')}
              >
                Setujui Pengajuan
              </button>
              <button
                className="rounded-full bg-amber-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-amber-600 shadow-sm transition-colors"
                onClick={() => openActionDialog('revise')}
              >
                Kembalikan / Revisi
              </button>
              <button
                className="rounded-full bg-rose-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-rose-700 shadow-sm transition-colors"
                onClick={() => openActionDialog('reject')}
              >
                Tolak Pengajuan
              </button>
            </div>
          )}
        </CardContent>
      </Card>

      <ApprovalDialog
        isOpen={dialogOpen}
        actionType={actionType}
        actionTitle={
          actionType === 'approve' ? 'Setujui Pengajuan' :
          actionType === 'reject' ? 'Tolak Pengajuan' : 'Minta Revisi'
        }
        onClose={() => setDialogOpen(false)}
        onSubmit={handleActionSubmit}
      />
    </div>
  );
}
