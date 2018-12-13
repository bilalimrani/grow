<template>
  <div>
    <vue-headful
        title="Dashboard - Rocket Growth"
        description=""
    />
    <app-header></app-header>

    <!-- Left side column. contains the sidebar -->
    <app-sidebar></app-sidebar>

    <!-- Content Wrapper. Contains page content -->
    <router-view></router-view>
    <!-- /.content-wrapper -->

    <app-footer></app-footer>

    <control-sidebar></control-sidebar>
    <welcome-modal></welcome-modal>
    <!-- <notification v-if="isPlanUpgradable"> -->
      <!-- <div class="notification"> -->
        <!-- <span class="timer">
          <i class="ti-timer"></i> hours left in trial
        </span>
        <span v-if="showNotification">
          <count-down date="May 8, 2018" v-on:offerClosed="hideNotification()"></count-down> minutes left in trial
           | Upgrage in next 20 hours and get a 15% lifetime discount!
        </span> -->
        <!-- <router-link :to="{ path: '/plans', query: { upgrade: true }}">
          <button class="btn btn-default upgarde-btn">
            Upgrade Now
          </button>
        </router-link>
      </div>
    </notification> -->
  </div>
</template>

<script>
import Sidebar from "./partials/Sidebar.vue";
import Header from "./partials/Header.vue";
import Footer from "./partials/Footer.vue";
import ControlSidebar from "./partials/ControlSidebar.vue";
import WelcomeModal from "./partials/Welcome.vue";
import Notification from "./lib/Notification.vue";
import Countdown from "./lib/Countdown.vue";
import User from "../services/user";
import constants from "../constants";

export default {
  name: "Dashboard",
  data() {
    return {
      showNotification: true,
      user: {},
      plans: constants.plans,
      isPlanUpgradable: false
    };
  },
  created() {
    User.getInfo().then(user => {
      console.log("user ", user);
      this.user = user;
      // this.isPlanUpgradable = this.canUserUpgrade(user);
    });
  },
  components: {
    "app-sidebar": Sidebar,
    "app-header": Header,
    "app-footer": Footer,
    "control-sidebar": ControlSidebar,
    "welcome-modal": WelcomeModal,
    notification: Notification,
    "count-down": Countdown
  },
  methods: {
    hideNotification() {
      this.showNotification = false;
    },

    // user can only upgrade
    // When subscription is present with trial or Standard plan
    // and payment creation date is two days away from today's date
    canUserUpgrade(user) {
      if (!user.subscription) {
        return false;
      }

      // TODO: ID of top plan is hardcoded.
      if (user.subscription.plan_id === 3) {
        return false;
      }

      if (user.subscription.payment.created_at) {
        const paymentDate = new Date(user.subscription.payment.created_at);
        const now = new Date();
        return (now - paymentDate) / (1000 * 3600 * 24) < 2 ? false : true;
      }

      return true;
    }
  }
};
</script>
