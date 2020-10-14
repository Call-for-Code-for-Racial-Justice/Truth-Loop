<template>
  <div id="advocacy-groups-form" class="bx--content">
    <v-card class="elevation-24">
      <v-card-title>Add Advocacy Groups</v-card-title>
    <cv-form @submit.prevent="addItem">
      <body>
        <cv-text-input
          label="Name"
          v-model="instance.name"
          invalid-message=""
          placeholder="Enter the name of the advocacy group">
          <template v-if="showInvalid.name" slot="invalid-message">
            Required field
          </template>
        </cv-text-input>

        <cv-text-input
          label="Description"
          v-model="instance.description"
          invalid-message=""
          placeholder="Provide a description for the advocacy group">
          <template v-if="showInvalid.description" slot="invalid-message">
            Required field
          </template>
        </cv-text-input>

        <cv-text-input
          label="Email Address"
          v-model="instance.email_address"
          placeholder="Provide an email address for the advocacy group">
          ></cv-text-input>

        <cv-text-input
          label="Phone Number"
          v-model="instance.phone_number"
          placeholder="Provide a phone number for the advocacy group">
          ></cv-text-input>

        <cv-text-input
          label="URL"
          v-model="instance.website_url"
          placeholder="Provide the URL of the advocacy group's web site">
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
    </v-card>
  </div>
</template>

<script>

export default {
  name: 'advocacy-groups-form',
  data() {
    return {
      instance: {
        name: '',
        description: '',
        email_address: '',
        phone_number: '',
        website_url: '',
      },
      disabled: false,
      visible: false,
      status: '',
      invalidStatusMessage: false,
      showInvalid: { // These require validation.
        name: false,
        description: false,
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
      this.instance.description = '';
      this.instance.email_address = '';
      this.instance.phone_number = '';
      this.instance.website_url = '';
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

        const response = await fetch('/api/v1/advocacyGroups', {
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

  .v-card {
    padding: 1rem;
  }
  .bx--btn {
    margin: 1rem 0 0 0;
    color:antiquewhite;
  }
  .bx--label {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

</style>
