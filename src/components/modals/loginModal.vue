<script setup>
  import { useUserStore } from "@/stores/user";
  const { signInUser, signInEmailUser } = useUserStore();
  const { loggedIn } = storeToRefs(useUserStore());

  import { defineEmits, ref, toRefs, watch } from 'vue'
  import {storeToRefs} from "pinia";
  const emit = defineEmits(['close'])

  const email = ref('');
  const password = ref('');
  const emailLoading = ref(false);
  const isLoading = ref(false);

  const props = defineProps({
    show: Boolean,
  })

  const { show } = toRefs(props);

  function signInEmail() {
    emailLoading.value = true;
    isLoading.value = true;
    signInEmailUser(email.value, password.value).then(() => {
      emailLoading.value = false;
      isLoading.value = false;
      emit('close');
    }).catch((error) => {
      console.log(error);
      emailLoading.value = false;
      isLoading.value = false;
      if (error) {
        console.log(error)
      } else {
        console.log('Login Failed')
      }
    });
  }

  watch(loggedIn, () => {
    if (loggedIn.value) {
      emit('close');
      console.log('user logged in')
    }
  }, { immediate: true });

</script>

<template>
    <v-dialog
        v-model="show"
        max-width="600"
        class="no-edit-hide"
    >
      <v-card class="no-edit-hide">
        <div class="modal-body no-edit-hide">

          <div class="modalHeader no-edit-hide">
            <h5 class="modalTitle no-edit-hide">Login</h5>
            <button type="button" class="btn-close no-edit-hide" data-mdb-dismiss="modal" aria-label="Close" @click="emit('close')"></button>
          </div>
          <span style="text-align: center;color: grey;font-size: 14px;margin: 0px 10px 5px 10px;"> Sign In Below to create folders, add apps, custom links and personalize your dashboard. Never lose your list again.  </span>
          <v-card-text class="no-edit-hide m-auto">
            <button class="login-with-google-btn" @click="signInUser">
              Sign in with Google
            </button>
            <v-form fast-fail @submit.prevent>
              <v-text-field
                variant="outlined"
                rounded="lg"
                color="rgb(215 139 156 / 69%)"
                v-model="email"
                label="Email"
              ></v-text-field>
              <v-text-field
                variant="outlined"
                rounded="lg"
                color="rgb(215 139 156 / 69%)"
                v-model="password"
                label="Password"
                type="password"
              ></v-text-field>
              <v-btn :loading="emailLoading" flat size="large" rounded="lg" style="color: white;background: rgb(215, 139, 156);" type="submit" block class="mt-2" @click="signInEmail" >Sign In/Up</v-btn>
            </v-form>
          </v-card-text>
        </div>
      </v-card>
    </v-dialog>
</template>

<style>
.login-with-google-btn {
  width: 250px;
  transition: background-color 0.3s, box-shadow 0.3s;
  padding: 10px 16px 12px 42px;
  border: none;
  border-radius: 3px;
  box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 1px 1px rgba(0, 0, 0, 0.25);
  color: #757575;
  font-size: 14px;
  font-weight: 500;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4=);
  background-color: white;
  background-repeat: no-repeat;
  background-position: 12px 11px;
}
.login-with-google-btn:hover {
  box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.25);
}
.login-with-google-btn:active {
  background-color: #eeeeee;
}
.login-with-google-btn:focus {
  outline: none;
  box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.25), 0 0 0 3px #c8dafc;
}
.login-with-google-btn:disabled {
  filter: grayscale(100%);
  background-color: #ebebeb;
  box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 1px 1px rgba(0, 0, 0, 0.25);
  cursor: not-allowed;
}
</style>