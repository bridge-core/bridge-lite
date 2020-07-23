import { useWindowSize } from '@vueuse/core'
import { computed, ref } from 'vue'

export function useSidebarSize() {
	const { width, height } = useWindowSize()
	const minSize = 200 //Sidebar min size is 200px
	const maxSize = 0.2
	const maxComputedSize = computed(() => width.value * maxSize) //Sidebar max size is 20% of the window size

	return {
		maxSize,
		minSize,
		maxComputedSize,
		width: computed(() =>
			minSize > maxComputedSize.value ? minSize : maxComputedSize.value
		),
		height,
	}
}
