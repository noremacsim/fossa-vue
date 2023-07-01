<template>

  <main>

    <div class="appContainer" role="main">
      <UserAppList v-if="!loading"/>
      <UserAppListSkeleton v-if="loading" />
    </div>

  </main>

</template>

<script setup>

import { useUserStore } from "@/stores/user";
import UserAppList from "@/components/UserAppList.vue";
import UserAppListSkeleton from "@/components/skeleton/UserAppListSkeleton.vue";
import {ref} from "vue";
const { initUser } = useUserStore();

const loading = ref(true);

initUser().then(success => {
  if (success === false) {
    console.log('error importing');
  } else {
    loading.value = false;
  }
})


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
