<template>
    <v-card>
      <v-toolbar>
        <v-spacer></v-spacer>

        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          hide-details
        ></v-text-field>
      </v-toolbar>

      <v-data-table
        fixed-header
        :headers="headers"
        :items="this.items"
        item-key="id"
        :sort-by="['id']"
        :sort-desc="[false]"
        :search="search"
        dense
        class="elevation-4"
      >
        <template v-slot:item.actions="{ item }">
          <v-icon small @click="addItem(item)" > mdi-plus </v-icon>
        </template>
      </v-data-table>
    </v-card>
</template>

<script>

export default {
  name: 'add-intersections-table',
  props: [
    'headers',
    'intersections',
    'url',
  ],
  data() {
    return {
      items: [],
      search: '',
    };
  },
  mounted() {
    this.getItems();
  },
  methods: {
    async getItems() {
      try {
        const response = await fetch(this.url);
        const result = await response.json();
        this.items = result.filter((item) => !this.intersections.some((x) => item.id === x.id));
      } catch (error) {
        console.error(error);
      }
    },

    async addItem(item) {
      this.$emit('add', item, this.intersections);
      this.items = this.items.filter((i) => !this.intersections.some((x) => i.id === x.id));
    },
  },
};
</script>
