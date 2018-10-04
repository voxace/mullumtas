<template>
<div class="home">
  <app-course-bar />
  <v-container fluid fill-height grid-list-lg>
    <v-layout row wrap>
      <app-course-card v-for="n in 6" :key="n" />
    </v-layout>
  </v-container>
</div>
</template>

<script>
import CourseBar from '@/components/home/CourseBar.vue';
import CourseCard from '@/components/home/CourseCard.vue';

export default {
  name: 'home',
  components: {
    appCourseBar: CourseBar,
    appCourseCard: CourseCard
  },
};
</script>
