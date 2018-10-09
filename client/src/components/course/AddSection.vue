<template>
<v-card>
  <v-form ref="form" v-model="valid">

    <v-card-title primary-title class="align-center justify-center grey lighten-2">
      <h1 class="display-3">Add Section</h1>
    </v-card-title>

    <v-card-text class="text-xs-center">

      <v-container fluid grid-list-xl class="my-1 py-1">
        <v-layout wrap align-center>
          <v-flex xs12 sm8 d-flex>
            <v-select :items="items" item-text="title" item-value="_id" label="Unit" return-object v-model="selectedUnit" :rules="unitRules"></v-select>
          </v-flex>
          <v-flex xs12 sm4 d-flex>
            <v-text-field label="Section Number" placeholder="Section Number" v-model="order" required :rules="orderRules"></v-text-field>
          </v-flex>
          <v-flex xs12 d-flex>
            <v-text-field label="Section Title" placeholder="Section Title" v-model="title" required :rules="titleRules"></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>

      <v-card-actions class="align-center justify-center">
        <v-btn :loading="loading" :disabled="!valid" color="success" class="white--text" @click.stop="saveSection">
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
    selectedUnit: {},
    valid: true,
    loading: false,
    order: '',
    orderRules: [
      v => !!v || 'Section Number is required',
      v => (!isNaN(v) && v >= 1 && v < 100) || 'Section Number must be between 1 and 99',
    ],
    title: '',
    titleRules: [v => !!v || 'Section Title is required'],
    unitRules: [v => !!v || 'Unit is required'],
  }),
  methods: {
    saveSection() {
      const vm = this;
      if (this.$refs.form.validate()) {
        vm.loading = true;
        this.$http
          .post('/section', {
            title: vm.title,
            order: vm.order,
          })
          .then(response => {
            if (response.data._id.length > 0) {
              this.$http
                .patch('/unit/' + vm.selectedUnit._id + '/section/' + response.data._id)
                .then(response2 => {
                  if (response2.data.n == 1) {
                    this.$store.dispatch('openSuccessBar', 'Save Successful');
                    this.$emit('closed');
                    this.$emit('added');
                    vm.title = '';
                    vm.order = '';
                    vm.loading = false;
                  }
                })
                .catch(err2 => {
                  this.$store.dispatch('openErrorBar', 'Error Saving Section');
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
  computed: {
    items() {
      this.selectedUnit = this.course.units[0];
      return this.course.units;
    },
  },
};
</script>

<style scoped>
</style>
