'use client';

import type { ProfileAttribute, ProfileMetric, Preference } from '@/data/profile';
import type { ProfileAction } from '@/data/profile';
import { CheckCircle2, Clock, Flame, Info } from 'lucide-react';
import { useMemo, type ReactElement } from 'react';

const statusStyles: Record<
  'met' | 'partial' | 'missing',
  { badge: string; dot: string; label: string; icon: ReactElement }
> = {
  met: {
    badge: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    dot: 'bg-emerald-500',
    label: 'Verified',
    icon: <CheckCircle2 className="h-4 w-4 text-emerald-600" />,
  },
  partial: {
    badge: 'border-amber-200 bg-amber-50 text-amber-700',
    dot: 'bg-amber-500',
    label: 'In progress',
    icon: <Clock className="h-4 w-4 text-amber-500" />,
  },
  missing: {
    badge: 'border-rose-200 bg-rose-50 text-rose-700',
    dot: 'bg-rose-500',
    label: 'Missing',
    icon: <Info className="h-4 w-4 text-rose-500" />,
  },
};

type ProfileMetricsProps = {
  metrics: ProfileMetric[];
};

export function ProfileMetrics({ metrics }: ProfileMetricsProps): ReactElement {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {metrics.map((metric) => (
        <div key={metric.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400">{metric.label}</p>
          <p className="mt-3 text-3xl font-bold text-slate-900">{metric.value}</p>
          <p className="mt-1 text-sm text-slate-500">{metric.caption}</p>
        </div>
      ))}
    </div>
  );
}

type ProfileSkillsMatrixProps = {
  attributes: ProfileAttribute[];
};

export function ProfileSkillsMatrix({ attributes }: ProfileSkillsMatrixProps): ReactElement {
  const grouped = useMemo(() => {
    return attributes.reduce<Record<string, ProfileAttribute[]>>((acc, attribute) => {
      acc[attribute.category] = acc[attribute.category] ? [...acc[attribute.category], attribute] : [attribute];
      return acc;
    }, {});
  }, [attributes]);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400">Qualification matrix</p>
          <h3 className="mt-2 text-xl font-bold text-slate-900">Tick off requirements once, reuse everywhere</h3>
        </div>
        <div className="flex gap-2 text-xs font-semibold text-slate-500">
          <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1 uppercase tracking-widest">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Matched
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1 uppercase tracking-widest">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            Partial
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1 uppercase tracking-widest">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
            Gap
          </span>
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {Object.entries(grouped).map(([category, attributes]) => (
          <div key={category} className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400">{category}</p>
            <div className="mt-3 space-y-3">
              {attributes.map((attribute) => {
                const style = statusStyles[attribute.status];
                return (
                  <div key={attribute.id} className="rounded-xl border border-white bg-white/80 p-4 shadow-sm">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${style.dot}`} />
                        <p className="font-semibold text-slate-800">{attribute.label}</p>
                      </div>
                      <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${style.badge}`}>
                        {style.icon}
                        {style.label}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-500">{attribute.note}</p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

type ProfilePreferencesPanelProps = {
  preferences: Preference[];
};

export function ProfilePreferencesPanel({ preferences }: ProfilePreferencesPanelProps): ReactElement {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400">Preferences</p>
      <h3 className="mt-2 text-xl font-bold text-slate-900">We prioritise searches that respect your non-negotiables</h3>
      <div className="mt-4 space-y-4">
        {preferences.map((preference) => (
          <div key={preference.label}>
            <p className="text-sm font-semibold text-slate-700">{preference.label}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {preference.values.map((value) => (
                <span key={value} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                  {value}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

type ProfileActionListProps = {
  actions: ProfileAction[];
};

export function ProfileActionList({ actions }: ProfileActionListProps): ReactElement {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400">Next best actions</p>
      <h3 className="mt-2 text-xl font-bold text-slate-900">Unlock quick wins for stronger matches</h3>
      <ul className="mt-5 space-y-4">
        {actions.map((action) => (
          <li key={action.title} className="flex gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
            <div className="mt-1">
              <Flame className="h-5 w-5 text-indigo-500" />
            </div>
            <div>
              <p className="font-semibold text-slate-900">{action.title}</p>
              <p className="mt-1 text-sm text-slate-600">{action.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

