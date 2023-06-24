<script>
import {allApps} from "@/common/allApps";
import {CREATE_APP} from "@/stores/action.type";
import {useToast} from "vue-toastification";
import {mapState} from "vuex";

export default {
  data() {
    return {
      allApps: allApps,
      appName: '',
      appUrl: '',
      appImage: '',
      showCustom: false,
      showUpgrade: false
    }
  },
  props: {
    show: Boolean
  },
  computed: {
    ...mapState(['appid', 'apps'])
  },
  methods: {
    showUpgradePage() {
      this.$emit('close');
      this.$emit('showUpgradePage')
    },
    showCustomForm() {
      const toast = useToast()
      if (this.apps.subscription === '0') {
        toast.error("Subscribe to get access to this feature", {
          timeout: 2000,
        });
        this.showUpgrade = true;
      } else {
        this.showCustom = true;
      }
    },
    addNewApp(name, url, image) {
      this.$store.dispatch(CREATE_APP, {name, url, image})
      this.$emit('close');
    },
    saveCustom() {
      let data = {
        name: this.appName,
        url: this.appUrl,
        image: this.appImage
      }
      this.$store.dispatch(CREATE_APP, data)
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

          <button class="btn btn-primary" @click="showUpgradePage" v-if="showUpgrade" style="background: gold;color: black;border: gold;">Click here to Upgrade Now for custom Apps</button>
          <button class="btn btn-primary" @click="showCustomForm" v-if="!showCustom && !showUpgrade">Add Custom App/URL</button>

        </div>
      </div>
    </div>
  </Transition>
</template>


<style scoped>
#newAppList {
  max-height: 50vh;
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>