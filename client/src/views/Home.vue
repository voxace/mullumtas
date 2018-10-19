<template>
<v-content>
  <app-course-bar />

  <v-container v-if="isEmpty && !isLoadingScreen" fluid fill-height grid-list-lg>
    <v-layout align-center justify-center>
      <div>Nothing to see here yet...</div>
    </v-layout>
  </v-container>

  <v-container v-else-if="isLoadingScreen" fluid fill-height grid-list-lg>
    <v-layout align-center justify-center>
      <v-progress-circular :size="70" :width="7" color="indigo" indeterminate></v-progress-circular>
    </v-layout>
  </v-container>

  <v-container v-show="!isEmpty && !isLoadingScreen" fluid fill-height grid-list-lg>
    <v-layout row wrap>
      <app-course-card v-for="item in courses" :key="item.id" :course="item" @edit="editCourse" @edit2="editDialog = true" />
    </v-layout>
  </v-container>

  <bounce-transition appear="true">
    <v-btn fab dark bottom right fixed color="indigo" v-if="editing && isLoggedIn && isAdmin" @click.stop="addDialog = true">
      <v-icon>add</v-icon>
    </v-btn>
  </bounce-transition>

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
import BounceTransition from '@/components/transitions/BounceTransition.vue';

export default {
  name: 'home',
  data() {
    return {
      courses: [],
      addDialog: false,
      editDialog: false,
      courseToEdit: {},
      isLoadingScreen: true,
    };
  },
  components: {
    appCourseBar: CourseBar,
    appCourseCard: CourseCard,
    appAddCourse: AddCourse,
    appEditCourse: EditCourse,
    BounceTransition: BounceTransition,
  },
  methods: {
    getCourses() {
      const vm = this;
      this.$http
        .get('/courses')
        .then(response => {
          vm.courses = response.data;
          this.isLoadingScreen = false;
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
    isEmpty() {
      if (this.courses.length == 0) {
        return true;
      } else {
        return false;
      }
    },
    isLoggedIn() {
      return this.$store.getters.loggedIn;
    },
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
  },
  created() {
    this.$store.dispatch('setFullScreen', false);
    this.getCourses();
  },
};
</script>
