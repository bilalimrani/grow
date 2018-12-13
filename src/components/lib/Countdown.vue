<template>
  <span>{{hours | two_digits}} : {{minutes | two_digits}}</span>
</template>
<script>
export default {
  name: "Countdown",
  props: ['date'],
  data() {
    return {
      now: new Date().getTime()
    };
  },
  mounted() {
    const interval = window.setInterval(() => {
      this.now = new Date().getTime();
      const distance = this.normalizedDate - this.now;
      if (distance < 0) {
        clearInterval(interval);
        this.$emit('offerClosed');
      }
    }, 1000);
  },
  computed: {
    normalizedDate() {
      return new Date(this.date).getTime();
    },
    hours() {
      return Math.floor(((this.normalizedDate - this.now) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    },
    minutes() {
      return Math.floor(((this.normalizedDate - this.now) % (1000 * 60 * 60)) / (1000 * 60));
    }
  }
};
</script>

