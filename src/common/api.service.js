import { API_URL } from "@/common/config";
import axios from "axios";

const ApiService = {

    init() {
        axios.defaults.baseURL = API_URL;
    },

    get(resource) {
        return axios.get(`${resource}`).catch(error => {
            throw new Error(`[RWV] ApiService ${error}`);
        });
    },

    post(resource, data) {

        let config = {
            method: 'post',
            url: `${resource}`,
            data : data
        };

        return axios(config);
    },
};

export default ApiService;