'use client';

import { useContext } from 'react';

import { UserContext } from '@/contexts/UserContext';

export function useUserProfile() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUserProfile must be used within a UserProvider');
  }

  return context;
}

