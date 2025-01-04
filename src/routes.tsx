import { lazy, Suspense } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";

// Lazy load components
const Dashboard = lazy(() => import("./components/Dashboard"));
const ProfilePage = lazy(() => import("./components/profile/ProfilePage"));
const AuthLayout = lazy(() => import("./components/auth/AuthLayout"));
const LoginForm = lazy(() => import("./components/auth/LoginForm"));
const RegistrationForm = lazy(
  () => import("./components/auth/RegistrationForm")
);

// Loading component
const Loading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
  </div>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <ErrorBoundary>
          <Dashboard />
        </ErrorBoundary>
      </Suspense>
    ),
  },
  {
    path: "/profile",
    element: (
      <Suspense fallback={<Loading />}>
        <ErrorBoundary>
          <ProfilePage />
        </ErrorBoundary>
      </Suspense>
    ),
  },
  {
    path: "/auth",
    element: (
      <Suspense fallback={<Loading />}>
        <ErrorBoundary>
          <AuthLayout title="Welcome Back" subtitle="Sign in to your account">
            <Outlet />
          </AuthLayout>
        </ErrorBoundary>
      </Suspense>
    ),
    children: [
      {
        path: "login",
        element: (
          <Suspense fallback={<Loading />}>
            <LoginForm />
          </Suspense>
        ),
      },
      {
        path: "register",
        element: (
          <Suspense fallback={<Loading />}>
            <RegistrationForm />
          </Suspense>
        ),
      },
    ],
  },
]);
