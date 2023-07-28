<template>
  <div class="container-fluid">
    <div class="row">
      <h1 class="ms-2 mt-2">Tower</h1>
      <h4 class="text-center mt-4">My Events</h4>
      <div class="col-12 col-md-3">
      </div>
        
        </div>

<!-- for every event where user id == creator id, draw the event card -->

      </div>
    

    <div class="row">
      <div class="col-12 col-md-8 m-auto">
        <div class="mx-2" v-for="ticket in myTickets" :key="ticket.id" :towerEvent="ticket.event">
          <!-- <div class="card elevation-4 p-2 card-container mt-3">
            <img class="img-fluid event-cover-img" :src="towerEvent.coverImg" alt="">
            <div class="card-info text-center rounded p-3">
              {{ towerEvent.name }}
            </div>
          </div> -->
          <MyEventsCard :towerEventProp="ticket.event" :ticketProp="ticket"/>
        </div>
      </div>
    </div>
  
</template>

<script>
import { computed, onMounted, watchEffect } from 'vue';
import { AppState } from '../AppState';
import MyEventsCard from "../components/MyEventsCard.vue";
import TowerEventDetailsPage from "./TowerEventDetailsPage.vue";

export default {
  setup() {

    onMounted(() => {
      
    })
        return {
            myTickets: computed(() => AppState.myTickets),
            account: computed(() => AppState.account),
          towerEvent: computed(() => AppState.towerEvents),
          tickets: computed(() => AppState.tickets)
        };
    },
    // components: { EventCard }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
