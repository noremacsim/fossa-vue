<script setup>
import HomeFooter from "@/components/HomeFooter.vue";
import {storeToRefs} from "pinia";
import {useUserStore} from "@/stores/user";
const { user } = storeToRefs(useUserStore());
const { addUserApp, checkIfUserSetup, importUserFromAppID } = useUserStore();
import { ref, watch } from 'vue'
import HomeView from "@/views/HomeView.vue";
let background = ref('');
const showUserApps = ref(false);
const code = ref('');

watch(user, async () => {
  if (user.value?.backgroundImage) {
    background.value = `url(${user.value.backgroundImage})`;
  } else {
    background.value = ''
  }

  if (user.value.length === 0 && showUserApps.value === true) {
    showUserApps.value = false;
  }

})

function bookMarkTab() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    // since only one tab should be active and in the current window at once
    // the return variable should only have one entry
    let activeTab = tabs[0];

    const appdata = {
      url: activeTab.url ?? '',
      name: activeTab.title ?? null,
      image: activeTab.favIconUrl ?? null
    }

    addUserApp(appdata);
  });
}

checkIfUserSetup().then(data => {
  if (data === false) {
    console.log('User is not setup let show the import screen');
  } else {
    showUserApps.value = true;
  }
})

function importCode() {
  importUserFromAppID(code.value).then(data => {
    if (data) {
      showUserApps.value = true;
    }
  })
}

function getFossaID() {
  chrome.tabs.create({ url: 'https://fossa-app.site?chrome=true' });
}

function editPage() {
  let link = 'https://fossa-app.site?code=' + user.value.uniqueID;
  chrome.tabs.create({ url: link });
}

</script>

<template>
  <body>
  <!-- PAGE HEADER -->
  <header v-show="showUserApps">

    <div class="topNav" role="navigation" >

      <v-container>
        <v-row justify="center" align="center">
          <v-col cols="6">
            <v-btn block size="x-large" @click="bookMarkTab" append-icon="fas fa-bookmark">
              <template v-slot:append>
                <v-icon color="success"></v-icon>
              </template>
              Bookmark Page
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn block size="x-large" @click="editPage" append-icon="fas fa-user">
              <template v-slot:append>
                <v-icon color="primary"></v-icon>
              </template>
              Profile
            </v-btn>
          </v-col>
        </v-row>
      </v-container>

    </div>

  </header>

  <HomeView v-if="showUserApps"></HomeView>
  <HomeFooter v-if="showUserApps" @logout="showUserApps=false;"></HomeFooter>

  <div class="card" v-if="!showUserApps">
    <div class="card-body" style="background: #f2f2f2">
      <h5 style="color: black;font-weight: bold;text-align: center;">Your Fossa ID</h5>

      <div class="form-group mb-2">

        <div class="ui-textinput ui-corner-all ui-shadow-inset ui-textinput-text ui-body-inherit">
          <div class="ui-textinput ui-corner-all ui-shadow-inset ui-textinput-text ui-body-inherit currentAppIdCode">
            <div class="ui-textinput ui-corner-all ui-shadow-inset ui-textinput-text ui-body-inherit">
              <input  v-model="code" type="text" class="form-control rounded appId" placeholder="Fossa Code" aria-label="Code" id="appid" name="appId" style="width: 210px;margin: auto;text-align: center;background: transparent;background: white;border: none;font-size: 22px;font-weight: bold;border-radius: 25px !important;letter-spacing: 3px;color: black;box-shadow: 0 4px 9px -4px #54b4d3;margin-top: 16px;">
            </div>
          </div>
        </div>
        <div style="display: flex;flex-wrap: wrap;align-items: center;justify-content: center;padding-top:15px">
          <v-btn block @click="importCode" size="x-large" id="importCode" type="button" class="btn btn-primary btn-rounded" style="background:#0d6efd;color:white;margin-bottom:10px;">Save & import</v-btn>
        </div>
      </div>
      <span style="margin-top: 10px">Please Import your fossa ID to sync your app lists. If you don't have one yet click the button below to get one</span>
      <v-btn block style="background:#6ac56a;" @click="getFossaID">Get A Fossa ID</v-btn>
    </div>
  </div>


  </body>
</template>
<script>
export default {
  data() {
    return {
      page: 'home',
    }
  },
}
</script>
<style scoped>

body {
  background-image: v-bind('background');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

header {
  line-height: 1.5;
  max-height: 100vh;
  width: 100%;
  height: 80px;
}

</style>
