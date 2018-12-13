<template>
    <form @submit.prevent="submitProxy">
        <div class="form-row form-box clearfix">
            <div class="form-group col-md-6">
                <label for="fname">First Name</label>
                <viralproof-input>
                    <input slot="input" id="fname" class="form-control" type="text" name="fname" v-model="user.firtName" placeholder="John" v-validate="'required'" data-vv-delay="1000">
                    <span slot="error" v-show="errors.has('ip')" class="text-danger">{{ errors.first('fname') }}</span>
                </viralproof-input>
            </div>
            <div class="form-group col-md-6">
                <label for="lname">Last Name</label>
                <viralproof-input>
                    <input slot="input" id="lname" class="form-control" type="text" name="lname" v-model="user.lastName" placeholder="Doe" v-validate="'required'" data-vv-delay="1000">
                    <span slot="error" v-show="errors.has('lname')" class="text-danger">{{ errors.first('lname') }}</span>
                </viralproof-input>
            </div>
            <div class="form-group col-md-6">
                <label for="lname">Plan</label>
                <viralproof-input>
                    <input slot="input" id="plan" class="form-control" type="text" name="plan" v-model="user.plan" placeholder="Premium" v-validate="'required'" data-vv-delay="1000">
                    <span slot="error" v-show="errors.has('plan')" class="text-danger">{{ errors.first('plan') }}</span>
                </viralproof-input>
            </div>
            <div class="col-md-12">
                <el-button type="primary" class="btn capitalize btn-block add-edt-btn"  :disabled="showLoader" native-type="submit">
                    <viralproof-loader :icon="'fas fa-plus'" :showLoader="showLoader" :message="action + ' User'" :loadingMessage="action + 'ing'"></viralproof-loader>
                </el-button>
                <el-button type="danger" class="btn capitalize btn-block add-edt-btn" @click="cancel">
                    Cancel
                </el-button>
            </div>
        </div>
    </form>    
</template>

<script>
import InputComponent from "../../../lib/Input";
import InlineLoader from "../../../lib/InlineLoader.vue";
export default {
  name: "user-form",
  components: {
    "viralproof-input": InputComponent,
    "viralproof-loader": InlineLoader
  },
  props: ["user", "action", "showLoader"],
  methods: {
    submitProxy() {
      this.$validator.validateAll().then(isValid => {
        if (isValid) {
          this.$emit("submitProxy", { proxy: this.proxy });
        }
      });
    },

    cancel() {
      this.$router.go(-1);
    }
  }
};
</script>

