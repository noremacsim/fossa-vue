import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import store from './stores/main'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { library } from "@fortawesome/fontawesome-svg-core";
import axios from 'axios'
import VueAxios from 'vue-axios'
import { faCog, faUpRightAndDownLeftFromCenter, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import router from './router'
import API_URL from "@/common/config";
import Vue3TouchEvents from "vue3-touch-events";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import LoadScript from 'vue-plugin-load-script';

library.add(faCog, faUpRightAndDownLeftFromCenter, faPlus);
axios.defaults.baseURL = API_URL;

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(store);
app.use(VueAxios, axios);
app.use(Vue3TouchEvents);
app.use(LoadScript);

const options = {
    maxToasts: 3,
    newestOnTop: true
};
app.use(Toast, options);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount('#app')

