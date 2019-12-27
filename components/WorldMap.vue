<template>
  <span>
    <Container :border="true">
      <Graphic></Graphic>
    </Container>
  </span>
</template>

<script>
import Container from '../components/canvas/Container.vue'
import Graphic from '../components/canvas/Graphic.vue'

export default {
  name: 'WorldMap',
  components: {
    Container,
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
