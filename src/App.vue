<template>
  <div id="app" class="wrapper">
    <vue-snotify></vue-snotify>
    <router-view></router-view>
    <insta-spinner></insta-spinner>
    <div class="branding">
      <a href="https://www.sifars.com/" Target="_Blank">
       <p class="branding1">powered by</p> 
      <p class="branding-name"><img src="/static/img/Sifars-Logo.png">Sifars.com</p>
      </a>
    </div>
  </div>
</template>

<script>
import InstaSpinner from './components/lib/Spinner.vue'
import EventBus from './services/event-bus.js';
import Constants from './constants.js';
export default {
  name: 'App',
  components: {
    InstaSpinner
  },
  mounted() {
    EventBus.$on(Constants.errorEvents.serverError, () => {
      this.$snotify.error('Some error occurred. Please contact support', null, {
        timeout: 8000
      });
    });

    EventBus.$on(Constants.errorEvents.badRequest, () => {
      const toastError = {
        message: 'Bad Request',
        title: '400'
      };
      this.$snotify.error(toastError.message, toastError.title);
    });
  }
}
</script>
<style lang="scss">
  @import "sass/main.scss"
     
</style>

