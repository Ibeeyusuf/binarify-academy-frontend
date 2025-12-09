import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/dashboard/UserDashboard.tsx
import { useState, useEffect } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { BookOpen, FileText, CreditCard, CheckCircle, Calendar, TrendingUp } from 'lucide-react';
import { dashboardService } from '../../services/api/dashboardService';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';
const UserDashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        activeApplications: 0,
        completedCourses: 0,
        totalPayments: 0,
        studyProgress: 0
    });
    const [recentApplications, setRecentApplications] = useState([]);
    const [upcomingPayments, setUpcomingPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchDashboardData();
    }, []);
    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            // Fetch stats
            const statsResponse = await dashboardService.getUserStats();
            setStats(statsResponse.data);
            // Fetch recent applications
            const appsResponse = await dashboardService.getUserApplications(1, 5);
            setRecentApplications(appsResponse.data.applications);
            // Fetch upcoming payments
            const paymentsResponse = await dashboardService.getUserPayments(1, 5);
            setUpcomingPayments(paymentsResponse.data.payments.filter(p => p.status === 'pending'));
        }
        catch (error) {
            toast.error('Failed to load dashboard data');
        }
        finally {
            setLoading(false);
        }
    };
    const statsData = [
        { label: 'Active Applications', value: stats.activeApplications, icon: _jsx(FileText, { className: "h-5 w-5" }) },
        { label: 'Completed Courses', value: stats.completedCourses, icon: _jsx(CheckCircle, { className: "h-5 w-5" }) },
        { label: 'Total Payments', value: `₦${stats.totalPayments?.toLocaleString()}`, icon: _jsx(CreditCard, { className: "h-5 w-5" }) },
        { label: 'Study Progress', value: `${stats.studyProgress}%`, icon: _jsx(TrendingUp, { className: "h-5 w-5" }) },
    ];
    if (loading) {
        return (_jsx("div", { className: "flex items-center justify-center h-64", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" }), _jsx("p", { className: "mt-4 text-gray-600", children: "Loading dashboard..." })] }) }));
    }
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { children: [_jsxs("h1", { className: "text-3xl font-bold text-gray-900", children: ["Welcome back, ", user?.firstName, "!"] }), _jsx("p", { className: "text-gray-600 mt-2", children: "Here's what's happening with your applications" })] }), _jsx(Button, { className: "bg-blue-600 hover:bg-blue-700", children: "New Application" })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: statsData.map((stat, index) => (_jsx(Card, { className: "p-6", children: _jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "p-3 bg-blue-100 rounded-lg", children: _jsx("div", { className: "text-blue-600", children: stat.icon }) }), _jsxs("div", { className: "ml-4", children: [_jsx("p", { className: "text-2xl font-bold", children: stat.value }), _jsx("p", { className: "text-sm text-gray-500", children: stat.label })] })] }) }, index))) }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsx("div", { className: "lg:col-span-2", children: _jsxs(Card, { className: "p-6", children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsx("h2", { className: "text-xl font-semibold", children: "Recent Applications" }), _jsx(Button, { variant: "outline", size: "sm", children: "View All" })] }), _jsx("div", { className: "space-y-4", children: recentApplications.length > 0 ? (recentApplications.map((app) => (_jsxs("div", { className: "flex items-center justify-between p-4 border rounded-lg", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-medium", children: app.program }), _jsxs("p", { className: "text-sm text-gray-500", children: ["Applied on ", new Date(app.createdAt).toLocaleDateString()] })] }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("span", { className: `px-3 py-1 rounded-full text-sm ${app.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                            app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                                app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                                                    'bg-gray-100 text-gray-800'}`, children: app.status.charAt(0).toUpperCase() + app.status.slice(1) }), _jsx(Button, { variant: "ghost", size: "sm", children: "View" })] })] }, app._id)))) : (_jsx("p", { className: "text-gray-500 text-center py-8", children: "No applications yet" })) })] }) }), _jsxs("div", { className: "space-y-6", children: [_jsxs(Card, { className: "p-6", children: [_jsx("h2", { className: "text-xl font-semibold mb-4", children: "Quick Actions" }), _jsxs("div", { className: "space-y-3", children: [_jsxs(Button, { className: "w-full justify-start", variant: "outline", children: [_jsx(BookOpen, { className: "h-4 w-4 mr-2" }), "Browse Programs"] }), _jsxs(Button, { className: "w-full justify-start", variant: "outline", children: [_jsx(CreditCard, { className: "h-4 w-4 mr-2" }), "Make Payment"] }), _jsxs(Button, { className: "w-full justify-start", variant: "outline", children: [_jsx(Calendar, { className: "h-4 w-4 mr-2" }), "View Schedule"] })] })] }), _jsxs(Card, { className: "p-6", children: [_jsx("h2", { className: "text-xl font-semibold mb-4", children: "Upcoming Payments" }), _jsx("div", { className: "space-y-3", children: upcomingPayments.length > 0 ? (upcomingPayments.map((payment) => (_jsxs("div", { className: "p-3 border rounded-lg", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("h3", { className: "font-medium", children: "Tuition Fee" }), _jsxs("span", { className: "font-bold", children: ["\u20A6", payment.amount?.toLocaleString()] })] }), _jsxs("div", { className: "flex items-center mt-2 text-sm text-gray-500", children: [_jsx(Calendar, { className: "h-4 w-4 mr-1" }), "Due: ", new Date(payment.dueDate).toLocaleDateString()] }), _jsx(Button, { className: "w-full mt-3", size: "sm", children: "Pay Now" })] }, payment._id)))) : (_jsx("p", { className: "text-gray-500 text-center py-4", children: "No upcoming payments" })) })] })] })] })] }));
};
export default UserDashboard;
