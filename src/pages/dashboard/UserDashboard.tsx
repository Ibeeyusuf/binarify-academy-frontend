// src/pages/dashboard/UserDashboard.tsx
import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { 
  FileText, 
  CheckCircle, 
  CreditCard, 
  TrendingUp,
  Calendar,
  Plus,
  ChevronRight,
  Clock,
  AlertCircle,
  Download,
  Eye,
  Filter,
  MoreHorizontal,
  RefreshCw,
  Users,
  BookOpen,
  DollarSign,
  CheckSquare
} from 'lucide-react';
import { dashboardService } from '../../services/api/dashboardService';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';

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
      const [statsRes, appsRes, paymentsRes] = await Promise.all([
        dashboardService.getUserStats(),
        dashboardService.getUserApplications(1, 5),
        dashboardService.getUserPayments(1, 5)
      ]);
      
      setStats(statsRes.data);
      setRecentApplications(appsRes.data.applications);
      setUpcomingPayments(paymentsRes.data.payments.filter(p => p.status === 'pending'));
      
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const getStatusConfig = (status: string) => {
    const configs = {
      approved: { 
        color: 'text-green-600', 
        bg: 'bg-green-50', 
        border: 'border-green-100',
        icon: <CheckCircle className="h-4 w-4" />
      },
      pending: { 
        color: 'text-amber-600', 
        bg: 'bg-amber-50', 
        border: 'border-amber-100',
        icon: <Clock className="h-4 w-4" />
      },
      rejected: { 
        color: 'text-red-600', 
        bg: 'bg-red-50', 
        border: 'border-red-100',
        icon: <AlertCircle className="h-4 w-4" />
      },
      draft: { 
        color: 'text-gray-600', 
        bg: 'bg-gray-50', 
        border: 'border-gray-100',
        icon: <FileText className="h-4 w-4" />
      }
    };
    return configs[status as keyof typeof configs] || configs.draft;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-blue-600 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="text-gray-500 mt-1">Track your applications and progress</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm"
            onClick={fetchDashboardData}
            className="h-9 px-3"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button className="h-9 px-4 bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            New Application
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Applications</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.activeApplications}</p>
            </div>
            <div className="p-2.5 bg-blue-50 rounded-lg">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          <div className="flex items-center text-sm text-gray-500 mt-4">
            <Clock className="h-4 w-4 mr-1" />
            <span>Currently in review</span>
          </div>
        </Card>

        <Card className="p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed Courses</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.completedCourses}</p>
            </div>
            <div className="p-2.5 bg-green-50 rounded-lg">
              <CheckSquare className="h-5 w-5 text-green-600" />
            </div>
          </div>
          <div className="flex items-center text-sm text-gray-500 mt-4">
            <CheckCircle className="h-4 w-4 mr-1" />
            <span>All time completed</span>
          </div>
        </Card>

        <Card className="p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Payments</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                ₦{stats.totalPayments?.toLocaleString()}
              </p>
            </div>
            <div className="p-2.5 bg-purple-50 rounded-lg">
              <DollarSign className="h-5 w-5 text-purple-600" />
            </div>
          </div>
          <div className="flex items-center text-sm text-gray-500 mt-4">
            <CreditCard className="h-4 w-4 mr-1" />
            <span>Lifetime total</span>
          </div>
        </Card>

        <Card className="p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Study Progress</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.studyProgress}%</p>
            </div>
            <div className="p-2.5 bg-amber-50 rounded-lg">
              <TrendingUp className="h-5 w-5 text-amber-600" />
            </div>
          </div>
          <div className="mt-4">
            <Progress value={stats.studyProgress} className="h-2" />
            <p className="text-xs text-gray-500 mt-2">Overall completion rate</p>
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Applications - Takes 2/3 on large screens */}
        <div className="lg:col-span-2">
          <Card className="p-4 border border-gray-100 shadow-sm">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Recent Applications</h2>
                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                  View all
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
            
            <div className="divide-y divide-gray-100">
              {recentApplications.length > 0 ? (
                recentApplications.map((app: any) => {
                  const status = getStatusConfig(app.status);
                  return (
                    <div key={app._id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${status.bg} ${status.border}`}>
                              {status.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-gray-900 truncate">
                                {app.program}
                              </h3>
                              <p className="text-sm text-gray-500 mt-1">
                                Applied on {new Date(app.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 ml-4">
                          <Badge 
                            variant="outline"
                            className={`${status.bg} ${status.color} border-0 font-medium`}
                          >
                            {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                          </Badge>
                          
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-8 text-center">
                  <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="font-medium text-gray-900 mb-2">No applications yet</h3>
                  <p className="text-gray-500 mb-4">Start your first application to get started</p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Application
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Right Sidebar - Takes 1/3 on large screens */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="border border-gray-100 shadow-sm p-4">
            <div className="p-5 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">Quick Actions</h2>
            </div>
            <div className="p-5 space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start h-11 hover:bg-gray-50"
              >
                <BookOpen className="h-4 w-4 mr-3 text-blue-600" />
                Browse Programs
                <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start h-11 hover:bg-gray-50"
              >
                <CreditCard className="h-4 w-4 mr-3 text-green-600" />
                Make Payment
                <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start h-11 hover:bg-gray-50"
              >
                <Calendar className="h-4 w-4 mr-3 text-purple-600" />
                View Schedule
                <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start h-11 hover:bg-gray-50"
              >
                <Download className="h-4 w-4 mr-3 text-amber-600" />
                Download Documents
                <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
              </Button>
            </div>
          </Card>

          {/* Upcoming Payments */}
          <Card className="border border-gray-100 shadow-sm p-4">
            <div className="p-5 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-gray-900">Upcoming Payments</h2>
                <Badge variant="secondary" className="bg-red-50 text-red-700">
                  {upcomingPayments.length} Due
                </Badge>
              </div>
            </div>
            
            <div className="p-5 space-y-4">
              {upcomingPayments.length > 0 ? (
                upcomingPayments.slice(0, 3).map((payment: any) => {
                  const dueDate = new Date(payment.dueDate);
                  const daysUntilDue = Math.ceil((dueDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                  
                  return (
                    <div key={payment._id} className="p-4 border border-gray-100 rounded-lg bg-white">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-medium text-gray-900">{payment.description}</h3>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <Calendar className="h-4 w-4 mr-1.5" />
                            Due {dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </div>
                        </div>
                        <p className="font-semibold text-gray-900">₦{payment.amount?.toLocaleString()}</p>
                      </div>
                      
                      {daysUntilDue <= 7 && (
                        <div className="flex items-center text-sm text-amber-600 bg-amber-50 px-3 py-2 rounded-md mb-3">
                          <AlertCircle className="h-4 w-4 mr-2" />
                          {daysUntilDue <= 0 ? 'Payment overdue' : `Due in ${daysUntilDue} days`}
                        </div>
                      )}
                      
                      <Button className="w-full h-9 bg-green-600 hover:bg-green-700">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Pay Now
                      </Button>
                    </div>
                  );
                })
              ) : (
                <div className="py-6 text-center">
                  <CreditCard className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No upcoming payments</p>
                </div>
              )}
            </div>
          </Card>

          
          
        </div>
        {/* Progress Summary */}
        <Card className="border border-gray-100 shadow-sm p-4">
            <div className="p-5">
              <h2 className="font-semibold text-gray-900 mb-4">Study Progress</h2>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">Current Progress</span>
                    <span className="font-medium text-gray-900">{stats.studyProgress}%</span>
                  </div>
                  <Progress value={stats.studyProgress} className="h-2" />
                </div>
                
                <div className="grid grid-cols-2 gap-3 pt-4 border-t">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <p className="text-xl font-bold text-blue-600">12</p>
                    <p className="text-xs text-gray-600 mt-1">Courses Taken</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <p className="text-xl font-bold text-green-600">8</p>
                    <p className="text-xs text-gray-600 mt-1">Completed</p>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full mt-4">
                  View Detailed Progress
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </Card>
      </div>
    </div>
  );
};

export default UserDashboard;