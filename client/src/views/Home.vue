<template>
<div class="home">
  <app-course-bar />
  <v-container fluid fill-height grid-list-lg>
    <v-layout row wrap>
      <app-course-card v-for="item in courses" :key="item.id" :course="item" />
    </v-layout>
  </v-container>
</div>
</template>

<script>
import CourseBar from '@/components/home/CourseBar.vue';
import CourseCard from '@/components/home/CourseCard.vue';

export default {
  name: 'home',
  data() {
    return {
      courses: [],
    };
  },
  components: {
    appCourseBar: CourseBar,
    appCourseCard: CourseCard,
  },
  methods: {
    getCourses() {
      var vm = this;
      this.$http
        .get('/courses')
        .then(response => {
          vm.courses = response.data;
        })
        .catch(err => {
          console.log('Error: ' + err);
        });
    },
  },
  created() {
    this.getCourses();
  },
};
</script>
