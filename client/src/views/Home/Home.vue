<template>
  <div class="home-content">
  <div class="bx--grid">
    <div class="bx--row">
      <div class="bx--col">
        <div v-if="!privacy_accepted">Please accept privacy</div>
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
      console.log(`home : ${prvc}`);
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
};
</script>

<style lang="scss" scoped>
.home-content{
  display: flex;
  width: 100%;
  justify-content: center;
}
</style>
