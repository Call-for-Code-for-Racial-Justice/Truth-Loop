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

          <v-dialog v-model="dialogVectors">
            <v-card>
              <v-app-bar
                elevate-on-scroll
                fade-img-on-scroll
              >
                <v-toolbar-title>
                  Artifact Intersections
                  <div class="subtitle-1">
                    Artifact #{{ editedItem.id }}: {{ editedItem.title }}
                  </div>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1"
                       icon @click="dialogVectors = false"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-app-bar>
                <v-data-table
                  :headers="advocacyGroupsHeaders"
                  :items="editedItem.advocacy_groups"
                  item-key="id"
                  :sort-by="['name']"
                  class="elevation-3">
                  <template v-slot:top>
                    <v-toolbar flat color="grey lighten-3">
                      <v-toolbar-title>Advocacy Groups</v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="primary" dark
                        @click="addAdvocacyGroupIntersections = true"
                      >
                        + Add
                      </v-btn>

                      <v-dialog v-model="addAdvocacyGroupIntersections" >
                        <v-card>
                        <v-app-bar
                          dense
                          elevate-on-scroll
                          fade-img-on-scroll
                        >
                          <v-toolbar-title>Select Advocacy Groups to Add</v-toolbar-title>
                          <v-spacer></v-spacer>
                          <v-btn color="blue darken-1"
                                 icon @click="addAdvocacyGroupIntersections = false"
                          >
                            <v-icon>mdi-close</v-icon>
                          </v-btn>
                        </v-app-bar>

                        <add-intersections-table
                          title="Add Advocacy Groups to Artifact"
                          url="/api/v1/advocacyGroups"
                          :headers="advocacyGroupsHeaders"
                          :intersections="editedItem.advocacy_groups"
                          @add="addIntersection"
                          >
                        </add-intersections-table>
                        </v-card>
                      </v-dialog>
                    </v-toolbar>
                  </template>
                  <template v-slot:item.actions="{ item }">
                    <v-icon small @click="deleteItemFrom(item, editedItem.advocacy_groups)" >
                      mdi-trash-can-outline
                    </v-icon>
                  </template>
                </v-data-table>
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
                  <template v-slot:top>
                    <v-toolbar flat color="grey lighten-3">
                      <v-toolbar-title>Categories</v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" dark
                        @click="addCategoriesIntersections = true"
                      > + Add </v-btn>
                      <v-dialog v-model="addCategoriesIntersections" >
                        <v-card>
                          <v-app-bar dense elevate-on-scroll fade-img-on-scroll >
                            <v-toolbar-title>Select Categories to Add</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1"
                                   icon @click="addCategoriesIntersections = false">
                              <v-icon>mdi-close</v-icon>
                            </v-btn>
                          </v-app-bar>
                          <add-intersections-table
                            title="Add Categories to Artifact"
                            url="/api/v1/categories"
                            :headers="categoriesHeaders"
                            :intersections="editedItem.categories"
                            @add="addIntersection"
                          >
                          </add-intersections-table>
                        </v-card>
                      </v-dialog>
                    </v-toolbar>
                  </template>
                </v-data-table>
                <v-data-table
                  label="Geographies"
                  :headers="geographiesHeaders"
                  :items="editedItem.geospatial_pertinence"
                  item-key="id"
                  :sort-by="['name']"
                  class="elevation-4">
                  <template v-slot:item.actions="{ item }">
                    <v-icon small @click="deleteItemFrom(item, editedItem.geospatial_pertinence)" >
                      mdi-trash-can-outline
                    </v-icon>
                  </template>
                  <template v-slot:top>
                    <v-toolbar flat color="grey lighten-3">
                      <v-toolbar-title>Geographies</v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" dark
                             @click="addGeographiesIntersections = true"
                      > + Add </v-btn>
                      <v-dialog v-model="addGeographiesIntersections" >
                        <v-card>
                          <v-app-bar dense elevate-on-scroll fade-img-on-scroll >
                            <v-toolbar-title>Select Geographies to Add</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1"
                                   icon @click="addGeographiesIntersections = false">
                              <v-icon>mdi-close</v-icon>
                            </v-btn>
                          </v-app-bar>
                          <add-intersections-table
                            title="Add Geographies to Artifact"
                            url="/api/v1/geospatialDefinitions"
                            :headers="geographiesHeaders"
                            :intersections="editedItem.geospatial_pertinence"
                            @add="addIntersection"
                          >
                          </add-intersections-table>
                        </v-card>
                      </v-dialog>
                    </v-toolbar>
                  </template>
                </v-data-table>
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
                  <template v-slot:top>
                    <v-toolbar flat color="grey lighten-3">
                      <v-toolbar-title>Officials</v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" dark
                             @click="addOfficialsIntersections = true"
                      > + Add </v-btn>
                      <v-dialog v-model="addOfficialsIntersections" >
                        <v-card>
                          <v-app-bar dense elevate-on-scroll fade-img-on-scroll >
                            <v-toolbar-title>Select Officials to Add</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1"
                                   icon @click="addOfficialsIntersections = false">
                              <v-icon>mdi-close</v-icon>
                            </v-btn>
                          </v-app-bar>
                          <add-intersections-table
                            title="Add Officials to Artifact"
                            url="/api/v1/officials"
                            :headers="officialsHeaders"
                            :intersections="editedItem.officials"
                            @add="addIntersection"
                          >
                          </add-intersections-table>
                        </v-card>
                      </v-dialog>
                    </v-toolbar>
                  </template>
                </v-data-table>
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
                  <template v-slot:top>
                    <v-toolbar flat color="grey lighten-3">
                      <v-toolbar-title>Publications</v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" dark
                             @click="addIntersections = true"
                      > + Add </v-btn>
                      <v-dialog v-model="addIntersections" >
                        <v-card>
                          <v-app-bar dense elevate-on-scroll fade-img-on-scroll >
                            <v-toolbar-title>Select Publications to Add</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1"
                                   icon @click="addIntersections = false">
                              <v-icon>mdi-close</v-icon>
                            </v-btn>
                          </v-app-bar>
                          <add-intersections-table
                            title="Add Publications to Artifact"
                            url="/api/v1/publications"
                            :headers="publicationsHeaders"
                            :intersections="editedItem.publications"
                            @add="addIntersection"
                          >
                          </add-intersections-table>
                        </v-card>
                      </v-dialog>
                    </v-toolbar>
                  </template>
                </v-data-table>
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
                  <template v-slot:top>
                    <v-toolbar flat color="grey lighten-3">
                      <v-toolbar-title>Video Testimonials</v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" dark
                             @click="addIntersections2 = true"
                      > + Add </v-btn>
                      <v-dialog v-model="addIntersections2" >
                        <v-card>
                          <v-app-bar dense elevate-on-scroll fade-img-on-scroll >
                            <v-toolbar-title>Select Video Testimonials to Add</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1"
                                   icon @click="addIntersections2 = false">
                              <v-icon>mdi-close</v-icon>
                            </v-btn>
                          </v-app-bar>
                          <add-intersections-table
                            title="Add Video Testimonials to Artifact"
                            url="/api/v1/videoTestimonials"
                            :headers="videoTestimonialsHeaders"
                            :intersections="editedItem.video_testimonials"
                            @add="addIntersection"
                          >
                          </add-intersections-table>
                        </v-card>
                      </v-dialog>
                    </v-toolbar>
                  </template>
                </v-data-table>
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
                  <template v-slot:top>
                    <v-toolbar flat color="grey lighten-3">
                      <v-toolbar-title>Related Artifacts</v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" dark
                             @click="addIntersectionsRelatedArtifacts = true"
                      > + Add </v-btn>
                      <v-dialog v-model="addIntersectionsRelatedArtifacts" >
                        <v-card>
                          <v-app-bar dense elevate-on-scroll fade-img-on-scroll >
                            <v-toolbar-title>Select Related Artifacts to Add</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1"
                                   icon @click="addIntersectionsRelatedArtifacts = false">
                              <v-icon>mdi-close</v-icon>
                            </v-btn>
                          </v-app-bar>
                          <add-intersections-table
                            title="Add Video Testimonials to Artifact"
                            url="/api/v1/legislativeArtifacts"
                            :headers="relatedArtifactsHeaders"
                            :intersections="editedItem.related"
                            @add="addIntersection"
                          >
                          </add-intersections-table>
                        </v-card>
                      </v-dialog>
                    </v-toolbar>
                  </template>
                </v-data-table>
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
          <v-btn icon small
                 :disabled="!isUrl(item.link_to_full_text)" :href="item.link_to_full_text">
            <v-icon small left>mdi-open-in-new</v-icon></v-btn>
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

import AddIntersectionsTable from '../components/AddIntersectionsTable.vue';
import ArtifactForm from '../components/ArtifactForm.vue';

export default {
  name: 'artifact-table',
  components: {
    'add-intersections-table': AddIntersectionsTable,
    'edit-form': ArtifactForm,
  },
  data() {
    return {
      items: [],
      addAdvocacyGroupIntersections: false,
      addCategoriesIntersections: false,
      addGeographiesIntersections: false,
      addOfficialsIntersections: false,
      addIntersections: false,
      addIntersections2: false,
      addIntersectionsRelatedArtifacts: false,
      target: '',
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
          text: 'Status', value: 'status', filterable: true, width: '30%',
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
      geographiesHeaders: [
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
    async postIt(url, body) {
      try {
        console.log('Sending POST...');
        const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(body),
          headers: { 'Content-type': 'application/json; charset=UTF-8' },
        });
        const data = await response.json();
        console.log('Result:', data);
      } catch (error) {
        console.error(error);
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
      console.log(url);
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
    addIntersection(item, items) {
      if (!item) {
        return '';
      }

      let url;
      let body = {};
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
          url = '/api/v1/adminIntersections/official';
          body = {
            artifact_id: this.editedItem.id,
            official_id: item.id,
            role_in_artifact: 'sponsor', // TODO:
            show_in_list: false, // TODO: There can only be one true!!!
          };
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
          console.error('addIntersections() did not recognize the vector');
          return '';
      }
      console.log(url);
      items.splice(0, 0, item);
      this.postIt(url, body);
      return '';
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

  .v-dialog__content {
    max-height: calc(100vh - 2rem)
  }
  .maincard {
    max-height: calc(100vh - 4rem);
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
