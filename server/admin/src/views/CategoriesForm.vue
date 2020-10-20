<template>
  <v-app id="add-categories" class="bx--content">
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

import CategoriesForm from '../components/CategoriesForm.vue';

export default {
  name: 'add-categories',
  components: {
    'add-form': CategoriesForm,
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
