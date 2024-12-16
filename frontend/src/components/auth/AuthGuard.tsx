import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';
import type { AuthGuardProps } from '../../types/auth';

export function AuthGuard({ children }: AuthGuardProps) {
  const { isConnected } = useAuthStore();

  if (!isConnected) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}