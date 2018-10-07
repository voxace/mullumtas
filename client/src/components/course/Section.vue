<template>
<v-list class="mb-0 pb-0" subheader>

  <v-subheader>
    <h2 class="title">{{ section.title }}</h2>
  </v-subheader>

  <app-resource v-for="item in resources" :key="item_id" :resource="item" />

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
  data() {
    return {
      section: {},
      resources: {},
    };
  },
  methods: {
    getUnit() {
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
  created() {
    this.getUnit();
  },
};
</script>

<style>
</style>
