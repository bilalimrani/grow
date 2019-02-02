<template>
    <div class="container">
        <modal name="welcome-modal" :width="300" :height="190">
            <div class="welcome-modal">
                <div class="header">
                <header class="title">Welcome to GrowGramGrow!</header>
                </div>
                <div class="body">
                    <p>Let's get started!</p>
                    <p>Start by connecting your Instagram account.</p>
                </div>
                <div class="footer">
                    <button class="btn btn-basic" @click="closeModal()">Continue</button>
                </div>
            </div>
        </modal>
    </div>
</template>
<script>
export default {
  name: 'WelcomeModal',
  props: {
      showModal: false
  },
  mounted() {
      if (this.$route.query.welcome) {
          this.$modal.show('welcome-modal');
      }
  },
  methods: {
      closeModal() {
          this.$modal.hide('welcome-modal');
      }
  }
}
</script>
