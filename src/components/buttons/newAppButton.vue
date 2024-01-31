<script setup>
import newAppModal from "@/components/modals/newAppModal.vue";

import {ref} from "vue";

let showModal = ref(false);
</script>

<template>
  <v-dialog
      v-model="showModal"
      max-width="600"
  >

    <template v-slot:activator="{ props }">
      <div class="d-inline-flex position-relative p-2 newAppModalButton" @click="showModal = true" v-bind="props">
        <div class="newAppIcon rounded-9 userAppStyle">
          <font-awesome-icon icon="plus" class="newAppIconPlus" aria-hidden="true" />
        </div>
      </div>
    </template>

    <newAppModal @close="showModal = false" />
  </v-dialog>
</template>

<style scoped>

  .newAppIconPlus {
    position: absolute;
    top: 18%;
    left: 25%;
    font-size: 57px;
    font-weight: 100;
  }

  .newAppIcon {
    height: 85px;
    width: 85px;
    border: 1px solid #bdc1c7;
    border-radius: 15px;
    color: #c0c6cf;
    background: #ffffff85;
  }
</style>