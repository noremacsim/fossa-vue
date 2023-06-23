<template>

  <main>

    <UserHeader v-if="user?.uniqueID" />

    <div class="appContainer" role="main">
      <UserAppList v-if="user?.uniqueID"/>
    </div>

  </main>

</template>

<script setup>

import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import UserAppList from "@/components/UserAppList.vue";
import UserHeader from "@/components/UserHeader.vue";

const { user } = storeToRefs(useUserStore());
const { initUser } = useUserStore();

initUser();
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
