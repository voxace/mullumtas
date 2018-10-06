<template>
<v-list-tile @click="">

  <v-list-tile-avatar size="28">
    <v-icon size="22" :class="[colors]">{{ icon }}</v-icon>
  </v-list-tile-avatar>

  <v-list-tile-content>
    {{ resource.title }}
  </v-list-tile-content>

  <v-list-tile-action>
    <v-checkbox></v-checkbox>
  </v-list-tile-action>

</v-list-tile>
</template>

<script>
export default {
  name: 'resource',
  props: ['resource'],
  data() {
    return {
      resource: {},
    };
  },
  computed: {
    icon() {
      if (this.resource.type == 'doc') {
        return 'mdi-file-document-box';
      }
      if (this.resource.type == 'slide') {
        return 'mdi-file-presentation-box';
      }
      if (this.resource.type == 'quiz') {
        return 'mdi-file-question';
      }
      if (this.resource.type == 'url') {
        return 'mdi-link';
      }
    },
    colors() {
      if (this.resource.type == 'doc') {
        return ['blue', 'white--text'];
      }
      if (this.resource.type == 'slide') {
        return ['orange', 'lighten-1', 'white--text'];
      }
      if (this.resource.type == 'quiz') {
        return ['blue', 'darken-2', 'white--text'];
      }
      if (this.resource.type == 'url') {
        return ['green', 'white--text'];
      }
    },
  },
};
</script>

<style>
</style>
