import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { library } from "@fortawesome/fontawesome-svg-core";
import axios from 'axios'
import VueAxios from 'vue-axios'
import { faCog, faUpRightAndDownLeftFromCenter, faPlus, faUser, faHome, faUpload} from "@fortawesome/free-solid-svg-icons";
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

const vuetify = createVuetify({
    components,
    directives,
})


library.add(faCog, faUpRightAndDownLeftFromCenter, faPlus, faUser, faHome, faUpload);
axios.defaults.baseURL = API_URL;

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router)
app.use(VueAxios, axios);
app.use(Vue3TouchEvents);
app.use(LoadScript);
app.use(vuetify);

const options = {
    maxToasts: 3,
    newestOnTop: true
};
app.use(Toast, options);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount('#app')

