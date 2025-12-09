import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/admin/Analytics.tsx
import { useState, useEffect } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Users, TrendingUp, Download, Calendar, DollarSign, BookOpen, CheckCircle } from 'lucide-react';
import { adminService } from '../../services/api/dashboardService';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '../../components/ui/select';
const Analytics = () => {
    const [analytics, setAnalytics] = useState({
        userRegistrations: [],
        applicationSubmissions: [],
        revenueData: []
    });
    const [loading, setLoading] = useState(true);
    const [period, setPeriod] = useState('monthly');
    const [dateRange, setDateRange] = useState('last_30_days');
    useEffect(() => {
        fetchAnalytics();
    }, [period, dateRange]);
    const fetchAnalytics = async () => {
        try {
            setLoading(true);
            const response = await adminService.getAnalytics(period);
            setAnalytics(response.data);
        }
        catch (error) {
            toast.error('Failed to load analytics');
        }
        finally {
            setLoading(false);
        }
    };
    const stats = [
        {
            title: 'Total Users',
            value: '1,254',
            change: '+12%',
            icon: _jsx(Users, { className: "h-6 w-6" }),
            color: 'bg-blue-500'
        },
        {
            title: 'Active Applications',
            value: '342',
            change: '+8%',
            icon: _jsx(BookOpen, { className: "h-6 w-6" }),
            color: 'bg-green-500'
        },
        {
            title: 'Total Revenue',
            value: '₦4.2M',
            change: '+18%',
            icon: _jsx(DollarSign, { className: "h-6 w-6" }),
            color: 'bg-purple-500'
        },
        {
            title: 'Completion Rate',
            value: '85%',
            change: '+5%',
            icon: _jsx(CheckCircle, { className: "h-6 w-6" }),
            color: 'bg-orange-500'
        }
    ];
    const recentActivities = [
        { user: 'John Doe', action: 'Applied for Full Stack Dev', time: '10 mins ago' },
        { user: 'Jane Smith', action: 'Payment completed', time: '30 mins ago' },
        { user: 'Mike Johnson', action: 'Application approved', time: '2 hours ago' },
        { user: 'Sarah Wilson', action: 'Enrolled in Data Science', time: '5 hours ago' },
        { user: 'David Brown', action: 'Account created', time: '1 day ago' },
    ];
    const exportData = () => {
        toast.info('Exporting analytics data...');
        // Implement export logic
    };
    if (loading) {
        return (_jsx("div", { className: "flex items-center justify-center h-64", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" }), _jsx("p", { className: "mt-4 text-gray-600", children: "Loading analytics..." })] }) }));
    }
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold", children: "Analytics Dashboard" }), _jsx("p", { className: "text-gray-600", children: "Platform performance and insights" })] }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs(Select, { value: period, onValueChange: setPeriod, children: [_jsx(SelectTrigger, { className: "w-[140px]", children: _jsx(SelectValue, { placeholder: "Period" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "daily", children: "Daily" }), _jsx(SelectItem, { value: "weekly", children: "Weekly" }), _jsx(SelectItem, { value: "monthly", children: "Monthly" }), _jsx(SelectItem, { value: "quarterly", children: "Quarterly" }), _jsx(SelectItem, { value: "yearly", children: "Yearly" })] })] }), _jsxs(Select, { value: dateRange, onValueChange: setDateRange, children: [_jsx(SelectTrigger, { className: "w-[180px]", children: _jsx(SelectValue, { placeholder: "Date Range" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "last_7_days", children: "Last 7 Days" }), _jsx(SelectItem, { value: "last_30_days", children: "Last 30 Days" }), _jsx(SelectItem, { value: "last_90_days", children: "Last 90 Days" }), _jsx(SelectItem, { value: "this_month", children: "This Month" }), _jsx(SelectItem, { value: "last_month", children: "Last Month" }), _jsx(SelectItem, { value: "this_year", children: "This Year" })] })] }), _jsxs(Button, { variant: "outline", onClick: exportData, children: [_jsx(Download, { className: "h-4 w-4 mr-2" }), "Export"] })] })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: stats.map((stat, index) => (_jsxs(Card, { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-2xl font-bold", children: stat.value }), _jsx("p", { className: "text-sm text-gray-500 mt-1", children: stat.title })] }), _jsx("div", { className: `p-3 rounded-lg ${stat.color} bg-opacity-10`, children: _jsx("div", { className: `${stat.color.replace('bg-', 'text-')}`, children: stat.icon }) })] }), _jsxs("div", { className: "mt-4 flex items-center", children: [_jsx(TrendingUp, { className: "h-4 w-4 text-green-600" }), _jsx("span", { className: "text-sm text-green-600 font-medium ml-1", children: stat.change }), _jsx("span", { className: "text-sm text-gray-500 ml-2", children: "from last period" })] })] }, index))) }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs(Card, { className: "p-6", children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsx("h2", { className: "text-lg font-semibold", children: "User Registrations" }), _jsx(Calendar, { className: "h-5 w-5 text-gray-400" })] }), _jsx("div", { className: "h-64 flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-3xl font-bold text-gray-900", children: "1,254" }), _jsx("p", { className: "text-gray-600 mt-2", children: "Total Users" }), _jsx("div", { className: "mt-4 w-48 h-2 bg-gray-200 rounded-full mx-auto", children: _jsx("div", { className: "h-full bg-blue-600 rounded-full", style: { width: '75%' } }) }), _jsx("p", { className: "text-sm text-gray-500 mt-2", children: "75% growth this month" })] }) })] }), _jsxs(Card, { className: "p-6", children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsx("h2", { className: "text-lg font-semibold", children: "Revenue Trend" }), _jsx(DollarSign, { className: "h-5 w-5 text-gray-400" })] }), _jsx("div", { className: "h-64 flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-3xl font-bold text-gray-900", children: "\u20A64.2M" }), _jsx("p", { className: "text-gray-600 mt-2", children: "Total Revenue" }), _jsx("div", { className: "mt-4 w-48 h-2 bg-gray-200 rounded-full mx-auto", children: _jsx("div", { className: "h-full bg-green-600 rounded-full", style: { width: '85%' } }) }), _jsx("p", { className: "text-sm text-gray-500 mt-2", children: "85% increase from last month" })] }) })] })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsx("div", { className: "lg:col-span-2", children: _jsxs(Card, { className: "p-6", children: [_jsx("h2", { className: "text-lg font-semibold mb-6", children: "Recent Activity" }), _jsx("div", { className: "space-y-4", children: recentActivities.map((activity, index) => (_jsxs("div", { className: "flex items-center justify-between p-4 border rounded-lg", children: [_jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "w-10 h-10 bg-gray-200 rounded-full" }), _jsxs("div", { className: "ml-3", children: [_jsx("p", { className: "font-medium", children: activity.user }), _jsx("p", { className: "text-sm text-gray-500", children: activity.action })] })] }), _jsx("span", { className: "text-sm text-gray-500", children: activity.time })] }, index))) })] }) }), _jsxs(Card, { className: "p-6", children: [_jsx("h2", { className: "text-lg font-semibold mb-6", children: "Conversion Rates" }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex justify-between mb-2", children: [_jsx("span", { className: "text-sm font-medium", children: "Application to Payment" }), _jsx("span", { className: "text-sm font-bold", children: "65%" })] }), _jsx("div", { className: "w-full bg-gray-200 rounded-full h-2", children: _jsx("div", { className: "bg-blue-600 h-2 rounded-full", style: { width: '65%' } }) })] }), _jsxs("div", { children: [_jsxs("div", { className: "flex justify-between mb-2", children: [_jsx("span", { className: "text-sm font-medium", children: "Payment to Enrollment" }), _jsx("span", { className: "text-sm font-bold", children: "92%" })] }), _jsx("div", { className: "w-full bg-gray-200 rounded-full h-2", children: _jsx("div", { className: "bg-green-600 h-2 rounded-full", style: { width: '92%' } }) })] }), _jsxs("div", { children: [_jsxs("div", { className: "flex justify-between mb-2", children: [_jsx("span", { className: "text-sm font-medium", children: "Course Completion" }), _jsx("span", { className: "text-sm font-bold", children: "78%" })] }), _jsx("div", { className: "w-full bg-gray-200 rounded-full h-2", children: _jsx("div", { className: "bg-purple-600 h-2 rounded-full", style: { width: '78%' } }) })] }), _jsxs("div", { children: [_jsxs("div", { className: "flex justify-between mb-2", children: [_jsx("span", { className: "text-sm font-medium", children: "User Retention" }), _jsx("span", { className: "text-sm font-bold", children: "85%" })] }), _jsx("div", { className: "w-full bg-gray-200 rounded-full h-2", children: _jsx("div", { className: "bg-orange-600 h-2 rounded-full", style: { width: '85%' } }) })] })] })] })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs(Card, { className: "p-6", children: [_jsx("h2", { className: "text-lg font-semibold mb-6", children: "Top Programs" }), _jsx("div", { className: "space-y-4", children: [
                                    { program: 'Full Stack Development', students: 245, revenue: '₦1.2M' },
                                    { program: 'Data Science', students: 189, revenue: '₦950K' },
                                    { program: 'UI/UX Design', students: 156, revenue: '₦780K' },
                                    { program: 'Cybersecurity', students: 98, revenue: '₦490K' },
                                    { program: 'Cloud Computing', students: 76, revenue: '₦380K' },
                                ].map((item, index) => (_jsxs("div", { className: "flex items-center justify-between p-3 border rounded-lg", children: [_jsxs("div", { children: [_jsx("p", { className: "font-medium", children: item.program }), _jsxs("p", { className: "text-sm text-gray-500", children: [item.students, " students"] })] }), _jsxs("div", { className: "text-right", children: [_jsx("p", { className: "font-bold", children: item.revenue }), _jsx("p", { className: "text-sm text-green-600", children: "+12%" })] })] }, index))) })] }), _jsxs(Card, { className: "p-6", children: [_jsx("h2", { className: "text-lg font-semibold mb-6", children: "Geographic Distribution" }), _jsx("div", { className: "space-y-4", children: [
                                    { country: 'Nigeria', users: 856, percentage: '68%' },
                                    { country: 'Ghana', users: 189, percentage: '15%' },
                                    { country: 'Kenya', users: 98, percentage: '8%' },
                                    { country: 'South Africa', users: 56, percentage: '4%' },
                                    { country: 'Other', users: 55, percentage: '5%' },
                                ].map((item, index) => (_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: item.country }), _jsxs("span", { className: "font-medium", children: [item.users, " users (", item.percentage, ")"] })] }), _jsx("div", { className: "w-full bg-gray-200 rounded-full h-2", children: _jsx("div", { className: "bg-blue-600 h-2 rounded-full", style: { width: item.percentage } }) })] }, index))) })] })] })] }));
};
export default Analytics;
