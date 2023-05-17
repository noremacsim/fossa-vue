import apiService from "@/common/api.service";

const appsService = {

    addApp(userid, title, link, image) {
        return new Promise((resolve) => {
            let app = {'name': title, 'url': link, 'image': image};
            apiService.post(`app/new?id=${userid}`, JSON.stringify(app)).then((data) => {
                resolve(data);
            });
        });
    },

    removeApp(userID, appID) {
        return new Promise((resolve) => {
            apiService.post(`/app/delete?uid=${userID}&id=${appID}`).then((data) => {
                resolve(data);
            });
        });
    }

}

export default appsService;