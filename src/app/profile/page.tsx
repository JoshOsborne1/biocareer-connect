'use client';

import { useEffect, useState } from 'react';

import { ProfileActionList, ProfileMetrics, ProfilePreferencesPanel, ProfileSkillsMatrix } from '@/components/ProfileInsights';
import { ProfileUpload } from '@/components/ProfileUpload';
import { useUserProfile } from '@/hooks/useUserProfile';
import {
  profileActions as defaultActions,
  profileAttributes as defaultAttributes,
  profileMetrics as defaultMetrics,
  profilePreferences as defaultPreferences,
} from '@/data/profile';

export default function ProfilePage(): JSX.Element {
  const { user, updateUser, resetUser } = useUserProfile();
  const [metrics, setMetrics] = useState(defaultMetrics);
  const [attributes, setAttributes] = useState(defaultAttributes);
  const [preferences, setPreferences] = useState(defaultPreferences);
  const [actions, setActions] = useState(defaultActions);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formState, setFormState] = useState({
    name: user?.name ?? '',
    email: user?.email ?? '',
    location: user?.location ?? '',
  });

  useEffect(() => {
    setFormState({
      name: user?.name ?? '',
      email: user?.email ?? '',
      location: user?.location ?? '',
    });
  }, [user?.name, user?.email, user?.location]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProfile = async (): Promise<void> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/profile', { signal: controller.signal });
        if (!response.ok) throw new Error('Failed to load profile');
        const data = await response.json();
        setMetrics(data.metrics);
        setAttributes(data.attributes);
        setPreferences(data.preferences);
        setActions(data.actions);
      } catch (fetchError) {
        if (fetchError instanceof Error && fetchError.name === 'AbortError') {
          return;
        }
        setError('Unable to load live profile data. Showing last saved values.');
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchProfile();

    return () => controller.abort();
  }, []);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    updateUser({
      name: formState.name.trim(),
      email: formState.email.trim() || undefined,
      location: formState.location.trim(),
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-14">
      <div className="mx-auto max-w-6xl px-6 space-y-12">
        <header className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-teal-500">Profile onboarding</p>
          <h1 className="mt-3 text-4xl font-bold text-slate-900">Upload your CV once. Match everywhere.</h1>
          <p className="mt-3 text-base text-slate-600">
            We parse your education, lab skills, and placements to build a reusable application profile across every opportunity.
          </p>
          {error ? <p className="mt-3 text-sm text-rose-600">{error}</p> : null}
        </header>

        <ProfileUpload />

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <form onSubmit={handleFormSubmit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400">Personal details</p>
                <h3 className="text-xl font-bold text-slate-900">Who should we personalise for?</h3>
              </div>
              <button
                type="button"
                className="text-xs font-semibold text-rose-500 hover:text-rose-600"
                onClick={resetUser}
              >
                Switch user
              </button>
            </div>

            <label className="text-sm font-semibold text-slate-700">
              Name
              <input
                className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-slate-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
                value={formState.name}
                onChange={(event) => setFormState((prev) => ({ ...prev, name: event.target.value }))}
                placeholder="Your full name"
                required
              />
            </label>

            <label className="text-sm font-semibold text-slate-700">
              Email
              <input
                type="email"
                className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-slate-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
                value={formState.email}
                onChange={(event) => setFormState((prev) => ({ ...prev, email: event.target.value }))}
                placeholder="Optional"
              />
            </label>

            <label className="text-sm font-semibold text-slate-700">
              Location / Postcode
              <input
                className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-slate-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
                value={formState.location}
                onChange={(event) => setFormState((prev) => ({ ...prev, location: event.target.value }))}
                placeholder="e.g. SE1 7EH"
                required
              />
            </label>

            <div className="flex justify-end">
              <button
                type="submit"
                className="rounded-2xl bg-teal-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-teal-200 transition hover:bg-teal-700"
              >
                Save profile
              </button>
            </div>
          </form>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400">CV status</p>
            {user?.cv ? (
              <div className="mt-4 space-y-2">
                <p className="text-lg font-semibold text-slate-900">{user.cv.name}</p>
                <p className="text-sm text-slate-500">Size: {user.cv.sizeLabel}</p>
                <p className="text-xs text-slate-400">
                  Last updated: {new Date(user.cv.lastModified).toLocaleString()}
                </p>
                {user.cv.preview ? (
                  <div className="mt-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-3 text-xs text-slate-600">
                    {user.cv.preview}
                  </div>
                ) : null}
              </div>
            ) : (
              <p className="mt-4 text-sm text-slate-500">Upload your CV to reuse it across every opportunity.</p>
            )}
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400">Readiness snapshot</p>
              <h2 className="mt-2 text-2xl font-bold text-slate-900">All the signals employers care about in one place</h2>
            </div>
            {isLoading ? <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Refreshing…</span> : null}
          </div>
          <ProfileMetrics metrics={metrics} />
        </section>

        <section className="space-y-6">
          <ProfileSkillsMatrix attributes={attributes} />
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <ProfilePreferencesPanel preferences={preferences} />
          <ProfileActionList actions={actions} />
        </section>
      </div>
    </div>
  );
}

