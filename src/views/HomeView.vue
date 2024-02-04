<template>

  <main>

    <UserHeader v-if="!userLoading && showMain" />
    <UserHeaderSkeleton v-if="userLoading && showMain" />

    <div class="appContainer" role="main">
      <UserAppList v-if="!userLoading && showMain" @showLoginModal="emit('showLoginModal')"/>
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

const { userLoading } = storeToRefs(useUserStore());
const showMain = ref(true);

const emit = defineEmits(['showLoginModal'])


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
