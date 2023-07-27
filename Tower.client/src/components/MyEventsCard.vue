<template>
  <div class="card elevation-4 p-2 card-container mt-4">
            <img class="img-fluid event-cover-img" :src="towerEventProp.coverImg" alt="">
            <div class="card-info d-flex justify-content-between rounded p-3">
              {{ towerEventProp.name }}
              <button @click="removeTicket()" type="button" class="btn btn-danger"><i class="mdi mdi-delete"></i></button>
            </div>
          </div>
</template>


<script>
import { AppState } from "../AppState.js";
import { TowerEvent } from "../models/TowerEvent.js";
import { ticketsService } from "../services/TicketsService.js";
import Pop from "../utils/Pop.js";


export default {
  props: {
    towerEventProp: { type: TowerEvent, required: true },

    setup() {
      return {

        async removeTicket() {
          try {
            const ticketToRemove = AppState.tickets.find(t => t.accountId == AppState.account.id)
            const ticketId = ticketToRemove.id
            await ticketsService.removeTicket(ticketId)
          } catch (error) {
            Pop.error(error.message)
          }
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