<template name="el-zoom-in-top">
  <div class="content-wrapper">
    <div class="container">
      <div class="col-md-12 no-padding plans-info">
      </div>
      <div class="row-fluid plans">
        <div class="plan-sel" v-for="plan in plans" v-bind:key="plan.id">
          <div class="inner-panel text-center">
            <h2>{{plan.name + ' PLAN'}}</h2>
            <div class="plan-data">
              <span v-if="plan.name.toLowerCase() === 'free'"> Free {{ plan.duration }} Days Trial</span>
              <div class="plan-price" v-if="plan.name.toLowerCase() == 'monthly'"><p><strong>{{'$' +
                plan.price}}</strong></p>
                <p class="tenure-label">per month</p>
              </div>
              <div class="plan-price" v-if="plan.name.toLowerCase() == 'weekly'"><p><strong>{{'$' +
                plan.price}}</strong></p>
                <p class="tenure-label">per week</p>
              </div>

            </div>
            <ul class="list-unstyled">
              <li class="mt-10" v-for="feature in plan.features" v-bind:key="feature.description">
                <i v-bind:class="feature.icon"></i> <span v-html="feature.description"></span>
              </li>
            </ul>
            <div class="button-cont">
              <el-button type="danger" @click="planSelected(plan)"> {{ plan.text }}</el-button>
            </div>
            <strong>{{plan.growth + '%'}} Growth</strong>
            <p class="plan-desc" v-html="plan.description"></p>
          </div>
        </div>
        <a :href="link" ref="paymentLink" style="display:none;">Link</a>
      </div>
    </div>
  </div>
</template>

<script>
  import Plan from "../../../services/plan";
  import User from "../../../services/user";
  import Config from "../../../config";
  import plan from "../../../services/plan";
  import Payment from "../../../services/payment";
  import Notify from "../../../services/notify";
  import constants from "../../../constants";
  import {sortBy} from 'lodash'
  import store from '../../../store'

  export default {
    name: "viralproof-plans",
    data() {
      return {
        config: Config,
        plans: [],
        link: "",
        planOptions: constants.plans,
        constants: constants,
        user: {},
        isUserChoseToUpgrade: false,
        isSubscriptionExpired: false,
        isUserPaying: false,
        // tells whether user ever subscribed to a PAID plan
        isUserEverSubscribed: false,
        activeSubscription: null
      };
    },
    created() {
      this.isUserChoseToUpgrade = this.$route.query.upgrade;
      Promise.all([User.getInfo(), Plan.getAll()]).then(res => {
        // console.log(res);
        this.user = res[0];
        //  sort plan list
        const plansResponse = sortBy(res[1].data.data.data, 'sort_order');

        const subscription = this.user.subscription

        //  user is paying if he has an active subscription and don't have a free plan
        this.isUserPaying = (subscription.status === constants.subscriptionStatus.ACTIVE
          && subscription.plan.type !== constants.planType.free)

        // get user active subscribed plan
        this.activeSubscription = this.isUserPaying ? subscription : null;

        // user's current subscription is expired or not
        this.isSubscriptionExpired =
          subscription &&
          subscription.status.toUpperCase() !== constants.subscriptionStatus.ACTIVE

        // has user ever paid in the system
        this.isUserEverSubscribed = subscription && subscription.plan.type !== constants.planType.free;

        // Transform all the plan by adding few more properties to it
        this.plans = plansResponse.map(plan => {
          return Object.assign(
            {text: this.getPlanText(plan)},
            plan,
            this.planOptions[plan.name.toLowerCase()]
          );
        });

        // if a user has a subscription then don't show trial plan
        if (this.user.subscription) {
          this.plans = this.plans.filter(plan => {
            return plan.id !== 1;
          });
        }
        // if user is already subscribed and wants to upgrade then only show plan that
        // are greater than his current plan
        if (
          this.isUserChoseToUpgrade &&
          this.user.subscription &&
          this.user.subscription.plan_id
        ) {
          this.plans = this.plans.filter(plan => {
            return plan.id > this.user.subscription.plan_id;
          });
        }
      });
    },
    methods: {

      /**
       * Return a text that needs to be shown on the plans button
       * text could be - Upgrade, Downgrade etc.
       */
      getPlanText (plan) {
        // if user doesn't have any subscribed plan then show Get started on each plan
        if (!this.activeSubscription) {
          return 'Get Started'
        }

        // if plan is subscribed plan then show unsubscribe as label
        if (plan.id === this.activeSubscription.plan.id) {
          return 'Unsubscribe'
        }

        if (plan.price < this.activeSubscription.plan.price) {
          return 'Downgrade'
        }

        return 'Upgrade'
      },

      planSelected (plan) {
        if (!this.activeSubscription) {
          this.checkout(plan)
          return
        }
        // If user click on the same plan that he is subscribed to
        // then cancel his subscription
        if (this.activeSubscription && this.activeSubscription.plan.id === plan.id) {
          this.cancelSubscripton()
        } else {
          this.changePlan(plan)
        }

      },

      checkout (plan) {
        this.getPaymentGatewayKey().then(gatewayKey => {
          // this.$checkout.close()
          // is also available.
          this.$checkout.open({
            key: gatewayKey,
            name: plan.name,
            allowRememberMe: false,
            currency: 'USD',
            amount: plan.price * 100, // stripe take price in cents
            token: (token) => {
              console.log('token ', token)
              store.state.showSpinner = true
              Payment.createSubscription(token.id, plan.id).then(res => {
                const message = 'You are subscribed'
                this.$snotify.success(message, 'Success!')
                this.resetAndGoToDashboard()
              }, err => {
                store.state.showSpinner = false
                const message = err.response.data.errors[0]
                this.$snotify.error(message, 'Error!')
              })
            }
          });
        })
      },

      cancelSubscripton() {
        this.$snotify.confirm(
          `Are you sure to unsubscribe?`,
          "Confirmation",
          {
            closeOnClick: false,
            pauseOnHover: true,
            position: "centerTop",
            buttons: [
              {
                text: "Yes",
                action: toast => {
                  this.$snotify.remove(toast.id);
                  store.state.showSpinner = true
                  Payment.cancelSubscription()
                    .then(res => {
                      store.state.showSpinner = false
                      const message = 'You are unsubscribed'
                      this.$snotify.success(message, 'Success!')
                      this.resetAndGoToDashboard()
                    }, err => {
                      store.state.showSpinner = false
                      console.log('error while cancelling subscription ', err)
                    })
                },
                bold: false
              },
              {text: "No", action: toast => this.$snotify.remove(toast.id)}
            ]
          }
        );
      },

      changePlan(plan) {
        this.$snotify.confirm(
          `Are you sure to change your plan?`,
          "Confirmation",
          {
            closeOnClick: false,
            pauseOnHover: true,
            position: "centerTop",
            buttons: [
              {
                text: "Yes",
                action: toast => {
                  this.$snotify.remove(toast.id);
                  store.state.showSpinner = true
                  Payment.changeSubscription(plan.id).then(res => {
                    const message = 'Your plan has been changed'
                    this.$snotify.success(message, 'Success!')
                    this.resetAndGoToDashboard()
                  }, err => {
                    store.state.showSpinner = false
                    const message = err.response.data.errors[0]
                    this.$snotify.error(message, 'Error!')
                  })
                },
                bold: false
              },
              {text: "No", action: toast => this.$snotify.remove(toast.id)}
            ]
          }
        );
      },

      getPaymentGatewayKey() {
        return Payment.getGatewayKey().then(res => {
          return res.data;
        })
      },

      resetAndGoToDashboard() {
        User.resetUserDetails();
        User.getInfo().then(res => {
          store.state.showSpinner = false
          this.$router.push('/')
        }, err => {
          store.state.showSpinner = false
        })
      }
    }
  };
</script>
<style>
  button.el-button.el-button--danger {
    background: #ff4370;
  }

  .success {
    color: #67C23A;
  }

  .danger {
    color: #F56C6C;
  }

  .p-color {
    color: #ff4370
  }

</style>
