<template>
  <table>
    <thead>
      <tr>
        <th
          v-for="col in columns"
          :key="col.id"
          :style="{ width: col.width }"
        >
          {{ col.name }}
        </th>
      </tr>
    </thead>
    <itemLocation
      v-for="chest in chests"
      :id="chest.id"
      :key="chest.id"
      :name="chest.name"
      :reqs="chest.reqs"
      :x="chest.x"
      :y="chest.y"
    ></itemLocation>
  </table>
</template>

<script>
import itemLocation from '../components/itemLocation.vue'
import { chests } from '../plugins/chests.js'

export default {
  name: 'ItemTable',
  components: {
    itemLocation
  },
  props: {
    columnList: {
      type: [String],
      default: 'undefined'
    }
  },
  data () {
    return {
      chests,
      columns: JSON.parse(this.columnList)
    }
  }
}
</script>
