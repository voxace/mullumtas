<template>
<div class="home">
  <app-course-bar />

  <v-container fluid fill-height grid-list-lg style="margin-top: 135px; margin-bottom: 40px;">
    <v-layout row wrap>
      <app-course-card v-for="item in courses" :key="item.id" :course="item" @delete="deleteCourse" @delete2="deleteDialog = true" />
    </v-layout>
  </v-container>

  <v-btn fab dark bottom right fixed color="indigo" v-if="editing" @click.stop="dialog = true">
    <v-icon>add</v-icon>
  </v-btn>

  <v-dialog v-model="dialog" width="500">
    <app-add-course-card @closed="dialog = false" @added="getCourses" />
  </v-dialog>

  <v-dialog v-model="deleteDialog" width="500">
    <app-delete-course @closed="deleteDialog = false" @deleted="refreshCourses" :course="courseToDelete" />
  </v-dialog>

</div>
</template>

<script>
import CourseBar from '@/components/home/CourseBar.vue';
import CourseCard from '@/components/home/CourseCard.vue';
import AddCourseCard from '@/components/home/AddCourseCard.vue';
import DeleteCourse from '@/components/home/DeleteCourse.vue';

export default {
  name: 'home',
  data() {
    return {
      courses: [],
      dialog: false,
      deleteDialog: false,
      courseToDelete: {},
    };
  },
  components: {
    appCourseBar: CourseBar,
    appCourseCard: CourseCard,
    appAddCourseCard: AddCourseCard,
    appDeleteCourse: DeleteCourse,
  },
  methods: {
    getCourses() {
      const vm = this;
      this.$http
        .get('/courses')
        .then(response => {
          vm.courses = response.data;
        })
        .catch(err => {
          this.$store.dispatch('openErrorBar', 'An error occurred loading the courses');
        });
    },
    deleteCourse(course) {
      this.courseToDelete = course;
    },
    refreshCourses() {
      setTimeout(this.getCourses(), 500);
    },
  },
  computed: {
    editing() {
      return this.$store.getters.isEditing;
    },
  },
  created() {
    this.getCourses();
  },
};
</script>
