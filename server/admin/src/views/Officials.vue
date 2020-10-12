<template>
  <div data-app id="officials">
    <v-card>
      <v-card-title>
        All Officials
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
        :headers="headers"
        :items="this.items"
        item-key="id"
        :sort-by="['title']"
        :sort-desc="[false]"
        :search="search"
        dense
        group-desc
        show-group-by
        multi-sort
        class="elevation-24">
        <template v-slot:top>
          <v-spacer></v-spacer>
          <v-dialog
            v-model="dialogEdit"
            max-width="500px"
          >
            <v-card>
              <v-card-title>
                <span class="headline">Edit Item</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.title"
                        label="Title"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.description"
                        label="Description"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="cancel"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
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

        <template v-slot:item.website_url="{ item }">
          <v-btn icon :disabled="!isUrl(item.website_url)" :href="item.website_url">
            <v-icon left>mdi-open-in-new</v-icon></v-btn>
        </template>
        <template v-slot:item.created="{ item }">
          {{ new Date(item.created).toLocaleDateString() }}
        </template>
        <template v-slot:item.updated="{ item }">
          {{ new Date(item.updated).toLocaleDateString() }}
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            @click="deleteDialog(item)"
          >
            mdi-delete
          </v-icon>
        </template>

      </v-data-table>
    </v-card>

  </div>
</template>

<script>

export default {
  name: 'officials',
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
          text: 'Title', value: 'title', filterable: true, groupable: false,
        },
        {
          text: 'Email Address', value: 'email_address', filterable: true, groupable: false,
        },
        {
          text: 'Phone Number', value: 'phone_number', filterable: true, groupable: false,
        },
        {
          text: 'URL', value: 'website_url', filterable: true, groupable: false,
        },
        {
          text: 'Date Created', value: 'created', filterable: false, groupable: false,
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
        const response = await fetch('/api/v1/officials');
        this.items = await response.json();
      } catch (error) {
        console.error(error);
      }
    },
    editMode(item) {
      this.cachedItem = { ...item };
    },
    cancelEdit(item) {
      Object.assign(item, this.cachedItem);
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
        console.log('deleteItem...');
        await fetch(`/api/v1/officials/${id}`, {
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
    save() {
      this.updateItem(this.items[this.editedIndex]);
      this.dialogEdit = false;
    },
    cancel(item) {
      this.cancelEdit(item);
    },
    open() {
      console.log('open()');
    },
    close() {
      console.log('Dialog closed');
      this.dialogEdit = false;
      console.log('close()');
    },
    async updateItem(item) {
      try {
        await fetch(
          `/api/v1/officials/${item.id}`, {
            method: 'PUT',
            body: JSON.stringify(item),
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
          },
        );
        this.items.splice(this.editedIndex, 1, item);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
