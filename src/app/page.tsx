'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  ArrowUpRight,
  CheckCircle2,
  Dna,
  Fingerprint,
  Microscope,
  Search,
  Sparkles,
  FlaskConical,
  GraduationCap,
} from 'lucide-react';

import { cn } from '@/lib/utils';

const ICON_MAP = {
  scholarship: GraduationCap,
  lab: Microscope,
  dna: Dna,
  flask: FlaskConical,
  mentor: Sparkles,
  forensic: Fingerprint,
} as const;

type IconKey = keyof typeof ICON_MAP;

type Opportunity = {
  id: string;
  title: string;
  source: string;
  url: string;
  summary: string;
  badge: string;
  freshness: string;
  tags: string[];
  icon: IconKey;
  category: 'biomedical' | 'forensic';
  createdAt?: string;
};

const daysAgo = (days: number): string => new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
const hoursAgo = (hours: number): string => new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();

const FALLBACK_BIOMEDICAL: Opportunity[] = [
  {
    id: 'msc-bristol',
    title: 'MSc Biomedical Sciences with NHS Laboratory Rotation',
    source: 'University of Bristol',
    url: 'https://www.bristol.ac.uk/biomedical-sciences/msc-scholarships/',
    summary: '£6k stipend plus tuition support in exchange for a guaranteed 12‑month Severn Pathology placement. HCPC mentorship built-in.',
    badge: 'Scholarship',
    freshness: '2d ago',
    tags: ['HCPC support', 'NHS rotation'],
    icon: 'scholarship',
    category: 'biomedical',
    createdAt: daysAgo(2),
  },
  {
    id: 'nbt-sponsorship',
    title: 'Biomedical Scientist Sponsorship Scheme',
    source: 'North Bristol NHS Trust',
    url: 'https://www.nbt.nhs.uk/careers/biomedical-science-sponsorship',
    summary: 'Band 4 contract with full HCPC sponsorship. Rotations across Haematology, Microbiology, and Blood Sciences at Southmead Hospital.',
    badge: 'Paid placement',
    freshness: '4h ago',
    tags: ['Visa available', 'Band 4'],
    icon: 'lab',
    category: 'biomedical',
    createdAt: hoursAgo(4),
  },
  {
    id: 'uwe-accelerator',
    title: 'UWE Biomedical Science Accelerator',
    source: 'UWE + Region Biologics',
    url: 'https://info.uwe.ac.uk/jobs',
    summary: 'Part-funded MSc plus two-day/week lab role in translational biomarkers. Designed for final-year students staying in Bristol.',
    badge: 'Hybrid study-work',
    freshness: '1d ago',
    tags: ['Part-time work', 'MSc funding'],
    icon: 'dna',
    category: 'biomedical',
    createdAt: daysAgo(1),
  },
  {
    id: 'severn-field',
    title: 'Severn Diagnostics Field Placement',
    source: 'Severn Diagnostics',
    url: 'https://severndx.co.uk/placements',
    summary: '8-week summer fieldwork across Bristol hospitals focusing on rapid antigen and PCR validation workflows.',
    badge: 'Summer cohort',
    freshness: '5h ago',
    tags: ['Summer', 'PCR'],
    icon: 'flask',
    category: 'biomedical',
    createdAt: hoursAgo(5),
  },
  {
    id: 'biomed-mentor',
    title: 'Biomed Mentor: Student-to-Lab Shadowing',
    source: 'Bristol BioHub',
    url: 'https://bristolbiohub.org/mentor',
    summary: '1:1 mentoring with senior biomedical scientists. Includes two lab shadow days per month and interview coaching.',
    badge: 'Mentorship',
    freshness: '3d ago',
    tags: ['Networking', 'Shadowing'],
    icon: 'mentor',
    category: 'biomedical',
    createdAt: daysAgo(3),
  },
  {
    id: 'ukhsa-internship',
    title: 'Public Health England – Molecular Diagnostics Internship',
    source: 'UKHSA',
    url: 'https://www.gov.uk/government/organisations/uk-health-security-agency/about/recruitment',
    summary: '10-week internship within the local outbreak response hub. Focus on pathogen surveillance and sequencing.',
    badge: 'Paid internship',
    freshness: '6h ago',
    tags: ['Sequencing', 'Public health'],
    icon: 'lab',
    category: 'biomedical',
    createdAt: hoursAgo(6),
  },
];

const FALLBACK_FORENSIC: Opportunity[] = [
  {
    id: 'forensic-grad',
    title: 'Forensic Science Graduate Programme',
    source: 'Avon & Somerset Police + UWE',
    url: 'https://www.avonandsomerset.police.uk/jobs',
    summary: 'Two-year salaried pathway with crime scene placements plus subsidised MSc in Forensic Science.',
    badge: 'Graduate scheme',
    freshness: 'Today',
    tags: ['Crime scene', 'MSc included'],
    icon: 'forensic',
    category: 'forensic',
    createdAt: hoursAgo(2),
  },
  {
    id: 'eurofins-toxicology',
    title: 'Forensic Toxicology Work Placement',
    source: 'Eurofins Forensic Services',
    url: 'https://careers.eurofins.com/uk/',
    summary: 'Lab experience supporting toxicology casework. Based in Bristol with option to convert to full-time analyst.',
    badge: 'Placement',
    freshness: 'Yesterday',
    tags: ['Toxicology', 'Paid'],
    icon: 'flask',
    category: 'forensic',
    createdAt: daysAgo(1),
  },
  {
    id: 'wm-immersion',
    title: 'West Midlands Forensics – Student Immersion Week',
    source: 'WM Forensics',
    url: 'https://www.wmforensics.gov.uk/placements',
    summary: 'Immersive workshop covering digital forensics, trace evidence, and courtroom reporting. Travel bursaries for Bristol students.',
    badge: 'Short course',
    freshness: '5d ago',
    tags: ['Digital', 'Scholarship'],
    icon: 'forensic',
    category: 'forensic',
    createdAt: daysAgo(5),
  },
];

const PAGE_SIZE = 5;

type OpportunityCardProps = {
  item: Opportunity;
  delay: number;
  applied: boolean;
  onToggleApplied: (id: string) => void;
};

function OpportunityCard({ item, delay, applied, onToggleApplied }: OpportunityCardProps) {
  const Icon = ICON_MAP[item.icon] ?? ICON_MAP.lab;

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1',
        applied && 'opacity-60 grayscale hover:opacity-90',
      )}
      style={{ animation: `fade-in 0.6s ease-out ${delay}ms forwards`, opacity: 0 }}
    >
      <div className="absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-gradient-to-br from-primary/10 to-teal-500/10 opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />

      <div className="relative z-10">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-primary/10 p-1.5 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <Icon className="h-4 w-4" />
            </div>
            <span className="text-xs font-semibold text-muted-foreground transition-colors group-hover:text-primary">{item.source}</span>
          </div>
          <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-medium text-muted-foreground">{item.freshness}</span>
        </div>

        <h3 className="pr-6 text-base font-bold leading-tight text-foreground transition-colors group-hover:text-primary">{item.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-foreground">{item.summary}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-md border border-primary/20 bg-primary/5 px-2 py-0.5 text-[10px] font-medium text-primary">
            {item.badge}
          </span>
          {item.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="rounded-md bg-accent px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 mt-6 flex items-center justify-between border-t border-border pt-4">
        <p className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
          <ArrowUpRight className="h-3.5 w-3.5" />
          View original post
        </p>
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            onToggleApplied(item.id);
          }}
          className={cn(
            'inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[11px] font-semibold transition-colors',
            applied
              ? 'border-primary/40 bg-primary/10 text-primary'
              : 'border-border bg-background/60 text-muted-foreground hover:border-primary/40 hover:text-primary',
          )}
        >
          <CheckCircle2 className="h-3.5 w-3.5" />
          {applied ? 'Applied' : 'Mark applied'}
        </button>
      </div>
    </a>
  );
}

export default function Home(): JSX.Element {
  const [query, setQuery] = useState('');
  const [bioVisibleCount, setBioVisibleCount] = useState(PAGE_SIZE);
  const [forensicVisibleCount, setForensicVisibleCount] = useState(PAGE_SIZE);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [view, setView] = useState<'active' | 'applied'>('active');
  const [biomedicalData, setBiomedicalData] = useState<Opportunity[]>(FALLBACK_BIOMEDICAL);
  const [forensicData, setForensicData] = useState<Opportunity[]>(FALLBACK_FORENSIC);
  const [isLoadingLive, setIsLoadingLive] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [appliedIds, setAppliedIds] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = window.localStorage.getItem('biocareer_applied');
      return stored ? (JSON.parse(stored) as string[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    window.localStorage.setItem('biocareer_applied', JSON.stringify(appliedIds));
  }, [appliedIds]);

  useEffect(() => {
    const controller = new AbortController();
    const loadLiveData = async (): Promise<void> => {
      setIsLoadingLive(true);
      setFetchError(null);
      try {
        const response = await fetch('/api/opportunities', { signal: controller.signal });
        if (!response.ok) throw new Error('Failed to fetch opportunities');
        const payload = (await response.json()) as { biomedical?: Opportunity[]; forensic?: Opportunity[] };
        if (controller.signal.aborted) return;
        if (payload.biomedical && payload.biomedical.length > 0) {
          setBiomedicalData(payload.biomedical);
        }
        if (payload.forensic && payload.forensic.length > 0) {
          setForensicData(payload.forensic);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error('Live fetch failed', error);
          setFetchError('Showing snapshots while we refresh live feeds.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoadingLive(false);
        }
      }
    };

    loadLiveData();
    return () => controller.abort();
  }, []);

  const filteredBio = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return biomedicalData;
    return biomedicalData.filter((item) => [item.title, item.summary, item.source, item.badge, ...item.tags].join(' ').toLowerCase().includes(q));
  }, [query, biomedicalData]);

  const filteredForensic = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return forensicData;
    return forensicData.filter((item) => [item.title, item.summary, item.source, item.badge, ...item.tags].join(' ').toLowerCase().includes(q));
  }, [query, forensicData]);

  const sortByApplied = (items: Opportunity[]): Opportunity[] =>
    [...items].sort((a, b) => {
      const aApplied = appliedIds.includes(a.id);
      const bApplied = appliedIds.includes(b.id);
      if (aApplied === bApplied) return 0;
      return aApplied ? 1 : -1;
    });

  const visibleBio = sortByApplied(filteredBio).slice(0, bioVisibleCount);
  const visibleForensic = sortByApplied(filteredForensic).slice(0, forensicVisibleCount);

  const appliedBio = biomedicalData.filter((item) => appliedIds.includes(item.id));
  const appliedForensic = forensicData.filter((item) => appliedIds.includes(item.id));

  const canShowMoreBio = filteredBio.length > bioVisibleCount;
  const canShowMoreForensic = filteredForensic.length > forensicVisibleCount;

  const newOpportunities = useMemo(() => {
    const combined = [...biomedicalData, ...forensicData];
    return combined
      .filter((item) => item.createdAt)
      .sort(
        (a, b) =>
          (b.createdAt ? new Date(b.createdAt).getTime() : 0) - (a.createdAt ? new Date(a.createdAt).getTime() : 0),
      )
      .slice(0, 4);
  }, [biomedicalData, forensicData]);

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setBioVisibleCount(PAGE_SIZE);
    setForensicVisibleCount(PAGE_SIZE);
  };

  const toggleApplied = (id: string): void => {
    setAppliedIds((prev) => (prev.includes(id) ? prev.filter((value) => value !== id) : [...prev, id]));
  };

  return (
    <div className="space-y-16 pb-20">
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] animate-float rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] animate-float rounded-full bg-teal-500/5 blur-3xl" style={{ animationDelay: '2s' }} />
      </div>

      <section className="relative mx-auto max-w-3xl space-y-8 text-center animate-slide-up">
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tighter text-foreground sm:text-5xl lg:text-6xl">
            Match. Apply. <span className="animate-pulse-slow bg-gradient-to-r from-primary to-teal-400 bg-clip-text text-transparent">Succeed.</span>
          </h1>
          <p className="mx-auto max-w-xl text-lg text-muted-foreground">Direct pathways to biomedical & forensic careers in Bristol.</p>
          <div className="flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
            {isLoadingLive ? 'Refreshing live feeds…' : 'Live feed synced'}
            {fetchError ? <span className="rounded-full border border-amber-300 px-2 py-0.5 text-[10px] text-amber-600">{fetchError}</span> : null}
          </div>
        </div>

        <form
          onSubmit={handleSearchSubmit}
          className={cn(
            'group relative mx-auto flex max-w-md items-center gap-2 rounded-full border bg-background/50 p-1.5 backdrop-blur-md transition-all duration-300',
            isSearchFocused ? 'w-full border-primary shadow-lg shadow-primary/10 ring-4 ring-primary/5' : 'w-[280px] border-border shadow-sm hover:w-[320px]',
          )}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            value={query}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search roles..."
            className="flex-1 bg-transparent text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <button
            type="submit"
            className={cn(
              'rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground transition-all duration-300',
              query ? 'translate-x-0 opacity-100' : 'w-0 translate-x-4 overflow-hidden px-0 opacity-0',
            )}
          >
            Go
          </button>
        </form>
      </section>

      {newOpportunities.length > 0 ? (
        <section className="space-y-4 rounded-3xl border border-border bg-card/80 p-6 shadow-sm backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">New opportunities</p>
              <h2 className="text-lg font-semibold text-foreground">Fresh roles surfaced in the last few hours</h2>
            </div>
            <span className="rounded-full border border-primary/20 px-3 py-1 text-xs font-medium text-primary">
              {newOpportunities.length} featured
            </span>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {newOpportunities.map((item, index) => (
              <OpportunityCard
                key={`new-${item.id}`}
                item={item}
                delay={index * 80}
                applied={appliedIds.includes(item.id)}
                onToggleApplied={toggleApplied}
              />
            ))}
          </div>
        </section>
      ) : null}

      <div className="mx-auto flex max-w-md items-center rounded-full border border-border bg-card/80 p-1 text-xs font-semibold text-muted-foreground shadow-sm">
        <button
          type="button"
          onClick={() => setView('active')}
          className={cn('flex-1 rounded-full px-4 py-2 transition-colors', view === 'active' ? 'bg-primary/10 text-primary' : 'hover:text-foreground')}
        >
          Active
        </button>
        <button
          type="button"
          onClick={() => setView('applied')}
          className={cn('flex-1 rounded-full px-4 py-2 transition-colors', view === 'applied' ? 'bg-primary/10 text-primary' : 'hover:text-foreground')}
        >
          Applied
        </button>
      </div>

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
        <section className="space-y-6">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <div className="h-8 w-1 rounded-full bg-gradient-to-b from-primary to-transparent" />
              <h2 className="text-xl font-bold text-foreground">Biomedical</h2>
            </div>
            <span className="rounded-full bg-accent px-2 py-1 text-xs font-medium text-muted-foreground">{filteredBio.length} active</span>
          </div>

          {view === 'active' ? (
            <div className="grid gap-4">
              {visibleBio.map((item, index) => (
                <OpportunityCard key={item.id} item={item} delay={index * 100} applied={appliedIds.includes(item.id)} onToggleApplied={toggleApplied} />
              ))}
              {filteredBio.length === 0 && (
                <div className="rounded-xl border border-dashed border-border p-8 text-center">
                  <p className="text-sm text-muted-foreground">No matches found.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="grid gap-4">
              {appliedBio.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border p-8 text-center">
                  <p className="text-sm text-muted-foreground">No applied biomedical roles yet.</p>
                </div>
              ) : (
                appliedBio.map((item, index) => (
                  <OpportunityCard key={item.id} item={item} delay={index * 80} applied onToggleApplied={toggleApplied} />
                ))
              )}
            </div>
          )}

          {view === 'active' && canShowMoreBio && (
            <button
              onClick={() => setBioVisibleCount((count) => Math.min(count + PAGE_SIZE, filteredBio.length))}
              className="w-full rounded-xl border border-border bg-background/50 py-3 text-xs font-semibold text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              Load more biomedical roles
            </button>
          )}
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <div className="h-8 w-1 rounded-full bg-gradient-to-b from-teal-500 to-transparent" />
              <h2 className="text-xl font-bold text-foreground">Forensics</h2>
            </div>
            <span className="rounded-full bg-accent px-2 py-1 text-xs font-medium text-muted-foreground">{filteredForensic.length} active</span>
          </div>

          {view === 'active' ? (
            <div className="grid gap-4">
              {visibleForensic.map((item, index) => (
                <OpportunityCard key={item.id} item={item} delay={index * 100 + 200} applied={appliedIds.includes(item.id)} onToggleApplied={toggleApplied} />
              ))}
              {filteredForensic.length === 0 && (
                <div className="rounded-xl border border-dashed border-border p-8 text-center">
                  <p className="text-sm text-muted-foreground">No matches found.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="grid gap-4">
              {appliedForensic.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border p-8 text-center">
                  <p className="text-sm text-muted-foreground">No applied forensic roles yet.</p>
                </div>
              ) : (
                appliedForensic.map((item, index) => (
                  <OpportunityCard key={item.id} item={item} delay={index * 120} applied onToggleApplied={toggleApplied} />
                ))
              )}
            </div>
          )}

          {view === 'active' && canShowMoreForensic && (
            <button
              onClick={() => setForensicVisibleCount((count) => Math.min(count + PAGE_SIZE, filteredForensic.length))}
              className="w-full rounded-xl border border-border bg-background/50 py-3 text-xs font-semibold text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              Load more forensic roles
            </button>
          )}
        </section>
      </div>
    </div>
  );
}

