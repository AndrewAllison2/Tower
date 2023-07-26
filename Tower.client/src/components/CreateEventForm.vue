<template>

<form @submit.prevent="createTowerEvent()">
          <div class="mb-3">
            <label for="name" class="form-label">Name Of Event</label>
            <input v-model="editable.name" type="text" required class="form-control" id="name" placeholder="Name of Event..." minlength="2" maxlength="100">
          </div>
          <div class="mb-3">
            <label for="coverImg" class="form-label">Cover Image</label>
            <input v-model="editable.coverImg" type="url" required class="form-control" id="coverImg" placeholder="Cover Image..." minlength="1" maxlength="300">
          </div>
          <div class="mb-3">
            <label for="location" class="form-label">Location</label>
            <input v-model="editable.location" type="text" required class="form-control" id="location" placeholder="Location..." minlength="1" maxlength="75">
          </div>
          <div class="mb-3">
            <label for="capacity" class="form-label">Capacity</label>
            <input v-model="editable.capacity" type="number" required class="form-control" id="capacity" placeholder="Capacity..." >
          </div>
          <div class="mb-3">
            <label for="startDate" class="form-label">Start Date</label>
            <input v-model="editable.startDate" type="date" required class="form-control" id="startDate" placeholder="Start Date..." >
          </div>
          <label for="type" class="form-label">What type of event is this</label>
          <select v-model="editable.type" required class="form-select mb-3" id="type">
            <option v-for="type in types" :key="type" :value="type">
            {{ type }}</option>
          </select>
          <div class="mb-3">
            <label for="description" class="form-label">Description Of Event</label>
            <input v-model="editable.description" type="text" required class="form-control" id="description" placeholder="Description of Event..." minlength="10" maxlength="1000">
          </div>
          <div class="d-flex justify-content-end">
            <button type="submit" class="btn btn-success text-light">Create Tower</button>
            </div>
        </form>

</template>


<script>
import { ref } from "vue";
import { useRoute } from "vue-router";
import Pop from "../utils/Pop.js";
import { towerEventsService } from "../services/TowerEventsService.js";
import { logger } from "../utils/Logger.js";

export default {
  setup() {
    const editable = ref({})
    const router = useRoute()
    return {
      editable,
      types: ['concert', 'convention', 'sport', 'digital'],

      async createTowerEvent() {
        try {
          logger.log('creating event')
          const eventData = editable.value
          const towerEvent = await towerEventsService.createTowerEvent(eventData)
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