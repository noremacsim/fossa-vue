<template>

  <main>

    <UserHeader v-if="!userLoading" />
    <UserHeaderSkeleton v-if="userLoading" />

    <div class="appContainer" role="main">
      <UserAppList v-if="!userLoading"/>
      <UserAppListSkeleton v-if="userLoading" />
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

import {defineEmits} from 'vue'
const emit = defineEmits(['showSettings'])

const { userLoading } = storeToRefs(useUserStore());
const { initUser, importUserFromAppID } = useUserStore();

const importedCode = location?.search?.split('code=')[1] ?? '';

if (importedCode && importedCode !== '') {
  importUserFromAppID(importedCode).then(() => {
    initUser().then(success => {
      if (success === false) {
        emit('showSettings');
      }
    })
  });
} else {
  initUser().then(success => {
    if (success === false) {
      emit('showSettings');
    }
  })
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
