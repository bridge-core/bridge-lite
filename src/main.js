import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import { router } from './router'

const app = createApp(App)
app.use(router)

app.mount('#app')

if ('serviceWorker' in navigator) {
	// Use the window load event to keep the page load performant
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('/service-worker.js')
	})
}
