 
import React from 'react';
import { Card, CardContent } from '@/ui/card';
import { Label } from '@/ui/label';
import { Input } from '@/ui/input';
import { Switch } from '@/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select';
import { Button } from '@/ui/button';

const GeneralSettings: React.FC = () => {
  return (
    <Card className="bg-gray-800/30 backdrop-blur-xl border-gray-700/50">
      <CardContent className="space-y-6 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-gray-300">Platform Name</Label>
            <Input 
              defaultValue="ServiceHub" 
              className="bg-gray-700/30 backdrop-blur border-gray-600/50 text-white placeholder-gray-400"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-300">Support Email</Label>
            <Input 
              defaultValue="support@servicehub.com" 
              className="bg-gray-700/30 backdrop-blur border-gray-600/50 text-white placeholder-gray-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-gray-300">Default Currency</Label>
            <Select defaultValue="usd">
              <SelectTrigger className="bg-gray-700/30 backdrop-blur border-gray-600/50 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800/90 backdrop-blur-xl border-gray-700/50">
                <SelectItem value="usd" className="text-gray-300 hover:text-white hover:bg-gray-700/50">USD ($)</SelectItem>
                <SelectItem value="eur" className="text-gray-300 hover:text-white hover:bg-gray-700/50">EUR (€)</SelectItem>
                <SelectItem value="gbp" className="text-gray-300 hover:text-white hover:bg-gray-700/50">GBP (£)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-gray-300">Time Zone</Label>
            <Select defaultValue="utc">
              <SelectTrigger className="bg-gray-700/30 backdrop-blur border-gray-600/50 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800/90 backdrop-blur-xl border-gray-700/50">
                <SelectItem value="utc" className="text-gray-300 hover:text-white hover:bg-gray-700/50">UTC</SelectItem>
                <SelectItem value="est" className="text-gray-300 hover:text-white hover:bg-gray-700/50">EST</SelectItem>
                <SelectItem value="pst" className="text-gray-300 hover:text-white hover:bg-gray-700/50">PST</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-700/30 backdrop-blur">
            <div>
              <Label className="text-white">Maintenance Mode</Label>
              <p className="text-sm text-gray-400">Enable maintenance mode to prevent user access</p>
            </div>
            <Switch className="bg-gray-600 data-[state=checked]:bg-blue-600" />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-700/30 backdrop-blur">
            <div>
              <Label className="text-white">Auto-approve Services</Label>
              <p className="text-sm text-gray-400">Automatically approve new service listings</p>
            </div>
            <Switch className="bg-gray-600 data-[state=checked]:bg-blue-600" />
          </div>
        </div>

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

export default GeneralSettings;