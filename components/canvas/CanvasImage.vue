<script>
// Note how there's no template or styles in this component.

// Helper functions to convert a percentage of canvas area to pixels.
// const percentWidthToPix = (percent, ctx) => Math.floor((ctx.canvas.width / 100) * percent)
// const percentHeightToPix = (percent, ctx) => Math.floor((ctx.canvas.height / 100) * percent)

export default {
  // Gets us the provider property from the parent <my-canvas> component.
  inject: ['provider'],

  props: {
    // Start coordinates (percentage of canvas dimensions).
    x1: {
      type: Number,
      default: 0
    },
    y1: {
      type: Number,
      default: 0
    },

    // End coordinates (percentage of canvas dimensions).
    x2: {
      type: Number,
      default: 0
    },
    y2: {
      type: Number,
      default: 0
    },

    // image to render
    image: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
    }
  },
  computed: {

  },
  mounted () {

  },

  methods: {
    mapLoc () {
      return require('../../assets/map/WorldMap-LightWorld.png')
    },
    canvasImage () {
      if (!this.provider.context) { return }
      const ctx = this.provider.context

      // eslint-disable-next-line prefer-const
      let img = new Image()
      img.src = this.mapLoc()
      img.onload = function () {
        ctx.drawImage(img, 0, 0)
      }
    }
  },

  // eslint-disable-next-line vue/require-render-return
  render () {
    this.canvasImage()
  }
}
</script>
