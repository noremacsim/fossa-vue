<script setup>
import UserHeader from "@/components/UserHeader.vue";
import UserAppList from "@/components/UserAppList.vue";
import UserAppListSkeleton from "@/components/skeleton/UserAppListSkeleton.vue";
import UserHeaderSkeleton from "@/components/skeleton/UserHeaderSkeleton.vue";
import HomeFooter from "@/components/HomeFooter.vue";
</script>

<template>

  <main>

    <Teleport to="body">
      <paymentsModal :show="showModal" :subid="appid.appID" @close="showModal = false" />
    </Teleport>

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
// import {GET_APPID} from "@/stores/action.type";
import paymentsModal from "@/components/modals/paymentsModal.vue";


export default {
  async mounted() {
    // await this.$store.dispatch(GET_APPID)
    this.showModal = true;

    // if (this.apps.subscription === '0' || this.apps.subscription === 'undefined') {
    //   this.showModal = true;
    // } else {
    //   console.log(this.apps.subscription);
    //   this.showModal = false;
    // }
  },
  updated() {
    this.showModal = true;

    // if (this.apps.subscription === '0' || this.apps.subscription === 'undefined') {
    //   this.showModal = true;
    // } else {
    //   this.showModal = false;
    // }
  },
  computed: {
    ...mapState(["appid", "apps", "subscription"]),
  },
  components: {
    paymentsModal
  },
  data() {
    return {
      showModal: false,
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
