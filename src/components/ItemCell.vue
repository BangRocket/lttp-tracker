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
		<span
			v-if="chestImage"
			:style="{ display: 'block', position: 'absolute', height: '32px', width: '32px', top: '32px', backgroundImage: chestImage }"
			@click.stop="clickChestBack"
			@contextmenu.prevent.stop="clickChestForward"
		></span>
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
import { store } from '../store/store.js'
import { itemsMin, itemsMax } from '../script/items.js'

export default {
	name: 'ItemCell',
	props: [
		'itemValue',
		'itemName',
		'columnIndex',
		'rowIndex'
	],
	computed: {
		bossNum: function () {
			if (this.itemName.indexOf('boss') === -1) {
				return null
			}
			return this.itemName.substring(4)
		},
		dungeonLabel: function () {
			if (
				this.bossNum &&
				store.state.trackerOptions &&
				store.state.trackerOptions.showlabels
			) {
				return Locations.data.dungeons[this.bossNum].label
			}
			return null
		},
		textCounter: function () {
			if (this.itemName.indexOf('heart') === 0) {
				return this.itemValue
			}
			return null
		},
		backgroundImage: function () {
			if (this.itemName === 'blank') {
				return store.state.trackerOptions.editmode ? 'url(./assets/items/blank.png)' : 'none'
			} else if (typeof this.itemValue === 'boolean') {
				return 'url(./assets/items/' + this.itemName + '.png)'
			} else if (this.textCounter !== null) {
				return 'url(./assets/items/' + this.itemName + '.png)'
			}
			return (
				'url(./assets/items/' +
				this.itemName +
				(store.state.trackerOptions.editmode
					? itemsMax[this.itemName]
					: this.itemValue || '0') +
				'.png)'
			)
		},
		isActive: function () {
			return store.state.trackerOptions.editmode || this.itemValue
		},
		chestImage: function () {
			if (
				this.bossNum &&
				store.state.trackerOptions &&
				store.state.trackerOptions.showchests
			) {
				return (
					'url(./assets/chests/chest' +
					store.state.trackerData.dungeonchests[this.bossNum] +
					'.png)'
				)
			}
			return null
		},
		bigKeyImage: function () {
			if (
				this.bossNum &&
				store.state.trackerOptions &&
				store.state.trackerOptions.showbigkeys &&
				store.state.trackerData.bigkeys
			) {
				if (store.state.trackerData.bigkeys[this.bossNum]) {
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
				store.state.trackerOptions &&
				store.state.trackerOptions.showsmallkeys &&
				store.state.trackerData.smallkeys
			) {
				if (store.state.trackerData.smallkeys[this.bossNum] > 0) {
					return (
						'url(./assets/items/smallkey' +
						store.state.trackerData.smallkeys[this.bossNum] +
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
				store.state.trackerOptions &&
				store.state.trackerOptions.showprizes
			) {
				return (
					'url(./assets/chests' +
					store.state.trackerData.prizes[this.bossNum] +
					'.png)'
				)
			}
			return null
		},
		medallionImage: function () {
			if (
				(this.bossNum === '8' || this.bossNum === '9') &&
				store.state.trackerOptions &&
				store.state.trackerOptions.showmedals
			) {
				return (
					'url(/assets/items/medallion' +
					store.state.trackerData.medallions[this.bossNum] +
					'.png)'
				)
			}
			return null
		}
	},
	methods: {
		clickCell: function (amt) {
			if (store.state.trackerOptions.editmode) {
				store.commit('updateRows', this.rowIndex, this.columnIndex, store.state.trackerOptions.selected.item || 'blank')
			}
			// Non-edit mode clicks
			if (this.bossNum) {
				// Do both this and the below for bosses
				// rootRef
				// 	.child("dungeonbeaten")
				// 	.child(this.bossNum)
				// 	.set(!store.state.trackerData.dungeonbeaten[this.bossNum]);
			}
			if (typeof this.itemValue === 'boolean') {
				// rootRef
				// 	.child("items")
				// 	.child(this.itemName)
				// 	.set(!this.itemValue);
			} else {
				var newVal = (this.itemValue || 0) + amt
				if (newVal > itemsMax[this.itemName]) {
					newVal = itemsMin[this.itemName]
				}
				if (newVal < itemsMin[this.itemName]) {
					newVal = itemsMax[this.itemName]
				}
				// rootRef
				// 	.child("items")
				// 	.child(this.itemName)
				// 	.set(newVal);
			}
		},
		clickCellForward: function (e) {
			this.clickCell(1)
		},
		clickCellBack: function (e) {
			this.clickCell(-1)
		},
		clickMedallion: function (amt) {
			// rootRef
			// 	.child('medallions')
			// 	.child(this.bossNum)
			// 	.set((store.state.trackerData.medallions[this.bossNum] + amt + 4) % 4);
		},
		clickMedallionForward: function (e) {
			this.clickMedallion(1)
		},
		clickMedallionBack: function (e) {
			this.clickMedallion(-1)
		},
		clickChest: function (amt) {
			// var chestitem = 'chest' + this.bossNum
			// var modamt = itemsMax[chestitem] + 1
			// var newVal =
			// 	(store.state.trackerData.dungeonchests[this.bossNum] + amt + modamt) % modamt
			// rootRef
			// 	.child("dungeonchests")
			// 	.child(this.bossNum)
			// 	.set(newVal);
		},
		clickChestForward: function (e) {
			this.clickChest(1)
		},
		clickChestBack: function (e) {
			this.clickChest(-1)
		},
		clickBigKey: function (e) {
			// rootRef
			// 	.child("bigkeys")
			// 	.child(this.bossNum)
			// 	.set(!store.state.trackerData.bigkeys[this.bossNum]);
		},
		clickSmallKey: function (amt) {
			// var keyitem = 'key' + this.bossNum
			// var modamt = itemsMax[keyitem] + 1
			// var newVal =
			// 	(store.state.trackerData.smallkeys[this.bossNum] + amt + modamt) % modamt
			// rootRef
			// 	.child("smallkeys")
			// 	.child(this.bossNum)
			// 	.set(newVal);
		},
		clickSmallKeyForward: function (e) {
			this.clickSmallKey(1)
		},
		clickSmallKeyBack: function (e) {
			this.clickSmallKey(-1)
		},
		clickPrize: function (amt) {
			// rootRef
			// 	.child("prizes")
			// 	.child(this.bossNum)
			// 	.set((store.state.trackerData.prizes[this.bossNum] + amt + 5) % 5)
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
