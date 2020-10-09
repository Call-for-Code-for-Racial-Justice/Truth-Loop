<template>
  <div id="artifact-form">
    <h2>Add Artifact</h2>
    <cv-form @submit.prevent="addArtifact">
      <body>
        <cv-text-input
          label="Title"
          v-model="instance.title"
          invalid-message=""
          placeholder="Enter the title of the artifact">
          <template v-if="useInvalidMessageSlot" slot="invalid-message">
            Required field
          </template>
        </cv-text-input>

        <cv-text-input
          label="URL"
          v-model="instance.link_to_full_text"
          placeholder="Provide a link to the full text of the artifact">
          ></cv-text-input>

        <cv-text-input
          label="Watson Video Channel ID"
          v-model="instance.video_cms_channel_id"
          placeholder="Provide the Watson Video channel ID">
          ></cv-text-input>

        <cv-text-area
          label="Summary"
          v-model="instance.summary"
          placeholder="Provide your own summary of the artifact">
          ></cv-text-area>

        <cv-select
          label="Status"
          v-model="instance.status"
          placeholder="Choose an option"
          :invalidStatusMessage="invalidStatusMessage">
          <cv-select-option disabled selected>Choose an option</cv-select-option>
          <cv-select-option>Introduced</cv-select-option>
          <cv-select-option>Referred</cv-select-option>
          <cv-select-option>Reported</cv-select-option>
          <cv-select-option>Failed</cv-select-option>
          <cv-select-option>Passed</cv-select-option>
          <cv-select-option>Enacted</cv-select-option>
          <cv-select-option>Vetoed</cv-select-option>
        </cv-select>

        <cv-date-picker
          date-label="Date introduced"
          kind="single"
          v-model="instance.date_introduced">
        </cv-date-picker>

      </body>
      <cv-toast-notification v-if="errorTitle"
                             kind="error"
                             :title="errorTitle"
                             :sub-title="errorSubTitle"
                             @close="doClose"
                             :close-aria-label="closeAriaLabel"
                             :low-contrast="lowContrast"></cv-toast-notification>
      <cv-toast-notification v-if="successTitle"
                             kind="success"
                             :title="successTitle"
                             :sub-title="successSubTitle"
                             @close="doClose"
                             :close-aria-label="closeAriaLabel"
                             :low-contrast="lowContrast"></cv-toast-notification>
              <cv-button>Add</cv-button>
              <cv-button style="background-color: grey; float: right;"
                         @click="doReset">Reset</cv-button>
    </cv-form>
  </div>
</template>

<script>

export default {
  name: 'artifact-form',
  data() {
    return {
      statusPlaceholder: 'Choose an option',
      instance: {
        title: '',
        summary: '',
        link_to_full_text: '',
        video_cms_channel_id: '',
        date_introduced: '',
        status: this.statusPlaceholder,
      },
      disabled: false,
      visible: false,
      status: '',
      invalidStatusMessage: false,
      useInvalidMessageSlot: false,
      errorTitle: false,
      errorSubTitle: '',
      successTitle: false,
      successSubTitle: '',
      closeAriaLabel: 'Custom close aria label',
      lowContrast: true,

      category: '',
      priority: '',
      categories: [
        'Equipment',
        'Service Access',
        'Facilities',
        'Other',
      ],

      statuses: [
        'INTRODUCED',
        'REFERRED',
        'REPORTED',
        'FAILED',
        'PASSED',
        'ENACTED',
        'VETOED',
      ],

    };
  },
  methods: {
    doReset() {
      this.errorTitle = false;
      this.errorSubTitle = false;
      this.successTitle = false;
      this.successSubTitle = false;
      this.instance.title = '';
      this.instance.summary = '';
      this.instance.link_to_full_text = '';
      this.instance.video_cms_channel_id = '';
      this.instance.status = this.statusPlaceholder;
      this.instance.date_introduced = '';
    },
    doClose() {
      if (this.successTitle) {
        this.doReset();
      } else {
        this.errorTitle = false;
        this.errorSubTitle = false;
        this.successTitle = false;
        this.successSubTitle = false;
      }
    },
    titleValidator() {
      this.useInvalidMessageSlot = !this.instance.title;
      return !this.useInvalidMessageSlot;
    },
    okStatus(res) {
      if (res.status >= 200 && res.status < 300) {
        this.successTitle = res.statusText;
        this.successSubTitle = `HTTP Status Code: ${res.status}`;
        return true;
      }
      this.errorTitle = res.statusText;
      this.errorSubTitle = `HTTP Status Code: ${res.status}`;
      return false;
    },
    async addArtifact() {
      if (!this.titleValidator()) {
        return;
      }
      try {
        const body = { ...this.instance };
        if (body.status === this.statusPlaceholder) {
          delete body.status;
        }
        if (body.summary === '') {
          delete body.summary;
        }
        if (body.date_introduced === '') {
          delete body.date_introduced;
        }
        if (body.link_to_full_text === '') {
          delete body.link_to_full_text;
        }
        if (body.video_cms_channel_id === '') {
          delete body.video_cms_channel_id;
        }
        const response = await fetch('http://localhost:5000/api/v1/legislativeArtifact', {
          method: 'POST',
          body: JSON.stringify(body),
          headers: { 'Content-type': 'application/json; charset=UTF-8' },
        });
        if (this.okStatus(response)) {
          await response.json();
        }
      } catch (error) {
        this.errorTitle = error;
        this.errorSubTitle = '';
        console.error(error);
      }
    },
  },
};
</script>

<style>

  body {
    margin: 1rem 1rem 1rem 0;
  }
  .bx--label {
    margin: 1rem 0 0 0;
  }

</style>
