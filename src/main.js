import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { library } from "@fortawesome/fontawesome-svg-core";
import '@fortawesome/fontawesome-free/css/all.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { faCog, faUpRightAndDownLeftFromCenter, faPlus, faUser, faHome, faUpload, faCamera, faShare, faShareNodes, faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import router from './router'
import API_URL from "@/common/config";
import Vue3TouchEvents from "vue3-touch-events";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import LoadScript from 'vue-plugin-load-script';
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, fa } from 'vuetify/iconsets/fa'
import Vue3Tour from 'vue3-tour'
import 'vue3-tour/dist/vue3-tour.css'

const vuetify = createVuetify({
    components,
    directives,
    defaultSet: 'fa',
    aliases,
    sets: {
        fa,
    },
})


library.add(faCog, faUpRightAndDownLeftFromCenter, faPlus, faUser, faHome, faUpload, faCamera, faShare, faShareNodes, faArrowLeft);
axios.defaults.baseURL = API_URL;

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router)
app.use(VueAxios, axios);
app.use(Vue3TouchEvents);
app.use(LoadScript);
app.use(vuetify);
app.use(Vue3Tour);

const options = {
    maxToasts: 3,
    newestOnTop: true
};
app.use(Toast, options);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount('#app')

