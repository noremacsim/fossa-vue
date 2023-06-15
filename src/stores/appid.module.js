import {CREATE_APPID, GET_APPID, FETCH_APPS} from "@/stores/action.type";
import {SET_APPID, SET_ERROR} from "@/stores/mutations.type";
import appidService from "@/common/appid.service";

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