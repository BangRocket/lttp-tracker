<template>
  <div>
    <div
      class="vueTrackerTable"
      :style="{}"
    >
      <div
        v-for="(itemRow, itemRowIndex) in itemRows"
        :key="itemRowIndex"
      >
        <!-- <div
          :style="{ width: (maxRowLength - itemRow.length) * 32 + 'px', display:'inline-block' }"
          class="rowSpacer"
        ></div> -->
        <ItemCell
          v-for="(item, itemColumnIndex) in itemRow"
          :key="(item === 'blank' ? item + itemColumnIndex : item)"
          :item-name="item"
          :item-value="itemFor(item)"
          :column-index="itemColumnIndex"
          :row-index="itemRowIndex"
        ></ItemCell>
        <button
          v-if="settings && settings.editmode"
          :style="{backgroundColor: 'red', color: 'white', verticalAlign: 'top', marginTop: '20px'}"
          @click.prevent.stop="removeItem(itemRowIndex)"
        >
          -
        </button>
        <button
          v-if="settings && settings.editmode"
          :style="{backgroundColor: 'green', color: 'white', verticalAlign: 'top', marginTop: '20px'}"
          @click.prevent.stop="addItem(itemRowIndex)"
        >
          +
        </button>
      </div>
      <button
        v-if="settings && settings.editmode"
        @click.prevent.stop="addRow"
      >
        Add row
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import { store } from '../../store/store.js'
// import { db } from '../db/db.js'
import ItemCell from './ItemCell.vue'

export default {
  name: 'ItemTable',
  components: { ItemCell },
  data () {
    return {
      // records: store.state,
      itemData: this.getItemData()
    }
  },
  computed: {
    maxRowLength () {
      return !this.itemRows.reduce
        ? 0
        : this.itemRows
          .map(function (i) {
            return i.length
          })
          .reduce(function (a, b) {
            return Math.max(a, b)
          })
    }
  },
  methods: {
    itemFor (itemName) {
      if (!this.trackerData || !this.trackerData.items) {
        return null
      }
      // console.log(this.itemData)
      // console.log(this.trackerData.items[itemName])
      return this.trackerData.items[itemName]
    },
    getItemData () {
      // const check = await db.room.child('items').once('value')
      // // console.log(check.val())
      // if (!(check.val() === null)) {
      //   return check.val()
      // }
      return this.trackerData.items
    },
    addRow (e) {
      this.itemRows.push(['blank'])
    },
    addItem (rowIndex) {
      this.itemRows[rowIndex].push('blank')
    },
    removeItem (rowIndex) {
      this.itemRows[rowIndex].pop()
      if (this.itemRows[rowIndex].length === 0) {
        this.itemRows.splice(rowIndex, 1)
      }
    },
    ...mapState(['trackerData', 'settings', 'itemRows', 'isRoomLoaded'])
  }
}
</script>

<style>
.true {
  opacity: 1;
}

.false {
  opacity: 0.25;
}
</style>
