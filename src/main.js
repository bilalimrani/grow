import Vue from 'vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import Resource from 'vue-resource'
import VueRouter from 'vue-router'
import store from './store'
import vueHeadful from 'vue-headful';
import VueStripeCheckout from 'vue-stripe-checkout/dist/index';
import constants from './constants'
Vue.use(require('vue-moment'));

import VeeValidate, {
  Validator
} from 'vee-validate'
// import VueAnalytics from 'vue-analytics'
import router from './router/index'
import Snotify, {
  SnotifyPosition
} from 'vue-snotify'
import VModal from 'vue-js-modal'
import numeral from 'numeral'

const customErrorDict = {
  custom: {
    confirmPassword: {
      required: 'Confirm password field is required.',
      min: 'Confirm password must be at least 6 characters.'
    },
    fname: {
      required: 'First name field is required.'
    },
    lname: {
      required: 'Last name field is required.'
    },
    email: {
      email: 'Email field must be a valid email.'
    },
    emailReset: {
      email: 'Email field must be a valid email.',
      required: 'Enter your email address below to reset password.'
    },
    password: {
      min: 'Password field must be at least 6 characters.'
    },
    min_likes_count: {
      required: 'The min like count field is required',
      min_value: 'Min like count should be 0 or more',
      max_value: 'The min likes count must be less than or equal to max like count'
    },
    max_like_count: {
      required: 'The max like count field is required',
      min_value: 'Max like count should be 0 or more'
    },
    max_media_age: {
      required: 'The max media age field is required'
    }
  }
}

// Resource logic
Vue.use(Resource)
Vue.http.options.emulateJSON = true
Vue.use(VueRouter)
Vue.use(ElementUI, {
  locale
})
Vue.use(VeeValidate)
Vue.use(VModal)
// Register stripe with configuration
// this configuration can be overridden 
// in the .open(options) 
Vue.use(VueStripeCheckout, 'pk_test_Vgle6aEOYjGIxkvczWdB8f7V',);
Vue.component('vue-headful', vueHeadful);
// Filter to make single digit number as two digit by appending 0 in front
Vue.filter('two_digits', function (value) {
  if (value.toString().length <= 1) {
    return "0" + value.toString();
  }
  return value.toString();
});

Vue.filter('sanitizeNull', (val, msg = 0) => {
  if (val) {
    return val;
  } else {
    return msg;
  }
});

Vue.filter("formatNumber", function (value) {
  return numeral(value).format("0,0"); // displaying other groupings/separators is possible, look at the docs
});


const EmailExistValidator = {
  getMessage(field, args) {
    return `The ${field} already exist`;
  },
  validate(value, args) {
    return args[0] === 'true' ? false : true;
  }
};

//Vee-validator config
Validator.localize('en', customErrorDict);
Validator.extend('emailExist', EmailExistValidator);
// Import top level component
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
//  for element 1.9.9 below
// import 'element-ui/lib/theme-default/index.css'
import 'element-ui/lib/theme-chalk/index.css'

const options = {
  toast: {
    position: SnotifyPosition.rightTop,
    showProgressBar: false,
    timeout: 3000
  }
}

Vue.use(Snotify, options)
// Check local storage to handle refreshes
if (window.localStorage) {
  if (store.state.token !== window.localStorage.getItem('token')) {
    store.commit('SET_TOKEN', window.localStorage.getItem('token'))
  }
}

// Start out app!
// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App)
})

// Vue.use(VueAnalytics, {
//   id: 'UA-50964111-9',
//   router
// })
// fbq('init', '194917564616639');
// fbq('init', '194917564616639');

require('bootstrap')
// require('admin-lte')
require('../node_modules/admin-lte/plugins/slimScroll/jquery.slimscroll.js')
require('../node_modules/admin-lte/dist/js/app.js')
// require('../node_modules/admin-lte/dist/js/demo.js')
