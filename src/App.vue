<script setup>
import fontAwsomeButton from "@/components/buttons/fontAwsomeButton.vue";
import SettingsButton from "@/components/buttons/settingsButton.vue";
import HomeFooter from "@/components/HomeFooter.vue";
import {storeToRefs} from "pinia";
import {useUserStore} from "@/stores/user";
const { user, loggedIn } = storeToRefs(useUserStore());
import { ref, watch } from 'vue'
import router from "@/router";

import { registerSW } from 'virtual:pwa-register'
registerSW({
  immediate: true,
})

let background = ref('');
let subscribeView = ref(false);

watch(user, async () => {
  if (user.value?.backgroundImage) {
    background.value = `url(${user.value.backgroundImage})`;
  } else {
    background.value = ''
  }
});

function showMain() {
  router.push('/');
}
</script>

<template>
  <body>
  <!-- PAGE HEADER -->
  <header>

    <SettingsButton :showModal="showModal" className="floatButton settingsButton"/>

    <div class="topNav" role="navigation" v-if="!subscribeView">

      <router-link to="/user" v-if="loggedIn">
        <fontAwsomeButton
            icon="user"
            className="floatButton settingsButton"
            @click="page = 'user'"
            v-show="page === 'home' || page === 'subscribe'"
        />
      </router-link>

      <fontAwsomeButton
          v-if="!loggedIn"
          icon="user"
          className="floatButton settingsButton"
          @click="showModal = true"
      />

      <router-link to="/">
        <fontAwsomeButton
            icon="home"
            className="floatButton settingsButton"
            @click="page = 'home'"
            v-show="page === 'user'"
        />
      </router-link>

      <fontAwsomeButton
          icon="up-right-and-down-left-from-center"
          className="floatButton fullscreenButton"
          @click="goFullscreen"
      />

    </div>

  </header>

  <router-view @showSettings="showModal = true" @showHome="showMain"></router-view>

  <HomeFooter></HomeFooter>
  </body>
</template>
<script>
export default {
  methods: {
    goFullscreen() {
      window.location = 'https://youtube.com/redirect?q=https://fossa-app.site';
    }
  },
  data() {
    return {
      page: 'home',
      showModal: false,
    }
  },
}
</script>
<style scoped>

body {
  background-image: v-bind('background');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

header {
  line-height: 1.5;
  max-height: 100vh;
  width: 100%;
  height: 80px;
}

</style>
