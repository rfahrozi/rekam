import { NavLink } from 'react-router-dom';
import { useRole } from '../../contexts/RoleContext';

const links = [
  { to: '/dashboard', label: 'Dashboard', roles: ['admin', 'bagian_diklat', 'unit_kerja', 'direktur', 'peserta'] },
  { to: '/role-dashboard', label: 'Role View', roles: ['admin', 'bagian_diklat', 'unit_kerja', 'direktur', 'peserta'] },
  { to: '/proposal', label: 'Pengajuan', roles: ['admin', 'bagian_diklat', 'unit_kerja', 'direktur'] },
  { to: '/post-training', label: 'Pasca Diklat', roles: ['admin', 'bagian_diklat', 'peserta', 'unit_kerja'] },
  { to: '/post-training/upload', label: 'Unggah Dokumen', roles: ['admin', 'bagian_diklat', 'peserta', 'unit_kerja'] },
  { to: '/sertifikat', label: 'Sertifikat Kompetensi', roles: ['admin', 'bagian_diklat', 'peserta', 'unit_kerja'] },
  { to: '/users', label: 'Kelola Pengguna', roles: ['admin'] },
];

export default function AdminSidebar() {
  const { role } = useRole();

  return (
    <aside className="w-72 rounded-[24px] border border-slate-200 bg-slate-950 p-5 text-white shadow-sm">
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">APLIKASI REKAM</p>
        <h2 className="mt-2 text-xl font-semibold">Admin Panel</h2>
      </div>

      <nav className="space-y-2">
        {links
          .filter((link) => link.roles.includes(role))
          .map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center rounded-xl px-4 py-3 text-sm transition ${isActive ? 'bg-white/15 text-white' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
      </nav>
    </aside>
  );
}
