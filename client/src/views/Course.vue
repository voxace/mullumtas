<template>
<div class="course">
  <app-course-bar />
  <v-container fluid fill-height grid-list-lg>
    <v-layout row wrap>
      <v-expansion-panel>
        <app-unit v-for="i in 7" />
      </v-expansion-panel>
    </v-layout>
  </v-container>
</div>
</template>

<script>
import CourseBar from '@/components/course/CourseBar.vue';
import Unit from '@/components/course/Unit.vue';

export default {
  name: 'home',
  components: {
    appCourseBar: CourseBar,
    appUnit: Unit,
  },
};
</script>

<style scoped>
.v-expansion-panel {
  box-shadow: none !important;
}

.v-expansion-panel__container {
  margin-bottom: 15px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
}
</style>
