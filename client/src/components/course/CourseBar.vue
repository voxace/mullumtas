<template>
<v-toolbar color="yellow darken-1" class="mb-2" fixed app style="z-index: 100;" extended>
  <v-toolbar-side-icon v-if="editing && isLoggedIn && isAdmin" slot="extension" @click="toggleStudentsDrawer">
    <v-icon>group_add</v-icon>
  </v-toolbar-side-icon>
  <v-layout align-center justify-center row fill-height slot="extension">
    <h3 v-if="!loading" class="headline text-cs-center"><span class="hidden-sm-and-down">Year {{ grade }} - </span>{{ title }}</h3>
  </v-layout>
</v-toolbar>
</template>

<script>
export default {
  props: ['title', 'grade', 'loading'],
  computed: {
    editing() {
      return this.$store.getters.isEditing;
    },
    isLoggedIn() {
      return this.$store.getters.loggedIn;
    },
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
  },
  methods: {
    toggleStudentsDrawer() {
      this.$store.dispatch('toggleStudentsDrawer');
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
