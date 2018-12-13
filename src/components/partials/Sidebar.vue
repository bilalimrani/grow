<template>
    <aside class="main-sidebar">
        <!-- sidebar: style can be found in sidebar.less -->
        <div>
            <section class="sidebar">
                <!-- /.search form -->
                <!-- Sidebar user panel -->
                <div class="user-panel">
                    <div class="image"> <img src="static/img/avatar2.png" class="img-circle" alt="User Image"> </div>
                    <div class="info">
                        <p class="capitalize">Hi {{user.fname}}!</p>
                        <!-- <p><small>You haven,t miss any task this week!</small></p> -->
                        <div> 
                            <router-link :to="{ path: '/plans' }" v-if="!showAdminNav">
                                <i @click="closeSidebar" class="ti-panel"></i><small>Plans</small>
                            </router-link>
                            <a href="javascript:;" @click="logout"><i class="ti-power-off"></i><small>Logout</small></a> 
                        </div>
                    </div> <img class="bg-user" src="static/img/avatar-bg.png" alt="User Image"> </div>
                <!-- sidebar menu: : style can be found in sidebar.less -->
                <ul class="sidebar-menu" v-if="!showAdminNav">
                    <li @click="closeSidebar">
                        <router-link to="/"><i class="fas fa-tachometer-alt"></i> <span>Dashboard</span> <span class="pull-right-container"></span></router-link>
                    </li>
                    <li @click="closeSidebar">
                        <router-link to="/target-audience"> <i class="fas fa-user"></i> <span>Target Audience</span> <span class="pull-right-container"></span></router-link>
                    </li>
                    <li @click="closeSidebar">
                        <!-- <router-link to="/activity-settings"> <i class="ti-layout-media-overlay"></i> <span>Activity Setting</span> <span class="pull-right-container"></span></router-link> -->
                        <router-link to="/activity-settings"> <i class="fas fa-cog"></i> <span>Activity Setting</span> <span class="pull-right-container"></span></router-link>
                    </li>
                    <!-- <li class="treeview">
                        <a href="#"> <i class="ti-layout-media-overlay"></i> <span>Common Page</span> <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span> </a>
                        <ul class="treeview-menu">
                            <li class="active">
                                <router-link to="/blank-page">
                                    <avatar username="Blank Page" :size='20' color="#fff"></avatar> Blank Page</router-link>
                            </li>
                        </ul>
                    </li>              -->
                    <!-- <li class="treeview">
                        <a href="#"> <i class="ti-layout-media-overlay"></i> <span>Common Page</span> <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span> </a>
                        <ul class="treeview-menu">
                            <li class="active">
                                <router-link to="/blank-page">
                                    <avatar username="Blank Page" :size='20' color="#fff"></avatar> Blank Page</router-link>
                            </li>  
                            <li class="active">
                                <router-link to="/blank-page">
                                    <avatar username="Blank Page" :size='20' color="#fff"></avatar> Blank Page</router-link>
                            </li>  
                            <li class="active">
                                <router-link to="/blank-page">
                                    <avatar username="Blank Page" :size='20' color="#fff"></avatar> Blank Page</router-link>
                            </li>
                        </ul>
                    </li> -->
                    <!-- <li class="header"> 1.0.0</li> -->
                    <li v-if="user.insta_accounts.length && isSubscriptionValid" v-bind:class="{'start': user.insta_accounts[0].status === 'ACTIVE', 'pause': user.insta_accounts[0].status !== 'ACTIVE'}" class="header bot-btn" @click="updateInstaProcess(user.insta_accounts[0].status)">
                        <!-- show pause icon if account is ACTIVE -->
                        <span v-if="user.insta_accounts[0].status === 'ACTIVE'" class="ti-control-pause mr-1"></span>
                        <!-- show play icon if account is not active -->
                        <span v-if="user.insta_accounts[0].status !== 'ACTIVE'" class="ti-control-play mr-1"></span>
                        {{user.insta_accounts[0].status === 'ACTIVE' ? 'Pause' : 'Start'}} Activity
                    </li>
                    <!-- Disabled button -->
                    <li v-if="user.insta_accounts.length && !isSubscriptionValid" class="header bot-btn disabled"><span class="ti-control-play mr-1"></span> Start Activity</li>
                    <!-- <li> <a href="http://ndesaintheme.com/devin/doc"><span>Documentation</span>
                  <span class="pull-right-container">
                  <i class="fa ti-agenda pull-right version"></i>
                </span>
                    </a></li>
                    <li> <a href="#"><span>About</span>
                  <span class="pull-right-container">
                  <i class="fa ti-info-alt pull-right version"></i>
                </span>
                    </a></li>
                    <li> <a href="#"><span>Feedback</span>
                  <span class="pull-right-container">
                  <i class="version fa ti-package pull-right"></i>
                </span>
                    </a></li> -->
                    <li>
                        <br>
                        <br>
                        <br>
                    </li>
                </ul>

                <ul class="sidebar-menu" v-if="showAdminNav">
                    <li @click="closeSidebar">
                        <router-link to="/admin"> <i class="ti-dashboard"></i> <span>Dashboard</span> <span class="pull-right-container"></span></router-link>
                    </li>
                    <li @click="closeSidebar">
                        <router-link to="/users"> <i class="ti-user"></i> <span>Users</span> <span class="pull-right-container"></span></router-link>
                    </li>
                    <!-- <li>
                        <router-link to="/admin"> <i class="ti-layout-media-overlay"></i> <span>Coming Soon</span> <span class="pull-right-container"></span></router-link>
                    </li> -->
                    <li @click="closeSidebar">
                        <router-link to="/proxies"> <i class="ti-layout-media-overlay"></i> <span>Proxies</span> <span class="pull-right-container"></span></router-link>
                    </li>

                    <li @click="closeSidebar">
                        <router-link to="/settings"> <i class="ti-settings"></i> <span>Settings</span> <span class="pull-right-container"></span></router-link>
                    </li>
                </ul>
            </section>
            <!-- /.sidebar -->
        </div>
    </aside>
</template>


<script>
import Avatar from "vue-avatar";
import authService from "../../services/auth.service";
import UserService from "../../services/user";
import Instagram from "../../services/instagram";
import EventBus from '../../services/event-bus'
export default {
  name: "DashboardSidebar",
  data() {
    return {
      user: {insta_accounts: []},
      isSubscriptionValid: false,
      isInstaAccountConnected: true
    };
  },
  props: {
    showAdminNav: Boolean
  },
  created() {
        UserService.getInfo().then(res => {
            this.onUserReceived(res)
        })

        EventBus.$on('userReceived', (user) => {
            console.log('userReceived event is listened with ', user)
            this.onUserReceived(user)
      })
  },
  mounted: function() {
    $(document).ready(function($) {
      $(".main-sidebar > div").slimScroll({
        width: "230px",
        position: "left",
        size: "3px",
        height: "95vh"
      });
      $("body")
        .removeClass("sidebar-open")
        .removeClass("sidebar-collapse")
        .trigger("collapsed.pushMenu");
    });
  },
  components: {
    Avatar
  },
  methods: {

    onUserReceived(user) {
        this.user = user
        this.isSubscriptionValid =  this.checkSubscriptionValidity(this.user)
        this.isInstaAccountConnected = this.user.insta_accounts.length ? true : false
    },
    checkSubscriptionValidity(user) {
        if(!user.subscription) {
            return false
        }

        if(user.subscription && user.subscription.status.toUpperCase() !== 'ACTIVE') {
            return false
        }

        return true
    },
    logout() {
      authService.logout();
    },
    updateInstaProcess(status) {
      const statusList = {
        ACTIVE: "PAUSE",
        PAUSE: "ACTIVE"
      };
      Instagram.updateInstaBot({ status: statusList[status] }).then(
        res => {
          this.user.insta_accounts[0].status = statusList[status];
          const toastSuccess = {
            body: `Rocket Growth is ${statusList[status].toLowerCase()} now`,
            title: "Success"
          };
          this.$snotify.success(toastSuccess.body, toastSuccess.title);
        },
        err => {
          console.error("Error occured while updating");
          const toastError = {
            body: `Error occured while updating.`,
            title: "Error"
          };
          this.$snotify.error(toastError.body, toastError.title);
        }
      );
    },
    closeSidebar() {
        console.log('closeSidebar()')
      $("body")
        .removeClass("sidebar-open")
        .removeClass("sidebar-collapse")
        .trigger("collapsed.pushMenu");
    }
  }
};
</script>
