 
import React from 'react';
import { Card, CardContent } from '@/ui/card';
import { Label } from '@/ui/label';
import { Input } from '@/ui/input';
import { Switch } from '@/ui/switch';
import { Button } from '@/ui/button';

const IntegrationSettings: React.FC = () => {
  const integrations = [
    {
      name: 'Payment Gateway',
      description: 'Configure your payment processing settings',
      connected: true,
      apiKey: true
    },
    {
      name: 'Email Service',
      description: 'Set up your email delivery service',
      connected: true,
      apiKey: true
    },
    {
      name: 'SMS Gateway',
      description: 'Configure SMS notification service',
      connected: false,
      apiKey: true
    },
    {
      name: 'Google Maps',
      description: 'Enable location services and mapping',
      connected: true,
      apiKey: true
    }
  ];

  return (
    <Card className="bg-gray-800/30 backdrop-blur-xl border-gray-700/50">
      <CardContent className="space-y-6 p-6">
        {integrations.map((integration, index) => (
          <div key={index} className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-700/30 backdrop-blur">
              <div>
                <Label className="text-white">{integration.name}</Label>
                <p className="text-sm text-gray-400">{integration.description}</p>
              </div>
              <div className="flex items-center space-x-3">
                <Switch 
                  defaultChecked={integration.connected}
                  className="bg-gray-600 data-[state=checked]:bg-blue-600" 
                />
                <Button 
                  variant="outline" 
                  className="bg-gray-700/30 backdrop-blur border-gray-600/50 text-gray-300 hover:text-white hover:bg-gray-700/50"
                >
                  Configure
                </Button>
              </div>
            </div>
            {integration.apiKey && integration.connected && (
              <div className="space-y-2 pl-4">
                <Label className="text-gray-300">API Key</Label>
                <div className="flex space-x-2">
                  <Input 
                    type="password"
                    defaultValue="************************"
                    className="bg-gray-700/30 backdrop-blur border-gray-600/50 text-white placeholder-gray-400"
                  />
                  <Button 
                    variant="outline" 
                    className="bg-gray-700/30 backdrop-blur border-gray-600/50 text-gray-300 hover:text-white hover:bg-gray-700/50"
                  >
                    Regenerate
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}

        <div className="flex justify-end space-x-3 pt-6">
          <Button 
            variant="outline" 
            className="bg-gray-700/30 backdrop-blur border-gray-600/50 text-gray-300 hover:text-white hover:bg-gray-700/50"
          >
            Reset
          </Button>
          <Button className="bg-blue-600/80 backdrop-blur hover:bg-blue-700/80 text-white">
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default IntegrationSettings;