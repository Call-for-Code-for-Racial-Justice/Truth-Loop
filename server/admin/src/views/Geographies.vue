<template>
  <v-app class="bx--content">
    <v-card class="maincard">
      <v-card-title>
        All Geographies
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>

      <v-data-table
        fixed-header
        height="60vh"
        :headers="headers"
        :items="this.items"
        item-key="id"
        :sort-by="['name']"
        :sort-desc="[false]"
        :search="search"
        dense
        class="elevation-4"
      >
        <template v-slot:top>
          <v-spacer></v-spacer>
          <v-dialog
            v-model="dialogEdit"
            persistent
          >
            <edit-form
              :instance="editedItem"
              add_or_edit="Edit"
              method="PUT"
              v-on:close-dialog="cancelEdit"
              v-on:saved-item="editMode"
            ></edit-form>
          </v-dialog>

          <v-dialog v-model="dialogDelete">
            <v-card>
              <v-card-title class="headline">
                Are you sure you want to delete this item?
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>

        <template v-slot:item.created="{ item }">
          {{ new Date(item.created).toLocaleDateString() }}
        </template>
        <template v-slot:item.updated="{ item }">
          {{ new Date(item.updated).toLocaleDateString() }}
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small @click="editItem(item)" > mdi-pencil-outline </v-icon>
          <v-icon small @click="deleteDialog(item)" > mdi-trash-can-outline </v-icon>
        </template>

      </v-data-table>
    </v-card>

  </v-app>
</template>

<script>

import GeographiesForm from '../components/GeographiesForm.vue';

export default {
  name: 'geographies',
  components: {
    'edit-form': GeographiesForm,
  },
  data() {
    return {
      items: [],
      dialogEdit: false,
      dialogDelete: false,
      editedIndex: -1,
      editedItem: {},
      cachedItem: {},
      search: '',
      headers: [
        {
          text: 'ID', value: 'id', filterable: true, groupable: false,
        },
        {
          text: 'Name', value: 'name', filterable: true, groupable: false,
        },
        {
          text: 'Short Name (UI)', value: 'short_name_ui', filterable: true, groupable: false,
        },
        {
          text: 'Description', value: 'description', filterable: true, groupable: false,
        },
        {
          text: 'Date Created', value: 'created', filterable: false, groupable: false,
        },
        {
          text: 'Date Updated', value: 'updated', filterable: false, groupable: false,
        },
        {
          text: 'Actions', value: 'actions', filterable: false, groupable: false,
        },
      ],
    };
  },
  mounted() {
    this.getItems();
  },
  methods: {
    isUrl(link) {
      return !!link && (link.length > 7) && link.startsWith('http');
    },
    async getItems() {
      try {
        const response = await fetch('/api/v1/geospatialDefinitions');
        this.items = await response.json();
      } catch (error) {
        console.error(error);
      }
    },
    editMode(item) {
      this.cachedItem = { ...item };
    },
    cancelEdit() {
      this.items.splice(this.editedIndex, 1, this.cachedItem);
      this.dialogEdit = false;
    },
    editItem(item) {
      this.editMode(item);
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = item;
      this.dialogEdit = true;
    },
    async deleteItem(id) {
      try {
        await fetch(`/api/v1/geospatialDefinitions/${id}`, {
          method: 'DELETE',
        });
      } catch (error) {
        console.error(error);
      }
    },
    deleteDialog(item) {
      this.editedIndex = this.items.indexOf(item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      const item = this.items[this.editedIndex];
      this.deleteItem(item.id);
      this.items.splice(this.editedIndex, 1);
      this.closeDelete();
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedIndex = -1;
      });
    },
  },
};
</script>
