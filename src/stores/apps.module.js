import {FETCH_APPS, CREATE_APP, REMOVE_APP, GET_SUBSCRIPTION} from "@/stores/action.type";
import {ADD_APP, DELETE_APP, SET_APPS, SET_ERROR, SET_REGISTERED, SET_SUBSCRIPTION, SET_VISITS} from "@/stores/mutations.type";
import {starterApps} from "@/common/starterApps";
import apiService from "@/common/api.service";
import appsService from "@/common/apps.service";
import { useToast } from 'vue-toastification'

const toast = useToast()

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

    async [GET_SUBSCRIPTION](context) {
        const { data } = await apiService.get(`/user/subscription?user=${context.rootState.appid.appID}`);
        context.commit(SET_SUBSCRIPTION, data.data.subscription);
    },

    async [FETCH_APPS](context) {
        const { data } = await apiService.get(`/user/get?name=${context.rootState.appid.appID}`);
        if (data.status !== true) {
            toast.error("Error Loading App Data, Try Refreshing", {
                position: "top-center",
                timeout: 10000,
                closeOnClick: false,
                pauseOnFocusLoss: true,
                pauseOnHover: true,
                draggable: false,
                showCloseButtonOnHover: false,
                hideProgressBar: true,
                closeButton: false,
                icon: true,
                rtl: false
            });
        } else {
            context.commit(SET_APPS, data.data.apps);
            context.commit(SET_SUBSCRIPTION, data.data.subscription);
            context.commit(SET_VISITS, data.data.visits);
            context.commit(SET_REGISTERED, data.data.registered)
        }
    },

    async [CREATE_APP](context, payload) {
        await appsService.addApp(context.rootState.appid.appID, payload.name, payload.url, payload.image).then((data) => {
            if (data.data.status !== true) {
                toast.error("Failed to add app");
            } else {
                context.commit(ADD_APP, {id: data.data.data['id'], 'name': payload.name, 'url': payload.url, 'image':payload.image})
            }
        });
    },

    async [REMOVE_APP](context, appID) {
        await appsService.removeApp(context.rootState.appid.appID, appID).then((data) => {
            if (data.data.status !== true) {
                toast.error("Failed to remove app");
            } else {
                context.commit(DELETE_APP, appID);
            }
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
    [SET_SUBSCRIPTION](state, subscription) {
        state.subscription = subscription;
    },
    [SET_REGISTERED](state, registered) {
        state.registered = registered;
    },
    [SET_VISITS](state, visits) {
        state.visits = visits;
    },
    [ADD_APP](state, app) {
        state.apps.push(app)
    },
    [DELETE_APP](state, appID) {
        const index = state.apps.map(item => item.id).indexOf(appID);
        toast.warning(`${state.apps[index].name} Removed`);
        state.apps.splice(index, 1);
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};