<template>
  <div id="levels-form" class="bx--content">
    <v-card class="elevation-24">
      <v-card-title>Add Levels</v-card-title>
    <cv-form @submit.prevent="addItem">
      <body>
        <cv-text-input
          label="Name"
          v-model="instance.name"
          invalid-message=""
          placeholder="Enter the name of the level">
          <template v-if="useInvalidMessageSlot" slot="invalid-message">
            Required field
          </template>
        </cv-text-input>

        <cv-text-input
          label="Description"
          v-model="instance.description"
          placeholder="Provide a description of the level">
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
  name: 'levels-form',
  data() {
    return {
      instance: {
        name: '',
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
      if (!this.formInvalidator()) {
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
        const response = await fetch('/api/v1/levels', {
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
