<template>

  <main>

    <UserHeader v-if="!userLoading && showMain" />
    <UserHeaderSkeleton v-if="userLoading && showMain" />

    <div class="appContainer" role="main">
      <UserAppList v-if="!userLoading && showMain"/>
      <UserAppListSkeleton v-if="userLoading && showMain" />
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
const importedCode = location?.search?.split('code=')[1] ?? '';
const chromeExtension = location?.search?.split('chrome=')[1] ?? '';
const showMain = ref(true);

if (chromeExtension && chromeExtension != '') {
  showMain.value = false;
} else if (importedCode && importedCode !== '') {
  emit('showSettings');
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
