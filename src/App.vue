<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted(){
      this.$store.dispatch('auth/getCurrentUser');
      document.title = "Cambridge Exams App";
  }
}
</script>

<style>
#app{
  width:100%;
}
</style>
