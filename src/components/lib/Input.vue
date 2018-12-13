<template>
  <div class="input-group input-group-md col-xs-12 custom-input">
    <slot name="input"></slot>
    <slot name="error"></slot>
  </div>
</template>

<script>
export default {
  name: 'ViralProofInput'
}
</script>
<style scoped>
    .custom-input {
        margin-bottom: 20px;
    }
</style>
