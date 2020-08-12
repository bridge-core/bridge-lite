import { useWindowSize } from '@vueuse/core'
import { ref } from 'vue'

export function useAppBarSize() {
	const { width } = useWindowSize()
	return {
		width,
		height: ref(25),
	}
}
