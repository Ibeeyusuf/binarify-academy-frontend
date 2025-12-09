export interface InitializePaymentRequest {
    applicationId: string;
    program: string;
    track: string;
    amount: number;
    email: string;
    metadata?: Record<string, any>;
}
export interface PaymentResponse {
    success: boolean;
    data: {
        authorization_url: string;
        reference: string;
        access_code: string;
    };
    message?: string;
}
export interface VerifyPaymentRequest {
    reference: string;
}
export interface VerifyPaymentResponse {
    success: boolean;
    data: {
        status: string;
        reference: string;
        amount: number;
        paid_at: string;
        metadata: any;
    };
    message?: string;
}
export interface PaymentHistoryItem {
    _id: string;
    amount: number;
    currency: string;
    status: string;
    reference: string;
    paidAt?: string;
    createdAt: string;
    application: {
        program: string;
        track: string;
        createdAt: string;
    };
}
export interface PaymentHistoryResponse {
    success: boolean;
    data: {
        payments: PaymentHistoryItem[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    };
}
declare class PaymentService {
    initializePayment(data: InitializePaymentRequest): Promise<PaymentResponse>;
    verifyPayment(reference: string): Promise<VerifyPaymentResponse>;
    getPaymentHistory(page?: number, limit?: number): Promise<PaymentHistoryResponse>;
    getPaymentDetails(paymentId: string): Promise<any>;
    checkPendingPayments(): Promise<any>;
}
declare const _default: PaymentService;
export default _default;
//# sourceMappingURL=paymentService.d.ts.map