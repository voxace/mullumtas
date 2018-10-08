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

  <v-btn fab dark bottom right fixed color="indigo" v-if="editing" @click.stop="addDialog = true">
    <v-icon>add</v-icon>
  </v-btn>

  <v-dialog v-model="addDialog" width="500">
    <app-add-unit @closed="addDialog = false" @added="getCourse" :course="course" />
  </v-dialog>

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
