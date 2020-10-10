<template>
    <div>
      <cv-modal ref="modal_privacy"
      @modal-shown="actionShown"
      @modal-hidden="actionHidden"
      @modal-hide-request="privacyCancelled"
      @primary-click="privacyAccepted"
      auto-hide-off visible>
      <template slot="label"><h5>Please Accept the Privacy Statement</h5></template>
      <template slot="title">Policy Truth Project</template>
      <template slot="content">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, seed
          do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
        </p>
      </template>
      <template slot="secondary-button">Canel</template>
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
    privacy_cancelled() {
      const prvc = this.$store.getters["privacystore/getPrivacyCancel"];
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
    privacyAccepted() {
      this.$refs.modal_privacy.hide();
      this.$store.dispatch("privacystore/updatePrivacyAccept", {
        privacy_accepted: true,
        privacy_cancelled: false,
      });
      console.log("modal show");
    },
    privacyCancelled() {
      this.$refs.modal_privacy.hide();
      this.$store.dispatch("privacystore/updatePrivacyAccept", {
        privacy_accepted: false,
        privacy_cancelled: true,
      });
      console.log("modal hide");
    },
  },
  mounted() {
    if (this.privacy_accepted) this.$refs.modal_privacy.hide();
    console.log("modal created ");
  },
};
</script>

<style lang="scss" scoped>

</style>
