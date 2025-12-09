import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/admin/AdminDashboard.tsx
import { useState, useEffect } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Users, FileText, CreditCard, TrendingUp, CheckCircle, XCircle, ArrowUpRight, ArrowDownRight, } from 'lucide-react';
import { adminService } from '../../services/api/dashboardService';
import { toast } from 'sonner';
const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalApplications: 0,
        totalRevenue: 0,
        approvalRate: 0,
    });
    const [recentActivities, setRecentActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchAdminData();
    }, []);
    const fetchAdminData = async () => {
        try {
            setLoading(true);
            const statsResponse = await adminService.getAdminStats();
            setStats(statsResponse.data);
        }
        catch (error) {
            toast.error('Failed to load admin dashboard data');
        }
        finally {
            setLoading(false);
        }
    };
    const statsData = [
        {
            label: 'Total Users',
            value: stats.totalUsers.toLocaleString(),
            icon: _jsx(Users, { className: "w-5 h-5" }),
            change: '+12%',
            trend: 'up',
        },
        {
            label: 'Applications',
            value: stats.totalApplications.toLocaleString(),
            icon: _jsx(FileText, { className: "w-5 h-5" }),
            change: '+8%',
            trend: 'up',
        },
        {
            label: 'Revenue',
            value: `₦${stats.totalRevenue?.toLocaleString()}`,
            icon: _jsx(CreditCard, { className: "w-5 h-5" }),
            change: '+18%',
            trend: 'up',
        },
        {
            label: 'Approval Rate',
            value: `${stats.approvalRate}%`,
            icon: _jsx(TrendingUp, { className: "w-5 h-5" }),
            change: '+5%',
            trend: 'up',
        },
    ];
    if (loading) {
        return (_jsx("div", { className: "flex items-center justify-center h-64", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" }), _jsx("p", { className: "mt-4 text-gray-600", children: "Loading admin dashboard..." })] }) }));
    }
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight text-gray-900", children: "Admin Dashboard" }), _jsx("p", { className: "text-gray-500 text-sm", children: "Analytics & System Overview" })] }), _jsxs("div", { className: "flex space-x-3", children: [_jsx(Button, { variant: "outline", className: "rounded-lg", children: "Export Report" }), _jsx(Button, { className: "bg-blue-600 hover:bg-blue-700 rounded-lg", children: "Generate Analytics" })] })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: statsData.map((stat, index) => (_jsxs(Card, { className: "p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100", children: [_jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-3xl font-bold text-gray-900", children: stat.value }), _jsx("p", { className: "text-sm text-gray-500 mt-1", children: stat.label })] }), _jsx("div", { className: "p-3 bg-blue-100 text-blue-600 rounded-xl", children: stat.icon })] }), _jsxs("div", { className: "mt-4 flex items-center", children: [stat.trend === 'up' ? (_jsx(ArrowUpRight, { className: "h-4 w-4 text-green-600" })) : (_jsx(ArrowDownRight, { className: "h-4 w-4 text-red-600" })), _jsx("span", { className: `text-sm font-medium ml-1 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`, children: stat.change }), _jsx("span", { className: "text-sm text-gray-400 ml-2", children: "from last month" })] })] }, index))) }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsx("div", { className: "lg:col-span-2", children: _jsxs(Card, { className: "p-6 rounded-xl border border-gray-100 shadow-sm", children: [_jsx("h2", { className: "text-lg font-semibold mb-5 text-gray-900", children: "Recent Activity" }), _jsx("div", { className: "space-y-4", children: recentActivities.length > 0 ? (recentActivities.map((activity, index) => (_jsxs("div", { className: "flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-xl", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-9 h-9 bg-gray-200 rounded-full" }), _jsxs("div", { children: [_jsx("p", { className: "font-medium", children: activity.user }), _jsx("p", { className: "text-xs text-gray-500", children: activity.action })] })] }), _jsx("span", { className: "text-xs text-gray-500", children: activity.time })] }, index)))) : (_jsx("p", { className: "text-gray-500 text-center py-10", children: "No recent activities" })) })] }) }), _jsxs("div", { className: "space-y-6", children: [_jsxs(Card, { className: "p-6 rounded-xl border border-gray-100 shadow-sm", children: [_jsx("h2", { className: "text-lg font-semibold mb-4", children: "Application Status" }), _jsxs("div", { className: "space-y-4", children: [_jsx(StatusRow, { icon: _jsx(CheckCircle, { className: "h-5 w-5 text-green-600" }), label: "Approved", value: "245" }), _jsx(StatusRow, { icon: _jsx(FileText, { className: "h-5 w-5 text-yellow-600" }), label: "Pending Review", value: "78" }), _jsx(StatusRow, { icon: _jsx(XCircle, { className: "h-5 w-5 text-red-600" }), label: "Rejected", value: "19" })] })] }), _jsxs(Card, { className: "p-6 rounded-xl border border-gray-100 shadow-sm", children: [_jsx("h2", { className: "text-lg font-semibold mb-4", children: "Quick Actions" }), _jsxs("div", { className: "space-y-3", children: [_jsx(Button, { className: "w-full rounded-lg", variant: "outline", children: "Review Applications" }), _jsx(Button, { className: "w-full rounded-lg", variant: "outline", children: "Manage Users" }), _jsx(Button, { className: "w-full rounded-lg", variant: "outline", children: "View Reports" })] })] })] })] })] }));
};
// Status Row Component
const StatusRow = ({ icon, label, value, }) => (_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [icon, _jsx("span", { className: "text-gray-700", children: label })] }), _jsx("span", { className: "font-bold text-gray-900", children: value })] }));
export default AdminDashboard;
const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalApplications: 0,
        totalRevenue: 0,
        approvalRate: 0,
    });
    const [recentActivities, setRecentActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchAdminData();
    }, []);
    const fetchAdminData = async () => {
        try {
            setLoading(true);
            const statsResponse = await adminService.getAdminStats();
            setStats(statsResponse.data);
        }
        catch (error) {
            toast.error('Failed to load admin dashboard data');
        }
        finally {
            setLoading(false);
        }
    };
    const statsData = [
        {
            label: 'Total Users',
            value: stats.totalUsers.toLocaleString(),
            icon: _jsx(Users, { className: "w-5 h-5" }),
            change: '+12%',
            trend: 'up',
        },
        {
            label: 'Applications',
            value: stats.totalApplications.toLocaleString(),
            icon: _jsx(FileText, { className: "w-5 h-5" }),
            change: '+8%',
            trend: 'up',
        },
        {
            label: 'Revenue',
            value: `₦${stats.totalRevenue?.toLocaleString()}`,
            icon: _jsx(CreditCard, { className: "w-5 h-5" }),
            change: '+18%',
            trend: 'up',
        },
        {
            label: 'Approval Rate',
            value: `${stats.approvalRate}%`,
            icon: _jsx(TrendingUp, { className: "w-5 h-5" }),
            change: '+5%',
            trend: 'up',
        },
    ];
    if (loading) {
        return (_jsx("div", { className: "flex items-center justify-center h-64", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" }), _jsx("p", { className: "mt-4 text-gray-600", children: "Loading admin dashboard..." })] }) }));
    }
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight text-gray-900", children: "Admin Dashboard" }), _jsx("p", { className: "text-gray-500 text-sm", children: "Analytics & System Overview" })] }), _jsxs("div", { className: "flex space-x-3", children: [_jsx(Button, { variant: "outline", className: "rounded-lg", children: "Export Report" }), _jsx(Button, { className: "bg-blue-600 hover:bg-blue-700 rounded-lg", children: "Generate Analytics" })] })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: statsData.map((stat, index) => (_jsxs(Card, { className: "p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100", children: [_jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-3xl font-bold text-gray-900", children: stat.value }), _jsx("p", { className: "text-sm text-gray-500 mt-1", children: stat.label })] }), _jsx("div", { className: "p-3 bg-blue-100 text-blue-600 rounded-xl", children: stat.icon })] }), _jsxs("div", { className: "mt-4 flex items-center", children: [stat.trend === 'up' ? (_jsx(ArrowUpRight, { className: "h-4 w-4 text-green-600" })) : (_jsx(ArrowDownRight, { className: "h-4 w-4 text-red-600" })), _jsx("span", { className: `text-sm font-medium ml-1 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`, children: stat.change }), _jsx("span", { className: "text-sm text-gray-400 ml-2", children: "from last month" })] })] }, index))) }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsx("div", { className: "lg:col-span-2", children: _jsxs(Card, { className: "p-6 rounded-xl border border-gray-100 shadow-sm", children: [_jsx("h2", { className: "text-lg font-semibold mb-5 text-gray-900", children: "Recent Activity" }), _jsx("div", { className: "space-y-4", children: recentActivities.length > 0 ? (recentActivities.map((activity, index) => (_jsxs("div", { className: "flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-xl", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-9 h-9 bg-gray-200 rounded-full" }), _jsxs("div", { children: [_jsx("p", { className: "font-medium", children: activity.user }), _jsx("p", { className: "text-xs text-gray-500", children: activity.action })] })] }), _jsx("span", { className: "text-xs text-gray-500", children: activity.time })] }, index)))) : (_jsx("p", { className: "text-gray-500 text-center py-10", children: "No recent activities" })) })] }) }), _jsxs("div", { className: "space-y-6", children: [_jsxs(Card, { className: "p-6 rounded-xl border border-gray-100 shadow-sm", children: [_jsx("h2", { className: "text-lg font-semibold mb-4", children: "Application Status" }), _jsxs("div", { className: "space-y-4", children: [_jsx(StatusRow, { icon: _jsx(CheckCircle, { className: "h-5 w-5 text-green-600" }), label: "Approved", value: "245" }), _jsx(StatusRow, { icon: _jsx(FileText, { className: "h-5 w-5 text-yellow-600" }), label: "Pending Review", value: "78" }), _jsx(StatusRow, { icon: _jsx(XCircle, { className: "h-5 w-5 text-red-600" }), label: "Rejected", value: "19" })] })] }), _jsxs(Card, { className: "p-6 rounded-xl border border-gray-100 shadow-sm", children: [_jsx("h2", { className: "text-lg font-semibold mb-4", children: "Quick Actions" }), _jsxs("div", { className: "space-y-3", children: [_jsx(Button, { className: "w-full rounded-lg", variant: "outline", children: "Review Applications" }), _jsx(Button, { className: "w-full rounded-lg", variant: "outline", children: "Manage Users" }), _jsx(Button, { className: "w-full rounded-lg", variant: "outline", children: "View Reports" })] })] })] })] })] }));
};
// Status Row Component
const StatusRow = ({ icon, label, value, }) => (_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [icon, _jsx("span", { className: "text-gray-700", children: label })] }), _jsx("span", { className: "font-bold text-gray-900", children: value })] }));
export default AdminDashboard;
