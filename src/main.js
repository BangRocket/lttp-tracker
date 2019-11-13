import Vue from 'vue'
import { rtdbPlugin } from 'vuefire'
import firebase from 'firebase'

import router from './routes/routes.js'
import { store } from './store/store.js'

import App from './App.vue'

Vue.config.productionTip = false
Vue.use(rtdbPlugin)

const db = firebase.initializeApp({ apiKey: 'AIzaSyC46wIQQopU18cIumNHtRSKXtxpXfukFnQ', databaseURL: 'https://jorsh-2fc49.firebaseio.com/' }).database()

new Vue({
	data: {},
	beforeCreate: function () {
		firebase.auth().onAuthStateChanged(function (user) {
			if (user) {
				this.user = user
				store.commit('setFirebaseUID', user.uid)
			} else {
				// https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signInAnonymously
				firebase.auth().signInAnonymously().catch(console.error)
			}
		}.bind(this))
	},
	router,
	store,
	render: (h) => h(App)
}).$mount('#app')

console.log(
	db.ref('games').once('value', (snapshot) => {
		const documents = snapshot.val()
		console.log(documents)
	})
)
