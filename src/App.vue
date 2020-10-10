<template>
  <Header />
  <main-content />
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