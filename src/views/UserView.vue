<script setup>
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import {defineEmits, ref} from 'vue'
import UserProfileTour from "@/components/tours/UserProfileTour.vue";
const { user } = storeToRefs(useUserStore());
const { saveUserDetails, logoutUser, uploadUserImage} = useUserStore();
const showImport = ref(false);
const emit = defineEmits(['showSettings'])

const loadingLogout = ref(false);
const loadingSave = ref(false)
const uploadButton = ref(null);
function loggingOutUser() {
  loadingLogout.value = true
  logoutUser();
}
async function savingUserDetails() {
  loadingSave.value = true;
  await saveUserDetails().then(() => {
    loadingSave.value = false;
  })
}

async function imageUploaded() {
  let file = document.querySelector('input[type=file]')['files'][0];
  let reader = new FileReader();
  reader.onload = function () {
    let base64String = reader.result;
    this.userImage = base64String;
    document.getElementById("userProfileImage").src = base64String;
    uploadUserImage(base64String);
  }
  reader.readAsDataURL(file);
}

function clickToUpload() {
  uploadButton.value.click();
}

function shareSite()
{
  if (navigator.share) {
    navigator.share({
      title: " Fossa - Empower Your Digital Experience with Powerful App & Link Management",
      text: 'Seamlessly Create, Manage, and Access Apps and Services on Any Device here is my AppList',
      url: `https://fossa-app.site?code=${user.value.uniqueID}`,
    })
        .then(() => {
          console.log('done');
        })
        .catch((error) => console.log('Error sharing', error));
  } else {
    console.log('Share not supported on this browser, do it the old way.');
  }
}

function exportBookmarks() {
    // Gather the bookmarks data from your app's storage
    const bookmarks = user.value.apps;

    // Generate the Netscape Bookmark Format
    const exportData = generateNetscapeBookmarkFormat(bookmarks);

    // Create a Blob object with the export data
    const blob = new Blob([exportData], { type: 'text/html' });

    // Generate a unique filename for the export file
    const fileName = `FossaBookamrks-${user.value.uniqueID}.html`;

    // Create a temporary URL for the Blob object
    const url = URL.createObjectURL(blob);

    // Create a temporary link element
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;

    // Programmatically click the link to trigger the download
    link.click();

    // Clean up the temporary URL and link
    URL.revokeObjectURL(url);
    link.remove();

}

function generateNetscapeBookmarkFormat(bookmarks) {
  let content = '';

  bookmarks.forEach(bookmark => {
    if (bookmark.type !== 'folder') {
      const { name, url, image } = bookmark;
      const bookmarkEntry = `
        <DT>
          <A HREF="${url}" ICON="${image}">${name}</A>
        </DT>
      `;
      content += bookmarkEntry;
    } else if (bookmark.type === 'folder') {
      const { id, name } = bookmark;
      const links = user.value.folders[`${id}`]

      let folderContent = '';

      links.forEach(link => {
        const { name, url, image } = link;
        const linkEntry = `
          <DT>
            <A HREF="${url}" ICON="${image}">${name}</A>
          </DT>
        `;
        folderContent += linkEntry;
      });

      const folderEntry = `
        <DT>
          <H3>${name}</H3>
          <DL><p>
            ${folderContent}
          </DL><p>
        </DT>
      `;
      content += folderEntry;
    }
  });

  const netscapeBookmarkFormat = `
    <!DOCTYPE NETSCAPE-Bookmark-file-1>
    <META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
    <TITLE>Bookmarks</TITLE>
    <H1>Bookmarks</H1>
    <DL><p>
    ${content}
    </DL><p>
  `;

  return netscapeBookmarkFormat;
}

function navigate(link) {
  if (!link.match(/^[a-zA-Z]+:\/\//))
  {
    link = 'https://' + link;
  }
  window.open(link, '_blank').focus();
}

</script>

<template>
  <div class="userimgContainer">
    <img v-if="!user.profileImage" id="userProfileImage" src="/img/icons/512.png" class="loaded rounded-circle mb-3 profileImage headerProfile userProfileImageSrc" style="width: 100px; height: 100px; border: 3px solid white;" alt="Avatar" />
    <img v-if="user.profileImage" id="userProfileImage" :src="user.profileImage" class="loaded rounded-circle mb-3 profileImage headerProfile userProfileImageSrc" style="width: 100px; height: 100px; border: 3px solid white;" alt="Avatar" />
    <font-awesome-icon :icon="'camera'" :class="'uploadIcon'" @click="clickToUpload" style="cursor: pointer;"/>
    <input type="file" name="" id="fileId" @change="imageUploaded" ref="uploadButton" style="display: none;">
  </div>

  <div class="form-group mb-2">

    <div class="ui-textinput ui-corner-all ui-shadow-inset ui-textinput-text ui-body-inherit">
      <div class="ui-textinput ui-corner-all ui-shadow-inset ui-textinput-text ui-body-inherit currentAppIdCode">
        <div class="ui-textinput ui-corner-all ui-shadow-inset ui-textinput-text ui-body-inherit">
<!--          <input v-show="!showImport" :value="user.uniqueID" type="text" class="form-control rounded appId" placeholder="Code" aria-label="Code" id="appid" name="appId" style="width: 210px;margin: auto;text-align: center;background: transparent;background: #54b4d3;border: none;font-size: 22px;font-weight: bold;border-radius: 25px 25px 0 0 !important;letter-spacing: 3px;color: white;box-shadow: 0 4px 9px -4px #54b4d3;" readonly="">-->
          <font-awesome-icon @click="shareSite" :icon="'share-nodes'" :class="'shareIcon'" />
        </div>
      </div>
    </div>
  </div>

  <v-container style="max-width: 900px !important;">
    <v-expansion-panels variant="accordion">
      <v-expansion-panel
          title="Profile Settings"
          class="profileCustom"
      >
        <v-expansion-panel-text>
          <v-text-field
              label="Name"
              v-model="user.displayName"
              variant="outlined"
          ></v-text-field>

          <v-text-field
              v-model="user.email"
              label="Email"
              variant="outlined"
          ></v-text-field>

<!--          <v-textarea-->
<!--              label="Bio"-->
<!--              v-model="user.bio"-->
<!--              variant="outlined"-->
<!--              rows="2"-->
<!--          ></v-textarea>-->
          <v-btn
              color="success"
              class="mt-4"
              :loading="loadingSave"
              block
              @click="savingUserDetails"
          >
            Save
          </v-btn>
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel
          title="App List Settings"
          class="customBackground"
      >
        <v-expansion-panel-text>
          <v-text-field
              label="Background Image URL"
              v-model="user.backgroundImage"
              variant="outlined"
          ></v-text-field>

          <v-btn
              color="success"
              class="mt-4"
              :loading="loadingSave"
              block
              @click="savingUserDetails"
          >
            Save
          </v-btn>

        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel
          readonly="true"
      >
        <v-expansion-panel-title>
          <v-switch
              class="lockingApps"
              v-model="user.lockapps"
              color="green"
              :loading="loadingSave"
              @change="savingUserDetails"
              hide-details
              inset
              :label="`Lock Apps Layout`"
          ></v-switch>

        </v-expansion-panel-title>
      </v-expansion-panel>

    </v-expansion-panels>

    <v-btn
        color="success"
        class="mt-4"
        style="color: white;"
        @click="emit('showSettings')"
        block
    >
      Import Profile
    </v-btn>

    <v-btn
        color="primary"
        class="mt-4"
        style="color: white;"
        @click="exportBookmarks"
        block
    >
      Export Bookmarks
    </v-btn>

    <v-btn
        color="danger"
        class="mt-4"
        style="color: white;"
        @click="loggingOutUser"
        :loading="loadingLogout"
        block
    >
      Logout
    </v-btn>
    <div class="storeIconContainer">
      <div style="display: block;margin: auto;width: fit-content;">
        <img @click="navigate('https://chrome.google.com/webstore/detail/fossa-empower-your-digita/bkcmdadlilehjjnelgmecflkaijniipl')" class="storeIcons" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Google_Chrome_Web_Store_icon_2022.svg/2356px-Google_Chrome_Web_Store_icon_2022.svg.png" height="28">
        <img @click="navigate('https://addons.mozilla.org/en-GB/firefox/addon/fossa-empower-bookmarks/')" class="storeIcons" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Firefox_brand_logo%2C_2019.svg/2048px-Firefox_brand_logo%2C_2019.svg.png" height="28">
      </div>
    </div>
  </v-container>

  <user-profile-tour />
</template>

<style scoped>

.shareIcon {
  width: 198px;
  padding: 6px;
  display: block;
  margin: auto;
  text-align: center;
  background: rgb(84 211 171);
  border: none;
  font-size: 22px;
  font-weight: bold;
  border-radius: 25px 25px 25px 25px;
  letter-spacing: 3px;
  color: white;
  box-shadow: rgb(84, 180, 211) 0px 4px 9px -4px;
}

.header {
  margin: auto;
  display: block;
  width: fit-content;
  text-align: center;
  color: black;
}

.profileImage {
  width: 150px;
  height: 150px;
  border: 3px solid white;
}

.headerProfile {
  margin-top: 10px;
}

.userimgContainer {
  position: relative;
  width: fit-content;
  margin: auto;
}

.uploadIcon {
  position: absolute;
  top: 4px;
  right: -10px;
  background: #3bcab6;
  font-size: 18px;
  padding: 7px;
  border-radius: 50%;
  color: white;
  border: 5px solid white;
}

.storeIconContainer {
  width: 100%;
  margin-top: 20px;
}

.storeIcons {
  height: 42px;
  padding: 5px;
  margin: 5px;
  cursor: pointer;
}
</style>