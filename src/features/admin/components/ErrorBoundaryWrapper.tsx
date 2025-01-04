import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './ErrorFallback';

interface ErrorBoundaryWrapperProps {
  children: React.ReactNode;
  componentName?: string;
}

export function ErrorBoundaryWrapper({ children, componentName }: ErrorBoundaryWrapperProps) {
  return (
    <ErrorBoundary
      FallbackComponent={({ error, resetErrorBoundary }) => (
        <ErrorFallback
          error={error}
          componentName={componentName}
          resetError={resetErrorBoundary}
        />
      )}
      onError={(error) => {
        console.error(`Error in ${componentName}:`, error);
      }}
    >
      {children}
    </ErrorBoundary>
  );
}