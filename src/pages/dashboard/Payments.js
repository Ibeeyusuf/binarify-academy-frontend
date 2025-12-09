import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/dashboard/Payments.tsx
import { useState, useEffect } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { CreditCard, CheckCircle, XCircle, Clock, Search, Filter } from 'lucide-react';
import { dashboardService } from '../../services/api/dashboardService';
import { Input } from '../../components/ui/input';
import { toast } from 'sonner';
const Payments = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    useEffect(() => {
        fetchPayments();
    }, [currentPage]);
    const fetchPayments = async () => {
        try {
            setLoading(true);
            const response = await dashboardService.getUserPayments(currentPage, 10);
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
    const filteredPayments = payments.filter(payment => payment.reference?.toLowerCase().includes(search.toLowerCase()) ||
        payment.status?.toLowerCase().includes(search.toLowerCase()));
    const getStatusIcon = (status) => {
        switch (status) {
            case 'success': return _jsx(CheckCircle, { className: "h-5 w-5 text-green-600" });
            case 'pending': return _jsx(Clock, { className: "h-5 w-5 text-yellow-600" });
            case 'failed': return _jsx(XCircle, { className: "h-5 w-5 text-red-600" });
            default: return _jsx(Clock, { className: "h-5 w-5 text-gray-600" });
        }
    };
    const formatAmount = (amount) => {
        return `₦${(amount / 100).toLocaleString()}`;
    };
    const handlePayment = async (paymentId) => {
        // Implement payment logic
        toast.info('Redirecting to payment gateway...');
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsx("h1", { className: "text-3xl font-bold", children: "Payment History" }), _jsx(Card, { className: "p-4", children: _jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs("div", { className: "flex-1 relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" }), _jsx(Input, { placeholder: "Search payments...", className: "pl-10", value: search, onChange: (e) => setSearch(e.target.value) })] }), _jsxs(Button, { variant: "outline", children: [_jsx(Filter, { className: "h-4 w-4 mr-2" }), "Filter"] })] }) }), _jsx(Card, { className: "p-6", children: loading ? (_jsxs("div", { className: "text-center py-12", children: [_jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto" }), _jsx("p", { className: "mt-4 text-gray-600", children: "Loading payments..." })] })) : filteredPayments.length > 0 ? (_jsxs("div", { className: "overflow-x-auto", children: [_jsxs("table", { className: "w-full", children: [_jsx("thead", { children: _jsxs("tr", { className: "border-b", children: [_jsx("th", { className: "text-left py-3 px-4", children: "Reference" }), _jsx("th", { className: "text-left py-3 px-4", children: "Description" }), _jsx("th", { className: "text-left py-3 px-4", children: "Amount" }), _jsx("th", { className: "text-left py-3 px-4", children: "Status" }), _jsx("th", { className: "text-left py-3 px-4", children: "Date" }), _jsx("th", { className: "text-left py-3 px-4", children: "Actions" })] }) }), _jsx("tbody", { children: filteredPayments.map((payment) => (_jsxs("tr", { className: "border-b hover:bg-gray-50", children: [_jsx("td", { className: "py-3 px-4 font-mono text-sm", children: payment.reference }), _jsx("td", { className: "py-3 px-4", children: payment.metadata?.description || 'Payment for application' }), _jsx("td", { className: "py-3 px-4 font-medium", children: formatAmount(payment.amount) }), _jsx("td", { className: "py-3 px-4", children: _jsxs("div", { className: "flex items-center", children: [getStatusIcon(payment.status), _jsx("span", { className: "ml-2 capitalize", children: payment.status })] }) }), _jsx("td", { className: "py-3 px-4", children: new Date(payment.createdAt).toLocaleDateString() }), _jsx("td", { className: "py-3 px-4", children: payment.status === 'pending' ? (_jsxs(Button, { size: "sm", className: "bg-blue-600 hover:bg-blue-700", onClick: () => handlePayment(payment._id), children: [_jsx(CreditCard, { className: "h-4 w-4 mr-1" }), "Pay Now"] })) : payment.status === 'success' ? (_jsx(Button, { size: "sm", variant: "outline", children: "View Receipt" })) : (_jsx(Button, { size: "sm", variant: "outline", children: "Retry Payment" })) })] }, payment._id))) })] }), totalPages > 1 && (_jsxs("div", { className: "flex justify-center items-center space-x-2 mt-6", children: [_jsx(Button, { variant: "outline", size: "sm", onClick: () => setCurrentPage(prev => Math.max(1, prev - 1)), disabled: currentPage === 1, children: "Previous" }), _jsxs("span", { className: "text-sm text-gray-600", children: ["Page ", currentPage, " of ", totalPages] }), _jsx(Button, { variant: "outline", size: "sm", onClick: () => setCurrentPage(prev => Math.min(totalPages, prev + 1)), disabled: currentPage === totalPages, children: "Next" })] }))] })) : (_jsx("div", { className: "text-center py-12", children: _jsx("p", { className: "text-gray-500", children: "No payment history found" }) })) })] }));
};
export default Payments;
