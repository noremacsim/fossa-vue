<template>
  <font-awesome-icon icon="cog" class="floatButton settingsButton" @click="showModal = true" />
  <Teleport to="body">
    <settingsModal :show="showModal" @close="showModal = false" />
  </Teleport>
</template>

<script>
import settingsModal from "@/components/modals/settingsModal.vue";

export default {
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