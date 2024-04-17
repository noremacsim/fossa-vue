import { defineStore } from "pinia";
import { ref } from 'vue';
import { onAuthStateChanged, getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { useStorage } from '@vueuse/core';
import { useToast } from 'vue-toastification';
import { starterApps } from '@/common/starterApps';

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
            const userRef = doc(firestore, "users", auth.currentUser.uid);
            const updatedUserDoc = await getDoc(userRef);
            user.value = updatedUserDoc.data()
            await updateUserState();
            loggedIn.value = true;
        } else {
            displayApps.value = starterApps;
            user.value = null;
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
                    lockApps: false,
                    homeTour: false,
                    profileTour: false,
                    backgroundImage: null,
                    profileImage: user.photoURL || null,
                    apps: starterApps
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
                return true;
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
                return false;
            });
    }

    async function signInEmailUser(email, password) {
        return new Promise((resolve, reject) => {
            const auth = getAuth();

            signInWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                  const user = userCredential.user;
                  resolve(true); // Resolve with true if sign-in is successful
              })
              .catch((error) => {
                  console.log(error);
                  if (error.code === 'auth/user-not-found') {
                      createUserWithEmailAndPassword(auth, email, password)
                        .then((userCredential) => {
                            resolve(true); // Resolve with true if sign-up is successful
                        })
                        .catch((error) => {
                            reject(returnFirebaseError(error.code)); // Reject with false if sign-up fails
                        });
                  } else {
                      reject(returnFirebaseError(error.code)); // Reject with false if sign-in fails
                  }
              });
        });
    }

    function returnFirebaseError(error) {

        if (error === 'auth/invalid-email') {
            return 'Invalid email address';
        } else if (error === 'auth/user-disabled') {
            return 'User account is disabled';
        } else if (error === 'auth/user-not-found') {
            return 'User not found';
        } else if (error === 'auth/wrong-password') {
            return 'Incorrect password';
        } else if (error === 'auth/too-many-requests') {
            return 'Too many login attempts. Try again later';
        } else if (error === 'auth/network-request-failed') {
            return 'Network error. Please try again';
        } else if (error === 'auth/operation-not-allowed') {
            return 'Login operation not allowed';
        } else if (error === 'auth/admin-restricted-operation') {
            return 'Login is Restricted';
        } else if (error === 'auth/account-exists-with-different-credential') {
            return 'Account exist with different Login Provider'
        } else {
            return 'Login Failed';
        }

    }


    async function addApp(title, link, image, folderID = null, type = 'app') {
        let apps = null;

        if (filter.value) {
            apps = user.value['folders'][filter.value];
        } else {
            apps = user.value['apps'];
        }

        const appData = {
            id: doc(collection(firestore, "temp")).id,
            name: title,
            url: link,
            image: image,
            folderID: folderID,
            type: type
        };

        apps.push(appData);

        if (filter.value) {
            user.value.folders[filter.value] = apps;
        } else {
            user.value.apps = apps;
        }

        await updateUserState();
        await syncUserToFireBase();
    }

    async function addUserFolder(title) {
        const id = doc(collection(firestore, "temp")).id;

        const appData = {
            id: id,
            name: title,
            url: null,
            image: null,
            folderID: null,
            type: 'folder'
        };

        if (!user.value['folders']) {
            user.value['folders'] = {};
        }

        user.value['apps'].push(appData);
        user.value['folders'][id] = [];

        await updateUserState();
        await syncUserToFireBase();
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

        const matchID = (app) => app.id == payload.id;
        const userAppsIndex = user.value.apps.findIndex(matchID);

        let updatedApp = {
            id: payload.id,
            'name': payload.name,
            'url': payload.url,
            'image': payload.image
        };

        user.value['apps'][userAppsIndex] = updatedApp;

        await updateUserState();
        await syncUserToFireBase();
    }

    async function updateUserFolder(payload) {

        if (payload.name === '') {
            toast.error("Folder Name must be provided");
            return;
        }

        const matchID = (app) => app.id == payload.id;
        const userAppsIndex = user.value.apps.findIndex(matchID);

        let updatedFolder = {
            id: payload.id,
            'name': payload.name,
            'url': '',
            'image':'',
            'type': 'folder'
        }

        user.value['apps'][userAppsIndex] = updatedFolder;

        await updateUserState();
        await syncUserToFireBase();
    }

    async function removeUserApp(appID) {
        console.log('removing app')
        const matchID = (app) => app.id == appID;
        let apps = [];

        if (filter.value) {
            apps = user.value['folders'][filter.value];
        } else {
            apps = user.value['apps'];
        }

        const userAppsIndex = apps.findIndex(matchID);

        if (apps[userAppsIndex].type === 'folder') {
            delete user.value['folders'][appID];
        }

        apps.splice(userAppsIndex, 1);

        if (filter.value) {
            user.value.folders[filter.value] = apps;
        } else {
            user.value.apps = apps;
        }

        await updateUserState();
        await syncUserToFireBase();
    }

    async function updateAppIndex() {

        if (filter.value) {
            user.value['folders'][filter.value] = displayApps.value
        } else {
            user.value['apps'] = displayApps.value
        }

        await updateUserState();
        await syncUserToFireBase();
    }

    async function updateUserState() {
        if (filter.value) {
            displayApps.value = user.value['folders'][filter.value];
        } else {
            displayApps.value = user.value['apps'];
        }
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

    async function filterApps(filterBy = null) {

        if (filterBy === null || filterBy === '') {
            displayApps.value = user.value['apps'];
        } else {
            displayApps.value = user.value['folders'][filterBy];
        }

        filter.value = filterBy;
    }

    async function uploadUserImage(image) {
        user.value.profileImage = image;
        await syncUserToFireBase();
    }

    async function syncUserToFireBase() {
        const userRef = doc(firestore, "users", auth.currentUser.uid);
        await updateDoc(userRef, user.value);
    }

    return {
        user,
        userLoading,
        displayApps,
        filter,
        loggedIn,
        signInUser,
        addApp,
        syncUserToFireBase,
        removeUserApp,
        addUserFolder,
        logoutUser,
        uploadUserImage,
        updateAppIndex,
        filterApps,
        signInEmailUser,
        updateUserApp,
        updateUserFolder
    }
});