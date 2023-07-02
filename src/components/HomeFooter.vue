<template>
  <footer class="footer">
    <a href="https://www.paypal.com/donate/?hosted_button_id=RAFQ4WLY2NX62" style="margin-left: 10px;color: black;">Donate</a>
    <a href="#logout" @click="logout" style="margin-left: 10px;color: black;">Logout</a>
  </footer>
</template>

<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  display: block;
  width: 100%;
  margin-bottom: 5px;
}

a {
  text-decoration: none;
}
</style>

<script>
export default {
  methods: {
    logout() {
      this.$emit('logout')
    },
  },
}
</script>