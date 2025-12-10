import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, CreditCard, User, Settings, LogOut, BookOpen, Home } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
const DashboardSidebar = () => {
    const location = useLocation();
    const { logout, user } = useAuth();
    const userNavItems = [
        { name: 'Dashboard', path: '/dashboard', icon: _jsx(LayoutDashboard, { className: "h-5 w-5" }) },
        { name: 'Applications', path: '/dashboard/applications', icon: _jsx(FileText, { className: "h-5 w-5" }) },
        { name: 'Payments', path: '/dashboard/payments', icon: _jsx(CreditCard, { className: "h-5 w-5" }) },
        { name: 'My Courses', path: '/dashboard/courses', icon: _jsx(BookOpen, { className: "h-5 w-5" }) },
        { name: 'Profile', path: '/dashboard/profile', icon: _jsx(User, { className: "h-5 w-5" }) },
        { name: 'Settings', path: '/dashboard/settings', icon: _jsx(Settings, { className: "h-5 w-5" }) },
    ];
    return (_jsxs("div", { className: "w-64 bg-white border-r border-gray-200 flex flex-col", children: [_jsx("div", { className: "p-6 border-b", children: _jsxs(Link, { to: "/", className: "flex items-center space-x-2", children: [_jsx("div", { className: "w-8 h-8 bg-blue-600 rounded-lg" }), _jsx("span", { className: "text-xl font-bold text-gray-900", children: "BinarifyAcademy" })] }) }), _jsx("div", { className: "p-6 border-b", children: _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center", children: _jsxs("span", { className: "font-semibold text-blue-600", children: [user?.firstName?.[0], user?.lastName?.[0]] }) }), _jsxs("div", { children: [_jsxs("p", { className: "font-medium", children: [user?.firstName, " ", user?.lastName] }), _jsx("p", { className: "text-sm text-gray-500", children: user?.email })] })] }) }), _jsx("nav", { className: "flex-1 p-4 space-y-2", children: userNavItems.map((item) => (_jsxs(Link, { to: item.path, className: `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${location.pathname === item.path
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'}`, children: [item.icon, _jsx("span", { children: item.name })] }, item.path))) }), _jsxs("div", { className: "p-4 border-t", children: [_jsxs(Link, { to: "/", className: "flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100", children: [_jsx(Home, { className: "h-5 w-5" }), _jsx("span", { children: "Back to Home" })] }), _jsxs("button", { onClick: logout, className: "w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 mt-2", children: [_jsx(LogOut, { className: "h-5 w-5" }), _jsx("span", { children: "Logout" })] })] })] }));
};
export default DashboardSidebar;
