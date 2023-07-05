<script setup>
import {toRefs} from "vue";
import {useUserStore} from "@/stores/user";
const {removeUserApp} = useUserStore();
import { defineEmits } from 'vue'

const props = defineProps({
  showModal: Boolean,
  appName: String,
  appUrl: String,
  appImage: String,
  id: String,
});

const emit = defineEmits(['close', 'update:appName', 'update:appImage'])
const { showModal, appName, appImage } = toRefs(props);

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
          <h5 class="modalTitle no-edit-hide">Edit Bookmark</h5>
          <button type="button" class="btn-close no-edit-hide" data-mdb-dismiss="modal" aria-label="Close" @click="$emit('close')"></button>
        </div>
        <v-card-text class="no-edit-hide">
          <v-text-field
              label="Website Name"
              prepend-icon="fas fa-globe"
              variant="underlined"
              v-model="appName"
              @input="$emit('update:appName', $event.target.value)"
              hint="Google"
              class="no-edit-hide"
          ></v-text-field>
          <v-text-field
              label="Custom Image URL (Optional)"
              prepend-icon="fas fa-image"
              variant="underlined"
              v-model="appImage"
              @input="$emit('update:appImage', $event.target.value)"
              class="no-edit-hide"
          ></v-text-field>
          <img :src="appImage" style="display: block;margin: auto;height: 85px;width:85px;" class="mb-3"/>
          <v-btn class="no-edit-hide" block color="light-green-lighten-1" rounded="lg" @click="$emit('save')">Save</v-btn>
          <v-btn class="no-edit-hide mt-3" block color="deep-orange-accent-3" rounded="lg" @click="deleteUserApp(id)">Delete</v-btn>
        </v-card-text>
      </div>
    </v-card>
  </v-dialog>
</template>