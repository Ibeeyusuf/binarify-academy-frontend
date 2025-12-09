// src/pages/dashboard/UserDashboard.tsx
import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { 
  BookOpen, 
  FileText, 
  CreditCard, 
  CheckCircle,
  Calendar,
  TrendingUp,
  Users,
  Clock
} from 'lucide-react';
import { dashboardService } from '../../services/api/dashboardService';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';

const UserDashboard: React.FC = () => {
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
      
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const statsData = [
    { label: 'Active Applications', value: stats.activeApplications, icon: <FileText className="h-5 w-5" /> },
    { label: 'Completed Courses', value: stats.completedCourses, icon: <CheckCircle className="h-5 w-5" /> },
    { label: 'Total Payments', value: `₦${stats.totalPayments?.toLocaleString()}`, icon: <CreditCard className="h-5 w-5" /> },
    { label: 'Study Progress', value: `${stats.studyProgress}%`, icon: <TrendingUp className="h-5 w-5" /> },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.firstName}!</h1>
          <p className="text-gray-600 mt-2">Here's what's happening with your applications</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          New Application
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <div className="text-blue-600">{stat.icon}</div>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Applications */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Recent Applications</h2>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
            <div className="space-y-4">
              {recentApplications.length > 0 ? (
                recentApplications.map((app: any) => (
                  <div key={app._id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{app.program}</h3>
                      <p className="text-sm text-gray-500">Applied on {new Date(app.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        app.status === 'approved' ? 'bg-green-100 text-green-800' :
                        app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </span>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">No applications yet</p>
              )}
            </div>
          </Card>
        </div>

        {/* Quick Actions & Upcoming */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <BookOpen className="h-4 w-4 mr-2" />
                Browse Programs
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <CreditCard className="h-4 w-4 mr-2" />
                Make Payment
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                View Schedule
              </Button>
            </div>
          </Card>

          {/* Upcoming Payments */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Upcoming Payments</h2>
            <div className="space-y-3">
              {upcomingPayments.length > 0 ? (
                upcomingPayments.map((payment: any) => (
                  <div key={payment._id} className="p-3 border rounded-lg">
                    <div className="flex justify-between">
                      <h3 className="font-medium">Tuition Fee</h3>
                      <span className="font-bold">₦{payment.amount?.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center mt-2 text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      Due: {new Date(payment.dueDate).toLocaleDateString()}
                    </div>
                    <Button className="w-full mt-3" size="sm">
                      Pay Now
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No upcoming payments</p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;