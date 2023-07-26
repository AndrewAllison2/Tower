<template>
  <div class="container-fluid">
    <div class="row">
      <h1>Tower</h1>
      <div class="col-12 col-md-3">
        <h4>My Events</h4>
        <div >
          My events go here
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { AppState } from '../AppState';

export default {
    setup() {
        return {
          account: computed(() => AppState.account)
          
        };
    },
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
