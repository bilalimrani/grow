<template>
        <transition name="el-zoom-in-top" v-if="!showNoAccountMessage">
        <div class="content-wrapper">
            <!-- Content Header (Page header) -->
            <section class="content-header">
                <h3>Target Audience</h3>
            </section>
            <!-- Username Targetting Modals -->

            <modal 
            name="usernameTargetting"
            transition="nice-modal-fade"
            :adaptive="true"
            :clickToClose="false"
            :maxHeight="200"
            >
                <a class="close cross-close" @click="closeInstaUserSearchModal()" aria-label="close">&times;</a>
                <h3 class="model-pop full">Add Username</h3>
                <div class="modal-body">
                    <form @submit.prevent="searchUser">
                        <div class="input-group input-group-lg">
                            <span class="input-group-addon" id="sizing-addon1"><i class="far fa-user"></i></span>
                            <input type="text" v-model="searchParameters.username" class="form-control" placeholder="Username" aria-describedby="sizing-addon1">
                        </div>
                        <button :disabled="searchInProgress" class="btn btn-secondary btn-block modal-button" type="submit">
                            <vproof-loader :showLoader="searchInProgress" :icon="'fas fa-search'" :message="'Search User'" :loadingMessage="'Searching'"></vproof-loader>
                        </button>
                    </form>
                </div>
            </modal>

            <modal 
            name="usernameResults"
            transition="nice-modal-fade"
            :scrollable="true"
            :adaptive="true"
            :clickToClose="false"
            >
                <div class="modal-body">
                    <a class="close cross-close" @click="closeInstaFilterModal('usernameResults')" aria-label="close">&times;</a>
                    <h4 class="pop-title">Select Username</h4>
                    <span class="top-tie follwy">Followers</span>
                    <ul class="list-group">
                        <li class="list-group-item clearfix" @click="updateSelectedUsers(user)" v-for="user in filterdList.users" v-bind:key="user.username">
                            <img :src="user.profile_pic_url" alt="Avatar" class="avatar">
                            <p>{{user.username}}</p>
                            <span  class="text-right counts-on mob-res">{{ user.follower_count| formatNumber }}</span>
                        </li>
                    </ul>
                </div>
            </modal>

            <!-- HashTag Targetting Modals -->

            <modal 
            name="hashtagTargetting"
            transition="nice-modal-fade"
            :clickToClose="false"
            :adaptive="true"
            :maxHeight="200"
            >
             <a class="close cross-close" @click="closeInstaHashtagSearchModal()" aria-label="close">&times;</a>
             <h3 class="model-pop full">Add Hashtag</h3>
                <div class="modal-body">
                   <form @submit.prevent="searchHashTag">
                        <div class="input-group input-group-lg">
                            <span class="input-group-addon" id="sizing-addon1"><i class="fas fa-hashtag"></i></span>
                            <input type="text" v-model="searchParameters.hashtag" class="form-control" placeholder="Search Hashtag" aria-describedby="sizing-addon1">
                        </div>
                        <button :disabled="searchInProgress" class="btn btn-secondary btn-block modal-button" type="submit">
                            <vproof-loader :showLoader="searchInProgress" :icon="'fas fa-search'" :message="'Search Hashtag'" :loadingMessage="'Searching'"></vproof-loader>
                        </button>
                   </form>
                </div>
            </modal>

            <modal 
            name="hashtagResults"
            transition="nice-modal-fade"
            :clickToClose="false"
            :adaptive="true"
            >
                <div class="modal-body">
                    <a class="close cross-close" @click="closeInstaFilterModal('hashtagResults')" aria-label="close">&times;</a>
                    <h4 class="pop-title">Hashtags</h4>
                    <span title="posts" class="top-tie hashy">posts</span>                                
                    <ul class="list-group">
                        <li class="list-group-item clearfix hashes" @click="updateSelectedHashtags(hashtag)"  v-for="hashtag in filterdList.hashtags" v-bind:key="hashtag.name">
                            <P class="hashtag_name"># {{hashtag.name}}</P>
                            <span class="count text-right counts-on" v-if="hashtag.media_count">{{hashtag.media_count | formatNumber}}</span>
                        </li>
                    </ul>
                </div>
            </modal>

            <!-- Location Targetting Modals -->

            <modal 
            name="locationTargetting"
            transition="nice-modal-fade"
            :clickToClose="false"
            :adaptive="true"
            :maxHeight="200"
            >
            <a class="close cross-close" @click="closeInstaLocationSearchModal()" aria-label="close">&times;</a>
            <h3 class="model-pop full">Add Location</h3>
                <div class="modal-body">
                    <form @submit.prevent="searchLocation">
                        <div class="input-group input-group-lg">
                            <span class="input-group-addon" id="sizing-addon1"><i class="fas fa-map-marker-alt"></i></span>
                            <input type="text" v-model="searchParameters.location" class="form-control" placeholder="Search Location" aria-describedby="sizing-addon1">
                        </div>
                        <button :disabled="searchInProgress" class="btn btn-secondary btn-block modal-button" type="submit">
                            <vproof-loader :showLoader="searchInProgress" :icon="'fas fa-search'" :message="'Search Location'" :loadingMessage="'Searching'"></vproof-loader>
                        </button>
                    </form>
                </div>
            </modal>

            <modal name="locationResults"
            transition="nice-modal-fade" 
            :clickToClose="false"
            :adaptive="true">
                <div class="modal-body">
                    <a class="close cross-close" @click="closeInstaFilterModal('locationResults')" aria-label="close">&times;</a>
                    <h4 class="pop-title">Locations</h4>
                    <ul class="list-group" v-if="filterdList.locations.length">
                        <li class="list-group-item clearfix location-list" @click="updateSelectedLocations(data.location)" v-for="data in filterdList.locations" v-bind:key="data.location.short_name">
                            <p class="" >{{data.location.short_name}}</p>
                            <span class="locator counts-on" v-if="data.location.address">{{data.location.address}}</span>
                        </li>
                    </ul>
                    <div class="no-record" v-if="!filterdList.locations.length">
                      <h4>No Location found</h4>
                    </div>
                </div>
            </modal>
            <!-- Main content -->
            <section class="content">
                <div class="box out-shadow">
                        <div class="box-body" style="min-height:400px;">
                        <div class="card-full widget-two Adduser">
                            <div class="lhs-inn-cont"><h4>Username Targeting</h4>
                            <p>Target the followers of other instagram users / your competitors</p>
                            <vproof-chips :chips="tags.selectedUsers" @remove="removeChip($event, tags.selectedUsers)"></vproof-chips>
                            </div>
                            
                        <button class="btn btn-primary" @click="addUsername"> <i class="fas fa-user-plus"></i> Add Username</button>
                        </div>
                        <div class="card-full widget-two hastag">
                            <div class="lhs-inn-cont"><h4>Hashtag Targeting</h4>
                            <p>Target the people that post using specific hashtags</p>
                             <vproof-chips :chips="tags.selectedHastags" @remove="removeChip($event, tags.selectedHastags)"></vproof-chips></div>
                           
                        <button class="btn btn-primary" @click="addHashTag"><i class="fas fa-hashtag"></i>Add Hashtag</button>
                        </div>
                        <div class="card-full widget-two location">
                             <div class="lhs-inn-cont"><h4>Location Targeting</h4>
                             <p>Target the people that post from a specific location</p>
                             <vproof-chips :chips="tags.selectedLocations" @remove="removeChip($event, tags.selectedLocations)"></vproof-chips></div>
                             
                        <button class="btn btn-primary" @click="addLocation"><i class="fas fa-map-marker-alt"></i>Add Location</button>
                        </div>                      
                    </div>
                    
                </div>
            </section>
            <!-- /.content -->
        </div>
    </transition>
    <transition name="el-zoom-in-top" v-else>
        <div class="content-wrapper">
            <section class="content-header">
                <h3>Target Audience</h3>
            </section>
            <div class="alert ad-alert" role="alert">
                <h3>You need to connect your Instagram account!</h3>
            </div>
        </div>
    </transition>
</template>

<script>
import Instagram from "../../../services/instagram";
import Utils from "../../../services/utils";
import User from "../../../services/user";
import Chips from "../../lib/Chips.vue";
import InlineLoader from "../../lib/InlineLoader.vue";
export default {
  name: "TargetAudience",
  created() {
    if (!User.user.insta_accounts.length) {
      this.showNoAccountMessage = true;
    }
    Instagram.getAllSettings(Instagram.settingType.target).then(
      res => {
        Utils.findAndPush(res.data.data, this.tags);
      },
      err => {
        console.error("Error occured while fetching settings...");
      }
    );
  },
  data() {
    return {
      tags: { selectedUsers: [], selectedHastags: [], selectedLocations: [] },
      searchParameters: { username: "", hashtag: "", location: "" },
      filterdList: { users: [], hashtags: [], locations: [] },
      searchInProgress: false,
      showNoAccountMessage: false
    };
  },
  components: {
    "vproof-chips": Chips,
    "vproof-loader": InlineLoader
  },
  methods: {
    addUsername() {
      this.$modal.show("usernameTargetting");
    },

    searchUser() {
      this.searchInProgress = true;
      Instagram.search(this.searchParameters).then(
        res => {
          this.filterdList.users = res.data.data.users;
          this.searchInProgress = false;
          this.$modal.hide("usernameTargetting");
          this.$modal.show("usernameResults");
        },
        err => {
          console.error("Error while fetching user list");
          this.searchInProgress = false;
        }
      );
    },

    addHashTag() {
      this.$modal.show("hashtagTargetting");
    },

    searchHashTag() {
      this.searchInProgress = true;
      Instagram.search(this.searchParameters).then(
        res => {
          this.filterdList.hashtags = res.data.data.results;
          this.searchInProgress = false;
          this.$modal.hide("hashtagTargetting");
          this.$modal.show("hashtagResults");
        },
        err => {
          console.error("Error while fetching user list");
          this.searchInProgress = false;
        }
      );
    },

    addLocation() {
      this.$modal.show("locationTargetting");
    },

    searchLocation() {
      this.searchInProgress = true;
      Instagram.search(this.searchParameters).then(
        res => {
          this.filterdList.locations = res.data.data.items;
          this.searchInProgress = false;
          this.$modal.hide("locationTargetting");
          this.$modal.show("locationResults");
        },
        err => {
          console.error("Error while fetching user list");
          this.searchInProgress = false;
        }
      );
    },
    updateSelectedUsers(user) {
      console.log("user added...", user.username);
      const data = {
        value: user.username,
        type: "USER",
        insta_pk: user.pk
      };
      const tag = this.findSelectedValue(this.tags.selectedUsers, data.value);
      if (!tag) {
        Instagram.addSettings(data).then(
          res => {
            this.$modal.hide("usernameResults");
            this.$modal.show("usernameTargetting");
            this.tags.selectedUsers.push(res.data.data);
            this.showNotificationOnTargetAdded('Username');
            this.resetSearchParams();
          },
          err => {
            console.error("Error while saving...");
          }
        );
      }
    },
    updateSelectedHashtags(hashtag) {
      console.log("hashtag added...", hashtag.name);
      const data = {
        value: hashtag.name,
        type: "HASH",
        insta_pk: hashtag.id
      };
      const tag = this.findSelectedValue(this.tags.selectedHastags, data.value);
      if (!tag) {
        Instagram.addSettings(data).then(
          res => {
            this.$modal.hide("hashtagResults");
            this.$modal.show("hashtagTargetting");
            this.tags.selectedHastags.push(res.data.data);
            this.showNotificationOnTargetAdded('Hashtag');
            this.resetSearchParams();
          },
          err => {
            console.error("Error while adding setting...");
          }
        );
      }
    },
    updateSelectedLocations(location) {
      console.log("location added...", location.name);
      const data = {
        value: location.name,
        type: "LOCATION",
        insta_pk: location.pk
      };
      const tag = this.findSelectedValue(
        this.tags.selectedLocations,
        data.value
      );
      if (!tag) {
        Instagram.addSettings(data).then(
          res => {
            this.$modal.hide("locationResults");
            this.$modal.show("locationTargetting");
            this.tags.selectedLocations.push(res.data.data);
            this.showNotificationOnTargetAdded('Location');
            this.resetSearchParams();
          },
          err => {
            console.error("Error while adding setting...");
          }
        );
      }
    },
    resetSearchParams() {
      this.searchParameters = { username: "", hashtag: "", location: "" };
    },
    removeChip(chip, arr) {
      Instagram.removeSetting(chip.chip).then(
        res => {
          arr.splice(chip.index, 1);
        },
        err => {
          console.error("Error while removing tag");
        }
      );
    },
    closeInstaUserSearchModal() {
      this.$modal.hide("usernameTargetting");
      this.resetSearchParams();
    },
    closeInstaHashtagSearchModal() {
      this.$modal.hide("hashtagTargetting");
      this.resetSearchParams();
    },
    closeInstaLocationSearchModal() {
      this.$modal.hide("locationTargetting");
      this.resetSearchParams();
    },
    closeInstaFilterModal(modalName) {
      this.$modal.hide(modalName);
      this.resetSearchParams();
    },
    findSelectedValue(collection, value) {
      return collection.find(ele => ele.value === value);
    },
    showNotificationOnTargetAdded(targetName) {
      const toastSuccess = {body: `${targetName} added successfully`, title: 'Success'}
      this.$snotify.success(toastSuccess.body, toastSuccess.title);
    }
  }
};
</script>

<style scoped>
.avatar {
  vertical-align: middle;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.out-shadow
{
  box-shadow: none;
}
.no-record {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 15%;
}

</style>
