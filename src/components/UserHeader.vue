<template>
  <div class="header" role="banner">
    <img  :src="apps.profileImage" class="loaded rounded-circle mb-3 profileImage headerProfile userProfileImageSrc" style="width: 150px; height: 150px; border: 3px solid white;" alt="Avatar" />
    <h5 class="loaded mb-2 headerProfile" style="margin-top: 10px;"><strong>Welcome to Fossa</strong></h5>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  computed: {
    ...mapState(['appid', 'apps'])
  },
}
</script>

<style scoped>

.header {
  margin: auto;
  display: block;
  width: fit-content;
  text-align: center;
  color: black;
}

.profileImage {
  width: 150px;
  height: 150px;
  border: 3px solid white;
}

.headerProfile {
  margin-top: 10px;
}

</style>