// src/pages/admin/SystemSettings.tsx
import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Switch } from '../../components/ui/switch';
import { Save, RefreshCw, Globe, Mail, Lock, Bell, Database, Server } from 'lucide-react';
import { toast } from 'sonner';

const SystemSettings: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // General Settings
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'BinarifyAcademy',
    siteUrl: 'https://BinarifyAcademy.com',
    supportEmail: 'support@BinarifyAcademy.com',
    contactPhone: '+234 123 456 7890',
    maintenanceMode: false,
  });

  // Email Settings
  const [emailSettings, setEmailSettings] = useState({
    smtpHost: 'smtp.gmail.com',
    smtpPort: '587',
    smtpUser: 'noreply@BinarifyAcademy.com',
    smtpPassword: '',
    fromEmail: 'noreply@BinarifyAcademy.com',
    fromName: 'BinarifyAcademy',
  });

  // Payment Settings
  const [paymentSettings, setPaymentSettings] = useState({
    paystackPublicKey: '',
    paystackSecretKey: '',
    defaultCurrency: 'NGN',
    enableTestMode: false,
  });

  // Security Settings
  const [securitySettings, setSecuritySettings] = useState({
    sessionTimeout: '30', // minutes
    maxLoginAttempts: '5',
    enable2FA: false,
    enableIPWhitelist: false,
  });

  useEffect(() => {
    // Load settings from API
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      // API call to fetch settings
      // const response = await adminService.getSystemSettings();
      // Set the settings state with response data
    } catch (error) {
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (section: string) => {
    try {
      setSaving(true);
      
      let data;
      switch (section) {
        case 'general':
          data = generalSettings;
          break;
        case 'email':
          data = emailSettings;
          break;
        case 'payment':
          data = paymentSettings;
          break;
        case 'security':
          data = securitySettings;
          break;
      }

      // API call to save settings
      // await adminService.updateSystemSettings(section, data);
      
      toast.success(`${section.charAt(0).toUpperCase() + section.slice(1)} settings saved successfully`);
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">System Settings</h1>
        <Button variant="outline" onClick={fetchSettings}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* General Settings */}
      <Card className="p-6">
        <div className="flex items-center mb-6">
          <Globe className="h-5 w-5 text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold">General Settings</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="siteName">Site Name</Label>
            <Input
              id="siteName"
              value={generalSettings.siteName}
              onChange={(e) => setGeneralSettings({...generalSettings, siteName: e.target.value})}
            />
          </div>
          
          <div>
            <Label htmlFor="siteUrl">Site URL</Label>
            <Input
              id="siteUrl"
              value={generalSettings.siteUrl}
              onChange={(e) => setGeneralSettings({...generalSettings, siteUrl: e.target.value})}
            />
          </div>
          
          <div>
            <Label htmlFor="supportEmail">Support Email</Label>
            <Input
              id="supportEmail"
              type="email"
              value={generalSettings.supportEmail}
              onChange={(e) => setGeneralSettings({...generalSettings, supportEmail: e.target.value})}
            />
          </div>
          
          <div>
            <Label htmlFor="contactPhone">Contact Phone</Label>
            <Input
              id="contactPhone"
              value={generalSettings.contactPhone}
              onChange={(e) => setGeneralSettings({...generalSettings, contactPhone: e.target.value})}
            />
          </div>
        </div>

        <div className="flex items-center justify-between mt-6 pt-6 border-t">
          <div>
            <Label className="font-medium">Maintenance Mode</Label>
            <p className="text-sm text-gray-500">Put the site in maintenance mode</p>
          </div>
          <Switch
            checked={generalSettings.maintenanceMode}
            onCheckedChange={(checked) => setGeneralSettings({...generalSettings, maintenanceMode: checked})}
          />
        </div>

        <div className="mt-6">
          <Button 
            onClick={() => handleSave('general')}
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Saving...' : 'Save General Settings'}
          </Button>
        </div>
      </Card>

      {/* Email Settings */}
      <Card className="p-6">
        <div className="flex items-center mb-6">
          <Mail className="h-5 w-5 text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold">Email Settings</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="smtpHost">SMTP Host</Label>
            <Input
              id="smtpHost"
              value={emailSettings.smtpHost}
              onChange={(e) => setEmailSettings({...emailSettings, smtpHost: e.target.value})}
            />
          </div>
          
          <div>
            <Label htmlFor="smtpPort">SMTP Port</Label>
            <Input
              id="smtpPort"
              value={emailSettings.smtpPort}
              onChange={(e) => setEmailSettings({...emailSettings, smtpPort: e.target.value})}
            />
          </div>
          
          <div>
            <Label htmlFor="smtpUser">SMTP Username</Label>
            <Input
              id="smtpUser"
              value={emailSettings.smtpUser}
              onChange={(e) => setEmailSettings({...emailSettings, smtpUser: e.target.value})}
            />
          </div>
          
          <div>
            <Label htmlFor="smtpPassword">SMTP Password</Label>
            <Input
              id="smtpPassword"
              type="password"
              value={emailSettings.smtpPassword}
              onChange={(e) => setEmailSettings({...emailSettings, smtpPassword: e.target.value})}
              placeholder="Leave empty to keep current"
            />
          </div>
          
          <div>
            <Label htmlFor="fromEmail">From Email</Label>
            <Input
              id="fromEmail"
              type="email"
              value={emailSettings.fromEmail}
              onChange={(e) => setEmailSettings({...emailSettings, fromEmail: e.target.value})}
            />
          </div>
          
          <div>
            <Label htmlFor="fromName">From Name</Label>
            <Input
              id="fromName"
              value={emailSettings.fromName}
              onChange={(e) => setEmailSettings({...emailSettings, fromName: e.target.value})}
            />
          </div>
        </div>

        <div className="mt-6">
          <Button 
            onClick={() => handleSave('email')}
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Saving...' : 'Save Email Settings'}
          </Button>
        </div>
      </Card>

      {/* Payment Settings */}
      <Card className="p-6">
        <div className="flex items-center mb-6">
          <CreditCard className="h-5 w-5 text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold">Payment Settings</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="paystackPublicKey">Paystack Public Key</Label>
            <Input
              id="paystackPublicKey"
              type="password"
              value={paymentSettings.paystackPublicKey}
              onChange={(e) => setPaymentSettings({...paymentSettings, paystackPublicKey: e.target.value})}
              placeholder="pk_live_..."
            />
          </div>
          
          <div>
            <Label htmlFor="paystackSecretKey">Paystack Secret Key</Label>
            <Input
              id="paystackSecretKey"
              type="password"
              value={paymentSettings.paystackSecretKey}
              onChange={(e) => setPaymentSettings({...paymentSettings, paystackSecretKey: e.target.value})}
              placeholder="sk_live_..."
            />
          </div>
          
          <div>
            <Label htmlFor="defaultCurrency">Default Currency</Label>
            <select
              id="defaultCurrency"
              className="w-full px-3 py-2 border rounded-lg"
              value={paymentSettings.defaultCurrency}
              onChange={(e) => setPaymentSettings({...paymentSettings, defaultCurrency: e.target.value})}
            >
              <option value="NGN">Nigerian Naira (₦)</option>
              <option value="USD">US Dollar ($)</option>
              <option value="EUR">Euro (€)</option>
              <option value="GBP">British Pound (£)</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6 pt-6 border-t">
          <div>
            <Label className="font-medium">Enable Test Mode</Label>
            <p className="text-sm text-gray-500">Use test payment credentials</p>
          </div>
          <Switch
            checked={paymentSettings.enableTestMode}
            onCheckedChange={(checked) => setPaymentSettings({...paymentSettings, enableTestMode: checked})}
          />
        </div>

        <div className="mt-6">
          <Button 
            onClick={() => handleSave('payment')}
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Saving...' : 'Save Payment Settings'}
          </Button>
        </div>
      </Card>

      {/* Security Settings */}
      <Card className="p-6">
        <div className="flex items-center mb-6">
          <Lock className="h-5 w-5 text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold">Security Settings</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
            <Input
              id="sessionTimeout"
              type="number"
              value={securitySettings.sessionTimeout}
              onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: e.target.value})}
            />
          </div>
          
          <div>
            <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
            <Input
              id="maxLoginAttempts"
              type="number"
              value={securitySettings.maxLoginAttempts}
              onChange={(e) => setSecuritySettings({...securitySettings, maxLoginAttempts: e.target.value})}
            />
          </div>
        </div>

        <div className="space-y-4 mt-6 pt-6 border-t">
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Two-Factor Authentication</Label>
              <p className="text-sm text-gray-500">Require 2FA for admin access</p>
            </div>
            <Switch
              checked={securitySettings.enable2FA}
              onCheckedChange={(checked) => setSecuritySettings({...securitySettings, enable2FA: checked})}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">IP Whitelist</Label>
              <p className="text-sm text-gray-500">Restrict admin access to specific IPs</p>
            </div>
            <Switch
              checked={securitySettings.enableIPWhitelist}
              onCheckedChange={(checked) => setSecuritySettings({...securitySettings, enableIPWhitelist: checked})}
            />
          </div>
        </div>

        <div className="mt-6">
          <Button 
            onClick={() => handleSave('security')}
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Saving...' : 'Save Security Settings'}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SystemSettings;