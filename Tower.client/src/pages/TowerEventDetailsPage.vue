<template>
  <div class="container-fluid">
    <div class="row">
      <h1>Tower</h1>
      <div class="col-12 col-md-11 m-auto bg bg-info rounded elevation-4">
        
        <div v-if="towerEvent" class="row">
          <div  class="col-12 col-md-6 p-3">
            <img  class='img-fluid rounded' :src="towerEvent.coverImg" alt="picture here">
          </div>

          <div class="col-12 col-md-6 mt-2">
            <div class="d-flex justify-content-end mb-3">
              <div class="dropdown">
  <button class="btn btn-info dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    <i class="mdi mdi-pencil"></i>
  </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" @click="editTowerEvent()">Edit Tower</a></li>
    <li><a class="dropdown-item" @click="cancelTowerEvent()" >Cancel Tower</a></li>
  
  </ul>
</div>
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <h4>{{towerEvent.name }}</h4>
              <h5>{{ towerEvent.startDate }}</h5>
            </div>
            <h5 class="mt-3">{{ towerEvent.location }}</h5>
            <p class="mt-3">{{ towerEvent.description }}</p>

            <div class="d-flex justify-content-between align-items-center">
<!-- TODO FIX LOGIC TO SHOW TKTS REMAINING -->
              <h5>{{ towerEvent.capacity}} - {{ towerEvent.ticketCount }}</h5>
              <div>

                <!-- v-if="towerEvent.ticketCount > 0 && towerEvent.ticketCount < towerEvent.capacity && towerEvent.isCanceled == false -->

                <div>
                  <button @click="createTicket()" class="btn btn-success">Attend Event</button>
                </div>
                <div class="text-danger">
                  <h4 v-if="towerEvent.isCanceled == true">Cancelled</h4>
                  <h4 v-else >No Tickets Remaining</h4>
              </div>

            </div>
          </div>
          </div>
        </div>

        <div class="col-12 col-md-11 m-auto mt-4 bg bg-secondary rounded elevation-4">
          <h5 class="p-2 text-center">Who is attending</h5>
          <div>
            <p>Attending users go here</p>
          </div>
        </div>

        <div class="col-12 col-md-8 m-auto bg bg-secondary mt-5 p-3">
          Comment Section
        </div>
        
      </div>
    </div>
    </div>

</template>


<script>
import { useRoute } from "vue-router";
import Pop from "../utils/Pop.js";
import { towerEventsService } from "../services/TowerEventsService.js";
import { computed, onMounted, onUpdated, watchEffect } from "vue";
import {AppState} from "../AppState.js"
import { logger } from "../utils/Logger.js";
import { TowerEvent } from "../models/TowerEvent.js";
import {ticketsService} from '../services/TicketsService.js'



export default {
  props: {
    towerEventProp: {type: TowerEvent}
  },
  setup() {
    
    const route = useRoute()

    async function getEventById(){
      try {
        const eventId = route.params.eventId
        await towerEventsService.getEventById(eventId)
      } catch (error) {
        Pop.error(error.message)
      }
    }

    async function getTicketsByEventId() {
      try {
        const eventId = route.params.eventId
        await ticketsService.getTicketsByEventId(eventId)
      } catch (error) {
        Pop.error(error.message)
      }
    }

    onMounted(() => {
      getEventById()
      getTicketsByEventId()
    })


    watchEffect(() => {
      getEventById(route.params.eventId)

    })

    return {
      towerEvent: computed(() => AppState.activeTowerEvent),
      account: computed(()=> AppState.account),
      

      async cancelTowerEvent() {
        try {
          const wantsToRemove = await Pop.confirm(`Are you sure you want to remove this Tower?`)

          if (!wantsToRemove) {
            return
          }
          const eventId = this.towerEvent.id 
          
          await towerEventsService.cancelTowerEvent(eventId)
        } catch (error) {
          Pop.error(error.message)
        }
      },

      async editTowerEvent() {
        try {
          logger.log('editing tower')
        } catch (error) {
          Pop.error(error.message)
        }
      },

      async createTicket() {
        try {
          
          const activeTowerId = route.params.eventId
        const ticketData = {eventId: activeTowerId}

          await ticketsService.createTicket(ticketData)
          AppState.activeTowerEvent.ticketCount ++
        } catch (error) {
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>

</style>