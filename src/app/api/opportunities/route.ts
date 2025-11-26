import { randomUUID } from 'crypto';

import { opportunities, type JobOpportunity } from '@/data/opportunities';
import { searchAdzunaJobs, type AdzunaJob } from '@/lib/adzunaClient';

function toBoolean(value: string | null): boolean {
  return value === 'true' || value === '1';
}

type Coordinates = {
  latitude: number;
  longitude: number;
};

async function geocodePostcode(postcode: string): Promise<Coordinates | null> {
  if (!postcode) return null;
  try {
    const response = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(postcode)}`, {
      next: { revalidate: 60 * 60 },
    });
    if (!response.ok) return null;
    const data = await response.json();
    if (!data?.result) return null;
    return {
      latitude: data.result.latitude,
      longitude: data.result.longitude,
    };
  } catch {
    return null;
  }
}

function haversineDistance(a: Coordinates, b: Coordinates): number {
  const R = 6371; // km
  const dLat = ((b.latitude - a.latitude) * Math.PI) / 180;
  const dLon = ((b.longitude - a.longitude) * Math.PI) / 180;
  const lat1 = (a.latitude * Math.PI) / 180;
  const lat2 = (b.latitude * Math.PI) / 180;

  const sinDLat = Math.sin(dLat / 2);
  const sinDLon = Math.sin(dLon / 2);

  const h = sinDLat * sinDLat + sinDLon * sinDLon * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
  return R * c;
}

function mapAdzunaJob(job: AdzunaJob, userCoords?: Coordinates | null): JobOpportunity {
  const matchScore = 60 + Math.floor(Math.random() * 35);
  const workModeDesc = job.description?.toLowerCase() ?? '';
  let workMode: JobOpportunity['workMode'] = 'onsite';
  if (workModeDesc.includes('remote')) {
    workMode = 'remote';
  } else if (workModeDesc.includes('hybrid')) {
    workMode = 'hybrid';
  }

  const jobCoords =
    job.latitude && job.longitude
      ? { latitude: job.latitude as number, longitude: job.longitude as number }
      : job.location?.latitude && job.location?.longitude
        ? { latitude: job.location.latitude as number, longitude: job.location.longitude as number }
        : null;

  const distanceKm = userCoords && jobCoords ? haversineDistance(userCoords, jobCoords) : undefined;
  const salaryLabel =
    job.salary_min && job.salary_max
      ? `£${Math.round(job.salary_min).toLocaleString()} - £${Math.round(job.salary_max).toLocaleString()}`
      : job.salary_max
        ? `Up to £${Math.round(job.salary_max).toLocaleString()}`
        : job.salary_min
          ? `From £${Math.round(job.salary_min).toLocaleString()}`
          : undefined;

  return {
    id: job.id ?? job.adref ?? randomUUID(),
    title: job.title ?? 'Job opportunity',
    company: job.company?.display_name ?? 'Confidential employer',
    sourceName: 'Adzuna',
    sourceUrl: job.redirect_url,
    distanceKm,
    category: job.category?.label ?? 'General',
    industries: job.category?.label ? [job.category.label] : ['General'],
    workMode,
    location: job.location?.display_name ?? 'United Kingdom',
    postedAt: new Date(job.created ?? Date.now()).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }),
    matchScore,
    matchBreakdown: {
      skills: Math.min(100, matchScore + 5),
      experience: Math.max(50, matchScore - 5),
      education: Math.min(100, matchScore + 8),
    },
    pros: [
      salaryLabel ? `Compensation: ${salaryLabel}` : undefined,
      job.contract_time ? `${job.contract_time.replace('_', ' ')} role` : undefined,
      job.location?.display_name,
    ].filter(Boolean) as string[],
    cons: [],
    missingSkills: [],
    visaSupport: false,
    mastersSponsorship: false,
    studentFriendly: false,
    experienceLevel: 'graduate',
    educationLevel: 'Bachelor',
    tags: [job.contract_type, job.contract_time, job.category?.tag].filter(Boolean) as string[],
  };
}

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const query = (searchParams.get('q') ?? '').toLowerCase();
  const category = searchParams.get('category') ?? 'all';
  const industry = searchParams.get('industry') ?? 'all';
  const workMode = searchParams.get('workMode') ?? 'all';
  const visaOnly = toBoolean(searchParams.get('visaOnly'));
  const mastersOnly = toBoolean(searchParams.get('mastersOnly'));
  const studentOnly = toBoolean(searchParams.get('studentOnly'));
  const postcode = searchParams.get('postcode') ?? '';
  const distance = Number(searchParams.get('distance') ?? '25');

  let liveJobs: JobOpportunity[] = [];
  let userCoords: Coordinates | null = null;

  if (postcode) {
    userCoords = await geocodePostcode(postcode);
  }

  try {
    const adzunaResults = await searchAdzunaJobs({
      query,
      postcode: postcode || undefined,
      distanceKm: distance,
      resultsPerPage: 20,
    });

    liveJobs = adzunaResults.map((job) => mapAdzunaJob(job, userCoords));
  } catch (error) {
    console.error('Failed to load Adzuna jobs', error);
  }

  const baseJobs = liveJobs.length > 0 ? liveJobs : opportunities;

  const filtered = baseJobs.filter((job) => {
    const matchesQuery = [job.title, job.company, job.location, job.category, ...job.industries]
      .join(' ')
      .toLowerCase()
      .includes(query);

    if (!matchesQuery) return false;
    if (category !== 'all' && job.category !== category) return false;
    if (industry !== 'all' && !job.industries.includes(industry)) return false;
    if (workMode !== 'all' && job.workMode !== workMode) return false;
    if (visaOnly && !job.visaSupport) return false;
    if (mastersOnly && !job.mastersSponsorship) return false;
    if (studentOnly && !job.studentFriendly) return false;

    return true;
  });

  return Response.json({
    total: filtered.length,
    items: filtered,
  });
}

