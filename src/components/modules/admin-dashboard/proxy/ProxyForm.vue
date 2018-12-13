<template>
    <form @submit.prevent="submitProxy">
        <div class="form-row form-box clearfix">
            <div class="form-group col-md-6 min-set">
                <label for="inputEmail">IP Address</label>
                <viralproof-input>
                    <input slot="input" class="form-control" type="text" name="ip" v-model="proxy.ip" placeholder="23.229.34.207" v-validate="'required|ip'" data-vv-delay="1000">
                    <span slot="error" v-show="errors.has('ip')" class="text-danger">{{ errors.first('ip') }}</span>
                </viralproof-input>
            </div>
            <div class="form-group col-md-6 min-set">
                <label for="inputEmail">Port Number</label>
                <viralproof-input>
                    <input slot="input" class="form-control" type="text" name="port" v-model="proxy.port" placeholder="80" v-validate="'required|numeric'" data-vv-delay="1000">
                    <span slot="error" v-show="errors.has('port')" class="text-danger">{{ errors.first('port') }}</span>
                </viralproof-input>
            </div>
          
                <div class="form-group col-md-6 min-set">
                    <label for="inputEmail">Username</label>
                    <viralproof-input>
                        <input slot="input" class="form-control" type="text" name="username" v-model="proxy.username" placeholder="john" v-validate="'required'" data-vv-delay="1000">
                        <span slot="error" v-show="errors.has('username')" class="text-danger">{{ errors.first('username') }}</span>
                    </viralproof-input>
                </div>

                <div class="form-group col-md-6 min-set">
                    <label for="inputEmail">Password</label>
                    <viralproof-input>
                        <input slot="input" class="form-control" type="password" name="password" v-model="proxy.password" placeholder="Password" v-validate="'required'" data-vv-delay="1000">
                        <span slot="error" v-show="errors.has('password')" class="text-danger">{{ errors.first('password') }}</span>
                    </viralproof-input>
                </div>
         
           
                <div class="form-group col-md-6 min-set">
                    <label  class="full mr20" for="inputEmail">Status</label>
                    <el-select v-model="proxy.status" placeholder="Status">
                        <el-option
                            v-for="status in proxyStatusList"
                            :key="status.id"
                            :label="status.label"
                            :value="status.value">
                        </el-option>
                    </el-select>
                </div>
               <div class="col-md-12">
                <el-button type="primary" class="btn capitalize btn-block add-edt-btn btn-lh"  :disabled="showLoader" native-type="submit">
                    <viralproof-loader :icon="'fas fa-plus'" :showLoader="showLoader" :message="action + ' Proxy'" :loadingMessage="action + 'ing'"></viralproof-loader>
                </el-button>
                <el-button type="danger" class="btn capitalize btn-block add-edt-btn btn-rh" @click="cancel">
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
  name: "proxy-form",
  data() {
    return {
      proxyStatusList: [
        { value: "VALID", id: 1, label: "Valid" },
        { value: "INVALID", id: 2, label: "Invalid" }
      ]
    };
  },
  components: {
    "viralproof-input": InputComponent,
    "viralproof-loader": InlineLoader
  },
  props: ["proxy", "action", "showLoader"],
  methods: {
    submitProxy() {
      this.$validator.validateAll().then(isValid => {
        if (isValid) {
          this.$emit("submitProxy", { proxy: this.proxy });
        }
      });
    },

    cancel() {
        this.$router.go(-1)
    }
  }
};
</script>

<style scoped>
.capitalize {
  text-transform: capitalize;
}
button.el-button.btn.capitalize.btn-block.add-edt-btn.btn-rh.el-button--danger{
    margin: 0px 0 0 0  !important;
}
</style>
