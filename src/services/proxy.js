import HttpClient from './http-client';
export default {
  getAllProxy(pageNum) {
    const url = pageNum ? `/admin/proxies?page=${pageNum}` : `/admin/proxies`;
    return HttpClient.get(url);
  },
  addProxy(proxy) {
    return HttpClient.post('/admin/proxies', proxy);
  },
  editProxy(proxy) {
    return HttpClient.put(`/admin/proxies/${proxy.id}`, proxy);
  },
  getProxy(id) {
    return HttpClient.get(`/admin/proxies/${id}`);
  }
}
