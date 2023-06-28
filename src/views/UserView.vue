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

</script>

<template>
  <div class="userimgContainer">
    <img id="userProfileImage" :src="user.profileImage" class="loaded rounded-circle mb-3 profileImage headerProfile userProfileImageSrc" style="width: 100px; height: 100px; border: 3px solid white;" alt="Avatar" />
    <font-awesome-icon :icon="'camera'" :class="'uploadIcon'" @click="clickToUpload" style="cursor: pointer;"/>
    <input type="file" name="" id="fileId" @change="imageUploaded" ref="uploadButton" style="display: none;">
  </div>

  <div class="form-group mb-2">

    <div class="ui-textinput ui-corner-all ui-shadow-inset ui-textinput-text ui-body-inherit">
      <div class="ui-textinput ui-corner-all ui-shadow-inset ui-textinput-text ui-body-inherit currentAppIdCode">
        <div class="ui-textinput ui-corner-all ui-shadow-inset ui-textinput-text ui-body-inherit">
          <input v-show="!showImport" :value="user.uniqueID" type="text" class="form-control rounded appId" placeholder="Code" aria-label="Code" id="appid" name="appId" style="width: 210px;margin: auto;text-align: center;background: transparent;background: #54b4d3;border: none;font-size: 22px;font-weight: bold;border-radius: 25px 25px 0 0 !important;letter-spacing: 3px;color: white;box-shadow: 0 4px 9px -4px #54b4d3;" readonly="">
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
              v-model="user.name"
              variant="outlined"
          ></v-text-field>

          <v-text-field
              v-model="user.email"
              label="Email"
              variant="outlined"
          ></v-text-field>

          <v-textarea
              label="Bio"
              v-model="user.bio"
              variant="outlined"
              rows="2"
          ></v-textarea>
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
        color="danger"
        class="mt-4"
        style="color: white;"
        @click="loggingOutUser"
        :loading="loadingLogout"
        block
    >
      Logout
    </v-btn>

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
  border-radius: 0 0 25px 25px;
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
</style>