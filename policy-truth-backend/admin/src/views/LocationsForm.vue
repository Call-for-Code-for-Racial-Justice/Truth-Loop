<template>
  <div id="locations-form">
    <h2>Add Locations</h2>
    <cv-form @submit.prevent="addItem">
      <body>
        <cv-text-input
          label="Name"
          v-model="instance.name"
          placeholder="Enter the name of the location">
          invalid-message=""
          <template v-if="showInvalid.name" slot="invalid-message">
            Required field
          </template>
        </cv-text-input>

        <cv-text-input
          label="Short Name (UI)"
          v-model="instance.short_name_ui"
          placeholder="Provide a short name for the location">
          invalid-message=""
          <template v-if="showInvalid.short_name_ui" slot="invalid-message">
            Required field
          </template>
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
      showInvalid: { // These require validation.
        name: false,
        short_name_ui: false,
      },
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
    formInvalidator() {
      let formNotValid = false;
      const validating = Object.getOwnPropertyNames(this.showInvalid);
      for (let i = 0; i < validating.length; i += 1) {
        const item = validating[i];
        const itemNotValid = !this.instance[item];
        this.showInvalid[item] = itemNotValid;
        formNotValid = formNotValid || itemNotValid;
      }
      return formNotValid;
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
    removeEmptyColumns(obj) {
      const columns = Object.getOwnPropertyNames(obj);
      for (let i = 0; i < columns.length; i += 1) {
        const col = columns[i];
        if (obj[col] === '') {
          // eslint-disable-next-line no-param-reassign
          delete obj[col];
        }
      }
    },
    async addItem() {
      if (this.formInvalidator()) {
        return;
      }
      try {
        const body = { ...this.instance };
        this.removeEmptyColumns(body); // Allows NULL and/or DEFAULT

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
    color:antiquewhite;
  }
  .bx--label {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

</style>
