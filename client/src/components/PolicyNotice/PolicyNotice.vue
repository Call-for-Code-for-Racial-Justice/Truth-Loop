<template>
    <div>
      <cv-modal ref="modal_privacy"
      @modal-shown="actionShown"
      @modal-hidden="actionHidden"
      @modal-hide-request="hideModal"
      @primary-click="showModal"
      auto-hide-off visible>
      <template slot="label">label</template>
      <template slot="title">A Title</template>
      <template slot="content">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, seed
          do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
        </p>
      </template>
      <!-- <template slot="secondary-button">Canel</template> -->
      <template slot="primary-button">Accept</template>
    </cv-modal>
  </div>
</template>

<script>
export default {
  name: 'PolicyNotice',
  computed: {
    privacy_accepted() {
      const prvc = this.$store.getters["privacystore/getPrivacyAccept"];
      return prvc;
    },
  },
  data() {
    return {};
  },
  methods: {
    actionShown() {
      console.log("modal on");
    },
    actionHidden() {
      console.log("modal off");
    },
    showModal() {
      this.$refs.modal_privacy.hide();
      this.$store.dispatch("privacystore/updatePrivacyAccept", {
        privacy_accepted: true,
      });
      console.log("modal show");
    },
    hideModal() {
      this.$refs.modal_privacy.hide();
      this.$store.dispatch("privacystore/updatePrivacyAccept", {
        privacy_accepted: false,
      });
      console.log("modal hide");
    },
  },
  mounted() {
    console.log("modal created ");
  },
};
</script>

<style lang="scss" scoped>

</style>
