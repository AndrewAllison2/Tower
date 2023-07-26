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
            <div class="d-flex justify-content-between align-items-center">
              <h4>{{ towerEvent.name }}</h4>
              <h5>{{ towerEvent.startDate }}</h5>
            </div>
            <h5 class="mt-3">{{ towerEvent.location }}</h5>
            <p class="mt-3">{{ towerEvent.description }}</p>

            <div class="d-flex justify-content-between align-items-center">
              <h5>{{ towerEvent.capacity }}</h5>
              <button class="btn btn-success">Attend Event</button>
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

</template>


<script>
import { useRoute } from "vue-router";
import Pop from "../utils/Pop.js";
import { towerEventsService } from "../services/TowerEventsService.js";
import { computed, onMounted } from "vue";
import {AppState} from "../AppState.js"



export default {
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

    onMounted(() => {
      getEventById()
    })

    return {
      towerEvent: computed(() => AppState.activeTowerEvent),

      
    }
  }
}
</script>


<style lang="scss" scoped>

</style>