<template>
<v-content>
  <app-course-bar :title="course.title" :grade="course.grade" :loading="isLoadingScreen" />

  <v-container v-if="isEmpty && !isLoadingScreen && allowedAccess" fluid fill-height grid-list-lg>
    <v-layout align-center justify-center>
      <div>Nothing to see here yet...</div>
    </v-layout>
  </v-container>

  <v-container v-else-if="isLoadingScreen" fluid fill-height grid-list-lg>
    <v-layout align-center justify-center>
      <v-progress-circular :size="70" :width="7" color="indigo" indeterminate></v-progress-circular>
    </v-layout>
  </v-container>

  <v-container v-else-if="!isEmpty && !isLoadingScreen && allowedAccess" fluid grid-list-lg>
    <v-layout row wrap>
      <v-expansion-panel>
        <app-unit v-for="item in course.units" :key="item._id" :unit="item" @edited="refreshCourse" :short="course.short" />
      </v-expansion-panel>
    </v-layout>
  </v-container>

  <v-container v-else-if="!allowedAccess" fluid fill-height grid-list-lg>
    <v-layout align-center justify-center>
      <div>To access this course you must be enrolled and logged in.</div>
    </v-layout>
  </v-container>

  <v-dialog v-model="addUnitDialog" width="500">
    <app-add-unit @closed="addUnitDialog = false" @added="refreshCourse" :course="course" />
  </v-dialog>

  <v-dialog v-model="addSectionDialog" width="500">
    <app-add-section @closed="addSectionDialog = false" @added="refreshCourse" :course="course" />
  </v-dialog>

  <v-dialog v-model="addResourceDialog" width="500">
    <app-add-resource @closed="addResourceDialog = false" @added="refreshCourse" :course="course" />
  </v-dialog>

  <bounce-transition appear="true">
    <v-speed-dial v-if="editing && isLoggedIn" v-model="fab" bottom right fixed direction="left" transition="slide-x-reverse-transition">
      <v-btn slot="activator" v-model="fab" color="indigo" dark fab>
        <v-icon>add</v-icon>
        <v-icon>close</v-icon>
      </v-btn>
      <v-btn dark round small color="indigo" class="ml-1 px-0" @click="addUnitDialog = true">Unit</v-btn>
      <v-btn dark round small color="indigo" class="mx-1 px-0" @click="addSectionDialog = true">Section</v-btn>
      <v-btn dark round small color="indigo" class="mr-1" @click="addResourceDialog = true">Resource</v-btn>
    </v-speed-dial>
  </bounce-transition>

  <v-navigation-drawer clipped="false" v-model="studentsDrawer" fixed style="padding-top: 130px" temporary>
    <v-text-field label="Add Student" v-model="newStudent" placeholder="Username" class="px-2 mt-3 mb-0" @keyup.enter="addStudent">
      <v-fade-transition slot="append">
        <v-progress-circular v-if="addStudentLoading" size="24" color="info" indeterminate></v-progress-circular>
      </v-fade-transition>
    </v-text-field>
    <v-list-tile v-for="student in students" @click.stop="" class="student">
      <v-list-tile-content>
        <v-list-tile-title>
          {{ student.detId }}
        </v-list-tile-title>
      </v-list-tile-content>
      <v-list-tile-action>
        <v-btn icon flat color="error" @click.stop="deleteStudent(student.detId)">
          <v-icon>delete</v-icon>
        </v-btn>
      </v-list-tile-action>
    </v-list-tile>
  </v-navigation-drawer>

</v-content>
</template>

<script>
import CourseBar from '@/components/course/CourseBar.vue';
import Unit from '@/components/course/Unit.vue';
import AddUnit from '@/components/course/AddUnit.vue';
import AddSection from '@/components/course/AddSection.vue';
import AddResource from '@/components/course/AddResource.vue';
import BounceTransition from '@/components/BounceTransition.vue';

export default {
  name: 'home',
  props: ['short'],
  components: {
    appCourseBar: CourseBar,
    appUnit: Unit,
    appAddUnit: AddUnit,
    appAddSection: AddSection,
    appAddResource: AddResource,
    BounceTransition: BounceTransition,
  },
  data() {
    return {
      fab: false,
      studentsDrawer: false,
      course: {},
      addUnitDialog: false,
      addSectionDialog: false,
      addResourceDialog: false,
      unitToDelete: {},
      dateModified: Date.now(),
      isLoadingScreen: true,
      students: [],
      newStudent: '',
      addStudentLoading: false,
    };
  },
  methods: {
    getCourse() {
      const vm = this;
      this.$http
        .get(`/course/short/${vm.short}/units`)
        .then(response => {
          vm.course = response.data;
          this.getStudents();
          this.isLoadingScreen = false;
        })
        .catch(err => {
          this.$store.dispatch('openErrorBar', 'An error occurred loading the course');
        });
    },
    deleteUnit(unit) {
      this.unitToDelete = unit;
    },
    addStudent() {
      if (this.newStudent != '') {
        this.addStudentLoading = true;
        const vm = this;
        let user = {
          detId: vm.newStudent,
          admin: false,
          courses: [vm.course._id],
        };
        this.$http
          .post('/user/course', user)
          .then(response => {
            this.getStudents();
            vm.newStudent = '';
            this.addStudentLoading = false;
          })
          .catch(err => {
            this.$store.dispatch('openErrorBar', 'An error occurred adding the student');
            this.addStudentLoading = false;
          });
      }
    },
    getStudents() {
      const vm = this;
      this.$http
        .get(`/user/course/${vm.course._id}`)
        .then(response => {
          vm.students = response.data;
        })
        .catch(err => {
          this.$store.dispatch('openErrorBar', 'An error occurred loading the students');
        });
    },
    deleteStudent(student) {
      const vm = this;
      vm.loading = true;
      this.$http
        .delete('/user/' + student + '/course/' + vm.course._id)
        .then(response => {
          this.getStudents();
          this.$store.dispatch('openSuccessBar', 'Delete Successful');
        })
        .catch(err => {
          this.$store.dispatch('openErrorBar', 'Error Deleting Unit');
        });
    },
    refreshCourse() {
      setTimeout(this.getCourse(), 500);
    },
  },
  computed: {
    editing() {
      return this.$store.getters.isEditing;
    },
    isEmpty() {
      if (this.course.units != null) {
        if (this.course.units.length == 0) {
          return true;
        } else {
          return false;
        }
      }
    },
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
    isLoggedIn() {
      return this.$store.getters.loggedIn;
    },
    globalStudentsDrawer: {
      get: function() {
        return this.$store.getters.isStudentsDrawerOpen;
      },
    },
    allowedAccess() {
      if (this.course.protected && !this.isAdmin) {
        if (this.isLoggedIn) {
          let member = false;
          this.students.forEach(student => {
            if (student.detId == this.$store.getters.username) {
              member = true;
            }
          });
          return member;
        } else {
          return false;
        }
      } else {
        return true;
      }
    },
  },
  watch: {
    studentsDrawer: function(val) {
      this.$store.dispatch('setStudentsDrawer', val);
      if (val == true) {
        this.getStudents();
      }
    },
    globalStudentsDrawer: function(val) {
      this.studentsDrawer = val;
    },
  },
  created() {
    this.getCourse();
    this.studentsDrawer = false;
    this.$store.dispatch('setStudentsDrawer', false);
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

.student:hover {
  background: #eee;
}
</style>
