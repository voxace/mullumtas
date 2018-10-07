<template>
<v-toolbar color="yellow darken-1" class="mb-2" absolute style="z-index: 500;" extended>
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
</style>
