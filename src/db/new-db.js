// import Vue from 'vue'
// import axios from 'axios'
// import VueAxios from 'vue-axios'

// import { store } from '../store/store.js'
// import {
// 	itemsInit,
// 	dungeonchestsInit,
// 	bigkeyInit,
// 	smallkeyInit,
// 	dungeonbeatenInit,
// 	prizesInit,
// 	medallionsInit,
// 	chestsopenedInit
// } from '../script/items.js'

// Vue.use(VueAxios, axios)

// export var room = {}

// export function destroyRoom () {
// 	room = {}
// 	store.commit('setData', { key: 'isRoomLoaded', value: false })
// }

// export function initRoom (id) {
// 	const roomid = String(id).replace(/\/$/, '').split('/').pop().toLowerCase()
// 	room = {
// 		name: roomid,
// 		data: {
// 			items: itemsInit,
// 			dungeonchests: dungeonchestsInit,
// 			bigkeys: bigkeyInit,
// 			smallkeys: smallkeyInit,
// 			dungeonbeaten: dungeonbeatenInit,
// 			prizes: prizesInit,
// 			medallions: medallionsInit,
// 			chestsopened: chestsopenedInit
// 		}
// 	}
// 	// this.resetRoom()
// 	store.commit('setData', { key: 'isRoomLoaded', value: true })
// }

// export function resetRoom () {
// 	room.child('items').set(itemsInit)
// 	room.child('dungeonchests').set(dungeonchestsInit)
// 	room.child('bigkeys').set(bigkeyInit)
// 	room.child('smallkeys').set(smallkeyInit)
// 	room.child('dungeonbeaten').set(dungeonbeatenInit)
// 	room.child('prizes').set(prizesInit)
// 	room.child('medallions').set(medallionsInit)
// 	room.child('chestsopened').set(chestsopenedInit)
// }
