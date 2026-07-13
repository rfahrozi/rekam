import type { InputHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return <input className={cn('w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-0', className)} {...props} />;
}
