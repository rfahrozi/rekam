import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useRole, type UserRole } from '../contexts/RoleContext';

type ProtectedRouteProps = {
  children: ReactNode;
  allowedRoles: UserRole[];
};

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { role } = useRole();

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}
