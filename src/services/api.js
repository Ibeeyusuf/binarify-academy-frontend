import axios from 'axios';
import { baseURL } from '../constant';
// Create axios instance - FIXED for Vite
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || `${baseURL}/api`,
    headers: {
        'Content-Type': 'application/json',
    },
});
// Request interceptor to add token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));
// Response interceptor to handle token expiration
api.interceptors.response.use((response) => response, async (error) => {
    const originalRequest = error.config;
    // If error is 401 and we haven't tried to refresh yet
    if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
            // Try to refresh token (if you implement refresh tokens)
            // const refreshToken = localStorage.getItem('refreshToken');
            // const response = await axios.post('/auth/refresh', { refreshToken });
            // localStorage.setItem('token', response.data.token);
            // Retry the original request
            // return api(originalRequest);
        }
        catch (refreshError) {
            // If refresh fails, clear tokens and redirect to login
            localStorage.removeItem('token');
            window.location.href = '/login';
            return Promise.reject(refreshError);
        }
    }
    return Promise.reject(error);
});
// Auth Service
export const authService = {
    // Register (admin only)
    register: async (userData) => {
        const response = await api.post('/auth/register', userData);
        return response.data;
    },
    // Login
    login: async (email, password) => {
        const response = await api.post('/auth/login', { email, password });
        if (response.data.success) {
            localStorage.setItem('token', response.data.data?.token || '');
        }
        return response.data;
    },
    // Logout
    logout: async () => {
        const response = await api.post('/auth/logout');
        localStorage.removeItem('token');
        return response.data;
    },
    // Get current user
    getCurrentUser: async () => {
        const response = await api.get('/auth/me');
        return response.data;
    },
    // Update profile
    updateProfile: async (profileData) => {
        const response = await api.put('/auth/profile', profileData);
        return response.data;
    },
    // Change password
    changePassword: async (currentPassword, newPassword) => {
        const response = await api.put('/auth/change-password', {
            currentPassword,
            newPassword
        });
        return response.data;
    },
    // Forgot password
    forgotPassword: async (email) => {
        const response = await api.post('/auth/forgot-password', { email });
        return response.data;
    },
    // Reset password
    resetPassword: async (token, password) => {
        const response = await api.post(`/auth/reset-password/${token}`, { password });
        return response.data;
    },
    // Verify email
    verifyEmail: async (token) => {
        const response = await api.get(`/auth/verify-email/${token}`);
        return response.data;
    },
    // Resend verification email
    resendVerificationEmail: async (email) => {
        const response = await api.post('/auth/verify-email/resend', { email });
        return response.data;
    }
};
// Application Service
export const applicationService = {
    // Submit application
    submitApplication: async (applicationData) => {
        try {
            const response = await api.post('/applications/submit', applicationData);
            return response.data;
        }
        catch (error) {
            // Handle network errors or backend errors
            if (error.response?.data) {
                return error.response.data;
            }
            throw error;
        }
    },
    // Get all applications (admin only)
    getAllApplications: async (params = {}) => {
        const response = await api.get('/applications', { params });
        return response.data;
    },
    // Get application by ID
    getApplicationById: async (id) => {
        const response = await api.get(`/applications/${id}`);
        return response.data;
    },
    // Update application status (admin only)
    updateApplicationStatus: async (id, status, adminNotes) => {
        const response = await api.patch(`/applications/${id}/status`, {
            status,
            adminNotes
        });
        return response.data;
    },
    // Get application statistics
    getApplicationStats: async () => {
        const response = await api.get('/applications/stats');
        return response.data;
    }
};
// User Service
export const userService = {
    // Get all users (admin only)
    getAllUsers: async (params = {}) => {
        const response = await api.get('/users', { params });
        return response.data;
    },
    // Get user by ID
    getUserById: async (id) => {
        const response = await api.get(`/users/${id}`);
        return response.data;
    },
    // Update user (admin only)
    updateUser: async (id, userData) => {
        const response = await api.put(`/users/${id}`, userData);
        return response.data;
    },
    // Delete user (admin only)
    deleteUser: async (id) => {
        const response = await api.delete(`/users/${id}`);
        return response.data;
    },
    // Get user statistics
    getUserStats: async () => {
        const response = await api.get('/users/stats');
        return response.data;
    },
    // Assign applications to reviewer
    assignApplications: async (reviewerId, applicationIds) => {
        const response = await api.post('/users/assign-applications', {
            reviewerId,
            applicationIds
        });
        return response.data;
    },
    // Get reviewer's assigned applications
    getReviewerApplications: async (reviewerId, params = {}) => {
        const response = await api.get(`/users/${reviewerId}/assigned-applications`, { params });
        return response.data;
    }
};
export default api;
