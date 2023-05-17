import {createStore} from "vuex";

import appid from "./appid.module";
import apps from "./apps.module"

export default createStore({
    modules: {
        appid,
        apps,
    }
});