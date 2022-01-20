<template>
  <div class="home">
      Welcome to Exams app!
      {{ isAdmin }}
  </div>
</template>

<script>
import { mapState,mapGetters } from 'vuex'
export default {
  name: "Home",
  data(){
    return {
      base_url: process.env.VUE_APP_BASE_URL
    }
  },
  computed:{
    ...mapGetters('auth',['currentUser','isAdmin'])
  },
};
</script>
