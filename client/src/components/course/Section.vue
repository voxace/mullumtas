<template>
<v-list class="mb-0 pb-0" subheader>

  <v-divider></v-divider>

  <v-subheader>
    <h2 class="title">
      <fade-transition><span v-if="editing">{{ order }} - </span></fade-transition>{{ section.title }}
    </h2>
    <fade-transition>
      <v-tooltip right v-if="editing">
        <v-btn slot="activator" flat icon color="indigo" class="" @click.stop="editDialog = true">
          <v-icon>edit</v-icon>
        </v-btn>
        <span>Edit Section</span>
      </v-tooltip>
    </fade-transition>
  </v-subheader>

  <app-resource v-for="item in resources" :key="item_id" :resource="item" class="pl-2" />

  <v-dialog v-model="editDialog" width="500">
    <app-edit-section @closed="editDialog = false" @edited="refreshSection" :section="section" />
  </v-dialog>

</v-list>
</template>

<script>
import Resource from '@/components/course/Resource.vue';
import EditSection from '@/components/course/EditSection.vue';
import FadeTransition from '@/components/FadeTransition.vue';

export default {
  name: 'section',
  props: ['section'],
  components: {
    appResource: Resource,
    appEditSection: EditSection,
    fadeTransition: FadeTransition,
  },
  data() {
    return {
      editDialog: false,
    };
  },
  methods: {
    refreshSection() {
      this.$emit('edited');
    },
  },
  computed: {
    editing() {
      return this.$store.getters.isEditing;
    },
    resources() {
      return this.section.resources;
    },
    order() {
      let s = this.section.order + '';
      while (s.length < 2) s = '0' + s;
      return s;
    },
  },
};
</script>

<style>
</style>
