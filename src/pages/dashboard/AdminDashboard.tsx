// src/pages/admin/AdminDashboard.tsx
import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import {
  Users,
  FileText,
  CreditCard,
  TrendingUp,
  CheckCircle,
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { adminService } from '../../services/api/dashboardService';
import { toast } from 'sonner';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalApplications: 0,
    totalRevenue: 0,
    approvalRate: 0,
  });

  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const statsResponse = await adminService.getAdminStats();
      setStats(statsResponse.data);
    } catch (error) {
      toast.error('Failed to load admin dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const statsData = [
    {
      label: 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      icon: <Users className="w-5 h-5" />,
      change: '+12%',
      trend: 'up',
    },
    {
      label: 'Applications',
      value: stats.totalApplications.toLocaleString(),
      icon: <FileText className="w-5 h-5" />,
      change: '+8%',
      trend: 'up',
    },
    {
      label: 'Revenue',
      value: `₦${stats.totalRevenue?.toLocaleString()}`,
      icon: <CreditCard className="w-5 h-5" />,
      change: '+18%',
      trend: 'up',
    },
    {
      label: 'Approval Rate',
      value: `${stats.approvalRate}%`,
      icon: <TrendingUp className="w-5 h-5" />,
      change: '+5%',
      trend: 'up',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Admin Dashboard
          </h1>
          <p className="text-gray-500 text-sm">Analytics & System Overview</p>
        </div>

        <div className="flex space-x-3">
          <Button variant="outline" className="rounded-lg">
            Export Report
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 rounded-lg">
            Generate Analytics
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <Card
            key={index}
            className="p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
              <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                {stat.icon}
              </div>
            </div>

            <div className="mt-4 flex items-center">
              {stat.trend === 'up' ? (
                <ArrowUpRight className="h-4 w-4 text-green-600" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-red-600" />
              )}

              <span
                className={`text-sm font-medium ml-1 ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {stat.change}
              </span>

              <span className="text-sm text-gray-400 ml-2">
                from last month
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card className="p-6 rounded-xl border border-gray-100 shadow-sm">
            <h2 className="text-lg font-semibold mb-5 text-gray-900">
              Recent Activity
            </h2>

            <div className="space-y-4">
              {recentActivities.length > 0 ? (
                recentActivities.map((activity: any, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-xl"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 bg-gray-200 rounded-full"></div>
                      <div>
                        <p className="font-medium">{activity.user}</p>
                        <p className="text-xs text-gray-500">{activity.action}</p>
                      </div>
                    </div>

                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-10">
                  No recent activities
                </p>
              )}
            </div>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Application Status */}
          <Card className="p-6 rounded-xl border border-gray-100 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Application Status</h2>

            <div className="space-y-4">
              <StatusRow
                icon={<CheckCircle className="h-5 w-5 text-green-600" />}
                label="Approved"
                value="245"
              />
              <StatusRow
                icon={<FileText className="h-5 w-5 text-yellow-600" />}
                label="Pending Review"
                value="78"
              />
              <StatusRow
                icon={<XCircle className="h-5 w-5 text-red-600" />}
                label="Rejected"
                value="19"
              />
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6 rounded-xl border border-gray-100 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>

            <div className="space-y-3">
              <Button className="w-full rounded-lg" variant="outline">
                Review Applications
              </Button>
              <Button className="w-full rounded-lg" variant="outline">
                Manage Users
              </Button>
              <Button className="w-full rounded-lg" variant="outline">
                View Reports
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Status Row Component
const StatusRow = ({
  icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center space-x-2">
      {icon}
      <span className="text-gray-700">{label}</span>
    </div>
    <span className="font-bold text-gray-900">{value}</span>
  </div>
);

export default AdminDashboard;
// src/pages/admin/AdminDashboard.tsx
import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import {
  Users,
  FileText,
  CreditCard,
  TrendingUp,
  CheckCircle,
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { adminService } from '../../services/api/dashboardService';
import { toast } from 'sonner';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalApplications: 0,
    totalRevenue: 0,
    approvalRate: 0,
  });

  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const statsResponse = await adminService.getAdminStats();
      setStats(statsResponse.data);
    } catch (error) {
      toast.error('Failed to load admin dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const statsData = [
    {
      label: 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      icon: <Users className="w-5 h-5" />,
      change: '+12%',
      trend: 'up',
    },
    {
      label: 'Applications',
      value: stats.totalApplications.toLocaleString(),
      icon: <FileText className="w-5 h-5" />,
      change: '+8%',
      trend: 'up',
    },
    {
      label: 'Revenue',
      value: `₦${stats.totalRevenue?.toLocaleString()}`,
      icon: <CreditCard className="w-5 h-5" />,
      change: '+18%',
      trend: 'up',
    },
    {
      label: 'Approval Rate',
      value: `${stats.approvalRate}%`,
      icon: <TrendingUp className="w-5 h-5" />,
      change: '+5%',
      trend: 'up',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Admin Dashboard
          </h1>
          <p className="text-gray-500 text-sm">Analytics & System Overview</p>
        </div>

        <div className="flex space-x-3">
          <Button variant="outline" className="rounded-lg">
            Export Report
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 rounded-lg">
            Generate Analytics
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <Card
            key={index}
            className="p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
              <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                {stat.icon}
              </div>
            </div>

            <div className="mt-4 flex items-center">
              {stat.trend === 'up' ? (
                <ArrowUpRight className="h-4 w-4 text-green-600" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-red-600" />
              )}

              <span
                className={`text-sm font-medium ml-1 ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {stat.change}
              </span>

              <span className="text-sm text-gray-400 ml-2">
                from last month
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card className="p-6 rounded-xl border border-gray-100 shadow-sm">
            <h2 className="text-lg font-semibold mb-5 text-gray-900">
              Recent Activity
            </h2>

            <div className="space-y-4">
              {recentActivities.length > 0 ? (
                recentActivities.map((activity: any, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-xl"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 bg-gray-200 rounded-full"></div>
                      <div>
                        <p className="font-medium">{activity.user}</p>
                        <p className="text-xs text-gray-500">{activity.action}</p>
                      </div>
                    </div>

                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-10">
                  No recent activities
                </p>
              )}
            </div>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Application Status */}
          <Card className="p-6 rounded-xl border border-gray-100 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Application Status</h2>

            <div className="space-y-4">
              <StatusRow
                icon={<CheckCircle className="h-5 w-5 text-green-600" />}
                label="Approved"
                value="245"
              />
              <StatusRow
                icon={<FileText className="h-5 w-5 text-yellow-600" />}
                label="Pending Review"
                value="78"
              />
              <StatusRow
                icon={<XCircle className="h-5 w-5 text-red-600" />}
                label="Rejected"
                value="19"
              />
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6 rounded-xl border border-gray-100 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>

            <div className="space-y-3">
              <Button className="w-full rounded-lg" variant="outline">
                Review Applications
              </Button>
              <Button className="w-full rounded-lg" variant="outline">
                Manage Users
              </Button>
              <Button className="w-full rounded-lg" variant="outline">
                View Reports
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Status Row Component
const StatusRow = ({
  icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center space-x-2">
      {icon}
      <span className="text-gray-700">{label}</span>
    </div>
    <span className="font-bold text-gray-900">{value}</span>
  </div>
);

export default AdminDashboard;
