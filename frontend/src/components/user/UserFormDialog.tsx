import { useState, useEffect } from 'react';

export interface UserFormData {
  id?: string;
  nama: string;
  nip: string;
  statusPegawai: 'PNS' | 'PPPK' | 'Non ASN';
  unit: string;
  role: 'admin' | 'bagian_diklat' | 'unit_kerja' | 'direktur' | 'peserta';
}

interface UserFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UserFormData) => void;
  initialData?: UserFormData | null;
}

export default function UserFormDialog({ isOpen, onClose, onSubmit, initialData }: UserFormDialogProps) {
  const [formData, setFormData] = useState<UserFormData>({
    nama: '',
    nip: '',
    statusPegawai: 'PNS',
    unit: '',
    role: 'peserta',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        nama: '',
        nip: '',
        statusPegawai: 'PNS',
        unit: '',
        role: 'peserta',
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (field: keyof UserFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm overflow-y-auto">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl animate-in fade-in zoom-in-95 duration-200 my-auto">
        <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {initialData ? 'Edit Pengguna' : 'Tambah Pengguna Baru'}
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Lengkapi form di bawah ini untuk menyimpan data pengguna.
            </p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
              <input
                required
                type="text"
                value={formData.nama}
                onChange={(e) => handleChange('nama', e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Cth: Budi Santoso"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Status Kepegawaian</label>
              <div className="flex gap-4">
                {['PNS', 'PPPK', 'Non ASN'].map((status) => (
                  <label key={status} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="statusPegawai"
                      value={status}
                      checked={formData.statusPegawai === status}
                      onChange={(e) => handleChange('statusPegawai', e.target.value)}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-slate-700">{status}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                {formData.statusPegawai === 'PNS' ? 'NIP' : 'NRPTT / NIK'}
              </label>
              <input
                required
                type="text"
                value={formData.nip}
                onChange={(e) => handleChange('nip', e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Masukkan Nomor Identitas"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Unit Kerja / Jabatan</label>
                <input
                  required
                  type="text"
                  value={formData.unit}
                  onChange={(e) => handleChange('unit', e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Cth: IGD / Perawat"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Hak Akses Sistem (Role)</label>
                <select
                  required
                  value={formData.role}
                  onChange={(e) => handleChange('role', e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="peserta">Pegawai (Peserta)</option>
                  <option value="unit_kerja">Kepala Unit Kerja</option>
                  <option value="bagian_diklat">Admin / Bagian Diklat</option>
                  <option value="direktur">Direktur</option>
                  <option value="admin">Super Admin</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 px-6 py-4 bg-slate-50 border-t border-slate-100 rounded-b-2xl">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-full transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-full transition-colors"
            >
              Simpan Data Pengguna
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
