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
  @import './styles/main.css';
</style>
