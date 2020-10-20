<template>
  <v-app id="add-video-testimonials" class="bx--content">
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

import VideoTestimonialsForm from '../components/VideoTestimonialsForm.vue';

export default {
  name: 'add-video-testimonials',
  components: {
    'add-form': VideoTestimonialsForm,
  },
  data() {
    return {
      instance: {
        subject: '',
        comment: '',
        privacy_stmt_ack: false,
        video_cms_id: '',
      },
    };
  },
};
</script>
