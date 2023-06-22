<template>
  <div class="d-inline-flex position-relative p-2 newAppModalButton" @click="showModal = true">
    <div class="newAppIcon rounded-9 userAppStyle">
      <font-awesome-icon icon="plus" class="newAppIconPlus" aria-hidden="true" />
    </div>
  </div>

  <Teleport to="body">
    <newAppModal :show="showModal" @close="showModal = false" @showUpgradePage="emitShowUpgrade" />
  </Teleport>
</template>

<script>
import newAppModal from "@/components/modals/newAppModal.vue";


export default {
  components: {
    newAppModal
  },
  data() {
    return {
      showModal: false
    }
  },
  methods: {
    emitShowUpgrade() {
      this.$emit('showAppUpgrade');
    }
  }
}
</script>

<style scoped>
  .newAppIconPlus {
    position: absolute;
    top: 21%;
    left: 25%;
    font-size: 66px;
    font-weight: 100;
  }

  .newAppIcon {
    height: 100px;
    width: 100px;
    border: 1px solid #bdc1c7;
    border-radius: 15px;
    color: #c0c6cf;
  }
</style>