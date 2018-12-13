<template>
    <div class="loading" v-if="$store.state.showSpinner">
        <spinner 
        size="40" 
        :message="$store.state.spinnerMessage"
        text-fg-color="#555"
        :font-size="15"
        ></spinner>
    </div>
</template>

<script>
    import Spinner from 'vue-simple-spinner'
    export default {
        name: 'insta-spinner',
        components: {
            Spinner
        }
    }
</script>

<style scoped>
.loading {
  position: fixed;
  z-index: 999;
  height: 2em;
  width: 100%;
  overflow: show;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
/* Transparent Overlay */
.loading:before {
  content: '';
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.3);
}
</style>