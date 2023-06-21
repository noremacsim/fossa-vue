<script>
import {APPID_REGISTER} from "@/stores/action.type";
import {mapState} from "vuex";

export default {
  props: {
    show: Boolean
  },
  data() {
    return {
      email: '',
      password: '',
      passwordCheck: ''
    }
  },
  computed: {
    ...mapState(['appid', 'apps'])
  },
  methods: {
    signin() {
      this.$emit('signinPage')
    },
    async registerUser() {
      let loginForm = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch(APPID_REGISTER, loginForm)
    },
  }
}
</script>

<template>
  <div class="container">
    <div class="card" style="border: 0px;">
      <div class="card-body">
        <h5 style="color: black;font-weight: bold;text-align: center;">Sign Up</h5>

        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" v-model="email">
          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>

        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="password">
        </div>

        <div>
          <button id="loginUser" type="button" @click="registerUser" class="btn button-primary btn-rounded" style="width: 100%; margin: 0px !important; margin-bottom: 10px !important; margin-top: 10px !important;">Sign Up</button>
          <p>Already have an account? <a href="#" @click="signin">Sign In</a></p>
        </div>
      </div>
    </div>
  </div>
</template>