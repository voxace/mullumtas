<template>
<div class="course">
  <app-course-bar :title="course.title" />
  <v-container fluid fill-height grid-list-lg>
    <v-layout row wrap>
      <v-expansion-panel>
        <app-unit v-for="item in course.units" :key="item._id" :unit="item" />
      </v-expansion-panel>
    </v-layout>
  </v-container>
</div>
</template>

<script>
import CourseBar from '@/components/course/CourseBar.vue';
import Unit from '@/components/course/Unit.vue';

export default {
  name: 'home',
  props: ['short'],
  components: {
    appCourseBar: CourseBar,
    appUnit: Unit,
  },
  data() {
    return {
      course: {},
    };
  },
  methods: {
    getCourse() {
      var vm = this;
      this.$http
        .get('/course/short/' + vm.short + '/units')
        .then(response => {
          vm.course = response.data;
        })
        .catch(err => {
          console.log('Error: ' + err);
        });
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
