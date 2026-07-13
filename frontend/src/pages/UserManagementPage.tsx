import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useToast } from '../components/ui/toast';
import UserFormDialog, { UserFormData } from '../components/user/UserFormDialog';

export default function UserManagementPage() {
  const { pushToast } = useToast();

  // Mock data untuk pengguna
  const [users, setUsers] = useState<UserFormData[]>([
    { id: '1', nama: 'Budi Santoso', nip: '198010102005011001', statusPegawai: 'PNS', unit: 'Rawat Jalan', role: 'peserta' },
    { id: '2', nama: 'Dr. Surya', nip: '197510102000011002', statusPegawai: 'PNS', unit: 'Manajemen', role: 'direktur' },
    { id: '3', nama: 'Admin Diklat', nip: '199010102015011003', statusPegawai: 'PNS', unit: 'Bagian Diklat', role: 'bagian_diklat' },
    { id: '4', nama: 'Sarah Putri', nip: '992010102020011004', statusPegawai: 'PPPK', unit: 'Rehabilitasi', role: 'unit_kerja' },
    { id: '5', nama: 'Super Admin', nip: '000000000', statusPegawai: 'Non ASN', unit: 'IT', role: 'admin' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserFormData | null>(null);

  const handleOpenAdd = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (user: UserFormData) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string | undefined) => {
    if (!id) return;
    if (window.confirm('Apakah Anda yakin ingin menghapus pengguna ini?')) {
      setUsers((prev) => prev.filter((user) => user.id !== id));
      pushToast({
        title: 'Pengguna Dihapus',
        description: 'Data pengguna telah berhasil dihapus dari sistem.',
        tone: 'success',
      });
    }
  };

  const handleSave = (data: UserFormData) => {
    if (editingUser) {
      // Update data
      setUsers((prev) => prev.map((u) => (u.id === editingUser.id ? { ...data, id: editingUser.id } : u)));
      pushToast({
        title: 'Pengguna Diperbarui',
        description: 'Data pengguna telah berhasil diperbarui.',
        tone: 'success',
      });
    } else {
      // Tambah data baru
      const newUser = { ...data, id: Date.now().toString() };
      setUsers((prev) => [...prev, newUser]);
      pushToast({
        title: 'Pengguna Ditambahkan',
        description: 'Pengguna baru telah berhasil ditambahkan ke sistem.',
        tone: 'success',
      });
    }
    setIsModalOpen(false);
  };

  // Helper untuk format Label Role
  const formatRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Super Admin';
      case 'direktur': return 'Direktur';
      case 'bagian_diklat': return 'Bagian Diklat';
      case 'unit_kerja': return 'Kepala Unit Kerja';
      case 'peserta': return 'Pegawai (Peserta)';
      default: return role;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-slate-200 bg-white shadow-sm">
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between pb-4 border-b border-slate-100">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">Administrator</p>
            <CardTitle className="mt-1">Pengelolaan Pengguna Sistem</CardTitle>
            <p className="mt-1 text-sm text-slate-500">
              Kelola data pegawai, unit kerja, dan hak akses (role) pengguna Aplikasi REKAM.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-3">
            <button
              onClick={handleOpenAdd}
              className="inline-flex items-center gap-2 rounded-full bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 transition-colors shadow-sm whitespace-nowrap"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Tambah Pengguna
            </button>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="mb-4 flex flex-col sm:flex-row gap-4">
            <div className="flex-1 max-w-sm relative">
              <svg className="w-5 h-5 absolute left-3 top-2.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Cari berdasarkan nama atau NIP..."
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 text-sm focus:border-blue-500 outline-none"
              />
            </div>
            <select className="w-full sm:w-auto rounded-xl border border-slate-300 px-4 py-2 text-sm focus:border-blue-500 outline-none">
              <option value="all">Semua Role</option>
              <option value="admin">Super Admin</option>
              <option value="direktur">Direktur</option>
              <option value="peserta">Pegawai</option>
            </select>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50">
                <tr className="text-left text-slate-500">
                  <th className="px-4 py-3 font-semibold">Nama Pegawai</th>
                  <th className="px-4 py-3 font-semibold">NIP / NRPTT</th>
                  <th className="px-4 py-3 font-semibold">Unit Kerja</th>
                  <th className="px-4 py-3 font-semibold">Status / Hak Akses</th>
                  <th className="px-4 py-3 font-semibold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-semibold text-slate-900">{user.nama}</p>
                      </td>
                      <td className="px-4 py-3 text-slate-600 font-mono text-xs">{user.nip}</td>
                      <td className="px-4 py-3 text-slate-600">{user.unit}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col gap-1 items-start">
                          <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase border bg-slate-100 text-slate-600 border-slate-200">
                            {user.statusPegawai}
                          </span>
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold
                            ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                              user.role === 'direktur' ? 'bg-emerald-100 text-emerald-700' :
                              user.role === 'bagian_diklat' ? 'bg-blue-100 text-blue-700' :
                              user.role === 'unit_kerja' ? 'bg-amber-100 text-amber-700' :
                              'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {formatRoleLabel(user.role)}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEdit(user)}
                            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit Pengguna"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Hapus Pengguna"
                            disabled={user.role === 'admin'} // Cegah hapus admin default
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                      Tidak ada data pengguna ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <UserFormDialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSave}
        initialData={editingUser}
      />
    </div>
  );
}
