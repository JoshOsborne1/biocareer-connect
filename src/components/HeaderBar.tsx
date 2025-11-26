'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FormEvent, useState } from 'react';

import { useUserProfile } from '@/hooks/useUserProfile';
import { cn } from '@/lib/utils';
import { MapPin, UserCircle2 } from 'lucide-react';

const NAV_LINKS = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/profile', label: 'Profile' },
  { href: '/tracker', label: 'Tracker' },
];

export default function HeaderBar(): JSX.Element {
  const pathname = usePathname();
  const { user, updateUser, resetUser } = useUserProfile();
  const [draftLocation, setDraftLocation] = useState('');
  const [hasEdited, setHasEdited] = useState(false);

  const locationInput = hasEdited ? draftLocation : user?.location ?? '';

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((segment) => segment[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'U';

  const handleLocationSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const trimmed = locationInput.trim();
    if (!trimmed) return;
    updateUser({ location: trimmed });
    setHasEdited(false);
    setDraftLocation('');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-teal-600 text-lg font-black text-white">B</div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400">BioCareer</p>
              <p className="text-sm font-semibold text-slate-900">Opportunity network</p>
            </div>
          </Link>
          <nav className="hidden gap-1 sm:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'rounded-2xl px-3 py-1.5 text-sm font-semibold transition-colors',
                  pathname === link.href ? 'bg-teal-50 text-teal-700' : 'text-slate-500 hover:text-slate-900',
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <form onSubmit={handleLocationSubmit} className="hidden items-center gap-2 rounded-2xl border border-slate-200 px-3 py-1.5 sm:flex">
            <MapPin className="h-4 w-4 text-slate-400" />
            <input
              value={locationInput}
              onChange={(event) => {
                setHasEdited(true);
                setDraftLocation(event.target.value);
              }}
              placeholder="Postcode"
              className="w-28 border-none bg-transparent text-sm text-slate-700 focus:outline-none"
            />
            <button
              type="submit"
              className="text-xs font-semibold text-teal-600 transition hover:text-teal-700"
              disabled={!locationInput.trim()}
            >
              Update
            </button>
          </form>

          <div className="relative group">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-bold text-slate-700">
              {user?.name ? initials : <UserCircle2 className="h-6 w-6 text-slate-400" />}
            </div>
            <div className="invisible absolute right-0 top-12 w-48 rounded-2xl border border-slate-200 bg-white p-3 text-sm text-slate-600 shadow-lg transition group-hover:visible">
              <p className="font-semibold text-slate-900">{user?.name ?? 'Guest user'}</p>
              <p className="text-xs text-slate-400">{user?.email ?? 'Add an email'}</p>
              <div className="mt-3 space-y-2">
                <Link href="/profile" className="block rounded-lg px-2 py-1 font-semibold text-teal-600 hover:bg-teal-50">
                  Edit profile
                </Link>
                <button
                  type="button"
                  className="w-full rounded-lg px-2 py-1 text-left text-xs font-semibold text-rose-500 hover:bg-rose-50"
                  onClick={resetUser}
                >
                  Switch user
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

