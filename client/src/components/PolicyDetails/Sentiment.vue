<template>
  <div class="sentiment">
    <div class="bx--row">
      <div class="bx--col-10 title">COMMUNITY SENTIMENT</div>
      <div class="bx--col text-right">
        <Watson16 class="white-icon" />
      </div>
    </div>
    <Progress color="red" title="Negative" percent="15%" />
    <Progress color="blue" title="Netural" percent="65%" />
    <Progress color="yellow" title="Positive" percent="20%" />
  </div>
</template>

<script>
import Watson16 from "@carbon/icons-vue/lib/watson/16";
import Progress from './Progress.vue';

export default {
  name: "Policy",
  data() {
    return {};
  },
  components: {
    Progress,
    Watson16,
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "@/styles/carbon-overrides";

.sentiment {
  color: #fff;
  background: #000;
  padding: 20px;
  margin:0 -20px;
}
.title {
    padding-left: 35px;
}
svg.white-icon {
  fill: #fff;
  margin-top: -5px;
}
.text-right {
  text-align: right;
}
</style>
