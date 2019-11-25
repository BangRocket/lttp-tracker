<template>
	<div
		id="mapDiv"
		class="mapDiv"
	>
		<POI
			v-for="(item, index) in worldData.chests"
			:id="index"
			:key="index"
			:index="index"
			:image="'url(./assets/map/poi.png)'"
			:color="'black'"
			:left="item.x"
			:top="item.y"
			:type="'chest'"
			:status="item.isAvailable().getClassName()"
		>
		</POI>

		<POI
			v-for="(item, index) in worldData.dungeons"
			:id="'dungeon' + index"
			:key="'dungeon' + index"
			:index="index"
			:image="'url(./assets/map/poi.png)'"
			:color="'black'"
			:left="item.x"
			:top="item.y"
			:type="'dungeon'"
			:status="item.canGetChest().getClassName()"
		>
		</POI>

		<POI
			v-for="(item, index) in locations.data.dungeons"
			:id="'bossMap' + index"
			:key="'bossMap' + index"
			:index="index"
			:image="'url(./assets/items/' + item.image + ')'"
			:color="'black'"
			:left="item.x"
			:top="item.y"
			:type="'boss'"
			:status="item.isBeatable().getClassName()"
		>
		</POI>
	</div>
</template>

<script>
// 	// s.onclick = new Function('toggleChest(' + k + ')')
// 	// s.onmouseover = new Function('highlight(' + k + ')')
// 	// s.onmouseout = new Function('unhighlight(' + k + ')')
import { Locations } from '../../script/chests.js'
import POI from './POI.vue'
import { mapState } from 'vuex'

export default {
	name: 'WorldMap',
	components: {
		POI
	},
	data () {
		return {
			locations: Locations
		}
	},
	computed: {
		...mapState(['trackerData', 'isRoomLoaded', 'worldData']),
		getItems: function () {
			return this.trackerData.items
		}
	},
	watch: {
		getItems: {
			deep: true,
			handler (newVal, oldVal) {
				console.log('n', newVal, oldVal)
			}
		}
	},
	methods: {

	}
}
</script>

<style>
.mapDiv {
	background-size: 100% 100%;
	background: url('../../assets/map.png') no-repeat;

	position: relative;
	width: 884px;
	height: 442px;
	left: 0;
}
</style>
