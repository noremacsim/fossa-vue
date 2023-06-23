<script setup>
import UserHeader from "@/components/UserHeader.vue";
import UserAppList from "@/components/UserAppList.vue";
import UserAppListSkeleton from "@/components/skeleton/UserAppListSkeleton.vue";
import UserHeaderSkeleton from "@/components/skeleton/UserHeaderSkeleton.vue";
import HomeFooter from "@/components/HomeFooter.vue";
</script>

<template>

  <main>

    <Teleport to="body" v-if="showModal">
      <paymentsModal :show="showModal" :subid="appid.appID" @close="showModal = false" @loginPage="showLogin" />
    </Teleport>

    <UserHeader v-if="!appid.loading && !apps.loading" />
    <UserHeaderSkeleton v-else />

    <div class="appContainer" role="main">

      <UserAppList v-if="!appid.loading && !apps.loading" @showUpgrade="showTheUpgrade"/>
      <UserAppListSkeleton v-else />

    </div>

    <HomeFooter />

  </main>

</template>

<script>
import {mapState} from "vuex";
import {GET_APPID} from "@/stores/action.type";
import paymentsModal from "@/components/modals/paymentsModal.vue";


export default {
  async mounted() {
    await this.$store.dispatch(GET_APPID)
    if (this.apps.registered === '1' && (this.apps.subscription === '0' || this.apps.subscription === 'undefined') && this.page === 'home') {
      this.$emit('showSubscribe');
    } else if ((this.apps.registered === '0' || this.apps.registered === 'undefined') && this.page === 'home') {
      this.showModal = true;
    } else {
      this.showModal = false;
    }
  },
  updated() {
    if (this.apps.registered === '1' && (this.apps.subscription === '0' || this.apps.subscription === 'undefined')  && this.page === 'home') {
      this.$emit('showSubscribe');
    } else if ((this.apps.registered === '0' || this.apps.registered === 'undefined') && this.page === 'home') {
      this.showModal = true;
    } else {
      this.showModal = false;
    }
  },
  computed: {
    ...mapState(["appid", "apps", "subscription"]),
  },
  components: {
    paymentsModal
  },
  methods: {
    showLogin() {
      this.showModal = false;
      this.$emit('showLogin')
    },
    showTheUpgrade() {
      this.$emit('showSubscribe')
    }
  },
  data() {
    return {
      showModal: false,
    }
  },
  props: {
    page: String
  }
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
