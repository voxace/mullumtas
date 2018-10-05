<template>
<v-expansion-panel-content>

  <v-layout slot="header" align-center justify-space-between>
    <h3 class="headline mt-2 mb-0">{{ unit.title }}</h3>
    <h4 class="subheading mt-2 mr-4">7/7</h4>
  </v-layout>

  <v-card>
    <v-divider></v-divider>
    <app-section v-for="i in 3" />
  </v-card>

</v-expansion-panel-content>
</template>

<script>
import Section from '@/components/course/Section.vue';

export default {
  name: 'unit',
  props: ['unit'],
  components: {
    appSection: Section,
  },
};
</script>

<style>
</style>
