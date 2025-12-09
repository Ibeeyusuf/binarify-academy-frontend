import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from 'react-router-dom';
import AdminSidebar from './DashboardSidebar';
import AdminHeader from './DashboardHeader';
const AdminLayout = () => {
    return (_jsxs("div", { className: "flex min-h-screen bg-gray-50", children: [_jsx(AdminSidebar, {}), _jsxs("div", { className: "flex-1 flex flex-col", children: [_jsx(AdminHeader, {}), _jsx("main", { className: "flex-1 p-6 overflow-y-auto", children: _jsx("div", { className: "max-w-7xl mx-auto", children: _jsx(Outlet, {}) }) })] })] }));
};
export default AdminLayout;
