<template>
	<span
		:class="'overlay'"
		:style="style"
		@click.stop="clickOverlayForward"
		@contextmenu.prevent.stop="clickOverlayBack"
	>{{ text }}</span>
</template>

<script>
import { mapState } from 'vuex'
import { Locations } from '../../script/chests.js'
import { itemsMax } from '../../script/items.js'

export default {
	name: 'ItemCellOverlay',
	props: {
		overlayType: {
			type: String,
			default: 'chest'
		},
		reference: {
			type: String,
			default: 'boss'
		},
		location: {
			type: String,
			default: 'bottom-left'
		}
	},
	data () {
		return {
			value: this.overlayType === 'chest' ? itemsMax['chest' + this.reference] : 0,
			type: this.overlayType,
			parentVal: this.reference,
			loc: this.location,
			text: ''
		}
	},
	computed: {
		style: function () {
			var height = 0
			var width = 0
			var top = 0
			var left = 0

			switch (this.loc) {
			case 'top-left':
				height = 32
				width = 32
				left = 0
				break
			case 'top-right':
				height = 32
				width = 32
				left = 32
				break
			case 'bottom-left':
				height = 32
				width = 32
				left = 0
				top = 32
				break
			case 'bottom-right':
				height = 32
				width = 32
				left = 32
				top = 32
				break
			default:
				break
			}
			return {
				display: 'block',
				position: 'absolute',
				height: height + 'px',
				width: width + 'px',
				top: top + 'px',
				left: left + 'px',
				backgroundImage: this.getBackgroundImage(this.type)
			}
		},
		...mapState(['trackerData', 'trackerOptions'])
	},
	watch: {
		value () {
			console.log('wather')
			switch (this.type) {
			case 'chest':
				this.trackerData.dungeonchests[this.reference] = this.value
				break
			case 'prize':
				break
			case 'medallion':
				break
			}
		}
	},
	methods: {
		getBackgroundImage: function (type) {
			switch (type) {
			case 'chest':
				if (
					this.trackerOptions &&
					this.trackerOptions.showchests
				) {
					return (
						'url(./assets/chests/chest' +
						this.value +
						'.png)'
					)
				}
				return null
			case 'prize':
				if (
					this.value !== '10' &&
					this.trackerOptions &&
					this.trackerOptions.showprizes
				) {
					return (
						'url(./assets/dungeon/dungeon' +
						this.value +
						'.png)'
					)
				}
				return null
			case 'medallion':
				if (
					(this.parentVal === '8' || this.parentVal === '9') &&
					this.trackerOptions &&
					this.trackerOptions.showmedals
				) {
					return (
						'url(/assets/items/medallion' +
						this.value +
						'.png)'
					)
				}
				return null
			case 'label':
				if (
					this.parentVal &&
					this.trackerOptions &&
					this.trackerOptions.showlabels
				) {
					this.text = Locations.data.dungeons[this.parentVal].label
					return null
				}
				return null
			default:
				return null
			}
		},
		clickOverlay: function (amt) {
			switch (this.type) {
			case 'chest':
				amt = (amt === -1) ? 1 : -1 // reverse the value for chests
				var chestitem = 'chest' + this.parentVal
				var modamt = itemsMax[chestitem] + 1
				var newVal =
					(this.value + amt + modamt) % modamt
				this.value = newVal
				break
			case 'prize':
				this.value = (this.value + amt + 5) % 5
				break
			case 'medallion':
				this.value = (this.value + amt + 4) % 4
				break
			default:
				break
			}
		},
		clickOverlayForward: function (e) {
			this.clickOverlay(1)
		},
		clickOverlayBack: function (e) {
			this.clickOverlay(-1)
		}
	}
}
</script>
