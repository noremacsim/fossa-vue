<script>
import {allApps} from "@/common/allApps";
import {CREATE_APP} from "@/stores/action.type";

export default {
  data() {
    return {
      allApps: allApps
    }
  },
  props: {
    show: Boolean
  },
  methods: {
    addNewApp(name, url, image) {
      this.$store.dispatch(CREATE_APP, {name, url, image})
      this.$emit('close');
    }
  }
}
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-container">

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

          <div class="d-flex justify-content-center flex-wrap mb-3" id="newAppList">
            <div v-for="app of allApps" :value="app.value" :key="app.value" @click="addNewApp(app[0], app[1], app[3])" class="d-inline-flex position-relative p-2 addApp">
              <img class="rounded-9 shadow-4 appsImage" v-bind:src="app[3]" alt="${element[0]}" style="width: 75px; height: 75px;" />
            </div>
          </div>

        </div>
      </div>
    </div>
  </Transition>
</template>


<style scoped>
#newAppList {
  max-height: 500px;
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>