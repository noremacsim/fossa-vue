<script setup>
  import { useUserStore } from "@/stores/user";
  import { storeToRefs } from "pinia";
  import { onMounted, ref} from "vue";
  import NewAppButton from "@/components/buttons/newAppButton.vue";
  import draggable from 'vuedraggable'
  import HomePageTour from "@/components/tours/HomePageTour.vue";

  const { user, displayApps, filter } = storeToRefs(useUserStore());
  const { removeUserApp, updateAppIndex, filterApps } = useUserStore();
  const drag = ref(false);

  let showDelete = ref(false);

  onMounted(() => {

    document.querySelector('img').addEventListener('click', function(e) {
      e.preventDefault();
    });

    document.querySelector('img').addEventListener('Mousedown', function(e) {
      e.preventDefault();
    });

    window.oncontextmenu = function(event) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    };

    document.querySelector('body').addEventListener('click', function(e) {
      if (
          !e.target.classList.contains('deleteApp') &&
          !e.target.classList.contains('appsImage') &&
          !e.target.classList.contains('moveApp') &&
          !e.target.classList.contains('moveAppIcon') &&
          !e.target.classList.contains('appLink') &&
          !e.target.classList.contains('folderBox')
      ) {
        if (showDelete.value === true) {
          showDelete.value = false
          updateAppIndex();
        }
      }
    })
  });

  function showingUpgrade() {
    this.$emit('showUpgrade')
  }
  function showAppDeletes() {
    if (user.value.lockapps === false || user.value.lockapps === '0') {
      showDelete.value = true;
    }
  }
  function navigate(link) {
    if (showDelete.value === false) {
      if (!link.match(/^[a-zA-Z]+:\/\//))
      {
        link = 'https://' + link;
      }
      window.open(link, '_blank').focus();
    }
  }

</script>
<template>
  <div id="userHTML" class="loaded userHTML">

    <div class="d-inline-flex position-relative p-2 newAppModalButton" v-if="filter != null" @click="filterApps()">
      <div class="backIcon rounded-9 userAppStyle">
        <font-awesome-icon icon="arrow-left" class="backIconPlus" aria-hidden="true" />
      </div>
    </div>

    <draggable
        v-if="displayApps.length > 0"
        v-model="displayApps"
        @start="drag=true"
        @end="drag=false"
        handle=".moveApp"
        item-key="id"
        class="appcontainers"
    >
      <template #item="{element, index }">

        <div
            class="d-inline-flex position-relative p-2 newAppModalButton folderBox"
            v-if="element.type === 'folder'"
            v-bind="props"
            v-touch:hold="showAppDeletes"
            :tabindex="index"
        >
          <div class="newAppIcon rounded-9 userAppStyle folderContainer folderBox" @click="filterApps(element.id)">
            <span class="folderLabel">{{ element.name }}</span>
            <div v-if="user.folders[element.id].length > 0">
              <img
                  v-for="app in user.folders[element.id].slice(0, 9)"
                  v-bind:key="app.id"
                  loading="lazy"
                  class="folderImage rounded-9 shadow-4 appsImage userAppStyle"
                  :src="app.image"
                  :alt="app.name"
                  role="button"
                  type="button"
              >
            </div>
          </div>

          <img
              v-show="showDelete"
              class="deleteApp"
              v-bind:data-id="element.id"
              v-touch="() => removeUserApp(element.id)"
              :tabindex="`1${index}`"
              role="button"
              type="button"
              src="https://www.transparentpng.com/thumb/red-cross/dU1a5L-flag-x-mark-clip-art-computer-icons.png"
          >

          <div class="moveApp" v-show="showDelete">
            <img
                class="moveAppIcon rounded-9 shadow-4 appsImage userAppStyle"
                v-bind:data-id="element.id"
                :tabindex="`1${index}`"
                role="button"
                type="button"
                src="https://img.uxwing.com/wp-content/themes/uxwing/download/arrow-direction/move-arrows-icon.png"
            >
          </div>
        </div>

        <div
            v-else-if="element.type !== 'folder'"
            v-touch:hold="showAppDeletes"
            :value="element.id"
            :key="element.id"
            v-touch="() => navigate(element.url)"
            :tabindex="index"
            role="button"
            type="button"
            class="d-inline-flex position-relative p-2 appLink"
            :data-url="element.url"
        >
          <img
              v-show="showDelete"
              class="deleteApp"
              v-bind:data-id="element.id"
              v-touch="() => removeUserApp(element.id)"
              :tabindex="`1${index}`"
              role="button"
              type="button"
              src="https://www.transparentpng.com/thumb/red-cross/dU1a5L-flag-x-mark-clip-art-computer-icons.png"
          >

          <div class="moveApp" v-show="showDelete">
            <img
                class="moveAppIcon rounded-9 shadow-4 appsImage userAppStyle"
                v-bind:data-id="element.id"
                :tabindex="`1${index}`"
                role="button"
                type="button"
                src="https://img.uxwing.com/wp-content/themes/uxwing/download/arrow-direction/move-arrows-icon.png"
            >
          </div>

          <transition name="slide-fade">

            <v-img
                v-if="element.image"
                class="rounded-9 shadow-4 appsImage userAppStyle"
                lazy-src="data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
                :src="element.image"
                :alt="element.name"
                height="100"
                width="100"
                role="button"
                type="button"
            >
              <template v-slot:placeholder>
                <div class="d-flex align-center justify-center fill-height">
                  <v-progress-circular
                      color="grey-lighten-4"
                      indeterminate
                  ></v-progress-circular>
                </div>
              </template>
            </v-img>
          </transition>
        </div>
      </template>

    </draggable>


    <transition name="slide-fade">
      <new-app-button v-if="user.lockapps === false || user.lockapps === '0'" @showAppUpgrade="showingUpgrade" />
    </transition>

    <home-page-tour />

  </div>
</template>

<style scoped>

.folderLabel {
  position: absolute;
  width: 100%;
  text-align: center;
  background: #000000a6;
  color: white;
  bottom: 0;
  border-radius: 0 0 15px 15px;
}

.folderContainer {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  position: relative;
  height: 100px;
  width: 100px;
  border: 1px solid #bdc1c7;
  border-radius: 15px;
  color: #c0c6cf;
  background: #ffffff85;
}

.folderImage {
  width: 25px !important;
  height: 25px !important;
  margin: 2px !important;
}

.backIconPlus {
  position: absolute;
  top: 21%;
  left: 25%;
  font-size: 66px;
  font-weight: 100;
}

.backIcon {
  height: 100px;
  width: 100px;
  border: 1px solid #bdc1c7;
  border-radius: 15px;
  color: #c0c6cf;
  background: #ffffff85;
  cursor: pointer;
}

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

.appcontainers {
  display: contents;
}

.userHTML {
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
  z-index: 2;
}

.moveApp {
  position: absolute;
  height: 100px;
  width: 100px;
  background: #ffffff80;
  border-radius: 20px;
  cursor: pointer;
  display: block;
  z-index: 1;
}

.moveAppIcon {
  width: 35px;
  height: 35px;
  margin: auto;
  display: block;
  top: 31px;
  left: 32px;
  position: absolute;
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