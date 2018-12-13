import httpClient from './http-client';
import User from './user';
export default {
    connect(user) {
        return httpClient.post('accounts', user);
    },
    updateInstaBot(status) {
        const accountId = User.user.insta_accounts[0].id;
        return httpClient.put(`/accounts/${accountId}/statusUpdate`, status);
    },
    baseSettingUrl() {
        const accountId = User.user.insta_accounts[0].id;
        const settingId = User.user.insta_accounts[0].setting_id;
        return `accounts/${accountId}/settings/${settingId}`;
    },

    updateAccount(status, accountId) {
        const accId = accountId ? accountId : User.user.insta_accounts[0].id;
        return httpClient.put(`accounts/${accId}/statusUpdate`, { status: status });
    },

    search(options) {
        let params = {};
        switch (true) {
            case !!options.username:
                params = this.getSearchParams(options.username, 'USER');
                break;
            case !!options.hashtag:
                params = this.getSearchParams(options.hashtag, 'HASH');
                break;
            case !!options.location:
                params = this.getSearchParams(options.location, 'LOCATION');
                break;
            default:
                break;
        }
        const accountId = User.user.insta_accounts[0].id;
        return httpClient
            .get(
                `accounts/${accountId}/insta_search`,
                {
                    params
                }
            )
    },
    settingType: { target: 'targets', activity: '', comment: 'comments' },
    addSettings(data) {
        const url = `${this.baseSettingUrl()}/targets`;
        return httpClient.post(url, data);
    },
    getSearchParams(q, type) {
        return { q, type }
    },
    getAllSettings(type) {
        if (User.user.insta_accounts.length) {
            const url = `${this.baseSettingUrl()}${type ? '/' + type : ''}`;
            return httpClient.get(url);
        } else {
            return new Promise((res, rej) => rej(false));
        }
    },
    removeSetting(setting) {
        const url = `${this.baseSettingUrl()}/targets/${setting.id}`;
        return httpClient.delete(url);
    },
    createDefaultSetting(accId = null) {
        const accountId = accId ? accId : User.user.insta_accounts[0].id;
        const url = `accounts/${accountId}/settings`;
        return httpClient.post(url);
    },
    updateSettings(settings) {
        const url = `${this.baseSettingUrl()}`;
        return httpClient.put(url, settings);
    },
    addComment(comment) {
        const url = `${this.baseSettingUrl()}/${this.settingType.comment}`;
        return httpClient.post(url, comment);
    },
    getAllComments() {
        const url = `${this.baseSettingUrl()}/${this.settingType.comment}`;
        return httpClient.get(url);
    },
    removeComment(comment) {
        const url = `${this.baseSettingUrl()}/${this.settingType.comment}/${comment.id}`;
        return httpClient.delete(url);
    }
}
