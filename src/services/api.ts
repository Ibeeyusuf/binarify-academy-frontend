import axios from 'axios';

// Create axios instance - FIXED for Vite
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
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
      } catch (refreshError) {
        // If refresh fails, clear tokens and redirect to login
        localStorage.removeItem('token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Types
export interface SubmitApplicationRequest {
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  phone: string;
  country: string;
  state: string;
  track: string;
  program: string;
  motivation: string;
  agreeToTerms: boolean;
  
  // NEW: Password fields (REQUIRED)
  password: string;
  confirmPassword: string;
  
  // Optional fields
  education?: string;
  experience?: string;
  currentRole?: string;
  goals?: string;
  preferredStartDate?: string;
  availableHours?: string;
  referralSource?: string;
  hasLaptop?: boolean;
  wantsUpdates?: boolean;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Array<{ field: string; message: string }>;
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

// Auth Service
export const authService = {
  // Register (admin only)
  register: async (userData: any): Promise<ApiResponse> => {
    const response = await api.post<ApiResponse>('/auth/register', userData);
    return response.data;
  },

  // Login
  login: async (email: string, password: string): Promise<ApiResponse> => {
    const response = await api.post<ApiResponse>('/auth/login', { email, password });
    
    if (response.data.success) {
      localStorage.setItem('token', response.data.data?.token || '');
    }
    
    return response.data;
  },

  // Logout
  logout: async (): Promise<ApiResponse> => {
    const response = await api.post<ApiResponse>('/auth/logout');
    localStorage.removeItem('token');
    return response.data;
  },

  // Get current user
  getCurrentUser: async (): Promise<ApiResponse> => {
    const response = await api.get<ApiResponse>('/auth/me');
    return response.data;
  },

  // Update profile
  updateProfile: async (profileData: any): Promise<ApiResponse> => {
    const response = await api.put<ApiResponse>('/auth/profile', profileData);
    return response.data;
  },

  // Change password
  changePassword: async (currentPassword: string, newPassword: string): Promise<ApiResponse> => {
    const response = await api.put<ApiResponse>('/auth/change-password', {
      currentPassword,
      newPassword
    });
    return response.data;
  },

  // Forgot password
  forgotPassword: async (email: string): Promise<ApiResponse> => {
    const response = await api.post<ApiResponse>('/auth/forgot-password', { email });
    return response.data;
  },

  // Reset password
  resetPassword: async (token: string, password: string): Promise<ApiResponse> => {
    const response = await api.post<ApiResponse>(`/auth/reset-password/${token}`, { password });
    return response.data;
  },

  // Verify email
  verifyEmail: async (token: string): Promise<ApiResponse> => {
    const response = await api.get<ApiResponse>(`/auth/verify-email/${token}`);
    return response.data;
  },

  // Resend verification email
  resendVerificationEmail: async (email: string): Promise<ApiResponse> => {
    const response = await api.post<ApiResponse>('/auth/verify-email/resend', { email });
    return response.data;
  }
};

// Application Service
export const applicationService = {
  // Submit application
  submitApplication: async (applicationData: SubmitApplicationRequest): Promise<ApiResponse> => {
    try {
      const response = await api.post<ApiResponse>('/applications/submit', applicationData);
      return response.data;
    } catch (error: any) {
      // Handle network errors or backend errors
      if (error.response?.data) {
        return error.response.data;
      }
      throw error;
    }
  },

  // Get all applications (admin only)
  getAllApplications: async (params: any = {}): Promise<ApiResponse> => {
    const response = await api.get<ApiResponse>('/applications', { params });
    return response.data;
  },

  // Get application by ID
  getApplicationById: async (id: string): Promise<ApiResponse> => {
    const response = await api.get<ApiResponse>(`/applications/${id}`);
    return response.data;
  },

  // Update application status (admin only)
  updateApplicationStatus: async (id: string, status: string, adminNotes?: string): Promise<ApiResponse> => {
    const response = await api.patch<ApiResponse>(`/applications/${id}/status`, {
      status,
      adminNotes
    });
    return response.data;
  },

  // Get application statistics
  getApplicationStats: async (): Promise<ApiResponse> => {
    const response = await api.get<ApiResponse>('/applications/stats');
    return response.data;
  }
};

// User Service
export const userService = {
  // Get all users (admin only)
  getAllUsers: async (params: any = {}): Promise<ApiResponse> => {
    const response = await api.get<ApiResponse>('/users', { params });
    return response.data;
  },

  // Get user by ID
  getUserById: async (id: string): Promise<ApiResponse> => {
    const response = await api.get<ApiResponse>(`/users/${id}`);
    return response.data;
  },

  // Update user (admin only)
  updateUser: async (id: string, userData: any): Promise<ApiResponse> => {
    const response = await api.put<ApiResponse>(`/users/${id}`, userData);
    return response.data;
  },

  // Delete user (admin only)
  deleteUser: async (id: string): Promise<ApiResponse> => {
    const response = await api.delete<ApiResponse>(`/users/${id}`);
    return response.data;
  },

  // Get user statistics
  getUserStats: async (): Promise<ApiResponse> => {
    const response = await api.get<ApiResponse>('/users/stats');
    return response.data;
  },

  // Assign applications to reviewer
  assignApplications: async (reviewerId: string, applicationIds: string[]): Promise<ApiResponse> => {
    const response = await api.post<ApiResponse>('/users/assign-applications', {
      reviewerId,
      applicationIds
    });
    return response.data;
  },  

  // Get reviewer's assigned applications
  getReviewerApplications: async (reviewerId: string, params: any = {}): Promise<ApiResponse> => {
    const response = await api.get<ApiResponse>(`/users/${reviewerId}/assigned-applications`, { params });
    return response.data;
  }
};

export default api;