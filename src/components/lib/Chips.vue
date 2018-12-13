<template>
    <div class="">
        <div class="chip" v-for="(chip, index) in chips" v-bind:key="index">
            <img src="chip.profile_pic_url" alt="avatar" width="96" height="96" v-if="chip.profile_pic_url">
            {{chip.value | type(chip.type)}}
            <span class="closebtn" @click="removeChip(chip, index)">&times;</span>
        </div>
    </div>
</template>

<script>
export default {
  name: "Chips",
  props: ["chips"],
  methods: {
      removeChip(chip, index) {
          console.log('Removing chip', chip, index);
          this.$emit('remove', {chip, index});
      }
  },
  filters: {
      type(chip, type) {
          if (type === 'HASH') {
              return `# ${chip}`;
          } else {
              return chip;
          }
      }
  }
};
</script>

<style scoped>
.card-full .container {
    padding-right: 180px;
    padding-left: 0px;
    margin-left: 0px;
}
    .container {
        width: 100%;
    }
    .chip {
            display: inline-block;
            padding-left: 0px;
            padding: 0 8px;
            margin-bottom: 5px;
            margin-right: 9px;
            height: 27px;
            font-size: 13px;
            line-height: 28px;
            border-radius: 25px;
            background-color: #f1f1f1;
        }
    .chip img {
        float: left;
        margin: 0 10px 0 -25px;
        height: 38px;
        width: 38px;
        border-radius: 50%;
    }
    .closebtn {
        padding-left: 10px;
        color: #888;
        font-weight: bold;
        float: right;
        font-size: 20px;
        cursor: pointer;
    }

    .closebtn:hover {
        color: #000;
    }
</style>

