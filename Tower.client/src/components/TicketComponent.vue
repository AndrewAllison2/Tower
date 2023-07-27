<template>
  <div class="elevation-5 card mt-4">
    <div class="d-flex">
      <img class="img-fluid" :src="towerEvent?.coverImg" alt="">
      <div>
        <h4>{{ towerEventProp.title }}</h4>
        <p>{{ towerEventProp.location }}</p>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    towerEventProp: { type: Object, required: true }
  } ,
  
  setup(){
    return {}
  }
}
</script>


<style lang="scss" scoped>

</style>