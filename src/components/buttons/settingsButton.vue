<template>
  <Teleport to="body">
    <settingsModal :show="showModal" @close="showModal = false" />
  </Teleport>
</template>

<script>
import settingsModal from "@/components/modals/settingsModal.vue";

export default {
  props: {
    className: String,
    showModal: Boolean
  },
  components: {
    settingsModal
  },
}
</script>