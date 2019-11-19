import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

import { rtdbPlugin } from 'vuefire'
import { store } from '../store/store.js'
import {
	itemsInit,
	dungeonchestsInit,
	bigkeyInit,
	smallkeyInit,
	dungeonbeatenInit,
	prizesInit,
	medallionsInit,
	chestsopenedInit
} from '../script/items.js'

Vue.use(rtdbPlugin)

var authAttempted = false

export var room = {}

// Get a Firestore instance
export const db = firebase
	.initializeApp({
		apiKey: 'AIzaSyC46wIQQopU18cIumNHtRSKXtxpXfukFnQ',
		databaseURL: 'https://jorsh-2fc49.firebaseio.com/'
	})
	.database()

export function destroyRoom () {
	room = {}
	store.commit('setData', { key: 'isRoomLoaded', value: false })
}

export function initRoom (id) {
	const roomid = String(id).replace(/\/$/, '').split('/').pop().toLowerCase()
	room = firebase.database().ref('games/' + roomid)
	// this.resetRoom()
	store.commit('setData', { key: 'isRoomLoaded', value: true })
}

export function resetRoom () {
	room.child('items').set(itemsInit)
	room.child('dungeonchests').set(dungeonchestsInit)
	room.child('bigkeys').set(bigkeyInit)
	room.child('smallkeys').set(smallkeyInit)
	room.child('dungeonbeaten').set(dungeonbeatenInit)
	room.child('prizes').set(prizesInit)
	room.child('medallions').set(medallionsInit)
	room.child('chestsopened').set(chestsopenedInit)
}

export function firebaseAuth (callback) {
	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
			// User is signed in.
			// console.log(user.uid)
			store.commit('setData', { key: 'firebaseUID', value: user.uid })
			callback()
		} else {
			console.log('Auth state not logged in')
			if (authAttempted) {
				return
			}
			authAttempted = true
			firebase.auth().signInAnonymously().catch(function (error) {
				console.log(error)
			})
		}
	})
}
