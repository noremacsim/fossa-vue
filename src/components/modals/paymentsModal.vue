<script>
import {mapState} from "vuex";
import apiService from "@/common/api.service";
import { loadScript } from "@paypal/paypal-js";

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
  mounted() {
    const delay = ms => new Promise(res => setTimeout(res, ms));
    delay(2000);
    let app = this;
    if (!this.created) {
      loadScript({
        clientId: "Adl4YeWUq5Etf9kHEPLFyCfes8h3biKNZfedjhIqTIX3A5jmTKV9ZM2EgtcVxzNGjDs7aS04-Qvew47B",
        vault: true,
        intent: 'subscription'
      })
          .then((paypal) => {
            paypal
                .Buttons({
                  style: {
                    shape: 'pill',
                    color: 'gold',
                    layout: 'vertical',
                    label: 'subscribe'
                  },
                  createSubscription: function (data, actions) {
                    return actions.subscription.create({
                      /* Creates the subscription */
                      plan_id: 'P-9JU57379J2256173EMSFNB7A'
                    });
                  },
                  onApprove: function (data, actions) {
                    apiService.post(`/user/subscribe?user=${app.subid}`);
                    app.$emit('close');
                    app.show = false;
                  }
                })
                .render("#paypal-button-container-P-9JU57379J2256173EMSFNB7A")
                .catch((error) => {
                  console.error("failed to render the PayPal Buttons", error);
                });
          })
          .catch((error) => {
            console.error("failed to load the PayPal JS SDK script", error);
          });
      this.created = true;
    }
  },
  updated() {
    const delay = ms => new Promise(res => setTimeout(res, ms));
    delay(2000);
    let app = this;
    if (!this.created) {
      loadScript({
        clientId: "Adl4YeWUq5Etf9kHEPLFyCfes8h3biKNZfedjhIqTIX3A5jmTKV9ZM2EgtcVxzNGjDs7aS04-Qvew47B",
        vault: true,
        intent: 'subscription'
      })
          .then((paypal) => {
            paypal
                .Buttons({
                  style: {
                    shape: 'pill',
                    color: 'gold',
                    layout: 'vertical',
                    label: 'subscribe'
                  },
                  createSubscription: function (data, actions) {
                    return actions.subscription.create({
                      /* Creates the subscription */
                      plan_id: 'P-9JU57379J2256173EMSFNB7A'
                    });
                  },
                  onApprove: function (data, actions) {
                    apiService.post(`/user/subscribe?user=${app.subid}`);
                    app.$emit('close');
                    app.show = false;
                  }
                })
                .render("#paypal-button-container-P-9JU57379J2256173EMSFNB7A")
                .catch((error) => {
                  console.error("failed to render the PayPal Buttons", error);
                });
          })
          .catch((error) => {
            console.error("failed to load the PayPal JS SDK script", error);
          });
      this.created = true;
    }
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
          <h5 class="modal-title">Join Our Subscription for £1</h5>
        </div>

        <div class="modal-body">
          <div class="card">
            <div class="card-body" style="background: #f2f2f2">
              <p>
                For just £1, you can become a valued supporter of our site and help us keep it up and running.
              </p>
              <p><b>Here's why you should subscribe:</b></p>
              <ul>
                <li><b>Sustain Our Site:</b> Your subscription ensures we can maintain and improve the website for everyone to enjoy.</li>
                <li><b>Enhanced Experience:</b> We'll invest in optimizing user experience and introducing exciting new features.</li>
                <li><b>Keep it Running:</b> You help fund the site for hosting and keep the site up and running.</li>
              </ul>
              <div class="form-group mb-2">
                <div id="paypal-button-container-P-9JU57379J2256173EMSFNB7A"></div>
                <button @click="loginPageShow" id="importCode" type="button" class="btn btn-primary btn-full btn-rounded" style="margin-right: 12px; width: 100%">Login / Signup</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>