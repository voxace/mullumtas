<template>
<v-toolbar color="indigo" dark app style="z-index: 200;">
  <router-link to="/" exact>
    <v-toolbar-title>MullumTAS</v-toolbar-title>
  </router-link>
  <v-spacer></v-spacer>
  <v-toolbar-items>

    <v-switch v-if="admin" label="Editing" color="yellow darken-1" v-model="editing" @click.native="toggle" class="my-3 mr-3"></v-switch>

    <v-menu offset-y origin="center center" class="elelvation-1" :nudge-bottom="14" transition="scale-transition">
      <v-btn icon flat slot="activator">
        <v-badge color="red" overlap>
          <span slot="badge">3</span>
          <v-icon medium>notifications</v-icon>
        </v-badge>
      </v-btn>
      <notification-list></notification-list>
    </v-menu>

    <v-menu offset-y origin="center center" :nudge-bottom="10" transition="scale-transition">
      <v-btn icon large flat slot="activator">
        <v-avatar size="30px">
          <img src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460" alt="Michael Wang" />
        </v-avatar>
      </v-btn>
      <v-list class="pa-0">
        <v-list-tile v-for="(item,index) in items" :to="!item.href ? { name: item.name } : null" :href="item.href" @click="item.click" ripple="ripple" :disabled="item.disabled" :target="item.target" rel="noopener" :key="index">
          <v-list-tile-action v-if="item.icon">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-menu>

  </v-toolbar-items>
</v-toolbar>
</template>

<script>
import NotificationList from '@/components/widgets/NotificationList';

export default {
  name: 'app-toolbar',
  components: {
    NotificationList,
  },
  data() {
    return {
      admin: true,
      items: [{
          icon: 'account_circle',
          href: '#',
          title: 'Profile',
          click: e => {
            console.log(e);
          },
        },
        {
          icon: 'settings',
          href: '#',
          title: 'Settings',
          click: e => {
            console.log(e);
          },
        },
        {
          icon: 'fullscreen_exit',
          href: '#',
          title: 'Logout',
          click: e => {
            window.getApp.$emit('APP_LOGOUT');
          },
        },
      ],
    };
  },
  methods: {
    toggle() {
      this.$store.dispatch('toggleEditing');
    },
  },
  computed: {
    editing: {
      get: function() {
        return this.$store.getters.isEditing;
      },
      set: function(newValue) {
        // Do nothing
      },
    },
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
</style>
