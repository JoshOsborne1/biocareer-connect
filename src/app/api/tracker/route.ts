import { trackerCards, trackerColumns } from '@/data/tracker';

export async function GET(): Promise<Response> {
  return Response.json({
    columns: trackerColumns,
    cards: trackerCards,
  });
}

