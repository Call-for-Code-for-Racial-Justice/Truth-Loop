<template>
    <div>
      <cv-data-table class="policy-table" no-header>
        <template slot="data">
          <cv-data-table-row class="policy-row"
           v-for="(row, rowIndex) in this.datarows"
           :key="`${rowIndex}`"
           >
            <cv-data-table-cell class="policy-cell"  >
              <router-link :to="`policy/${row.data.id}`" >
              <Policy :title="`${row.data.title}`"
              :summary="`${row.data.summary}`"
              :date_introduced="`${row.data.date_introduced}`"
                 />
              </router-link>
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
      columns: ["name"],
      title: "",
      helperText: "A Collection of Policies",
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
  .policy-row{
    padding: 0;
    .policy-cell{
      padding: 0;
      background-color: $ui-01;
    }
  }
}
</style>
