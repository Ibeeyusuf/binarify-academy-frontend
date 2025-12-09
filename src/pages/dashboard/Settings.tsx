// src/pages/dashboard/Settings.tsx
import React, { useState } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Switch } from '../../components/ui/switch';
import { Lock, Bell, Shield } from 'lucide-react';
import { dashboardService } from '../../services/api/dashboardService';
import { toast } from 'sonner';

const Settings: React.FC = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    payment: true,
    application: true
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    try {
      setLoading(true);
      await dashboardService.changePassword(
        passwordData.currentPassword,
        passwordData.newPassword
      );
      toast.success('Password changed successfully');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>

      {/* Password Change */}
      <Card className="p-6">
        <div className="flex items-center mb-6">
          <Lock className="h-5 w-5 text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold">Change Password</h2>
        </div>
        
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              type="password"
              value={passwordData.currentPassword}
              onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
              required
            />
          </div>
          
          <Button type="submit" disabled={loading}>
            {loading ? 'Changing Password...' : 'Change Password'}
          </Button>
        </form>
      </Card>

      {/* Notification Settings */}
      <Card className="p-6">
        <div className="flex items-center mb-6">
          <Bell className="h-5 w-5 text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold">Notification Preferences</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Email Notifications</Label>
              <p className="text-sm text-gray-500">Receive email updates about your applications</p>
            </div>
            <Switch
              checked={notifications.email}
              onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Payment Reminders</Label>
              <p className="text-sm text-gray-500">Get notified about upcoming payments</p>
            </div>
            <Switch
              checked={notifications.payment}
              onCheckedChange={(checked) => setNotifications({...notifications, payment: checked})}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Application Updates</Label>
              <p className="text-sm text-gray-500">Receive updates on your application status</p>
            </div>
            <Switch
              checked={notifications.application}
              onCheckedChange={(checked) => setNotifications({...notifications, application: checked})}
            />
          </div>
        </div>
      </Card>

      {/* Security Settings */}
      <Card className="p-6">
        <div className="flex items-center mb-6">
          <Shield className="h-5 w-5 text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold">Security</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Two-Factor Authentication</Label>
              <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
            </div>
            <Switch />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Session Management</Label>
              <p className="text-sm text-gray-500">View and manage active sessions</p>
            </div>
            <Button variant="outline">Manage Sessions</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Settings;