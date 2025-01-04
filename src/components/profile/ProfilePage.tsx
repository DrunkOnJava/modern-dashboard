import React from "react";
import { ProfileCard } from "./ProfileCard";
import { ProfileForm } from "./ProfileForm";
import { ActivityLog } from "./ActivityLog";
import { SecuritySettings } from "./SecuritySettings";
import { NotificationPreferences } from "./NotificationPreferences";
import { ConnectedAccounts } from "./ConnectedAccounts";
import { DeleteAccount } from "./DeleteAccount";

function ProfilePage() {
  return (
    <div className="max-w-4xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
      <h1 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">
        Profile Settings
      </h1>

      <div className="space-y-8">
        <ProfileCard />

        <div className="p-6 bg-white rounded-lg shadow-sm dark:bg-gray-800">
          <h2 className="mb-6 text-lg font-medium text-gray-900 dark:text-white">
            Edit Profile
          </h2>
          <ProfileForm />
        </div>

        <div className="p-6 bg-white rounded-lg shadow-sm dark:bg-gray-800">
          <SecuritySettings />
        </div>

        <div className="p-6 bg-white rounded-lg shadow-sm dark:bg-gray-800">
          <NotificationPreferences />
        </div>

        <div className="p-6 bg-white rounded-lg shadow-sm dark:bg-gray-800">
          <ConnectedAccounts />
        </div>

        <div className="p-6 bg-white rounded-lg shadow-sm dark:bg-gray-800">
          <h2 className="mb-6 text-lg font-medium text-gray-900 dark:text-white">
            Recent Activity
          </h2>
          <ActivityLog />
        </div>

        <div className="p-6 bg-white rounded-lg shadow-sm dark:bg-gray-800">
          <DeleteAccount />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
