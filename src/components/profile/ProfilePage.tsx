import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { ProfileForm } from "../auth/ProfileForm";
import { Bell, Shield, Key } from "lucide-react";
import { DarkModeToggle } from "../DarkModeToggle";
import { useDarkMode } from "../../hooks/useDarkMode";

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [isDark, setIsDark] = useDarkMode();

  const settingsSections = [
    {
      id: "notifications",
      title: "Notifications",
      icon: Bell,
      description: "Configure how you receive notifications and alerts",
    },
    {
      id: "security",
      title: "Security",
      icon: Shield,
      description: "Manage your account security and authentication methods",
    },
    {
      id: "api-keys",
      title: "API Keys",
      icon: Key,
      description: "View and manage your API keys",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header */}
        <div className="px-4 py-6 sm:px-0">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Profile Settings
            </h1>
            <DarkModeToggle
              isDark={isDark}
              onToggle={() => setIsDark(!isDark)}
            />
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="gap-6 mt-6 space-y-6">
          {/* Profile Section */}
          <div className="bg-white shadow dark:bg-gray-800 sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
                Personal Information
              </h2>
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <ProfileForm />
              </div>
            </div>
          </div>

          {/* Settings Sections */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {settingsSections.map((section) => (
              <div
                key={section.id}
                className="overflow-hidden transition-shadow duration-200 bg-white shadow dark:bg-gray-800 sm:rounded-lg hover:shadow-lg"
              >
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <section.icon className="w-6 h-6 text-blue-500" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {section.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {section.description}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm dark:border-gray-600 dark:text-gray-200 dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Manage
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
