/**
 * http-common carries the base instance that allows you to
 * share a common base URL and configuration across all
 * calls to the instance
 */

import config from '../config'
import authService from './auth.service'
import axios from 'axios';
import Vue from 'vue';
import EventBus from './event-bus.js';
import constants from '../constants.js';
import store from '../store'

const httpClient = axios.create({
  baseURL: `${config.api.url}/api/v1/`,
  headers: {
    Accept: 'application/json'
  }
})

/**
 * Register an httpClient request interceptor to attach authorization token
 * with each request from client
 */
httpClient.interceptors.request.use(config => {
  config.headers.Authorization = authService.getAccessToken()
  return config
},
  error => Promise.reject(error))

// intercept each response and setup actions against http status code
httpClient.interceptors.response.use(response => {
  return response;
}, (failure) => {
  store.state.showSpinner = false
  switch (failure.response.status) {
    case 401:
      authService.logout();
      break;
    case 400:
      // EventBus.$emit(constants.errorEvents.badRequest, {});
      break;
    case 403:
      // EventBus.$emit(constants.errorEvents.unAuthorized, {});
      break;
    case 404:
      // EventBus.$emit(constants.errorEvents.notFound, {});
      break;
    case 500:
      EventBus.$emit(constants.errorEvents.serverError, {});
      break;
  }

  return Promise.reject(failure);
});

export default httpClient;