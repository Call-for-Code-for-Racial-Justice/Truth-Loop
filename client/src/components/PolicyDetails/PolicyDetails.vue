<template>
  <div>
    <div class="bx--grid policy" v-if="policy">
      <!-- <div class="bx--row">
        <div class="bx--col">
          <ChevronLeft20 class="back" @click="goHistoryBack()" />
        </div>
      </div> -->
      <div class="bx--row">
        <div class="bx--col">
          <h6 class="light-text">Federal</h6>
        </div>
      </div>
      <div class="bx--row">
        <div class="bx--col">
          <h4>{{ policy.title }}</h4>
        </div>
      </div>
      <div class="bx--row">
        <div class="bx--col">
          <h6 class="light-text">{{ policy.officials.length > 0 ? policy.name : '' }}</h6>
        </div>
        <div class="bx--col text-right">
          <h6 class="light-text">
            Introduced: {{ getIntroDt(policy.date_introduced) }}
          </h6>
        </div>
      </div>
      <div class="bx--row">
        <div class="bx--col">
          <h6 class="light-text">{{ policy.status }}</h6>
        </div>
      </div>
      <div class="bx--row launch">
        <div class="bx--col">
          <h5>
            <a href="#">Full Text <Launch16 /></a>
          </h5>
        </div>
      </div>
      <Sentiment />
      <div class="bx--row" v-if="policy">
        <Accordion :policy="policy" />
      </div>
    </div>

    <cv-button
      kind="primary"
      icon="img/video--add.svg"
      class="fixed-btn lower-btn"
      >Tell my story</cv-button
    >
    <cv-button
      kind="secondary"
      icon="img/video--filled.svg"
      class="fixed-btn bottom-btn"
      >See policy testimonials</cv-button
    >
  </div>
</template>

<script>
// import ChevronLeft20 from "@carbon/icons-vue/lib/chevron--left/20";
import Launch16 from "@carbon/icons-vue/lib/launch/16";
import Accordion from "./Accordion.vue";
import Sentiment from "./Sentiment.vue";

export default {
  name: "Policy",
  props: {
    policy: Object,
  },
  components: {
    // ChevronLeft20,
    Launch16,
    Accordion,
    Sentiment,
  },
  methods: {
    goHistoryBack() {
      this.$router.go(-1);
    },
    getIntroDt(dateIntroduced) {
      const dt = new Date(dateIntroduced);
      return `${dt.getMonth()}-${dt.getDate()}-${dt.getFullYear()}`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/carbon-overrides";

.policy {
  h4 {
    margin-bottom: 10px;
  }
  .light-text {
    color: #a8a8a8;
    font-size: 0.875 rem;
  }
  .text-right {
    text-align: right;
  }
  .launch {
    padding: 10px 0;
    h5 {
      font-weight: normal;
      a {
        text-decoration: none;
      }
    }
    svg {
      fill: #0062ff;
      margin: 0 0 -3px 30px;
    }
  }
}
svg.back {
  fill: #0062ff;
  margin: 10px 0;
}
.fixed-btn {
  width: 100%;
  max-width: 100%;
  position: fixed;
  &.bottom-btn {
    bottom: 0px;
  }
  &.lower-btn {
    bottom: 48px;
  }
}
</style>
