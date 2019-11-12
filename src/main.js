import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import TrackerPage from './components/TrackerPage.vue'
import LandingPage from './components/LandingPage.vue'

Vue.config.productionTip = false
Vue.use(VueRouter)

const router = new VueRouter({
	routes: [
		{ path: '/', name: 'home', component: LandingPage },
		{ path: '/:id', name: 'tracker', component: TrackerPage, props: true },
		{ path: '/simple/:id', name: 'simple', component: TrackerPage, props: true }
	]
})

new Vue({
	router,
	data: {},
	render: (h) => h(App)
}).$mount('#app')
