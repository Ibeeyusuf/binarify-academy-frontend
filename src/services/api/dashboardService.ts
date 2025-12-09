// src/services/api/dashboardService.ts
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// User Dashboard APIs
export const dashboardService = {
  // User Dashboard Stats
  getUserStats: async () => {
    const response = await axios.get(`${API_URL}/dashboard/stats`);
    return response.data;
  },

  // User Applications
  getUserApplications: async (page = 1, limit = 10) => {
    const response = await axios.get(`${API_URL}/applications/user`, {
      params: { page, limit }
    });
    return response.data;
  },

  // User Payments
  getUserPayments: async (page = 1, limit = 10) => {
    const response = await axios.get(`${API_URL}/payments/history`, {
      params: { page, limit }
    });
    return response.data;
  },

  // Update Profile
  updateProfile: async (data: any) => {
    const response = await axios.put(`${API_URL}/users/profile`, data);
    return response.data;
  },

  // Change Password
  changePassword: async (currentPassword: string, newPassword: string) => {
    const response = await axios.put(`${API_URL}/users/change-password`, {
      currentPassword,
      newPassword
    });
    return response.data;
  }
};

// Admin Dashboard APIs
export const adminService = {
  // Admin Stats
  getAdminStats: async () => {
    const response = await axios.get(`${API_URL}/admin/stats`);
    return response.data;
  },

  // User Management
  getUsers: async (page = 1, limit = 10, filters = {}) => {
    const response = await axios.get(`${API_URL}/admin/users`, {
      params: { page, limit, ...filters }
    });
    return response.data;
  },

  updateUser: async (userId: string, data: any) => {
    const response = await axios.put(`${API_URL}/admin/users/${userId}`, data);
    return response.data;
  },

  deleteUser: async (userId: string) => {
    const response = await axios.delete(`${API_URL}/admin/users/${userId}`);
    return response.data;
  },

  // Application Management
  getAllApplications: async (page = 1, limit = 10, filters = {}) => {
    const response = await axios.get(`${API_URL}/admin/applications`, {
      params: { page, limit, ...filters }
    });
    return response.data;
  },

  updateApplicationStatus: async (applicationId: string, status: string) => {
    const response = await axios.put(`${API_URL}/admin/applications/${applicationId}/status`, {
      status
    });
    return response.data;
  },

  // Payment Management
  getAllPayments: async (page = 1, limit = 10, filters = {}) => {
    const response = await axios.get(`${API_URL}/admin/payments`, {
      params: { page, limit, ...filters }
    });
    return response.data;
  },

  // Analytics
  getAnalytics: async (period = 'monthly') => {
    const response = await axios.get(`${API_URL}/admin/analytics`, {
      params: { period }
    });
    return response.data;
  }
};