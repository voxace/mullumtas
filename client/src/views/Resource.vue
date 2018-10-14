<template>
<v-content>

  <v-navigation-drawer clipped="false" v-model="drawer" fixed style="padding-top: 130px" temporary>
    <v-list>
      <v-list-group v-for="section in unit.sections" :value="(section._id == sectionID)" :key="section.title" :prepend-icon="section.action">
        <v-list-tile slot="activator">
          <v-list-tile-content>
            <v-list-tile-title>{{ section.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-for="resource in section.resources" :key="resource.title" :to="'/course/'+short+'/unit/'+unit._id+'/section/'+section._id+'/resource/'+resource._id">
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

  <v-container v-else-if="!isLoadingScreen && currentResource.type != 'url' && allowedAccess" fluid fill-height grid-list-lg class="ma-0 pa-0">
    <iframe style="width:100%; height:100%" height="100%" :src="currentResource.link"></iframe>
  </v-container>

  <v-container v-else-if="!isLoadingScreen && currentResource.type == 'url' && allowedAccess" fluid fill-height grid-list-lg class="ma-0 pa-0">
    <v-layout align-center justify-center>
      <div><a :href="currentResource.link" target="_blank">{{ currentResource.title }}</a></div>
    </v-layout>
  </v-container>

  <v-container v-else-if="!allowedAccess" fluid fill-height grid-list-lg>
    <v-layout align-center justify-center>
      <div>To access this course you must be enrolled and logged in.</div>
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
      course: {},
      currentResource: {},
      types: null,
      drawer: false,
      isLoadingScreen: true,
      dialog: false,
      unit: {
        title: 'Loading...',
      },
    };
  },
  methods: {
    getCourse() {
      const vm = this;
      this.$http
        .get('/course/short/' + vm.short)
        .then(response => {
          vm.course = response.data;
        })
        .catch(err => {
          this.$store.dispatch('openErrorBar', 'An error occurred loading the course');
        });
    },
    getUnit() {
      const vm = this;
      this.$http
        .get('/unit/' + vm.unitID)
        .then(response => {
          vm.unit = response.data;
        })
        .catch(err => {
          this.$store.dispatch('openErrorBar', 'An error occurred loading the unit');
        });
    },
    getResource() {
      const vm = this;
      this.$http
        .get('/resource/' + vm.resourceID)
        .then(response => {
          vm.currentResource = response.data;
          if (vm.currentResource.type == 'url') {
            window.open(vm.currentResource.link, '_blank');
          }
          this.isLoadingScreen = false;
        })
        .catch(err => {
          this.$store.dispatch('openErrorBar', 'An error occurred loading the resource');
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
    globalDrawer: {
      get: function() {
        return this.$store.getters.isDrawerOpen;
      },
    },
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
    isLoggedIn() {
      return this.$store.getters.loggedIn;
    },
    allowedAccess() {
      if (this.course.protected && !this.isAdmin) {
        if (this.isLoggedIn) {
          let member = false;
          this.students.forEach(student => {
            if (student.detId == this.$store.getters.username) {
              member = true;
            }
          });
          return member;
        } else {
          return false;
        }
      } else {
        return true;
      }
    },
  },
  watch: {
    drawer: function(val) {
      this.$store.dispatch('setDrawer', val);
    },
    globalDrawer: function(val) {
      this.drawer = val;
    },
    resourceID: function(val) {
      this.isLoadingScreen = true;
      this.getResource();
    },
  },
  created() {
    this.$store.dispatch('setDrawer', false);
    this.getCourse();
    this.getTypes();
    this.getUnit();
    this.getResource();
  },
};
</script>

<style scoped>
</style>
