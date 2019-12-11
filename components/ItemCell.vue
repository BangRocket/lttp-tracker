<template>
  <div
    :style="{ height: '64px', width: '64px', display:'inline-block', backgroundImage: backgroundImage, position: 'relative' }"
    :class="isActive ? 'true' : 'false'"
    @click.stop="clickCellForward"
    @contextmenu.prevent.stop="clickCellBack"
  >
    <span
      v-if="textCounter !== null"
      class="textCounter"
    >{{ textCounter }}</span>
    <ItemCellOverlay
      v-if="isLabel"
      overlay-type="label"
      location="top-left"
      :reference="bossNum"
    >
    </ItemCellOverlay>
    <ItemCellOverlay
      v-if="isChest"
      overlay-type="chest"
      location="bottom-left"
      :reference="bossNum"
    >
    </ItemCellOverlay>
    <ItemCellOverlay
      v-if="isPrize"
      overlay-type="prize"
      location="bottom-right"
      :reference="bossNum"
    >
    </ItemCellOverlay>
    <ItemCellOverlay
      v-if="isMedallion"
      overlay-type="medallion"
      location="top-right"
      :reference="bossNum"
    >
    </ItemCellOverlay>
    <span
      v-if="bigKeyImage"
      :style="{ display: 'block', position: 'absolute', height: '32px', width: '16px', top: '32px', backgroundImage: bigKeyImage }"
      @click.stop="clickBigKey"
      @contextmenu.prevent.stop="clickBigKey"
    ></span>
    <span
      v-if="smallKeyImage"
      :style="{ display: 'block', position: 'absolute', height: '32px', width: '16px', top: '32px', left: '16px', backgroundImage: smallKeyImage }"
      @click.stop="clickSmallKeyForward"
      @contextmenu.prevent.stop="clickSmallKeyBack"
    ></span>
  </div>
</template>

<script>
/* eslint-disable no-tabs */
import { mapState, mapGetters } from 'vuex'
import { itemsMin, itemsMax } from '../script/items.js'
import { db } from '../db/db.js'

import ItemCellOverlay from './ItemCellOverlay.vue'

export default {
  name: 'ItemCell',
  components: {
    ItemCellOverlay
  },
  props: [
    'itemValue',
    'itemName',
    'columnIndex',
    'rowIndex'
  ],
  data () {
    return {
      value: this.itemValue || '',
      name: this.itemName || '',
      boss: this.bossNum || 0,
      prize: 0,
      medallion: 0,
      chest: 1,
      keys: 0
    }
  },
  computed: {
    bossNum () {
      // console.log(this.name, this.name.indexOf('boss'), this.name.substring(4))
      // eslint-disable-next-line unicorn/prefer-includes
      if (this.name.indexOf('boss') === -1) {
        return null
      }
      return this.name.substring(4)
    },
    chestNum () {
      return ''
    },
    isLabel () {
      if (
        this.bossNum &&
        this.settings &&
        this.settings.showlabels
      ) {
        return true
      }
      return false
    },
    textCounter () {
      if (this.name.indexOf('heart') === 0) {
        return this.value
      }
      return null
    },
    backgroundImage () {
      // TODO: move bosses into separate folder
      if (this.name === 'blank') {
        return this.settings.editmode ? 'url(./assets/items/blank.png)' : 'none'
      } else if (typeof this.value === 'boolean') {
        return 'url(./assets/items/' + this.name + '.png)'
      } else if (this.textCounter !== null) {
        return 'url(./assets/items/' + this.name + '.png)'
      }
      return (
        'url(./assets/items/' +
        this.name +
        (this.settings.editmode
          ? itemsMax[this.name]
          : this.value || '0') +
        '.png)'
      )
    },
    isActive () {
      return this.settings.editmode || this.value
    },
    isChest () {
      if (
        this.bossNum &&
        this.settings &&
        this.settings.showchests
      ) {
        return true
      }
      return false
    },
    bigKeyImage () {
      if (
        this.bossNum &&
        this.settings &&
        this.settings.showbigkeys &&
        this.trackerData.bigkeys
      ) {
        if (this.trackerData.bigkeys[this.bossNum]) {
          return 'url(./assets/items/bigkey.png)'
        } else {
          return 'url(./assets/items/nothing.png)'
        }
      }
      return null
    },
    smallKeyImage () {
      if (
        this.bossNum &&
        this.settings &&
        this.settings.showsmallkeys &&
        this.trackerData.smallkeys
      ) {
        if (this.trackerData.smallkeys[this.bossNum] > 0) {
          return (
            'url(./assets/items/smallkey' +
            this.trackerData.smallkeys[this.bossNum] +
            '.png)'
          )
        } else {
          return 'url(./assets/items/nothing.png)'
        }
      }
      return null
    },
    isPrize () {
      if (
        this.bossNum &&
        this.bossNum !== '10' &&
        this.settings &&
        this.settings.showprizes
      ) {
        return true
      }
      return false
    },
    isMedallion () {
      if (
        (this.bossNum === '8' || this.bossNum === '9') &&
        this.settings &&
        this.settings.showmedals
      ) {
        return true
      }
      return false
    },
    ...mapState(['trackerData', 'settings', 'isRoomLoaded']),
    ...mapGetters(['updateRows'])
  },
  watch: {
    value (newVal, oldVal) {
      console.log(this.type(), 'changed -', this.name, '. was: ', oldVal, ' is: ', newVal)
      if (this.type() === 'boss') {
        this.trackerData.dungeonbeaten.splice(this.bossNum, 1, !this.trackerData.dungeonbeaten[this.bossNum])
      }
      this.trackerData.items[this.name] = this.value
    }
  },
  created () {
    console.log(this.itemRows)
  },
  methods: {
    type () {
      return this.bossNum === null ? 'item' : 'boss'
    },
    clickCell (amt) {
      if (this.settings.editmode) {
        this.updateRows(this.rowIndex, this.columnIndex, this.settings.selected.item || 'blank')
      }
      // Non-edit mode clicks
      if (this.bossNum) {
        // Do both this and the below for bosses
        // room
        // 	.child('dungeonbeaten')
        // 	.child(this.bossnum)
        // 	.set(!this.trackerdata.dungeonbeaten[this.bossnum])
      }

      if (typeof this.value === 'boolean') {
        // room
        // 	.child('items')
        // 	.child(this.name)
        // 	.set(!this.value)
        this.value = !this.value
      } else {
        let newVal = (this.value || 0) + amt
        if (newVal > itemsMax[this.name]) {
          newVal = itemsMin[this.name]
        }
        if (newVal < itemsMin[this.name]) {
          newVal = itemsMax[this.name]
        }
        // room
        // 	.child('items')
        // 	.child(this.name)
        // 	.set(newVal)
        this.value = newVal
      }
    },
    clickCellForward (e) {
      this.clickCell(1)
    },
    clickCellBack (e) {
      this.clickCell(-1)
    },
    clickBigKey (e) {
      db.room
        .child('bigkeys')
        .child(this.bossNum)
        .set(!this.trackerData.bigkeys[this.bossNum])
    },
    clickSmallKey (amt) {
      const keyitem = 'key' + this.bossNum
      const modamt = itemsMax[keyitem] + 1
      const newVal =
        (this.trackerData.smallkeys[this.bossNum] + amt + modamt) % modamt
      db.room
        .child('smallkeys')
        .child(this.bossNum)
        .set(newVal)
    },
    clickSmallKeyForward (e) {
      this.clickSmallKey(1)
    },
    clickSmallKeyBack (e) {
      this.clickSmallKey(-1)
    }
  }
}
</script>
