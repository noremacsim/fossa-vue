<template>

  <main>

    <UserHeader v-if="!userLoading && showMain" />
    <UserHeaderSkeleton v-if="userLoading && showMain" />

    <div class="appContainer" role="main">
      <UserAppList v-if="!userLoading && showMain"/>
      <UserAppListSkeleton v-if="userLoading && showMain" />
    </div>

    <div class="card" v-show="!showMain">
      <div class="card-body" style="background: #f2f2f2">
        <h5 style="color: black;font-weight: bold;text-align: center;">Your Fossa ID</h5>

        <div class="form-group mb-2">

          <div class="ui-textinput ui-corner-all ui-shadow-inset ui-textinput-text ui-body-inherit">
            <div class="ui-textinput ui-corner-all ui-shadow-inset ui-textinput-text ui-body-inherit currentAppIdCode">
              <div class="ui-textinput ui-corner-all ui-shadow-inset ui-textinput-text ui-body-inherit">
                <input :value="user.uniqueID" type="text" class="form-control rounded appId" placeholder="Code" aria-label="Code" id="appid" name="appId" style="width: 210px;margin: auto;text-align: center;background: transparent;background: #54b4d3;border: none;font-size: 22px;font-weight: bold;border-radius: 25px !important;letter-spacing: 3px;color: white;box-shadow: 0 4px 9px -4px #54b4d3;margin-top: 16px;" readonly=""></div>
            </div>
          </div>
          <div style="margin-top:10px;text-align: center;width: 100%;">
            <span>Copy and paste this into your extension to load your profile</span>
          </div>
        </div>
      </div>
    </div>

  </main>

</template>

<script setup>

import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import UserAppList from "@/components/UserAppList.vue";
import UserHeader from "@/components/UserHeader.vue";
import UserHeaderSkeleton from "@/components/skeleton/UserHeaderSkeleton.vue";
import UserAppListSkeleton from "@/components/skeleton/UserAppListSkeleton.vue";

import {defineEmits, ref} from 'vue'
const emit = defineEmits(['showSettings'])

const { userLoading } = storeToRefs(useUserStore());
const { user } = storeToRefs(useUserStore());
const { initUser, importUserFromAppID } = useUserStore();

const importedCode = location?.search?.split('code=')[1] ?? '';
const chromeExtension = location?.search?.split('chrome=')[1] ?? '';
const showMain = ref(true);

if (chromeExtension && chromeExtension != '') {
  showMain.value = false;
} else if (importedCode && importedCode !== '') {
  importUserFromAppID(importedCode).then(() => {
    initUser().then(success => {
      if (success === false) {
        emit('showSettings');
      }
    })
  });
} else {
  // initUser().then(success => {
  //   if (success === false) {
  //     emit('showSettings');
  //   }
  // })
}

</script>

<style scoped>

.appContainer {
  align-items: center;
  justify-content: center;
  display: flex;
  margin: auto;
  padding: 0;
}

</style>
