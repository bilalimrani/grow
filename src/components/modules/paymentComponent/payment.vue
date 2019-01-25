<template>
  <div>
    <vue-stripe-checkout
      ref="checkoutRef"
      :image="image"
      :name="name"
      :description="description"
      :currency="currency"
      :amount="amount"
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
      currency: '',
      amount: this.planData.price,

    }
    
  },
  methods: {
    async checkoutPayment () {
      // token - is the token object
      // args - is an object containing the billing and shipping address if enabled
      console.log('ok')
      const { token, args } = await this.$refs.checkoutRef.open();
    },
    done ({token, args}) {
      
    },
    opened () {
      // do stuff 
    },
    closed () {
      // do stuff 
    },
    canceled () {
      // do stuff 
    }
  }
}
</script>