import { cn } from '@/lib/utils';
import { type ReactElement, type ReactNode } from 'react';

export type FilterChipProps = {
  label: string;
  count?: number;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
};

export function FilterChip({ label, count, selected, onClick, className }: FilterChipProps): ReactElement {
  return (
    <button
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm font-semibold transition-all',
        selected
          ? 'border-teal-200 bg-teal-50 text-teal-700 shadow-sm shadow-teal-100'
          : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50',
        className
      )}
    >
      {label}
      {count !== undefined && (
        <span
          className={cn(
            'flex h-5 min-w-[1.25rem] items-center justify-center rounded-full px-1.5 text-[10px]',
            selected ? 'bg-teal-200 text-teal-800' : 'bg-slate-100 text-slate-500'
          )}
        >
          {count}
        </span>
      )}
    </button>
  );
}

export type ToggleChipProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  icon?: ReactNode;
  className?: string;
};

export function ToggleChip({ label, checked, onChange, icon, className }: ToggleChipProps): ReactElement {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={cn(
        'inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm font-semibold transition-all',
        checked
          ? 'border-indigo-200 bg-indigo-50 text-indigo-700 shadow-sm shadow-indigo-100'
          : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50',
        className
      )}
    >
      {icon}
      {label}
    </button>
  );
}

