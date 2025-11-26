import Link from 'next/link';

const quickLinks = [
  { title: 'Opportunity feed', description: 'Scan curated roles matched to your profile', href: '/dashboard' },
  { title: 'Profile intelligence', description: 'Upload your CV and track skills coverage', href: '/profile' },
  { title: 'Application tracker', description: 'Stay on top of every submission & interview', href: '/tracker' },
];

export default function Home(): JSX.Element {
  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-20 lg:px-12">
        <section className="rounded-3xl border border-slate-200 bg-white px-8 py-12 shadow-sm lg:px-12">
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-teal-500">BioCareer connect</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold text-slate-900 sm:text-5xl">
            Find biomedical roles faster with AI-powered match intelligence.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            Upload your CV once and let the platform surface relevant NHS, pharma, and academic roles, highlight requirements, and generate tailored
            applications in minutes.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-2xl bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-200 transition hover:bg-teal-700"
            >
              Explore opportunities
            </Link>
            <Link
              href="/profile"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Build my profile
            </Link>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          {quickLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-teal-200 hover:shadow-md"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{link.title}</p>
              <p className="mt-3 text-lg font-semibold text-slate-900">{link.description}</p>
              <span className="mt-4 inline-flex items-center text-sm font-semibold text-teal-600">Open →</span>
            </Link>
          ))}
        </section>
      </main>
    </div>
  );
}
