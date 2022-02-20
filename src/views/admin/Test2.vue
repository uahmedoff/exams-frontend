<template>
  <div class="mt-5">
    <router-link to="/admin-dashboard/test">Test</router-link>
    <input v-model="store.state.keyWord" />
    {{ store.state.keyWord }}
  </div>
</template>

<script>
import { test2Store } from "@/store/modules/test2";

export default {
  data() {
    return {
      store:test2Store,
    };
  },
};
</script>
