<template>
    <footer class="footer bottom-footer">
      <div class="container">
        <span class="text-muted">
            <i class="fas fa-copyright"></i> {{ new Date().getFullYear() }} Made with <i class="fas fa-heart" style="color: #eb4b60;"></i> by <a href="https://linktr.ee/manfal" target="_blank">Anfal</a>
        </span>
      </div>
    </footer>
</template>

<style scoped>
    .bottom-footer {
        position: fixed;
        width: 100%;
        padding: 1%;
        text-align: center;
        bottom: 0;
        left: 0;
        border-top: 1px solid;
        background-color: #ffffff;
    }
</style>