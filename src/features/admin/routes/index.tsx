import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundaryWrapper } from '../components/ErrorBoundaryWrapper';
import { LoadingSpinner } from '../../../components/shared/feedback/LoadingSpinner';

// Lazy load route components
const UserManagement = React.lazy(() => import('./UserManagement').then(m => ({ default: m.UserManagement })));
const APIConfig = React.lazy(() => import('./APIConfig').then(m => ({ default: m.APIConfig })));
const SecuritySettings = React.lazy(() => import('./SecuritySettings').then(m => ({ default: m.SecuritySettings })));
const ActivityLogs = React.lazy(() => import('./ActivityLogs').then(m => ({ default: m.ActivityLogs })));
const SystemSettings = React.lazy(() => import('./SystemSettings').then(m => ({ default: m.SystemSettings })));

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center h-64">
      <LoadingSpinner size="lg" />
    </div>
  );
}

function RouteWithErrorBoundary({ component: Component, name }: { component: React.ComponentType; name: string }) {
  return (
    <ErrorBoundaryWrapper componentName={name}>
      <Component />
    </ErrorBoundaryWrapper>
  );
}

export function AdminRoutes() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route index element={<Navigate to="users" replace />} />
        <Route path="users" element={<RouteWithErrorBoundary component={UserManagement} name="User Management" />} />
        <Route path="api" element={<RouteWithErrorBoundary component={APIConfig} name="API Configuration" />} />
        <Route path="security" element={<RouteWithErrorBoundary component={SecuritySettings} name="Security Settings" />} />
        <Route path="activity" element={<RouteWithErrorBoundary component={ActivityLogs} name="Activity Logs" />} />
        <Route path="settings" element={<RouteWithErrorBoundary component={SystemSettings} name="System Settings" />} />
      </Routes>
    </Suspense>
  );
}