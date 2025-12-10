import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/admin/SystemSettings.tsx
import { useState, useEffect } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Switch } from '../../components/ui/switch';
import { Save, RefreshCw, Globe, Mail, Lock } from 'lucide-react';
import { toast } from 'sonner';
const SystemSettings = () => {
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
        }
        catch (error) {
            toast.error('Failed to load settings');
        }
        finally {
            setLoading(false);
        }
    };
    const handleSave = async (section) => {
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
        }
        catch (error) {
            toast.error('Failed to save settings');
        }
        finally {
            setSaving(false);
        }
    };
    if (loading) {
        return (_jsx("div", { className: "flex items-center justify-center h-64", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" }), _jsx("p", { className: "mt-4 text-gray-600", children: "Loading settings..." })] }) }));
    }
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("h1", { className: "text-3xl font-bold", children: "System Settings" }), _jsxs(Button, { variant: "outline", onClick: fetchSettings, children: [_jsx(RefreshCw, { className: "h-4 w-4 mr-2" }), "Refresh"] })] }), _jsxs(Card, { className: "p-6", children: [_jsxs("div", { className: "flex items-center mb-6", children: [_jsx(Globe, { className: "h-5 w-5 text-blue-600 mr-2" }), _jsx("h2", { className: "text-xl font-semibold", children: "General Settings" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "siteName", children: "Site Name" }), _jsx(Input, { id: "siteName", value: generalSettings.siteName, onChange: (e) => setGeneralSettings({ ...generalSettings, siteName: e.target.value }) })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "siteUrl", children: "Site URL" }), _jsx(Input, { id: "siteUrl", value: generalSettings.siteUrl, onChange: (e) => setGeneralSettings({ ...generalSettings, siteUrl: e.target.value }) })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "supportEmail", children: "Support Email" }), _jsx(Input, { id: "supportEmail", type: "email", value: generalSettings.supportEmail, onChange: (e) => setGeneralSettings({ ...generalSettings, supportEmail: e.target.value }) })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "contactPhone", children: "Contact Phone" }), _jsx(Input, { id: "contactPhone", value: generalSettings.contactPhone, onChange: (e) => setGeneralSettings({ ...generalSettings, contactPhone: e.target.value }) })] })] }), _jsxs("div", { className: "flex items-center justify-between mt-6 pt-6 border-t", children: [_jsxs("div", { children: [_jsx(Label, { className: "font-medium", children: "Maintenance Mode" }), _jsx("p", { className: "text-sm text-gray-500", children: "Put the site in maintenance mode" })] }), _jsx(Switch, { checked: generalSettings.maintenanceMode, onCheckedChange: (checked) => setGeneralSettings({ ...generalSettings, maintenanceMode: checked }) })] }), _jsx("div", { className: "mt-6", children: _jsxs(Button, { onClick: () => handleSave('general'), disabled: saving, className: "bg-blue-600 hover:bg-blue-700", children: [_jsx(Save, { className: "h-4 w-4 mr-2" }), saving ? 'Saving...' : 'Save General Settings'] }) })] }), _jsxs(Card, { className: "p-6", children: [_jsxs("div", { className: "flex items-center mb-6", children: [_jsx(Mail, { className: "h-5 w-5 text-blue-600 mr-2" }), _jsx("h2", { className: "text-xl font-semibold", children: "Email Settings" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "smtpHost", children: "SMTP Host" }), _jsx(Input, { id: "smtpHost", value: emailSettings.smtpHost, onChange: (e) => setEmailSettings({ ...emailSettings, smtpHost: e.target.value }) })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "smtpPort", children: "SMTP Port" }), _jsx(Input, { id: "smtpPort", value: emailSettings.smtpPort, onChange: (e) => setEmailSettings({ ...emailSettings, smtpPort: e.target.value }) })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "smtpUser", children: "SMTP Username" }), _jsx(Input, { id: "smtpUser", value: emailSettings.smtpUser, onChange: (e) => setEmailSettings({ ...emailSettings, smtpUser: e.target.value }) })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "smtpPassword", children: "SMTP Password" }), _jsx(Input, { id: "smtpPassword", type: "password", value: emailSettings.smtpPassword, onChange: (e) => setEmailSettings({ ...emailSettings, smtpPassword: e.target.value }), placeholder: "Leave empty to keep current" })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "fromEmail", children: "From Email" }), _jsx(Input, { id: "fromEmail", type: "email", value: emailSettings.fromEmail, onChange: (e) => setEmailSettings({ ...emailSettings, fromEmail: e.target.value }) })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "fromName", children: "From Name" }), _jsx(Input, { id: "fromName", value: emailSettings.fromName, onChange: (e) => setEmailSettings({ ...emailSettings, fromName: e.target.value }) })] })] }), _jsx("div", { className: "mt-6", children: _jsxs(Button, { onClick: () => handleSave('email'), disabled: saving, className: "bg-blue-600 hover:bg-blue-700", children: [_jsx(Save, { className: "h-4 w-4 mr-2" }), saving ? 'Saving...' : 'Save Email Settings'] }) })] }), _jsxs(Card, { className: "p-6", children: [_jsxs("div", { className: "flex items-center mb-6", children: [_jsx(CreditCard, { className: "h-5 w-5 text-blue-600 mr-2" }), _jsx("h2", { className: "text-xl font-semibold", children: "Payment Settings" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "paystackPublicKey", children: "Paystack Public Key" }), _jsx(Input, { id: "paystackPublicKey", type: "password", value: paymentSettings.paystackPublicKey, onChange: (e) => setPaymentSettings({ ...paymentSettings, paystackPublicKey: e.target.value }), placeholder: "pk_live_..." })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "paystackSecretKey", children: "Paystack Secret Key" }), _jsx(Input, { id: "paystackSecretKey", type: "password", value: paymentSettings.paystackSecretKey, onChange: (e) => setPaymentSettings({ ...paymentSettings, paystackSecretKey: e.target.value }), placeholder: "sk_live_..." })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "defaultCurrency", children: "Default Currency" }), _jsxs("select", { id: "defaultCurrency", className: "w-full px-3 py-2 border rounded-lg", value: paymentSettings.defaultCurrency, onChange: (e) => setPaymentSettings({ ...paymentSettings, defaultCurrency: e.target.value }), children: [_jsx("option", { value: "NGN", children: "Nigerian Naira (\u20A6)" }), _jsx("option", { value: "USD", children: "US Dollar ($)" }), _jsx("option", { value: "EUR", children: "Euro (\u20AC)" }), _jsx("option", { value: "GBP", children: "British Pound (\u00A3)" })] })] })] }), _jsxs("div", { className: "flex items-center justify-between mt-6 pt-6 border-t", children: [_jsxs("div", { children: [_jsx(Label, { className: "font-medium", children: "Enable Test Mode" }), _jsx("p", { className: "text-sm text-gray-500", children: "Use test payment credentials" })] }), _jsx(Switch, { checked: paymentSettings.enableTestMode, onCheckedChange: (checked) => setPaymentSettings({ ...paymentSettings, enableTestMode: checked }) })] }), _jsx("div", { className: "mt-6", children: _jsxs(Button, { onClick: () => handleSave('payment'), disabled: saving, className: "bg-blue-600 hover:bg-blue-700", children: [_jsx(Save, { className: "h-4 w-4 mr-2" }), saving ? 'Saving...' : 'Save Payment Settings'] }) })] }), _jsxs(Card, { className: "p-6", children: [_jsxs("div", { className: "flex items-center mb-6", children: [_jsx(Lock, { className: "h-5 w-5 text-blue-600 mr-2" }), _jsx("h2", { className: "text-xl font-semibold", children: "Security Settings" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "sessionTimeout", children: "Session Timeout (minutes)" }), _jsx(Input, { id: "sessionTimeout", type: "number", value: securitySettings.sessionTimeout, onChange: (e) => setSecuritySettings({ ...securitySettings, sessionTimeout: e.target.value }) })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "maxLoginAttempts", children: "Max Login Attempts" }), _jsx(Input, { id: "maxLoginAttempts", type: "number", value: securitySettings.maxLoginAttempts, onChange: (e) => setSecuritySettings({ ...securitySettings, maxLoginAttempts: e.target.value }) })] })] }), _jsxs("div", { className: "space-y-4 mt-6 pt-6 border-t", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(Label, { className: "font-medium", children: "Two-Factor Authentication" }), _jsx("p", { className: "text-sm text-gray-500", children: "Require 2FA for admin access" })] }), _jsx(Switch, { checked: securitySettings.enable2FA, onCheckedChange: (checked) => setSecuritySettings({ ...securitySettings, enable2FA: checked }) })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(Label, { className: "font-medium", children: "IP Whitelist" }), _jsx("p", { className: "text-sm text-gray-500", children: "Restrict admin access to specific IPs" })] }), _jsx(Switch, { checked: securitySettings.enableIPWhitelist, onCheckedChange: (checked) => setSecuritySettings({ ...securitySettings, enableIPWhitelist: checked }) })] })] }), _jsx("div", { className: "mt-6", children: _jsxs(Button, { onClick: () => handleSave('security'), disabled: saving, className: "bg-blue-600 hover:bg-blue-700", children: [_jsx(Save, { className: "h-4 w-4 mr-2" }), saving ? 'Saving...' : 'Save Security Settings'] }) })] })] }));
};
export default SystemSettings;
