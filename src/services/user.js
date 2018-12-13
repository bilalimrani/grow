import httpClient from './http-client';
import EventBus from './event-bus.js';
import store from '../store'

export default {
  user: '',
  instaAccount: '',
  getInfo() {
    if (this.user) {
      return Promise.resolve(this.user);
    } else {
      return httpClient.get('me').then(res => {
        this.user = res.data.data
        console.log('userReceived event is fired with ', this.user)
        EventBus.$emit('userReceived', this.user)
        return this.user
      });
    }
  },

  resetUserDetails() {
    this.user = '';
  },
  getBio() {
    if (this.instaAccount) {
      return this.instaAccount;
    } else {
      store.state.showSpinner = true
      const accountId = this.user.insta_accounts[0].id;
      return httpClient.get(`accounts/${accountId}/bio`).then(res => {
        store.state.showSpinner = false
        return res
      });
    }
  },
  getAllUsers(pageNum) {
    const url = pageNum ? `admin/users?page=${pageNum}` : `admin/users`;
    return httpClient.get(url);
  },
  getUser(id) {
    // const data = { id: 1, fname: 'romain', lname: 'hoogmoed', status: 'ACTIVE', email: 'romainhoogmoed@gmail.com' };
    // return new Promise((res, rej) => {
    //     res(data);
    // });
    return httpClient.get(`users/${id}`);
  },
  getAdminStats() {
    return httpClient.get('admin/stats');
  },
  setInstaAccount(details) {
    this.instaAccount = details
  },

  addInEmailList(name, email) {
    return httpClient.post(`https://hook.integromat.com/mkd22dvlt4fjxlxjsizwzn6i7utxm3k9`, {
      name: name,
      email: email
    });
  }
}
