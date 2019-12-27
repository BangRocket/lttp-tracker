<template>
  <div class="canvas-wrapper" :style="canvasData" :class="{showborder: border}">
    <canvas ref="main-canvas" :height="canvasData.height" :width="canvasData.width"></canvas>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    border: {
      type: Boolean,
      default: false
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
      // so child components will update when `context` changes.
      provider: {
        // This is the CanvasRenderingContext that children will draw to.
        context: null
      },
      canvasData: {
        // initial size of canvas/container
        height: this.height + 'px',
        width: this.width + 'px'
      },
      canvas: null
    }
  },

  // Allows any child component to `inject: ['provider', 'canvas']` and have access to it.
  provide () {
    return {
      provider: this.provider,
      canvas: this.canvasData
    }
  },
  watch: {

  },

  mounted () {
    this.canvas = this.$refs['main-canvas']

    // We can't access the rendering context until the canvas is mounted to the DOM.
    // Once we have it, provide it to all child components.
    this.provider.context = this.canvas.getContext('2d')

    // Resize the canvas to fit its parent's width.
    // Normally you'd use a more flexible resize system.
    this.canvas.height = this.canvas.parentElement.clientHeight
    this.canvas.width = this.canvas.parentElement.clientWidth

    // this.canvas = canvasObj
    this.canvasData.height = this.canvas.parentElement.clientHeight
    this.canvasData.width = this.canvas.parentElement.clientWidth
  },

  methods: {
  }
}
</script>

<style scoped>
.showborder {
  border: 5px solid red;
}
</style>
