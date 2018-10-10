<template>
<v-expansion-panel-content>

  <v-layout slot="header" align-center justify-space-between>
    <h3 class="title mt-2 mb-0 pa-2">{{ order }} - {{ unit.title }}</h3>
    <fade-transition>
      <v-tooltip left v-if="editing">
        <v-btn slot="activator" flat icon color="indigo" class="mt-2 mb-0 pa-0 mr-4" @click.stop="editDialog = true">
          <v-icon>edit</v-icon>
        </v-btn>
        <span>Edit Unit</span>
      </v-tooltip>
      <h4 v-else class="subheading mt-2 mr-4">7/7</h4>
    </fade-transition>
  </v-layout>

  <v-card>
    <app-section v-for="item in sections" :key="item._id" :section="item" @edited="refreshUnit" />
  </v-card>

  <v-dialog v-model="editDialog" width="500">
    <app-edit-unit @closed="editDialog = false" @edited="refreshUnit" :unit="unit" />
  </v-dialog>

</v-expansion-panel-content>
</template>

<script>
import Section from '@/components/course/Section.vue';
import EditUnit from '@/components/course/EditUnit.vue';
import FadeTransition from '@/components/FadeTransition.vue';

export default {
  name: 'unit',
  props: ['unit'],
  components: {
    appSection: Section,
    appEditUnit: EditUnit,
    fadeTransition: FadeTransition,
  },
  data() {
    return {
      editDialog: false,
    };
  },
  methods: {
    refreshUnit() {
      this.$emit('edited');
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
    sections() {
      return this.unit.sections;
    },
  },
};
</script>

<style>
</style>
