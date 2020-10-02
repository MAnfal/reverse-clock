<template>
  <footer class="footer">
    <div class="container-fluid">
      <div class="copyright text-center">
        &copy; {{ year }} Made with
        <i class="fa fa-heart heart"></i> by
        <a href="https://linktr.ee/manfal" target="_blank">Anfal</a>
      </div>
    </div>
  </footer>
</template>
<script>
  export default {
    computed: {
      year() {
        return new Date().getFullYear();
      }
    }
  }
</script>
<style>

</style>
