<script setup>
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
const { user } = storeToRefs(useUserStore());

</script>
<template>
  <div class="header" role="banner">

    <img v-if="!user?.profileImage" src="/img/icons/512.png" class="loaded rounded-circle mb-3 profileImage headerProfile userProfileImageSrc" style="width: 125px; height: 125px; border: 3px solid white;" alt="Avatar" />
    <img v-if="user?.profileImage" :src="user?.profileImage" class="loaded rounded-circle mb-3 profileImage headerProfile userProfileImageSrc" style="width: 125px; height: 125px; border: 3px solid white;" alt="Avatar" />

    <h5 class="loaded mb-2 headerProfile" style="margin-top: 10px;" v-if="user?.displayName"><strong>Welcome {{ user.displayName }}</strong></h5>
    <h5 class="loaded mb-2 headerProfile" style="margin-top: 10px;" v-if="!user?.displayName"><strong>Welcome to Fossa</strong></h5>

    <p v-if="!user?.bio" style="margin-bottom: 25px"></p>
    <p v-if="user?.bio">{{ user.bio }}</p>

  </div>
</template>

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
  color: black;
  text-shadow: 0.05em 0 white, 0 0.05em white, -0.05em 0 white, 0 -0.05em white, -0.05em -0.05em white, -0.05em 0.05em white, 0.05em -0.05em white, 0.05em 0.05em white;
}

</style>