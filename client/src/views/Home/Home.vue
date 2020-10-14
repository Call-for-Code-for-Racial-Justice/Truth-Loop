<template>
  <div class="home-content">
  <div class="bx--grid bx--grid--full-width bx--grid--no-gutter ">
    <div class="bx--row">
      <div class="bx--col">
        <div v-if="privacy_cancelled" class="privacy-cancel-content">
          <h5>Please accept the Privacy Statement.</h5>
          <p>Sorry! content is not available without accepting the privacy policy.
          <br>Please refresh this page and accept the privacy statement.</p>
        </div>
        <PolicyNotice />
        <div v-if="privacy_accepted">
          <PolicyTable
          :rows="pageRows"
          :totalRows="rows.length"
          @pagination="onPagination" />
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
    rows() {
      const datalist = this.$store.getters["policyliststore/getItems"];
      return datalist;
    },
    pageRows() {
      console.log(`paging-2 : length=${this.pageSize} start=${this.pageStart} page=${this.page} `);
      const datalist = this.rows.slice(this.pageStart, this.pageStart + this.pageSize);
      return datalist;
    },
  },
  components: {
    PolicyNotice,
    PolicyTable,
  },
  data() {
    return {
      pageSize: 0,
      pageStart: 0,
      page: 0,
    };
  },
  methods: {
    onPagination(val) {
      console.log(`paging-1 : length=${val.length} start=${val.start} page=${val.page} `);
      this.pageSize = val.length;
      this.pageStart = Math.max(0, val.start - 1);
      this.page = val.page;
    },
  },
  mounted() {
    PolicyDataList.fetchPolicyDataList(this.$store);
    this.$store.dispatch("appsettingstore/updateAppSettings", {
      apptitle: "Policy Legislation Reform",
      topbar: {
        hasBack: false,
        hasSettings: true,
      },
    });
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
