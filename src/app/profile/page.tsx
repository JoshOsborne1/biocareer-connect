import { ProfileActionList, ProfileMetrics, ProfilePreferencesPanel, ProfileSkillsMatrix } from '@/components/ProfileInsights';
import { ProfileUpload } from '@/components/ProfileUpload';
import { profileActions as defaultActions, profileAttributes as defaultAttributes, profileMetrics as defaultMetrics, profilePreferences as defaultPreferences } from '@/data/profile';
import { useEffect, useState } from 'react';

export default function ProfilePage(): JSX.Element {
  const [metrics, setMetrics] = useState(defaultMetrics);
  const [attributes, setAttributes] = useState(defaultAttributes);
  const [preferences, setPreferences] = useState(defaultPreferences);
  const [actions, setActions] = useState(defaultActions);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

