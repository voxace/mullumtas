<template>
<v-card>
  <v-form ref="form" v-model="valid">

    <v-card-title primary-title class="align-center justify-center grey lighten-2">
      <h1 class="display-3">Add Resource</h1>
    </v-card-title>

    <v-card-text class="text-xs-center">

      <v-container fluid grid-list-xl class="my-1 py-1">
        <v-layout wrap align-center>

          <v-flex xs12 sm6 d-flex>
            <v-select :items="unitItems" item-text="title" item-value="_id" label="Unit" return-object v-model="selectedUnit" :rules="unitRules"></v-select>
          </v-flex>
          <v-flex xs12 sm6 d-flex>
            <v-select :items="sectionItems" item-text="title" item-value="_id" label="Section" return-object v-model="selectedSection" :rules="sectionRules" no-data-text="Select a unit first"></v-select>
          </v-flex>

          <v-flex xs12 sm6 d-flex>
            <v-select :items="typeItems" item-text="title" item-value="type" label="Type" return-object v-model="selectedType"></v-select>
          </v-flex>
          <v-flex xs12 sm6 d-flex>
            <v-text-field label="Resource Number" placeholder="Resource Number" v-model="order" required :rules="orderRules"></v-text-field>
          </v-flex>

          <v-flex xs12 d-flex>
            <v-text-field label="Resource Title" placeholder="Resource Title" v-model="title" required :rules="titleRules"></v-text-field>
          </v-flex>

          <v-flex xs12 d-flex>
            <v-text-field label="Resource Link" placeholder="Link" v-model="link" required :rules="linkRules"></v-text-field>
          </v-flex>

        </v-layout>
      </v-container>

      <v-card-actions class="align-center justify-center">
        <v-btn :loading="loading" :disabled="!valid" color="success" class="white--text" @click.stop="saveResource">
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
    selectedSection: {},
    selectedType: {
      title: 'Google Docs',
      type: 'doc',
    },
    typeItems: [{
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
    order: '',
    orderRules: [
      v => !!v || 'Resource Number is required',
      v => (!isNaN(v) && v >= 1 && v < 100) || 'Resource Number must be between 1 and 99',
    ],
    title: '',
    titleRules: [v => !!v || 'Resource Title is required'],
    unitRules: [v => !!v || 'Unit is required'],
    sectionRules: [v => !!v || 'Section is required'],
    link: '',
    linkRules: [v => !!v || 'Link is required'],
  }),
  methods: {
    saveResource() {
      const vm = this;
      if (this.$refs.form.validate()) {
        vm.loading = true;
        this.$http
          .post('/resource', {
            title: vm.title,
            type: vm.selectedType.type,
            order: vm.order,
            link: vm.link,
          })
          .then(response => {
            if (response.data._id.length > 0) {
              this.$http
                .patch('/section/' + vm.selectedSection._id + '/resource/' + response.data._id)
                .then(response2 => {
                  if (response2.data.n == 1) {
                    this.$store.dispatch('openSuccessBar', 'Save Successful');
                    this.$emit('closed');
                    this.$emit('added');
                    vm.loading = false;
                    vm.title = '';
                    vm.order += 1;
                    vm.link = '';
                  }
                })
                .catch(err2 => {
                  this.$store.dispatch('openErrorBar', 'Error Saving Resource into Section');
                  vm.loading = false;
                });
            }
          })
          .catch(err => {
            this.$store.dispatch('openErrorBar', 'Error Saving Resource');
            vm.loading = false;
          });
      }
    },
    closeDialog(event) {
      this.$emit('closed');
    },
  },
  computed: {
    unitItems() {
      return this.course.units;
    },
    sectionItems() {
      return this.selectedUnit.sections;
    },
  },
  watch: {
    selectedSection: function(val) {
      this.order = this.selectedSection.resources.length + 1;
    },
  },
  mounted() {
    setTimeout(() => {
      this.selectedUnit = this.course.units[0];
      this.selectedSection = this.selectedUnit.sections[0];
      this.order = this.selectedSection.resources.length + 1;
    }, 1500);
  },
};
</script>

<style scoped>
</style>
