import apiService from "@/common/api.service";
import {starterApps} from "@/common/starterApps";
import appsService from "@/common/apps.service";


const appidService = {

    getAppID() {

        return new Promise((resolve) => {
            chrome.storage.local.get('appId', function(result) {
                if (result.appId && result.appId !== '' && result.appId !== undefined) {
                    resolve(result.appId);
                } else {
                    this.createAppID().then(data => {
                        resolve(data);
                    });
                }
            });
        });
    },

    checkIfHasAppID() {
        return new Promise((resolve) => {
            chrome.storage.local.get('appId', function(result) {
                if (result.appId && result.appId !== '' && result.appId !== undefined) {
                    resolve(result.appId);
                } else {
                    resolve(false);
                }
            });
        });
    },

    resetAppID() {
        return new Promise((resolve) => {
            this.createAppID().then(data => {
                resolve(data);
            });
        });
    },

    loginUser(email, password) {
        return new Promise((resolve) => {
            apiService.post(`/user/login?email=${email}&password=${password}`).then((data) => {
                resolve(data);
            });
        });
    },

    registerUser(email, password, appID) {
        return new Promise((resolve) => {
            apiService.post(`/user/register?email=${email}&password=${password}&name=${appID}`).then((data) => {
                resolve(data);
            });
        });
    },

    uploadUserImage(appID, image) {
        return new Promise((resolve) => {
            apiService.post(`/user/uploadimage?name=${appID}`, image).then((data) => {
                resolve(data);
            });
        });
    },

    saveUserDetails(appID, payload) {
        return new Promise((resolve) => {
            apiService.post(`/user/update?id=${appID}&name=${payload.name}&email=${payload.email}&bio=${payload.bio}&lockapps=${payload.lockapps}&backgroundImage=${payload.backgroundImage}&tour=${payload.tour}`).then((data) => {
                resolve(data);
            });
        });
    },

    createAppID() {
        return new Promise((resolve) => {
            apiService.get("user/create").then( async response => {
                chrome.storage.local.set({ appId: response.data.data.uniqueID });
                await this.initStarterApps(response.data.data.uniqueID);
                resolve(response.data.data.uniqueID);
            });
        });
    },

    async initStarterApps(appID) {
        await appsService.addFolder(appID, 'Folder 1');
        await appsService.addFolder(appID, 'Folder 2');
        for (const apps of starterApps) {
            await appsService.addApp(appID, apps[0], apps[1], apps[3]);
        }
    }

};

export default appidService;