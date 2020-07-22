import { createRouter, createWebHistory } from 'vue-router'
import IDE from './components/IDE.vue'

export const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			redirect: '/projects',
		},
		{
			path: '/projects',
			component: IDE,
		},
	],
})
