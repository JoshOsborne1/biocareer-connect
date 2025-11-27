'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { Sparkles, Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

const NAV_LINKS = [
  { href: '/', label: 'Opportunities' },
  { href: '/cover-letter', label: 'Cover Letter Lab' },
];

export default function SiteHeader(): JSX.Element {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center py-4 px-4">
      <div className="flex w-full max-w-4xl items-center justify-between rounded-full border border-slate-200 bg-white px-5 py-2.5 shadow-lg transition-all duration-300 hover:border-teal-200 hover:shadow-[0_0_20px_rgba(13,148,136,0.15)] dark:bg-slate-900/90 dark:border-slate-800 dark:hover:shadow-[0_0_20px_rgba(45,212,191,0.1)]">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-teal-600 to-teal-400 text-white shadow-sm transition-transform group-hover:scale-110 group-hover:rotate-6">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-slate-100 transition-colors">
              BioCareer<span className="text-teal-600 dark:text-teal-400">.</span>
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-300',
                  isActive
                    ? 'text-teal-700 bg-teal-50 dark:bg-teal-900/30 dark:text-teal-300'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800'
                )}
              >
                {link.label}
              </Link>
            );
          })}
          
          <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 mx-2" />
          
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus:outline-none dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            aria-label="Toggle theme"
          >
            {mounted ? (
              theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )
            ) : (
              <div className="h-4 w-4" />
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
