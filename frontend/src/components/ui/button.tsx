import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/utils';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: 'default' | 'outline' | 'ghost';
};

export function Button({ className, variant = 'default', children, ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition';
  const variants = {
    default: 'bg-blue-700 text-white hover:bg-blue-800',
    outline: 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-100',
    ghost: 'bg-transparent text-slate-700 hover:bg-slate-100',
  };

  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
