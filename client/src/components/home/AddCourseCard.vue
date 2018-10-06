<template>
<v-card>
  <v-form ref="form" v-model="valid">

    <v-card-title primary-title class="align-center justify-center">
      <h1 class="display-3">Add Course</h1>
    </v-card-title>

    <v-card-text class="text-xs-center">

      <v-container fluid grid-list-xl class="my-1 py-1">
        <v-layout wrap align-center>
          <v-flex xs12 sm6 d-flex>
            <v-text-field label="Grade" placeholder="Grade" v-model="grade" required :rules="gradeRules"></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 d-flex>
            <v-text-field label="Grade" placeholder="Short Name" v-model="short" required :rules="shortRules"></v-text-field>
          </v-flex>
          <v-flex xs12 d-flex>
            <v-text-field label="Title" placeholder="Title" v-model="title" required :rules="titleRules"></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>

      <v-card-actions class="align-center justify-center">
        <v-btn :loading="loading" :disabled="!valid" color="success" class="white--text" @click.prevent="submit">
          <v-icon left dark>add</v-icon> Add
        </v-btn>
        <v-btn :loading="loading" color="error" class="white--text" @click.stop="closeDialog">
          <v-icon left dark>close</v-icon> Close
        </v-btn>
      </v-card-actions>

    </v-card-text>

  </v-form>
</v-card>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    loading: false,
    grade: '',
    gradeRules: [
      v => !!v || 'Grade is required',
      v => (v && v.length <= 2) || 'Grade must be less than 3 characters',
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
    submit() {
      var vm = this;
      if (this.$refs.form.validate()) {
        vm.loading = true;
        this.$http
          .post('/course', {
            title: vm.title,
            grade: vm.grade,
            short: vm.short.toUpperCase(),
          })
          .then(response => {
            if (response.data.title == vm.title && response.data._id.length > 0) {
              this.$store.dispatch('openSuccessBar', 'Save Successful');
              this.$emit('added');
              this.$emit('closed');
              vm.loading = false;
            }
          })
          .catch(err => {
            this.$store.dispatch('openErrorBar', 'Error Saving Course');
            vm.loading = false;
          });
      }
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
