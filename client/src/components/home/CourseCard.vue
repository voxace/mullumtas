<template>
<v-flex xs12 sm6 md4 align-center justify-center>
  <v-card hover :to="'/course/' + course.short">
    <v-card-title primary-title class="align-center justify-center">
      <h1 class="display-3">Year {{ course.grade }}</h1>
    </v-card-title>
    <v-card-text class="text-xs-center">
      <h3 class="headline my-3">{{ course.title }}</h3>
      <v-card-actions class="align-center justify-center">
        <v-btn flat color="indigo">Access Course</v-btn>
      </v-card-actions>
    </v-card-text>
  </v-card>
</v-flex>
</template>

<script>
export default {
  props: ['course'],
};
</script>

<style scoped>
.v-card__title {
  background-color: #eeeeee !important;
}
</style>
