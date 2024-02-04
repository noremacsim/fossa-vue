<script setup>
  import { useUserStore } from "@/stores/user";
  import { storeToRefs } from "pinia";
  import {defineEmits, onMounted, ref} from "vue";
  import NewAppButton from "@/components/buttons/newAppButton.vue";
  import draggable from 'vuedraggable'
  import HomePageTour from "@/components/tours/HomePageTour.vue";
  import EditLinkModel from "@/components/modals/editLinkModel.vue";
  import EditFolderModal from "@/components/modals/editFolderModal.vue";

  const { user, displayApps, filter, loggedIn } = storeToRefs(useUserStore());
  const { updateAppIndex, filterApps, updateUserApp, updateUserFolder } = useUserStore();
  const drag = ref(false);

  const emit = defineEmits(['showLoginModal'])

  const editLinkModal = ref(false);
  const editFolderModal = ref(false);
  const editAppName = ref('');
  const editAppUrl = ref('');
  const editAppImage = ref('');
  const editID = ref(null);

  let showDelete = ref(false);

  onMounted(() => {

    document.body.addEventListener('click mousedown', function(e) {
      if (e.target.tagName.toLowerCase() === 'img') {
        e.preventDefault();
      }
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
          !e.target.classList.contains('folderBox') &&
          !e.target.classList.contains('editApp') &&
          !e.target.classList.contains('no-edit-hide') &&
          !e.target.classList.contains('v-field__input')
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
    showDelete.value = !user.value.lockApps && loggedIn.value;
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

  function showAppEdit(name, url, image, id) {
    editAppUrl.value = url;
    editAppImage.value = image;
    editID.value = id;
    editAppName.value = name;
    editLinkModal.value = true;
  }

  function showfolderEdit(name, url, image, id) {
    editAppUrl.value = url;
    editAppImage.value = image;
    editID.value = id;
    editAppName.value = name;
    editFolderModal.value = true;
  }

  function saveEdit() {
    let data = {
      name: editAppName.value,
      url: editAppUrl.value,
      image: editAppImage.value,
      id: editID.value
    }

    updateUserApp(data)
    editLinkModal.value = false
  }

  function saveEditfolder() {
    let data = {
      name: editAppName.value,
      url: editAppUrl.value,
      image: editAppImage.value,
      id: editID.value
    }

    updateUserFolder(data)
    editFolderModal.value = false
  }

</script>
<template>
  <div id="userHTML" class="loaded userHTML">

    <div class="d-inline-flex position-relative p-2 newAppModalButton" v-if="filter != null" @click="filterApps()">
      <div class="backIcon rounded-9 userAppStyle">
        <font-awesome-icon icon="arrow-left" class="backIconPlus" aria-hidden="true" />
      </div>
    </div>

    <EditLinkModel
        v-if="editLinkModal"
        :showModal="editLinkModal"
        :appName="editAppName"
        :appUrl="editAppUrl"
        :appImage="editAppImage"
        :id="editID"
        @update:appName="editAppName = $event"
        @update:appImage="editAppImage = $event"
        @close="editLinkModal = false"
        @save="saveEdit"
    >
    </EditLinkModel>

    <EditFolderModal
        v-if="editFolderModal"
        :showModal="editFolderModal"
        :appName="editAppName"
        :id="editID"
        @update:appName="editAppName = $event"
        @close="editFolderModal = false"
        @save="saveEditfolder"
    ></EditFolderModal>


    <draggable
        :key="displayApps.length"
        v-show="displayApps?.length > 0"
        v-model="displayApps"
        @start="drag=true"
        @end="drag=false"
        handle=".moveApp"
        item-key="id"
        animation="300"
        class="appcontainers"
    >
      <template #item="{element, index }">
        <div
            class="d-inline-flex position-relative p-2 newAppModalButton folderBox"
            v-if="element.type === 'folder'"
            v-bind="props"
            v-touch:hold="showAppDeletes"
            :tabindex="index"
            style="margin-bottom: 12px;"
        >
          <div class="newAppIcon rounded-9 userAppStyle folderContainer folderBox" @click="filterApps(element.id)">
            <div v-if="user.folders[element.id]?.length > 0" style="display: flex;justify-content: center;flex-wrap: wrap;padding: 5px;">
              <img
                  v-for="app in user.folders[element.id].slice(0, 9)"
                  loading="lazy"
                  v-bind:key="app.id"
                  class="folderImage rounded-9 shadow-4 appsImage userAppStyle"
                  :src="app.image"
                  :alt="app.name"
                  role="button"
                  type="button"
              >
            </div>
          </div>
          <span class="appTitle">{{ element.name }}</span>

          <font-awesome-icon
              v-show="showDelete"
              class="editApp no-edit-hide"
              v-bind:data-id="element.id"
              v-touch="() => showfolderEdit(element.name, element.url, element.image, element.id)"
              :tabindex="`1${index}`"
              role="button"
              type="button"
              icon="pencil"
          ></font-awesome-icon>

          <div class="moveApp" v-show="showDelete">
            <img
                class="moveAppIcon rounded-9 shadow-4 appsImage userAppStyle"
                v-bind:data-id="element.id"
                loading="lazy"
                :tabindex="`1${index}`"
                role="button"
                type="button"
                src="https://cdn-icons-png.flaticon.com/512/3/3723.png"
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
            style="margin-bottom: 12px;"
        >
          <font-awesome-icon
              v-show="showDelete"
              class="editApp no-edit-hide"
              v-bind:data-id="element.id"
              v-touch="() => showAppEdit(element.name, element.url, element.image, element.id)"
              :tabindex="`1${index}`"
              role="button"
              type="button"
              icon="pencil"
          ></font-awesome-icon>

          <div class="moveApp" v-show="showDelete">
            <img
                class="moveAppIcon rounded-9 shadow-4 appsImage userAppStyle"
                v-bind:data-id="element.id"
                loading="lazy"
                :tabindex="`1${index}`"
                role="button"
                type="button"
                src="https://cdn-icons-png.flaticon.com/512/3/3723.png"
            >
          </div>

          <v-img
              v-if="element.image"
              loading="lazy"
              class="rounded-9 shadow-4 appsImage userAppStyle"
              lazy-src="data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
              :src="element.image"
              :alt="element.name"
              height="85"
              width="85"
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
          <span class="appTitle">{{ element.name }}</span>
        </div>

      </template>

    </draggable>


    <new-app-button v-if="user?.lockApps !== true && loggedIn" @showAppUpgrade="showingUpgrade" />

    <div v-if="!loggedIn" class="d-inline-flex position-relative p-2 newAppModalButton" @click="emit('showLoginModal')">
      <div class="newAppIcon rounded-9 userAppStyle">
        <font-awesome-icon icon="plus" class="newAppIconPlus" aria-hidden="true" />
      </div>
    </div>

    <home-page-tour />

  </div>
</template>

<style scoped>

.newAppIconPlus {
  position: absolute;
  top: 18%;
  left: 25%;
  font-size: 57px;
  font-weight: 100;
}

.newAppIcon {
  height: 85px;
  width: 85px;
  border: 1px solid #bdc1c7;
  border-radius: 15px;
  color: #c0c6cf;
  background: #ffffff85;
}

.appTitle {
  display: block;
  position: absolute;
  text-align: center;
  width: 85px;
  bottom: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
}

.folderLabel {
  word-break: break-word;
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
  height: 85px;
  width: 85px;
  border: 1px solid #bdc1c7;
  border-radius: 15px;
  color: #c0c6cf;
  background: #ffffff85;
  margin-bottom: 10px;
}

.folderImage {
  width: 20px !important;
  height: 20px !important;
  margin: 2px !important;
}

.backIconPlus {
  position: absolute;
  top: 17%;
  left: 26%;
  font-size: 57px;
  font-weight: 100;
}

.backIcon {
  height: 85px;
  width: 85px;
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

.editApp {
  position: absolute;
  height: 20px;
  width: 20px;
  right: 0px;
  top: 0px;
  padding: 10px;
  background: white;
  border-radius: 10px;
  cursor: pointer;
  z-index: 2;
  color: rgb(84 211 171);
  border: 1px solid #80808082;
}

.deleteApp {
  position: absolute;
  height: 30px;
  width: 30px;
  right: 0px;
  top: 0px;
  background: white;
  padding: 2px;
  border-radius: 10px;
  cursor: pointer;
  z-index: 2;
}

.moveApp {
  position: absolute;
  height: 85px;
  width: 85px;
  background: #ffffff80;
  border-radius: 20px;
  cursor: pointer;
  display: block;
  z-index: 1;
}

.moveAppIcon {
  width: 30px;
  height: 30px;
  margin: auto;
  display: block;
  top: 30px;
  left: 28px;
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