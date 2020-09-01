importScripts(
	'https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js'
)

if (workbox) {
	console.log(`Yay! Workbox is loaded 🎉`)
} else {
	console.log(`Boo! Workbox didn't load 😬`)
}

const expiration = new workbox.expiration.ExpirationPlugin({
	maxEntries: 60,
	maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
})

workbox.routing.registerRoute(
	/\.(?:png|gif|jpg|svg)$/,
	new workbox.strategies.CacheFirst({
		cacheName: 'images-cache',
		plugins: [expiration],
	})
)
workbox.routing.registerRoute(
	/\.(?:js|css|html|json)$/,
	new workbox.strategies.StaleWhileRevalidate({
		cacheName: 'static-resources',
	})
)
