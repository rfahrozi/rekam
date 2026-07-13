import { useState } from 'react';

interface ApprovalDialogProps {
  isOpen: boolean;
  actionTitle: string;
  actionType: 'approve' | 'reject' | 'revise';
  onClose: () => void;
  onSubmit: (catatan: string) => void;
}

export default function ApprovalDialog({ isOpen, actionTitle, actionType, onClose, onSubmit }: ApprovalDialogProps) {
  const [catatan, setCatatan] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(catatan);
    setCatatan(''); // reset
  };

  const btnColors = {
    approve: 'bg-emerald-600 hover:bg-emerald-700',
    reject: 'bg-rose-600 hover:bg-rose-700',
    revise: 'bg-amber-500 hover:bg-amber-600',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-5 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">{actionTitle}</h3>
          <p className="mt-1 text-sm text-slate-500">
            {actionType === 'approve'
              ? 'Tambahkan catatan persetujuan (opsional).'
              : 'Silakan berikan alasan atau catatan mengapa pengajuan ini diproses demikian.'}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Catatan / Alasan {actionType !== 'approve' && <span className="text-rose-500">*</span>}
            </label>
            <textarea
              required={actionType !== 'approve'}
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              placeholder="Ketik catatan di sini..."
              className="w-full min-h-[120px] rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center justify-end gap-3 px-6 py-4 bg-slate-50 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-full transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className={`px-5 py-2 text-sm font-semibold text-white rounded-full transition-colors ${btnColors[actionType]}`}
            >
              Konfirmasi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
