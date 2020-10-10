<template>
  <div class="bx--grid bx--grid--default policy-card">
    <div class="bx--row r1">
      <div class="bx--col-lg-12 bx--col-md-12 bx--col-sm-12">
        <div class="sentiment-bar">
          <div class="sentiment-bar-1"></div>
          <div class="sentiment-bar-2"></div>
          <div class="sentiment-bar-3"></div>
        </div>
      </div>
    </div>
    <div class="bx--row r2" @click="openPolicyDetails">
      <div class="bx--col-lg-4 bx--col-md-4 bx--col-sm-12 title">
        {{title}}
      </div>
      <div class="bx--col-lg-4 bx--col-md-4 bx--col-sm-12 summary">
        {{summary}}
      </div>
      <div class="bx--col-lg-4 bx--col-md-4 bx--col-sm-12 introdate">
        Introduced: {{getIntroDt}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Policy',
  props: {
    id: String,
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
  methods: {
    openPolicyDetails() {
      this.$router.push({ path: `/policy/${this.id}` });
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '@/styles/carbon-overrides';
  .policy-card {
    margin: 0;
    padding: 0;
    .r1 {
      .sentiment-bar{
        margin: 0;
        display: flex;
        flex-direction: row;
        width: 100%;
        @for $i from 1 through 3 {
          &-#{$i}{
            padding: $sentiment-bar-width-01 0 $sentiment-bar-width-01 0;
            background-color: map-get($map: $sentiment-color, $key: "0#{$i}");
            @if $i==2 {
              width: 40%;
            }@else{
              width: 30%;
            }
          }
        }
      }
    }
    .r2 {
      padding: $spacing-03 0 $spacing-03 0;
      //border-left: 1px solid $ui-03;
      box-shadow: 0px 1px 2px $ui-04;
      background-color: $ui-background;
      margin: 0;
      margin-bottom: $spacing-03;
    }
    .title{
      font-weight: bold;
    }
    .summary{
      cursor: pointer;
    }
  }
  @media screen and (max-width: 800px) {
    .policy-card {
      .summary{
        $h: $spacing-03;
        $v: $spacing-07;
        padding: $h $v $h $v;
      }
    }
  }
</style>
