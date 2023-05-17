<script setup>
import UserHeader from "@/components/UserHeader.vue";
import UserAppList from "@/components/UserAppList.vue";
import UserAppListSkeleton from "@/components/skeleton/UserAppListSkeleton.vue";
import UserHeaderSkeleton from "@/components/skeleton/UserHeaderSkeleton.vue";
</script>

<template>

  <main>

    <UserHeader v-if="!getAppIDLoading || !getAppsLoading" />
    <UserHeaderSkeleton v-else />

    <div class="appContainer" role="main">

      <UserAppList v-if="!getAppIDLoading || !getAppsLoading" />
      <UserAppListSkeleton v-else />

    </div>

  </main>

</template>

<script>
import {mapGetters, mapState} from "vuex";
import {GET_APPID} from "@/stores/action.type";

export default {
  async mounted() {
    await this.$store.dispatch(GET_APPID)
  },
  computed: {
    ...mapState(["appID"]),
    ...mapGetters(["currentAppID", "apps"]),
    getAppIDLoading() {
      return this.$store.state.appid.loading;
    },
    getAppsLoading() {
      return this.$store.state.apps.loading;
    }
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
