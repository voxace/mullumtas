<template>
<v-card>
  <v-form ref="form" v-model="valid">

    <v-card-title primary-title class="align-center justify-center grey lighten-2">
      <h1 class="display-3">Add Unit</h1>
    </v-card-title>

    <v-card-text class="text-xs-center">

      <v-container fluid grid-list-xl class="my-1 py-1">
        <v-layout wrap align-center>
          <v-flex xs12 d-flex>
            <v-text-field label="Unit Number" placeholder="Unit Number" v-model="order" required :rules="orderRules"></v-text-field>
          </v-flex>
          <v-flex xs12 d-flex>
            <v-text-field label="Unit Title" placeholder="Unit Title" v-model="title" required :rules="titleRules"></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>

      <v-card-actions class="align-center justify-center">
        <v-btn :loading="loading" :disabled="!valid" color="success" class="white--text" @click.prevent="submit">
          <v-icon left dark>add</v-icon> Add
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
  props: ['course'],
  data: () => ({
    valid: true,
    loading: false,
    order: '',
    orderRules: [
      v => !!v || 'Unit Number is required',
      v => (v && v.length <= 2) || 'Unit Number must be less than 100',
      v => (!isNaN(v) && v >= 1 && v < 100) || 'Unit Number must be between 1 and 99',
    ],
    title: '',
    titleRules: [v => !!v || 'Unit Title is required'],
  }),
  methods: {
    submit() {
      const vm = this;
      if (this.$refs.form.validate()) {
        vm.loading = true;
        this.$http
          .post('/unit', {
            title: vm.title,
            order: vm.order,
          })
          .then(response => {
            if (response.data._id.length > 0) {
              this.$http
                .patch('/course/' + vm.course._id + '/unit/' + response.data._id)
                .then(response2 => {
                  if (response2.data.n == 1) {
                    this.$store.dispatch('openSuccessBar', 'Save Successful');
                    this.$emit('added');
                    this.$emit('closed');
                    vm.title = '';
                    vm.order = '';
                    vm.loading = false;
                  }
                })
                .catch(err2 => {
                  this.$store.dispatch('openErrorBar', 'Error Saving Unit');
                  vm.loading = false;
                });
            }
          })
          .catch(err => {
            this.$store.dispatch('openErrorBar', 'Error Saving Unit');
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
</style>
