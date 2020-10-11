<template>
  <nav class="navbar navbar-light bg-light navbar-expand-lg">
    <a class="navbar-brand" href="#">
        <img src="../assets/logo.png" width="30" height="30" class="d-inline-block align-top" :alt="name">
        {{ tagLine }}
    </a>
    
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav">
            <li class="nav-item active">
                <a class="nav-link" href="https://trello.com/b/xH3tB0IW/reverese-clock" target="_blank">Roadmap <span class="sr-only">(current)</span></a>
            </li>
        </ul>
    </div>
  </nav>
</template>

<script>
import SiteSettings from '../sitesettings';

export default {
    computed: {
        name() {
            return SiteSettings.name;
        },

        tagLine() {
            return SiteSettings.tagLine;
        }
    }
}
</script>