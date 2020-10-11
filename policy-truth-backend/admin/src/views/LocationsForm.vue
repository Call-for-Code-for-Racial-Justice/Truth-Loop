<template>
  <div id="locations-form">
    <h2>Add Locations</h2>
    <cv-form @submit.prevent="addItem">
      <body>
        <cv-text-input
          label="Name"
          v-model="instance.name"
          invalid-message=""
          placeholder="Enter the name of the location">
          <template v-if="useInvalidMessageSlot" slot="invalid-message">
            Required field
          </template>
        </cv-text-input>

        <cv-text-input
          label="Short Name (UI)"
          v-model="instance.short_name_ui"
          placeholder="Provide a short name for the location">
          ></cv-text-input>

        <cv-text-input
          label="Description"
          v-model="instance.description"
          placeholder="Provide a description of the location">
          ></cv-text-input>

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
              <cv-button kind="primary">Add</cv-button>
              <cv-button kind="secondary" style="float: right;"
                         @click="doReset">Reset</cv-button>
    </cv-form>
  </div>
</template>

<script>

export default {
  name: 'location-form',
  data() {
    return {
      instance: {
        name: '',
        short_name_ui: '',
        description: '',
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
    };
  },
  methods: {
    doReset() {
      this.errorTitle = false;
      this.errorSubTitle = false;
      this.successTitle = false;
      this.successSubTitle = false;
      this.instance.name = '';
      this.instance.short_name_ui = '';
      this.instance.description = '';
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
    formValidator() {
      this.useInvalidMessageSlot = !this.instance.name;
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
    async addItem() {
      if (!this.formValidator()) {
        return;
      }
      try {
        const body = { ...this.instance };
        if (body.status === this.statusPlaceholder) {
          delete body.status;
        }
        if (body.short_name_ui === '') {
          delete body.short_name_ui;
        }
        if (body.description === '') {
          delete body.description;
        }
        const response = await fetch('/api/v1/geospatialDefinitions', {
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

  .bx--btn {
    margin: 1rem 0 0 0;
  }
  .bx--label {
    margin: 1rem 0 0 0;
  }

</style>
