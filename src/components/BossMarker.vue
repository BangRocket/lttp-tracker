<template>
	<div
		:id="id"
		:ref="type + '-' + index"
		:style="style"
		:class="classes"
		@mouseover="highlight"
		@mouseleave="unhighlight"
		@click.prevent.stop="toggleChest"
		@contextmenu.prevent.stop="toggleChest"
	>
	</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
	name: 'BossMarker',
	props: {
		id: {
			type: [String, Number],
			default: -1
		},
		index: {
			type: Number,
			default: -1
		},
		image: {
			type: String,
			default: 'url(/assets/map/highlighted.png)'
		},
		color: {
			type: String,
			default: 'black'
		},
		left: {
			type: String,
			default: '0%'
		},
		top: {
			type: String,
			default: '0%'
		},
		type: {
			type: String,
			default: 'dungeon'
		},
		status: {
			type: String,
			default: 'available'
		}
	},
	data () {
		return {
			style: {
				'background-image': this.image,
				'background-color': '',
				color: this.color,
				left: this.left,
				top: this.top,
				type: this.type
			},
			classes: [
				'mapspan',
				this.type,
				this.status
			]
		}
	},
	computed: {
		isDefeated () {
			console.log(this.dungeons[this.id.substring(7)])
			return this.dungeons[this.id.substring(7)]
		},
		dungeons () {
			return this.trackerData.dungeonbeaten
		},
		...mapState(['trackerData', 'trackerOptions', 'worldData'])
	},
	watch: {
		isDefeated: function (newVal, oldVal) {
			console.log('Changed Boss Watcher! was: ', oldVal, ' is: ', newVal)
			newVal ? this.style['background-color'] = 'rgb(127, 127, 127)' : this.style['background-color'] = ''
		}
	},
	methods:
	{
		// Event of clicking a chest on the map
		toggleChest: function (x) {
			// this.dungeons[this.id.substring(7)] = !this.dungeons[this.id.substring(7)]
		},
		// Highlights a chest location and shows the name as caption
		highlight: function (x) { },
		unhighlight: function (x) {	}
	}
}
</script>

<style scoped>
.chest {
	width: 24px;
	height: 24px;
	background-size: 100% 100%;

	position: absolute;
	margin-left: -12px;
	margin-top: -12px;
}

.dungeon {
	width: 48px;
	height: 48px;
	background-size: 100% 100%;

	position: absolute;
	margin-left: -24px;
	margin-top: -24px;
}

.unavailable {
	background-color: rgb(255, 0, 0);
}

.available {
	background-color: rgb(0, 255, 0);
	color: rgb(0, 0, 0);
}

.possible {
	background-color: rgb(255, 255, 0);
	color: rgb(0, 0, 0);
}

.agahnim {
	background-color: rgb(0, 255, 255);
	color: rgb(0, 0, 0);
}

.glitchavailable {
	background-color: rgb(0, 127, 0);
}

.glitchpossible {
	background-color: rgb(192, 192, 0);
}

.glitchagahnim {
	background-color: rgb(0, 160, 160);
}

.opened {
	background-color: rgb(127, 127, 127);
}

.boss {
	width: 24px;
	height: 24px;

	background: no-repeat center;
	background-size: 75% 75%;

	position: absolute;
	margin-left: -12px;
	margin-top: -12px;

	z-index: 2;
}
</style>
