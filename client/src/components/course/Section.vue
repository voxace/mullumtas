<template>
<v-list class="mb-0 pb-0" subheader>

  <v-subheader>
    <h2>Tasks</h2>
  </v-subheader>

  <v-list-tile @click="" v-for="i in 3">

    <v-list-tile-avatar size="28">
      <v-icon size="22" class="blue white--text">assignment</v-icon>
    </v-list-tile-avatar>

    <v-list-tile-content>
      Assignment {{i}}
    </v-list-tile-content>

    <v-list-tile-action>
      <v-checkbox></v-checkbox>
    </v-list-tile-action>

  </v-list-tile>

</v-list>
</template>

<script>
export default {

}
</script>

<style>

</style>
