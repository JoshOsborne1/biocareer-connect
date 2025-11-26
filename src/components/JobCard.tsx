'use client';

import Link from 'next/link';
import { Building2, CheckCircle, ChevronRight, Clock, FileText, Globe, MapPin, Sparkles, XCircle } from 'lucide-react';
import type { ReactElement } from 'react';

import type { JobOpportunity } from '@/data/opportunities';

type Props = {
  job: JobOpportunity;
};

const badgeTone = (score: number): { text: string; ring: string; bg: string } => {
  if (score >= 80) {
    return { text: 'text-emerald-600', ring: 'ring-emerald-100', bg: 'bg-emerald-50' };
  }

  if (score >= 60) {
    return { text: 'text-amber-600', ring: 'ring-amber-100', bg: 'bg-amber-50' };
  }

  return { text: 'text-slate-500', ring: 'ring-slate-200', bg: 'bg-slate-50' };
};

export function JobCard({ job }: Props): ReactElement {
  const tone = badgeTone(job.matchScore);

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md">
      <div className="flex items-start justify-between gap-4 p-5">
          <div className="flex-1">
            <div className="mb-1 flex items-center gap-2">
              <h3 className="text-lg font-semibold text-slate-900 transition-colors group-hover:text-teal-600">
                {job.title}
              </h3>
              {job.visaSupport ? (
                <span className="rounded-full border border-purple-200 bg-purple-50 px-2 py-0.5 text-xs font-semibold text-purple-700">
                  Visa Sponsored
                </span>
              ) : null}
              {job.mastersSponsorship ? (
                <span className="rounded-full border border-indigo-200 bg-indigo-50 px-2 py-0.5 text-xs font-semibold text-indigo-700">
                  Masters Path
                </span>
              ) : null}
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
              <span className="flex items-center gap-1.5 font-medium text-slate-600">
                <Building2 className="h-4 w-4" />
                {job.company}
              </span>
              <span className="flex items-center gap-1.5">
                <Globe className="h-4 w-4" />
                {job.category}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                {job.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {job.postedAt}
              </span>
            </div>
          </div>

          <div
            className={`flex h-20 w-20 flex-col items-center justify-center rounded-full bg-white text-center text-sm font-semibold ring-4 ${tone.ring}`}
          >
            <div className={`text-2xl font-black ${tone.text}`}>{job.matchScore}%</div>
            <span className="text-[11px] uppercase tracking-wide text-slate-400">Match</span>
          </div>
        </div>

        <div className="grid gap-4 border-t border-slate-100 bg-slate-50/60 px-5 py-4 sm:grid-cols-2">
          <div>
            <h4 className="mb-2 flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-emerald-600">
              <CheckCircle className="h-3.5 w-3.5" />
              Key Matches
            </h4>
            <ul className="space-y-1.5">
              {job.pros.slice(0, 3).map((pro) => (
                <li key={pro} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {pro}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-2 flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-rose-500">
              <XCircle className="h-3.5 w-3.5" />
              Potential Gaps
            </h4>
            <ul className="space-y-1.5">
              {job.missingSkills.length > 0 ? (
                job.missingSkills.slice(0, 3).map((gap) => (
                  <li key={gap} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-rose-500" />
                    {gap}
                  </li>
                ))
              ) : (
                <li className="text-sm italic text-slate-400">No notable gaps detected</li>
              )}
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 bg-white px-5 py-4">
          <div className="flex flex-wrap gap-2">
            <button className="flex items-center gap-1.5 rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-sm font-semibold text-indigo-600 transition-colors hover:bg-indigo-100">
              <Sparkles className="h-4 w-4" />
              Draft Cover Letter
            </button>
            <button className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100">
              <FileText className="h-4 w-4" />
              View Summary
            </button>
          </div>
          <Link
            href={`/opportunities/${job.id}`}
            className="flex items-center gap-1 text-sm font-semibold text-teal-600 transition-colors hover:text-teal-700"
          >
            Details
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
    </div>
  );
}

