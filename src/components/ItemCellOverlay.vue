<template>
	<span
		:class="'overlay'"
		:style="style"
		@click.stop="clickOverlayForward"
		@contextmenu.prevent.stop="clickOverlayBack"
	></span>
</template>

<script>
import { mapState } from 'vuex'

export default {
	name: 'ItemCellOverlay',
	props: [
		'overlayType',
		'reference'
	],
	data () {
		return {
			value: 0,
			type: this.overlayType,
			parentVal: this.reference
		}
	},
	computed: {
		style: function () {
			return {
				display: 'block',
				position: 'absolute',
				height: '32px',
				width: '32px',
				top: '32px',
				left: '',
				backgroundImage: this.getBackgroundImage(this.type)
			}
		},
		chestImage: function () {
			if (
				this.value &&
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
		...mapState(['trackerData', 'trackerOptions'])
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
			default:
				return null
			}
		}
	}
}
</script>
