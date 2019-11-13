import Vue from 'vue'
import { rtdbPlugin } from 'vuefire'

import firebase from 'firebase'
import { store } from '../store/store.js'

Vue.use(rtdbPlugin)

var roomid = location.pathname.replace(/\/$/, '').split('/').pop().toLowerCase()
var authAttempted = false

var rootRef = {}

// Get a Firestore instance
export const db = firebase.initializeApp({ apiKey: 'AIzaSyC46wIQQopU18cIumNHtRSKXtxpXfukFnQ', databaseURL: 'https://jorsh-2fc49.firebaseio.com/' }).database()

export function destroyRoom () {
	rootRef.set({})
}

export function initRoom () {
	rootRef = firebase.database().ref('games/' + roomid)
}

export function firebaseAuth (callback) {
	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
			// User is signed in.
			console.log(user)
			store.commit('setFirebaseUID', user.uid)
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
