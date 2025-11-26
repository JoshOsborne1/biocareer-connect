'use client';

import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  Bookmark,
  Briefcase,
  Building2,
  CheckCircle,
  Clock,
  Globe,
  MapPin,
  Send,
  Share2,
  Sparkles,
  XCircle,
} from 'lucide-react';
import { useState, type ReactElement } from 'react';

import type { DetailedOpportunity } from '@/data/opportunities';

type TabId = 'overview' | 'analysis' | 'cover-letter';

type Props = {
  job?: DetailedOpportunity;
};

export function JobDetail({ job }: Props): ReactElement {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [isGenerating, setIsGenerating] = useState(false);

  if (!job) {
    notFound();
  }

  return (
    <div className="mx-auto min-h-screen max-w-5xl border-x border-slate-200 bg-white shadow-xl">
      <div className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-100 bg-white/95 px-6 py-4 backdrop-blur-sm">
        <button
          className="flex items-center gap-2 text-slate-500 transition-colors hover:text-slate-900"
          type="button"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="text-sm font-semibold">Back to search</span>
        </button>

        <div className="flex gap-2">
          <button
            className="rounded-full p-2 text-slate-400 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
            type="button"
            aria-label="Share opportunity"
          >
            <Share2 className="h-5 w-5" />
          </button>
          <button
            className="rounded-full p-2 text-slate-400 transition-colors hover:bg-teal-50 hover:text-teal-600"
            type="button"
            aria-label="Save opportunity"
          >
            <Bookmark className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="bg-gradient-to-br from-white to-slate-50 px-8 py-10">
        <div className="flex flex-wrap justify-between gap-6">
          <div className="flex-1 min-w-[280px]">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-teal-700">
              <Sparkles className="h-3 w-3" />
              High Match · 92%
            </span>
            <h1 className="mb-2 text-3xl font-bold text-slate-900">{job.title}</h1>
            <div className="mb-4 flex flex-wrap items-center gap-2 text-lg font-medium text-slate-600">
              <Building2 className="h-5 w-5 text-slate-400" />
              {job.company}
              <span className="text-slate-300">•</span>
              <span className="text-slate-500">{job.department}</span>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-600">
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4" />
                {job.location} · {job.commute}
              </span>
              <span className="inline-flex items-center gap-2">
                <Globe className="h-4 w-4" />
                {job.category} · {job.workMode.toUpperCase()}
            </span>
              <span className="inline-flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                {job.salary}
              </span>
              <span className="inline-flex items-center gap-2 font-semibold text-rose-600">
                <Clock className="h-4 w-4" />
                {job.deadline}
              </span>
            </div>
          </div>

          {job.companyBadge ? (
            <div className="hidden rounded-2xl border border-slate-200 bg-white px-6 py-4 text-center text-slate-500 md:flex md:flex-col md:items-center md:justify-center">
              <span className="text-xs uppercase tracking-[0.2em] text-slate-400">Status</span>
              <span className="mt-2 text-3xl font-black text-slate-900">{job.companyBadge}</span>
            </div>
          ) : null}
        </div>
      </div>

      <div className="flex gap-6 border-b border-slate-200 px-8">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'analysis', label: 'AI Analysis', icon: Sparkles },
          { id: 'cover-letter', label: 'Cover Letter', icon: Briefcase },
        ].map((tab) => (
          <button
            key={tab.id}
            className={`relative flex items-center gap-2 pb-4 pt-3 text-sm font-semibold transition-colors ${
              activeTab === tab.id ? 'text-teal-600' : 'text-slate-500 hover:text-slate-700'
            }`}
            type="button"
            onClick={() => setActiveTab(tab.id as TabId)}
          >
            {tab.icon ? (
              <tab.icon className={`h-4 w-4 ${activeTab === tab.id ? 'text-teal-500' : 'text-slate-400'}`} />
            ) : null}
            {tab.label}
            {activeTab === tab.id ? <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-teal-600" /> : null}
          </button>
        ))}
      </div>

      <div className="space-y-8 px-8 py-10">
        {activeTab === 'overview' ? (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-emerald-700">
                  <CheckCircle className="h-5 w-5" />
                  Why you match
                </h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  {(job.matchReasons.length > 0 ? job.matchReasons : ['Strong educational alignment']).map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-rose-100 bg-rose-50/60 p-5">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-rose-600">
                  <XCircle className="h-5 w-5" />
                  Potential gaps
                </h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  {(job.gapAlerts.length > 0 ? job.gapAlerts : ['Additional exposure recommended']).map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-rose-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-bold text-slate-900">Role summary</h3>
              <div className="prose prose-slate max-w-none text-slate-600">
                <p>{job.roleSummary}</p>
                <p className="mt-4 font-semibold text-slate-800">Key duties:</p>
                <ul className="mt-2 list-inside list-disc space-y-1">
                  {(job.keyDuties.length > 0 ? job.keyDuties : ['Support diagnostic workflows']).map((duty) => (
                    <li key={duty}>{duty}</li>
                  ))}
                </ul>
                {job.tags ? (
                  <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-slate-500">
                    {job.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}

        {activeTab === 'analysis' ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-6">
              <h3 className="flex items-center gap-2 text-lg font-bold text-indigo-900">
                <Sparkles className="h-5 w-5 text-indigo-600" />
                Strategic insight
              </h3>
              <p className="mt-3 text-indigo-900/80">{job.strategicInsight}</p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {(job.analysisStats.length > 0 ? job.analysisStats : [{ label: 'Insight', value: 'N/A', caption: '' }]).map((stat) => (
                  <div key={stat.label} className="rounded-2xl bg-white p-4 shadow-sm">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{stat.label}</p>
                    <p className="mt-1 text-lg font-semibold text-slate-900">{stat.value}</p>
                    {stat.caption ? <p className="text-xs text-slate-500">{stat.caption}</p> : null}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900">Addressing the gaps</h3>
              <div className="mt-5 space-y-5">
                {job.gapCoaching.map((gap, index) => (
                  <div key={gap.title} className="flex gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-100 text-sm font-bold text-rose-600">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-slate-800">{gap.title}</p>
                      <p className="mt-1 text-sm text-slate-600">{gap.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {activeTab === 'cover-letter' ? (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            {!isGenerating ? (
              <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-10 text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white text-indigo-600 shadow-sm">
                  <Briefcase className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Generate a tailored cover letter</h3>
                <p className="mx-auto mt-2 max-w-xl text-sm text-slate-500">
                  We will analyse your CV alongside the role description to highlight your haematology placement, IBMS-accredited degree, and HCPC
                  registration progress.
                </p>
                <button
                  className="mt-8 rounded-2xl bg-indigo-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
                  type="button"
                  onClick={() => setIsGenerating(true)}
                >
                  Generate draft
                </button>
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <h3 className="text-lg font-bold text-slate-900">Draft application</h3>
                  <div className="flex gap-2">
                    <button className="rounded-xl px-3 py-1.5 text-sm font-semibold text-slate-500 hover:bg-slate-50" type="button">
                      Copy
                    </button>
                    <button className="rounded-xl bg-teal-50 px-3 py-1.5 text-sm font-semibold text-teal-600" type="button">
                      Save
                    </button>
                  </div>
                </div>
                <div className="mt-6 text-sm leading-relaxed text-slate-700">
                  <p>Dear Hiring Manager,</p>
                  <p className="mt-4">
                    I am writing to express my strong interest in the {job.title} position within {job.department} at {job.company}. As a
                    final-year Biomedical Science student with an IBMS-accredited degree, HCPC registration in progress, and hands-on placement
                    experience...
                  </p>
                  <span className="ml-1 inline-block h-4 w-1.5 animate-pulse bg-indigo-500 align-middle" />
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>

      <div className="sticky bottom-0 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-white px-6 py-4">
        <div className="hidden text-sm font-semibold uppercase tracking-widest text-slate-400 sm:block">
          Status
          <div className="mt-1 text-base text-slate-900">Not applied</div>
        </div>
        <div className="flex flex-1 justify-end gap-3 sm:flex-none">
          <button
            className="flex-1 rounded-2xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:flex-none"
            type="button"
          >
            Save for later
          </button>
          <button
            className="flex-1 items-center justify-center gap-2 rounded-2xl bg-teal-600 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-teal-200 transition hover:bg-teal-700 sm:flex-none sm:flex sm:gap-2"
            type="button"
          >
            Apply on NHS Jobs
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

