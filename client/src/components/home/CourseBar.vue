<template>
<v-toolbar
  color="yellow darken-1"
  extended
  fixed
  app
  style="z-index: 100;"
>
  <v-tabs
    slot="extension"
    color="yellow darken-1"
    class="mt-3"
    centered
    slider-color="indigo"
  >
    <v-tab @click="myCoursesFilter(false)">All Courses</v-tab>
    <v-tab
      v-if="isLoggedIn"
      @click="myCoursesFilter(true)"
    >My Courses</v-tab>
  </v-tabs>
</v-toolbar>
</template>

<script>
export default {
  methods: {
    myCoursesFilter( state ) {
      this.$store.dispatch( 'setMyCoursesFilter', state );
    }
  },
  computed: {
    editing() {
      return this.$store.getters.isEditing;
    },
    isLoggedIn() {
      return this.$store.getters.loggedIn;
    },
  },
};
</script>

<style scoped>
</style>
