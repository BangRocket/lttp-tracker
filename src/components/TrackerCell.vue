<template>
	<div>
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
	</div>
</template>

<script>
export default {
	name: 'TrackerCell',
	props: [
		'itemValue',
		'itemName',
		'columnIndex',
		'rowIndex',
		'trackerData',
		'trackerOptions'
	],
	computed: {
		bossNum: function () {
			if (this.itemName.indexOf('boss') === -1) {
				return null
			}
			return this.itemName.substring(4)
		},
		dungeonLabel: function () {
			// if (
			//   this.bossNum &&
			//   this.trackerOptions &&
			//   this.trackerOptions.showlabels
			// ) {
			//   return dungeons[this.bossNum].label
			// }
			return null
		},
		textCounter: function () {
			if (this.itemName.indexOf('heart') === 0) {
				return this.itemValue
			}
			return null
		},
		backgroundImage: function () {
			// if (this.itemName === 'blank') {
			//   return this.trackerOptions.editmode ? 'url(/images/blank.png)' : 'none'
			// } else if (typeof this.itemValue === 'boolean') {
			//   return 'url(/images/' + this.itemName + '.png)'
			// } else if (this.textCounter !== null) {
			//   return 'url(/images/' + this.itemName + '.png)'
			// }
			// return (
			//   'url(/images/' +
			//   this.itemName +
			//   (this.trackerOptions.editmode
			//     ? itemsMax[this.itemName]
			//     : this.itemValue || '0') +
			//   '.png)'
			// )
			// temp fix
			return 'url(/images/blank.png)'
		},
		isActive: function () {
			return this.trackerOptions.editmode || this.itemValue
		},
		chestImage: function () {
			if (
				this.bossNum &&
        this.trackerOptions &&
        this.trackerOptions.showchests
			) {
				return (
					'url(/images/chest' +
          this.trackerData.dungeonchests[this.bossNum] +
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
					return 'url(/images/bigkey.png)'
				} else {
					return 'url(/images/nothing.png)'
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
						'url(/images/smallkey' +
            this.trackerData.smallkeys[this.bossNum] +
            '.png)'
					)
				} else {
					return 'url(/images/nothing.png)'
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
					'url(/images/dungeon' +
          this.trackerData.prizes[this.bossNum] +
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
					'url(/images/medallion' +
          this.trackerData.medallions[this.bossNum] +
          '.png)'
				)
			}
			return null
		}
	},
	methods: {
		clickCell: function (amt) {
			// if (this.trackerOptions.editmode) {
			//   Vue.set(
			//     vm.itemRows[this.rowIndex],
			//     this.columnIndex,
			//     this.trackerOptions.selected.item || "blank"
			//   );
			//   return;
			// }
			// // Non-edit mode clicks
			// if (this.bossNum) {
			//   // Do both this and the below for bosses
			//   rootRef
			//     .child("dungeonbeaten")
			//     .child(this.bossNum)
			//     .set(!this.trackerData.dungeonbeaten[this.bossNum]);
			// }
			// if (typeof this.itemValue === "boolean") {
			//   rootRef
			//     .child("items")
			//     .child(this.itemName)
			//     .set(!this.itemValue);
			// } else {
			//   var newVal = (this.itemValue || 0) + amt;
			//   if (newVal > itemsMax[this.itemName]) {
			//     newVal = itemsMin[this.itemName];
			//   }
			//   if (newVal < itemsMin[this.itemName]) {
			//     newVal = itemsMax[this.itemName];
			//   }
			//   rootRef
			//     .child("items")
			//     .child(this.itemName)
			//     .set(newVal);
			// }
		},
		clickCellForward: function (e) {
			this.clickCell(1)
		},
		clickCellBack: function (e) {
			this.clickCell(-1)
		},
		clickMedallion: function (amt) {
			// rootRef
			//   .child("medallions")
			//   .child(this.bossNum)
			//   .set((this.trackerData.medallions[this.bossNum] + amt + 4) % 4);
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
			//   (this.trackerData.dungeonchests[this.bossNum] + amt + modamt) % modamt;
			// rootRef
			//   .child("dungeonchests")
			//   .child(this.bossNum)
			//   .set(newVal);
		},
		clickChestForward: function (e) {
			this.clickChest(1)
		},
		clickChestBack: function (e) {
			this.clickChest(-1)
		},
		clickBigKey: function (e) {
			// rootRef
			//   .child("bigkeys")
			//   .child(this.bossNum)
			//   .set(!this.trackerData.bigkeys[this.bossNum]);
		},
		clickSmallKey: function (amt) {
			// var keyitem = 'key' + this.bossNum
			// var modamt = itemsMax[keyitem] + 1
			// var newVal =
			//   (this.trackerData.smallkeys[this.bossNum] + amt + modamt) % modamt;
			// rootRef
			//   .child("smallkeys")
			//   .child(this.bossNum)
			//   .set(newVal);
		},
		clickSmallKeyForward: function (e) {
			this.clickSmallKey(1)
		},
		clickSmallKeyBack: function (e) {
			this.clickSmallKey(-1)
		},
		clickPrize: function (amt) {
			// rootRef
			//   .child("prizes")
			//   .child(this.bossNum)
			//   .set((this.trackerData.prizes[this.bossNum] + amt + 5) % 5);
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
