import { opportunities } from '@/data/opportunities';

function toBoolean(value: string | null): boolean {
  return value === 'true' || value === '1';
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

  const filtered = opportunities.filter((job) => {
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

