import apiService from "@/common/api.service";

const appsService = {

    addFolder(userid, title) {
        return new Promise((resolve) => {
            let app = {'name': title};
            apiService.post(`folder/new?id=${userid}`, JSON.stringify(app)).then((data) => {
                resolve(data);
            });
        });
    },

    addApp(userid, title, link, image, folderID) {
        return new Promise((resolve) => {
            let app = {'name': title, 'url': link, 'image': image, 'folderID': folderID};
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
    },

    updateIndex(userID, appIndex) {
        return new Promise((resolve) => {
            apiService.post(`app/updateIndex?id=${userID}`, JSON.stringify(appIndex)).then((data) => {
                resolve(data);
            });
        });
    }

}

export default appsService;