<template>
  <font-awesome-icon icon="user" :class="className" @click="showModal = true" />
  <Teleport to="body">
    <settingsModal :show="showModal" @close="showModal = false" />
  </Teleport>
</template>

<script>
import settingsModal from "@/components/modals/settingsModal.vue";

export default {
  props: {
    className: String
  },
  components: {
    settingsModal
  },
  data() {
    return {
      showModal: false
    }
  },
}
</script>