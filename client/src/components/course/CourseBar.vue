<template>
<v-toolbar color="yellow darken-1" class="mb-2" fixed app style="z-index: 100;" extended>
  <v-layout align-center justify-center row fill-height slot="extension">
    <h3 class="headline text-cs-center">{{ title }}</h3>
  </v-layout>
</v-toolbar>
</template>

<script>
export default {
  props: ['title'],
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
