<script>
import {GET_APPID, FETCH_APPS, APPID_LOGIN, APPID_REGISTER, RESET_APPID} from "@/stores/action.type";
import cookieService from "@/common/cookie.service";
import { useToast } from "vue-toastification";
import {mapState} from "vuex";

export default {
  props: {
    show: Boolean
  },
  data() {
    return {
      showImport: false,
      showLogin: false,
      code: '',
      email: '',
      password: '',
      registered: false,
      showRegister: false,
    }
  },
  computed: {
    ...mapState(['appid', 'apps'])
  },
  updated() {
    this.registered = this.apps?.registered;
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
    async loginUser() {
      let loginForm = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch(APPID_LOGIN, loginForm)
    },
    async registerUser() {
      let loginForm = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch(APPID_REGISTER, loginForm)
    },
    async logoutUser() {
      this.$store.dispatch(RESET_APPID);
    }
  }
}
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-container">

        <div class="modalHeader">
          <h5 class="modal-title">Settings</h5>
          <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close" @click="$emit('close')"></button>
        </div>

        <div class="modal-body">
          <div class="card" v-show="!showLogin">
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
<!--                <button id="shareCode" type="button" v-show="!showImport" class="btn btn-success btn-rounded">Share</button>-->
                <button id="LoginCode" type="button" @click="showLogin = true; showRegister = false" v-show="registered === '0' && !showImport" class="btn btn-success btn-rounded" style="margin-right: 12px;">Login</button>
                <button id="LoginCode" type="button" @click="showLogin = true; showRegister = true" v-show="registered === '0' && !showImport" class="btn btn-success btn-rounded">Register</button>
                <button id="LoginCode" type="button" @click="logoutUser" v-show="registered === '1'" class="btn btn-danger btn-rounded">Logout</button>

              </div>
            </div>
          </div>

          <div class="card" v-show="showLogin">
            <div class="card-body" style="background: #f2f2f2">
              <h5 style="color: black;font-weight: bold;text-align: center;" v-show="!showRegister">Login</h5>
              <h5 style="color: black;font-weight: bold;text-align: center;" v-show="showRegister">Register</h5>

              <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" v-model="email">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>

              <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="password">
              </div>

              <div style="display: flex;flex-wrap: wrap;align-items: center;justify-content: center;padding-top:15px">
                <button id="loginUserCancel" type="button" @click="showLogin = false" class="btn btn-danger btn-rounded" style="margin-right: 12px;">Cancel</button>
                <button id="loginUser" type="button" @click="loginUser" class="btn btn-success btn-rounded" v-show="!showRegister">Login</button>
                <button id="loginUser" type="button" @click="registerUser" class="btn btn-success btn-rounded" v-show="showRegister">Register</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>