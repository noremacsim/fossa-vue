<script setup>
  import {allApps} from "@/common/allApps";
  import {ref} from "vue";
  import {useUserStore} from "@/stores/user";
  const { addUserApp, addUserFolder } = useUserStore();
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
    addUserApp({name, url, image})
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

    let data = {
      name: appName.value,
      url: appUrl.value,
      image: imageApp
    }
    addUserApp(data)
    emit('close');
  }

  function GeneratIcon() {
    newAppIcon.value = `https://www.google.com/s2/favicons?sz=128&domain_url=${appUrl.value}`
  }

</script>
<template>

  <v-card>
    <div class="modalHeader">
      <h5 class="modal-title">Add New Site</h5>
      <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close" @click="$emit('close')"></button>
    </div>
    <div class="modal-body">

      <div class="card">
        <div class="card-body" style="background: #cce5ff;color: #004085;text-align: center;">
          <span>Touch and Hold down an app on your homescreen to enable delete mode</span>
        </div>
      </div>

      <v-expansion-panels variant="accordion">

        <v-expansion-panel
            title="Add New Link"
            expand-icon="fas fa-link"
        >
          <v-expansion-panel-text>
            <v-text-field v-model="appName" label="Website Name" variant="outlined"></v-text-field>
            <v-text-field @change="GeneratIcon" v-model="appUrl" label="Website URL" variant="outlined"></v-text-field>
            <img :src="newAppIcon" style="display: block;margin: auto;"/>
            <v-text-field v-model="appImage" label="Custom Image URL (Optional)" variant="outlined"></v-text-field>

            <button class="btn btn-success mt-3" style="width: 100%" @click="saveCustom">Save</button>
          </v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel
            title="Add New Folder"
            expand-icon="fas fa-folder"
            v-if="!filter"
        >
          <v-expansion-panel-text>
            <div class="form-group">
              <label for="exampleInputEmail1">Folder Name</label>
              <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Folder Name" v-model="folderName">
            </div>
            <button class="btn btn-success mt-3" style="width: 100%" @click="saveFolder">Save</button>
          </v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel
            title="Add New App"
            expand-icon="fas fa-plus"
        >
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

      </v-expansion-panels>

    </div>
  </v-card>
</template>


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