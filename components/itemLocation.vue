<template>
  <tr>
    <td>
      {{ id }}
    </td>
    <td>
      {{ name }}
    </td>
    <td>
      {{ reqs }}
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
      default: '{}'
    },
    x: {
      type: [Number],
      default: 0
    },
    y: {
      type: [Number],
      default: 0
    }
  },
  data () {
    return {

      isOpened: false
    }
  },
  methods: {
    isAvailable () {
      return false
    }
  }
}
</script>

<style scoped>

</style>
