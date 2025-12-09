import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/dashboard/Settings.tsx
import { useState } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Switch } from '../../components/ui/switch';
import { Lock, Bell, Shield } from 'lucide-react';
import { dashboardService } from '../../services/api/dashboardService';
import { toast } from 'sonner';
const Settings = () => {
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
    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        try {
            setLoading(true);
            await dashboardService.changePassword(passwordData.currentPassword, passwordData.newPassword);
            toast.success('Password changed successfully');
            setPasswordData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
        }
        catch (error) {
            toast.error(error.response?.data?.message || 'Failed to change password');
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsx("h1", { className: "text-3xl font-bold", children: "Settings" }), _jsxs(Card, { className: "p-6", children: [_jsxs("div", { className: "flex items-center mb-6", children: [_jsx(Lock, { className: "h-5 w-5 text-blue-600 mr-2" }), _jsx("h2", { className: "text-xl font-semibold", children: "Change Password" })] }), _jsxs("form", { onSubmit: handlePasswordChange, className: "space-y-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "currentPassword", children: "Current Password" }), _jsx(Input, { id: "currentPassword", type: "password", value: passwordData.currentPassword, onChange: (e) => setPasswordData({ ...passwordData, currentPassword: e.target.value }), required: true })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "newPassword", children: "New Password" }), _jsx(Input, { id: "newPassword", type: "password", value: passwordData.newPassword, onChange: (e) => setPasswordData({ ...passwordData, newPassword: e.target.value }), required: true })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "confirmPassword", children: "Confirm New Password" }), _jsx(Input, { id: "confirmPassword", type: "password", value: passwordData.confirmPassword, onChange: (e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value }), required: true })] }), _jsx(Button, { type: "submit", disabled: loading, children: loading ? 'Changing Password...' : 'Change Password' })] })] }), _jsxs(Card, { className: "p-6", children: [_jsxs("div", { className: "flex items-center mb-6", children: [_jsx(Bell, { className: "h-5 w-5 text-blue-600 mr-2" }), _jsx("h2", { className: "text-xl font-semibold", children: "Notification Preferences" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(Label, { className: "font-medium", children: "Email Notifications" }), _jsx("p", { className: "text-sm text-gray-500", children: "Receive email updates about your applications" })] }), _jsx(Switch, { checked: notifications.email, onCheckedChange: (checked) => setNotifications({ ...notifications, email: checked }) })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(Label, { className: "font-medium", children: "Payment Reminders" }), _jsx("p", { className: "text-sm text-gray-500", children: "Get notified about upcoming payments" })] }), _jsx(Switch, { checked: notifications.payment, onCheckedChange: (checked) => setNotifications({ ...notifications, payment: checked }) })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(Label, { className: "font-medium", children: "Application Updates" }), _jsx("p", { className: "text-sm text-gray-500", children: "Receive updates on your application status" })] }), _jsx(Switch, { checked: notifications.application, onCheckedChange: (checked) => setNotifications({ ...notifications, application: checked }) })] })] })] }), _jsxs(Card, { className: "p-6", children: [_jsxs("div", { className: "flex items-center mb-6", children: [_jsx(Shield, { className: "h-5 w-5 text-blue-600 mr-2" }), _jsx("h2", { className: "text-xl font-semibold", children: "Security" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(Label, { className: "font-medium", children: "Two-Factor Authentication" }), _jsx("p", { className: "text-sm text-gray-500", children: "Add an extra layer of security to your account" })] }), _jsx(Switch, {})] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(Label, { className: "font-medium", children: "Session Management" }), _jsx("p", { className: "text-sm text-gray-500", children: "View and manage active sessions" })] }), _jsx(Button, { variant: "outline", children: "Manage Sessions" })] })] })] })] }));
};
export default Settings;
