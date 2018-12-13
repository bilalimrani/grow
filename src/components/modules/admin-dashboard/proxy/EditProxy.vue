<template>
    <transition name="el-zoom-in-top">
        <div class="content-wrapper">
            <section class="content-header">
                <h3>Update Proxy</h3>
            </section>
            <section class="content">
                <viralproof-proxy-form :proxy="proxy" :action="'update'" :showLoader="updatingProxy" @submitProxy="updateProxy"></viralproof-proxy-form>
            </section>
        </div>
    </transition>
</template>

<script>
import Proxy from "../../../../services/proxy";
import ProxyForm from "./ProxyForm.vue";
export default {
  name: "edit-proxy",
  created() {
    console.log(this.$route.params);
    const id = this.$route.params.id;
    Proxy.getProxy(id).then(
      res => {
        this.proxy = res.data.data;
        console.log(this.proxy);
      },
      err => {
        console.error("Error occured while fetching proxy");
      }
    );
  },
  data() {
    return {
      proxy: {
        ip: "",
        port: "",
        username: "",
        password: "",
        status: ""
      },
      updatingProxy: false
    };
  },
  components: {
    "viralproof-proxy-form": ProxyForm
  },
  methods: {
    updateProxy() {
      this.updatingProxy = true;
      Proxy.editProxy(this.proxy).then(
        res => {
          this.updatingProxy = false;
          const toastSuccess = {
            body: "Your Proxy updated successfully.",
            title: "Success"
          };
          this.$snotify.success(toastSuccess.body, toastSuccess.title);
          router.push("/proxies");
        },
        err => {
          this.updatingProxy = false;
          const toastError = {
            body: "Error occured while updating proxy.",
            title: "Error"
          };
          this.$snotify.error(toastError.body, toastError.title);
        }
      );
    }
  }
};
</script>
