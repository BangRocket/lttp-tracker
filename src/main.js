import Vue from 'vue'
import { rtdbPlugin } from 'vuefire'

import { firebaseAuth } from './db/db.js'
import router from './routes/routes.js'
import { store } from './store/store.js'

import App from './App.vue'

Vue.config.productionTip = false
Vue.use(rtdbPlugin)

new Vue({
	data: {},
	beforeCreate: firebaseAuth(() => {}),
	router,
	store,
	render: (h) => h(App)
}).$mount('#app')
