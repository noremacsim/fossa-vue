<script setup>
import HomeView from "@/views/HomeView.vue";
import fontAwsomeButton from "@/components/buttons/fontAwsomeButton.vue";
import SettingsButton from "@/components/buttons/settingsButton.vue";
</script>

<template>

  <!-- PAGE HEADER -->
  <header>

    <div class="topNav" role="navigation">

      <settings-button />

      <fontAwsomeButton
          icon="up-right-and-down-left-from-center"
          className="floatButton fullscreenButton"
      />

    </div>

  </header>

  <!-- MAIN PAGE -->
  <HomeView />

</template>
<style scoped>

.floatButton {
  top: 0;
  position: absolute;
  background: #3b71ca;
  box-shadow: 0 4px 9px -4px #3b71ca;
  padding: 13px;
  font-size: 25px;
  margin: 10px;
  border-radius: 25px;
  color: white;
}

.settingsButton {
  right: 0;
}

.fullscreenButton {
  left: 0;
}

header {
  line-height: 1.5;
  max-height: 100vh;
  width: 100%;
  height: 80px;
}

</style>
