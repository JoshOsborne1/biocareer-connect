import { JobDetail } from '@/components/JobDetail';
import { findOpportunity, opportunities } from '@/data/opportunities';
import { notFound } from 'next/navigation';

type Params = {
  id: string;
};

export function generateStaticParams(): Params[] {
  return opportunities.map((opportunity) => ({ id: opportunity.id }));
}

export default function OpportunityPage({ params }: { params: Params }): JSX.Element {
  const job = findOpportunity(params.id);

  if (!job) {
    notFound();
  }

  return <JobDetail job={job} />;
}

