import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './ErrorFallback';

interface WithErrorBoundaryProps {
  componentName: string;
}

export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  { componentName }: WithErrorBoundaryProps
) {
  return function WrappedComponent(props: P) {
    return (
      <ErrorBoundary
        FallbackComponent={({ error, resetErrorBoundary }) => (
          <ErrorFallback
            error={error}
            componentName={componentName}
            resetError={resetErrorBoundary}
          />
        )}
      >
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}