export default function UnauthorizedPage() {
  return (
    <div className="rounded-[24px] border border-amber-200 bg-amber-50 p-8 text-center shadow-sm">
      <h2 className="text-2xl font-semibold text-amber-800">Akses Ditolak</h2>
      <p className="mt-3 text-sm text-amber-700">
        Peran Anda saat ini belum memiliki izin untuk membuka halaman ini.
      </p>
    </div>
  );
}
