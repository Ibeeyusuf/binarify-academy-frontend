import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/admin/UserManagement.tsx
import { useState, useEffect } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Search, Filter, UserPlus, Edit, Trash2, Eye } from 'lucide-react';
import { adminService } from '../../services/api/dashboardService';
import { toast } from 'sonner';
const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    useEffect(() => {
        fetchUsers();
    }, []);
    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await adminService.getUsers();
            setUsers(response.data.users);
        }
        catch (error) {
            toast.error('Failed to load users');
        }
        finally {
            setLoading(false);
        }
    };
    const handleDelete = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await adminService.deleteUser(userId);
                toast.success('User deleted successfully');
                fetchUsers();
            }
            catch (error) {
                toast.error('Failed to delete user');
            }
        }
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("h1", { className: "text-3xl font-bold", children: "User Management" }), _jsxs(Button, { className: "bg-blue-600 hover:bg-blue-700", children: [_jsx(UserPlus, { className: "h-4 w-4 mr-2" }), "Add User"] })] }), _jsxs(Card, { className: "p-6", children: [_jsxs("div", { className: "flex items-center space-x-4 mb-6", children: [_jsxs("div", { className: "flex-1 relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" }), _jsx(Input, { placeholder: "Search users by name or email...", className: "pl-10", value: search, onChange: (e) => setSearch(e.target.value) })] }), _jsxs(Button, { variant: "outline", children: [_jsx(Filter, { className: "h-4 w-4 mr-2" }), "Filter"] })] }), loading ? (_jsxs("div", { className: "text-center py-12", children: [_jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto" }), _jsx("p", { className: "mt-4 text-gray-600", children: "Loading users..." })] })) : (_jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { children: _jsxs("tr", { className: "border-b", children: [_jsx("th", { className: "text-left py-3 px-4", children: "Name" }), _jsx("th", { className: "text-left py-3 px-4", children: "Email" }), _jsx("th", { className: "text-left py-3 px-4", children: "Role" }), _jsx("th", { className: "text-left py-3 px-4", children: "Status" }), _jsx("th", { className: "text-left py-3 px-4", children: "Joined" }), _jsx("th", { className: "text-left py-3 px-4", children: "Actions" })] }) }), _jsx("tbody", { children: users.map((user) => (_jsxs("tr", { className: "border-b hover:bg-gray-50", children: [_jsx("td", { className: "py-3 px-4", children: _jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3", children: _jsxs("span", { className: "font-semibold text-blue-600", children: [user.firstName?.[0], user.lastName?.[0]] }) }), _jsxs("span", { children: [user.firstName, " ", user.lastName] })] }) }), _jsx("td", { className: "py-3 px-4", children: user.email }), _jsx("td", { className: "py-3 px-4", children: _jsx("span", { className: "px-2 py-1 rounded-full text-xs bg-gray-100", children: user.role }) }), _jsx("td", { className: "py-3 px-4", children: _jsx("span", { className: `px-2 py-1 rounded-full text-xs ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`, children: user.isActive ? 'Active' : 'Inactive' }) }), _jsx("td", { className: "py-3 px-4", children: new Date(user.createdAt).toLocaleDateString() }), _jsx("td", { className: "py-3 px-4", children: _jsxs("div", { className: "flex space-x-2", children: [_jsx(Button, { size: "sm", variant: "outline", children: _jsx(Eye, { className: "h-4 w-4" }) }), _jsx(Button, { size: "sm", variant: "outline", children: _jsx(Edit, { className: "h-4 w-4" }) }), _jsx(Button, { size: "sm", variant: "outline", className: "text-red-600 hover:text-red-700 hover:bg-red-50", onClick: () => handleDelete(user._id), children: _jsx(Trash2, { className: "h-4 w-4" }) })] }) })] }, user._id))) })] }) }))] })] }));
};
export default UserManagement;
