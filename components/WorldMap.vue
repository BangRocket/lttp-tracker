<template>
  <span>
    <CanvasContainer :border="true">
      <CanvasImage></CanvasImage>
    </CanvasContainer>
  </span>
</template>

<script>
import CanvasContainer from '../components/canvas/CanvasContainer.vue'
import CanvasImage from '../components/canvas/CanvasImage.vue'

export default {
  name: 'WorldMap',
  components: {
    CanvasContainer,
    CanvasImage
  },
  props: {
    id: {
      type: [String],
      default: 'worldmap'
    }
  },
  data () {
    return {

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
