<template>
  <div>
    <div class="bx--grid policy">
      <div class="bx--row">
        <div class="bx--col">
          <ChevronLeft32 @click="goHistoryBack()" />
        </div>
      </div>
      <div class="bx--row">
        <div class="bx--col">
          <h6 class="light-text">Federal</h6>
        </div>
      </div>
      <div class="bx--row">
        <div class="bx--col">
          <h3>{{ policy.title }}</h3>
        </div>
      </div>
      <div class="bx--row">
        <div class="bx--col">
          <h6 class="light-text">{{policy.officials[0].name}}</h6>
        </div>
        <div class="bx--col">
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
      <div class="bx--row">
        <cv-accordion @change="actionChange" ref="acc">
          <cv-accordion-item :open="open[0]">
            <template slot="title">Summary</template>
            <template slot="content">
              <p>{{ policy.summary }}</p>
            </template>
          </cv-accordion-item>
          <cv-accordion-item :open="open[1]">
            <template slot="title">Officials and sponsors</template>
            <template slot="content">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore e dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </template>
          </cv-accordion-item>
          <cv-accordion-item :open="open[2]">
            <template slot="title">Status history</template>
            <template slot="content">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </template>
          </cv-accordion-item>
          <cv-accordion-item :open="open[3]">
            <template slot="title">Related policies</template>
            <template slot="content">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </template>
          </cv-accordion-item>
        </cv-accordion>
      </div>
    </div>

    <cv-button kind="primary" icon="img/video--add.svg" class="fixed-btn lower-btn"
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
import ChevronLeft32 from '@carbon/icons-vue/lib/chevron--left/32';
import policy from "../../mockdata/CURRENT_FULL_RETRIEVAL_OF_ARTIFACT_1";

export default {
  name: "Policy",
  data() {
    return {
      policy,
    };
  },
  components: {
    ChevronLeft32,
  },
  methods: {
    goHistoryBack() {
      this.$router.go(-1);
    },
    open: () => {},
    actionChange: () => {},
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
  .light-text {
    color: #a8a8a8;
    font-size: 0.875 rem;
  }
  .bx--row {
    margin: $spacing-02 0;
  }
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
