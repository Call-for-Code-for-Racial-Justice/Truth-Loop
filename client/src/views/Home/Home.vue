<template>
<div class="bx--grid">
    <div class="bx--row">
      <div class="bx--col">
        <PolicyNotice />
        <PolicyTable :rows="rows"/>
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
  components: {
    PolicyNotice,
    PolicyTable,
  },
  data() {
    return {
      rows: PolicyDataList,
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>
