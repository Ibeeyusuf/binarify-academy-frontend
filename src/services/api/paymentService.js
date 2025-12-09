import api from '../api';
class PaymentService {
    async initializePayment(data) {
        const response = await api.post('/payments/initialize', data);
        return response.data;
    }
    async verifyPayment(reference) {
        const response = await api.get(`/payments/verify?reference=${reference}`);
        return response.data;
    }
    async getPaymentHistory(page = 1, limit = 10) {
        const response = await api.get(`/payments/history?page=${page}&limit=${limit}`);
        return response.data;
    }
    async getPaymentDetails(paymentId) {
        const response = await api.get(`/payments/${paymentId}`);
        return response.data;
    }
    async checkPendingPayments() {
        const response = await api.get('/payments/pending');
        return response.data;
    }
}
export default new PaymentService();
