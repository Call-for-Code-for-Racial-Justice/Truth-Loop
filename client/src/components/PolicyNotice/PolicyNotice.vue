<template>
    <div>
      <cv-modal ref="modal_privacy"
      @modal-shown="actionShown"
      @modal-hidden="actionHidden"
      @modal-hide-request="privacyCancelled"
      @primary-click="privacyAccepted"
      auto-hide-off visible>
      <template slot="label"><h5>Please Accept the Privacy Statement</h5></template>
      <template slot="title">Truth Loop Project</template>
      <template slot="content">
        <p>
        The "IMPLEMENTER" will process your personal information on the basis of consent and
        legitimate interest
        <br/>By uploading your video and audio content via the "Truth Loops" Platform, you consent
        to the "IMPLEMENTER" using your personal information for Purpose.  We confirm that
        your consent includes the following:
        <cv-list :ordered="false" class="bullet-list">
          <cv-list-item>Your provision of your personal information is unconditional.
            And you may withdraw your consent at any time;</cv-list-item>
          <cv-list-item>The Purpose of providing your PI is to make the
            video content available to legislators, policy makers,
          advocacy groups, the media, and social media to advance the
          cause of ending racial discrimination and injustice;</cv-list-item>
          <cv-list-item>You only need to consent to the actual personal information
            that exists within your content which you
          upload to the Platform.  No other personal information is requested
          or required of you;</cv-list-item>
          <cv-list-item>Your uploading of the content is an indication of your
            wishes to make use
            of your personal information for the Purpose.</cv-list-item>
        </cv-list>
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
@import '@/styles/carbon-overrides';
.bullet-list{
  padding-left: $spacing-07;
}
</style>
