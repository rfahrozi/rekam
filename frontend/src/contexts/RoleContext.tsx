import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type UserRole = 'admin' | 'bagian_diklat' | 'unit_kerja' | 'direktur' | 'peserta';

const ROLE_STORAGE_KEY = 'diklat-role';

const roleLabels: Record<UserRole, string> = {
  admin: 'Admin',
  bagian_diklat: 'Bagian Diklat',
  unit_kerja: 'Unit Kerja',
  direktur: 'Direktur',
  peserta: 'Peserta Diklat',
};

const roleOptions = Object.entries(roleLabels).map(([value, label]) => ({ value: value as UserRole, label }));

type RoleContextValue = {
  role: UserRole;
  setRole: (role: UserRole) => void;
  roleOptions: Array<{ value: UserRole; label: string }>;
  roleLabel: string;
};

const RoleContext = createContext<RoleContextValue | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<UserRole>('unit_kerja');

  useEffect(() => {
    const storedRole = window.localStorage.getItem(ROLE_STORAGE_KEY) as UserRole | null;
    if (storedRole && roleLabels[storedRole]) {
      setRoleState(storedRole);
    }
  }, []);

  const setRole = (nextRole: UserRole) => {
    setRoleState(nextRole);
    window.localStorage.setItem(ROLE_STORAGE_KEY, nextRole);
  };

  const value = useMemo(
    () => ({
      role,
      setRole,
      roleOptions,
      roleLabel: roleLabels[role],
    }),
    [role]
  );

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}

export function useRole() {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within RoleProvider');
  }
  return context;
}
