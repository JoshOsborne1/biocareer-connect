'use client';

import type { ReactNode } from 'react';

import { UserProvider } from '@/contexts/UserContext';
import OnboardingModal from '@/components/OnboardingModal';

export default function Providers({ children }: { children: ReactNode }): ReactNode {
  return (
    <UserProvider>
      {children}
      <OnboardingModal />
    </UserProvider>
  );
}

