<template>
  <div class="container-fluid">
    <div class="row">
      <h1>Tower</h1>
      <h4 class="text-center mt-4">My Events</h4>
      <div class="col-12 col-md-3">
        
        <div >
<!-- for every event where user id == creator id, draw the event card -->

          My events go here
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12 col-md-8 m-auto">
        <div class="" v-for="ticket in myTickets" :key="ticket.id">
          <EventCard :towerEventProp="towerEvent" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { AppState } from '../AppState';
import { useRoute } from "vue-router";
import TicketComponent from "../components/TicketComponent.vue";

export default {
    setup() {
    return {

      myTickets: computed(()=> AppState.myTickets),
      account: computed(() => AppState.account),
      towerEvent: computed(() => AppState.towerEvents),
      
        };
    },

}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
