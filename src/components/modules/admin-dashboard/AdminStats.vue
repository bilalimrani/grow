<template>
    <transition name="el-zoom-in-top">
        <div class="content-wrapper">
            <section class="content-header">               
             <h3>Dashboard</h3>
            </section>
            <section class="content">
                <div class="box">
                    <div class="row-fluid">
                        <div class="col-lg-3 col-md-6 tile" @click="navigate('/users')">
                            <span class="ti-user rel-ico"></span>
                            <div class="box palette-Pink-300 bg">
                                <div class="box-header  palette-Pink-300 bg"> </div>
                                <div class="box-body no-pad" style="display: block;">
                                    <div class="events-nest  card-head text-center ">
                                        <div class="wrap-no-pad text-white"> 
                                            <h5 class="count-fig">{{adminStats.total_users | sanitizeNull}}</h5>
                                            <span>Total Users</span>
                                        
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 tile">
                            <span class="ti-user rel-ico"></span>
                            
                            <div class="box palette-Cyan-400 bg">
                                <div class="box-header  palette-Cyan-400 bg"> </div>
                                <div class="box-body no-pad" style="display: block;">
                                    <div class="events-nest  card-head text-center ">
                                        <div class="wrap-no-pad text-white"> 
                                            <h5 class="count-fig">{{adminStats.paid_users | sanitizeNull}}</h5>
                                            <span>Paid Users</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 tile">
                            <span class="ti-user rel-ico"></span>
                            <div class="box palette-Deep-Purple-300 bg">
                                <div class="box-header  palette-Deep-Purple-300 bg"> </div>
                                <div class="box-body no-pad" style="display: block;">
                                    <div class="events-nest  card-head text-center ">
                                        <div class="wrap-no-pad text-white"> 
                                            <h5 class="count-fig">{{adminStats.trial_users | sanitizeNull}}</h5>
                                            <span>Trial Users</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 tile">
                            <span class="ti-bar-chart rel-ico"></span>
                            <div class="box palette-Indigo-900 bg">
                                <div class="box-header  palette-Indigo-900 bg"> </div>
                                <div class="box-body no-pad" style="display: block;">
                                    <div class="events-nest  card-head text-center ">
                                        <div class="wrap-no-pad text-white"> <h5 class="count-fig">{{adminStats.revenue | sanitizeNull}}</h5>
                                            <span>Revenue</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </transition>
</template>
<script>
import router from "../../../router/index";
import User from "../../../services/user";
export default {
  name: "AdminStats",
  data() {
    return {
      adminStats: {}
    };
  },
  created() {
    User.getAdminStats().then(
      res => {
        this.adminStats = res.data.data;
      },
      err => {
        console.error("Error while fetching admin stats");
      }
    );
  },
  methods: {
    navigate(route) {
      router.push(route);
    }
  }
};
</script>
<style scoped>
.tile {
  cursor: pointer;
}
</style>
