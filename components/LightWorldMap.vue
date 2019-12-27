<template>
  <span>
    <Container :height="800" :width="800" :border="true" :layers="2">
    </Container>
  </span>
</template>

<script>
import Container from '../components/canvas/Container.vue'

export default {
  name: 'LightWorldMap',
  components: {
    Container
  },
  props: {
    id: {
      type: [String],
      default: 'lightworldmap'
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
