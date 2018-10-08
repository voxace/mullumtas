<template>
<div class="course">
  <app-course-bar :title="course.title" />
  <v-container fluid grid-list-lg style="margin-top: 135px; margin-bottom: 40px;">
    <v-layout row wrap>
      <v-expansion-panel>
        <app-unit v-for="item in course.units" :key="item._id" :unit="item" @edited="refreshCourse" />
      </v-expansion-panel>
    </v-layout>
  </v-container>

  <v-dialog v-model="addDialog" width="500">
    <app-add-unit @closed="addDialog = false" @added="getCourse" :course="course" />
  </v-dialog>

  <v-speed-dial v-if="editing" v-model="fab" bottom right fixed direction="left" transition="slide-x-reverse-transition">
    <v-btn slot="activator" v-model="fab" color="indigo" dark fab>
      <v-icon>add</v-icon>
      <v-icon>close</v-icon>
    </v-btn>
    <v-btn dark round small color="indigo" class="ml-1 pl-0" @click="addDialog = true">
      Unit
    </v-btn>
    <v-btn dark round small color="indigo" class="mx-1 px-0">
      Section
    </v-btn>
    <v-btn dark round small color="indigo" class="mr-1">
      Resource
    </v-btn>
  </v-speed-dial>

</div>
</template>

<script>
import CourseBar from '@/components/course/CourseBar.vue';
import Unit from '@/components/course/Unit.vue';
import AddUnit from '@/components/course/AddUnit.vue';

export default {
  name: 'home',
  props: ['short'],
  components: {
    appCourseBar: CourseBar,
    appUnit: Unit,
    appAddUnit: AddUnit,
  },
  data() {
    return {
      fab: false,
      course: {},
      addDialog: false,
      unitToDelete: {},
    };
  },
  methods: {
    getCourse() {
      const vm = this;
      this.$http
        .get(`/course/short/${vm.short}/units`)
        .then(response => {
          vm.course = response.data;
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
