<script>
import {RESET_APPID, USER_UPLOAD} from "@/stores/action.type";
import {mapState} from "vuex";
import { useToast } from 'vue-toastification'

export default {
  props: {
    part: String
  },
  computed: {
    ...mapState(['appid', 'apps'])
  },
  mounted() {
    if (this.apps.profileImage === '' || this.apps.profileImage === undefined) {
      this.userImage = '/img/icons/pwa-152x152.png';
    } else {
      this.userImage = this.apps.profileImage;
    }
    this.appID = this.apps.appID;
  },
  data() {
    return {
      userImage: null,
      appID: null
    }
  },
  methods: {
    accountUpgrade() {
      this.$emit('showingsub');
    },
    async logoutUser() {
      this.$store.dispatch(RESET_APPID);
    },
    async imageUploaded() {
      let file = document.querySelector('input[type=file]')['files'][0];
      let reader = new FileReader();
      let app = this;
      reader.onload = function () {
        let base64String = reader.result;
        this.userImage = base64String;
        document.getElementById("userProfileImage").src = base64String;
        app.$store.dispatch(USER_UPLOAD, base64String);
      }
      reader.readAsDataURL(file);
    },
    clickToUpload() {
      const toast = useToast()
      if (this.apps.subscription === '0' || this.apps.subscription === '1' || this.apps.subscription === 'undefined') {
        toast.error("This requires a Gold or Diamond Subscription", {
          timeout: 2000,
          showCancelButton: true,
          confirmButtonText: 'Yes Delete it!',
          cancelButtonText: 'No, Keep it!',
          showCloseButton: true,
          showLoaderOnConfirm: true
        });
      } else {
        this.$refs.uploadButton.click();
      }
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="card" style="border: 0px;">
      <div class="card-body">
        <p>We are making a lot of changes to this page so more features will be added soon</p>
      </div>
    </div>
  </div>

  <div class="header" role="banner">
    <div class="userimgContainer">
      <img id="userProfileImage" :src="apps.profileImage" class="loaded rounded-circle mb-3 profileImage headerProfile userProfileImageSrc" style="width: 150px; height: 150px; border: 3px solid white;" alt="Avatar" />
      <font-awesome-icon :icon="'upload'" :class="'uploadIcon'" @click="clickToUpload"/>
      <input type="file" name="" id="fileId" @change="imageUploaded" ref="uploadButton" style="display: none;">
    </div>
    <h5 class="loaded mb-2 headerProfile" style="margin-top: 10px;"><strong>Welcome to Fossa</strong></h5>
    <div class="card" style="border: 0px">
      <span class="badge badge-primary" v-show="apps.subscription === '3'" style="background: #d2fff7; color: black;">Diamond Supporter</span>
      <span class="badge badge-primary" v-show="apps.subscription === '2'" style="background: #ffee94;color: black;">Gold Supporter</span>
      <span class="badge badge-primary" v-show="apps.subscription === '1'" style="background: #0000ff63;color: black;">Access Supporter</span>
      <button class="btn btn-success btn-rounded mt-3" @click="accountUpgrade" v-show="apps.subscription === '1' || apps.subscription === 'undefined' || apps.subscription === '2' || apps.subscription === '0'">Upgrade Account</button>
      <button id="logoutUser" type="button" @click="logoutUser" class="btn btn-danger btn-rounded mt-3" style="width: 100%; margin-bottom: 10px !important;">Sign Out</button>
    </div>
  </div>
</template>

<style scoped>
.header {
  margin: auto;
  display: block;
  width: fit-content;
  text-align: center;
  color: black;
}

.profileImage {
  width: 150px;
  height: 150px;
  border: 3px solid white;
}

.headerProfile {
  margin-top: 10px;
}

.userimgContainer {
  position: relative;
}

.uploadIcon {
  position: absolute;
  bottom: 4px;
  right: 20px;
  background: #3bcab6;
  font-size: 27px;
  padding: 7px;
  border-radius: 50%;
  color: white;
}
</style>