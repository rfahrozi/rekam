const timeline = [
  { label: 'Pengajuan', date: '01 Jul', note: 'Usulan masuk' },
  { label: 'Verifikasi', date: '03 Jul', note: 'Kelengkapan dokumen' },
  { label: 'Persetujuan', date: '05 Jul', note: 'Review direktur' },
  { label: 'Pelaksanaan', date: '10 Jul', note: 'Kegiatan berlangsung' },
];

export default function TimelineCard() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="font-semibold text-slate-900">Simulasi Timeline Kegiatan Diklat</h3>
      <div className="mt-4 space-y-3">
        {timeline.map((item, index) => (
          <div key={item.label} className="flex items-start gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
              {index + 1}
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2">
              <p className="font-medium text-slate-800">{item.label}</p>
              <p className="text-sm text-slate-500">{item.date} • {item.note}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
