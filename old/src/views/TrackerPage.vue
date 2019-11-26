<template>
	<div>
		<div
			v-if="!isRoomLoaded"
			id="createRoomPanel"
		>
			<p>Either the room is still loading or there is not a room here.</p>
			<p>Click the button below to initialize a room.</p>
			<p>Be sure to give it a passcode so you can give access to others or yourself on another machine or after a cookie reset.</p>
			<p>
				Room Editing Passcode: <input
					id="passcodeInput"
					type="text"
					name="passcode"
				/>
			</p>
			<p>
				<button
					id="initRoomButton"
					type="button"
					name="initRoom"
					@click="createRoom"
				>
					Create Room
				</button>
			</p>
		</div>

		<div
			id="caption"
			width="100%"
		>
			&nbsp;
		</div>
		<div id="layoutdiv">
			<div
				id="itemdiv"
				class="itemdiv"
			>
				<ItemTable v-if="isRoomLoaded"></ItemTable>
			</div>
			<LocationMap v-if="!showMap && isRoomLoaded"></LocationMap>
		</div>

		<!-- Setting panel-->

		<button
			id="settingsbutton"
			type="button"
			@click="showSettings"
		>
			🔧
		</button>
		<fieldset
			v-if="settingsVisible"
			id="settings"
			class="settings"
		>
			<legend>Settings</legend>
			<fieldset>
				<legend>Item Tracker</legend>
				<button
					type="button"
					onclick="EditMode()"
				>
					Edit Mode
				</button>
				<br>
				Size<input
					type="range"
					name="itemdivsize"
					value="100"
					max="200"
					min="1"
					onchange="setZoom('itemdiv', this)"
				>
				<span id="itemdivsize">100%</span><br>
				<fieldset>
					<legend>Dungeon Display</legend>
					<input
						type="checkbox"
						name="showchest"
						checked="checked"
						onchange="showChest(this)"
					>Chests
					<input
						type="checkbox"
						name="showcrystal"
						checked="checked"
						onchange="showCrystal(this)"
					>Prizes
					<input
						type="checkbox"
						name="showmedallion"
						checked="checked"
						onchange="showMedallion(this)"
					>Medals<br>
					<input
						type="checkbox"
						name="showbigkeys"
						checked="checked"
						onchange="showbigkeys(this)"
					>Big Keys
					<input
						type="checkbox"
						name="showsmallkeys"
						checked="checked"
						onchange="showsmallkeys(this)"
					>Small Keys<br>
					<input
						type="checkbox"
						name="showlabel"
						checked="checked"
						onchange="showLabel(this)"
					>Dungeon Labels
				</fieldset>
			</fieldset>
			<fieldset>
				<legend>Map Tracker</legend>
				<input
					type="checkbox"
					name="showmap"
					checked="checked"
					@change="showTracker"
				>Enabled<br>
				Size<input
					type="range"
					name="mapdivsize"
					value="100"
					max="200"
					min="1"
					onchange="setZoom('mapdiv', this)"
				>
				<span id="mapdivsize">100%</span><br>
				Position:
				<input
					type="radio"
					name="mapposition"
					value="Below"
					checked="checked"
					onclick="setOrder(true)"
				>Below
				<input
					type="radio"
					name="mapposition"
					value="Side"
					onclick="setOrder(false)"
				>Side<br>
				Orientation:
				<input
					type="radio"
					name="maporientation"
					value="Horizontal"
					checked="checked"
					onclick="setMapOrientation(false)"
				>Horizontal
				<input
					type="radio"
					name="maporientation"
					value="Verical"
					onclick="setMapOrientation(true)"
				>Vertical<br>
				<fieldset>
					<legend>Logic Options</legend>
					<input
						type="radio"
						name="maplogic"
						value="glitchless"
						checked="checked"
						onclick="setLogic(&quot;glitchless&quot;)"
					>Glitchless<br>
					<input
						type="radio"
						name="maplogic"
						value="owGlitches"
						onclick="setLogic(&quot;owGlitches&quot;)"
					>Overworld Glitches<br>
					<input
						type="radio"
						name="maplogic"
						value="majorGlitches"
						onclick="setLogic(&quot;majorGlitches&quot;)"
					>Major Glitches<br>
					<input
						type="radio"
						name="maplogic"
						value="inverted"
						onclick="setLogic(&quot;inverted&quot;)"
					>Inverted
				</fieldset>
				<fieldset>
					<legend>Chest Legend</legend>
					<table
						border="0"
						cellspacing="0"
					>
						<tr>
							<th class="available">
								Available
							</th>
							<th class="glitchavailable">
								Glitch Available
							</th>
						</tr>
						<tr>
							<th class="possible">
								Possible
							</th>
							<th class="glitchpossible">
								Glitch Possible
							</th>
						</tr>
						<tr>
							<th class="agahnim">
								Agahnim Defeated
							</th>
							<th class="glitchagahnim">
								Glitch Agahnim
							</th>
						</tr>
						<tr>
							<th class="unavailable">
								Unavailable
							</th>
							<th class="opened">
								Opened
							</th>
						</tr>
					</table>
				</fieldset>
			</fieldset>
			<fieldset id="roomControls">
				<legend>Room Controls</legend>
				<input
					id="entryPasscodeInput"
					type="text"
					name="entryPasscode"
				/>
				<button
					id="enterPasscodeButton"
					type="button"
					name="enterPasscode"
					onclick="enterPasscode()"
				>
					Enter Passcode
				</button>
				<div id="editorControls">
					<button
						id="pushConfigButton"
						type="button"
						name="resetRoom"
						onclick="confirmSaveConfigToFirebase()"
					>
						Push Configuration
					</button>
					<br><br>
					<button
						id="useTourneyConfigButton"
						type="button"
						name="destroyRoom"
						onclick="useTourneyConfig()"
					>
						Use Tourney Configuration
					</button>
					<br><br>
					<button
						id="resetRoomButton"
						type="button"
						name="resetRoom"
						onclick="resetFirebase()"
					>
						Reset Room
					</button>
					<br><br>
					<button
						id="destroyRoomButton"
						type="button"
						name="destroyRoom"
						onclick="destroyFirebase()"
					>
						Destroy Room
					</button>
				</div>
			</fieldset>
		</fieldset>

		<table
			id="itemconfig"
			class="itemconfig"
			style="display:none"
		></table>

		<!--<footer style='bottom:0; width:100%; text-align: center; position: absolute; color:grey'>Lttp Networked Rando Tracker -
            @pickfifteen (Based on crossproduct, SRL, marcmagus)
        </footer> -->
	</div>
</template>

<script>
import ItemTable from '../components/ItemTable.vue'
import LocationMap from '../components/LocationMap.vue'

import { mapState } from 'vuex'
import { store } from '../store/store.js'
import { initRoom, room } from '../db/db.js'

export default {
	components: {
		ItemTable,
		LocationMap
	},
	data () {
		return {
			settingsVisible: false,
			showMap: false,
			roomID: this.$route.params.id
		}
	},
	computed: {
		...mapState(['trackerData', 'trackerOptions', 'firebaseUID', 'isRoomLoaded'])
	},
	mounted: async function () {
		initRoom(this.roomID)
		var check = await room.child('owner').once('value')
		var hasData = !(check.val() === null)
		// check localstorage for pw, if not, request it
		store.commit('setData', { key: 'isRoomLoaded', value: hasData })
	},
	methods: {
		createRoom () {
			var editors = {}
			var passcode = document.getElementById('passcodeInput').value
			editors[this.firebaseUID] = true
			room.set({
				owner: this.firebaseUID,
				editors: editors,
				passcode: passcode,
				items: this.trackerData.items,
				dungeonchests: this.trackerData.dungeonchests,
				bigkeys: this.trackerData.bigkeys,
				smallkeys: this.trackerData.smallkeys,
				dungeonbeaten: this.trackerData.dungeonbeaten,
				prizes: this.trackerData.prizes,
				medallions: this.trackerData.medallions,
				chestsopened: this.trackerData.medallions
			})
			store.commit('setData', { key: 'isRoomLoaded', value: true })
		},
		editMode () { },
		showSettings () {
			if (this.trackerOptions.editmode) {
				store.commit('updateTrackerData', { key: 'showchest', value: document.getElementsByName('showchest')[0].checked })
				store.commit('updateTrackerData', { key: 'showbigkeys', value: document.getElementsByName('showbigkeys')[0].checked })
				store.commit('updateTrackerData', { key: 'showsmallkeys', value: document.getElementsByName('showsmallkeys')[0].checked })
				store.commit('updateTrackerData', { key: 'showcrystal', value: document.getElementsByName('showcrystal')[0].checked })
				store.commit('updateTrackerData', { key: 'showmedallion', value: document.getElementsByName('showmedallion')[0].checked })
				store.commit('updateTrackerData', { key: 'showlabel', value: document.getElementsByName('showlabel')[0].checked })
				store.commit('updateTrackerData', { key: 'editmode', value: false })
				this.showMap = document.getElementsByName('showmap')[0].checked
				// document.getElementById('itemconfig').style.display = 'none'

				// sender.innerHTML = '🔧'
				// saveCookie()
			} else {
				if (this.settingsVisible) {
					this.settingsVisible = false
				} else {
					this.settingsVisible = true
				}
			}
		},
		showChest () { },
		showCrystal () { },
		showMedallion () { },
		showBigKeys () { },
		showSmallKeys () { },
		showLabel () { },
		showTracker () {
			this.showMap = !this.showMap
		}
	}
}
</script>

<style scoped>
body {
	background-color: rgb(0, 0, 0);
	margin: 0;
	color: white;
}

a {
	color: rgb(128, 128, 255);
}

#legend {
	float: right;
}

.flexcontainer {
	display: flex;
}

.settings {
	background-color: rgb(0, 0, 0);
	position: absolute;
	right: 0;
	bottom: 0;
	z-index: 10;
	max-height: 100vh;
	overflow-y: auto;
}

#settingsbutton {
	position: absolute;
	right: 0;
	bottom: 0;
	z-index: 11;
	background-color: rgb(0, 0, 0);
	color: red;
}

.tracker {
	background-color: rgb(0, 0, 0);
	position: relative;
	left: 0;
	top: 0;
	empty-cells: show;
	border-spacing: 0;
	border: 0;
}

.tracker td {
	width: 64px;
	height: 64px;
	padding: 0;
	background-repeat: no-repeat;
}

.tracker .halfcell {
	width: 32px;
	height: 64px;
}

.itemconfig {
	border-spacing: 0;
	border: 1px solid white;
}

* {
	box-sizing: border-box;
}

.stoops {
	width: 128px;
	height: 128px;
	background-size: 200% 200%;
}

input {
	margin-top: 5px;
	margin-bottom: 5px;
	display: inline-block;
	*display: inline; /* for IE7*/
	zoom: 1; /* for IE7*/
	vertical-align: middle;
	margin-left: 20px;
}

label {
	display: inline-block;
	*display: inline; /* for IE7*/
	zoom: 1; /* for IE7*/
	/* float: left; */
	padding-top: 5px;
	text-align: right;
	width: 140px;
}

.lonk {
	width: 64px;
	height: 64px;
	border-spacing: 0;
	border: 0;
}

.corner {
	width: 32px;
	height: 32px;
	color: lightgray;
	font: 26px "VT323", monospace;
	cursor: default;
	text-shadow: 0 0 3px black;
	-moz-user-select: none;
	-khtml-user-select: none;
	-webkit-user-select: none;
	-ms-user-select: none;
	user-select: none;
}

.editcell {
	font-size: 20px;
}

.textCounter {
	display: block;
	position: absolute;
	right: 0;
	bottom: 0;
	font: 40px "VT323", monospace;
	cursor: default;
	color: #fdd549;
	user-select: none;
	text-shadow: -2px -2px 1px black;
}

.mini {
	width: 16px;
	height: 16px;
	vertical-align: text-bottom;
}

.itemdiv {
	position: relative;
	left: 0;
}

.mapdiv {
	background-size: 100% 100%;
	background: url("/assets/map.png") no-repeat;

	position: relative;
	width: 884px;
	height: 442px;
	left: 0;
}

.mapvdiv {
	background-size: cover;
	background: url("/assets/mapv.png") no-repeat;

	position: relative;
	width: 438px;
	height: 888px;
	left: 0;
}
</style>
