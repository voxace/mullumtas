<template>
<v-list class="mb-0 pb-0" subheader>

  <v-subheader>
    <h2 class="title"><span v-if="editing">{{ order }} - </span>{{ section.title }}</h2>
    <v-tooltip right v-if="editing">
      <v-btn slot="activator" flat icon color="indigo" class="" @click.stop="editDialog = true">
        <v-icon>edit</v-icon>
      </v-btn>
      <span>Edit Section</span>
    </v-tooltip>
  </v-subheader>

  <app-resource v-for="item in resources" :key="item_id" :resource="item" class="pl-2" />

</v-list>
</template>

<script>
import Resource from '@/components/course/Resource.vue';

export default {
  name: 'section',
  props: ['section'],
  components: {
    appResource: Resource,
  },
  methods: {
    getSection() {
      const vm = this;
      this.$http
        .get(`/section/${vm.section._id}/resources`)
        .then(response => {
          vm.resources = response.data.resources;
        })
        .catch(err => {
          this.$store.dispatch(
            'openErrorBar',
            'An error occurred loading the section: ' + vm.section.title,
          );
        });
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
  created() {
    //this.getSection();
  },
};
</script>

<style>
</style>
