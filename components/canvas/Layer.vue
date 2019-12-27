<template>
  <canvas
    :id="layername"
    :ref="layername"
    :height="height"
    :width="width"
    :style="style"
  ><slot></slot></canvas>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      default: 1
    },
    // size of layer, usually set by container
    height: {
      type: Number,
      default: 100
    },
    width: {
      type: Number,
      default: 100
    },
    // image to render as 'background'
    image: {
      type: String,
      default: 'nothing.png'
    }
  },
  data () {
    return {
      layername: 'canvas' + this.id,
      // By creating the provider in the data property, it becomes reactive,
      // so child components will update when `context` changes.
      provider: {
        // This is the CanvasRenderingContext that children will draw to.
        context: null
      },
      style: {
        'z-index': this.id
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
    this.canvas = this.$refs[this.layername]

    // We can't access the rendering context until the canvas is mounted to the DOM.
    // Once we have it, provide it to all child components.
    this.provider.context = this.canvas.getContext('2d')

    const ctx = this.canvas.getContext('2d')
    ctx.font = '30px Arial'
    ctx.fillStyle = 'yellow'
    ctx.fillText(`${this.layername}`, 10, ((50 * this.id) + 50))
  },

  methods: {

  }
}
</script>

<style scoped>
.showborder {
  border: 5px solid red;
}

canvas {
  background-color: transparent;
}
</style>
