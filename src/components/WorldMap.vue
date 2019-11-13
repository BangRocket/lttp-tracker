<template>
	<div
		id="mapDiv"
		class="mapDiv"
	>
	</div>
</template>

<script>
import { Logic } from '../script/logic.js'
import Locations from '../script/chests.js'
// import Items from '../script/items.js'

export default {
	name: 'WorldMap',
	mixins: [Logic],
	data () {
		return { }
	},
	created: function () {
		// var mapdiv = document.getElementById('mapdiv')
		console.log(Locations)

		// init logic
		Logic.data.trackerData = this.trackData

		// Initialize all chests on the map
		for (var k = 0; k < Locations.data.chests.length; k++) {
			var s = document.createElement('span')
			s.style.backgroundImage = 'url(/assets/poi.png)'
			s.style.color = 'black'
			s.id = k
			// s.onclick = new Function('toggleChest(' + k + ')')
			// s.onmouseover = new Function('highlight(' + k + ')')
			// s.onmouseout = new Function('unhighlight(' + k + ')')
			s.style.left = Locations.data.chests[k].x
			s.style.top = Locations.data.chests[k].y
			if (this.trackerData.chestsopened[k]) { s.className = 'mapspan chest opened' } else { s.className = 'mapspan chest ' + Locations.data.chests[k].isAvailable().getClassName() }
			console.log(s)
			// mapdiv.appendChild(s)
		}

		// Dungeon bosses & chests
		for (k = 0; k < Locations.data.dungeons.length; k++) {
			s = document.createElement('span')
			s.style.backgroundImage = 'url(../assets/' + Locations.data.dungeons[k].image + ')'
			s.id = 'bossMap' + k
			// s.onmouseover = new Function('highlightDungeon(' + k + ')')
			// s.onmouseout = new Function('unhighlightDungeon(' + k + ')')
			s.style.left = Locations.data.dungeons[k].x
			s.style.top = Locations.data.dungeons[k].y
			s.className = 'mapspan boss ' + Locations.data.dungeons[k].isBeatable().getClassName()
			console.log(s)
			// mapdiv.appendChild(s)

			s = document.createElement('span')
			s.style.backgroundImage = 'url(../assets/poi.png)'
			s.id = 'dungeon' + k
			// s.onmouseover = new Function('highlightDungeon(' + k + ')')
			// s.onmouseout = new Function('unhighlightDungeon(' + k + ')')
			s.style.left = Locations.data.dungeons[k].x
			s.style.top = Locations.data.dungeons[k].y
			s.className = 'mapspan dungeon ' + Locations.data.dungeons[k].canGetChest().getClassName()
			console.log(s)
			// mapdiv.appendChild(s)
		}
	},
	methods: {

	}
}
</script>

<style>
	.mapDiv {
		background-size: 100% 100%;
		background: url("../assets/map.png") no-repeat;

		position: relative;
		width: 884px;
		height: 442px;
		left: 0;
	}
</style>
