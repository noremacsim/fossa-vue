<script setup>
import {getCurrentInstance, onMounted} from "vue";
import {storeToRefs} from "pinia";
import {useUserStore} from "@/stores/user";
const { user, loggedIn } = storeToRefs(useUserStore());
const { syncUserToFireBase } = useUserStore();

const tourSteps = [
  {
    target: '.appLink',
    content: 'Touch and hold on a tile to re-arrange your apps or edit them'
  },
  {
    target: '.newAppIconPlus',
    content: `Click here to add more apps, or add your own`
  },
  {
    target: '.fullscreenButton',
    content: 'Use this button to enter a theatre mode in Cars and Tv',
  },
  {
    target: '.settingsButton',
    content: 'To personalise your homepage click here to show user settings available'
  },
];

const myCallbacks = {
  onFinish: finishTour,
  onSkip: finishTour,
}

function finishTour() {
  user.value.homeTour = true;
  syncUserToFireBase();
}


onMounted(() => {
  const app = getCurrentInstance()
  if (loggedIn.value && !user.value?.homeTour) {
    app.appContext.config.globalProperties.$tours['homePageTour'].start();
  }
});
</script>

<template>
  <v-tour name="homePageTour" :steps="tourSteps" :callbacks="myCallbacks"></v-tour>
</template>