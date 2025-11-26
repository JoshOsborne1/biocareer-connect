import Link from 'next/link';

export default function OpportunityNotFound(): JSX.Element {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="max-w-md rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <p className="text-xs font-bold uppercase tracking-[0.4em] text-rose-500">Opportunity</p>
        <h1 className="mt-3 text-2xl font-bold text-slate-900">We couldn’t find that role</h1>
        <p className="mt-2 text-sm text-slate-500">
          It might have been removed or closed. Continue exploring similar Biomedical Science roles on your personalised dashboard.
        </p>
        <Link
          href="/dashboard"
          className="mt-6 inline-flex items-center justify-center rounded-2xl bg-teal-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-200"
        >
          Return to dashboard
        </Link>
      </div>
    </div>
  );
}

