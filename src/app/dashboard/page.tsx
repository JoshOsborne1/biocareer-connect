'use client';

import { JobCard } from '@/components/JobCard';
import { FilterChip, ToggleChip } from '@/components/ui/Filters';
import { opportunities } from '@/data/opportunities';
import { Filter, Globe, GraduationCap, MapPin, Plane, Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

const workModes = ['all', 'onsite', 'hybrid', 'remote'] as const;

export default function DashboardPage(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [workMode, setWorkMode] = useState<typeof workModes[number]>('all');
  const [visaOnly, setVisaOnly] = useState(false);
  const [mastersOnly, setMastersOnly] = useState(false);
  const [studentOnly, setStudentOnly] = useState(false);
  const [results, setResults] = useState(opportunities);
  const [total, setTotal] = useState(opportunities.length);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const location = 'SE1 7EH';
  const radius = '15 miles';

  const categories = useMemo(() => ['all', ...new Set(opportunities.map((job) => job.category))], []);
  const industries = useMemo(() => ['all', ...new Set(opportunities.flatMap((job) => job.industries))], []);

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams({
      q: searchTerm,
      category: selectedCategory,
      industry: selectedIndustry,
      workMode,
      visaOnly: String(visaOnly),
      mastersOnly: String(mastersOnly),
      studentOnly: String(studentOnly),
    });

    const fetchData = async (): Promise<void> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/opportunities?${params.toString()}`, { signal: controller.signal });
        if (!response.ok) throw new Error('Failed to load opportunities');
        const data = await response.json();
        setResults(data.items);
        setTotal(data.total);
      } catch (fetchError) {
        if (fetchError instanceof Error && fetchError.name === 'AbortError') {
          return;
        }
        setError('Unable to load opportunities right now.');
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => controller.abort();
  }, [mastersOnly, searchTerm, selectedCategory, selectedIndustry, studentOnly, visaOnly, workMode]);

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-teal-600 text-lg font-black text-white">B</div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400">BioCareer</p>
              <p className="text-sm font-semibold text-slate-900">Opportunity feed</p>
            </div>
          </div>
          <div className="hidden items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-sm text-slate-500 sm:flex">
            <MapPin className="h-4 w-4 text-slate-400" />
            {location}
            <span className="text-slate-300">•</span>
            {radius}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pt-10">
        <div className="mb-10 space-y-8">
          <div>
            <p className="text-sm font-semibold text-teal-600">Welcome back, Jessica</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">{total} deep-search matches</h1>
            <p className="mt-2 text-sm text-slate-500">Toggle sponsorship and study filters to surface the right opportunities.</p>
          </div>

          {/* Search & Primary Toggles */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search roles, teams, institutions..."
                className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm font-medium text-slate-700 shadow-sm transition focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <ToggleChip
                label="Visa sponsors"
                checked={visaOnly}
                onChange={setVisaOnly}
                icon={<Plane className="h-4 w-4" />}
              />
              <ToggleChip
                label="Masters path"
                checked={mastersOnly}
                onChange={setMastersOnly}
                icon={<GraduationCap className="h-4 w-4" />}
              />
              <ToggleChip
                label="Still at uni"
                checked={studentOnly}
                onChange={setStudentOnly}
                icon={<Globe className="h-4 w-4" />}
              />
            </div>
          </div>

          {/* Categories, industries, work modes */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mr-2">Category:</span>
              {categories.map((category) => (
                <FilterChip
                  key={category}
                  label={category === 'all' ? 'All sectors' : category}
                  selected={selectedCategory === category}
                  onClick={() => setSelectedCategory(category)}
                />
              ))}
            </div>
            
            {selectedCategory !== 'all' ? (
              <div className="flex flex-wrap items-center gap-2 animate-in fade-in slide-in-from-top-1 duration-200">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mr-2">Industry:</span>
                {industries.map((industry) => (
                  <FilterChip
                    key={industry}
                    label={industry === 'all' ? 'All industries' : industry}
                    selected={selectedIndustry === industry}
                    onClick={() => setSelectedIndustry(industry)}
                  />
                ))}
              </div>
            ) : null}

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mr-2">Work mode:</span>
              {workModes.map((mode) => (
                <FilterChip
                  key={mode}
                  label={mode === 'all' ? 'Any' : mode.charAt(0).toUpperCase() + mode.slice(1)}
                  selected={workMode === mode}
                  onClick={() => setWorkMode(mode)}
                />
              ))}
            </div>
          </div>
        </div>

        <section className="grid gap-6 lg:grid-cols-[1.6fr_0.9fr]">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-500">Results</p>
              <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-500">
                <Filter className="h-4 w-4" />
                {isLoading ? 'Searching…' : `${results.length} found`}
              </div>
            </div>
            
            {error ? (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700">{error}</div>
            ) : null}

            {!error && results.length > 0 ? (
              results.map((job) => <JobCard key={job.id} job={job} />)
            ) : !error ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 text-slate-400">
                  <Search className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">No matches found</h3>
                <p className="mt-1 text-sm text-slate-500">Try adjusting your filters or toggling off &quot;Visa sponsors&quot;.</p>
                <button
                  onClick={() => {
                    setVisaOnly(false);
                    setMastersOnly(false);
                    setStudentOnly(false);
                    setSelectedCategory('all');
                    setSelectedIndustry('all');
                    setWorkMode('all');
                    setSearchTerm('');
                  }}
                  className="mt-4 text-sm font-semibold text-teal-600 hover:text-teal-700"
                >
                  Clear all filters
                </button>
              </div>
            ) : null}
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Application tracker</p>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Applications sent</span>
                  <span className="text-lg font-bold text-slate-900">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Interviews</span>
                  <span className="text-lg font-bold text-emerald-600">2</span>
                </div>
              </div>
              <div className="mt-4 h-2 rounded-full bg-slate-100">
                <div className="h-full w-2/3 rounded-full bg-teal-500" />
              </div>
              <p className="mt-2 text-xs text-slate-400">Goal: 5 applications / week</p>
            </div>

            <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-indigo-500">Profile insight</p>
              <p className="mt-3 text-sm text-indigo-900">
                Your profile is missing two commonly requested certifications for Band 5 posts. Review suggestions to boost your match.
              </p>
              <button className="mt-4 text-sm font-semibold text-indigo-600" type="button">
                View suggestions →
              </button>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}

