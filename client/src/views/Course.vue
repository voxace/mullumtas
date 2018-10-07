<template>
<div class="course">
  <app-course-bar :title="course.title" />
  <v-container fluid grid-list-lg style="margin-top: 135px; margin-bottom: 40px;">
    <v-layout row wrap>
      <v-expansion-panel>
        <app-unit v-for="item in course.units" :key="item._id" :unit="item" />
      </v-expansion-panel>
    </v-layout>
  </v-container>

  <v-btn fab dark bottom right fixed color="indigo" v-if="editing" @click.stop="dialog = true">
    <v-icon>add</v-icon>
  </v-btn>

  <v-dialog v-model="dialog" width="500">
    <app-add-unit @closed="dialog = false" @added="getCourse" :course="course" />
  </v-dialog>

  <v-dialog v-model="deleteDialog" width="500">
    <app-delete-unit @closed="deleteDialog = false" @deleted="refreshCourse" :course="unitToDelete" />
  </v-dialog>

</div>
</template>

<script>
import CourseBar from '@/components/course/CourseBar.vue';
import Unit from '@/components/course/Unit.vue';
import AddUnit from '@/components/course/AddUnit.vue';
import DeleteUnit from '@/components/course/DeleteUnit.vue';

export default {
  name: 'home',
  props: ['short'],
  components: {
    appCourseBar: CourseBar,
    appUnit: Unit,
    appAddUnit: AddUnit,
    appDeleteUnit: DeleteUnit,
  },
  data() {
    return {
      course: {},
      dialog: false,
      deleteDialog: false,
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
