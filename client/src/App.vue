<template>
<v-app light>
  <app-header />
  <v-snackbar v-model="snackbar" timeout="3000" :color="snackbarColor" top="true">
    {{ snackbarMessage }}
    <v-btn dark flat @click="snackbar = false">
      Close
    </v-btn>
  </v-snackbar>
  <transition name="fade">
    <router-view />
  </transition>
  <app-footer />
</v-app>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'App',
  components: {
    appHeader: Header,
    appFooter: Footer,
  },
  computed: {
    snackbar() {
      return this.$store.getters.snackbar;
    },
    snackbarMessage() {
      return this.$store.getters.snackbarMessage;
    },
    snackbarColor() {
      return this.$store.getters.snackbarColor;
    },
  },
};
</script>

<style>
.fade-enter-active {
  transition: opacity 1s;
}

.fade-enter {
  opacity: 0;
}
</style>
