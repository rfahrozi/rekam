import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

type CardProps = {
  className?: string;
  children: ReactNode;
};

export function Card({ className, children }: CardProps) {
  return <div className={cn('rounded-2xl border border-slate-200 bg-white shadow-sm', className)}>{children}</div>;
}

export function CardHeader({ className, children }: CardProps) {
  return <div className={cn('p-6', className)}>{children}</div>;
}

export function CardTitle({ className, children }: CardProps) {
  return <h3 className={cn('text-lg font-semibold text-slate-900', className)}>{children}</h3>;
}

export function CardContent({ className, children }: CardProps) {
  return <div className={cn('p-6 pt-0', className)}>{children}</div>;
}
