<template>
  <div>
    <cv-data-table class="policy-table"
    :columns="columns"
    :pagination="{ numberOfItems: this.totalRows }"
      @pagination="$emit('pagination', $event)"
      ref="table">
      <template slot="data">
        <cv-data-table-row class="policy-row"
          v-for="(row, rowIndex) in this.datarows"
          :key="`${rowIndex}`">
          <cv-data-table-cell class="policy-cell">
            <Policy :id="`${row.data.id}`"
            :title="`${row.data.title}`"
            :summary="`${row.data.summary}`"
            :date_introduced="`${row.data.date_introduced}`"
              />
          </cv-data-table-cell>
          <!-- <template slot="expandedContent">
          {{ row.description }}
          </template> -->
        </cv-data-table-row>
      </template>
    </cv-data-table>
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
