<script setup>
import UserHeader from "@/components/UserHeader.vue";
import UserAppList from "@/components/UserAppList.vue";
import UserAppListSkeleton from "@/components/skeleton/UserAppListSkeleton.vue";
import UserHeaderSkeleton from "@/components/skeleton/UserHeaderSkeleton.vue";
import HomeFooter from "@/components/HomeFooter.vue";
</script>

<template>

  <main>

    <UserHeader v-if="!appid.loading && !apps.loading" />
    <UserHeaderSkeleton v-else />

    <div class="appContainer" role="main">

      <UserAppList v-if="!appid.loading && !apps.loading" />
      <UserAppListSkeleton v-else />

    </div>

    <HomeFooter />

  </main>

</template>

<script>
import {mapState} from "vuex";
import {GET_APPID} from "@/stores/action.type";

export default {
  async mounted() {
    await this.$store.dispatch(GET_APPID)
    console.log(this.apps);
  },
  computed: {
    ...mapState(["appid", "apps"]),
  },
}
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
