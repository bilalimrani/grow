<template>
    <transition name="el-zoom-in-top">
        <div class="content-wrapper">
            <section class="content-header">
                <h3>Update User</h3>
            </section>
            <section class="content">
                <viralproof-user-form :user="user" :action="'update'" :showLoader="updatingUser" @submitProxy="updateUser"></viralproof-user-form>
            </section>
        </div>        
    </transition>
</template>

<script>
import User from "../../../../services/user";
import UserForm from "./UserForm.vue";
export default {
  name: "user-edit",
  components: {
    "viralproof-user-form": UserForm
  },
  created() {
    console.log(this.$route.params);
    User.getUser(this.$route.params.id).then(
      res => {
        this.user = res.data.data;
      },
      err => {
        console.error("Error occured while fetching user detaila", err);
      }
    );
  },
  data() {
    return {
      user: {
        fname: "",
        lname: "",
        plan: ""
      },
      updatingUser: false
    };
  },
  methods: {
      updateUser() {
          console.log('updating user');
        //   this.updatingProxy = true;
      }
  }
};
</script>

