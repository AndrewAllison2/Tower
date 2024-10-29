<template>

  <router-link :to="{name: 'TowerEvent', params: {eventId: towerEventProp.id}}">
    <div class="card elevation-4 p-2 card-container selectable">
            <img class="img-fluid event-cover-img" :src="towerEventProp.coverImg" alt="">
            <div class="card-info text-center rounded p-3 m-auto">
              <h5>{{ towerEventProp.name }}</h5>
            </div>
          </div>
  </router-link>

</template>


<script>
import { TowerEvent } from "../models/TowerEvent.js";

export default {
  props: {
    towerEventProp: {type: TowerEvent, required: true}
  },

  setup(){
    return {}
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
.card-container{
  position: relative;
  justify-content: center;
  align-items: center;
  box-shadow: 1px 2px 5px 2px rgb(0, 174, 255);

}
.card-info{
  position: absolute;
  background-color: aliceblue;
  top: 12em;
  opacity: 80%;
  height: 19%;
  width: 13.7em;
}
h5{
  width: 10em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
