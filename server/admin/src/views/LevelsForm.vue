<template>
  <v-app id="add-levels" class="bx--content">
    <v-card class="maincard elevation-24">
      <add-form
        :instance="instance"
        add_or_edit="Add"
        method="POST"
      ></add-form>
    </v-card>
  </v-app>
</template>

<script>

import LevelsForm from '../components/LevelsForm.vue';

export default {
  name: 'add-levels',
  components: {
    'add-form': LevelsForm,
  },
  data() {
    return {
      instance: {
        name: '',
        description: '',
      },
    };
  },
};
</script>
