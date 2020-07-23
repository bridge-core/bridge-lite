import { useWindowSize } from '@vueuse/core'
import { computed, ref } from 'vue'

export function useSidebarSize() {
	const { width, height } = useWindowSize()
	const minWidth = 200 //Sidebar min width is 200px
	const maxWidth = 0.2 //Sidebar max width is 20% of the window width
	const maxComputedWidth = computed(() => width.value * maxWidth) //Get sidebar max width in absolute pxs

	return {
		maxWidth,
		minWidth,
		maxComputedWidth,
		//Models the minmax() css function in use for the sidebar width
		width: computed(() =>
			minWidth > maxComputedWidth.value
				? minWidth
				: maxComputedWidth.value
		),
		height,
	}
}
