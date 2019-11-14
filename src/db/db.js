import Vue from 'vue'
import firebase from 'firebase'
import { rtdbPlugin } from 'vuefire'
import { store } from '../store/store.js'

Vue.use(rtdbPlugin)

var authAttempted = false

// Get a Firestore instance
export const db = firebase.initializeApp({ apiKey: 'AIzaSyC46wIQQopU18cIumNHtRSKXtxpXfukFnQ', databaseURL: 'https://jorsh-2fc49.firebaseio.com/' }).database()

export function destroyRoom () {
	store.commit('setRootRef', {})
}

export function initRoom (id) {
	const roomid = id.replace(/\/$/, '').split('/').pop().toLowerCase()
	store.commit('setRootRef', firebase.database().ref('games/' + roomid))
}

export function firebaseAuth (callback) {
	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
			// User is signed in.
			console.log(user.uid)
			store.commit('setData', { key: 'firebaseUID', value: user.uid })
			console.log(store.state)
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
