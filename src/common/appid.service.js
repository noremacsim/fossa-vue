import cookieService from "@/common/cookie.service";
import apiService from "@/common/api.service";
import {starterApps} from "@/common/starterApps";
import appsService from "@/common/apps.service";


const appidService = {

    getAppID() {

        return new Promise((resolve) => {
            if ("appID" in localStorage) {
                const appID = localStorage.getItem("appID");
                cookieService.setCookie('appId', appID, 365).then(() => {
                    resolve(appID)
                });
            } else if (cookieService.getCookie('appId') !== '') {
                const appID = cookieService.getCookie('appId');
                localStorage.setItem("appId", appID);
                resolve(appID);
            } else {
                this.createAppID().then(data => {
                    resolve(data);
                });
            }
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
            apiService.post(`/user/update?id=${appID}&name=${payload.name}&email=${payload.email}&bio=${payload.bio}&lockapps=${payload.lockapps}`).then((data) => {
                resolve(data);
            });
        });
    },

    createAppID() {
        return new Promise((resolve) => {
            apiService.get("user/create").then( async response => {
                localStorage.setItem("appId", response.data.data.uniqueID);
                await cookieService.setCookie('appId', response.data.data.uniqueID, 365);
                await this.initStarterApps(response.data.data.uniqueID);
                resolve(response.data.data.uniqueID);
            });
        });
    },

    async initStarterApps(appID) {
        for (const apps of starterApps) {
            await appsService.addApp(appID, apps[0], apps[1], apps[3]);
        }
    }

};

export default appidService;