<template>
  <transition name="el-zoom-in-top">
    <div class="content-wrapper">
      <section class="content-header">
        <h3>Users</h3>
      </section>
      <section class="content">
        <div class="user-listing">
          <table class="table table-striped">
            <thead>
            <tr>
              <th>First name</th>
              <th>Last name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Plan</th>
              <th>Action</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="user in users.data" v-bind:key="user.id">
              <td>{{user.fname}}</td>
              <td>{{user.lname}}</td>
              <td>{{user.email}}</td>
              <td
                :class="{'active' : user.insta_accounts[0].status=='ACTIVE', 'inactive' : user.insta_accounts[0].status=='INACTIVE'}"
                v-if="user.insta_accounts.length">
                {{ user.insta_accounts[0].status }}
              </td>
              <td v-else>
                Not Connected
              </td>

              <td>
                <!-- Show FREE plan as trial -->
                {{
                user.subscription ?
                (user.subscription.plan.name.toUpperCase() === 'FREE' ? 'TRIAL' : user.subscription.plan.name)
                : ''
                }}
              </td>
              <td>
                <button v-if="user.insta_accounts.length" :disabled="user.updateInProgress"
                        class="btn btn-secondary btn-block modal-button stat-act"
                        @click="handleStatus(user.$index, user)">
                  <viralproof-loader :showLoader="user.updateInProgress"
                                     :message="`Do ${user.insta_accounts[0].status === 'INACTIVE' ? 'ACTIVE' : 'INACTIVE'}`"
                                     :loadingMessage="'Loading'"></viralproof-loader>
                </button>
                <button class="btn btn-danger"><i class="fa fa-trash"></i></button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="users.current_page"
          :page-size="users.per_page"
          layout="total, prev, pager, next"
          :total="users.total">
        </el-pagination>
      </section>
    </div>
  </transition>
</template>

<script>
  import User from "../../../../services/user";
  import Instagram from "../../../../services/instagram";
  import router from "../../../../router/index";
  import InlineLoader from "../../../lib/InlineLoader.vue";

  export default {
    name: "user-list",
    created() {
      this.getUsers();
    },
    components: {
      "viralproof-loader": InlineLoader
    },
    data() {
      return {
        users: [],
        currentPage: 1
      };
    },
    methods: {
      handleStatus(index, row) {
        console.log(index, row);
        row.updateInProgress = true;
        const statusList = {
          ACTIVE: "INACTIVE",
          INACTIVE: "ACTIVE",
          PAUSE: "ACTIVE"
        };
        this.$snotify.confirm(
          `Are you sure to make this account ${
            statusList[row.insta_accounts[0].status]
            } ?`,
          "Confirmation",
          {
            closeOnClick: false,
            pauseOnHover: true,
            position: "centerTop",
            buttons: [
              {
                text: "Yes",
                action: toast => {
                  this.$snotify.remove(toast.id);
                  Instagram.updateAccount(
                    statusList[row.insta_accounts[0].status],
                    row.insta_accounts[0].id
                  ).then(
                    res => {
                      row.updateInProgress = false;
                      const toastSuccess = {
                        body: "Account updated successfully.",
                        title: "Success"
                      };
                      row.insta_accounts[0].status =
                        statusList[row.insta_accounts[0].status];
                      this.$snotify.success(
                        toastSuccess.body,
                        toastSuccess.title
                      );
                    },
                    err => {
                      row.updateInProgress = false;
                      const toastSuccess = {
                        body: "Error occured while updating status.",
                        title: "Error"
                      };
                      this.$snotify.error(toastSuccess.body, toastSuccess.title);
                    }
                  );
                },
                bold: false
              },
              {text: "No", action: toast => this.$snotify.remove(toast.id)}
            ]
          }
        );
      },
      handleAction(index, user) {
        router.push(`/user/${user.id}`);
      },
      handleCurrentChange(val) {
        console.log(val);
        this.getUsers(val);
      },
      handleSizeChange(val) {
        console.log(val);
      },
      getUsers(pageNum) {
        User.getAllUsers(pageNum).then(
          res => {
            this.users = res.data.data;
          },
          err => {
            console.error("Error occured while fetching users");
          }
        );
      }
    }
  };
</script>

