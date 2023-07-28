<template>
  
  <div class="card elevation-4 p-2 card-container mt-4 mb-3">
            <img class="img-fluid event-cover-img" :src="towerEventProp.coverImg" alt="">
            <div class="card-info d-flex justify-content-between align-items-center rounded p-3">
              <h3>{{ towerEventProp.name }}</h3>
              <div class="d-flex align-items-center">
                <button title="Delete Ticket" @click="deleteTicket(ticketProp.id)" type="button" class="btn btn-danger"><i class="mdi mdi-delete" ></i></button>
                <router-link :to="{name: 'TowerEvent', params: {eventId: towerEventProp.id}}"><i class="mdi mdi-run ms-3 fs-3 bg bg-primary rounded"
                  title="To Tower details"></i></router-link>
              </div>
            </div>
          </div>
          
</template>


<script>
import { computed, watchEffect } from "vue";
import { AppState } from "../AppState.js";
import { ticketsService } from "../services/TicketsService.js";
import Pop from "../utils/Pop.js";


export default {
  props: {
    towerEventProp: { type: Object, required: true },
    ticketProp: {type: Object, required: true}
  },

  setup(props) {
    
      return {
        
        tickets: computed(() => AppState.tickets),
        myTickets: computed(()=> AppState.myTickets),

        async deleteTicket() {
          try {
            if (await Pop.confirm()) {
              const ticketId = props.ticketProp.id
              await ticketsService.removeTicket(ticketId)
            }
          } catch (error) {
            Pop.error(error.message)
          }
        }

      }
    }
  }

</script>


<style lang="scss" scoped>
.event-cover-img{
  object-fit: cover;
  object-position: center;
  height: 35vh;
  border-radius: 5px;
}
</style>