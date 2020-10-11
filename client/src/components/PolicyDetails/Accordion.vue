<template>
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
          {{ policy.summary }}
        </p>
      </template>
    </cv-accordion-item>
    <cv-accordion-item :open="open[2]">
      <template slot="title">Status history</template>
      <template slot="content">
        <p>
          {{ policy.summary }}
        </p>
      </template>
    </cv-accordion-item>
    <cv-accordion-item :open="open[3]">
      <template slot="title">Related policies</template>
      <template slot="content">
        <p>
          {{ policy.summary }}
        </p>
      </template>
    </cv-accordion-item>
  </cv-accordion>
</template>

<script>
export default {
  name: "",
  props: {
    policy: Object,
  },
  methods: {
    open: () => {},
    actionChange: () => {},
  },
};
</script>
