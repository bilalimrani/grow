<template>
    <transition name="el-zoom-in-top">
        <div class="content-wrapper">
            <section class="content-header">
                <h3>New Proxy</h3>
            </section>
            <section class="content">
                <viralproof-proxy-form :proxy="proxy" :action="'add'" :showLoader="addingProxy" @submitProxy="addProxy"></viralproof-proxy-form>
            </section>
        </div>
    </transition>
</template>

<script>
import ProxyForm from "./ProxyForm.vue";
import Proxy from "../../../../services/proxy";
import router from "../../../../router/index";
export default {
  name: "new-proxy",
  data() {
    return {
      proxy: {
        ip: "",
        port: "",
        username: "",
        password: "",
        status: "VALID"
      },
      addingProxy: false
    };
  },
  components: {
    "viralproof-proxy-form": ProxyForm
  },
  methods: {
    addProxy() {
      this.addingProxy = true;
      Proxy.addProxy(this.proxy).then(
        res => {
          this.addingProxy = false;
          const toastSuccess = {
            body: "Your Proxy added successfully.",
            title: "Success"
          };
          this.$snotify.success(toastSuccess.body, toastSuccess.title);
          router.push("/proxies");
        },
        err => {
          this.addingProxy = false;
          const toastError = {
            body: "Error occured while adding proxy.",
            title: "Error"
          };
          this.$snotify.error(toastError.body, toastError.title);
        }
      );
    }
  }
};
</script>

