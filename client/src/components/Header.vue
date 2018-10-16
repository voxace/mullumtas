<template>
<v-toolbar color="indigo" dark app style="z-index: 200;" v-if="!isFullScreen">
  <router-link to="/" exact>
    <v-toolbar-title>MullumTAS</v-toolbar-title>
  </router-link>
  <v-spacer></v-spacer>

  <v-toolbar-items v-if="isLoggedIn">

    <v-switch v-if="admin" color="yellow darken-1" v-model="editing" @click.native="toggle" class="my-3 mr-1"></v-switch>
    <p v-if="admin" class="subheading edit-label" v-bind:class="{dim: !editing}">Editing</p>

    <v-menu offset-y origin="center center" :nudge-bottom="10" transition="scale-transition">
      <v-btn icon large flat slot="activator">
        <v-avatar size="30px">
          <v-icon>account_circle</v-icon>
        </v-avatar>
      </v-btn>
      <v-list class="pa-0">
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>person</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{username}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile ripple @click="logout">
          <v-list-tile-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-menu>

  </v-toolbar-items>

  <v-toolbar-items v-else>
    <login />
  </v-toolbar-items>



</v-toolbar>
</template>

<script>
import Login from '@/components/widgets/Login.vue';

export default {
  name: 'app-toolbar',
  components: {
    Login,
  },
  data() {
    return {};
  },
  methods: {
    toggle() {
      this.$store.dispatch('toggleEditing');
    },
    logout() {
      this.$store.dispatch('logout');
    },
  },
  computed: {
    editing: {
      get() {
        return this.$store.getters.isEditing;
      },
      set(newValue) {
        // Do nothing
      },
    },
    admin() {
      return this.$store.getters.isAdmin;
    },
    isLoggedIn() {
      return this.$store.getters.loggedIn;
    },
    isFullScreen() {
      return this.$store.getters.isFullScreen;
    },
    username() {
      return this.$store.getters.username;
    },
  },
  mounted() {
    this.$store.dispatch('closeLoginDialog');
  },
};
</script>

<style scoped>
a,
a:visited,
a:hover {
  color: white;
  text-decoration: none;
}

.edit-label {
  margin-top: 20px !important;
  margin-right: 6px;
}

.dim {
  opacity: 0.4 !important;
}
</style>
