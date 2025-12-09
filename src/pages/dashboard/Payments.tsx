// src/pages/dashboard/Payments.tsx
import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { CreditCard, CheckCircle, XCircle, Clock, Search, Filter } from 'lucide-react';
import { dashboardService } from '../../services/api/dashboardService';
import { Input } from '../../components/ui/input';
import { toast } from 'sonner';

const Payments: React.FC = () => {
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
    } catch (error) {
      toast.error('Failed to load payments');
    } finally {
      setLoading(false);
    }
  };

  const filteredPayments = payments.filter(payment =>
    payment.reference?.toLowerCase().includes(search.toLowerCase()) ||
    payment.status?.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'pending': return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'failed': return <XCircle className="h-5 w-5 text-red-600" />;
      default: return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  const formatAmount = (amount: number) => {
    return `₦${(amount / 100).toLocaleString()}`;
  };

  const handlePayment = async (paymentId: string) => {
    // Implement payment logic
    toast.info('Redirecting to payment gateway...');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Payment History</h1>
      
      {/* Search and Filters */}
      <Card className="p-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search payments..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading payments...</p>
          </div>
        ) : filteredPayments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Reference</th>
                  <th className="text-left py-3 px-4">Description</th>
                  <th className="text-left py-3 px-4">Amount</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment: any) => (
                  <tr key={payment._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-mono text-sm">{payment.reference}</td>
                    <td className="py-3 px-4">
                      {payment.metadata?.description || 'Payment for application'}
                    </td>
                    <td className="py-3 px-4 font-medium">{formatAmount(payment.amount)}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        {getStatusIcon(payment.status)}
                        <span className="ml-2 capitalize">{payment.status}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {new Date(payment.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      {payment.status === 'pending' ? (
                        <Button 
                          size="sm" 
                          className="bg-blue-600 hover:bg-blue-700"
                          onClick={() => handlePayment(payment._id)}
                        >
                          <CreditCard className="h-4 w-4 mr-1" />
                          Pay Now
                        </Button>
                      ) : payment.status === 'success' ? (
                        <Button size="sm" variant="outline">
                          View Receipt
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline">
                          Retry Payment
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <span className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No payment history found</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Payments;