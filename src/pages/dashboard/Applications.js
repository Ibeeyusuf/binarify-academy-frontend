import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/dashboard/Applications.tsx
import { useState, useEffect } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { PlusCircle, Eye, Download, Search, Filter } from 'lucide-react';
import { dashboardService } from '../../services/api/dashboardService';
import { Input } from '../../components/ui/input';
import { toast } from 'sonner';
const Applications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    useEffect(() => {
        fetchApplications();
    }, [currentPage]);
    const fetchApplications = async () => {
        try {
            setLoading(true);
            const response = await dashboardService.getUserApplications(currentPage, 10);
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
    const filteredApplications = applications.filter(app => app.program?.toLowerCase().includes(search.toLowerCase()) ||
        app.status?.toLowerCase().includes(search.toLowerCase()));
    const getStatusColor = (status) => {
        switch (status) {
            case 'approved': return 'bg-green-100 text-green-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'rejected': return 'bg-red-100 text-red-800';
            case 'enrolled': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("h1", { className: "text-3xl font-bold", children: "My Applications" }), _jsxs(Button, { className: "bg-blue-600 hover:bg-blue-700", children: [_jsx(PlusCircle, { className: "h-4 w-4 mr-2" }), "New Application"] })] }), _jsx(Card, { className: "p-4", children: _jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs("div", { className: "flex-1 relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" }), _jsx(Input, { placeholder: "Search applications...", className: "pl-10", value: search, onChange: (e) => setSearch(e.target.value) })] }), _jsxs(Button, { variant: "outline", children: [_jsx(Filter, { className: "h-4 w-4 mr-2" }), "Filter"] })] }) }), _jsx(Card, { className: "p-6", children: loading ? (_jsxs("div", { className: "text-center py-12", children: [_jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto" }), _jsx("p", { className: "mt-4 text-gray-600", children: "Loading applications..." })] })) : filteredApplications.length > 0 ? (_jsxs("div", { className: "overflow-x-auto", children: [_jsxs("table", { className: "w-full", children: [_jsx("thead", { children: _jsxs("tr", { className: "border-b", children: [_jsx("th", { className: "text-left py-3 px-4", children: "Program" }), _jsx("th", { className: "text-left py-3 px-4", children: "Track" }), _jsx("th", { className: "text-left py-3 px-4", children: "Status" }), _jsx("th", { className: "text-left py-3 px-4", children: "Date Applied" }), _jsx("th", { className: "text-left py-3 px-4", children: "Actions" })] }) }), _jsx("tbody", { children: filteredApplications.map((app) => (_jsxs("tr", { className: "border-b hover:bg-gray-50", children: [_jsx("td", { className: "py-3 px-4", children: app.program }), _jsx("td", { className: "py-3 px-4", children: app.track }), _jsx("td", { className: "py-3 px-4", children: _jsx("span", { className: `px-3 py-1 rounded-full text-sm ${getStatusColor(app.status)}`, children: app.status?.charAt(0).toUpperCase() + app.status?.slice(1) }) }), _jsx("td", { className: "py-3 px-4", children: new Date(app.createdAt).toLocaleDateString() }), _jsx("td", { className: "py-3 px-4", children: _jsxs("div", { className: "flex space-x-2", children: [_jsxs(Button, { size: "sm", variant: "outline", children: [_jsx(Eye, { className: "h-4 w-4 mr-1" }), "View"] }), app.status === 'approved' && (_jsxs(Button, { size: "sm", variant: "outline", children: [_jsx(Download, { className: "h-4 w-4 mr-1" }), "Download"] }))] }) })] }, app._id))) })] }), totalPages > 1 && (_jsxs("div", { className: "flex justify-center items-center space-x-2 mt-6", children: [_jsx(Button, { variant: "outline", size: "sm", onClick: () => setCurrentPage(prev => Math.max(1, prev - 1)), disabled: currentPage === 1, children: "Previous" }), _jsxs("span", { className: "text-sm text-gray-600", children: ["Page ", currentPage, " of ", totalPages] }), _jsx(Button, { variant: "outline", size: "sm", onClick: () => setCurrentPage(prev => Math.min(totalPages, prev + 1)), disabled: currentPage === totalPages, children: "Next" })] }))] })) : (_jsxs("div", { className: "text-center py-12", children: [_jsx("p", { className: "text-gray-500", children: "No applications found" }), _jsx(Button, { className: "mt-4", variant: "outline", children: "Start New Application" })] })) })] }));
};
export default Applications;
