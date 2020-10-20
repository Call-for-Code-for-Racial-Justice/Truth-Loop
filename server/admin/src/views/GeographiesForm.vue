<template>
  <v-app id="add-geographies" class="bx--content">
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

import GeographiesForm from '../components/GeographiesForm.vue';

export default {
  name: 'add-geographies',
  components: {
    'add-form': GeographiesForm,
  },
  data() {
    return {
      instance: {
        name: '',
        short_name_ui: '',
        description: '',
      },
    };
  },
};
</script>
