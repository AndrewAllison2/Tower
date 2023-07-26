<template>
  <div class="container-fluid">
    <div class="row">
      <h1>Tower</h1>
      <div class="col-12 col-md-10 m-auto bg bg-info rounded elevation-4">
        
        <div v-if="towerEvent" class="row">
          <div  class="col-12 col-md-5">
            <img  class='img-fluid' :src="towerEvent.coverImg" alt="picture here">
          </div>
          <div class="col-12 col-md-7">
            <div class="d-flex">
                {{ towerEvent.name }}
                {{ towerEvent.startDate }}
            </div>
            <div class="d-flex">
              {{ towerEvent.location }}
              {{ towerEvent.capacity }}
            </div>
          </div>
          </div>
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
      towerEvent: computed(()=> AppState.activeTowerEvent)
    }
  }
}
</script>


<style lang="scss" scoped>

</style>