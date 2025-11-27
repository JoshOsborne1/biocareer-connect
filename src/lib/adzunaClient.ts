import { randomUUID } from 'crypto';

type AdzunaJob = {
  id?: string;
  adref?: string;
  title?: string;
  description?: string;
  company?: { display_name?: string };
  location?: { display_name?: string };
  category?: { label?: string };
  created?: string;
  redirect_url?: string;
};

type IconKey = 'scholarship' | 'lab' | 'dna' | 'flask' | 'mentor' | 'forensic';

export type OpportunityPayload = {
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

const ADZUNA_APP_ID = process.env.ADZUNA_APP_ID;
const ADZUNA_APP_KEY = process.env.ADZUNA_APP_KEY;
const ADZUNA_COUNTRY = process.env.ADZUNA_COUNTRY ?? 'gb';

const FALLBACK_BADGE = 'Opportunity';

const sanitizeText = (value: string | undefined): string => {
  if (!value) return 'Fresh opportunity';
  return value.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
};

const relativeTime = (isoDate: string | undefined): string => {
  if (!isoDate) return 'Just now';
  const created = new Date(isoDate).getTime();
  const diffMs = Date.now() - created;
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  if (diffHours < 1) return 'Just now';
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;
  return new Date(isoDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
};

export async function fetchAdzunaOpportunities({
  query,
  location,
  category,
  icon,
  size = 6,
}: {
  query: string;
  location: string;
  category: 'biomedical' | 'forensic';
  icon: IconKey;
  size?: number;
}): Promise<OpportunityPayload[]> {
  if (!ADZUNA_APP_ID || !ADZUNA_APP_KEY) {
    console.warn('Adzuna credentials missing, skipping live fetch');
    return [];
  }

  const params = new URLSearchParams({
    what: query,
    where: location,
    app_id: ADZUNA_APP_ID,
    app_key: ADZUNA_APP_KEY,
    results_per_page: size.toString(),
    content_type: 'application/json',
  });

  const url = `https://api.adzuna.com/v1/api/jobs/${ADZUNA_COUNTRY}/search/1?${params.toString()}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Adzuna request failed: ${response.status}`);
  }

  const data = (await response.json()) as { results?: AdzunaJob[] };
  if (!data.results) return [];

  return data.results.map((job) => {
    const id = job.id ?? job.adref ?? randomUUID();
    const summary = sanitizeText(job.description ?? '');
    const createdAt = job.created ?? new Date().toISOString();
    return {
      id,
      title: job.title ?? 'Untitled opportunity',
      source: job.company?.display_name ?? 'Confidential employer',
      url: job.redirect_url ?? '#',
      summary: summary.length > 220 ? `${summary.slice(0, 217)}…` : summary,
      badge: job.category?.label ?? FALLBACK_BADGE,
      freshness: relativeTime(job.created),
      tags: [job.location?.display_name ?? 'Flexible', category === 'biomedical' ? 'Biomedical' : 'Forensic'],
      icon,
      category,
      createdAt,
    };
  });
}

