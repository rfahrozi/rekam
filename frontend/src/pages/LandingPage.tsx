import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const highlights = [
  {
    title: 'Pengajuan Realisasi Diklat',
    description: 'Memudahkan unit kerja mengajukan realisasi secara digital sesuai batas SLA H-25.',
  },
  {
    title: 'Verifikasi & Persetujuan',
    description: 'Bagian Diklat dan Direktur dapat memantau alur secara terpusat dengan status yang jelas.',
  },
  {
    title: 'Portal Pasca Diklat',
    description: 'Peserta mengunggah dokumen wajib dan menutup siklus evaluasi dengan bukti digital.',
  },
];

const metrics = [
  { label: 'Pengajuan', value: '24' },
  { label: 'SLA Tepat Waktu', value: '92%' },
  { label: 'Dokumen Terkumpul', value: '18' },
];

export default function LandingPage({ onOpenLogin }: { onOpenLogin?: () => void }) {

  return (
    <div className="space-y-12 relative pb-20">
      {/* Magic UI Ambient Glow */}
      <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[100px] mix-blend-screen pointer-events-none" />

      <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-zinc-900/40 backdrop-blur-3xl text-white shadow-2xl z-10">
        <div className="grid gap-8 px-8 py-16 md:grid-cols-[1.1fr_0.9fr] md:px-12 lg:px-16 lg:py-24">
          <div className="space-y-8">
            <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-zinc-300 backdrop-blur shadow-inner">
              ✨ Aplikasi REKAM untuk RSJKO Engku Haji Daud
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/60">
                Kelola Riwayat Kompetensi Aparatur dengan Cepat & Terukur.
              </h1>
              <p className="max-w-xl text-lg text-zinc-400 font-light leading-relaxed">
                Membantu unit kerja, bagian kompetensi, dan pimpinan memantau seluruh alur operasional mulai dari pengajuan, persetujuan, hingga arsip digital.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                onClick={onOpenLogin}
                className="bg-white text-black hover:bg-zinc-200 font-semibold px-8 py-6 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all hover:scale-105"
              >
                Mulai Gunakan
              </Button>
            </div>
          </div>

          <div className="relative rounded-[24px] border border-white/10 bg-black/40 p-6 backdrop-blur-md shadow-2xl flex flex-col justify-center">
            {/* Dekorasi Grid Lines Tipis di dalam Card */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:20px_20px] rounded-[24px] pointer-events-none"></div>

            <div className="relative z-10 rounded-2xl bg-zinc-900/60 border border-white/5 p-6 shadow-inner">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider mb-1">Status Sistem</p>
                  <p className="text-xl font-semibold text-white">SLA Terpantau</p>
                </div>
                <div className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Live
                </div>
              </div>
              <div className="space-y-3">
                {metrics.map((item) => (
                  <div key={item.label} className="flex items-center justify-between rounded-xl border border-white/5 bg-black/30 px-5 py-3 hover:bg-white/5 transition-colors cursor-default">
                    <span className="text-sm font-medium text-zinc-400">{item.label}</span>
                    <span className="text-lg font-bold text-white">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3 relative z-10">
        {highlights.map((item) => (
          <Card key={item.title} className="rounded-[24px] border-white/10 bg-zinc-900/30 backdrop-blur-md hover:bg-zinc-900/50 transition-colors">
            <CardHeader>
              <CardTitle className="text-white text-xl">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-zinc-400">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="rounded-[32px] border border-white/10 bg-zinc-900/20 p-10 md:p-14 shadow-sm backdrop-blur-md relative z-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <div className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-blue-400 mb-4">
              Kenapa Aplikasi REKAM
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight leading-tight">Mendukung tata kelola kompetensi yang transparan & akuntabel</h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-400">
              Sistem ini memadukan alur kerja, dokumentasi, dan monitoring SLA dalam satu wadah terpusat. Mengoptimalkan produktivitas rumah sakit tanpa mengorbankan kualitas tata kelola administrasi pegawai.
            </p>
          </div>
          <div className="rounded-[24px] border border-white/5 bg-black/40 p-2 overflow-hidden relative">
            <ul className="space-y-2 text-sm text-zinc-300">
              <li className="flex items-center gap-3 rounded-xl border border-white/5 bg-zinc-900/50 px-5 py-4 hover:bg-zinc-800 transition-colors">
                <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">✓</div>
                Memastikan pengajuan evaluasi kompetensi sebelum H-25
              </li>
              <li className="flex items-center gap-3 rounded-xl border border-white/5 bg-zinc-900/50 px-5 py-4 hover:bg-zinc-800 transition-colors">
                <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400">✓</div>
                Arsip digital sertifikat dan dokumen yang selalu aman
              </li>
              <li className="flex items-center gap-3 rounded-xl border border-white/5 bg-zinc-900/50 px-5 py-4 hover:bg-zinc-800 transition-colors">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">✓</div>
                Presentasi hasil kompetensi tepat waktu maksimal H+6
              </li>
            </ul>
          </div>
        </div>
      </section>

    </div>
  );
}
