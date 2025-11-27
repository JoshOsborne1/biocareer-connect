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
      <div className="flex w-full max-w-4xl items-center justify-between rounded-full border border-border bg-background/80 px-5 py-2.5 shadow-lg backdrop-blur-xl transition-all duration-300 hover:shadow-xl hover:bg-background/90 dark:bg-slate-900/80 dark:border-slate-800">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-teal-500 text-primary-foreground shadow-sm transition-transform group-hover:scale-110 group-hover:rotate-6">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-foreground transition-colors">
              BioCareer<span className="text-primary">.</span>
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
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                )}
              >
                {link.label}
              </Link>
            );
          })}
          
          <div className="h-4 w-px bg-border mx-2" />
          
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus:outline-none"
            aria-label="Toggle theme"
          >
            {mounted ? (
              theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )
            ) : (
              <div className="h-4 w-4" /> // Placeholder to prevent layout shift
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
