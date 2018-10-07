<template>
<v-card>
  <v-card-title class="headline grey lighten-2" primary-title>Delete Course</v-card-title>
  <v-card-text>Are you sure you want to delete "{{ course.title }}"?</v-card-text>
  <v-divider></v-divider>
  <v-card-actions>
    <v-btn :loading="loading" color="error" flat @click="deleteCourse">Delete Course</v-btn>
    <v-btn color="indigo" flat @click="closeDialog">Cancel</v-btn>
  </v-card-actions>
</v-card>
</template>

<script>
export default {
  props: ['course'],
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    deleteCourse() {
      const vm = this;
      vm.loading = true;
      this.$http
        .delete(`/course/${vm.course._id}`)
        .then((response) => {
          this.$store.dispatch('openSuccessBar', 'Course Deleted Successfully');
          vm.loading = false;
          this.$emit('deleted');
          this.$emit('closed');
        })
        .catch((err) => {
          this.$store.dispatch('openErrorBar', 'Error Deleting Course');
          vm.loading = false;
          this.$emit('closed');
        });
    },
    closeDialog(event) {
      this.$emit('closed');
    },
  },
};
</script>

<style scoped>
.v-card__title {
  background-color: #eeeeee !important;
}
</style>
