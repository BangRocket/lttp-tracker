import Vue from 'vue'
import Vuex from 'vuex'

import {
	itemsInit,
	dungeonchestsInit,
	bigkeyInit,
	smallkeyInit,
	dungeonbeatenInit,
	prizesInit,
	medallionsInit,
	defaultItemGrid,
	chestsopenedInit
} from '../script/items.js'
import { Locations } from '../script/chests.js'

Vue.use(Vuex)

export var store = new Vuex.Store({
	state: {
		firebaseUID: {},
		isRoomLoaded: false,
		itemRows: defaultItemGrid,
		trackerData: {
			items: itemsInit,
			dungeonchests: dungeonchestsInit,
			bigkeys: bigkeyInit,
			smallkeys: smallkeyInit,
			dungeonbeaten: dungeonbeatenInit,
			prizes: prizesInit,
			medallions: medallionsInit,
			chestsopened: chestsopenedInit
		},
		worldData: {
			dungeons: Locations.data.dungeons,
			chests: Locations.data.chests
		},
		trackerOptions: {
			showchests: true,
			showbigkeys: false,
			showsmallkeys: false,
			showprizes: true,
			showmedals: true,
			showlabels: true,
			mapLogic: 'glitchless',
			editmode: false,
			settingsVisible: false,
			selected: {}
		},
		displayVueMap: false
	},
	getters: {
		getItems: state => {
			return state.trackerData.items
		},
		getOptions: state => {
			return state.trackerOptions
		},
		getData: state => {
			return state.trackerData
		},
		getItemByName: (state, getters) => (id) => {
			console.log(state, getters, id)
			// return state.movies.find(movie => movie.id === id)
		}
	},
	mutations: {
		updateTrackerData (state, payload) {
			state.trackerData[payload.key] = payload.value
		},
		updateOption (state, payload) {
			state.trackerOptions[payload.key] = payload.value
		},
		updateRows (state, payload) {
			state.itemRows[payload.row][payload.column] = payload.value
		},
		setData (state, payload) {
			state[payload.key] = payload.value
		}
	}
})
