<template>
    <transition name="el-zoom-in-top">
        <div class="content-wrapper">
            <section class="content-header">
                <h3 @click="addProxy">Add Proxies <i class="el-icon-circle-plus-outline viralproof-icon--add"></i></h3>
            </section>
            <section class="content">
              <div class="user-listing">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>IP</th>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Port</th>
                    <th>Assigned</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                  <tr v-for="(proxy, index) in proxies.data" v-bind:key="proxy.id">
                    <td>{{proxy.ip}}</td>
                    <td>{{proxy.username}}</td>
                    <td>{{proxy.password}}</td>
                    <td>{{proxy.port}}</td>
                    <td>{{proxy.insta_accounts_count}}</td>
                    <td>
                      <el-button type="primary" icon="el-icon-edit" v-if="proxy" @click="handleAction(index, proxy)">Edit</el-button>
                    </td>
                  </tr>
                </tbody>
              </table>
              </div>
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="proxies.current_page" 
                :page-size="proxies.per_page"
                layout="total, prev, pager, next"
                :total="proxies.total">
                </el-pagination>
            </section>
        </div>
    </transition>
</template>

<script>
import router from "../../../../router/index";
import Proxy from "../../../../services/proxy";
export default {
  name: "proxy-list",
  data() {
    return {
      proxies: []
    };
  },
  created() {
    this.getProxies();
  },
  methods: {
    addProxy() {
      router.push("/proxy/new");
    },
    handleAction(index, proxy) {
      router.push(`/proxy/${proxy.id}`);
    },
    handleCurrentChange(val) {
      console.log(val);
      this.getProxies(val);
    },
    getProxies(pageNum) {
      Proxy.getAllProxy(pageNum).then(
        res => {
          this.proxies = res.data.data;
        },
        err => {
          console.err("Error while fetchin proxies");
        }
      );
    }
  }
};
</script>

<style>
.viralproof-icon--add {
  cursor: pointer;
}
</style>
