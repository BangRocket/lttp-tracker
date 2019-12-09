<template>
  <tbody>
    <tr>
      <td>
        {{ id }}
      </td>
      <td>
        {{ name }}
      </td>
      <td>
        {{ requirements() }}
      </td>
      <td>
        {{ isOpened }}
      </td>
      <td>
        {{ isAvailable() }}
      </td>
      <td>
        <button type="button">
          toggle state
        </button>
      </td>
    </tr>
  </tbody>
</template>

<script>
export default {
  name: 'ItemLocation',
  props: {
    id: {
      type: [Number],
      default: -1
    },
    name: {
      type: [String],
      default: 'undefined'
    },
    reqs: {
      type: [String],
      default: '[{"name":"thing"}]'
    },
    x: {
      type: [String],
      default: '0px'
    },
    y: {
      type: [String],
      default: '0px'
    }
  },
  data () {
    return {

      isOpened: false
    }
  },
  computed: {

  },
  methods: {
    isAvailable () {
      return false
    },
    requirements () {
      // console.log(JSON.parse(this.reqs))
      return '[]' // JSON.parse(this.reqs)
    }
  }
}
</script>

<style scoped>

</style>
