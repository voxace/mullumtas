<template>
<v-content>
  <app-course-bar :title="course.title" />

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

  <v-container v-show="!isEmpty && !isLoadingScreen" fluid grid-list-lg>
    <v-layout row wrap>
      <v-expansion-panel>
        <app-unit v-for="item in course.units" :key="item._id" :unit="item" @edited="refreshCourse" />
      </v-expansion-panel>
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
    <v-speed-dial v-if="editing" v-model="fab" bottom right fixed direction="left" transition="slide-x-reverse-transition">
      <v-btn slot="activator" v-model="fab" color="indigo" dark fab>
        <v-icon>add</v-icon>
        <v-icon>close</v-icon>
      </v-btn>
      <v-btn dark round small color="indigo" class="ml-1 px-0" @click="addUnitDialog = true">Unit</v-btn>
      <v-btn dark round small color="indigo" class="mx-1 px-0" @click="addSectionDialog = true">Section</v-btn>
      <v-btn dark round small color="indigo" class="mr-1" @click="addResourceDialog = true">Resource</v-btn>
    </v-speed-dial>
  </bounce-transition>

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
      course: {},
      addUnitDialog: false,
      addSectionDialog: false,
      addResourceDialog: false,
      unitToDelete: {},
      dateModified: Date.now(),
      isLoadingScreen: true,
    };
  },
  methods: {
    getCourse() {
      const vm = this;
      this.$http
        .get(`/course/short/${vm.short}/units`)
        .then(response => {
          vm.course = response.data;
          this.isLoadingScreen = false;
        })
        .catch(err => {
          this.$store.dispatch('openErrorBar', 'An error occurred loading the course');
        });
    },
    deleteUnit(unit) {
      this.unitToDelete = unit;
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
  },
  created() {
    this.getCourse();
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
