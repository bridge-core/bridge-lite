import { useWindowSize } from '@vueuse/core'
import { ref } from 'vue'

export function useTitleBarSize() {
	const { width } = useWindowSize()
	return {
		width,
		height: ref(24),
	}
}
