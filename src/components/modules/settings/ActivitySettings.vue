<template>
<div>
  <transition name="el-zoom-in-top" v-if="!showNoAccountMessage">
    <div class="content-wrapper">
        <section class="content-header">
          <h3>Activity Setting</h3>
      </section>
      <section class="content activity-settings">
        <div class="row no-gutters">
          <div class="col-md-5">
        <div class="col-md-12 col-xl-12  no-padding">
          <div class="container-widget-two">
            <div class="widget-two switches">
              <h4 class="main-head">Activity type</h4>
              <p>Activities performed by your account</p>
              <span class="full clearfix">
                <el-switch v-model="activitySettings.is_likes" :active-value="config.active" :inactive-value="config.inactive" active-color="#13ce66"> </el-switch>
              <span class="lhs-cont">Likes</span>
                <span class="fig float-right">{{user.insta_accounts[0].likes_count}}</span>
              </span>
              <span class="full clearfix">
                <el-switch v-model="activitySettings.is_follows" :active-value="config.active" :inactive-value="config.inactive" active-color="#13ce66"> </el-switch>
              <span class="lhs-cont">Follows</span>
                <span class="fig float-right">{{user.insta_accounts[0].follows_count}}</span>
              </span>
              <span class="full clearfix">
                <el-switch v-model="activitySettings.is_comments" :active-value="config.active" :inactive-value="config.inactive" active-color="#13ce66"> </el-switch>
              <span class="lhs-cont">Comments</span>
                <span class="fig float-right">{{user.insta_accounts[0].comments_count}}</span>
              </span>
              <span class="full clearfix">
                <el-switch v-model="activitySettings.is_unfollows" @change="unfollowOptionChanged(activitySettings.is_unfollows)" :active-value="config.active" :inactive-value="config.inactive" active-color="#13ce66"> </el-switch>
              <span class="lhs-cont">Unfollows</span>
                <span class="fig float-right">{{user.insta_accounts[0].unfollows_count}}</span>
              </span>
              </div>
          </div>
        </div>
         <div class="col-md-12 col-xl-12 no-padding">
          <div class="container-widget-two">
            <div class="widget-two switches Unf">
              <h4 class="main-head">Unfollow options</h4>
              <p>Activities performed by your account</p>
              <span class="full clearfix" v-for="unfollowOption in unfollowOptions" v-bind:key="unfollowOption.key">
                  <el-switch v-model="unfollowOption.value" @change="updateUnfollowSettings(unfollowOption.value)" :active-value="unfollowOption.active" :inactive-value="unfollowOption.inactive" active-color="#13ce66"> </el-switch>
                  <span class="lhs-cont">{{unfollowOption.text}}</span>
              </span>
              </div>
          </div>
        </div>
          </div>
          <div class="col-md-7">
       <div class="col-md-12 col-xl-12  no-padding">
          <div class="container-widget-two">
            <div class="widget-two switches filter-sett clearfix">
            <h4 class="main-head">Filter Settings</h4>
              <p>Filter the posts that your account will interact with</p>
              <div class="col-md-6 light-bg">
                <div class="row">
                  <div class="col-md-6 lhs-set">
                    <h4>Min Like Count
                      <el-tooltip placement="top" effect="dark">
                        <div slot="content">
                          <p class="media-age--tooltip">
                          Interact only with media that have<br/>
                          minimum selected amount of likes.
                          </p>
                          <p class="media-age--tooltip">
                            Use it along with <b>Max. Likes Count</b><br/>
                            to set desired range of media popularity.<br/>
                            <!-- Recommended values: 0-5<br/> -->
                            Set to 0(zero) to disable this filter
                          </p>
                        </div>
                        <span class="question-mark--icon">&#63;</span>
                    </el-tooltip>
                  </h4>
                  </div>
                  <div class="col-md-6 act">
                    <el-input-number size="small" name="min_likes_count" v-model="activitySettings.min_likes_count" :min="0"></el-input-number>
                  
                    <!-- <el-input v-validate="'required|min_value:0'" name="min_like_count" placeholder="" v-model="activitySettings.min_likes_count"> -->
                    <!-- </el-input> -->
                  </div>

                </div>
                <!-- <span slot="error" v-show="errors.has('min_likes_count')" class="text-danger">{{ errors.first('min_likes_count') }}</span> -->
                <!-- <span v-show="errors.has('min_like_count')" class="text-danger info-msz">{{ errors.first('min_like_count') }}</span> -->
                </div>
              <div class="col-md-6 light-bg">
                <div class="row">
                  <div class="col-md-6 lhs-set">
                    <h4>Max Like Count
                      <el-tooltip placement="top" effect="dark">
                        <div slot="content">
                          <p class="media-age--tooltip">
                        Interact only with media that have<br/>
                          maximum selected amount of likes.
                          </p>
                          <p class="media-age--tooltip">
                            Use it along with <b>Min. Likes Count</b><br/>
                            to set desired range of media popularity.<br/>

                            <!-- Recommended values: 0-5<br/> -->
                            Set to 0(zero) to disable this filter
                          </p>
                        </div>
                        <span class="question-mark--icon">&#63;</span>
                    </el-tooltip>
                  </h4>
                  </div>
                  <div class="col-md-6 act">
                    <el-input-number size="small" v-model="activitySettings.max_likes_count" :min="0"></el-input-number>
                    <!-- <el-input v-validate="'required|min_value:0'" name="max_likes_count" placeholder="" v-model="activitySettings.max_likes_count"></el-input> -->

                  </div>

                </div>
                <!-- <span v-show="errors.has('max_likes_count')" class="text-danger info-msz">{{ errors.first('max_likes_count') }}</span> -->
                </div>
                <div class="col-md-6 light-bg full-in-tab">
                  <div class="row">
                <div class="col-md-6"><h4>Max Media Age
                  <el-tooltip placement="top" effect="dark">
                    <div slot="content">
                      <p class="media-age--tooltip">
                      This setting will help you to choose an<br/>
                      age of media you want to interact with.<br/>
                      From the newest one to the oldest.
                      </p>
                      <p class="media-age--tooltip">
                        For example: Select 1 Day if you want to<br/>
                        interact only with media that not older<br/>
                        than 1 day.
                      </p>
                    </div>
                    <span class="question-mark--icon">&#63;</span>
                  </el-tooltip>
                </h4>

                </div>
                <div class="col-md-6">
                  <el-select v-model="activitySettings.max_media_age" name="max_media_age" placeholder="" v-validate="'required'">
                    <el-option
                      v-for="item in mediaAge.options"
                      :key="item.id"
                      :label="item.name"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <span slot="error" v-show="errors.has('max_media_age')" class="text-danger">{{ errors.first('max_media_age') }}</span>
                  <!-- <el-input v-validate="'required|min_value:1'" name="max_media_age" placeholder="" v-model="activitySettings.max_media_age"></el-input>
                  <span v-show="errors.has('max_media_age')" class="text-danger">{{ errors.first('max_media_age') }}</span> -->
                </div>
                </div>
                </div>
            </div>

          </div>
        </div>
        <div class="col-md-12 col-xl-12  no-padding">
          <div class="container-widget-two">
            <div class="widget-two switches filter-sett clearfix">
            <h4 class="main-head">Comments</h4>
              <p>The comments that Rocket Growth posts on your behalf - if enabled </p>
              <vproof-chips :chips="commentSettings.comments" @remove="removeComment($event, commentSettings.comments)"></vproof-chips>
              <el-input type="textarea" name="textarea" :rows="2" class="full"  placeholder="Enter Comments..." v-model="commentSettings.comment"></el-input>
              <button :disabled="addCommentInProgress" class="btn btn-primary full cstm-btn" @click="addComment(commentSettings.comment)">
                <vproof-loader :showLoader="addCommentInProgress" :icon="'fas fa-comment'" :message="'Add Comment'" :loadingMessage="'Adding'"></vproof-loader>
              </button>
            </div>

          </div>
        </div>
          </div>
        </div>
        <button @click="updateSettings" :disabled="saveSettingsInProgress" class="btn btn-primary full mt20 mb80 cstm-btn">
          <vproof-loader :showLoader="saveSettingsInProgress" :icon="'far fa-save'" :message="'Save Settings'" :loadingMessage="'Saving'"></vproof-loader>
        </button>
              </section>
    </div>
  </transition>
  <transition name="el-zoom-in-top" v-else>
      <div class="content-wrapper">
          <section class="content-header">
              <h3>Activity Settings</h3>
          </section>
          <div class="alert ad-alert" role="alert">
              <h3>You need to connect your Instagram account!</h3>
          </div>
      </div>
  </transition>
</div>
</template>
<script>
import Instagram from "../../../services/instagram";
import Notify from "../../../services/notify";
import User from "../../../services/user";
import Chips from "../../lib/Chips.vue";
import InlineLoader from "../../lib/InlineLoader.vue";
export default {
  name: "ActivitySettings",
  created() {
    this.user = User.user;
    if (!User.user.insta_accounts.length) {
      this.showNoAccountMessage = true;
    } else {
      Instagram.getAllSettings(Instagram.settingType.settingType)
        .then(
          res => {
            this.activitySettings = res.data.data;
            if (!this.activitySettings.max_media_age) {
              this.activitySettings.max_media_age = this.mediaAge.options[0].value;
            }
            this.validator.maxFollowCount.args = this.activitySettings.max_likes_count;
            this.validator.unfollowOptions.args = this.activitySettings.is_unfollows;
            const option = this.unfollowOptions.find(
              option => option.active === this.activitySettings.unfollow_settings
            );
            if (option) {
              option.value = this.activitySettings.unfollow_settings;
              // turn unfollow option off if parent control is off
              option.value =
                this.activitySettings.is_unfollows === 0 ? "" : option.value;
            }
            return Instagram.getAllComments();
          },
          err => console.error("Error occured while fetching settings")
        )
        .then(
          res => {
            this.commentSettings.comments = res.data.data.map(val => {
              return { value: val.text, id: val.id };
            });
          },
          err => console.error("Error while fetcing comments", err)
        );
    }
  },
  data() {
    return {
      activitySettings: {},
      config: { active: 1, inactive: 0 },
      user: "",
      showNoAccountMessage: false,
      mediaAge: {
        options: [
          { id: 1, name: "any", value: 0 },
          { id: 2, name: "1 hour", value: 1 },
          { id: 3, name: "12 hour", value: 12 },
          { id: 4, name: "1 day", value: 24 },
          { id: 5, name: "3 days", value: 72 },
          { id: 6, name: "1 week", value: 168 },
          { id: 7, name: "2 weeks", value: 336 },
          { id: 8, name: "1 month", value: 730 }
        ]
      },
      unfollowOptions: [
        {
          active: "ALL",
          inactive: "",
          text: `Unfollow all my followers`,
          key: 1,
          value: ""
        },
        {
          active: "NOT_FOLLOWING",
          inactive: "",
          text: `Only unfollow who don't following me back`,
          key: 2,
          value: ""
        },
        {
          active: "SYSTEM",
          inactive: "",
          text: `Unfollow everyone who is followed by Rocket Growth`,
          key: 3,
          value: ""
        }
      ],
      commentSettings: { comments: [], comment: "" },
      saveSettingsInProgress: false,
      addCommentInProgress: false,
      validator: {
        maxFollowCount: { args: 0 },
        unfollowOptions: { args: 0, isUpdated: false }
      }
    };
  },
  components: {
    "vproof-chips": Chips,
    "vproof-loader": InlineLoader
  },
  methods: {
    updateSettings() {
      const maxLikeCount = this.activitySettings.max_likes_count;
      const isMinValueValid = maxLikeCount && this.activitySettings.min_likes_count > maxLikeCount  ? false : true;
      if (!isMinValueValid) {
        this.$snotify.error('The min likes count must be less than or equal to max like count', 'error');
      } else {
        this.$validator.validateAll().then(isValid => {
          if (isValid) {
            if (this.isUnfollowEnabled()) {
              // If unfollow option enabled, show confirmation popup.
              const confirmationConfig = this.getUnFollowConfirmationOptions();
              Notify.confirm(this.$snotify, confirmationConfig).then(
                res => {
                  this.updateSettingsInBackend();
                },
                err => {
                  console.log("Confirmation rejected", err);
                }
              );
            } else {
              this.updateSettingsInBackend();
            }
          }
        });
      }
    },
    updateSettingsInBackend() {
      console.log("updating settings");
      this.saveSettingsInProgress = true;
      Instagram.updateSettings(this.activitySettings).then(
        res => {
          this.saveSettingsInProgress = false;
          console.log("settings updated successfully");
          this.resetValidators();
          const toastSuccess = {
            body: "Your settings updated successfully.",
            title: "Success"
          };
          this.$snotify.success(toastSuccess.body, toastSuccess.title);
        },
        err => {
          this.saveSettingsInProgress = false;
          console.error("Erro occured while updating settings");
        }
      );
    },
    addComment(comment) {
      const data = {
        text: comment
      };
      if (comment) {
        this.addCommentInProgress = true;
        Instagram.addComment(data).then(
          res => {
            console.log("Comment saved successfully");
            this.commentSettings.comments.push({
              value: comment,
              id: res.data.data.id
            });
            this.commentSettings.comment = "";
            const toastSuccess = {
              body: "Your comment added successfully.",
              title: "Success"
            };
            this.addCommentInProgress = false;
            this.$snotify.success(toastSuccess.body, toastSuccess.title);
          },
          err => {
            this.addCommentInProgress = false;
            console.error("Error occured while saving comment");
          }
        );
      }
    },
    removeComment(comment, arr) {
      console.log("Removing comment...", comment);
      Instagram.removeComment(comment.chip).then(
        res => {
          arr.splice(comment.index, 1);
          console.log("Comment removed successfully");
          const toastSuccess = {
            body: "Your comment removed successfully.",
            title: "Success"
          };
          this.$snotify.success(toastSuccess.body, toastSuccess.title);
        },
        err => console.error("Error while removing comment")
      );
    },
    updateUnfollowSettings(option) {
      // whenever an unfollow option is turned on, make sure to turn its parent control on
      if (option) {
        this.activitySettings.is_unfollows = 1;
      }

      this.activitySettings.unfollow_settings = option;
      var count = 0;
      this.unfollowOptions.forEach(unfollowOption => {
        if (option !== unfollowOption.active) {
          unfollowOption.value = "";
          count += 1;
        }
        if (count === this.unfollowOptions.length) {
          this.activitySettings.is_unfollows = this.config.inactive;
        }
      });
    },

    unfollowOptionChanged(isTurnedOn) {
      if (isTurnedOn === 1) {
        // turn SYSTEM unfollow option when parent control is turned on
        this.unfollowOptions[2].value = "SYSTEM";
        this.activitySettings.unfollow_settings = "SYSTEM";
        if (this.validator.unfollowOptions.args === isTurnedOn) {
          this.validator.unfollowOptions.isUpdated = false;
        } else {
          this.validator.unfollowOptions.isUpdated = true;
        }
      } else {
        this.validator.unfollowOptions.isUpdated = false;
        // turn off all unfollow options
        this.unfollowOptions.forEach(unfollowOption => {
          unfollowOption.value = "";
        });
      }
    },
    resetValidators() {
      // update max like count and unfollow validator value so that validate according to new value.
      this.validator.maxFollowCount.args = this.activitySettings.max_likes_count;
      this.validator.unfollowOptions.args = this.activitySettings.is_unfollows;
      this.validator.unfollowOptions.isUpdated = false;
    },
    isUnfollowEnabled() {
      return (
        this.activitySettings.is_unfollows &&
        this.validator.unfollowOptions.isUpdated
      );
    },
    getUnFollowConfirmationOptions() {
      return {
        body: "You just turned on unfollows setting. Are you sure?",
        title: "Confirmation",
        buttons: { success: "Yes", error: "No" }
      };
    }
  }
};
</script>
<style scoped>
.media-age--tooltip {
  line-height: 1.7em;
}
.question-mark--icon {
  cursor: pointer;
}
.el-input-number--small {
  width: 96px;
}
</style>


