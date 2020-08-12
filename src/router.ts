import { createRouter, createWebHistory } from 'vue-router'

import Home from './views/Home.vue'
import IDE from './views/IDE.vue'
import Projects from './views/Projects.vue'
import { bridgeFolder } from './common/ENV'

export const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			component: Home,
			beforeEnter(to, from, next) {
				if (bridgeFolder.value !== null) next('/projects')
				else next()
			},
		},
		{
			path: '/projects',
			component: Projects,
		},
		{
			path: '/ide',
			component: IDE,
		},
	],
})
