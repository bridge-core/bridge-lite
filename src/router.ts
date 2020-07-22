import { createRouter, createWebHistory, NavigationGuard } from 'vue-router'
import { bridgeFolder } from './common/ENV'

import Home from './views/Home.vue'
import IDE from './views/IDE.vue'
import Projects from './views/Projects.vue'

const ensureProjectSelectedGuard: NavigationGuard = (to, from, next) => {
	if (bridgeFolder.value === null) next(false)
	else next()
}
export const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			component: Home,
		},
		{
			path: '/projects',
			component: Projects,
			// beforeEnter: ensureProjectSelectedGuard,
		},
		{
			path: '/ide',
			component: IDE,
			// beforeEnter: ensureProjectSelectedGuard,
		},
	],
})
