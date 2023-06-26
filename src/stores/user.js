import { defineStore } from "pinia";
import { ref } from 'vue';
import appidService from "@/common/appid.service";
import userService from "@/common/user.service";
import { useStorage } from '@vueuse/core'
import appsService from "@/common/apps.service";
import {useToast} from "vue-toastification";
import cookieService from "@/common/cookie.service";
import apiService from "@/common/api.service";

export const useUserStore = defineStore('user', () => {
    const user = ref(useStorage('user', []));
    const userLoading = ref(true);
    const toast = useToast()

    async function initUser() {
        if (this.user.length > 0) {
            return true;
        }

        let appID = await getCurrentAppID().then((data) => {
            return data;
        });

        let success = await getUserFromAppID(appID).then((data) => {
            if (data.status === false) {
                toast.error(`Failed to Import, Check Code (CODE: ${appID})`);
                return false;
            }
            userLoading.value = false;
            this.user = data;
            return true;
        });

        return success;
    }

    async function getCurrentAppID() {
        return new Promise(resolve => {
            appidService.getAppID()
                .then((data) => {
                    resolve(data);
                })
                .catch(data => {
                    console.log(data);
                });
        });
    }

    async function getUserFromAppID(appID) {
        return new Promise(resolve => {
            userService.getUser(appID)
                .then((data) => {
                    resolve(data);
                })
                .catch(data => {
                    console.log(data);
                });
        });
    }

    async function importUserFromAppID(appID) {
        userService.getUser(appID)
            .then((data) => {
                if (data.status === false) {
                    toast.error("Failed to Import, Check Code");
                    return false;
                }

                userLoading.value = false;
                this.user = data;
                cookieService.setCookie('appId', appID, 365).then(() => {
                    toast.success("Imported Successfully", {
                        timeout: 2000
                    });
                });
                return true;
            })
            .catch(() => {
                toast.error("Failed to Import, Check Code");
                return false;
            });
    }

    async function removeUserApp(appID) {
        if (this.user?.uniqueID) {

            const indexOfRemovedApp = this.user.apps.findIndex(object => {
                return object.id === appID;
            });
            this.user.apps.splice(indexOfRemovedApp, 1);

            await appsService.removeApp(this.user.uniqueID, appID).then((data) => {
                if (data.data.status !== true) {
                    toast.error("Failed to remove app");
                }
            });
        }
    }

    async function addUserApp(payload) {
        if (payload.name === '') {
            toast.error("App Name must be provided");
            return;
        }

        if (payload.url === '') {
            toast.error("App URL must be provided");
            return;
        }

        if (payload.image === '') {
            toast.error("App Image must be provided");
            return;
        }

        await appsService.addApp(this.user.uniqueID, payload.name, payload.url, payload.image).then((data) => {
            if (data.data.status !== true) {
                toast.error("Failed to add app");
            } else {
                this.user.apps.push({id: data.data.data['id'], 'name': payload.name, 'url': payload.url, 'image':payload.image})
                toast.success("Added App to Home screen");
            }
        });
    }

    async function logoutUser() {
        appidService.resetAppID()
            .then(() => {
                toast.success("New Code Created Successfully", {
                    timeout: 2000
                });
                const delay = ms => new Promise(res => setTimeout(res, ms));
                delay(2000);
                window.location.replace('/');
            })
    }

    async function saveUserDetails() {
        let payload = {
            name: this.user.name,
            email: this.user.email,
            bio: this.user.bio,
            lockapps: this.user.lockapps
        }
        await appidService.saveUserDetails(this.user.uniqueID, payload).then((data) => {
            if (data.data.status !== true) {
                toast.error("Failed to update user");
                return false;
            } else {
                toast.success("Profile Updated Successfully");
                return true;
            }
        });
    }

    async function updateAppIndex() {
        let appsIndex = this.user.apps.map(({id}) => ({id}));
        await appsService.updateIndex(this.user.uniqueID, appsIndex).then((data) => {
            if (data.data.status !== true) {
                toast.error("Failed to update App List");
            } else {
                toast.success("Updated App List");
            }
        });
    }

    async function uploadUserImage(image) {
        appidService.uploadUserImage(this.user.uniqueID, image)
            .then((data) => {
                if (data.data.status === true) {
                    toast.success("New Image Uploaded Successfully", {
                        timeout: 2000
                    });
                } else {
                    toast.error(data?.data?.message ?? 'Unkown Error');
                }
            })
            .catch(data => {
                toast.error(data?.data?.message ?? 'Unkown Error');
            });
    }

    return {
        user,
        userLoading,
        initUser,
        removeUserApp,
        addUserApp,
        importUserFromAppID,
        logoutUser,
        saveUserDetails,
        uploadUserImage,
        updateAppIndex
    }
});