<template>
<div class="app-top-bar">
    <div class="left-panel">
        <ChevronLeft20 v-if="this.topbar.hasBack"
         class="back" @click="goHistoryBack()"/>
    </div>
    <div class="title">{{this.apptitle}}</div>
    <div class="right-panel" v-if="this.topbar.hasSettings"><SettingsAdjust20 /></div>
</div>
</template>

<script>
import ChevronLeft20 from "@carbon/icons-vue/lib/chevron--left/20";
import SettingsAdjust20 from "@carbon/icons-vue/lib/settings--adjust/20";

export default {
  computed: {
    apptitle() {
      return this.$store.getters["appsettingstore/getAppTitle"];
    },
    topbar() {
      return this.$store.getters["appsettingstore/getTopBarSettings"];
    },
  },
  components: {
    ChevronLeft20,
    SettingsAdjust20,
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

.app-top-bar {
    display: flex;
    width: 100%;
    flex-direction: row;
    padding: $spacing-03 $spacing-03;
    .left-panel{
        width: 20%;
        text-align: left;
    }
    .title{
        width: 60%;
        text-align: center;
        font-weight: bold;
    }
    .right-panel{
        width: 20%;
        text-align: right;
    }
}

</style>
