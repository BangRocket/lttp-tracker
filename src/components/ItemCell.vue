<template>
	<div
		:style="{ height: '64px', width: '64px', display:'inline-block', backgroundImage: backgroundImage, position: 'relative' }"
		:class="isActive ? 'true' : 'false'"
		@click.stop="clickCellForward"
		@contextmenu.prevent.stop="clickCellBack"
	>
		<span
			v-if="dungeonLabel"
			class="corner"
			:style="{ display: 'block', position: 'absolute'}"
		>{{ dungeonLabel }}</span>
		<span
			v-if="textCounter !== null"
			class="textCounter"
		>{{ textCounter }}</span>
		<ItemCellOverlay
			v-if="chestImage"
			overlay-type="prize"
		>
		</ItemCellOverlay>
		<!-- <span
			v-if="chestImage"
			:style="{ display: 'block', position: 'absolute', height: '32px', width: '32px', top: '32px', backgroundImage: chestImage }"
			@click.stop="clickChestBack"
			@contextmenu.prevent.stop="clickChestForward"
		></span> -->
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
		<span
			v-if="prizeImage"
			:class="'prize'"
			:style="{ display: 'block', position: 'absolute', height: '32px', width: '32px', top: '32px', left: '32px', backgroundImage: prizeImage }"
			@click.stop="clickPrizeForward"
			@contextmenu.prevent.stop="clickPrizeBack"
		></span>
		<span
			v-if="medallionImage"
			:style="{ display: 'block', position: 'absolute', height: '32px', width: '32px', left: '32px', backgroundImage: medallionImage }"
			@click.stop="clickMedallionForward"
			@contextmenu.prevent.stop="clickMedallionBack"
		></span>
	</div>
</template>

<script>
import { Locations } from '../script/chests.js'
import { mapState } from 'vuex'
import { store } from '../store/store.js'
import { itemsMin, itemsMax } from '../script/items.js'
import { room } from '../db/db.js'

import ItemCellOverlay from '../components/ItemCellOverlay.vue'

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
	data: function () {
		return {
			value: this.itemValue,
			name: this.itemName,
			boss: this.bossNum,
			prize: 0,
			medallion: 0,
			chest: 1,
			keys: 0
		}
	},
	computed: {
		bossNum: function () {
			// console.log(this.name, this.name.indexOf('boss'), this.name.substring(4))
			if (this.name.indexOf('boss') === -1) {
				return null
			}
			return this.name.substring(4)
		},
		chestNum: function () {
			return ''
		},
		dungeonLabel: function () {
			if (
				this.bossNum &&
				this.trackerOptions &&
				this.trackerOptions.showlabels
			) {
				return Locations.data.dungeons[this.bossNum].label
			}
			return null
		},
		textCounter: function () {
			if (this.name.indexOf('heart') === 0) {
				return this.value
			}
			return null
		},
		backgroundImage: function () {
			// TODO: move bosses into separate folder
			if (this.name === 'blank') {
				return this.trackerOptions.editmode ? 'url(./assets/items/blank.png)' : 'none'
			} else if (typeof this.value === 'boolean') {
				return 'url(./assets/items/' + this.name + '.png)'
			} else if (this.textCounter !== null) {
				return 'url(./assets/items/' + this.name + '.png)'
			}
			return (
				'url(./assets/items/' +
				this.name +
				(this.trackerOptions.editmode
					? itemsMax[this.name]
					: this.value || '0') +
				'.png)'
			)
		},
		isActive: function () {
			return this.trackerOptions.editmode || this.value
		},
		chestImage: function () {
			if (
				this.bossNum &&
				this.trackerOptions &&
				this.trackerOptions.showchests
			) {
				return (
					'url(./assets/chests/chest' +
					this.chest +
					'.png)'
				)
			}
			return null
		},
		bigKeyImage: function () {
			if (
				this.bossNum &&
				this.trackerOptions &&
				this.trackerOptions.showbigkeys &&
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
		smallKeyImage: function () {
			if (
				this.bossNum &&
				this.trackerOptions &&
				this.trackerOptions.showsmallkeys &&
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
		prizeImage: function () {
			if (
				this.bossNum &&
				this.bossNum !== '10' &&
				this.trackerOptions &&
				this.trackerOptions.showprizes
			) {
				return (
					'url(./assets/dungeon/dungeon' +
					this.prize +
					'.png)'
				)
			}
			return null
		},
		medallionImage: function () {
			if (
				(this.bossNum === '8' || this.bossNum === '9') &&
				this.trackerOptions &&
				this.trackerOptions.showmedals
			) {
				return (
					'url(/assets/items/medallion' +
					this.medallion +
					'.png)'
				)
			}
			return null
		},
		...mapState(['trackerData', 'trackerOptions', 'isRoomLoaded'])
	},
	watch: {
		value: function (newVal, oldVal) {
			console.log(newVal, oldVal, this.type(), this.prize)
		}
	},
	methods: {
		type: function () {
			return this.bossNum === null ? 'item' : 'boss'
		},
		clickCell: function (amt) {
			console.log(this.boss, this.type)
			if (this.trackerOptions.editmode) {
				store.commit('updateRows', this.rowIndex, this.columnIndex, this.trackerOptions.selected.item || 'blank')
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
				var newVal = (this.value || 0) + amt
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
		clickCellForward: function (e) {
			this.clickCell(1)
		},
		clickCellBack: function (e) {
			this.clickCell(-1)
		},
		clickMedallion: function (amt) {
			// room
			// 	.child('medallions')
			// 	.child(this.bossNum)
			// 	.set((this.trackerData.medallions[this.bossNum] + amt + 4) % 4)
			this.medallion = (this.medallion + amt + 4) % 4
		},
		clickMedallionForward: function (e) {
			this.clickMedallion(1)
		},
		clickMedallionBack: function (e) {
			this.clickMedallion(-1)
		},
		clickChest: function (amt) {
			var chestitem = 'chest' + this.bossNum
			var modamt = itemsMax[chestitem] + 1
			var newVal =
				(this.chest + amt + modamt) % modamt
			// room
			// 	.child('dungeonchests')
			// 	.child(this.bossNum)
			// 	.set(newVal)
			this.chest = newVal
		},
		clickChestForward: function (e) {
			this.clickChest(1)
		},
		clickChestBack: function (e) {
			this.clickChest(-1)
		},
		clickBigKey: function (e) {
			room
				.child('bigkeys')
				.child(this.bossNum)
				.set(!this.trackerData.bigkeys[this.bossNum])
		},
		clickSmallKey: function (amt) {
			var keyitem = 'key' + this.bossNum
			var modamt = itemsMax[keyitem] + 1
			var newVal =
				(this.trackerData.smallkeys[this.bossNum] + amt + modamt) % modamt
			room
				.child('smallkeys')
				.child(this.bossNum)
				.set(newVal)
		},
		clickSmallKeyForward: function (e) {
			this.clickSmallKey(1)
		},
		clickSmallKeyBack: function (e) {
			this.clickSmallKey(-1)
		},
		clickPrize: function (amt) {
			// room
			// 	.child('prizes')
			// 	.child(this.bossNum)
			// 	.set((this.trackerData.prizes[this.bossNum] + amt + 5) % 5)
			this.prize = (this.prize + amt + 5) % 5
		},
		clickPrizeForward: function (e) {
			this.clickPrize(1)
		},
		clickPrizeBack: function (e) {
			this.clickPrize(-1)
		}
	}
}
</script>
