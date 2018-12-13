import HttpClient  from './http-client';

export default {
    removeProxies() {
    },
    
    getInstaConfig() {
        return HttpClient.get('/admin/instaconfigs');
    },

    saveInstaConfig(config) {
        return HttpClient.put('/admin/instaconfigs', config);
    }
}