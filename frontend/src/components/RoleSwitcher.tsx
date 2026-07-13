import { useRole } from '../contexts/RoleContext';

export default function RoleSwitcher() {
  const { role, setRole, roleOptions, roleLabel } = useRole();

  return (
    <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm">
      <span className="text-sm font-medium text-slate-600">Role aktif:</span>
      <select
        className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm outline-none"
        value={role}
        onChange={(event) => setRole(event.target.value as typeof role)}
      >
        {roleOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">{roleLabel}</span>
    </div>
  );
}
