import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// src/pages/admin/PaymentManagement.tsx
import { useState, useEffect } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Search, Filter, Download, Eye, CreditCard, RefreshCw } from 'lucide-react';
import { adminService } from '../../services/api/dashboardService';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '../../components/ui/select';
const PaymentManagement = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    useEffect(() => {
        fetchPayments();
    }, [currentPage, statusFilter]);
    const fetchPayments = async () => {
        try {
            setLoading(true);
            const filters = statusFilter !== 'all' ? { status: statusFilter } : {};
            const response = await adminService.getAllPayments(currentPage, 10, filters);
            setPayments(response.data.payments);
            setTotalPages(response.data.pagination?.pages || 1);
        }
        catch (error) {
            toast.error('Failed to load payments');
        }
        finally {
            setLoading(false);
        }
    };
    const handleVerifyPayment = async (reference) => {
        try {
            // Call verify payment endpoint
            toast.info('Verifying payment...');
            // Implement verification logic
        }
        catch (error) {
            toast.error('Failed to verify payment');
        }
    };
    const formatAmount = (amount) => {
        return `₦${(amount / 100).toLocaleString()}`;
    };
    const getStatusColor = (status) => {
        switch (status) {
            case 'success': return 'bg-green-100 text-green-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'failed': return 'bg-red-100 text-red-800';
            case 'expired': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };
    const filteredPayments = payments.filter(payment => payment.reference?.toLowerCase().includes(search.toLowerCase()) ||
        payment.user?.email?.toLowerCase().includes(search.toLowerCase()) ||
        payment.user?.firstName?.toLowerCase().includes(search.toLowerCase()) ||
        payment.user?.lastName?.toLowerCase().includes(search.toLowerCase()));
    const exportToCSV = () => {
        toast.info('Exporting payments data...');
        // Implement CSV export logic
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold", children: "Payment Management" }), _jsx("p", { className: "text-gray-600", children: "Monitor and manage all payment transactions" })] }), _jsxs("div", { className: "flex space-x-3", children: [_jsxs(Button, { variant: "outline", onClick: exportToCSV, children: [_jsx(Download, { className: "h-4 w-4 mr-2" }), "Export CSV"] }), _jsxs(Button, { onClick: fetchPayments, children: [_jsx(RefreshCw, { className: "h-4 w-4 mr-2" }), "Refresh"] })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6", children: [_jsx(Card, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsxs("p", { className: "text-2xl font-bold", children: ["\u20A6", payments
                                                    .filter(p => p.status === 'success')
                                                    .reduce((sum, p) => sum + p.amount, 0) / 100] }), _jsx("p", { className: "text-sm text-gray-500", children: "Total Revenue" })] }), _jsx("div", { className: "p-3 bg-green-50 rounded-lg", children: _jsx(CreditCard, { className: "h-6 w-6 text-green-600" }) })] }) }), _jsx(Card, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-2xl font-bold", children: payments.filter(p => p.status === 'success').length }), _jsx("p", { className: "text-sm text-gray-500", children: "Successful Payments" })] }), _jsx("div", { className: "p-3 bg-blue-50 rounded-lg", children: _jsx("div", { className: "h-6 w-6 text-blue-600", children: "\u2713" }) })] }) }), _jsx(Card, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-2xl font-bold", children: payments.filter(p => p.status === 'pending').length }), _jsx("p", { className: "text-sm text-gray-500", children: "Pending Payments" })] }), _jsx("div", { className: "p-3 bg-yellow-50 rounded-lg", children: _jsx("div", { className: "h-6 w-6 text-yellow-600", children: "\u23F1\uFE0F" }) })] }) }), _jsx(Card, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-2xl font-bold", children: payments.filter(p => p.status === 'failed').length }), _jsx("p", { className: "text-sm text-gray-500", children: "Failed Payments" })] }), _jsx("div", { className: "p-3 bg-red-50 rounded-lg", children: _jsx("div", { className: "h-6 w-6 text-red-600", children: "\u2717" }) })] }) })] }), _jsx(Card, { className: "p-4", children: _jsxs("div", { className: "flex flex-col md:flex-row md:items-center gap-4", children: [_jsxs("div", { className: "flex-1 relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" }), _jsx(Input, { placeholder: "Search by reference, name, or email...", className: "pl-10", value: search, onChange: (e) => setSearch(e.target.value) })] }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs(Select, { value: statusFilter, onValueChange: setStatusFilter, children: [_jsx(SelectTrigger, { className: "w-[180px]", children: _jsx(SelectValue, { placeholder: "Filter by status" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "all", children: "All Status" }), _jsx(SelectItem, { value: "success", children: "Success" }), _jsx(SelectItem, { value: "pending", children: "Pending" }), _jsx(SelectItem, { value: "failed", children: "Failed" }), _jsx(SelectItem, { value: "expired", children: "Expired" })] })] }), _jsxs(Select, { children: [_jsx(SelectTrigger, { className: "w-[180px]", children: _jsx(SelectValue, { placeholder: "Date Range" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "today", children: "Today" }), _jsx(SelectItem, { value: "week", children: "This Week" }), _jsx(SelectItem, { value: "month", children: "This Month" }), _jsx(SelectItem, { value: "quarter", children: "This Quarter" }), _jsx(SelectItem, { value: "year", children: "This Year" })] })] }), _jsxs(Button, { variant: "outline", children: [_jsx(Filter, { className: "h-4 w-4 mr-2" }), "More Filters"] })] })] }) }), _jsx(Card, { className: "p-6", children: loading ? (_jsxs("div", { className: "text-center py-12", children: [_jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto" }), _jsx("p", { className: "mt-4 text-gray-600", children: "Loading payments..." })] })) : filteredPayments.length > 0 ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { children: _jsxs("tr", { className: "border-b", children: [_jsx("th", { className: "text-left py-3 px-4", children: "Reference" }), _jsx("th", { className: "text-left py-3 px-4", children: "User" }), _jsx("th", { className: "text-left py-3 px-4", children: "Amount" }), _jsx("th", { className: "text-left py-3 px-4", children: "Status" }), _jsx("th", { className: "text-left py-3 px-4", children: "Date" }), _jsx("th", { className: "text-left py-3 px-4", children: "Actions" })] }) }), _jsx("tbody", { children: filteredPayments.map((payment) => (_jsxs("tr", { className: "border-b hover:bg-gray-50", children: [_jsx("td", { className: "py-3 px-4 font-mono text-sm", children: payment.reference }), _jsx("td", { className: "py-3 px-4", children: _jsxs("div", { children: [_jsxs("p", { className: "font-medium", children: [payment.user?.firstName, " ", payment.user?.lastName] }), _jsx("p", { className: "text-sm text-gray-500", children: payment.user?.email })] }) }), _jsx("td", { className: "py-3 px-4 font-bold", children: formatAmount(payment.amount) }), _jsx("td", { className: "py-3 px-4", children: _jsx("span", { className: `px-3 py-1 rounded-full text-sm ${getStatusColor(payment.status)}`, children: payment.status?.charAt(0).toUpperCase() + payment.status?.slice(1) }) }), _jsx("td", { className: "py-3 px-4", children: payment.paidAt
                                                        ? new Date(payment.paidAt).toLocaleDateString()
                                                        : new Date(payment.createdAt).toLocaleDateString() }), _jsx("td", { className: "py-3 px-4", children: _jsxs("div", { className: "flex space-x-2", children: [_jsxs(Button, { size: "sm", variant: "outline", children: [_jsx(Eye, { className: "h-4 w-4 mr-1" }), "Details"] }), payment.status === 'pending' && (_jsx(Button, { size: "sm", className: "bg-blue-600 hover:bg-blue-700", onClick: () => handleVerifyPayment(payment.reference), children: "Verify" })), payment.status === 'success' && (_jsxs(Button, { size: "sm", variant: "outline", children: [_jsx(Download, { className: "h-4 w-4 mr-1" }), "Receipt"] }))] }) })] }, payment._id))) })] }) }), totalPages > 1 && (_jsxs("div", { className: "flex justify-center items-center space-x-2 mt-6", children: [_jsx(Button, { variant: "outline", size: "sm", onClick: () => setCurrentPage(prev => Math.max(1, prev - 1)), disabled: currentPage === 1, children: "Previous" }), _jsxs("span", { className: "text-sm text-gray-600", children: ["Page ", currentPage, " of ", totalPages] }), _jsx(Button, { variant: "outline", size: "sm", onClick: () => setCurrentPage(prev => Math.min(totalPages, prev + 1)), disabled: currentPage === totalPages, children: "Next" })] }))] })) : (_jsx("div", { className: "text-center py-12", children: _jsx("p", { className: "text-gray-500", children: "No payments found" }) })) })] }));
};
export default PaymentManagement;
