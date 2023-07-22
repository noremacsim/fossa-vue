<script setup>
import apiService from "@/common/api.service";
import { loadScript } from "@paypal/paypal-js";
import {useToast} from "vue-toastification";
import {defineEmits, onMounted, ref} from "vue";
import {storeToRefs} from "pinia";
import {useUserStore} from "@/stores/user";
const { user } = storeToRefs(useUserStore());

const emit = defineEmits(['showHome', 'showSettings'])


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
                emit('showHome');
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
</script>


<template>
  <div class="container">
    <div class="card-deck mb-3 text-center">
      <div class="card mb-4 box-shadow" v-show="user.subscription !== '1'">
        <div class="card-header" style="background:#0000ff63;">
          <h4 class="my-0 font-weight-normal">Support This Site</h4>
        </div>
        <div class="card-body">
          <h1 class="card-title pricing-card-title">Only £1</h1>
          <ul class="list-unstyled mt-3 mb-4" style="text-align: initial;">
            <li><b>Sustain Our Site:</b> Your subscription ensures we can maintain and improve the website for everyone to enjoy.</li>
            <li><b>Enhanced Experience:</b> We'll invest in optimizing user experience and introducing exciting new features.</li>
            <li><b>Keep it Running:</b> You help fund the site for hosting and keep the site up and running.</li>
          </ul>
          <div id="paypal-button-container-P-9JU57379J2256173EMSFNB7A"></div>
          <p>*If Paypal doesn't load please subscribe from a mobile or pc then import your account*</p>

        </div>
      </div>
      <div class="card mb-4 box-shadow">
        <div class="card-header" style="background: rgb(148 255 156);cursor: pointer;" @click="emit('showSettings')">
          <h4 class="my-0 font-weight-normal" >Import Fossa Code</h4>
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