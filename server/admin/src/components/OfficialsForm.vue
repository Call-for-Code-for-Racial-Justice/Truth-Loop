<template>
  <v-card>
    <v-card-title> {{ this.add_or_edit }} Official</v-card-title>
    <cv-form>
      <body>
        <cv-text-input
          label="Name"
          v-model="instance.name"
          invalid-message=""
          placeholder="Enter the name of the official">
          <template v-if="showInvalid.name" slot="invalid-message">
            Required field
          </template>
        </cv-text-input>

        <cv-text-input
          label="Title"
          v-model="instance.title"
          invalid-message=""
          placeholder="Enter the title of the official">
          <template v-if="showInvalid.title" slot="invalid-message">
            Required field
          </template>
        </cv-text-input>

        <cv-text-input
          label="Email Address"
          v-model="instance.email_address"
          placeholder="Provide an email address for the official">
          ></cv-text-input>

        <cv-text-input
          label="Phone Number"
          v-model="instance.phone_number"
          placeholder="Provide an phone number for the official">
          ></cv-text-input>

        <cv-text-input
          label="URL"
          v-model="instance.website_url"
          placeholder="Provide the URL of the official's web site">
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
  name: 'officials-form',
  props: [
    'instance',
    'add_or_edit',
    'method',
  ],
  data() {
    return {
      showInvalid: { // These require validation.
        name: false,
        title: false,
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
        this.instance.name = '';
        this.instance.title = '';
        this.instance.email_address = '';
        this.instance.phone_number = '';
        this.instance.website_url = '';
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

        let url = '/api/v1/officials';
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
