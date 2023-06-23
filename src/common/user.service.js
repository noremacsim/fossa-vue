import apiService from "@/common/api.service";


const userservice = {

    getUser(appID) {
        return new Promise((resolve) => {
            apiService.get(`/user/get?name=${appID}`).then((data) => {
                resolve(data.data.data);
            });
        });
    },

    loginUser(email, password) {
        return new Promise((resolve) => {
            apiService.post(`/user/login?email=${email}&password=${password}`).then((data) => {
                resolve(data);
            });
        });
    },

    registerUser(email, password, appID) {
        return new Promise((resolve) => {
            apiService.post(`/user/register?email=${email}&password=${password}&name=${appID}`).then((data) => {
                resolve(data);
            });
        });
    },

    uploadUserImage(appID, image) {
        return new Promise((resolve) => {
            apiService.post(`/user/uploadimage?name=${appID}`, image).then((data) => {
                resolve(data);
            });
        });
    },
};

export default userservice;