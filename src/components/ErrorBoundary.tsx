import React from "react";
import { AlertTriangle } from "lucide-react";
import { ErrorMessage } from "./shared/feedback/ErrorMessage";
import { errorTracker } from "../lib/errors/errorTracker";
import { performanceMonitor } from "../lib/performance/monitor";

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  error: Error | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  private renderStartTime: number = 0;

  constructor(props: Props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    errorTracker.trackBoundaryError(error, errorInfo.componentStack);
  }

  componentDidMount() {
    this.trackRenderTime();
  }

  componentDidUpdate() {
    this.trackRenderTime();
  }

  private trackRenderTime() {
    const renderTime = performance.now() - this.renderStartTime;
    performanceMonitor.recordMetric({
      name: "Custom",
      value: renderTime,
      timestamp: Date.now(),
      details: {
        type: "render",
        component: "ErrorBoundary",
      },
    });
  }

  render() {
    this.renderStartTime = performance.now();

    if (this.state.error) {
      const errorMessage =
        this.state.error.message || "An unexpected error occurred";

      return (
        this.props.fallback || (
          <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="text-center">
              <AlertTriangle className="w-12 h-12 mx-auto text-red-500" />
              <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
                Something went wrong
              </h3>
              <ErrorMessage message={errorMessage} className="mt-2" />
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                Reload Page
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
