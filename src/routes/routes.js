import Vue from 'vue'
import VueRouter from 'vue-router'

import TrackerPage from '../views/TrackerPage.vue'
import LandingPage from '../views/LandingPage.vue'

Vue.use(VueRouter)

export const router = new VueRouter({
	routes: [
		{ path: '/', name: 'home', component: LandingPage },
		{ path: '/:id', name: 'tracker', component: TrackerPage, props: true },
		{ path: '/simple/:id', name: 'simple', component: TrackerPage, props: true }
	]
})
