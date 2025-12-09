import api from '../api';

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

class PaymentService {
  async initializePayment(data: InitializePaymentRequest): Promise<PaymentResponse> {
    const response = await api.post('/payments/initialize', data);
    return response.data;
  }

  async verifyPayment(reference: string): Promise<VerifyPaymentResponse> {
    const response = await api.get(`/payments/verify?reference=${reference}`);
    return response.data;
  }

  async getPaymentHistory(page = 1, limit = 10): Promise<PaymentHistoryResponse> {
    const response = await api.get(`/payments/history?page=${page}&limit=${limit}`);
    return response.data;
  }

  async getPaymentDetails(paymentId: string) {
    const response = await api.get(`/payments/${paymentId}`);
    return response.data;
  }

  async checkPendingPayments() {
    const response = await api.get('/payments/pending');
    return response.data;
  }
}

export default new PaymentService();