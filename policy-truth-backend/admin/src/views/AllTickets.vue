<template>
  <div id="all-tickets-table">
     <v-card>
      <v-card-title>
        All Tickets
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
        :items="this.alltickets"
        item-key="id"
        :sort-by="['createdAt']"
        :sort-desc="[true]"
        :search="search"
        show-expand
        dense
        group-by="state"
        group-desc
        show-group-by
        multi-sort>
        class="elevation-1">
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
                                              v-model="editedItem.subject"
                                              label="Subject"
                                      ></v-text-field>
                                  </v-col>
                                  <v-col
                                          cols="12"
                                          sm="6"
                                          md="4"
                                  >
                                      <v-text-field
                                              v-model="editedItem.text"
                                              label="Details"
                                      ></v-text-field>
                                  </v-col>
                              </v-row>
                              <v-row>
                                  <v-col
                                          cols="12"
                                          sm="6"
                                          md="4"
                                  >
                                      <v-text-field v-if="editedItem.assignee_id"
                                              readonly
                                              v-model="editedItem.assignee_id"
                                              label="Assigned to"
                                              hide-details="auto"
                                      ></v-text-field>
                                      <v-text-field v-else
                                                    readonly
                                                    disabled
                                                    outlined
                                                    v-model="editedItem.assignee_id"
                                                    label="Not Assigned"
                                                    hide-details="auto"
                                      ></v-text-field>
                                  </v-col>
                                  <v-col
                                          cols="12"
                                          sm="6"
                                          md="4"
                                  >
                                      <v-btn
                                              color="blue darken-1"
                                              text
                                              @click="assignMe"
                                      >Assign Me</v-btn>
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
                              <v-btn color="blue darken-1" text @click="deleteItemConfirm">
                                OK
                              </v-btn>
                              <v-spacer></v-spacer>
                          </v-card-actions>
                      </v-card>
                  </v-dialog>
          </template>

         <template v-slot:item.priority="{ item }">
           <v-chip x-small :color="getColor(item.priority)" dark>
             {{ priorities[item.priority] || 'None' }}
           </v-chip>
         </template>
         <template v-slot:item.createdAt="{ item }">
             {{ new Date(item.createdAt).toLocaleDateString() }}
         </template>
         <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">
                  {{ item.text }}
              </td>
         </template>
         <template v-slot:item.actions="{ item }">
           <v-icon
             small
             @click="editTicket(item)"
           >
             mdi-pencil
           </v-icon>
           <v-icon
             small
             @click="deleteItem(item)"
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
  name: 'all-tickets-table',
  data() {
    return {
      alltickets: [],
      dialogEdit: false,
      dialogDelete: false,
      editedIndex: -1,
      editedItem: {},
      cachedTicket: {},
      search: '',
      headers: [
        {
          text: 'Ticket ID', value: 'id', filterable: true, groupable: false,
        },
        {
          text: 'User ID', value: 'user_id', filterable: true, groupable: false,
        },
        {
          text: 'Assigned to', value: 'assignee_id', filterable: true, groupable: false,
        },
        {
          text: 'Subject', value: 'subject', filterable: true, groupable: false,
        },
        { text: 'Category', value: 'category', filterable: true },
        { text: 'Priority', value: 'priority', filterable: true },
        { text: 'Status', value: 'state', filterable: true },
        {
          text: 'Created', value: 'createdAt', filterable: true, groupable: false,
        },
        {
          text: 'Actions', value: 'actions', filterable: false, groupable: false,
        },
      ],
      priorities: [
        'Urgent',
        'High',
        'Medium',
        'Low',
        'None',
      ],
      prioritiesColors: [
        'deep-orange accent-4',
        'deep-orange accent-2',
        'deep-orange accent-1',
        'deep-orange lighten-4',
        'deep-orange lighten-5',
      ],
    };
  },
  mounted() {
    this.getTickets();
  },
  methods: {
    getColor(priority) {
      return this.prioritiesColors[priority] || 'white';
    },
    async getTickets() {
      try {
        console.log(`ALLTICKETS ROUTE PATH: ${this.$route.path}`);
        const response = await fetch('http://localhost:8080/tickets/');
        console.log('RESPONSE:', response);
        const resp = await response.json();
        console.log('DATA:', resp);
        this.alltickets = resp;
      } catch (error) {
        console.error(error);
      }
    },
    editMode(ticket) {
      this.cachedTicket = { ...ticket };
    },
    cancelEdit(ticket) {
      Object.assign(ticket, this.cachedTicket);
      this.alltickets.splice(this.editedIndex, 1, this.cachedTicket);
      this.dialogEdit = false;
    },

    editTicket(ticket) {
      this.editMode(ticket);
      this.editedIndex = this.alltickets.indexOf(ticket);
      this.editedItem = ticket;
      this.dialogEdit = true;
    },

    async deleteTicket(id) {
      try {
        console.log('deleteTicket...');
        const response = await fetch(`http://localhost:8080/tickets/${id}`, {
          method: 'DELETE',
        });
        console.log('RESPONSE:', response);
        const data = await response.json();
        console.log('DATA:', data);
      } catch (error) {
        console.error(error);
      }
    },
    deleteItem(item) {
      this.editedIndex = this.alltickets.indexOf(item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      const ticket = this.alltickets[this.editedIndex];
      this.deleteTicket(ticket.id);
      this.alltickets.splice(this.editedIndex, 1);
      this.closeDelete();
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedIndex = -1;
      });
    },
    save() {
      const ticket = this.alltickets[this.editedIndex];
      this.updateTicket(ticket);
      this.dialogEdit = false;
    },
    cancel(ticket) {
      this.cancelEdit(ticket);
    },
    open() {
      console.log('open()');
    },
    close() {
      console.log('Dialog closed');
      this.dialogEdit = false;
      console.log('close()');
    },
    async assignMe() {
      const response = await this.addAssignee();
      const r = await response.json();
      this.editedItem.assignee_id = r[0].id;
    },
    async addAssignee() {
      return fetch('http://localhost:8080/tickets/assignee', {
        method: 'POST',
        body: JSON.stringify({
          name: this.$store.state.user.username,
          email: this.$store.state.user.email,
        }),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      });
    },
    async updateTicket(updatedTicket) {
      try {
        const response = await fetch(`http://localhost:8080/tickets/${updatedTicket.id}`, {
          method: 'PUT',
          body: JSON.stringify(updatedTicket),
          headers: { 'Content-type': 'application/json; charset=UTF-8' },
        });
        const data = await response.json();
        const ticket = data[0];
        ticket.user_id = ticket.user_id || ticket.UserId;
        ticket.assignee_id = ticket.assignee_id || ticket.AssigneeId;
        this.alltickets.splice(this.editedIndex, 1, ticket);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
</style>
