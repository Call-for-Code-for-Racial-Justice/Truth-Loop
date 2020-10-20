<template>
  <v-app id="add-advocacy-groups" class="bx--content">
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

import AdvocacyGroupsForm from '../components/AdvocacyGroupsForm.vue';

export default {
  name: 'add-advocacy-groups',
  components: {
    'add-form': AdvocacyGroupsForm,
  },
  data() {
    return {
      instance: {
        name: '',
        description: '',
        email_address: '',
        phone_number: '',
        website_url: '',
      },
    };
  },
};
</script>
