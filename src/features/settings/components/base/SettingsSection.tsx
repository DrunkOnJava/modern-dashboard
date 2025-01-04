import React from 'react';

interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
}

export function SettingsSection({ title, children }: SettingsSectionProps) {
  return (
    <section className="space-y-4">
      <h3 className="text-lg font-medium text-gray-800 dark:text-white">
        {title}
      </h3>
      {children}
    </section>
  );
}