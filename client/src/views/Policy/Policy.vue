<template>
    <div class="policy-detail-content">
        <div class="bx--grid">
            <div class="bx--row">
                <div class="bx--col-1">
                    <!-- <ChevronLeft32 /> -->
                    <ArrowLeft32 @click="goHistoryBack()" />
                </div>
                <div class="bx--col-15 title">
                    <h5>Policy Detail - ID: {{$route.params.policyid}}</h5>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import ChevronLeft32 from '@carbon/icons-vue/lib/chevron--left/32';
import ArrowLeft32 from '@carbon/icons-vue/lib/arrow--left/32';

export default {
  components: {
    // ChevronLeft32,
    ArrowLeft32,
  },
  methods: {
    goHistoryBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/carbon-overrides';

.policy-detail-content{
    .title{
        padding-top: $spacing-02;
        padding-left: $spacing-05;
    }
}
</style>
