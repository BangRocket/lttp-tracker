<template>
	<div
		:id="id"
		:ref="type + '-' + index"
		:style="style"
		:class="['mapspan', type, status]"
		@mouseover="highlight"
		@mouseleave="unhighlight"
	>
	</div>
</template>

<script>
export default {
	name: 'POI',
	props: ['id', 'index', 'image', 'color', 'left', 'top', 'type', 'status'],
	data () {
		return {
			style: {
				'background-image': this.image,
				color: this.color,
				left: this.left,
				top: this.top
			}
		}
	},
	methods:
	{
		// Event of clicking a chest on the map
		toggleChest: function (x) {
			// rootRef.child('chestsopened').child(x).set(!trackerData.chestsopened[x])
		},
		// Highlights a chest location and shows the name as caption
		highlight: function (x) {
			if (x.target.classList.contains('boss')) {
				// handle highlight for bosses here
				return
			}

			if (x.target.classList.contains('dungeon')) {
				// handle highlight for dungeons here
				this.$refs[this.type + '-' + this.index].style.backgroundImage = 'url(/assets/map/highlighted.png)'
				return
			}
			x.target.style.backgroundImage = 'url(/assets/map/highlighted.png)'
			// document.getElementById(x).style.backgroundImage = 'url(/assets/map/highlighted.png)';
			// document.getElementById('caption').innerHTML = chests[x].name
		},
		unhighlight: function (x) {
			if (x.target.classList.contains('boss')) {
				// handle highlight for bosses here
				return
			}

			if (x.target.classList.contains('dungeon')) {
				// handle highlight for dungeons here
				this.$refs[this.type + '-' + this.index].style.backgroundImage = 'url(/assets/map/poi.png)'
				return
			}
			x.target.style.backgroundImage = 'url(/assets/map/poi.png)'
			// document.getElementById(x).style.backgroundImage = 'url(/assets/map/poi.png)';
			// document.getElementById('caption').innerHTML = '&nbsp;';
		}
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
