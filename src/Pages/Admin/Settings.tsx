import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';
import GeneralSettings from '@/Components/Admin/Settings/GeneralSettings';
import NotificationSettings from '@/Components/Admin/Settings/NotificationSettings';
import SecuritySettings from '@/Components/Admin/Settings/SecuritySettings';
import IntegrationSettings from '@/Components/Admin/Settings/IntegrationSettings';

const Settings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Platform Settings</h1>
        <p className="text-gray-400 text-lg">Configure and customize your platform</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-gray-800/30 backdrop-blur border border-gray-700/50">
          <TabsTrigger 
            value="general" 
            className="data-[state=active]:bg-gray-700/50 data-[state=active]:text-white text-gray-400"
          >
            General
          </TabsTrigger>
          <TabsTrigger 
            value="notifications" 
            className="data-[state=active]:bg-gray-700/50 data-[state=active]:text-white text-gray-400"
          >
            Notifications
          </TabsTrigger>
          <TabsTrigger 
            value="security" 
            className="data-[state=active]:bg-gray-700/50 data-[state=active]:text-white text-gray-400"
          >
            Security
          </TabsTrigger>
          <TabsTrigger 
            value="integrations" 
            className="data-[state=active]:bg-gray-700/50 data-[state=active]:text-white text-gray-400"
          >
            Integrations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <GeneralSettings />
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationSettings />
        </TabsContent>

        <TabsContent value="security">
          <SecuritySettings />
        </TabsContent>

        <TabsContent value="integrations">
          <IntegrationSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;