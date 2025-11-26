'use server';

export type AdzunaJob = {
  id: string;
  adref?: string;
  title: string;
  description: string;
  created: string;
  redirect_url: string;
  category?: {
    tag?: string;
    label?: string;
  };
  company?: {
    display_name?: string;
  };
  location?: {
    display_name?: string;
    area?: string[];
    latitude?: number;
    longitude?: number;
  };
  salary_min?: number;
  salary_max?: number;
  contract_type?: string;
  contract_time?: string;
  latitude?: number;
  longitude?: number;
};

type SearchAdzunaParams = {
  query?: string;
  postcode?: string;
  distanceKm?: number;
  page?: number;
  resultsPerPage?: number;
};

const BASE_URL = 'https://api.adzuna.com/v1/api/jobs';
const DEFAULT_COUNTRY = process.env.ADZUNA_COUNTRY ?? 'gb';
const APP_ID = process.env.ADZUNA_APP_ID;
const APP_KEY = process.env.ADZUNA_APP_KEY;

export async function searchAdzunaJobs({
  query,
  postcode,
  distanceKm = 25,
  page = 1,
  resultsPerPage = 20,
}: SearchAdzunaParams): Promise<AdzunaJob[]> {
  if (!APP_ID || !APP_KEY) {
    return [];
  }

  const url = new URL(`${BASE_URL}/${DEFAULT_COUNTRY}/search/${page}`);
  url.searchParams.set('app_id', APP_ID);
  url.searchParams.set('app_key', APP_KEY);
  url.searchParams.set('results_per_page', resultsPerPage.toString());
  url.searchParams.set('content-type', 'application/json');

  if (query) {
    url.searchParams.set('what', query);
  }

  if (postcode) {
    url.searchParams.set('where', postcode);
    url.searchParams.set('distance', String(distanceKm));
  }

  // Request JSON response
  url.searchParams.set('format', 'json');

  const response = await fetch(url.toString(), {
    headers: {
      'User-Agent': 'BioCareerConnect/1.0 (https://github.com/JoshOsborne1/biocareer-connect)',
    },
    next: {
      revalidate: 60,
    },
  });

  if (!response.ok) {
    console.error('Adzuna API error', response.status, await response.text());
    return [];
  }

  const data = await response.json();
  return Array.isArray(data.results) ? (data.results as AdzunaJob[]) : [];
}

