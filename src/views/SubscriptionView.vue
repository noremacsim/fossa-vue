<script>
import {mapState} from "vuex";
import apiService from "@/common/api.service";
import { loadScript } from "@paypal/paypal-js";
import {useToast} from "vue-toastification";

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

    let style = {
      shape: 'rect',
      color: 'gold',
      layout: 'horizontal',
      label: 'subscribe'
    };
    const delay = ms => new Promise(res => setTimeout(res, ms));
    delay(2000);
    let app = this;
    const toast = useToast()
    if (!this.created) {
      loadScript({
        clientId: "Adl4YeWUq5Etf9kHEPLFyCfes8h3biKNZfedjhIqTIX3A5jmTKV9ZM2EgtcVxzNGjDs7aS04-Qvew47B",
        vault: true,
        intent: 'subscription'
      })
          .then((paypal) => {
            if (app.apps.subscription !== '1') {
              paypal.Buttons({
                style: style,
                createSubscription: function (data, actions) {
                  return actions.subscription.create({
                    plan_id: 'P-9JU57379J2256173EMSFNB7A'
                  });
                },
                onApprove: function (data, actions) {
                  apiService.post(`/user/subscribe?user=${app.appid.appID}&level=1`);
                  app.$emit('close');
                  app.$emit('showHome');
                  toast.success("Subscribed Successfully. Please Refresh Page", {
                    timeout: 2000,
                  });
                }
              }).render("#paypal-button-container-P-9JU57379J2256173EMSFNB7A")
                  .catch((error) => {
                    console.error("failed to render the PayPal Buttons", error);
                  });
            }

            if (app.apps.subscription !== '2') {

              paypal.Buttons({
                style: style,
                createSubscription: function (data, actions) {
                  return actions.subscription.create({
                    plan_id: 'P-1S0500021D1781410MSJQOEQ'
                  });
                },
                onApprove: function (data, actions) {
                  apiService.post(`/user/subscribe?user=${app.appid.appID}&level=2`);
                  app.$emit('close');
                  app.$emit('showHome');
                  toast.success("Subscribed Successfully. Please Refresh Page", {
                    timeout: 2000,
                  });
                }
              }).render("#paypal-button-container-P-1S0500021D1781410MSJQOEQ")
                  .catch((error) => {
                    console.error("failed to render the PayPal Buttons", error);
                  });
            }

            if (app.apps.subscription !== '3') {

              paypal.Buttons({
                style: style,
                createSubscription: function (data, actions) {
                  return actions.subscription.create({
                    plan_id: 'P-0SS45486C4036632MMSJQXXI'
                  });
                },
                onApprove: function (data, actions) {
                  apiService.post(`/user/subscribe?user=${app.appid.appID}&level=3`);
                  app.$emit('close');
                  app.$emit('showHome');
                  toast.success("Subscribed Successfully. Please Refresh Page", {
                    timeout: 2000,
                  });
                }
              }).render("#paypal-button-container-P-0SS45486C4036632MMSJQXXI")
                  .catch((error) => {
                    console.error("failed to render the PayPal Buttons", error);
                  });
            }

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
  <div class="container">
    <div class="card-deck mb-3 text-center">
      <div class="card mb-4 box-shadow" v-show="apps.subscription !== '1'">
        <div class="card-header" style="background:#0000ff63;">
          <h4 class="my-0 font-weight-normal">Access Supporter</h4>
        </div>
        <div class="card-body">
          <h1 class="card-title pricing-card-title">£1</h1>
          <ul class="list-unstyled mt-3 mb-4">
            <li>Get Site Access</li>
            <li>Save and Share across devices</li>
            <li>Premium Support contact</li>
            <li>Enhanced Experience</li>
          </ul>
          <div id="paypal-button-container-P-9JU57379J2256173EMSFNB7A"></div>
        </div>
      </div>
      <div class="card mb-4 box-shadow" v-show="apps.subscription !== '2'">
        <div class="card-header" style="background: #ffee94;">
          <h4 class="my-0 font-weight-normal">Gold Supporter</h4>
        </div>
        <div class="card-body">
          <h1 class="card-title pricing-card-title">£5</h1>
          <ul class="list-unstyled mt-3 mb-4">
            <li>Get Site Access</li>
            <li>Save and Share across devices</li>
            <li>Upload Profile Picture</li>
            <li>Add Your own Custom app and links</li>
            <li>Change Shape, Color and style of App Icons *</li>
            <li>Upload a custom Background *</li>
            <li>Premium Support Contact</li>
            <li>Enhanced Experience</li>
          </ul>
          <div id="paypal-button-container-P-1S0500021D1781410MSJQOEQ"></div>
        </div>
      </div>
      <div class="card mb-4 box-shadow" v-show="apps.subscription !== '3'">
        <div class="card-header" style="background: #d2fff7;">
          <h4 class="my-0 font-weight-normal">Diamond Supporter</h4>
        </div>
        <div class="card-body">
          <h1 class="card-title pricing-card-title">£29</h1>
          <ul class="list-unstyled mt-3 mb-4">
            <li>Everything in Access & Gold</li>
            <li>Mentioned on our Project page as Diamond supporter</li>
            <li>Priority Support and Feature Requests</li>
          </ul>
          <div id="paypal-button-container-P-0SS45486C4036632MMSJQXXI"></div>
        </div>
      </div>
      <span>Items marked with * are coming soon to be release within 14 days</span>
    </div>
  </div>
</template>

<style scoped>

.card {
  max-width: 700px;
  margin: auto;
}

</style>