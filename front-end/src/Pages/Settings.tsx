import { Card } from '@/ui/card';
import { Switch } from '@/ui/switch';
import { Label } from '@/ui/label';
import { Button } from '@/ui/button';
import { 
  Bell, 
  Lock, 
  CreditCard, 
  Languages,
  HelpCircle,
  Trash
} from 'lucide-react';

const Settings = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="space-y-6">
        {/* Notifications */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5" />
            <h2 className="text-lg font-semibold">Notifications</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="booking-notifications">Booking Updates</Label>
              <Switch id="booking-notifications" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="message-notifications">New Messages</Label>
              <Switch id="message-notifications" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="marketing-notifications">Marketing Emails</Label>
              <Switch id="marketing-notifications" />
            </div>
          </div>
        </Card>

        {/* Security */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Lock className="w-5 h-5" />
            <h2 className="text-lg font-semibold">Security</h2>
          </div>
          
          <div className="space-y-4">
            <Button variant="outline" className="w-full justify-start">
              Change Password
            </Button>
            
            <Button variant="outline" className="w-full justify-start">
              Two-Factor Authentication
            </Button>
            
            <Button variant="outline" className="w-full justify-start">
              Login History
            </Button>
          </div>
        </Card>

        {/* Payment */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="w-5 h-5" />
            <h2 className="text-lg font-semibold">Payment Methods</h2>
          </div>
          
          <div className="space-y-4">
            <Button variant="outline" className="w-full justify-start">
              Add Payment Method
            </Button>
            
            <Button variant="outline" className="w-full justify-start">
              View Transaction History
            </Button>
          </div>
        </Card>

        {/* Language & Region */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Languages className="w-5 h-5" />
            <h2 className="text-lg font-semibold">Language & Region</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Language</Label>
              <select className="border rounded-md px-3 py-2">
                <option>English</option>
                <option>Malayalam</option>
                <option>Hindi</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between">
              <Label>Time Zone</Label>
              <select className="border rounded-md px-3 py-2">
                <option>IST (UTC+5:30)</option>
                <option>UTC</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Help & Support */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="w-5 h-5" />
            <h2 className="text-lg font-semibold">Help & Support</h2>
          </div>
          
          <div className="space-y-4">
            <Button variant="outline" className="w-full justify-start">
              FAQs
            </Button>
            
            <Button variant="outline" className="w-full justify-start">
              Contact Support
            </Button>
            
            <Button variant="outline" className="w-full justify-start">
              Terms of Service
            </Button>
            
            <Button variant="outline" className="w-full justify-start">
              Privacy Policy
            </Button>
          </div>
        </Card>

        {/* Danger Zone */}
        <Card className="p-6 border-red-200">
          <div className="flex items-center gap-2 mb-4">
            <Trash className="w-5 h-5 text-red-500" />
            <h2 className="text-lg font-semibold text-red-500">Danger Zone</h2>
          </div>
          
          <div className="space-y-4">
            <Button variant="destructive" className="w-full">
              Delete Account
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;