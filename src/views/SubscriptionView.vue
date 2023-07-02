<script setup>
import apiService from "@/common/api.service";
import { loadScript } from "@paypal/paypal-js";
import {useToast} from "vue-toastification";
import {onMounted, ref} from "vue";
import {storeToRefs} from "pinia";
import {useUserStore} from "@/stores/user";
import router from "@/router";
const { user } = storeToRefs(useUserStore());

const created = ref(false);

onMounted(() => {
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
  if (!created.value) {
    loadScript({
      clientId: "Adl4YeWUq5Etf9kHEPLFyCfes8h3biKNZfedjhIqTIX3A5jmTKV9ZM2EgtcVxzNGjDs7aS04-Qvew47B",
      vault: true,
      intent: 'subscription'
    })
        .then((paypal) => {
          if (user.subscription !== '1') {
            paypal.Buttons({
              style: style,
              createSubscription: function (data, actions) {
                return actions.subscription.create({
                  plan_id: 'P-9JU57379J2256173EMSFNB7A'
                });
              },
              onApprove: function (data, actions) {
                apiService.post(`/user/subscribe?user=${user.uniqueID}&level=1`);
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

        })
        .catch((error) => {
          console.error("failed to load the PayPal JS SDK script", error);
        });
    created.value = true;
  }

});

function noSubContinue() {
  router.push('/');
}

</script>


<template>
  <div class="container">
    <div class="card-deck mb-3 text-center">
      <div class="card mb-4 box-shadow" v-show="user.subscription !== '1'">
        <div class="card-header" style="background:#0000ff63;">
          <h4 class="my-0 font-weight-normal">Supporter</h4>
        </div>
        <div class="card-body">
          <h1 class="card-title pricing-card-title">£1</h1>
          <ul class="list-unstyled mt-3 mb-4">
            <li>Get Site Access</li>
            <li>Save and Share across devices</li>
            <li>Upload Profile Picture</li>
            <li>Add Custom Apps</li>
            <li>Add folders and categories</li>
            <li>Add custom Background</li>
            <li>Premium Support contact</li>
            <li>Enhanced Experience</li>
          </ul>
          <div id="paypal-button-container-P-9JU57379J2256173EMSFNB7A"></div>
        </div>
      </div>
      <div class="card mb-4 box-shadow">
        <div class="card-header" style="background: #ffee94;cursor: pointer;" @click="noSubContinue">
          <h4 class="my-0 font-weight-normal" >Continue Without Subscription</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.card {
  max-width: 700px;
  margin: auto;
}

</style>