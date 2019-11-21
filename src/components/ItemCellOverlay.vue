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
	props: {
		overlayType: { type: String, default: 'chest' },
		reference: { type: String, default: 'boss' },
		location: { type: String, default: 'bottom-left' }
	},
	data () {
		return {
			value: 0,
			type: this.overlayType,
			parentVal: this.reference,
			loc: this.location
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
