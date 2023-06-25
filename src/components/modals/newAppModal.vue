<script setup>
  import {allApps} from "@/common/allApps";
  import {ref} from "vue";
  import {useUserStore} from "@/stores/user";
  const { addUserApp } = useUserStore();
  import { defineEmits } from 'vue'
  const emit = defineEmits(['close'])


  defineProps({
    show: Boolean,
  })

  let appName = ref('');
  let appUrl = ref('');
  let appImage = ref('');
  let showCustom = ref(false);
  let showUpgrade = ref(false);

  function showCustomForm() {
    showCustom.value = true;
  }
  function addNewApp(name, url, image) {
    addUserApp({name, url, image})
    emit('close');
  }
  function saveCustom() {
    let data = {
      name: appName.value,
      url: appUrl.value,
      image: appImage.value
    }
    addUserApp(data)
    emit('close');
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

      <div class="d-flex justify-content-center flex-wrap mb-3" id="newAppList" v-if="!showCustom">
        <div v-for="app of allApps" :value="app.value" :key="app.value" @click="addNewApp(app[0], app[1], app[3])" class="d-inline-flex position-relative p-2 addApp">
          <img class="rounded-9 shadow-4 appsImage" v-bind:src="app[3]" alt="${element[0]}" style="width: 75px; height: 75px;" />
        </div>
      </div>

      <div class="card" v-show="showCustom">
        <div class="card-body">
          <div class="form-group">
            <label for="exampleInputEmail1">App Name</label>
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter App Name" v-model="appName">
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">App URL</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter App URL" v-model="appUrl">
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">App Image URL</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter App Image URL" v-model="appImage">
          </div>
          <button class="btn btn-success mt-3" style="width: 100%" @click="saveCustom">Save</button>
          <button class="btn btn-danger mt-3" style="width: 100%"  @click="showCustom = false">Cancel</button>
        </div>
      </div>

      <button class="btn btn-primary" @click="showCustomForm" v-if="!showCustom && !showUpgrade">Add Custom App/URL</button>

    </div>
  </v-card>
</template>


<style scoped>
#newAppList {
  max-height: 50vh;
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>