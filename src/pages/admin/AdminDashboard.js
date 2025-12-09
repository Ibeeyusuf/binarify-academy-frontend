import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/admin/AdminDashboard.tsx
import { useState, useEffect } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Users, FileText, CreditCard, TrendingUp, CheckCircle, XCircle, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { adminService } from '../../services/api/dashboardService';
import { toast } from 'sonner';
const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalApplications: 0,
        totalRevenue: 0,
        approvalRate: 0
    });
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchAdminData();
    }, []);
    const fetchAdminData = async () => {
        try {
            setLoading(true);
            const response = await adminService.getAdminStats();
            setStats(response.data);
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
            icon: _jsx(Users, {}),
            change: '+12%',
            trend: 'up'
        },
        {
            label: 'Applications',
            value: stats.totalApplications.toLocaleString(),
            icon: _jsx(FileText, {}),
            change: '+8%',
            trend: 'up'
        },
        {
            label: 'Revenue',
            value: `₦${stats.totalRevenue?.toLocaleString()}`,
            icon: _jsx(CreditCard, {}),
            change: '+18%',
            trend: 'up'
        },
        {
            label: 'Approval Rate',
            value: `${stats.approvalRate}%`,
            icon: _jsx(TrendingUp, {}),
            change: '+5%',
            trend: 'up'
        },
    ];
    if (loading) {
        return (_jsx("div", { className: "flex items-center justify-center h-64", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" }), _jsx("p", { className: "mt-4 text-gray-600", children: "Loading admin dashboard..." })] }) }));
    }
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "Admin Dashboard" }), _jsx("p", { className: "text-gray-600", children: "System overview and analytics" })] }), _jsxs("div", { className: "flex space-x-3", children: [_jsx(Button, { variant: "outline", children: "Export Report" }), _jsx(Button, { className: "bg-blue-600 hover:bg-blue-700", children: "Generate Analytics" })] })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: statsData.map((stat, index) => (_jsxs(Card, { className: "p-6", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { children: [_jsx("p", { className: "text-2xl font-bold", children: stat.value }), _jsx("p", { className: "text-sm text-gray-500 mt-1", children: stat.label })] }), _jsx("div", { className: "p-3 bg-blue-50 rounded-lg", children: _jsx("div", { className: "text-blue-600", children: stat.icon }) })] }), _jsxs("div", { className: "mt-4 flex items-center", children: [stat.trend === 'up' ? (_jsx(ArrowUpRight, { className: "h-4 w-4 text-green-600" })) : (_jsx(ArrowDownRight, { className: "h-4 w-4 text-red-600" })), _jsx("span", { className: `text-sm font-medium ml-1 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`, children: stat.change }), _jsx("span", { className: "text-sm text-gray-500 ml-2", children: "from last month" })] })] }, index))) }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsx("div", { className: "lg:col-span-2", children: _jsxs(Card, { className: "p-6", children: [_jsx("h2", { className: "text-xl font-semibold mb-6", children: "Recent Activity" }), _jsx("div", { className: "text-center py-12", children: _jsx("p", { className: "text-gray-500", children: "Recent activity will appear here" }) })] }) }), _jsxs("div", { className: "space-y-6", children: [_jsxs(Card, { className: "p-6", children: [_jsx("h2", { className: "text-xl font-semibold mb-4", children: "Application Status" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center", children: [_jsx(CheckCircle, { className: "h-5 w-5 text-green-600 mr-2" }), _jsx("span", { children: "Approved" })] }), _jsx("span", { className: "font-bold", children: "245" })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center", children: [_jsx(FileText, { className: "h-5 w-5 text-yellow-600 mr-2" }), _jsx("span", { children: "Pending Review" })] }), _jsx("span", { className: "font-bold", children: "78" })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center", children: [_jsx(XCircle, { className: "h-5 w-5 text-red-600 mr-2" }), _jsx("span", { children: "Rejected" })] }), _jsx("span", { className: "font-bold", children: "19" })] })] })] }), _jsxs(Card, { className: "p-6", children: [_jsx("h2", { className: "text-xl font-semibold mb-4", children: "Quick Actions" }), _jsxs("div", { className: "space-y-3", children: [_jsx(Button, { className: "w-full", variant: "outline", children: "Review Applications" }), _jsx(Button, { className: "w-full", variant: "outline", children: "Manage Users" }), _jsx(Button, { className: "w-full", variant: "outline", children: "View Reports" })] })] })] })] })] }));
};
export default AdminDashboard;
