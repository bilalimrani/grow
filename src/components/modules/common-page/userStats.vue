<template>
    <transition name="el-zoom-in-top">
        <!-- Connect instagram modal box -->
        <div class="content-wrapper">
            <section class="content-header">
                <h3>Dashboard</h3>
            </section>

            <section class="content">
                <div class="box no-shad">
                    <div class="box-body" style="min-height:400px;">
                        <div>
                            <!-- Show this message when subscription is not active -->
                            <div v-if="isTrialExpired" class="alert alert-danger text-center full">
                                Your free trial has expired.
                                Please
                                <router-link to="/plans"><ins><strong>click here</strong></ins></router-link> to upgrade your subscription to continue using our services.
                            </div>
                            <!-- only to users whose subscription has expired -->
                            <div v-if="isSubscriptionExpired" class="alert alert-danger text-center full">
                                Your subscription has expired.
                                Please
                                <router-link to="/plans"><ins><strong>click here</strong></ins></router-link> to upgrade your subscription to continue using our services.
                            </div>
                            <!-- Should only appear if user has an account associated now or in the past and he was on trial-->
                            <div class="alert alert-success text-center full" v-if="totalInstaAccountCount > 0 && isTrialExpired">
                                Great news! according to our data, your potential reach is <strong>1059 new followers per month</strong>,
                                <br/>
                                <router-link to="/plans"><ins><strong>upgrade</strong></ins></router-link> your plan now ​to get your maximum potential reach!
                            </div>
                        </div>
                        <div v-if="connectedToInstagram">
                            <div class="action bar text-right">
                                <!-- <a class="btn  dash-edt"><i class="far fa-edit"></i> Edit</a> -->
                                <a class="btn dash-dlt" @click="removeAccount">
                                    <i class="fa fa-trash"></i> Remove</a>
                            </div>
                            <div class="row text-center user-img">
                                <div class="col-md-12">
                                    <div class="profile-sec">
                                        <h1 class="text-white">
                                            <img alt="profile" :src="instagramAccountInfo.profile_pic_url || '/static/img/user.jpg'"
                                                class="img-circle  bg">
                                        </h1>
                                        <span class="use-plan">{{ userInfo.subscription ? userInfo.subscription.current_plan : '' }}</span>
                                    </div>
                                    <h4 class="user-name">{{instagramAccountInfo.full_name}}</h4>
                                    <h4>You started using Rocket Growth when you had {{ userInfo.insta_accounts[0].followers ? userInfo.insta_accounts[0].followers
                                        : 0}} followers</h4>
                                </div>
                            </div>
                            <div class="row-fluid center">
                                <div class="col-md-4">
                                    <span class="ti-user rel-ico"></span>
                                    <div class="box palette-Pink-300 bg">
                                        <div class="box-header  palette-Pink-300 bg"> </div>
                                        <div class="box-body no-pad" style="display: block;">
                                            <div class="events-nest  card-head text-center ">
                                                <div class="wrap-no-pad text-white">
                                                    <h5 class="count-fig">{{instagramAccountInfo.follower_count || 0 }}</h5>
                                                    <span>Total Followers</span>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <span class="ti-user rel-ico"></span>

                                    <div class="box palette-Cyan-400 bg">
                                        <div class="box-header  palette-Cyan-400 bg"> </div>
                                        <div class="box-body no-pad" style="display: block;">
                                            <div class="events-nest  card-head text-center ">
                                                <div class="wrap-no-pad text-white">
                                                    <h5 class="count-fig">{{instagramAccountInfo.new_follower_count || 0}}</h5>
                                                    <span>New Followers</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <span class="ti-bar-chart rel-ico"></span>
                                    <div class="box palette-Indigo-900 bg">
                                        <div class="box-header  palette-Indigo-900 bg"> </div>
                                        <div class="box-body no-pad" style="display: block;">
                                            <div class="events-nest  card-head text-center ">
                                                <div class="wrap-no-pad text-white">
                                                    <h5 class="count-fig">{{instagramAccountInfo.growth_rate || 0}}%</h5>
                                                    <span>Growth Rate</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-show="!connectedToInstagram" class="insta-btn text-center">
                            <button :disabled="isSubscriptionExpired || isTrialExpired" class="btn insta" @click="opeInstaAccountModal()">
                                <i class="fab fa-instagram"></i> &nbsp; &nbsp; Connect Instagram Account</button>
                        </div>
                    </div>
                </div>
            </section>
            <modal name="connect-instagram-account" transition="nice-modal-fade" :adaptive="true" :clickToClose="false" height=auto :width="500"
                @before-close="resetError">
                <div class="modal-header">
                    <a href="#" class="close" @click="closeInstaAccountModal()" aria-label="close">&times;</a>
                    <h3 class="no-margin">Connect Instagram Account</h3>
                </div>
                <div class="modal-body">
                    <!-- <div class="instructions">
                        <h4>Your account's security is our top priority</h4>
                        <p>We will not store your password. The password is required to
                            establish connection with instagram</p>
                    </div> -->
                    <div class="account-credentials">
                        <p>
                            <strong>
                                <i class="fas fa-shield-alt"></i> &nbsp;Your account security is our top priority</strong>
                        </p>
                        <p>We will not store your password. The password is required to establish connection with Instagram.</p>
                        <div class="info">
                            <p><strong>Please make sure your phone number is attached with Instagram account</strong></p>
                        </div>
                        <hr>
                        <h4 mt10>Account credentials</h4>
                        <div class="row">
                            <div class="col-md-12">
                                <div :class="message.type == 'error' ? 'alert alert-danger' : 'alert alert-success'" role="alert" v-if="instagramConnectError"
                                    v-html="message.text">
                                    <!-- {{ message.text }} -->
                                </div>
                                <form @submit.prevent="connectInstagram()">
                                    <viralproof-input>
                                        <input slot="input" class="form-control" type="text" name="username" v-model="username" placeholder="Instagram Username"
                                            v-validate="'required'" data-vv-delay="1000">
                                        <span slot="error" v-show="errors.has('username')" class="text-danger">{{ errors.first('username') }}</span>
                                    </viralproof-input>
                                    <viralproof-input>
                                        <input slot="input" class="form-control" type="password" name="password" v-model="password" placeholder="Instagram Password"
                                            v-validate="'required'" data-vv-delay="1000">
                                        <span slot="error" v-show="errors.has('password')" class="text-danger">{{ errors.first('password') }}</span>
                                    </viralproof-input>
                                    <viralproof-input >
                                        <input slot="input" class="form-control" type="text" name="otp" v-model="otp" placeholder="Instagram OTP"
                                            v-validate="'required'" data-vv-delay="1000" v-if="isOtpRequired">
                                        <span slot="error" v-show="errors.has('otp')" class="text-danger">{{ errors.first('otp') }}</span>
                                    </viralproof-input>
                                    <button class="btn insta btn-block" :disabled="connectingToInstagram" type="submit">
                                        <viralproof-loader :showLoader="connectingToInstagram" :message="'Connect Account'" :loadingMessage="'Connecting'"></viralproof-loader>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </modal>
        </div>
    </transition>
</template>
<script>
import InputComponent from "../../lib/Input";
import InlineLoader from "../../lib/InlineLoader";
import Instagram from "../../../services/instagram";
import UserService from "../../../services/user";
import httpClient from "../../../services/http-client";
import constants from "../../../constants";
import store from '../../../store'
export default {
  name: "BlankPage",
  created() {
    this.userInfo = UserService.user;
    // Evalutate if subscription has expired
    this.isSubscriptionExpired = this.checkSubscriptionExpired(this.userInfo)
    this.isTrialExpired = this.checkTrialExpired(this.userInfo)
    this.totalInstaAccountCount = this.userInfo.all_insta_accounts_count;

    if (UserService.user.insta_accounts.length) {
      this.connectedToInstagram = true;
    }
    if(UserService.instaAccount) {
        this.instagramAccountInfo = UserService.instaAccount;
    }
  },
  data() {
    return {
      username : '',
      password : '',
      otp : '',
      connectedToInstagram: false,
      connectingToInstagram: false,
      instagramConnectError: false,
      isSubscriptionExpired: false,
      isTrialExpired: false,
      totalInstaAccountCount: 0,
      instagramAccountInfo: {},
      userInfo: {},
      message: {},
      isOtpRequired: false,
      checkApiPath : ''
    };
  },
  components: {
    "viralproof-input": InputComponent,
    "viralproof-loader": InlineLoader
  },
  methods: {

    checkSubscriptionExpired(user) {
        return user.subscription &&
        user.subscription.status.toUpperCase() !== constants.subscriptionStatus.ACTIVE
        && user.subscription.plan && user.subscription.plan.type !== constants.planType.free;

    },

    checkTrialExpired(user) {
        return user.subscription &&
        user.subscription.status.toUpperCase() !== constants.subscriptionStatus.ACTIVE
        && user.subscription.plan && user.subscription.plan.type === constants.planType.free;
    },

    opeInstaAccountModal() {
      this.$modal.show("connect-instagram-account");
    },
    connectInstagram() {
      console.log("Trying to connect to instagram...");
      this.connectingToInstagram = true;
      this.instagramConnectError = false;
      let user = {};
      if(this.isOtpRequired){
        user = {
        username: this.username,
        password: this.password,
        otp: this.otp,
        checkApiPath: this.message.checkApiPath
      };
      }else{
         user = {
            username: this.username,
            password: this.password
      };
      }

      Instagram.connect(user)
        .then((res) => {
          UserService.user = '';
          this.message.text = ''
          return Instagram.createDefaultSetting(res.data.data.id);
        },(err) => {
            this.connectingToInstagram = false;
            this.instagramConnectError = true;
            this.message = {
                text: err.response.data.errors[0].text ? err.response.data.errors[0].text : err.response.data.errors[0],
                type: err.response.data.errors[0].type ? err.response.data.errors[0].type : 'error',
                checkApiPath: err.response.data.errors[0].checkApiPath ? err.response.data.errors[0].checkApiPath : ''
            }
            console.log(err)
            this.isOtpRequired = err.response.data.errors[0].type == 'otp_required'

            console.error("Error while connecting", err.response.data.errors[0]);
            throw false
        })
        .then((res) => {
            console.log('asking user infor')
            return UserService.getInfo();
        })
        .then(res => {
              console.log('asking user bio', res)
              return UserService.getBio()
        })
        .then(res => {
            this.connectingToInstagram = false;
            const toastSuccess = {
                body: "Your account connected successfully.",
                title: "Success"
            };
            UserService.instaAccount = res.data.data;
            this.userInfo = UserService.user;
            this.instagramAccountInfo = UserService.instaAccount;
            this.connectedToInstagram = true;
            this.$modal.hide("connect-instagram-account");
            this.$snotify.success(toastSuccess.body, toastSuccess.title);
        }).catch(err => {
            store.state.showSpinner = false
            console.log('handle error ', err);
        })
    },

    removeAccount() {
        this.$snotify.confirm(
          `Are you sure you want to remove your account?`,
          "Confirmation",
          {
            closeOnClick: false,
            pauseOnHover: true,
            position: "rightCenter",
            buttons: [
              {
                text: "Yes",
                action: toast => {
                    this.$snotify.remove(toast.id);
                    Instagram.updateAccount('DISCONNECTED').then(res => {
                        UserService.user.insta_accounts = []
                        UserService.setInstaAccount(null)
                        this.connectedToInstagram = false;
                    })
                    .then(response => {
                        this.$snotify.success(
                        `Account removed successfully`,
                        null
                        );
                  });
                },
                bold: false
              },
              { text: "No", action: toast => this.$snotify.remove(toast.id) }
            ]
          }
        );
    },
    closeInstaAccountModal() {
      this.$modal.hide("connect-instagram-account");
    },
    resetError() {
      this.instagramConnectError = false;
    }
  }
};
</script>
<style>
.center {
    margin: auto;
}

.info {
    color: #ff4773;
}
</style>
