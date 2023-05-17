import {FETCH_APPS, CREATE_APP, REMOVE_APP} from "@/stores/action.type";
import {ADD_APP, DELETE_APP, SET_APPS, SET_ERROR} from "@/stores/mutations.type";
import {starterApps} from "@/common/starterApps";
import apiService from "@/common/api.service";
import appsService from "@/common/apps.service";

const initialState = {
    apps: starterApps,
    loading: true,
};

export const state = { ...initialState };

const getters = {
    apps(state) {
        return state.apps;
    },
};

const actions = {

    async [FETCH_APPS](context) {
        const { data } = await apiService.get(`/user/get?name=${context.rootState.appid.appID}`);
        context.commit(SET_APPS, data.data.apps);
        return data;
    },

    async [CREATE_APP](context, payload) {
        await appsService.addApp(context.rootState.appid.appID, payload.name, payload.url, payload.image).then((data) => {
            context.commit(ADD_APP, {id: data.data.data['id'], 'name': payload.name, 'url': payload.url, 'image':payload.image})
        });
    },

    async [REMOVE_APP](context, appID) {
        await appsService.removeApp(context.rootState.appid.appID, appID).then((data) => {
            context.commit(DELETE_APP, appID)
        });
    }
}

const mutations = {
    [SET_ERROR](state, error) {
        state.errors = error;
    },
    [SET_APPS](state, apps) {
        state.apps = apps;
        state.errors = {};
        state.loading = false;
    },
    [ADD_APP](state, app) {
        state.apps.push(app)
    },
    [DELETE_APP](state, appID) {
        const index = state.apps.map(item => item.id).indexOf(appID);
        state.apps.splice(index, 1);
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};