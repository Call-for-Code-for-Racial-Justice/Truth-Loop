<template>
  <v-app class="bx--content">
    <v-card class="maincard">
      <v-card-title>
        All Artifacts
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
        :sort-by="['date_introduced']"
        :sort-desc="[true]"
        :search="search"
        show-expand
        dense
        class="elevation-4"
      >
        <template v-slot:top>
          <v-dialog v-model="dialogEdit">
            <v-card>
              <v-card-title>
                <h2>Edit Artifact #{{ editedItem.id }}</h2>
              </v-card-title>
              <cv-form @submit.prevent="addArtifact">
                <cv-text-input
                  label="Title"
                  v-model="editedItem.title"
                  placeholder="Enter the title of the artifact">
                  invalid-message=""
                  <template v-if="showInvalid.title" slot="invalid-message">
                    Required field
                  </template>
                </cv-text-input>
                <cv-text-input
                  label="URL"
                  v-model="editedItem.link_to_full_text"
                  placeholder="Provide a link to the full text of the artifact">
                  ></cv-text-input>
                <cv-text-area
                  label="Summary"
                  v-model="editedItem.summary"
                  placeholder="Provide your own summary of the artifact">
                  invalid-message=""
                  <template v-if="showInvalid.summary" slot="invalid-message">
                    Required field
                  </template>
                  ></cv-text-area>
                <cv-select
                  label="Status"
                  v-model="editedItem.status"
                  placeholder="Choose an option">
                  <cv-select-option disabled selected>Choose an option</cv-select-option>
                  <cv-select-option>Introduced</cv-select-option>
                  <cv-select-option>Referred</cv-select-option>
                  <cv-select-option>Reported</cv-select-option>
                  <cv-select-option>Failed</cv-select-option>
                  <cv-select-option>Passed</cv-select-option>
                  <cv-select-option>Enacted</cv-select-option>
                  <cv-select-option>Vetoed</cv-select-option>
                </cv-select>
                <cv-date-picker
                  date-label="Date introduced"
                  kind="single"
                  v-model="editedItem.date_introduced">
                </cv-date-picker>
              </cv-form>
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
          <v-dialog v-model="dialogVectors" max-width="85%">
            <v-card>
              <v-card-title>
                <h2>Edit Artifact #{{ editedItem.id }} Vectors</h2>
              </v-card-title>
              <v-card-subtitle>
                Title: {{ editedItem.title }}
              </v-card-subtitle>
              <v-card>
                <v-card-subtitle>
                  <h4>Advocacy Groups</h4>
                </v-card-subtitle>
                <v-data-table
                  :headers="advocacyGroupsHeaders"
                  :items="editedItem.advocacy_groups"
                  item-key="id"
                  :sort-by="['name']"
                  class="elevation-4">
                  <template v-slot:item.actions="{ item }">
                    <v-icon small @click="deleteItemFrom(item, editedItem.advocacy_groups)" >
                      mdi-trash-can-outline
                    </v-icon>
                  </template>
                </v-data-table>
                <v-card-subtitle>
                  <h4>Categories</h4>
                </v-card-subtitle>
                <v-data-table
                  :headers="categoriesHeaders"
                  :items="editedItem.categories"
                  item-key="id"
                  :sort-by="['name']"
                  class="elevation-4">
                  <template v-slot:item.actions="{ item }">
                    <v-icon small @click="deleteItemFrom(item, editedItem.categories)" >
                      mdi-trash-can-outline
                    </v-icon>
                  </template>
                </v-data-table>
                <v-card-subtitle>
                  <h4>Locations</h4>
                </v-card-subtitle>
                <v-data-table
                  label="Locations"
                  :headers="locationsHeaders"
                  :items="editedItem.geospatial_pertinence"
                  item-key="id"
                  :sort-by="['name']"
                  class="elevation-4">
                  <template v-slot:item.actions="{ item }">
                    <v-icon small @click="deleteItemFrom(item, editedItem.geospatial_pertinence)" >
                      mdi-trash-can-outline
                    </v-icon>
                  </template>
                </v-data-table>
                <v-card-subtitle>
                  <h4>Officials</h4>
                </v-card-subtitle>
                <v-data-table
                  :headers="officialsHeaders"
                  :items="editedItem.officials"
                  item-key="id"
                  :sort-by="['name']"
                  class="elevation-4">
                  <template v-slot:item.actions="{ item }">
                    <v-icon small @click="deleteItemFrom(item, editedItem.officials)" >
                      mdi-trash-can-outline
                    </v-icon>
                  </template>
                </v-data-table>
                <v-card-subtitle>
                  <h4>Publications</h4>
                </v-card-subtitle>
                <v-data-table
                  :headers="publicationsHeaders"
                  :items="editedItem.publications"
                  item-key="id"
                  :sort-by="['title']"
                  class="elevation-4">
                  <template v-slot:item.actions="{ item }">
                    <v-icon small @click="deleteItemFrom(item, editedItem.publications)" >
                      mdi-trash-can-outline
                    </v-icon>
                  </template>
                </v-data-table>
                <v-card-subtitle>
                  <h4>Video Testimonials</h4>
                </v-card-subtitle>
                <v-data-table
                  :headers="videoTestimonialsHeaders"
                  :items="editedItem.video_testimonials"
                  item-key="id"
                  :sort-by="['subject']"
                  class="elevation-4">
                  <template v-slot:item.actions="{ item }">
                    <v-icon small @click="deleteItemFrom(item, editedItem.video_testimonials)" >
                      mdi-trash-can-outline
                    </v-icon>
                  </template>
                </v-data-table>
                <v-card-subtitle>
                  <h4>Related Artifacts</h4>
                </v-card-subtitle>
                <v-data-table
                  :headers="relatedArtifactsHeaders"
                  :items="editedItem.related"
                  item-key="id"
                  :sort-by="['title']"
                  class="elevation-4">
                  <template v-slot:item.actions="{ item }">
                    <v-icon small @click="deleteItemFrom(item, editedItem.related)" >
                      mdi-trash-can-outline
                    </v-icon>
                  </template>
                </v-data-table>
              </v-card>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeVectorEdit" > Close </v-btn>
              </v-card-actions>
            </v-card>
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

        <template v-slot:item.link_to_full_text="{ item }">
          <v-btn icon :disabled="!isUrl(item.link_to_full_text)" :href="item.link_to_full_text">
            <v-icon left>mdi-open-in-new</v-icon></v-btn>
        </template>
        <template v-slot:item.date_introduced="{ item }">
          {{ new Date(item.date_introduced).toLocaleDateString() }}
        </template>
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            {{ item.summary }}
          </td>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small @click="editItem(item)" > mdi-pencil-outline </v-icon>
          <v-icon small @click="editVectors(item)" > mdi-vector-link </v-icon>
          <v-icon small @click="deleteDialog(item)" > mdi-trash-can-outline </v-icon>
        </template>

      </v-data-table>
    </v-card>

  </v-app>
</template>

<script>

export default {
  name: 'artifact-table',
  data() {
    return {
      items: [],
      dialogEdit: false,
      dialogVectors: false,
      dialogDelete: false,
      editedIndex: -1,
      editedItem: {},
      cachedItem: {},
      search: '',
      showInvalid: { // These require validation.
        title: false,
        summary: false,
      },
      headers: [
        {
          text: 'ID', value: 'id', filterable: true, width: '1%',
        },
        {
          text: 'Title', value: 'title', filterable: true, width: '50%',
        },
        {
          text: 'URL', value: 'link_to_full_text', filterable: true, width: '1%',
        },
        {
          text: 'Status', value: 'status', filterable: true, width: '1%',
        },
        {
          text: 'Date Introduced', value: 'date_introduced', filterable: true, width: '1%',
        },
        {
          text: 'Actions', value: 'actions', width: '15%', align: 'center', sortable: false,
        },
      ],
      advocacyGroupsHeaders: [
        {
          text: 'ID', value: 'id', filterable: true, width: '1%', align: 'start',
        },
        {
          text: 'Name', value: 'name', filterable: true, width: '50%', align: 'start',
        },
        {
          text: 'Description', value: 'description', width: '50%', align: 'start',
        },
        {
          text: 'Actions', value: 'actions', width: '1%',
        },
      ],
      categoriesHeaders: [
        { text: 'ID', value: 'id', align: 'start' },
        { text: 'Name', value: 'name' },
        { text: 'Description', value: 'description' },
        { text: 'Actions', value: 'actions' },
      ],
      locationsHeaders: [
        { text: 'ID', value: 'id' },
        { text: 'Name', value: 'name' },
        { text: 'Description', value: 'description' },
        { text: 'Actions', value: 'actions' },
      ],
      officialsHeaders: [
        { text: 'ID', value: 'id' },
        { text: 'Name', value: 'name' },
        { text: 'Title', value: 'title' },
        { text: 'Actions', value: 'actions' },
      ],
      publicationsHeaders: [
        { text: 'ID', value: 'id' },
        { text: 'Title', value: 'title' },
        { text: 'Description', value: 'description' },
        { text: 'Actions', value: 'actions' },
      ],
      videoTestimonialsHeaders: [
        { text: 'ID', value: 'id' },
        { text: 'Subject', value: 'subject' },
        { text: 'Comment', value: 'comment' },
        { text: 'Actions', value: 'actions' },
      ],
      relatedArtifactsHeaders: [
        { text: 'ID', value: 'id' },
        { text: 'Title', value: 'title' },
        { text: 'Actions', value: 'actions' },
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
        const response = await fetch('/api/v1/legislativeArtifacts');
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

    async editItem(item) {
      this.editMode(item);
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = item;
      this.dialogEdit = true;
    },

    closeVectorEdit() {
      this.dialogVectors = false;
    },

    async editVectors(item) {
      this.editMode(item);
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = await this.getItem(item.id);
      this.dialogVectors = true;
    },

    async getItem(id) {
      try {
        const response = await fetch(`/api/v1/legislativeArtifacts/fullDetail/${id}`);
        return await response.json();
      } catch (error) {
        console.error(error);
        return {};
      }
    },
    async deleteIt(url) {
      try {
        console.log('Sending delete...');
        const response = await fetch(url, {
          method: 'DELETE',
        });
        const data = await response.json();
        console.log('Result:', data);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteItem(id) {
      try {
        await this.deleteIt(`/api/v1/legislativeArtifacts/fullDetail/${id}`);
      } catch (error) {
        console.error(error);
      }
    },
    deleteItemFrom(item, items) {
      console.log('deleting item from vector...');
      console.log('ITEM: ', item);
      console.log('ITEMs: ', items);

      let url;
      switch (items) {
        case this.editedItem.advocacy_groups:
          url = `/api/v1/adminIntersections/advocacyGroup/${this.editedItem.id}/${item.id}`;
          break;
        case this.editedItem.categories:
          url = `/api/v1/adminIntersections/category/${this.editedItem.id}/${item.id}`;
          break;
        case this.editedItem.geospatial_pertinence:
          url = `/api/v1/adminIntersections/geospatialDefinition/${this.editedItem.id}/${item.id}`;
          break;
        case this.editedItem.officials:
          url = `/api/v1/adminIntersections/official/${this.editedItem.id}/${item.id}`;
          break;
        case this.editedItem.publications:
          url = `/api/v1/adminIntersections/publication/${this.editedItem.id}/${item.id}`;
          break;
        case this.editedItem.video_testimonials:
          url = `/api/v1/adminIntersections/videoTestimonial/${this.editedItem.id}/${item.id}`;
          break;
        case this.editedItem.related:
          url = `/api/v1/adminIntersections/relatedArtifact/${this.editedItem.id}/${item.id}`;
          break;
        default:
          console.error('deleteItemFrom() did not recognize the vector');
          return;
      }
      this.deleteIt(url);
      items.splice(items.indexOf(item), 1);
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
          `/api/v1/legislativeArtifacts/${item.id}`, {
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

<style scoped>

  .maincard {
    max-height: calc(100vh - 4rem)
  }
  .v-sheet {
    margin-top: 0.5rem;
  }
  .v-card {
    overflow: scroll;
  }
  .cv-form {
    padding: 1rem;
  }
  .bx--btn {
    margin: 1rem 0 0 0;
    color:antiquewhite;
  }
  .bx--label {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    margin-left: 0.5rem;
  }

</style>
