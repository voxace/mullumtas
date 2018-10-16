<template>
<v-footer light height="45" color="yellow darken-1" app fixed v-if="!isFullScreen">
  <v-layout row align-center>
    <v-flex xs12 align-content-center justify-center>
      <p class="body-1 my-0 text-xs-center">
        &copy; 2018 Mullumbimby High School
      </p>
    </v-flex>
  </v-layout>
</v-footer>
</template>

<script>
export default {
  computed: {
    isFullScreen() {
      return this.$store.getters.isFullScreen;
    },
  },
};
</script>

<style scoped>
footer {
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
}
</style>
