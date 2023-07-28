<template>
  <div class="container-fluid">
    <div class="row">
      <h1 class="ms-2 mt-2">Tower</h1>
      <div class="col-12 col-md-11 m-auto bg bg-info rounded elevation-4">
        
        <div v-if="towerEvent" class="row">
          <div  class="col-12 col-md-6">
            <img  class='img-fluid cover-img p-3' :src="towerEvent.coverImg" alt="picture here">
          </div>

          <div class="col-12 col-md-6 mt-2">
            <div>
              <div class="d-flex justify-content-between align-items-center mb-3">
                <i v-if="hasTicket" class="mdi mdi-ticket text-success fs-1" title="You have a ticket for this event!"></i>
              
                <div class="dropdown">
                  <button v-if="towerEvent.creatorId == account.id && !towerEvent.isCanceled" class="btn btn-info dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" title="Tower Options">
                    <i class="mdi mdi-cancel"></i>
                  </button>
                  <ul  class="dropdown-menu">
                    <!-- <li><a class="dropdown-item" @click="editTowerEvent()">Edit Tower</a></li> -->
                    <li><a class="dropdown-item" @click="cancelTowerEvent()" >Cancel Tower</a></li>
                  </ul>
                </div>
              </div>
              </div>
            
            <div class="d-flex justify-content-between align-items-center">
              <h4 class="tower-name">{{towerEvent.name }}</h4>
              <h5>{{ formattedDate }}</h5>
            </div>
            <h5 class="mt-3">{{ towerEvent.location }}</h5>
            <p class="mt-3">{{ towerEvent.description }}</p>
            <p>Capacity: {{ towerEvent.capacity }}</p>

            <div class="d-flex justify-content-between align-items-center">
              <h5>{{ ticketsRemaining }} tickets remaining</h5>
              <div>


                
                <div v-if="isCancelled == true">
                  <h4 class="text-danger" >Cancelled</h4>
                </div>
                <div v-else>
                    <div v-if="-1 < towerEvent.ticketCount && towerEvent.ticketCount < towerEvent.capacity">
                      <button :hidden="hasTicket || !account.id ||isCancelled" @click="createTicket()" class="btn btn-success">Attend Event</button>
                    </div>
                    <div v-else>
                      <h4>No Tickets Remaining</h4>
                    </div>
                  </div>
                
                

            </div>
          </div>
          </div>
        </div>

        <div>
          <div v-if="isCancelled != true" class="col-12 col-md-11 m-auto mt-4 mb-4 bg bg-secondary rounded elevation-4">
            <h5 class="p-2 text-center">Who is attending</h5>
            <div >
              <img class="img-fluid avatar" v-for="t in tickets" :key="t.id" :src="t.profile?.picture" :alt="t.profile.name" :title="t.profile.name">
            </div>
          </div>
        </div>


        <div v-if="isCancelled != true" :hidden="!account.id" class="col-12 col-md-8 m-auto mb-4 rounded bg bg-secondary mt-5 p-3">
          <div>
            <div class="d-flex justify-content-between">
              <h5>What people are saying</h5>
              <button :hidden="!account.id" type="submit" @click="createComment()" class="btn btn-primary">Create Comment</button>
            </div>
            <form>
              <label for="body">Join the conversation...</label>
              <textarea class="comment-input mt-2" v-model="editable.body" name="body" id="body"></textarea>
            </form>
          </div>

          <div v-for="comment in comments" :key="comment.id">
            <div class="d-flex justify-content-between align-items-center">
              <img class="img-fluid avatar" :src="comment.creator.picture" :title="comment.creator.name" alt="">
              <div class="ms-5 bg bg-light mt-4 rounded m-auto comment-card elevation-5 p-2">
                <p class="m-0 p-1">{{ comment.body }}</p>
                <div>
                </div>
              </div>
              <i v-if="comment.creatorId == account.id" @click="removeComment(comment.id)" class="selectable mdi mdi-delete "></i>
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
import { computed, onMounted, onUpdated, ref, watchEffect } from "vue";
import {AppState} from "../AppState.js"
import { TowerEvent } from "../models/TowerEvent.js";
import {ticketsService} from '../services/TicketsService.js'
import {commentsService} from '../services/CommentsService.js'



export default {
  props: {
    towerEventProp: {type: TowerEvent}
  },
  
  setup() {
    const editable = ref({})
    
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

    async function getCommentsByEventId() {
      try {
        const eventId = route.params.eventId
        await commentsService.getCommentsByEventId(eventId)
      } catch (error) {
        Pop.error(error.message)
      }
    }

    onMounted(() => {
      getEventById()
      getCommentsByEventId()
      getTicketsByEventId()
      
    })

    onUpdated(() => {
      
    })


    watchEffect(() => {
      getEventById(route.params.eventId)
      getTicketsByEventId()
      getCommentsByEventId()
      // AppState.activeTowerEvent.isCanceled
    })

    return {
      editable,
      towerEvent: computed(() => AppState.activeTowerEvent),
      account: computed(() => AppState.account),
      tickets: computed(() => AppState.tickets),
      comments: computed(() => AppState.comments),
      hasTicket: computed(()=> {
        return AppState.tickets.find(t=> t.accountId == AppState.account.id)
      }),
      ticketsRemaining: computed(() => {
        return AppState.activeTowerEvent.capacity - AppState.activeTowerEvent.ticketCount
      }),
      formattedDate: computed(() => {
        return AppState.activeTowerEvent.createdAt.toLocaleDateString()
      }),
      isCancelled: computed(() => {
        return AppState.activeTowerEvent.isCanceled
      }),
      

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

      async createTicket() {
        try {
          
          const activeTowerId = route.params.eventId
        const ticketData = {eventId: activeTowerId}

          await ticketsService.createTicket(ticketData)
          AppState.activeTowerEvent.ticketCount ++
        } catch (error) {
          Pop.error(error.message)
        }
      },

      async createComment() {
        try {
          const commentData = editable.value
          commentData.eventId = route.params.eventId
          await commentsService.createComment(commentData)
          editable.value = {}
        } catch (error) {
          Pop.error(error.message)
        }
      },

      async removeComment(commentId) {
        try {
          const wantsToRemove = await Pop.confirm('Are you sure you want to delete this comment?')
          if (!wantsToRemove) {
            return
          }
          
          await commentsService.removeComment(commentId)
        } catch (error) {
          Pop.error(error.message)
        }
      }

    }
  }
}
</script>


<style lang="scss" scoped>
.avatar{
  height: 8vh;
  width: 8vh;
  border-radius: 50%;
  padding: 5px;
}

.comment-input{
  width: 100%;
}

.comment-card{
  width: 75%;
}

.tower-name{
  width: 20ch;
  white-space: wrap;
  
  text-overflow: ellipsis;
}

.cover-img{
  height: 50vh;
  width:  50vw;
  object-fit: cover;
  object-position: center;
  border-radius: 5px;
  border-top: 5px;
}

</style>