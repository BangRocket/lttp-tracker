<template>
  <div class="viewport" :style="canvas" :class="{showborder: border}">
    <Layer v-for="(n, index) in layers" :ref="'canvas'+index":id="index" :key="index" :height="height" :width="width">
      <Graphic></Graphic>
    </Layer>
    <slot></slot>
  </div>
</template>

<script>
import Layer from '~/components/canvas/Layer.vue'
import Graphic from '~/components/canvas/Graphic.vue'

export default {
  components: {
    Layer,
    Graphic
  },
  props: {
    border: {
      type: Boolean,
      default: false
    },
    layers: {
      type: [Number, Object],
      default: 2
    },
    height: {
      type: Number,
      default: 100
    },
    width: {
      type: Number,
      default: 100
    }
  },
  data () {
    return {
      // By creating the provider in the data property, it becomes reactive,
      // so child components will update when `context` changes.,
      canvas: {
        // initial size of canvas/container
        height: this.height + 'px',
        width: this.width + 'px'
      }
    }
  },

  // Allows any child component to `inject: ['provider', 'canvas']` and have access to it.
  provide () {
    return {
      canvas: this.canvas
    }
  },
  watch: {

  },

  mounted () {
    console.log('container', this)
  },

  methods: {
  }
}
</script>

<style scoped>
  .viewport {
      /**
      * Position relative so that canvas elements
      * inside of it will be relative to the parent
      */
      position: relative;
  }

  .viewport canvas {
      /**
      * Position absolute provides canvases to be able
      * to be layered on top of each other
      * Be sure to remember a z-index!
      */
      position: absolute;
  }
</style>
