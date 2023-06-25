<script setup>
  import { useUserStore } from "@/stores/user";
  import { storeToRefs } from "pinia";
  const { user } = storeToRefs(useUserStore());
  const { importUserFromAppID, logoutUser} = useUserStore();
  import {defineEmits, ref} from 'vue'
  const emit = defineEmits(['close'])

  defineProps({
    show: Boolean,
  })

  const showImport = ref(false);
  const showLogin = ref(false);
  const code = ref('');

  function importCode() {
    if( importUserFromAppID(code.value) ) {
      showImport.value = false;
    }
  }
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-container">

        <div class="modalHeader">
          <h5 class="modal-title">Settings</h5>
          <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close" @click="emit('close')"></button>
        </div>

        <div class="modal-body">
          <div class="card" v-show="!showLogin">
            <div class="card-body" style="background: #f2f2f2">
              <h5 style="color: black;font-weight: bold;text-align: center;">Your Fossa ID</h5>

              <div class="form-group mb-2">

                <div class="ui-textinput ui-corner-all ui-shadow-inset ui-textinput-text ui-body-inherit">
                  <div class="ui-textinput ui-corner-all ui-shadow-inset ui-textinput-text ui-body-inherit currentAppIdCode">
                    <div class="ui-textinput ui-corner-all ui-shadow-inset ui-textinput-text ui-body-inherit">
                      <input v-show="!showImport" :value="user.uniqueID" type="text" class="form-control rounded appId" placeholder="Code" aria-label="Code" id="appid" name="appId" style="width: 210px;margin: auto;text-align: center;background: transparent;background: #54b4d3;border: none;font-size: 22px;font-weight: bold;border-radius: 25px !important;letter-spacing: 3px;color: white;box-shadow: 0 4px 9px -4px #54b4d3;margin-top: 16px;" readonly=""></div>
                      <input v-show="showImport" v-model="code" type="text" class="form-control rounded appId" placeholder="Fossa Code" aria-label="Code" id="appid" name="appId" style="width: 210px;margin: auto;text-align: center;background: transparent;background: white;border: none;font-size: 22px;font-weight: bold;border-radius: 25px !important;letter-spacing: 3px;color: black;box-shadow: 0 4px 9px -4px #54b4d3;margin-top: 16px;">
                  </div>
                </div>
              </div>

              <div style="display: flex;flex-wrap: wrap;align-items: center;justify-content: center;padding-top:15px">
                <button @click="showImport = true" v-show="!showImport" id="importCode" type="button" class="btn btn-primary btn-rounded" style="margin-right: 12px;">import</button>
                <button @click="showImport = false" id="cancelImport" type="button" v-show="showImport" class="btn btn-warning btn-rounded" style="margin-right: 12px; display: none;">cancel</button>
                <button @click="importCode" v-show="showImport" id="importCode" type="button" class="btn btn-primary btn-rounded" style="margin-right: 12px;">Save</button>
                <button id="LoginCode" type="button" @click="logoutUser" v-show="!showImport" class="btn btn-danger btn-rounded">New Code</button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>