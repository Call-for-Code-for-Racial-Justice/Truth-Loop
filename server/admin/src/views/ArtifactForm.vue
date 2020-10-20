<template>
  <v-app id="add-artifacts" class="bx--content">
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

import ArtifactForm from '../components/ArtifactForm.vue';

export default {
  name: 'add-artifacts',
  components: {
    'add-form': ArtifactForm,
  },
  data() {
    return {
      instance: {
        title: '',
        summary: '',
        link_to_full_text: '',
        date_introduced: '',
        status: 'Choose an option',
      },
    };
  },
};
</script>
