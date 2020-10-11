<template>
  <div id="app">
    <Header />
    <main-content />
  </div>
</template>

<script>
import MainContent from './components/main-content.vue';
import Header from './components/header.vue';

export default {
  name: 'App',
  components: {
    MainContent,
    Header,
  }
}
</script>

<style>
#app {
  font-family: Helvetica, Georgia, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
