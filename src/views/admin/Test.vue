<template>
  <div class="mt-5">
    <router-link to="/admin-dashboard/test2">Test2</router-link>
    <!-- <input v-model="a.state.keyWord" /> -->
    {{ a.state.keyWord }}
    <input v-model="b.state.keyWord" />
  </div>
</template>

<script>
import { store as testStore } from '@/store/modules/test'
import { test2Store } from '@/store/modules/test2'

export default {
  data() {
    return {
      a:testStore,
      b:test2Store,
    };
  },
  mounted(){
      testStore.methods.getQuestionTypes();
  }
};
</script>
