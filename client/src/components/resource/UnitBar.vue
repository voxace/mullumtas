<template>
<v-toolbar color="yellow darken-1" class="mb-2" fixed app style="z-index: 100;" :height="height">
  <v-toolbar-side-icon :slot="extension" @click="toggleDrawer"></v-toolbar-side-icon>
  <v-layout align-center justify-center row fill-height :slot="extension">
    <router-link v-if="link" :to="'/course/' + title">
      <v-btn icon flat>
        <v-icon color="black">chevron_left</v-icon>
      </v-btn>
    </router-link>
    <h3 class="title text-cs-center">{{ title }}</h3>
    <h3 v-if="unit.length > 0" class="title text-cs-center ml-2"> - {{ unit }}</h3>

  </v-layout>
  <v-btn flat icon :slot="extension" @click="toggleFullScreen">
    <v-icon v-if="isFullScreen">fullscreen_exit</v-icon>
    <v-icon v-else>fullscreen</v-icon>
  </v-btn>
</v-toolbar>
</template>

<script>
export default {
  props: ['title', 'link', 'unit'],
  methods: {
    toggleDrawer() {
      this.$store.dispatch('toggleDrawer');
    },
    toggleFullScreen() {
      this.$store.dispatch('toggleFullScreen');
    },
  },
  computed: {
    isFullScreen() {
      return this.$store.getters.isFullScreen;
    },
    extension() {
      if (this.isFullScreen) {
        return 'default';
      } else {
        return 'extension';
      }
    },
    height() {
      if (this.isFullScreen) {
        return 36;
      } else {
        return 64;
      }
    },
  },
};
</script>

<style scoped>
a,
a:link,
a:active,
a:hover {
  text-decoration: none;
  color: black;
}
</style>
