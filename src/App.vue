<script setup>
import HomeView from "@/views/HomeView.vue";
import UserView from "@/views/UserView.vue";
import fontAwsomeButton from "@/components/buttons/fontAwsomeButton.vue";
</script>

<template>

  <!-- PAGE HEADER -->
  <header>

    <div class="topNav" role="navigation">

      <fontAwsomeButton
          icon="user"
          className="floatButton settingsButton"
          @click="page = 'user'"
          v-show="page === 'home'"
      />

      <fontAwsomeButton
          icon="home"
          className="floatButton settingsButton"
          @click="page = 'home'"
          v-show="page === 'user'"
      />

      <fontAwsomeButton
          icon="up-right-and-down-left-from-center"
          className="floatButton fullscreenButton"
          @click="goFullscreen"
      />

    </div>

  </header>

  <!-- MAIN PAGE -->
  <HomeView v-show="page === 'home'" @showLogin="page = 'user'" :page="page" />
  <UserView v-show="page === 'user'" />

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
