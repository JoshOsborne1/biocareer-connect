'use client';

import { useEffect, useMemo, useState } from 'react';

import { useUserProfile } from '@/hooks/useUserProfile';
import { cn } from '@/lib/utils';

const CAREER_OPTIONS = [
  'Biomedical Scientist',
  'Data Analyst',
  'Product Design',
  'Software Engineer',
  'Research Assistant',
];

export default function OnboardingModal(): JSX.Element | null {
  const { user, isLoading, updateUser } = useUserProfile();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [careerFocus, setCareerFocus] = useState<string[]>([]);
  const [visaNeeded, setVisaNeeded] = useState(false);
  const [mastersInterest, setMastersInterest] = useState(false);

  const shouldShow = !isLoading && !user?.name;

  useEffect(() => {
    if (!shouldShow) {
      document.body.style.overflow = '';
      return;
    }
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [shouldShow]);

  const isValid = useMemo(() => name.trim().length >= 2 && location.trim().length >= 2, [name, location]);

  const toggleFocus = (value: string): void => {
    setCareerFocus((prev) => {
      if (prev.includes(value)) {
        return prev.filter((option) => option !== value);
      }
      return [...prev, value];
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!isValid) return;

    updateUser({
      name: name.trim(),
      email: email.trim() || undefined,
      location: location.trim(),
      careerFocus,
      visaNeeded,
      mastersInterest,
    });
  };

  if (!shouldShow) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 px-4 py-6">
      <div className="relative w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl">
        <h2 className="text-2xl font-bold text-slate-900">Let&rsquo;s personalise your experience</h2>
        <p className="mt-2 text-sm text-slate-500">Tell us a little about you so we can prioritise the most relevant opportunities.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm font-semibold text-slate-700">
              Full name
              <input
                className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-slate-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="e.g. Taylor Morgan"
                required
              />
            </label>

            <label className="text-sm font-semibold text-slate-700">
              Email (optional)
              <input
                className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-slate-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@email.com"
              />
            </label>

            <label className="text-sm font-semibold text-slate-700 md:col-span-2">
              Location or postcode
              <input
                className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-slate-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="e.g. SE1 7EH"
                required
              />
            </label>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-700">Career focus (select all that apply)</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {CAREER_OPTIONS.map((option) => (
                <button
                  type="button"
                  key={option}
                  className={cn(
                    'rounded-2xl border px-4 py-2 text-sm font-semibold transition-all',
                    careerFocus.includes(option)
                      ? 'border-teal-200 bg-teal-50 text-teal-700 shadow-sm shadow-teal-100'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50',
                  )}
                  onClick={() => toggleFocus(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700">
              <input type="checkbox" checked={visaNeeded} onChange={(event) => setVisaNeeded(event.target.checked)} />
              I require visa sponsorship
            </label>
            <label className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700">
              <input type="checkbox" checked={mastersInterest} onChange={(event) => setMastersInterest(event.target.checked)} />
              Interested in sponsored Master&rsquo;s routes
            </label>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-slate-400">You can change these details later from your profile page.</p>
            <button
              type="submit"
              className="rounded-2xl bg-teal-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-200 transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-teal-200"
              disabled={!isValid}
            >
              Save & continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

