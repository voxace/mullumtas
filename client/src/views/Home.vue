<template>
<v-content>
  <app-course-bar />

  <v-container fluid fill-height grid-list-lg>
    <v-layout row wrap>
      <app-course-card v-for="item in courses" :key="item.id" :course="item" @edit="editCourse" @edit2="editDialog = true" />
    </v-layout>
  </v-container>

  <v-btn fab dark bottom right fixed color="indigo" v-if="editing" @click.stop="addDialog = true">
    <v-icon>add</v-icon>
  </v-btn>

  <v-dialog v-model="addDialog" width="500">
    <app-add-course @closed="addDialog = false" @added="getCourses" />
  </v-dialog>

  <v-dialog v-model="editDialog" width="500">
    <app-edit-course @closed="editDialog = false" @edited="refreshCourses" :course="courseToEdit" />
  </v-dialog>

</v-content>
</template>

<script>
import CourseBar from '@/components/home/CourseBar.vue';
import CourseCard from '@/components/home/CourseCard.vue';
import AddCourse from '@/components/home/AddCourse.vue';
import EditCourse from '@/components/home/EditCourse.vue';

export default {
  name: 'home',
  data() {
    return {
      courses: [],
      addDialog: false,
      editDialog: false,
      courseToEdit: {},
    };
  },
  components: {
    appCourseBar: CourseBar,
    appCourseCard: CourseCard,
    appAddCourse: AddCourse,
    appEditCourse: EditCourse,
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
    editCourse(course) {
      this.courseToEdit = course;
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
