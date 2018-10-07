<template>
<v-expansion-panel-content>

  <v-layout slot="header" align-center justify-space-between>
    <h3 class="headline mt-2 mb-0 pa-2">{{ order }} - {{ unit.title }}</h3>
    <span v-if="editing" class="group mt-1 pa-0 mr-4">
      <v-btn flat icon color="error" @click.stop="">
        <v-icon>delete</v-icon>
      </v-btn>
      <v-btn flat icon color="indigo" @click.stop="">
        <v-icon>edit</v-icon>
      </v-btn>
    </span>
    <h4 v-else class="subheading mt-2 mr-4">7/7</h4>
  </v-layout>

  <v-card>
    <v-divider></v-divider>
    <app-section v-for="item in sections" :key="item._id" :section="item" />
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
  data() {
    return {
      unit: {},
      sections: {},
    };
  },
  methods: {
    getUnit() {
      const vm = this;
      this.$http
        .get(`/unit/${vm.unit._id}/sections`)
        .then(response => {
          vm.sections = response.data.sections;
        })
        .catch(err => {
          this.$store.dispatch(
            'openErrorBar',
            'An error occurred loading the unit: ' + vm.unit.title,
          );
        });
    },
  },
  computed: {
    order() {
      let s = this.unit.order + '';
      while (s.length < 2) s = '0' + s;
      return s;
    },
    editing() {
      return this.$store.getters.isEditing;
    },
    admin() {
      return this.$store.getters.isAdmin;
    },
  },
  created() {
    this.getUnit();
  },
};
</script>

<style>
</style>
