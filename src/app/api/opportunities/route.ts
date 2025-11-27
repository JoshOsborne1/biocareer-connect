import { NextResponse } from 'next/server';

import { fetchAdzunaOpportunities, type OpportunityPayload } from '@/lib/adzunaClient';

const BIOMEDICAL_QUERY = {
  query: 'biomedical scientist',
  location: 'Bristol, UK',
  category: 'biomedical' as const,
  icon: 'lab' as const,
};

const FORENSIC_QUERY = {
  query: 'forensic science',
  location: 'United Kingdom',
  category: 'forensic' as const,
  icon: 'forensic' as const,
};

export async function GET(): Promise<Response> {
  try {
    const [biomedical, forensic] = await Promise.all<OpportunityPayload[]>([
      fetchAdzunaOpportunities(BIOMEDICAL_QUERY),
      fetchAdzunaOpportunities(FORENSIC_QUERY),
    ]);

    return NextResponse.json({
      biomedical,
      forensic,
    });
  } catch (error) {
    console.error('Failed to load Adzuna data:', error);
    return NextResponse.json(
      {
        biomedical: [],
        forensic: [],
      },
      { status: 200 },
    );
  }
}

