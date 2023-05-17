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
              <img class="rounded-9 shadow-4 appsImage" v-bind:src="app[3]" alt="${element[0]}" style="width: 75px; height: 75px;">
            </div>
          </div>

        </div>
      </div>
    </div>
  </Transition>
</template>


<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modalHeader {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1rem;
  border-bottom: 2px solid #f5f5f5;
  border-top-left-radius: calc(0.5rem - 1px);
  border-top-right-radius: calc(0.5rem - 1px);
}

.modal-title {
  color: #515151;
}

.modal-container {
  max-width: 570px !important;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  border-radius: 0.5rem;
  margin-right: auto;
  margin-left: auto;
  margin-top: 1.75rem;
  height: fit-content;
}

.modal-header h5 {
  color: #727272;;
}

.modal-body {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  pointer-events: auto;
  background-clip: padding-box;
  outline: 0;
}

.modal-default-button {
  float: right;
}

#newAppList {
  max-height: 500px;
  overflow-x: hidden;
  overflow-y: scroll;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>