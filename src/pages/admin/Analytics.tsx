// src/pages/admin/Analytics.tsx
import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { 
  Users, 
  TrendingUp, 
  Download, 
  Calendar,
  DollarSign,
  BookOpen,
  CheckCircle,
  Clock
} from 'lucide-react';
import { adminService } from '../../services/api/dashboardService';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';

const Analytics: React.FC = () => {
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
    } catch (error) {
      toast.error('Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    {
      title: 'Total Users',
      value: '1,254',
      change: '+12%',
      icon: <Users className="h-6 w-6" />,
      color: 'bg-blue-500'
    },
    {
      title: 'Active Applications',
      value: '342',
      change: '+8%',
      icon: <BookOpen className="h-6 w-6" />,
      color: 'bg-green-500'
    },
    {
      title: 'Total Revenue',
      value: '₦4.2M',
      change: '+18%',
      icon: <DollarSign className="h-6 w-6" />,
      color: 'bg-purple-500'
    },
    {
      title: 'Completion Rate',
      value: '85%',
      change: '+5%',
      icon: <CheckCircle className="h-6 w-6" />,
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
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-gray-600">Platform performance and insights</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>

          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last_7_days">Last 7 Days</SelectItem>
              <SelectItem value="last_30_days">Last 30 Days</SelectItem>
              <SelectItem value="last_90_days">Last 90 Days</SelectItem>
              <SelectItem value="this_month">This Month</SelectItem>
              <SelectItem value="last_month">Last Month</SelectItem>
              <SelectItem value="this_year">This Year</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" onClick={exportData}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.title}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}>
                <div className={`${stat.color.replace('bg-', 'text-')}`}>
                  {stat.icon}
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-600 font-medium ml-1">
                {stat.change}
              </span>
              <span className="text-sm text-gray-500 ml-2">from last period</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Registrations Chart */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">User Registrations</h2>
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          <div className="h-64 flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">1,254</div>
              <p className="text-gray-600 mt-2">Total Users</p>
              <div className="mt-4 w-48 h-2 bg-gray-200 rounded-full mx-auto">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">75% growth this month</p>
            </div>
          </div>
        </Card>

        {/* Revenue Chart */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Revenue Trend</h2>
            <DollarSign className="h-5 w-5 text-gray-400" />
          </div>
          <div className="h-64 flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">₦4.2M</div>
              <p className="text-gray-600 mt-2">Total Revenue</p>
              <div className="mt-4 w-48 h-2 bg-gray-200 rounded-full mx-auto">
                <div className="h-full bg-green-600 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">85% increase from last month</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activity & Conversion Rates */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <div className="ml-3">
                      <p className="font-medium">{activity.user}</p>
                      <p className="text-sm text-gray-500">{activity.action}</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Conversion Rates */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-6">Conversion Rates</h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Application to Payment</span>
                <span className="text-sm font-bold">65%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Payment to Enrollment</span>
                <span className="text-sm font-bold">92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Course Completion</span>
                <span className="text-sm font-bold">78%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">User Retention</span>
                <span className="text-sm font-bold">85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-orange-600 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Top Programs & Geographic Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Programs */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-6">Top Programs</h2>
          <div className="space-y-4">
            {[
              { program: 'Full Stack Development', students: 245, revenue: '₦1.2M' },
              { program: 'Data Science', students: 189, revenue: '₦950K' },
              { program: 'UI/UX Design', students: 156, revenue: '₦780K' },
              { program: 'Cybersecurity', students: 98, revenue: '₦490K' },
              { program: 'Cloud Computing', students: 76, revenue: '₦380K' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{item.program}</p>
                  <p className="text-sm text-gray-500">{item.students} students</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">{item.revenue}</p>
                  <p className="text-sm text-green-600">+12%</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Geographic Distribution */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-6">Geographic Distribution</h2>
          <div className="space-y-4">
            {[
              { country: 'Nigeria', users: 856, percentage: '68%' },
              { country: 'Ghana', users: 189, percentage: '15%' },
              { country: 'Kenya', users: 98, percentage: '8%' },
              { country: 'South Africa', users: 56, percentage: '4%' },
              { country: 'Other', users: 55, percentage: '5%' },
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <span>{item.country}</span>
                  <span className="font-medium">{item.users} users ({item.percentage})</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: item.percentage }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;