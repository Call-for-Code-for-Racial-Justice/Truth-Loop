<template>
  <div>
    <div class="bx--grid policy">
      <div class="bx--row">
        <div class="bx--col">
          <cv-icon-button
            kind="secondary"
            icon="img/chevron--left.svg"
            class="back-btn"
          />
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

    <cv-button kind="primary" icon="img/video--add.svg" class="lower-button"
      >Tell my story</cv-button
    >
    <cv-button
      kind="secondary"
      icon="img/video--filled.svg"
      class="bottom-button"
      >See policy testimonials</cv-button
    >
  </div>
</template>

<script>
import policy from "../../mockdata/CURRENT_FULL_RETRIEVAL_OF_ARTIFACT_1";

export default {
  name: "Policy",
  data() {
    return {
      policy,
    };
  },
  components: {},
  methods: {
    open: () => {
      console.log("open");
    },
    actionChange: () => {
      console.log("action");
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
  .light-text {
    color: #a8a8a8;
    font-size: 0.875 rem;
  }
  .bx--row {
    margin: $spacing-03 0;
  }
}

.back-btn {
  background: white;
}
.bottom-button {
  width: 100%;
  max-width: 100%;
  position: fixed;
  bottom: 0px;
}

.lower-button {
  width: 100%;
  max-width: 100%;
  position: fixed;
  bottom: 48px;
}
</style>
