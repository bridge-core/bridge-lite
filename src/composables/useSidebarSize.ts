import { useWindowSize } from '@vueuse/core'
import { computed } from 'vue'

export function useSidebarSize() {
	const { width, height } = useWindowSize()

	return {
		width: computed(() => {
			const max = width.value * 0.2 //Sidebar max size is 20% of the window size
			const min = 200 //Sidebar min size is 200px

			return min > max ? min : max
		}),
		height,
	}
}
