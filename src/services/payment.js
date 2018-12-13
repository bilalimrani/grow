import httpClient from './http-client';
export default {

    getPaymentLink(id) {
        return httpClient.get(`payment/paymentLink/${id}`);
    },

    createSubscription(token, planId) {
        return httpClient.post('subscriptions', { token, planId })
    },

    cancelSubscription() {
        return httpClient.delete('subscriptions');
    },

    changeSubscription(planId) {
        return httpClient.put('subscriptions', { planId })
    },

    getGatewayKey() {
        return httpClient.get('subscriptions/key')
    }

}