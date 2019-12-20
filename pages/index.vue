<template>
  <span>
    <WorldMap></WorldMap>
  </span>
</template>

<script>
import WorldMap from '../components/WorldMap.vue'

export default {
  name: 'LandingPage',
  components: {
    WorldMap
  },
  props: {
  },
  data: () => ({
  })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
