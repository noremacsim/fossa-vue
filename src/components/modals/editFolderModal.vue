<script setup>
import {toRefs} from "vue";
import {useUserStore} from "@/stores/user";
const {removeUserApp} = useUserStore();
import { defineEmits } from 'vue'

const props = defineProps({
  showModal: Boolean,
  appName: String,
  id: String,
});

const emit = defineEmits(['close', 'update:appName'])
const { showModal, appName } = toRefs(props);

function deleteUserApp(id) {
  emit('close');
  removeUserApp(id);
}

</script>
<template>
  <v-dialog
      v-model="showModal"
      max-width="600"
      class="no-edit-hide"
  >
    <v-card class="no-edit-hide">
      <div class="modal-body no-edit-hide">

        <div class="modalHeader no-edit-hide">
          <h5 class="modalTitle no-edit-hide">Edit Folder</h5>
          <button type="button" class="btn-close no-edit-hide" data-mdb-dismiss="modal" aria-label="Close" @click="$emit('close')"></button>
        </div>
        <v-card-text class="no-edit-hide">
          <v-text-field
              label="Folder Name"
              prepend-icon="fas fa-globe"
              variant="underlined"
              v-model="appName"
              @input="$emit('update:appName', $event.target.value)"
              class="no-edit-hide"
          ></v-text-field>
          <v-btn class="no-edit-hide" block color="light-green-lighten-1" rounded="lg" @click="$emit('save')">Save</v-btn>
          <v-btn class="no-edit-hide mt-3" block color="deep-orange-accent-3" rounded="lg" @click="deleteUserApp(id)">Delete</v-btn>
        </v-card-text>
      </div>
    </v-card>
  </v-dialog>
</template>