<script>
import {mapState} from "vuex";
export default {
  props: {
    show: Boolean,
    subid: String,
  },
  computed: {
    ...mapState(["appid", "apps", "subscription"]),
  },
  methods: {
    loginPageShow() {
      this.$emit('loginPage')
    },
  },
  data() {
    return {
      created: false,
      loading: true,
    }
  },
}
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-container">

        <div class="modalHeader">
          <h5 class="modal-title">Join Our Subscription</h5>
        </div>

        <div class="modal-body">
          <div class="card">
            <div class="card-body" style="background: #f2f2f2">
              <p>
                By Signing up you can become a valued supporter of our site and help us keep it up and running.
              </p>
              <p><b>Here's why you should subscribe:</b></p>
              <ul>
                <li><b>Sustain Our Site:</b> Your subscription ensures we can maintain and improve the website for everyone to enjoy.</li>
                <li><b>Enhanced Experience:</b> We'll invest in optimizing user experience and introducing exciting new features.</li>
                <li><b>Keep it Running:</b> You help fund the site for hosting and keep the site up and running.</li>
              </ul>
              <div class="form-group mb-2">
                <button @click="loginPageShow" id="importCode" type="button" class="btn btn-primary btn-full btn-rounded" style="margin-right: 12px; width: 100%">Login / Signup</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>