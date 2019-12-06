<template>
  <table>
    <tr>
      <th
        v-for="col in columns"
        :key="col.id"
        :style="{ width: col.width }"
      >
        {{ col.name }}
      </th>
    </tr>
  </table>
</template>

<script>
export default {
  name: 'ItemTable',
  props: {
    columnList: {
      type: [String],
      default: 'undefined'
    }
  },
  data () {
    return {
      columns: JSON.parse(this.columnList)
    }
  }
}
</script>
