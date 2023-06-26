<script setup>
import fontAwsomeButton from "@/components/buttons/fontAwsomeButton.vue";
import SettingsButton from "@/components/buttons/settingsButton.vue";
import HomeFooter from "@/components/HomeFooter.vue";
</script>

<template>

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

header {
  line-height: 1.5;
  max-height: 100vh;
  width: 100%;
  height: 80px;
}

</style>
