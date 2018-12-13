import httpClient from './http-client';
export default {
    getAll() {
        return httpClient.get('plans');
    }
}