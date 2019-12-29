<template>
  <span>
    <LightWorldMap
      :height="800"
      :width="800"
      :border="true"
    >
      <Graphic v-for="(point, index) in poi" :key="'g-'+index" :target="'poi'"></Graphic>
    </LightWorldMap>
  </span>
</template>

<script>
import LightWorldMap from '../components/LightWorldMap.vue'
import Graphic from '../components/canvas/Graphic.vue'

export default {
  name: 'WorldMap',
  components: {
    LightWorldMap,
    Graphic
  },
  props: {
    id: {
      type: [String],
      default: 'worldmap'
    }
  },
  data () {
    return {
      poi: {
        type: Array,
        default () {
          return []
        }
      }
    }
  },
  computed: {

  },
  created () {

  },
  mounted () {

  },
  methods: {
    test: () => {

    }
  }
}
</script>

<style scoped>

</style>
