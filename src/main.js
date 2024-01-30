import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@fortawesome/fontawesome-free/css/all.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
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
import Vue3Tour from 'vue3-tour'
import 'vue3-tour/dist/vue3-tour.css'
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from '@/config/firebase';


// Icons
import { aliases, fa } from 'vuetify/iconsets/fa-svg'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
    fas,
    faCog,
    faUpRightAndDownLeftFromCenter,
    faPlus,
    faUser,
    faHome,
    faUpload,
    faCamera,
    faShare,
    faShareNodes,
    faArrowLeft,
    faLink
} from '@fortawesome/free-solid-svg-icons'

const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
library.add(
    fas,
    faCog,
    faUpRightAndDownLeftFromCenter,
    faPlus,
    faUser,
    faHome,
    faUpload,
    faCamera,
    faShare,
    faShareNodes,
    faArrowLeft,
    faLink
);

const fireApp = initializeApp(firebaseConfig);
getAuth(fireApp);
getFirestore(fireApp);

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'fa',
        aliases: {
            ...aliases,
            link:FontAwesomeIcon,
        },
        sets: {
            fa,
        },
    }
});

axios.defaults.baseURL = API_URL;

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
app.mount('#app')

