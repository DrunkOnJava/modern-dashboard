import { Suspense, startTransition } from "react";
import {
  createBrowserRouter,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import Loading from "./components/common/Loading";
import { lazyWithPreload, LazyComponent } from "./utils/lazyLoad";

// Types
interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

// Lazy load components with preload
const Dashboard = lazyWithPreload(() => import("./components/Dashboard"));
const ProfilePage = lazyWithPreload(
  () => import("./components/profile/ProfilePage")
);
const AuthLayout = lazyWithPreload<React.ComponentType<AuthLayoutProps>>(
  () => import("./components/auth/AuthLayout")
);
const LoginForm = lazyWithPreload(() => import("./components/auth/LoginForm"));
const RegistrationForm = lazyWithPreload(
  () => import("./components/auth/RegistrationForm")
);

// Types for route configuration
interface RouteConfig {
  path: string;
  component: LazyComponent<React.ComponentType<any>>;
  props?: Record<string, any>;
  children?: RouteChildConfig[];
}

interface RouteChildConfig {
  path: string;
  component: LazyComponent<React.ComponentType<any>>;
  props?: Record<string, any>;
}

// Route wrapper component to handle children
const RouteComponent: React.FC<{
  component: LazyComponent<React.ComponentType<any>>;
  props?: Record<string, any>;
  hasChildren?: boolean;
}> = ({ component: Component, props, hasChildren }) => {
  const content = <Component {...props}>{hasChildren && <Outlet />}</Component>;
  return props?.wrapper ? props.wrapper(content) : content;
};

// Preload handler
const PreloadLink: React.FC<{ to: string; children: React.ReactNode }> = ({
  to,
  children,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleMouseEnter = () => {
    const route = routes.find((r) => r.path === to);
    if (route?.component?.preload) {
      startTransition(() => {
        route.component.preload();
      });
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== to) {
      navigate(to);
    }
  };

  return (
    <a href={to} onMouseEnter={handleMouseEnter} onClick={handleClick}>
      {children}
    </a>
  );
};

// Route configuration
const routes: RouteConfig[] = [
  {
    path: "/",
    component: Dashboard,
  },
  {
    path: "/profile",
    component: ProfilePage,
    props: {
      wrapper: (children: React.ReactNode) => (
        <ProtectedRoute>{children}</ProtectedRoute>
      ),
    },
  },
  {
    path: "/auth",
    component: AuthLayout,
    props: {
      title: "Welcome Back",
      subtitle: "Sign in to your account",
    },
    children: [
      {
        path: "login",
        component: LoginForm,
      },
      {
        path: "register",
        component: RegistrationForm,
      },
    ],
  },
];

// Create router configuration
export const router = createBrowserRouter(
  routes.map((route) => ({
    path: route.path,
    element: (
      <Suspense fallback={<Loading />}>
        <ErrorBoundary>
          <RouteComponent
            component={route.component}
            props={route.props}
            hasChildren={Boolean(route.children)}
          />
        </ErrorBoundary>
      </Suspense>
    ),
    children: route.children?.map((child) => ({
      path: child.path,
      element: (
        <Suspense fallback={<Loading />}>
          <RouteComponent component={child.component} props={child.props} />
        </Suspense>
      ),
    })),
  }))
);

// Export PreloadLink for use in navigation components
export { PreloadLink };
