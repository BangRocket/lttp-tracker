<template>
  <span>
    <CanvasTest style="width: 100%; height: 600px;">
      <!-- <canvas-box
        v-for="(obj, index) in chartValues"
        :key="index"
        :x1="((index / chartValues.length) * 100)"
        :x2="((index / chartValues.length) * 100) + (100 / chartValues.length)"
        :y1="100"
        :y2="100 - obj.val"
        :color="obj.color"
        :value="obj.val"
      >

      </canvas-box> -->
      <CanvasImage></CanvasImage>
    </CanvasTest>
  </span>
</template>

<script>
import CanvasTest from '../components/canvas/CanvasTest.vue'
import CanvasImage from '../components/canvas/CanvasImage.vue'
// import CanvasBox from '../components/canvas/CanvasBox.vue'

export default {
  name: 'WorldMap',
  components: {
    CanvasTest,
    // CanvasBox
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
      chartValues: [
        { val: 24, color: 'red' },
        { val: 32, color: '#0f0' },
        { val: 66, color: 'rebeccapurple' },
        { val: 1, color: 'green' },
        { val: 28, color: 'blue' },
        { val: 60, color: 'rgba(150, 100, 0, 0.2)' }
      ]
    }
  },
  computed: {
    // iconUrl () {
    // return require('./assets/img.png')
    // The path could be '../assets/img.png', etc., which depends on where your vue file is
    // }
  },
  created () {
  },
  mounted () {
    let dir = 1
    let selectedVal = Math.floor(Math.random() * this.chartValues.length)

    setInterval(() => {
      if (Math.random() > 0.995) { dir *= -1 }
      if (Math.random() > 0.99) { selectedVal = Math.floor(Math.random() * this.chartValues.length) }

      this.chartValues[selectedVal].val = Math.min(Math.max(this.chartValues[selectedVal].val + dir * 0.5, 0), 100)
    }, 16)
  },
  methods: {
    test: () => {

    }
  }
}
</script>

<style scoped>

</style>
