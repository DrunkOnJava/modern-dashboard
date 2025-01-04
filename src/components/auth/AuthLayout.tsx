import React from "react";
import { LogIn } from "lucide-react";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <div className="flex flex-col justify-center min-h-screen py-12 bg-gray-50 dark:bg-gray-900 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="p-3 bg-blue-100 rounded-full dark:bg-blue-900">
            <LogIn className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        <h2 className="mt-6 text-3xl font-bold tracking-tight text-center text-gray-900 dark:text-white">
          {title}
        </h2>
        <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-400">
          {subtitle}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 py-8 bg-white shadow dark:bg-gray-800 sm:rounded-lg sm:px-10">
          {children}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
