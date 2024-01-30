<script setup>
  import {allApps} from "@/common/allApps";
  import {ref} from "vue";
  import {useUserStore} from "@/stores/user";
  const { addApp, addUserFolder } = useUserStore();
  const { filter } = storeToRefs(useUserStore());
  import { defineEmits } from 'vue'
  import {storeToRefs} from "pinia";
  const emit = defineEmits(['close'])


  defineProps({
    show: Boolean,
  })

  let appName = ref('');
  let appUrl = ref('');
  let appImage = ref('');
  let folderName = ref('');
  const newAppIcon = ref('');


  function addNewApp(name, url, image) {
    addApp(name, url, image)
    emit('close');
  }

  function saveFolder() {
    let data = {
      name: folderName.value,
    }
    addUserFolder(data)
    emit('close');
  }

  function saveCustom() {
    let imageApp = ''

    if (appImage.value === '') {
      imageApp = newAppIcon.value;
    } else {
      imageApp = appImage.value;
    }
    addApp(appName.value, appUrl.value, imageApp)
    emit('close');
  }

  function GeneratIcon() {
    newAppIcon.value = `https://www.google.com/s2/favicons?sz=128&domain_url=${appUrl.value}`
  }

</script>
<template>

  <v-card>
    <div class="modal-body">

      <div class="modalHeader">
        <h5 class="modalTitle">Add New Bookmark</h5>
        <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close" @click="$emit('close')"></button>
      </div>

      <v-expansion-panels
          style="padding: 10px;"
      >

        <v-expansion-panel
            expand-icon="fas fa-plus"
            style="border-bottom-left-radius: 10px !important;border-bottom-right-radius: 10px !important;border-top-left-radius: 10px !important;border-top-right-radius: 10px !important;"
        >
          <v-expansion-panel-title>
            <font-awesome-icon
                icon="table-list"
                style="background: #c9d6fc;margin-right: 10px;font-size: 22px;padding: 15px;border-radius: 10px;"
            ></font-awesome-icon>
            <div class="titleSub">
              Add New App
              <span style="color: grey;font-size: 13px;">Add from list of apps</span>
            </div>
          </v-expansion-panel-title>
          <v-expansion-panel-text>

            <div class="d-flex justify-content-center flex-wrap mb-3" id="newAppList">
              <div v-for="app of allApps" :value="app.value" :key="app.value" @click="addNewApp(app[0], app[1], app[3])" class="d-inline-flex position-relative p-2 addApp">
                <v-img
                    class="rounded-9 shadow-4 appsImage"
                    lazy-src="data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
                    :src="app[3]"
                    :alt="app[0]"
                    height="75"
                    width="75"
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
                <span class="appTitle">{{ app[0] }}</span>
              </div>
            </div>

          </v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel
            expand-icon="fas fa-link"
            style="border-bottom-left-radius: 10px !important;border-bottom-right-radius: 10px !important;border-top-left-radius: 10px !important;border-top-right-radius: 10px !important;"
        >
          <v-expansion-panel-title>
            <font-awesome-icon
                icon="link"
                style="background: #ffd93c;margin-right: 10px;font-size: 22px;padding: 15px 12.5px 15px 12.5px;border-radius: 10px;"
            ></font-awesome-icon>
            <div class="titleSub">
              Add New URL
              <span style="color: grey;font-size: 13px;">Enter Custom URL</span>
            </div>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-text-field
                label="Website Name"
                prepend-icon="fas fa-globe"
                variant="underlined"
                v-model="appName"
                hint="Google"
            ></v-text-field>
            <v-text-field
                label="Website URL"
                prepend-icon="fas fa-link"
                variant="underlined"
                v-model="appUrl"
                @change="GeneratIcon"
                hint="www.google.com"
            ></v-text-field>
            <img :src="newAppIcon" style="display: block;margin: auto;"/>
            <v-text-field
                label="Custom Image URL (Optional)"
                prepend-icon="fas fa-image"
                variant="underlined"
                v-model="appImage"
            ></v-text-field>
            <v-btn block color="light-green-lighten-1" rounded="lg" @click="saveCustom">Save</v-btn>
          </v-expansion-panel-text>
        </v-expansion-panel>

<!--        <v-expansion-panel-->
<!--            expand-icon="fas fa-folder"-->
<!--            v-if="!filter"-->
<!--            style="border-bottom-left-radius: 10px !important;border-bottom-right-radius: 10px !important;border-top-left-radius: 10px !important;border-top-right-radius: 10px !important;"-->
<!--        >-->
<!--          <v-expansion-panel-title>-->
<!--            <font-awesome-icon-->
<!--                icon="folder"-->
<!--                style="background: #29dc8b;margin-right: 10px;font-size: 22px;padding: 15px;border-radius: 10px;"-->
<!--            ></font-awesome-icon>-->
<!--            <div class="titleSub">-->
<!--              Create New Folder-->
<!--              <span style="color: grey;font-size: 13px;">Catgorise Items into folders</span>-->
<!--            </div>-->
<!--          </v-expansion-panel-title>-->
<!--          <v-expansion-panel-text>-->
<!--            <v-text-field-->
<!--                label="Folder name"-->
<!--                hint="Productivity"-->
<!--                prepend-icon="fas fa-folder"-->
<!--                variant="underlined"-->
<!--                v-model="folderName"-->
<!--            ></v-text-field>-->
<!--            <v-btn block color="light-green-lighten-1" rounded="lg" @click="saveFolder">Save</v-btn>-->
<!--          </v-expansion-panel-text>-->
<!--        </v-expansion-panel>-->

      </v-expansion-panels>

    </div>
  </v-card>
</template>

<style>
.v-expansion-panel__shadow {
  box-shadow: none !important
}
</style>

<style scoped>

.appTitle {
  display: block;
  position: absolute;
  text-align: center;
  width: 75px;
  bottom: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
}

#newAppList {
  max-height: 50vh;
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>