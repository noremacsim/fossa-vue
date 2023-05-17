<template>
  <font-awesome-icon :icon="icon" :class="className" />
</template>

<script>
export default {
  props: {
    icon: String,
    className: String
  },
  methods: {
    onClick() {
      this.$emit('btn-click')
    },
  },
}
</script>