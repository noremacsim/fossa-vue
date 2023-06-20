import {CREATE_APPID, GET_APPID, FETCH_APPS, APPID_LOGIN, APPID_REGISTER, RESET_APPID} from "@/stores/action.type";
import {SET_APPID, SET_ERROR} from "@/stores/mutations.type";
import appidService from "@/common/appid.service";
import { useToast } from 'vue-toastification'
import cookieService from "@/common/cookie.service";

const toast = useToast()

const state = {
    errors: null,
    appID: '',
    loading: true,
};

const getters = {
    currentAppID(state) {
        return state.appID;
    },
};

const actions = {
    [GET_APPID](context) {
        return new Promise(resolve => {
            appidService.getAppID()
                .then((data) => {
                    context.commit(SET_APPID, data);
                    context.dispatch(FETCH_APPS);
                    resolve(data);
                })
                .catch(data => {
                    console.log(data);
                    context.commit(SET_ERROR, data.data.errors);
                });
        });
    },

    [RESET_APPID](context) {
        appidService.resetAppID()
            .then(() => {
                toast.success("Logged out Successfully", {
                    timeout: 2000
                });
                const delay = ms => new Promise(res => setTimeout(res, ms));
                delay(2000);
                location.reload();
            })
            .catch(data => {
                console.log(data);
                context.commit(SET_ERROR, data.data.errors);
            });
    },

    [APPID_LOGIN](context, loginForm) {
        return new Promise(resolve => {
            appidService.loginUser(loginForm['email'], loginForm['password'])
                .then((data) => {
                    if (data.data.status === true) {
                        localStorage.setItem("appId", data.data.data.uniqueID);
                        cookieService.setCookie('appId', data.data.data.uniqueID, 365).then(() => {
                            context.dispatch(GET_APPID);
                            context.dispatch(FETCH_APPS);
                            toast.success("LoggedIn Successfully", {
                                timeout: 2000
                            });
                            const delay = ms => new Promise(res => setTimeout(res, ms));
                            delay(2000);
                            location.reload();
                        });
                    } else {
                        toast.error(data?.data?.message ?? 'Unkown Error');
                    }
                    resolve(data);
                })
                .catch(data => {
                    context.commit(SET_ERROR, data.data.errors);
                });
        });
    },

    [APPID_REGISTER](context, loginForm) {
        return new Promise(resolve => {
            appidService.registerUser(loginForm['email'], loginForm['password'], context.rootState.appid.appID)
                .then((data) => {
                    if (data.data.status === true) {
                        context.dispatch(GET_APPID);
                        context.dispatch(FETCH_APPS);
                        toast.success("Registered Successfully", {
                            timeout: 2000
                        });
                        const delay = ms => new Promise(res => setTimeout(res, ms));
                        delay(2000);
                        location.reload();
                    } else {
                        toast.error(data?.data?.message ?? 'Unkown Error');
                    }
                    resolve(data);
                })
                .catch(data => {
                    context.commit(SET_ERROR, data.data.errors);
                });
        });
    },

    [CREATE_APPID](context) {
        return new Promise(resolve => {
            appidService.createAppID()
                .then((data) => {
                    context.commit(SET_APPID, data);
                    resolve(data);
                })
                .catch(data => {
                    context.commit(SET_ERROR, data.data.errors);
                });
        });
    },

}

const mutations = {
    [SET_ERROR](state, error) {
        state.errors = error;
    },
    [SET_APPID](state, user) {
        state.appID = user;
        state.errors = {};
        state.loading = false;
    },
};

export default {
    state,
    actions,
    mutations,
    getters
};