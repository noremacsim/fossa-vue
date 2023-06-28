<script setup>
import {getCurrentInstance, onMounted} from "vue";
import {storeToRefs} from "pinia";
import {useUserStore} from "@/stores/user";
const { user } = storeToRefs(useUserStore());
const { saveUserDetails } = useUserStore();

const tourSteps = [
  {
    target: '.appId',  // We're using document.querySelector() under the hood
    content: `This is your unique ID. You can import this on any device to load your profile`
  },
  {
    target: '.shareIcon',
    content: 'Quickly share your profile using this button'
  },
  {
    target: '.uploadIcon',
    content: 'Upload your own picture to be used on the AppList Page',
  },
  {
    target: '.profileCustom',
    content: 'Click here to personalise your name and add a bio',
  },
  {
    target: '.customBackground',
    content: 'Click here to Personalise your App List and add a background',
  },
  {
    target: '.lockingApps',
    content: 'Turn this on to lock your App List Layout'
  },
];

const myCallbacks = {
  onFinish: finishTour,
  onSkip: finishTour,
}

function finishTour() {
  user.value.tour = 2;
  saveUserDetails(false).then(() => {})
}


onMounted(() => {
  const app = getCurrentInstance()
  if (user.value.tour < 2) {
    app.appContext.config.globalProperties.$tours['UserProfileTour'].start();
  }
});
</script>

<template>
  <v-tour name="UserProfileTour" :steps="tourSteps" :callbacks="myCallbacks"></v-tour>
</template>