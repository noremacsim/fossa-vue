<script setup>
import fontAwsomeButton from "@/components/buttons/fontAwsomeButton.vue";
import SettingsButton from "@/components/buttons/settingsButton.vue";
import HomeFooter from "@/components/HomeFooter.vue";
import {storeToRefs} from "pinia";
import {useUserStore} from "@/stores/user";
const { user } = storeToRefs(useUserStore());
import { ref, watch } from 'vue'
import { registerSW } from 'virtual:pwa-register'

let background = ref('');
registerSW({ immediate: true })

watch(user, async () => {
  if (user.value?.backgroundImage) {
    background.value = `url(${user.value.backgroundImage})`;
  } else {
    background.value = ''
  }
});

</script>

<template>
  <body>
  <!-- PAGE HEADER -->
  <header>

    <div class="topNav" role="navigation">

      <SettingsButton :showModal="showModal" className="floatButton settingsButton"/>

      <router-link to="/user">
        <fontAwsomeButton
            icon="user"
            className="floatButton settingsButton"
            @click="page = 'user'"
            v-show="page === 'home' || page === 'subscribe'"
        />
      </router-link>

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

  <router-view @showSettings="showModal = true" ></router-view>

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
