<template>
<v-card>
  <v-form ref="form" v-model="valid">

    <v-card-title primary-title class="align-center justify-center grey lighten-2">
      <h1 class="display-3">Edit Section</h1>
    </v-card-title>

    <v-card-text class="text-xs-center">

      <v-container fluid grid-list-xl class="my-1 py-1">
        <v-layout wrap align-center>

          <v-flex xs12 sm4 d-flex>
            <v-text-field label="Section Number" placeholder="Section Number" v-model="section.order" required :rules="orderRules"></v-text-field>
          </v-flex>
          <v-flex xs12 sm8 d-flex>
            <v-text-field label="Section Title" placeholder="Section Title" v-model="section.title" required :rules="titleRules"></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>

      <v-card-actions class="align-center justify-center">
        <v-btn :loading="loading" :disabled="!valid" color="success" class="white--text" @click.stop="saveSection">
          <v-icon left dark class="hidden-xs-only">save</v-icon> Save
        </v-btn>
        <v-btn :loading="loading" color="error" class="white--text" @click.stop="deleteSection">
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
  props: ['section'],
  data: () => ({
    valid: true,
    loading: false,
    orderRules: [
      v => !!v || 'Section Number is required',
      v => (!isNaN(v) && v >= 1 && v < 100) || 'Section Number must be between 1 and 99',
    ],
    titleRules: [v => !!v || 'Section Title is required'],
  }),
  methods: {
    saveSection() {
      const vm = this;
      if (this.$refs.form.validate()) {
        vm.loading = true;
        this.$http
          .put('/section/' + vm.section._id, vm.section)
          .then(response => {
            this.$store.dispatch('openSuccessBar', 'Update Successful');
            this.$emit('edited');
            this.$emit('closed');
            vm.loading = false;
          })
          .catch(err => {
            this.$store.dispatch('openErrorBar', 'Error Updating Section');
            vm.loading = false;
          });
      }
    },
    deleteSection() {
      const vm = this;
      vm.loading = true;
      alert(vm.section._id);
      this.$http
        .delete('/section/' + vm.section._id)
        .then(response => {
          this.$store.dispatch('openSuccessBar', 'Delete Successful');
          this.$emit('edited');
          this.$emit('closed');
          vm.loading = false;
        })
        .catch(err => {
          this.$store.dispatch('openErrorBar', 'Error Deleting Section');
          vm.loading = false;
        });
    },
    closeDialog(event) {
      this.$emit('closed');
    },
  },
  computed: {
    items() {
      this.selectedUnit = this.unit;
      return this.course.units;
    },
  },
};
</script>

<style scoped>
</style>
