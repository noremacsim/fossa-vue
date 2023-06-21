<script>
import {RESET_APPID} from "@/stores/action.type";
import {mapState} from "vuex";

export default {
  props: {
    part: String
  },
  computed: {
    ...mapState(['appid', 'apps'])
  },
  methods: {
    async logoutUser() {
      this.$store.dispatch(RESET_APPID);
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="card" style="border: 0px;">
      <div class="card-body">
        <h5 style="color: black;font-weight: bold;text-align: center;">Hello There</h5>
        <p>We are making a lot of changes to this page so more features will be added soon</p>
        <div>
          <button id="logoutUser" type="button" @click="logoutUser" class="btn btn-danger btn-rounded" style="width: 100%; margin: 0px !important; margin-bottom: 10px !important; margin-top: 10px !important;">Sign Out</button>
        </div>
      </div>
    </div>
  </div>
</template>