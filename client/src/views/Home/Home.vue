<template>
  <div class="home-content">
  <div class="bx--grid">
    <div class="bx--row">
      <div class="bx--col">
        <div v-if="privacy_cancelled" class="privacy-cancel-content">
          <h5>Please accept the Privacy Statement.</h5>
          <p>Sorry! content is not available without accepting the privacy policy.
          <br>Please refresh this page and accept the privacy statement.</p>
        </div>
        <PolicyNotice />
        <div v-if="privacy_accepted">
          <PolicyTable :rows="rows"/>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import PolicyNotice from '@/components/PolicyNotice';
import PolicyTable from '@/components/PolicyTable';
import PolicyDataList from '@/data/PolicyDataList';

export default {
  name: "Home",
  computed: {
    privacy_accepted() {
      const prvc = this.$store.getters["privacystore/getPrivacyAccept"];
      // console.log(`home : ${prvc}`);
      return prvc;
    },
    privacy_cancelled() {
      const prvc = this.$store.getters["privacystore/getPrivacyCancel"];
      return prvc;
    },
  },
  components: {
    PolicyNotice,
    PolicyTable,
  },
  data() {
    return {
      rows: PolicyDataList,
    };
  },
  methods: {
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/carbon-overrides';

.home-content{
  display: flex;
  width: 100%;
  justify-content: center;
  .privacy-cancel-content{
    $h: $spacing-05 * 5;
    $v: $spacing-05 ;
    margin: auto;
    padding: $h $v $h $v;
  }
}
</style>
