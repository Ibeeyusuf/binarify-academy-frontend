import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// src/pages/dashboard/Profile.tsx
import { useState, useEffect } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { User, Mail, Phone, Save } from 'lucide-react';
import { dashboardService } from '../../services/api/dashboardService';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';
const Profile = () => {
    const { user, updateUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    });
    useEffect(() => {
        if (user) {
            setFormData({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                email: user.email || '',
                phone: user.phone || ''
            });
        }
    }, [user]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await dashboardService.updateProfile(formData);
            updateUser(response.data.user);
            toast.success('Profile updated successfully');
        }
        catch (error) {
            toast.error('Failed to update profile');
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("div", { className: "max-w-2xl mx-auto", children: [_jsx("h1", { className: "text-3xl font-bold mb-6", children: "Profile Settings" }), _jsx(Card, { className: "p-6", children: _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsxs(Label, { htmlFor: "firstName", className: "flex items-center mb-2", children: [_jsx(User, { className: "h-4 w-4 mr-2" }), "First Name"] }), _jsx(Input, { id: "firstName", value: formData.firstName, onChange: (e) => setFormData({ ...formData, firstName: e.target.value }), required: true })] }), _jsxs("div", { children: [_jsxs(Label, { htmlFor: "lastName", className: "flex items-center mb-2", children: [_jsx(User, { className: "h-4 w-4 mr-2" }), "Last Name"] }), _jsx(Input, { id: "lastName", value: formData.lastName, onChange: (e) => setFormData({ ...formData, lastName: e.target.value }), required: true })] })] }), _jsxs("div", { children: [_jsxs(Label, { htmlFor: "email", className: "flex items-center mb-2", children: [_jsx(Mail, { className: "h-4 w-4 mr-2" }), "Email Address"] }), _jsx(Input, { id: "email", type: "email", value: formData.email, onChange: (e) => setFormData({ ...formData, email: e.target.value }), required: true })] }), _jsxs("div", { children: [_jsxs(Label, { htmlFor: "phone", className: "flex items-center mb-2", children: [_jsx(Phone, { className: "h-4 w-4 mr-2" }), "Phone Number"] }), _jsx(Input, { id: "phone", value: formData.phone, onChange: (e) => setFormData({ ...formData, phone: e.target.value }) })] }), _jsx(Button, { type: "submit", className: "w-full", disabled: loading, children: loading ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" }), "Saving..."] })) : (_jsxs(_Fragment, { children: [_jsx(Save, { className: "h-4 w-4 mr-2" }), "Save Changes"] })) })] }) })] }));
};
export default Profile;
