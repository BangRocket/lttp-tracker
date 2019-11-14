import Vue from 'vue'
import Vuex from 'vuex'
import {
	itemsInit,
	dungeonchestsInit,
	bigkeyInit,
	smallkeyInit,
	dungeonbeatenInit,
	prizesInit,
	medallionsInit
} from '../script/items.js'

Vue.use(Vuex)

export var store = new Vuex.Store({
	state: {
		firebaseUID: {},
		roofRef: {},
		itemRows: [],
		trackerData: {
			items: itemsInit,
			dungeonchests: dungeonchestsInit,
			bigkeys: bigkeyInit,
			smallkeys: smallkeyInit,
			dungeonbeaten: dungeonbeatenInit,
			prizes: prizesInit,
			medallions: medallionsInit,
			chestsopened: []
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
