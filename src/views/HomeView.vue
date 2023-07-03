<template>

  <main>

    <div class="appContainer" role="main">
      <UserAppList v-if="!loading"/>
      <div class="d-flex align-center justify-center fill-height" v-if="loading">
        <v-progress-circular
            color="grey-lighten-4"
            indeterminate
        ></v-progress-circular>
      </div>
    </div>

  </main>

</template>

<script setup>

import { useUserStore } from "@/stores/user";
import UserAppList from "@/components/UserAppList.vue";
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
