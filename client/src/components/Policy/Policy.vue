<template>
  <div class="bx--grid policy-card">
    <div class="bx--row r1">
      <div class="bx--col-lg-4 bx--col-md-8 bx--col-sm-16"> {{title}} </div>
    </div>
    <div class="bx--row r2">
      <div class="bx--col-lg-4 bx--col-md-8 bx--col-sm-16"> {{summary}} </div>
    </div>
    <div class="bx--row r3">
      <div class="bx--col-lg-4 bx--col-md-8 bx--col-sm-16">
        Introduced: {{getIntroDt}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Policy',
  props: {
    id: Number,
    title: String,
    summary: String,
    date_introduced: String,
  },
  computed: {
    getIntroDt() {
      const dt = new Date(this.date_introduced);
      return `${dt.getMonth()}-${dt.getDate()}-${dt.getFullYear()}`;
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
  @import '@/styles/carbon-overrides';
  .policy-card {
    padding: $spacing-03 $spacing-03 $spacing-03 $spacing-03;
    background-color: $ui-background;
    .r1, .r2, .r3 {
      padding-top: $spacing-03;
    }
  }
</style>
