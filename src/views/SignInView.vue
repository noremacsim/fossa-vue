<template>

  <main>
    <div>
      <button @click='addApp("App 1", "https://app1.com", "app1-image.jpg")'>
        Add App
      </button>
    </div>
  </main>

</template>

<script setup>
import { useUserStore } from "@/stores/user";
// import { storeToRefs } from "pinia";
// const { user } = storeToRefs(useUserStore());
const { signInUser, addApp } = useUserStore();
signInUser();
</script>
