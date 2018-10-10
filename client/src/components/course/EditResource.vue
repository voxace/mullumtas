<template>
<v-card>
  <v-form ref="form" v-model="valid">

    <v-card-title primary-title class="align-center justify-center grey lighten-2">
      <h1 class="display-3">Edit Resource</h1>
    </v-card-title>

    <v-card-text class="text-xs-center">

      <v-container fluid grid-list-xl class="my-1 py-1">
        <v-layout wrap align-center>

          <v-flex xs12 sm6 d-flex>
            <v-select :items="typeItems" item-text="title" item-value="type" label="Type" return-object v-model="resource.type"></v-select>
          </v-flex>
          <v-flex xs12 sm6 d-flex>
            <v-text-field label="Resource Number" placeholder="Resource Number" v-model="resource.order" required :rules="orderRules"></v-text-field>
          </v-flex>

          <v-flex xs12 d-flex>
            <v-text-field label="Resource Title" placeholder="Resource Title" v-model="resource.title" required :rules="titleRules"></v-text-field>
          </v-flex>

          <v-flex xs12 d-flex>
            <v-text-field label="Resource Link" placeholder="Link" v-model="resource.link" required :rules="linkRules"></v-text-field>
          </v-flex>

        </v-layout>
      </v-container>

      <v-card-actions class="align-center justify-center">
        <v-btn :loading="loading" :disabled="!valid" color="success" class="white--text" @click.stop="saveResource">
          <v-icon left dark>save</v-icon> Save
        </v-btn>
        <v-btn :loading="loading" color="error" class="white--text" @click.stop="deleteResource">
          <v-icon left dark class="hidden-xs-only">delete</v-icon> Delete
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
  props: ['resource'],
  data: () => ({
    typeItems: [
      {
        title: 'Google Docs',
        type: 'doc',
      },
      {
        title: 'Google Slides',
        type: 'slide',
      },
      {
        title: 'Google Forms',
        type: 'quiz',
      },
      {
        title: 'Link',
        type: 'url',
      },
    ],
    valid: true,
    loading: false,
    orderRules: [
      v => !!v || 'Resource Number is required',
      v => (!isNaN(v) && v >= 1 && v < 100) || 'Resource Number must be between 1 and 99',
    ],
    titleRules: [v => !!v || 'Resource Title is required'],
    linkRules: [v => !!v || 'Link is required'],
  }),
  methods: {
    saveResource() {
      const vm = this;
      if (this.$refs.form.validate()) {
        vm.loading = true;
        this.$http
          .put('/resource/' + vm.resource._id, vm.resource)
          .then(response => {
            this.$store.dispatch('openSuccessBar', 'Update Successful');
            this.$emit('edited');
            this.$emit('closed');
            vm.loading = false;
          })
          .catch(err => {
            this.$store.dispatch('openErrorBar', 'Error Updating Resource');
            vm.loading = false;
          });
      }
    },
    deleteResource() {
      const vm = this;
      vm.loading = true;
      this.$http
        .delete('/resource/' + vm.resource._id)
        .then(response => {
          this.$store.dispatch('openSuccessBar', 'Delete Successful');
          this.$emit('edited');
          this.$emit('closed');
          vm.loading = false;
        })
        .catch(err => {
          this.$store.dispatch('openErrorBar', 'Error Deleting Resource');
          vm.loading = false;
        });
    },
    closeDialog(event) {
      this.$emit('closed');
    },
  },
};
</script>

<style scoped>
</style>
