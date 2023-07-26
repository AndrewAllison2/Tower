<template>
<div class="container-fluid">
  <!-- SECTION HEADING AND PROMO CARD -->
  <div class="row">
    <h1 class="ms-2">Tower</h1>
    <div class="col-12 col-md-11 m-auto mb-5 ms-2 p-2 bg-secondary rounded elevation-5">
      <div class="ms-2">
        <h3>Beat the scalpers</h3>
        <h3>Beat the lines</h3>
        <h3>Real Events for Real People</h3>
      </div>
    </div>
  </div>
  <!-- SECTION FILTER BUTTONS -->
  <div class="row">
    <div class="col-12 col-md-10 m-auto mb-3">
      <div class="d-flex justify-content-around">
        <h5 class="selectable" @click="filterBy = ''">All</h5>
        <h5 class="selectable" @click="filterBy = 'concert'">Concert</h5>
        <h5 class="selectable" @click="filterBy = 'convention'">Convention</h5>
        <h5 class="selectable" @click="filterBy = 'sport'">Sport</h5>
        <h5 class="selectable" @click="filterBy = 'digital'">Digital</h5>
      </div>
    </div>
  </div>

  <!-- SECTION EVENT CARDS -->
  <div class="row">
    <div class="col-12 col-md-3 mb-3" v-for="towerEvent in towerEvents" :key="towerEvent.id">
      
        <EventCard :towerEventProp="towerEvent" />
      
    </div>
  </div>
</div>
</template>

<script>
import Pop from "../utils/Pop.js";
import { towerEventsService } from '../services/TowerEventsService.js'
import { computed, onMounted, ref } from "vue";
import { AppState } from "../AppState.js";


export default {
  setup() {
    const filterBy = ref('')

    async function getEvents() {
      try {
        await towerEventsService.getEvents()
      } catch (error) {
        Pop.error(error.message)
      }
    }

    onMounted(() => {
      getEvents()
    })
    return {
      filterBy,

      towerEvents: computed(() => {
        if (filterBy.value == '') {
          return AppState.towerEvents
        } else {
          return AppState.towerEvents.filter(a => a.type == filterBy.value)
        }
      })


    }
  }
}
</script>

<style scoped lang="scss">

</style>
