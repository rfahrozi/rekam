interface AuditLog {
  id: number;
  timestamp: string;
  actor: string;
  role: string;
  action: string;
  note?: string;
}

interface AuditTrailProps {
  logs: AuditLog[];
}

export default function AuditTrail({ logs }: AuditTrailProps) {
  if (!logs || logs.length === 0) {
    return (
      <div className="text-center py-6 text-sm text-slate-500 bg-slate-50 rounded-xl border border-slate-100">
        Belum ada riwayat aktivitas untuk pengajuan ini.
      </div>
    );
  }

  // Define styling based on action types
  const getActionStyles = (action: string) => {
    const act = action.toLowerCase();
    if (act.includes('setuju') || act.includes('approve')) return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    if (act.includes('tolak') || act.includes('reject')) return 'bg-rose-100 text-rose-700 border-rose-200';
    if (act.includes('revisi') || act.includes('kembali')) return 'bg-amber-100 text-amber-700 border-amber-200';
    return 'bg-blue-100 text-blue-700 border-blue-200';
  };

  return (
    <div className="relative pl-4 space-y-6 before:absolute before:inset-y-0 before:left-6 before:w-px before:bg-slate-200">
      {logs.map((log) => (
        <div key={log.id} className="relative flex gap-5 items-start">
          {/* Timeline Dot */}
          <div className="relative z-10 flex h-5 w-5 items-center justify-center rounded-full bg-white border-2 border-slate-300 mt-1 shadow-sm shrink-0">
             <div className="h-2 w-2 rounded-full bg-slate-400" />
          </div>

          {/* Content Card */}
          <div className="flex-1 rounded-xl border border-slate-100 bg-slate-50 p-4 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {log.actor} <span className="text-slate-500 font-normal">({log.role})</span>
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase border ${getActionStyles(log.action)}`}>
                    {log.action}
                  </span>
                </div>
              </div>
              <time className="text-xs font-medium text-slate-500 bg-white px-2 py-1 rounded-md border border-slate-200">
                {log.timestamp}
              </time>
            </div>

            {log.note && (
              <div className="mt-3 rounded-lg bg-white p-3 border border-slate-100">
                <p className="text-sm text-slate-700">
                  <span className="font-medium text-slate-900">Catatan:</span> {log.note}
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
