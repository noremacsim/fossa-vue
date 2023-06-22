<script setup>
import HomeFooter from "@/components/HomeFooter.vue";
import UserLogin from "@/components/UserLogin.vue"
import UserRegister from "@/components/UserRegister.vue"
import UserProfile from "@/components/UserProfile.vue";
</script>

<template>

  <main>

    <div class="container" v-show="part === '' && part != 'profile'" style="padding: 10px;">
      <h1>All apps in one place</h1>
      <p>Login or Register an account to save and load your apps on other devices</p>
      <button @click="part = 'login'" type="button" class="btn button-primary btn-rounded" style="width: 100%;">Log In</button>
      <button @click="part = 'signup'" type="button" class="btn button-secondry btn-rounded" style="width: 100%;">Sign Up</button>
    </div>

    <UserLogin @signupPage="part = 'signup'" v-show="part === 'login'" />
    <UserRegister @signinPage="part = 'login'" :part="part" v-show="part === 'signup'" />
    <UserProfile :part="part" v-show="part === 'profile'" @showingsub="$emit('showSubscription');"/>


    <HomeFooter />

  </main>

</template>

<script>

import {mapState} from "vuex";

export default {
  data() {
    return {
      part: ''
    }
  },
  async mounted() {
    if (this.apps.registered === '1') {
      this.part = 'profile';
    }
  },
  updated() {
    if (this.apps.registered === '1') {
      this.part = 'profile';
    }
  },
  computed: {
    ...mapState(["appid", "apps", "subscription"]),
  },
}

</script>

<style scoped>

.container {
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: auto;
  padding: 0;
}

</style>
