<template>
<v-app light>
  <app-header />
  <v-snackbar v-model="snackbar" :timeout="timeout" :color="snackbarColor" :top="top">
    {{ snackbarMessage }}
    <v-btn dark flat @click="snackbar = false">
      Close
    </v-btn>
  </v-snackbar>
  <fade-transition appear>
    <router-view />
  </fade-transition>
  <app-footer />
</v-app>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import FadeTransition from '@/components/FadeTransition.vue';

export default {
  name: 'App',
  components: {
    appHeader: Header,
    appFooter: Footer,
    FadeTransition: FadeTransition,
  },
  data() {
    return {
      timeout: 3000,
      top: true,
    };
  },
  computed: {
    snackbar: {
      get() {
        return this.$store.getters.snackbar;
      },
      set() {
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
@media only screen and (max-width: 600px) {
  .display-3 {
    font-size: 38px !important;
  }

  .display-2 {
    font-size: 30px !important;
  }

  .display-1 {
    font-size: 24px !important;
  }

  .headline {
    font-size: 18px !important;
    font-weight: 700;
  }

  .title {
    font-size: 16px !important;
    font-weight: 700;
  }

  .subheading {
    font-size: 16px !important;
    font-weight: 300;
  }

  .body-1 {
    font-size: 12px !important;
    font-weight: 400;
  }

  .body-2 {
    font-size: 12px !important;
    font-weight: 700;
  }
}
</style>
