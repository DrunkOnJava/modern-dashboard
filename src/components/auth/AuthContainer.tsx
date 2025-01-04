import React, { useState } from 'react';
import { LoginForm } from './LoginForm';
import { RegistrationForm } from './RegistrationForm';
import { ForgotPasswordForm } from './ForgotPasswordForm';
import { AuthLayout } from './AuthLayout';
import { useAuth } from '../../contexts/AuthContext';

type AuthView = 'login' | 'register' | 'forgot-password';

export function AuthContainer() {
  const [view, setView] = useState<AuthView>('login');
  const { continueAsGuest } = useAuth();

  const handleGuestAccess = () => {
    continueAsGuest();
  };

  const content = {
    login: {
      title: 'Sign in to your account',
      subtitle: "Don't have an account? Register now",
      component: <LoginForm />,
      footer: (<>
        <div className="mt-4 text-center">
          <button
            onClick={() => setView('register')}
            className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400"
          >
            Create an account
          </button>
          <span className="mx-2 text-gray-400">|</span>
          <button
            onClick={() => setView('forgot-password')}
            className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400"
          >
            Forgot password?
          </button>
        </div>
        <div className="mt-4 text-center">
          <button
            onClick={handleGuestAccess}
            className="text-sm text-gray-500 hover:text-gray-600 dark:text-gray-400"
          >
            Continue as guest
          </button>
        </div>
      </>)
    },
    register: {
      title: 'Create your account',
      subtitle: 'Already have an account? Sign in',
      component: <RegistrationForm />,
      footer: (
        <div className="mt-4 text-center">
          <button
            onClick={() => setView('login')}
            className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400"
          >
            Sign in to your account
          </button>
        </div>
      )
    },
    'forgot-password': {
      title: 'Reset your password',
      subtitle: 'Enter your email to receive reset instructions',
      component: <ForgotPasswordForm />,
      footer: (
        <div className="mt-4 text-center">
          <button
            onClick={() => setView('login')}
            className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400"
          >
            Back to sign in
          </button>
        </div>
      )
    }
  };

  const currentView = content[view];

  return (
    <AuthLayout title={currentView.title} subtitle={currentView.subtitle}>
      {currentView.component}
      {currentView.footer}
    </AuthLayout>
  );
}