<template>
<v-app light>
  <app-header />
  <transition name="fade">
    <router-view />
  </transition>
  <app-footer />
</v-app>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "App",
  components: {
    appHeader: Header,
    appFooter: Footer
  }
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
