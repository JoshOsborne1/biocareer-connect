import { profileActions, profileAttributes, profileMetrics, profilePreferences } from '@/data/profile';

export async function GET(): Promise<Response> {
  return Response.json({
    metrics: profileMetrics,
    attributes: profileAttributes,
    preferences: profilePreferences,
    actions: profileActions,
  });
}

