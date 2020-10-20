<template>
  <v-card>
    <v-card-title> {{ this.add_or_edit }} Artifact</v-card-title>
    <cv-form>
      <body>
        <cv-text-input
          label="Title"
          v-model="instance.title"
          placeholder="Enter the title of the artifact">
          invalid-message=""
          <template v-if="showInvalid.title" slot="invalid-message">
            Required field
          </template>
        </cv-text-input>

        <cv-text-input
          label="URL"
          v-model="instance.link_to_full_text"
          placeholder="Provide a link to the full text of the artifact">
          ></cv-text-input>

        <cv-text-area
          label="Summary"
          v-model="instance.summary"
          placeholder="Provide your own summary of the artifact">
          invalid-message=""
          <template v-if="showInvalid.summary" slot="invalid-message">
            Required field
          </template>
          ></cv-text-area>

        <cv-select
          label="Status"
          v-model="instance.status"
          placeholder="Choose an option">
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
      <cv-button kind="primary"
                 @click="addItem">{{ method === 'PUT' ? 'Save' : 'Add' }}
      </cv-button>
      <cv-button kind="secondary" style="float: right;"
                 @click="doCloseDialog">{{ method === 'PUT' ? 'Close' : 'Reset' }}
      </cv-button>
    </cv-form>
  </v-card>
</template>

<script>

export default {
  name: 'artifact-form',
  props: [
    'instance',
    'add_or_edit',
    'method',
  ],
  data() {
    return {
      showInvalid: { // These require validation.
        title: false,
        summary: false,
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
      if (this.method !== 'PUT') {
        this.instance.title = '';
        this.instance.summary = '';
        this.instance.link_to_full_text = '';
        this.instance.status = 'Choose an option';
        this.instance.date_introduced = '';
      }
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
    doCloseDialog() {
      this.doReset();
      if (this.method === 'PUT') {
        this.$emit('close-dialog', false);
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

        let url = '/api/v1/legislativeArtifacts';
        if (this.method === 'PUT') {
          url = `${url}/${body.id}`;
        } else {
          this.removeEmptyColumns(body); // Allows NULL and/or DEFAULT
        }

        const response = await fetch(url, {
          method: this.method,
          body: JSON.stringify(body),
          headers: { 'Content-type': 'application/json; charset=UTF-8' },
        });
        if (this.okStatus(response)) {
          this.$emit('saved-item', this.instance);
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
