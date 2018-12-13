<template>
<transition name="el-zoom-in-top">
  <div class="content-wrapper">
      <section class="content-header">
        <h3>Activity Setting</h3>
    </section>
    <section class="content activity-settings">
      <div class="row">
        <div class="col-md-3 col-xl-3" v-for="plan in plans" v-bind:key="plan.id">
          <div class="container-widget-two">
            <div class="widget-two switches">
              <h4 class="main-head">{{plan.name}}</h4>

              <br/>
              <br/>
              <img @click="choosePlan(plan.id)" type="image" src="https://www.sandbox.paypal.com/en_US/i/btn/btn_subscribe_LG.gif" />


            </div>
          </div>
        </div>
        <a :href="link" ref="paymentLink">Link</a>
      </div>

    </section>
  </div>
</transition>
</template>
<script>

import Plan from "../../../services/plan";
import Payment from "../../../services/payment";
import Notify from "../../../services/notify";
import User from "../../../services/user";
export default {
  name: "Payments",
  created() {
    this.user = User.user;
    Plan.getAll().then(res => {
      // console.log(res);
      this.plans = res.data.data.data;
      },
      err => {
        console.log("Error while fetching plans");
      }
    );
  },
  data() {
    return {

      user: "",
      plans: [],
      link: ""
    };
  },
  components: {
  },
  methods: {
    choosePlan(planId){
      Payment.getPaymentLink(planId).then(res => {
          console.log(res);

          this.link = res.data.data;
          console.log(this.link);
          const elem = this.$refs.paymentLink
          setTimeout(function(){
            elem.click()
          }, 200)
        },
        err => {
          console.log("Error at selecting plan.");
      }
      );
    }
  }
};
</script>
<style scoped>
.media-age--tooltip {
  line-height: 1.7em;
}
.question-mark--icon {
  cursor: pointer;
}
.el-input-number--small {
  width: 110px;
}
</style>


