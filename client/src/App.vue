<template>
<v-app light>
  <app-header />
  <v-snackbar v-model="snackbar" :timeout="timeout" :color="snackbarColor" :top="top">
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
  data() {
    return {
      timeout: 3000,
      top: true,
    };
  },
  computed: {
    snackbar: {
      get: function() {
        return this.$store.getters.snackbar;
      },
      set: function() {
        this.$store.commit('closeSnackBar');
      },
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
