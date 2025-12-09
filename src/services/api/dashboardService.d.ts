export declare const dashboardService: {
    getUserStats: () => Promise<any>;
    getUserApplications: (page?: number, limit?: number) => Promise<any>;
    getUserPayments: (page?: number, limit?: number) => Promise<any>;
    updateProfile: (data: any) => Promise<any>;
    changePassword: (currentPassword: string, newPassword: string) => Promise<any>;
};
export declare const adminService: {
    getAdminStats: () => Promise<any>;
    getUsers: (page?: number, limit?: number, filters?: {}) => Promise<any>;
    updateUser: (userId: string, data: any) => Promise<any>;
    deleteUser: (userId: string) => Promise<any>;
    getAllApplications: (page?: number, limit?: number, filters?: {}) => Promise<any>;
    updateApplicationStatus: (applicationId: string, status: string) => Promise<any>;
    getAllPayments: (page?: number, limit?: number, filters?: {}) => Promise<any>;
    getAnalytics: (period?: string) => Promise<any>;
};
//# sourceMappingURL=dashboardService.d.ts.map