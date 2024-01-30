import {defineStore} from "pinia";
import {ref} from 'vue';
import appidService from "@/common/appid.service";
import userService from "@/common/user.service";
import {useStorage} from '@vueuse/core'
import appsService from "@/common/apps.service";
import {useToast} from "vue-toastification";
import cookieService from "@/common/cookie.service";
import { starterApps } from "@/common/starterApps";
import {getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut} from "firebase/auth";
import {arrayUnion, collection, doc, getDoc, getFirestore, setDoc, updateDoc} from "firebase/firestore";

export const useUserStore = defineStore('user', () => {
    const user = ref(useStorage('user', []));
    const userLoading = ref(true);
    const loggedIn = ref(false);
    const toast = useToast();
    const filter = ref(useStorage('filter', null));
    const displayApps = ref(useStorage('displayApps', []));

    const auth = getAuth();
    const firestore = getFirestore();

    onAuthStateChanged(auth, async (fireUser) => {
        if (fireUser) {
            // User is logged in
            await createUserDocument(fireUser);
            await updateUserState();
            displayApps.value = user.value['apps']
            loggedIn.value = true;
            console.log('logged in');
        } else {
            // User is not logged in
            console.log("No user is logged in.");
            displayApps.value = starterApps;
            loggedIn.value = false;
        }

        userLoading.value = false;
    });

    async function createUserDocument(user) {
        const db = getFirestore();
        const userRef = doc(db, "users", user.uid);

        try {
            const docSnapshot = await getDoc(userRef);

            if (!docSnapshot.exists()) {
                // If the user document doesn't exist, create it with initial data
                await setDoc(userRef, {
                    displayName: user.displayName,
                    email: user.email,
                    profileImage: user.photoURL || null,
                });

                console.log("User document created successfully!");
            }
        } catch (error) {
            console.error("Error creating user document:", error);
        }
    }

    async function signInUser() {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                console.log(user);
                console.log(token);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.log(errorCode);
                console.log(errorMessage);
                console.log(email);
                console.log(credential);
            });
    }

    async function addApp(title, link, image, folderID = null) {
        const userRef = doc(firestore, "users", auth.currentUser.uid);

        try {
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                const appData = {
                    id: doc(collection(firestore, "temp")).id,
                    name: title,
                    url: link,
                    image: image,
                    folderID: folderID
                };

                // Use updateDoc to update the 'apps' field without replacing the entire document
                await updateDoc(userRef, {
                    apps: arrayUnion(appData)
                });

                await updateUserState()

                console.log("App added successfully to Firestore");
            } else {
                console.error("User document not found");
            }
        } catch (error) {
            console.error("Error adding app to Firestore:", error);
        }
    }

    async function updateUserApp(payload) {

        if (payload.name === '') {
            toast.error("App Name must be provided");
            return;
        }

        if (payload.image === '') {
            toast.error("App Image must be provided");
            return;
        }

        const userRef = doc(firestore, "users", auth.currentUser.uid);
        const matchID = (app) => app.id == payload.id;
        const userAppsIndex = this.user.apps.findIndex(matchID);
        const existingApps = (await getDoc(userRef)).data().apps;

        let updatedApp = {
            id: payload.id,
            'name': payload.name,
            'url': payload.url,
            'image': payload.image
        };

        existingApps[userAppsIndex] = updatedApp;
        await updateDoc(userRef, { apps: existingApps });
        await updateUserState();
    }

    async function removeUserApp(appID) {
        const userRef = doc(firestore, "users", auth.currentUser.uid);
        const matchID = (app) => app.id == appID;
        const userAppsIndex = this.user.apps.findIndex(matchID);
        const existingApps = (await getDoc(userRef)).data().apps;


        existingApps.splice(userAppsIndex, 1);
        await updateDoc(userRef, { apps: existingApps });
        await updateUserState();
    }

    async function updateUserState() {
        const userRef = doc(firestore, "users", auth.currentUser.uid);
        const updatedUserDoc = await getDoc(userRef);
        user.value = updatedUserDoc.data()
        displayApps.value = user.value['apps'];
    }

    async function logoutUser() {

        const auth = getAuth();
        signOut(auth)
            .then(() => {
                // Sign-out successful.
                console.log("User signed out successfully");
                toast.success("New Code Created Successfully", {
                    timeout: 2000
                });
                window.location.replace('/');
            })
            .catch((error) => {
                // An error happened.
                console.error("Error signing out:", error);
            });
    }

    ///////// BELOW IS OLD ////

    async function initUser() {
        try {
            // Check if user is not logged in
            if (!user.value.length) {
                console.log("User not logged in. Loading default apps.");
                displayApps.value = starterApps;
            } else {
                console.log("User is logged in. Loading user apps.");
                // Load user apps
                displayApps.value = user.value['apps']
            }

            console.log(displayApps.value);
            userLoading.value = false;

            // Additional logic if needed

            return true;
        } catch (error) {
            console.error("Error initializing user:", error);
            return false;
        }
    }


    async function filterApps(filterBy = null) {

        if (filterBy === null || filterBy === '') {
            this.displayApps = user.value['apps'];
        } else {
            this.displayApps = this.user.folders[filterBy];
        }

        this.filter = filterBy;
    }

    async function getCurrentAppID() {
        return new Promise(resolve => {
            appidService.getAppID()
                .then((data) => {
                    resolve(data);
                })
                .catch(data => {
                    console.log(data);
                });
        });
    }

    async function getUserFromAppID(appID) {
        return new Promise(resolve => {
            userService.getUser(appID)
                .then((data) => {
                    resolve(data);
                })
                .catch(data => {
                    console.log(data);
                });
        });
    }

    async function importUserFromAppID(appID) {
        await userService.getUser(appID)
            .then((data) => {
                if (data.status === false) {
                    toast.error("Failed to Import, Check Code");
                    return false;
                }

                userLoading.value = false;
                this.user = data;
                cookieService.setCookie('appId', appID, 365).then(() => {
                    toast.success("Imported Successfully", {
                        timeout: 2000
                    });
                });
                return true;
            })
            .catch(() => {
                toast.error("Failed to Import, Check Code");
                return false;
            });
    }

    async function addUserFolder(payload) {

        if (payload.name === '') {
            toast.error("Folder Name must be provided");
            return;
        }

        await appsService.addFolder(this.user.uniqueID, payload.name).then((data) => {
            if (data.data.status !== true) {
                toast.error("Failed to add folder");
            } else {
                this.user.apps.push({id: data.data.data['id'], 'name': payload.name, 'url': '', 'image':'', 'type': 'folder'})
                this.user.folders[data.data.data['id']] = [];
                this.displayApps.push({id: data.data.data['id'], 'name': payload.name, 'url': '', 'image':'', 'type': 'folder'})
            }
        });

    }

    async function addUserApp(payload) {
        if (payload.name === '') {
            toast.error("App Name must be provided");
            return;
        }

        if (payload.url === '') {
            toast.error("App URL must be provided");
            return;
        }

        if (payload.image === '') {
            toast.error("App Image must be provided");
            return;
        }

        await appsService.addApp(this.user.uniqueID, payload.name, payload.url, payload.image, this.filter).then((data) => {
            if (data.data.status !== true) {
                toast.error("Failed to add app");
            } else {

                if (this.filter) {
                    this.user.folders[this.filter].push({id: data.data.data['id'], 'name': payload.name, 'url': payload.url, 'image':payload.image})
                } else {
                    this.user.apps.push({id: data.data.data['id'], 'name': payload.name, 'url': payload.url, 'image':payload.image})
                }
                this.displayApps.push({id: data.data.data['id'], 'name': payload.name, 'url': payload.url, 'image':payload.image})
            }
        });
    }

    async function updateUserFolder(payload) {

        if (payload.name === '') {
            toast.error("Folder Name must be provided");
            return;
        }

        const matchID = (app) => app.id == payload.id;
        const appIndex = this.displayApps.findIndex(matchID);
        const userAppsIndex = this.user.apps.findIndex(matchID);

        let updatedFolder = {
            id: payload.id,
            'name': payload.name,
            'url': '',
            'image':'',
            'type': 'folder'
        }

        await appsService.updateApp(this.user.uniqueID, updatedFolder).then((data) => {
            if (data.data.status !== true) {
                toast.error("Failed to update folder");
            } else {
                this.user.apps[userAppsIndex] = updatedFolder;
                this.displayApps[appIndex] = updatedFolder
            }
        });
    }

    async function saveUserDetails(showToast = true) {
        let payload = {
            name: this.user.name ?? '',
            email: this.user.email ?? '',
            bio: this.user.bio ?? '',
            lockapps: this.user.lockapps,
            backgroundImage: this.user.backgroundImage,
            tour: this.user.tour
        }
        await appidService.saveUserDetails(this.user.uniqueID, payload).then((data) => {
            if (data.data.status !== true) {
                if (showToast) {
                    toast.error("Failed to update user");
                }
                return false;
            } else {
                if (showToast) {
                    toast.success("Profile Updated Successfully");
                }
                return true;
            }
        });
    }

    async function updateAppIndex() {
        let appsIndex = this.displayApps.map(({id}) => ({id}));
        await appsService.updateIndex(this.user.uniqueID, appsIndex).then((data) => {
            if (data.data.status !== true) {
                toast.error("Failed to update App List");
            }
        });
    }

    async function uploadUserImage(image) {
        appidService.uploadUserImage(this.user.uniqueID, image)
            .then((data) => {
                if (data.data.status === true) {
                    toast.success("New Image Uploaded Successfully", {
                        timeout: 2000
                    });
                } else {
                    toast.error(data?.data?.message ?? 'Unkown Error');
                }
            })
            .catch(data => {
                toast.error(data?.data?.message ?? 'Unkown Error');
            });
    }

    return {
        user,
        userLoading,
        displayApps,
        filter,
        loggedIn,
        signInUser,
        addApp,
        // Everything Below is old
        initUser,
        removeUserApp,
        addUserApp,
        addUserFolder,
        importUserFromAppID,
        logoutUser,
        saveUserDetails,
        uploadUserImage,
        updateAppIndex,
        filterApps,
        updateUserApp,
        updateUserFolder
    }
});