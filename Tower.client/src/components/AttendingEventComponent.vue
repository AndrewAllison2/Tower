<template>
  <div v-if="towerEvent?.isCanceled != true" class="col-12 col-md-11 m-auto mt-4 mb-4 bg bg-secondary rounded elevation-4">
            <h5 class="p-2 text-center">Who is attending</h5>
            <div >
              <img class="img-fluid avatar" v-for="t in tickets" :key="t.id" :src="t.profile?.picture" :alt="t.profile.name" :title="t.profile.name">
            </div>
          </div>

</template>


<script>
export default {
  setup(){
    return {}
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
</style>