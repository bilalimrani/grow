<template>
    <div class="container">
        <div v-show="showLoader">
            <div class="pace inline"><div class="pace-activity pace-custom"></div></div> {{loadingMessage}}
        </div>
        <div v-show="!showLoader">
            <i :class="icon" v-if="icon"></i> {{message}}
        </div>
    </div>
</template>

<script>
export default {
    name: 'InlineLoader',
    props: ['showLoader', 'message', 'loadingMessage', 'icon']
};
</script>

<style scoped>
    .container {
        width: 100%
    }
    .pace-custom {
        position: relative;
        border-top-color: #fff;
        border-left-color: #fff;
        top: 1px;
        left: -5px;
    }
    .inline {
        display: inline-block;
    }
</style>


