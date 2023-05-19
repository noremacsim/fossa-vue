<script setup>
import HomeView from "@/views/HomeView.vue";
import fontAwsomeButton from "@/components/buttons/fontAwsomeButton.vue";
import SettingsButton from "@/components/buttons/settingsButton.vue";
</script>

<template>

  <!-- PAGE HEADER -->
  <header>

    <div class="topNav" role="navigation">

      <settings-button className="floatButton settingsButton" />

      <fontAwsomeButton
          icon="up-right-and-down-left-from-center"
          className="floatButton fullscreenButton"
          @click="goFullscreen"
      />

    </div>

  </header>

  <!-- MAIN PAGE -->
  <HomeView />

</template>
<script>
export default {
  methods: {
    goFullscreen() {
      window.location = 'https://youtube.com/redirect?q=https://fossa-app.site';
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
