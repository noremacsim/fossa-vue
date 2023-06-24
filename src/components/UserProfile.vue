<script>
import {FETCH_APPS, GET_APPID, RESET_APPID, USER_UPLOAD} from "@/stores/action.type";
import {mapState} from "vuex";
import { useToast } from 'vue-toastification'
import cookieService from "@/common/cookie.service";

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
      appID: null,
      showImport: false,
      code: ''
    }
  },
  methods: {
    async importCode() {
      localStorage.setItem("appId", this.code);
      cookieService.setCookie('appId', this.code, 365).then(() => {
        this.$store.dispatch(GET_APPID)
        this.$store.dispatch(FETCH_APPS);
        const toast = useToast();
        toast.success("Imported Successfully", {
          timeout: 2000
        });
        const delay = ms => new Promise(res => setTimeout(res, ms));
        delay(2000);
        location.reload();
      });
    },
    accountUpgrade() {
      this.$emit('showingsub');
    },
    async logoutUser() {
      this.$emit('setpart');
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
      if (this.apps.subscription === '0' || this.apps.subscription === 'undefined') {
        toast.error("Subscribe to get access to this feature", {
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

<template v-show="part === 'profile'">
  <p style="text-align: center">We are making a lot of changes to this page so more features will be added soon</p>
  <div class="header" role="banner">
    <div class="userimgContainer">
      <img id="userProfileImage" :src="apps.profileImage" class="loaded rounded-circle mb-3 profileImage headerProfile userProfileImageSrc" style="width: 150px; height: 150px; border: 3px solid white;" alt="Avatar" />
      <font-awesome-icon :icon="'upload'" :class="'uploadIcon'" @click="clickToUpload"/>
      <input type="file" name="" id="fileId" @change="imageUploaded" ref="uploadButton" style="display: none;">
    </div>
<!--    <h5 class="loaded mb-2 headerProfile" style="margin-top: 10px;"><strong>Welcome to Fossa</strong></h5>-->
    <div class="card" style="border: 0px">
      <span class="badge badge-primary mb-3 mt-3" v-show="apps.subscription === '3'" style="background: #d2fff7; color: black;">Diamond Supporter</span>
      <span class="badge badge-primary mb-3 mt-3" v-show="apps.subscription === '2'" style="background: #ffee94;color: black;">Gold Supporter</span>
      <span class="badge badge-primary mb-3 mt-3" v-show="apps.subscription === '1'" style="background: #0000ff63;color: black;">Access Supporter</span>
      <button class="btn btn-success btn-rounded mt-3 mb-3" @click="accountUpgrade" v-show="apps.subscription === '0'">Subscribe Now</button>
    </div>
  </div>
  <div class="card">
    <div class="card-body" style="background: #f2f2f2">
      <h5 style="color: black;font-weight: bold;text-align: center;">Your Fossa ID</h5>

      <div class="form-group mb-2">

        <div class="ui-textinput ui-corner-all ui-shadow-inset ui-textinput-text ui-body-inherit">
          <div class="ui-textinput ui-corner-all ui-shadow-inset ui-textinput-text ui-body-inherit currentAppIdCode">
            <div class="ui-textinput ui-corner-all ui-shadow-inset ui-textinput-text ui-body-inherit">
              <input v-show="!showImport" :value="appid.appID" type="text" class="form-control rounded appId" placeholder="Code" aria-label="Code" id="appid" name="appId" style="width: 210px;margin: auto;text-align: center;background: transparent;background: #54b4d3;border: none;font-size: 22px;font-weight: bold;border-radius: 25px !important;letter-spacing: 3px;color: white;box-shadow: 0 4px 9px -4px #54b4d3;margin-top: 16px;" readonly=""></div>
            <input v-show="showImport" v-model="code" type="text" class="form-control rounded appId" placeholder="Fossa Code" aria-label="Code" id="appid" name="appId" style="width: 210px;margin: auto;text-align: center;background: transparent;background: white;border: none;font-size: 22px;font-weight: bold;border-radius: 25px !important;letter-spacing: 3px;color: black;box-shadow: 0 4px 9px -4px #54b4d3;margin-top: 16px;">
          </div>
        </div>
      </div>

      <div style="display: flex;flex-wrap: wrap;align-items: center;justify-content: center;padding-top:15px">
        <button @click="showImport = true" v-show="!showImport" id="importCode" type="button" class="btn btn-primary btn-rounded" style="margin-right: 12px;">import</button>
        <button @click="showImport = false" id="cancelImport" type="button" v-show="showImport" class="btn btn-warning btn-rounded" style="margin-right: 12px; display: none;">cancel</button>
        <button @click="importCode" v-show="showImport" id="importCode" type="button" class="btn btn-primary btn-rounded" style="margin-right: 12px;">Save</button>
        <button id="shareCode" type="button" @click="logoutUser" v-show="!showImport" class="btn btn-danger btn-rounded">Logout</button>

      </div>
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