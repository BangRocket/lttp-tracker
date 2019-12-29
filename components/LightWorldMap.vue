<template>
  <div class="viewport" :style="style" :class="{showborder: border}">
    <Layer
      :id="0"
      :key="0"
      :ref="'bg'"
      :name="'bg'"
      :height="height"
      :width="width"
    ></Layer>
    <Layer
      :id="1"
      :key="1"
      :ref="'poi'"
      :name="'poi'"
      :height="height"
      :width="width"
    ></Layer>
    <Layer
      :id="2"
      :key="2"
      :ref="'overlay'"
      :name="'overlay'"
      :height="height"
      :width="width"
    ></Layer>
    <Layer
      :id="3"
      :key="3"
      :ref="'text'"
      :name="'text'"
      :height="height"
      :width="width"
    ></Layer>
    <slot></slot>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import Layer from '../components/canvas/Layer.vue'

export default {
  name: 'LightWorldMap',
  components: {
    Layer
  },
  props: {
    id: {
      type: [String],
      default: 'lightworldmap'
    },
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
      style: {
        // initial size of canvas/container
        height: this.height + 'px',
        width: this.width + 'px'
      },
      layername: 'canvas' + this.id
    }
  },
  computed: {

  },
  created () {

  },
  mounted () {
    for (const canvas in this.$refs) {
      // console.log('this:', this)
      console.log(this.$refs[canvas].$refs[canvas])
      // this.context({ layer: canvas, context: this.$refs[canvas].$el })
      // this.layers.push(this.$refs[canvas][0].$refs[canvas].getContext('2d'))
    }
  },
  provide () {
    return {
      layers: this.$refs
    }
  },
  methods: {
    ...mapMutations({
      context: 'canvas/setContext'
    })
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

  canvas {
    background-color: transparent;
  }

  .showborder {
  border: 5px solid red;
}
</style>
