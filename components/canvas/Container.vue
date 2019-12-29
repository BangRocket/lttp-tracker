<template>
  <div class="viewport" :style="canvas" :class="{showborder: border}">
    <Layer
      v-for="(n, index) in layerCount"
      :id="index"
      :ref="'canvas'+index"
      :key="index"
      :height="height"
      :width="width"
    >
    </Layer>
    <slot></slot>
  </div>
</template>

<script>
import Layer from '~/components/canvas/Layer.vue'

export default {
  components: {
    Layer
  },
  props: {
    border: {
      type: Boolean,
      default: false
    },
    layerCount: {
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
      },
      layers: []
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
    for (const canvas in this.$refs) {
      console.log('this:', this)
      this.layers.push(this.$refs[canvas][0].$refs[canvas].getContext('2d'))
    }
    // console.log(this.layers)
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
