<template>
<v-content>

  <v-navigation-drawer clipped="false" v-model="drawer" fixed style="padding-top: 130px">
    <v-list>
      <v-list-group v-for="section in unit.sections" v-model="section.active" :key="section.title" :prepend-icon="section.action">
        <v-list-tile slot="activator">
          <v-list-tile-content>
            <v-list-tile-title>{{ section.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-for="resource in section.resources" :key="resource.title" @click="">
          <v-list-tile-avatar :size="avatarSize">
            <v-icon :size="iconSize" :class="[types[resource.type].color]">{{ types[resource.type].icon }}</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>
              <p class=" body-1 ml-0 pl-0">{{ resource.title }}</p>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>

  <app-unit-bar :title="short" link="true" :unit="unit.title" />

  <v-container v-if="isLoadingScreen" fluid fill-height grid-list-lg>
    <v-layout align-center justify-center>
      <v-progress-circular :size="70" :width="7" color="indigo" indeterminate></v-progress-circular>
    </v-layout>
  </v-container>

  <v-container v-else fluid fill-height grid-list-lg :class="{ padding: drawer }">
    <v-layout align-center justify-center>
      <v-flex xs12>
        <object width='100%' height='100%' v-html="docRender"></object>
      </v-flex>
    </v-layout>
  </v-container>

</v-content>
</template>

<script>
import UnitBar from '@/components/resource/UnitBar.vue';

export default {
  name: 'resource',
  props: ['short', 'unitID', 'sectionID', 'resourceID'],
  components: {
    appUnitBar: UnitBar,
  },
  data: function() {
    return {
      types: null,
      docRender: '',
      drawer: false,
      isLoadingScreen: true,
      dialog: false,
      unit: {
        title: 'Loading...',
      },
    };
  },
  methods: {
    getUnit() {
      const vm = this;
      this.$http
        .get('/unit/' + vm.unitID)
        .then(response => {
          vm.unit = response.data;
          this.isLoadingScreen = false;
        })
        .catch(err => {
          this.$store.dispatch('openErrorBar', 'An error occurred loading the unit');
        });
    },
    getResource() {
      const vm = this;
      this.$http.get('/resource/' + vm.resourceID + '/link').then(response => {
        this.docRender = response.data;
      });
    },
    getTypes() {
      const vm = this;
      this.$http
        .get('/types')
        .then(response => {
          vm.types = response.data;
        })
        .catch(err => {
          this.$store.dispatch('openErrorBar', 'An error occurred loading the resource types');
        });
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
    globalDrawer: {
      get: function() {
        return this.$store.getters.isDrawerOpen;
      },
    },
  },
  watch: {
    drawer: function(val) {
      this.$store.dispatch('setDrawer', val);
    },
    globalDrawer: function(val) {
      this.drawer = val;
    },
  },
  created() {
    this.getTypes();
    this.getUnit();
    this.getResource();
  },
};
</script>

<style scoped>
.container {
  transition: 0.1s ease-in-out;
}

.padding {
  transform: translateX(300px);
}
</style>