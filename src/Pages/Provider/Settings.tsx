// src/Pages/User/Settings.tsx
import { useState } from 'react';
import { Settings as SettingsIcon, User, Bell, Lock, Trash2, Shield } from 'lucide-react';
import { Card } from '@/ui/card';
import SettingsRow from '../../Components/ProviderDashboard/SettingsRow';
import { Button } from '@/ui/button';

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3 mb-6">
        <SettingsIcon className="w-8 h-8 text-emerald-600" />
        Settings
      </h1>

      <div className="space-y-8">
        
        <Card className="bg-white/60 backdrop-blur-lg border border-white/30 p-4 sm:p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"><User /> Account</h2>
          <div className="divide-y divide-white/30">
            <SettingsRow
              icon={Bell}
              title="Notifications"
              description={notifications ? "Enabled" : "Disabled"}
              action="switch"
              switchState={notifications}
              onSwitchChange={setNotifications}
            />
            <SettingsRow
              icon={Lock}
              title="Privacy"
              description="Manage your data and privacy settings"
              action="navigation"
            />
          </div>
        </Card>

       
        <Card className="bg-white/60 backdrop-blur-lg border border-white/30 p-4 sm:p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"><Shield /> Security</h2>
          <div className="divide-y divide-white/30">
            <SettingsRow
              icon={Shield}
              title="Two-Factor Authentication"
              description={twoFactor ? "Enabled" : "Disabled"}
              action="switch"
              switchState={twoFactor}
              onSwitchChange={setTwoFactor}
            />
             <SettingsRow
              icon={Lock}
              title="Login Activity"
              description="View your recent login history"
              action="button"
              actionLabel="View"
            />
          </div>
        </Card>

        {/* --- Delete Account Card --- */}
        <Card className="bg-red-100/30 backdrop-blur-lg border border-red-200/50 p-4 sm:p-6 rounded-2xl shadow-lg">
           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-red-800 mb-2 flex items-center gap-2"><Trash2 /> Delete Account</h2>
                    <p className="text-red-700/80 text-sm">Permanently delete your account and all associated data. This action cannot be undone.</p>
                </div>
                <Button className="mt-4 sm:mt-0 bg-red-600 text-white hover:bg-red-700 shadow-md shrink-0">
                    Delete My Account
                </Button>
           </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;