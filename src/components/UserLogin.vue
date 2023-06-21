<script>
import {APPID_LOGIN} from "@/stores/action.type";
import {mapState} from "vuex";

export default {
  props: {
    part: String
  },
  data() {
    return {
      email: '',
      password: '',
    }
  },
  computed: {
    ...mapState(['appid', 'apps'])
  },
  methods: {
    signup() {
      this.$emit('signupPage')
    },
    async loginUser() {
      let loginForm = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch(APPID_LOGIN, loginForm)
    },
  }
}
</script>

<template>
  <div class="container">
    <div class="card" style="border: 0px;">
      <div class="card-body">
        <h5 style="color: black;font-weight: bold;text-align: center;">Sign In</h5>

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
          <button id="loginUser" type="button" @click="loginUser" class="btn button-primary btn-rounded" style="width: 100%; margin: 0px !important; margin-bottom: 10px !important; margin-top: 10px !important;">Sign In</button>
          <p>Don't have an account? <a href="#" @click="signup">Sign Up</a></p>
        </div>
      </div>
    </div>
  </div>
</template>