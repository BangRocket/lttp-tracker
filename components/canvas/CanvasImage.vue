<script>
export default {
  // Gets us the provider property from the parent <my-canvas> component.
  inject: ['provider', 'canvas'],

  props: {
    // image to render
    image: {
      type: String,
      default: 'map/poi.png'
    },

    // Start coordinates (x and y of top left of source image).
    dx: {
      type: Number,
      default: 0
    },
    dy: {
      type: Number,
      default: 0
    },

    // width and height to draw image (scaling in px)
    dWidth: {
      type: Number,
      default: 600
    },
    dHeight: {
      type: Number,
      default: 600
    },

    // Start coordinates of sub-rectangle (x and y of based on source image or sWidth/sHeight).
    sx: {
      type: Number,
      default: 0
    },
    sy: {
      type: Number,
      default: 0
    },

    // size of sub-rectangle image
    sWidth: {
      type: Number,
      default: 0
    },
    sHeight: {
      type: Number,
      default: 0
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
    getImage () {
      if (!this.image) {
        return
      }

      // TODO: this is something I need to do
      // const fileName = this.selectedDog.toLowerCase()

      return require(`../../assets/${this.image}`)
    },
    canvasImage () {
      if (!this.provider.context) { return }
      const ctx = this.provider.context

      const img = new Image()
      img.src = this.getImage()
      this.canvas.height = '810px'
      this.canvas.width = '810px'
      img.onload = function () {
        ctx.drawImage(img, 0, 0, 800, 800)
      }
    }
  },

  render () {
    return this.canvasImage()
  }
}
</script>
