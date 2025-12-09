import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// src/pages/admin/ApplicationManagement.tsx
import { useState, useEffect } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Search, Filter, CheckCircle, XCircle, Eye, Download } from 'lucide-react';
import { adminService } from '../../services/api/dashboardService';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '../../components/ui/select';
const ApplicationManagement = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    useEffect(() => {
        fetchApplications();
    }, [currentPage, statusFilter]);
    const fetchApplications = async () => {
        try {
            setLoading(true);
            const filters = statusFilter !== 'all' ? { status: statusFilter } : {};
            const response = await adminService.getAllApplications(currentPage, 10, filters);
            setApplications(response.data.applications);
            setTotalPages(response.data.pagination?.pages || 1);
        }
        catch (error) {
            toast.error('Failed to load applications');
        }
        finally {
            setLoading(false);
        }
    };
    const handleStatusUpdate = async (applicationId, status) => {
        try {
            await adminService.updateApplicationStatus(applicationId, status);
            toast.success(`Application ${status}`);
            fetchApplications(); // Refresh list
        }
        catch (error) {
            toast.error('Failed to update application status');
        }
    };
    const filteredApplications = applications.filter(app => app.user?.firstName?.toLowerCase().includes(search.toLowerCase()) ||
        app.user?.lastName?.toLowerCase().includes(search.toLowerCase()) ||
        app.program?.toLowerCase().includes(search.toLowerCase()) ||
        app.track?.toLowerCase().includes(search.toLowerCase()));
    const getStatusColor = (status) => {
        switch (status) {
            case 'approved': return 'bg-green-100 text-green-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'rejected': return 'bg-red-100 text-red-800';
            case 'enrolled': return 'bg-blue-100 text-blue-800';
            case 'under_review': return 'bg-purple-100 text-purple-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };
    const formatStatus = (status) => {
        return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("h1", { className: "text-3xl font-bold", children: "Application Management" }), _jsxs("div", { className: "text-sm text-gray-600", children: ["Total Applications: ", _jsx("span", { className: "font-bold", children: applications.length })] })] }), _jsx(Card, { className: "p-4", children: _jsxs("div", { className: "flex flex-col md:flex-row md:items-center gap-4", children: [_jsxs("div", { className: "flex-1 relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" }), _jsx(Input, { placeholder: "Search by name, program, or track...", className: "pl-10", value: search, onChange: (e) => setSearch(e.target.value) })] }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs(Select, { value: statusFilter, onValueChange: setStatusFilter, children: [_jsx(SelectTrigger, { className: "w-[180px]", children: _jsx(SelectValue, { placeholder: "Filter by status" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "all", children: "All Status" }), _jsx(SelectItem, { value: "pending", children: "Pending" }), _jsx(SelectItem, { value: "under_review", children: "Under Review" }), _jsx(SelectItem, { value: "approved", children: "Approved" }), _jsx(SelectItem, { value: "rejected", children: "Rejected" }), _jsx(SelectItem, { value: "enrolled", children: "Enrolled" })] })] }), _jsxs(Button, { variant: "outline", children: [_jsx(Filter, { className: "h-4 w-4 mr-2" }), "More Filters"] })] })] }) }), _jsx(Card, { className: "p-6", children: loading ? (_jsxs("div", { className: "text-center py-12", children: [_jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto" }), _jsx("p", { className: "mt-4 text-gray-600", children: "Loading applications..." })] })) : filteredApplications.length > 0 ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { children: _jsxs("tr", { className: "border-b", children: [_jsx("th", { className: "text-left py-3 px-4", children: "Applicant" }), _jsx("th", { className: "text-left py-3 px-4", children: "Program" }), _jsx("th", { className: "text-left py-3 px-4", children: "Track" }), _jsx("th", { className: "text-left py-3 px-4", children: "Status" }), _jsx("th", { className: "text-left py-3 px-4", children: "Applied On" }), _jsx("th", { className: "text-left py-3 px-4", children: "Actions" })] }) }), _jsx("tbody", { children: filteredApplications.map((app) => (_jsxs("tr", { className: "border-b hover:bg-gray-50", children: [_jsx("td", { className: "py-3 px-4", children: _jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3", children: _jsxs("span", { className: "font-semibold text-blue-600", children: [app.user?.firstName?.[0], app.user?.lastName?.[0]] }) }), _jsxs("div", { children: [_jsxs("p", { className: "font-medium", children: [app.user?.firstName, " ", app.user?.lastName] }), _jsx("p", { className: "text-sm text-gray-500", children: app.user?.email })] })] }) }), _jsx("td", { className: "py-3 px-4", children: app.program }), _jsx("td", { className: "py-3 px-4", children: _jsx("span", { className: "px-2 py-1 rounded-full text-xs bg-gray-100", children: app.track }) }), _jsx("td", { className: "py-3 px-4", children: _jsx("span", { className: `px-3 py-1 rounded-full text-sm ${getStatusColor(app.status)}`, children: formatStatus(app.status) }) }), _jsx("td", { className: "py-3 px-4", children: new Date(app.createdAt).toLocaleDateString() }), _jsx("td", { className: "py-3 px-4", children: _jsxs("div", { className: "flex items-center space-x-2", children: [_jsxs(Button, { size: "sm", variant: "outline", children: [_jsx(Eye, { className: "h-4 w-4 mr-1" }), "View"] }), app.status === 'pending' || app.status === 'under_review' ? (_jsxs(_Fragment, { children: [_jsxs(Button, { size: "sm", className: "bg-green-600 hover:bg-green-700", onClick: () => handleStatusUpdate(app._id, 'approved'), children: [_jsx(CheckCircle, { className: "h-4 w-4 mr-1" }), "Approve"] }), _jsxs(Button, { size: "sm", className: "bg-red-600 hover:bg-red-700", onClick: () => handleStatusUpdate(app._id, 'rejected'), children: [_jsx(XCircle, { className: "h-4 w-4 mr-1" }), "Reject"] })] })) : app.status === 'approved' ? (_jsx(Button, { size: "sm", className: "bg-blue-600 hover:bg-blue-700", onClick: () => handleStatusUpdate(app._id, 'enrolled'), children: "Mark as Enrolled" })) : null, app.status === 'approved' && (_jsxs(Button, { size: "sm", variant: "outline", children: [_jsx(Download, { className: "h-4 w-4 mr-1" }), "Download"] }))] }) })] }, app._id))) })] }) }), totalPages > 1 && (_jsxs("div", { className: "flex justify-center items-center space-x-2 mt-6", children: [_jsx(Button, { variant: "outline", size: "sm", onClick: () => setCurrentPage(prev => Math.max(1, prev - 1)), disabled: currentPage === 1, children: "Previous" }), _jsxs("span", { className: "text-sm text-gray-600", children: ["Page ", currentPage, " of ", totalPages] }), _jsx(Button, { variant: "outline", size: "sm", onClick: () => setCurrentPage(prev => Math.min(totalPages, prev + 1)), disabled: currentPage === totalPages, children: "Next" })] }))] })) : (_jsx("div", { className: "text-center py-12", children: _jsx("p", { className: "text-gray-500", children: "No applications found" }) })) })] }));
};
export default ApplicationManagement;
