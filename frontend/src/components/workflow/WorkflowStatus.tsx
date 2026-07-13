const steps = [
  { key: 'pending', label: 'Draft / Diajukan', description: 'Menunggu review' },
  { key: 'reviewed', label: 'Diverifikasi', description: 'Diperiksa Diklat' },
  { key: 'approved', label: 'Keputusan Final', description: 'Selesai' },
];

type WorkflowStatusProps = {
  current: 'pending' | 'reviewed' | 'approved' | 'rejected' | 'revision';
};

export default function WorkflowStatus({ current }: WorkflowStatusProps) {
  // Map special status to the index
  let currentIndex = steps.findIndex((step) => step.key === current);
  let isSpecial = false;

  if (current === 'rejected' || current === 'revision') {
    currentIndex = 2; // Berada di tahap akhir tapi dengan warna beda
    isSpecial = true;
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-inner">
      <div className="relative flex items-center justify-between gap-3">
        {/* Line indicator background */}
        <div className="absolute top-4 left-0 w-full h-0.5 bg-slate-200 -z-10 transform translate-y-0.5"></div>

        {steps.map((step, index) => {
          let isDone = index <= currentIndex;
          let isCurrent = index === currentIndex;

          let circleColor = 'border-slate-300 bg-white text-slate-500';
          let textColor = 'text-slate-500';

          if (isDone) {
            if (isSpecial && isCurrent) {
              circleColor = current === 'rejected'
                ? 'border-rose-500 bg-rose-500 text-white'
                : 'border-amber-500 bg-amber-500 text-white';
              textColor = current === 'rejected' ? 'text-rose-600' : 'text-amber-600';
            } else {
              circleColor = 'border-emerald-600 bg-emerald-600 text-white shadow-sm';
              textColor = isCurrent ? 'text-emerald-700' : 'text-slate-700';
            }
          }

          let label = step.label;
          if (isSpecial && isCurrent) {
             label = current === 'rejected' ? 'Ditolak' : 'Perlu Revisi';
          }

          return (
            <div key={step.key} className="relative flex flex-1 flex-col items-center text-center bg-slate-50">
              <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors z-10 ${circleColor}`}>
                {isDone && !isSpecial ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : isSpecial && isCurrent && current === 'rejected' ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : isSpecial && isCurrent && current === 'revision' ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              <p className={`mt-3 text-sm font-bold ${textColor}`}>{label}</p>
              <p className="mt-1 text-xs text-slate-400 max-w-[120px]">{step.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
