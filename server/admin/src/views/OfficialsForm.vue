<template>
  <v-app id="add-officials" class="bx--content">
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

import OfficialsForm from '../components/OfficialsForm.vue';

export default {
  name: 'add-officials',
  components: {
    'add-form': OfficialsForm,
  },
  data() {
    return {
      instance: {
        name: '',
        title: '',
        email_address: '',
        phone_number: '',
        website_url: '',
      },
    };
  },
};
</script>
