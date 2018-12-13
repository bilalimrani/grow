<template>
     <transition name="el-zoom-in-top">
        <div class="content-wrapper">
            <section class="content-header">               
             <h3>Settings</h3>
            </section>
            <section class="content">
                <div class="box no-shadow">
                    <div class="row">
                        <div class="col-md-3">
                            <button class="btn btn-danger" @click="removeProxies"> Remove Unused Proxies </button>
                        </div>
                    </div>
                    <div class="row account-proxy">
                        <div class="col-md-12">
                            <label for="accountsPerProxy">Account Per Proxy</label><br/>
                            <el-input-number size="small" name="Accounts Per Proxy" v-model="accountsPerProxy" :min="1"></el-input-number>
                            <!-- <input type="number" v-model="accountsPerProxy"/> -->
                            <button class="btn btn-primary vp-btn" @click="saveInstaSettings">Save</button>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    </transition>
</template>

<script>
    import SettingsService from '../../../services/settings.service'
    import constants from '../../../constants'

    export default {
        created() {
            this.getInstaConfig()
        },
        data() {
            return {
                accountsPerProxy: 0
            }
        },
        methods: {
            getInstaConfig() {
                SettingsService.getInstaConfig().then(res => {
                    const configList = res.data.data
                    console.log('insta config ', res);
                    const accountPerProxyObject = configList.find(config => {
                        return config.key === constants.instaConfig.accountsPerProxy
                    })
                    this.accountsPerProxy = accountPerProxyObject.value
                })
            },
            removeProxies() {
                 this.$snotify.confirm(
                    `Are you sure to delete all unused proxies?`,
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
                            SettingsService.removeProxies()
                            .then(
                            res => {
                                const toastSuccess = {
                                body: "All unused proxies removed successfully",
                                title: "Success!"
                                };
                                
                                this.$snotify.success(
                                toastSuccess.body,
                                toastSuccess.title
                                );
                            },
                            err => {
                                const toastSuccess = {
                                body: "Proxies cannot be removed",
                                title: "Try later!"
                                };
                                this.$snotify.error(toastSuccess.body, toastSuccess.title);
                            }
                            );
                        },
                        bold: false
                        },
                        { text: "No", action: toast => this.$snotify.remove(toast.id) }
                    ]
                    }
                );
            },

            saveInstaSettings() {
                SettingsService.saveInstaConfig([ 
                    { 
                        key: constants.instaConfig.accountsPerProxy,
                        'value': '' + this.accountsPerProxy // server asks for a string value
                    }
                ]).then(res => {
                    return this.getInstaConfig()
                }).then(res => {
                     this.$snotify.success('Accounts per proxy updated', 'Updated');
                })
            }
        },
    }
</script>

<style scoped>
.account-proxy {
    margin-top: 40px;
}
</style>