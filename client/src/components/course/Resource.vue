<template>
<v-list-tile @click="">

  <v-list-tile-avatar :size="avatarSize">
    <v-icon :size="iconSize" :class="[colors]">{{ icon }}</v-icon>
  </v-list-tile-avatar>

  <v-list-tile-content>
    <span class="body-1">{{ resource.title }}</span>
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
  computed: {
    icon() {
      if (this.resource.type == 'doc') {
        return 'mdi-file-document-box';
      } else if (this.resource.type == 'slide') {
        return 'mdi-file-presentation-box';
      } else if (this.resource.type == 'quiz') {
        return 'mdi-file-question';
      } else if (this.resource.type == 'url') {
        return 'mdi-link';
      } else {
        return 'mdi-file-document-box';
      }
    },
    colors() {
      if (this.resource.type == 'doc') {
        return ['blue', 'white--text'];
      } else if (this.resource.type == 'slide') {
        return ['orange', 'lighten-1', 'white--text'];
      } else if (this.resource.type == 'quiz') {
        return ['blue', 'darken-2', 'white--text'];
      } else if (this.resource.type == 'url') {
        return ['green', 'white--text'];
      } else {
        return ['red', 'white--text'];
      }
    },
    avatarSize() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return '22';
          break;
        default:
          return '26';
          break;
      }
    },
    iconSize() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return '16';
          break;
        default:
          return '20';
          break;
      }
    },
  },
};
</script>

<style>
</style>
