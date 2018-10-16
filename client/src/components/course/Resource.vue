<template>
<v-list-tile @click.stop="nav('/course/'+short+'/unit/'+unitID+'/section/'+section._id+'/resource/'+resource._id)">

  <v-list-tile-avatar :size="avatarSize">
    <v-icon :size="iconSize" :class="[types[resource.type].color]">{{ types[resource.type].icon }}</v-icon>
  </v-list-tile-avatar>

  <v-list-tile-content>
    <span class="body-1">
      <fade-transition><span v-if="editing">{{ order }} - </span></fade-transition>{{ resource.title }}
    </span>
  </v-list-tile-content>

  <v-list-tile-action>
    <fade-transition>
      <v-tooltip left v-if="editing && isLoggedIn">
        <v-btn slot="activator" flat icon color="indigo" class="mr-4" @click.stop="editDialog = true">
          <v-icon>edit</v-icon>
        </v-btn>
        <span>Edit Resource</span>
      </v-tooltip>
    </fade-transition>
  </v-list-tile-action>

  <v-dialog v-model="editDialog" width="500">
    <app-edit-resource @closed="editDialog = false" @edited="refreshResource" :resource="resource" :typeItems="typeItems" />
  </v-dialog>

</v-list-tile>
</template>

<script>
import FadeTransition from '@/components/transitions/FadeTransition.vue';
import EditResource from '@/components/course/EditResource.vue';

export default {
  name: 'resource',
  props: ['resource', 'short', 'section', 'unitID', 'types', 'typeItems'],
  data() {
    return {
      editDialog: false,
    };
  },
  components: {
    fadeTransition: FadeTransition,
    appEditResource: EditResource,
  },
  methods: {
    refreshResource() {
      this.$emit('edited');
    },
    nav(to) {
      this.$router.push(to);
    },
  },
  computed: {
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
    editing() {
      return this.$store.getters.isEditing;
    },
    admin() {
      return this.$store.getters.isAdmin;
    },
    order() {
      // Pads the order number out to two digits
      let s = this.resource.order + '';
      while (s.length < 2) s = '0' + s;
      return s;
    },
    isLoggedIn() {
      return this.$store.getters.loggedIn;
    },
  },
};
</script>
