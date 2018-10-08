<template>
<v-card>
  <v-form ref="form" v-model="valid">

    <v-card-title primary-title class="align-center justify-center grey lighten-2">
      <h1 class="display-3">Edit Unit</h1>
    </v-card-title>

    <v-card-text class="text-xs-center">

      <v-container fluid grid-list-xl class="my-1 py-1">
        <v-layout wrap align-center>
          <v-flex xs12 d-flex>
            <v-text-field label="Unit Number" :value="unit.order" v-model="unit.order" required :rules="orderRules" autofocus="true"></v-text-field>
          </v-flex>
          <v-flex xs12 d-flex>
            <v-text-field label="Unit Title" :value="unit.title" v-model="unit.title" required :rules="titleRules"></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>

      <v-card-actions class="align-center justify-center">
        <v-btn :loading="loading" :disabled="!valid" color="success" class="white--text" @click.stop="saveUnit">
          <v-icon left dark>save</v-icon> Save
        </v-btn>
        <v-btn :loading="loading" color="error" class="white--text" @click.stop="deleteUnit">
          <v-icon left dark>delete</v-icon> Delete
        </v-btn>
        <v-btn :loading="loading" color="indigo" class="white--text" @click.stop="closeDialog">
          <v-icon left dark>close</v-icon> Close
        </v-btn>
      </v-card-actions>

    </v-card-text>

  </v-form>
</v-card>
</template>

<script>
export default {
  props: ['unit'],
  data: () => ({
    valid: false,
    loading: false,
    orderRules: [
      v => !!v || 'Unit Number is required',
      v => (!isNaN(v) && v >= 1 && v < 100) || 'Unit Number must be between 1 and 99',
    ],
    titleRules: [v => !!v || 'Unit Title is required'],
  }),
  methods: {
    saveUnit() {
      const vm = this;
      if (this.$refs.form.validate()) {
        vm.loading = true;
        this.$http
          .put('/unit/' + vm.unit._id, vm.unit)
          .then(response => {
            this.$store.dispatch('openSuccessBar', 'Update Successful');
            this.$emit('edited');
            this.$emit('closed');
            vm.loading = false;
          })
          .catch(err => {
            this.$store.dispatch('openErrorBar', 'Error Updating Unit');
            vm.loading = false;
          });
      }
    },
    deleteUnit() {
      const vm = this;
      if (this.$refs.form.validate()) {
        vm.loading = true;
        this.$http
          .delete('/unit/' + vm.unit._id)
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
      }
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
