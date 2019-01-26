<template>
  <div>
    <vue-stripe-checkout
      ref="checkoutRef"
      :image="image"
      :name="name"
      :description="description"
      :currency="currency"
      :amount="amount * 100"
      :allow-remember-me="false"
      @done="done"
      @opened="opened"
      @closed="closed"
      @canceled="canceled"
    ></vue-stripe-checkout>
    <el-button type="danger" @click="checkoutPayment">{{planData.text}}</el-button>
  </div>
</template>
 
<script>
import Payment from "../../../services/payment";
export default {
    props: ['planData'],
  data() {
      console.log("this", this.planData);
    return {
      image: 'https://i.imgur.com/HhqxVCW.jpg',
      name: 'Please enter detail',
      description: '',
      currency: 'USD',
      amount: this.planData.price,

    }
    
  },
  methods: {
    async checkoutPayment () {
      const { token, args } = await this.$refs.checkoutRef.open();
        Payment.createSubscription(token.id, this.planData.id).then(res => {
                const message = 'You are subscribed'
                this.$snotify.success(message, 'Success!')
                this.resetAndGoToDashboard()
              }, err => {
                const message = err.response.data.errors[0]
                this.$snotify.error(message, 'Error!')
              })
    },
    done ({token, args}) {
    },
    opened () {
    },
    closed () {
    },
    canceled () {
    }
  }
}
</script>