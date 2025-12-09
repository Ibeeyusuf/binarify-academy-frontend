declare const api: import("axios").AxiosInstance;
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
    password: string;
    confirmPassword: string;
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
    errors?: Array<{
        field: string;
        message: string;
    }>;
    pagination?: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    };
}
export declare const authService: {
    register: (userData: any) => Promise<ApiResponse>;
    login: (email: string, password: string) => Promise<ApiResponse>;
    logout: () => Promise<ApiResponse>;
    getCurrentUser: () => Promise<ApiResponse>;
    updateProfile: (profileData: any) => Promise<ApiResponse>;
    changePassword: (currentPassword: string, newPassword: string) => Promise<ApiResponse>;
    forgotPassword: (email: string) => Promise<ApiResponse>;
    resetPassword: (token: string, password: string) => Promise<ApiResponse>;
    verifyEmail: (token: string) => Promise<ApiResponse>;
    resendVerificationEmail: (email: string) => Promise<ApiResponse>;
};
export declare const applicationService: {
    submitApplication: (applicationData: SubmitApplicationRequest) => Promise<ApiResponse>;
    getAllApplications: (params?: any) => Promise<ApiResponse>;
    getApplicationById: (id: string) => Promise<ApiResponse>;
    updateApplicationStatus: (id: string, status: string, adminNotes?: string) => Promise<ApiResponse>;
    getApplicationStats: () => Promise<ApiResponse>;
};
export declare const userService: {
    getAllUsers: (params?: any) => Promise<ApiResponse>;
    getUserById: (id: string) => Promise<ApiResponse>;
    updateUser: (id: string, userData: any) => Promise<ApiResponse>;
    deleteUser: (id: string) => Promise<ApiResponse>;
    getUserStats: () => Promise<ApiResponse>;
    assignApplications: (reviewerId: string, applicationIds: string[]) => Promise<ApiResponse>;
    getReviewerApplications: (reviewerId: string, params?: any) => Promise<ApiResponse>;
};
export default api;
//# sourceMappingURL=api.d.ts.map