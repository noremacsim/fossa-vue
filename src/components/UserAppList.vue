<script setup>
  import { useUserStore } from "@/stores/user";
  import { storeToRefs } from "pinia";
  import {onMounted, ref} from "vue";
  import NewAppButton from "@/components/buttons/newAppButton.vue";
  import draggable from 'vuedraggable'

  const { user } = storeToRefs(useUserStore());
  const { removeUserApp, updateAppIndex } = useUserStore();
  const drag = ref(false);

  let showDelete = ref(false);

  onMounted(() => {
    document.querySelector('body').addEventListener('click', function(e) {
      if (
          !e.target.classList.contains('deleteApp') &&
          !e.target.classList.contains('appsImage') &&
          !e.target.classList.contains('moveApp') &&
          !e.target.classList.contains('moveAppIcon') &&
          !e.target.classList.contains('appLink')
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

      window.location = link;
    }
  }

</script>
<template>
  <div id="userHTML" class="loaded userHTML">

    <draggable
        v-model="user.apps"
        @start="drag=true"
        @end="drag=false"
        handle=".moveApp"
        item-key="id"
    >
      <template #item="{element, index }">
        <div
            v-touch:hold="showAppDeletes"
            :value="element.id"
            :key="element.id"
            v-touch="() => navigate(user.apps[index].url)"
            :tabindex="index"
            role="button"
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
              src="https://www.transparentpng.com/thumb/red-cross/dU1a5L-flag-x-mark-clip-art-computer-icons.png"
          >

          <div class="moveApp" v-show="showDelete">
            <img
                class="moveAppIcon rounded-9 shadow-4 appsImage userAppStyle"
                v-bind:data-id="element.id"
                :tabindex="`1${index}`"
                role="button"
                src="https://img.uxwing.com/wp-content/themes/uxwing/download/arrow-direction/move-arrows-icon.png"
            >
          </div>

          <transition name="slide-fade">
            <img
                v-if="element.image"
                loading="lazy"
                class="rounded-9 shadow-4 appsImage userAppStyle"
                :src="element.image"
                v-bind:alt="element.name"
                style="width: 100px; height: 100px;"
            />
          </transition>

        </div>
      </template>

    </draggable>


    <transition name="slide-fade">
      <new-app-button v-if="user.lockapps === false || user.lockapps === '0'" @showAppUpgrade="showingUpgrade" />
    </transition>

  </div>
</template>

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