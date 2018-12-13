import httpClient from './http-client'
import User from './user'
import router from '../router/index'

const authService = {

    login(email, password){
        return httpClient
        .post('login', { 'email': email, 'password': password})
        .then(res => {
          this.storeAccessToken(res.data.data.api_token)
          // router.push('/')
          return res;
        })
    },

    getAccessToken() {
      return localStorage.getItem('api_token')
    },

    isUserLoggedIn() {
      return this.getAccessToken() ? true : false
    },

    storeAccessToken(token) {
      localStorage.setItem('api_token', token)
    },

    removeAccessToken() {
      localStorage.removeItem('api_token')
    },

    logout() {
      this.removeAccessToken();
      User.user = '';
      User.instaAccount = '';
      router.push('/login');
    }
}

export default authService