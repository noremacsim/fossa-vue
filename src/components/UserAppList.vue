<template>

  <div id="userHTML" class="loaded userHTML">
    <div
        v-touch:hold="showAppDeletes"
        v-for="(app, index) in apps"
        :value="app.value"
        :key="app.value"
        v-touch="() => navigate(apps[index].url)"
        :tabindex="index"
        role="button"
        class="d-inline-flex position-relative p-2 appLink"
        :data-url="app.url"
    >

        <img
            v-show="showDelete"
            class="deleteApp"
            v-bind:data-id="app.id"
            v-touch="() => deleteApp(apps[index].id)"
            :tabindex="`1${index}`"
            role="button"
            src="https://www.transparentpng.com/thumb/red-cross/dU1a5L-flag-x-mark-clip-art-computer-icons.png"
        >

        <transition name="slide-fade">
          <img
              v-if="app.image"
              loading="lazy"
              class="rounded-9 shadow-4 appsImage userAppStyle"
              :src="app.image"
              v-bind:alt="app.name"
              style="width: 100px; height: 100px;"
          >
        </transition>

    </div>

    <transition name="slide-fade">
      <new-app-button v-if="!getAppsLoading" />
    </transition>

  </div>
</template>
<script>

import {FETCH_APPS, REMOVE_APP} from "@/stores/action.type";
import {mapGetters} from "vuex";
import NewAppButton from "@/components/buttons/newAppButton.vue";

export default {
  data() {
    return {
      showDelete: false
    }
  },
  components: {NewAppButton},
  mounted() {
    let vue = this;
    document.querySelector('body').addEventListener('click', function(e) {
      if (!e.target.classList.contains('deleteApp') && !e.target.classList.contains('appsImage')) {
        vue.showDelete = false
      }
    })
  },
  computed: {
    ...mapGetters(["apps"]),
    getAppsLoading() {
      return this.$store.state.apps.loading;
    }
  },
  methods: {
    showAppDeletes() {
      this.showDelete = true;
    },
    deleteApp(appID) {
      this.$store.dispatch(REMOVE_APP, appID)
    },
    navigate(link) {
      if (this.showDelete === false) {
        if (!link.match(/^[a-zA-Z]+:\/\//))
        {
          link = 'https://' + link;
        }

        window.location = link;
      }
    }
  }
}

</script>

<style scoped>

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.userHTML {
  margin-top: 50px;
  margin-bottom: 25px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 900px;
}

.deleteApp {
  position: absolute;
  height: 40px;
  width: 40px;
  right: 0px;
  top: 0;
  background: white;
  padding: 2px;
  border-radius: 10px;
  cursor: pointer;
}

.deleteAppTitle {
  color: red !important;
  font-weight: bold !important;
  font-size: 25px !important;
  background: transparent !important;
}

.deleteAppCancel {
  background: lightgreen !important;
  font-size: 20px !important;
}

</style>