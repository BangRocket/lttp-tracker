import Vue from 'vue'

import { firebaseAuth } from './db/db.js'
import { router } from './routes/routes.js'
import { store } from './store/store.js'

import App from './views/App.vue'

Vue.config.productionTip = false

new Vue({
	data: {},
	beforeCreate: firebaseAuth(() => {}),
	router,
	store,
	render: (h) => h(App)
}).$mount('#app')
