<template>
  <div>
    <cv-grid class="policy-table">
      <cv-row class="policy-title-row">
        <cv-column>
          {{`POLICIES (${this.totalRows})`}}
        </cv-column>
      </cv-row>
      <cv-row class="policy-row"
          v-for="(row, rowIndex) in this.datarows"
          :key="`${rowIndex}`">
        <cv-column class="policy-cell">
            <Policy :id="`${row.data.id}`"
            :title="`${row.data.title}`"
            :summary="`${row.data.summary}`"
            :date_introduced="`${row.data.date_introduced}`"
              />
        </cv-column>
      </cv-row>
    </cv-grid>
  </div>
</template>

<script>
import Policy from '@/components/Policy';

export default {
  name: "PolicyTable",
  props: {
    rows: Array,
    totalRows: Number,
  },
  components: {
    Policy,
  },
  computed: {
    columns() {
      return [{
        label: `POLICIES (${this.totalRows})`,
      }];
    },
    datarows() {
      return this.rows.map((row) => ({
        data: row,
        description: row.summary,
      }));
    },
  },
  data() {
    return {
      title: "",
      helperText: "",
    };
  },
  methods: {
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/carbon-overrides';
.policy-table{
  background-color: $ui-01;
  padding: 0;
  margin: 0;
  .policy-title-row{
    padding: $spacing-05 $spacing-05;
  }
  .policy-row{
    padding: 0;
    margin: 0;
    .policy-cell{
      padding: 0;
      margin: 0;
      background-color: $ui-01;
    }
  }
}
</style>
