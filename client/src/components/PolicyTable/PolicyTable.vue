<template>
    <div>
      <cv-data-table class="policy-table" :columns="columns" >
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
  },
  components: {
    Policy,
  },
  data() {
    console.log(`items : ${this.rows.length} -> ${this.rows[0].title}`);
    return {
      columns: [`POLICIES (${this.rows.length})`],
      title: "",
      helperText: "",
      datarows: this.rows.map((row) => ({
        data: row,
        description: row.summary,
      })),
    };
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
