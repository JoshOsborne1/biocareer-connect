'use client';

import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';

export type CVUpload = {
  name: string;
  sizeLabel: string;
  lastModified: number;
  preview?: string;
};

export type UserProfile = {
  name?: string;
  email?: string;
  location?: string;
  careerFocus?: string[];
  visaNeeded?: boolean;
  mastersInterest?: boolean;
  cv?: CVUpload | null;
};

type UserContextValue = {
  user: UserProfile | null;
  isLoading: boolean;
  updateUser: (updates: Partial<UserProfile>) => void;
  resetUser: () => void;
};

const STORAGE_KEY = 'biocareer:user';

const readStoredProfile = (): UserProfile | null => {
  if (typeof window === 'undefined') return null;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored) as UserProfile;
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return null;
  }
};

export const UserContext = createContext<UserContextValue | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }): ReactNode {
  const [user, setUser] = useState<UserProfile | null>(() => readStoredProfile());
  const [isLoading, setIsLoading] = useState(() => typeof window === 'undefined');

useEffect(() => {
  if (typeof window === 'undefined') return;
  const stored = readStoredProfile();
  const timeout = window.setTimeout(() => {
    setUser(stored);
    setIsLoading(false);
  }, 0);
  return () => window.clearTimeout(timeout);
}, []);

  const persist = useCallback((next: UserProfile | null) => {
    if (typeof window === 'undefined') return;
    if (next) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const updateUser = useCallback(
    (updates: Partial<UserProfile>) => {
      setUser((prev) => {
        const next = { ...(prev ?? {}), ...updates };
        persist(next);
        return next;
      });
    },
    [persist],
  );

  const resetUser = useCallback(() => {
    setUser(null);
    persist(null);
  }, [persist]);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      updateUser,
      resetUser,
    }),
    [user, isLoading, updateUser, resetUser],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

