<template>
<v-card>
  <v-form ref="form" v-model="valid">

    <v-card-title primary-title class="align-center justify-center grey lighten-2">
      <h1 class="display-3">Edit Course</h1>
    </v-card-title>

    <v-card-text class="text-xs-center">

      <v-container fluid grid-list-xl class="my-1 py-1">
        <v-layout wrap align-center>
          <v-flex xs4 sm5 d-flex>
            <v-text-field label="Grade" v-model="course.grade" required :rules="gradeRules"></v-text-field>
          </v-flex>
          <v-flex xs5 sm5 d-flex>
            <v-text-field label="Short Name" v-model="course.short" required :rules="shortRules"></v-text-field>
          </v-flex>
          <v-flex xs3 sm2>
            <v-btn :loading="protectedLoading" icon @click.stop="toggleCourseStatus">
              <v-icon v-if="course.protected">lock</v-icon>
              <v-icon v-else>lock_open</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs12 d-flex>
            <v-text-field label="Title" v-model="course.title" required :rules="titleRules"></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>

      <v-card-actions class="align-center justify-center">
        <v-btn :loading="loading" :disabled="!valid" color="success" class="white--text" @click.stop="saveCourse">
          <v-icon left dark class="hidden-xs-only">save</v-icon> Save
        </v-btn>
        <v-btn :loading="loading" color="error" class="white--text" @click.stop="deleteCourse">
          <v-icon left dark class="hidden-xs-only">delete</v-icon> Delete
        </v-btn>
        <v-btn :loading="loading" color="indigo" class="white--text" @click.stop="closeDialog">
          <v-icon left dark class="hidden-xs-only">close</v-icon> Close
        </v-btn>
      </v-card-actions>

    </v-card-text>

  </v-form>
</v-card>
</template>

<script>
export default {
  props: ['course'],
  data: () => ({
    valid: true,
    loading: false,
    protectedLoading: false,
    grade: '',
    gradeRules: [
      v => !!v || 'Grade is required',
      v => (!isNaN(v) && v >= 7 && v <= 12) || 'Must be a number between 7 and 12',
    ],
    short: '',
    shortRules: [
      v => !!v || 'Short Name is required',
      v => (v && v.length <= 5) || 'Short Name must be less than 6 characters',
    ],
    title: '',
    titleRules: [v => !!v || 'Title is required'],
  }),
  methods: {
    saveCourse() {
      const vm = this;
      if (this.$refs.form.validate()) {
        vm.loading = true;
        this.$http
          .put('/course/' + vm.course._id, vm.course)
          .then(response => {
            this.$store.dispatch('openSuccessBar', 'Update Successful');
            this.$emit('edited');
            this.$emit('closed');
            vm.loading = false;
          })
          .catch(err => {
            this.$store.dispatch('openErrorBar', 'Error Updating Course');
            vm.loading = false;
          });
      }
    },
    deleteCourse() {
      const vm = this;
      vm.loading = true;
      this.$http
        .delete('/course/' + vm.course._id)
        .then(response => {
          this.$store.dispatch('openSuccessBar', 'Delete Successful');
          this.$emit('edited');
          this.$emit('closed');
          vm.loading = false;
        })
        .catch(err => {
          this.$store.dispatch('openErrorBar', 'Error Deleting Unit');
          vm.loading = false;
        });
    },
    toggleCourseStatus() {
      this.course.protected = !this.course.protected;
      const vm = this;
      vm.protectedLoading = true;
      this.$http
        .patch('/course/' + vm.course._id + '/protected/' + vm.course.protected)
        .then(response => {
          if (vm.course.protected == true) {
            this.$store.dispatch('openSuccessBar', 'Course Restricted');
          } else {
            this.$store.dispatch('openSuccessBar', 'Course Open');
          }
          vm.protectedLoading = false;
        })
        .catch(err => {
          this.$store.dispatch('openErrorBar', 'Error Updating Course');
          vm.protectedLoading = false;
        });
    },
    closeDialog(event) {
      this.$emit('edited');
      this.$emit('closed');
    },
  },
};
</script>

<style scoped>
</style>
