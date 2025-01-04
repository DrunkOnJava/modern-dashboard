import React from 'react';
import { AdminNavigation } from './navigation/AdminNavigation';
import { AdminHeader } from './navigation/AdminHeader';
import { AdminRoutes } from '../routes';
import { useAuth } from '../../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { LoadingSpinner } from '../../../components/shared/feedback/LoadingSpinner';
import { ErrorBoundaryWrapper } from './ErrorBoundaryWrapper';

export function AdminLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user || user.user_metadata?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return (
    <ErrorBoundaryWrapper componentName="Admin Dashboard">
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <AdminHeader />
        <div className="flex">
          <AdminNavigation />
          <main className="flex-1 p-6">
            <AdminRoutes />
          </main>
        </div>
      </div>
    </ErrorBoundaryWrapper>
  );
}