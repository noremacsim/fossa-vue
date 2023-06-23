import { defineStore } from "pinia";
import { ref } from 'vue';
import appidService from "@/common/appid.service";
import userService from "@/common/user.service";
import { useStorage } from '@vueuse/core'

export const useUserStore = defineStore('user', () => {
    const user = ref(useStorage('user', []));

    async function initUser() {
        if (this.user.length > 0) {
            return;
        }

        let appID = await getCurrentAppID().then((data) => {
            return data;
        });

        await getUserFromAppID(appID).then((data) => {
            this.user = data;
            return data;
        });
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

    return { user, initUser }
});