<script setup>
import {getCurrentInstance, onMounted} from "vue";
import {storeToRefs} from "pinia";
import {useUserStore} from "@/stores/user";
const { user } = storeToRefs(useUserStore());
const { saveUserDetails } = useUserStore();

const tourSteps = [
  {
    target: '.fullscreenButton',
    content: 'Use this button to enter a theatre mode in Cars and Tv',
  },
  {
    target: '.settingsButton',
    content: 'To personalise your homepage click here to show user settings available'
  },
  {
    target: '.appLink',
    content: 'Touch and hold to re-arrange your apps or remove them'
  },
  {
    target: '.newAppIconPlus',  // We're using document.querySelector() under the hood
    content: `Click here to add more apps, or add your own`
  },
];

const myCallbacks = {
  onFinish: finishTour,
  onSkip: finishTour,
}

function finishTour() {
  user.value.tour = 1;
  saveUserDetails(false).then(() => {})
}


onMounted(() => {
  const app = getCurrentInstance()
  if (user.value.tour < 1) {
    app.appContext.config.globalProperties.$tours['homePageTour'].start();
  }
});
</script>

<template>
  <v-tour name="homePageTour" :steps="tourSteps" :callbacks="myCallbacks"></v-tour>
</template>