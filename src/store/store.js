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
		firebase: {
			uid: -1
		},
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
		updateData (key, value) {
			this.state.trackerData[key] = value
		},
		updateOption (key, value) {
			this.state.trackerOptions[key] = value
		},
		updateRows (key, row, column, value) {
			this.state.itemRows[row][column] = value
		},
		setData (value) {
			this.state.trackerData = value
		},
		setOption (value) {
			this.state.trackerOptions = value
		},
		setRows (value) {
			this.state.itemRows = value
		},
		setFirebaseUID (value) {
			this.state.firebase.uid = value
		}
	}
})
