<template>
  <div id="app">
    <Header />

    <main-content />

    <Footer />
  </div>
</template>

<script>
import MainContent from './components/main-content.vue';
import Header from './components/header.vue';
import Footer from './components/footer.vue';

export default {
  name: 'App',
  components: {
    MainContent,
    Header,
    Footer
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
