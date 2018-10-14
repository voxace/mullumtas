<template>
<v-flex xs12 sm6 md4 align-center justify-center>
  <v-card hover :to="'/course/' + course.short">
    <v-card-title primary-title class="align-center justify-center grey lighten-2">
      <h1 class="display-3">Year {{ course.grade }}</h1>
    </v-card-title>
    <v-card-text class="text-xs-center">
      <h3 class="headline my-3">{{ course.title }}</h3>
      <v-card-actions class="align-center justify-center">
        <v-btn flat color="indigo">Access Course</v-btn>
        <v-tooltip v-if="course.protected">
          <v-icon slot="activator">lock</v-icon>
          Restricted to enrolled students only
        </v-tooltip>
        <fade-transition>
          <v-btn to="/" exact active-class="" v-if="editing && isLoggedIn" flat color="error" @click="editCourse">Edit</v-btn>
        </fade-transition>
      </v-card-actions>
    </v-card-text>
  </v-card>
</v-flex>
</template>

<script>
import FadeTransition from '@/components/FadeTransition.vue';

export default {
  props: ['course'],
  components: {
    fadeTransition: FadeTransition,
  },
  computed: {
    editing() {
      return this.$store.getters.isEditing;
    },
    isLoggedIn() {
      return this.$store.getters.loggedIn;
    },
  },
  methods: {
    editCourse() {
      this.$emit('edit', this.course);
      this.$emit('edit2');
    },
  },
};
</script>

<style scoped>
</style>
